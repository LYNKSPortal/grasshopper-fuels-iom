import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/products";
import { getProductWithLiveStock } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Gift Card \u2013 £25 to £500",
  description:
    "Give the gift of a warm home. Grasshopper Fuels gift cards from £25 to £500, redeemable against any order, delivered across the Isle of Man.",
  keywords: getProduct("gift-card")!.keywords,
  alternates: { canonical: "/products/gift-card" },
  openGraph: {
    title: "Gift Cards | Grasshopper Fuels",
    description:
      "Grasshopper Fuels gift cards from £25 to £500, redeemable against any order across the Isle of Man.",
    images: [{ url: "/gift-card.png", width: 800, height: 800, alt: "Grasshopper Fuels gift card" }],
  },
  twitter: { images: ["/gift-card.png"] },
};

export const dynamic = "force-dynamic";

export default async function GiftCardPage() {
  const product = (await getProductWithLiveStock("gift-card"))!;
  return <ProductDetail product={product} />;
}
