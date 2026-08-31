/**
 * Single source of truth for site-wide constants.
 * NOTE: `url` is a placeholder production domain — change it here only.
 */
export const site = {
  name: "AirLynk",
  version: "0.1.1",
  url: "https://airlynk.dev",
  /**
   * Public base URL of the Cloudflare R2 bucket that mirrors the installers.
   *
   * The ~100 MB builds can't live in the static export / Cloudflare Pages
   * (Pages caps a single asset at 25 MiB, and git caps repo files at 100 MB),
   * so downloads are served from an R2 public bucket instead.
   *
   * Leave "" to keep serving from /public/downloads (the small v0.1.1 files).
   * Configure once the bucket exists, e.g.:
   *   "https://downloads.airlynk.dev"        <- custom domain on the bucket, or
   *   "https://pub-XXXXXXXXXXXXXXXX.r2.dev"   <- auto-assigned R2.dev URL
   */
  r2DownloadBase: "",
  repo: "https://github.com/NACER1-EDDINE/AirLynk",
  repoApi: "https://api.github.com/repos/NACER1-EDDINE/AirLynk",
  releases: "https://github.com/NACER1-EDDINE/AirLynk/releases",
  author: "NACEREDDINE",
  authorUrl: "https://github.com/NACER1-EDDINE",
  license: "MIT",
  tagline: "Encrypted file transfer over your own Wi-Fi",
  description:
    "AirLynk moves files between your PC and any phone on the same Wi-Fi — no accounts, no cloud, no cables, no phone app. Every byte is encrypted end to end with AES-256-GCM; the session key travels only inside the QR code.",
} as const;
