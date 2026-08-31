import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  /* Fully static site: everything is generated at build time and served as
     plain HTML/CSS/JS. Hosted on Cloudflare Pages; the (possibly ~100 MB)
     installers are served from an R2 public bucket (see src/lib/site.ts). */
  output: "export",
  /* Emit `out/<route>/index.html` so clean URLs (/features, /download) work
     on any static host — Cloudflare Pages included — without redirects. */
  trailingSlash: true,
};

export default nextConfig;
