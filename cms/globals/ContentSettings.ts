import type { GlobalAfterChangeHook, GlobalConfig } from "payload";

import { revalidateBlogCache } from "../../lib/blog/cache";
import { DEFAULT_TOC_BUTTON } from "../../lib/blog/defaults";
import { validateLink } from "../../lib/links";
import { adminsOnly, signedIn } from "../access";

const revalidateArticles: GlobalAfterChangeHook = ({ doc }) => {
  revalidateBlogCache();
  return doc;
};

/** Site-wide options for blog articles, editable by admins in /admin. */
export const ContentSettings: GlobalConfig = {
  slug: "content-settings",
  label: "Content settings",
  admin: {
    group: "Content",
    description: "Site-wide options for blog articles and glossary entries.",
  },
  access: {
    read: signedIn,
    update: adminsOnly,
  },
  fields: [
    {
      name: "tocButton",
      type: "group",
      label: "Table of contents button",
      admin: {
        description:
          "The button at the bottom of the table of contents beside every blog article and glossary entry.",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              defaultValue: DEFAULT_TOC_BUTTON.label,
              maxLength: 30,
              admin: { width: "40%" },
            },
            {
              name: "url",
              type: "text",
              label: "Link",
              required: true,
              defaultValue: DEFAULT_TOC_BUTTON.url,
              validate: validateLink,
              admin: {
                width: "60%",
                description: 'A page on this site, like "/pricing", or a full link.',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateArticles],
  },
};
