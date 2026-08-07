import { cn } from "../lib/cn";

export type SisterPropertyProps = {
  from: "retreat" | "farms";
  locale?: "en" | "es";
  href?: string;
  imageSrc: string;
  className?: string;
};

const copy = {
  en: {
    eyebrow: "Sister Property",
    retreat: {
      title: "The Retreat at Blue Mountain Farms",
      body: "Stay among the coffee trees and mountain views — three private villas on the same organic land that feeds our kitchens.",
      cta: "Discover the Retreat",
    },
    farms: {
      title: "Blue Mountain Farms",
      body: "The working farm behind the Retreat. Certified Blue Zone organics, harvested Monday and Thursday, delivered Tuesday and Friday.",
      cta: "Visit the Farm Shop",
    },
  },
  es: {
    eyebrow: "Propiedad Hermana",
    retreat: {
      title: "The Retreat at Blue Mountain Farms",
      body: "Hospedese entre cafetales y vistas de montaña — tres villas privadas en la misma tierra orgánica que alimenta nuestras cocinas.",
      cta: "Descubrir The Retreat",
    },
    farms: {
      title: "Blue Mountain Farms",
      body: "La finca productiva detrás de The Retreat. Orgánicos de Zona Azul, cosechados lunes y jueves, entregados martes y viernes.",
      cta: "Visitar la Tienda",
    },
  },
} as const;

export function SisterProperty({
  from,
  locale = "en",
  href,
  imageSrc,
  className,
}: SisterPropertyProps) {
  const target = from === "retreat" ? "farms" : "retreat";
  const t = copy[locale][target];
  const defaultHref =
    href ??
    (target === "retreat"
      ? process.env.NEXT_PUBLIC_RETREAT_URL || "https://theretreat.cr"
      : process.env.NEXT_PUBLIC_FARMS_URL || "https://bluemountainfarms.cr");

  return (
    <section
      className={cn("section section-alt", className)}
      aria-labelledby="sister-property-title"
    >
      <div className="container grid gap-10 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={t.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="max-w-xl">
          <p className="eyebrow">{copy[locale].eyebrow}</p>
          <h2 id="sister-property-title" className="h2 mt-4">
            {t.title}
          </h2>
          <p className="mt-6 text-[color:var(--muted)]">{t.body}</p>
          <a href={defaultHref} className="btn btn-ghost mt-8">
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
