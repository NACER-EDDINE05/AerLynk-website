"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Download, Github } from "lucide-react";
import { AppWindow } from "@/components/AppWindow";
import { PhoneMockup } from "@/components/PhoneMockup";
import { Terminal } from "@/components/Terminal";
import { Reveal } from "@/components/Reveal";
import { builtWithChips } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Hero: staggered text reveal, a 3D-tilted app window with mouse parallax,
 * floating glass chips, the phone client, and a live terminal.
 */
export function Hero() {
  const sceneRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const el = sceneRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        const win = windowRef.current;
        if (win) {
          win.style.transform = `perspective(1400px) rotateX(${(-ny * 3).toFixed(2)}deg) rotateY(${(nx * 5).toFixed(2)}deg) translate3d(${(nx * 10).toFixed(1)}px, ${(ny * 8).toFixed(1)}px, 0)`;
        }
        const phone = phoneRef.current;
        if (phone) {
          phone.style.transform = `translate3d(${(nx * -18).toFixed(1)}px, ${(ny * -14).toFixed(1)}px, 0)`;
        }
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf.current);
      for (const el of [windowRef.current, phoneRef.current]) {
        if (el) el.style.transform = "";
      }
    };

    const host = sceneRef.current;
    host?.addEventListener("mousemove", onMove);
    host?.addEventListener("mouseleave", onLeave);
    return () => {
      host?.removeEventListener("mousemove", onMove);
      host?.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const smooth = useCallback(
    (ms = 550) => ({ transition: `transform ${ms}ms cubic-bezier(0.16, 1, 0.3, 1)` }),
    [],
  );

  return (
    <section id="top" ref={sceneRef} className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <div className="hero-glow" aria-hidden />
      <div className="wrap relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal animation="animotion-fade-in-up">
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="chip chip-accent animotion-float mb-7 inline-flex"
            >
              <span className="pulse-dot" aria-hidden />
              Open source · MIT · v{site.version}
            </a>
          </Reveal>

          <Reveal animation="animotion-blur-reveal" delay={100}>
            <h1 className="text-balance text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[56px] lg:text-[68px]">
              Your files never <br className="hidden sm:block" />
              leave <span className="text-gradient">your network.</span>
            </h1>
          </Reveal>

          <Reveal animation="animotion-fade-in-up" delay={220}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-[16.5px] leading-relaxed text-ink-2 sm:text-[18px]">
              AirLynk moves files between your PC and any phone on the same Wi-Fi. Every byte is
              encrypted with AES-256-GCM before it leaves the device — the key travels only inside
              the QR code. No accounts. No cloud. No phone app.
            </p>
          </Reveal>

          <Reveal animation="animotion-fade-in-up" delay={340}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/download" className="btn btn-primary h-12! px-7! text-[15px]">
                <Download size={17} aria-hidden />
                Download
              </Link>
              <a
                href={site.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary h-12! px-6! text-[15px]"
              >
                <Github size={17} aria-hidden />
                Star on GitHub
              </a>
            </div>
          </Reveal>

          <Reveal animation="animotion-fade-in-up" delay={440}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
              {builtWithChips.map((chip) => (
                <span key={chip} className="chip font-mono text-[11.5px]!">
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Product scene */}
        <Reveal animation="animotion-clip-wipe-up" delay={260} className="relative mt-20">
          <div className="relative mx-auto max-w-[860px]">
            {/* Phone, tucked beside the window on the right */}
            <div
              ref={phoneRef}
              className="absolute -right-16 -top-10 z-20 hidden lg:block xl:-right-24"
              style={smooth(900)}
            >
              <div className="float-y-slow">
                <PhoneMockup className="rotate-3" />
              </div>
            </div>

            {/* Desktop window */}
            <div ref={windowRef} style={smooth(300)}>
              <AppWindow variant="send" />
            </div>

            {/* Terminal */}
            <div className="relative z-10 mx-auto mt-8 max-w-[680px]">
              <Terminal />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
