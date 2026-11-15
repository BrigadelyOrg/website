"use client";

import { List } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { isExternalLink } from "@/lib/links";
import type { OutlineEntry } from "@/lib/outline";
import { cn } from "@/lib/utils";

type ArticleTableOfContentsProps = {
  entries: OutlineEntry[];
  /** From /admin → Content settings. */
  button: { label: string; url: string };
};

/**
 * The sticky card beside an article: its sections, the one being read
 * highlighted, and a call-to-action button pinned at the bottom. Long lists
 * scroll inside the card, following the reader.
 */
export default function ArticleTableOfContents({ entries, button }: ArticleTableOfContentsProps) {
  const ids = useMemo(() => entries.map((entry) => entry.id), [entries]);
  const activeId = useActiveSection(ids);
  const listRef = useRef<HTMLOListElement>(null);

  // Keep the current section in view inside the card (without scrolling the page).
  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeId) return;
    const link = list.querySelector<HTMLElement>(`[data-section="${CSS.escape(activeId)}"]`);
    if (!link) return;
    const top = link.offsetTop;
    const bottom = top + link.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top - 8;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight + 8;
  }, [activeId]);

  const external = isExternalLink(button.url);

  return (
    <nav
      aria-labelledby="toc-heading"
      className="flex max-h-[calc(100vh-9rem)] flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_16px_40px_-18px_rgba(17,17,17,0.22)]"
    >
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
        <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-mint text-primary">
          <List className="h-4 w-4" />
        </span>
        <p id="toc-heading" className="font-sans text-base font-bold text-[#111111]">
          Table of Contents
        </p>
      </div>

      <ol ref={listRef} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-1">
        {entries.map((entry) => {
          const active = entry.id === activeId;
          return (
            <li key={entry.id} className="border-b border-gray-100 last:border-b-0">
              <a
                href={`#${entry.id}`}
                data-section={entry.id}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "relative block rounded-sm py-3.5 font-sans text-sm leading-snug transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  active
                    ? "font-semibold text-[#111111] after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:rounded-full after:bg-primary"
                    : "text-gray-600 hover:text-[#111111]",
                )}
              >
                {entry.title}
              </a>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-gray-100 p-5">
        <Link
          href={button.url}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
          data-track-cta={`Table of contents: ${button.label}`}
          className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-center font-sans text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {button.label}
        </Link>
      </div>
    </nav>
  );
}
