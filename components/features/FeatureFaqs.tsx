"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";

import type { FeatureFaq } from "@/content/featurePages";

/**
 * Accordion of questions (WAI-ARIA accordion pattern): each question is a
 * button inside a heading, with `aria-expanded` and `aria-controls`. Closed
 * answers use `hidden`, so they stay in the server-rendered HTML that the
 * FAQPage structured data describes.
 */
export default function FeatureFaqs({ faqs }: { faqs: readonly FeatureFaq[] }) {
  const id = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set());

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {faqs.map((faq, index) => {
        const expanded = open.has(index);
        const buttonId = `${id}-question-${index}`;
        const panelId = `${id}-answer-${index}`;
        return (
          <div key={faq.question}>
            <h3 className="font-sans">
              <button
                type="button"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span className="text-lg font-semibold leading-snug tracking-[-0.01em] text-[#111111] transition-colors group-hover:text-primary">
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-white transition duration-200 motion-reduce:transition-none ${
                    expanded ? "rotate-45 bg-primary" : "bg-[#111111] group-hover:bg-primary"
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded} className="pb-7 pr-14">
              <p className="font-sans text-base leading-relaxed text-gray-600">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
