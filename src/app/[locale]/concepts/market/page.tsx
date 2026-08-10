import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@bluemountain/brand";
import { MarketLanding } from "../../../../components/concepts/MarketLanding";
import { marketCopy } from "../../../../lib/concept-copy";
import { siteCatalog } from "../../../../lib/content";
import {
  breadcrumbNode,
  conceptMetadata,
  faqNode,
  grocerNode,
  itemListNode,
  offerCatalogNode,
  productNodes,
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
  const c = marketCopy[locale];
  return conceptMetadata({
    locale,
    path: "/concepts/market",
    title: c.meta.title,
    description: c.meta.description,
    keywords: [...c.meta.keywords],
    image: "/images/gen-harvest-crate.png",
  });
}

export default async function MarketPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = pick(raw);
  const c = marketCopy[locale];

  /* Commerce-first, so the structured data is commerce-first too: real products
     with real prices, the category tree, and the list the page actually shows. */
  const shoppable = siteCatalog.products.filter(
    (p) => p.price > 0 && p.isInStock && p.categories.length > 0,
  );
  const featured = shoppable.slice(0, 12);

  const counts = new Map<string, number>();
  shoppable.forEach((p) =>
    p.categories.forEach((cat) => counts.set(cat, (counts.get(cat) ?? 0) + 1)),
  );
  const categories = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <>
      <JsonLd
        data={[
          websiteNode(locale),
          grocerNode(locale),
          offerCatalogNode(locale, categories),
          ...productNodes(featured, locale),
          itemListNode(locale, c.catalog.title, featured),
          faqNode([...c.faq.items]),
          breadcrumbNode(locale, [
            { name: "Home", path: "" },
            { name: "Market", path: "/concepts/market" },
          ]),
        ]}
      />
      <MarketLanding locale={locale} />
    </>
  );
}
