import React from "react";
import GetStartedBtn from "@/components/GetStartedBtn";
import AboutIllustration from "@/components/AboutIllustration";

const benefits = [
  "Run payroll for every employee and contractor in one place",
  "Manage the full employee lifecycle from onboarding to offboarding",
  "Stay compliant with local labor laws, FIRS requirements, and statutory tax rules",
  "Built for Africa, starting with the markets that matter most",
];

const About = () => {
  return (
    <section id="about" className="bg-[#FFFCF5] py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="space-y-7">
          <p className="uppercase text-xs tracking-widest text-[#007a3d] font-semibold">
            Built for African Business
          </p>
          <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight">
            Stop juggling 5 tools to manage your team.{" "}
            <em className="text-[#007a3d]">Do it all from one platform.</em>
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Most HR tools weren&apos;t built for African businesses. They ignore local
            payroll realities and have no concept of local compliance.
            Brigadely was built from the ground up for how African businesses
            actually operate with full statutory compliance automation.
          </p>
          <ul className="space-y-3">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#e0f3ec] flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="#007a3d"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <GetStartedBtn customClass="bg-[#007a3d] text-white hover:bg-[#005a2d]" />
          </div>
        </div>

        <div className="flex justify-center">
          <AboutIllustration />
        </div>

      </div>
    </section>
  );
};

export default About;
