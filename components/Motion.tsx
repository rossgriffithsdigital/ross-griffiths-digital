"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";

/* ─────────── Reveal on scroll ─────────── */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(22px)",
        transition: `opacity .7s cubic-bezier(.2,.7,.3,1) ${delay}ms, transform .7s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────── Word-by-word headline ─────────── */

export function SplitHeading({
  text,
  accentFrom,
  className = "",
}: {
  text: string;
  accentFrom?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <h1 className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            aria-hidden
            className={`inline-block ${
              accentFrom !== undefined && i >= accentFrom
                ? "italic text-teal"
                : ""
            }`}
            style={{
              animation: `wordUp .85s cubic-bezier(.2,.75,.25,1) ${
                120 + i * 65
              }ms both`,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </h1>
  );
}

/* ─────────── Magnetic fill button ─────────── */

export function MagneticButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "dark";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.28;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  const base =
    "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-sm px-8 py-4 font-medium transition-transform duration-300 will-change-transform";
  const styles = {
    solid: "bg-teal text-ink",
    dark: "bg-ink text-paper",
    ghost: "border border-[var(--color-hair)] text-mute hover:text-ink",
  }[variant];

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`${base} ${styles}`}
    >
      {variant === "ghost" && (
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-teal transition-transform duration-400 ease-out group-hover:scale-y-100" />
      )}
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

/* ─────────── Marquee ─────────── */

export function Marquee({
  items,
  speed = 42,
}: {
  items: string[];
  speed?: number;
}) {
  const row = [...items, ...items];
  return (
    <div
      className="relative flex overflow-hidden py-6"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div
        className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="display text-[clamp(1.1rem,2vw,1.6rem)] text-mute">
              {it}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-teal opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Count-up ─────────── */

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1200;
      const tick = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}
