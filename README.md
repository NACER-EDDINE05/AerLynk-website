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
npm run dev     # local development
npm run build   # production build — fully static, written to ./out
npm run start   # serve the static ./out build locally (npx serve)
npm run deploy:pages      # build + deploy ./out to Cloudflare Pages
npm run upload:downloads  # push public/downloads/* to the R2 bucket (Mirrors)
```

> **Note:** the site is a **static export** (`output: "export"` in `next.config.ts`),
> so `next start` is replaced by `serve out`. There is no Node.js server at
> runtime — this is what lets it run free and fast on Cloudflare Pages.

## Hosting (Cloudflare Pages + R2)

The site runs on **Cloudflare Pages**; the installer binaries — including the
~100 MB builds — are served from a **Cloudflare R2 public bucket**, because:

| Where the file lives | Limit |
|---|---|
| git repo (GitHub) | 100 MB per file (hard) |
| Cloudflare Pages asset | 25 MiB per file |
| Cloudflare R2 public bucket | up to 5 TB per object, free egress |

One-time setup:

1. **Pages project** — create a Pages project named `airlynk-website` (or change
   `--project-name` in `package.json` / `.github/workflows/deploy.yml`).
2. **R2 bucket** — create a bucket (e.g. `airlynk-downloads`), enable **public
   access** (use the auto `r2.dev` URL or connect a custom domain such as
   `downloads.airlynk.dev`).
3. **Point the site at it** — in `src/lib/site.ts` set `site.url` to your real
   domain and `site.r2DownloadBase` to the bucket's public URL. The download
   buttons then resolve to `https://downloads.airlynk.dev/<file>`.
   Leave `r2DownloadBase: ""` to keep serving the small v0.1.1 files from
   `/public/downloads` (self-hosted, but only works while the files are in the
   deployment).
4. **Upload the binaries** — `npm run upload:downloads -- --bucket airlynk-downloads`
   (push everything in `public/downloads/` to `downloads/<file>`). Small builds
   can also be dropped into the R2 dashboard by drag-and-drop.
5. **GitHub Actions CI** (optional but recommended): configure repo secrets
   `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `R2_BUCKET`. Pushing to
   `main` builds the site, uploads the downloads to R2, and deploys to Pages.

Files in `public/downloads/` are gitignored — keep them local/CI-only and let
the R2 bucket be the source of truth for what visitors download.

## Notes

- The production URL, repo links, and version live in `src/lib/site.ts` — update
  `site.url` before deploying so canonical/sitemap/OG URLs are correct.
- **Release binaries** are mirrored from the R2 bucket; when a new version
  ships, replace the files, run `npm run upload:downloads`, and update the
  filenames/sizes in `src/lib/downloads.ts`. GitHub Releases is linked as a mirror.
- The testimonials section is placeholder demo content, clearly labeled on the page.
- The QR pattern in the product mockups is deliberately decorative and not scannable.
