"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ClipReveal,
  Faq,
  Marquee,
  Parallax,
  SplitText,
  StaggerGroup,
} from "@bluemountain/brand";
import { ConceptLocale } from "./ConceptLocale";
import { LIVE_SHOP_URL, siteCatalog, siteContent } from "../../lib/content";
import { translateProductName } from "../../lib/i18n-products";
import { terraceCopy } from "../../lib/concept-copy";
import { RETREAT_URL } from "../../lib/seo";

/**
 * Direction C — Terrace.
 *
 * Design principle: appetite over information. Warm light, big serif, and
 * photography given room to be food rather than evidence. The catalogue is
 * still real, but it arrives as an editorial spread instead of a grid, and the
 * page ends on a recipe — the one thing a produce brand can rank for that a
 * competitor cannot simply copy.
 */

const PAPER = "#fbf3e6";
const INK = "#2a1c10";
const TERRACOTTA = "#bd4f26";
const OLIVE = "#4f5c2a";

const WHOLESALE_MAIL =
  "mailto:elizabethcannva@gmail.com?subject=Wholesale%20enquiry%20%E2%80%94%20Blue%20Mountain%20Farms";

/* Four hero-scale images, in the order the page uses them. */
const PLATES = [
  "/images/gen-harvest-crate.png",
  "/images/gen-farm-rows.png",
  "/images/gen-bread-still.png",
  "/images/gen-coffee-cherries.png",
];

