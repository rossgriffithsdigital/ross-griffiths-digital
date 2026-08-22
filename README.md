# Ross & Griffiths Digital — site

Next.js 15 (App Router) · React 19 · Tailwind v4 · TypeScript

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Locked design tokens

Defined in `app/globals.css` under `@theme`. The first six match the
printed business cards — **do not change them**:

| Token      | Hex       |
|------------|-----------|
| `ink`      | `#0a0a0c` |
| `navy`     | `#0d1520` |
| `card`     | `#111820` |
| `paper`    | `#edf3f7` |
| `teal`     | `#3ecfcf` |
| `mute`     | `#b0c4d0` |

Use them as Tailwind classes: `bg-ink`, `text-teal`, `border-hair`.

## Type

- Display / headings — Instrument Serif (`.display`)
- Body / UI — DM Sans (default)

Both self-hosted at build time via `next/font/google`. No layout shift,
no external request at runtime.

## Contact form

`components/ContactForm.tsx` posts to `app/api/contact/route.ts`, which
currently logs to the server console. To send real email, add
`RESEND_API_KEY` in Vercel → Settings → Environment Variables and
uncomment the block in the route.

## Deploying

Push to GitHub. Vercel picks it up automatically. Framework preset
detects as Next.js — no configuration needed.

## Reusing this as a client starter

Everything client-specific lives in three places:

1. `@theme` block in `app/globals.css` — colours and type
2. `app/layout.tsx` — metadata, JSON-LD schema, area served
3. `app/page.tsx` — copy and section order

Swap those three and the structure carries over.
