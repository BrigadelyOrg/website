import localFont from "next/font/local";
import { Inter, Libre_Baskerville } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { CtaTracker } from "./CtaTracker";

const GTM_ID = "GTM-NQPV8M79";

// Optional GA4 tag (gtag.js), rendered only when NEXT_PUBLIC_GA_MEASUREMENT_ID is
// set. Only this (frontend) layout loads it, so /admin activity is never tracked.
// The GTM container above already sends page views to GA4 (G-4ZN7WY06BD): don't
// set this to that same ID, or every page view is counted twice.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Site-wide. The Organization schema is on the home page (app/(frontend)/page.jsx).
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Brigadely",
  url: SITE_URL,
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
    default: "Brigadely - The financial operating system for African businesses",
    template: "%s | Brigadely",
  },
  description: SITE_DESCRIPTION,
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
  // No `url` here and no `alternates.canonical`: every page inherits these, and
  // pages without their own would otherwise point search engines at the home page.
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Brigadely",
    title: "Brigadely - The financial operating system for African businesses",
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brigadely — The financial operating system for African businesses",
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
    creator: "@brigadely",
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
        <JsonLd data={websiteSchema} />
        {/* GA4 `cta_click` conversion events for sign-up and booking clicks. */}
        <CtaTracker />
        <Header />
        {children}
        <Footer />
        <Script
          src="https://static.klaviyo.com/onsite/js/VbbBJB/klaviyo.js?company_id=VbbBJB"
          strategy="afterInteractive"
        />
        <Script
          id="klaviyo-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`,
          }}
        />
      </body>
      {GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
    </html>
  );
}
