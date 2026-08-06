import { CalendarClock, Flame, MapPinned, Truck } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

const items = [
  {
    icon: Truck,
    title: "Island-Wide Delivery",
    description: "Delivery arranged to homes and businesses across the Isle of Man.",
  },
  {
    icon: CalendarClock,
    title: "1\u20132 Day Delivery",
    description: "Fast, reliable delivery turnaround across the island.",
  },
  {
    icon: Flame,
    title: "Premium Kiln-Dried Logs",
    description: "Dried for a cleaner, more consistent burn every time.",
  },
  {
    icon: MapPinned,
    title: "Quality Coal Products",
    description: "Reliable house coal to suit a range of household needs.",
  },
];

export function HomeTrustBar() {
  return (
    <section className="relative z-10 -mt-16 sm:-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-3xl border border-black/5 bg-white p-4 shadow-xl sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
          {items.map((item, idx) => (
            <FadeIn key={item.title} delay={idx * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-2xl p-4 transition-colors hover:bg-[#18af8a]/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#18af8a] to-[#63cd26] text-white">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#202e25]">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#202e25]/55">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
