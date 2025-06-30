import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Features = () => {
  const featureData = [
    {
      title: "Pay anyone, anywhere in minutes",
      description:
        "Forget multiple tools, payroll errors and unreliable reporting. Run payroll for your entire workforce all in one place.",
      iconPath: "/img/payroll-table.jpeg",
      iconAlt: "Payroll Table",
      buttons: ["Brigadely Payroll", ],
      bgColor: "#fff9f0",
    },
    {
      title: "Expand your team and hire anywhere",
      description:
        "Compliantly onboard contractors and employees, without worrying about local laws, payroll and keeping up with compliance.",
      iconPath: "/img/headcount-chart.png",
      iconAlt: "Headcount Chart",
      buttons: ["Contractor Management", "Employee Management"],
      bgColor: "#d4ebe3",
    },
    {
      title: "Provide teams with Benefits",
      description:
        "Easily offer equitable benefits to all your staffs compliantly. Brigadely simplifies benefit reporting and brings your total compensation into one report.",
      iconPath: "/img/stock-options.png",
      iconAlt: "Stock Options",
      buttons: ["Benefit Management","Employee Beenfits"],
      bgColor: "#d4ebe3",
    },
    {
      title: "Consolidate your HR operations",
      description:
        "With Brigadely, bring all employee data into a single system. We localize everything from onboarding to holidays based on location and labor laws.",
      iconPath: "/img/hr-cards.png",
      iconAlt: "HR Cards",
      buttons: ["Brigadely"],
      bgColor: "#fff9f0",
    },
  ];

  return (
    <div id="features" className="container mx-auto bg-white py-16 px-4 md:px-0">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-5 lg:text-5xl">
          Brigadely is your all-in-one <br /> People Platform
        </h2>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
        {featureData.map((feature, index) => (
          <div
            key={index}
            className="rounded-xl px-6 py-8 shadow-lg flex flex-col justify-between"
            style={{ backgroundColor: feature.bgColor }}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-700">{feature.description}</p>
              <div className="flex flex-wrap gap-3">
                {feature.buttons.map((btn, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 text-sm rounded-full ${
                      i === 0
                        ? "bg-[#007a3d] text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Image
                src={feature.iconPath}
                alt={feature.iconAlt}
                width={500}
                height={250}
                className="rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Carousel>
          <CarouselContent>
            {featureData.map((feature, index) => (
              <CarouselItem key={index}>
                <div
                  className="rounded-xl p-6 shadow-lg flex flex-col justify-between space-y-6"
                  style={{ backgroundColor: feature.bgColor }}
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-700">{feature.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {feature.buttons.map((btn, i) => (
                        <button
                          key={i}
                          className={`px-4 py-2 text-sm rounded-full ${
                            i === 0
                              ? "bg-[#007a3d] text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {btn}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Image
                      src={feature.iconPath}
                      alt={feature.iconAlt}
                      width={500}
                      height={250}
                      className="rounded-md"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Features;
