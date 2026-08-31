import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Backdrop } from "@/components/Backdrop";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

/* The exact font files the desktop app ships — offline-safe, no CDN. */
const outfit = localFont({
  src: "../fonts/outfit-var.woff2",
  variable: "--font-outfit",
  weight: "100 900",
  display: "swap",
});

const jetbrains = localFont({
  src: "../fonts/jetbrains-mono-var.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "file transfer",
    "LAN transfer",
    "Wi-Fi file sharing",
    "end-to-end encryption",
    "AES-256-GCM",
    "QR code pairing",
    "open source",
    "Tauri",
    "Rust",
  ],
  authors: [{ name: site.author, url: site.authorUrl }],
  creator: site.author,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#06080d",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Windows 10, Windows 11, Linux",
  softwareVersion: site.version,
  description: site.description,
  url: site.url,
  downloadUrl: site.releases,
  license: `${site.repo}/blob/main/LICENSE`,
  author: {
    "@type": "Person",
    name: site.author,
    url: site.authorUrl,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

/**
 * Old one-pager anchors that may still be shared around the web
 * (airlynk.dev/#faq etc.). The inline script in the body forwards them
 * to the new routes before paint.
 */
const LEGACY_ANCHOR_MAP: Record<string, string> = {
  features: "/features",
  showcase: "/features#showcase",
  "how-it-works": "/features#how-it-works",
  why: "/features#why",
  "built-for": "/features#built-for",
  stack: "/features#stack",
  github: "/#github",
  download: "/download",
  testimonials: "/download#testimonials",
  faq: "/download#faq",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="relative min-h-screen antialiased">
        {/* Legacy one-pager anchors (#features, #download, …) now live on their
            own routes — forward them before paint so old shared links work. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var h=location.hash.slice(1);if(!h||location.pathname!=="/")return;var m=${JSON.stringify(
              LEGACY_ANCHOR_MAP,
            )};var t=m[h];if(t)location.replace(t);})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <noscript>
          <style>{`.opacity-0 { opacity: 1 !important; }`}</style>
        </noscript>
        <Backdrop />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
