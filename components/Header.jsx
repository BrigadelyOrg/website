"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Non-homepage routes have light backgrounds — always show the pill
  const [scrolled, setScrolled] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  const light = !scrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* Outer shell: adds gap around the pill when scrolled */}
      <div className={`transition-all duration-300 ${scrolled ? "pt-3 px-4 md:px-8" : ""}`}>

        {/* The floating pill */}
        <div
          className={`mx-auto transition-all duration-300 ${
            scrolled
              ? "max-w-5xl rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.10)] border border-gray-100"
              : "bg-transparent"
          }`}
        >
          {/* Nav content */}
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              scrolled
                ? "px-6 py-3"
                : "container mx-auto px-4 py-4 xl:py-5"
            }`}
          >
            {/* Logo */}
            <Link href="/">
              <Image
                src="/img/logo1.png"
                alt="Brigadely"
                width={110}
                height={36}
                className={`transition-all duration-300 ${light ? "brightness-0 invert" : ""}`}
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex flex-1 justify-center">
              <Nav light={light} />
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-5">
              <Link
                href="#"
                className={`text-sm font-medium font-sans transition-colors duration-300 ${
                  light
                    ? "text-white/70 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Sign In
              </Link>
              <Link href="https://forms.gle/MZjpMyXYd9fR9Sx4A" target="_blank">
                <div className="px-5 py-2 bg-[#007a3d] text-white text-sm font-semibold font-sans rounded-full hover:opacity-90 active:scale-95 transition duration-200 whitespace-nowrap">
                  Book a Demo
                </div>
              </Link>
            </div>

            {/* Mobile nav */}
            <div className="lg:hidden">
              <MobileNav light={light} />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
