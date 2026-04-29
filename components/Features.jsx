import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

/* ── Inline product UI mockups — no images needed ───────────────── */

const PayrollMockup = () => (
  <div className="rounded-xl overflow-hidden border border-orange-100 bg-white text-xs font-sans shadow-sm">
    <div className="bg-orange-50 px-4 py-2.5 flex items-center justify-between border-b border-orange-100">
      <span className="font-semibold text-gray-700">April Payroll Run</span>
      <span className="text-gray-400">248 employees · ₦18.2M</span>
    </div>
    <div className="divide-y divide-gray-50">
      {[
        { name: "Oluwaseun A.", role: "Engineering", amt: "₦450,000", cur: "NGN" },
        { name: "Amaka Eze", role: "Product", amt: "₦380,000", cur: "NGN" },
        { name: "Kofi Mensah", role: "Sales", amt: "$2,800", cur: "USD" },
        { name: "Aisha Kamara", role: "Operations", amt: "GHS 4,200", cur: "GHS" },
      ].map((r) => (
        <div key={r.name} className="px-4 py-2.5 flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[#e0f3ec] text-[#007a3d] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
            {r.name[0]}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-700 leading-none">{r.name}</p>
            <p className="text-gray-400 text-[10px] mt-0.5">{r.role}</p>
          </div>
          <span className="font-semibold text-gray-700">{r.amt}</span>
          <span className="bg-green-50 text-[#007a3d] text-[10px] font-semibold px-1.5 py-0.5 rounded">{r.cur}</span>
        </div>
      ))}
    </div>
    <div className="px-4 py-3 bg-[#007a3d] flex items-center justify-between">
      <span className="text-white font-semibold">Run Payroll · 248 employees</span>
      <span className="text-green-200 text-[10px]">Estimated: ₦18.2M</span>
    </div>
  </div>
);

