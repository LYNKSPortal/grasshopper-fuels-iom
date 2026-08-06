"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const trustIndicators = [
  "Island-Wide Delivery",
  "1\u20132 Day Delivery",
  "Premium Quality Fuel",
  "Friendly Local Service",
];

export function HomeHero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#202e25] pt-20">
      <div className="absolute inset-0">
        <Image
          src="/hero-bg-new.jpg"
          alt="The Grasshopper Fuels delivery van, supplying kiln-dried logs and coal across the Isle of Man"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#202e25]/95 via-[#202e25]/85 to-[#202e25]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#202e25] via-[#202e25]/10 to-transparent" />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 hidden h-96 w-96 rounded-full bg-[#63cd26]/25 blur-3xl sm:block"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 hidden h-72 w-72 rounded-full bg-[#18af8a]/25 blur-3xl sm:block"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#63cd26] backdrop-blur-sm"
          >
            Trusted Isle of Man Fuel Supplier
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Premium Kiln-Dried Logs &amp; Coal Across the Isle of Man
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            High-quality kiln-dried firewood, coal, and kindling delivered
            reliably across the Isle of Man, usually within 1&ndash;2 days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#63cd26] px-8 py-4 text-base font-bold text-[#202e25] shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#52ac1e] active:translate-y-0"
            >
              Order Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              Browse Products
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4"
          >
            {trustIndicators.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-white/85"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#63cd26]" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
