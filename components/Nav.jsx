"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "The Platform", path: "#product" },
  { name: "Who it's for", path: "#who" },
  { name: "Compliance", path: "#compliance" },
  { name: "How it works", path: "#how-it-works" },
  { name: "FAQ", path: "#faqs" },
];

const Nav = ({ light = false }) => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-7">
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
            className={`text-sm font-medium font-sans transition-colors duration-200 ${
              light
                ? "text-white/70 hover:text-white"
                : "text-gray-500 hover:text-[#111111]"
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
