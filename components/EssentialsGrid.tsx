"use client";

import { useRef, useState, type MouseEvent } from "react";
import type { Essential } from "@/lib/content";

const WASHES = [
  "radial-gradient(120% 120% at 10% 0%, #1c4d52 0%, #0d1520 55%, #0a0a0c 100%)",
  "radial-gradient(120% 120% at 85% 10%, #17414f 0%, #111820 58%, #0a0a0c 100%)",
  "radial-gradient(130% 110% at 40% 100%, #1f5a5c 0%, #0d1520 60%, #0a0a0c 100%)",
  "radial-gradient(110% 130% at 100% 60%, #14383f 0%, #111820 55%, #0a0a0c 100%)",
];

function Card({
  e,
  i,
  compact = false,
}: {
  e: Essential;
  i: number;
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(ev: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((ev.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((ev.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative flex flex-col overflow-hidden rounded-sm p-8 transition-transform duration-500 hover:-translate-y-1 ${
        compact ? "min-h-[240px]" : "min-h-[340px]"
      } ${
        e.popular
          ? "border border-teal/55"
          : "border border-[var(--color-hair)]"
      }`}
      style={{ background: WASHES[i % WASHES.length] }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx,50%) var(--my,50%), rgba(62,207,207,.12), transparent 65%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="display text-[1.1rem] text-teal opacity-70">
          {String(i + 1).padStart(2, "0")}
        </span>
        {e.popular && (
          <span className="rounded-full bg-teal px-3 py-1 text-[11px] font-medium tracking-wide text-ink">
            Most popular
          </span>
        )}
      </div>

      <h3
        className={`display relative mt-3 text-paper ${
          compact ? "text-[1.4rem]" : "text-[1.75rem]"
        }`}
      >
        {e.name}
      </h3>

      <p className="relative mt-3 text-[15px] italic leading-snug text-teal opacity-95">
        {e.problem}
      </p>

      <p className="relative mt-4 flex-grow text-[15px] leading-relaxed text-mute">
        {e.detail}
      </p>

      <span className="relative mt-6 block h-px w-full bg-[var(--color-hair)]">
        <span className="block h-px w-0 bg-teal transition-all duration-700 group-hover:w-full" />
      </span>
    </div>
  );
}

export default function EssentialsGrid({ items }: { items: Essential[] }) {
  const [open, setOpen] = useState(false);
  const featured = items.filter((e) => e.featured);
  const rest = items.filter((e) => !e.featured);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((e, i) => (
          <Card key={e.name} e={e} i={i} />
        ))}
      </div>

      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group mt-8 flex w-full items-center justify-center gap-3 border-t border-[var(--color-hair)] pt-8 text-[15px] text-mute transition-colors hover:text-teal"
      >
        {open ? "Show fewer" : `Explore the other ${rest.length}`}
        <span
          className={`text-[1.2rem] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-6 pt-8 md:grid-cols-2">
            {rest.map((e, i) => (
              <Card
                key={e.name}
                e={e}
                i={featured.length + i}
                compact
              />
            ))}
          </div>
        </div>
      </div>

      <a
        href="#contact"
        className="group mt-8 flex flex-wrap items-center justify-between gap-6 rounded-sm border border-teal/40 p-8 transition-transform duration-500 hover:-translate-y-1"
        style={{
          background:
            "radial-gradient(120% 200% at 85% 100%, #1f5a5c 0%, #0d1520 55%, #0a0a0c 100%)",
        }}
      >
        <div className="max-w-[62ch]">
          <h3 className="display text-[1.6rem] text-paper">
            Not sure which you need?
          </h3>
          <p className="mt-2 text-[15px] text-mute">
            Most people come to us with a website problem and leave having fixed
            a scheduling one. Tell us what actually eats your week and
            we&apos;ll tell you straight which of these solves it — or whether
            none of them do.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-teal">
          Start a conversation
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </a>
    </div>
  );
}
