"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "about", path: "#about" },
  { name: "features", path: "#features" },
  { name: "how it works", path: "#how-it-works" },
  { name: "faqs", path: "#faqs" },
];

const Nav = ({ light = false }) => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        const href = pathname !== "/" ? `/${link.path}` : link.path;
        return (
          <Link
            key={index}
            href={href}
            className={`capitalize text-sm font-medium font-sans transition-colors duration-300 ${
              light
                ? "text-white/70 hover:text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
