import type { Delta } from "../../../../lib/analytics/delta";
import styles from "../dashboard.module.scss";
import { IconTrend } from "./icons";
import { useSvgId } from "./util";

export interface KpiCardProps {
  label: string;
  value: string;
  caption?: string;
  delta?: Delta | null;
  /** Daily values for the sparkline. */
  trend?: readonly number[];
  /** Draw lower values higher (average position, where 1 is best). */
  invertTrend?: boolean;
}

/** One headline figure. Render inside a <dl> (the KPI grid). */
export function KpiCard({ label, value, caption, delta, trend, invertTrend = false }: KpiCardProps) {
  return (
    <div className={styles.kpi}>
      <dt className={styles.kpiLabel}>{label}</dt>
      {delta ? (
        <dd className={styles.kpiDelta}>
          <DeltaBadge delta={delta} />
        </dd>
      ) : null}
      <dd className={styles.kpiValue}>{value}</dd>
      {caption ? (
        <dd className={styles.kpiCaption} title={caption}>
          {caption}
        </dd>
      ) : null}
      {trend && trend.length > 1 ? (
        <dd className={styles.kpiTrend}>
          <Sparkline values={trend} invert={invertTrend} />
        </dd>
      ) : null}
    </div>
  );
}

export function DeltaBadge({ delta }: { delta: Delta }) {
  return (
    <span className={styles.delta} data-tone={delta.tone} title={delta.description}>
      {delta.direction === "flat" ? null : <IconTrend direction={delta.direction} />}
      <span aria-hidden="true">{delta.text}</span>
      <span className={styles.srOnly}>{delta.description}</span>
    </span>
  );
}

const WIDTH = 120;
const HEIGHT = 36;
const PAD = 3;

/** Shape of the period at a glance; the exact numbers are in the chart and tables. */
function Sparkline({ values, invert }: { values: readonly number[]; invert: boolean }) {
  const gradientId = useSvgId("spark");
  const max = Math.max(...values);
  const min = Math.min(...values);
  const x = (index: number) => (index / (values.length - 1)) * WIDTH;
  const y = (value: number) => {
    if (max === min) return HEIGHT - PAD;
    const position = (value - min) / (max - min);
    return PAD + (invert ? position : 1 - position) * (HEIGHT - PAD * 2);
  };
  const line = values.map((value, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(2)} ${y(value).toFixed(2)}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={styles.sparkline}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className={styles.fillTop} />
          <stop offset="100%" className={styles.fillBottom} />
        </linearGradient>
      </defs>
      <path d={`${line} L${WIDTH} ${HEIGHT} L0 ${HEIGHT} Z`} fill={`url(#${gradientId})`} />
      <path d={line} className={styles.sparkLine} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
