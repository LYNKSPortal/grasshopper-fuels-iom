import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrders } from "@/lib/orders";
import { isAdminAuthenticated } from "@/lib/admin-auth";

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

  const order = await createOrder({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    order: body.order,
    address: body.address,
    message: body.message,
  });

  return NextResponse.json({ order }, { status: 201 });
}
