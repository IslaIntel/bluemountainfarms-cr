"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerScrollTrigger } from "../../lib/motion";
import { cn } from "../../lib/cn";

registerScrollTrigger();

export type CountUpProps = {
  to: number;
  from?: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Locale used for grouping separators. */
  locale?: string;
};

/** Tabular number that counts up once when it enters the viewport. */
export function CountUp({
  to,
  from = 0,
  decimals = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  className,
  locale = "en-US",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const format = useCallback(
    (value: number) =>
      `${prefix}${value.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`,
    [prefix, suffix, decimals, locale],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = format(to);
      return;
    }

    const counter = { value: from };
    el.textContent = format(from);

    // Anything already on screen counts up straight away. Waiting for a
    // ScrollTrigger would leave it reading `from` until the reader scrolls,
    // which looks like a broken figure rather than an animation.
    const onScreen = el.getBoundingClientRect().top <= window.innerHeight * 0.92;

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(counter.value);
        },
        scrollTrigger: onScreen
          ? undefined
          : { trigger: el, start: "top 92%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [to, from, duration, format]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {/* Renders the final figure so the markup is truthful without JS; the
          effect rewinds to `from` right before it animates. */}
      {format(to)}
    </span>
  );
}
