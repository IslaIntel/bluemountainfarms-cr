"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CountUp, Faq, StaggerGroup } from "@bluemountain/brand";
import { WholesaleForm } from "../WholesaleForm";
import { ConceptLocale } from "./ConceptLocale";
import {
  COMMERCE_ENABLED,
  LIVE_SHOP_URL,
  siteCatalog,
  siteContent,
} from "../../lib/content";
import { translateCategory, translateProductName } from "../../lib/i18n-products";
import { formatDay, formatTime, nextHarvestWindow } from "../../lib/harvest";
import { marketCopy } from "../../lib/concept-copy";
import { DELIVERY_AREA, RETREAT_URL } from "../../lib/seo";

/**
 * Direction A — Market.
 *
 * Design principle: conversion over atmosphere. The catalogue is the hero, the
 * next order cutoff is always on screen, and every card carries a price and a
 * way to buy. Motion is functional only — a ticking countdown and grid
 * stagger — because anything decorative here competes with the buy button.
 */

const GREEN = "#14432c";
const LIME = "#6f9e33";

type MarketCopy = (typeof marketCopy)["en" | "es"];

const CATEGORY_IMAGE: Record<string, string> = {
  Coffee: "/images/gen-coffee-cherries.png",
  Bread: "/images/gen-bread-still.png",
  Flour: "/images/gen-bread-still.png",
  Tortilla: "/images/gen-bread-still.png",
};

function productImage(categories: readonly string[]) {
  for (const category of categories) {
    if (CATEGORY_IMAGE[category]) return CATEGORY_IMAGE[category];
  }
  return "/images/gen-harvest-crate.png";
}

/** The categories a household actually shops, in the order they shop them. */
const SHOP_ORDER = [
  "Greens",
  "Fruits",
  "Bulbs and Roots",
  "Mushrooms",
  "Squash",
  "Eggs",
  "Dairy",
  "Bread",
  "Coffee",
  "Beans",
  "Jams",
  "Spices",
];

