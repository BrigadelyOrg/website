import React from "react";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { Sparkles } from "lucide-react";
import DashboardMockup from "@/components/DashboardMockup";

const Hero = () => {
  return (
    <section className="bg-[#0a0a0a] w-full overflow-hidden relative">

      {/* Atmospheric green glow behind heading */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,122,61,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto flex flex-col items-center text-center pt-24 pb-0 px-4 relative z-10">

        {/* Announcement pill */}
        <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 text-white/70 text-sm px-4 py-2 rounded-full mb-12 backdrop-blur-sm">
          <Sparkles size={13} className="text-[#4ade80]" />
          <span>People management, built for African businesses</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight max-w-4xl mb-7">
          Onboard, pay & manage <br className="hidden md:block" />
          your team,{" "}
          <em className="text-[#4ade80]">all in one place</em>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
          Run fully compliant payroll, automate your PAYE, PENCOM, and NHF
          deductions, and manage your entire workforce from one
          powerful platform.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 items-center mb-24">
          <Link href="https://forms.gle/MZjpMyXYd9fR9Sx4A" target="_blank">
            <button className="bg-white text-[#0a0a0a] py-3.5 px-8 rounded-full font-semibold hover:bg-gray-100 transition duration-200 text-base min-w-[160px]">
              Join Waitlist
            </button>
          </Link>
          <Link href="https://forms.gle/MZjpMyXYd9fR9Sx4A" target="_blank">
            <button className="bg-[#007a3d] text-white py-3.5 px-8 rounded-full font-semibold hover:bg-[#005a2d] transition duration-200 text-base flex items-center gap-2 min-w-[160px] justify-center">
              Book a Demo <GoArrowUpRight size={16} />
            </button>
          </Link>
        </div>

        {/* Hero dashboard — custom JSX mockup, bleeds into next section */}
        <div className="w-full max-w-6xl relative mx-auto">
          {/* Left edge fade */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          {/* Right edge fade */}
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          {/* Top edge fade */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <DashboardMockup />
        </div>

      </div>
    </section>
  );
};

export default Hero;
