"use client";

import { useEffect, useId, useState, type KeyboardEvent } from "react";

import { formatDayRange } from "../../../lib/analytics/format";
import {
  ANALYTICS_RANGE_KEYS,
  ANALYTICS_RANGES,
  DEFAULT_ANALYTICS_RANGE,
  type AnalyticsRange,
} from "../../../lib/analytics/ranges";
import type {
  AnalyticsErrorBody,
  AnalyticsOverviewResponse,
  Ga4Report,
  LiveVisitors,
  SectionState,
} from "../../../lib/analytics/types";
import styles from "./dashboard.module.scss";
import { BlogTab } from "./tabs/BlogTab";
import { OverviewTab } from "./tabs/OverviewTab";
import { SearchTab } from "./tabs/SearchTab";
import { AwaitingData, Ga4Setup, SearchSetup } from "./tabs/shared";
import { IconArticle, IconOverview, IconRefresh, IconSearch } from "./ui/icons";
import { ErrorNotice, LivePill, StatusPill, TabSkeleton, type ConnectionState } from "./ui/States";

const TABS = [
  { id: "overview", label: "Overview & Conversions", Icon: IconOverview },
  { id: "blog", label: "Blog Performance", Icon: IconArticle },
  { id: "seo", label: "Search & SEO (GSC)", Icon: IconSearch },
] as const;

type TabId = (typeof TABS)[number]["id"];

const RANGE_LABELS: Record<AnalyticsRange, string> = { "7d": "7D", "30d": "30D", "90d": "90D" };

const messageOf = (error: unknown) => (error instanceof Error ? error.message : "Couldn't reach the analytics endpoint.");

async function fetchOverview(
  apiRoute: string,
  range: AnalyticsRange,
  refresh: boolean,
  signal?: AbortSignal,
): Promise<AnalyticsOverviewResponse> {
  const response = await fetch(`${apiRoute}/analytics/overview?range=${range}${refresh ? "&refresh=1" : ""}`, {
    credentials: "same-origin",
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal,
  });
  const body = (await response.json().catch(() => null)) as AnalyticsOverviewResponse | AnalyticsErrorBody | null;
  if (!response.ok || body === null || "error" in body) {
    throw new Error(body && "error" in body ? body.error : `The analytics endpoint answered with status ${response.status}.`);
  }
  return body;
}

function connection(section: SectionState<unknown> | undefined, name: string): { state: ConnectionState; label: string } {
  if (!section) return { state: "loading", label: `Connecting to ${name}…` };
  if (section.status === "ok") return { state: "ok", label: `${name} Connected` };
  if (section.status === "unconfigured") return { state: "off", label: `${name} not set up` };
  return { state: "error", label: `${name} error` };
}

const timeOf = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

/** Every loaded range carries a Realtime count; the newest one is shown (ISO times sort as text). */
function latestLive(responses: ReadonlyArray<AnalyticsOverviewResponse | undefined>): LiveVisitors | null {
  let latest: LiveVisitors | null = null;
  for (const response of responses) {
    const live = response?.live;
    if (live && (!latest || live.fetchedAt > latest.fetchedAt)) latest = live;
  }
  return latest;
}

/** No processed visits anywhere on the site in this range (new property, or a tag that isn't sending). */
const hasNoVisits = (report: Ga4Report) =>
  report.site.overview.activeUsers.current === 0 && report.site.overview.pageViews.current === 0;

interface DashboardShellProps {
  adminRoute: string;
  apiRoute: string;
  publishedArticles: number;
  publishedInRange: Record<AnalyticsRange, number>;
}

