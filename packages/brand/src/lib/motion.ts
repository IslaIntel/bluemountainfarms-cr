import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Idempotent plugin registration — safe to call from any client component. */
export function registerScrollTrigger() {
  if (registered) return ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return ScrollTrigger;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;

export { gsap, ScrollTrigger };
