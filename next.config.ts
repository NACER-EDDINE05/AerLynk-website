import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  /* Fully static site: everything is generated at build time and served as
     plain HTML/CSS/JS. Hosted on Vercel; the installers (largest ~83 MB,
     under Vercel's 100 MB per-static-file Hobby limit) ship inside the
     deployment via public/downloads (see scripts/fetch-downloads.mjs). */
  output: "export",
  /* Emit `out/<route>/index.html` so clean URLs (/features, /download) work
     on any static host — Vercel included — without redirects. */
  trailingSlash: true,
};

export default nextConfig;
