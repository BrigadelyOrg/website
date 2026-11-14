import type { AnalyticsRange } from "./ranges";

/** A total for the selected period and for the period of the same length just before it. */
export interface PeriodValue {
  current: number;
  previous: number;
}

// --- Site-wide growth & conversions (GA4) ----------------------------------------

export interface SiteOverview {
  activeUsers: PeriodValue;
  pageViews: PeriodValue;
  /** Engaged sessions / sessions, 0 to 1. */
  engagementRate: PeriodValue;
  /** `cta_click` events (sign-up and booking clicks), see lib/analytics/cta.ts. */
  ctaClicks: PeriodValue;
  newUsers: number;
  returningUsers: number;
}

export interface SiteDay {
  /** Calendar day in the GA4 property's time zone, YYYY-MM-DD. */
  date: string;
  activeUsers: number;
  pageViews: number;
  engagementRate: number;
  ctaClicks: number;
}

/** A country or city with its active users and share of all active users. */
export interface PlaceStat {
  name: string;
  /** The country, for a city. */
  detail: string;
  users: number;
  share: number;
}

export interface PageStat {
  path: string;
  views: number;
  users: number;
  avgEngagementSeconds: number;
}

export interface ConvertingPage {
  path: string;
  /** Current article title when the page is a blog post, else null. */
  title: string | null;
  postId: number | null;
  clicks: number;
  share: number;
}

export type DeviceKind = "desktop" | "mobile" | "tablet" | "other";

export interface DeviceShare {
  device: DeviceKind;
  users: number;
  share: number;
}

export interface SiteReport {
  overview: SiteOverview;
  daily: SiteDay[];
  countries: PlaceStat[];
  cities: PlaceStat[];
  topPages: PageStat[];
  convertingPages: ConvertingPage[];
  /** Always desktop, mobile, tablet, other, in that order (colours follow the device). */
  devices: DeviceShare[];
}

// --- Blog performance (GA4) ----------------------------------------------------------

export interface BlogOverview {
  /** Page views of /blog and every /blog/[slug] page. */
  views: PeriodValue;
  /** Distinct active users who viewed at least one blog page. */
  readers: PeriodValue;
  /** Engagement time per reader, in seconds (GA4's "average engagement time"). */
  avgEngagementSeconds: PeriodValue;
}

export interface BlogDay {
  date: string;
  views: number;
  readers: number;
  avgEngagementSeconds: number;
}

export interface TopArticle {
  /** URL path as recorded by GA4, e.g. /blog/how-to-calculate-paye. */
  path: string;
  /** Current title from Payload, or null if no post has this slug any more. */
  title: string | null;
  postId: number | null;
  views: number;
  readers: number;
  avgEngagementSeconds: number;
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

export interface BlogReport {
  overview: BlogOverview;
  daily: BlogDay[];
  topArticles: TopArticle[];
  sources: TrafficSources;
}

/** Everything read from GA4 for one range: one cache entry, one set of API calls. */
export interface Ga4Report {
  range: AnalyticsRange;
  /** First and last day covered, YYYY-MM-DD, in the property's time zone. */
  startDate: string;
  endDate: string;
  timeZone: string;
  /** When this data was fetched from Google (ISO 8601). */
  fetchedAt: string;
  site: SiteReport;
  blog: BlogReport;
}

/** Before Payload titles and IDs are attached to blog paths. */
export type Ga4Stats = Omit<Ga4Report, "site" | "blog"> & {
  site: Omit<SiteReport, "convertingPages"> & {
    convertingPages: Omit<ConvertingPage, "title" | "postId">[];
  };
  blog: Omit<BlogReport, "topArticles"> & { topArticles: Omit<TopArticle, "title" | "postId">[] };
};

/**
 * Who's on the site now: the last 30 minutes from the GA4 Realtime API, the
 * longest window a standard (non-360) property allows. Unlike the reports
 * above, it isn't held back by Google's processing delay and it can't be
 * filtered by hostname, so local test visits count too.
 */
export interface LiveVisitors {
  activeUsers: number;
  pageViews: number;
  /** When this was fetched from Google (ISO 8601). */
  fetchedAt: string;
}

// --- Google Search Console --------------------------------------------------------------

export interface SearchTotals {
  clicks: number;
  impressions: number;
  /** Clicks / impressions, 0 to 1. */
  ctr: number;
  /** Average position in Google results (1 is the top). 0 when there were no impressions. */
  position: number;
}

export interface SearchDay extends SearchTotals {
  /** Calendar day in Pacific Time (Search Console's reporting time zone), YYYY-MM-DD. */
  date: string;
}

export interface SearchQueryStat extends SearchTotals {
  query: string;
}

export interface SearchPageStat extends SearchTotals {
  /** Full URL as Search Console reports it. */
  url: string;
  path: string;
  title: string | null;
  postId: number | null;
}

export interface SearchReport {
  siteUrl: string;
  startDate: string;
  endDate: string;
  fetchedAt: string;
  totals: { current: SearchTotals; previous: SearchTotals };
  daily: SearchDay[];
  topQueries: SearchQueryStat[];
  topPages: SearchPageStat[];
}

export type SearchStats = Omit<SearchReport, "topPages"> & {
  topPages: Omit<SearchPageStat, "title" | "postId">[];
};

// --- GET /api/analytics/overview --------------------------------------------------------

/** Each data source succeeds or fails on its own, so one problem never blanks the dashboard. */
export type SectionState<T> =
  | { status: "ok"; data: T }
  | { status: "unconfigured"; missing: string[] }
  | { status: "error"; error: string; hint?: string };

export interface AnalyticsOverviewResponse {
  range: AnalyticsRange;
  ga4Configured: boolean;
  gscConfigured: boolean;
  ga4: SectionState<Ga4Report>;
  gsc: SectionState<SearchReport>;
  /** GA4 Realtime; null when GA4 isn't set up or the Realtime request failed. */
  live: LiveVisitors | null;
}

/** 4xx body of the endpoint. */
export interface AnalyticsErrorBody {
  error: string;
}
