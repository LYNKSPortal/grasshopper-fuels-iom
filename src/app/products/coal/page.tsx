import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/products";
import { getProductWithLiveStock } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Coal \u2013 Kosy Glo Ovoids",
  description:
    "Premium Kosy Glo Ovoids, supplied in 20kg bags, delivered across the Isle of Man.",
  keywords: getProduct("coal")!.keywords,
  alternates: { canonical: "/products/coal" },
  openGraph: {
    title: "Coal \u2013 Kosy Glo Ovoids | Grasshopper Fuels",
    description:
      "Premium Kosy Glo Ovoids, supplied in 20kg bags. Delivered across the Isle of Man.",
    images: [{ url: "/coal-new.jpg", width: 1200, height: 630, alt: "Premium Kosy Glo Ovoids in 20kg bags" }],
  },
  twitter: { images: ["/coal-new.jpg"] },
};

export const dynamic = "force-dynamic";

export default async function CoalPage() {
  const product = (await getProductWithLiveStock("coal"))!;
  return <ProductDetail product={product} />;
}
