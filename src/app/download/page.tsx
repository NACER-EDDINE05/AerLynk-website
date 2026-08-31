import type { Metadata } from "next";
import { DownloadSection } from "@/components/DownloadSection";
import { Faq } from "@/components/Faq";
import { Testimonials } from "@/components/Testimonials";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Get AerLynk for Windows 10/11 (installer or MSI) and Linux (rpm, deb, AppImage). SHA-256 checksums published with every release. Free, open source, MIT.",
  alternates: { canonical: "/download" },
  openGraph: {
    type: "website",
    url: `${site.url}/download`,
    title: `Download ${site.name}`,
    description:
      "Get AerLynk for Windows 10/11 (installer or MSI) and Linux (rpm, deb, AppImage). SHA-256 checksums published with every release. Free, open source, MIT.",
    siteName: site.name,
    locale: "en_US",
  },
};

export default function DownloadPage() {
  return (
    <>
      <DownloadSection />
      <Testimonials />
      <Faq />
    </>
  );
}