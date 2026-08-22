# CLAUDE.md — Ross & Griffiths Digital

## Project
Agency marketing site. Next.js 16 App Router, React 19, Tailwind v4
(CSS-first `@theme`, no `tailwind.config.js`), TypeScript strict. Deployed on
Vercel. Contains a dynamic API route — do NOT add `output: 'export'` to
`next.config.mjs`.

## Business facts (never invent or change)
- **Name:** Ross & Griffiths Digital, Cobourg, Ontario
- **Service area:** Cobourg, Port Hope, Brighton, Colborne, Trenton, Campbellford (home turf), plus Kingston, Waterloo and London
- **Rate:** $999 CAD flat (founding rate — described as temporary in copy)
- **Reply window:** Same day, 9 AM – 7 PM, every day
- **Live client:** badalimedia.com — sports photography portfolio
- **Integrations partner:** Software engineer at Microsoft (day job)
- **Process:** Talk → Design & build → Client approves → Launch
- **Currency:** All prices are CAD. Always write the currency explicitly — "$999 CAD", never a bare "$999".
- **Services:** (1) Website build $999 CAD flat. (2) Monthly support $50 CAD/mo, up to 3 revisions; extras quoted. (3) Business Essentials from $100 CAD/mo, priced on scale. **Social media management was DISCONTINUED — never reintroduce it.**
- **Hosting:** Never name the host publicly. Say "hosting configured and the backend secured". Contact form sends via Amazon SES; required env vars are SES_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, FROM_EMAIL, TO_EMAIL.
- **Contact:** Phone 905 207-3396. Email is defined once in lib/content.ts as EMAIL — never hardcode it elsewhere.
- **Reviews:** Google rating is displayed with the honest review count. Never inflate the count and never add aggregateRating JSON-LD.
- **Hero headline:** "Your business deserves a better website." This is the client's chosen line and is FINAL. Note the spelling is "Your", not "You're".

## Locked design tokens
Match printed business cards. **Never change values or variable names.**
Defined in the `@theme` block in `app/globals.css`:

| Token              | Value     | Role                     |
|--------------------|-----------|--------------------------|
| `--color-ink`      | `#0a0a0c` | Base dark / page default |
| `--color-navy`     | `#0d1520` | Dark panels              |
| `--color-card`     | `#111820` | Card surfaces            |
| `--color-paper`    | `#edf3f7` | Light sections           |
| `--color-teal`     | `#3ecfcf` | Accent / CTA             |
| `--color-mute`     | `#b0c4d0` | Body text on dark        |
| `--color-mute-dim` | `#93aec0` | Secondary text on dark   |

Derived tokens (`paper-2`, `ink-70`, `ink-55`, `hair`, `hair-dark`) may be tuned as needed.

## Typography
- **Display/headings:** `Instrument_Serif` via `next/font/google`, weight 400, italic
  loaded. Class `.display`. Variable `--font-instrument` → `--font-display`.
- **Body/UI:** `DM_Sans` via `next/font/google`. Variable `--font-dm` → `--font-sans`.
- **Banned:** `Space Grotesk`, `Outfit`, `Poppins`, `Inter`, `Manrope` — read as AI-generated.

## Design rules (anti-AI-generated corrections)
1. **No particle/constellation/animated-canvas backgrounds.** Ever.
2. **No uppercase letter-spaced eyebrow labels** above section headings.
   Use numerals (`01/02/03`) and `.rule` hairlines for hierarchy instead.
3. **Motion and interaction ARE wanted** — scroll reveals, marquees, carousels,
   magnetic buttons. All motion must respect `prefers-reduced-motion`. Still
   banned: glow, gradient-mesh, neon, glassmorphism, particle canvases. The
   teal radial in the hero at `opacity-[0.07]` is the ceiling — do not exceed it.
4. **Alternate light and dark sections so the page is never wall-to-wall dark.**
   `bg-navy` counts as a tonal break between two ink sections, not as a light
   section. At least every third section should be `bg-paper`.
