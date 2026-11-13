import type { CollectionConfig } from "payload";

import { revalidateBlogHooks } from "../hooks/revalidateBlog";

/** Images for posts and author avatars. Stored in S3 (see payload.config.ts). */
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    // Files are served at /api/media/file/<name> and appear on the public blog.
    read: () => true,
  },
  upload: {
    // Raster images only. SVG is excluded because it can carry scripts and
    // these files are served from brigadely.com itself.
    mimeTypes: ["image/avif", "image/gif", "image/jpeg", "image/png", "image/webp"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Describe the image for screen readers and search engines.",
      },
    },
  ],
  hooks: revalidateBlogHooks,
};
