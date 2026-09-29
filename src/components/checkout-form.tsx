"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getEffectiveUnitPrice, useCart } from "@/lib/cart-context";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

export function CheckoutForm() {
  const { items, subtotal, hasUnpricedItems, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const orderSummary = useMemo(
    () =>
      items
        .map((item) => `${item.quantity} x ${item.variantLabel}`)
        .join(", "),
    [items]
  );

  function validate(): boolean {
    const next: Errors = {};
    if (!form.firstName.trim()) next.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) next.lastName = "Please enter your last name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) next.phone = "Please enter a contact phone number.";
    if (!form.address.trim())
      next.address = "Please enter your full delivery address.";
    if (!form.message.trim()) next.message = "Please tell us a little about your enquiry.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;
    setSubmitError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          order: orderSummary,
          address: form.address,
          message: form.message,
        }),
      });

      if (!res.ok) {
        setSubmitError("Something went wrong sending your enquiry. Please try again.");
        setStatus("idle");
        return;
      }

      clearCart();
      setStatus("success");
      return;
    } catch {
      setSubmitError("Something went wrong sending your enquiry. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border border-[#18af8a]/20 bg-[#18af8a]/5 p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-[#18af8a]" />
        <h3 className="text-xl font-bold text-[#202e25]">Order Enquiry Sent</h3>
        <p className="max-w-sm text-sm text-[#202e25]/65">
          Thank you for your order enquiry. This does not automatically
          confirm your order &mdash; Grasshopper Fuels will be in touch to
          confirm availability, pricing, and delivery details.
        </p>
        <Link
          href="/order"
          className="mt-2 text-sm font-semibold text-[#18af8a] underline underline-offset-4"
        >
          Place another order
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-black/5 bg-[#f7faf9] p-10 text-center">
        <h3 className="text-xl font-bold text-[#202e25]">
          Your basket is empty
        </h3>
        <p className="max-w-sm text-sm text-[#202e25]/60">
          Add some products to your basket before checking out.
        </p>
        <Link
          href="/order"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#18af8a] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#139775]"
        >
          Browse Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <p className="rounded-2xl bg-[#18af8a]/5 p-4 text-sm text-[#202e25]/70">
        Submitting this form sends an <strong>enquiry</strong> only. It does
        not automatically confirm your order &mdash; Grasshopper Fuels will
        respond to confirm availability, pricing, and next steps.
      </p>

      {submitError && (
        <p className="flex items-center gap-1.5 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {submitError}
        </p>
      )}

      <div className="rounded-2xl border border-input p-4">
        <p className="text-sm font-semibold text-[#202e25]">Order Summary</p>
        <div className="mt-3 flex flex-col gap-1.5">
          {items.map((item) => {
            const bulkActive = item.bulkOffer && item.quantity >= item.bulkOffer.minQty;
            return (
              <div
                key={item.key}
                className="flex items-center justify-between text-sm text-[#202e25]/70"
              >
                <span>
                  {item.quantity} x {item.variantLabel}
                  {bulkActive && item.bulkOffer && (
                    <span className="ml-2 text-xs font-bold text-[#4d8f1b]">
                      (bulk offer: £{item.bulkOffer.unitPrice.toFixed(2)} each)
                    </span>
                  )}
                </span>
                <span className="font-medium text-[#18af8a]">
                  £{(getEffectiveUnitPrice(item) * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
          <span className="text-sm font-bold text-[#202e25]">
            Estimated Subtotal
          </span>
          <span className="text-sm font-extrabold text-[#202e25]">
            £{subtotal.toFixed(2)}
          </span>
        </div>
        {hasUnpricedItems && (
          <p className="mt-2 text-xs text-[#202e25]/50">
            Some items are priced on enquiry and are not included in this
            estimate.
          </p>
        )}
        <Link
          href="/basket"
          className="mt-3 inline-block text-xs font-semibold text-[#18af8a] underline underline-offset-4"
        >
          Edit basket
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="First Name" htmlFor="firstName" error={errors.firstName}>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            placeholder="Jane"
          />
        </Field>

        <Field label="Last Name" htmlFor="lastName" error={errors.lastName}>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            placeholder="Kelly"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Email Address" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="jane.example@manx.net"
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="07624 000000"
          />
        </Field>
      </div>

      <Field label="Delivery Address" htmlFor="address" error={errors.address}>
        <Textarea
          id="address"
          name="address"
          autoComplete="street-address"
          rows={3}
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? "address-error" : undefined}
          placeholder="e.g. 12 Main Road, Onchan, Douglas, IM3 2AB"
        />
      </Field>

      <Field label="Access, Timing & Delivery Information" htmlFor="message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Let us know about any access restrictions, preferred delivery timing, or other useful details."
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#18af8a] px-8 py-4 text-base font-bold text-white shadow-md transition-colors hover:bg-[#139775] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Order Enquiry
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor} className="text-sm font-semibold text-[#202e25]">
        {label}
      </Label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="flex items-center gap-1.5 text-xs font-medium text-red-600"
        >
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
