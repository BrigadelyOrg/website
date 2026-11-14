import Link from "next/link";

import { formatInteger } from "../../../lib/analytics/format";
import type { TopArticle } from "../../../lib/analytics/types";
import styles from "./dashboard.module.scss";

/** The 10 most-viewed articles, each linking to its editor and to the live page. */
export function TopArticles({ articles, adminRoute }: { articles: TopArticle[]; adminRoute: string }) {
  return (
    <section className={styles.card} aria-labelledby="blog-analytics-articles">
      <header className={styles.cardHeader}>
        <div>
          <h3 id="blog-analytics-articles" className={styles.cardTitle}>
            Top performing articles
          </h3>
          <p className={styles.cardCaption}>Ranked by views in this period</p>
        </div>
      </header>

      {articles.length === 0 ? (
        <p className={styles.empty}>No article views recorded in this period.</p>
      ) : (
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Article</th>
                <th scope="col" className={styles.num}>
                  Views
                </th>
                <th scope="col" className={styles.num}>
                  Readers
                </th>
                <th scope="col" className={styles.num}>
                  Avg. time
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => {
                const title = article.title ?? article.path;
                return (
                  <tr key={article.path}>
                    <th scope="row" className={styles.articleCell}>
                      {article.postId === null ? (
                        <span className={styles.articleTitle}>{title}</span>
                      ) : (
                        <Link
                          href={`${adminRoute}/collections/posts/${article.postId}`}
                          className={styles.articleTitle}
                          title="Edit this article"
                        >
                          {title}
                        </Link>
                      )}
                      <a
                        href={article.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.articlePath}
                        aria-label={`View “${title}” on the site (opens in a new tab)`}
                      >
                        {article.path}
                        <ExternalIcon />
                      </a>
                    </th>
                    <td className={styles.num}>{formatInteger(article.views)}</td>
                    <td className={styles.num}>{formatInteger(article.readers)}</td>
                    <td className={styles.num}>{article.avgEngagementTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path
        d="M4.5 2.5h5v5M9.5 2.5 3 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
