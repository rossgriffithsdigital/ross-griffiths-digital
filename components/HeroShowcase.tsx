"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

export default function HeroShowcase({ projects }: { projects: Project[] }) {
  const shown = projects.filter((p) => p.image);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % shown.length), 4200);
    return () => clearInterval(t);
  }, [paused, shown.length]);

  const active = shown[i];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link
        href="/work"
        className="group relative block overflow-hidden rounded-sm border border-[var(--color-hair)]"
      >
        <div className="relative aspect-[16/10] lg:aspect-[4/5]">
          {shown.map((p, idx) => (
            <Image
              key={p.slug}
              src={p.image!}
              alt={`${p.name} website`}
              fill
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover object-top transition-opacity duration-[900ms] ease-out"
              style={{ opacity: idx === i ? 1 : 0 }}
            />
          ))}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent px-6 pb-5 pt-20">
            <p
              className="text-[13px]"
              style={{ color: active.accent === "#3ecfcf" ? "#3ecfcf" : undefined }}
            >
              <span className="text-teal">
                {active.status} · {active.sector}
              </span>
            </p>
            <p className="display mt-1 text-[1.5rem] text-paper">
              {active.name}
            </p>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex items-center gap-2">
        {shown.map((p, idx) => (
          <button
            key={p.slug}
            onClick={() => setI(idx)}
            aria-label={`Show ${p.name}`}
            className="h-[3px] rounded-full transition-all duration-500"
            style={{
              width: idx === i ? 44 : 18,
              background:
                idx === i ? "var(--color-teal)" : "var(--color-hair)",
            }}
          />
        ))}
        <span className="ml-auto text-[13px] text-mute-dim">
          {String(i + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
