"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switcherCopy } from "../../lib/concept-copy";

const links = [
  { slug: "market", key: "a" },
  { slug: "ledger", key: "b" },
  { slug: "terrace", key: "c" },
] as const;

/** Floating direction switcher. Present on the previews only. */
export function ConceptSwitcher({ locale }: { locale: "en" | "es" }) {
  const t = switcherCopy[locale];
  const pathname = usePathname() || "";
  const isHub = pathname.endsWith("/concepts");

  return (
    <nav
      aria-label={t.label}
      className="fixed bottom-4 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/12 bg-[#14432c]/94 p-1 text-[0.62rem] tracking-[0.1em] text-white/60 uppercase shadow-[0_10px_40px_rgba(12,30,20,0.4)] backdrop-blur-xl"
    >
      <span className="hidden px-3 text-[0.58rem] tracking-[0.18em] text-white/35 sm:inline">
        {t.label}
      </span>
      {links.map((link) => {
        const active = pathname.includes(`/concepts/${link.slug}`);
        return (
          <Link
            key={link.slug}
            href={`/${locale}/concepts/${link.slug}`}
            className={`rounded-full px-3 py-2 transition sm:px-4 ${
              active
                ? "bg-[#c8dd6a] font-semibold text-[#14432c]"
                : "hover:bg-white/10 hover:text-white"
            }`}
          >
            {t[link.key]}
          </Link>
        );
      })}
      <Link
        href={`/${locale}/concepts`}
        className={`ml-0.5 rounded-full border-l border-white/12 px-3 py-2 pl-4 transition sm:px-4 ${
          isHub ? "bg-[#c8dd6a] font-semibold text-[#14432c]" : "hover:bg-white/10 hover:text-white"
        }`}
      >
        {t.hub}
      </Link>
    </nav>
  );
}
