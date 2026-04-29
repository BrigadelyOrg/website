import React from "react";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const phases = [
  {
    day: "Day 1",
    title: "Connect your team",
    description:
      "Import your existing employee and contractor data, configure your org structure, and set up approval workflows.",
    features: [
      "Import employee records",
      "Set up departments & roles",
      "Configure approval chains",
      "Connect your bank accounts",
    ],
  },
  {
    day: "Day 7",
    title: "Run your first payroll",
    description:
      "Process your first compliant payroll run with correct deductions, local taxes, and multi-currency payments handled automatically.",
    features: [
      "Multi-currency payroll run",
      "Automated tax deductions",
      "Contractor payment processing",
      "Payslip generation & delivery",
    ],
    highlight: true,
  },
  {
    day: "Day 30",
    title: "Full operations, zero friction",
    description:
      "Manage benefits, track expenses, stay compliant across every country, and get unified workforce analytics in one place.",
    features: [
      "Benefits & expense management",
      "Cross-border compliance",
      "Unified workforce analytics",
      "HR reporting & audit trails",
    ],
  },
];

const OnboardingTimeline = () => {
  return (
    <section className="bg-white py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="uppercase text-xs tracking-widest text-[#007a3d] font-semibold mb-3">
            Getting started
          </p>
          <h2 className="text-3xl md:text-5xl text-gray-900 mb-4">
            From setup to full operations{" "}
            <em className="text-[#007a3d]">in 30 days</em>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Most teams are fully operational on Brigadely within a month,
            without disrupting existing workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {phases.map((phase, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 flex flex-col gap-5 ${
                phase.highlight
                  ? "bg-[#007a3d] text-white shadow-xl scale-[1.02]"
                  : "bg-gray-50 text-gray-900 border border-gray-100"
              }`}
            >
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    phase.highlight
                      ? "bg-white/20 text-white"
                      : "bg-[#e0f3ec] text-[#007a3d]"
                  }`}
                >
                  {phase.day}
                </span>
              </div>

              <div>
                <h3
                  className={`text-xl mb-2 ${
                    phase.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {phase.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    phase.highlight ? "text-green-100" : "text-gray-500"
                  }`}
                >
                  {phase.description}
                </p>
              </div>

              <ul className="space-y-2 flex-1">
                {phase.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        phase.highlight ? "bg-green-300" : "bg-[#007a3d]"
                      }`}
                    />
                    <span
                      className={
                        phase.highlight ? "text-green-50" : "text-gray-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="https://forms.gle/MZjpMyXYd9fR9Sx4A" target="_blank">
                <button
                  className={`w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition duration-200 ${
                    phase.highlight
                      ? "bg-white text-[#007a3d] hover:bg-green-50"
                      : "border border-[#007a3d] text-[#007a3d] hover:bg-[#007a3d] hover:text-white"
                  }`}
                >
                  Get started <GoArrowUpRight size={14} />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingTimeline;
