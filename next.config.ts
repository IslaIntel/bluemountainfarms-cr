import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@bluemountain/brand"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "bluemountainfarms.cr" },
      { protocol: "https", hostname: "theretreat.cr" },
    ],
  },
};

export default withNextIntl(nextConfig);
