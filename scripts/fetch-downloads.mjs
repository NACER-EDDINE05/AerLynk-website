/**
 * Fetches the release binaries from GitHub Releases into `public/downloads`
 * so they are bundled into the static deployment and served directly by the
 * site (see `site.downloadCdnBase` in src/lib/site.ts).
 *
 * Filenames and SHA-256 digests are extracted from src/lib/downloads.ts — the
 * single source of truth — so this script never drifts from the download page.
 * Existing files with a matching digest are skipped, so re-running locally is
 * cheap and your own binaries are never clobbered.
 *
 * Usage: node scripts/fetch-downloads.mjs   (or `npm run fetch:downloads`)
 *
 * Auth: not needed for public repos. Set GITHUB_TOKEN to raise rate limits or
 * to fetch from a private repository.
 */
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const DEST = resolve(ROOT, "public", "downloads");

/** Pull the tag, asset filenames and digests out of the typed source files. */
function readManifest() {
  const downloadsTs = readFileSync(resolve(ROOT, "src/lib/downloads.ts"), "utf8");
  const siteTs = readFileSync(resolve(ROOT, "src/lib/site.ts"), "utf8");

  const tag = downloadsTs.match(/export const latestTag = "([^"]+)"/)?.[1];
  const repo = siteTs.match(/repo: "https:\/\/github\.com\/([^"]+)"/)?.[1];
  if (!tag || !repo) {
    throw new Error("Could not parse latestTag / repo from src/lib/*.ts");
  }

  const files = [...downloadsTs.matchAll(/resolvedHref\("([^"]+)"\)/g)].map((m) => m[1]);
  const digests = [...downloadsTs.matchAll(/sha256:\s*"([0-9a-f]{64})"/g)].map((m) => m[1]);
  if (files.length === 0 || files.length !== digests.length) {
    throw new Error(
      `Manifest parse mismatch: ${files.length} filenames vs ${digests.length} digests`,
    );
  }
  return {
    tag,
    repo,
    assets: files.map((file, i) => ({ file, sha256: digests[i] })),
  };
}

const sha256 = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex");

async function download(url, dest, token) {
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
  }
  const tmp = `${dest}.part`;
  const body = Buffer.from(await res.arrayBuffer());
  writeFileSync(tmp, body);
  renameSync(tmp, dest);
  return body.length;
}

/**
 * Legacy names used before the AerLynk rebrand. The v0.1.1 release assets are
 * still uploaded as "AirLynk_*"; until they are renamed on GitHub Releases,
 * fall back to the old repo/asset names (same bytes, digests are verified
 * either way). Once the release is renamed, these fallbacks never trigger.
 */
const LEGACY_REPO = "NACER1-EDDINE/AirLynk";
const legacyRepo = (repo) => (repo === LEGACY_REPO ? null : LEGACY_REPO);
const legacyName = (file) => file.replace(/AerLynk/g, "AirLynk");

const { tag, repo, assets } = readManifest();
mkdirSync(DEST, { recursive: true });

console.log(`Fetching ${assets.length} asset(s) for ${repo} ${tag}\n`);

let fetched = 0;
let skipped = 0;
for (const { file, sha256: expected } of assets) {
  const dest = resolve(DEST, file);

  if (existsSync(dest)) {
    const actual = sha256(dest);
    if (actual === expected) {
      console.log(`  ✓ ${file} — already present, digest matches (skipped)`);
      skipped += 1;
      continue;
    }
    console.log(`  ! ${file} — digest mismatch, re-downloading`);
    unlinkSync(dest);
  }

  /* Primary URL first, then legacy fallbacks (renamed repo, renamed assets,
     or both still original). Duplicates collapse via the Set. */
  const candidates = [
    `https://github.com/${repo}/releases/download/${tag}/${file}`,
    legacyRepo(repo) &&
      `https://github.com/${legacyRepo(repo)}/releases/download/${tag}/${file}`,
    legacyName(file) !== file &&
      `https://github.com/${repo}/releases/download/${tag}/${legacyName(file)}`,
    legacyRepo(repo) &&
      legacyName(file) !== file &&
      `https://github.com/${legacyRepo(repo)}/releases/download/${tag}/${legacyName(file)}`,
  ].filter(Boolean);

  let lastError = null;
  let downloaded = 0;
  let source = null;
  for (const url of [...new Set(candidates)]) {
    try {
      process.stdout.write(`  ↓ ${file} ... `);
      downloaded = await download(url, dest, process.env.GITHUB_TOKEN);
      source = url;
      break;
    } catch (err) {
      lastError = err;
      process.stdout.write(`unavailable (${err.message})\n`);
    }
  }
  if (!source) throw lastError;

  const actual = sha256(dest);
  if (actual !== expected) {
    unlinkSync(dest);
    throw new Error(`Digest mismatch for ${file}: expected ${expected}, got ${actual}`);
  }
  console.log(
    `  ✓ ${(downloaded / 1e6).toFixed(1)} MB — sha256 verified` +
      (source === candidates[0] ? "" : ` (via legacy asset: ${source.split("/").pop()})`),
  );
  fetched += 1;
}

console.log(
  `\nDone — ${fetched} downloaded, ${skipped} reused. Files in public/downloads:`,
);
for (const f of assets) {
  const p = resolve(DEST, f.file);
  console.log(`  - ${f.file} (${(statSync(p).size / 1e6).toFixed(1)} MB)`);
}
