import React from "react";
import Image from "next/image";
import GetStartedBtn from "@/components/GetStartedBtn";

const Hero = () => {
  return (
    <div className="bg-[#e0f3ec] w-full py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col items-center text-center space-y-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
           Smart Team Management Tool  <br/> For your Business
          </h1>
          <p className="text-gray-700 text-base md:text-lg">
            Brigadely helps you manage your team, handle payroll payments, manage expenses, and run your operations, all from one powerful business dashboard
            
            
            
          </p>
        </div>

        <GetStartedBtn customClass="bg-black text-white hover:bg-gray-900" />

        <div className="mt-10">
          <Image
            src="/img/hero.png"
            alt="Global Hiring Illustration"
            width={1000}
            height={600}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
