import localFont from "next/font/local";
import { Inter, Libre_Baskerville } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const GTM_ID = "GTM-NQPV8M79";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Brigadely Technologies Limited",
  url: "https://brigadely.com",
  logo: "https://brigadely.com/img/logo1.png",
  description:
    "The financial operating system for African businesses — payroll, statutory compliance, vendor payments, and more, built for All.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ibadan",
    addressRegion: "Oyo State",
    addressCountry: "NG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "info@brigadely.com",
  },
   sameAs: ["https://www.linkedin.com/company/brigadely"], 
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Brigadely",
  url: "https://brigadely.com",
};

// --- Google fonts (primary system, matches Bujeti design standard) ---
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

// --- Local fonts (kept as CSS variables for optional use) ---
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
  metadataBase: new URL("https://brigadely.com"),
  title: {
    default: "Brigadely — The financial operating system for African businesses",
    template: "%s | Brigadely",
  },
  description:
    "Brigadely handles all your financial operations in one platform — payroll, statutory compliance, vendor payments, and more, built for African businesses.",
  keywords: [
    "payroll software Nigeria",
    "Nigerian payroll software",
    "online payroll Nigeria",
    "PAYE remittance Nigeria",
    "PAYE filing software Nigeria",
    "multi-state PAYE Nigeria",
    "pension remittance Nigeria",
    "PenCom compliant payroll",
    "statutory compliance Nigeria",
    "NHF NSITF ITF filing",
    "payroll for accountants Nigeria",
    "payroll compliance software Africa",
    "financial operating system Africa",
    "Vendor manageement and payments Nigeria",
    "expense management software Nigeria",
    "stablecoin payroll Nigeria",
    "Assest management software Nigeria",
    "Workforce management software Nigeria",
    "Leave management software Nigeria",
  ],
  authors: [{ name: "Brigadely Technologies Limited" }],
  creator: "Brigadely Technologies Limited",
  publisher: "Brigadely Technologies Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://brigadely.com",
    siteName: "Brigadely",
    title: "Brigadely — The financial operating system for African businesses",
    description:
      "Automate PAYE, Pension, NHF, NSITF, and ITF on every payroll run. One platform for payroll, compliance, and payments — built for Nigeria.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brigadely — The financial operating system for African businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The financial operating system for African businesses — payroll, statutory compliance, vendor payments, and more, built for All.",
    description:
      "Automate PAYE, Pension, NHF, NSITF, and ITF on every payroll run. One platform for payroll, compliance, and payments — built for Nigeria.",
    images: ["/og-image.png"],
    creator: "@brigadely",
  },
  alternates: {
    canonical: "https://brigadely.com",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "lxaQGgB1OXE_xWT41exVTkpQFJ7TOCk0zklIov8Bjcc",
    // other: { "msvalidate.01": "[VERIFY: Bing Webmaster Tools token]" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NG">
      <head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body
        className={`
          ${inter.variable}
          ${libreBaskerville.variable}
          ${diatypeRegular.variable}
          ${diatypeMedium.variable}
          ${diatypeLight.variable}
          ${diatypeBold.variable}
          ${diatypeThin.variable}
          ${greycliffBold.variable}
          ${greycliffDemiBold.variable}
          ${greycliffExtraBold.variable}
          ${greycliffHeavy.variable}
          ${greycliffMedium.variable}
          ${greycliffRegular.variable}
          antialiased
        `}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd schema={organizationSchema} />
        <JsonLd schema={websiteSchema} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
