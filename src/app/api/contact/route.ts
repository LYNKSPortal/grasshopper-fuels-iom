import { NextRequest, NextResponse } from "next/server";
import { createContactMessage } from "@/lib/contact";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const requiredFields = ["firstName", "lastName", "email", "phone", "message"] as const;

  for (const field of requiredFields) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return NextResponse.json(
        { error: `Missing or invalid field: ${field}` },
        { status: 400 }
      );
    }
  }

  const message = await createContactMessage({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    message: body.message,
  });

  return NextResponse.json({ message }, { status: 201 });
}
