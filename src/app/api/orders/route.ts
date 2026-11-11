import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { createOrder, getOrders } from "@/lib/orders";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { computeOrderTotal, type PricedCartItem } from "@/lib/pricing";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await getOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "order",
    "address",
    "message",
  ] as const;

  for (const field of requiredFields) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return NextResponse.json(
        { error: `Missing or invalid field: ${field}` },
        { status: 400 }
      );
    }
  }

  let amountToCollect: string | null = null;
  if (Array.isArray(body.items)) {
    const items: PricedCartItem[] = body.items
      .filter(
        (item: unknown): item is Record<string, unknown> =>
          typeof item === "object" && item !== null
      )
      .map((item: Record<string, unknown>) => ({
        productSlug: String(item.productSlug ?? ""),
        variantLabel: String(item.variantLabel ?? ""),
        quantity: Number(item.quantity ?? 0),
      }));

    const { amount, allPriced } = computeOrderTotal(items);
    if (allPriced && amount > 0) {
      amountToCollect = amount.toFixed(2);
    }
  }

  const order = await createOrder({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    order: body.order,
    address: body.address,
    message: body.message,
    amountToCollect,
  });

  // Fire-and-forget: a failed/unconfigured email must never block the
  // customer's order from being created. waitUntil keeps the send running
  // on Vercel's serverless runtime even after the response has returned.
  waitUntil(sendOrderConfirmationEmail(order));

  return NextResponse.json({ order }, { status: 201 });
}
