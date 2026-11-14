"use client";

const CALENDLY_URL = "https://calendly.com/brigadely-info/30min";

/**
 * @param {{ className?: string, style?: import("react").CSSProperties, children?: import("react").ReactNode }} props
 */
const CalendlyButton = ({ className, style, children = "Book a call" }) => {
  const open = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    // data-track-cta: counted as a GA4 `cta_click` whatever its text (see lib/analytics/cta.ts).
    <button onClick={open} className={className} style={style} data-track-cta="">
      {children}
    </button>
  );
};

export default CalendlyButton;
