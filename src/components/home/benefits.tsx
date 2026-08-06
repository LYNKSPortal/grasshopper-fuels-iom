import {
  BadgeCheck,
  CalendarClock,
  Handshake,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FeatureCard } from "@/components/feature-card";
import { FadeIn } from "@/components/motion/fade-in";

const benefits = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Carefully sourced logs, coal, and kindling for a dependable burn.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Island-wide delivery arranged to suit your location.",
  },
  {
    icon: CalendarClock,
    title: "1\u20132 Day Delivery",
    description: "Most orders are delivered within 1\u20132 days of enquiry.",
  },
  {
    icon: BadgeCheck,
    title: "Competitive Prices",
    description: "Straightforward pricing on all our solid-fuel products.",
  },
  {
    icon: Users,
    title: "Locally Trusted",
    description: "Proud to serve homes and businesses across the Isle of Man.",
  },
  {
    icon: Handshake,
    title: "Friendly Service",
    description: "Our team is on hand to help you choose the right product.",
  },
];

export function HomeBenefits() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Built On Quality & Trust"
            description="Here's what you can expect every time you order from Grasshopper Fuels."
          />
        </FadeIn>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => (
            <FadeIn key={benefit.title} delay={idx * 0.06}>
              <FeatureCard
                icon={<benefit.icon className="h-6 w-6" strokeWidth={2} />}
                title={benefit.title}
                description={benefit.description}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
