import React from "react";
import {
  CreditCard,
  Users,
  Gift,
  LayoutDashboard,
  Receipt,
  ShieldCheck,
} from "lucide-react";

const products = [
  {
    icon: CreditCard,
    title: "Payroll Management",
    description:
      "Run payroll for your entire workforce, on time, every pay cycle.",
  },
  {
    icon: Users,
    title: "Hiring",
    description:
      "Onboard employees and contractors compliantly, wherever your team is based. Built for Africa, expanding to more markets soon.",
  },
  {
    icon: Gift,
    title: "Employee Benefits",
    description:
      "Offer equitable, location-specific benefits to every team member. Track total compensation in one unified report.",
  },
  {
    icon: LayoutDashboard,
    title: "HR Operations",
    description:
      "Manage the full employee lifecycle from onboarding to offboarding with localized workflows for every country.",
  },
  {
    icon: Receipt,
    title: "Expense Tracking",
    description:
      "Capture, approve, and reimburse expenses with full audit trails. Eliminate manual reconciliation forever.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Tax",
    description:
      "Stay compliant with local labor laws, statutory deductions, and tax reporting across every market you operate in.",
  },
];

const ProductsGrid = () => {
  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <p className="uppercase text-xs tracking-widest text-[#007a3d] font-semibold mb-3">
            Platform overview
          </p>
          <h2 className="text-3xl md:text-5xl text-gray-900 mb-4">
            One platform.{" "}
            <em className="text-[#007a3d]">Every people operation.</em>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Six core modules, seamlessly connected so your HR, finance, and ops
            teams always work from one source of truth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#007a3d] hover:shadow-md transition-all duration-200 group cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-[#e0f3ec] flex items-center justify-center mb-5 group-hover:bg-[#007a3d] transition-colors duration-200">
                <product.icon
                  className="text-[#007a3d] group-hover:text-white transition-colors duration-200"
                  size={20}
                />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
