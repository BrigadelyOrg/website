import type { ServerProps } from "payload";

import { AnalyticsPanel } from "./AnalyticsPanel";

/**
 * Blog performance from Google Analytics 4, shown above the collections on the
 * /admin dashboard (admin.components.beforeDashboard in payload.config.ts).
 *
 * Server component: counts published articles here, then the client panel
 * loads GA4 numbers from GET /api/analytics/blog, so a slow or unconfigured
 * Google never delays the rest of the dashboard.
 */
export async function BlogAnalyticsDashboard({ payload }: ServerProps) {
  const { totalDocs: publishedArticles } = await payload.count({
    collection: "posts",
    where: { status: { equals: "published" } },
  });

  return (
    <AnalyticsPanel
      publishedArticles={publishedArticles}
      adminRoute={payload.config.routes.admin}
      apiRoute={payload.config.routes.api}
    />
  );
}
