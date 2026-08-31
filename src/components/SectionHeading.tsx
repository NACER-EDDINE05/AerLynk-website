import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Highlighted tail of the title, rendered with the accent gradient. */
  highlight?: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, highlight, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Reveal animation="animotion-fade-in-up">
        <p className="eyebrow mb-4">{eyebrow}</p>
      </Reveal>
      <Reveal animation="animotion-fade-in-up" delay={90}>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
          {title}
          {highlight && <span className="accent-gradient"> {highlight}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal animation="animotion-fade-in-up" delay={180}>
          <p className="mt-5 text-pretty text-[16.5px] leading-relaxed text-ink-2">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
