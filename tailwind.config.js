/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        primary: "#007a3d",
        "primary-dark": "#005a2d",
        "brand-mint": "#e0f3ec",
        "brand-cream": "#FFFCF5",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // Primary system (Bujeti design standard)
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-libre-baskerville)", "serif"],
        // Legacy local fonts available via utility classes
        "greycliff-regular": ["var(--font-greycliff-regular)", "sans-serif"],
        "greycliff-bold": ["var(--font-greycliff-bold)", "sans-serif"],
        "greycliff-medium": ["var(--font-greycliff-medium)", "sans-serif"],
        "diatype": ["var(--font-diatype-regular)", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
