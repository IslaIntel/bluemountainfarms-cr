import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Fraunces,
  Karla,
} from "next/font/google";
import { setRequestLocale } from "next-intl/server";
import { ConceptSwitcher } from "../../../components/concepts/ConceptSwitcher";

/* Each direction gets its own typeface pairing — the fonts carry as much of the
   difference between these designs as the layouts do. */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const karla = Karla({
  subsets: ["latin", "latin-ext"],
  variable: "--font-karla",
});

/** Previews must never outrank the live homepage. */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default async function ConceptsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div
      data-concept-shell
      className={`${inter.variable} ${grotesk.variable} ${plexSans.variable} ${plexMono.variable} ${fraunces.variable} ${karla.variable}`}
    >
      <ConceptSwitcher locale={locale as "en" | "es"} />
      {children}
    </div>
  );
}
