import React from "react";
import {
  BarChart2,
  TrendingUp,
  MessageCircle,
  Users2,
  Zap,
  ShieldCheck,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const featureData = [
  {
    Icon: BarChart2,
    title: "Powerful reporting",
    description:
      "Unlock unrivalled insights into spending and performance. Compensation, OKRs, equity, and workforce analytics in one system.",
  },
  {
    Icon: TrendingUp,
    title: "Built to scale",
    description:
      "From your first contractor to a 500-person global team, Brigadely evolves with every stage of your company's growth without switching tools.",
  },
  {
    Icon: MessageCircle,
    title: "Dedicated support",
    description:
      "No third-party hand-offs. Get a single dedicated point of contact and guaranteed fast response times. Real support, not a ticket queue.",
  },
  {
    Icon: Users2,
    title: "A partner, not just a tool",
    description:
      "From talent acquisition to payroll management, we support your expansion end-to-end. One partner for your entire growth journey.",
  },
  {
    Icon: Zap,
    title: "Seamless integrations",
    description:
      "Eliminate data silos and reduce manual work with 100+ integrations: accounting, expenses, Slack, QuickBooks, and more.",
  },
  {
    Icon: ShieldCheck,
    title: "Enterprise-grade security",
    description:
      "Your data stays protected on a platform built for compliance. Brigadely is GDPR, SOC2, and ISO 27001 certified.",
  },
];

const FeatureItem = ({ feature: { Icon, title, description } }) => (
  <div className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition duration-200">
    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
      <Icon size={18} className="text-[#4ade80]" />
    </div>
    <div>
      <h3 className="text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed font-sans">{description}</p>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-[#0e0e0e] text-white py-24 px-4 md:px-0">
      <div className="text-center mb-16 container mx-auto">
        <p className="uppercase text-xs tracking-widest text-[#4ade80] font-semibold font-sans mb-4">
          Why teams choose Brigadely
        </p>
        <h2 className="text-3xl mb-4 lg:text-5xl leading-tight">
          Move faster with HR and payroll <br />{" "}
          <em className="text-[#4ade80]">for your team in one place</em>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed font-sans">
          Brigadely is the only platform that combines payroll, HR, performance,
          and compliance into a single system for every type of worker. Consolidate
          your tools, reduce overhead, and unlock unrivalled insights.
        </p>
        <Link href="https://forms.gle/MZjpMyXYd9fR9Sx4A" target="_blank">
          <button className="mt-8 flex items-center gap-2 mx-auto border border-gray-500 text-white px-6 py-3 rounded-full text-sm font-semibold font-sans hover:border-white hover:bg-white hover:text-black transition duration-200">
            Get started <GoArrowUpRight size={16} />
          </button>
        </Link>
      </div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 container mx-auto">
        {featureData.map((feature, index) => (
          <FeatureItem key={index} feature={feature} />
        ))}
      </div>

      <div className="md:hidden container mx-auto mt-10">
        <Carousel>
          <CarouselContent>
            {featureData.map((feature, index) => (
              <CarouselItem key={index}>
                <FeatureItem feature={feature} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default HowItWorks;
