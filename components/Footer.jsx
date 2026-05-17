import Image from "next/image";
import Link from "next/link";
import React from "react";
import Socials from "./Socials";

const footerLinks = {
  Product: [
    { label: "Payroll Management", href: "#features" },
    { label: "Employee Benefits", href: "#features" },
    { label: "HR Operations", href: "#features" },
    { label: "Expense Tracking", href: "#features" },
    { label: "Compliance & Tax", href: "#features" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "mailto:info@brigadely.com" },
  ],
  Resources: [
    { label: "Help Centre", href: "#" },
    { label: "API Docs", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "Pricing", href: "/pricing" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#0e0e0e] text-gray-400 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-14">

          {/* Brand column */}
          <div className="md:col-span-2 space-y-5">
            <Image
              src="/img/logo1.png"
              alt="Brigadely"
              width={110}
              height={36}
              className="brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              The all-in-one people platform for global teams. Hire, pay, and
              manage your workforce across Africa and beyond.
            </p>
            <div className="space-y-1">
              <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Contact</p>
              <a
                href="mailto:info@brigadely.com"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 block"
              >
                info@brigadely.com
              </a>
              <p className="text-sm text-gray-500">Ibadan, Nigeria</p>
            </div>
            <Socials iconStyles="text-gray-500 text-base hover:text-white" />
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter row */}
        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="font-sans text-sm font-semibold text-gray-300 mb-1">
              Subscribe to our newsletter
            </p>
            <p className="text-xs text-gray-600">
              Compliance guides, product updates, and hiring insights. No spam.
            </p>
          </div>
          <div className="flex flex-shrink-0">
            <input
              type="email"
              placeholder="name@company.com"
              className="bg-gray-900 border border-gray-700 rounded-l-full py-2.5 px-4 w-56 text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-[#007a3d]"
            />
            <button className="bg-[#007a3d] text-white px-5 rounded-r-full text-sm font-semibold hover:bg-[#005a2d] transition duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Brigadely. All rights reserved.</p>
          <p>Built for the future of work in Africa and beyond.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
