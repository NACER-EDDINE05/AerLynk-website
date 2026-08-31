"use client";

import { useEffect, useState } from "react";
import { GitBranch, Scale, Star, Tag } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

type Stats = { stars: string; forks: string; version: string; license: string };

const FALLBACK: Stats = {
  stars: "0",
  forks: "0",
  version: `v${site.version}`,
  license: site.license,
};

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

/**
 * Open-source section. Stats are fetched live from the GitHub API at view
 * time; if the request fails (rate limit, offline) the static fallbacks from
 * the app's manifest keep the layout intact.
 */
export function GithubSection() {
  const [stats, setStats] = useState<Stats>(FALLBACK);

  useEffect(() => {
    const controller = new AbortController();
    const headers = { Accept: "application/vnd.github+json" };
    Promise.all([
      fetch(site.repoApi, { signal: controller.signal, headers }).then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(String(res.status))),
      ),
      fetch(`${site.repoApi}/releases/latest`, { signal: controller.signal, headers })
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null),
    ])
      .then(([repo, release]) => {
        setStats({
          stars: formatCount(repo.stargazers_count ?? 0),
          forks: formatCount(repo.forks_count ?? 0),
          version: typeof release?.tag_name === "string" ? release.tag_name : FALLBACK.version,
          license: repo.license?.spdx_id ?? site.license,
        });
      })
      .catch(() => {
        /* keep fallbacks */
      });
    return () => controller.abort();
  }, []);

  const cells = [
    { icon: Star, label: "Stars", value: stats.stars },
    { icon: GitBranch, label: "Forks", value: stats.forks },
    { icon: Tag, label: "Latest release", value: stats.version },
    { icon: Scale, label: "License", value: stats.license },
  ];

  return (
    <section id="github" className="relative py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Open source"
          title="Read every line"
          highlight="that touches your files."
          description="AirLynk is MIT-licensed and built in the open. The security model — quarantine, constant-time tokens, per-chunk authentication — is documented in the repository, not hidden behind a trust page."
        />

        <Reveal animation="animotion-blur-reveal">
          <div className="edge-lit glass-deep mx-auto max-w-3xl rounded-2xl p-2">
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
              <svg viewBox="0 0 16 16" className="h-5 w-5 fill-ink" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              <span className="font-mono text-[14px] text-ink">NACER1-EDDINE/AirLynk</span>
              <a
                href={site.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary ml-auto h-9! px-4! text-[13px]"
              >
                View repository
              </a>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-4">
              {cells.map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center gap-1 px-4 py-6 ${i < cells.length - 1 ? "border-white/8 sm:border-r" : ""} ${i % 2 === 0 ? "border-r border-white/8 sm:border-r" : ""} ${i < 2 ? "border-b border-white/8 sm:border-b-0" : ""}`}
                >
                  <dt className="flex items-center gap-1.5 text-[12px] text-ink-3">
                    <Icon size={13} aria-hidden />
                    {label}
                  </dt>
                  <dd className="font-mono text-[20px] font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
