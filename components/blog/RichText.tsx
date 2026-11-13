import type { DefaultNodeTypes, SerializedLinkNode } from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  LinkJSXConverter,
  RichText as LexicalRichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Media, Post } from "@/payload-types";

// Article typography. Colours come from the `prose-brigadely` theme in tailwind.config.js.
const PROSE = [
  "prose prose-lg prose-brigadely max-w-none",
  "prose-headings:font-sans prose-headings:font-extrabold prose-headings:tracking-[-0.02em]",
  "prose-h2:mt-14 prose-h2:text-[1.75rem] prose-h2:leading-tight",
  "prose-h3:mt-10 prose-h3:text-[1.3rem] prose-h3:leading-snug",
  "prose-p:leading-[1.8] prose-li:leading-[1.75]",
  "prose-a:font-medium prose-a:underline-offset-4 prose-a:decoration-[#007a3d]/40 hover:prose-a:decoration-[#007a3d]",
  "prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-[1.15em]",
  "prose-figure:my-10 prose-img:rounded-2xl",
  "prose-th:bg-[#F4EFE4] prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3",
  // Lexical wraps tables in this container: scroll sideways on small screens.
  "[&_.lexical-table-container]:my-10 [&_.lexical-table-container]:overflow-x-auto [&_.lexical-table-container]:rounded-xl [&_.lexical-table-container]:border [&_.lexical-table-container]:border-gray-200 [&_table]:my-0",
].join(" ");

function isMedia(value: unknown): value is Media {
  return typeof value === "object" && value !== null && "url" in value && "alt" in value;
}

/** Internal links can only target posts (see cms/editor.ts). */
function internalDocToHref({ linkNode }: { linkNode: SerializedLinkNode }): string {
  const value: unknown = linkNode.fields.doc?.value;
  if (
    linkNode.fields.doc?.relationTo === "posts" &&
    typeof value === "object" &&
    value !== null &&
    "slug" in value &&
    typeof value.slug === "string"
  ) {
    return `/blog/${value.slug}`;
  }
  return "/blog";
}

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // Inline images go through next/image for responsive, optimised delivery.
  upload: ({ node }) => {
    const media: unknown = node.value;
    if (!isMedia(media) || !media.url) return null;
    return (
      <figure>
        <Image
          src={media.url}
          alt={media.alt}
          width={media.width ?? 1600}
          height={media.height ?? 900}
          sizes="(min-width: 800px) 768px, 100vw"
          className="h-auto w-full"
        />
      </figure>
    );
  },
});

type RichTextProps = {
  data: Post["content"];
  className?: string;
};

export default function RichText({ data, className }: RichTextProps) {
  return (
    <LexicalRichText
      data={data as SerializedEditorState}
      converters={converters}
      className={cn(PROSE, className)}
    />
  );
}
