"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerScrollTrigger } from "../../lib/motion";
import { cn } from "../../lib/cn";

registerScrollTrigger();

export type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertical drift across the scroll range, in percent of the element height. */
  y?: number;
  /** Scale at the start of the range, easing to 1 at the end. */
  fromScale?: number;
  /** Scale at the end of the range. */
  toScale?: number;
  /** Opacity at the start of the range. */
  fromOpacity?: number;
  start?: string;
  end?: string;
};

/**
 * Scroll-scrubbed drift/zoom for full-bleed media. Wrap the media, not the
 * section, and give the wrapper a larger footprint than its container so the
 * drift never reveals an edge.
 */
export function Parallax({
  children,
  className,
  y = 12,
  fromScale = 1,
  toScale = 1,
  fromOpacity = 1,
  start = "top bottom",
  end = "bottom top",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -y / 2, scale: fromScale, opacity: fromOpacity },
        {
          yPercent: y / 2,
          scale: toScale,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start, end, scrub: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, fromScale, toScale, fromOpacity, start, end]);

  return (
    <div ref={ref} className={cn("h-full w-full will-change-transform", className)}>
      {children}
    </div>
  );
}
