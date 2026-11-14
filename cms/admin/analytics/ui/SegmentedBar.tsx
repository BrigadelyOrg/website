import { formatShare } from "../../../../lib/analytics/format";
import styles from "../dashboard.module.scss";

export interface Segment {
  key: string;
  label: string;
  value: number;
  /** The figure for the legend, already formatted. */
  valueText: string;
  /** Fixed per category, so a colour always means the same thing. */
  tone: "s1" | "s2" | "s3" | "muted";
}

/** One whole split into parts: a thin bar with a legend that carries the figures. */
export function SegmentedBar({
  segments,
  label,
  emptyText,
}: {
  segments: readonly Segment[];
  label: string;
  emptyText: string;
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  if (total <= 0) return <p className={styles.empty}>{emptyText}</p>;

  const visible = segments.filter((segment) => segment.value > 0);
  const summary = visible.map((segment) => `${segment.label} ${formatShare(segment.value / total)}`).join(", ");

  return (
    <div>
      <div className={styles.segmentBar} role="img" aria-label={`${label}: ${summary}`}>
        {visible.map((segment) => (
          <span
            key={segment.key}
            className={styles.segmentFill}
            data-tone={segment.tone}
            style={{ flexGrow: segment.value }}
            title={`${segment.label}: ${formatShare(segment.value / total)}`}
          />
        ))}
      </div>
      <ul className={styles.segmentLegend}>
        {segments.map((segment) => (
          <li key={segment.key}>
            <span className={styles.swatch} data-tone={segment.tone} aria-hidden="true" />
            <span>{segment.label}</span>
            <strong className={styles.legendShare}>{formatShare(segment.value / total)}</strong>
            <span className={styles.legendValue}>{segment.valueText}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
