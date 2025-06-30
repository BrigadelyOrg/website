import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import each font weight
const diatypeRegular = localFont({
  src: "/fonts/abc-diatype-regular.otf",
  variable: "--font-diatype-regular",
  weight: "400",
});

const diatypeMedium = localFont({
  src: "/fonts/abc-diatype-medium.otf",
  variable: "--font-diatype-medium",
  weight: "500",
});

const diatypeLight = localFont({
  src: "/fonts/abc-diatype-light.otf",
  variable: "--font-diatype-light",
  weight: "300",
});

const diatypeBold = localFont({
  src: "/fonts/abc-diatype-bold.otf",
  variable: "--font-diatype-bold",
  weight: "700",
});

const diatypeThin = localFont({
  src: "/fonts/abc-diatype-thin.otf",
  variable: "--font-diatype-thin",
  weight: "100",
});
// Import each Greycliff CF font weight
const greycliffBold = localFont({
  src: "/fonts/greycliffcf/Fontspring-DEMO-greycliffcf-bold.otf",
  variable: "--font-greycliff-bold",
  weight: "700",
});

const greycliffDemiBold = localFont({
  src: "/fonts/greycliffcf/Fontspring-DEMO-greycliffcf-demibold.otf",
  variable: "--font-greycliff-demibold",
  weight: "600",
});

const greycliffExtraBold = localFont({
  src: "/fonts/greycliffcf/Fontspring-DEMO-greycliffcf-extrabold.otf",
  variable: "--font-greycliff-extrabold",
  weight: "800",
});

const greycliffHeavy = localFont({
  src: "/fonts/greycliffcf/Fontspring-DEMO-greycliffcf-heavy.otf",
  variable: "--font-greycliff-heavy",
  weight: "900",
});

const greycliffMedium = localFont({
  src: "/fonts/greycliffcf/Fontspring-DEMO-greycliffcf-medium.otf",
  variable: "--font-greycliff-medium",
  weight: "500",
});

const greycliffRegular = localFont({
  src: "/fonts/greycliffcf/Fontspring-DEMO-greycliffcf-regular.otf",
  variable: "--font-greycliff-regular",
  weight: "400",
});

export const metadata = {
  title: "Brigadely | #1 People Management System For Global Team",
  description: "Work smarter, not harder with Brigadely. Your all-in-one people management system for global finance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${diatypeRegular.variable} ${diatypeMedium.variable} ${diatypeLight.variable} ${diatypeBold.variable} ${diatypeThin.variable} ${greycliffBold.variable} ${greycliffDemiBold.variable} ${greycliffExtraBold.variable} ${greycliffHeavy.variable} ${greycliffMedium.variable} ${greycliffRegular.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
