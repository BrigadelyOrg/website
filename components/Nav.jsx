"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "The Platform", path: "#product" },
  { name: "Who it's for", path: "#who" },
  { name: "Compliance", path: "#compliance" },
  { name: "How it works", path: "#how-it-works" },
  { name: "FAQ", path: "#faqs" },
  { name: "Blog", path: "/blog" },
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
        // A real page (not a section anchor) is "current" on itself and its sub-pages, e.g. /blog/<slug>.
        const isCurrent =
          link.path.startsWith("/") && (pathname === link.path || pathname.startsWith(`${link.path}/`));
        return (
          <Link
            key={index}
            href={href}
            aria-current={isCurrent ? "page" : undefined}
            className={`text-sm font-medium font-sans transition-colors duration-200 ${
              light
                ? isCurrent
                  ? "text-white"
                  : "text-white/70 hover:text-white"
                : isCurrent
                ? "text-[#111111]"
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
