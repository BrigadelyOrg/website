import type { Block } from "payload";

/**
 * Editor block that places a promo (from Content → Promos) inside an article
 * or glossary entry. It stores only the choice; the promo's text, image and
 * link come from the promo itself, so editing it there updates every page.
 */
export const PromoBlock: Block = {
  slug: "promo",
  interfaceName: "PromoBlock",
  labels: { singular: "Promo", plural: "Promos" },
  fields: [
    {
      name: "promo",
      type: "relationship",
      relationTo: "promos",
      required: true,
      admin: {
        description: "Choose an advert from Content → Promos. Only published promos appear on the site.",
      },
    },
  ],
};
