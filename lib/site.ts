/** Public origin, used to build absolute URLs (canonical links, Open Graph, sitemap). */
export const SITE_URL = "https://brigadely.com";

/** Product sign-up, the primary conversion link across the marketing site. */
export const SIGNUP_URL = "https://app.brigadely.com/signup";

/** The site-wide meta description (root layout, home page and its structured data). */
export const SITE_DESCRIPTION =
  "Brigadely is the financial operating system for African businesses. Pay staff, vendors and tax authorities, and account for every payment on one ledger.";

/** The Brigadely wordmark (public/img/logo1.png, 1334 × 341), as used in the header. */
export const LOGO_URL = `${SITE_URL}/img/logo1.png`;

/**
 * Default share image (public/og-image.png). Absolute, because a page that sets
 * its own `openGraph` replaces the root layout's entirely (Next.js merges
 * metadata shallowly), so every such page must list an image itself.
 */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Brigadely: every payment out of your business, on one ledger",
};

/** Brigadely's social profiles: the footer icons and the Organization schema's `sameAs`. */
export const SOCIAL_PROFILES = [
  { name: "Facebook", url: "https://www.facebook.com/people/Brigadely/61591625181991/" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/brigadely" },
  { name: "Instagram", url: "https://www.instagram.com/getbrigadely/" },
] as const;
