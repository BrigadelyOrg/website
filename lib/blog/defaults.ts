import { SIGNUP_URL } from "../site";

// Kept apart from lib/blog/settings.ts (which loads the Payload config), so the
// CMS config can import these without a circular dependency.

/** The table of contents button until an admin changes it in Content settings. */
export const DEFAULT_TOC_BUTTON = { label: "Try Brigadely", url: SIGNUP_URL } as const;
