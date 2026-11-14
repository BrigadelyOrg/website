import { getPublishedPosts } from "@/lib/blog/queries";
import { getGlossaryDefinitions } from "@/lib/glossary/queries";
import { SITE_URL } from "@/lib/site";

// /llms.txt (https://llmstxt.org): a Markdown index of the site for AI
// assistants. Built per request from cached CMS data, like sitemap.xml, so new
// glossary terms and articles are listed without a rebuild.
export const dynamic = "force-dynamic";

// Descriptions match the pages' own metadata.
const SUMMARY =
  "Brigadely handles all your financial operations in one platform - payroll, statutory compliance, vendor payments, and more, built for African businesses.";
const DETAILS =
  "Brigadely calculates, deducts and remits PAYE, pension, NHF, NSITF and ITF on every payroll run. The glossary below explains, in plain English, the Nigerian payroll, tax, compliance, cross-border payment and finance terms behind those obligations; each entry links to a full page with worked examples and FAQs.";

type Entry = { title: string; url: string; note?: string };

function oneLine(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function listItem({ title, url, note }: Entry): string {
  const label = oneLine(title).replace(/[[\]]/g, "\\$&");
  return note ? `- [${label}](${url}): ${oneLine(note)}` : `- [${label}](${url})`;
}

/** An H2 section of links, or nothing when there are no links. */
function section(heading: string, entries: Entry[]): string[] {
  return entries.length > 0 ? [`## ${heading}`, "", ...entries.map(listItem), ""] : [];
}

/** If the database is unreachable, still describe the site rather than fail. */
async function orEmpty<T>(label: string, load: () => Promise<T[]>): Promise<T[]> {
  try {
    return await load();
  } catch (error) {
    console.error(`llms.txt: could not load ${label}`, error);
    return [];
  }
}

export async function GET(): Promise<Response> {
  const [terms, posts] = await Promise.all([
    orEmpty("glossary terms", getGlossaryDefinitions),
    orEmpty("blog posts", getPublishedPosts),
  ]);

  const lines = [
    "# Brigadely",
    "",
    `> ${SUMMARY}`,
    "",
    DETAILS,
    "",
    ...section("Pages", [
      { title: "Home", url: SITE_URL, note: SUMMARY },
      {
        title: "Pricing",
        url: `${SITE_URL}/pricing`,
        note: "Simple, transparent pricing for payroll, statutory compliance and payments built for African businesses.",
      },
      {
        title: "Glossary",
        url: `${SITE_URL}/glossary`,
        note: "Plain-English definitions of the payroll, tax and compliance terms African businesses deal with.",
      },
      {
        title: "Blog",
        url: `${SITE_URL}/blog`,
        note: "Guides, compliance updates, and financial operations insights for African businesses.",
      },
    ]),
    ...section(
      "Glossary",
      terms.map((term) => ({
        title: term.term,
        url: `${SITE_URL}/glossary/${term.slug}`,
        note: term.shortDefinition,
      })),
    ),
    ...section(
      "Blog",
      posts.map((post) => ({ title: post.title, url: `${SITE_URL}/blog/${post.slug}` })),
    ),
    ...section("Optional", [
      { title: "Privacy policy", url: `${SITE_URL}/privacy` },
      { title: "Terms of service", url: `${SITE_URL}/terms` },
    ]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
