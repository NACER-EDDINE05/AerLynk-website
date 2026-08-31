import { ArrowLeftRight, FileCheck2, Flame, QrCode, Radar, ShieldCheck, Smartphone, Waypoints } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { features } from "@/lib/content";

const ICONS = {
  phone: Smartphone,
  cipher: ShieldCheck,
  code: QrCode,
  arrows: ArrowLeftRight,
  stream: Waypoints,
  radar: Radar,
  shield: FileCheck2,
  flame: Flame,
} as const;

export function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Features"
          title="Everything it does, it does"
          highlight="on your terms."
          description="No accounts to create, no cloud to trust, no cables to find. Just a sealed, direct line between the two devices you already own."
        />

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = ICONS[feature.visual];
            return (
              <li key={feature.id}>
                <Reveal animation="animotion-fade-in-up" delay={(i % 4) * 90} className="h-full">
                  <div className="group glass relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/16 hover:shadow-[0_28px_70px_rgb(0_0_0/0.55),0_0_40px_rgb(91_140_255/0.12)]">
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden
                    />
                    <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-accent/25 to-accent-2/10 text-accent-2 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={18} aria-hidden />
                    </span>
                    <h3 className="mb-2 text-[16.5px] font-semibold tracking-tight text-ink">
                      {feature.title}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-ink-2">{feature.body}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
