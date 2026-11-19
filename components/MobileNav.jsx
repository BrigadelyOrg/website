"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  FEATURE_NAV_ITEMS,
  PLATFORM_MENU,
  RESOURCE_NAV,
  SECTION_NAV,
} from "@/content/navigation";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const isCurrentPath = (pathname, href) =>
  href.startsWith("/") && !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

/**
 * Mobile menu: a side sheet (Radix Dialog, which traps focus while open and
 * closes on Escape) with "The Platform" and "Resources" as collapsible
 * sections. The desktop menu (Nav.tsx) is in every page's HTML for crawlers;
 * this sheet only renders while open.
 */
const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const onOpenChange = (next) => {
    setOpen(next);
    if (!next) setExpanded(null);
  };
  const closeMenu = () => onOpenChange(false);

  /** A collapsible group of links: "platform" or "resources". */
  const section = (id, label, items, extra) => {
    const isExpanded = expanded === id;
    const panelId = `mobile-nav-${id}`;
    return (
      <div className="border-b border-gray-100">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => setExpanded(isExpanded ? null : id)}
          className={`flex w-full items-center justify-between py-4 text-left font-sans text-lg font-medium text-gray-800 ${FOCUS_RING}`}
        >
          {label}
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 motion-reduce:transition-none ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
        <div id={panelId} hidden={!isExpanded} className="pb-4">
          <ul className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const current = isCurrentPath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={current ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-gray-50 ${FOCUS_RING}`}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-mint text-primary">
                      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-sans text-[15px] font-semibold ${current ? "text-primary" : "text-[#111111]"}`}>
                        {item.name}
                      </span>
                      <span className="block font-sans text-xs leading-snug text-gray-500">{item.subtitle}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {extra}
        </div>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger aria-label="Open menu" className={`flex items-center justify-center rounded-sm ${FOCUS_RING}`}>
        <LuMenu aria-hidden="true" className="text-[28px] text-[#111111]" />
      </SheetTrigger>

      <SheetContent className="flex flex-col overflow-y-auto bg-white" side="right">
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden>

        <div className="mt-10 mb-6">
          <Link href="/" onClick={closeMenu} className={`inline-block rounded-sm ${FOCUS_RING}`}>
            <Image src="/img/logo1.png" alt="Brigadely" width={120} height={40} />
          </Link>
        </div>

        <nav aria-label="Main" className="flex flex-col">
          {section(
            "platform",
            PLATFORM_MENU.heading,
            FEATURE_NAV_ITEMS,
            <Link
              href={PLATFORM_MENU.link.href}
              onClick={closeMenu}
              className={`mt-2 inline-flex items-center gap-1.5 rounded-sm px-2 font-sans text-sm font-semibold text-primary ${FOCUS_RING}`}
            >
              {PLATFORM_MENU.link.label} <span aria-hidden="true">→</span>
            </Link>,
          )}
          {SECTION_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`border-b border-gray-100 py-4 font-sans text-lg font-medium text-gray-800 transition-colors hover:text-primary ${FOCUS_RING}`}
            >
              {link.name}
            </Link>
          ))}
          {section("resources", "Resources", RESOURCE_NAV)}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-4 pt-8">
          <Link
            href="https://app.brigadely.com/signin"
            target="_blank"
            className="font-sans text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Sign in
          </Link>
          <Link
            href="https://app.brigadely.com/signup"
            target="_blank"
            onClick={closeMenu}
            className="w-full rounded-full bg-primary px-6 py-3.5 text-center font-sans font-semibold text-white transition duration-200 hover:opacity-90"
          >
            Start free trial
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
