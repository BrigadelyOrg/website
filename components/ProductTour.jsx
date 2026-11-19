"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FEATURE_NAV } from "@/content/navigation";

const GREEN = "#007a3d";
const GREEN_TINT = "#e0f3ec";
const BONE = "#F4EFE4";

/* ── Geometric chip primitives ───────────────────────────────────── */

const CircleChip = () => (
  <div
    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
    style={{ backgroundColor: GREEN_TINT }}
  >
    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: GREEN }} />
  </div>
);

const SquareChip = () => (
  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
    <div className="rounded-sm bg-gray-900" style={{ width: "1.1rem", height: "1.1rem" }} />
  </div>
);

const DiamondChip = () => (
  <div
    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
    style={{ backgroundColor: BONE }}
  >
    <div
      className="w-4 h-4 rounded-sm"
      style={{ backgroundColor: GREEN, transform: "rotate(45deg)" }}
    />
  </div>
);

/* ── Platform module grid ─────────────────────────────────────────── */

// `feature`: the module's page (content/navigation.ts). Cards without one aren't linked.

const platformModules = [
  {
    Chip: CircleChip,
    title: "Payroll",
    feature: "payroll",
    body: "Run payroll for your entire workforce - full-time staff and contractors - on every cycle, with gross-to-net calculations handled automatically.",
  },
  {
    Chip: SquareChip,
    title: "Statutory compliance",
    feature: "statutory-compliance",
    body: "Every statutory obligation your jurisdiction requires: calculated on each payroll run, remitted to the right authority, and filed on time - with a full audit trail.",
  },
  {
    Chip: DiamondChip,
    title: "People & benefits",
    body: "Employee records, onboarding, leave management, and benefits enrolment - in the same system as payroll, so HR and finance share the same data.",
  },
  {
    Chip: CircleChip,
    title: "Expense management",
    feature: "expense-management",
    body: "Capture expenses, route approvals, enforce policy limits, and reimburse employees - without leaving the ledger.",
  },
  {
    Chip: SquareChip,
    title: "Vendor & supplier payments",
    feature: "vendor-payments",
    body: "Pay suppliers and service providers directly from the ledger. Every outgoing payment is linked to its invoice, cost code, and withholding classification.",
  },
  {
    Chip: DiamondChip,
    title: "Asset management",
    feature: "asset-management",
    body: "Track company assets, record depreciation, manage assignments, and maintain a permanent disposal log - all tied to the same ledger.",
  },
  {
    Chip: CircleChip,
    title: "Contractor & USDC payouts",
    feature: "contractor-payments",
    body: "Pay contractors, remote hires, and diaspora employees in USDC - settled instantly, at near-zero cost, without a correspondent banking chain. Proof that the ledger operates beyond a single currency.",
  },
  {
    Chip: SquareChip,
    title: "Support",
    body: "Dedicated support for payroll, compliance, and payment questions - from a team that understands how African businesses actually operate.",
  },
];



/* ── Component ──────────────────────────────────────────────────── */

const ProductTour = () => {
  
  return (
    <section id="product" className="bg-white py-24 px-4">
      <div className="container mx-auto">

        {/* Eyebrow */}
        <p
          className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase mb-6"
          style={{ color: GREEN }}
        >
          Platform
        </p>

        {/* Section headline */}
        <h2
          className="text-4xl md:text-4xl text-[#111111] mb-6 max-w-3xl"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 900,
            lineHeight: 0.93,
            letterSpacing: "-0.025em",
          }}
        >
          A single operating layer<br className="hidden md:block" /> for every outgoing{" "}
          <span style={{ color: GREEN }}>payment</span>
        </h2>

        {/* Connective paragraph */}
        <p className="font-sans text-base text-gray-500 leading-relaxed max-w-xl mb-16">
          Brigadely is one record of everyone and everything you pay - staff, contractors,
          vendors, and every statutory obligation. One place it actually happens: the money
          moves, the remittances file, and the audit trail writes itself.
        </p>

        {/* Platform module grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {platformModules.map((m, i) => {
            const feature = m.feature ? FEATURE_NAV[m.feature] : null;
            return (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                <m.Chip />
                <div>
                  <h3
                    className="text-sm text-[#111111] mb-1.5"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 700 }}
                  >
                    {m.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">{m.body}</p>
                </div>
                {feature && (
                  // The ::after overlay stretches the link over the whole card.
                  <Link
                    href={feature.href}
                    className="mt-auto font-sans text-xs font-semibold text-[#007a3d] hover:text-[#005a2d] after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#007a3d]"
                  >
                    Explore {feature.name} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductTour;
