import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { setVariantStock } from "@/lib/stock";

export async function PATCH(request: NextRequest) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const productSlug = body?.productSlug;
  const variantLabel = body?.variantLabel;
  const inStock = body?.inStock;

  if (
    typeof productSlug !== "string" ||
    typeof variantLabel !== "string" ||
    typeof inStock !== "boolean"
  ) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  await setVariantStock(productSlug, variantLabel, inStock);
  return NextResponse.json({ success: true });
}
