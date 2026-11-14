import { slugify } from "../slugify";

// The H2 sections of a Lexical document: the entries of a term page's table of
// contents, and the anchor id each heading is rendered with (see
// components/blog/RichText.tsx). Computing both in one pass keeps them in sync.

export type OutlineEntry = {
  id: string;
  title: string;
};

export type ContentOutline = {
  entries: OutlineEntry[];
  /** Anchor id per H2 heading node (the same objects the renderer receives). */
  headingIds: WeakMap<object, string>;
};

type LexicalNodeLike = {
  type?: unknown;
  tag?: unknown;
  text?: unknown;
  children?: unknown;
};

type LexicalDocument = {
  root: { children: readonly unknown[] };
};

function plainText(node: unknown): string {
  if (typeof node !== "object" || node === null) return "";
  const { type, text, children } = node as LexicalNodeLike;
  if (typeof text === "string") return text;
  if (type === "linebreak") return " ";
  return Array.isArray(children) ? children.map(plainText).join("") : "";
}

/**
 * Top-level H2 headings in document order. Each gets an id from its text
 * ("How PAYE works" → "how-paye-works"), made unique against the others and
 * against `reservedIds`, the ids the page already uses elsewhere.
 */
export function outlineOf(
  content: LexicalDocument | null | undefined,
  reservedIds: readonly string[] = [],
): ContentOutline {
  const used = new Set(reservedIds);
  const entries: OutlineEntry[] = [];
  const headingIds = new WeakMap<object, string>();

  for (const node of content?.root.children ?? []) {
    if (typeof node !== "object" || node === null) continue;
    const { type, tag } = node as LexicalNodeLike;
    if (type !== "heading" || tag !== "h2") continue;

    const title = plainText(node).replace(/\s+/g, " ").trim();
    if (!title) continue;

    const base = slugify(title) || "section";
    let id = base;
    for (let suffix = 2; used.has(id); suffix += 1) id = `${base}-${suffix}`;
    used.add(id);

    entries.push({ id, title });
    headingIds.set(node, id);
  }

  return { entries, headingIds };
}
