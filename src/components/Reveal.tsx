"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Extra classes for layout. */
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  /** Animotion entrance class to apply when in view. */
  animation?: string;
};

/**
 * Scroll-triggered entrance. Renders children hidden until the element enters
 * the viewport, then plays the given Animotion class once. Falls back to
 * instantly visible under `prefers-reduced-motion` or without IntersectionObserver.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  animation = "animotion-blur-reveal",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined = shown && delay > 0 ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <div ref={ref} className={`${shown ? animation : "opacity-0"} ${className}`} style={style}>
      {children}
    </div>
  );
}
