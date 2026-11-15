import { Plus } from "lucide-react";

import type { BlogFaq } from "@/lib/blog/types";

/**
 * The article's FAQs as expandable questions. Native <details> elements: no
 * script needed, keyboard accessible, and every answer stays in the HTML for
 * search engines even while collapsed.
 */
export default function ArticleFaqs({ faqs }: { faqs: BlogFaq[] }) {
  return (
    <section id="faqs" aria-labelledby="faqs-heading" className="mt-16 scroll-mt-28">
      <h2
        id="faqs-heading"
        className="font-sans text-[1.75rem] font-extrabold leading-tight tracking-[-0.02em] text-[#111111]"
      >
        FAQs
      </h2>
      <div className="mt-6 border-t border-gray-200">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-gray-200">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-6 font-sans text-lg font-semibold leading-snug text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-xl [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#111111] text-white transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
              >
                <Plus className="h-4 w-4" />
              </span>
            </summary>
            <p className="whitespace-pre-line pb-7 pr-12 font-sans text-base leading-[1.8] text-gray-700 md:text-[17px]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
