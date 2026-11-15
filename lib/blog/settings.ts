import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import { BLOG_CACHE_TAG, BLOG_CACHE_TTL_SECONDS } from "./cache";
import { DEFAULT_TOC_BUTTON } from "./defaults";

export type ContentSettingsView = {
  tocButton: { label: string; url: string };
};

async function fetchContentSettings(): Promise<ContentSettingsView> {
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({ slug: "content-settings", depth: 0 });
  return {
    tocButton: {
      label: settings.tocButton?.label?.trim() || DEFAULT_TOC_BUTTON.label,
      url: settings.tocButton?.url?.trim() || DEFAULT_TOC_BUTTON.url,
    },
  };
}

const cachedContentSettings = unstable_cache(fetchContentSettings, ["blog", "content-settings"], {
  tags: [BLOG_CACHE_TAG],
  revalidate: BLOG_CACHE_TTL_SECONDS,
});

/** Site-wide article options from /admin → Content settings (cached; saving them expires the cache). */
export async function getContentSettings(): Promise<ContentSettingsView> {
  try {
    return await cachedContentSettings();
  } catch (error) {
    console.error("blog: could not load content settings", error);
    return { tocButton: { ...DEFAULT_TOC_BUTTON } };
  }
}
