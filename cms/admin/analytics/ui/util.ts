import { useId } from "react";

/** Joins class names, skipping empty ones. */
export const cx = (...names: Array<string | false | null | undefined>): string => names.filter(Boolean).join(" ");

/** A useId() value that is safe inside SVG url(#…) references. */
export function useSvgId(prefix: string): string {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}
