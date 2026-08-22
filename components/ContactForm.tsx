"use client";

import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full border-b border-[var(--color-hair)] bg-transparent py-3 text-paper placeholder:text-mute-dim/60 focus:border-teal focus:outline-none transition-colors";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !phone || !message) {
      setErr("Fill in your name, email, phone number, and a short message.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErr("That email address doesn't look right.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setErr("That phone number looks too short — include the area code.");
      return;
    }

    setErr("");
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          business: fd.get("business"),
          message,
        }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="border-l-2 border-teal bg-[rgba(62,207,207,0.07)] p-7">
        <p className="display text-[1.75rem] text-paper">Message received.</p>
        <p className="mt-2 text-mute">
          You&apos;ll hear back from us today. We answer between 9 AM and
          7 PM, every day — that&apos;s a person, not an autoresponder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-[13px] text-mute-dim">
            Your name
          </label>
          <input id="name" name="name" className={FIELD} placeholder="Sam Patel" />
        </div>
        <div>
          <label htmlFor="business" className="text-[13px] text-mute-dim">
            Business <span className="opacity-60">(optional)</span>
          </label>
          <input
            id="business"
            name="business"
            className={FIELD}
            placeholder="Patel Auto"
          />
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-[13px] text-mute-dim">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={FIELD}
            placeholder="sam@patelauto.ca"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-[13px] text-mute-dim">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={FIELD}
            placeholder="905 555 0134"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-[13px] text-mute-dim">
          What are you trying to do?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${FIELD} resize-none`}
          placeholder="We take bookings by phone and it's eating my evenings."
        />
      </div>

      {err && <p className="text-[14px] text-[#ff8b7d]">{err}</p>}
      {state === "error" && (
        <p className="text-[14px] text-[#ff8b7d]">
          Something broke on our end. Email us directly instead.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-sm bg-teal px-8 py-4 text-[15px] font-medium text-ink transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {state === "sending" ? "Sending…" : "Send it"}
      </button>
    </form>
  );
}
