import React from "react";

const teamMembers = [
  { initials: "FK", name: "Folakemi K.", role: "HR Director", country: "Lagos", flag: "🇳🇬", active: true },
  { initials: "CO", name: "Chidi Okafor", role: "Lead Engineer", country: "Accra", flag: "🇬🇭", active: true },
  { initials: "AM", name: "Amara Nwosu", role: "Product Designer", country: "Nairobi", flag: "🇰🇪", active: true },
  { initials: "FS", name: "Fatima Sule", role: "Sales Manager", country: "Dakar", flag: "🇸🇳", active: false },
];

const countries = [
  { flag: "🇳🇬", code: "NG", count: 42 },
  { flag: "🇬🇭", code: "GH", count: 18 },
  { flag: "🇰🇪", code: "KE", count: 15 },
  { flag: "🇿🇦", code: "ZA", count: 9 },
  { flag: "🇸🇳", code: "SN", count: 6 },
];

const AboutIllustration = () => {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-3 select-none">

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-sans mb-0.5">Your team</p>
          <p className="text-2xl font-bold text-gray-900 font-sans leading-none">248</p>
          <p className="text-xs text-gray-400 font-sans mt-0.5">employees & contractors</p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-100 text-[#007a3d] text-xs font-semibold font-sans px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#007a3d] inline-block" />
            All systems active
          </div>
          <p className="text-xs text-gray-400 font-sans mt-2">Across Africa</p>
        </div>
      </div>

      {/* Team member cards */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 font-sans uppercase tracking-wider">Team members</span>
          <span className="text-xs text-[#007a3d] font-semibold font-sans cursor-default">View all →</span>
        </div>
        <div className="divide-y divide-gray-50">
          {teamMembers.map((m) => (
            <div key={m.initials} className="px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e0f3ec] flex items-center justify-center text-[#007a3d] text-xs font-bold font-sans flex-shrink-0">
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 font-sans leading-none">{m.name}</p>
                <p className="text-xs text-gray-400 font-sans mt-0.5">{m.role}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-sm">{m.flag}</span>
                <span className="text-xs text-gray-400 font-sans">{m.country}</span>
              </div>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${m.active ? "bg-[#007a3d]" : "bg-gray-300"}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Countries breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <p className="text-xs font-semibold text-gray-500 font-sans uppercase tracking-wider mb-3">Active countries</p>
        <div className="flex items-center gap-2 flex-wrap">
          {countries.map((c) => (
            <div key={c.code} className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5">
              <span className="text-sm">{c.flag}</span>
              <span className="text-xs font-semibold text-gray-600 font-sans">{c.code}</span>
              <span className="text-xs text-gray-400 font-sans">{c.count}</span>
            </div>
          ))}
          <div className="flex items-center gap-1 bg-[#e0f3ec] border border-green-100 rounded-full px-3 py-1.5">
            <span className="text-xs font-semibold text-[#007a3d] font-sans">+3 more</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutIllustration;
