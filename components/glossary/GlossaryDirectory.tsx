"use client";

import { ChevronDown, Search, X } from "lucide-react";
import Link from "next/link";
import { useId, useMemo, useRef, useState, type ReactNode } from "react";

import {
  GLOSSARY_LETTERS,
  groupByLetter,
  letterAnchor,
  matchesSearch,
  type GlossaryLetter,
} from "@/lib/glossary/letters";
import type { GlossaryTermLink } from "@/lib/glossary/types";
import { cn } from "@/lib/utils";

/** Terms shown per letter before "Show all". */
const COLLAPSED_COUNT = 8;

// Terms revealed by "Show all" fade in; skipped under reduced motion.
const REVEAL_ANIMATION =
  "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-300";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

type GlossaryDirectoryProps = {
  terms: GlossaryTermLink[];
  /** From /glossary?q=…, e.g. the quick search on a term's page. */
  initialQuery?: string;
  /** The hero's heading and introduction, shown above the search box. */
  children: ReactNode;
};

/**
 * The /glossary directory: instant search, the A–Z jump bar and every term
 * grouped by letter. All terms are in the HTML (collapsed ones are only
 * hidden), so search engines can follow every link.
 */
export default function GlossaryDirectory({ terms, initialQuery = "", children }: GlossaryDirectoryProps) {
  const searchId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [expanded, setExpanded] = useState<ReadonlySet<GlossaryLetter>>(() => new Set());

  const search = query.trim();
  const groups = useMemo(
    () => groupByLetter(search ? terms.filter((entry) => matchesSearch(entry.term, search)) : terms),
    [terms, search],
  );
  const lettersWithTerms = new Set(groups.map((group) => group.letter));
  const matchCount = groups.reduce((count, group) => count + group.entries.length, 0);

  function changeQuery(next: string) {
    setQuery(next);
    // Keep the address shareable (/glossary?q=paye) without a navigation.
    const url = new URL(window.location.href);
    if (next.trim()) url.searchParams.set("q", next.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }

  function clearSearch() {
    changeQuery("");
    inputRef.current?.focus();
  }

  function toggle(letter: GlossaryLetter) {
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(letter)) next.delete(letter);
      else next.add(letter);
      return next;
    });
  }

  return (
    <>
      <section className="bg-[#F4EFE4] px-6 pb-12 pt-32 md:pb-14 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          {children}

          <div role="search" className="relative mt-10 max-w-2xl">
            <label htmlFor={searchId} className="sr-only">
              Search the glossary
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            />
            <input
              ref={inputRef}
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => changeQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape" && query) {
                  event.preventDefault();
                  changeQuery("");
                }
              }}
              placeholder="Search glossary terms like PAYE, NSITF, Pension, WHT..."
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              // On phones the placeholder is wider than the box: end it with "…" rather than mid-word.
              className="h-14 w-full text-ellipsis rounded-full border border-black/10 bg-white pl-14 pr-14 font-sans text-base text-[#111111] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className={cn(
                  "absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-[#111111]",
                  FOCUS_RING,
                )}
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>

          <nav aria-label="Jump to letter" className="mt-8">
            <ul className="flex flex-wrap gap-1">
              {GLOSSARY_LETTERS.map((letter) => (
                <li key={letter}>
                  {lettersWithTerms.has(letter) ? (
                    <a
                      href={`#${letterAnchor(letter)}`}
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-lg font-sans text-sm font-semibold text-[#111111] transition hover:bg-white hover:text-primary",
                        FOCUS_RING,
                      )}
                    >
                      {letter}
                    </a>
                  ) : (
                    // No terms under this letter (or none matching the search): shown, not linked.
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 cursor-default select-none place-items-center rounded-lg font-sans text-sm font-semibold text-[#111111]/25"
                    >
                      {letter}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section aria-label="Glossary terms" className="bg-white px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <p aria-live="polite" className={search ? "pt-10 font-sans text-sm text-gray-500" : "sr-only"}>
            {search
              ? `${matchCount} ${matchCount === 1 ? "term matches" : "terms match"} “${search}”`
              : `${terms.length} ${terms.length === 1 ? "term" : "terms"}`}
          </p>

          {terms.length === 0 ? (
            <div className="mt-14 rounded-3xl border border-dashed border-gray-200 px-6 py-20 text-center">
              <p className="font-sans text-lg font-semibold text-[#111111]">The glossary is on its way.</p>
              <p className="mt-2 font-sans text-sm text-gray-500">
                Definitions of payroll, tax and compliance terms are being written.
              </p>
            </div>
          ) : groups.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-sans text-lg font-semibold text-[#111111]">No terms match “{search}”.</p>
              <p className="mt-2 font-sans text-sm text-gray-500">
                Try an abbreviation such as PAYE or NHF, or browse every term.
              </p>
              <button
                type="button"
                onClick={clearSearch}
                className={cn(
                  "mt-6 rounded-full border border-[#111111]/20 px-6 py-3 font-sans text-sm font-semibold text-[#111111] transition hover:border-[#111111]/50",
                  FOCUS_RING,
                )}
              >
                Clear search
              </button>
            </div>
          ) : (
            groups.map(({ letter, entries }) => {
              const anchor = letterAnchor(letter);
              const collapsible = !search && entries.length > COLLAPSED_COUNT;
              const isExpanded = !collapsible || expanded.has(letter);
              return (
                <section
                  key={letter}
                  id={anchor}
                  aria-labelledby={`${anchor}-heading`}
                  className="scroll-mt-28 border-b border-gray-200 py-10 md:py-12"
                >
                  <div className="flex items-center gap-3">
                    <h2
                      id={`${anchor}-heading`}
                      className="font-sans text-4xl font-black leading-none tracking-[-0.03em] text-[#111111] md:text-5xl"
                    >
                      {letter}
                    </h2>
                    <span className="rounded-full bg-brand-mint px-2.5 py-1 font-sans text-xs font-semibold tabular-nums text-primary">
                      {entries.length}
                      <span className="sr-only"> {entries.length === 1 ? "term" : "terms"}</span>
                    </span>
                  </div>

                  <ul
                    id={`${anchor}-list`}
                    className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {entries.map((entry, index) => {
                      const extra = collapsible && index >= COLLAPSED_COUNT;
                      return (
                        <li
                          key={entry.slug}
                          hidden={extra && !isExpanded}
                          className={extra ? REVEAL_ANIMATION : undefined}
                        >
                          <Link
                            href={`/glossary/${entry.slug}`}
                            className="rounded-sm font-sans text-[15px] leading-relaxed text-gray-700 underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            {entry.term}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {collapsible && (
                    <button
                      type="button"
                      onClick={() => toggle(letter)}
                      aria-expanded={isExpanded}
                      aria-controls={`${anchor}-list`}
                      className={cn(
                        "mt-6 inline-flex items-center gap-1.5 rounded-full font-sans text-sm font-semibold text-primary transition-colors hover:text-primary-dark",
                        FOCUS_RING,
                      )}
                    >
                      {isExpanded ? "Show fewer" : `Show all ${entries.length}`}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180")}
                      />
                    </button>
                  )}
                </section>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
