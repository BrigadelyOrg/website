import { Layers } from "lucide-react";
import Link from "next/link";

import { glossaryFeatureCallout } from "@/content/glossaryFeatureMap";
import { FEATURE_NAV_ITEMS } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * A small card under a glossary definition pointing to the matching product
 * page (content/glossaryFeatureMap.ts). Renders nothing for unmapped terms.
 */
export default function GlossaryFeatureCallout({ slug, className }: { slug: string; className?: string }) {
  const callout = glossaryFeatureCallout(slug);
  if (!callout) return null;

  // The feature page's menu icon; the ledger icon for the "how it works" callout.
  const Icon = FEATURE_NAV_ITEMS.find((item) => item.href === callout.href)?.icon ?? Layers;

  return (
    <aside
      aria-labelledby="glossary-feature-callout-heading"
      className={cn("flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:items-center sm:p-6", className)}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-mint text-primary">
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <p id="glossary-feature-callout-heading" className="font-sans text-base font-bold leading-snug text-[#111111]">
          {callout.heading}
        </p>
        <Link
          href={callout.href}
          className="mt-1.5 inline-flex shrink-0 items-center gap-1.5 rounded-sm font-sans text-sm font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:mt-0"
        >
          {callout.linkText} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
}
