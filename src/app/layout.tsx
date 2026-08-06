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
    images: [{ url: "/logo.png", alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Kiln-Dried Logs, Coal & Kindling`,
    description: siteConfig.description,
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
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
