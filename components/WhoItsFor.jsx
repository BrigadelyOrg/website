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
const PHONE_BLK  = "#0E0E0C";
const SCREEN_BG  = "#FAF9F6";
const BORDER     = "#EFEFEA";
const PILL_EDGE  = "#DEDAD4";

/* ── Personas ─────────────────────────────────────────────────────── */
const personas = [
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
    src: "/img/who-phone-cfo.svg",
    alt: "Finance overview screen showing disbursed total, statutory deductions, and recent activity",
  },
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
    src: "/img/who-phone-founder.svg",
    alt: "Payroll run screen with five statutory deductions auto-calculated and ready",
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
    src: "/img/who-phone-finance.svg",
    alt: "Statutory ledger showing PAYE, Pension, NHF, NSITF, ITF with filed status and books reconciled",
  },
  {
    pill:      "Multi-state",
    chipLabel: "Multi-state employers",
    headline:  "Every state, filed right.",
    copy:      "Brigadely routes each employee's PAYE to the correct State IRS automatically, across all 36 states and the FCT. No manual routing, no missed filings.",
    benefits:  [
      "PAYE filed to the correct state authority per employee",
      "All 36 states and the FCT supported",
      "Per-state filing status in one view",
    ],
    src: "/img/who-phone-multistate.svg",
    alt: "PAYE routing screen listing state IRS authorities with employee counts and filing status",
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
    src: "/img/who-phone-accountant.svg",
    alt: "Multi-client dashboard showing companies with per-client filing status and next deadlines",
  },
  {
    pill:      "Multi-entity",
    chipLabel: "Multi-entity groups",
    headline:  "Every entity, rolled up.",
    copy:      "Run payroll across subsidiaries and related companies from a single account. See a consolidated view of compliance and a unified payment ledger across all entities.",
    benefits:  [
      "Per-entity payroll totals in one view",
      "Consolidated statutory compliance roll-up",
      "Unified ledger across all subsidiaries",
    ],
    src: "/img/who-phone-entity.svg",
    alt: "Entity overview showing subsidiaries with per-entity payroll totals and a group compliance roll-up",
  },
];

/* ── Status bar icons ─────────────────────────────────────────────── */
const SignalIcon = () => (
  <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
    <rect x="0"  y="6"   width="3" height="4"   rx="0.8" fill={NEAR_BLACK}/>
    <rect x="5"  y="3.5" width="3" height="6.5" rx="0.8" fill={NEAR_BLACK}/>
    <rect x="10" y="1"   width="3" height="9"   rx="0.8" fill={NEAR_BLACK}/>
  </svg>
);

const WifiIcon = () => (
  <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
    <circle cx="7.5" cy="10" r="1.5" fill={NEAR_BLACK}/>
    <path d="M3.8 6.6C5 5.4 6.2 4.8 7.5 4.8s2.5.6 3.7 1.8"
          stroke={NEAR_BLACK} strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M1.2 3.8C3 1.6 5.1.8 7.5.8s4.5.8 6.3 3"
          stroke={NEAR_BLACK} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const BatteryIcon = () => (
  <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
    <rect x="0" y="1" width="19" height="9" rx="2.5" stroke={NEAR_BLACK} strokeWidth="1.3"/>
    <rect x="1.5" y="2.5" width="14" height="6" rx="1.5" fill={NEAR_BLACK}/>
    <path d="M20.5 3.5v4" stroke={NEAR_BLACK} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

/* ── Tab bar icons ────────────────────────────────────────────────── */
const HomeIcon   = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
       stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8l8-6 8 6v10a1 1 0 01-1 1H3a1 1 0 01-1-1z"/>
    <path d="M7 19v-8h6v8"/>
  </svg>
);
const LedgerIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
       stroke={color} strokeWidth="1.4" strokeLinecap="round">
    <rect x="4" y="2" width="12" height="16" rx="1.5"/>
    <line x1="7" y1="7"    x2="13" y2="7"/>
    <line x1="7" y1="10.5" x2="13" y2="10.5"/>
    <line x1="7" y1="14"   x2="10" y2="14"/>
  </svg>
);
const PeopleIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
       stroke={color} strokeWidth="1.4" strokeLinecap="round">
    <circle cx="10" cy="7" r="3.5"/>
    <path d="M3 18c0-3.9 3.1-7 7-7s7 3.1 7 7"/>
  </svg>
);
const MoreIcon   = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="5"  cy="10" r="1.5" fill={color}/>
    <circle cx="10" cy="10" r="1.5" fill={color}/>
    <circle cx="15" cy="10" r="1.5" fill={color}/>
  </svg>
);

const TAB_ICONS = [
  { Icon: HomeIcon,   label: "Home"   },
  { Icon: LedgerIcon, label: "Ledger" },
  { Icon: PeopleIcon, label: "People" },
  { Icon: MoreIcon,   label: "More"   },
];

/* ── Phone frame ──────────────────────────────────────────────────── */
const PhoneFrame = ({ src, alt }) => (
  <div
    className="relative mx-auto flex-shrink-0 select-none"
    style={{
      width: 300, height: 600,
      backgroundColor: PHONE_BLK,
      borderRadius: 48,
      padding: 12,
    }}
  >
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: SCREEN_BG, borderRadius: 38 }}
    >
      {/* Dynamic island */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: 10, width: 108, height: 30,
          backgroundColor: PHONE_BLK,
          borderRadius: 16, zIndex: 10,
        }}
      />
      {/* Status bar */}
      <div
        className="absolute left-0 right-0 flex justify-between items-center px-5"
        style={{ top: 10, height: 30, zIndex: 5 }}
      >
        <span style={{
          fontSize: 11, fontWeight: 600,
          fontFamily: "sans-serif", color: NEAR_BLACK,
        }}>
          9:41
        </span>
        <div className="flex items-center gap-1.5">
          <SignalIcon/>
          <WifiIcon/>
          <BatteryIcon/>
        </div>
      </div>
      {/* Screen content — SVG image fills content area */}
      <div className="absolute" style={{ top: 52, left: 0, right: 0, bottom: 60 }}>
        <Image
          src={src}
          alt={alt}
          width={276}
          height={464}
          className="w-full h-full"
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
      {/* Tab bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-around px-3 pb-2"
        style={{ height: 60, backgroundColor: "white", borderTop: `1px solid ${BORDER}` }}
      >
        {TAB_ICONS.map(({ Icon, label }, i) => {
          const active = i === 0;
          const color  = active ? GREEN_DARK : "#C0BDB8";
          return (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon color={color}/>
              <span style={{ fontSize: 9, color, fontFamily: "sans-serif", fontWeight: active ? 600 : 400 }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

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

          {/* Phone frame */}
          <div className="w-full lg:w-auto order-2 flex justify-center lg:justify-end">
            <PhoneFrame src={p.src} alt={p.alt}/>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhoItsFor;
