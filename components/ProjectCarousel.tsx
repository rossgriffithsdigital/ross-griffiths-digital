"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import type { Project } from "@/lib/content";

import "swiper/css";
import "swiper/css/effect-coverflow";

const CSS = `
.rgd-cover { width:100%; padding: 8px 0 40px; }
.rgd-cover .swiper-slide {
  width: 320px;
  border-radius: 4px;
  overflow: hidden;
  transition: opacity .45s ease;
  opacity: .45;
}
.rgd-cover .swiper-slide-active { opacity: 1; }
.rgd-cover .swiper-3d .swiper-slide-shadow-left,
.rgd-cover .swiper-3d .swiper-slide-shadow-right { background: none; }
@media (min-width: 900px) { .rgd-cover .swiper-slide { width: 640px; } }
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
  const swiperRef = useRef<SwiperClass | null>(null);
  const current = projects[i % projects.length];

  /* Swiper's loop needs more slides than are visible at once, or it stalls
     at the ends. Three projects across a coverflow viewport isn't enough,
     so the set is repeated — realIndex still maps back to the original. */
  const slides = [...projects, ...projects, ...projects];

  return (
    <div>
      <style>{CSS}</style>

      <div className="relative">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous project"
          className="absolute left-1 top-[42%] z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(10,10,12,.14)] bg-paper/85 text-[1.3rem] text-ink backdrop-blur-sm transition-all hover:border-ink hover:bg-paper md:left-4"
        >
          ‹
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next project"
          className="absolute right-1 top-[42%] z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(10,10,12,.14)] bg-paper/85 text-[1.3rem] text-ink backdrop-blur-sm transition-all hover:border-ink hover:bg-paper md:right-4"
        >
          ›
        </button>

      <Swiper
        className="rgd-cover"
        modules={[EffectCoverflow, Autoplay, Navigation]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        spaceBetween={28}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loopAdditionalSlides={projects.length}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 140,
          modifier: 2.2,
          slideShadows: false,
        }}
        onSwiper={(sw) => (swiperRef.current = sw)}
        onSlideChange={(s) => setI(s.realIndex % projects.length)}
      >
        {slides.map((p, idx) => (
          <SwiperSlide key={`${p.slug}-${idx}`}>
            <Link href="/work" className="group block">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-sm"
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
      </div>

      <div className="mb-8 flex items-center justify-center gap-2">
        {projects.map((p, idx) => (
          <button
            key={p.slug}
            onClick={() => swiperRef.current?.slideToLoop(idx)}
            aria-label={`Show ${p.name}`}
            className="h-[3px] rounded-full transition-all duration-400"
            style={{
              width: idx === i ? 44 : 22,
              background: idx === i ? "var(--color-teal)" : "rgba(10,10,12,.2)",
            }}
          />
        ))}
      </div>

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
