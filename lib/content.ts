export const HOURS = "9 AM – 7 PM, every day";

/* ── Contact ──────────────────────────────────────────────
   Single source of truth. Never hardcode these anywhere else. */
export const EMAIL = "cq@rossgriffithsdigital.com";
export const PHONE = "905 207-3396";
export const PHONE_HREF = "+19052073396";

/* ── Google reviews ───────────────────────────────────────
   REVIEW_COUNT is stated openly on the page. Do not inflate it, and do not
   add aggregateRating JSON-LD until there are several genuine reviews —
   Google penalises self-serving review markup. */
export const GOOGLE = {
  rating: "5.0",
  count: 1,
  url: "https://www.google.com/search?q=Ross+%26+Griffiths+Digital+Cobourg",
};

export const TOWNS = [
  "Cobourg",
  "Port Hope",
  "Brighton",
  "Colborne",
  "Trenton",
  "Campbellford",
  "Kingston",
  "Waterloo",
  "London",
];

/* Home turf — used where a short, local-SEO-weighted list reads better
   than the full nine. */
export const HOME_TOWNS = TOWNS.slice(0, 6);

/* ── Core build ───────────────────────────────────────────── */

export const BUILD = {
  price: "$999",
  unit: "CAD, one time",
  includes: [
    "Five custom pages",
    "Mobile-first build",
    "Local SEO setup",
    "Contact form",
    "Hosting configured and the backend secured",
    "You own the code and the domain",
  ],
};

/* ── Monthly support ──────────────────────────────────────── */

export const SUPPORT = {
  price: "$50",
  unit: "CAD per month",
  blurb:
    "For businesses whose site changes often — a new promotion, a menu update, a fresh set of posts. You send it, we do it.",
  includes: [
    "Up to 3 revisions a month",
    "Content, promo and menu updates",
    "Ongoing hosting and security",
    "Extra revisions quoted per job",
  ],
};

/* ── Business Essentials ──────────────────────────────────── */

export type Essential = {
  name: string;
  problem: string;
  detail: string;
  featured?: boolean;
  popular?: boolean;
};

export const ESSENTIALS: Essential[] = [
  {
    name: "Online booking",
    featured: true,
    popular: true,
    problem: "You lose the booking because you were under a car.",
    detail:
      "Customers pick a slot themselves, it lands in your calendar, and they get the reminder. No phone tag, no double-bookings, no evenings spent returning calls.",
  },
  {
    name: "Payments & e-commerce",
    featured: true,
    problem: "You're chasing people for money you already earned.",
    detail:
      "Take card payments, deposits, or sell products directly. Connects to the till you already use rather than replacing it.",
  },
  {
    name: "Digital invoicing",
    featured: true,
    problem: "Invoices written twice — once on paper, once in the books.",
    detail:
      "Invoices generated, sent, and chased automatically. Paid ones reconcile themselves. You stop being your own accounts department.",
  },
  {
    name: "Smart scheduling",
    problem: "Staff rotas living in a group chat.",
    detail:
      "Shifts, availability, and job assignments in one place, synced to everyone's phone.",
  },
  {
    name: "Waitlists",
    problem: "A cancellation means an empty hour.",
    detail:
      "When someone drops out, the next person is offered the slot automatically. The gap fills itself.",
  },
  {
    name: "WhatsApp & SMS",
    problem: "Customers message on five platforms and you miss three.",
    detail:
      "Enquiries, confirmations and reminders routed to one inbox, sent from your business number.",
  },
  {
    name: "Calendar sync",
    problem: "Two calendars that disagree.",
    detail:
      "Bookings, jobs and personal commitments in a single view that updates everywhere at once.",
  },
];

export const ESSENTIALS_PRICE = {
  from: "$100",
  unit: "CAD per month, from",
  note: "Priced on scale and how many systems need to talk to each other. Quoted before anything is built — never a surprise.",
};

/* ── FAQ ──────────────────────────────────────────────────
   Also emitted as FAQPage JSON-LD, so answers must stay truthful. */

