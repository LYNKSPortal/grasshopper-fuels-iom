import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Coal",
  description:
    "Premium Kosy Glo Ovoids and Oxbow Red Coal, supplied in 20kg bags, delivered across the Isle of Man.",
  alternates: { canonical: "/products/coal" },
};

export default function CoalPage() {
  const product = getProduct("coal")!;
  return <ProductDetail product={product} />;
}
