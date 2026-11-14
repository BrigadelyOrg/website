"use client";

import { useEffect, useState } from "react";

import { formatCount, formatDayRange } from "../../../lib/analytics/format";
import {
  ANALYTICS_RANGE_KEYS,
  ANALYTICS_RANGES,
  DEFAULT_ANALYTICS_RANGE,
  type AnalyticsRange,
} from "../../../lib/analytics/ranges";
import type {
  BlogAnalyticsError,
  BlogAnalyticsReport,
  BlogAnalyticsResponse,
  Ga4EnvKey,
} from "../../../lib/analytics/types";
import styles from "./dashboard.module.scss";
import { ErrorBanner, SetupBanner } from "./StatusBanners";
import { TopArticles } from "./TopArticles";
import { TopChannels } from "./TopChannels";
import { TrafficChart } from "./TrafficChart";

type Result =
  | { kind: "report"; report: BlogAnalyticsReport }
  | { kind: "unconfigured"; missing: Ga4EnvKey[] }
  | { kind: "error"; error: string; hint?: string };

async function loadAnalytics(apiRoute: string, range: AnalyticsRange, signal: AbortSignal): Promise<Result> {
  const response = await fetch(`${apiRoute}/analytics/blog?range=${range}`, {
    credentials: "same-origin",
    headers: { Accept: "application/json" },
    signal,
  });
  const body = (await response.json().catch(() => null)) as BlogAnalyticsResponse | BlogAnalyticsError | null;

  if (!response.ok || body === null || "error" in body) {
    return {
      kind: "error",
      error: body && "error" in body ? body.error : `The analytics endpoint answered with status ${response.status}.`,
      hint: body && "error" in body ? body.hint : undefined,
    };
  }
  return body.configured ? { kind: "report", report: body } : { kind: "unconfigured", missing: body.missing };
}

interface AnalyticsPanelProps {
  publishedArticles: number;
  adminRoute: string;
  apiRoute: string;
}

export function AnalyticsPanel({ publishedArticles, adminRoute, apiRoute }: AnalyticsPanelProps) {
  const [range, setRange] = useState<AnalyticsRange>(DEFAULT_ANALYTICS_RANGE);
  const [results, setResults] = useState<Partial<Record<AnalyticsRange, Result>>>({});
  // The last range whose report was on screen. While a new range loads, that
  // report stays visible (dimmed) instead of flashing back to placeholders.
  const [heldRange, setHeldRange] = useState<AnalyticsRange | null>(null);

  const current = results[range];

  useEffect(() => {
    if (current) return; // already loaded (results are kept per range)
    const controller = new AbortController();
    loadAnalytics(apiRoute, range, controller.signal).then(
      (result) => setResults((previous) => ({ ...previous, [range]: result })),
      (error: unknown) => {
        if (controller.signal.aborted) return;
        setResults((previous) => ({
          ...previous,
          [range]: {
            kind: "error",
            error: "Couldn't reach the analytics endpoint.",
            hint: error instanceof Error ? error.message : undefined,
          },
        }));
      },
    );
    return () => controller.abort();
  }, [apiRoute, range, current]);

  function selectRange(next: AnalyticsRange) {
    if (next === range) return;
    if (current?.kind === "report") setHeldRange(range);
    setRange(next);
  }

  function retry() {
    setResults((previous) => {
      const next = { ...previous };
      delete next[range];
      return next;
    });
  }

  const held = heldRange ? results[heldRange] : undefined;
  const shown = current ?? (held?.kind === "report" ? held : undefined);
  const refreshing = current === undefined && shown !== undefined;

  return (
    <section className={styles.root} aria-labelledby="blog-analytics-title">
      <header className={styles.header}>
        <div>
          <h2 id="blog-analytics-title" className={styles.title}>
            Blog Performance (GA4)
          </h2>
          <p className={styles.subtitle}>
            {refreshing ? `Loading ${ANALYTICS_RANGES[range].label.toLowerCase()}…` : describeShown(shown)}
          </p>
        </div>
        {shown?.kind === "unconfigured" ? null : (
          <div className={styles.switcher} role="group" aria-label="Timeframe">
            {ANALYTICS_RANGE_KEYS.map((key) => (
              <button key={key} type="button" aria-pressed={key === range} onClick={() => selectRange(key)}>
                {ANALYTICS_RANGES[key].label}
              </button>
            ))}
          </div>
        )}
      </header>

      {shown === undefined ? (
        <DashboardSkeleton />
      ) : shown.kind === "unconfigured" ? (
        <SetupBanner missing={shown.missing} />
      ) : shown.kind === "error" ? (
        <ErrorBanner error={shown.error} hint={shown.hint} onRetry={retry} />
      ) : (
        <div className={styles.body} aria-busy={refreshing} data-refreshing={refreshing || undefined}>
          <dl className={styles.kpis}>
            <Kpi label="Blog views" value={formatCount(shown.report.overview.views)} caption="Page views on /blog pages" />
            <Kpi
              label="Unique readers"
              value={formatCount(shown.report.overview.readers)}
              caption="People who read the blog"
            />
            <Kpi
              label="Avg. time on page"
              value={shown.report.overview.avgEngagementTime}
              caption="Engagement time per reader"
            />
            <Kpi label="Published articles" value={formatCount(publishedArticles)} caption="Live on the site now" />
          </dl>
          <TrafficChart daily={shown.report.daily} />
          <div className={styles.breakdown}>
            <TopArticles articles={shown.report.topArticles} adminRoute={adminRoute} />
            <TopChannels sources={shown.report.sources} />
          </div>
        </div>
      )}
    </section>
  );
}

function describeShown(shown: Result | undefined): string {
  if (shown === undefined) return "Loading Google Analytics data…";
  if (shown.kind === "unconfigured") return "Google Analytics isn't connected yet.";
  if (shown.kind === "error") return "Google Analytics data is unavailable right now.";
  const { startDate, endDate, fetchedAt } = shown.report;
  const updated = new Date(fetchedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${formatDayRange(startDate, endDate)} · Updated ${updated} · Refreshes every 15 minutes`;
}

function Kpi({ label, value, caption }: { label: string; value: string; caption: string }) {
  return (
    <div className={styles.kpi}>
      <dt className={styles.kpiLabel}>{label}</dt>
      <dd className={styles.kpiValue}>{value}</dd>
      <dd className={styles.kpiCaption}>{caption}</dd>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className={styles.body} aria-busy="true">
      <p className={styles.srOnly}>Loading Google Analytics data…</p>
      <div className={styles.kpis} aria-hidden="true">
        {[0, 1, 2, 3].map((tile) => (
          <div key={tile} className={`${styles.kpi} ${styles.skeleton}`} />
        ))}
      </div>
      <div className={`${styles.card} ${styles.skeleton} ${styles.skeletonChart}`} aria-hidden="true" />
      <div className={styles.breakdown} aria-hidden="true">
        <div className={`${styles.card} ${styles.skeleton} ${styles.skeletonList}`} />
        <div className={`${styles.card} ${styles.skeleton} ${styles.skeletonList}`} />
      </div>
    </div>
  );
}
