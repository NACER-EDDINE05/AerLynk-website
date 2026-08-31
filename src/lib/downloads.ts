import { site } from "./site";

/**
 * Downloadable release files, self-hosted from /public/downloads.
 * These are the v0.1.1 release artifacts; GitHub Releases acts as the mirror.
 */
export const latestTag = "v0.1.1";
export const releaseUrl = `${site.repo}/releases/tag/${latestTag}`;

/**
 * Served URL for a download: the R2 public bucket once site.r2DownloadBase is
 * set (this is where the big ~100 MB builds must live), otherwise the files
 * self-hosted in /public/downloads.
 */
const resolvedHref = (file: string) =>
  site.r2DownloadBase ? `${site.r2DownloadBase}/${file}` : `/downloads/${file}`;

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
    size: "2.6 MB",
    href: resolvedHref("AirLynk_0.1.1_x64-setup.exe"),
    mirror: `${site.repo}/releases/download/${latestTag}/AirLynk_0.1.1_x64-setup.exe`,
    sha256: "2cd7895c31e92fd55d3f7b9d21498535e18b1c5f57f2032f212e3367f850b22b",
  },
  {
    label: "MSI package",
    note: "Managed / enterprise deployment",
    size: "3.8 MB",
    href: resolvedHref("AirLynk_0.1.1_x64_en-US.msi"),
    mirror: `${site.repo}/releases/download/${latestTag}/AirLynk_0.1.1_x64_en-US.msi`,
    sha256: "b65abafe70d8a8c6eb91a4382be0e7a8bdfb19849713256b0bbe3adb64f21935",
  },
  {
    label: "Portable",
    note: "Standalone · no installation",
    size: "11.1 MB",
    href: resolvedHref("AirLynk_0.1.1_x64_portable.exe"),
    mirror: `${site.repo}/releases/download/${latestTag}/AirLynk_0.1.1_x64_portable.exe`,
    sha256: "e080c65fc274bf898fc5304a3928999bcf82ad9b3b0e92fe23b20ef118d07c3e",
  },
];

export const linuxAssets: Asset[] = [
  {
    label: "AppImage",
    note: "Any distro · chmod +x and run",
    size: "78.8 MB",
    href: resolvedHref("AirLynk_0.1.1_amd64.AppImage"),
    mirror: `${site.repo}/releases/download/${latestTag}/AirLynk_0.1.1_amd64.AppImage`,
    sha256: "ff40add0e76eda285a11d97f97f5f523c0b6dfa9e6045008c9faa8a0f8c2e665",
  },
  {
    label: "RPM",
    note: "Fedora / RHEL · dnf install",
    size: "4.9 MB",
    href: resolvedHref("AirLynk-0.1.1-1.x86_64.rpm"),
    mirror: `${site.repo}/releases/download/${latestTag}/AirLynk-0.1.1-1.x86_64.rpm`,
    sha256: "5e56ef4c4f400ae9f1b6d55c9cbaac8c41a8cc5bad33dd76a605c580881adcd2",
  },
  {
    label: "DEB",
    note: "Ubuntu / Debian · apt install",
    size: "4.9 MB",
    href: resolvedHref("AirLynk_0.1.1_amd64.deb"),
    mirror: `${site.repo}/releases/download/${latestTag}/AirLynk_0.1.1_amd64.deb`,
    sha256: "51a0536117ecb0f8d38099860ad0b72fbc926ab6890d7659eb29633ccbaf657a",
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
