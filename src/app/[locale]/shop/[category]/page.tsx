import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  LIVE_SHOP_URL,
  productsByCategory,
  siteCatalog,
} from "../../../../lib/content";
import { categoryToSlug, slugToCategory } from "../../../../lib/slugs";
import {
  translateCategory,
  translateProductName,
} from "../../../../lib/i18n-products";

export function generateStaticParams() {
  return siteCatalog.categories.flatMap((category) =>
    ["en", "es"].map((locale) => ({
      locale,
      category: categoryToSlug(category),
    })),
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: slug } = await params;
  setRequestLocale(locale);
  const loc = locale as "en" | "es";
  const category = slugToCategory(slug, siteCatalog.categories);
  if (!category) notFound();
  const products = productsByCategory(category);

  return (
    <section className="section pt-16">
      <div className="container">
        <Link href={`/${locale}/shop`} className="eyebrow">
          ← Shop
        </Link>
        <h1 className="h2 mt-4">{translateCategory(category, loc)}</h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.id}
              className="border border-[color:var(--sand)] bg-[color:var(--surface)] p-5"
            >
              <h2 className="text-lg font-medium">
                {translateProductName(p.name, loc)}
              </h2>
              <p className="mt-2 font-[family-name:var(--font-mono)] text-sm">
                ${p.price.toFixed(2)} {p.currency}
              </p>
              {p.shortDescription && (
                <p className="mt-3 text-sm text-[color:var(--muted)]">
                  {p.shortDescription}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link href={`/${locale}/product/${p.slug}`} className="underline">
                  Details
                </Link>
                <a
                  href={p.permalink || LIVE_SHOP_URL}
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Order on live shop
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
