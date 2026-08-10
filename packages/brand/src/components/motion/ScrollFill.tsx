"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerScrollTrigger } from "../../lib/motion";
import { cn } from "../../lib/cn";

registerScrollTrigger();

export type ScrollFillProps = {
  className?: string;
  color?: string;
  /** Fill direction. Vertical rails grow downward, horizontal ones rightward. */
  axis?: "y" | "x";
  start?: string;
  end?: string;
};

/**
 * A bar that fills in proportion to how far its parent has been scrolled
 * through. Position it absolutely inside a `relative` parent — the parent is
 * the trigger, so the fill always tracks the section it belongs to.
 */
export function ScrollFill({
  className,
  color = "currentColor",
  axis = "y",
  start = "top 65%",
  end = "bottom 60%",
}: ScrollFillProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prop = axis === "y" ? "scaleY" : "scaleX";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { [prop]: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { [prop]: 0 },
        {
          [prop]: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start,
            end,
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [prop, start, end]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(axis === "y" ? "origin-top" : "origin-left", className)}
      style={{
        backgroundColor: color,
        transform: axis === "y" ? "scaleY(0)" : "scaleX(0)",
      }}
    />
  );
}
