"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/lib/content";

/**
 * Accessible accordion: buttons with aria-expanded/aria-controls, animated
 * height via grid-template-rows (cheap, no JS measuring).
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="FAQ"
          title="The questions"
          highlight="security people actually ask."
        />

        <div className="mx-auto max-w-2xl">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} animation="animotion-fade-in-up" delay={i * 60}>
                <div className="glass mb-3 overflow-hidden rounded-2xl">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15.5px] font-medium text-ink transition-colors hover:text-accent-2"
                    >
                      {item.q}
                      <Plus
                        size={17}
                        aria-hidden
                        className={`flex-none text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[14px] leading-relaxed text-ink-2">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
