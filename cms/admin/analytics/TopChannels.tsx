import { formatInteger, formatShare } from "../../../lib/analytics/format";
import type { TrafficSources } from "../../../lib/analytics/types";
import styles from "./dashboard.module.scss";

/** Where blog sessions came from: one bar per source, largest first, share of all blog sessions. */
export function TopChannels({ sources }: { sources: TrafficSources }) {
  return (
    <section className={styles.card} aria-labelledby="blog-analytics-channels">
      <header className={styles.cardHeader}>
        <div>
          <h3 id="blog-analytics-channels" className={styles.cardTitle}>
            Top acquisition channels
          </h3>
          <p className={styles.cardCaption}>
            Share of {formatInteger(sources.totalSessions)} {sources.totalSessions === 1 ? "session" : "sessions"} that
            reached the blog
          </p>
        </div>
      </header>

      {sources.rows.length === 0 ? (
        <p className={styles.empty}>No sessions recorded in this period.</p>
      ) : (
        <ol className={styles.channels}>
          {sources.rows.map((row) => (
            <li key={row.label}>
              <div className={styles.channelHead}>
                <span className={styles.channelName}>
                  {row.label}
                  {row.channel && row.channel !== row.label ? (
                    <span className={styles.channelGroup}>{row.channel}</span>
                  ) : null}
                </span>
                <span className={styles.channelFigures}>
                  <span className={styles.channelCount}>
                    {formatInteger(row.sessions)}
                    <span className={styles.srOnly}> sessions,</span>
                  </span>
                  <span className={styles.channelShare}>{formatShare(row.share)}</span>
                </span>
              </div>
              <div className={row.isOther ? `${styles.meter} ${styles.meterOther}` : styles.meter} aria-hidden="true">
                <span style={{ width: `${row.share * 100}%` }} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