export const FAQS = [
  {
    q: "What does the $999 actually cover?",
    a: "Five custom pages designed around your business, built mobile-first, with local SEO configured, a working contact form, hosting set up and the backend secured. No template, no page-builder. It's a flat fee, not a deposit — there is no second invoice at the end.",
  },
  {
    q: "Do I actually own the website?",
    a: "Yes, completely — the code, the domain, the accounts. It all sits in your name. If you decide to work with someone else next year, you hand them the keys and walk away. Nothing is held hostage, and there's no monthly fee you have to keep paying to keep your own site online.",
  },
  {
    q: "How long does it take?",
    a: "Usually two to three weeks from the first conversation to going live, depending on how quickly you can get us your content — photos, service descriptions, prices. The build itself is rarely the slow part.",
  },
  {
    q: "I already have a website. Can you just add the booking system?",
    a: "Yes. Business Essentials bolt onto whatever you already have — Wix, Squarespace, WordPress, something a nephew built in 2016. We don't need to rebuild your site to give you online booking or digital invoicing.",
  },
  {
    q: "Do I have to take the monthly support?",
    a: "No. It's optional and you can cancel whenever. It's there for businesses whose site changes often — a restaurant updating menus, a shop running promotions. If your site is going to sit largely unchanged, you probably don't need it.",
  },
  {
    q: "Why is it so much cheaper than other agencies?",
    a: "Because we're new and building a portfolio. $999 is a founding rate and it will go up. If you come on now, your price stays your price. We'd rather have real work to show than charge full rate for an empty portfolio.",
  },
  {
    q: "What if I don't like it?",
    a: "Nothing goes live until you've seen it and said yes. Changes during the build are expected and aren't billed as extras — that's what the approval step is for. We'd rather spend an extra afternoon getting it right than launch something you're quietly unhappy with.",
  },
  {
    q: "Are you actually local?",
    a: "Yes — we're in Cobourg and we'll meet you for a coffee. We build across Northumberland County, and further afield in Kingston, Waterloo and London. You'll get a reply the same day, between 9 AM and 7 PM, from one of us rather than a ticketing system.",
  },
];

/* ── Portfolio ────────────────────────────────────────────── */

export type Project = {
  slug: string;
  name: string;
  sector: string;
  year: string;
  status: "Live" | "In progress" | "Concept";
  image: string | null;
  href: string | null;
  /** Overrides the auto-derived chrome bar URL in HeroShowcase. Use for
   *  anonymised or not-yet-launched projects where href is null or internal. */
  chromeUrl?: string;
  summary: string;
  detail: string;
  tags: string[];
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "badali-media",
    name: "Badali Media",
    sector: "Sports photography",
    year: "2026",
    status: "Live",
    image: "/work/badali-media.jpg",
    href: "https://badalimedia.com",
    summary:
      "A portfolio that loads fast on a phone at a hockey rink, and a booking form that lands in an inbox instead of a DM pile.",
    detail:
      "Sam shoots athletes and teams across Northumberland. Enquiries were arriving as Instagram messages nobody could search or track. We built a full portfolio site with a booking flow, and set up local SEO so he turns up for sports photography searches in the county.",
    tags: ["Custom build", "Booking flow", "Local SEO", "Gallery"],
    accent: "#2f6bff",
  },
  {
    slug: "lumera",
    name: "Luméra",
    sector: "Beauty tech · E-commerce",
    year: "2026",
    status: "In progress",
    image: "/work/lumera.jpg",
    href: null,
    summary:
      "A full storefront for at-home LED and microcurrent devices — catalogue, cart, checkout and inventory.",
    detail:
      "Built on Shopify rather than from scratch, because when you're selling physical stock the payments, tax and inventory plumbing matters more than bespoke code. Custom theme work, product photography direction, and a checkout tuned to convert on mobile. Storefront is password-protected until launch.",
    tags: ["E-commerce", "Shopify", "Custom theme", "Payments"],
    accent: "#b8323c",
  },
  {
    slug: "exterior-cleaning",
    name: "Exterior Cleaning Co.",
    sector: "Trades · Home services",
    year: "2026",
    status: "Concept",
    image: "/work/exterior-cleaning.jpg",
    href: null,
    chromeUrl: "yours could be next",
    summary:
      "A five-page site for a window and exterior cleaning business — quote requests, service areas, and a review wall.",
    detail:
      "Built as a working demonstration of what a trades site looks like when it's designed rather than assembled: a quote form that asks the right questions, service-area pages that rank locally, and a review section that earns trust before anyone picks up the phone. Shown here anonymised — the client hasn't launched.",
    tags: ["Trades", "Quote form", "Service areas", "Review wall"],
    accent: "#3ecfcf",
  },
];
