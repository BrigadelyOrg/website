import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  LinkJSXConverter,
  RichText as LexicalRichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Media, Post, PromoBlock } from "@/payload-types";

import PromoCard from "./PromoCard";

/** Lexical nodes the content can contain: the defaults plus the Promo block (cms/blocks/Promo.ts). */
type ContentNode = DefaultNodeTypes | SerializedBlockNode<PromoBlock>;

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
  // Lexical puts a paragraph in every table cell; its margins would make each row very tall.
  "[&_td>p]:my-0 [&_th>p]:my-0",
  // Lexical wraps tables in this container: scroll sideways on small screens.
  "[&_.lexical-table-container]:my-10 [&_.lexical-table-container]:overflow-x-auto [&_.lexical-table-container]:rounded-xl [&_.lexical-table-container]:border [&_.lexical-table-container]:border-gray-200 [&_table]:my-0",
].join(" ");

/** Collections whose documents have public pages, by link target (see cms/editor.ts). */
const PAGE_PATHS: Readonly<Record<string, string>> = {
  posts: "/blog",
  glossary: "/glossary",
};

const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

function isMedia(value: unknown): value is Media {
  return typeof value === "object" && value !== null && "url" in value && "alt" in value;
}

/** Internal links point at a post (/blog/<slug>) or a glossary term (/glossary/<slug>). */
function internalDocToHref({ linkNode }: { linkNode: SerializedLinkNode }): string {
  const relationTo = linkNode.fields.doc?.relationTo;
  const section = (relationTo && PAGE_PATHS[relationTo]) || "/blog";
  const value: unknown = linkNode.fields.doc?.value;
  if (typeof value === "object" && value !== null && "slug" in value && typeof value.slug === "string") {
    return `${section}/${value.slug}`;
  }
  return section;
}

function buildConverters(headingIds?: WeakMap<object, string>): JSXConvertersFunction<ContentNode> {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    blocks: {
      // An advert from Content → Promos; drafts render nothing.
      promo: ({ node }) => <PromoCard promo={node.fields.promo} />,
    },
    // Headings with an anchor id (a table of contents links to them) stop below the fixed header.
    heading: ({ node, nodesToJSX }) => {
      const Tag = HEADING_TAGS.has(node.tag) ? node.tag : "h2";
      const id = headingIds?.get(node);
      return (
        <Tag id={id} className={id ? "scroll-mt-28" : undefined}>
          {nodesToJSX({ nodes: node.children })}
        </Tag>
      );
    },
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
}

type RichTextProps = {
  /** Lexical content of a post or a glossary term (both use the same editor). */
  data: Post["content"];
  className?: string;
  /** Anchor ids for heading nodes, for a table of contents (see lib/glossary/outline.ts). */
  headingIds?: WeakMap<object, string>;
};

export default function RichText({ data, className, headingIds }: RichTextProps) {
  return (
    <LexicalRichText
      data={data as SerializedEditorState}
      converters={buildConverters(headingIds)}
      className={cn(PROSE, className)}
    />
  );
}
