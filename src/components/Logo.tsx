import { site } from "@/lib/site";

/** The app's real emblem — the same artwork the desktop build ships as its
 *  window/taskbar icon, so the site and the app carry one identity. */
export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <img
      src="/aerlynk-emblem.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={26} />
      {!compact && (
        <span className="text-[17px] font-semibold tracking-tight text-ink">
          {site.name}
        </span>
      )}
    </span>
  );
}
