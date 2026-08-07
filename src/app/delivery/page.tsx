import type { Metadata } from "next";
import {
  Banknote,
  CalendarClock,
  PackageSearch,
  Truck,
  Warehouse,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { DeliveryInfoCard } from "@/components/delivery-info-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBanner } from "@/components/cta-banner";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Delivery",
  description:
    "Learn how delivery works with Grasshopper Fuels, delivering kiln-dried logs, coal, and kindling across the Isle of Man within 1\u20132 days.",
  alternates: { canonical: "/delivery" },
};

const deliverySteps = [
  {
    icon: Truck,
    title: "Island-Wide Delivery",
    description:
      "We deliver logs, coal, and kindling directly to homes and businesses across the Isle of Man. Delivery only \u2013 collection is not available.",
  },
  {
    icon: CalendarClock,
    title: "Fast Delivery",
    description:
      "Most orders are delivered, usually within 1\u20132 days of your enquiry being confirmed.",
  },
  {
    icon: Warehouse,
    title: "Access For Delivery Vehicles",
    description:
      "Please let us know about any access restrictions at your property so we can plan your delivery appropriately.",
  },
  {
    icon: Banknote,
    title: "Delivery Charges",
    description:
      "[Delivery charge information to be confirmed]. Charges may vary depending on location and order size.",
  },
];

const stockHighlights = [
  {
    icon: PackageSearch,
    title: "Logs In Stock",
    description: "18 trailer loads of logs currently available.",
  },
  {
    icon: Truck,
    title: "Delivery Turnaround",
    description: "Most orders are delivered, usually within 1\u20132 days.",
  },
];

const deliveryFaqs = [
  {
    question: "Do you deliver everywhere on the Isle of Man?",
    answer:
      "We arrange delivery across the Isle of Man. Please contact us to confirm delivery to your specific area.",
  },
  {
    question: "How much does delivery cost?",
    answer:
      "[Delivery charge information to be confirmed]. Get in touch and we can talk through the cost for your order.",
  },
  {
    question: "Is there a minimum order for delivery?",
    answer:
      "[Minimum order information to be confirmed]. Please contact us for current details.",
  },
  {
    question: "How quickly will my order arrive?",
    answer:
      "Most orders are delivered within 1\u20132 days of your enquiry being confirmed. We don't guarantee specific days or time slots in advance.",
  },
  {
    question: "Can I collect my order instead?",
    answer:
      "No, collection is not available. All orders are delivered directly to your door across the Isle of Man.",
  },
  {
    question: "What if my property has restricted vehicle access?",
    answer:
      "Please tell us about any access restrictions (narrow lanes, steps, parking limitations) when you enquire, so we can plan accordingly.",
  },
];

export default function DeliveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Delivery"
        title="Getting Your Order To You"
        description="Island-wide delivery across the Isle of Man, usually within 1\u20132 days. Delivery only \u2013 collection is not available."
      />
      <Breadcrumbs items={[{ label: "Delivery" }]} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-lg leading-relaxed text-[#202e25]/70">
              Grasshopper Fuels offers island-wide delivery for our range of
              kiln-dried logs, coal, and kindling, usually within 1&ndash;2
              days. Delivery only &mdash; collection is not available. Our
              team will confirm the details when you get in touch.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#f7faf9] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Delivery"
              title="How Delivery Works"
              align="left"
              className="mx-0 text-left"
            />
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {deliverySteps.map((step, idx) => (
              <FadeIn key={step.title} delay={idx * 0.08}>
                <DeliveryInfoCard
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Stock"
              title="Current Stock Availability"
              align="left"
              className="mx-0 text-left"
            />
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {stockHighlights.map((item, idx) => (
              <FadeIn key={item.title} delay={idx * 0.08}>
                <DeliveryInfoCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7faf9] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-dashed border-[#18af8a]/30 bg-white p-8 sm:p-10">
              <h3 className="text-xl font-bold text-[#202e25]">
                Areas Served &amp; Business Details
              </h3>
              <p className="mt-2 text-sm text-[#202e25]/60">
                This section can be updated with confirmed details as they
                become available.
              </p>
              <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#18af8a]">
                    Delivery Zones
                  </dt>
                  <dd className="mt-1 text-sm text-[#202e25]/70">
                    [Delivery zones to be confirmed]
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#18af8a]">
                    Delivery Schedule
                  </dt>
                  <dd className="mt-1 text-sm text-[#202e25]/70">
                    [Delivery schedule to be confirmed]
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#18af8a]">
                    Delivery Charges
                  </dt>
                  <dd className="mt-1 text-sm text-[#202e25]/70">
                    [Delivery charges to be confirmed]
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#18af8a]">
                    Delivery Turnaround
                  </dt>
                  <dd className="mt-1 text-sm text-[#202e25]/70">
                    Usually 1&ndash;2 days from enquiry confirmation
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#18af8a]">
                    Log Stock
                  </dt>
                  <dd className="mt-1 text-sm text-[#202e25]/70">
                    18 trailer loads currently available
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#18af8a]">
                    Minimum Order
                  </dt>
                  <dd className="mt-1 text-sm text-[#202e25]/70">
                    [Minimum order to be confirmed]
                  </dd>
                </div>
              </dl>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading eyebrow="FAQs" title="Delivery Questions" />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-12">
            <FaqAccordion items={deliveryFaqs} idPrefix="delivery-faq" />
          </FadeIn>
        </div>
      </section>

      <CtaBanner
        heading="Ready to Arrange Your Order?"
        description="Contact Grasshopper Fuels to arrange your island-wide delivery."
      />
    </>
  );
}