export function DashboardShell({ adminRoute, apiRoute, publishedArticles, publishedInRange }: DashboardShellProps) {
  const baseId = useId();
  const [range, setRange] = useState<AnalyticsRange>(DEFAULT_ANALYTICS_RANGE);
  const [tab, setTab] = useState<TabId>("overview");
  // Loaded ranges stay in memory, so switching back is instant.
  const [results, setResults] = useState<Partial<Record<AnalyticsRange, AnalyticsOverviewResponse>>>({});
  const [failures, setFailures] = useState<Partial<Record<AnalyticsRange, string>>>({});
  // The range on screen while another loads: it stays visible, dimmed.
  const [heldRange, setHeldRange] = useState<AnalyticsRange | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const current = results[range];
  const failure = failures[range];

  useEffect(() => {
    if (current || failure) return;
    const controller = new AbortController();
    fetchOverview(apiRoute, range, false, controller.signal).then(
      (response) => setResults((previous) => ({ ...previous, [range]: response })),
      (error: unknown) => {
        if (!controller.signal.aborted) setFailures((previous) => ({ ...previous, [range]: messageOf(error) }));
      },
    );
    return () => controller.abort();
  }, [apiRoute, range, current, failure]);

  function selectRange(next: AnalyticsRange) {
    if (next === range) return;
    if (current) setHeldRange(range);
    setRefreshError(null);
    setRange(next);
  }

  /** Asks Google again (the server allows it once a minute). */
  async function refresh() {
    if (refreshing) return;
    const target = range;
    setRefreshing(true);
    setRefreshError(null);
    try {
      const response = await fetchOverview(apiRoute, target, true);
      setResults((previous) => ({ ...previous, [target]: response }));
      setFailures((previous) => {
        const next = { ...previous };
        delete next[target];
        return next;
      });
    } catch (error) {
      if (results[target]) setRefreshError(`Couldn't refresh: ${messageOf(error)}`);
      else setFailures((previous) => ({ ...previous, [target]: messageOf(error) }));
    } finally {
      setRefreshing(false);
    }
  }

  function retry() {
    setFailures((previous) => {
      const next = { ...previous };
      delete next[range];
      return next;
    });
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = TABS.findIndex((entry) => entry.id === tab);
    const moves: Partial<Record<string, number>> = {
      ArrowRight: (index + 1) % TABS.length,
      ArrowLeft: (index - 1 + TABS.length) % TABS.length,
      Home: 0,
      End: TABS.length - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setTab(TABS[next].id);
    document.getElementById(`${baseId}-tab-${TABS[next].id}`)?.focus();
  }

  const held = heldRange ? results[heldRange] : undefined;
  const shown = current ?? (failure ? undefined : held);
  const switching = !current && !failure && shown !== undefined;
  const busy = switching || refreshing;

  const shownRange = shown?.range ?? range;
  const days = ANALYTICS_RANGES[shownRange].days;
  const periodLabel = `previous ${days} days`;
  const ga4 = shown?.ga4;
  const gsc = shown?.gsc;
  const period = ga4?.status === "ok" ? ga4.data : gsc?.status === "ok" ? gsc.data : undefined;
  const fetchedAt = ga4?.status === "ok" ? ga4.data.fetchedAt : gsc?.status === "ok" ? gsc.data.fetchedAt : undefined;
  const ga4Pill = connection(ga4, "GA4");
  const gscPill = connection(gsc, "Search Console");
  const live = latestLive(Object.values(results));

  function panel() {
    if (!shown) {
      return failure ? (
        <ErrorNotice title="Couldn't load analytics" error={failure} onRetry={retry} retrying={false} />
      ) : (
        <TabSkeleton />
      );
    }
    if (tab === "seo") {
      if (!gsc || gsc.status === "unconfigured") return <SearchSetup missing={gsc?.missing ?? []} />;
      if (gsc.status === "error") {
        return <ErrorNotice title="Search Console" error={gsc.error} hint={gsc.hint} onRetry={refresh} retrying={refreshing} />;
      }
      return <SearchTab report={gsc.data} adminRoute={adminRoute} periodLabel={periodLabel} />;
    }
    if (!ga4 || ga4.status === "unconfigured") return <Ga4Setup missing={ga4?.missing ?? []} />;
    if (ga4.status === "error") {
      return <ErrorNotice title="Google Analytics" error={ga4.error} hint={ga4.hint} onRetry={refresh} retrying={refreshing} />;
    }
    return (
      <>
        {hasNoVisits(ga4.data) ? <AwaitingData live={live} /> : null}
        {tab === "overview" ? (
          <OverviewTab report={ga4.data} adminRoute={adminRoute} periodLabel={periodLabel} />
        ) : (
          <BlogTab
            report={ga4.data}
            adminRoute={adminRoute}
            periodLabel={periodLabel}
            days={days}
            publishedArticles={publishedArticles}
            publishedInPeriod={publishedInRange[shownRange]}
          />
        )}
      </>
    );
  }

  return (
    <section className={styles.root} aria-labelledby={`${baseId}-title`}>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h2 id={`${baseId}-title`} className={styles.title}>
            Brigadely Growth &amp; Content Intelligence
          </h2>
          <div className={styles.meta}>
            <StatusPill state={ga4Pill.state} label={ga4Pill.label} />
            {live ? <LivePill activeUsers={live.activeUsers} asOf={timeOf(live.fetchedAt)} /> : null}
            <StatusPill state={gscPill.state} label={gscPill.label} />
            {period ? (
              <>
                <span className={styles.metaDivider} aria-hidden="true" />
                <span>
                  {formatDayRange(period.startDate, period.endDate)} · vs {periodLabel}
                </span>
              </>
            ) : null}
          </div>
        </div>

        <div className={styles.controls}>
          {refreshError ? (
            <span className={styles.refreshError} role="status">
              {refreshError}
            </span>
          ) : null}
          <button
            type="button"
            className={styles.refresh}
            onClick={refresh}
            disabled={refreshing || !current}
            data-busy={refreshing || undefined}
            title="Fetch the latest numbers now (they're cached for 15 minutes)"
          >
            <IconRefresh />
            {refreshing ? "Refreshing…" : fetchedAt ? `Updated ${timeOf(fetchedAt)}` : "Refresh"}
            <span className={styles.srOnly}> (refresh now)</span>
          </button>
          <div className={styles.segmented} role="group" aria-label="Timeframe">
            {ANALYTICS_RANGE_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={key === range}
                aria-label={ANALYTICS_RANGES[key].label}
                onClick={() => selectRange(key)}
              >
                {RANGE_LABELS[key]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div role="tablist" aria-label="Analytics sections" className={styles.tabs} onKeyDown={onTabKeyDown}>
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            id={`${baseId}-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={tab === id}
            aria-controls={`${baseId}-panel`}
            tabIndex={tab === id ? 0 : -1}
            className={styles.tab}
            onClick={() => setTab(id)}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${tab}`}
        aria-busy={busy}
        className={styles.panel}
        data-refreshing={busy || undefined}
      >
        {panel()}
      </div>
    </section>
  );
}
