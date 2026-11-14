"use client";

import { useEffect, useId, useState, type KeyboardEvent, type PointerEvent } from "react";

import { formatDay, formatDayRange, formatDayWithWeekday, formatInteger } from "../../../../lib/analytics/format";
import styles from "../dashboard.module.scss";
import { Card } from "./Card";
import { cx, useSvgId } from "./util";

export interface TrendSeries {
  id: string;
  label: string;
  values: readonly number[];
  /** "area": the main series (green, gradient fill). "line": context (grey). */
  kind: "area" | "line";
}

/** Extra per-day figures shown in the tooltip and the table (e.g. CTR, position). */
export interface TrendDetail {
  label: string;
  values: readonly string[];
}

interface TrendChartProps {
  title: string;
  caption: string;
  dates: readonly string[];
  series: readonly TrendSeries[];
  details?: readonly TrendDetail[];
  emptyText: string;
}

const PAD_TOP = 12;
const PLOT_HEIGHT = 220;
/** Date labels under the plot; part of the frame's fixed height. */
const AXIS_BAND = 28;
const FRAME_HEIGHT = PAD_TOP + PLOT_HEIGHT + AXIS_BAND;
/** Room on the right for the series names at the line ends. */
const END_LABEL_GUTTER = 84;
/** Closer than this (px) and the end labels would collide, so the legend alone names the lines. */
const END_LABEL_MIN_GAP = 14;

const compactTick = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

/** 0 plus a few round steps covering `max`, e.g. 0, 50, 100, 150. */
function niceTicks(max: number): number[] {
  if (max <= 0) return [0, 1];
  const rough = max / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const residual = rough / magnitude;
  const step = Math.max(1, (residual > 5 ? 10 : residual > 2 ? 5 : residual > 1 ? 2 : 1) * magnitude);
  const top = Math.ceil(max / step) * step;
  return Array.from({ length: Math.round(top / step) + 1 }, (_, index) => index * step);
}

