export const HOURS = "9 AM – 7 PM, every day";

export const TOWNS = [
  "Cobourg",
  "Port Hope",
  "Brighton",
  "Colborne",
  "Trenton",
  "Campbellford",
];

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
};

export const ESSENTIALS: Essential[] = [
  {
    name: "Online booking",
    problem: "You lose the booking because you were under a car.",
    detail:
      "Customers pick a slot themselves, it lands in your calendar, and they get the reminder. No phone tag, no double-bookings, no evenings spent returning calls.",
  },
  {
    name: "Payments & e-commerce",
    problem: "You're chasing people for money you already earned.",
    detail:
      "Take card payments, deposits, or sell products directly. Connects to the till you already use rather than replacing it.",
  },
  {
    name: "Digital invoicing",
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

/* ── Portfolio ────────────────────────────────────────────── */

export type Project = {
  slug: string;
  name: string;
  sector: string;
  year: string;
  status: "Live" | "In progress" | "Concept";
  image: string | null;
  href: string | null;
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
    href: "https://jm-home-services-9l4n7507d-rossgriffithsdigitals-projects.vercel.app/",
    summary:
      "A five-page site for a window and exterior cleaning business — quote requests, service areas, and a review wall.",
    detail:
      "Built as a working demonstration of what a trades site looks like when it's designed rather than assembled: a quote form that asks the right questions, service-area pages that rank locally, and a review section that earns trust before anyone picks up the phone. Shown here anonymised — the client hasn't launched.",
    tags: ["Trades", "Quote form", "Service areas", "Review wall"],
    accent: "#3ecfcf",
  },
];