5. **Prefer asymmetry** over uniform card grids.
6. **Serif italic is the emphasis device** inside headlines — `<em className="italic text-teal">`.
7. **No stock photography of people.**

## Layout conventions
- `.shell` — max-width 1180px, `margin-inline: auto`, `padding-inline: 1.5rem`
- `.display` — Instrument Serif, wt 400, `letter-spacing: -0.015em`, `line-height: 1.02`
- `.rule` / `.rule-dark` — 1px hairlines (teal 18% / ink 14% opacity)
- `.lift` — entry animation (`opacity + translateY 14px`), 0.7s; respects `prefers-reduced-motion`
- Type scale: `--text-hero`, `--text-h2`, `--text-h3`, `--text-lede` — all `clamp()`-based

## File map
```
app/
  globals.css           @theme tokens, @layer base/utilities, keyframes
  layout.tsx            Fonts, metadata, ProfessionalService JSON-LD schema
  page.tsx              Single-page site (all sections inline)
  work/page.tsx         Portfolio gallery + carousel
  robots.ts / sitemap.ts
  api/contact/route.ts  POST handler — wire to Resend before launch (see TODO)
components/
  Nav.tsx               Sticky nav, scroll-solidify, mobile hamburger
  ContactForm.tsx       Client form, inline validation, 4-state machine
  Motion.tsx            Scroll-reveal, reduced-motion system
  WorkGallery.tsx       Portfolio grid
  WorkCarousel.tsx      Portfolio carousel
lib/
  content.ts            Case study / work data
```

## Copy status — NOT FINAL
All body copy in `app/page.tsx` is a first-draft written by an assistant, not
by the client. It is placeholder in voice, not in fact. The hero headline in
particular is unresolved and pending rewrite. Do not treat existing copy as
approved. Business facts listed above ARE accurate and must be preserved
through any rewrite.

## Planned routes
```
/work                         BUILT — portfolio gallery + carousel
/work/badali-media            full case study (not yet built)
/services/website-build
/services/business-essentials
/web-design/[town]            generated: cobourg, port-hope, brighton,
                              colborne, trenton, campbellford
/pricing
/about
```
Local SEO is the primary growth lever. The site currently has one indexable
page; the target is roughly fifteen.

## This project is also a template
This codebase will be forked as `rgd-starter` for client builds. Keep
client-specific values isolated to three places:
- The `@theme` block in `app/globals.css`
- The metadata and JSON-LD in `app/layout.tsx`
- The copy in `app/page.tsx`

Do not scatter brand values into components.

## Security
- **Minimum Next.js: 16.3.2** (patches CVE-2025-66478 / GHSA-9qr9-h5gf-34mp, CVSS 10.0 RCE)
- Never downgrade below 16.3.2.
- Run `npm audit` after every dependency change. Zero high/critical before merging.
- `reactStrictMode: true` in `next.config.mjs` — do not remove.

## Contact form (incomplete — wire before launch)
`app/api/contact/route.ts` currently logs to console only.
- Add `RESEND_API_KEY` to Vercel → Settings → Environment Variables
- Replace the `console.log` with the Resend fetch stub in the file's comment

## Commands
```
npm run dev       dev server
npm run build     production build — must pass before merging
npx tsc --noEmit  type check only
npm audit         security check — run after any dep change
```

## Pre-merge checklist
- [ ] `npm run build` and `npx tsc --noEmit` pass
- [ ] `npm audit` — 0 high or critical vulnerabilities
- [ ] No banned font (`Space Grotesk`, `Outfit`, `Poppins`, `Inter`, `Manrope`)
- [ ] No uppercase letter-spaced eyebrow label added
- [ ] No particle/canvas/glow/glassmorphism effect added
- [ ] Section alternation: at least every third section is `bg-paper`
- [ ] All copy matches business facts listed above
