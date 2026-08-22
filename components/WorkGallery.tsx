"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/content";

export default function WorkGallery({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<string>(projects[0].slug);

  return (
    <div className="space-y-px">
      {projects.map((p, i) => {
        const isOpen = open === p.slug;
        return (
          <article
            key={p.slug}
            className="border-t border-[var(--color-hair)] last:border-b"
          >
            <button
              onClick={() => setOpen(isOpen ? "" : p.slug)}
              aria-expanded={isOpen}
              className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 py-8 text-left md:gap-10"
            >
              <span className="display text-[1.1rem] text-mute-dim opacity-50">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span
                  className="display block text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.1] transition-colors duration-300"
                  style={{ color: isOpen ? p.accent : undefined }}
                >
                  <span className={isOpen ? "" : "text-paper"}>{p.name}</span>
                </span>
                <span className="mt-1 block text-[14px] text-mute-dim">
                  {p.sector} · {p.year}
                </span>
              </span>

              <span className="flex items-center gap-5">
                <span
                  className="hidden whitespace-nowrap rounded-full px-3 py-1 text-[12px] sm:inline"
                  style={{
                    background:
                      p.status === "Live"
                        ? "var(--color-teal)"
                        : "transparent",
                    color:
                      p.status === "Live"
                        ? "var(--color-ink)"
                        : "var(--color-mute-dim)",
                    border:
                      p.status === "Live"
                        ? "none"
                        : "1px solid var(--color-hair)",
                  }}
                >
                  {p.status}
                </span>
                <span
                  className={`text-[1.5rem] text-mute-dim transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid gap-10 pb-14 lg:grid-cols-[1.15fr_0.85fr]">
                  <div
                    className="relative overflow-hidden rounded-sm"
                    style={{ background: p.accent }}
                  >
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={`${p.name} website`}
                        width={1600}
                        height={904}
                        className="w-full"
                      />
                    ) : (
                      <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 px-8 text-center">
                        <span className="display text-[clamp(1.5rem,3vw,2.5rem)] text-ink">
                          {p.name}
                        </span>
                        <span className="text-[13px] text-ink opacity-70">
                          Anonymised — not yet launched
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-lede text-paper">{p.summary}</p>
                    <p className="mt-5 text-mute">{p.detail}</p>

                    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[13px] text-mute-dim">
                          {t}
                        </span>
                      ))}
                    </div>

                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-block border-b pb-1 font-medium transition-opacity hover:opacity-60"
                        style={{ color: p.accent, borderColor: p.accent }}
                      >
                        Visit the live site →
                      </a>
                    ) : (
                      <p className="mt-8 text-[14px] text-mute-dim">
                        {p.status === "Concept"
                          ? "Shown anonymised at the client's request."
                          : "Private until launch."}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
