/**
 * Builders for the Lexical JSON the CMS editor saves, so seed content can be
 * written as plain TypeScript. A string is plain text; { bold } is bold text,
 * used for the lead-in of list items.
 */
import type { GlossaryTerm } from "../../payload-types";

export type Inline = string | { bold: string };

const BOLD = 1;
const BLOCK = { direction: "ltr", format: "", indent: 0, version: 1 } as const;

const text = (value: string, format = 0) => ({
  type: "text",
  text: value,
  format,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const inline = (parts: readonly Inline[]) =>
  parts.map((part) => (typeof part === "string" ? text(part) : text(part.bold, BOLD)));

export const paragraph = (...parts: Inline[]) => ({
  type: "paragraph",
  children: inline(parts),
  ...BLOCK,
  textFormat: 0,
  textStyle: "",
});

/** An H2: term pages list these in the table of contents. */
export const heading = (title: string) => ({ type: "heading", tag: "h2", children: [text(title)], ...BLOCK });

const list = (listType: "bullet" | "number", items: readonly Inline[][]) => ({
  type: "list",
  listType,
  tag: listType === "number" ? "ol" : "ul",
  start: 1,
  children: items.map((parts, index) => ({
    type: "listitem",
    value: index + 1,
    children: inline(parts),
    ...BLOCK,
  })),
  ...BLOCK,
});

export const bullets = (...items: Inline[][]) => list("bullet", items);
export const steps = (...items: Inline[][]) => list("number", items);

/** A highlighted note: a quote block, which term pages render as a callout panel. */
export const callout = (...parts: Inline[]) => ({ type: "quote", children: inline(parts), ...BLOCK });

/** The first row is the header row. */
export const table = (rows: readonly string[][]) => ({
  type: "table",
  children: rows.map((cells, rowIndex) => ({
    type: "tablerow",
    children: cells.map((cell) => ({
      type: "tablecell",
      headerState: rowIndex === 0 ? 1 : 0,
      colSpan: 1,
      rowSpan: 1,
      backgroundColor: null,
      children: [paragraph(cell)],
      ...BLOCK,
    })),
    ...BLOCK,
  })),
  ...BLOCK,
});

type Block =
  | ReturnType<typeof paragraph>
  | ReturnType<typeof heading>
  | ReturnType<typeof list>
  | ReturnType<typeof callout>
  | ReturnType<typeof table>;

export const doc = (...children: Block[]): GlossaryTerm["content"] => ({
  root: { type: "root", children, ...BLOCK },
});

/** One glossary term to seed. */
export type SeedTerm = Pick<GlossaryTerm, "term" | "slug" | "shortDefinition" | "category" | "content"> & {
  faqs: { question: string; answer: string }[];
  /** Slugs of other seeded terms to list under "Related terms". */
  related: string[];
};
