"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, registerScrollTrigger } from "../../lib/motion";
import { useMotionEffect } from "../../lib/use-motion-effect";
import { cn } from "../../lib/cn";

registerScrollTrigger();

const FROM: Record<string, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  center: "inset(50% 0% 50% 0%)",
};

export type ClipRevealProps = {
  children: React.ReactNode;
  className?: string;
  from?: keyof typeof FROM;
  duration?: number;
  delay?: number;
  /** Counter-scales the inner content so the media settles rather than snapping. */
  settle?: boolean;
};

/**
 * Curtain-style clip-path reveal for images and media blocks. The curtain is
 * closed on mount rather than in the server markup, so the media is still there
 * for a crawler or a visitor whose JavaScript never runs.
 */
export function ClipReveal({
  children,
  className,
  from = "up",
  duration = 1.15,
  delay = 0,
  settle = true,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useMotionEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const inner = el.firstElementChild;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        delay,
      });
      tl.fromTo(el, { clipPath: FROM[from] }, { clipPath: "inset(0% 0% 0% 0%)" });
      if (settle && inner) {
        tl.fromTo(inner, { scale: 1.14 }, { scale: 1, duration: duration * 1.25 }, 0);
      }
    }, el);

    return () => ctx.revert();
  }, [from, duration, delay, settle]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
