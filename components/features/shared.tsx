import type { Emphasised } from "@/content/featurePages";

/** Styles shared by the feature page sections. */
export const EYEBROW = "font-sans text-[11px] font-bold uppercase tracking-[0.18em]";
export const H2 = "text-balance font-sans text-4xl font-black leading-[0.98] tracking-[-0.03em] md:text-5xl";
export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
/** Outer width of the full-bleed panels (hero, ledger band): the page edge less a 12-16px gutter. */
export const PANEL_WIDTH = "mx-auto max-w-[88rem]";
/** The ledger band image: half of a max-w-6xl grid. */
export const SCREENSHOT_SIZES = "(min-width: 1408px) 36rem, (min-width: 960px) 42vw, 100vw";

/** The two dark surfaces (near-black and deep green) and the light green used for emphasis on them. */
export const DARK_BG = "bg-[#111111]";
export const DEEP_GREEN_BG = "bg-[#0B3D26]";
export const ON_DARK_ACCENT = "text-[#7DD3A8]";

/**
 * Icon tiles take turns through the home page's chip styles: mint,
 * near-black, white and solid green. On white cards, bone replaces white so
 * the tile stays visible.
 */
export const TILE_STYLES = [
  "bg-brand-mint text-primary",
  "bg-[#111111] text-white",
  "bg-white text-primary",
  "bg-primary text-white",
];
export const TILE_STYLES_ON_WHITE = [
  "bg-brand-mint text-primary",
  "bg-[#111111] text-white",
  "bg-[#F4EFE4] text-primary",
  "bg-primary text-white",
];

/** A headline with its `emphasis` in brand green (or `emphasisClassName`); the text itself is unchanged. */
export function EmphasisedText({
  value,
  emphasisClassName = "text-primary",
}: {
  value: Emphasised;
  emphasisClassName?: string;
}) {
  const at = value.text.indexOf(value.emphasis);
  if (at < 0) return <>{value.text}</>;
  return (
    <>
      {value.text.slice(0, at)}
      <span className={emphasisClassName}>{value.emphasis}</span>
      {value.text.slice(at + value.emphasis.length)}
    </>
  );
}
