"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, registerScrollTrigger } from "../../lib/motion";
import { cn } from "../../lib/cn";

registerScrollTrigger();

export type HorizontalReelProps = {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  /** Scrub smoothing in seconds. */
  scrub?: number;
};

/**
 * Pins a section and converts vertical scroll into horizontal travel across the
 * track. Below the `md` breakpoint (and under reduced-motion) the pin is skipped
 * and the track degrades to a native swipeable row.
 */
export function HorizontalReel({
  children,
  className,
  trackClassName,
  scrub = 0.6,
}: HorizontalReelProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [swipe, setSwipe] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (prefersReducedMotion()) {
      setSwipe(true);
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      setSwipe(false);
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { x: 0 });
      };
    });

    mm.add("(max-width: 767px)", () => {
      setSwipe(true);
    });

    return () => mm.revert();
  }, [scrub]);

  return (
    <div ref={sectionRef} className={cn("relative overflow-hidden", className)}>
      <div
        ref={trackRef}
        className={cn(
          "flex",
          swipe
            ? "w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
            : "w-max",
          trackClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
