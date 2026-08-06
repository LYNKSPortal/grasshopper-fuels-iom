import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { mainNavLinks, productLinks, siteConfig } from "@/lib/site-config";
import { FacebookIcon, WhatsAppIcon } from "@/components/icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#202e25] text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="Grasshopper Fuels"
                width={180}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Local supplier of premium kiln-dried logs, coal, and kindling
              across the Isle of Man &mdash; delivered reliably to your
              door, usually within 1&ndash;2 days.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Grasshopper Fuels on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#18af8a]"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Grasshopper Fuels on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#18af8a]"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={`tel:${siteConfig.contact.phonePlaceholder.replace(/\s+/g, "")}`}
                aria-label="Call Grasshopper Fuels"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#18af8a]"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.emailPlaceholder}`}
                aria-label="Email Grasshopper Fuels"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#18af8a]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigate
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 transition-colors hover:text-[#63cd26]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Products
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 transition-colors hover:text-[#63cd26]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/delivery"
                  className="text-white/60 transition-colors hover:text-[#63cd26]"
                >
                  Delivery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#63cd26]" />
                <span>{siteConfig.contact.phonePlaceholder}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#63cd26]" />
                <span>{siteConfig.contact.emailPlaceholder}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#63cd26]" />
                <span>{siteConfig.contact.addressPlaceholder}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
            Registered in the Isle of Man, Company No. {siteConfig.companyNumber}.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
