import { Check } from "lucide-react";
import Link from "next/link";

import CalendlyButton from "@/components/CalendlyButton";
import type { FeaturePageContent } from "@/content/featurePages";
import type { NavItem } from "@/content/navigation";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import FeatureImage from "./FeatureImage";
import {
  DARK_BG,
  DEEP_GREEN_BG,
  EYEBROW,
  EmphasisedText,
  FOCUS_RING,
  ON_DARK_ACCENT,
  PANEL_WIDTH,
} from "./shared";

/** Wording from the home page (its CTA and "How it works" footnote). */
const REASSURANCE = ["60 days free", "No commitment required"];

/** The split hero's image column: about 46% of the panel from lg, which stops growing at 88rem. */
const SPLIT_HERO_SIZES = "(min-width: 1408px) 41rem, (min-width: 960px) 46vw, 100vw";

type FeatureHeroProps = { page: FeaturePageContent; navItem: NavItem };

/**
 * The feature page hero, in the arrangement the page's `heroLayout` asks for.
 * The copy always comes first in the HTML; "split-reversed" only moves the
 * image panel visually.
 */
export default function FeatureHero({ page, navItem }: FeatureHeroProps) {
  const layout = page.heroLayout;
  const dark = layout === "dark";
  const centered = layout === "centered";
  const Icon = navItem.icon;

  const copy = (
    <>
      <p
        className={cn(
          EYEBROW,
          "inline-flex items-center gap-2 rounded-full px-3.5 py-2",
          dark ? `bg-white/10 ${ON_DARK_ACCENT}` : "bg-white text-primary",
          centered ? "self-center" : "self-start",
        )}
      >
        <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
        {page.eyebrow}
      </p>
      <h1
        className={cn(
          "mt-7 text-balance font-sans text-[2.5rem] font-black leading-[0.97] tracking-[-0.035em] sm:text-[3.25rem] lg:text-[2.875rem] xl:text-[3.5rem]",
          dark ? "text-white" : "text-[#111111]",
        )}
      >
        <EmphasisedText value={page.h1} emphasisClassName={dark ? ON_DARK_ACCENT : "text-primary"} />
      </h1>
      <p
        className={cn(
          "mt-6 max-w-xl font-sans text-lg leading-relaxed",
          dark ? "text-white/70" : "text-gray-600",
          centered && "mx-auto",
        )}
      >
        {page.valueProp}
      </p>
      <div className={cn("mt-9 flex flex-wrap items-center gap-3", centered && "justify-center")}>
        <Link
          href={SIGNUP_URL}
          target="_blank"
          rel="noopener"
          className={cn(
            "rounded-full bg-primary px-8 py-4 font-sans text-sm font-semibold text-white transition duration-200 hover:bg-primary-dark",
            FOCUS_RING,
          )}
        >
          Start free - 60 days
        </Link>
        <CalendlyButton
          className={cn(
            "cursor-pointer rounded-full border px-8 py-4 font-sans text-sm font-semibold transition duration-200",
            dark
              ? "border-white/30 bg-transparent text-white hover:border-white/60"
              : "border-[#111111]/20 bg-white/60 text-[#111111] hover:border-[#111111]/50 hover:bg-white",
            FOCUS_RING,
          )}
        />
      </div>
      <ul
        className={cn(
          "mt-6 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm",
          dark ? "text-white/70" : "text-gray-600",
          centered && "justify-center",
        )}
      >
        {REASSURANCE.map((point) => (
          <li key={point} className="flex items-center gap-1.5">
            <Check aria-hidden="true" className={cn("h-4 w-4", dark ? ON_DARK_ACCENT : "text-primary")} strokeWidth={2.5} />
            {point}
          </li>
        ))}
      </ul>
    </>
  );

  if (centered) {
    // Copy centred on bone, the image below it at the slot's own shape (16:10).
    return (
      <section className="px-3 pt-[5.75rem] lg:px-4 lg:pt-24">
        <div className={cn(PANEL_WIDTH, "rounded-[28px] bg-[#F4EFE4] px-3 pb-3 pt-14 sm:px-10 sm:pb-10 sm:pt-20")}>
          <div className="mx-auto flex max-w-3xl flex-col items-center px-3 text-center sm:px-0">{copy}</div>
          <FeatureImage
            {...page.heroImage}
            priority
            sizes="(min-width: 1104px) 64rem, 100vw"
            className="mx-auto mt-14 max-w-5xl rounded-[24px] bg-brand-mint"
            imageClassName="shadow-[0_32px_64px_-32px_rgba(0,61,30,0.45)]"
          />
        </div>
      </section>
    );
  }

  const reversed = layout === "split-reversed";
  return (
    <section className="px-3 pt-[5.75rem] lg:px-4 lg:pt-24">
      <div className={cn(PANEL_WIDTH, "grid gap-3", reversed ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-[1.15fr_1fr]")}>
        <div
          className={cn(
            "flex flex-col justify-center rounded-[28px] px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-14 xl:px-16 xl:py-20",
            dark ? DARK_BG : "bg-[#F4EFE4]",
          )}
        >
          {copy}
        </div>
        {/*
          The image fills its panel: 4:5 on phones, square on tablets, and the
          height of the copy panel beside it from lg up. Cropping is even from
          the sides, and from the top and bottom in a 30:70 split, so faces
          near the top of a photo stay in frame.
        */}
        <FeatureImage
          {...page.heroImage}
          priority
          tone={dark ? "dark" : "light"}
          sizes={SPLIT_HERO_SIZES}
          className={cn(
            "rounded-[28px] sm:aspect-square lg:aspect-auto lg:min-h-[34rem] [&_img]:object-[50%_30%]",
            dark ? DEEP_GREEN_BG : "bg-brand-mint",
            reversed && "lg:order-first",
          )}
        />
      </div>
    </section>
  );
}
