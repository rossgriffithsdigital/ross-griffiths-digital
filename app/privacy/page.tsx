import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { EMAIL, PHONE, PHONE_HREF } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Ross & Griffiths Digital collects, uses and stores your information.",
  alternates: { canonical: "https://rossgriffithsdigital.com/privacy" },
  robots: { index: true, follow: true },
};

const UPDATED = "22 August 2026";

function S({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[rgba(10,10,12,.14)] py-9">
      <h2 className="display text-[1.5rem] text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-ink-70">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="bg-paper pt-[72px] text-ink">
        <div className="shell max-w-[820px] py-24">
          <div className="mb-6 flex items-center gap-3 text-[13px] text-ink-55">
            <span className="h-px w-8 bg-teal" />
            Last updated {UPDATED}
          </div>

          <h1 className="display text-h2">Privacy policy</h1>
          <p className="mt-6 text-lede text-ink-70">
            Ross &amp; Griffiths Digital is a web design business based in
            Cobourg, Ontario. This page explains what we collect, why, and what
            you can do about it. We&apos;ve tried to write it in plain English
            rather than the usual wall of legal boilerplate.
          </p>

          <div className="mt-12">
            <S title="What we collect">
              <p>
                <strong>When you use the contact form.</strong> Your name,
                email address, phone number, business name if you give one, and
                whatever you write in the message. That&apos;s it — there are no
                hidden fields.
              </p>
              <p>
                <strong>When you browse the site.</strong> If you accept
                analytics cookies, Google Analytics records pages viewed,
                roughly how long you stayed, the approximate region you&apos;re
                in, and what kind of device you used. Your IP address is
                anonymised before it&apos;s stored. If you decline, none of that
                is collected.
              </p>
              <p>
                Our hosting provider also keeps standard server logs — IP
                address, timestamp, page requested — for security and
                troubleshooting. That happens regardless of cookie choice,
                because it&apos;s how servers work, and those logs are held
                briefly and not used to build any profile of you.
              </p>
            </S>

            <S title="Why we collect it">
              <p>
                Contact form details exist so we can reply to you. That&apos;s
                the only reason. Analytics exists so we can tell which pages are
                useful and which are ignored. Nothing else.
              </p>
            </S>

            <S title="What we don't do">
              <ul className="space-y-2">
                {[
                  "We don't sell your information to anyone, at any price.",
                  "We don't run advertising or advertising cookies on this site.",
                  "We don't add you to a mailing list because you filled in the contact form.",
                  "We don't track you across other websites.",
                ].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[13px] h-px w-4 shrink-0 bg-ink opacity-30" />
                    {i}
                  </li>
                ))}
              </ul>
            </S>

            <S title="Who else can see it">
              <p>
                Three services handle your data on our behalf, and only to the
                extent they need to:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-[13px] h-px w-4 shrink-0 bg-ink opacity-30" />
                  <span>
                    <strong>Our hosting provider</strong> — serves the website
                    and runs the contact form.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-[13px] h-px w-4 shrink-0 bg-ink opacity-30" />
                  <span>
                    <strong>Amazon Web Services</strong> — delivers contact form
                    enquiries to our inbox by email.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-[13px] h-px w-4 shrink-0 bg-ink opacity-30" />
                  <span>
                    <strong>Google Analytics</strong> — only if you accept
                    analytics cookies.
                  </span>
                </li>
              </ul>
              <p>
                Some of these process data on servers outside Canada, including
                in the United States, which means that information may be
                subject to the laws of those countries.
              </p>
            </S>

            <S title="How long we keep it">
              <p>
                Enquiries stay in our email for as long as there&apos;s a
                sensible business reason — usually while we&apos;re talking, and
                for a period afterwards in case you come back. Ask us to delete
                yours and we will. Analytics data is retained by Google on their
                standard schedule.
              </p>
            </S>

            <S title="Cookies">
              <p>
                This site sets no cookies at all unless you accept analytics.
                Decline and you get the site with nothing stored. Your choice
                itself is remembered in your browser&apos;s local storage so we
                don&apos;t ask on every visit — clearing your browser data
                resets it and you&apos;ll be asked again.
              </p>
            </S>

            <S title="Your rights">
              <p>
                Under Canadian privacy law (PIPEDA) you can ask what we hold
                about you, ask for it to be corrected, ask for it to be deleted,
                and withdraw consent at any time. Email us and we&apos;ll do it
                — there&apos;s no form to fill in and no charge.
              </p>
              <p>
                If you think we&apos;ve handled your information badly, you can
                complain to the Office of the Privacy Commissioner of Canada at
                priv.gc.ca.
              </p>
            </S>

            <S title="Contact us">
              <p>
                Ross &amp; Griffiths Digital, Cobourg, Ontario, Canada.
              </p>
              <p className="flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="border-b border-ink pb-0.5 transition-opacity hover:opacity-60"
                >
                  {EMAIL}
                </a>
                <a
                  href={`tel:${PHONE_HREF}`}
                  className="border-b border-ink pb-0.5 transition-opacity hover:opacity-60"
                >
                  {PHONE}
                </a>
              </p>
            </S>

            <S title="Changes to this policy">
              <p>
                If we change how we handle data we&apos;ll update this page and
                change the date at the top. Material changes will be flagged on
                the site rather than slipped in quietly.
              </p>
            </S>
          </div>

          <Link
            href="/"
            className="mt-12 inline-block border-b border-ink pb-1 font-medium transition-opacity hover:opacity-60"
          >
            ← Back to the site
          </Link>
        </div>
      </main>
    </>
  );
}
