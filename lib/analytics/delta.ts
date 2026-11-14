/**
 * Period-over-period change for the KPI cards' trend badges.
 *
 * - "relative": counts and durations, as a percentage (+18.4%).
 * - "points": rates (0 to 1) such as engagement rate and CTR, in percentage points (+2.1 pts).
 * - "position": average Google position, where a lower number is better.
 */
export type DeltaKind = "relative" | "points" | "position";

export interface Delta {
  /** Short badge text without the arrow, e.g. "18.4%", "2.1 pts", "New". */
  text: string;
  /** Arrow direction. For position, "up" means the ranking improved. */
  direction: "up" | "down" | "flat";
  tone: "good" | "bad" | "neutral";
  /** Full sentence for screen readers and the badge's tooltip. */
  description: string;
}

const flat = (description: string): Delta => ({ text: "0%", direction: "flat", tone: "neutral", description });

export function computeDelta(
  current: number,
  previous: number,
  kind: DeltaKind,
  periodLabel: string,
): Delta | null {
  if (!Number.isFinite(current) || !Number.isFinite(previous)) return null;

  if (kind === "position") {
    // 0 means "no impressions", not "position 0": nothing to compare.
    if (current <= 0 || previous <= 0) return null;
    const change = previous - current; // positive = moved up the results
    if (Math.abs(change) < 0.05) {
      return { ...flat(`Average position unchanged vs ${periodLabel}`), text: "0.0" };
    }
    const improved = change > 0;
    return {
      text: Math.abs(change).toFixed(1),
      direction: improved ? "up" : "down",
      tone: improved ? "good" : "bad",
      description: `Average position ${improved ? "improved" : "dropped"} by ${Math.abs(change).toFixed(1)} vs ${periodLabel}`,
    };
  }

  if (kind === "points") {
    const points = (current - previous) * 100;
    if (Math.abs(points) < 0.05) return { ...flat(`Unchanged vs ${periodLabel}`), text: "0.0 pts" };
    return {
      text: `${Math.abs(points).toFixed(1)} pts`,
      direction: points > 0 ? "up" : "down",
      tone: points > 0 ? "good" : "bad",
      description: `${points > 0 ? "Up" : "Down"} ${Math.abs(points).toFixed(1)} percentage points vs ${periodLabel}`,
    };
  }

  if (previous === 0) {
    if (current === 0) return flat(`No change vs ${periodLabel}`);
    return { text: "New", direction: "up", tone: "good", description: `None in ${periodLabel}` };
  }
  const percent = ((current - previous) / previous) * 100;
  if (Math.abs(percent) < 0.05) return flat(`Unchanged vs ${periodLabel}`);
  const size = Math.abs(percent);
  const text = `${size >= 100 ? Math.round(size) : size.toFixed(1)}%`;
  return {
    text,
    direction: percent > 0 ? "up" : "down",
    tone: percent > 0 ? "good" : "bad",
    description: `${percent > 0 ? "Up" : "Down"} ${text} vs ${periodLabel}`,
  };
}
