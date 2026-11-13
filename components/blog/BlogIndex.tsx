"use client";

import { useMemo, useState } from "react";

import type { BlogCategory, BlogPostCard } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

import PostCard from "./PostCard";

const PAGE_SIZE = 9;
const ALL = "all";
const STAGGER_MS = 60;

// Applied only to cards revealed by a filter change or "Load more", never on
// first paint (that would delay content), and skipped under reduced motion.
const REVEAL_ANIMATION =
  "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both motion-safe:duration-500";

type BlogIndexProps = {
  posts: BlogPostCard[];
  categories: BlogCategory[];
};

export default function BlogIndex({ posts, categories }: BlogIndexProps) {
  const [activeSlug, setActiveSlug] = useState<string>(ALL);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Cards at or after this index animate in; Infinity means "none" (first paint).
  const [animateFrom, setAnimateFrom] = useState(Number.POSITIVE_INFINITY);

  const filtered = useMemo(
    () => (activeSlug === ALL ? posts : posts.filter((post) => post.category?.slug === activeSlug)),
    [posts, activeSlug],
  );
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visible.length < filtered.length;

  const filters = [{ slug: ALL, title: "All" }, ...categories];

  function selectCategory(slug: string) {
    if (slug === activeSlug) return;
    setActiveSlug(slug);
    setVisibleCount(PAGE_SIZE);
    setAnimateFrom(0);
  }

  function loadMore() {
    setAnimateFrom(visibleCount);
    setVisibleCount((count) => count + PAGE_SIZE);
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Filter articles by category"
        className="-mx-6 mb-12 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {filters.map((filter) => {
          const isActive = filter.slug === activeSlug;
          return (
            <button
              key={filter.slug}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectCategory(filter.slug)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a3d] focus-visible:ring-offset-2",
                isActive
                  ? "bg-[#111111] text-white"
                  : "bg-white text-gray-600 ring-1 ring-inset ring-gray-200 hover:text-[#111111] hover:ring-gray-300",
              )}
            >
              {filter.title}
            </button>
          );
        })}
      </div>

      {/* Re-keyed per category so a filter change re-mounts (and re-animates) the grid. */}
      <div key={activeSlug} className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, index) => {
          const animate = index >= animateFrom;
          return (
            <PostCard
              key={post.id}
              post={post}
              headingLevel="h2"
              className={animate ? REVEAL_ANIMATION : undefined}
              style={animate ? { animationDelay: `${(index - animateFrom) * STAGGER_MS}ms` } : undefined}
            />
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {filtered.length} articles
      </p>

      {hasMore && (
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            className="rounded-full border border-[#111111]/20 bg-transparent px-8 py-3.5 font-sans text-sm font-semibold text-[#111111] transition duration-200 hover:border-[#111111]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a3d] focus-visible:ring-offset-2"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
