/**
 * Seeds the glossary with 30 Nigerian payroll, tax, compliance, cross-border
 * and finance terms (the content lives in scripts/glossary/terms/).
 *
 *   npm run seed:glossary            # creates the missing terms, published
 *   npm run seed:glossary -- draft   # creates them as drafts instead
 *
 * It writes to the database in DATABASE_URI (from .env). A term whose slug
 * already exists is skipped and never changed, so edits made in /admin are
 * safe and the script can be re-run at any time.
 *
 * Content reflects the law as of November 2026, including the Nigeria Tax Act
 * 2025 and the Nigeria Tax Administration Act 2025 (in force from 1 January 2026).
 */
import { getPayload } from "payload";

import { GLOSSARY_CATEGORIES } from "../lib/glossary/categories";
import config from "../payload.config";
import type { SeedTerm } from "./glossary/lexical";
import { SEED_TERMS } from "./glossary/terms";

/** Catches typos in the seed data before anything is written. */
function validate(terms: readonly SeedTerm[]): void {
  const categories = new Set<string>(GLOSSARY_CATEGORIES.map((category) => category.value));
  const slugs = new Set<string>();
  for (const seed of terms) {
    if (!categories.has(seed.category)) throw new Error(`${seed.slug}: unknown category "${seed.category}"`);
    if (slugs.has(seed.slug)) throw new Error(`Duplicate slug "${seed.slug}"`);
    slugs.add(seed.slug);
  }
  for (const seed of terms) {
    for (const slug of seed.related) {
      if (slug === seed.slug || !slugs.has(slug)) {
        throw new Error(`${seed.slug}: related term "${slug}" is not another seeded term`);
      }
    }
  }
}

/** Where the terms are going ("host/database"), without the credentials. */
function databaseLabel(): string {
  try {
    const url = new URL(process.env.DATABASE_URI ?? "");
    return `${url.hostname}${url.pathname}`;
  } catch {
    return "the database in DATABASE_URI";
  }
}

// `payload run` passes on positional arguments only (not --flags).
const status = process.argv.slice(2).includes("draft") ? "draft" : "published";

validate(SEED_TERMS);
console.log(
  `Seeding ${SEED_TERMS.length} glossary terms into ${databaseLabel()}; new terms will be ${status === "draft" ? "drafts" : "published"}.\n`,
);

const payload = await getPayload({ config });

const idBySlug = new Map<string, number>();
const created: SeedTerm[] = [];

for (const seed of SEED_TERMS) {
  const { docs } = await payload.find({
    collection: "glossary",
    where: { slug: { equals: seed.slug } },
    limit: 1,
    depth: 0,
    select: { slug: true },
  });
  const existing = docs[0];
  if (existing) {
    idBySlug.set(seed.slug, existing.id);
    console.log(`  Skipped: ${seed.term} (already exists)`);
    continue;
  }

  const doc = await payload.create({
    collection: "glossary",
    data: {
      term: seed.term,
      slug: seed.slug,
      shortDefinition: seed.shortDefinition,
      category: seed.category,
      status,
      content: seed.content,
      faqs: seed.faqs,
    },
  });
  idBySlug.set(seed.slug, doc.id);
  created.push(seed);
  console.log(`  Created: ${seed.term} → /glossary/${seed.slug}`);
}

// Related terms point at each other, so they are linked once every term exists.
// Only terms created by this run are updated; existing terms stay as they are.
let linked = 0;
for (const seed of created) {
  const id = idBySlug.get(seed.slug);
  const relatedTerms = seed.related.flatMap((slug) => {
    const relatedId = idBySlug.get(slug);
    return relatedId === undefined ? [] : [relatedId];
  });
  if (id === undefined || relatedTerms.length === 0) continue;
  await payload.update({ collection: "glossary", id, data: { relatedTerms } });
  linked += 1;
}

const skipped = SEED_TERMS.length - created.length;
console.log(`\nSummary: ${created.length} created, ${skipped} skipped (already existed), ${SEED_TERMS.length} terms in the seed.`);
if (linked > 0) console.log(`Related terms linked on ${linked} new ${linked === 1 ? "term" : "terms"}.`);
if (created.length > 0) {
  console.log(
    status === "published"
      ? "New term pages are live now. /glossary, /sitemap.xml and /llms.txt are cached for up to an hour; to refresh them immediately, open any term in /admin → Glossary and click Save."
      : "New terms are drafts: review them in /admin → Glossary and set each one's Status to Published.",
  );
}
