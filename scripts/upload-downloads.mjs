/**
 * Uploads every file in `public/downloads` to the Cloudflare R2 bucket used by
 * the site's download buttons (see `site.r2DownloadBase` in src/lib/site.ts).
 *
 * The ~100 MB installers can't live in git (100 MB repo cap) or Cloudflare
 * Pages (25 MiB per asset), so they're served from a public R2 bucket.
 *
 * Usage:
 *   npm run upload:downloads                          # bucket from env R2_BUCKET
 *   npm run upload:downloads -- --bucket airlynk-downloads
 *
 * Auth: set CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID (or run
 * `npx -y wrangler@3 login` once). Objects land at `downloads/<filename>`
 * so they match the paths in src/lib/downloads.ts.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = resolve(
  fileURLToPath(new URL("..", import.meta.url)),
  "public",
  "downloads",
);

const flagIndex = process.argv.indexOf("--bucket");
const bucket =
  flagIndex !== -1 ? process.argv[flagIndex + 1] : process.env.R2_BUCKET;

if (!bucket) {
  console.error("Missing bucket. Pass --bucket <name> or set the R2_BUCKET env var.");
  console.log(`Files found in ${DIR}:`);
  for (const f of readdirSync(DIR)) {
    const p = resolve(DIR, f);
    if (statSync(p).isFile()) console.log(`  - ${f} (${(statSync(p).size / 1e6).toFixed(1)} MB)`);
  }
  process.exit(1);
}

let uploaded = 0;
for (const file of readdirSync(DIR)) {
  const path = resolve(DIR, file);
  if (!statSync(path).isFile()) continue;
  console.log(`Uploading ${file} -> r2://${bucket}/downloads/${file}`);
  execFileSync(
    "npx",
    ["-y", "wrangler@3", "r2", "object", "put", `downloads/${file}`, "--bucket", bucket, "--file", path, "--remote"],
    { stdio: "inherit" },
  );
  uploaded += 1;
}

console.log(`Done — ${uploaded} file(s) uploaded to r2://${bucket}/downloads/`);