export function MarketLanding({ locale }: { locale: "en" | "es" }) {
  const c = marketCopy[locale];

  // Only the categories in SHOP_ORDER: the raw catalogue also carries things
  // like pet food, which have no business in a "what's ready this week" grid.
  const shoppable = useMemo(
    () =>
      siteCatalog.products.filter(
        (p) =>
          p.price > 0 &&
          p.isInStock &&
          p.categories.some((cat) => SHOP_ORDER.includes(cat)),
      ),
    [],
  );

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    shoppable.forEach((p) =>
      p.categories.forEach((cat) => counts.set(cat, (counts.get(cat) ?? 0) + 1)),
    );
    return SHOP_ORDER.filter((cat) => counts.has(cat)).map((cat) => ({
      name: cat,
      count: counts.get(cat) ?? 0,
    }));
  }, [shoppable]);

  const [active, setActive] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (active) {
      return shoppable.filter((p) => p.categories.includes(active)).slice(0, 12);
    }

    // Unfiltered, deal one product from each category in turn so the grid reads
    // like a week's harvest rather than twelve varieties of leaf.
    const byCategory = SHOP_ORDER.map((cat) =>
      shoppable.filter((p) => p.categories.includes(cat)),
    );

    const spread: typeof shoppable = [];
    const taken = new Set<string>();
    for (let round = 0; spread.length < 12 && round < 12; round += 1) {
      for (const bucket of byCategory) {
        const next = bucket[round];
        if (!next || taken.has(next.slug)) continue;
        taken.add(next.slug);
        spread.push(next);
        if (spread.length === 12) break;
      }
    }

    return spread;
  }, [shoppable, active]);

  return (
    <div className="bg-[#fbfaf6] text-[#14201a] [font-family:var(--font-inter),ui-sans-serif,system-ui]">
      <CutoffBar locale={locale} copy={c} />

      {/* ---------------------------------------------------------- nav ---- */}
      <header className="sticky top-0 z-[65] border-b border-black/8 bg-[#fbfaf6]/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-6 px-5 lg:px-8">
          <Link
            href={`/${locale}`}
            className="text-[1.05rem] leading-tight font-bold tracking-[-0.02em] [font-family:var(--font-grotesk),sans-serif]"
          >
            Blue Mountain
            <span className="block text-[0.62rem] font-medium tracking-[0.18em] uppercase opacity-50">
              Farms
            </span>
          </Link>
          <nav
            className="hidden items-center gap-7 text-[0.82rem] font-medium lg:flex"
            aria-label={c.nav.shop}
          >
            <a href="#catalog" className="hover:text-[color:var(--lime)]" style={{ ["--lime" as string]: LIME }}>
              {c.nav.shop}
            </a>
            <a href="#how" className="hover:opacity-60">{c.nav.how}</a>
            <a href="#box" className="hover:opacity-60">{c.nav.box}</a>
            <a href="#wholesale" className="hover:opacity-60">{c.nav.wholesale}</a>
          </nav>
          <div className="flex items-center gap-4">
            <ConceptLocale
              locale={locale}
              className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase"
            />
            <a
              href={LIVE_SHOP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg px-5 py-2.5 text-[0.8rem] font-semibold text-white transition hover:opacity-90"
              style={{ background: GREEN }}
            >
              {c.nav.order}
            </a>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------- hero ---- */}
      <section className="border-b border-black/8">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <p
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.12em] text-white uppercase"
              style={{ background: LIME }}
            >
              {c.hero.eyebrow}
            </p>
            <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.035em] [font-family:var(--font-grotesk),sans-serif]">
              {c.hero.title}
            </h1>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed opacity-70">
              {c.hero.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/box`}
                className="rounded-lg px-7 py-4 text-[0.88rem] font-semibold text-white transition hover:opacity-90"
                style={{ background: GREEN }}
              >
                {c.hero.primary}
              </Link>
              <a
                href="#catalog"
                className="rounded-lg border-2 border-black/15 px-7 py-4 text-[0.88rem] font-semibold transition hover:border-black/40"
              >
                {c.hero.secondary}
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f2eee6]">
            <Image
              src="/images/gen-farm-rows.png"
              alt="Rows of certified organic vegetables at Blue Mountain Farms in the Blue Mountains of Guanacaste"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- trust ---- */}
      <section className="border-b border-black/8" style={{ background: GREEN }}>
        <dl className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-8 px-5 py-10 text-white lg:grid-cols-4 lg:px-8">
          {c.trust.map((item) => (
            <div key={item.label}>
              <dd className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none font-bold [font-family:var(--font-grotesk),sans-serif]">
                {item.value}
              </dd>
              <dt className="mt-2 text-[0.72rem] font-medium tracking-[0.1em] uppercase opacity-70">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ------------------------------------------------------ catalog ---- */}
      <section id="catalog" className="border-b border-black/8 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[0.7rem] font-bold tracking-[0.16em] uppercase" style={{ color: LIME }}>
                {c.catalog.eyebrow}
              </p>
              <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight font-bold tracking-[-0.03em] [font-family:var(--font-grotesk),sans-serif]">
                {c.catalog.title}
              </h2>
              <p className="mt-3 text-sm opacity-60">{c.catalog.note}</p>
            </div>
            <p className="text-sm opacity-60">
              <CountUp to={shoppable.length} /> {c.catalog.countLabel}
            </p>
          </div>

          {/* Filter chips run over the real catalogue, not a curated subset. */}
          <div className="mt-9 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-pressed={active === null}
              className={`rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition ${
                active === null
                  ? "border-transparent text-white"
                  : "border-black/15 hover:border-black/40"
              }`}
              style={active === null ? { background: GREEN } : undefined}
            >
              {c.catalog.all}
            </button>
            {categories.map((category) => {
              const on = active === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setActive(category.name)}
                  aria-pressed={on}
                  className={`rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition ${
                    on ? "border-transparent text-white" : "border-black/15 hover:border-black/40"
                  }`}
                  style={on ? { background: GREEN } : undefined}
                >
                  {translateCategory(category.name, locale)}
                  <span className="ml-2 opacity-50">{category.count}</span>
                </button>
              );
            })}
          </div>

          {visible.length === 0 ? (
            <p className="mt-12 text-sm opacity-60">{c.catalog.empty}</p>
          ) : (
            <StaggerGroup
              key={active ?? "all"}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              y={16}
              stagger={0.04}
            >
              {visible.map((product) => (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition hover:-translate-y-0.5 hover:border-black/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#f2eee6]">
                    <Image
                      src={productImage(product.categories)}
                      alt={translateProductName(product.name, locale)}
                      fill
                      sizes="(max-width: 640px) 50vw, 22vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase opacity-45">
                      {translateCategory(product.categories[0], locale)}
                    </p>
                    <h3 className="mt-1.5 flex-1 text-[0.92rem] leading-snug font-semibold">
                      {translateProductName(product.name, locale)}
                    </h3>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <p className="text-[1.05rem] font-bold [font-family:var(--font-grotesk),sans-serif]">
                        ${product.price.toFixed(2)}
                      </p>
                      {COMMERCE_ENABLED ? (
                        <Link
                          href={`/${locale}/product/${product.slug}`}
                          className="rounded-md px-3 py-1.5 text-[0.72rem] font-semibold text-white"
                          style={{ background: LIME }}
                        >
                          {c.catalog.view}
                        </Link>
                      ) : (
                        <a
                          href={product.permalink || LIVE_SHOP_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md px-3 py-1.5 text-[0.72rem] font-semibold text-white"
                          style={{ background: LIME }}
                        >
                          {c.catalog.order}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </StaggerGroup>
          )}

          <a
            href={LIVE_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-lg border-2 border-black/15 px-6 py-3.5 text-[0.85rem] font-semibold transition hover:border-black/40"
          >
            {c.catalog.viewShop} →
          </a>
        </div>
      </section>

      {/* ---------------------------------------------------------- box ---- */}
      <section id="box" className="border-b border-black/8 bg-[#f2eee6] px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.16em] uppercase" style={{ color: LIME }}>
              {c.box.eyebrow}
            </p>
            <h2 className="mt-3 max-w-[20ch] text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight font-bold tracking-[-0.03em] [font-family:var(--font-grotesk),sans-serif]">
              {c.box.title}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed opacity-70">{c.box.body}</p>
            <ul className="mt-7 space-y-3">
              {c.box.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[0.95rem]">
                  <span
                    aria-hidden
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: LIME }}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/box`}
                className="rounded-lg px-7 py-4 text-[0.88rem] font-semibold text-white transition hover:opacity-90"
                style={{ background: GREEN }}
              >
                {c.box.primary}
              </Link>
              <a
                href={LIVE_SHOP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border-2 border-black/15 px-7 py-4 text-[0.88rem] font-semibold transition hover:border-black/40"
              >
                {c.box.secondary}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/gen-harvest-crate.png"
              alt="A weekly organic box packed with greens, roots and seasonal fruit from Blue Mountain Farms"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- how ---- */}
      <section id="how" className="border-b border-black/8 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[0.7rem] font-bold tracking-[0.16em] uppercase" style={{ color: LIME }}>
            {c.how.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight font-bold tracking-[-0.03em] [font-family:var(--font-grotesk),sans-serif]">
            {c.how.title}
          </h2>
          <StaggerGroup as="ol" className="mt-10 grid gap-4 md:grid-cols-3">
            {siteContent.rhythm.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-black/10 bg-white p-7"
              >
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[0.85rem] font-bold text-white [font-family:var(--font-grotesk),sans-serif]"
                  style={{ background: GREEN }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 text-[1.15rem] leading-snug font-bold tracking-[-0.02em] [font-family:var(--font-grotesk),sans-serif]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed opacity-70">{step.body}</p>
              </li>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* -------------------------------------------------------- zones ---- */}
      <section className="border-b border-black/8 px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.16em] uppercase" style={{ color: LIME }}>
              {c.zones.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.7rem,3.2vw,2.4rem)] leading-tight font-bold tracking-[-0.03em] [font-family:var(--font-grotesk),sans-serif]">
              {c.zones.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed opacity-70">
              {c.zones.body}
            </p>
          </div>
          <StaggerGroup as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-3" y={14}>
            {DELIVERY_AREA.map((zone) => (
              <li
                key={zone}
                className="rounded-xl border border-black/10 bg-white px-5 py-4 text-[0.92rem] font-semibold"
              >
                {zone}
              </li>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------------------------------------------------- wholesale ---- */}
      <section id="wholesale" className="border-b border-black/8 px-5 py-16 text-white lg:px-8" style={{ background: GREEN }}>
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.16em] uppercase opacity-70">
              {c.wholesale.eyebrow}
            </p>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight font-bold tracking-[-0.03em] [font-family:var(--font-grotesk),sans-serif]">
              {c.wholesale.title}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed opacity-75">{c.wholesale.body}</p>
            <a
              href={siteContent.wholesale.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-lg bg-white px-6 py-3.5 text-[0.85rem] font-semibold transition hover:opacity-90"
              style={{ color: GREEN }}
            >
              {c.wholesale.whatsapp}
            </a>
          </div>
          <div className="rounded-2xl bg-white/8 p-6 [&_input]:text-white [&_select]:text-white [&_textarea]:text-white">
            <WholesaleForm />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- faq ---- */}
      <section className="border-b border-black/8 px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.16em] uppercase" style={{ color: LIME }}>
              {c.faq.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.7rem,3.2vw,2.4rem)] leading-tight font-bold tracking-[-0.03em] [font-family:var(--font-grotesk),sans-serif]">
              {c.faq.title}
            </h2>
          </div>
          <Faq
            items={c.faq.items}
            className="space-y-3"
            itemClassName="rounded-xl border border-black/10 bg-white px-6"
            questionClassName="py-5 text-[1rem] font-semibold"
            answerClassName="pb-6 max-w-2xl text-[0.92rem] leading-relaxed opacity-70"
          />
        </div>
      </section>

      {/* ------------------------------------------------------- footer ---- */}
      <footer className="px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-3">
          <div>
            <p className="text-[0.62rem] font-bold tracking-[0.16em] uppercase opacity-45">
              {locale === "es" ? "Propiedad hermana" : "Sister property"}
            </p>
            <a href={RETREAT_URL} className="mt-2 block font-semibold underline underline-offset-4">
              The Retreat at Blue Mountain Farms
            </a>
          </div>
          <p className="text-sm opacity-60">{c.footer.tagline}</p>
          <p className="text-[0.62rem] font-bold tracking-[0.14em] uppercase opacity-45 md:text-right">
            {c.footer.concept}
          </p>
        </div>
      </footer>
    </div>
  );
}

