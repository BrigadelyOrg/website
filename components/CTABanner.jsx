import React from "react";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const CTABanner = () => {
  return (
    <section className="bg-[#007a3d] py-24 px-4">
      <div className="container mx-auto text-center text-white max-w-3xl mx-auto space-y-7">
        <p className="uppercase text-xs tracking-widest text-green-300 font-semibold">
          Get started today
        </p>
        <h2 className="text-3xl md:text-5xl leading-tight">
          Ready to simplify how you manage{" "}
          <em className="text-white/80">your team?</em>
        </h2>
        <p className="text-green-100 text-lg max-w-xl mx-auto leading-relaxed">
          Join forward-thinking African businesses building smarter, fully
          compliant people operations with Brigadely. 90-day free trial on all plans.
          No setup fees. No consultants needed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link href="https://app.brigadely.com/signup" target="_blank">
            <button className="flex items-center gap-2 bg-white text-[#007a3d] px-8 py-3.5 rounded-full font-bold hover:bg-green-50 transition duration-200 text-base">
              Get Started Free <GoArrowUpRight size={18} />
            </button>
          </Link>
          <Link href="https://app.brigadely.com/signup" target="_blank">
            <button className="flex items-center gap-2 border-2 border-white text-white px-8 py-3.5 rounded-full font-bold hover:bg-white hover:text-[#007a3d] transition duration-200 text-base">
              Book a Demo <GoArrowUpRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
