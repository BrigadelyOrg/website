import fs from "node:fs";
import path from "node:path";

/**
 * Whether a file exists in /public, e.g. "/images/features/payroll/hero.png".
 * Server only. The feature pages are statically rendered, so this runs at
 * build time: adding the file and redeploying swaps a placeholder for it.
 */
export function publicFileExists(src: string): boolean {
  // turbopackIgnore: a runtime lookup, so the bundler mustn't trace all of /public.
  return fs.existsSync(path.join(/* turbopackIgnore: true */ process.cwd(), "public", src));
}
