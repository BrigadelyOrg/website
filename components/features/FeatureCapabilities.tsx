import type { Capability, CapabilitiesSection, Comparison, AuthorityRow } from "@/content/featurePages";
import { cn } from "@/lib/utils";

import { DARK_BG, EYEBROW, EmphasisedText, H2, ON_DARK_ACCENT, TILE_STYLES, TILE_STYLES_ON_WHITE } from "./shared";

const CARD_TINT = "bg-[#F4EFE4]/60";
const STEP_LABEL = "font-sans text-sm font-semibold tabular-nums text-gray-400";

const stepNumber = (index: number) => String(index + 1).padStart(2, "0");

function Heading({ section, align }: { section: CapabilitiesSection; align: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : undefined}>
      <p className={`${EYEBROW} text-primary`}>Capabilities</p>
      <h2 id="capabilities-heading" className={`${H2} mt-5 text-[#111111]`}>
        <EmphasisedText value={section.heading} />
      </h2>
    </div>
  );
}

/** A small bordered card, used under the table and the comparison. */
function CompactCard({ card, index }: { card: Capability; index: number }) {
  return (
    <li className="flex flex-col rounded-2xl border border-gray-200 p-6">
      <span className={cn("grid h-10 w-10 place-items-center rounded-xl", TILE_STYLES_ON_WHITE[index % TILE_STYLES_ON_WHITE.length])}>
        <card.icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.25} />
      </span>
      <h3 className="mt-5 font-sans text-base font-bold leading-snug text-[#111111]">{card.title}</h3>
      <p className="mt-2 font-sans text-sm leading-relaxed text-gray-600">{card.body}</p>
    </li>
  );
}

