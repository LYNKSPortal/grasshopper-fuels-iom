import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBanner } from "@/components/cta-banner";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Grasshopper Fuels' products, ordering, delivery, and fuel storage across the Isle of Man.",
  alternates: { canonical: "/faqs" },
};

const faqGroups = [
  {
    id: "products",
    title: "Products",
    items: [
      {
        question: "What products do you stock?",
        answer:
          "We supply kiln-dried logs, coal, and kindling, with accessories also available. [Full accessory range to be confirmed].",
      },
      {
        question: "What are kiln-dried logs?",
        answer:
          "Kiln-dried logs are dried in a controlled kiln to reduce their moisture content, helping them light more easily and burn more cleanly than unseasoned wood.",
      },
      {
        question: "What types of coal do you supply?",
        answer:
          "We supply Premium Kosy Glo Ovoids and Premium Oxbow Red Coal, both in 20kg bags.",
      },
      {
        question: "Can I ask for help choosing a product?",
        answer:
          "Yes, our team is happy to help you choose the right logs, coal, or kindling for your stove, fireplace, or fire pit.",
      },
    ],
  },
  {
    id: "ordering",
    title: "Ordering",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Use our contact page to send an order enquiry with your product, quantity, and delivery postcode. We'll respond to confirm the details.",
      },
      {
        question: "Does submitting the contact form confirm my order?",
        answer:
          "No. Submitting the form is an enquiry only. Your order is confirmed once Grasshopper Fuels responds to you directly.",
      },
      {
        question: "What information do you need from me?",
        answer:
          "Please include the product and quantity you're interested in, your contact details, and your delivery postcode.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    items: [
      {
        question: "Where do you deliver?",
        answer:
          "We arrange delivery to homes and businesses across the Isle of Man. Contact us to confirm delivery to your specific location.",
      },
      {
        question: "How are delivery charges calculated?",
        answer:
          "[Delivery charge calculation to be confirmed]. Please get in touch for up-to-date information relevant to your order.",
      },
      {
        question: "Can I choose a specific delivery time?",
        answer:
          "Delivery timing is arranged directly with you once your enquiry is confirmed. We don't guarantee specific days or time slots in advance.",
      },
    ],
  },
  {
    id: "stock",
    title: "Stock & Availability",
    items: [
      {
        question: "Can I collect my order?",
        answer:
          "No, collection is not available. All orders are delivered directly to your door across the Isle of Man, usually within three days.",
      },
      {
        question: "How much stock do you have?",
        answer:
          "We currently have 18 trailer loads of logs available. Contact us to check availability for coal and firewood accessories.",
      },
    ],
  },
  {
    id: "storage",
    title: "Storage & Use",
    items: [
      {
        question: "How should logs be stored?",
        answer:
          "Store logs in a dry, well-ventilated area, ideally off the ground and covered, to help maintain low moisture content until use.",
      },
      {
        question: "Can I use kiln-dried logs in any stove?",
        answer:
          "Kiln-dried logs are generally suitable for most wood-burning and multi-fuel stoves, open fireplaces, and fire pits. Check your appliance manufacturer's guidance if unsure.",
      },
      {
        question: "How should I store coal?",
        answer:
          "Store coal in a dry area away from the weather. [Further guidance to be confirmed].",
      },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  ),
};

export default function FaqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Answers to common questions about our products, ordering, delivery, and stock availability."
      />
      <Breadcrumbs items={[{ label: "FAQs" }]} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {faqGroups.map((group, idx) => (
            <FadeIn key={group.id} delay={idx * 0.05} className={idx > 0 ? "mt-16" : ""}>
              <SectionHeading
                eyebrow={`Category ${idx + 1} of ${faqGroups.length}`}
                title={group.title}
                align="left"
                className="mx-0 text-left"
              />
              <div className="mt-8">
                <FaqAccordion items={group.items} idPrefix={group.id} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <CtaBanner
        heading="Still Have Questions?"
        description="Get in touch with Grasshopper Fuels and we'll be happy to help."
      />
    </>
  );
}
