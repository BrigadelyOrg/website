import { computeDelta } from "../../../../lib/analytics/delta";
import { formatCount, formatDuration, formatInteger, formatRate } from "../../../../lib/analytics/format";
import type { DeviceKind, Ga4Report } from "../../../../lib/analytics/types";
import styles from "../dashboard.module.scss";
import { BarList } from "../ui/BarList";
import { Card } from "../ui/Card";
import { KpiCard } from "../ui/KpiCard";
import { RankedTable } from "../ui/RankedTable";
import { SegmentedBar, type Segment } from "../ui/SegmentedBar";
import { TrendChart } from "../ui/TrendChart";
import { PageLabel } from "./shared";

const DEVICES: Record<DeviceKind, { label: string; tone: Segment["tone"] }> = {
  desktop: { label: "Desktop", tone: "s1" },
  mobile: { label: "Mobile", tone: "s2" },
  tablet: { label: "Tablet", tone: "s3" },
  other: { label: "Other", tone: "muted" },
};

/** Site-wide growth & conversions. */
export function OverviewTab({
  report,
  adminRoute,
  periodLabel,
}: {
  report: Ga4Report;
  adminRoute: string;
  /** e.g. "previous 30 days" */
  periodLabel: string;
}) {
  const { overview, daily, devices, topPages, convertingPages, countries, cities } = report.site;
  const { activeUsers, pageViews, engagementRate, ctaClicks } = overview;

  return (
    <>
      <dl className={styles.kpis}>
        <KpiCard
          label="Active users"
          value={formatCount(activeUsers.current)}
          delta={computeDelta(activeUsers.current, activeUsers.previous, "relative", `the ${periodLabel}`)}
          caption={`vs ${formatCount(activeUsers.previous)} in the ${periodLabel}`}
          trend={daily.map((day) => day.activeUsers)}
        />
        <KpiCard
          label="Page views"
          value={formatCount(pageViews.current)}
          delta={computeDelta(pageViews.current, pageViews.previous, "relative", `the ${periodLabel}`)}
          caption={`vs ${formatCount(pageViews.previous)} in the ${periodLabel}`}
          trend={daily.map((day) => day.pageViews)}
        />
        <KpiCard
          label="Engagement rate"
          value={formatRate(engagementRate.current)}
          delta={computeDelta(engagementRate.current, engagementRate.previous, "points", `the ${periodLabel}`)}
          caption={`vs ${formatRate(engagementRate.previous)} in the ${periodLabel}`}
          trend={daily.map((day) => day.engagementRate)}
        />
        <KpiCard
          label="CTA conversions"
          value={formatCount(ctaClicks.current)}
          delta={computeDelta(ctaClicks.current, ctaClicks.previous, "relative", `the ${periodLabel}`)}
          caption={`vs ${formatCount(ctaClicks.previous)} in the ${periodLabel}`}
          trend={daily.map((day) => day.ctaClicks)}
        />
      </dl>

      <TrendChart
        title="Site traffic"
        caption="Page views and active users per day, across brigadely.com"
        dates={daily.map((day) => day.date)}
        series={[
          { id: "views", label: "Page views", kind: "area", values: daily.map((day) => day.pageViews) },
          { id: "users", label: "Active users", kind: "line", values: daily.map((day) => day.activeUsers) },
        ]}
        emptyText="No visits recorded in this period."
      />

      <div className={styles.grid2}>
        <Card title="New vs returning visitors" caption="Share of active users in this period">
          <SegmentedBar
            label="New vs returning visitors"
            emptyText="No visitors recorded in this period."
            segments={[
              {
                key: "new",
                label: "New visitors",
                value: overview.newUsers,
                valueText: formatCount(overview.newUsers),
                tone: "s1",
              },
              {
                key: "returning",
                label: "Returning visitors",
                value: overview.returningUsers,
                valueText: formatCount(overview.returningUsers),
                tone: "s2",
              },
            ]}
          />
        </Card>
        <Card title="Devices" caption="Share of active users by device">
          <SegmentedBar
            label="Devices"
            emptyText="No visitors recorded in this period."
            segments={devices
              .filter((entry) => entry.device !== "other" || entry.users > 0)
              .map((entry) => ({
                key: entry.device,
                label: DEVICES[entry.device].label,
                value: entry.users,
                valueText: formatCount(entry.users),
                tone: DEVICES[entry.device].tone,
              }))}
          />
        </Card>
      </div>

      <div className={styles.grid2}>
        <Card title="Top pages" caption="Most viewed pages outside the blog">
          <RankedTable
            caption="Top pages outside the blog, by views"
            rows={topPages}
            rowKey={(page) => page.path}
            emptyText="No page views recorded in this period."
            columns={[
              { header: "Page", cell: (page) => <PageLabel path={page.path} adminRoute={adminRoute} /> },
              { header: "Views", numeric: true, cell: (page) => formatInteger(page.views) },
              { header: "Avg. time", numeric: true, cell: (page) => formatDuration(page.avgEngagementSeconds) },
            ]}
          />
        </Card>
        <Card
          title="Top converting pages"
          caption={`Where the ${formatInteger(ctaClicks.current)} CTA ${ctaClicks.current === 1 ? "click" : "clicks"} happened`}
        >
          <BarList
            label="Pages by CTA clicks"
            emptyText="No CTA clicks recorded yet. Clicks on “Start free”, “Book a call” and sign-up links are counted from the next deploy."
            items={convertingPages.map((page) => ({
              key: page.path,
              label: page.title ?? (page.path === "/" ? "Home" : page.path),
              detail: page.title ? page.path : undefined,
              value: formatInteger(page.clicks),
              share: page.share,
            }))}
          />
        </Card>
      </div>

      <div className={styles.grid2}>
        <Card title="Top countries" caption="By active users">
          <BarList
            label="Countries by active users"
            emptyText="No location data in this period."
            items={countries.map((country) => ({
              key: country.name,
              label: country.name,
              value: formatInteger(country.users),
              share: country.share,
            }))}
          />
        </Card>
        <Card title="Top cities" caption="By active users">
          <BarList
            label="Cities by active users"
            emptyText="No location data in this period."
            items={cities.map((city) => ({
              key: `${city.name}, ${city.detail}`,
              label: city.name,
              detail: city.detail,
              value: formatInteger(city.users),
              share: city.share,
            }))}
          />
        </Card>
      </div>
    </>
  );
}
