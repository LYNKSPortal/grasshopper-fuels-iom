import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

type CtaBannerProps = {
  heading: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBanner({
  heading,
  description,
  primaryLabel = "Order Now",
  primaryHref = "/contact",
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact",
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-[#202e25] py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#18af8a]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#63cd26]/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={primaryHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#63cd26] px-8 py-4 text-base font-bold text-[#202e25] shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#52ac1e] active:translate-y-0 sm:w-auto"
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            <Phone className="h-4 w-4" />
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
