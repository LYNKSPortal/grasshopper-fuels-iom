"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: "light" | "dark";
};

export function FeatureCard({
  icon,
  title,
  description,
  variant = "light",
}: FeatureCardProps) {
  const isDark = variant === "dark";
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={
        isDark
          ? "rounded-2xl border border-white/10 bg-white/5 p-6"
          : "rounded-2xl border border-black/5 bg-white p-6 shadow-sm hover:shadow-md"
      }
    >
      <span
        className={
          isDark
            ? "flex h-12 w-12 items-center justify-center rounded-xl bg-[#63cd26]/20 text-[#63cd26]"
            : "flex h-12 w-12 items-center justify-center rounded-xl bg-[#18af8a]/10 text-[#18af8a]"
        }
      >
        {icon}
      </span>
      <h3
        className={
          isDark
            ? "mt-4 text-lg font-bold text-white"
            : "mt-4 text-lg font-bold text-[#202e25]"
        }
      >
        {title}
      </h3>
      <p
        className={
          isDark
            ? "mt-2 text-sm leading-relaxed text-white/60"
            : "mt-2 text-sm leading-relaxed text-[#202e25]/60"
        }
      >
        {description}
      </p>
    </motion.div>
  );
}
