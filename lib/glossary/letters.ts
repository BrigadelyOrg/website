// A–Z grouping and search for the /glossary directory. Pure functions, used on
// the server and in the browser.

type LatinLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
  | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

/** "#" groups terms that start with a digit or symbol. */
export type GlossaryLetter = "#" | LatinLetter;

const isLetter = (value: string): value is LatinLetter => /^[A-Z]$/.test(value);

/** The directory's letters in display order: "#", then A–Z. */
export const GLOSSARY_LETTERS: readonly GlossaryLetter[] = [
  "#",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(isLetter),
];

const stripAccents = (text: string) => text.normalize("NFKD").replace(/[̀-ͯ]/g, "");

/** A term's directory letter: its first letter without accents, or "#" for digits and symbols. */
export function letterOf(term: string): GlossaryLetter {
  const first = stripAccents(term.trim()).charAt(0).toUpperCase();
  return isLetter(first) ? first : "#";
}

/** The id of a letter's section, the target of the A–Z bar ("#" can't be used in a URL fragment as is). */
export function letterAnchor(letter: GlossaryLetter): string {
  return letter === "#" ? "glossary-0-9" : `glossary-${letter.toLowerCase()}`;
}

export type LetterGroup<T> = {
  letter: GlossaryLetter;
  entries: T[];
};

// "1099 form" before "401k", "paye" next to "PAYE": numeric-aware, case-insensitive.
const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

/** Entries grouped under "#" then A–Z, sorted alphabetically within each letter. Empty letters are left out. */
export function groupByLetter<T extends { term: string }>(entries: readonly T[]): LetterGroup<T>[] {
  const byLetter = new Map<GlossaryLetter, T[]>();
  for (const entry of entries) {
    const letter = letterOf(entry.term);
    const group = byLetter.get(letter);
    if (group) group.push(entry);
    else byLetter.set(letter, [entry]);
  }
  return GLOSSARY_LETTERS.flatMap((letter) => {
    const group = byLetter.get(letter);
    return group ? [{ letter, entries: group.sort((a, b) => collator.compare(a.term, b.term)) }] : [];
  });
}

/** Lowercase, no accents, punctuation as single spaces: "Pay-As-You-Earn" → "pay as you earn". */
export function searchKey(text: string): string {
  return stripAccents(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Whether a term matches a search, ignoring case, accents and punctuation ("pay as you" finds PAYE). */
export function matchesSearch(term: string, query: string): boolean {
  const wanted = searchKey(query);
  return wanted === "" || searchKey(term).includes(wanted);
}
