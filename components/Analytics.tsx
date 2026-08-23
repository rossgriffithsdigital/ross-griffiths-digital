"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "rgd-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics with Consent Mode v2.
 *
 * Analytics cookies are DENIED by default and only granted once the visitor
 * accepts. That's what PIPEDA (and GDPR, for any EU traffic) expects, and
 * loading GA unconditionally is the thing most small sites get wrong.
 */
export default function Analytics() {
  const [choice, setChoice] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChoice(localStorage.getItem(KEY));
    setReady(true);
    if (!GA_ID) {
      // Silent failure is worse than a noisy one: without this you get no
      // banner, no tracking, and no clue why.
      console.warn(
        "[analytics] NEXT_PUBLIC_GA_ID is not set — Google Analytics and the " +
          "cookie banner are disabled. Add it in Vercel (all environments) " +
          "and redeploy.",
      );
    }
  }, []);

  function decide(value: "granted" | "denied") {
    localStorage.setItem(KEY, value);
    setChoice(value);
    window.gtag?.("consent", "update", {
      analytics_storage: value,
      ad_storage: "denied",
    });
  }

  if (!GA_ID) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent','default',{
            analytics_storage: localStorage.getItem('${KEY}') === 'granted' ? 'granted' : 'denied',
            ad_storage: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>

      {ready && !choice && (
        <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-[var(--color-hair)] bg-ink/97 backdrop-blur-md">
          <div className="shell flex flex-wrap items-center justify-between gap-5 py-5">
            <p className="max-w-[62ch] text-[14px] leading-relaxed text-mute">
              We use Google Analytics to see which pages people find useful.
              Nothing is used for advertising and we don&apos;t sell anything to
              anyone.{" "}
              <a
                href="/privacy"
                className="text-teal underline underline-offset-4"
              >
                Privacy policy
              </a>
              .
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => decide("denied")}
                className="rounded-sm border border-[var(--color-hair)] px-5 py-2.5 text-[14px] text-mute transition-colors hover:text-paper"
              >
                Decline
              </button>
              <button
                onClick={() => decide("granted")}
                className="rounded-sm bg-teal px-5 py-2.5 text-[14px] font-medium text-ink transition-opacity hover:opacity-85"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
