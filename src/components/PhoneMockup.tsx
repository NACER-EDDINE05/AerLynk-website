import { LogoMark } from "@/components/Logo";
import { CheckCircle2, ShieldCheck } from "lucide-react";

/**
 * The phone half of the story — the self-contained page the desktop serves
 * over the LAN: branded header, pairing code, live progress, trust footer.
 */
export function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-[218px] rounded-[30px] border border-white/12 bg-[#0a0d14] p-2 shadow-[0_40px_90px_rgb(0_0_0/0.65)] ${className}`}
      aria-hidden="true"
    >
      <div className="overflow-hidden rounded-[24px] border border-white/8">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-2.5 text-[9.5px] text-ink-3">
          <span className="font-mono">21:41</span>
          <span className="h-[14px] w-[64px] rounded-full bg-black/70" />
          <span className="font-mono">5G ▮▮▮</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 px-4 pt-3.5 pb-3">
          <LogoMark size={20} />
          <div>
            <div className="text-[12px] font-semibold text-ink">AirLynk</div>
            <div className="font-mono text-[8.5px] tracking-wide text-ink-3">sealed transfer</div>
          </div>
          <span className="ml-auto rounded-full border border-mint/25 bg-mint/10 px-2 py-0.5 font-mono text-[8px] text-mint">
            E2E
          </span>
        </div>

        {/* Session card */}
        <div className="mx-3 rounded-xl border border-white/10 bg-white/4 p-3">
          <div className="flex items-center gap-2 text-[10px] text-ink-2">
            <span className="pulse-dot" aria-hidden />
            Receiving from desktop
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="font-mono text-[17px] font-semibold tracking-[0.08em] text-ink">K7-M4</span>
            <span className="text-[8.5px] text-ink-3">verified</span>
          </div>
          <div className="mt-2.5 truncate text-[10.5px] text-ink-2">airlynk-demos-4k.mov</div>
          <div className="progress-track mt-1.5">
            <div className="progress-fill indeterminate" style={{ width: "64%" }} />
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[8.5px] text-ink-3">
            <span>1.2 / 1.9 GB</span>
            <span>23.4 MB/s</span>
          </div>
        </div>

        {/* Done row */}
        <div className="mx-3 mt-2 flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-3 py-2">
          <CheckCircle2 size={12} className="text-mint" />
          <span className="min-w-0 flex-1 truncate text-[10px] text-ink-2">quarterly-report.pdf</span>
          <span className="font-mono text-[8.5px] text-mint">saved</span>
        </div>

        {/* Trust footer */}
        <div className="flex items-center justify-center gap-1.5 px-4 py-3.5 text-[8.5px] text-ink-3">
          <ShieldCheck size={11} className="text-accent" />
          Key stays on your devices
        </div>
      </div>
    </div>
  );
}
