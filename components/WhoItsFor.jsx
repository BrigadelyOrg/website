"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";


/* ── Brand tokens ─────────────────────────────────────────────────── */
const BONE       = "#F2EDE4";
const NEAR_BLACK = "#16160F";
const MUTED      = "#737065";
const GREEN_DARK = "#0B5E34";
const GREEN_MID  = "#1A8D49";
const GREEN_MINT = "#DCEFE0";
const PILL_EDGE  = "#DEDAD4";

/* ── Personas ─────────────────────────────────────────────────────── */
const personas = [
  {
    pill:      "Founders",
    chipLabel: "Founders & business owners",
    headline:  "Payroll, without a finance team.",
    copy:      "Run payroll, remit PAYE to the right state IRS, and pay contractors without a dedicated finance function. Brigadely handles the compliance so you can focus on growth.",
    benefits:  [
      "Run payroll in under ten minutes",
      "PAYE, Pension, NHF, NSITF, ITF filed on every run",
      "No compliance consultants or spreadsheets",
    ],
    src: "/img/payment.png",
    alt: "Payroll run screen with five statutory deductions auto-calculated and ready",
  },
  {
    pill:      "CFOs",
    chipLabel: "CFOs & finance leads",
    headline:  "Every Kobo, accounted for.",
    copy:      "Own the full picture: every payment leaving the business - staff, vendors, and statutory obligations reconciled to the last kobo and auditable from one dashboard.",
    benefits:  [
      "All outgoing payments on one ledger",
      "Reconciliation status by pay period",
      "Audit trail for every statutory filing",
    ],
    src: "/img/account.png",
    alt: "Finance overview screen showing disbursed total, statutory deductions, and recent activity",
  },
  
  {
    pill:      "Finance teams",
    chipLabel: "Finance & accounting teams",
    headline:  "Close your books faster.",
    copy:      "A full statutory deduction ledger, automatic reconciliation, and clean audit trails across every pay period — so month-end close is never a scramble.",
    benefits:  [
      "Deduction ledger exportable by pay period",
      "Reconciliation status per statutory obligation",
      "Audit-ready records for every filing",
    ],
    src: "/img/multi-image.png",
    alt: "Statutory ledger showing PAYE, Pension, NHF, NSITF, ITF with filed status and books reconciled",
  },
  {
    pill:      "Accountants",
    chipLabel: "Accountants & advisory firms",
    headline:  "Every client, one dashboard.",
    copy:      "Manage payroll and compliance for multiple clients from one login. Per-client filing calendars, remittance records, and deadline alerts keep every account in order.",
    benefits:  [
      "Per-client statutory filing calendars",
      "Remittance records ready to export per client",
      "Deadline alerts so nothing slips",
    ],
    src: "/img/account.png",
    alt: "Multi-client dashboard showing companies with per-client filing status and next deadlines",
  },
];


/* ── Check icon ───────────────────────────────────────────────────── */
const Check = () => (
  <span
    className="inline-flex flex-shrink-0 items-center justify-center rounded-full mt-0.5"
    style={{ width: 20, height: 20, backgroundColor: GREEN_MINT }}
  >
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4l2.5 2.5L9 1"
            stroke={GREEN_DARK} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
);

/* ── Arrow button ─────────────────────────────────────────────────── */
const ArrowBtn = ({ onClick, label, children }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-gray-50"
    style={{ border: `1px solid ${PILL_EDGE}`, backgroundColor: "white", color: NEAR_BLACK }}
  >
    {children}
  </button>
);

/* ── Component ────────────────────────────────────────────────────── */
const WhoItsFor = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total      = personas.length;
  const p          = personas[active];
  const timerRef   = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    if (!paused) startTimer();
    else if (timerRef.current) clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [paused, startTimer]);

  const pick = (i) => { setActive(i); startTimer(); };
  const prev = () => { setActive((a) => (a - 1 + total) % total); startTimer(); };
  const next = () => { setActive((a) => (a + 1) % total); startTimer(); };

  return (
    <section id="who" style={{ backgroundColor: BONE }} className="py-24 px-4">
      <div className="container mx-auto">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p
              className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase mb-5"
              style={{ color: GREEN_MID }}
            >
              Who it's for
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-4xl max-w-xl"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 900,
                lineHeight: 0.93,
                letterSpacing: "-0.025em",
                color: NEAR_BLACK,
              }}
            >
              Built for everyone in{" "}
              <span style={{ color: GREEN_MID }}>mind.</span>
            </h2>
          </div>
        </div>

        {/* ── Pills + arrows ── */}
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {personas.map((pa, i) => (
              <button
                key={i}
                onClick={() => pick(i)}
                className="px-4 py-2 rounded-full text-sm font-sans font-semibold transition-all duration-150 cursor-pointer"
                style={{
                  backgroundColor: i === active ? GREEN_DARK : "white",
                  color:           i === active ? "white"     : NEAR_BLACK,
                  border:          `1px solid ${i === active ? GREEN_DARK : PILL_EDGE}`,
                }}
              >
                {pa.pill}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ArrowBtn onClick={prev} label="Previous persona">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ArrowBtn>
            <ArrowBtn onClick={next} label="Next persona">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ArrowBtn>
          </div>
        </div>

        {/* ── Two-column panel ── */}
        <div
          className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* Text block */}
          <div className="w-full lg:flex-1 order-1">
            {/* Persona chip */}
            <div
              className="inline-block px-3 py-1.5 rounded-full text-xs font-sans font-semibold mb-6"
              style={{ backgroundColor: GREEN_MINT, color: GREEN_DARK }}
            >
              {p.chipLabel}
            </div>

            <h3
              className="text-2xl md:text-3xl lg:text-4xl mb-5"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: NEAR_BLACK,
              }}
            >
              {p.headline}
            </h3>

            <p className="font-sans text-base leading-relaxed mb-8" style={{ color: MUTED }}>
              {p.copy}
            </p>

            <ul className="space-y-4">
              {p.benefits.map((b, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 font-sans text-sm leading-relaxed"
                  style={{ color: NEAR_BLACK }}
                >
                  <Check/>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Product screenshot */}
          <div className="w-full lg:w-auto order-2 flex justify-center lg:justify-end">
            <Image
              src={p.src}
              alt={p.alt}
              width={420}
              height={560}
              className="rounded-2xl object-cover object-top w-full max-w-sm lg:max-w-md h-auto"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhoItsFor;
