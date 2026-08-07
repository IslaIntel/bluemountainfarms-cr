import { useTranslations } from "next-intl";
import { LIVE_SHOP_URL } from "../lib/content";

export function SiteFooter({ locale }: { locale: "en" | "es" }) {
  const t = useTranslations("footer");
  return (
    <footer className="section-ink">
      <div className="container grid gap-8 py-14 md:grid-cols-3">
        <div>
          <p className="eyebrow text-[color:var(--mist)]">Blue Mountain Farms</p>
          <p className="mt-3 max-w-sm text-[color:var(--sand)]">{t("tagline")}</p>
        </div>
        <div>
          <a href={LIVE_SHOP_URL} className="block hover:underline">
            {t("shop")}
          </a>
          <a href={`/${locale}/box`} className="mt-2 block hover:underline">
            Box builder
          </a>
        </div>
        <div>
          <a
            href={process.env.NEXT_PUBLIC_RETREAT_URL || "https://theretreat.cr"}
            className="hover:underline"
          >
            {t("retreat")}
          </a>
        </div>
      </div>
      <div className="container border-t border-white/10 py-6 text-xs text-[color:var(--sand)]">
        © {new Date().getFullYear()} Blue Mountain Farms
      </div>
    </footer>
  );
}
