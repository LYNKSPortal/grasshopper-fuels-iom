"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  postcode: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  product: "",
  quantity: "",
  postcode: "",
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
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) next.phone = "Please enter a contact phone number.";
    if (!form.product) next.product = "Please select a product.";
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
        <Field label="Full Name" htmlFor="name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Jane Kelly"
          />
        </Field>

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
            placeholder="jane@example.com"
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

        <Field label="Delivery Postcode / Area" htmlFor="postcode">
          <Input
            id="postcode"
            name="postcode"
            autoComplete="postal-code"
            value={form.postcode}
            onChange={(e) => update("postcode", e.target.value)}
            placeholder="e.g. IM1"
          />
        </Field>

        <Field label="Product" htmlFor="product" error={errors.product}>
          <Select
            value={form.product}
            onValueChange={(value) => update("product", value as string)}
          >
            <SelectTrigger id="product" className="w-full">
              <SelectValue placeholder="Choose a product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kiln-dried-logs">Kiln-Dried Logs</SelectItem>
              <SelectItem value="coal">Coal</SelectItem>
              <SelectItem value="kindling">Firewood Accessories</SelectItem>
              <SelectItem value="not-sure">Not Sure / Multiple Products</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Quantity or Requirements" htmlFor="quantity">
        <Input
          id="quantity"
          name="quantity"
          value={form.quantity}
          onChange={(e) => update("quantity", e.target.value)}
          placeholder="e.g. Approximate quantity, or leave blank if unsure"
        />
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Tell us about what you need and any access or timing information."
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
