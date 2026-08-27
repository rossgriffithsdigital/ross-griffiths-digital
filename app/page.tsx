import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";
import ProjectCarousel from "@/components/ProjectCarousel";
import HeroShowcase from "@/components/HeroShowcase";
import EssentialsGrid from "@/components/EssentialsGrid";
import { Reveal, SplitHeading, MagneticButton } from "@/components/Motion";
import Faq from "@/components/Faq";
import GoogleRating from "@/components/GoogleRating";
import {
  HOME_TOWNS,
  FAQS,
  EMAIL,
  PHONE,
  PHONE_HREF,
  BUILD,
  SUPPORT,
  ESSENTIALS,
  ESSENTIALS_PRICE,
  PROJECTS,

  HOURS,
} from "@/lib/content";

const PROCESS = [
  {
    n: "01",
    t: "We talk",
    d: "A coffee or a phone call. We work out what's actually costing you time — which is usually not the thing you came in thinking about.",
  },
  {
    n: "02",
    t: "We build",
    d: "Designed around your business, written from scratch. You get a link to watch it come together, not three weeks of silence.",
  },
  {
    n: "03",
    t: "You approve",
    d: "Nothing goes live until you've seen it and said yes. Changes at this stage are expected, not billed as extras.",
  },
  {
    n: "04",
    t: "We launch",
    d: "Live, on Google, and yours. The code sits in your account. If you sack us tomorrow, you keep everything.",
  },
];

