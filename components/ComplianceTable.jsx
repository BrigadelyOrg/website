import React from "react";

const GREEN = "#007a3d";
const BONE = "#F4EFE4";

const rows = [
  {
    deduction: "PAYE",
    full: "Pay As You Earn",
    authority: "State IRS / FIRS",
    scope: "All employees",
    status: "Coming soon",
  },
  {
    deduction: "Pension",
    full: "PenCom Contribution",
    authority: "PenCom-approved PFAs",
    scope: "Employer/Employees contributions",
    status: "Coming soon",
  },
  {
    deduction: "NHF",
    full: "National Housing Fund",
    authority: "FMBN",
    scope: "Private sector employees",
    status: "Coming soon",
  },
  {
    deduction: "NSITF",
    full: "National Social Insurance",
    authority: "NSITF",
    scope: "-",
    status: "Coming soon",
  },
  {
    deduction: "ITF",
    full: "Industrial Training Fund",
    authority: "Industrial Training Fund",
    scope: "-",
    status: "Coming soon",
  },
];

const StatusBadge = ({ status }) => {
  if (status === "Live") {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
        style={{ backgroundColor: "#e0f3ec", color: GREEN }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GREEN }} />
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
      Roadmap
    </span>
  );
};

const ComplianceTable = () => {
  return (
    <section id="compliance" className="bg-white py-24 px-4">
      <div className="container mx-auto">

        {/* Eyebrow */}
        <p
          className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase mb-6"
          style={{ color: GREEN }}
        >
          Compliance
        </p>

        {/* Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <h2
            className="text-4xl md:text-4xl text-[#111111] max-w-2xl"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 900,
              lineHeight: 0.93,
              letterSpacing: "-0.025em",
            }}
          >
            Every statutory deduction, on one{" "}
            <span style={{ color: GREEN }}>platform.</span>
          </h2>
          <p className="font-sans text-base text-gray-500 leading-relaxed max-w-xs">
            Stay compliant with Brigadely.
          </p>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="col-span-2 font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">
              Deduction
            </div>
            <div className="col-span-4 font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">
              Authority
            </div>
            <div className="col-span-4 font-sans text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:block">
              Applies to
            </div>
            <div className="col-span-2 font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">
              Status
            </div>
          </div>

          {/* Table rows */}
          {rows.map((row, i) => (
            <div
              key={row.deduction}
              className={`grid grid-cols-12 gap-4 px-6 py-5 items-center ${
                i < rows.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="col-span-2">
                <span
                  className="font-sans text-sm font-black text-[#111111]"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {row.deduction}
                </span>
                <div className="font-sans text-[10px] text-gray-400 mt-0.5">{row.full}</div>
              </div>
              <div className="col-span-4 font-sans text-sm text-gray-700">{row.authority}</div>
              <div className="col-span-4 font-sans text-sm text-gray-500 hidden md:block">{row.scope}</div>
              <div className="col-span-2">
                <StatusBadge status={row.status} />
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="font-sans text-xs text-gray-400 mt-5">
          Payroll disbursed in NGN.
        </p>

      </div>
    </section>
  );
};

export default ComplianceTable;
