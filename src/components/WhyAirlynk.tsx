import { Check, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { airLynkPoints, alternatives } from "@/lib/content";

export function WhyAirlynk() {
  return (
    <section id="why" className="relative py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Why AirLynk"
          title="The middleman is"
          highlight="the vulnerability."
          description="Every conventional route between a PC and a phone adds a third party or a compromise. AirLynk removes the third party."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {alternatives.map((alt, i) => (
            <Reveal key={alt.name} animation="animotion-fade-in-up" delay={i * 110} className="h-full">
              <div className="glass h-full rounded-2xl p-7 opacity-90 transition-opacity duration-300 hover:opacity-100">
                <h3 className="text-[17px] font-semibold text-ink">{alt.name}</h3>
                <p className="mt-1 text-[13px] text-ink-3">{alt.price}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {alt.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-2">
                      <X size={15} className="mt-0.5 flex-none text-coral/80" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal animation="animotion-fade-in-up" delay={220} className="h-full">
            <div className="edge-lit relative h-full rounded-2xl bg-gradient-to-b from-accent/12 to-accent-2/6 p-px shadow-[0_0_60px_rgb(47_107_255/0.18)]">
              <div className="flex h-full flex-col rounded-2xl bg-[#0a0e18]/85 p-7 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-[17px] font-semibold text-ink">AirLynk</h3>
                  <span className="chip chip-accent h-6! px-2.5! font-mono text-[10.5px]!">the sealed courier</span>
                </div>
                <p className="mt-1 text-[13px] text-accent-2">Device to device. That's the whole route.</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {airLynkPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink">
                      <Check size={15} className="mt-0.5 flex-none text-mint" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
