import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { formatPostDate } from "@/lib/blog/format";
import type { BlogPostCard } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

type PostCardProps = {
  post: BlogPostCard;
  /** "h2" when cards are the page's main list (/blog); "h3" under a section heading. */
  headingLevel?: "h2" | "h3";
  className?: string;
  style?: CSSProperties;
};

export default function PostCard({ post, headingLevel = "h3", className, style }: PostCardProps) {
  const Heading = headingLevel;

  return (
    <article className={cn("group relative flex h-full flex-col", className)} style={style}>
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#F4EFE4]">
        {post.coverImage && (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            fill
            sizes="(min-width: 1200px) 364px, (min-width: 960px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
          />
        )}
      </div>

      <time
        dateTime={post.publishedDate}
        className="mt-5 font-sans text-xs font-medium text-gray-500"
      >
        {formatPostDate(post.publishedDate)}
      </time>

      <Heading className="mt-2 font-sans text-lg font-bold leading-snug tracking-[-0.01em] text-[#111111] transition-colors duration-200 group-hover:text-[#007a3d]">
        {/* The link stretches over the whole card, so the title stays the link's accessible name. */}
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#007a3d] focus-visible:after:ring-offset-4"
        >
          {post.title}
        </Link>
      </Heading>

      <p className="mt-auto pt-4 font-sans text-sm text-gray-600">{post.authorName}</p>
    </article>
  );
}
