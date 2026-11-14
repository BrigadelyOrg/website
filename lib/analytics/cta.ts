/**
 * Conversion tracking for the public site: a GA4 `cta_click` event, with
 * `cta_label` and `page_path` parameters, whenever a visitor clicks a sign-up
 * or booking CTA. The click listener is app/(frontend)/CtaTracker.tsx.
 *
 * The Google tag reserves `page_path`: it becomes the event's page location, so
 * GA4 files it under its standard "Page path" dimension (what the dashboard's
 * "Top converting pages" reads) rather than as a separate parameter.
 *
 * The server imports CTA_EVENT too (the dashboard counts these events), so
 * nothing here may touch `window` at import time.
 */
import { SIGNUP_URL } from "../site";

export const CTA_EVENT = "cta_click";

/** Link or button text that marks a primary conversion CTA. */
const CTA_TEXT = /\b(start free|book a call)\b/i;
const MAX_LABEL_LENGTH = 100;

const textOf = (element: HTMLElement) =>
  (element.innerText || element.textContent || "").replace(/\s+/g, " ").trim().slice(0, MAX_LABEL_LENGTH);

/**
 * The CTA label for a clicked element, or null when the click wasn't on a CTA:
 * - anything inside an element with `data-track-cta` (its value, or its text);
 * - a link or button whose text contains "Start free" or "Book a call";
 * - any link to the sign-up page (e.g. "Get started").
 */
export function ctaLabelFor(target: Element): string | null {
  const tagged = target.closest<HTMLElement>("[data-track-cta]");
  if (tagged) return tagged.dataset.trackCta?.trim() || textOf(tagged) || "CTA";

  const control = target.closest<HTMLElement>("a, button");
  if (!control) return null;
  const text = textOf(control);
  if (CTA_TEXT.test(text)) return text;

  const link = target.closest<HTMLAnchorElement>("a[href]");
  if (link?.href.startsWith(SIGNUP_URL)) return textOf(link) || "Sign up";
  return null;
}

type DataLayerWindow = Window & { dataLayer?: unknown[] };

/**
 * The standard gtag() function. The Google tag, whether GTM or gtag.js loaded
 * it, reads these commands from the dataLayer; each must be the `arguments`
 * object itself, not an array.
 */
const gtag: (...command: unknown[]) => void = function () {
  const page = window as DataLayerWindow;
  // An array would be read as a GTM command, not a gtag one: it must be `arguments`.
  // eslint-disable-next-line prefer-rest-params
  (page.dataLayer ??= []).push(arguments);
};

export function trackCtaClick(label: string, pagePath: string = window.location.pathname): void {
  gtag("event", CTA_EVENT, { cta_label: label, page_path: pagePath });
}
