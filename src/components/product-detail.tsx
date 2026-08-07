import Link from "next/link";
import { ArrowRight, CheckCircle2, PackageCheck, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { ProductCard } from "@/components/product-card";
import { CtaBanner } from "@/components/cta-banner";
import { FadeIn } from "@/components/motion/fade-in";
import { products, type Product } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";

export function ProductDetail({ product }: { product: Product }) {
  const related = products.filter((p) => p.slug !== product.slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: `${siteConfig.url}${product.image}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "GBP",
      url: `${siteConfig.url}/products/${product.slug}`,
      areaServed: {
        "@type": "Place",
        name: "Isle of Man",
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteConfig.url}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteConfig.url}/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="relative overflow-hidden bg-[#202e25] pb-24 pt-36 sm:pt-40">
        <div className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#202e25]/50 via-[#202e25]/80 to-[#202e25]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#63cd26]">
            Product
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            {product.shortDescription}
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: product.name }]} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-lg leading-relaxed text-[#202e25]/70">
              {product.intro}
            </p>
          </FadeIn>
          {product.variants && (
            <FadeIn delay={0.1} className="mt-8 flex flex-wrap gap-3">
              {product.variants.map((variant) => (
                <span
                  key={variant}
                  className="inline-flex items-center rounded-full bg-[#18af8a]/10 px-4 py-2 text-sm font-semibold text-[#18af8a]"
                >
                  {variant}
                </span>
              ))}
            </FadeIn>
          )}
          {product.stockNote && (
            <FadeIn delay={0.15} className="mt-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#63cd26]/10 px-4 py-2 text-sm font-semibold text-[#202e25]">
                {product.stockNote}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      <section className="bg-[#f7faf9] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading eyebrow="Benefits" title="Why Choose This Product" />
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.benefits.map((benefit, idx) => (
              <FadeIn key={benefit.title} delay={idx * 0.08}>
                <div className="h-full rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-[#18af8a]" />
                  <h3 className="mt-4 text-base font-bold text-[#202e25]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#202e25]/60">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Suitable Uses"
              title="Where This Product Works Best"
              align="left"
              className="mx-0 text-left"
            />
            <ul className="mt-8 space-y-3">
              {product.suitableUses.map((use) => (
                <li
                  key={use}
                  className="flex items-start gap-3 text-sm font-medium text-[#202e25]/75"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#18af8a]" />
                  {use}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-3xl border border-black/5 bg-[#f7faf9] p-8">
              <h3 className="text-lg font-bold text-[#202e25]">
                Delivery Information
              </h3>
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#18af8a]" />
                  <p className="text-sm text-[#202e25]/65">
                    Delivery only &mdash; collection is not available. See
                    our{" "}
                    <Link href="/delivery" className="font-semibold text-[#18af8a] underline underline-offset-2">
                      Delivery
                    </Link>{" "}
                    page for details.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#18af8a]" />
                  <p className="text-sm text-[#202e25]/65">
                    Delivery is arranged across the Isle of Man, usually
                    within three days. Charges, pack sizes, and stock
                    availability are confirmed at the time of enquiry.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#18af8a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#139775]"
              >
                Enquire About This Product
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#f7faf9] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading eyebrow="Gallery" title="A Closer Look" />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="relative mt-12 h-[28rem] overflow-hidden rounded-2xl shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading eyebrow="FAQs" title={`${product.name} Questions`} />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-12">
            <FaqAccordion items={product.faqs} idPrefix={product.slug} />
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#f7faf9] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading eyebrow="You May Also Like" title="Related Products" />
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {related.map((p, idx) => (
              <FadeIn key={p.slug} delay={idx * 0.1}>
                <ProductCard
                  name={p.name}
                  description={p.shortDescription}
                  benefit={p.benefit}
                  image={p.image}
                  href={`/products/${p.slug}`}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading={`Ready to Order ${product.name}?`}
        description="Send us an enquiry and our team will confirm availability and delivery options."
      />
    </>
  );
}