export default function Home() {
  const featured = PROJECTS[0];

  return (
    <>
      <Nav />
      <main id="top">
        {/* ───────────── Hero ───────────── */}
        <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-[72px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[12%] top-0 h-[620px] w-[620px] rounded-full opacity-[0.07]"
            style={{
              background:
                "radial-gradient(circle, var(--color-teal) 0%, transparent 68%)",
            }}
          />
          <div className="shell relative grid gap-16 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="lift">
              <div className="mb-8 flex items-center gap-3 text-[13px] text-mute-dim">
                <span className="h-px w-8 bg-teal" />
                Web design in Cobourg, Ontario
              </div>

              <SplitHeading
                text="Your business deserves a better website."
                accentFrom={4}
                className="display text-hero text-paper"
              />

              <p className="mt-8 max-w-[48ch] text-lede text-mute">
                Not a template with your logo dropped in. A site built around
                how your business actually works — that takes the booking,
                sends the invoice and fills the cancelled slot while
                you&apos;re asleep.
              </p>

              <div className="mt-11 flex flex-wrap items-center gap-4">
                <MagneticButton href="#contact">
                  Start a project
                </MagneticButton>
                <Link
                  href="/work"
                  className="border-b border-[var(--color-hair)] px-1 py-4 text-mute transition-colors hover:border-teal hover:text-teal"
                >
                  See our work
                </Link>
              </div>

              <dl className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-[var(--color-hair)] pt-8">
                {[
                  [`${BUILD.price}`, "Flat build fee, CAD"],
                  ["9–7", "We reply, daily"],
                  ["100%", "Yours to keep"],
                ].map(([k, v]) => (
                  <div key={v}>
                    <dt className="display text-[1.9rem] text-teal">{k}</dt>
                    <dd className="mt-1 text-[14px] text-mute-dim">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <GoogleRating />
              </div>
            </div>

            <HeroShowcase projects={PROJECTS} />
          </div>
        </section>

        {/* ───────────── The offer ───────────── */}
        <section id="services" className="bg-paper py-28 text-ink">
          <div className="shell">
            <h2 className="display text-h2 max-w-[20ch]">
              A site to be found. Then the tools that save you the evening.
            </h2>
            <p className="mt-6 max-w-[58ch] text-ink-70">
              The website gets you found. What happens next is where the hours
              go — and that&apos;s the part most local web shops can&apos;t
              build for you.
            </p>

            <div className="mt-16 grid gap-10 md:grid-cols-2">
              <div className="flex flex-col border-t-2 border-ink pt-7">
                <span className="display text-[1.2rem] text-ink-55">01</span>
                <h3 className="display mt-2 text-[1.9rem]">Website build</h3>
                <p className="mt-1 text-[15px] text-ink-55">
                  {BUILD.price} {BUILD.unit}
                </p>
                <p className="mt-5 text-ink-70">
                  Five pages, built from scratch around your business.
                  Mobile-first, because that&apos;s where your customers
                  actually are. Set up so Google knows you exist in Cobourg
                  specifically.
                </p>
                <ul className="mt-6 space-y-2.5 text-[15px] text-ink-70">
                  {BUILD.includes.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-[11px] h-px w-4 shrink-0 bg-ink opacity-30" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col border-t-2 border-[rgba(10,10,12,0.2)] pt-7">
                <span className="display text-[1.2rem] text-ink-55">02</span>
                <h3 className="display mt-2 text-[1.9rem]">Monthly support</h3>
                <p className="mt-1 text-[15px] text-ink-55">
                  {SUPPORT.price} {SUPPORT.unit} · optional
                </p>
                <p className="mt-5 text-ink-70">{SUPPORT.blurb}</p>
                <ul className="mt-6 space-y-2.5 text-[15px] text-ink-70">
                  {SUPPORT.includes.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-[11px] h-px w-4 shrink-0 bg-ink opacity-30" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Business Essentials ───────────── */}
        <section id="essentials" className="py-28">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <span className="display text-[1.2rem] text-teal opacity-70">
                  03
                </span>
                <h2 className="display mt-3 text-h2 max-w-[16ch] text-paper">
                  Business Essentials
                </h2>
                <p className="mt-6 max-w-[52ch] text-lede text-mute">
                  These are the ones that pay for themselves. Each solves a
                  specific way your week leaks time — and each can bolt onto a
                  website we built or one you already have.
                </p>
              </div>
              <div className="border-l-2 border-teal pl-7">
                <p className="display text-[3rem] leading-none text-teal">
                  {ESSENTIALS_PRICE.from}
                </p>
                <p className="mt-2 text-[14px] text-mute-dim">
                  {ESSENTIALS_PRICE.unit}
                </p>
                <p className="mt-4 text-[14px] text-mute">
                  {ESSENTIALS_PRICE.note}
                </p>
              </div>
            </div>

            <div className="mt-16">
              <EssentialsGrid items={ESSENTIALS} />
            </div>

            <div className="mt-14 border-t border-[var(--color-hair)] pt-10">
              <p className="max-w-[62ch] text-mute">
                Built with a professional software engineer whose day job is at
                Microsoft. Anyone can put up five pages. Wiring a booking system
                into a till without it breaking every second Tuesday is a
                different job.
              </p>
            </div>
          </div>
        </section>

        {/* ───────────── Work teaser ───────────── */}
        <section className="bg-paper py-24 text-ink">
          <div className="shell">
            <h2 className="display text-h2 max-w-[14ch]">
              Things we&apos;ve built.
            </h2>
            <div className="mt-12">
              <ProjectCarousel projects={PROJECTS} />
            </div>
          </div>
        </section>

        {/* ───────────── Process ───────────── */}
        <section id="process" className="bg-navy py-28">
          <div className="shell">
            <h2 className="display text-h2 max-w-[15ch] text-paper">
              From first message to live site.
            </h2>
            <div className="mt-14 grid gap-x-12 gap-y-11 md:grid-cols-2">
              {PROCESS.map((s, i) => (
                <Reveal
                  key={s.n}
                  delay={i * 70}
                  className="border-t border-[var(--color-hair)] pt-6"
                >
                  <span className="display text-[1.2rem] text-mute-dim">
                    {s.n}
                  </span>
                  <h3 className="display mt-2 text-[1.65rem] text-paper">
                    {s.t}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-mute">{s.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Pricing ───────────── */}
        <section id="pricing" className="bg-paper py-28 text-ink">
          <div className="shell">
            <h2 className="display text-h2 max-w-[18ch]">
              {BUILD.price} to build. Everything after that is your choice.
            </h2>
            <p className="mt-6 max-w-[54ch] text-ink-70">
              Not a deposit, not a starting-from, not a subscription you
              can&apos;t escape. This is our founding rate while we grow the
              portfolio — it will go up, and if you start now, your price is
              your price.
            </p>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {(
                [
                  {
                    slug: "build",
                    t: "The build",
                    p: BUILD.price,
                    u: BUILD.unit,
                    items: BUILD.includes.slice(0, 4),
                    cta: "Start with the build →",
                    dark: false,
                  },
                  {
                    slug: "support",
                    t: "Monthly support",
                    p: SUPPORT.price,
                    u: SUPPORT.unit,
                    items: SUPPORT.includes.slice(0, 4),
                    cta: "Add monthly support →",
                    dark: false,
                  },
                  {
                    slug: "essentials",
                    t: "Business Essentials",
                    p: ESSENTIALS_PRICE.from,
                    u: ESSENTIALS_PRICE.unit,
                    items: [
                      "Booking and scheduling",
                      "Payments and invoicing",
                      "Waitlists and automations",
                      "Quoted before anything is built",
                    ],
                    cta: "Get Essentials quoted →",
                    dark: true,
                  },
                ] as const
              ).map((c, i) => (
                <Reveal key={c.t} delay={i * 90} className="flex">
                  <Link
                    href={`/contact?plan=${c.slug}`}
                    className={[
                      "group flex w-full flex-col rounded-sm border p-9",
                      "transition-[border-color,transform] duration-150 ease-out",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
                      "hover:-translate-y-[2px] hover:border-teal",
                      c.dark
                        ? "border-[rgba(255,255,255,0.12)] bg-ink text-paper focus-visible:ring-offset-[#0a0a0c]"
                        : "border-[rgba(10,10,12,0.15)] bg-paper text-ink focus-visible:ring-offset-[#edf3f7]",
                    ].join(" ")}
                  >
                    <h3 className="display text-[1.4rem]">{c.t}</h3>
                    <p
                      className={`display mt-4 text-[2.75rem] leading-none ${c.dark ? "text-teal" : ""}`}
                    >
                      {c.p}
                    </p>
                    <p
                      className={`mt-2 text-[14px] ${c.dark ? "text-mute-dim" : "text-ink-55"}`}
                    >
                      {c.u}
                    </p>
                    <ul
                      className={`mt-6 space-y-1.5 text-[14px] ${c.dark ? "text-mute" : "text-ink-70"}`}
                    >
                      {c.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p
                      className={`mt-auto flex min-h-[44px] items-end pt-8 text-[14px] font-medium ${c.dark ? "text-teal" : "text-ink"}`}
                    >
                      {c.cta}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── FAQ ───────────── */}
        <section id="faq" className="bg-paper py-28 text-ink">
          <div className="shell grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <h2 className="display text-h2 max-w-[12ch]">
                Common questions.
              </h2>
              <p className="mt-5 max-w-[34ch] text-ink-70">
                The things people actually ask before they get in touch. If
                yours isn&apos;t here, just ask us.
              </p>
              <div className="mt-8">
                <GoogleRating tone="ink" />
              </div>

              <div className="mt-10 border-t border-[rgba(10,10,12,.14)] pt-8">
                <p className="display text-[1.4rem]">Still not sure?</p>
                <p className="mt-3 max-w-[32ch] text-[15px] text-ink-70">
                  Ask us anything, including whether we&apos;re the wrong people
                  for the job. We&apos;d rather tell you that now than take your
                  money and find out later.
                </p>

                <div className="mt-7 space-y-4">
                  <div>
                    <p className="text-[13px] text-ink-55">Call or text</p>
                    <a
                      href={`tel:${PHONE_HREF}`}
                      className="display text-[1.55rem] transition-opacity hover:opacity-60"
                    >
                      {PHONE}
                    </a>
                  </div>
                  <div>
                    <p className="text-[13px] text-ink-55">Email</p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="break-all border-b border-[rgba(10,10,12,.25)] pb-0.5 text-[15px] transition-colors hover:border-ink"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>

                <div className="mt-8 rounded-sm bg-[rgba(10,10,12,.05)] p-5">
                  <p className="text-[13px] text-ink-55">Reply time</p>
                  <p className="mt-1 text-[15px] text-ink-70">
                    Same day, 9 AM – 7 PM, every day. From one of us, not a
                    ticketing system.
                  </p>
                </div>
              </div>
            </div>
            <Faq items={FAQS} />
          </div>
        </section>

        {/* ───────────── Contact ───────────── */}
        <section id="contact" className="py-28">
          <div className="shell grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="display text-h2 text-paper">
                Ready when you are.
              </h2>
              <p className="mt-6 max-w-[38ch] text-mute">
                Tell us what&apos;s not working. If we&apos;re not the right fit
                we&apos;ll say so and point you somewhere better.
              </p>
              <div className="mt-10 space-y-6">
                <div>
                  <p className="text-[13px] text-mute-dim">Call or text</p>
                  <a
                    href={`tel:${PHONE_HREF}`}
                    className="display mt-1 block text-[1.75rem] text-teal transition-opacity hover:opacity-75"
                  >
                    {PHONE}
                  </a>
                </div>
                <div>
                  <p className="text-[13px] text-mute-dim">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-1 block break-all text-[1.05rem] text-paper underline decoration-[var(--color-hair)] underline-offset-4 transition-colors hover:decoration-teal"
                  >
                    {EMAIL}
                  </a>
                </div>
                <div>
                  <p className="text-[13px] text-mute-dim">We reply</p>
                  <p className="mt-1 text-[1.05rem] text-paper">
                    Same day, {HOURS}
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-mute-dim">Home turf</p>
                  <p className="mt-1 text-[1.05rem] text-paper">
                    {HOME_TOWNS.join(", ")}.
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-mute-dim">Also building in</p>
                  <p className="mt-1 text-[1.05rem] text-paper">
                    Kingston, Waterloo and London.
                  </p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        <footer className="border-t border-[var(--color-hair)] py-12">
          <div className="shell flex flex-wrap items-center justify-between gap-6">
            <p className="display text-[1.5rem] text-paper">
              R<span className="text-teal">&</span>GD
            </p>
            <nav className="flex gap-7 text-[14px] text-mute-dim">
              <Link href="/work" className="hover:text-teal">
                Work
              </Link>
              <a href="#services" className="hover:text-teal">
                Services
              </a>
              <a href="#pricing" className="hover:text-teal">
                Pricing
              </a>
              <Link href="/privacy" className="hover:text-teal">
                Privacy
              </Link>
            </nav>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
              <a
                href={`tel:${PHONE_HREF}`}
                className="text-mute transition-colors hover:text-teal"
              >
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-mute transition-colors hover:text-teal"
              >
                {EMAIL}
              </a>
            </div>
            <p className="w-full text-[14px] text-mute-dim md:w-auto">
              © {new Date().getFullYear()} Ross &amp; Griffiths Digital —
              Cobourg, Ontario
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
