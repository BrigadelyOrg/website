import { useId, type ReactNode } from "react";

import styles from "../dashboard.module.scss";

/** A titled panel. */
export function Card({
  title,
  caption,
  aside,
  children,
}: {
  title: string;
  caption?: ReactNode;
  /** Right side of the header, e.g. a legend. */
  aside?: ReactNode;
  children: ReactNode;
}) {
  const titleId = useId();
  return (
    <section className={styles.card} aria-labelledby={titleId}>
      <header className={styles.cardHeader}>
        <div>
          <h3 id={titleId} className={styles.cardTitle}>
            {title}
          </h3>
          {caption ? <p className={styles.cardCaption}>{caption}</p> : null}
        </div>
        {aside}
      </header>
      {children}
    </section>
  );
}
