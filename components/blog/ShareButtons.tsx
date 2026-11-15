"use client";

import { Check, Facebook, Link2, Linkedin } from "lucide-react";
import { useEffect, useState, type SVGProps } from "react";

import { cn } from "@/lib/utils";

type ShareButtonsProps = {
  /** The article's canonical URL (never the address bar, which may carry ?query or #anchors). */
  url: string;
  title: string;
  /**
   * "rail": the vertical strip beside the article on wide screens, with "Back to
   * top" and a reading-progress line. "inline": a row for the end of the article.
   */
  variant: "rail" | "inline";
  /** The element whose reading progress the rail shows. */
  progressTargetId?: string;
  className?: string;
};

/** X's logo; lucide's Twitter icon is the old bird. */
function XLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const BUTTON =
  "grid h-11 w-11 place-items-center rounded-full border border-gray-300 bg-white text-[#111111] transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Share links (LinkedIn, X, Facebook, copy link), and on the rail, back to top. */
export default function ShareButtons({ url, title, variant, progressTargetId, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  const link = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const networks = [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`, Icon: Linkedin },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${link}&text=${text}`, Icon: XLogo },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${link}`, Icon: Facebook },
  ];

  // Reading progress through the article, for the rail's line.
  useEffect(() => {
    if (variant !== "rail" || !progressTargetId) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const target = document.getElementById(progressTargetId);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY;
      const scrollable = target.offsetHeight - window.innerHeight;
      const value = scrollable > 0 ? (window.scrollY - top) / scrollable : 1;
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [variant, progressTargetId]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked (e.g. insecure contexts); the address bar still works.
      window.prompt("Copy this link:", url);
    }
  }

  const buttons = (
    <>
      {networks.map(({ name, href, Icon }) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${name}`} className={BUTTON}>
            <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
      <li>
        <button type="button" onClick={copyLink} aria-label="Copy link to this article" className={BUTTON}>
          {copied ? (
            <Check aria-hidden="true" className="h-[18px] w-[18px] text-primary" />
          ) : (
            <Link2 aria-hidden="true" className="h-[18px] w-[18px]" />
          )}
        </button>
      </li>
    </>
  );

  const status = (
    <p aria-live="polite" className="sr-only">
      {copied ? "Link copied" : ""}
    </p>
  );

  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-3", className)}>
        <p className="font-sans text-sm font-semibold text-[#111111]">Share this article</p>
        <ul className="flex gap-2.5">{buttons}</ul>
        {status}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "instant" : "smooth" })}
        className="group flex flex-col items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="rotate-180 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 transition-colors [writing-mode:vertical-rl] group-hover:text-[#111111]">
          Back to top
        </span>
        <span aria-hidden="true" className="relative h-28 w-0.5 overflow-hidden rounded-full bg-gray-200">
          <span className="absolute inset-x-0 top-0 rounded-full bg-primary" style={{ height: `${progress * 100}%` }} />
        </span>
      </button>
      <ul aria-label="Share this article" className="flex flex-col gap-3">
        {buttons}
      </ul>
      {status}
    </div>
  );
}
