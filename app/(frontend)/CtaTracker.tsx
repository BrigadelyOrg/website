"use client";

import { useEffect } from "react";

import { ctaLabelFor, trackCtaClick } from "@/lib/analytics/cta";

/**
 * Sends a GA4 `cta_click` event (cta_label, page_path) when a visitor clicks a
 * sign-up or booking CTA anywhere on the public site. One listener covers every
 * page, so new CTAs are tracked without extra code; add `data-track-cta` to any
 * other element to track it too (see lib/analytics/cta.ts).
 *
 * Mounted only in the (frontend) layout, so /admin clicks are never sent.
 */
export function CtaTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Primary clicks (including keyboard Enter), and middle clicks that open a link in a new tab.
      if (event.type === "auxclick" && event.button !== 1) return;
      if (!(event.target instanceof Element)) return;
      const label = ctaLabelFor(event.target);
      if (label) trackCtaClick(label);
    };
    // Capture phase: runs even if a component stops the click from bubbling.
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("auxclick", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("auxclick", onClick, { capture: true });
    };
  }, []);

  return null;
}
