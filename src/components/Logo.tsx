import { site } from "@/lib/site";

export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="al-mark" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#4d7dff" />
          <stop offset="1" stopColor="#1fa7d9" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#al-mark)" />
      <path
        d="M9 21.5 16 9l7 12.5M11.6 17h8.8"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
