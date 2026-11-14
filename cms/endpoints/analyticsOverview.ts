import type { Endpoint, PayloadRequest } from "payload";

import { describeGa4Error, getGa4Report, readGa4Settings, type Ga4Settings } from "../../lib/analytics/ga4";
import { describeSearchConsoleError, getSearchReport, readGscSettings, type GscSettings } from "../../lib/analytics/gsc";
import { DEFAULT_ANALYTICS_RANGE, isAnalyticsRange, type AnalyticsRange } from "../../lib/analytics/ranges";
import type {
  AnalyticsErrorBody,
  AnalyticsOverviewResponse,
  Ga4Report,
  SearchReport,
  SectionState,
} from "../../lib/analytics/types";

/**
 * GET /api/analytics/overview?range=7d|30d|90d (default 30d)[&refresh=1]
 *
 * Site-wide growth & conversions and blog performance (GA4), plus search
 * performance (Search Console), for the /admin dashboard. Signed-in CMS users
 * only. Each source is reported on its own: { status: "ok" | "unconfigured" | "error" },
 * so a missing GSC_SITE_URL or a Google error never blanks the other tabs.
 * Results are cached for 15 minutes; refresh=1 asks Google again.
 */
export const analyticsOverviewEndpoint: Endpoint = {
  path: "/analytics/overview",
  method: "get",
  handler: async (req) => {
    // Payload has already checked the admin session cookie / Authorization header.
    if (!req.user) {
      return respond({ error: "Log in to the admin to view analytics." }, 401);
    }

    const range = req.searchParams.get("range") ?? DEFAULT_ANALYTICS_RANGE;
    if (!isAnalyticsRange(range)) {
      return respond({ error: `Unknown range "${range}". Use 7d, 30d or 90d.` }, 400);
    }
    const refresh = req.searchParams.get("refresh") === "1";

    const ga4Settings = readGa4Settings();
    const gscSettings = readGscSettings();
    const [ga4, gsc] = await Promise.all([
      loadGa4(req, ga4Settings, range, refresh),
      loadSearch(req, gscSettings, range, refresh),
    ]);

    return respond({
      range,
      ga4Configured: ga4Settings.configured,
      gscConfigured: gscSettings.configured,
      ga4,
      gsc,
    });
  },
};

function respond(body: AnalyticsOverviewResponse | AnalyticsErrorBody, status = 200): Response {
  // Signed-in users only: no browser or CDN may store it. The 15-minute cache
  // lives on the server (lib/analytics/cache.ts).
  return Response.json(body, { status, headers: { "Cache-Control": "private, no-store" } });
}

async function loadGa4(
  req: PayloadRequest,
  settings: Ga4Settings,
  range: AnalyticsRange,
  refresh: boolean,
): Promise<SectionState<Ga4Report>> {
  if (!settings.configured) return { status: "unconfigured", missing: settings.missing };
  try {
    const stats = await getGa4Report(settings, range, refresh);
    const posts = await postsByPath(req, [
      ...stats.blog.topArticles.map((article) => article.path),
      ...stats.site.convertingPages.map((page) => page.path),
    ]);
    return {
      status: "ok",
      data: {
        ...stats,
        site: { ...stats.site, convertingPages: stats.site.convertingPages.map((page) => ({ ...page, ...posts(page.path) })) },
        blog: { ...stats.blog, topArticles: stats.blog.topArticles.map((article) => ({ ...article, ...posts(article.path) })) },
      },
    };
  } catch (error) {
    const problem = describeGa4Error(error);
    req.payload.logger.error({ err: error, msg: `Analytics (GA4): ${problem.error}` });
    return { status: "error", ...problem };
  }
}

async function loadSearch(
  req: PayloadRequest,
  settings: GscSettings,
  range: AnalyticsRange,
  refresh: boolean,
): Promise<SectionState<SearchReport>> {
  if (!settings.configured) return { status: "unconfigured", missing: settings.missing };
  try {
    const stats = await getSearchReport(settings, range, refresh);
    const posts = await postsByPath(req, stats.topPages.map((page) => page.path));
    return {
      status: "ok",
      data: { ...stats, topPages: stats.topPages.map((page) => ({ ...page, ...posts(page.path) })) },
    };
  } catch (error) {
    const problem = describeSearchConsoleError(error);
    req.payload.logger.error({ err: error, msg: `Analytics (Search Console): ${problem.error}` });
    return { status: "error", ...problem };
  }
}

/** /blog/[slug] paths. Slugs are lowercase letters, digits and hyphens. */
const BLOG_POST_PATH = /^\/blog\/([a-z0-9-]+)\/?$/;

/**
 * Current title and Payload ID for blog post paths (for titles and edit links).
 * Other paths, and any lookup failure, give nulls: the path is shown instead.
 */
async function postsByPath(
  req: PayloadRequest,
  paths: string[],
): Promise<(path: string) => { title: string | null; postId: number | null }> {
  const slugOf = (path: string) => BLOG_POST_PATH.exec(path)?.[1];
  const slugs = [...new Set(paths.map(slugOf).filter((slug) => slug !== undefined))];
  const bySlug = new Map<string, { title: string; id: number }>();

  if (slugs.length > 0) {
    try {
      const { docs } = await req.payload.find({
        collection: "posts",
        where: { slug: { in: slugs } },
        select: { title: true, slug: true },
        depth: 0,
        pagination: false,
        req,
      });
      for (const post of docs) bySlug.set(post.slug, { title: post.title, id: post.id });
    } catch (error) {
      req.payload.logger.warn({ err: error, msg: "Analytics: couldn't look up post titles" });
    }
  }

  return (path) => {
    const post = bySlug.get(slugOf(path) ?? "");
    return { title: post?.title ?? null, postId: post?.id ?? null };
  };
}
