/**
 * Creates three starter promos, as drafts, with product screenshots from
 * scripts/assets/promos/ (PNG renders of the site's mockups: the media library
 * doesn't accept SVG). Edit and publish them in /admin → Promos.
 *
 *   npm run seed:promos
 *
 * It writes to the database in DATABASE_URI, and uploads the images to S3 when
 * S3 is configured (as in production). Promos whose name already exists are
 * skipped, so it is safe to run more than once.
 *
 * The copy reuses claims already on the home page (compliance table, closing
 * call to action and the security FAQ).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getPayload, type Payload } from "payload";

import { SIGNUP_URL } from "../lib/site";
import config from "../payload.config";
import type { Promo } from "../payload-types";

const ASSETS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "assets/promos");

type StarterPromo = Pick<Promo, "name" | "label" | "heading" | "body" | "buttonLabel" | "buttonUrl" | "theme"> & {
  image: { file: string; alt: string };
};

const STARTERS: StarterPromo[] = [
  {
    name: "Statutory compliance",
    label: "Statutory compliance",
    heading: "Every statutory obligation, on one ledger",
    body: "Brigadely calculates, remits and files every statutory deduction your jurisdiction requires on each payroll run, with a verifiable audit trail for every filing.",
    buttonLabel: "Learn more",
    buttonUrl: "/#compliance",
    theme: "bone",
    image: {
      file: "mockup-compliance.png",
      alt: "Brigadely compliance dashboard showing PAYE, pension, NHF, NSITF and ITF remittances and their status",
    },
  },
  {
    name: "Payments",
    label: "Payments",
    heading: "One ledger. Every payment out of your business.",
    body: "Start with payroll and compliance. Add vendor payments, expenses and cross-border payouts as your operation grows. Every payment tracked, every obligation met.",
    buttonLabel: "Learn more",
    buttonUrl: "/#product",
    theme: "mint",
    image: {
      file: "mockup-payments.png",
      alt: "Brigadely outgoing payments: staff payroll, a vendor invoice, a cross-border contractor payout and statutory remittances",
    },
  },
  {
    name: "Security and access",
    label: "Security",
    heading: "Role-based access and a full audit log",
    body: "All financial and employee data is encrypted in transit and at rest. Each team member sees only what their role permits, and every action on the ledger is logged.",
    buttonLabel: "Start free - 60 days",
    buttonUrl: SIGNUP_URL,
    theme: "dark",
    image: {
      file: "mockup-security.png",
      alt: "Brigadely access controls with Finance Lead, HR Admin, Employee and Auditor roles",
    },
  },
];

/** The uploaded image for a starter, reusing an earlier upload of the same file. */
async function mediaFor(payload: Payload, { file, alt }: StarterPromo["image"]): Promise<number> {
  const { docs } = await payload.find({
    collection: "media",
    where: { filename: { equals: file } },
    limit: 1,
    depth: 0,
  });
  if (docs[0]) return docs[0].id;
  const media = await payload.create({ collection: "media", data: { alt }, filePath: path.join(ASSETS, file) });
  return media.id;
}

const payload = await getPayload({ config });
let created = 0;

for (const { image, ...starter } of STARTERS) {
  const { totalDocs } = await payload.count({ collection: "promos", where: { name: { equals: starter.name } } });
  if (totalDocs > 0) {
    console.log(`  Skipped: ${starter.name} (already exists)`);
    continue;
  }
  await payload.create({
    collection: "promos",
    data: { ...starter, image: await mediaFor(payload, image), status: "draft" },
  });
  created += 1;
  console.log(`  Created: ${starter.name} (draft)`);
}

console.log(
  `\n${created} created, ${STARTERS.length - created} skipped.` +
    (created > 0 ? " Review and publish them in /admin → Promos, then add them to articles with the Promo block." : ""),
);
