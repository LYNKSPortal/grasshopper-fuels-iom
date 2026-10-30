import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions that apply when you use the Grasshopper Fuels website or place an order enquiry with us.",
  alternates: { canonical: "/terms-and-conditions" },
};

const LAST_UPDATED = "30 October 2026";

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "about-us",
    title: "1. About Us",
    body: (
      <p>
        This website is operated by {siteConfig.legalName} (company number{" "}
        {siteConfig.companyNumber}), trading as Grasshopper Fuels
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), of{" "}
        {siteConfig.contact.addressPlaceholder}. These terms and conditions
        govern your use of this website and any order enquiry you submit to
        us.
      </p>
    ),
  },
  {
    id: "acceptance",
    title: "2. Acceptance of These Terms",
    body: (
      <p>
        By using this website or submitting an enquiry through our contact
        form, basket, or checkout page, you agree to be bound by these terms
        and conditions. If you do not agree to these terms, please do not use
        this website.
      </p>
    ),
  },
  {
    id: "orders",
    title: "3. Orders and Enquiries",
    body: (
      <>
        <p>
          Our website allows you to browse our products, add items to a
          basket, and submit an order enquiry. Submitting an enquiry through
          the website{" "}
          <strong>does not create a binding contract of sale</strong> and
          does not automatically confirm your order. Our team will contact
          you directly, usually by phone or email, to confirm product
          availability, final pricing, delivery details, and payment.
        </p>
        <p className="mt-3">
          A contract between you and us for the sale of goods is only formed
          once we have confirmed your order to you. We reserve the right to
          decline any order enquiry, for example where stock is unavailable
          or we are unable to deliver to your location.
        </p>
      </>
    ),
  },
  {
    id: "pricing",
    title: "4. Pricing",
    body: (
      <>
        <p>
          We make every effort to ensure that prices shown on our website are
          accurate and up to date. Some products or variants are marked
          &ldquo;Price on enquiry&rdquo; and will be confirmed when you
          contact us. Prices are shown in pounds sterling (GBP).
        </p>
        <p className="mt-3">
          If we discover an error in the price of goods you have ordered, we
          will inform you as soon as possible and give you the option of
          reconfirming your order at the correct price or cancelling it.
        </p>
      </>
    ),
  },
  {
    id: "delivery",
    title: "5. Delivery",
    body: (
      <>
        <p>
          We offer free, island-wide delivery across the Isle of Man.
          Delivery is the only fulfilment method we offer &mdash; collection
          from our premises is not available.
        </p>
        <p className="mt-3">
          Delivery timing is arranged directly with you once your order
          enquiry is confirmed. We do not guarantee delivery on a specific
          day or within a specific time slot unless expressly agreed. Please
          tell us about any access restrictions at your property (for
          example narrow lanes, steps, or parking limitations) when you
          enquire, so we can plan your delivery appropriately.
        </p>
        <p className="mt-3">
          Risk in the goods passes to you once they have been delivered to
          the address you provided.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "6. Payment",
    body: (
      <p>
        Payment arrangements are confirmed directly with you once your order
        has been confirmed and before or at the time of delivery. We will
        let you know the available payment methods when we confirm your
        order.
      </p>
    ),
  },
  {
    id: "cancellations",
    title: "7. Cancellations, Returns, and Faulty Goods",
    body: (
      <>
        <p>
          You may cancel an order enquiry at any time before we have
          confirmed and dispatched it, by contacting us using the details
          below.
        </p>
        <p className="mt-3">
          If you receive goods that are faulty, damaged, or not as described,
          please contact us as soon as possible with details and, where
          possible, photographs. We will arrange a replacement, repair, or
          refund as appropriate, in line with your statutory consumer rights.
        </p>
        <p className="mt-3">
          As our products (kiln-dried logs, coal, and kindling) are
          perishable/consumable goods supplied to your specification and
          delivered quickly after confirmation, standard distance-selling
          cancellation (&ldquo;cooling off&rdquo;) periods may not apply once
          delivery has taken place. This does not affect your right to a
          remedy for faulty or damaged goods.
        </p>
      </>
    ),
  },
  {
    id: "use-of-website",
    title: "8. Use of This Website",
    body: (
      <>
        <p>
          You agree to use this website only for lawful purposes and in a
          way that does not infringe the rights of, or restrict or inhibit
          the use of, this website by anyone else.
        </p>
        <p className="mt-3">
          All content on this website, including text, images, logos, and
          design, is owned by or licensed to us and is protected by
          copyright and other intellectual property laws. You may not
          reproduce or reuse it without our prior written permission.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "9. Our Liability",
    body: (
      <p>
        We provide this website and its content on an &ldquo;as is&rdquo;
        basis and make no warranties, express or implied, as to its accuracy
        or suitability for any particular purpose. To the fullest extent
        permitted by law, we are not liable for any indirect or
        consequential loss arising from your use of this website. Nothing in
        these terms excludes or limits our liability for death or personal
        injury caused by our negligence, fraud, or any other liability that
        cannot be excluded or limited under applicable law.
      </p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to These Terms",
    body: (
      <p>
        We may update these terms and conditions from time to time, for
        example to reflect changes to our products, services, or legal
        requirements. The &ldquo;last updated&rdquo; date at the top of this
        page shows when they were last revised. The version in force at the
        time you submit an order enquiry will apply.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "11. Governing Law",
    body: (
      <p>
        These terms and conditions are governed by the laws of the Isle of
        Man, and any disputes will be subject to the exclusive jurisdiction
        of the courts of the Isle of Man.
      </p>
    ),
  },
  {
    id: "contact",
    title: "12. Contact Us",
    body: (
      <>
        <p>If you have any questions about these terms, please contact us:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Email:{" "}
            <a
              href={`mailto:${siteConfig.contact.emailPlaceholder}`}
              className="font-semibold text-[#18af8a] underline underline-offset-2"
            >
              {siteConfig.contact.emailPlaceholder}
            </a>
          </li>
          <li>Phone: {siteConfig.contact.phonePlaceholder}</li>
          <li>Post: {siteConfig.contact.addressPlaceholder}</li>
        </ul>
        <p className="mt-3">
          Or use our{" "}
          <Link href="/contact" className="font-semibold text-[#18af8a] underline underline-offset-2">
            contact page
          </Link>
          . For how we handle your personal information, see our{" "}
          <Link href="/privacy-policy" className="font-semibold text-[#18af8a] underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description={`The terms that apply when you use our website or submit an order enquiry. Last updated: ${LAST_UPDATED}.`}
      />
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-[#202e25]/50">
            Last updated: {LAST_UPDATED}
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.id}>
                <h2 className="text-xl font-extrabold text-[#202e25]">
                  {section.title}
                </h2>
                <div className="mt-3 text-base leading-relaxed text-[#202e25]/70">
                  {section.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
