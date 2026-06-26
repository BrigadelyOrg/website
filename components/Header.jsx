"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-all duration-300 ${scrolled ? "pt-3 px-4 md:px-8" : ""}`}>
        <div
          className={`mx-auto transition-all duration-300 ${
            scrolled
              ? "max-w-6xl rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-gray-100"
              : "bg-transparent"
          }`}
        >
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              scrolled ? "px-6 py-3" : "container mx-auto px-6 py-4 xl:py-5"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/img/logo1.png"
                alt="Brigadely"
                width={110}
                height={36}
              />
            </Link>

            {/* Desktop nav — centred */}
            <div className="hidden lg:flex flex-1 justify-center">
              <Nav />
            </div>

            {/* Right side: Nigeria selector + CTA */}
            <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 cursor-default select-none">
                <Globe size={13} className="text-gray-400" />
                <span>Nigeria</span>
              </div>
              <Link href="https://app.brigadely.com/signup" target="_blank">
                <div className="px-5 py-2.5 bg-[#007a3d] text-white text-sm font-semibold font-sans rounded-full hover:bg-[#005a2d] active:scale-95 transition duration-200 whitespace-nowrap">
                  Start free trial
                </div>
              </Link>
            </div>

            {/* Mobile menu */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
