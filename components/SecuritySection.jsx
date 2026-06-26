import React from "react";
import Image from "next/image";

const GREEN = "#007a3d";
const GREEN_TINT = "#e0f3ec";
const BONE = "#F4EFE4";

const proofPoints = [
  {
    title: "Data encrypted in transit and at rest.",
    body: "All payroll and employee data is encrypted using AES-256. No data is transmitted without TLS. Backups are encrypted and geographically distributed.",
  },
  {
    title: "Role-based access, down to the action.",
    body: "Define exactly who can view, approve, or run payroll. Finance leads, HR admins, and employees each see only what they need. Access logs are retained for audit.",
  },
  {
    title: "[VERIFY: SOC 2 Type II] security audits.",
    body: "Brigadely undergoes regular third-party security audits. [VERIFY: SOC 2 Type II certification status and audit schedule]",
  },
];

const SecuritySection = () => {
  return (
    <section style={{ backgroundColor: BONE }} className="py-24 px-4">
      <div className="container mx-auto">

        {/* Eyebrow */}
        <p
          className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase mb-6"
          style={{ color: GREEN }}
        >
          Security
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: headline + proof points */}
          <div>
            <h2
              className="text-4xl md:text-5xl text-[#111111] mb-10"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 900,
                lineHeight: 0.93,
                letterSpacing: "-0.025em",
              }}
            >
              Enterprise-grade<br /> security, by{" "}
              <span style={{ color: GREEN }}>default.</span>
            </h2>

            <div className="space-y-7">
              {proofPoints.map((p, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: GREEN_TINT }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: GREEN }} />
                  </div>
                  <div>
                    <p
                      className="font-sans text-sm font-semibold text-[#111111] mb-1"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {p.title}
                    </p>
                    <p className="font-sans text-sm text-gray-500 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100">
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                [VERIFY: NDPR compliance status] · [VERIFY: ISO 27001 certification] ·
                Data hosted in [VERIFY: data center location]
              </p>
            </div>
          </div>

          {/* Right: access controls screenshot */}
          <div className="lg:pt-4">
            <Image
              src="/img/mockup-security.svg"
              alt="Brigadely role-based access controls"
              width={680}
              height={380}
              className="rounded-xl border border-gray-200 shadow-lg w-full h-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
