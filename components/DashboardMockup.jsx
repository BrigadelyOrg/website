import React from "react";

const stats = [
  { label: "Total Employees", value: "248", sub: "+12 this month", color: "text-[#4ade80]" },
  { label: "Payroll Due", value: "₦24.5M", sub: "Next run: Apr 30", color: "text-blue-400" },
  { label: "States Active", value: "36+", sub: "Lagos · Abuja · PH", color: "text-purple-400" },
  { label: "Compliance", value: "98%", sub: "All regions green", color: "text-[#4ade80]" },
];

const navItems = [
  "Dashboard",
  "Payroll",
  "Employees",
  "Hiring",
  "Benefits",
  "Compliance",
  "Reports",
];

const payrollRows = [
  { team: "Engineering", count: "62 employees", amount: "₦8,400,000", status: "Paid" },
  { team: "Product & Design", count: "28 employees", amount: "₦4,200,000", status: "Paid" },
  { team: "Sales (Contractors)", count: "15 contractors", amount: "₦2,100,000", status: "Processing" },
  { team: "Operations", count: "41 employees", amount: "₦3,500,000", status: "Scheduled" },
];

const statusStyle = {
  Paid: "bg-green-500/15 text-green-400",
  Processing: "bg-yellow-500/15 text-yellow-400",
  Scheduled: "bg-blue-500/15 text-blue-400",
};

const DashboardMockup = () => {
  return (
    <div className="w-full rounded-t-2xl border border-white/10 overflow-hidden shadow-[0_-8px_60px_rgba(0,122,61,0.15)]">

      {/* macOS-style window chrome */}
      <div className="bg-[#1c1c1c] px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#2a2a2a] rounded-md px-4 py-1.5 text-xs text-white/25 w-72 text-center font-sans tracking-wide">
            app.brigadely.com/dashboard
          </div>
        </div>
      </div>

      {/* App layout */}
      <div className="flex bg-[#111]" style={{ height: "440px" }}>

        {/* Sidebar */}
        <div className="w-44 bg-[#0d0d0d] border-r border-white/5 flex flex-col py-5 px-3 flex-shrink-0">
          <div className="px-2 mb-5">
            <span className="text-white text-xs font-semibold tracking-widest font-sans">BRIGADELY</span>
          </div>
          <nav className="space-y-0.5 flex-1">
            {navItems.map((item, i) => (
              <div
                key={item}
                className={`px-3 py-2 rounded-lg text-xs font-sans cursor-default ${
                  i === 0 ? "bg-[#007a3d] text-white" : "text-white/30"
                }`}
              >
                {item}
              </div>
            ))}
          </nav>
          {/* User row */}
          <div className="px-2 mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#007a3d] flex items-center justify-center text-white text-xs font-bold font-sans flex-shrink-0">
                A
              </div>
              <div>
                <div className="text-white/50 text-xs font-sans leading-none">Admin</div>
                <div className="text-white/25 text-[10px] font-sans mt-0.5">Scale HQ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main panel */}
        <div className="flex-1 bg-[#111] p-5 overflow-hidden flex flex-col gap-4">

          {/* Page header */}
          <div className="flex items-center justify-between flex-shrink-0">
            <div>
              <div className="text-white text-sm font-semibold font-sans">Overview</div>
              <div className="text-white/25 text-xs font-sans mt-0.5">April 2025 · Lagos, Nigeria</div>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#007a3d] text-white text-xs font-sans px-3 py-1.5 rounded-lg">
                Run Payroll
              </button>
              <button className="bg-white/5 border border-white/10 text-white/40 text-xs font-sans px-3 py-1.5 rounded-lg">
                + Add Employee
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-2.5 flex-shrink-0">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#1a1a1a] rounded-xl p-3.5 border border-white/5">
                <div className="text-white/30 text-[10px] font-sans mb-2 leading-none">{s.label}</div>
                <div className={`text-xl font-bold font-sans ${s.color} mb-1.5 leading-none`}>{s.value}</div>
                <div className="text-white/20 text-[10px] font-sans leading-none">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Payroll table */}
          <div className="bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden flex-1">
            <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
              <span className="text-white/60 text-xs font-semibold font-sans">Recent Payroll Runs</span>
              <span className="text-white/25 text-xs font-sans">April 2025</span>
            </div>
            <div className="divide-y divide-white/5">
              {payrollRows.map((row, i) => (
                <div key={i} className="px-4 py-2.5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-white/65 text-xs font-sans leading-none">{row.team}</div>
                    <div className="text-white/25 text-[10px] font-sans mt-1 leading-none">{row.count}</div>
                  </div>
                  <div className="text-white/45 text-xs font-sans font-medium flex-shrink-0">{row.amount}</div>
                  <div className={`text-[10px] font-sans px-2 py-0.5 rounded-full flex-shrink-0 ${statusStyle[row.status]}`}>
                    {row.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
