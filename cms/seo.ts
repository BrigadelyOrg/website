import type { GenerateDescription, GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";

import { SITE_URL } from "../lib/site";
import type { GlossaryTerm, Post } from "../payload-types";

// The SEO tab's "Auto-generate" buttons run these against the unsaved form,
// so any field may still be missing. Posts and glossary terms share them; the
// plugin passes the collection's config, which tells them apart.
type SeoFormData = Partial<Post> | Partial<GlossaryTerm>;

const isGlossary = (slug: string | undefined) => slug === "glossary";

export const generateTitle: GenerateTitle<SeoFormData> = ({ doc, collectionConfig }) => {
  if (isGlossary(collectionConfig?.slug)) {
    const { term } = doc as Partial<GlossaryTerm>;
    return term ? `What is ${term}? | Brigadely Glossary` : "Brigadely Glossary";
  }
  const { title } = doc as Partial<Post>;
  return title ? `${title} | Brigadely` : "Brigadely";
};

export const generateDescription: GenerateDescription<SeoFormData> = ({ doc, collectionConfig }) => {
  if (isGlossary(collectionConfig?.slug)) return (doc as Partial<GlossaryTerm>).shortDefinition ?? "";
  return (doc as Partial<Post>).excerpt ?? "";
};

export const generateURL: GenerateURL<SeoFormData> = ({ doc, collectionConfig }) => {
  const section = isGlossary(collectionConfig?.slug) ? "glossary" : "blog";
  return doc.slug ? `${SITE_URL}/${section}/${doc.slug}` : `${SITE_URL}/${section}`;
};
