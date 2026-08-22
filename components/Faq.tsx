"use client";

import { useState } from "react";

export default function Faq({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[rgba(10,10,12,.14)] border-y border-[rgba(10,10,12,.14)]">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-8 py-6 text-left"
            >
              <span
                className={`display text-[clamp(1.15rem,2vw,1.4rem)] leading-snug transition-colors ${
                  isOpen ? "text-ink" : "text-ink group-hover:opacity-60"
                }`}
              >
                {f.q}
              </span>
              <span
                className={`mt-1 shrink-0 text-[1.35rem] leading-none text-ink-55 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[68ch] pb-7 pr-10 text-ink-70">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
