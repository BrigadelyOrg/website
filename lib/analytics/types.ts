import type { AnalyticsRange } from "./ranges";

/** Environment variables the GA4 Data API needs (tracking is configured separately). */
export type Ga4EnvKey = "GA4_PROPERTY_ID" | "GA4_CLIENT_EMAIL" | "GA4_PRIVATE_KEY";

export interface BlogAnalyticsOverview {
  /** Page views of /blog and every /blog/[slug] page. */
  views: number;
  /** Distinct active users who viewed at least one blog page. */
  readers: number;
  /** Engagement time per reader, in seconds (GA4's "average engagement time"). */
  avgEngagementSeconds: number;
  /** The same, formatted like GA4: "1m 05s". */
  avgEngagementTime: string;
}

export interface DailyTraffic {
  /** Calendar day in the GA4 property's time zone, YYYY-MM-DD. */
  date: string;
  views: number;
  readers: number;
}

export interface TopArticle {
  /** URL path as recorded by GA4, e.g. /blog/how-to-calculate-paye. */
  path: string;
  /** Current title from Payload, or null if no post has this slug any more. */
  title: string | null;
  /** Payload post ID for the edit link, or null if no post matches. */
  postId: number | null;
  views: number;
  readers: number;
  avgEngagementSeconds: number;
  avgEngagementTime: string;
}

export interface TrafficSource {
  /** Readable name, e.g. "Google Search", "LinkedIn", "Direct". */
  label: string;
  /** GA4 default channel group, e.g. "Organic Search". Empty for "Other sources". */
  channel: string;
  sessions: number;
  /** Share of all blog sessions in the period, 0 to 1. */
  share: number;
  /** True for the row that folds together every source outside the top list. */
  isOther: boolean;
}

export interface TrafficSources {
  /** Sessions that included at least one blog page. */
  totalSessions: number;
  rows: TrafficSource[];
}

export interface BlogAnalyticsReport {
  range: AnalyticsRange;
  /** First and last day covered, YYYY-MM-DD, in the property's time zone. */
  startDate: string;
  endDate: string;
  timeZone: string;
  /** When this data was fetched from Google (ISO 8601). Responses are cached for 15 minutes. */
  fetchedAt: string;
  overview: BlogAnalyticsOverview;
  daily: DailyTraffic[];
  topArticles: TopArticle[];
  sources: TrafficSources;
}

/** The report before Payload post titles and IDs are attached. */
export type TopArticleStats = Omit<TopArticle, "title" | "postId">;
export type BlogAnalyticsStats = Omit<BlogAnalyticsReport, "topArticles"> & {
  topArticles: TopArticleStats[];
};

/** 200 response of GET /api/analytics/blog?range=7d|30d|90d. */
export type BlogAnalyticsResponse =
  | { configured: false; missing: Ga4EnvKey[] }
  | ({ configured: true } & BlogAnalyticsReport);

/** 4xx/5xx response body of the same endpoint. */
export interface BlogAnalyticsError {
  error: string;
  /** What to do about it, when we can tell. */
  hint?: string;
}
