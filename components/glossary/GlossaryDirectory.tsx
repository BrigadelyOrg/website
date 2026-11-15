"use client";

import { ArrowRight, ChevronsUpDown, Search, X } from "lucide-react";
import Link from "next/link";
import { useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";

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

/** The results area, which the search button scrolls to. */
const RESULTS_ID = "glossary-terms";

// Terms revealed by "Show all" fade in; skipped under reduced motion.
const REVEAL_ANIMATION =
  "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-300";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

type GlossaryDirectoryProps = {
  terms: GlossaryTermLink[];
  /** From /glossary?q=…, e.g. the quick search on a term's page. */
  initialQuery?: string;
  /** The hero's icon, heading and introduction, shown above the search box. */
  children: ReactNode;
};

/** Pale facets across the hero's corners, for depth. Decorative only. */
function HeroFacets() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <polygon points="0,0 13,0 0,46" fill="#FFFFFF" fillOpacity="0.45" />
      <polygon points="0,64 5,100 0,100" fill="#FFFFFF" fillOpacity="0.45" />
      <polygon points="74,0 100,0 100,100 97,100 93,19" fill="#FFFFFF" fillOpacity="0.45" />
    </svg>
  );
}

/**
 * The /glossary directory: a centred hero with instant search and the A–Z jump
 * bar, then every term grouped by letter in a grid of columns. All terms are in
 * the HTML (collapsed ones are only hidden), so search engines can follow every link.
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

  /** Enter or the search button: results filter as you type, so this jumps to them. */
  function showResults(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // On phones, close the keyboard so the results aren't hidden behind it.
    if (window.matchMedia("(pointer: coarse)").matches) inputRef.current?.blur();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(RESULTS_ID)?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth" });
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
      <section className="relative overflow-hidden bg-[#F4EFE4] px-6 pb-16 pt-32 md:pb-20 lg:pt-40">
        <HeroFacets />
        <div className="relative mx-auto max-w-5xl text-center">
          {children}

          <form role="search" onSubmit={showResults} className="relative mx-auto mt-10 max-w-4xl">
            <label htmlFor={searchId} className="sr-only">
              Search the glossary
            </label>
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
              className={cn(
                "h-14 w-full text-ellipsis rounded-full border border-black/5 bg-white pl-6 text-left font-sans text-base text-[#111111] shadow-[0_12px_32px_-14px_rgba(17,17,17,0.22)] outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15 md:h-[4.5rem] md:pl-8 md:text-lg [&::-webkit-search-cancel-button]:appearance-none",
                // Room for the search button, plus the clear button while there is a query.
                query ? "pr-28 md:pr-32" : "pr-16 md:pr-20",
              )}
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className={cn(
                  "absolute right-[3.75rem] top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-[#111111] md:right-[4.5rem]",
                  FOCUS_RING,
                )}
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              aria-label="Show results"
              className={cn(
                "absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#111111] text-white transition-colors hover:bg-primary md:right-3 md:h-12 md:w-12",
                FOCUS_RING,
              )}
            >
              <Search aria-hidden="true" className="h-[18px] w-[18px] md:h-5 md:w-5" />
            </button>
          </form>

          {/* All 27 letters fit on one line from 1024px wide. */}
          <nav aria-label="Jump to letter" className="mx-auto mt-8 md:mt-10">
            <ul className="flex flex-wrap justify-center gap-x-0.5 gap-y-1 md:gap-x-1">
              {GLOSSARY_LETTERS.map((letter) => (
                <li key={letter}>
                  {lettersWithTerms.has(letter) ? (
                    <a
                      href={`#${letterAnchor(letter)}`}
                      className={cn(
                        "grid h-9 min-w-8 place-items-center rounded-md px-1 font-sans text-base font-bold text-[#111111] transition-colors hover:text-primary md:h-10 md:text-xl",
                        FOCUS_RING,
                      )}
                    >
                      {letter}
                    </a>
                  ) : (
                    // No terms under this letter (or none matching the search): shown, not linked.
                    <span
                      aria-hidden="true"
                      className="grid h-9 min-w-8 cursor-default select-none place-items-center px-1 font-sans text-base font-bold text-[#111111]/25 md:h-10 md:text-xl"
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

      <section
        id={RESULTS_ID}
        aria-label="Glossary terms"
        className="scroll-mt-24 bg-white px-6 pb-24 pt-12 md:px-10 md:pt-20 xl:px-16"
      >
        {/* Wider than the page's usual container, so long term names rarely wrap. */}
        <div className="mx-auto max-w-[1700px]">
          <p aria-live="polite" className={search ? "mb-10 text-center font-sans text-sm text-gray-500" : "sr-only"}>
            {search
              ? `${matchCount} ${matchCount === 1 ? "term matches" : "terms match"} “${search}”`
              : `${terms.length} ${terms.length === 1 ? "term" : "terms"}`}
          </p>

          {terms.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 px-6 py-20 text-center">
              <p className="font-sans text-lg font-semibold text-[#111111]">The glossary is on its way.</p>
              <p className="mt-2 font-sans text-sm text-gray-500">
                Definitions of payroll, tax and compliance terms are being written.
              </p>
            </div>
          ) : groups.length === 0 ? (
            <div className="py-6 text-center">
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
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:gap-y-14 lg:grid-cols-3 lg:gap-x-12 xl:grid-cols-4 xl:gap-y-20">
              {groups.map(({ letter, entries }) => {
                const anchor = letterAnchor(letter);
                const collapsible = !search && entries.length > COLLAPSED_COUNT;
                const isExpanded = !collapsible || expanded.has(letter);
                return (
                  <section key={letter} id={anchor} aria-labelledby={`${anchor}-heading`} className="scroll-mt-28">
                    <div className="border-b border-gray-200 px-3 pb-5 pt-3">
                      {/* The count sits at the letter's top-right corner, like a notification badge. */}
                      <div className="relative inline-block">
                        <h2
                          id={`${anchor}-heading`}
                          className="font-sans text-4xl font-black leading-none tracking-[-0.03em] text-[#111111] md:text-5xl"
                        >
                          {letter}
                        </h2>
                        <span className="absolute left-full top-0 ml-1 grid h-7 min-w-7 -translate-y-1/2 place-items-center rounded-full bg-brand-mint px-1.5 font-sans text-xs font-bold tabular-nums text-primary">
                          {entries.length}
                          <span className="sr-only"> {entries.length === 1 ? "term" : "terms"}</span>
                        </span>
                      </div>
                    </div>

                    <ul id={`${anchor}-list`} className="mt-3">
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
                              className="group inline-flex max-w-full items-center gap-2 rounded-lg px-3 py-2.5 font-sans text-[15px] leading-snug text-gray-800 transition-colors hover:bg-[#F4EFE4] hover:text-[#111111] focus-visible:bg-[#F4EFE4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-base"
                            >
                              <span>{entry.term}</span>
                              <ArrowRight
                                aria-hidden="true"
                                className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                              />
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
                          "ml-3 mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#111111]/15 bg-white px-4 py-2 font-sans text-sm font-semibold text-[#111111] transition-colors hover:border-[#111111]/40 hover:bg-[#F4EFE4]",
                          FOCUS_RING,
                        )}
                      >
                        {isExpanded ? "Show less" : "Show all"}
                        <ChevronsUpDown aria-hidden="true" className="h-4 w-4" />
                      </button>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
