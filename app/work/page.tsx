import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import WorkGallery from "@/components/WorkGallery";
import { Reveal } from "@/components/Motion";
import { PROJECTS, HOME_TOWNS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Websites and e-commerce builds by Ross & Griffiths Digital — for businesses across Cobourg and Northumberland County.",
  alternates: { canonical: "https://rossgriffithsdigital.com/work" },
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        <section className="shell py-24">
          <div className="mb-6 flex items-center gap-3 text-[13px] text-mute-dim">
            <span className="h-px w-8 bg-teal" />
            Portfolio
          </div>
          <h1 className="display text-hero max-w-[14ch] text-paper">
            Every one of them, <em className="italic text-teal">built</em> not
            assembled.
          </h1>
          <p className="mt-8 max-w-[54ch] text-lede text-mute">
            We started this year, so this is all of it — the live, the
            in-progress and the not-yet-launched. We&apos;d rather show you
            three real things than pad a page with logos.
          </p>
        </section>

        <section className="shell py-24">
          <WorkGallery projects={PROJECTS} />
        </section>

        <section className="bg-paper py-24 text-ink">
          <div className="shell max-w-[720px] text-center">
            <h2 className="display text-h2">Yours could be next.</h2>
            <p className="mt-5 text-ink-70">
              We build across {HOME_TOWNS.slice(0, -1).join(", ")} and{" "}
              {HOME_TOWNS[HOME_TOWNS.length - 1]} — and further afield in
              Kingston, Waterloo and London. Tell us what you need and
              we&apos;ll tell you straight whether we&apos;re the right people
              for it.
            </p>
            <Link
              href="/#contact"
              className="mt-9 inline-block rounded-sm bg-ink px-8 py-4 font-medium text-paper transition-opacity hover:opacity-85"
            >
              Start a project
            </Link>
          </div>
        </section>

        <footer className="border-t border-[var(--color-hair)] py-12">
          <div className="shell flex flex-wrap items-center justify-between gap-6">
            <Link href="/" className="display text-[1.5rem] text-paper">
              R<span className="text-teal">&</span>GD
            </Link>
            <p className="text-[14px] text-mute-dim">
              © {new Date().getFullYear()} Ross &amp; Griffiths Digital —
              Cobourg, Ontario
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
