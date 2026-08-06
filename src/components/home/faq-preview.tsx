import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { FadeIn } from "@/components/motion/fade-in";

const homeFaqs = [
  {
    question: "Do you deliver throughout the Isle of Man?",
    answer:
      "Yes, we arrange delivery to homes and businesses across the Isle of Man. Visit our Delivery page for more information.",
  },
  {
    question: "How quickly will my order arrive?",
    answer:
      "Most orders are delivered within 1\u20132 days of your enquiry being confirmed. Delivery only \u2013 collection is not available.",
  },
  {
    question: "What are kiln-dried logs?",
    answer:
      "Kiln-dried logs are dried in a controlled kiln to reduce moisture content, helping them light easily and burn more cleanly than unseasoned wood.",
  },
  {
    question: "What types of coal do you supply?",
    answer:
      "We supply Premium Kosy Glo Ovoids and Premium Oxbow Red Coal, both in 20kg bags.",
  },
];

export function HomeFaqPreview() {
  return (
    <section className="bg-[#f7faf9] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Common Questions"
            title="Frequently Asked Questions"
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <FaqAccordion items={homeFaqs} idPrefix="home-faq" />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#18af8a] px-8 py-3.5 text-sm font-bold text-[#18af8a] transition-colors hover:bg-[#18af8a] hover:text-white"
            >
              View All FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
