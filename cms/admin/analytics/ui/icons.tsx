import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** 16px line icons, drawn in currentColor. */
function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconOverview(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 13.5h11" />
      <path d="m3.5 10.5 3-3.5 2.5 2L13 4" />
      <path d="M10.5 4H13v2.5" />
    </Icon>
  );
}

export function IconArticle(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="2" width="10" height="12" rx="1.75" />
      <path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" />
    </Icon>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="7" r="4.25" />
      <path d="m10.25 10.25 3.25 3.25" />
    </Icon>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <Icon width={14} height={14} {...props}>
      <path d="M13.25 8A5.25 5.25 0 1 1 11.7 4.3" />
      <path d="M13.25 2.75v3h-3" />
    </Icon>
  );
}

export function IconExternal(props: IconProps) {
  return (
    <Icon width={11} height={11} {...props}>
      <path d="M5 11 11 5M6 5h5v5" />
    </Icon>
  );
}

export function IconPlug(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 2.5v3M10 2.5v3" />
      <path d="M4.5 5.5h7v2a3.5 3.5 0 0 1-7 0v-2Z" />
      <path d="M8 11v2.5" />
    </Icon>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 2.5 14 13H2L8 2.5Z" />
      <path d="M8 6.5v2.75M8 11.25v.01" />
    </Icon>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M8 5v3.25l2 1.25" />
    </Icon>
  );
}

/** Solid triangle for trend badges. */
export function IconTrend({ direction }: { direction: "up" | "down" }) {
  return (
    <svg width={8} height={8} viewBox="0 0 8 8" aria-hidden="true" focusable="false">
      <path d={direction === "up" ? "M4 1 7.5 6.5h-7Z" : "M4 7 .5 1.5h7Z"} fill="currentColor" />
    </svg>
  );
}
