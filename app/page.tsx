import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";

const INTEGRATIONS = [
  "Online booking",
  "POS & e-commerce",
  "Smart scheduling",
  "Digital invoicing",
  "WhatsApp & SNS",
  "Calendar sync",
  "Waitlists",
];

const PROCESS = [
  {
    n: "01",
    t: "We talk",
    d: "A coffee or a phone call. We find out what's actually slowing your business down — which is usually not the thing you think it is.",
  },
  {
    n: "02",
    t: "We build",
    d: "Designed around your business, written from scratch. You get a link to watch it come together, not a three-week silence.",
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
  return (
    <>
      <Nav />
      <main id="top">
        {/* ───────────────────────── Hero ───────────────────────── */}
        <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-[72px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[10%] top-[8%] h-[560px] w-[560px] rounded-full opacity-[0.07]"
            style={{
              background:
                "radial-gradient(circle, var(--color-teal) 0%, transparent 68%)",
            }}
          />
          <div className="shell relative grid gap-14 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="lift">
              <div className="mb-8 flex items-center gap-3 text-[13px] text-mute-dim">
                <span className="h-px w-8 bg-teal" />
                Cobourg, Ontario
              </div>

              <h1 className="display text-hero text-paper">
                Websites for people
                <br />
                who still{" "}
                <em className="italic text-teal">answer the phone.</em>
              </h1>

              <p className="mt-8 max-w-[46ch] text-lede text-mute">
                We build custom sites for small businesses across Northumberland
                County. Flat $999. No templates, no lock-in, no monthly ransom
                for the privilege of owning your own website.
              </p>

              <div className="mt-11 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="rounded-sm bg-teal px-8 py-4 font-medium text-ink transition-opacity hover:opacity-85"
                >
                  Start a project
                </a>
                <a
                  href="#work"
                  className="border-b border-[var(--color-hair)] px-1 py-4 text-mute transition-colors hover:border-teal hover:text-teal"
                >
                  See what we&apos;ve built
                </a>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-6 border-t border-[var(--color-hair)] pt-8 lg:mb-3 lg:grid-cols-1 lg:gap-7 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
              {[
                ["$999", "Flat build fee"],
                ["7–9 PM", "We reply, daily"],
                ["100%", "Yours to keep"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="display text-[1.9rem] text-teal">{k}</dt>
                  <dd className="mt-1 text-[14px] text-mute-dim">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ───────────────────────── Work ───────────────────────── */}
        <section id="work" className="bg-paper py-28 text-ink">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="display text-h2 max-w-[16ch]">
                One live site. We&apos;d rather show you it properly.
              </h2>
              <p className="max-w-[34ch] text-[15px] text-ink-55">
                We started this year. Rather than pad the page, here&apos;s the
                real thing, and what it does for the person who owns it.
              </p>
            </div>

            <div className="rule-dark my-14" />

            <article className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-[13px] text-ink-55">Sports photography</p>
                <h3 className="display mt-2 text-[2.5rem]">Badali Media</h3>
                <p className="mt-5 max-w-[48ch] text-ink-70">
                  Sam shoots athletes and teams across Northumberland. He was
                  losing enquiries to an Instagram DM pile nobody could search.
                  We built a portfolio that loads fast on a phone at a hockey
                  rink, and a booking form that lands in his inbox instead.
                </p>
                <ul className="mt-7 space-y-2 text-[15px] text-ink-70">
                  {[
                    "Custom build, no template",
                    "Portfolio gallery + contact form",
                    "SEO for local sports photography searches",
                  ].map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-[11px] h-px w-4 shrink-0 bg-ink opacity-30" />
                      {i}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://badalimedia.com"
                  className="mt-9 inline-block border-b border-ink pb-1 font-medium transition-opacity hover:opacity-60"
                >
                  Visit badalimedia.com →
                </a>
              </div>

              <div className="overflow-hidden rounded-sm border border-[rgba(10,10,12,0.12)] bg-ink p-3">
                <div className="flex gap-1.5 pb-3 pl-1">
                  {["#3ECFCF", "#B0C4D0", "#93AEC0"].map((c) => (
                    <span
                      key={c}
                      className="h-2 w-2 rounded-full opacity-50"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div className="flex aspect-[16/10] flex-col justify-center bg-navy px-9">
                  <p className="display text-[2.4rem] leading-none text-paper">
                    BADALI
                    <br />
                    <span className="text-teal">MEDIA</span>
                  </p>
                  <p className="mt-4 text-[13px] text-mute-dim">
                    Every moment. Every athlete. Every sport.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ───────────────────────── Services ───────────────────────── */}
        <section id="services" className="py-28">
          <div className="shell">
            <h2 className="display text-h2 max-w-[18ch] text-paper">
              Three things. We do them properly.
            </h2>

            <div className="mt-16 space-y-px">
              {[
                {
                  n: "01",
                  t: "Website build",
                  p: "$999 flat",
                  d: "Five pages, built from scratch around your business. Mobile-first, because that's where your customers actually are. SEO configured so Google knows you exist in Cobourg specifically. Hosted on Vercel, fast everywhere.",
                  tags: ["5 pages", "SEO setup", "Contact form", "Hosting"],
                },
                {
                  n: "02",
                  t: "Business essentials",
                  p: "Quoted per job",
                  d: "The tools that actually save you hours. Booking, payments, invoicing, waitlists, WhatsApp. These bolt onto any website — ours, or the one you already have and don't want to throw away.",
                  tags: ["Booking", "Payments", "Invoicing", "Any website"],
                },
                {
                  n: "03",
                  t: "Social media",
                  p: "Monthly",
                  d: "Instagram and TikTok, handled. We shoot and write, you approve every single post before it goes out. Nothing publishes under your name that you haven't read.",
                  tags: ["Instagram", "TikTok", "You approve everything"],
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className="group grid gap-6 border-t border-[var(--color-hair)] py-11 md:grid-cols-[auto_1fr_auto] md:gap-12"
                >
                  <span className="display text-[1.4rem] text-teal opacity-60">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="display text-h3 text-paper">{s.t}</h3>
                    <p className="mt-3 max-w-[58ch] text-mute">{s.d}</p>
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {s.tags.map((t) => (
                        <span key={t} className="text-[13px] text-mute-dim">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="whitespace-nowrap text-[14px] text-mute-dim md:text-right">
                    {s.p}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-20 border-t border-[var(--color-hair)] pt-12 lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <h3 className="display text-h3 text-paper">
                What we can bolt on
              </h3>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 lg:mt-0">
                {INTEGRATIONS.map((i) => (
                  <span key={i} className="text-mute">
                    {i}
                  </span>
                ))}
                <span className="text-mute-dim">…and more on request</span>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── Engineering ───────────────────────── */}
        <section className="bg-navy py-24">
          <div className="shell max-w-[820px] text-center">
            <p className="display text-[1.9rem] leading-[1.35] text-paper">
              The integrations are built with a{" "}
              <em className="italic text-teal">
                professional software engineer
              </em>{" "}
              whose day job is at Microsoft.
            </p>
            <p className="mt-6 text-mute">
              That&apos;s the part most local web shops can&apos;t do. Anyone can
              put up five pages. Wiring a booking system into a POS without it
              breaking every second Tuesday is a different job.
            </p>
          </div>
        </section>

        {/* ───────────────────────── Process ───────────────────────── */}
        <section id="process" className="bg-paper py-28 text-ink">
          <div className="shell">
            <h2 className="display text-h2 max-w-[15ch]">
              From first message to live site.
            </h2>
            <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
              {PROCESS.map((s) => (
                <div key={s.n} className="border-t border-[rgba(10,10,12,0.15)] pt-6">
                  <span className="display text-[1.2rem] text-ink-55">{s.n}</span>
                  <h3 className="display mt-2 text-[1.65rem]">{s.t}</h3>
                  <p className="mt-3 max-w-[46ch] text-ink-70">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── Pricing ───────────────────────── */}
        <section id="pricing" className="py-28">
          <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="display text-h2 text-paper">
                $999. That&apos;s the whole number.
              </h2>
              <p className="mt-6 max-w-[50ch] text-mute">
                Not a deposit, not a starting-from, not a monthly subscription
                you can never escape. One flat fee for the build. Integrations
                are quoted separately so you only pay for what you use.
              </p>
              <p className="mt-5 max-w-[50ch] text-mute-dim">
                This is our founding rate while we grow the portfolio. It will
                go up. If you get in now, your price is your price.
              </p>
            </div>
            <div className="border border-[var(--color-hair)] p-10">
              <p className="display text-[4rem] leading-none text-teal">$999</p>
              <p className="mt-2 text-mute-dim">CAD, one time</p>
              <div className="rule my-8" />
              <ul className="space-y-3 text-mute">
                {[
                  "Five custom pages",
                  "Mobile-first build",
                  "Local SEO setup",
                  "Contact form",
                  "Vercel hosting configured",
                  "You own the code and the domain",
                ].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[13px] h-px w-3 shrink-0 bg-teal" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────────────────────── Contact ───────────────────────── */}
        <section id="contact" className="bg-paper py-28 text-ink">
          <div className="shell grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="display text-h2">Ready when you are.</h2>
              <p className="mt-6 max-w-[38ch] text-ink-70">
                Tell us what&apos;s not working. If we&apos;re not the right fit
                we&apos;ll say so and point you somewhere better.
              </p>
              <div className="mt-10 space-y-5">
                <div>
                  <p className="text-[13px] text-ink-55">We reply</p>
                  <p className="mt-1 text-[1.05rem]">
                    Same day, 7–9 PM. Every day.
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-ink-55">We build for</p>
                  <p className="mt-1 text-[1.05rem]">
                    Cobourg, Port Hope, Brighton, Colborne, Trenton,
                    Campbellford.
                  </p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* ───────────────────────── Footer ───────────────────────── */}
        <footer className="border-t border-[var(--color-hair)] py-12">
          <div className="shell flex flex-wrap items-center justify-between gap-6">
            <p className="display text-[1.5rem] text-paper">
              R<span className="text-teal">&</span>GD
            </p>
            <p className="text-[14px] text-mute-dim">
              Ross &amp; Griffiths Digital — Cobourg, Ontario
            </p>
            <p className="text-[14px] text-mute-dim">
              © {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
