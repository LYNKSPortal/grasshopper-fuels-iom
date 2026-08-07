import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Coal \u2013 Kosy Glo Ovoids & Oxbow Red Coal",
  description:
    "Premium Kosy Glo Ovoids and Oxbow Red Coal, supplied in 20kg bags, delivered across the Isle of Man.",
  keywords: getProduct("coal")!.keywords,
  alternates: { canonical: "/products/coal" },
  openGraph: {
    title: "Coal \u2013 Kosy Glo Ovoids & Oxbow Red Coal | Grasshopper Fuels",
    description:
      "Premium Kosy Glo Ovoids and Oxbow Red Coal, supplied in 20kg bags. Delivered across the Isle of Man.",
    images: [{ url: "/coal-new.jpg", width: 1200, height: 630, alt: "Premium Kosy Glo Ovoids and Oxbow Red Coal in 20kg bags" }],
  },
  twitter: { images: ["/coal-new.jpg"] },
};

export default function CoalPage() {
  const product = getProduct("coal")!;
  return <ProductDetail product={product} />;
}
