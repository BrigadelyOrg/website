import { computeDelta, type Delta } from "../../../../lib/analytics/delta";
import { formatCount, formatDuration, formatInteger } from "../../../../lib/analytics/format";
import type { Ga4Report } from "../../../../lib/analytics/types";
import styles from "../dashboard.module.scss";
import { BarList } from "../ui/BarList";
import { Card } from "../ui/Card";
import { KpiCard } from "../ui/KpiCard";
import { RankedTable } from "../ui/RankedTable";
import { TrendChart } from "../ui/TrendChart";
import { PageLabel } from "./shared";

/** Blog performance: /blog and every article. */
export function BlogTab({
  report,
  adminRoute,
  periodLabel,
  days,
  publishedArticles,
  publishedInPeriod,
}: {
  report: Ga4Report;
  adminRoute: string;
  periodLabel: string;
  days: number;
  publishedArticles: number;
  /** Articles whose publish date falls in the last `days` days. */
  publishedInPeriod: number;
}) {
  const { overview, daily, topArticles, sources } = report.blog;
  const { views, readers, avgEngagementSeconds } = overview;

  const publishedDelta: Delta =
    publishedInPeriod > 0
      ? {
          text: `+${publishedInPeriod}`,
          direction: "up",
          tone: "good",
          description: `${publishedInPeriod} published in the last ${days} days`,
        }
      : { text: "0", direction: "flat", tone: "neutral", description: `None published in the last ${days} days` };

  return (
    <>
      <dl className={styles.kpis}>
        <KpiCard
          label="Blog views"
          value={formatCount(views.current)}
          delta={computeDelta(views.current, views.previous, "relative", `the ${periodLabel}`)}
          caption={`vs ${formatCount(views.previous)} in the ${periodLabel}`}
          trend={daily.map((day) => day.views)}
        />
        <KpiCard
          label="Unique readers"
          value={formatCount(readers.current)}
          delta={computeDelta(readers.current, readers.previous, "relative", `the ${periodLabel}`)}
          caption={`vs ${formatCount(readers.previous)} in the ${periodLabel}`}
          trend={daily.map((day) => day.readers)}
        />
        <KpiCard
          label="Avg. time on page"
          value={formatDuration(avgEngagementSeconds.current)}
          delta={computeDelta(
            avgEngagementSeconds.current,
            avgEngagementSeconds.previous,
            "relative",
            `the ${periodLabel}`,
          )}
          caption={`Per reader · vs ${formatDuration(avgEngagementSeconds.previous)}`}
          trend={daily.map((day) => day.avgEngagementSeconds)}
        />
        <KpiCard
          label="Published articles"
          value={formatCount(publishedArticles)}
          delta={publishedDelta}
          caption="Live on the site now"
        />
      </dl>

      <TrendChart
        title="Blog traffic"
        caption="Page views and readers per day on /blog pages"
        dates={daily.map((day) => day.date)}
        series={[
          { id: "views", label: "Views", kind: "area", values: daily.map((day) => day.views) },
          { id: "readers", label: "Readers", kind: "line", values: daily.map((day) => day.readers) },
        ]}
        emptyText="No blog page views recorded in this period."
      />

      <div className={styles.gridWide}>
        <Card title="Top performing articles" caption="Ranked by views in this period">
          <RankedTable
            caption="Top performing articles, by views"
            rows={topArticles}
            rowKey={(article) => article.path}
            emptyText="No article views recorded in this period."
            columns={[
              {
                header: "Article",
                cell: (article) => (
                  <PageLabel
                    path={article.path}
                    title={article.title}
                    postId={article.postId}
                    adminRoute={adminRoute}
                  />
                ),
              },
              { header: "Views", numeric: true, cell: (article) => formatInteger(article.views) },
              { header: "Readers", numeric: true, cell: (article) => formatInteger(article.readers) },
              { header: "Avg. time", numeric: true, cell: (article) => formatDuration(article.avgEngagementSeconds) },
            ]}
          />
        </Card>
        <Card
          title="Acquisition channels"
          caption={`Share of ${formatInteger(sources.totalSessions)} ${sources.totalSessions === 1 ? "session" : "sessions"} that reached the blog`}
        >
          <BarList
            label="Blog traffic sources"
            emptyText="No sessions recorded in this period."
            items={sources.rows.map((row) => ({
              key: row.label,
              label: row.label,
              detail: row.channel && row.channel !== row.label ? row.channel : undefined,
              value: formatInteger(row.sessions),
              share: row.share,
              muted: row.isOther,
            }))}
          />
        </Card>
      </div>
    </>
  );
}
