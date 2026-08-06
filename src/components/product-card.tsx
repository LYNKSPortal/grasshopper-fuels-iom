"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type ProductCardProps = {
  name: string;
  description: string;
  benefit: string;
  href: string;
  image: string;
};

export function ProductCard({
  name,
  description,
  benefit,
  href,
  image,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-x-4 top-4">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#18af8a] backdrop-blur-sm">
            {benefit}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-[#202e25]">{name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#202e25]/65">
          {description}
        </p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#18af8a] transition-colors hover:text-[#139775]"
        >
          View Product
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
