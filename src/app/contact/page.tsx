import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Grasshopper Fuels with any questions about kiln-dried logs, coal, and kindling, or delivery across the Isle of Man.",
  alternates: { canonical: "/contact" },
};

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phonePlaceholder,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.contact.whatsapp,
    href: siteConfig.contact.whatsappLink,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.emailPlaceholder,
  },
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.contact.addressPlaceholder,
  },
  {
    icon: Clock,
    label: "Opening Hours",
    value: siteConfig.contact.hoursPlaceholder,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Have a question, or not sure what you need? Send us a message and we'll get back to you."
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <FadeIn className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#202e25]">
              Contact Details
            </h2>
            <p className="mt-2 text-sm text-[#202e25]/60">
              Prefer to speak with us directly? Reach out using the details
              below.
            </p>
            <div className="mt-8 space-y-5">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#18af8a]/10 text-[#18af8a]">
                    <detail.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#202e25]/45">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 text-sm font-medium text-[#202e25] hover:text-[#18af8a]"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium text-[#202e25]">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-black/5 bg-[#f7faf9] p-6">
              <h3 className="text-sm font-bold text-[#202e25]">
                Looking to Place an Order?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#202e25]/60">
                Head to our{" "}
                <a href="/order" className="font-semibold text-[#18af8a] underline underline-offset-4">
                  order page
                </a>{" "}
                to add products to your basket and check out with your
                delivery details.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-10">
              <h2 className="text-2xl font-extrabold text-[#202e25]">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-[#202e25]/60">
                Fill in the form below and our team will get back to you as
                soon as possible.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
