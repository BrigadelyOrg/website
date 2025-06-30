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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import Image from "next/image";

const links = [
  {
    name: "about us",
    path: "#about",
  },
  {
    name: "features",
    path: "#features",
  },
  {
    name: "how it works",
    path: "#howItWorks",
  },
  {
    name: "faqs",
    path: "#faqs",
  },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <LuMenu className="text-[32px] text-black" />
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-white" side="right">
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle> {/* Hides the title visually */}
        </VisuallyHidden>

        <div className="mt-32 mb-14 text-center text-2xl">
          <Link href={"/"}>
            <Image
              src="/img/logo.png"
              alt="logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </Link>
        </div>

        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            const href = pathname !== "/" ? `/${link.path}` : link.path;
            return (
              <Link
                key={index}
                href={href}
                className={`${
                  link.path === pathname &&
                  "text-primary  border-b-2 border-primary"
                } text-xl capitalize hover:text-primary transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
