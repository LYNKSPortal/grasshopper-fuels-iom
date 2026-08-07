import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Handshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { FeatureCard } from "@/components/feature-card";
import { CtaBanner } from "@/components/cta-banner";
import { FadeIn } from "@/components/motion/fade-in";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Grasshopper Fuels, a local supplier of kiln-dried logs, coal, and kindling serving homes and businesses across the Isle of Man.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Quality Products",
    description:
      "We're committed to supplying dependable kiln-dried logs, coal, and kindling.",
  },
  {
    icon: Handshake,
    title: "Friendly Service",
    description:
      "Our team is on hand to help you choose the right products for your home.",
  },
  {
    icon: MapPin,
    title: "Proudly Local",
    description:
      "Based on and serving the Isle of Man, with a focus on our local community.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Reliable delivery arranged directly to your door across the island, usually within three days.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Grasshopper Fuels"
        title="Your Local Isle of Man Fuel Supplier"
        description="Dependable kiln-dried logs, coal, and kindling for homes and businesses across the island."
      />
      <Breadcrumbs items={[{ label: "About" }]} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Story"
              title="Committed to Keeping the Island Warm"
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[#202e25]/70">
              <p>
                Grasshopper Fuels Limited has been serving homes and
                businesses throughout the Isle of Man since our incorporation
                on 19 May 2010, supplying premium kiln-dried logs, coal, and
                kindling.
              </p>
              <p>
                We supply solid-fuel products for a range of everyday needs,
                from stoves and open fires to outdoor fire pits, with the
                aim of making it simple to keep your home warm &mdash;
                delivered directly to your door.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#f7faf9] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading eyebrow="Our Values" title="What We Stand For" />
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => (
              <FadeIn key={value.title} delay={idx * 0.08}>
                <FeatureCard
                  icon={<value.icon className="h-6 w-6" strokeWidth={2} />}
                  title={value.title}
                  description={value.description}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <div className="relative h-80 overflow-hidden rounded-3xl shadow-xl sm:h-[26rem]">
              <Image
                src="/Kiln-Dried-Logs.jpg"
                alt="Grasshopper Fuels kiln-dried logs"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center rounded-full bg-[#18af8a]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#18af8a]">
              <Leaf className="mr-2 h-3.5 w-3.5" />
              Locally Focused
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#202e25] sm:text-4xl">
              Serving Homes &amp; Businesses Across the Island
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#202e25]/65">
              From Douglas to Ramsey, Castletown to Peel, we aim to make it
              easy for customers across the Isle of Man to access reliable
              solid-fuel products &mdash; whenever they need them, and
              however they&rsquo;d like to receive them.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#202e25] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#18af8a]"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <CtaBanner
        heading="Questions About Grasshopper Fuels?"
        description="We're happy to help with product advice and delivery information."
      />
    </>
  );
}