export function TerraceLanding({ locale }: { locale: "en" | "es" }) {
  const c = terraceCopy[locale];

  /* The editorial spread wants a handful of things worth photographing, not the
     whole catalogue — greens and fruit first, then whatever else is in stock. */
  const spread = useMemo(() => {
    const pool = siteCatalog.products.filter((p) => p.price > 0 && p.isInStock);
    const preferred = ["Greens", "Fruits", "Bulbs and Roots", "Coffee", "Bread", "Eggs"];
    const picked: typeof pool = [];
    preferred.forEach((category) => {
      const match = pool.find(
        (p) => p.categories.includes(category) && !picked.includes(p),
      );
      if (match) picked.push(match);
    });
    pool.forEach((p) => {
      if (picked.length < 8 && !picked.includes(p)) picked.push(p);
    });
    return picked.slice(0, 8);
  }, []);

  const ticker = useMemo(
    () =>
      siteCatalog.products
        .filter((p) => p.isInStock)
        .slice(0, 18)
        .map((p) => translateProductName(p.name, locale)),
    [locale],
  );

  return (
    <div
      className="[font-family:var(--font-karla),ui-sans-serif,system-ui]"
      style={{ background: PAPER, color: INK }}
    >
      {/* ---------------------------------------------------------- nav ---- */}
      <header className="absolute inset-x-0 top-0 z-[70]">
        <div className="mx-auto flex h-20 w-full max-w-[1360px] items-center justify-between gap-6 px-5 lg:px-10">
          <Link
            href={`/${locale}`}
            className="text-[1.15rem] leading-none tracking-[-0.01em] text-[#fdf6e9] [font-family:var(--font-fraunces),serif]"
          >
            Blue Mountain
            <span className="mt-1 block text-[0.6rem] tracking-[0.3em] uppercase opacity-70 [font-family:var(--font-karla),sans-serif]">
              Farms
            </span>
          </Link>
          <nav
            className="hidden items-center gap-8 text-[0.78rem] tracking-[0.02em] text-[#fdf6e9]/80 lg:flex"
            aria-label={c.nav.table}
          >
            <a href="#table" className="hover:text-white">{c.nav.table}</a>
            <a href="#box" className="hover:text-white">{c.nav.box}</a>
            <a href="#growers" className="hover:text-white">{c.nav.growers}</a>
            <a href="#recipe" className="hover:text-white">{c.nav.recipe}</a>
          </nav>
          <div className="flex items-center gap-5">
            <ConceptLocale
              locale={locale}
              className="text-[0.68rem] tracking-[0.16em] text-[#fdf6e9]/70 uppercase"
            />
            <a
              href={LIVE_SHOP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#fdf6e9] px-5 py-2.5 text-[0.75rem] font-semibold tracking-[0.04em] transition hover:bg-white"
              style={{ color: INK }}
            >
              {c.nav.order}
            </a>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------- hero ---- */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <Parallax className="absolute inset-[-8%_0_-8%_0]" y={14} fromScale={1.08} toScale={1}>
          <Image
            src="/images/Hibiscus-07.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        {/* Warm sunlight rather than a flat scrim — the photograph stays food. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(42,28,16,0.62) 0%, rgba(42,28,16,0.18) 42%, rgba(42,28,16,0.72) 100%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[92vh] w-full max-w-[1360px] flex-col justify-end px-5 pt-32 pb-16 text-[#fdf6e9] lg:px-10 lg:pb-24">
          <p className="text-[0.68rem] tracking-[0.32em] uppercase opacity-75">
            {c.hero.eyebrow}
          </p>
          <SplitText
            as="h1"
            mode="line"
            wrapAt={26}
            rise={0.5}
            immediate
            className="mt-6 max-w-[19ch] text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[0.98] font-light tracking-[-0.03em] [font-family:var(--font-fraunces),serif]"
          >
            {c.hero.title}
          </SplitText>
          <p className="mt-8 max-w-xl text-[1.02rem] leading-[1.75] opacity-85">
            {c.hero.body}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/box`}
              className="rounded-full px-7 py-4 text-[0.85rem] font-semibold text-[#fdf6e9] transition hover:brightness-110"
              style={{ background: TERRACOTTA }}
            >
              {c.hero.primary}
            </Link>
            <a
              href="#table"
              className="rounded-full border border-[#fdf6e9]/45 px-7 py-4 text-[0.85rem] font-semibold transition hover:bg-[#fdf6e9] hover:text-[#2a1c10]"
            >
              {c.hero.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- ticker ---- */}
      <div
        className="border-y py-4"
        style={{ borderColor: "rgba(42,28,16,0.12)", background: "#f6e9d4" }}
      >
        <Marquee
          items={ticker}
          speed={44}
          separator="✳"
          className="text-[0.95rem]"
          itemClassName="tracking-[0.02em] [font-family:var(--font-fraunces),serif]"
        />
      </div>

      {/* -------------------------------------------------------- table ---- */}
      <section id="table" className="px-5 py-[clamp(4.5rem,10vh,7.5rem)] lg:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p
                className="text-[0.66rem] tracking-[0.28em] uppercase"
                style={{ color: TERRACOTTA }}
              >
                {c.table.eyebrow}
              </p>
              <SplitText
                as="h2"
                mode="line"
                wrapAt={20}
                className="mt-4 max-w-[16ch] text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.04] font-light tracking-[-0.025em] [font-family:var(--font-fraunces),serif]"
              >
                {c.table.title}
              </SplitText>
            </div>
            <p className="max-w-xl text-[1rem] leading-[1.8] opacity-70">
              {c.table.body}
            </p>
          </div>

          {/* Asymmetric spread: every third item runs wide, so the rhythm reads
              like a magazine page rather than a product grid. */}
          <StaggerGroup
            as="ul"
            y={26}
            stagger={0.07}
            className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6"
          >
            {spread.map((product, i) => {
              const wide = i % 5 === 0;
              return (
                <li
                  key={product.id}
                  className={wide ? "lg:col-span-4" : "lg:col-span-2"}
                >
                  <ClipReveal from={i % 2 ? "right" : "up"}>
                    <div
                      className={`relative overflow-hidden ${
                        wide ? "aspect-[16/10]" : "aspect-[4/5]"
                      }`}
                      style={{ background: "#efe0c8" }}
                    >
                      <Image
                        src={PLATES[i % PLATES.length]}
                        alt={translateProductName(product.name, locale)}
                        fill
                        sizes={wide ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 50vw, 30vw"}
                        className="object-cover"
                      />
                    </div>
                  </ClipReveal>
                  <div className="mt-5 flex items-baseline justify-between gap-4 border-t pt-4" style={{ borderColor: "rgba(42,28,16,0.16)" }}>
                    <h3 className="text-[1.15rem] leading-tight tracking-[-0.01em] [font-family:var(--font-fraunces),serif]">
                      {translateProductName(product.name, locale)}
                    </h3>
                    <span className="text-[0.9rem] tabular-nums opacity-60">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </li>
              );
            })}
          </StaggerGroup>

          <div className="mt-14 text-center">
            <a
              href={LIVE_SHOP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block border-b pb-1 text-[0.95rem] tracking-[0.02em] transition hover:opacity-60"
              style={{ borderColor: TERRACOTTA, color: TERRACOTTA }}
            >
              {c.table.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- box ---- */}
      <section
        id="box"
        className="px-5 py-[clamp(4.5rem,10vh,7.5rem)] lg:px-10"
        style={{ background: "#f2e4cc" }}
      >
        <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* The box treated as an object: one large photograph, held slightly
              off-square, with the contents listed beside it like a label. */}
          <ClipReveal from="left">
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image
                src="/images/gen-harvest-crate.png"
                alt={c.box.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </ClipReveal>

          <div>
            <p
              className="text-[0.66rem] tracking-[0.28em] uppercase"
              style={{ color: OLIVE }}
            >
              {c.box.eyebrow}
            </p>
            <SplitText
              as="h2"
              mode="line"
              wrapAt={22}
              className="mt-4 max-w-[18ch] text-[clamp(2rem,4vw,3.1rem)] leading-[1.06] font-light tracking-[-0.025em] [font-family:var(--font-fraunces),serif]"
            >
              {c.box.title}
            </SplitText>
            <p className="mt-6 max-w-lg text-[1rem] leading-[1.8] opacity-70">
              {c.box.body}
            </p>

            <p className="mt-10 text-[0.66rem] tracking-[0.24em] uppercase opacity-50">
              {c.box.contents}
            </p>
            <StaggerGroup as="ul" y={14} stagger={0.06} className="mt-4 grid gap-0">
              {c.box.items.map((item) => (
                <li
                  key={item}
                  className="border-b py-3.5 text-[0.98rem] leading-snug"
                  style={{ borderColor: "rgba(42,28,16,0.14)" }}
                >
                  {item}
                </li>
              ))}
            </StaggerGroup>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/box`}
                className="rounded-full px-7 py-3.5 text-[0.85rem] font-semibold text-[#fdf6e9] transition hover:brightness-110"
                style={{ background: TERRACOTTA }}
              >
                {c.box.primary}
              </Link>
              <a
                href={LIVE_SHOP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border px-7 py-3.5 text-[0.85rem] font-semibold transition hover:bg-[#2a1c10] hover:text-[#fdf6e9]"
                style={{ borderColor: "rgba(42,28,16,0.3)" }}
              >
                {c.box.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ growers ---- */}
      <section id="growers" className="px-5 py-[clamp(4.5rem,10vh,7.5rem)] lg:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="max-w-2xl">
            <p
              className="text-[0.66rem] tracking-[0.28em] uppercase"
              style={{ color: TERRACOTTA }}
            >
              {c.growers.eyebrow}
            </p>
            <SplitText
              as="h2"
              mode="line"
              wrapAt={22}
              className="mt-4 text-[clamp(2rem,4vw,3.1rem)] leading-[1.06] font-light tracking-[-0.025em] [font-family:var(--font-fraunces),serif]"
            >
              {c.growers.title}
            </SplitText>
            <p className="mt-6 text-[1rem] leading-[1.8] opacity-70">
              {c.growers.body}
            </p>
          </div>

          <StaggerGroup className="mt-14 grid gap-8 md:grid-cols-2">
            {siteContent.growers.map((grower, i) => (
              <article key={grower.name} className="group">
                <ClipReveal from={i % 2 ? "right" : "left"}>
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={i === 0 ? "/images/gen-farm-rows.png" : "/images/gen-coffee-cherries.png"}
                      alt={grower.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </ClipReveal>
                <h3 className="mt-6 text-[1.4rem] leading-tight tracking-[-0.015em] [font-family:var(--font-fraunces),serif]">
                  {grower.name}
                </h3>
                <p
                  className="mt-2 text-[0.72rem] tracking-[0.16em] uppercase"
                  style={{ color: OLIVE }}
                >
                  {grower.focus}
                </p>
                <p className="mt-3 max-w-md text-[0.96rem] leading-[1.75] opacity-70">
                  {grower.note}
                </p>
              </article>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ------------------------------------------------------- recipe ---- */}
      <section
        id="recipe"
        className="px-5 py-[clamp(4.5rem,10vh,7.5rem)] lg:px-10"
        style={{ background: INK, color: "#fdf6e9" }}
      >
        <div className="mx-auto max-w-[1360px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p
                className="text-[0.66rem] tracking-[0.28em] uppercase"
                style={{ color: "#e8a05f" }}
              >
                {c.recipe.eyebrow}
              </p>
              <SplitText
                as="h2"
                mode="line"
                wrapAt={24}
                className="mt-5 max-w-[20ch] text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.05] font-light tracking-[-0.025em] [font-family:var(--font-fraunces),serif]"
              >
                {c.recipe.title}
              </SplitText>
              <p className="mt-6 max-w-lg text-[1rem] leading-[1.8] opacity-75">
                {c.recipe.description}
              </p>

              <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-4 border-t border-white/15 pt-6">
                <div>
                  <dt className="text-[0.62rem] tracking-[0.2em] uppercase opacity-50">
                    {c.recipe.timeLabel}
                  </dt>
                  <dd className="mt-1.5 text-[1.15rem] [font-family:var(--font-fraunces),serif]">
                    {c.recipe.time}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] tracking-[0.2em] uppercase opacity-50">
                    {c.recipe.yieldLabel}
                  </dt>
                  <dd className="mt-1.5 text-[1.15rem] [font-family:var(--font-fraunces),serif]">
                    {c.recipe.yield}
                  </dd>
                </div>
              </dl>

              <p className="mt-10 text-[0.66rem] tracking-[0.24em] uppercase opacity-50">
                {c.recipe.ingredientsLabel}
              </p>
              <StaggerGroup as="ul" y={12} stagger={0.05} className="mt-4">
                {c.recipe.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="border-b border-white/12 py-3 text-[0.96rem] leading-snug opacity-85"
                  >
                    {ingredient}
                  </li>
                ))}
              </StaggerGroup>
            </div>

            <div>
              <ClipReveal from="up">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/gen-harvest-crate.png"
                    alt={c.recipe.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </ClipReveal>

              <p className="mt-10 text-[0.66rem] tracking-[0.24em] uppercase opacity-50">
                {c.recipe.stepsLabel}
              </p>
              <StaggerGroup as="ol" y={16} stagger={0.08} className="mt-5 grid gap-7">
                {c.recipe.steps.map((step, i) => (
                  <li key={step.name} className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <span
                      className="text-[1.5rem] leading-none tabular-nums [font-family:var(--font-fraunces),serif]"
                      style={{ color: "#e8a05f" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[1.05rem] leading-tight [font-family:var(--font-fraunces),serif]">
                        {step.name}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-[1.75] opacity-75">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- rhythm ---- */}
      <section className="px-5 py-[clamp(4.5rem,10vh,7.5rem)] lg:px-10">
        <div className="mx-auto max-w-[1360px]">
          <p
            className="text-[0.66rem] tracking-[0.28em] uppercase"
            style={{ color: TERRACOTTA }}
          >
            {c.rhythm.eyebrow}
          </p>
          <SplitText
            as="h2"
            mode="line"
            wrapAt={22}
            className="mt-4 max-w-[18ch] text-[clamp(2rem,4vw,3.1rem)] leading-[1.06] font-light tracking-[-0.025em] [font-family:var(--font-fraunces),serif]"
          >
            {c.rhythm.title}
          </SplitText>

          <StaggerGroup as="ol" className="mt-14 grid gap-10 md:grid-cols-3">
            {siteContent.rhythm.map((step, i) => (
              <li key={step.title}>
                <span
                  className="block text-[2.6rem] leading-none opacity-25 [font-family:var(--font-fraunces),serif]"
                  style={{ color: OLIVE }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[1.3rem] leading-tight tracking-[-0.015em] [font-family:var(--font-fraunces),serif]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.96rem] leading-[1.75] opacity-70">
                  {step.body}
                </p>
              </li>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* -------------------------------------------------------- chefs ---- */}
      <section className="px-5 lg:px-10">
        <div
          className="mx-auto grid max-w-[1360px] gap-10 px-6 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14"
          style={{ background: OLIVE, color: "#fdf6e9" }}
        >
          <div>
            <p className="text-[0.66rem] tracking-[0.28em] uppercase opacity-70">
              {c.chefs.eyebrow}
            </p>
            <h2 className="mt-4 max-w-[20ch] text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.08] font-light tracking-[-0.02em] [font-family:var(--font-fraunces),serif]">
              {c.chefs.title}
            </h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-[1.75] opacity-85">
              {c.chefs.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={WHOLESALE_MAIL}
              className="rounded-full bg-[#fdf6e9] px-7 py-3.5 text-[0.85rem] font-semibold transition hover:bg-white"
              style={{ color: OLIVE }}
            >
              {c.chefs.cta}
            </a>
            <a
              href={siteContent.wholesale.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#fdf6e9]/40 px-7 py-3.5 text-[0.85rem] font-semibold transition hover:bg-[#fdf6e9]/10"
            >
              {c.chefs.whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- faq ---- */}
      <section className="px-5 py-[clamp(4.5rem,10vh,7.5rem)] lg:px-10">
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p
              className="text-[0.66rem] tracking-[0.28em] uppercase"
              style={{ color: TERRACOTTA }}
            >
              {c.faq.eyebrow}
            </p>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.06] font-light tracking-[-0.025em] [font-family:var(--font-fraunces),serif]">
              {c.faq.title}
            </h2>
          </div>
          <Faq
            items={c.faq.items}
            className="border-t border-[color:rgba(42,28,16,0.16)]"
            itemClassName="border-b border-[color:rgba(42,28,16,0.16)]"
            questionClassName="py-5 text-[1.05rem] leading-snug [font-family:var(--font-fraunces),serif]"
            answerClassName="max-w-2xl pb-6 text-[0.96rem] leading-[1.8] opacity-70"
          />
        </div>
      </section>

      {/* -------------------------------------------------------- close ---- */}
      <section className="relative overflow-hidden">
        <Parallax className="absolute inset-[-10%_0]" y={12} fromScale={1.06} toScale={1}>
          <Image
            src="/images/Wine-sunset-2.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "rgba(42,28,16,0.66)" }}
        />
        <div className="relative mx-auto max-w-[1360px] px-5 py-[clamp(5rem,14vh,9rem)] text-center text-[#fdf6e9] lg:px-10">
          <SplitText
            as="h2"
            mode="line"
            wrapAt={18}
            className="mx-auto max-w-[16ch] text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-light tracking-[-0.03em] [font-family:var(--font-fraunces),serif]"
          >
            {c.close.title}
          </SplitText>
          <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-[1.8] opacity-85">
            {c.close.body}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href={`/${locale}/box`}
              className="rounded-full px-8 py-4 text-[0.9rem] font-semibold text-[#fdf6e9] transition hover:brightness-110"
              style={{ background: TERRACOTTA }}
            >
              {c.close.primary}
            </Link>
            <a
              href={LIVE_SHOP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#fdf6e9]/45 px-8 py-4 text-[0.9rem] font-semibold transition hover:bg-[#fdf6e9] hover:text-[#2a1c10]"
            >
              {c.close.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer ---- */}
      <footer className="px-5 py-14 lg:px-10" style={{ background: "#f2e4cc" }}>
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-end justify-between gap-8">
          <div>
            <p className="text-[1.3rem] leading-none [font-family:var(--font-fraunces),serif]">
              Blue Mountain Farms
            </p>
            <p className="mt-3 max-w-sm text-[0.9rem] leading-relaxed opacity-65">
              {c.footer.tagline}
            </p>
            <a
              href={RETREAT_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block border-b pb-0.5 text-[0.85rem] transition hover:opacity-60"
              style={{ borderColor: TERRACOTTA, color: TERRACOTTA }}
            >
              The Retreat at Blue Mountain Farms
            </a>
          </div>
          <p className="text-[0.66rem] tracking-[0.2em] uppercase opacity-45">
            {c.footer.concept}
          </p>
        </div>
      </footer>
    </div>
  );
}
