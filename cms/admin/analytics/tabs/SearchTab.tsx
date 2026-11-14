import { computeDelta } from "../../../../lib/analytics/delta";
import { formatCount, formatInteger, formatPosition, formatRate } from "../../../../lib/analytics/format";
import type { SearchReport } from "../../../../lib/analytics/types";
import styles from "../dashboard.module.scss";
import { Card } from "../ui/Card";
import { KpiCard } from "../ui/KpiCard";
import { RankedTable } from "../ui/RankedTable";
import { TrendChart } from "../ui/TrendChart";
import { PageLabel } from "./shared";

/** Google Search performance from Search Console. */
export function SearchTab({
  report,
  adminRoute,
  periodLabel,
}: {
  report: SearchReport;
  adminRoute: string;
  periodLabel: string;
}) {
  const { totals, daily, topQueries, topPages, siteUrl } = report;
  const { current, previous } = totals;
  const versus = `the ${periodLabel}`;

  return (
    <>
      <dl className={styles.kpis}>
        <KpiCard
          label="Search clicks"
          value={formatCount(current.clicks)}
          delta={computeDelta(current.clicks, previous.clicks, "relative", versus)}
          caption={`vs ${formatCount(previous.clicks)} in the ${periodLabel}`}
          trend={daily.map((day) => day.clicks)}
        />
        <KpiCard
          label="Impressions"
          value={formatCount(current.impressions)}
          delta={computeDelta(current.impressions, previous.impressions, "relative", versus)}
          caption={`vs ${formatCount(previous.impressions)} in the ${periodLabel}`}
          trend={daily.map((day) => day.impressions)}
        />
        <KpiCard
          label="Average CTR"
          value={formatRate(current.ctr)}
          delta={computeDelta(current.ctr, previous.ctr, "points", versus)}
          caption={`vs ${formatRate(previous.ctr)} in the ${periodLabel}`}
          trend={daily.map((day) => day.ctr)}
        />
        <KpiCard
          label="Average position"
          value={formatPosition(current.position)}
          delta={computeDelta(current.position, previous.position, "position", versus)}
          caption={`vs ${formatPosition(previous.position)} · lower is better`}
          // Days without impressions have no position; hold the period's average there.
          trend={daily.map((day) => (day.position > 0 ? day.position : current.position))}
          invertTrend
        />
      </dl>

      <TrendChart
        title="Google Search clicks"
        caption={`Clicks per day from Google Search to ${siteUrl.replace(/^sc-domain:/, "")}. The latest days are preliminary.`}
        dates={daily.map((day) => day.date)}
        series={[{ id: "clicks", label: "Clicks", kind: "area", values: daily.map((day) => day.clicks) }]}
        details={[
          { label: "Impressions", values: daily.map((day) => formatInteger(day.impressions)) },
          { label: "CTR", values: daily.map((day) => formatRate(day.ctr)) },
          { label: "Position", values: daily.map((day) => formatPosition(day.position)) },
        ]}
        emptyText="No clicks from Google Search in this period."
      />

      <div className={styles.gridTables}>
        <Card title="Top search queries" caption="What people searched before clicking through">
          <RankedTable
            caption="Top Google Search queries, by clicks"
            rows={topQueries}
            rowKey={(row) => row.query}
            emptyText="No search queries in this period yet."
            columns={[
              { header: "Query", cell: (row) => <span className={styles.rowTitle}>{row.query}</span> },
              { header: "Clicks", numeric: true, cell: (row) => formatInteger(row.clicks) },
              { header: "Impr.", numeric: true, cell: (row) => formatInteger(row.impressions) },
              { header: "CTR", numeric: true, cell: (row) => formatRate(row.ctr) },
              { header: "Position", numeric: true, cell: (row) => formatPosition(row.position) },
            ]}
          />
        </Card>
        <Card title="Top organic landing pages" caption="Pages that received the most Google Search clicks">
          <RankedTable
            caption="Top organic landing pages, by clicks"
            rows={topPages}
            rowKey={(row) => row.url}
            emptyText="No landing pages in this period yet."
            columns={[
              {
                header: "Page",
                cell: (row) => (
                  <PageLabel path={row.path} title={row.title} postId={row.postId} adminRoute={adminRoute} />
                ),
              },
              { header: "Clicks", numeric: true, cell: (row) => formatInteger(row.clicks) },
              { header: "Impr.", numeric: true, cell: (row) => formatInteger(row.impressions) },
              { header: "CTR", numeric: true, cell: (row) => formatRate(row.ctr) },
              { header: "Position", numeric: true, cell: (row) => formatPosition(row.position) },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
