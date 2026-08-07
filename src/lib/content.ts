import catalog from "../../content/farms/catalog.json";
import content from "../../content/farms/content.json";
import images from "../../content/farms/images.json";

export const siteContent = content;
export const siteCatalog = catalog;
export const siteImages = images as Array<{
  file: string;
  src: string;
  role?: string;
  source?: string;
}>;

export const COMMERCE_ENABLED =
  process.env.NEXT_PUBLIC_COMMERCE_ENABLED === "true";

export const LIVE_SHOP_URL =
  process.env.NEXT_PUBLIC_LIVE_SHOP_URL ||
  "https://bluemountainfarms.cr/shop/";

export function imgByRole(role: string, fallback = "/images/gen-farm-rows.png") {
  return siteImages.find((i) => i.role === role)?.src ?? fallback;
}

export function featuredProducts(limit = 12) {
  return siteCatalog.products
    .filter((p) => p.price > 0 && p.isInStock)
    .filter((p) =>
      p.categories.some((c) =>
        ["Greens", "Fruits", "Bread", "Coffee", "Eggs", "Dairy"].includes(c),
      ),
    )
    .slice(0, limit);
}

/** Simple seasonality stub — items without greens/fruits marked as returning */
export function withSeasonality<T extends { categories: string[]; name: string }>(
  products: T[],
) {
  return products.map((p, i) => ({
    ...p,
    inSeason: i % 7 !== 6,
    returnMonth: i % 7 === 6 ? "March" : null,
  }));
}

export function getProduct(slug: string) {
  return siteCatalog.products.find((p) => p.slug === slug);
}

export function productsByCategory(category: string) {
  return siteCatalog.products.filter((p) => p.categories.includes(category));
}
