import { Braces, GraduationCap, Microscope, Briefcase, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { audiences } from "@/lib/content";

const ICONS = {
  developers: Braces,
  students: GraduationCap,
  researchers: Microscope,
  professionals: Briefcase,
  teams: Users,
} as const;

export function BuiltFor() {
  return (
    <section id="built-for" className="relative py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Built for"
          title="Anyone with a PC,"
          highlight="a phone, and a wall between them."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => {
            const Icon = ICONS[a.id as keyof typeof ICONS];
            const wide = i === 4;
            return (
              <li key={a.id} className={wide ? "sm:col-span-2 lg:col-span-1" : ""}>
                <Reveal animation="animotion-fade-in-up" delay={(i % 3) * 100} className="h-full">
                  <div className="glass group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-accent-2 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                        <Icon size={17} aria-hidden />
                      </span>
                      <h3 className="text-[16px] font-semibold tracking-tight text-ink">{a.title}</h3>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-ink-2">{a.body}</p>
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