const HiringMockup = () => (
  <div className="rounded-xl overflow-hidden border border-green-100 bg-white text-xs font-sans shadow-sm">
    <div className="bg-[#d4ebe3] px-4 py-2.5 flex items-center justify-between border-b border-green-100">
      <span className="font-semibold text-gray-700">Active Hires</span>
      <span className="text-[#007a3d] font-semibold">🇳🇬 4 states</span>
    </div>
    <div className="divide-y divide-gray-50">
      {[
        { flag: "🏙️", country: "Lagos", count: 42, pct: 85 },
        { flag: "🏛️", country: "Abuja", count: 28, pct: 60 },
        { flag: "⚓", country: "Port Harcourt", count: 15, pct: 40 },
        { flag: "🌿", country: "Kano", count: 9, pct: 25 },
      ].map((c) => (
        <div key={c.country} className="px-4 py-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 text-gray-700 font-medium">
              <span>{c.flag}</span> {c.country}
            </span>
            <span className="text-gray-500">{c.count} employees</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#007a3d] rounded-full"
              style={{ width: `${c.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
    <div className="px-4 py-2.5 bg-green-50 border-t border-green-100 flex items-center justify-between">
      <span className="text-[#007a3d] font-semibold">+ Onboard new hire</span>
      <span className="text-gray-400">~3 min setup</span>
    </div>
  </div>
);

const BenefitsMockup = () => (
  <div className="rounded-xl overflow-hidden border border-green-100 bg-white text-xs font-sans shadow-sm">
    <div className="bg-[#d4ebe3] px-4 py-2.5 flex items-center justify-between border-b border-green-100">
      <span className="font-semibold text-gray-700">Benefits Overview</span>
      <span className="text-[#007a3d] font-semibold">248 employees</span>
    </div>
    <div className="divide-y divide-gray-50">
      {[
        { name: "Health Insurance", enrolled: 248, total: 248, pct: 100 },
        { name: "Pension Plan", enrolled: 248, total: 248, pct: 100 },
        { name: "Equity / Stock Options", enrolled: 82, total: 248, pct: 33 },
        { name: "Life Insurance", enrolled: 180, total: 248, pct: 73 },
      ].map((b) => (
        <div key={b.name} className="px-4 py-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${b.pct === 100 ? "bg-[#007a3d]" : "bg-gray-300"}`} />
              <span className="text-gray-700 font-medium">{b.name}</span>
            </div>
            <span className="text-gray-500">{b.enrolled}/{b.total}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#007a3d] rounded-full"
              style={{ width: `${b.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
    <div className="px-4 py-2.5 bg-green-50 border-t border-green-100 flex items-center justify-between">
      <span className="text-[#007a3d] font-semibold">Full compliance report →</span>
      <span className="text-gray-400">Updated today</span>
    </div>
  </div>
);

const HRMockup = () => (
  <div className="rounded-xl overflow-hidden border border-orange-100 bg-white text-xs font-sans shadow-sm">
    <div className="bg-orange-50 px-4 py-2.5 flex items-center justify-between border-b border-orange-100">
      <span className="font-semibold text-gray-700">Recent Activity</span>
      <span className="text-[#007a3d] font-semibold">All teams</span>
    </div>
    <div className="divide-y divide-gray-50">
      {[
        { initials: "FK", name: "Folakemi K.", event: "Onboarded", country: "🇳🇬", status: "Complete", green: true },
        { initials: "CO", name: "Chidi Okafor", event: "Promotion", country: "🇬🇭", status: "Complete", green: true },
        { initials: "AM", name: "Amara Mwangi", event: "New Hire", country: "🇰🇪", status: "In Progress", green: false },
        { initials: "FS", name: "Fatima Sow", event: "Offboarding", country: "🇸🇳", status: "Pending", green: false },
      ].map((r) => (
        <div key={r.initials} className="px-4 py-2.5 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#e0f3ec] text-[#007a3d] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
            {r.initials}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-700 leading-none">{r.name}</p>
            <p className="text-gray-400 text-[10px] mt-0.5">{r.event} · {r.country}</p>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            r.green ? "bg-green-50 text-[#007a3d]" : "bg-gray-100 text-gray-500"
          }`}>
            {r.status}
          </span>
        </div>
      ))}
    </div>
    <div className="px-4 py-2.5 bg-orange-50 border-t border-orange-100 flex items-center justify-between">
      <span className="text-gray-600 font-semibold">View all activity →</span>
      <span className="text-gray-400">12 events today</span>
    </div>
  </div>
);

/* ── Feature data ────────────────────────────────────────────────── */

const featureData = [
  {
    title: "Pay anyone, anywhere in minutes",
    description:
      "Forget spreadsheets, manual deductions, and missed filing deadlines. Run compliant Nigerian payroll for your entire workforce, employees and contractors, from one place.",
    tags: ["Brigadely Payroll"],
    bgColor: "#fff9f0",
    Mockup: PayrollMockup,
  },
  {
    title: "Expand your team and hire anywhere",
    description:
      "Onboard employees and contractors compliantly across every location. We handle the paperwork, statutory filings, and compliance so you can focus on building your team.",
    tags: ["Contractor Management", "Employee Management"],
    bgColor: "#d4eba3".replace("a3", "e3"),
    Mockup: HiringMockup,
  },
  {
    title: "Provide teams with Benefits",
    description:
      "Easily offer equitable benefits to all your staff compliantly. Brigadely simplifies benefit reporting and brings your total compensation into one unified report.",
    tags: ["Benefit Management", "Employee Benefits"],
    bgColor: "#d4ebe3",
    Mockup: BenefitsMockup,
  },
  {
    title: "Consolidate your HR operations",
    description:
      "Bring all employee data into a single system. We localize everything from onboarding to holidays based on each team member's location and local labor laws.",
    tags: ["HR Operations"],
    bgColor: "#fff9f0",
    Mockup: HRMockup,
  },
];

const FeatureCard = ({ feature }) => (
  <div
    className="rounded-2xl px-6 py-8 shadow-sm flex flex-col justify-between h-full"
    style={{ backgroundColor: feature.bgColor }}
  >
    <div className="space-y-4">
      <h3 className="text-xl text-gray-900">{feature.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed font-sans">{feature.description}</p>
      <div className="flex flex-wrap gap-2">
        {feature.tags.map((tag, i) => (
          <span
            key={i}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full cursor-default font-sans ${
              i === 0
                ? "bg-[#007a3d] text-white"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className="mt-6">
      <feature.Mockup />
    </div>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="container mx-auto bg-white py-20 px-4 md:px-0">
      <div className="text-center mb-14">
        <p className="uppercase text-xs tracking-widest text-[#007a3d] font-semibold font-sans mb-3">
          Everything in one platform
        </p>
        <h2 className="text-3xl mb-4 lg:text-5xl">
          Brigadely is your all-in-one <br />{" "}
          <em className="text-[#007a3d]">People Platform</em>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-base font-sans">
          From hiring to payroll to compliance, every HR workflow your business needs, unified.
        </p>
      </div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
        {featureData.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>

      <div className="md:hidden">
        <Carousel>
          <CarouselContent>
            {featureData.map((feature, index) => (
              <CarouselItem key={index}>
                <FeatureCard feature={feature} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Features;
