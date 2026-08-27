import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";
import { EMAIL, PHONE, PHONE_HREF, HOURS, HOME_TOWNS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get in touch",
  description:
    "Tell us what's not working. If we're not the right fit we'll say so and point you somewhere better.",
  alternates: { canonical: "https://rossgriffithsdigital.com/contact" },
};

const VALID_PLANS = ["build", "support", "essentials"] as const;
type Plan = (typeof VALID_PLANS)[number];

function isValidPlan(p: unknown): p is Plan {
  return VALID_PLANS.includes(p as Plan);
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;
  const initialPlan = isValidPlan(params.plan) ? params.plan : "";

  return (
    <>
      <Nav />
      <main className="pb-28 pt-32">
        <div className="shell grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h1 className="display text-h2 text-paper">
              Ready when you are.
            </h1>
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
          <ContactForm initialPlan={initialPlan} />
        </div>
      </main>
    </>
  );
}
