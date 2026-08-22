"use client";

import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full border-b border-[rgba(10,10,12,0.2)] bg-transparent py-3 text-ink placeholder:text-ink-55 focus:border-ink focus:outline-none";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      setErr("Fill in your name, email, and a short message.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErr("That email address doesn't look right.");
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
      <div className="border-l-2 border-teal bg-[rgba(62,207,207,0.08)] p-7">
        <p className="display text-[1.75rem] text-ink">Message received.</p>
        <p className="mt-2 text-ink-70">
          You&apos;ll hear back from us tonight between 7 and 9 PM. That&apos;s
          not a form response — it&apos;s just when we reply.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-[13px] text-ink-55">
            Your name
          </label>
          <input id="name" name="name" className={FIELD} placeholder="Sam Patel" />
        </div>
        <div>
          <label htmlFor="business" className="text-[13px] text-ink-55">
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

      <div>
        <label htmlFor="email" className="text-[13px] text-ink-55">
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
        <label htmlFor="message" className="text-[13px] text-ink-55">
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

      {err && <p className="text-[14px] text-[#b3382b]">{err}</p>}
      {state === "error" && (
        <p className="text-[14px] text-[#b3382b]">
          Something broke on our end. Email us directly instead.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-sm bg-ink px-8 py-4 text-[15px] font-medium text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {state === "sending" ? "Sending…" : "Send it"}
      </button>
    </form>
  );
}
