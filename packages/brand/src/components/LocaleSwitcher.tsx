"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/cn";

export function LocaleSwitcher({
  locale,
  className,
}: {
  locale: "en" | "es";
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/");
  const other = locale === "en" ? "es" : "en";

  if (segments[1] === "en" || segments[1] === "es") {
    segments[1] = other;
  } else {
    segments.splice(1, 0, other);
  }

  const href = segments.join("/") || `/${other}`;

  return (
    <Link
      href={href}
      className={cn(
        "eyebrow inline-flex items-center gap-2 hover:text-[color:var(--ink)]",
        className,
      )}
      aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
    >
      <span className={locale === "en" ? "text-[color:var(--ink)]" : ""}>EN</span>
      <span aria-hidden>/</span>
      <span className={locale === "es" ? "text-[color:var(--ink)]" : ""}>ES</span>
    </Link>
  );
}
