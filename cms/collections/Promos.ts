import type { CollectionConfig } from "payload";

import { validateLink } from "../../lib/links";
import { SIGNUP_URL } from "../../lib/site";
import { adminsOnly, signedIn } from "../access";
import { revalidateBlogHooks } from "../hooks/revalidateBlog";

export const PROMO_THEMES = [
  { label: "Bone", value: "bone" },
  { label: "Mint", value: "mint" },
  { label: "Dark", value: "dark" },
] as const;

/**
 * Reusable adverts for Brigadely products. Writers place one inside an article
 * or glossary entry with the editor's "Promo" block, so changing a promo here
 * updates every page that shows it. Only admins create or edit promos, which
 * keeps them on-brand.
 */
export const Promos: CollectionConfig = {
  slug: "promos",
  labels: { singular: "Promo", plural: "Promos" },
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "label", "status", "updatedAt"],
    description:
      "Adverts that writers can add to articles and glossary entries with the editor's Promo block.",
  },
  access: {
    read: signedIn,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Internal name, shown when choosing a promo in the editor.",
      },
    },
    {
      name: "label",
      type: "text",
      required: true,
      maxLength: 40,
      admin: {
        description: 'The product it advertises, shown above the headline, e.g. "Statutory compliance".',
      },
    },
    {
      name: "heading",
      type: "text",
      required: true,
      maxLength: 90,
    },
    {
      name: "body",
      type: "textarea",
      required: true,
      maxLength: 300,
    },
    {
      type: "row",
      fields: [
        {
          name: "buttonLabel",
          type: "text",
          required: true,
          defaultValue: "Learn more",
          maxLength: 30,
          admin: { width: "40%" },
        },
        {
          name: "buttonUrl",
          type: "text",
          required: true,
          defaultValue: SIGNUP_URL,
          validate: validateLink,
          admin: {
            width: "60%",
            description: 'A page on this site, like "/#compliance", or a full link.',
          },
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional product screenshot, shown beside the text. Landscape images work best.",
      },
    },
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
        description: "Only published promos appear on the site. Switch back to Draft to hide it everywhere it's used.",
      },
    },
    {
      name: "theme",
      type: "select",
      required: true,
      defaultValue: "bone",
      options: [...PROMO_THEMES],
      admin: {
        position: "sidebar",
        description: "Background colour of the promo.",
      },
    },
  ],
  // Promos appear inside articles and glossary entries, whose cached pages carry the blog tag.
  hooks: revalidateBlogHooks,
};
