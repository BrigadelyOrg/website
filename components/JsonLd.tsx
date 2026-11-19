/**
 * Structured data for search engines. "<" is escaped so text from the CMS (e.g.
 * an FAQ answer containing "</script>") can never end the script element early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
