"use client";

import { useEffect, useRef } from "react";
import { gsap, registerScrollTrigger } from "../../lib/motion";
import { cn } from "../../lib/cn";

registerScrollTrigger();

export type ScrollProgressProps = {
  className?: string;
  color?: string;
  height?: number;
};

/** Reading-progress rule pinned to the top of the viewport. */
export function ScrollProgress({
  className,
  color = "currentColor",
  height = 2,
}: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    }, bar);

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-x-0 top-0 z-[80]", className)}
      style={{ height }}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{ backgroundColor: color, transform: "scaleX(0)" }}
      />
    </div>
  );
}
