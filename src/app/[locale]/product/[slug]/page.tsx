import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LIVE_SHOP_URL, getProduct } from "../../../../lib/content";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <section className="section pt-16">
      <div className="container max-w-3xl">
        <Link href={`/${locale}/shop`} className="eyebrow">
          ← Shop
        </Link>
        <h1 className="h2 mt-4">{product.name}</h1>
        <p className="mt-4 font-[family-name:var(--font-mono)]">
          ${product.price.toFixed(2)} {product.currency}
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-4">
          <div>
            <dt className="eyebrow">Categories</dt>
            <dd className="mt-2">{product.categories.join(", ") || "—"}</dd>
          </div>
          <div>
            <dt className="eyebrow">SKU / ID</dt>
            <dd className="mt-2 font-[family-name:var(--font-mono)] text-sm">
              {product.id}
            </dd>
          </div>
        </dl>
        {product.description && (
          <p className="mt-8 text-[color:var(--muted)]">{product.description}</p>
        )}
        <a
          href={product.permalink || LIVE_SHOP_URL}
          className="btn btn-primary mt-10"
          target="_blank"
          rel="noreferrer"
        >
          Order on live shop
        </a>
      </div>
    </section>
  );
}
