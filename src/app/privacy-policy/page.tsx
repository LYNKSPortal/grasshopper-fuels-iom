import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Grasshopper Fuels collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

const LAST_UPDATED = "30 October 2026";

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    body: (
      <>
        <p>
          This website is operated by {siteConfig.legalName} (company number{" "}
          {siteConfig.companyNumber}), trading as Grasshopper Fuels (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, or &ldquo;our&rdquo;), of{" "}
          {siteConfig.contact.addressPlaceholder}.
        </p>
        <p className="mt-3">
          We are the data controller responsible for your personal information
          in connection with this website. This policy explains what
          information we collect, how we use it, and the choices and rights
          you have.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    body: (
      <>
        <p>We collect personal information that you give us directly, including:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Contact and order enquiries</strong> &mdash; when you submit
            an enquiry through our contact form, order basket, or checkout
            page, we collect your name, email address, phone number, delivery
            address, order details, and any message or delivery notes you
            provide.
          </li>
          <li>
            <strong>Communications</strong> &mdash; if you contact us by phone,
            email, or WhatsApp, we may keep a record of that correspondence to
            help resolve your enquiry.
          </li>
        </ul>
        <p className="mt-3">
          We do not currently collect or process any payment card details
          through this website. Orders submitted online are enquiries only
          &mdash; our team contacts you directly to confirm availability,
          pricing, and delivery, and payment is arranged separately at that
          point.
        </p>
        <p className="mt-3">
          We also use your basket (the items you add before checking out),
          which is stored only in your own browser&rsquo;s local storage. This
          information stays on your device and is not sent to us until you
          submit an enquiry through the checkout page.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "3. How We Use Your Information",
    body: (
      <>
        <p>We use the personal information we collect to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Respond to your enquiry and confirm order availability, pricing, and delivery details.</li>
          <li>Arrange and carry out delivery of your order across the Isle of Man.</li>
          <li>Provide customer service and respond to questions or complaints.</li>
          <li>Keep records for accounting, tax, and legal purposes.</li>
          <li>Improve our website and the products and services we offer.</li>
        </ul>
        <p className="mt-3">
          Our legal basis for this processing is that it is necessary to take
          steps, at your request, towards entering into a contract with you
          (responding to your order enquiry), and our legitimate interest in
          running our business and providing good customer service. Where we
          are required to keep records for legal or accounting reasons, our
          legal basis is compliance with a legal obligation.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "4. Who We Share Your Information With",
    body: (
      <>
        <p>
          We do not sell or rent your personal information to third parties.
          We only share it with:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Trusted service providers who host our website and database on
            our behalf (currently Vercel and Amazon Web Services), strictly
            so they can provide those services to us.
          </li>
          <li>
            Professional advisers (such as our accountant), where necessary.
          </li>
          <li>
            Law enforcement or regulatory authorities, where we are required
            to do so by law.
          </li>
        </ul>
        <p className="mt-3">
          Where our service providers are based outside the Isle of Man, we
          take reasonable steps to ensure your information is protected to a
          standard consistent with Isle of Man data protection law.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "5. How Long We Keep Your Information",
    body: (
      <p>
        We keep order and enquiry information for as long as necessary to
        fulfil the purposes described in this policy, including any
        applicable legal, tax, or accounting requirements (financial records
        are typically kept for at least six years). We periodically review
        the information we hold and delete or anonymise it when it is no
        longer needed.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies and Local Storage",
    body: (
      <>
        <p>
          We use the following on our website:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Basket/local storage</strong> &mdash; your selected
            products and quantities are stored in your browser&rsquo;s local
            storage so your basket is remembered between visits. This data
            stays on your device.
          </li>
          <li>
            <strong>Admin session cookie</strong> &mdash; a strictly necessary,
            secure cookie used only to keep our staff signed in to the order
            management area of the site. It is not used for tracking or
            advertising.
          </li>
        </ul>
        <p className="mt-3">
          We do not currently use analytics, advertising, or third-party
          tracking cookies on this website. If this changes in future, we
          will update this policy and request your consent where required.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your Rights",
    body: (
      <>
        <p>
          Under Isle of Man data protection law (which applies the UK GDPR),
          you have the right to:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Ask us what personal information we hold about you and request a copy of it.</li>
          <li>Ask us to correct inaccurate or incomplete information.</li>
          <li>Ask us to delete your information, where applicable.</li>
          <li>Ask us to restrict or object to how we use your information.</li>
          <li>Ask us to provide your information in a portable format.</li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, please contact us using the
          details below. If you are not satisfied with our response, you
          have the right to complain to the Isle of Man Information
          Commissioner, P.O. Box 69, Douglas, Isle of Man, IM99 1EQ (
          <a href="mailto:ask@inforights.im" className="font-semibold text-[#18af8a] underline underline-offset-2">
            ask@inforights.im
          </a>
          ).
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "8. How We Protect Your Information",
    body: (
      <p>
        We take reasonable technical and organisational measures to protect
        the personal information we hold, including encrypted connections
        between your browser and our website, and database access that is
        restricted to authorised systems only. No method of transmission or
        storage is completely secure, but we work to protect your
        information to an appropriate standard.
      </p>
    ),
  },
  {
    id: "children",
    title: "9. Children&rsquo;s Privacy",
    body: (
      <p>
        Our website and services are intended for adults. We do not
        knowingly collect personal information from children.
      </p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    body: (
      <p>
        We may update this policy from time to time, for example to reflect
        changes to our website or legal requirements. The &ldquo;last
        updated&rdquo; date at the top of this page shows when it was last
        revised.
      </p>
    ),
  },
  {
    id: "contact",
    title: "11. Contact Us",
    body: (
      <>
        <p>
          If you have any questions about this policy or how we handle your
          personal information, please contact us:
        </p>
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
          .
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How we collect, use, and protect your personal information. Last updated: ${LAST_UPDATED}.`}
      />
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
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
