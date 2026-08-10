import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@bluemountain/brand";
import { LedgerLanding } from "../../../../components/concepts/LedgerLanding";
import { ledgerCopy } from "../../../../lib/concept-copy";
import { siteCatalog } from "../../../../lib/content";
import {
  breadcrumbNode,
  conceptMetadata,
  faqNode,
  grocerNode,
  offerCatalogNode,
  websiteNode,
  type Locale,
} from "../../../../lib/seo";

function pick(locale: string): Locale {
  return locale === "es" ? "es" : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = pick((await params).locale);
  const c = ledgerCopy[locale];
  return conceptMetadata({
    locale,
    path: "/concepts/ledger",
    title: c.meta.title,
    description: c.meta.description,
    keywords: [...c.meta.keywords],
    image: "/images/gen-farm-rows.png",
  });
}

export default async function LedgerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = pick(raw);
  const c = ledgerCopy[locale];

  const counts = new Map<string, number>();
  siteCatalog.products.forEach((p) =>
    p.categories.forEach((cat) => counts.set(cat, (counts.get(cat) ?? 0) + 1)),
  );
  const categories = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  /* This direction sells process, so the schedule and the category tree are the
     assets worth making machine-readable — the buyer questions carry the rest. */
  return (
    <>
      <JsonLd
        data={[
          websiteNode(locale),
          grocerNode(locale),
          offerCatalogNode(locale, categories),
          faqNode([...c.faq.items]),
          breadcrumbNode(locale, [
            { name: "Home", path: "" },
            { name: "Ledger", path: "/concepts/ledger" },
          ]),
        ]}
      />
      <LedgerLanding locale={locale} />
    </>
  );
}
