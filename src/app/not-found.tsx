import Link from "next/link";
import { ArrowRight, Flame, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-24">
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#18af8a] to-[#63cd26]">
          <Flame className="h-8 w-8 text-white" />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-[#18af8a]">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#202e25] sm:text-4xl">
          We Couldn&rsquo;t Find That Page
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#202e25]/60">
          The page you&rsquo;re looking for may have moved or no longer exists.
          Let&rsquo;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18af8a] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#139775]"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#18af8a] px-7 py-3.5 text-sm font-bold text-[#18af8a] transition-colors hover:bg-[#18af8a] hover:text-white"
          >
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
