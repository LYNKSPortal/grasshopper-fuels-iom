import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

const points = [
  "Serving homes and businesses across the Isle of Man",
  "Dependable kiln-dried logs, coal, and kindling",
  "Fast, reliable delivery, usually within three days",
  "Friendly, knowledgeable local service",
];

export function HomeAboutPreview() {
  return (
    <section className="bg-[#f7faf9] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <FadeIn>
          <div className="relative h-80 overflow-hidden rounded-3xl shadow-xl sm:h-[26rem]">
            <Image
              src="/Kiln-Dried-Logs.jpg"
              alt="Grasshopper Fuels kiln-dried logs"
              fill
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <span className="inline-flex items-center rounded-full bg-[#18af8a]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#18af8a]">
            About Grasshopper Fuels
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#202e25] sm:text-4xl">
            Your Local Isle of Man Fuel Supplier
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#202e25]/65">
            Grasshopper Fuels is a local supplier serving homes and
            businesses throughout the Isle of Man with dependable fuel
            products. Whether you need premium kiln-dried logs, quality
            coal, or convenient kindling, we make it easy to keep warm with
            straightforward, fast delivery across the island.
          </p>

          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm font-medium text-[#202e25]/80">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#18af8a]" />
                {point}
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#202e25] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#18af8a]"
          >
            More About Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
