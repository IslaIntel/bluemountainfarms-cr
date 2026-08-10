"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import { cn } from "../../lib/cn";

export type MarqueeProps = {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
  /** Seconds for one full pass of the track. */
  speed?: number;
  reverse?: boolean;
};

/**
 * Seamless ticker. The item list is rendered twice and the track is translated
 * by exactly half its width, so the loop has no visible seam.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  separator = "·",
  speed = 26,
  reverse = false,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration: speed,
          ease: "none",
          repeat: -1,
        },
      );
    }, track);

    return () => ctx.revert();
  }, [speed, reverse, items.length]);

  const doubled = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden="true">
      <div ref={trackRef} className="flex w-max items-center">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className={cn("flex items-center", itemClassName)}>
            {item}
            <span className="px-[0.6em] opacity-50">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
