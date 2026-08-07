import esNames from "../../content/farms/es-names.json";

export function translateCategory(category: string, locale: "en" | "es") {
  if (locale === "en") return category;
  return (
    (esNames.categories as Record<string, string>)[category] || category
  );
}

export function translateProductName(name: string, locale: "en" | "es") {
  if (locale === "en") return name;
  let out = name;
  const terms = esNames.terms as Record<string, string>;
  // Longer keys first to avoid partial clobber
  Object.keys(terms)
    .sort((a, b) => b.length - a.length)
    .forEach((en) => {
      out = out.replace(new RegExp(en, "gi"), terms[en]);
    });
  return out;
}
