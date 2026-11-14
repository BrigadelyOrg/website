import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import type { CollectionConfig } from "payload";

import { slugField } from "../fields/slug";
import { revalidateBlogHooks } from "../hooks/revalidateBlog";

/** Date-only values are stored at 12:00 UTC (as Payload's date picker does). */
function todayAtNoonUTC(): string {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12),
  ).toISOString();
}

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedDate"],
  },
  defaultSort: "-publishedDate",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: {
                description:
                  "Shown on blog cards and at the top of the article. Use a 16:9 image, at least 1600 × 900.",
              },
            },
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              admin: {
                description:
                  "One or two sentences. Shown under the title, and used as the search description unless the SEO tab sets one.",
              },
            },
            {
              name: "content",
              type: "richText",
              required: true,
            },
          ],
        },
        {
          // Stored as meta.title / meta.description / meta.image.
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
    slugField("title"),
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
        description: "Only published articles appear on the site.",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      index: true,
      defaultValue: todayAtNoonUTC,
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "MMM d, yyyy",
        },
      },
    },
    {
      name: "readTime",
      type: "number",
      label: "Read Time (minutes)",
      required: true,
      min: 1,
      admin: {
        position: "sidebar",
        step: 1,
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: {
        position: "sidebar",
        // Shows a "+" button to create a new category without leaving the post.
        allowCreate: true,
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      // Pre-selects the signed-in writer. Without a signed-in user (Local API
      // scripts) this yields undefined, which Payload treats as "no default";
      // its DefaultValue type just doesn't model that case.
      defaultValue: ({ user }) => user?.id as number,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: revalidateBlogHooks,
};
