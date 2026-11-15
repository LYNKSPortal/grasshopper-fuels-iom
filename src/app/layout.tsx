import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { CartProvider } from "@/lib/cart-context";
import { siteConfig } from "@/lib/site-config";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Kiln-Dried Logs, Coal & Kindling, Isle of Man`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Kiln-Dried Logs, Coal & Kindling, Isle of Man`,
    description: siteConfig.description,
    images: [
      {
        url: "/hero-bg-new.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} delivery van, Isle of Man`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Kiln-Dried Logs, Coal & Kindling`,
    description: siteConfig.description,
    images: ["/hero-bg-new.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/favicon/site.webmanifest",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  description: siteConfig.description,
  slogan: "Free island-wide delivery of kiln-dried logs, coal, and kindling across the Isle of Man.",
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}/hero-bg-new.jpg`,
  telephone: siteConfig.contact.phonePlaceholder,
  email: siteConfig.contact.emailPlaceholder,
  priceRange: "££",
  currenciesAccepted: "GBP",
  paymentAccepted: "Credit Card, Debit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.addressPlaceholder,
    addressRegion: "Isle of Man",
    addressCountry: "IM",
  },
  areaServed: {
    "@type": "Place",
    name: "Isle of Man",
  },
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Kiln-Dried Logs" } },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Coal" } },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Kindling & Firelighters" } },
  ],
  // openingHours is omitted entirely rather than emitting an invalid
  // placeholder string - schema.org requires a specific day/time format
  // (e.g. "Mo-Fr 09:00-17:00"), and invalid structured data is worse for
  // search/AI engines than simply not including the field.
  sameAs: [siteConfig.social.facebook].filter(
    (link) => link && link !== "#"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#202e25]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <CartProvider>
          <SiteChrome>{children}</SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
