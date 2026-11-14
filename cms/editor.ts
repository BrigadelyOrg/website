import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  LinkFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

// Default features we either reconfigure below or drop:
// - heading: the article title is the page's only <h1>, so content starts at h2
// - link: internal links may only point at collections with public pages
//   (posts → /blog/<slug>, glossary → /glossary/<slug>; see components/blog/RichText.tsx)
// - relationship: embeds a raw document reference that has no public rendering
const REPLACED_FEATURES = new Set(["heading", "link", "relationship"]);

export const editor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter((feature) => !REPLACED_FEATURES.has(feature.key)),
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
    LinkFeature({ enabledCollections: ["posts", "glossary"] }),
    FixedToolbarFeature(),
    EXPERIMENTAL_TableFeature(),
  ],
});
