import React from "react";

const metrics = [
  {
    value: "80%",
    label: "Reduction in payroll processing time",
    detail:
      "Teams report closing payroll in hours, not days, with zero manual reconciliation.",
  },
  {
    value: "100%",
    label: "Compliance built in from day one",
    detail:
      "PAYE, PENCOM, NHF, NSITF, and ITF contributions calculated and filed automatically.",
  },
  {
    value: "3×",
    label: "Faster contractor onboarding",
    detail:
      "Onboard contractors across multiple countries in days, not weeks of legal back-and-forth.",
  },
  {
    value: "99.9%",
    label: "Uptime & compliance accuracy",
    detail:
      "Enterprise-grade reliability with SOC2, GDPR, and ISO 27001 certification.",
  },
];

const ROISection = () => {
  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <p className="uppercase text-xs tracking-widest text-[#007a3d] font-semibold mb-3">
            Built for results
          </p>
          <h2 className="text-3xl md:text-5xl text-gray-900 mb-4">
            The numbers <em className="text-[#007a3d]">speak for themselves</em>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Teams using Brigadely don&apos;t just save time. They build more
            compliant, scalable, and resilient people operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-md hover:border-[#007a3d] transition-all duration-200"
            >
              <p className="text-5xl font-bold text-[#007a3d] mb-2 font-sans">
                {metric.value}
              </p>
              <p className="text-sm font-semibold text-gray-800 mb-3 leading-snug">
                {metric.label}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ROISection;
