import type { GenerateDescription, GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";

import { SITE_URL } from "../lib/site";
import type { Post } from "../payload-types";

// The SEO tab's "Auto-generate" buttons run these against the unsaved form,
// so any field may still be missing.
type PostFormData = Partial<Post>;

export const generateTitle: GenerateTitle<PostFormData> = ({ doc }) =>
  doc.title ? `${doc.title} | Brigadely` : "Brigadely";

export const generateDescription: GenerateDescription<PostFormData> = ({ doc }) => doc.excerpt ?? "";

export const generateURL: GenerateURL<PostFormData> = ({ doc }) =>
  doc.slug ? `${SITE_URL}/blog/${doc.slug}` : `${SITE_URL}/blog`;
