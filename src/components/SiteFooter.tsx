import Link from "next/link";
import { Github } from "lucide-react";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Download", href: "/download" },
      { label: "Releases", href: site.releases },
      { label: "Features", href: "/features" },
      { label: "FAQ", href: "/download#faq" },
    ],
  },
  {
    heading: "Project",
    links: [
      { label: "GitHub repository", href: site.repo },
      { label: "Security model", href: `${site.repo}#security-model` },
      { label: "How it works", href: "/features#how-it-works" },
      { label: "MIT license", href: `${site.repo}/blob/main/LICENSE` },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/8 py-14">
      <div className="wrap">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-3">
              LAN file transfer, wrapped in a tamper-evident sleeve. No accounts, no cloud, no
              telemetry — nothing to trust but the code.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-12 gap-y-10 sm:gap-16">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[13.5px] text-ink-2 transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-7 sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-ink-3">
            © {new Date().getFullYear()} {site.author}. AerLynk is open source under {site.license}.
          </p>
          <a
            href={site.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12.5px] text-ink-3 transition-colors hover:text-ink"
          >
            <Github size={14} aria-hidden />
            Made by {site.author}
          </a>
        </div>
      </div>
    </footer>
  );
}
