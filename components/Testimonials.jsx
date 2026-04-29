import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    text: "Before Brigadely, running payroll for our 60-person team took nearly a week. We were chasing approvals across WhatsApp and fixing spreadsheet errors. Now we close payroll in under two hours.",
    name: "Folakemi Kolawole",
    role: "Head of Operations",
    company: "TechTeam Africa",
  },
  {
    text: "Onboarding contractors across Lagos, Abuja, and Port Harcourt used to require separate legal consultants for every state. Now Brigadely handles compliance automatically so we can focus on finding great people.",
    name: "Ololade Aderonke",
    role: "Chief People Officer",
    company: "Scale HQ",
  },
  {
    text: "Running payroll in both NGN and USD was the game-changer. We pay our Nigerian employees in Naira and our international contractors in dollars, all from one dashboard, with zero errors in eight months.",
    name: "Shade Omidiora",
    role: "CFO",
    company: "BuildFast Inc.",
  },
  {
    text: "The expense management caught two audit findings before they became problems. Having payroll, benefits, and compliance in one place isn't just convenient. It's how we stay compliant at scale.",
    name: "Folu Adetola",
    role: "Finance Director",
    company: "Expand Africa",
  },
  {
    text: "We evaluated four HR platforms. Brigadely was the only one that actually understood African compliance: local tax tables, leave entitlements, everything. It saved us months of setup work.",
    name: "Mariam Agbogunloko",
    role: "VP People",
    company: "Grit Labs",
  },
];

const Testimonials = () => {
  const withInitials = testimonials.map((t) => ({
    ...t,
    initials: t.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase(),
  }));

  return (
    <section id="testimonials" className="bg-[#0a3d22] text-white py-20 px-4 md:px-12">
      <div className="container mx-auto">
        <div className="mb-12">
          <p className="uppercase text-xs tracking-widest text-[#4ade80] font-semibold mb-3">
            Customer stories
          </p>
          <h2 className="text-3xl md:text-4xl max-w-md leading-tight">
            Trusted by teams{" "}
            <em className="text-[#4ade80]">across Africa</em>
          </h2>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {withInitials.map((t, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-[#1a5c34] rounded-2xl p-7 flex flex-col justify-between h-full min-h-[280px]">
                  <p className="text-base leading-relaxed text-green-50">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center mt-8 gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#007a3d] flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-green-300">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex gap-3 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-green-600 text-white hover:bg-[#007a3d] hover:border-[#007a3d]" />
            <CarouselNext className="static translate-y-0 bg-transparent border-green-600 text-white hover:bg-[#007a3d] hover:border-[#007a3d]" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
