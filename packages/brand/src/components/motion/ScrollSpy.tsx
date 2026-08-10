"use client";

import { useEffect, useRef } from "react";
import { cn } from "../../lib/cn";

export type ScrollSpyProps = {
  children: React.ReactNode;
  /** Selector for the steps to watch, relative to this wrapper. */
  select: string;
  onChange: (index: number) => void;
  className?: string;
  as?: "div" | "ol" | "ul" | "section";
  /** Fraction of the viewport height treated as the read line. */
  line?: number;
};

/**
 * Reports which step is currently at the read line. Uses IntersectionObserver
 * rather than a ScrollTrigger per step, so the cost stays flat no matter how
 * many steps there are.
 */
export function ScrollSpy({
  children,
  select,
  onChange,
  className,
  as: Tag = "div",
  line = 0.55,
}: ScrollSpyProps) {
  const ref = useRef<HTMLElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const steps = Array.from(el.querySelectorAll<HTMLElement>(select));
    if (!steps.length) return;

    const bottomMargin = Math.round((1 - line) * 100);
    const observer = new IntersectionObserver(
      (entries) => {
        // Take the last step that has crossed the read line.
        let best = -1;
        entries.forEach((entry) => {
          const index = steps.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting && index > best) best = index;
        });
        if (best >= 0) onChangeRef.current(best);
      },
      { rootMargin: `0px 0px -${bottomMargin}% 0px`, threshold: 0 },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [select, line]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
