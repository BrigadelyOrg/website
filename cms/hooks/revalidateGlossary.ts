import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidateGlossaryCache } from "../../lib/glossary/cache";

// Any save or delete in the glossary collection shows up on /glossary, the
// term's page and sitemap.xml on the next request.

export const revalidateGlossaryAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateGlossaryCache();
  return doc;
};

export const revalidateGlossaryAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateGlossaryCache();
  return doc;
};

export const revalidateGlossaryHooks = {
  afterChange: [revalidateGlossaryAfterChange],
  afterDelete: [revalidateGlossaryAfterDelete],
};
