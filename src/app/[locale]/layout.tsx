import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SmoothScroll } from "@bluemountain/brand";
import { routing } from "../../i18n/routing";
import { HarvestBar } from "../../components/HarvestBar";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div data-site="farms">
        <SmoothScroll>
          <HarvestBar locale={locale as "en" | "es"} />
          <SiteHeader locale={locale as "en" | "es"} />
          <main>{children}</main>
          <SiteFooter locale={locale as "en" | "es"} />
        </SmoothScroll>
      </div>
    </NextIntlClientProvider>
  );
}
