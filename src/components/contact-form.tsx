"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  order: string;
  address: string;
  message: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  order: "",
  address: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

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
    if (!form.order.trim())
      next.order = "Please tell us what you're looking to order.";
    if (!form.address.trim())
      next.address = "Please enter your full delivery address.";
    if (!form.message.trim()) next.message = "Please tell us a little about your enquiry.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
    }, 900);
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border border-[#18af8a]/20 bg-[#18af8a]/5 p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-[#18af8a]" />
        <h3 className="text-xl font-bold text-[#202e25]">Enquiry Sent</h3>
        <p className="max-w-sm text-sm text-[#202e25]/65">
          Thank you for your enquiry. This does not automatically confirm
          your order &mdash; Grasshopper Fuels will be in touch to confirm
          availability, pricing, and delivery details.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setStatus("idle");
          }}
          className="mt-2 text-sm font-semibold text-[#18af8a] underline underline-offset-4"
        >
          Send another enquiry
        </button>
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

      <Field label="What Are You Looking to Order?" htmlFor="order" error={errors.order}>
        <Textarea
          id="order"
          name="order"
          rows={3}
          value={form.order}
          onChange={(e) => update("order", e.target.value)}
          aria-invalid={Boolean(errors.order)}
          aria-describedby={errors.order ? "order-error" : undefined}
          placeholder="e.g. 2 bags of kiln-dried logs and a bag of coal"
        />
      </Field>

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
        Send Enquiry
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
          className={cn("flex items-center gap-1.5 text-xs font-medium text-red-600")}
        >
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
