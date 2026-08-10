import type { Metadata } from "next";
import { LIVE_SHOP_URL, siteCatalog, siteContent } from "./content";

export type Locale = "en" | "es";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bluemountainfarms.cr";

export const RETREAT_URL =
  process.env.NEXT_PUBLIC_RETREAT_URL || "https://theretreat.cr";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

function localeAlternates(path: string) {
  const clean = path.replace(/^\/(en|es)/, "");
  return {
    en: absoluteUrl(`/en${clean}`),
    es: absoluteUrl(`/es${clean}`),
    "x-default": absoluteUrl(`/en${clean}`),
  };
}

export type ConceptMetaInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  index?: boolean;
};

export function conceptMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  image,
  index = false,
}: ConceptMetaInput): Metadata {
  const url = absoluteUrl(`/${locale}${path}`);
  const ogImage = absoluteUrl(image ?? "/images/gen-farm-rows.png");

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url, languages: localeAlternates(path) },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: "website",
      url,
      siteName: siteContent.meta.title,
      title,
      description,
      locale: locale === "es" ? "es_CR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_CR",
      images: [{ url: ogImage, width: 1200, height: 900, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Chinampas",
  addressRegion: "Guanacaste",
  addressCountry: "CR",
} as const;

/** Delivery footprint — the towns the refrigerated routes actually reach. */
export const DELIVERY_AREA = [
  "Sámara",
  "Nosara",
  "Nicoya",
  "Playa Carrillo",
  "Garza",
  "Guanacaste",
];

/**
 * Harvest Monday and Thursday, delivery Tuesday and Friday. Expressed as
 * opening-hours specifications so the schedule is machine-readable rather than
 * buried in prose.
 */
const DELIVERY_DAYS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["https://schema.org/Tuesday", "https://schema.org/Friday"],
    opens: "08:00",
    closes: "16:00",
  },
];

export function grocerNode(locale: Locale) {
  const description =
    locale === "es"
      ? "Orgánicos certificados de la Zona Azul cultivados en las Montañas Azules de Guanacaste — cosechados lunes y jueves, entregados martes y viernes en toda la península de Nicoya."
      : siteContent.meta.description;

  return {
    "@type": "GroceryStore",
    "@id": `${SITE_URL}/#farm`,
    name: siteContent.meta.title,
    description,
    url: absoluteUrl(`/${locale}`),
    address: ADDRESS,
    image: [absoluteUrl("/images/gen-farm-rows.png"), absoluteUrl("/images/gen-harvest-crate.png")],
    priceRange: "$$",
    currenciesAccepted: "USD, CRC",
    paymentAccepted: "Cash, Card, Bank transfer",
    availableLanguage: ["en", "es"],
    areaServed: DELIVERY_AREA.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: DELIVERY_DAYS,
    hasDeliveryMethod: "https://schema.org/OnSitePickup",
    sameAs: [LIVE_SHOP_URL],
    parentOrganization: {
      "@type": "Organization",
      name: "Blue Mountain Farms",
      url: SITE_URL,
    },
  };
}

/** The category tree, so the shop's structure is legible without crawling it. */
export function offerCatalogNode(
  locale: Locale,
  categories: { name: string; count: number }[],
) {
  return {
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/#catalog`,
    name: locale === "es" ? "Catálogo de la finca" : "Farm catalogue",
    url: absoluteUrl(`/${locale}/shop`),
    numberOfItems: siteCatalog.products.length,
    itemListElement: categories.map((category, i) => ({
      "@type": "OfferCatalog",
      position: i + 1,
      name: category.name,
      numberOfItems: category.count,
    })),
  };
}

type CatalogProduct = (typeof siteCatalog.products)[number];

/** Real products with real prices — the strongest commerce signal available. */
export function productNodes(products: CatalogProduct[], locale: Locale) {
  return products.map((product) => ({
    "@type": "Product",
    "@id": `${SITE_URL}/#product-${product.id}`,
    name: product.name,
    description:
      product.shortDescription?.replace(/<[^>]*>/g, "").trim() ||
      product.description?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim() ||
      product.name,
    category: product.categories[0] || "Organic produce",
    url: product.permalink || absoluteUrl(`/${locale}/product/${product.slug}`),
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: product.currency || "USD",
      availability: product.isInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@id": `${SITE_URL}/#farm` },
    },
  }));
}

export function itemListNode(
  locale: Locale,
  name: string,
  products: CatalogProduct[],
) {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: product.name,
      url: product.permalink || absoluteUrl(`/${locale}/product/${product.slug}`),
    })),
  };
}

export function faqNode(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbNode(locale: Locale, trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: absoluteUrl(`/${locale}${step.path}`),
    })),
  };
}

export type RecipeInput = {
  name: string;
  description: string;
  ingredients: string[];
  steps: { name: string; text: string }[];
  yield: string;
  totalTime: string;
  image?: string;
};

/**
 * A single seasonal recipe. For a produce brand this is one of the few schema
 * types that can earn its own SERP surface, so the editorial direction uses it.
 */
export function recipeNode(locale: Locale, recipe: RecipeInput) {
  return {
    "@type": "Recipe",
    name: recipe.name,
    description: recipe.description,
    image: [absoluteUrl(recipe.image ?? "/images/gen-harvest-crate.png")],
    author: { "@id": `${SITE_URL}/#farm` },
    inLanguage: locale === "es" ? "es-CR" : "en-US",
    recipeYield: recipe.yield,
    totalTime: recipe.totalTime,
    recipeCategory: locale === "es" ? "Plato principal" : "Main",
    recipeCuisine: "Costa Rican",
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
    })),
  };
}

export function websiteNode(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteContent.meta.title,
    inLanguage: locale === "es" ? "es-CR" : "en-US",
    publisher: { "@id": `${SITE_URL}/#farm` },
  };
}
