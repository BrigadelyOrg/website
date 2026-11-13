import type { CollectionConfig } from "payload";

import { revalidateBlogHooks } from "../hooks/revalidateBlog";

/** Writers and editors who sign in to /admin. Also the authors shown on posts. */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "roleTitle"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Shown as the author on blog articles.",
      },
    },
    {
      name: "roleTitle",
      type: "text",
      label: "Role title",
      admin: {
        description: 'Shown under your name on articles, e.g. "Finance Ops Lead".',
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
  ],
  hooks: revalidateBlogHooks,
};
