import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Package, ShieldCheck, Truck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { FeatureCard } from "@/components/feature-card";
import { CtaBanner } from "@/components/cta-banner";
import { FadeIn } from "@/components/motion/fade-in";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse kiln-dried logs, coal, and firewood accessories from Grasshopper Fuels, delivered across the Isle of Man.",
  alternates: { canonical: "/products" },
};

const benefits = [
  {
    icon: Flame,
    title: "Premium Quality",
    description: "Products chosen for reliable, consistent household heat.",
  },
  {
    icon: Truck,
    title: "Delivery Only",
    description: "We deliver directly to your door across the Isle of Man, usually within 1\u20132 days.",
  },
  {
    icon: ShieldCheck,
    title: "Friendly Guidance",
    description: "Not sure what you need? We're happy to help you choose.",
  },
  {
    icon: Package,
    title: "Straightforward Ordering",
    description: "Simple enquiry process to get your order underway.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Kiln-Dried Logs, Coal & Kindling"
        description="Premium solid-fuel products for homes and businesses across the Isle of Man, delivered directly to your door."
      />
      <Breadcrumbs items={[{ label: "Products" }]} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Browse The Range"
              title="Quality Solid Fuel For Every Home"
              description="Whether you're stocking up for winter or need a top-up delivery, we supply dependable kiln-dried logs, coal, and kindling across the island."
              align="left"
              className="mx-0 text-left"
            />
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, idx) => (
              <FadeIn key={product.slug} delay={idx * 0.08}>
                <ProductCard
                  name={product.name}
                  description={product.shortDescription}
                  benefit={product.benefit}
                  image={product.image}
                  href={`/products/${product.slug}`}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7faf9] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Product Benefits"
              title="Why Choose Grasshopper Fuels"
            />
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, idx) => (
              <FadeIn key={benefit.title} delay={idx * 0.08}>
                <FeatureCard
                  icon={<benefit.icon className="h-6 w-6" strokeWidth={2} />}
                  title={benefit.title}
                  description={benefit.description}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-br from-[#18af8a] to-[#63cd26] px-8 py-10 text-center sm:flex-row sm:text-left">
              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  Island-Wide Delivery Available
                </h3>
                <p className="mt-2 max-w-xl text-white/90">
                  We deliver directly to your door anywhere across the Isle
                  of Man, usually within 1&ndash;2 days.
                </p>
              </div>
              <Link
                href="/delivery"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#18af8a] transition-transform hover:-translate-y-0.5"
              >
                Delivery Information
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaBanner
        heading="Not Sure What You Need?"
        description="Get in touch with Grasshopper Fuels and we'll help you choose the right products for your home."
      />
    </>
  );
}
