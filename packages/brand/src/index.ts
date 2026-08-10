export { cn } from "./lib/cn";
export {
  ORBE_PROPERTY_CODE,
  ORBE_BASE,
  buildOrbeUrl,
  defaultStayDates,
  toInputDate,
  fromInputDate,
  type BookingIntent,
} from "./lib/booking";
export { SmoothScroll } from "./components/SmoothScroll";
export { Reveal } from "./components/Reveal";
export { SisterProperty } from "./components/SisterProperty";
export { LocaleSwitcher } from "./components/LocaleSwitcher";

/* Structured data + crawlable content primitives */
export { JsonLd, type JsonLdProps } from "./components/JsonLd";
export { Faq, type FaqItem, type FaqProps } from "./components/Faq";

/* Motion system */
export { prefersReducedMotion, registerScrollTrigger, EASE } from "./lib/motion";
export { SplitText, type SplitTextProps } from "./components/motion/SplitText";
export { Parallax, type ParallaxProps } from "./components/motion/Parallax";
export { ClipReveal, type ClipRevealProps } from "./components/motion/ClipReveal";
export { Marquee, type MarqueeProps } from "./components/motion/Marquee";
export { CountUp, type CountUpProps } from "./components/motion/CountUp";
export {
  HorizontalReel,
  type HorizontalReelProps,
} from "./components/motion/HorizontalReel";
export { ScrollThemer, type ScrollThemerProps } from "./components/motion/ScrollThemer";
export {
  ScrollProgress,
  type ScrollProgressProps,
} from "./components/motion/ScrollProgress";
export { StaggerGroup, type StaggerGroupProps } from "./components/motion/StaggerGroup";
export { ScrollFill, type ScrollFillProps } from "./components/motion/ScrollFill";
export { ScrollSpy, type ScrollSpyProps } from "./components/motion/ScrollSpy";
