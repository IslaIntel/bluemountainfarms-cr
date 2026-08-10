"use client";

import { useRef } from "react";
import { EASE, gsap, prefersReducedMotion, registerScrollTrigger } from "../../lib/motion";
import { useMotionEffect } from "../../lib/use-motion-effect";
import { cn } from "../../lib/cn";

registerScrollTrigger();

type Mode = "word" | "line" | "char";

export type SplitTextProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "blockquote" | "figcaption";
  children: string;
  className?: string;
  /** Granularity of the stagger. Lines are soft-wrapped at `wrapAt` characters. */
  mode?: Mode;
  stagger?: number;
  delay?: number;
  duration?: number;
  /** Rise distance in em units, relative to the element's own font size. */
  rise?: number;
  wrapAt?: number;
  /** Animate on mount instead of waiting for the element to scroll into view. */
  immediate?: boolean;
};

function splitInto(text: string, mode: Mode, wrapAt: number) {
  if (mode === "char") return Array.from(text);
  if (mode === "word") return text.trim().split(/\s+/);

  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > wrapAt && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Masked stagger reveal. Each token sits in an overflow-hidden box and rises
 * into place, so the text appears to be wiped up from behind the layout.
 *
 * The offset is applied by GSAP rather than by an inline style, for two reasons:
 * the server-rendered markup stays fully legible if JavaScript never arrives,
 * and GSAP keeps the percentage unit it started from. Hiding via inline
 * `translateY(105%)` looks identical but leaves the token stranded — the
 * computed transform is a pixel matrix, so animating `yPercent` back to zero
 * moves nothing.
 */
export function SplitText({
  as: Tag = "div",
  children,
  className,
  mode = "line",
  stagger = 0.075,
  delay = 0,
  duration = 0.9,
  rise = 1.05,
  wrapAt = 34,
  immediate = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useMotionEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const tokens = el.querySelectorAll<HTMLElement>("[data-split-token]");
    if (!tokens.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tokens,
        { yPercent: rise * 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          ease: EASE.out,
          stagger,
          clearProps: "transform,opacity",
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start: "top 88%", once: true } }),
        },
      );
    }, el);

    return () => ctx.revert();
  }, [children, mode, stagger, delay, duration, rise, immediate]);

  const tokens = splitInto(children, mode, wrapAt);
  const block = mode === "line";

  return (
    <Tag ref={ref as never} className={cn(className)} aria-label={children}>
      {tokens.map((token, i) => (
        <span
          key={`${token}-${i}`}
          aria-hidden="true"
          style={{
            display: block ? "block" : "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          <span data-split-token style={{ display: "inline-block" }}>
            {token}
            {!block && i < tokens.length - 1 && mode === "word" ? "\u00a0" : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}
