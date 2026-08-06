import { CalendarCheck, MessageCircle, ShoppingBasket } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

const steps = [
  {
    icon: ShoppingBasket,
    number: "01",
    title: "Choose Your Fuel",
    description: "Browse our kiln-dried logs, coal, and kindling to find what suits your home.",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Contact Grasshopper Fuels",
    description: "Send an enquiry with your requirements and we'll confirm availability.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Get It Delivered",
    description: "We'll arrange delivery to your home or business, usually within 1\u20132 days.",
  },
];

export function HomeProcess() {
  return (
    <section className="bg-[#f7faf9] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="How It Works"
            title="Ordering Is Simple"
            description="Getting your logs, coal, or kindling is quick and hassle-free."
          />
        </FadeIn>

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-[#18af8a]/30 to-transparent sm:block"
          />
          {steps.map((step, idx) => (
            <FadeIn key={step.title} delay={idx * 0.12}>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md">
                    <step.icon className="h-8 w-8 text-[#18af8a]" />
                  </span>
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63cd26] text-xs font-extrabold text-[#202e25]">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#202e25]">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#202e25]/60">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
