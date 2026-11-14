import type { Endpoint, PayloadRequest } from "payload";

import { describeGa4Error, Ga4ConfigError, getBlogAnalytics, readGa4Settings } from "../../lib/analytics/ga4";
import { DEFAULT_ANALYTICS_RANGE, isAnalyticsRange } from "../../lib/analytics/ranges";
import type {
  BlogAnalyticsError,
  BlogAnalyticsResponse,
  TopArticle,
  TopArticleStats,
} from "../../lib/analytics/types";

/** /blog/[slug] paths as GA4 records them. Slugs are lowercase letters, digits and hyphens. */
const ARTICLE_PATH = /^\/blog\/([a-z0-9-]+)$/;

/**
 * GET /api/analytics/blog?range=7d|30d|90d (default 30d)
 *
 * Blog traffic from GA4 for the /admin dashboard. Only logged-in CMS users can
 * call it. Returns { configured: false, missing } until the GA4_* environment
 * variables are set.
 */
export const blogAnalyticsEndpoint: Endpoint = {
  path: "/analytics/blog",
  method: "get",
  handler: async (req) => {
    // Payload has already checked the admin session cookie / Authorization header.
    if (!req.user) {
      return respond({ error: "Log in to the admin to view blog analytics." }, 401);
    }

    const range = req.searchParams.get("range") ?? DEFAULT_ANALYTICS_RANGE;
    if (!isAnalyticsRange(range)) {
      return respond({ error: `Unknown range "${range}". Use 7d, 30d or 90d.` }, 400);
    }

    const settings = readGa4Settings();
    if (!settings.configured) {
      return respond({ configured: false, missing: settings.missing });
    }

    try {
      const stats = await getBlogAnalytics(settings, range);
      const topArticles = await attachPosts(req, stats.topArticles);
      return respond({ configured: true, ...stats, topArticles });
    } catch (error) {
      const problem = describeGa4Error(error);
      req.payload.logger.error({ err: error, msg: `Blog analytics: ${problem.error}` });
      return respond(problem, error instanceof Ga4ConfigError ? 500 : 502);
    }
  },
};

function respond(body: BlogAnalyticsResponse | BlogAnalyticsError, status = 200): Response {
  // Signed-in users only: no browser or CDN may store it. The 15-minute cache
  // lives on the server (lib/analytics/ga4.ts).
  return Response.json(body, { status, headers: { "Cache-Control": "private, no-store" } });
}

/** Adds each article's current title and Payload ID (for the edit link). */
async function attachPosts(req: PayloadRequest, articles: TopArticleStats[]): Promise<TopArticle[]> {
  const slugOf = (path: string) => ARTICLE_PATH.exec(path)?.[1];
  const slugs = articles.map((article) => slugOf(article.path)).filter((slug) => slug !== undefined);

  const posts =
    slugs.length === 0
      ? []
      : (
          await req.payload.find({
            collection: "posts",
            where: { slug: { in: slugs } },
            select: { title: true, slug: true },
            depth: 0,
            pagination: false,
            req,
          })
        ).docs;
  const bySlug = new Map(posts.map((post) => [post.slug, post]));

  return articles.map((article) => {
    const post = bySlug.get(slugOf(article.path) ?? "");
    return { ...article, title: post?.title ?? null, postId: post?.id ?? null };
  });
}
