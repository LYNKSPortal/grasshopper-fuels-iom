import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { OrderShop } from "@/components/order-shop";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Place an Order",
  description:
    "Browse and add kiln-dried logs, coal, and kindling to your basket, then check out with your delivery details.",
  keywords: siteConfig.keywords,
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Place an Order"
        title="Build Your Order"
        description="Add the products you need to your basket, then proceed to checkout with your delivery details."
      />
      <Breadcrumbs items={[{ label: "Order" }]} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <OrderShop products={products} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
