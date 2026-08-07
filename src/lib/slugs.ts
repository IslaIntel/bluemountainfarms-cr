export function categoryToSlug(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function slugToCategory(
  slug: string,
  categories: string[],
): string | undefined {
  return categories.find((c) => categoryToSlug(c) === slug);
}
