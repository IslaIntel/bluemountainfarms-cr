import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Reveal, SisterProperty } from "@bluemountain/brand";
import { WholesaleForm } from "./WholesaleForm";
import {
  COMMERCE_ENABLED,
  LIVE_SHOP_URL,
  featuredProducts,
  imgByRole,
  siteContent,
  withSeasonality,
} from "../lib/content";

export function HomePage({ locale }: { locale: "en" | "es" }) {
  const t = useTranslations();
  const hero = imgByRole("hero-atmosphere", "/images/gen-farm-rows.png");
  const place = "/images/Retreat-top-lot-4.jpg";
  const products = withSeasonality(featuredProducts(12));

  return (
    <>
      <section className="relative min-h-[88svh] overflow-hidden bg-[color:var(--ink)] text-[color:var(--cream)]">
        <Image
          src={hero}
          alt="Organic rows in the Blue Mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--ink)]/80 via-[color:var(--ink)]/45 to-transparent" />
        <div className="relative z-10 flex min-h-[88svh] items-end">
          <div className="container pb-16 pt-28">
            <p className="eyebrow text-[color:var(--sand)]">{t("hero.eyebrow")}</p>
            <Reveal as="h1" className="display mt-4 max-w-3xl">
              {t("hero.title")}
            </Reveal>
            <p className="mt-6 max-w-xl text-lg text-[color:var(--sand)]">
              {t("hero.body")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/box`} className="btn btn-primary">
                {t("hero.primary")}
              </Link>
              <a href="#wholesale" className="btn btn-ghost">
                {t("hero.secondary")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="rhythm" className="section">
        <div className="container">
          <p className="eyebrow">{t("rhythm.eyebrow")}</p>
          <h2 className="h2 mt-4 max-w-2xl">{t("rhythm.title")}</h2>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {siteContent.rhythm.map((step, i) => (
              <li
                key={step.title}
                className="border border-[color:var(--sand)] bg-[color:var(--surface)] p-8"
              >
                <span className="font-[family-name:var(--font-mono)] text-sm text-[color:var(--ochre)]">
                  0{i + 1}
                </span>
                <h3 className="h3 mt-4">{step.title}</h3>
                <p className="mt-4 text-[color:var(--muted)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="ready" className="section section-alt">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{t("ready.eyebrow")}</p>
              <h2 className="h2 mt-4">{t("ready.title")}</h2>
            </div>
            <a
              href={LIVE_SHOP_URL}
              className="btn btn-ghost"
              target="_blank"
              rel="noreferrer"
            >
              {t("ready.viewShop")}
            </a>
          </div>
          <div className="mt-12 flex gap-4 overflow-x-auto pb-4">
            {products.map((p) => (
              <article
                key={p.id}
                className={`min-w-[220px] max-w-[240px] flex-shrink-0 border border-[color:var(--sand)] bg-[color:var(--surface)] p-4 ${
                  p.inSeason ? "" : "opacity-50"
                }`}
              >
                <div className="relative mb-4 aspect-square overflow-hidden bg-[color:var(--ground-alt)]">
                  <Image
                    src={
                      p.categories.includes("Coffee")
                        ? "/images/gen-coffee-cherries.png"
                        : p.categories.includes("Bread")
                          ? "/images/gen-bread-still.png"
                          : "/images/gen-harvest-crate.png"
                    }
                    alt=""
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
                <p className="eyebrow text-[color:var(--stone)]">
                  {p.categories[0] || "Produce"}
                </p>
                <h3 className="mt-2 text-base font-medium leading-snug">
                  {p.name}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-mono)] text-sm">
                  {p.inSeason
                    ? `$${p.price.toFixed(2)}`
                    : `${t("ready.outOfSeason")} ${p.returnMonth}`}
                </p>
                {COMMERCE_ENABLED ? (
                  <Link
                    href={`/${locale}/product/${p.slug}`}
                    className="mt-4 inline-block text-sm underline"
                  >
                    View
                  </Link>
                ) : (
                  <a
                    href={p.permalink || LIVE_SHOP_URL}
                    className="mt-4 inline-block text-sm underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Order
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={place} alt="Farm landscape" fill className="object-cover" sizes="50vw" />
          </div>
          <div>
            <p className="eyebrow">{t("place.eyebrow")}</p>
            <h2 className="h2 mt-4">{t("place.title")}</h2>
            <p className="mt-6 text-lg text-[color:var(--muted)]">
              {t("place.body")}
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <p className="eyebrow">{t("growers.eyebrow")}</p>
          <h2 className="h2 mt-4">{t("growers.title")}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {siteContent.growers.map((g) => (
              <article
                key={g.name}
                className="border border-[color:var(--sand)] bg-[color:var(--surface)] p-8"
              >
                <h3 className="h3">{g.name}</h3>
                <p className="mt-2 font-[family-name:var(--font-mono)] text-sm text-[color:var(--ochre)]">
                  {g.focus}
                </p>
                <p className="mt-4 text-[color:var(--muted)]">{g.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="wholesale" className="section section-ink">
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">{t("wholesale.eyebrow")}</p>
            <h2 className="h2 mt-4">{t("wholesale.title")}</h2>
            <p className="mt-6 text-[color:var(--sand)]">{t("wholesale.body")}</p>
            <ul className="mt-8 space-y-2 font-[family-name:var(--font-mono)] text-sm text-[color:var(--sand)]">
              <li>Harvest Mon & Thu · Delivery Tue & Fri</li>
              <li>Zones: Nosara · Sámara · Nicoya · surrounds</li>
              <li>WhatsApp standing orders welcome</li>
            </ul>
          </div>
          <WholesaleForm />
        </div>
      </section>

      <SisterProperty
        from="farms"
        locale={locale}
        imageSrc="/images/TheRetreat.47.jpg"
      />
    </>
  );
}