/**
 * Sticky cutoff bar. The countdown is the one piece of motion that earns its
 * place here: it is the reason to order today rather than Thursday.
 */
function CutoffBar({
  locale,
  copy,
}: {
  locale: "en" | "es";
  copy: MarketCopy;
}) {
  const [state, setState] = useState<{
    remaining: string;
    delivery: string;
    harvest: string;
  } | null>(null);

  useEffect(() => {
    const tick = () => {
      const { harvest, cutoff, delivery } = nextHarvestWindow();
      const ms = Math.max(0, cutoff.getTime() - Date.now());
      const totalMinutes = Math.floor(ms / 60000);
      const days = Math.floor(totalMinutes / 1440);
      const hours = Math.floor((totalMinutes % 1440) / 60);
      const minutes = totalMinutes % 60;
      const seconds = Math.floor((ms % 60000) / 1000);

      setState({
        remaining:
          days > 0
            ? `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`
            : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
        delivery: formatDay(delivery, locale),
        harvest: `${formatDay(harvest, locale)} · ${formatTime(harvest, locale)}`,
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [locale]);

  return (
    <div className="text-white" style={{ background: "#0f2f20" }}>
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-2.5 text-[0.78rem] lg:px-8">
        <p className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: LIME }}
          />
          <span className="font-semibold">{copy.hero.countdownLabel}</span>
          <span className="tabular-nums [font-family:var(--font-jetbrains),monospace]">
            {state?.remaining ?? "—"}
          </span>
        </p>
        <p className="opacity-75">
          <span className="font-semibold">{copy.hero.deliveryLabel}:</span>{" "}
          {state?.delivery ?? "—"}
        </p>
        <p className="hidden opacity-60 sm:block">
          <span className="font-semibold">{copy.hero.harvestLabel}:</span>{" "}
          {state?.harvest ?? "—"}
        </p>
      </div>
    </div>
  );
}
