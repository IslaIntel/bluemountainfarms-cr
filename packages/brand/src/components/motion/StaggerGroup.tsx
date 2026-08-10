"use client";

import { useEffect, useRef } from "react";
import { EASE, gsap, prefersReducedMotion, registerScrollTrigger } from "../../lib/motion";
import { cn } from "../../lib/cn";

registerScrollTrigger();

export type StaggerGroupProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl" | "section" | "tbody";
  /** Rise distance in pixels. */
  y?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  /** Restrict the animation to descendants matching this selector. */
  select?: string;
};

/**
 * Staggers the group's direct children into view. Use `select` when the items
 * are nested (table rows inside a body, list items inside a wrapper, etc).
 */
export function StaggerGroup({
  children,
  className,
  as: Tag = "div",
  y = 22,
  stagger = 0.08,
  duration = 0.8,
  delay = 0,
  select,
}: StaggerGroupProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = select
      ? Array.from(el.querySelectorAll<HTMLElement>(select))
      : Array.from(el.children).filter((c): c is HTMLElement => c instanceof HTMLElement);
    if (!items.length) return;

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, stagger, duration, delay, select]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
