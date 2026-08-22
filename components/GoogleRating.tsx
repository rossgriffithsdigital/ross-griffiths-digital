import { GOOGLE } from "@/lib/content";

function Stars({ tone = "teal" }: { tone?: "teal" | "ink" }) {
  return (
    <span
      className="flex gap-[3px]"
      aria-label={`${GOOGLE.rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill={tone === "teal" ? "var(--color-teal)" : "var(--color-ink)"}
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.24L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function GoogleRating({
  tone = "teal",
}: {
  tone?: "teal" | "ink";
}) {
  const dark = tone === "teal";
  return (
    <a
      href={GOOGLE.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-sm border px-5 py-3 transition-opacity hover:opacity-80 ${
        dark
          ? "border-[var(--color-hair)]"
          : "border-[rgba(10,10,12,.16)]"
      }`}
    >
      <span
        className={`display text-[1.6rem] leading-none ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {GOOGLE.rating}
      </span>
      <Stars tone={tone} />
      <span
        className={`text-[13px] ${dark ? "text-mute-dim" : "text-ink-55"}`}
      >
        on Google · {GOOGLE.count} review{GOOGLE.count === 1 ? "" : "s"}
      </span>
    </a>
  );
}
