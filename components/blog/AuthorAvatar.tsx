import Image from "next/image";

import type { BlogAuthor } from "@/lib/blog/types";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/** The author's photo, or their initials on green. Decorative: the name is always shown next to it. */
export default function AuthorAvatar({ author, size }: { author: BlogAuthor; size: number }) {
  const box = { width: size, height: size };
  return author.avatar ? (
    <Image
      src={author.avatar.url}
      alt=""
      width={size}
      height={size}
      style={box}
      className="shrink-0 rounded-full object-cover"
    />
  ) : (
    <span
      aria-hidden="true"
      style={{ ...box, fontSize: Math.round(size * 0.32) }}
      className="flex shrink-0 items-center justify-center rounded-full bg-primary font-sans font-semibold text-white"
    >
      {initials(author.name)}
    </span>
  );
}
