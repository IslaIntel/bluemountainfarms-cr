import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { conceptIndex, hubCopy } from "../../../lib/concept-copy";

export const metadata: Metadata = {
  title: "Landing directions",
  robots: { index: false, follow: false },
};

export default async function ConceptsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = (locale === "es" ? "es" : "en") as "en" | "es";
  const c = hubCopy[loc];

  return (
    <div className="min-h-svh bg-[#fbfaf6] px-5 pt-20 pb-28 text-[#14201a] [font-family:var(--font-inter),ui-sans-serif,system-ui] lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-3xl">
          <p className="text-[0.62rem] tracking-[0.24em] text-[#6f9e33] uppercase">
            {c.eyebrow}
          </p>
          <h1 className="mt-5 text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.035em] [font-family:var(--font-grotesk),sans-serif]">
            {c.title}
          </h1>
          <p className="mt-7 leading-relaxed opacity-70">{c.lede}</p>
          <p className="mt-7 border-y border-black/10 py-4 text-sm opacity-60">
            {c.how}
          </p>
          <Link
            href={`/${loc}`}
            className="mt-7 inline-block text-[0.62rem] tracking-[0.18em] text-[#6f9e33] uppercase transition hover:text-[#14201a]"
          >
            ← {c.live}
          </Link>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {conceptIndex.map((concept) => {
            const card = c.cards[concept.slug];
            return (
              <Link
                key={concept.slug}
                href={`/${loc}/concepts/${concept.slug}`}
                className="group flex flex-col rounded-2xl border border-black/10 bg-white transition duration-500 hover:-translate-y-1 hover:border-[#6f9e33]/60 hover:shadow-[0_18px_50px_rgba(20,32,26,0.1)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <Image
                    src={concept.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute bottom-3 left-5 text-4xl leading-none font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] [font-family:var(--font-grotesk),sans-serif]">
                    {concept.letter}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[0.6rem] tracking-[0.2em] text-[#6f9e33] uppercase">
                    {card.tag}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] [font-family:var(--font-grotesk),sans-serif]">
                    {card.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed opacity-70">
                    {card.body}
                  </p>
                  <p className="mt-6 border-t border-black/10 pt-4 text-[0.6rem] tracking-[0.16em] uppercase opacity-45 [font-family:var(--font-jetbrains),monospace]">
                    {card.principle}
                  </p>
                  <span className="mt-5 text-[0.62rem] tracking-[0.16em] uppercase">
                    {c.open} {concept.letter} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
