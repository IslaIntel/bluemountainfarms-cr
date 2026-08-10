import { cn } from "../lib/cn";

export type FaqItem = { q: string; a: string };

export type FaqProps = {
  items: readonly FaqItem[];
  className?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  /** Leaves the first entry open so the answer text is visible on load. */
  openFirst?: boolean;
};

/**
 * Native disclosure list. Answers stay in the DOM whether open or closed, which
 * is what lets the matching FAQPage structured data be honest.
 */
export function Faq({
  items,
  className,
  itemClassName,
  questionClassName,
  answerClassName,
  openFirst = true,
}: FaqProps) {
  return (
    <div className={cn(className)}>
      {items.map((item, i) => (
        <details
          key={item.q}
          open={openFirst && i === 0}
          className={cn("group", itemClassName)}
        >
          <summary
            className={cn(
              "flex cursor-pointer list-none items-baseline justify-between gap-6 [&::-webkit-details-marker]:hidden",
              questionClassName,
            )}
          >
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className={cn(answerClassName)}>{item.a}</div>
        </details>
      ))}
    </div>
  );
}
