import { ChevronDown } from "lucide-react";

import type { OutlineEntry } from "@/lib/outline";
import { cn } from "@/lib/utils";

/**
 * Phones and tablets: the table of contents folds into the top of the article
 * or glossary entry (the sticky card takes over from 1024px wide).
 */
export default function MobileTableOfContents({ entries, className }: { entries: OutlineEntry[]; className?: string }) {
  return (
    <details className={cn("group rounded-2xl border border-gray-200 px-5 py-4 lg:hidden", className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between font-sans text-sm font-semibold text-[#111111] [&::-webkit-details-marker]:hidden">
        Table of Contents
        <ChevronDown
          aria-hidden="true"
          className="h-4 w-4 text-gray-500 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <ol className="mt-3 space-y-2 border-t border-gray-100 pt-3">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className="font-sans text-sm text-gray-600 transition-colors hover:text-primary">
              {entry.title}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
