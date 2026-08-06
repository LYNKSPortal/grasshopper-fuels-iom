import { SectionHeading } from "@/components/section-heading";
import { TestimonialCard } from "@/components/testimonial-card";
import { FadeIn } from "@/components/motion/fade-in";

const testimonials = [
  {
    quote:
      "Placeholder review: The logs lit easily and burned really well all evening. Delivery was straightforward too.",
    name: "Placeholder Customer",
    location: "Douglas, Isle of Man",
  },
  {
    quote:
      "Placeholder review: Good quality coal and friendly service when my order was delivered. Would recommend.",
    name: "Placeholder Customer",
    location: "Ramsey, Isle of Man",
  },
  {
    quote:
      "Placeholder review: Easy to arrange, and the kindling made getting the fire started so much simpler.",
    name: "Placeholder Customer",
    location: "Castletown, Isle of Man",
  },
];

export function HomeTestimonials() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Customer Feedback"
            title="What Customers Say"
            description="Illustrative placeholder reviews shown for demonstration purposes. Real customer testimonials can be added once available."
          />
        </FadeIn>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <TestimonialCard quote={t.quote} name={t.name} location={t.location} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
