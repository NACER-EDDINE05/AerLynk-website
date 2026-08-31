import { Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/lib/content";

/**
 * Placeholder voices, clearly flagged as development demo content —
 * to be replaced with real quotes once AirLynk has users.
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28">
      <div className="wrap">
        <SectionHeading eyebrow="Word of mouth" title="What it feels like" highlight="to skip the cloud." />

        <Reveal animation="animotion-fade-in-up" className="mb-10 flex justify-center">
          <span className="chip border-amber/25 bg-amber/8 text-amber!">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
            Demo content — shown during development
          </span>
        </Reveal>

        <ul className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.name}>
              <Reveal animation="animotion-fade-in-up" delay={i * 110} className="h-full">
                <figure className="glass flex h-full flex-col rounded-2xl p-7">
                  <Quote size={20} className="mb-4 text-accent" aria-hidden />
                  <blockquote className="flex-1 text-[14.5px] leading-relaxed text-ink-2">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-[13px] font-semibold text-white">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-[13.5px] font-medium text-ink">{t.name}</span>
                      <span className="block text-[12px] text-ink-3">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
