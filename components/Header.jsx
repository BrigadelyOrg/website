import Link from "next/link";
import React from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import Image from "next/image";

const Header = () => {
  return (
    <header className="py-8 xl:py-6 text-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src="/img/logo1.png"
            alt="Brigadely logo"
            width={120}
            height={120}
          />
        </Link>

        {/* Centered Nav */}
        <div className="hidden lg:flex flex-1 justify-center">
          <Nav />
        </div>

        {/* Login and Create Account Buttons 
          <div className="hidden lg:flex items-center gap-4">
            <Link href={"/login"}>
              <div className="px-4 py-2 bg-transparent text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200">
                Login
              </div>
            </Link>
            <Link href={"/create-account"}>
              <div className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                Create Account
              </div>
            </Link>
          </div>
       */}

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
