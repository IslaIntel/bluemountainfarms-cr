"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerScrollTrigger } from "../../lib/motion";

registerScrollTrigger();

export type ScrollThemerProps = {
  children: React.ReactNode;
  /** Colour behind the first and last sections, before any field takes over. */
  base: string;
  className?: string;
};

/**
 * Colour-field backdrop. Any descendant carrying `data-field-color="<css color>"`
 * hands its colour to a single fixed backdrop as it crosses the middle of the
 * viewport, so the whole page bed shifts instead of each section painting itself.
 */
export function ScrollThemer({ children, base, className }: ScrollThemerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const bed = bedRef.current;
    if (!root || !bed) return;

    const fields = Array.from(
      root.querySelectorAll<HTMLElement>("[data-field-color]"),
    );
    if (!fields.length) return;

    if (prefersReducedMotion()) {
      gsap.set(bed, { backgroundColor: base });
      return;
    }

    const ctx = gsap.context(() => {
      fields.forEach((field, i) => {
        const color = field.dataset.fieldColor || base;
        const previous = i === 0 ? base : fields[i - 1].dataset.fieldColor || base;

        gsap.to(bed, {
          backgroundColor: color,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: field,
            start: "top 60%",
            end: "top 25%",
            scrub: true,
            onLeaveBack: () => {
              gsap.to(bed, { backgroundColor: previous, duration: 0.4 });
            },
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [base]);

  return (
    <div ref={rootRef} className={className}>
      <div
        ref={bedRef}
        aria-hidden="true"
        // Positioned inline rather than with utilities: the bed has to sit behind
        // page content, and a consumer whose Tailwind build does not scan this
        // package would drop the classes and paint it over everything.
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -10,
          pointerEvents: "none",
          backgroundColor: base,
        }}
      />
      {children}
    </div>
  );
}