/** Daily counts on one shared axis: an area for the main series, a line for context. */
export function TrendChart({ title, caption, dates, series, details = [], emptyText }: TrendChartProps) {
  const [frame, setFrame] = useState<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const tableId = useId();
  const gradientId = useSvgId("area");

  useEffect(() => {
    if (!frame) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(frame);
    return () => observer.disconnect();
  }, [frame]);

  const lastIndex = dates.length - 1;
  const hasData = series.some((s) => s.values.some((value) => value > 0));

  // --- Scales -----------------------------------------------------------------
  const ticks = niceTicks(Math.max(0, ...series.flatMap((s) => s.values)));
  const top = ticks[ticks.length - 1];
  const formatTick = top >= 10_000 ? (value: number) => compactTick.format(value) : formatInteger;
  const left = Math.max(...ticks.map((tick) => formatTick(tick).length)) * 7 + 16;
  const baseline = PAD_TOP + PLOT_HEIGHT;
  const y = (value: number) => baseline - (value / top) * PLOT_HEIGHT;

  const endYs = series.map((s) => y(s.values[lastIndex] ?? 0));
  const showEndLabels =
    series.length > 1 &&
    endYs.every((a, i) => endYs.every((b, j) => i === j || Math.abs(a - b) >= END_LABEL_MIN_GAP));
  const plotWidth = Math.max(0, width - left - (showEndLabels ? END_LABEL_GUTTER : 16));
  const step = dates.length > 1 ? plotWidth / lastIndex : 0;
  const x = (index: number) => left + index * step;

  const linePath = (values: readonly number[]) =>
    values.map((value, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");

  // Date labels: as many as fit, counted back from the most recent day.
  const labelEvery = Math.ceil(dates.length / Math.max(2, Math.floor(plotWidth / 68)));
  const dateLabels = dates.map((_, index) => index).filter((index) => (lastIndex - index) % labelEvery === 0);
  const anchorFor = (index: number) =>
    x(index) - left < 24 ? "start" : left + plotWidth - x(index) < 24 ? "end" : "middle";

  // --- Hover and keyboard ------------------------------------------------------------
  const activeIndex = active !== null && active <= lastIndex ? active : null;
  const activeX = activeIndex !== null ? x(activeIndex) : 0;

  function indexAt(clientX: number): number {
    if (!frame || step === 0) return lastIndex;
    const index = Math.round((clientX - frame.getBoundingClientRect().left - left) / step);
    return Math.min(lastIndex, Math.max(0, index));
  }

  function onPointer(event: PointerEvent<HTMLDivElement>) {
    setActive(indexAt(event.clientX));
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const from = activeIndex ?? lastIndex;
    const moves: Partial<Record<string, number>> = { ArrowLeft: from - 1, ArrowRight: from + 1, Home: 0, End: lastIndex };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(Math.min(lastIndex, Math.max(0, next)));
  }

  const main = series[0];
  const total = main ? main.values.reduce((sum, value) => sum + value, 0) : 0;
  const peakIndex = main ? main.values.indexOf(Math.max(...main.values)) : -1;
  const summary =
    main && lastIndex >= 0
      ? `${title}, ${formatDayRange(dates[0], dates[lastIndex])}: ${formatInteger(total)} ${main.label.toLowerCase()} in total, ` +
        `highest on ${formatDay(dates[peakIndex])} with ${formatInteger(main.values[peakIndex])}. Use the arrow keys to read each day.`
      : title;

  const describeDay = (index: number) =>
    [
      formatDayWithWeekday(dates[index]),
      ...series.map((s) => `${formatInteger(s.values[index] ?? 0)} ${s.label.toLowerCase()}`),
      ...details.map((d) => `${d.label} ${d.values[index] ?? ""}`),
    ].join(", ");

  const legend =
    series.length > 1 ? (
      <ul className={styles.legend} aria-label="Legend">
        {series.map((s) => (
          <li key={s.id}>
            <span className={s.kind === "area" ? styles.keyArea : styles.keyLine} aria-hidden="true" />
            {s.label}
          </li>
        ))}
      </ul>
    ) : undefined;

  return (
    <Card title={title} caption={caption} aside={legend}>
      {hasData ? (
        <div
          ref={setFrame}
          className={styles.chartFrame}
          style={{ height: FRAME_HEIGHT }}
          role="group"
          aria-label={summary}
          tabIndex={0}
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          onPointerLeave={() => setActive(null)}
          onFocus={() => setActive((current) => current ?? lastIndex)}
          onBlur={() => setActive(null)}
          onKeyDown={onKeyDown}
        >
          {width > 0 ? (
            <svg width={width} height={FRAME_HEIGHT} aria-hidden="true" focusable="false" className={styles.chartSvg}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" className={styles.fillTop} />
                  <stop offset="100%" className={styles.fillBottom} />
                </linearGradient>
              </defs>

              {ticks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={left}
                    x2={left + plotWidth}
                    y1={y(tick)}
                    y2={y(tick)}
                    className={tick === 0 ? styles.axisLine : styles.gridLine}
                  />
                  <text x={left - 10} y={y(tick)} dy="0.32em" textAnchor="end" className={styles.tickLabel}>
                    {formatTick(tick)}
                  </text>
                </g>
              ))}
              {dateLabels.map((index) => (
                <text
                  key={dates[index]}
                  x={x(index)}
                  y={baseline + 20}
                  textAnchor={anchorFor(index)}
                  className={styles.tickLabel}
                >
                  {formatDay(dates[index])}
                </text>
              ))}

              {/* Context lines first, so the main series is drawn on top. */}
              {[...series].reverse().map((s) =>
                s.kind === "area" ? (
                  <g key={s.id}>
                    <path
                      d={`${linePath(s.values)} L${x(lastIndex).toFixed(1)} ${baseline} L${x(0).toFixed(1)} ${baseline} Z`}
                      fill={`url(#${gradientId})`}
                    />
                    <path d={linePath(s.values)} className={styles.areaLine} />
                  </g>
                ) : (
                  <path key={s.id} d={linePath(s.values)} className={styles.contextLine} />
                ),
              )}

              {showEndLabels
                ? series.map((s, index) => (
                    <text key={s.id} x={x(lastIndex) + 10} y={endYs[index]} dy="0.32em" className={styles.endLabel}>
                      {s.label}
                    </text>
                  ))
                : null}

              {activeIndex !== null ? (
                <>
                  <line x1={activeX} x2={activeX} y1={PAD_TOP} y2={baseline} className={styles.crosshair} />
                  {series.map((s) => (
                    <circle
                      key={s.id}
                      cx={activeX}
                      cy={y(s.values[activeIndex] ?? 0)}
                      r={4}
                      className={s.kind === "area" ? styles.dotArea : styles.dotContext}
                    />
                  ))}
                </>
              ) : null}
            </svg>
          ) : null}

          {activeIndex !== null ? (
            <div
              className={styles.tooltip}
              style={
                activeX > width / 2
                  ? { right: width - activeX + 14, top: PAD_TOP }
                  : { left: activeX + 14, top: PAD_TOP }
              }
              aria-hidden="true"
            >
              <p className={styles.tooltipDate}>{formatDayWithWeekday(dates[activeIndex])}</p>
              {series.map((s) => (
                <p key={s.id} className={styles.tooltipRow}>
                  <span
                    className={cx(styles.tooltipKey, s.kind === "area" ? styles.tooltipKeyArea : styles.tooltipKeyContext)}
                  />
                  <strong>{formatInteger(s.values[activeIndex] ?? 0)}</strong>
                  <span>{s.label}</span>
                </p>
              ))}
              {details.map((d) => (
                <p key={d.label} className={styles.tooltipDetail}>
                  <span>{d.label}</span>
                  <strong>{d.values[activeIndex]}</strong>
                </p>
              ))}
            </div>
          ) : null}

          <p className={styles.srOnly} aria-live="polite">
            {activeIndex !== null ? describeDay(activeIndex) : ""}
          </p>
        </div>
      ) : (
        <p className={styles.empty}>{emptyText}</p>
      )}

      <div className={styles.cardFooter}>
        <button
          type="button"
          className={styles.linkButton}
          aria-expanded={showTable}
          aria-controls={tableId}
          onClick={() => setShowTable((open) => !open)}
        >
          {showTable ? "Hide table" : "Show as table"}
        </button>
      </div>
      {showTable ? (
        <div id={tableId} className={styles.dailyTable} role="region" aria-label={`${title} table`} tabIndex={0}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Date</th>
                {series.map((s) => (
                  <th key={s.id} scope="col" className={styles.num}>
                    {s.label}
                  </th>
                ))}
                {details.map((d) => (
                  <th key={d.label} scope="col" className={styles.num}>
                    {d.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dates
                .map((date, index) => ({ date, index }))
                .reverse()
                .map(({ date, index }) => (
                  <tr key={date}>
                    <th scope="row">{formatDayWithWeekday(date)}</th>
                    {series.map((s) => (
                      <td key={s.id} className={styles.num}>
                        {formatInteger(s.values[index] ?? 0)}
                      </td>
                    ))}
                    {details.map((d) => (
                      <td key={d.label} className={styles.num}>
                        {d.values[index]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Card>
  );
}
