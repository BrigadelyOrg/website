import type { Payload, ServerProps } from "payload";

import { ANALYTICS_RANGE_KEYS, ANALYTICS_RANGES, type AnalyticsRange } from "../../../lib/analytics/ranges";
import { DashboardShell } from "./DashboardShell";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Published articles in total and per timeframe (publish date in the last N days). */
async function countPublished(payload: Payload) {
  const now = Date.now();
  const published = { status: { equals: "published" } };
  const [total, ...recent] = await Promise.all([
    payload.count({ collection: "posts", where: published }),
    ...ANALYTICS_RANGE_KEYS.map((key) =>
      payload.count({
        collection: "posts",
        where: {
          and: [published, { publishedDate: { greater_than_equal: new Date(now - ANALYTICS_RANGES[key].days * DAY_MS).toISOString() } }],
        },
      }),
    ),
  ]);
  const inRange = Object.fromEntries(ANALYTICS_RANGE_KEYS.map((key, index) => [key, recent[index].totalDocs]));
  return { total: total.totalDocs, inRange: inRange as Record<AnalyticsRange, number> };
}

/**
 * Brigadely Growth & Content Intelligence, above the collections on the /admin
 * dashboard (admin.components.beforeDashboard in payload.config.ts).
 *
 * Server component: counts articles here; the client shell then loads GA4 and
 * Search Console numbers from GET /api/analytics/overview, so a slow or
 * unconfigured Google never delays the rest of the dashboard.
 */
export async function AnalyticsDashboard({ payload }: ServerProps) {
  const published = await countPublished(payload);
  return (
    <DashboardShell
      adminRoute={payload.config.routes.admin}
      apiRoute={payload.config.routes.api}
      publishedArticles={published.total}
      publishedInRange={published.inRange}
    />
  );
}
