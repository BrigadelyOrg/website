import Image from "next/image";
import Link from "next/link";
import React from "react";
import Socials from "./Socials";

const footerLinks = {
  Platform: [
    { label: "Payroll", href: "#product" },
    { label: "Statutory compliance", href: "#compliance" },
    { label: "People & benefits", href: "#product" },
    { label: "Expense management", href: "#product" },
    { label: "Payments", href: "#product" },
    { label: "For accountants", href: "#who" },
  ],
  Company: [
    { label: "About us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "mailto:info@brigadely.com" },
  ],
  Resources: [
    { label: "Help centre", href: "#" },
    { label: "API docs", href: "#" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "#faqs" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Cookie policy", href: "#" },
    { label: "NDPR notice", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-gray-400 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Top: brand + links */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-16 pb-16 border-b border-white/10">

          {/* Brand column */}
          <div className="md:col-span-2 space-y-5">
            <Link href="/">
              <Image
                src="/img/logo1.png"
                alt="Brigadely"
                width={110}
                height={36}
                className="brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              The financial operating system for African businesses. Payroll,
              statutory compliance, vendor payments, and more — on one ledger,
              built for Nigeria.
            </p>
            <div className="space-y-1.5">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Contact</p>
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
              <h4 className="font-sans text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-gray-600">
          <p>&copy; 2026 Brigadely. All rights reserved.</p>
          <p>The financial operating system for African businesses.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
