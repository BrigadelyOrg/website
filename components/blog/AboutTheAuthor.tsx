import type { BlogAuthor } from "@/lib/blog/types";

import AuthorAvatar from "./AuthorAvatar";

/**
 * "About the author" at the end of an article, from the writer's profile. A
 * third-person bio that starts with their name ("Ada Obi is…") reads as one
 * sentence with the name in bold; any other bio goes under the name.
 */
export default function AboutTheAuthor({ author }: { author: BlogAuthor }) {
  const { bio, name, roleTitle } = author;
  const opensWithName = bio !== null && bio.toLowerCase().startsWith(name.toLowerCase());

  return (
    <section aria-labelledby="about-the-author-heading" className="mt-16 border-t border-gray-200 pt-10">
      <div className="flex gap-5 md:gap-6">
        <AuthorAvatar author={author} size={72} />
        <div className="min-w-0">
          <h2
            id="about-the-author-heading"
            className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-gray-500"
          >
            About the author
          </h2>
          {opensWithName ? (
            <p className="mt-3 font-sans text-base leading-relaxed text-gray-700 md:text-[17px]">
              <strong className="font-semibold text-[#111111]">{bio.slice(0, name.length)}</strong>
              {bio.slice(name.length)}
            </p>
          ) : (
            <>
              <p className="mt-3 font-sans text-base font-semibold text-[#111111] md:text-[17px]">{name}</p>
              {roleTitle && <p className="mt-0.5 font-sans text-sm text-gray-500">{roleTitle}</p>}
              {bio && (
                <p className="mt-3 font-sans text-base leading-relaxed text-gray-700 md:text-[17px]">{bio}</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
