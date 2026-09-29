import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { BasketView } from "@/components/basket-view";

export const metadata: Metadata = {
  title: "Your Basket",
  description: "Review the items in your basket before proceeding to checkout.",
  alternates: { canonical: "/basket" },
};

export default function BasketPage() {
  return (
    <>
      <PageHero
        eyebrow="Your Basket"
        title="Review Your Order"
        description="Check the products and quantities below, then proceed to checkout with your delivery details."
      />
      <Breadcrumbs items={[{ label: "Basket" }]} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <BasketView />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
