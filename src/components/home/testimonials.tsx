import { SectionHeading } from "@/components/section-heading";
import { TestimonialCard } from "@/components/testimonial-card";
import { FadeIn } from "@/components/motion/fade-in";

const testimonials = [
  {
    quote:
      "Been using these guys for logs and smokeless fuel for a while now. Always reliable and saves me having to drive down Douglas way to get stocked up. Friendly delivery too.",
    name: "Mark ******.",
    location: "Ramsey, Isle of Man",
  },
  {
    quote:
      "Messaged on Facebook in the morning and had the logs delivered over to Peel without any hassle. Great quality and a good sized load. Very pleased with them.",
    name: "Helen *****.",
    location: "Peel, Isle of Man",
  },
  {
    quote:
      "Excellent service all the way down south. I wasn't sure if delivery to Port Erin would be an issue but it wasn't at all. Quick reply, friendly driver and the logs burn really well.",
    name: "David *******.",
    location: "Port Erin, Isle of Man",
  },
  {
    quote:
      "First time ordering after finding the page on Facebook. Really impressed. Easy to order, turned up when they said they would and everything was nice and dry. Much easier than buying bags myself.",
    name: "Claire ******.",
    location: "Douglas, Isle of Man",
  },
  {
    quote:
      "Great local service. We go through a fair amount of logs when the weather turns and these have been spot on. Good dry wood, plenty of heat and no messing about with delivery.",
    name: "Paul ********.",
    location: "Laxey, Isle of Man",
  },
  {
    quote:
      "Ordered logs and kindling and couldn't fault the service. Delivered down to Castletown quickly and the chap was really friendly. Will be ordering again once we're running low.",
    name: "Emma *****.",
    location: "Castletown, Isle of Man",
  },
  {
    quote:
      "Really handy having someone who delivers out our way. Ordered by WhatsApp, got a quick response and everything arrived as arranged. Logs have been excellent in our stove.",
    name: "Tom *********.",
    location: "Kirk Michael, Isle of Man",
  },
  {
    quote:
      "Very happy with our order. Friendly service and no problem delivering to Ballasalla. The kiln dried logs light easily and give off loads of heat. Would happily recommend.",
    name: "Rachel *****.",
    location: "Ballasalla, Isle of Man",
  },
  {
    quote:
      "Brilliant service. We've tried a few places for firewood over the years and were impressed with these. Delivered right down to Port St Mary and everything was straightforward from ordering to delivery.",
    name: "Andrew ********.",
    location: "Port St Mary, Isle of Man",
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
            description="Real feedback from customers across the Isle of Man."
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
