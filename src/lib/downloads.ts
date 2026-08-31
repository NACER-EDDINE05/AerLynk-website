import { site } from "./site";

/**
 * Downloadable release files, self-hosted from /public/downloads.
 * These are the v0.1.2 release artifacts; GitHub Releases is kept as a
 * secondary mirror (see the footnote on the download section).
 */
export const latestTag = "v0.1.2";
export const releaseUrl = `${site.repo}/releases/tag/${latestTag}`;

/**
 * Served URL for a download. By default the binaries ship inside the static
 * deployment (public/downloads — populated by scripts/fetch-downloads.mjs);
 * site.downloadCdnBase overrides this only if a future build outgrows the
 * host's per-file static limit.
 */
const resolvedHref = (file: string) =>
  site.downloadCdnBase ? `${site.downloadCdnBase}/${file}` : `/downloads/${file}`;

export type Os = "windows" | "linux" | "macos";

export type Asset = {
  label: string;
  note: string;
  size: string;
  /** Self-hosted path served by this site. */
  href: string;
  /** Mirror on GitHub Releases. */
  mirror: string;
  /** SHA-256 of the exact artifact (matches the GitHub Release digest). */
  sha256: string;
};

export const windowsAssets: Asset[] = [
  {
    label: "Installer",
    note: "Recommended · upgrades in place",
    size: "2.5 MB",
    href: resolvedHref("AerLynk_0.1.2_x64-setup.exe"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk_0.1.2_x64-setup.exe`,
    sha256: "6ee25d5c4492945e58d51df7c5583845e246bb19ee0a35d22abf9afa3e49cc0f",
  },
  {
    label: "MSI package",
    note: "Managed / enterprise deployment",
    size: "3.7 MB",
    href: resolvedHref("AerLynk_0.1.2_x64_en-US.msi"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk_0.1.2_x64_en-US.msi`,
    sha256: "a5b57896c56f35a5d98fb66a73bbb374a9fefa33e9c6eab76d63a771592c87e0",
  },
];

export const linuxAssets: Asset[] = [
  {
    label: "AppImage",
    note: "Any distro · chmod +x and run",
    size: "78.8 MB",
    href: resolvedHref("AerLynk_0.1.2_amd64.AppImage"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk_0.1.2_amd64.AppImage`,
    sha256: "baa99f6ae4729151bd75290799b1b01ce74a1144b8412bf3fb1be5a179f3e831",
  },
  {
    label: "RPM",
    note: "Fedora / RHEL · dnf install",
    size: "4.9 MB",
    href: resolvedHref("AerLynk-0.1.2-1.x86_64.rpm"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk-0.1.2-1.x86_64.rpm`,
    sha256: "459f859c6c59a714d35643c77708d297353bfe04cad59a5a25eacafd1b8ab662",
  },
  {
    label: "DEB",
    note: "Ubuntu / Debian · apt install",
    size: "4.9 MB",
    href: resolvedHref("AerLynk_0.1.2_amd64.deb"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk_0.1.2_amd64.deb`,
    sha256: "59b3730b70b03ddd73e5f1e251b9a430cf3667e51780e0333d74fe57c79c1716",
  },
];

/** Primary asset per platform, used by the hero / CTA download buttons. */
export const primaryAsset: Record<"windows" | "linux", Asset> = {
  windows: windowsAssets[0],
  linux: linuxAssets[0],
};

/** Best-effort client-side OS detection. Returns null before mount / unknown. */
export function detectOs(): Os | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/Windows NT/i.test(ua)) return "windows";
  if (/Android/i.test(ua)) return null; // phones don't run the desktop app
  if (/Mac OS X|Macintosh/i.test(ua)) return "macos";
  if (/Linux|X11|Ubuntu|Fedora/i.test(ua)) return "linux";
  return null;
}
