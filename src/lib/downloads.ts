import { site } from "./site";

/**
 * Downloadable release files, self-hosted from /public/downloads.
 * These are the v0.1.1 release artifacts; GitHub Releases is kept as a
 * secondary mirror (see the footnote on the download section).
 */
export const latestTag = "v0.1.1";
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
    size: "2.6 MB",
    href: resolvedHref("AerLynk_0.1.1_x64-setup.exe"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk_0.1.1_x64-setup.exe`,
    sha256: "13d8bf5a94259e1106a8b1d6239c43e6913798bc56b7514181751771e75d571e",
  },
  {
    label: "MSI package",
    note: "Managed / enterprise deployment",
    size: "3.8 MB",
    href: resolvedHref("AerLynk_0.1.1_x64_en-US.msi"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk_0.1.1_x64_en-US.msi`,
    sha256: "6e0350bd0dce3601d7924436c71376ad7ee0648d901caf21d59287816b6c272b",
  },
  {
    label: "Portable",
    note: "Standalone · no installation",
    size: "11.1 MB",
    href: resolvedHref("AerLynk_0.1.1_x64_portable.exe"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk_0.1.1_x64_portable.exe`,
    sha256: "e080c65fc274bf898fc5304a3928999bcf82ad9b3b0e92fe23b20ef118d07c3e",
  },
];

export const linuxAssets: Asset[] = [
  {
    label: "AppImage",
    note: "Any distro · chmod +x and run",
    size: "78.8 MB",
    href: resolvedHref("AerLynk_0.1.1_amd64.AppImage"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk_0.1.1_amd64.AppImage`,
    sha256: "ff40add0e76eda285a11d97f97f5f523c0b6dfa9e6045008c9faa8a0f8c2e665",
  },
  {
    label: "RPM",
    note: "Fedora / RHEL · dnf install",
    size: "4.9 MB",
    href: resolvedHref("AerLynk-0.1.1-1.x86_64.rpm"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk-0.1.1-1.x86_64.rpm`,
    sha256: "5e56ef4c4f400ae9f1b6d55c9cbaac8c41a8cc5bad33dd76a605c580881adcd2",
  },
  {
    label: "DEB",
    note: "Ubuntu / Debian · apt install",
    size: "4.9 MB",
    href: resolvedHref("AerLynk_0.1.1_amd64.deb"),
    mirror: `${site.repo}/releases/download/${latestTag}/AerLynk_0.1.1_amd64.deb`,
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
