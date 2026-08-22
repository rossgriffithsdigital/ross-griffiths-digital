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
        className="group relative block overflow-hidden rounded-sm border border-[var(--color-hair)] bg-card"
      >
        {/* browser chrome — adds height honestly instead of cropping the shot */}
        <div className="flex items-center gap-3 border-b border-[var(--color-hair)] px-4 py-3">
          <span className="flex gap-1.5">
            {["#3ecfcf", "#b0c4d0", "#93aec0"].map((c) => (
              <span
                key={c}
                className="h-2 w-2 rounded-full opacity-40"
                style={{ background: c }}
              />
            ))}
          </span>
          <span className="flex-1 truncate rounded-sm bg-ink/60 px-3 py-1 text-[11px] text-mute-dim">
            {active.href ? active.href.replace("https://", "") : "preview"}
          </span>
        </div>

        <div className="relative aspect-[16/10]">
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

        </div>

        <div className="border-t border-[var(--color-hair)] px-6 py-5">
          <p className="text-[13px] text-teal">
            {active.status} · {active.sector}
          </p>
          <p className="display mt-1 text-[1.5rem] text-paper">{active.name}</p>
          <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-mute">
            {active.summary}
          </p>
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
