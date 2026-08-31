"use client";

import { useEffect, useState } from "react";
import {
  Apple,
  Download,
  LayoutGrid,
  Lock,
  ShieldCheck,
  TerminalSquare,
  UserX,
  Wifi,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  detectOs,
  latestTag,
  linuxAssets,
  primaryAsset,
  releaseUrl,
  windowsAssets,
  type Asset,
  type Os,
} from "@/lib/downloads";
import { site } from "@/lib/site";

/* ---- Small shared pieces --------------------------------------------------- */

function BuildRow({ asset }: { asset: Asset }) {
  return (
    <a
      href={asset.href}
      download
      className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/6"
    >
      <Download
        size={14}
        aria-hidden
        className="flex-none text-ink-3 transition-colors duration-200 group-hover:text-accent-2"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-ink">{asset.label}</span>
        <span className="block truncate text-[11px] text-ink-3">{asset.note}</span>
      </span>
      <span className="flex-none font-mono text-[10.5px] text-ink-3">{asset.size}</span>
    </a>
  );
}

/* ---- Platform data --------------------------------------------------------- */

const PLATFORMS = [
  { id: "windows", label: "Windows", icon: LayoutGrid, available: true },
  { id: "macos", label: "macOS", icon: Apple, available: false },
  { id: "linux", label: "Linux", icon: TerminalSquare, available: true },
] as const;

const BENEFITS = [
  { icon: Zap, label: "~30-second setup" },
  { icon: Lock, label: "E2E encrypted" },
  { icon: UserX, label: "No account, ever" },
  { icon: Wifi, label: "Nothing leaves your LAN" },
] as const;

/**
 * The conversion centerpiece: one floating "sealed delivery" card with a
 * sliding platform selector, a breathing primary CTA, and verify/CLI cards.
 */
