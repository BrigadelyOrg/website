import type { BlogImage } from "../blog/types";
import type { GlossaryTerm } from "../../payload-types";

import type { GlossaryCategory } from "./categories";

// View models for the public glossary: only what the pages render, so client
// components never receive rich-text JSON or other CMS internals.

/** A term as listed in the /glossary directory and in "Related terms". */
export type GlossaryTermLink = {
  slug: string;
  term: string;
};

export type GlossaryFaq = {
  question: string;
  answer: string;
};

/** A related blog article, shown as a compact card on a term's page. */
export type GlossaryRelatedPost = {
  slug: string;
  title: string;
  publishedDate: string;
  categoryTitle: string | null;
};

/** A full term for /glossary/[slug]. */
export type GlossaryTermPage = GlossaryTermLink & {
  id: number;
  shortDefinition: string;
  category: GlossaryCategory;
  content: GlossaryTerm["content"];
  faqs: GlossaryFaq[];
  relatedTerms: GlossaryTermLink[];
  relatedPosts: GlossaryRelatedPost[];
  createdAt: string;
  updatedAt: string;
  meta: {
    title: string | null;
    description: string | null;
    image: BlogImage | null;
  };
};

export type GlossarySitemapEntry = {
  slug: string;
  updatedAt: string;
};

/** A term with its one-paragraph definition, as listed in /llms.txt. */
export type GlossaryDefinition = GlossaryTermLink & {
  shortDefinition: string;
};
