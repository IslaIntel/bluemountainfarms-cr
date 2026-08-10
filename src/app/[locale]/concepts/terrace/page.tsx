import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@bluemountain/brand";
import { TerraceLanding } from "../../../../components/concepts/TerraceLanding";
import { terraceCopy } from "../../../../lib/concept-copy";
import {
  breadcrumbNode,
  conceptMetadata,
  faqNode,
  grocerNode,
  recipeNode,
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
  const c = terraceCopy[locale];
  return conceptMetadata({
    locale,
    path: "/concepts/terrace",
    title: c.meta.title,
    description: c.meta.description,
    keywords: [...c.meta.keywords],
    image: "/images/Hibiscus-07.jpg",
  });
}

export default async function TerracePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = pick(raw);
  const c = terraceCopy[locale];

  /* The editorial direction's real SEO bet is the recipe: it is the one node on
     this site that can win its own result rather than competing for the store's. */
  return (
    <>
      <JsonLd
        data={[
          websiteNode(locale),
          grocerNode(locale),
          recipeNode(locale, {
            name: c.recipe.title,
            description: c.recipe.description,
            ingredients: [...c.recipe.ingredients],
            steps: c.recipe.steps.map((step) => ({ ...step })),
            yield: c.recipe.yield,
            totalTime: "PT40M",
            image: "/images/gen-harvest-crate.png",
          }),
          faqNode([...c.faq.items]),
          breadcrumbNode(locale, [
            { name: "Home", path: "" },
            { name: "Terrace", path: "/concepts/terrace" },
          ]),
        ]}
      />
      <TerraceLanding locale={locale} />
    </>
  );
}
