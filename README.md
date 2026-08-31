# AirLynk Website

The official marketing site for [AirLynk](https://github.com/NACER1-EDDINE/AirLynk) — a desktop app that moves files between a PC and any phone on the same Wi-Fi, encrypted end to end with AES-256-GCM.

## Stack

- **Next.js 15** (App Router, fully static prerender) + **TypeScript**
- **Tailwind CSS 4** with design tokens inherited from the app's dark "atmosphere" theme
- **Animotion** CSS keyframes (vendored subset, see `src/app/animotion.css`) + handcrafted motion in `src/app/motion.css`
- **lucide-react** icons; the app's real Outfit + JetBrains Mono variable fonts (`src/fonts/`)
- No client-side animation framework — all motion is GPU-friendly CSS driven by tiny `IntersectionObserver` hooks

## Structure

```
src/
├── app/            # layout, page, SEO (robots, sitemap, manifest, OG/apple images)
│   ├── globals.css # tokens, surfaces, buttons, backdrop layers
│   ├── motion.css  # handcrafted keyframes
│   └── animotion.css # vendored Animotion subset
├── components/     # sections + shared UI (AppWindow/PhoneMockup recreate the real UI)
└── lib/            # site constants, all section copy
```

## Commands

```bash
npm install
npm run dev             # local development
npm run build           # production build — fully static, written to ./out
npm run start           # serve the static ./out build locally (npx serve)
npm run fetch:downloads # pull the release binaries from GitHub Releases into public/downloads
npm run deploy:vercel   # fetch binaries + vercel build + deploy (needs `vercel login` or VERCEL_TOKEN)
```

> **Note:** the site is a **static export** (`output: "export"` in `next.config.ts`),
> so `next start` is replaced by `serve out`. There is no Node.js server at
> runtime — this is what lets it run free and fast on Vercel.

## Hosting (Vercel, downloads included)

The site runs on **Vercel** as a static deployment, and the installer binaries
are served **from the deployment itself** (`/downloads/<file>`) — no separate
bucket needed. Relevant limits:

| Where the file lives | Limit |
|---|---|
| git repo (GitHub) | 100 MB per file (hard) |
| Vercel static file | 100 MB per file (Hobby) · 1 GB (Pro) |
| Largest current artifact | ~83 MB AppImage — fits |

Because the binaries are gitignored (repo hygiene + GitHub's 100 MB cap), they
are fetched at **deploy time** by `scripts/fetch-downloads.mjs`, which downloads
them from GitHub Releases into `public/downloads/`, verifies each file's
SHA-256 against the digests in `src/lib/downloads.ts`, and skips files that are
already present with a matching digest.

One-time setup:

1. **Create the Vercel project** — `npx vercel@latest link` (creates
   `.vercel/project.json` with your org/project IDs) or import the repo at
   vercel.com/new.
2. **CI secrets** (for the GitHub Actions deploy): set
   `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (from `.vercel/project.json` or the
   project dashboard) and a `VERCEL_TOKEN` (vercel.com → Account Settings →
   Tokens). Pushing to `main` then fetches the binaries, builds, and deploys.
   Missing secrets make the workflow skip gracefully.
3. **Local deploys** — copy your local binaries into `public/downloads/` (or
   let `fetch:downloads` fetch them), then `npm run deploy:vercel`.
4. **Custom domain** — add it in the Vercel project settings and set
   `site.url` in `src/lib/site.ts` so canonical/sitemap/OG URLs are correct.

If a future build outgrows Vercel's per-file static limit, set
`site.downloadCdnBase` (src/lib/site.ts) to an external CDN/bucket URL — the
download buttons will resolve there instead of `/downloads/`. GitHub Releases
stays linked as a secondary mirror on the download section either way.

Files in `public/downloads/` are gitignored — the GitHub Release remains the
source of truth for the binaries; the deployment serves them.

## Notes

- The production URL, repo links, and version live in `src/lib/site.ts` — update
  `site.url` before deploying so canonical/sitemap/OG URLs are correct.
- **Release binaries** are fetched into the deployment by
  `npm run fetch:downloads`; when a new version ships, update the
  filenames/sizes/digests in `src/lib/downloads.ts` and the script picks the
  new files up automatically. GitHub Releases is linked as a secondary mirror.
- The testimonials section is placeholder demo content, clearly labeled on the page.
- The QR pattern in the product mockups is deliberately decorative and not scannable.
