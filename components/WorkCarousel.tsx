"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

export default function WorkCarousel({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollTo(i: number) {
    const el = track.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card)
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setActive(i);
  }

  function onScroll() {
    const el = track.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let dist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const card = c as HTMLElement;
      const centre = card.offsetLeft - el.offsetLeft + card.clientWidth / 2;
      const d = Math.abs(centre - mid);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    setActive(best);
  }

  return (
    <div>
      <div
        ref={track}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <Link
            key={p.slug}
            href="/work"
            className="group w-[86%] shrink-0 snap-center sm:w-[58%] lg:w-[42%]"
          >
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-sm"
              style={{ background: p.accent }}
            >
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  width={1600}
                  height={904}
                  className="h-full w-full object-cover object-left-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="display text-[2rem] text-ink">{p.name}</span>
                </div>
              )}
              <span
                className="absolute left-4 top-4 rounded-full px-3 py-1 text-[12px] backdrop-blur-sm"
                style={{
                  background:
                    p.status === "Live"
                      ? "var(--color-teal)"
                      : "rgba(10,10,12,.6)",
                  color:
                    p.status === "Live"
                      ? "var(--color-ink)"
                      : "var(--color-paper)",
                }}
              >
                {p.status}
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <p className="display text-[1.4rem] text-ink">{p.name}</p>
              <p className="text-[13px] text-ink-55">{p.sector}</p>
            </div>
            <p className="mt-2 max-w-[42ch] text-[15px] text-ink-70">
              {p.summary}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => scrollTo(i)}
            aria-label={`Show ${p.name}`}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 40 : 16,
              background:
                i === active ? "var(--color-ink)" : "rgba(10,10,12,.22)",
            }}
          />
        ))}
        <span className="ml-auto text-[13px] text-ink-55">
          Drag or swipe →
        </span>
      </div>
    </div>
  );
}
