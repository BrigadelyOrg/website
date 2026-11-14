"use client";

import { useEffect, useId, useState, type KeyboardEvent, type PointerEvent } from "react";

import { formatDay, formatDayRange, formatDayWithWeekday, formatInteger } from "../../../lib/analytics/format";
import type { DailyTraffic } from "../../../lib/analytics/types";
import styles from "./dashboard.module.scss";

const PAD_TOP = 8;
const PLOT_HEIGHT = 200;
/** Room for the date labels under the plot; part of the frame's fixed height. */
const AXIS_BAND = 28;
const FRAME_HEIGHT = PAD_TOP + PLOT_HEIGHT + AXIS_BAND;
/** Space on the right for the "Views" / "Readers" labels at the line ends. */
const END_LABEL_GUTTER = 64;
/** Closer than this (px) and the two end labels would collide, so the legend alone names the lines. */
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

/** Daily blog views (green area) and readers (grey line) on one shared count axis. */
export function TrafficChart({ daily }: { daily: DailyTraffic[] }) {
  const [frame, setFrame] = useState<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const titleId = useId();
  const tableId = useId();

  useEffect(() => {
    if (!frame) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(frame);
    return () => observer.disconnect();
  }, [frame]);

  const lastIndex = daily.length - 1;
  const hasTraffic = daily.some((day) => day.views > 0 || day.readers > 0);

  // --- Scales ----------------------------------------------------------------
  const ticks = niceTicks(Math.max(0, ...daily.map((day) => Math.max(day.views, day.readers))));
  const top = ticks[ticks.length - 1];
  const formatTick = top >= 10_000 ? (value: number) => compactTick.format(value) : formatInteger;
  const left = Math.max(...ticks.map((tick) => formatTick(tick).length)) * 7 + 14;
  const baseline = PAD_TOP + PLOT_HEIGHT;
  const y = (value: number) => baseline - (value / top) * PLOT_HEIGHT;

  const last = daily[lastIndex];
  const endViewsY = last ? y(last.views) : baseline;
  const endReadersY = last ? y(last.readers) : baseline;
  const showEndLabels = Math.abs(endViewsY - endReadersY) >= END_LABEL_MIN_GAP;
  const plotWidth = Math.max(0, width - left - (showEndLabels ? END_LABEL_GUTTER : 16));
  const step = daily.length > 1 ? plotWidth / lastIndex : 0;
  const x = (index: number) => left + index * step;

  const linePath = (series: "views" | "readers") =>
    daily.map((day, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)} ${y(day[series]).toFixed(1)}`).join(" ");
  const viewsLine = linePath("views");
  const viewsArea = `${viewsLine} L${x(lastIndex).toFixed(1)} ${baseline} L${x(0).toFixed(1)} ${baseline} Z`;

  // Date labels: as many as fit, counted back from the most recent day.
  const labelEvery = Math.ceil(daily.length / Math.max(2, Math.floor(plotWidth / 64)));
  const dateLabels = daily.map((_, index) => index).filter((index) => (lastIndex - index) % labelEvery === 0);
  const anchorFor = (index: number) =>
    x(index) - left < 24 ? "start" : left + plotWidth - x(index) < 24 ? "end" : "middle";

  // --- Hover and keyboard --------------------------------------------------------
  const activeIndex = active !== null && active <= lastIndex ? active : null;
  const activeDay = activeIndex !== null ? daily[activeIndex] : undefined;
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
    const moves: Partial<Record<string, number>> = {
      ArrowLeft: from - 1,
      ArrowRight: from + 1,
      Home: 0,
      End: lastIndex,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(Math.min(lastIndex, Math.max(0, next)));
  }

  const peak = daily.reduce<DailyTraffic | undefined>((best, day) => (!best || day.views > best.views ? day : best), undefined);
  const totalViews = daily.reduce((sum, day) => sum + day.views, 0);
  const summary =
    peak && last
      ? `Daily blog views and readers, ${formatDayRange(daily[0].date, last.date)}: ${formatInteger(totalViews)} views in total, ` +
        `busiest day ${formatDay(peak.date)} with ${formatInteger(peak.views)} views. Use the arrow keys to read each day.`
      : "Daily blog views and readers.";

  return (
    <section className={styles.card} aria-labelledby={titleId}>
      <header className={styles.cardHeader}>
        <div>
          <h3 id={titleId} className={styles.cardTitle}>
            Daily traffic
          </h3>
          <p className={styles.cardCaption}>Page views and readers per day on /blog pages</p>
        </div>
        <ul className={styles.legend} aria-label="Legend">
          <li>
            <span className={`${styles.legendKey} ${styles.legendViews}`} aria-hidden="true" />
            Views
          </li>
          <li>
            <span className={`${styles.legendKey} ${styles.legendReaders}`} aria-hidden="true" />
            Readers
          </li>
        </ul>
      </header>

      {hasTraffic ? (
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
              {ticks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={left}
                    x2={left + plotWidth}
                    y1={y(tick)}
                    y2={y(tick)}
                    className={tick === 0 ? styles.axisLine : styles.gridLine}
                  />
                  <text x={left - 8} y={y(tick)} dy="0.32em" textAnchor="end" className={styles.tickLabel}>
                    {formatTick(tick)}
                  </text>
                </g>
              ))}
              {dateLabels.map((index) => (
                <text
                  key={daily[index].date}
                  x={x(index)}
                  y={baseline + 18}
                  textAnchor={anchorFor(index)}
                  className={styles.tickLabel}
                >
                  {formatDay(daily[index].date)}
                </text>
              ))}

              <path d={viewsArea} className={styles.viewsArea} />
              <path d={linePath("readers")} className={styles.readersLine} />
              <path d={viewsLine} className={styles.viewsLine} />

              {showEndLabels ? (
                <>
                  <text x={x(lastIndex) + 8} y={endViewsY} dy="0.32em" className={styles.endLabel}>
                    Views
                  </text>
                  <text x={x(lastIndex) + 8} y={endReadersY} dy="0.32em" className={styles.endLabel}>
                    Readers
                  </text>
                </>
              ) : null}

              {activeDay ? (
                <>
                  <line x1={activeX} x2={activeX} y1={PAD_TOP} y2={baseline} className={styles.crosshair} />
                  <circle cx={activeX} cy={y(activeDay.readers)} r={4} className={styles.readersDot} />
                  <circle cx={activeX} cy={y(activeDay.views)} r={4} className={styles.viewsDot} />
                </>
              ) : null}
            </svg>
          ) : null}

          {activeDay ? (
            <div
              className={styles.tooltip}
              style={
                activeX > width / 2
                  ? { right: width - activeX + 12, top: PAD_TOP }
                  : { left: activeX + 12, top: PAD_TOP }
              }
              aria-hidden="true"
            >
              <p className={styles.tooltipDate}>{formatDayWithWeekday(activeDay.date)}</p>
              <p className={styles.tooltipRow}>
                <span className={`${styles.tooltipKey} ${styles.tooltipKeyViews}`} />
                <strong>{formatInteger(activeDay.views)}</strong>
                <span>Views</span>
              </p>
              <p className={styles.tooltipRow}>
                <span className={`${styles.tooltipKey} ${styles.tooltipKeyReaders}`} />
                <strong>{formatInteger(activeDay.readers)}</strong>
                <span>Readers</span>
              </p>
            </div>
          ) : null}

          <p className={styles.srOnly} aria-live="polite">
            {activeDay
              ? `${formatDayWithWeekday(activeDay.date)}: ${formatInteger(activeDay.views)} views, ${formatInteger(activeDay.readers)} readers`
              : ""}
          </p>
        </div>
      ) : (
        <p className={styles.empty}>No blog page views recorded in this period.</p>
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
        <div id={tableId} className={styles.dailyTable} role="region" aria-label="Daily traffic table" tabIndex={0}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col" className={styles.num}>
                  Views
                </th>
                <th scope="col" className={styles.num}>
                  Readers
                </th>
              </tr>
            </thead>
            <tbody>
              {[...daily].reverse().map((day) => (
                <tr key={day.date}>
                  <th scope="row">{formatDayWithWeekday(day.date)}</th>
                  <td className={styles.num}>{formatInteger(day.views)}</td>
                  <td className={styles.num}>{formatInteger(day.readers)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
