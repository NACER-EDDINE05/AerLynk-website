import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { steps } from "@/lib/content";

/**
 * Vertical timeline with a connector that draws itself in as the section
 * enters the viewport (CSS stroke-dash animation via .timeline-in).
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps between"
          highlight="here and sealed."
          description="No pairing mode, no sync accounts, no discovery handshake to debug. The whole flow is one QR away."
        />

        <Reveal animation="animotion-fade-in-up" className="timeline-in">
          <ol className="relative mx-auto max-w-2xl">
            {/* Animated connector */}
            <svg
              className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-[2px] overflow-visible"
              viewBox="0 0 2 1"
              preserveAspectRatio="none"
              aria-hidden
            >
              <line
                className="timeline-line"
                x1="1"
                y1="0"
                x2="1"
                y2="1"
                stroke="url(#tl-grad)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="1"
                strokeDashoffset="1"
                pathLength={1}
              />
              <defs>
                <linearGradient id="tl-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#5b8cff" />
                  <stop offset="1" stopColor="#2fd0ff" />
                </linearGradient>
              </defs>
            </svg>

            {steps.map((step, i) => (
              <li key={step.id} className="relative pb-12 last:pb-0">
                <Reveal animation="animotion-fade-in-left" delay={i * 120}>
                  <div className="flex items-start gap-5">
                    <span className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-accent/30 bg-bg font-mono text-[13px] font-semibold text-accent shadow-[0_0_24px_rgb(91_140_255/0.25)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="pt-2 text-[19px] font-semibold tracking-tight text-ink">{step.title}</h3>
                      <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-2">{step.body}</p>
                      <code className="mt-3 inline-block rounded-md border border-white/10 bg-white/4 px-2.5 py-1 font-mono text-[11.5px] text-accent-2">
                        {step.detail}
                      </code>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
