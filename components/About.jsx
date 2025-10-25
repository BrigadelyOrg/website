import React from "react";
import Image from "next/image";
import GetStartedBtn from "@/components/GetStartedBtn";

const About = () => {
  return (
    <section className="bg-[#FFFCF5] py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Text Content */}
        <div className="space-y-6">
          <p className="uppercase text-sm tracking-widest text-gray-700">
            The People Platform
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Built for the Future of Work in Africa and Beyond <br />
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Brigadely empowers businesses of all sizes from nimble startups to large enterprises — to hire, manage, and pay talent anywhere, and effortlessly.
            Whether you're building a remote-first team across borders or scaling operations across Africa,
            Brigadely simplifies everything from local onboarding to consolidated payroll without the need to set up local entities. <br/>

            ✅ Hire across countries — no legal headaches <br/>
            ✅ Pay employees, contractors, and freelancers — all in one place<br/>
            ✅ Manage your team — from onboarding to offboarding, all in one platform<br/>
            ✅ Scale your business — with local compliance and support<br/>
            ✅ Ensure full compliance — local laws, taxes, and reporting handled for you <br/>
            <br/>
            From hiring and onboarding to payroll and compliance,
            Brigadely does it all with full compliance.
          </p>
          <br/>
          <GetStartedBtn customClass="bg-black text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-900 mt-4"/>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <div className="relative transform rotate-[-2deg] shadow-lg">
            <Image
              src="/img/about.png" // Replace with your actual file path
              alt="Global People Visual"
              width={400}
              height={500}
              className="rounded-md"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
