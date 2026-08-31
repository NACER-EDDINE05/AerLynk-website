"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download, Github } from "lucide-react";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

/**
 * Primary navigation. Informative sections live on /features, the conversion
 * flow on /download. `match` marks the link that should be highlighted while
 * its route is active; anchor-only links are never highlighted.
 */
const LINKS = [
  { href: "/features", label: "Features", match: "/features" },
  { href: "/features#how-it-works", label: "How it works" },
  { href: "/features#why", label: "Why AerLynk" },
  { href: "/features#stack", label: "Stack" },
  { href: "/download", label: "Download", match: "/download" },
  { href: "/download#faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-white/8 bg-[#06080d]/78 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" aria-label="AerLynk home" className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ href, label, ...rest }) => {
            const active = "match" in rest && rest.match === pathname;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                  active ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost h-9! text-[13.5px]"
            aria-label="AerLynk on GitHub"
          >
            <Github size={16} aria-hidden />
            Star
          </a>
          <Link href="/download" className="btn btn-primary h-9! px-4! text-[13.5px]">
            <Download size={15} aria-hidden />
            Download
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-ink-2 transition-colors hover:text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="wrap max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/8 pb-6 pt-3 md:hidden"
        >
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-2 py-3 text-[15px] font-medium text-ink-2 hover:text-ink"
            >
              {label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2.5">
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full"
            >
              <Github size={16} aria-hidden />
              GitHub
            </a>
            <Link href="/download" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              <Download size={16} aria-hidden />
              Download
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
