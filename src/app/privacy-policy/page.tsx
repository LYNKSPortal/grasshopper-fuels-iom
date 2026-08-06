import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Grasshopper Fuels.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="This page is a placeholder for the full Grasshopper Fuels privacy policy."
      />
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-[#202e25]/70">
            [Placeholder: Grasshopper Fuels&rsquo; full privacy policy, covering
            how customer information is collected, used, and stored, will
            be added here.]
          </p>
        </div>
      </section>
    </>
  );
}
