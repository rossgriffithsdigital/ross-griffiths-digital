"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#essentials", label: "Essentials" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-ink/92 backdrop-blur-md border-b border-[var(--color-hair)]" : ""
      }`}
    >
      <nav className="shell flex h-[72px] items-center justify-between">
        <a href="/" className="display text-[1.6rem] text-paper">
          R<span className="text-teal">&</span>GD
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] text-mute transition-colors hover:text-teal"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="rounded-sm bg-teal px-5 py-2.5 text-[15px] font-medium text-ink transition-opacity hover:opacity-85"
          >
            Start a project
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="text-paper md:hidden"
        >
          <span className="block h-px w-6 bg-current" />
          <span className="mt-1.5 block h-px w-6 bg-current" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-hair)] bg-ink px-6 py-5 md:hidden">
          {LINKS.concat({ href: "/#contact", label: "Get in touch" }).map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-mute"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
