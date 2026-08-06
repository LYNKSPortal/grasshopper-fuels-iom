import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, MapPin, Truck } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

export function HomeDeliveryPreview() {
  return (
    <section className="relative overflow-hidden bg-[#202e25] py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <FadeIn>
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#63cd26]">
            Fast Island-Wide Delivery
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Reliable Delivery Across the Isle of Man
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
            We deliver directly to your home or business anywhere on the
            island, usually within 1&ndash;2 days.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-white/85">
              <Truck className="h-5 w-5 text-[#63cd26]" />
              <span className="text-sm font-medium">Delivery arranged across the Isle of Man</span>
            </div>
            <div className="flex items-center gap-3 text-white/85">
              <CalendarClock className="h-5 w-5 text-[#63cd26]" />
              <span className="text-sm font-medium">1&ndash;2 day delivery turnaround</span>
            </div>
            <div className="flex items-center gap-3 text-white/85">
              <MapPin className="h-5 w-5 text-[#63cd26]" />
              <span className="text-sm font-medium">Proudly based on and serving the Isle of Man</span>
            </div>
          </div>

          <Link
            href="/delivery"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#63cd26] px-8 py-3.5 text-sm font-bold text-[#202e25] transition-transform hover:-translate-y-0.5 hover:bg-[#52ac1e]"
          >
            Delivery Information
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-full border border-white/10 bg-white/5">
            <div className="absolute inset-4 rounded-full border border-dashed border-white/15" />
            <div className="absolute inset-8 rounded-full border border-dashed border-white/10" />
            <div className="relative h-full w-full">
              <Image
                src="/iom-map.png"
                alt="Map of the Isle of Man"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
