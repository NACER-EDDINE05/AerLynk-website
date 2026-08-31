"use client";

import { useState } from "react";
import { AppWindow } from "@/components/AppWindow";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const TABS = [
  { id: "send", label: "Send", caption: "Pick files. AerLynk stages them, generates a session, and shows a QR with the key sealed inside its fragment." },
  { id: "receive", label: "Receive", caption: "Or flip it around — the phone scans, uploads, and every payload lands in quarantine before it is authenticated." },
  { id: "history", label: "History", caption: "Every transfer, both directions, with sizes and outcomes. Locally stored — there is no 'cloud sync' to disable." },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Showcase() {
  const [tab, setTab] = useState<TabId>("send");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <section id="showcase" className="relative overflow-hidden py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Product tour"
          title="One window. Two devices."
          highlight="Zero setup."
          description="This is the actual interface — the glassy 'atmosphere' theme, the radar that pulses while a phone is being sought, the pairing code shown on both screens."
        />

        <Reveal animation="animotion-blur-reveal">
          <div
            role="tablist"
            aria-label="App views"
            className="mx-auto mb-8 flex w-fit rounded-xl border border-white/10 bg-white/4 p-1"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                aria-controls="showcase-panel"
                id={`showcase-tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`rounded-lg px-5 py-2 text-[13.5px] font-medium transition-all duration-200 ${
                  tab === t.id
                    ? "bg-gradient-to-br from-accent to-accent-2 text-white shadow-[0_2px_12px_rgb(47_107_255/0.45)]"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal animation="animotion-zoom-in" delay={120}>
          <div
            id="showcase-panel"
            role="tabpanel"
            aria-labelledby={`showcase-tab-${tab}`}
            className="group relative mx-auto max-w-[860px] transition-transform duration-500 ease-out hover:scale-[1.015]"
          >
            <div
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(50% 60% at 30% 20%, rgb(47 107 255 / 0.14), transparent 70%), radial-gradient(45% 55% at 75% 75%, rgb(0 190 255 / 0.09), transparent 70%)",
              }}
              aria-hidden
            />
            <div key={tab} className="animotion-fade-in-up">
              <AppWindow variant={tab} />
            </div>
            <p className="mx-auto mt-6 max-w-xl text-center text-[14px] leading-relaxed text-ink-2">
              {active.caption}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
