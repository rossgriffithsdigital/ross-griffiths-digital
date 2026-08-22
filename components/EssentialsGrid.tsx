"use client";

import { useRef, type MouseEvent } from "react";
import type { Essential } from "@/lib/content";

/* Tonal variations built only from the locked palette — teal, navy, ink.
   No rainbow HSL, no WebGL, no gradient-mesh. One cheap CSS animation. */
const WASHES = [
  "radial-gradient(120% 120% at 10% 0%, #1c4d52 0%, #0d1520 55%, #0a0a0c 100%)",
  "radial-gradient(120% 120% at 85% 10%, #17414f 0%, #111820 58%, #0a0a0c 100%)",
  "radial-gradient(130% 110% at 40% 100%, #1f5a5c 0%, #0d1520 60%, #0a0a0c 100%)",
  "radial-gradient(110% 130% at 100% 60%, #14383f 0%, #111820 55%, #0a0a0c 100%)",
  "radial-gradient(120% 120% at 0% 80%, #1a4f4a 0%, #0d1520 58%, #0a0a0c 100%)",
  "radial-gradient(140% 120% at 60% 0%, #16454e 0%, #111820 56%, #0a0a0c 100%)",
  "radial-gradient(120% 130% at 20% 40%, #1d5257 0%, #0d1520 57%, #0a0a0c 100%)",
];

function Card({ e, i }: { e: Essential; i: number }) {
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
      className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-sm border border-[var(--color-hair)] p-8 transition-transform duration-500 hover:-translate-y-1"
      style={{ background: WASHES[i % WASHES.length] }}
    >
      {/* cursor-follow sheen — teal only, very low alpha */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx,50%) var(--my,50%), rgba(62,207,207,.12), transparent 65%)",
        }}
      />

      <span className="display relative text-[1.1rem] text-teal opacity-70">
        {String(i + 1).padStart(2, "0")}
      </span>

      <h3 className="display relative mt-3 text-[1.65rem] text-paper">
        {e.name}
      </h3>

      <p className="relative mt-3 text-[15px] italic text-teal opacity-95">
        {e.problem}
      </p>

      <p className="relative mt-5 flex-grow text-[15px] leading-relaxed text-mute">
        {e.detail}
      </p>

      <span className="relative mt-6 h-px w-full bg-[var(--color-hair)]">
        <span className="block h-px w-0 bg-teal transition-all duration-700 group-hover:w-full" />
      </span>
    </div>
  );
}

function CtaTile() {
  return (
    <a
      href="#contact"
      className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-sm border border-teal/40 p-8 transition-transform duration-500 hover:-translate-y-1"
      style={{
        background:
          "radial-gradient(130% 120% at 80% 100%, #1f5a5c 0%, #0d1520 55%, #0a0a0c 100%)",
      }}
    >
      <div>
        <span className="display text-[1.1rem] text-teal opacity-70">08</span>
        <h3 className="display mt-3 text-[1.65rem] text-paper">
          Not sure which you need?
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-mute">
          Most people come to us with a website problem and leave having fixed
          a scheduling one. Tell us what actually eats your week and we&apos;ll
          tell you straight which of these solves it — or whether none of them
          do.
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-teal">
        Start a conversation
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}

export default function EssentialsGrid({ items }: { items: Essential[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((e, i) => (
        <Card key={e.name} e={e} i={i} />
      ))}
      <CtaTile />
    </div>
  );
}
