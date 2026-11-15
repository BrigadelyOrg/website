import Image from "next/image";
import Link from "next/link";

import { isExternalLink } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { Media, Promo } from "@/payload-types";

const THEMES = {
  bone: {
    card: "bg-[#F4EFE4]",
    heading: "text-[#111111]",
    body: "text-gray-700",
    button: "bg-[#111111] text-white hover:bg-primary",
    shape: "bg-primary/15",
  },
  mint: {
    card: "bg-brand-mint",
    heading: "text-[#111111]",
    body: "text-gray-700",
    button: "bg-[#111111] text-white hover:bg-primary",
    shape: "bg-primary/20",
  },
  dark: {
    card: "bg-[#111111]",
    heading: "text-white",
    body: "text-white/75",
    button: "bg-primary text-white hover:bg-primary-dark",
    shape: "bg-primary/35",
  },
} as const satisfies Record<Promo["theme"], Record<string, string>>;

function isMedia(value: unknown): value is Media & { url: string } {
  return typeof value === "object" && value !== null && "url" in value && typeof value.url === "string";
}

/**
 * A promo from Content → Promos, placed in an article or glossary entry with
 * the editor's Promo block. Drafts (and deleted promos) render nothing.
 */
export default function PromoCard({ promo }: { promo: number | Promo | null | undefined }) {
  if (typeof promo !== "object" || promo === null || promo.status !== "published") return null;

  const theme = THEMES[promo.theme] ?? THEMES.bone;
  const image = isMedia(promo.image) ? promo.image : null;
  const external = isExternalLink(promo.buttonUrl);

  return (
    <aside
      aria-label="Promotion"
      // not-prose: the article's typography styles must not reach inside the card.
      className={cn("not-prose my-12 overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-10", theme.card)}
    >
      <div className={cn("grid items-center gap-8", image && "md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10")}>
        <div>
          <p className={cn("relative inline-flex items-center gap-2.5 pb-2.5 font-sans text-base font-bold", theme.heading)}>
            <Image src="/img/Icon.png" alt="" width={21} height={22} className="h-[22px] w-auto" />
            {promo.label}
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-primary" />
          </p>
          <p
            className={cn(
              "mt-6 text-balance font-sans text-2xl font-black leading-[1.1] tracking-[-0.02em] md:text-[1.75rem]",
              theme.heading,
            )}
          >
            {promo.heading}
          </p>
          <p className={cn("mt-3 font-sans text-base leading-relaxed", theme.body)}>{promo.body}</p>
          <Link
            href={promo.buttonUrl}
            {...(external ? { target: "_blank", rel: "noopener" } : {})}
            data-track-cta={`Promo: ${promo.name}`}
            className={cn(
              "mt-6 inline-flex rounded-full px-6 py-3 font-sans text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              theme.button,
            )}
          >
            {promo.buttonLabel}
          </Link>
        </div>

        {image && (
          <div className="relative px-2 py-3">
            <span aria-hidden="true" className={cn("absolute inset-0 -rotate-3 rounded-3xl", theme.shape)} />
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width ?? 1200}
              height={image.height ?? 800}
              sizes="(min-width: 1024px) 340px, (min-width: 768px) 45vw, 100vw"
              className="relative h-auto w-full rounded-xl shadow-[0_18px_40px_-20px_rgba(17,17,17,0.45)]"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
