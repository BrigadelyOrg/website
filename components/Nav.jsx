"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    name: "faqs",
    path: "#faqs",
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        const href = pathname !== "/" ? `/${link.path}` : link.path;
        return (
          <Link
            className={`capitalize font-medium transition-all hover:text-blue-500 
              ${
                link.path === pathname
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black"
              }`}
            key={index}
            href={href}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
