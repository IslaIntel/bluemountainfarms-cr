"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Locale toggle that inherits its colour from the surrounding design. The shared
 * `LocaleSwitcher` hardcodes an ink active state, which disappears on the darker
 * concepts, so each variant styles this one instead.
 */
export function ConceptLocale({
  locale,
  className = "",
  activeClassName = "opacity-100",
  idleClassName = "opacity-45",
}: {
  locale: "en" | "es";
  className?: string;
  activeClassName?: string;
  idleClassName?: string;
}) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/");
  const other = locale === "en" ? "es" : "en";

  if (segments[1] === "en" || segments[1] === "es") {
    segments[1] = other;
  } else {
    segments.splice(1, 0, other);
  }

  return (
    <Link
      href={segments.join("/") || `/${other}`}
      className={className}
      aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
    >
      <span className={locale === "en" ? activeClassName : idleClassName}>EN</span>
      <span aria-hidden className="mx-1 opacity-30">
        /
      </span>
      <span className={locale === "es" ? activeClassName : idleClassName}>ES</span>
    </Link>
  );
}
