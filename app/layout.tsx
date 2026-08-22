import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const SITE = "https://rossgriffithsdigital.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Ross & Griffiths Digital — Web design in Cobourg, Ontario",
    template: "%s | Ross & Griffiths Digital",
  },
  description:
    "Custom websites for small businesses in Cobourg and Northumberland County. Flat $999 build. No templates, no lock-in, no monthly ransom.",
  keywords: [
    "web design Cobourg",
    "web design Northumberland County",
    "website design Port Hope",
    "small business website Ontario",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE,
    siteName: "Ross & Griffiths Digital",
    title: "Web design in Cobourg, Ontario — Ross & Griffiths Digital",
    description:
      "Custom websites for small businesses in Northumberland County. Flat $999, no templates.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ross & Griffiths Digital",
  description:
    "Custom web design, e-commerce and business integrations for small businesses in Northumberland County, Ontario.",
  url: SITE,
  areaServed: [
    "Cobourg",
    "Port Hope",
    "Brighton",
    "Colborne",
    "Trenton",
    "Campbellford",
    "Northumberland County",
  ].map((n) => ({ "@type": "City", name: n })),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cobourg",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  priceRange: "$999",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "19:00",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" className={`${instrument.variable} ${dm.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
