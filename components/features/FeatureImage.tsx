import type { CSSProperties } from "react";
import Image from "next/image";

import { publicFileExists } from "@/lib/public-files";
import { cn } from "@/lib/utils";

type FeatureImageProps = {
  /** Path under /public, e.g. "/images/features/payroll/hero.jpg". */
  src: string;
  alt: string;
  /** The slot's recommended size: it sets the frame's default shape and is shown on the placeholder. */
  width: number;
  height: number;
  /** Only for the hero image, which is above the fold. */
  priority?: boolean;
  sizes?: string;
  /** Classes for the frame: rounding, and any size or shape that overrides the default. */
  className?: string;
  /** Classes for the frame only once the image exists, e.g. a shadow the placeholder shouldn't get. */
  imageClassName?: string;
  /** The background the slot sits on: "dark" gives the placeholder light-on-dark styling. */
  tone?: "light" | "dark";
};

/**
 * An image slot. The frame takes the slot's shape (its width/height ratio)
 * unless `className` gives it another size, and the image covers it edge to
 * edge, cropping evenly from the sides if a replacement has a different
 * shape. If the file doesn't exist in /public, the frame shows the path and
 * size it expects instead. Replacing the file (and redeploying) changes the
 * image with no code change.
 */
export default function FeatureImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "(min-width: 960px) 50vw, 100vw",
  className,
  imageClassName,
  tone = "light",
}: FeatureImageProps) {
  const exists = publicFileExists(src);
  const frameStyle = { "--slot-ratio": `${width} / ${height}` } as CSSProperties;

  if (exists) {
    return (
      <div
        style={frameStyle}
        className={cn("relative aspect-[var(--slot-ratio)] w-full overflow-hidden", className, imageClassName)}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      style={frameStyle}
      className={cn(
        "flex aspect-[var(--slot-ratio)] w-full items-center justify-center border border-dashed p-6",
        tone === "dark" ? "border-white/25 bg-white/5" : "border-gray-300 bg-white/70",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("break-all text-center font-mono text-xs", tone === "dark" ? "text-white/50" : "text-gray-400")}
      >
        {src} · {width}×{height}
      </span>
    </div>
  );
}
