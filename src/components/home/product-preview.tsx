import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { FadeIn } from "@/components/motion/fade-in";
import { products } from "@/lib/products";

export function HomeProductPreview() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Products"
            title="Everything You Need to Stay Warm"
            description="From premium kiln-dried logs to reliable coal and easy-lighting kindling, browse our range of solid-fuel products."
          />
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, idx) => (
            <FadeIn key={product.slug} delay={idx * 0.1}>
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

        <FadeIn delay={0.2}>
          <div className="mt-14 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#18af8a] px-8 py-3.5 text-sm font-bold text-[#18af8a] transition-colors hover:bg-[#18af8a] hover:text-white"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
