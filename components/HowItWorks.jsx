import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const HowItsWorks = () => {
  const featureData = [
    {
      title: "Powerful reporting",
      description:
        "Unlock unrivalled insights into spending and performance with compensation, OKRs, equity and more for your team in one system.",
      iconPath: "/img/chart-icon.png",
      iconAlt: "Reporting Icon",
    },
    {
      title: "Scalability",
      description:
        "From contractors and employee to payroll, Brigadely evolves with every stage of your company’s growth.",
      iconPath: "/img/scale-icon.png",
      iconAlt: "Scalability Icon",
    },
    {
      title: "Dedicated support",
      description:
        "We don’t rely on third parties. Get a single dedicated POC to work with and guaranteed faster response.",
      iconPath: "/img/support-icon.png",
      iconAlt: "Support Icon",
    },
    {
      title: "Trusted partner",
      description:
        "Engage with one partner for your growth. From talent acquisiton to payroll management, we support your expansion end-to-end.",
      iconPath: "/img/partner-icon.png",
      iconAlt: "Partner Icon",
    },
    {
      title: "Seamless integration",
      description:
        "Eliminate data silos and reduce manual work with 100+ integrations from accounting to expenses.",
      iconPath: "/img/integration-icon.png",
      iconAlt: "Integration Icon",
    },
    {
      title: "Unrivalled security",
      description:
        "Connect your company in a secure platform. Brigadely is GDPR, SOC2, and ISO 27001 compliant.",
      iconPath: "/img/lock-icon.png",
      iconAlt: "Security Icon",
    },
  ];

  return (
    <div id="features" className="bg-[#0e0e0e] text-white py-20 px-4 md:px-0">
      {/* Header Section */}
      <div className="text-center mb-14 container mx-auto">
        <h2 className="text-3xl font-bold mb-4 lg:text-4xl">
          Move faster with HR and payroll <br /> for your team in one place
        </h2>
        <p className="text-gray-400 text-md max-w-2xl mx-auto">
          Brigadely is the only platform that combines payroll, HR, performance, and compliance
          into a single platform for every type of worker. Consolidate your tools, 
          reduce overhead, and unlock unrivalled insights into your workforce data.
        </p>
        <button className="mt-6 bg-transparent border border-gray-400 text-white px-6 py-2 rounded-full text-sm hover:border-white">
          Get started
        </button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-10 container mx-auto">
        {featureData.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-4"
          >
            <div
              className="w-10 h-10"
              style={{
                backgroundImage: `url(${feature.iconPath})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
              aria-label={feature.iconAlt}
            ></div>
            <div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden container mx-auto mt-10">
        <Carousel>
          <CarouselContent>
            {featureData.map((feature, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col gap-4 px-4">
                  <div
                    className="w-10 h-10"
                    style={{
                      backgroundImage: `url(${feature.iconPath})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                    aria-label={feature.iconAlt}
                  ></div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default HowItsWorks;
