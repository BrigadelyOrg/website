import { SITE_URL } from "./site";

/**
 * CMS validation for button and link targets: a path on this site ("/pricing",
 * "/#compliance") or a full https:// or mailto: link.
 */
export function validateLink(value: string | null | undefined): true | string {
  const link = value?.trim() ?? "";
  if (!link) return "Enter a link.";
  if (link.startsWith("/") && !link.startsWith("//")) return true;
  if (/^(https:\/\/|mailto:)\S+$/i.test(link)) return true;
  return 'Use a path on this site, like "/pricing", or a full link starting with https://.';
}

/** Links that leave brigadely.com open in a new tab. */
export function isExternalLink(link: string): boolean {
  return /^https?:\/\//i.test(link) && !link.startsWith(SITE_URL);
}
