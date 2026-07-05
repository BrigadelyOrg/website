"use client";

const CALENDLY_URL = "https://calendly.com/brigadely-info/30min";

const CalendlyButton = ({ className, style, children = "Book a call" }) => {
  const open = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <button onClick={open} className={className} style={style}>
      {children}
    </button>
  );
};

export default CalendlyButton;
