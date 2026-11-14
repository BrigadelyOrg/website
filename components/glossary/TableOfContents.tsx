"use client";

import { useEffect, useState } from "react";

import type { OutlineEntry } from "@/lib/glossary/outline";
import { cn } from "@/lib/utils";

/** A section counts as "being read" once its heading passes this line (just below the fixed header). */
const READING_LINE_PX = 140;

/** The term page's sticky sidebar: one link per H2 (plus FAQs), the current section highlighted. */
export default function TableOfContents({ entries }: { entries: OutlineEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);

  useEffect(() => {
    if (entries.length === 0) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = entries[0].id;
      for (const { id } of entries) {
        const heading = document.getElementById(id);
        if (heading && heading.getBoundingClientRect().top <= READING_LINE_PX) current = id;
      }
      // A short last section can't scroll up to the line: at the very bottom, it's the one being read.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActiveId(atBottom ? entries[entries.length - 1].id : current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [entries]);

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
