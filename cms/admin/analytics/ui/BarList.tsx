import { formatShare } from "../../../../lib/analytics/format";
import styles from "../dashboard.module.scss";

export interface BarListItem {
  key: string;
  label: string;
  /** Secondary text after the label, e.g. a city's country. */
  detail?: string;
  /** The figure, already formatted. */
  value: string;
  /** Share of the whole, 0 to 1: the width of the bar behind the row. */
  share: number;
  /** Grey bar, for a folded "Other" row. */
  muted?: boolean;
}

/** Rows with a proportion bar behind them, like Vercel's lists. */
export function BarList({ items, label, emptyText }: { items: readonly BarListItem[]; label: string; emptyText: string }) {
  if (items.length === 0) return <p className={styles.empty}>{emptyText}</p>;

  return (
    <ol className={styles.barList} aria-label={label}>
      {items.map((item) => (
        <li key={item.key} className={styles.barRow}>
          <span
            className={styles.barFill}
            data-tone={item.muted ? "muted" : undefined}
            style={{ width: `${Math.max(item.share * 100, item.share > 0 ? 1.5 : 0)}%` }}
            aria-hidden="true"
          />
          <span className={styles.barLabel} title={item.detail ? `${item.label}, ${item.detail}` : item.label}>
            {item.label}
            {item.detail ? <span className={styles.barDetail}>{item.detail}</span> : null}
          </span>
          <span className={styles.barValue}>
            {item.value}
            <span className={styles.barShare}>{formatShare(item.share)}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
