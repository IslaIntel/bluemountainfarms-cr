import type { Metadata } from "next";
import { Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Public_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-public-sans",
  weight: ["300", "400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Blue Mountain Farms",
    template: "%s · Blue Mountain Farms",
  },
  description:
    "Certified Blue Zone organics from Guanacaste — harvested Monday & Thursday, delivered Tuesday & Friday.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
