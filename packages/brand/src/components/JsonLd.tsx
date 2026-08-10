export type JsonLdProps = {
  /** A schema.org node, or an array of nodes to emit as an @graph. */
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

/**
 * Emits structured data. Rendered from a Server Component so the JSON is in the
 * initial HTML where crawlers will read it without executing scripts.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };

  return (
    <script
      type="application/ld+json"
      id={id}
      // Structured data is built from local content, never user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
