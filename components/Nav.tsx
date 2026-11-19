"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent } from "react";

import {
  FEATURE_NAV_ITEMS,
  PLATFORM_MENU,
  RESOURCE_NAV,
  SECTION_NAV,
  type NavItem,
} from "@/content/navigation";

type MenuId = "platform" | "resources";

const PANEL_IDS: Record<MenuId, string> = {
  platform: "nav-platform-menu",
  resources: "nav-resources-menu",
};

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const isCurrentPath = (pathname: string, href: string) =>
  href.startsWith("/") && !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

/**
 * Menus stay in the DOM when closed (hidden with CSS `visibility`, not
 * unmounted), so every page's server-rendered HTML links to all six feature
 * pages. `invisible` also takes closed links out of the tab order.
 */
const panelState = (open: boolean) =>
  open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0";

const PANEL_MOTION = "transition-[opacity,transform,visibility] duration-150 motion-reduce:transition-none";

function MenuLink({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate: () => void }) {
  const Icon = item.icon;
  const current = isCurrentPath(pathname, item.href);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={current ? "page" : undefined}
      className={`group flex items-start gap-3.5 rounded-xl p-3 transition-colors hover:bg-gray-50 ${FOCUS_RING}`}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-mint text-primary">
        <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.25} />
      </span>
      <span className="min-w-0">
        <span
          className={`block font-sans text-sm font-bold transition-colors group-hover:text-primary ${
            current ? "text-primary" : "text-[#111111]"
          }`}
        >
          {item.name}
        </span>
        <span className="mt-0.5 block font-sans text-[13px] leading-snug text-gray-500">{item.subtitle}</span>
      </span>
    </Link>
  );
}

/**
 * Desktop navigation: "The Platform" mega-menu, the home page section links
 * and the "Resources" dropdown. Each menu is a disclosure: a <button> with
 * `aria-expanded`/`aria-controls` that opens and closes with Enter or Space.
 * Escape closes it and returns focus to its button; a click outside, or
 * tabbing out of it, closes it too.
 */
const Nav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuId | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggers = useRef<Record<MenuId, HTMLButtonElement | null>>({ platform: null, resources: null });

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(null);
      triggers.current[open]?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const toggle = (menu: MenuId) => setOpen((current) => (current === menu ? null : menu));
  const closeMenus = () => setOpen(null);

  /** Focus moved to something outside this menu (e.g. Tab past its last link). */
  const closeOnFocusOut = (menu: MenuId) => (event: FocusEvent<HTMLLIElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) setOpen((current) => (current === menu ? null : current));
  };

  const trigger = (menu: MenuId, label: string, items: readonly NavItem[]) => {
    const expanded = open === menu;
    const inSection = items.some((item) => isCurrentPath(pathname, item.href));
    return (
      <button
        ref={(element) => {
          triggers.current[menu] = element;
        }}
        type="button"
        aria-expanded={expanded}
        aria-controls={PANEL_IDS[menu]}
        onClick={() => toggle(menu)}
        className={`flex items-center gap-1 rounded-sm font-sans text-sm font-medium transition-colors duration-200 hover:text-[#111111] ${
          expanded || inSection ? "text-[#111111]" : "text-gray-500"
        } ${FOCUS_RING}`}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>
    );
  };

  return (
    <nav ref={navRef} aria-label="Main">
      <ul className="flex items-center gap-7">
        {/* The Platform: positioned against the header bar (Header.jsx), not this item. */}
        <li onBlur={closeOnFocusOut("platform")}>
          {trigger("platform", PLATFORM_MENU.heading, FEATURE_NAV_ITEMS)}
          <div
            id={PANEL_IDS.platform}
            className={`pointer-events-none absolute inset-x-0 top-full px-3 pt-2 ${PANEL_MOTION} ${panelState(open === "platform")}`}
          >
            <div className="pointer-events-auto mx-auto grid max-w-6xl grid-cols-[17rem_1fr] gap-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_24px_64px_-24px_rgba(17,17,17,0.28)] xl:grid-cols-[19rem_1fr]">
              <div className="flex flex-col rounded-xl bg-[#F4EFE4] p-6">
                <p className="font-sans text-base font-black tracking-[-0.01em] text-[#111111]">
                  {PLATFORM_MENU.heading}
                </p>
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-gray-600">{PLATFORM_MENU.subtext}</p>
                <div className="mt-5 rounded-lg bg-white/70 p-3">
                  <Image
                    src={PLATFORM_MENU.preview.src}
                    alt={PLATFORM_MENU.preview.alt}
                    width={PLATFORM_MENU.preview.width}
                    height={PLATFORM_MENU.preview.height}
                    sizes="200px"
                    className="mx-auto h-32 w-auto"
                  />
                </div>
                <Link
                  href={PLATFORM_MENU.link.href}
                  onClick={closeMenus}
                  className={`mt-5 inline-flex items-center gap-1.5 self-start rounded-sm font-sans text-sm font-semibold text-primary transition-colors hover:text-primary-dark ${FOCUS_RING}`}
                >
                  {PLATFORM_MENU.link.label} <span aria-hidden="true">→</span>
                </Link>
              </div>
              <ul className="grid grid-cols-2 content-center gap-x-2 gap-y-3 p-4">
                {FEATURE_NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <MenuLink item={item} pathname={pathname} onNavigate={closeMenus} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>

        {SECTION_NAV.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`rounded-sm font-sans text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-[#111111] ${FOCUS_RING}`}
            >
              {link.name}
            </Link>
          </li>
        ))}

        <li className="relative" onBlur={closeOnFocusOut("resources")}>
          {trigger("resources", "Resources", RESOURCE_NAV)}
          <div
            id={PANEL_IDS.resources}
            className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-7 ${PANEL_MOTION} ${panelState(open === "resources")}`}
          >
            <ul className="space-y-1 rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_24px_64px_-24px_rgba(17,17,17,0.28)]">
              {RESOURCE_NAV.map((item) => (
                <li key={item.href}>
                  <MenuLink item={item} pathname={pathname} onNavigate={closeMenus} />
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
