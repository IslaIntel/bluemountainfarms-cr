"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CountUp,
  Faq,
  ScrollFill,
  ScrollSpy,
  StaggerGroup,
} from "@bluemountain/brand";
import { WholesaleForm } from "../WholesaleForm";
import { ConceptLocale } from "./ConceptLocale";
import { siteCatalog, siteContent } from "../../lib/content";
import { translateCategory } from "../../lib/i18n-products";
import { ledgerCopy } from "../../lib/concept-copy";
import { DELIVERY_AREA, RETREAT_URL } from "../../lib/seo";

/**
 * Direction B — Ledger.
 *
 * Design principle: proof over persuasion. Laid out as a technical document —
 * document reference, numbered sections, ruled tables, monospace throughout.
 * The one piece of motion is the chronology rail, which advances as you scroll
 * so the harvest cycle is something you travel rather than read.
 */

const INK = "#12181a";
const PAPER = "#f4f3ee";
const SIGNAL = "#123a42";
const AMBER = "#a9761f";

export function LedgerLanding({ locale }: { locale: "en" | "es" }) {
  const c = ledgerCopy[locale];

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    siteCatalog.products.forEach((p) =>
      p.categories.forEach((cat) => counts.set(cat, (counts.get(cat) ?? 0) + 1)),
    );
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const totalLines = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div
      className="bg-[#f4f3ee] text-[#12181a] [font-family:var(--font-plex-sans),ui-sans-serif,system-ui]"
      style={{ ["--rule" as string]: "#cdc9bd" }}
    >
      {/* ---------------------------------------------------------- nav ---- */}
      <header className="sticky top-0 z-[65] border-b border-[color:var(--rule)] bg-[#f4f3ee]/96 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-[1320px] items-center justify-between gap-6 px-5 lg:px-8">
          <Link
            href={`/${locale}`}
            className="text-[0.72rem] font-medium tracking-[0.14em] uppercase [font-family:var(--font-plex-mono),monospace]"
          >
            Blue Mountain Farms
          </Link>
          <nav
            className="hidden items-center gap-6 text-[0.66rem] tracking-[0.1em] uppercase lg:flex [font-family:var(--font-plex-mono),monospace]"
            aria-label={c.nav.chronology}
          >
            <a href="#chronology" className="opacity-55 hover:opacity-100">{c.nav.chronology}</a>
            <a href="#schedule" className="opacity-55 hover:opacity-100">{c.nav.schedule}</a>
            <a href="#standard" className="opacity-55 hover:opacity-100">{c.nav.standard}</a>
            <a href="#availability" className="opacity-55 hover:opacity-100">{c.nav.availability}</a>
            <a href="#wholesale" className="opacity-55 hover:opacity-100">{c.nav.wholesale}</a>
          </nav>
          <div className="flex items-center gap-4">
            <ConceptLocale
              locale={locale}
              className="text-[0.66rem] tracking-[0.1em] uppercase [font-family:var(--font-plex-mono),monospace]"
            />
            <a
              href="#wholesale"
              className="px-4 py-2 text-[0.66rem] tracking-[0.1em] text-white uppercase transition hover:opacity-90 [font-family:var(--font-plex-mono),monospace]"
              style={{ background: SIGNAL }}
            >
              {c.nav.wholesale}
            </a>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------- masthead ---- */}
      <section className="border-b-2 border-[#12181a] px-5 pt-10 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[color:var(--rule)] pb-3 text-[0.64rem] tracking-[0.16em] uppercase [font-family:var(--font-plex-mono),monospace]">
            <span style={{ color: SIGNAL }}>{c.masthead.docLabel}</span>
            <span className="opacity-55">
              {c.masthead.docRef} · {siteCatalog.count ?? totalLines} lines ·{" "}
              {new Date(siteCatalog.pulledAt).toISOString().slice(0, 10)}
            </span>
          </div>

          <div className="grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="max-w-[22ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.03em]">
                {c.masthead.title}
              </h1>
              <p className="mt-7 max-w-xl leading-[1.72] opacity-70">
                {c.masthead.standfirst}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#wholesale"
                  className="px-6 py-3.5 text-[0.7rem] tracking-[0.12em] text-white uppercase [font-family:var(--font-plex-mono),monospace]"
                  style={{ background: SIGNAL }}
                >
                  {c.masthead.cta}
                </a>
                <a
                  href={siteContent.wholesale.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#12181a] px-6 py-3.5 text-[0.7rem] tracking-[0.12em] uppercase transition hover:bg-[#12181a] hover:text-[#f4f3ee] [font-family:var(--font-plex-mono),monospace]"
                >
                  {c.masthead.ctaAlt}
                </a>
              </div>
            </div>

            <dl className="grid content-start gap-px self-start border-t border-[color:var(--rule)]">
              {c.masthead.fields.map((field) => (
                <div
                  key={field.label}
                  className="flex items-baseline justify-between gap-6 border-b border-[color:var(--rule)] py-3.5"
                >
                  <dt className="text-[0.62rem] tracking-[0.14em] uppercase opacity-50 [font-family:var(--font-plex-mono),monospace]">
                    {field.label}
                  </dt>
                  <dd className="text-right text-[0.82rem] [font-family:var(--font-plex-mono),monospace]">
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- 01 · chronology ---- */}
      <section id="chronology" className="border-b border-[color:var(--rule)] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <SectionHead eyebrow={c.chronology.eyebrow} title={c.chronology.title} note={c.chronology.note} />
          <ChronologyRail steps={c.chronology.steps} />
        </div>
      </section>

      {/* ----------------------------------------------- 02 · schedule ---- */}
      <section id="schedule" className="border-b border-[color:var(--rule)] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <SectionHead eyebrow={c.schedule.eyebrow} title={c.schedule.title} note={c.schedule.note} />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">{c.schedule.title}</caption>
              <thead>
                <tr className="border-y-2 border-[#12181a] text-[0.62rem] tracking-[0.14em] uppercase [font-family:var(--font-plex-mono),monospace]">
                  <th scope="col" className="py-3 pr-6 font-medium">{c.schedule.columns.order}</th>
                  <th scope="col" className="py-3 pr-6 font-medium">{c.schedule.columns.harvest}</th>
                  <th scope="col" className="py-3 font-medium">{c.schedule.columns.delivery}</th>
                </tr>
              </thead>
              <StaggerGroup as="tbody" select="tr" y={12}>
                {c.schedule.rows.map((row) => (
                  <tr key={row.order} className="border-b border-[color:var(--rule)]">
                    <th scope="row" className="py-5 pr-6 text-left text-[0.82rem] font-normal [font-family:var(--font-plex-mono),monospace]">
                      {row.order}
                    </th>
                    <td className="py-5 pr-6 text-[0.82rem] [font-family:var(--font-plex-mono),monospace]">
                      {row.harvest}
                    </td>
                    <td className="py-5 text-[0.82rem] font-medium [font-family:var(--font-plex-mono),monospace]" style={{ color: SIGNAL }}>
                      {row.delivery}
                    </td>
                  </tr>
                ))}
              </StaggerGroup>
            </table>
          </div>
          <p className="mt-6 max-w-2xl border-l-2 pl-4 text-sm leading-relaxed opacity-65" style={{ borderColor: AMBER }}>
            {siteCatalog.harvest?.cutoffNote}
          </p>
        </div>
      </section>

      {/* ----------------------------------------------- 03 · standard ---- */}
      <section id="standard" className="border-b border-[color:var(--rule)] bg-[#ebe9e1] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <SectionHead eyebrow={c.standard.eyebrow} title={c.standard.title} />
          <StaggerGroup as="dl" className="mt-10 border-t-2 border-[#12181a]" y={12}>
            {c.standard.rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 border-b border-[color:var(--rule)] py-5 md:grid-cols-[10rem_14rem_1fr] md:gap-8"
              >
                <dt className="text-[0.62rem] tracking-[0.14em] uppercase opacity-50 [font-family:var(--font-plex-mono),monospace]">
                  {row.label}
                </dt>
                <dd className="text-[0.9rem] font-medium">{row.value}</dd>
                <dd className="text-sm leading-relaxed opacity-65">{row.detail}</dd>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ------------------------------------------------ 04 · growers ---- */}
      <section className="border-b border-[color:var(--rule)] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <SectionHead eyebrow={c.growers.eyebrow} title={c.growers.title} />
          <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-2">
            {siteContent.growers.map((grower, i) => (
              <article
                key={grower.name}
                className="grid gap-5 border border-[color:var(--rule)] bg-white p-6 sm:grid-cols-[7rem_1fr]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#ebe9e1]">
                  <Image
                    src={i === 0 ? "/images/gen-farm-rows.png" : "/images/gen-harvest-crate.png"}
                    alt={grower.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[0.6rem] tracking-[0.14em] uppercase opacity-45 [font-family:var(--font-plex-mono),monospace]">
                    {String(i + 1).padStart(2, "0")} / {siteContent.growers.length}
                  </p>
                  <h3 className="mt-2 text-[1.1rem] font-semibold tracking-[-0.01em]">
                    {grower.name}
                  </h3>
                  <p className="mt-1.5 text-[0.75rem] tracking-[0.06em] [font-family:var(--font-plex-mono),monospace]" style={{ color: AMBER }}>
                    {grower.focus}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed opacity-70">{grower.note}</p>
                </div>
              </article>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ------------------------------------------- 05 · availability ---- */}
      <section id="availability" className="border-b border-[color:var(--rule)] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <SectionHead eyebrow={c.availability.eyebrow} title={c.availability.title} note={c.availability.note} />

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-left">
              <caption className="sr-only">{c.availability.title}</caption>
              <thead>
                <tr className="border-y-2 border-[#12181a] text-[0.62rem] tracking-[0.14em] uppercase [font-family:var(--font-plex-mono),monospace]">
                  <th scope="col" className="py-3 pr-6 font-medium">{c.availability.columns.category}</th>
                  <th scope="col" className="py-3 pr-6 text-right font-medium">{c.availability.columns.lines}</th>
                  <th scope="col" className="py-3 font-medium">{c.availability.columns.status}</th>
                </tr>
              </thead>
              <StaggerGroup as="tbody" select="tr" y={8} stagger={0.03}>
                {categories.map((category) => (
                  <tr key={category.name} className="border-b border-[color:var(--rule)]">
                    <th scope="row" className="py-3 pr-6 text-left text-[0.88rem] font-normal">
                      {translateCategory(category.name, locale)}
                    </th>
                    <td className="py-3 pr-6 text-right text-[0.82rem] tabular-nums [font-family:var(--font-plex-mono),monospace]">
                      {category.count}
                    </td>
                    <td className="py-3">
                      <span
                        className="inline-block px-2 py-1 text-[0.6rem] tracking-[0.1em] uppercase [font-family:var(--font-plex-mono),monospace]"
                        style={
                          category.count >= 5
                            ? { background: SIGNAL, color: "#fff" }
                            : { border: `1px solid ${AMBER}`, color: AMBER }
                        }
                      >
                        {category.count >= 5 ? c.availability.inStock : c.availability.seasonal}
                      </span>
                    </td>
                  </tr>
                ))}
              </StaggerGroup>
              <tfoot>
                <tr className="border-t-2 border-[#12181a]">
                  <th scope="row" className="py-4 pr-6 text-left text-[0.62rem] tracking-[0.14em] uppercase [font-family:var(--font-plex-mono),monospace]">
                    {c.availability.total}
                  </th>
                  <td className="py-4 pr-6 text-right text-[1.1rem] font-semibold tabular-nums [font-family:var(--font-plex-mono),monospace]">
                    <CountUp to={totalLines} />
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- 06 · wholesale ---- */}
      <section id="wholesale" className="border-b border-[color:var(--rule)] px-5 py-16 lg:px-8" style={{ background: INK }}>
        <div className="mx-auto max-w-[1320px] text-[#f4f3ee]">
          <p className="text-[0.62rem] tracking-[0.18em] uppercase opacity-55 [font-family:var(--font-plex-mono),monospace]">
            {c.wholesale.eyebrow}
          </p>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-semibold tracking-[-0.03em]">
            {c.wholesale.title}
          </h2>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="max-w-md leading-relaxed opacity-70">{c.wholesale.body}</p>
              <ul className="mt-8 border-t border-white/20">
                {c.wholesale.terms.map((term) => (
                  <li
                    key={term}
                    className="flex gap-4 border-b border-white/12 py-3 text-[0.88rem]"
                  >
                    <span aria-hidden className="opacity-40 [font-family:var(--font-plex-mono),monospace]">
                      —
                    </span>
                    {term}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {DELIVERY_AREA.map((zone) => (
                  <span
                    key={zone}
                    className="border border-white/25 px-3 py-1.5 text-[0.66rem] tracking-[0.08em] uppercase [font-family:var(--font-plex-mono),monospace]"
                  >
                    {zone}
                  </span>
                ))}
              </div>
              <a
                href={siteContent.wholesale.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block bg-[#f4f3ee] px-6 py-3.5 text-[0.7rem] tracking-[0.12em] text-[#12181a] uppercase [font-family:var(--font-plex-mono),monospace]"
              >
                {c.wholesale.whatsapp}
              </a>
            </div>
            <div className="border border-white/20 p-6 [&_input]:text-[#f4f3ee] [&_select]:text-[#f4f3ee] [&_textarea]:text-[#f4f3ee]">
              <WholesaleForm />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- 07 · faq ---- */}
      <section className="border-b border-[color:var(--rule)] px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHead eyebrow={c.faq.eyebrow} title={c.faq.title} />
          <Faq
            items={c.faq.items}
            className="border-t-2 border-[#12181a]"
            itemClassName="border-b border-[color:var(--rule)]"
            questionClassName="py-5 text-[0.98rem] font-medium"
            answerClassName="max-w-2xl pb-6 text-[0.9rem] leading-[1.72] opacity-70"
          />
        </div>
      </section>

      {/* ----------------------------------------------------- colophon ---- */}
      <footer className="px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-[1320px] gap-6 border-t-2 border-[#12181a] pt-8 md:grid-cols-3">
          <div>
            <p className="text-[0.6rem] tracking-[0.14em] uppercase opacity-45 [font-family:var(--font-plex-mono),monospace]">
              {locale === "es" ? "Propiedad hermana" : "Sister property"}
            </p>
            <a href={RETREAT_URL} className="mt-2 block text-[0.9rem] underline underline-offset-4">
              The Retreat at Blue Mountain Farms
            </a>
          </div>
          <p className="text-sm opacity-60">{c.colophon.tagline}</p>
          <p className="text-[0.6rem] tracking-[0.12em] uppercase opacity-45 md:text-right [font-family:var(--font-plex-mono),monospace]">
            {c.colophon.concept}
            <span className="mt-1 block">{c.colophon.note}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <div>
      <p className="text-[0.62rem] tracking-[0.18em] uppercase [font-family:var(--font-plex-mono),monospace]" style={{ color: SIGNAL }}>
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-[24ch] text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
        {title}
      </h2>
      {note ? (
        <p className="mt-4 max-w-lg text-sm leading-relaxed opacity-60">{note}</p>
      ) : null}
    </div>
  );
}

type Step = { time: string; elapsed: string; title: string; body: string };

/**
 * The harvest cycle as a scroll-driven rail. A single progress line fills as
 * the section passes, and each step lights up when it reaches the read line —
 * the reader advances through the day rather than scanning a list.
 */
function ChronologyRail({ steps }: { steps: readonly Step[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <ScrollSpy
      as="ol"
      select="[data-chronology-step]"
      onChange={setCurrent}
      className="relative mt-12 pl-10 lg:pl-16"
    >
      {/* Rail track, then the scroll-driven fill over it. */}
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px bg-[color:var(--rule)] lg:left-[15px]"
      />
      <ScrollFill
        color={SIGNAL}
        className="absolute top-2 bottom-2 left-[7px] w-px lg:left-[15px]"
      />

      {steps.map((step, i) => {
        const active = i <= current;
        return (
          <li
            key={step.time + step.title}
            data-chronology-step
            className="relative pb-12 last:pb-0"
          >
            <span
              aria-hidden
              className="absolute top-1.5 -left-10 h-[15px] w-[15px] rounded-full border-2 transition-colors duration-500 lg:-left-16"
              style={{
                borderColor: active ? SIGNAL : "#cdc9bd",
                background: active ? SIGNAL : PAPER,
              }}
            />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span
                className="text-[1.05rem] font-medium tabular-nums [font-family:var(--font-plex-mono),monospace]"
                style={{ color: active ? SIGNAL : undefined }}
              >
                {step.time}
              </span>
              <span className="text-[0.66rem] tracking-[0.12em] uppercase opacity-45 [font-family:var(--font-plex-mono),monospace]">
                {step.elapsed}
              </span>
            </div>
            <h3 className="mt-2 text-[1.15rem] font-semibold tracking-[-0.015em]">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xl text-[0.92rem] leading-[1.72] opacity-70">
              {step.body}
            </p>
          </li>
        );
      })}
    </ScrollSpy>
  );
}
