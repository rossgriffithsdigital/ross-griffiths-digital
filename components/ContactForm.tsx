"use client";

import { useState } from "react";
import { EMAIL, PHONE, PHONE_HREF } from "@/lib/content";

type State = "idle" | "sending" | "sent" | "error";
type Plan = "build" | "support" | "essentials" | "";

const PLAN_LABELS: Record<Plan, string> = {
  build: "Website build ($999 CAD)",
  support: "Monthly support ($50 CAD/mo)",
  essentials: "Business Essentials (from $100 CAD/mo)",
  "": "Not sure yet — I'll describe below",
};

const FIELD =
  "w-full border-b border-[var(--color-hair)] bg-transparent py-3 text-paper placeholder:text-mute-dim/60 focus:border-teal focus:outline-none transition-colors";

export default function ContactForm({
  initialPlan = "",
}: {
  initialPlan?: Plan;
}) {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const plan = String(fd.get("plan") || "").trim();

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
          plan: plan || undefined,
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
      <div className="border-l-2 border-teal bg-[rgba(62,207,207,0.07)] p-9">
        <p className="display text-[1.9rem] text-paper">Message received.</p>
        <p className="mt-3 max-w-[52ch] text-mute">
          You&apos;ll hear back from us today. We answer between 9 AM and 7 PM,
          every day — that&apos;s a person, not an autoresponder.
        </p>

        <div className="mt-9 space-y-6">
          <p className="text-[13px] text-mute-dim">What happens next</p>
          {[
            [
              "01",
              "We read it properly",
              "Not a template reply. If we've got a question about your business, we'll ask it.",
            ],
            [
              "02",
              "A conversation, not a pitch",
              "A phone call or a coffee in Cobourg. We work out what's actually costing you time.",
            ],
            [
              "03",
              "A straight answer",
              "Including whether we're the wrong people for it. If we are, we'll point you somewhere better.",
            ],
          ].map(([n, t, d]) => (
            <div key={n} className="flex gap-5">
              <span className="display text-[1rem] text-teal opacity-70">
                {n}
              </span>
              <div>
                <p className="text-paper">{t}</p>
                <p className="mt-1 max-w-[46ch] text-[15px] text-mute">{d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 border-t border-[var(--color-hair)] pt-6">
          <p className="text-[13px] text-mute-dim">
            In a hurry? Skip the queue.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
            <a
              href={`tel:${PHONE_HREF}`}
              className="display text-[1.4rem] text-teal transition-opacity hover:opacity-75"
            >
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="self-center text-mute underline decoration-[var(--color-hair)] underline-offset-4 transition-colors hover:decoration-teal"
            >
              {EMAIL}
            </a>
          </div>
        </div>
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
        <label htmlFor="plan" className="text-[13px] text-mute-dim">
          What are you interested in?
        </label>
        <select
          id="plan"
          name="plan"
          defaultValue={initialPlan}
          className={`${FIELD} cursor-pointer appearance-none`}
        >
          {(Object.entries(PLAN_LABELS) as [Plan, string][]).map(
            ([value, label]) => (
              <option key={value} value={value} className="bg-navy text-paper">
                {label}
              </option>
            ),
          )}
        </select>
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
