"use client";

import { useEffect, useState } from "react";
import { LocaleSwitcher } from "@bluemountain/brand";
import { useTranslations } from "next-intl";
import { formatDay, formatTime, nextHarvestWindow } from "../lib/harvest";

export function HarvestBar({ locale }: { locale: "en" | "es" }) {
  const t = useTranslations("utility");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const tick = () => {
      const { harvest, cutoff } = nextHarvestWindow();
      setLabel(
        `${formatDay(harvest, locale)} · ${t("orderBy")} ${formatDay(cutoff, locale)} ${formatTime(cutoff, locale)}`,
      );
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [locale, t]);

  return (
    <div
      data-utility-bar
      className="border-b border-[color:var(--sand)] bg-[color:var(--ground-alt)]"
    >
      <div className="container flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
        <p className="eyebrow !normal-case !tracking-normal text-[color:var(--ink)]">
          {t("zones")}
        </p>
        <p className="font-[family-name:var(--font-mono)] text-xs md:text-sm">
          <span className="eyebrow mr-2">{t("nextHarvest")}</span>
          {label || "…"}
        </p>
        <LocaleSwitcher locale={locale} />
      </div>
    </div>
  );
}
