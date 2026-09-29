import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Confirm your delivery details to submit your order enquiry to Grasshopper Fuels.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Confirm Your Details"
        description="Add your contact and delivery information to send us your order enquiry."
      />
      <Breadcrumbs items={[{ label: "Checkout" }]} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-10">
              <CheckoutForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
