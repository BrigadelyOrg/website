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

export default function AuthorByline({ author }: { author: BlogAuthor }) {
  return (
    <div className="flex items-center gap-3">
      {/* Decorative: the author's name is right next to it. */}
      {author.avatar ? (
        <Image
          src={author.avatar.url}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#007a3d] font-sans text-sm font-semibold text-white"
        >
          {initials(author.name)}
        </span>
      )}
      <div className="font-sans text-sm leading-tight">
        <p className="font-semibold text-[#111111]">{author.name}</p>
        {author.roleTitle && <p className="mt-1 text-gray-500">{author.roleTitle}</p>}
      </div>
    </div>
  );
}
