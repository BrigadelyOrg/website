import React from "react";
import { Clock } from "lucide-react";

const features = [
  {
    acronym: "PAYE",
    name: "Pay As You Earn",
    description:
      "Automatic income tax calculation across all Nigerian state jurisdictions, filed directly with FIRS on every payroll run.",
    icon: "🏛️",
  },
  {
    acronym: "PENCOM",
    name: "Pension Contributions",
    description:
      "Employer (10%) and employee (8%) pension contributions calculated and remitted to approved Pension Fund Administrators automatically.",
    icon: "🏦",
  },
  {
    acronym: "NHF",
    name: "National Housing Fund",
    description:
      "National Housing Fund deductions computed and remitted to the Federal Mortgage Bank of Nigeria without any manual work.",
    icon: "🏠",
  },
  {
    acronym: "NSITF",
    name: "Social Insurance",
    description:
      "Nigeria Social Insurance Trust Fund premiums and ITF levies calculated and filed so your business stays fully protected.",
    icon: "🛡️",
  },
];

const ComingSoon = () => {
  return (
    <section className="bg-[#0a0a0a] py-24 px-4 relative overflow-hidden">

      {/* Subtle green glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,122,61,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 font-sans uppercase tracking-widest">
            <Clock size={12} />
            Coming Soon
          </div>
          <h2 className="text-3xl md:text-5xl text-white mb-4">
            Full statutory compliance,{" "}
            <em className="text-[#4ade80]">on its way</em>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base font-sans leading-relaxed">
            We are actively building automated Nigerian compliance into every
            payroll run. Here is what is coming — and we are moving fast.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {features.map((f) => (
            <div
              key={f.acronym}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:border-[#007a3d]/60 hover:bg-white/[0.07] transition-all duration-200"
            >
              {/* Coming soon badge */}
              <span className="absolute top-4 right-4 text-[10px] font-bold font-sans uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                Soon
              </span>

              {/* Icon */}
              <div className="text-3xl">{f.icon}</div>

              {/* Acronym + name */}
              <div>
                <p className="text-[#4ade80] text-xs font-bold font-sans uppercase tracking-widest mb-1">
                  {f.acronym}
                </p>
                <h3 className="text-white text-base font-semibold leading-snug">
                  {f.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed font-sans flex-1">
                {f.description}
              </p>

              {/* Progress indicator */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-sans">
                  <span className="text-gray-500 uppercase tracking-wider">In development</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-[#007a3d] to-[#4ade80] rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-500 text-sm font-sans mt-10">
          Join the waitlist to get early access when these features launch.
        </p>

      </div>
    </section>
  );
};

export default ComingSoon;
