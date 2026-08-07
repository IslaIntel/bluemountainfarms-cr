"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LIVE_SHOP_URL } from "../lib/content";

export function SiteHeader({ locale }: { locale: "en" | "es" }) {
  const t = useTranslations("nav");
  const links = [
    { href: `#rhythm`, label: t("how") },
    { href: `#ready`, label: t("ready") },
    { href: `#wholesale`, label: t("wholesale") },
    { href: `/${locale}/shop`, label: t("shop") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--sand)] bg-[color:var(--ground)]/95 backdrop-blur">
      <div className="container flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Link href={`/${locale}`} className="eyebrow text-[color:var(--primary)]">
          Blue Mountain Farms
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="eyebrow hover:opacity-70">
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={LIVE_SHOP_URL} className="btn btn-primary !min-h-10 !px-4" target="_blank" rel="noreferrer">
          {t("order")}
        </a>
      </div>
    </header>
  );
}