/** Payroll: a run from pay structure to payout, numbered across the page. */
function Steps({ section }: { section: CapabilitiesSection }) {
  const { cards } = section;
  return (
    <>
      <Heading section={section} align="center" />
      <ol className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <li key={card.title} className="flex flex-col">
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary font-sans text-sm font-bold text-white">
                {index + 1}
              </span>
              {/* Joins this step to the next one on wide screens. */}
              {index < cards.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 bg-gray-200 xl:-mr-6 xl:block" />}
            </div>
            <div className={cn("mt-6 flex flex-1 flex-col rounded-3xl p-7", CARD_TINT)}>
              <card.icon aria-hidden="true" className="h-5 w-5 text-primary" strokeWidth={2.25} />
              <h3 className="mt-5 font-sans text-lg font-bold leading-snug tracking-[-0.01em] text-[#111111]">{card.title}</h3>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-gray-600">{card.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

/** Statutory compliance: who pays each deduction and where it goes, then the cards. */
function Authorities({ section, rows }: { section: CapabilitiesSection; rows: AuthorityRow[] }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Heading section={section} align="left" />
      </div>
      <div>
        <div className="overflow-hidden rounded-3xl border border-gray-200">
          {/* Below md each row becomes a stacked block with its own labels; the header stays for screen readers. */}
          <table className="w-full text-left font-sans">
            <caption className="sr-only">Statutory deductions: who pays each one and where it is paid</caption>
            <thead className={cn(DARK_BG, "text-white max-md:sr-only")}>
              <tr>
                {["Deduction", "Who pays", "Paid to"].map((label) => (
                  <th key={label} scope="col" className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.14em]">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row) => (
                <tr key={row.deduction} className="align-top max-md:block max-md:px-6 max-md:py-5">
                  <th scope="row" className="px-6 py-5 max-md:block max-md:p-0">
                    <span className="inline-flex rounded-full bg-brand-mint px-3 py-1 text-sm font-bold text-primary">
                      {row.deduction}
                    </span>
                  </th>
                  <td className="px-6 py-5 text-sm leading-relaxed text-gray-700 max-md:mt-4 max-md:block max-md:p-0">
                    <span aria-hidden="true" className="mb-1 block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500 md:hidden">
                      Who pays
                    </span>
                    {row.payer}
                  </td>
                  <td className="px-6 py-5 text-sm font-medium leading-relaxed text-[#111111] max-md:mt-3 max-md:block max-md:p-0">
                    <span aria-hidden="true" className="mb-1 block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500 md:hidden">
                      Paid to
                    </span>
                    {row.paidTo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {section.cards.map((card, index) => (
            <CompactCard key={card.title} card={card} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Contractor payments: Naira and USDC side by side, then the cards. */
function ComparisonPanels({ section, comparison }: { section: CapabilitiesSection; comparison: Comparison }) {
  return (
    <>
      <Heading section={section} align="center" />
      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        {comparison.columns.map((column, columnIndex) => {
          const dark = columnIndex === 1;
          return (
            <div key={column.label} className={cn("rounded-3xl p-8 md:p-10", dark ? `${DARK_BG} text-white` : CARD_TINT)}>
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-2xl",
                    dark ? `bg-white/10 ${ON_DARK_ACCENT}` : "bg-white text-primary",
                  )}
                >
                  <column.icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <h3 className={cn("font-sans text-3xl font-black tracking-[-0.03em]", dark ? "text-white" : "text-[#111111]")}>
                  {column.label}
                </h3>
              </div>
              <dl className={cn("mt-8 divide-y border-t", dark ? "divide-white/10 border-white/10" : "divide-gray-200 border-gray-200")}>
                {comparison.rows.map((row) => (
                  <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                    <dt className={cn("font-sans text-[11px] font-bold uppercase tracking-[0.14em] sm:pt-1", dark ? "text-white/50" : "text-gray-500")}>
                      {row.label}
                    </dt>
                    <dd className={cn("font-sans text-[15px] leading-relaxed", dark ? "text-white/85" : "text-[#111111]")}>
                      {row.values[columnIndex]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {section.cards.map((card, index) => (
          <CompactCard key={card.title} card={card} index={index} />
        ))}
      </ul>
    </>
  );
}

/** Expense management: the first card large, the last one wide and dark, the rest small. */
function Bento({ section }: { section: CapabilitiesSection }) {
  const { cards } = section;
  const lastIndex = cards.length - 1;
  return (
    <>
      <Heading section={section} align="center" />
      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {cards.map((card, index) => {
          if (index === 0) {
            return (
              <li key={card.title} className="flex flex-col justify-between rounded-3xl bg-brand-mint p-8 md:col-span-2 md:row-span-2 md:p-12">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-primary">
                  <card.icon aria-hidden="true" className="h-6 w-6" strokeWidth={2.25} />
                </span>
                <div className="mt-14">
                  <h3 className="font-sans text-2xl font-black leading-tight tracking-[-0.03em] text-[#111111] md:text-4xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-gray-700 md:text-lg">{card.body}</p>
                </div>
              </li>
            );
          }
          if (index === lastIndex && cards.length > 3) {
            return (
              <li
                key={card.title}
                className={cn(DARK_BG, "rounded-3xl p-8 text-white md:col-span-3 md:flex md:items-center md:gap-10 md:p-10")}
              >
                <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10", ON_DARK_ACCENT)}>
                  <card.icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <h3 className="mt-6 font-sans text-xl font-bold leading-snug tracking-[-0.01em] md:mt-0 md:w-72 md:shrink-0">
                  {card.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-white/70 md:mt-0">{card.body}</p>
              </li>
            );
          }
          return (
            <li key={card.title} className={cn("flex flex-col rounded-3xl p-8", CARD_TINT)}>
              <span className={cn("grid h-12 w-12 place-items-center rounded-2xl", TILE_STYLES[index % TILE_STYLES.length])}>
                <card.icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <h3 className="mt-8 font-sans text-xl font-bold leading-snug tracking-[-0.01em] text-[#111111]">{card.title}</h3>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-gray-600">{card.body}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/** Vendor payments: the checks before a payment, as a numbered vertical list beside the heading. */
function Checklist({ section }: { section: CapabilitiesSection }) {
  const { cards } = section;
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Heading section={section} align="left" />
      </div>
      <ol>
        {cards.map((card, index) => (
          <li key={card.title} className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-white">
                <card.icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} />
              </span>
              {index < cards.length - 1 && <span aria-hidden="true" className="mt-3 w-px flex-1 bg-gray-200" />}
            </div>
            <div className={index < cards.length - 1 ? "pb-12" : undefined}>
              <p className={cn(STEP_LABEL, "pt-1")}>{stepNumber(index)}</p>
              <h3 className="mt-1 font-sans text-xl font-bold leading-snug tracking-[-0.02em] text-[#111111] md:text-2xl">
                {card.title}
              </h3>
              <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-gray-600">{card.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Asset management: a timeline from purchase to disposal, alternating sides on wide screens. */
function Lifecycle({ section }: { section: CapabilitiesSection }) {
  return (
    <>
      <Heading section={section} align="center" />
      <ol className="relative mx-auto mt-16 max-w-5xl">
        <span aria-hidden="true" className="absolute bottom-10 left-6 top-10 w-px bg-gray-200 md:left-1/2" />
        {section.cards.map((card, index) => (
          // From md the stages alternate sides and each one starts beside the previous one, not below it.
          <li
            key={card.title}
            className={cn(
              "relative pb-8 pl-20 last:pb-0 md:grid md:grid-cols-2 md:gap-24 md:pb-0 md:pl-0",
              index > 0 && "md:-mt-16",
            )}
          >
            <span
              className={cn(
                DARK_BG,
                "absolute left-0 top-7 grid h-12 w-12 place-items-center rounded-full border-4 border-white text-white md:left-1/2 md:-translate-x-1/2",
              )}
            >
              <card.icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.25} />
            </span>
            <div className={cn("rounded-3xl p-8", CARD_TINT, index % 2 === 1 ? "md:col-start-2" : "md:col-start-1")}>
              <p className={STEP_LABEL}>Stage {stepNumber(index)}</p>
              <h3 className="mt-2 font-sans text-xl font-bold leading-snug tracking-[-0.01em] text-[#111111]">{card.title}</h3>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-gray-600">{card.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

/** The capabilities section, laid out as the page's `capabilities.layout` asks. */
export default function FeatureCapabilities({ section }: { section: CapabilitiesSection }) {
  let body;
  switch (section.layout) {
    case "steps":
      body = <Steps section={section} />;
      break;
    case "authorities":
      body = <Authorities section={section} rows={section.authorities} />;
      break;
    case "comparison":
      body = <ComparisonPanels section={section} comparison={section.comparison} />;
      break;
    case "bento":
      body = <Bento section={section} />;
      break;
    case "checklist":
      body = <Checklist section={section} />;
      break;
    case "lifecycle":
      body = <Lifecycle section={section} />;
      break;
  }

  return (
    <section aria-labelledby="capabilities-heading" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">{body}</div>
    </section>
  );
}
