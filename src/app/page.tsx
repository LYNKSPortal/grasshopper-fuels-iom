import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero";
import { HomeTrustBar } from "@/components/home/trust-bar";
import { HomeProductPreview } from "@/components/home/product-preview";
import { HomeAboutPreview } from "@/components/home/about-preview";
import { HomeDeliveryPreview } from "@/components/home/delivery-preview";
import { HomeBenefits } from "@/components/home/benefits";
import { HomeProcess } from "@/components/home/process";
import { HomeTestimonials } from "@/components/home/testimonials";
import { HomeFaqPreview } from "@/components/home/faq-preview";
import { CtaBanner } from "@/components/cta-banner";

export const metadata: Metadata = {
  title: "Kiln-Dried Logs, Coal & Kindling, Isle of Man",
  description:
    "Grasshopper Fuels supplies premium kiln-dried logs, coal, and kindling across the Isle of Man, with reliable island-wide delivery within three days.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeTrustBar />
      <HomeProductPreview />
      <HomeAboutPreview />
      <HomeDeliveryPreview />
      <HomeBenefits />
      <HomeProcess />
      <HomeTestimonials />
      <HomeFaqPreview />
      <CtaBanner
        heading="Ready to Keep Your Home Warm?"
        description="Contact Grasshopper Fuels to discuss products, availability, and delivery."
        primaryLabel="Order Now"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
