import type { CollectionConfig } from "payload";

import { slugField } from "../fields/slug";
import { revalidateBlogHooks } from "../hooks/revalidateBlog";

/** Blog categories. Writers can also create these inline from a post. */
export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField("title"),
  ],
  hooks: revalidateBlogHooks,
};
