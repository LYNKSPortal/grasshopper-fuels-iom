import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for Grasshopper Fuels.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="This page is a placeholder for the full Grasshopper Fuels terms and conditions."
      />
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-[#202e25]/70">
            [Placeholder: Grasshopper Fuels&rsquo; full terms and conditions,
            covering orders, delivery, and payment, will be
            added here.]
          </p>
        </div>
      </section>
    </>
  );
}
