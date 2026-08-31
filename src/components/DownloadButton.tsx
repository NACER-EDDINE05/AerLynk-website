"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { detectOs, primaryAsset, type Os } from "@/lib/downloads";
import { site } from "@/lib/site";

type Props = {
  className?: string;
  /** Show the file size under the label (for large CTA buttons). */
  withSize?: boolean;
};

/**
 * The primary download CTA. Detects the visitor's OS after mount and points
 * straight at the self-hosted installer file, so clicking starts the download
 * immediately. Server and first client render default to Windows — the most
 * common case — so there is no hydration mismatch.
 */
export function DownloadButton({ className = "", withSize = false }: Props) {
  const [os, setOs] = useState<Os | null>(null);
  useEffect(() => {
    setOs(detectOs());
  }, []);

  if (os === "macos") {
    return (
      <a
        href={site.releases}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-primary ${className}`}
      >
        <Download size={17} aria-hidden />
        macOS — watch releases
      </a>
    );
  }

  const asset = os === "linux" ? primaryAsset.linux : primaryAsset.windows;

  return (
    <a href={asset.href} download className={`btn btn-primary ${className}`}>
      <Download size={17} aria-hidden />
      {os === "linux" ? "Download for Linux" : "Download for Windows"}
      {withSize && <span className="font-mono text-[12px] font-normal opacity-75">· {asset.size}</span>}
    </a>
  );
}
