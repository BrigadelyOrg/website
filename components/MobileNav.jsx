"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { useState } from "react";

const links = [
  { name: "about", path: "#about" },
  { name: "features", path: "#features" },
  { name: "how it works", path: "#how-it-works" },
  { name: "pricing", path: "/pricing" },
  { name: "faqs", path: "#faqs" },
];

const MobileNav = ({ light = false }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <LuMenu
          className={`text-[28px] transition-colors duration-300 ${
            light ? "text-white" : "text-black"
          }`}
        />
      </SheetTrigger>

      <SheetContent className="flex flex-col bg-white" side="right">
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden>

        <div className="mt-16 mb-10 text-center">
          <Link href="/" onClick={handleLinkClick}>
            <Image
              src="/img/logo1.png"
              alt="Brigadely"
              width={120}
              height={40}
              className="mx-auto"
            />
          </Link>
        </div>

        <nav className="flex flex-col justify-center items-center gap-6">
          {links.map((link, index) => {
            const href = link.path.startsWith("/")
              ? link.path
              : pathname !== "/"
              ? `/${link.path}`
              : link.path;
            return (
              <Link
                key={index}
                href={href}
                onClick={handleLinkClick}
                className="text-lg capitalize font-medium font-sans text-gray-700 hover:text-[#007a3d] transition-all"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="https://app.brigadely.com/signin"
            target="_blank"
            className="text-sm font-medium font-sans text-gray-600 hover:text-gray-900"
          >
            Sign In
          </Link>
          <Link
            href="https://app.brigadely.com/signup"
            target="_blank"
            onClick={handleLinkClick}
            className="w-full text-center bg-[#9fff59] text-[#0d0d0d] py-3 px-6 rounded-full font-semibold font-sans hover:opacity-90 transition duration-200"
          >
            Get Started Free
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
