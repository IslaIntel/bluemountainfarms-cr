import { getTranslations, setRequestLocale } from "next-intl/server";
import { COMMERCE_ENABLED, LIVE_SHOP_URL } from "../../../lib/content";

export default async function BoxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("box");

  return (
    <section className="section pt-16">
      <div className="container max-w-3xl">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="h2 mt-4">{t("title")}</h1>
        <p className="mt-6 text-[color:var(--muted)]">{t("body")}</p>
        <div className="mt-10 rounded-2xl border border-dashed border-[color:var(--sand)] bg-[color:var(--surface)] p-8">
          <p className="font-[family-name:var(--font-mono)] text-sm text-[color:var(--stone)]">
            commerceEnabled = {String(COMMERCE_ENABLED)}
          </p>
          <p className="mt-4 text-[color:var(--muted)]">
            Phase 2 will open a Mon/Thu harvest shopping window, pre-fill a cart
            from peak produce, and close at the Wed/Sun 6pm cutoff — wired to the
            existing WooCommerce Store API.
          </p>
          <a
            href={LIVE_SHOP_URL}
            className="btn btn-primary mt-8"
            target="_blank"
            rel="noreferrer"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
