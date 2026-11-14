import type { ReactNode } from "react";

import styles from "../dashboard.module.scss";

export interface RankedColumn<Row> {
  header: string;
  cell: (row: Row) => ReactNode;
  /** Right-aligned, tabular figures. */
  numeric?: boolean;
}

interface RankedTableProps<Row> {
  /** Read by screen readers as the table's name. */
  caption: string;
  rows: readonly Row[];
  rowKey: (row: Row) => string;
  /** The first column is the row's label (a row header); the rest are figures. */
  columns: readonly RankedColumn<Row>[];
  emptyText: string;
}

/** A ranked list: #1, #2, #3 badges, subtle dividers, a hover highlight. */
export function RankedTable<Row>({ caption, rows, rowKey, columns, emptyText }: RankedTableProps<Row>) {
  if (rows.length === 0) return <p className={styles.empty}>{emptyText}</p>;
  const [label, ...figures] = columns;

  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <caption className={styles.srOnly}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className={styles.rankCell}>
              <span className={styles.srOnly}>Rank</span>
            </th>
            <th scope="col">{label.header}</th>
            {figures.map((column) => (
              <th key={column.header} scope="col" className={column.numeric ? styles.num : undefined}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={rowKey(row)}>
              <td className={styles.rankCell}>
                <span className={styles.rank} data-top={index < 3 || undefined}>
                  #{index + 1}
                </span>
              </td>
              <th scope="row">{label.cell(row)}</th>
              {figures.map((column) => (
                <td key={column.header} className={column.numeric ? styles.num : undefined}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
