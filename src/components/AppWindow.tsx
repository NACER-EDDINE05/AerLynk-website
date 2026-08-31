import { LogoMark } from "@/components/Logo";
import { QrPattern } from "@/components/QrPattern";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock3,
  Settings,
  Wifi,
} from "lucide-react";

type Variant = "send" | "receive" | "history";

/** Fake-QR framed card with pairing code — mirrors the app's QrCard. */
function QrCardMock({ hint }: { hint: string }) {
  return (
    <div className="flex items-center gap-3.5 p-3.5 sm:gap-5 sm:p-5">
      <div className="relative shrink-0">
        <div className="radar" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div
          className="qr-tile relative h-[104px] w-[104px] sm:h-[124px] sm:w-[124px]"
          style={{ boxShadow: "0 0 24px rgb(91 140 255 / 0.35)" }}
        >
          <QrPattern className="h-full w-full rounded" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[11.5px] text-ink-2">
          <span className="pulse-dot" aria-hidden />
          {hint}
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="font-mono text-[22px] font-semibold tracking-[0.08em] text-ink">K7-M4</span>
          <span className="text-[11px] text-ink-3">pairing code</span>
        </div>
        <div className="mt-3 h-7 w-[86px] rounded-lg border border-white/12 bg-white/6 text-center text-[11px] leading-7 text-ink-2">
          Copy link
        </div>
        <div className="mt-2.5 truncate font-mono text-[10.5px] text-ink-3">
          http://192.168.1.24:52841/s/9f3c…#k=···
        </div>
      </div>
    </div>
  );
}

function FileRow({ name, size, pct, done }: { name: string; size: string; pct: number; done?: boolean }) {
  return (
    <div className="rounded-xl border border-white/6 bg-white/3 p-3">
      <div className="flex items-center justify-between gap-3 text-[11.5px]">
        <span className="min-w-0 truncate text-ink-2">{name}</span>
        <span className="flex-none font-mono text-[10.5px] text-ink-3">
          {done ? "sealed ✓" : `${size} · ${pct}%`}
        </span>
      </div>
      <div className="progress-track mt-2">
        <div className={`progress-fill ${done ? "" : "indeterminate"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Sidebar() {
  const items = [
    { icon: ArrowUpFromLine, label: "Send", active: true },
    { icon: ArrowDownToLine, label: "Receive", active: false },
    { icon: Clock3, label: "History", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];
  return (
    <aside className="hidden w-[150px] shrink-0 flex-col border-r border-white/8 bg-white/2 p-2.5 sm:flex">
      <div className="flex items-center gap-2 px-1.5 pb-4 pt-1">
        <LogoMark size={18} />
        <span className="text-[12px] font-semibold text-ink">AerLynk</span>
      </div>
      <nav className="flex flex-col gap-0.5">
        {items.map(({ icon: Icon, label, active }) => (
          <span key={label} className={`nav-item-mock ${active ? "active" : ""}`}>
            <Icon size={13} aria-hidden />
            {label}
          </span>
        ))}
      </nav>
      <div className="mt-auto rounded-lg border border-white/8 bg-white/3 p-2">
        <div className="flex items-center gap-1.5 text-[10.5px] text-ink-2">
          <Wifi size={11} className="text-mint" aria-hidden />
          Wi-Fi 5
        </div>
        <div className="mt-0.5 font-mono text-[9.5px] text-ink-3">192.168.1.24</div>
      </div>
    </aside>
  );
}

function TitleBar() {
  return (
    <div className="flex items-center gap-3 border-b border-white/8 bg-white/3 px-4 py-2.5">
      <div className="traffic flex gap-2" aria-hidden>
        <span className="bg-[#ff5f57]" />
        <span className="bg-[#febc2e]" />
        <span className="bg-[#28c840]" />
      </div>
      <span className="flex-1 text-center text-[11.5px] font-medium text-ink-3">AerLynk</span>
      <span className="hidden font-mono text-[10px] text-ink-3 md:block">192.168.1.24:52841</span>
    </div>
  );
}

function SendMain() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5">
      <div className="rounded-xl border border-white/8 bg-white/3">
        <QrCardMock hint="Waiting for your phone — scan to download" />
      </div>
      <div className="flex flex-col gap-2">
        <FileRow name="quarterly-report.pdf" size="24.8 MB" pct={100} done />
        <FileRow name="aerlynk-demos-4k.mov" size="1.9 GB" pct={64} />
        <FileRow name="incident-0142.png" size="8.1 MB" pct={0} />
      </div>
    </div>
  );
}

function ReceiveMain() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5">
      <div className="rounded-xl border border-white/8 bg-white/3">
        <QrCardMock hint="Waiting for the phone — scan to upload" />
      </div>
      <div className="flex flex-col gap-2">
        <FileRow name="IMG_2026_0829.jpg" size="4.2 MB" pct={100} done />
        <FileRow name="field-notes.md" size="12 KB" pct={38} />
      </div>
      <div className="rounded-xl border border-amber/20 bg-amber/8 p-2.5 text-[11px] text-amber">
        Uploads land in quarantine and are authenticated before release.
      </div>
    </div>
  );
}

function HistoryMain() {
  const rows = [
    { dir: "↑", name: "aerlynk-0.1.1-setup.exe", meta: "82.4 MB · to phone · today 14:02" },
    { dir: "↓", name: "IMG_2026_0829.jpg", meta: "4.2 MB · from phone · today 09:41" },
    { dir: "↑", name: "group-photo-final.png", meta: "11.7 MB · to phone · yesterday" },
    { dir: "↓", name: "recording-042.m4a", meta: "38.0 MB · from phone · yesterday" },
  ];
  return (
    <div className="min-w-0 flex-1 p-3.5">
      <div className="mb-2.5 text-[12.5px] font-semibold text-ink">History</div>
      <div className="flex flex-col gap-1.5">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-3 rounded-lg border border-white/6 bg-white/3 px-3 py-2.5">
            <span className={`font-mono text-[12px] ${r.dir === "↑" ? "text-accent" : "text-mint"}`}>{r.dir}</span>
            <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink-2">{r.name}</span>
            <span className="hidden flex-none font-mono text-[10px] text-ink-3 sm:block">{r.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * A faithful recreation of the real desktop app window — sidebar, QR card with
 * radar pulses, pairing code, and live file rows.
 */
export function AppWindow({ variant = "send", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <div className={`mac-window edge-lit ${className}`}>
      <TitleBar />
      {/* min-height instead of fixed height: the QR card + file rows need more
          than 300px once the sidebar collapses, so let the window grow. */}
      <div className="flex min-h-[300px] sm:min-h-[330px]">
        <Sidebar />
        {variant === "send" && <SendMain />}
        {variant === "receive" && <ReceiveMain />}
        {variant === "history" && <HistoryMain />}
      </div>
    </div>
  );
}

