import type { ReactNode } from "react";

import styles from "../dashboard.module.scss";
import { IconAlert, IconPlug } from "./icons";
import { cx } from "./util";

export type ConnectionState = "ok" | "off" | "error" | "loading";

/** "GA4 Connected" and friends: the dot's colour is backed by the text. */
export function StatusPill({ state, label }: { state: ConnectionState; label: string }) {
  return (
    <span className={styles.pill} data-state={state}>
      <span className={styles.pillDot} aria-hidden="true" />
      {label}
    </span>
  );
}

/** Setup instructions for a data source that isn't configured yet. */
export function SetupNotice({
  title,
  intro,
  missing,
  describeKey,
  steps,
}: {
  title: string;
  intro: ReactNode;
  missing: readonly string[];
  describeKey: (key: string) => ReactNode;
  steps: readonly ReactNode[];
}) {
  return (
    <div className={styles.notice} role="status">
      <div className={styles.noticeHead}>
        <span className={styles.noticeIcon}>
          <IconPlug />
        </span>
        <h3 className={styles.noticeTitle}>{title}</h3>
      </div>
      <p>{intro}</p>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p>
        {missing.length === 1 ? "This environment variable is" : "These environment variables are"} still missing
        (add {missing.length === 1 ? "it" : "them"} to <code>.env</code> and to Netlify, then redeploy):
      </p>
      <ul className={styles.envList}>
        {missing.map((key) => (
          <li key={key}>
            <code>{key}</code>
            {describeKey(key)}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A data source that answered with an error. */
export function ErrorNotice({
  title,
  error,
  hint,
  onRetry,
  retrying,
}: {
  title: string;
  error: string;
  hint?: string;
  onRetry: () => void;
  retrying: boolean;
}) {
  return (
    <div className={cx(styles.notice, styles.noticeError)} role="alert">
      <div className={styles.noticeHead}>
        <span className={styles.noticeIcon}>
          <IconAlert />
        </span>
        <h3 className={styles.noticeTitle}>{title}</h3>
      </div>
      <p>
        <strong>{error}</strong>
      </p>
      {hint ? <p>{hint}</p> : null}
      <div className={styles.noticeActions}>
        <button type="button" className={styles.refresh} onClick={onRetry} disabled={retrying}>
          {retrying ? "Trying again…" : "Try again"}
        </button>
      </div>
    </div>
  );
}

/** Placeholders shaped like a tab's layout while the first load runs. */
export function TabSkeleton() {
  return (
    <div className={styles.panel} aria-busy="true">
      <p className={styles.srOnly}>Loading analytics…</p>
      <div className={styles.kpis} aria-hidden="true">
        {[0, 1, 2, 3].map((tile) => (
          <div key={tile} className={cx(styles.skeleton, styles.skeletonKpi)} />
        ))}
      </div>
      <div className={cx(styles.skeleton, styles.skeletonChart)} aria-hidden="true" />
      <div className={styles.grid2} aria-hidden="true">
        <div className={cx(styles.skeleton, styles.skeletonCard)} />
        <div className={cx(styles.skeleton, styles.skeletonCard)} />
      </div>
    </div>
  );
}
