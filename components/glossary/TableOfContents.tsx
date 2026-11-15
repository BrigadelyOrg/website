"use client";

import { useMemo } from "react";

import { useActiveSection } from "@/lib/hooks/useActiveSection";
import type { OutlineEntry } from "@/lib/outline";
import { cn } from "@/lib/utils";

/** The term page's sticky sidebar: one link per H2 (plus FAQs), the current section highlighted. */
export default function TableOfContents({ entries }: { entries: OutlineEntry[] }) {
  const ids = useMemo(() => entries.map((entry) => entry.id), [entries]);
  const activeId = useActiveSection(ids);

  return (
    <nav aria-labelledby="toc-heading">
      <p
        id="toc-heading"
        className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#111111]"
      >
        Table of Contents
      </p>
      <ol className="mt-4 border-l border-gray-200">
        {entries.map((entry) => {
          const active = entry.id === activeId;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-4 font-sans text-sm leading-snug transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  active
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-[#111111]",
                )}
              >
                {entry.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
