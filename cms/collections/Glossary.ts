import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import type { CollectionConfig } from "payload";

import { GLOSSARY_CATEGORIES, shortTermName } from "../../lib/glossary/categories";
import { slugField } from "../fields/slug";
import { revalidateGlossaryHooks } from "../hooks/revalidateGlossary";

/** Payroll, tax and compliance terms, published at /glossary and /glossary/<slug>. */
export const Glossary: CollectionConfig = {
  slug: "glossary",
  labels: {
    singular: "Glossary term",
    plural: "Glossary",
  },
  typescript: {
    interface: "GlossaryTerm",
  },
  admin: {
    group: "Content",
    useAsTitle: "term",
    defaultColumns: ["term", "category", "status", "updatedAt"],
    listSearchableFields: ["term", "slug"],
    description: "Definitions published at brigadely.com/glossary. Only published terms appear on the site.",
  },
  defaultSort: "term",
  fields: [
    {
      name: "term",
      type: "text",
      required: true,
      admin: {
        description:
          'The term, with its abbreviation if it has one, e.g. "PAYE (Pay-As-You-Earn)". The page title becomes "What is PAYE (Pay-As-You-Earn)?".',
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "shortDefinition",
              type: "textarea",
              required: true,
              admin: {
                description:
                  "One or two sentences, shown in bold under the title. Define the term directly: search engines often quote this as the answer.",
              },
            },
            {
              name: "content",
              type: "richText",
              required: true,
              admin: {
                description:
                  "Start each section with an H2 heading: every H2 becomes an entry in the page's table of contents.",
              },
            },
            {
              name: "faqs",
              label: "FAQs",
              type: "array",
              labels: {
                singular: "FAQ",
                plural: "FAQs",
              },
              admin: {
                description: "Optional. Shown at the end of the page and marked up as FAQs for Google.",
              },
              fields: [
                {
                  name: "question",
                  type: "text",
                  required: true,
                },
                {
                  name: "answer",
                  type: "textarea",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          // Stored as meta.title / meta.description / meta.image, like posts.
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: "media" }),
            MetaDescriptionField({ hasGenerateFn: true }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    // "PAYE (Pay-As-You-Earn)" → /glossary/paye: the part before the brackets
    // makes the shortest stable URL.
    slugField("term", { fromSource: shortTermName }),
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      index: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: {
        position: "sidebar",
        description: "Only published terms appear on the site.",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: GLOSSARY_CATEGORIES.map(({ label, value }) => ({ label, value })),
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "relatedTerms",
      type: "relationship",
      relationTo: "glossary",
      hasMany: true,
      // A term can't be related to itself.
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
      admin: {
        position: "sidebar",
        description: "Shown as links at the end of the page (published terms only).",
      },
    },
    {
      name: "relatedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      admin: {
        position: "sidebar",
        description: "Blog articles suggested after the definition (published articles only).",
      },
    },
  ],
  hooks: revalidateGlossaryHooks,
};
