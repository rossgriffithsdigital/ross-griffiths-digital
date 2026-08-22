"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import type { Project } from "@/lib/content";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CSS = `
.rgd-cover { width:100%; padding: 8px 0 64px; }
.rgd-cover .swiper-slide {
  width: 340px;
  border-radius: 4px;
  overflow: hidden;
  transition: opacity .45s ease;
  opacity: .45;
}
.rgd-cover .swiper-slide-active { opacity: 1; }
.rgd-cover .swiper-pagination-bullet {
  background: var(--color-mute-dim);
  opacity: .35;
  width: 22px; height: 3px;
  border-radius: 2px;
  transition: all .3s ease;
}
.rgd-cover .swiper-pagination-bullet-active {
  background: var(--color-teal);
  opacity: 1;
  width: 44px;
}
.rgd-cover .swiper-3d .swiper-slide-shadow-left,
.rgd-cover .swiper-3d .swiper-slide-shadow-right { background: none; }
@media (min-width: 900px) { .rgd-cover .swiper-slide { width: 520px; } }
@media (prefers-reduced-motion: reduce) {
  .rgd-cover .swiper-slide { opacity: 1; }
}
`;

export default function ProjectCarousel({
  projects,
}: {
  projects: Project[];
}) {
  const [i, setI] = useState(0);
  const current = projects[i % projects.length];

  /* Swiper's loop needs more slides than are visible at once, or it stalls
     at the ends. Three projects across a coverflow viewport isn't enough,
     so the set is repeated — realIndex still maps back to the original. */
  const slides = [...projects, ...projects, ...projects];

  return (
    <div>
      <style>{CSS}</style>

      <Swiper
        className="rgd-cover"
        modules={[EffectCoverflow, Autoplay, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        spaceBetween={28}
        autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loopAdditionalSlides={projects.length}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 140,
          modifier: 2.2,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        onSlideChange={(s) => setI(s.realIndex % projects.length)}
      >
        {slides.map((p, idx) => (
          <SwiperSlide key={`${p.slug}-${idx}`}>
            <Link href="/work" className="group block">
              <div
                className="relative aspect-[16/10] overflow-hidden rounded-sm"
                style={{ background: p.accent }}
              >
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={1600}
                    height={904}
                    className="h-full w-full object-cover object-left-top"
                  />
                )}
                <span
                  className="absolute left-4 top-4 rounded-full px-3 py-1 text-[12px]"
                  style={{
                    background:
                      p.status === "Live"
                        ? "var(--color-teal)"
                        : "rgba(10,10,12,.7)",
                    color:
                      p.status === "Live"
                        ? "var(--color-ink)"
                        : "var(--color-paper)",
                  }}
                >
                  {p.status}
                </span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mx-auto max-w-[640px] px-6 text-center">
        <p
          key={current.slug}
          className="display text-[clamp(1.6rem,3vw,2.25rem)] text-ink"
          style={{ animation: "lift .5s cubic-bezier(.2,.7,.3,1) both" }}
        >
          {current.name}
        </p>
        <p className="mt-1 text-[14px] text-ink-55">
          {current.sector} · {current.year}
        </p>
        <p className="mt-4 text-ink-70">{current.summary}</p>
        <Link
          href="/work"
          className="mt-6 inline-block border-b border-ink pb-1 text-[15px] font-medium transition-opacity hover:opacity-60"
        >
          See the full portfolio →
        </Link>
      </div>
    </div>
  );
}
