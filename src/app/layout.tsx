import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}/hero-bg-new.jpg`,
  telephone: siteConfig.contact.phonePlaceholder,
  email: siteConfig.contact.emailPlaceholder,
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
  openingHours: siteConfig.contact.hoursPlaceholder,
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
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