export function DownloadSection() {
  const [os, setOs] = useState<Os>("windows");

  useEffect(() => {
    setOs(detectOs() ?? "windows");
  }, []);

  const platformIndex = PLATFORMS.findIndex((p) => p.id === os);
  const platformLabel = PLATFORMS[platformIndex]?.label ?? "Windows";
  const primary: Asset | null =
    os === "windows" ? primaryAsset.windows : os === "linux" ? primaryAsset.linux : null;
  const otherBuilds: Asset[] =
    os === "windows"
      ? windowsAssets.filter((a) => a.label !== primaryAsset.windows.label)
      : os === "linux"
        ? linuxAssets.filter((a) => a.label !== primaryAsset.linux.label)
        : [];

  return (
    <section id="download" className="relative py-28">
      {/* Section-local stage lighting */}
      <div
        className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-[420px] max-w-4xl"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, rgb(47 107 255 / 0.14), transparent 70%), radial-gradient(40% 50% at 70% 40%, rgb(0 190 255 / 0.08), transparent 70%)",
          filter: "blur(24px)",
        }}
        aria-hidden
      />

      <div className="wrap relative">
        <SectionHeading
          eyebrow={`Download · ${latestTag}`}
          title="One click between you"
          highlight="and your files."
          description="Every build below is served directly from this page — no redirects, no email gates, no accounts. Just pick your platform and it lands on disk."
        />

        {/* ---- The delivery card ---- */}
        <Reveal animation="animotion-blur-reveal" delay={100}>
          <div className="glass-deep edge-lit relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-[28px]">
            <div
              className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[560px] -translate-x-1/2 rounded-full bg-accent/18 blur-[90px]"
              aria-hidden
            />

            <div className="relative p-6 sm:p-10">
              {/* Platform selector */}
              <div
                role="radiogroup"
                aria-label="Choose your platform"
                className="relative mx-auto grid w-full max-w-md grid-cols-3 rounded-2xl border border-white/10 bg-white/4 p-1"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-1 left-1 w-[calc((100%-8px)/3)] rounded-xl bg-gradient-to-b from-accent/70 to-accent-2/50 shadow-[0_2px_16px_rgb(47_107_255/0.4)] transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(${Math.max(platformIndex, 0) * 100}%)` }}
                />
                {PLATFORMS.map((p) => {
                  const selected = os === p.id;
                  return (
                    <button
                      key={p.id}
                      role="radio"
                      type="button"
                      aria-checked={selected}
                      onClick={() => setOs(p.id)}
                      className={`relative z-10 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12.5px] font-medium transition-colors duration-200 sm:gap-2 sm:text-[13.5px] ${
                        selected ? "text-white" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      <p.icon size={15} aria-hidden />
                      {p.label}
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-center font-mono text-[11.5px] text-ink-3" aria-live="polite">
                {os === "macos"
                  ? "no macOS build yet — Windows and Linux ship today"
                  : `detected: ${platformLabel} · served from this page`}
              </p>

              {/* Primary action */}
              <div className="mt-8 flex justify-center">
                {primary ? (
                  <div className="relative">
                    <span className="dl-glow" aria-hidden />
                    <a href={primary.href} download className="btn-download inline-flex items-center gap-3">
                      <Download size={20} aria-hidden />
                      Download for {platformLabel}
                      <span className="font-mono text-[13px] font-normal text-white/70">{primary.size}</span>
                    </a>
                  </div>
                ) : (
                  <div className="w-full max-w-sm rounded-2xl border border-dashed border-white/14 bg-white/2 p-5 text-center">
                    <Apple size={22} className="mx-auto mb-2 text-ink-3" aria-hidden />
                    <p className="text-[13.5px] leading-relaxed text-ink-2">
                      AirLynk currently builds for Windows and Linux. A macOS build is on the
                      roadmap.
                    </p>
                    <a
                      href={releaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary mt-4 h-9! px-4! text-[13px]"
                    >
                      Watch releases
                    </a>
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                {BENEFITS.map((b) => (
                  <span key={b.label} className="chip h-8!">
                    <b.icon size={12} className="text-accent-2" aria-hidden />
                    {b.label}
                  </span>
                ))}
              </div>

              {/* Remaining builds */}
              {primary && (
                <>
                  <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                    More builds for {platformLabel}
                  </p>
                  <div key={os} className="animotion-fade-in-up grid gap-2 sm:grid-cols-2">
                    {otherBuilds.map((asset) => (
                      <BuildRow key={asset.label} asset={asset} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </Reveal>

        {/* ---- Trust + build from source (nothing here can go stale) ---- */}
        <div className="mx-auto mt-4 grid max-w-3xl gap-4 md:grid-cols-2">
          <Reveal animation="animotion-fade-in-up" delay={180} className="h-full">
            <div className="glass h-full rounded-2xl p-6">
              <h3 className="mb-4 flex items-center gap-2 text-[14.5px] font-semibold text-ink">
                <ShieldCheck size={16} className="text-mint" aria-hidden />
                Trust, by construction
              </h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Uploads land in quarantine and are authenticated before a file ever exists",
                  "AES-256-GCM per 1 MiB chunk — a flipped byte fails authentication",
                  "The session key rides in the QR code's URL fragment — browsers never transmit it",
                  "Sessions expire after ten quiet minutes; unknown tokens get an indistinguishable 404",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[13px] leading-snug text-ink-2">
                    <Lock size={13} className="mt-0.5 flex-none text-mint/80" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href={`${site.repo}#security-model`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-[13px] font-medium text-accent-2 underline-offset-4 hover:underline"
              >
                Read the full security model
              </a>
            </div>
          </Reveal>

          <Reveal animation="animotion-fade-in-up" delay={260} className="h-full">
            <div className="glass h-full rounded-2xl p-6">
              <h3 className="mb-4 flex items-center gap-2 text-[14.5px] font-semibold text-ink">
                <TerminalSquare size={16} className="text-accent-2" aria-hidden />
                Build it yourself
              </h3>
              <p className="text-[13px] leading-relaxed text-ink-2">
                Prefer to compile the bytes you run? AirLynk is MIT-licensed and builds in the
                open — clone the repository, audit every line, and produce the same binaries the
                CI workflow ships. A Rust toolchain and Tauri 2 are all you need.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
                <a
                  href={site.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary h-9! px-4! text-[13px]"
                >
                  View repository
                </a>
                <a
                  href={`${site.repo}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-accent-2 underline-offset-4 hover:underline"
                >
                  Build instructions
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal animation="animotion-fade-in-up" delay={320}>
          <p className="mt-8 text-center font-mono text-[12px] text-ink-3">
            Built by the official CI workflow · MIT licensed · also mirrored on{" "}
            <a
              href={releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-2 underline-offset-4 hover:underline"
            >
              GitHub Releases
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
