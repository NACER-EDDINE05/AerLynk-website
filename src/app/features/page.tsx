import type { Metadata } from "next";
import { BuiltFor } from "@/components/BuiltFor";
import { Features } from "@/components/Features";
import { FinalCta } from "@/components/FinalCta";
import { HowItWorks } from "@/components/HowItWorks";
import { Showcase } from "@/components/Showcase";
import { TechStack } from "@/components/TechStack";
import { WhyAerlynk } from "@/components/WhyAerlynk";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features & how it works",
  description:
    "AES-256-GCM chunked encryption, QR pairing you can verify by eye, multi-gigabyte streaming, quarantine-before-trust — the full tour of how AerLynk moves files across your own Wi-Fi.",
  alternates: { canonical: "/features" },
  openGraph: {
    type: "website",
    url: `${site.url}/features`,
    title: `Features & how it works — ${site.name}`,
    description:
      "AES-256-GCM chunked encryption, QR pairing you can verify by eye, multi-gigabyte streaming, quarantine-before-trust — the full tour of how AerLynk moves files across your own Wi-Fi.",
    siteName: site.name,
    locale: "en_US",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <Features />
      <Showcase />
      <HowItWorks />
      <WhyAerlynk />
      <BuiltFor />
      <TechStack />
      <FinalCta />
    </>
  );
}