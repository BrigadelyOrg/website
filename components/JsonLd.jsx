// Structured data for search engines. "<" is escaped so text from the CMS (e.g.
// an FAQ answer containing "</script>") can never end the script element early.
const JsonLd = ({ schema }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
  />
);

export default JsonLd;
