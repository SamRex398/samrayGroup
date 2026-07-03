import * as React from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { ModalShell } from "./modal-shell";
import { useModal } from "./modal-context";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactModal() {
  const { close } = useModal();
  const [form, setForm] = React.useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");
  const [touched, setTouched] = React.useState<Partial<Record<keyof FormState, boolean>>>({});

  const errors: Record<keyof FormState, string> = {
    name: form.name.trim().length < 2 ? "Enter your full name." : "",
    email: !EMAIL_RE.test(form.email) ? "Enter a valid email address." : "",
    message: form.message.trim().length < 10 ? "Tell us a little more (10+ characters)." : "",
  };
  const isValid = !errors.name && !errors.email && !errors.message;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;
    setStatus("sending");
    // Simulated network call — wire this up to a real endpoint (e.g. a
    // serverless function or CRM webhook) before shipping.
    setTimeout(() => setStatus("sent"), 900);
  }

  if (status === "sent") {
    return (
      <ModalShell title="Message sent" subtitle="Talk to us" onClose={close}>
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-14 h-14 rounded-full bg-teal/15 text-teal flex items-center justify-center mb-5">
            <Check size={24} />
          </div>
          <p className="text-textink/70 leading-relaxed max-w-sm">
            Thanks, {form.name.split(" ")[0]}. A member of the Samray Energy team will reply to{" "}
            <span className="text-textink font-medium">{form.email}</span> within one business day.
          </p>
          <button
            onClick={close}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-surface2 transition-colors"
          >
            Done
          </button>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell title="Talk to us" subtitle="Get in touch" onClose={close}>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Field
          id="c-name"
          label="Full name"
          value={form.name}
          placeholder="Ada Obi"
          error={touched.name ? errors.name : ""}
          onChange={(v) => setForm({ ...form, name: v })}
          onBlur={() => setTouched({ ...touched, name: true })}
        />
        <Field
          id="c-email"
          label="Email"
          type="email"
          value={form.email}
          placeholder="you@company.com"
          error={touched.email ? errors.email : ""}
          onChange={(v) => setForm({ ...form, email: v })}
          onBlur={() => setTouched({ ...touched, email: true })}
        />
        <div>
          <label htmlFor="c-msg" className="block text-xs font-mono tracking-wide text-textink/50 mb-1.5">
            MESSAGE
          </label>
          <textarea
            id="c-msg"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            onBlur={() => setTouched({ ...touched, message: true })}
            placeholder="Tell us what you're working on..."
            className={`w-full rounded-xl border px-4 py-3 text-sm bg-white outline-none transition-colors resize-none ${
              touched.message && errors.message ? "border-red-400" : "border-textink/15 focus:border-copper"
            }`}
          />
          {touched.message && errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-copper text-white px-6 py-3.5 text-sm font-medium hover:bg-copper-light transition-colors disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </ModalShell>
  );
}

function Field({
  id,
  label,
  value,
  placeholder,
  error,
  onChange,
  onBlur,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono tracking-wide text-textink/50 mb-1.5">
        {label.toUpperCase()}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full rounded-xl border px-4 py-3 text-sm bg-white outline-none transition-colors ${
          error ? "border-red-400" : "border-textink/15 focus:border-copper"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
