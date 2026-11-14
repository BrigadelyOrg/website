import { Link } from "@payloadcms/ui";

import { formatInteger } from "../../../../lib/analytics/format";
import type { LiveVisitors } from "../../../../lib/analytics/types";
import styles from "../dashboard.module.scss";
import { IconClock, IconExternal } from "../ui/icons";
import { SetupNotice } from "../ui/States";
import { cx } from "../ui/util";

/**
 * Above the GA4 tabs while the selected range has no processed visits at all:
 * a new property, a tag that isn't sending, or a range from before tracking
 * started. The live count tells a new property apart from a silent tag.
 */
export function AwaitingData({ live }: { live: LiveVisitors | null }) {
  const activeNow = live?.activeUsers ?? 0;
  return (
    <div className={cx(styles.notice, styles.noticeCompact, activeNow > 0 ? undefined : styles.noticeNeutral)} role="status">
      <div className={styles.noticeHead}>
        <span className={styles.noticeIcon}>
          <IconClock />
        </span>
        <h3 className={styles.noticeTitle}>
          {activeNow > 0 ? "Visits are coming in; they appear here after the first full day" : "No processed visits in this range yet"}
        </h3>
      </div>
      {activeNow > 0 ? (
        <p>
          Google Analytics has {formatInteger(activeNow)} active {activeNow === 1 ? "user" : "users"} in the last 30
          minutes, but no processed visits in this range yet. This dashboard counts whole days up to yesterday, and
          Google can take 24–48 hours to process a new property&rsquo;s first visits.
        </p>
      ) : (
        <p>
          This dashboard counts whole days up to yesterday, and Google can take 24–48 hours to process new visits. If
          brigadely.com has been tracked for longer than that, check that <code>GA4_PROPERTY_ID</code> is the property
          your Google tag sends data to.
        </p>
      )}
    </div>
  );
}

/** A page or article row: title, path, and quick links to edit it in /admin or open it live. */
export function PageLabel({
  path,
  title = null,
  postId = null,
  adminRoute,
}: {
  path: string;
  title?: string | null;
  postId?: number | null;
  adminRoute: string;
}) {
  const name = title ?? (path === "/" ? "Home" : path);
  return (
    <>
      <span className={styles.rowTitle}>{name}</span>
      <span className={styles.rowMeta}>
        {name === path ? null : <span className={styles.rowPath}>{path}</span>}
        {postId === null ? null : (
          <Link href={`${adminRoute}/collections/posts/${postId}`} className={styles.action}>
            Edit <IconExternal />
          </Link>
        )}
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.action}
          aria-label={`Open “${name}” on the site (new tab)`}
        >
          Live <IconExternal />
        </a>
      </span>
    </>
  );
}

const ENV_HELP: Record<string, string> = {
  GA4_PROPERTY_ID: "the numeric Property ID (GA4 → Admin → Property details), not the G-… ID",
  GA4_CLIENT_EMAIL: "client_email from the service account's JSON key",
  GA4_PRIVATE_KEY: "private_key from the same JSON key",
  GSC_SITE_URL: "your Search Console property: sc-domain:brigadely.com or https://brigadely.com/",
};
const describeKey = (key: string) => `: ${ENV_HELP[key] ?? ""}`;

export function Ga4Setup({ missing }: { missing: readonly string[] }) {
  return (
    <SetupNotice
      title="Connect Google Analytics 4"
      intro="Site traffic, conversions and blog performance come from GA4 through a read-only Google service account."
      missing={missing}
      describeKey={describeKey}
      steps={[
        <>
          In Google Cloud, enable the <strong>Google Analytics Data API</strong> and create a service account with a
          JSON key.
        </>,
        <>
          In GA4 → Admin → Property access management, add the service account&rsquo;s email as a{" "}
          <strong>Viewer</strong>.
        </>,
        <>
          Set the variables below. The full steps are in <code>.env.example</code>.
        </>,
      ]}
    />
  );
}

export function SearchSetup({ missing }: { missing: readonly string[] }) {
  return (
    <SetupNotice
      title="Connect Google Search Console"
      intro="See the searches that bring people to brigadely.com: clicks, impressions, click-through rate, average position, and the queries and pages behind them. It uses the same service account as GA4."
      missing={missing}
      describeKey={describeKey}
      steps={[
        <>
          In Google Cloud (the service account&rsquo;s project), enable the{" "}
          <strong>Google Search Console API</strong>.
        </>,
        <>
          In Search Console → Settings → Users and permissions, add the service account&rsquo;s email (
          <code>GA4_CLIENT_EMAIL</code>) with <strong>Restricted</strong> permission.
        </>,
        <>
          Set <code>GSC_SITE_URL</code> to the property: <code>sc-domain:brigadely.com</code> for a Domain property, or{" "}
          <code>https://brigadely.com/</code> for a URL-prefix property.
        </>,
      ]}
    />
  );
}
