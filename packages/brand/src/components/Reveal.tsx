"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../lib/cn";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  children: string;
  className?: string;
  delay?: number;
};

/**
 * Per-line clip-path wipe (Reschio pattern).
 * Visual lines are aria-hidden; full string lives in aria-label.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = el.querySelectorAll<HTMLElement>("[data-reveal-line]");

    if (reduce) {
      lines.forEach((line) => {
        line.style.clipPath = "inset(0 0 0 0)";
        line.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0 0 0)",
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [children, delay]);

  // Simple soft wrap into visual lines (~48 chars) for clip reveals.
  const words = children.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 42 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);

  return (
    <Tag
      ref={ref as never}
      className={cn(className)}
      aria-label={children}
    >
      {lines.map((line, i) => (
        <span
          key={`${line}-${i}`}
          data-reveal-line
          aria-hidden="true"
          style={{
            display: "block",
            overflow: "hidden",
            clipPath: "inset(100% 0 0 0)",
            opacity: 0,
          }}
        >
          {line}
        </span>
      ))}
    </Tag>
  );
}
