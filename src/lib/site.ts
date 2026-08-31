/**
 * Single source of truth for site-wide constants.
 * NOTE: `url` is a placeholder production domain — change it here only.
 */
export const site = {
  name: "AirLynk",
  version: "0.1.1",
  url: "https://airlynk.dev",
  /**
   * Optional external base URL for the installers (e.g. a CDN or object
   * storage bucket). By default (""), the binaries live inside the deployment
   * itself in public/downloads — see scripts/fetch-downloads.mjs, which pulls
   * them from GitHub Releases at build time and verifies their digests.
   *
   * Only needed if a future build exceeds the host's static-file size limit
   * (Vercel: 100 MB per static file on Hobby, 1 GB on Pro). Then set, e.g.:
   *   "https://downloads.airlynk.dev"
   */
  downloadCdnBase: "",
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
