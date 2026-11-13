import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidateBlogCache } from "../../lib/blog/cache";

// Attached to every collection the blog renders (posts, categories, authors,
// media), so any edit in /admin shows up on /blog on the next request.

export const revalidateBlogAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateBlogCache();
  return doc;
};

export const revalidateBlogAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateBlogCache();
  return doc;
};

export const revalidateBlogHooks = {
  afterChange: [revalidateBlogAfterChange],
  afterDelete: [revalidateBlogAfterDelete],
};
