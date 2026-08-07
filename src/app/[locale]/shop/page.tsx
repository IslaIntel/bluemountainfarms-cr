import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import {
  COMMERCE_ENABLED,
  LIVE_SHOP_URL,
  siteCatalog,
} from "../../../lib/content";
import { categoryToSlug } from "../../../lib/slugs";
import { translateCategory } from "../../../lib/i18n-products";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as "en" | "es";

  return (
    <section className="section pt-16">
      <div className="container">
        <p className="eyebrow">Catalog</p>
        <h1 className="h2 mt-4">
          {siteCatalog.count} products · {siteCatalog.categories.length}{" "}
          categories
        </h1>
        {!COMMERCE_ENABLED && (
          <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
            Headless checkout is staged for phase 2. Browse categories here, then
            complete orders on the live WooCommerce shop.
          </p>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          {siteCatalog.categories.map((cat) => (
            <Link
              key={cat}
              href={`/${locale}/shop/${categoryToSlug(cat)}`}
              className="rounded-full border border-[color:var(--sand)] px-4 py-2 text-sm hover:border-[color:var(--ochre)]"
            >
              {translateCategory(cat, loc)}
            </Link>
          ))}
        </div>
        <a
          href={LIVE_SHOP_URL}
          className="btn btn-primary mt-10"
          target="_blank"
          rel="noreferrer"
        >
          Open live shop
        </a>
      </div>
    </section>
  );
}
