# CLAUDE.md — Elevate Wall Designs

Project-level guidance. Inherits from `~/tkprojects/CLAUDE.md` (port 2999, frontend-design skills, security headers, Render deploys).

## What this is

A **client demo / pitch mockup** for **Elevate Wall Designs** — a South Florida custom wall-panel studio (custom panels, upholstered/soft walls, slat walls, accent walls, headboard systems, ceiling features, full transformations).

Status: **temporary demo** hosted on Render.com as a Web Service. Not a production build — it's a pre-sale piece for the lead to review before any contract.

Repo: https://github.com/RellG/elevate-wall-designs
Live (Render web service): _add URL once live_

## Lead / brand contacts in mockup

- Phone: **754-332-0699** (`tel:+17543320699`)
- Instagram: `@elevatewalldesigns` (placeholder)
- Service area: South Florida — Miami-Dade · Broward · Palm Beach

## Stack

- Static HTML / CSS / vanilla JS — no framework, no build step
- `server.js` is a thin Express static server (security headers + `/healthz` + SPA-style 404 → `index.html`)
- Single-page anchored nav — all sections live in `index.html`

## File map

| File | Role |
|---|---|
| `index.html` | All sections (hero → footer) |
| `styles.css` | All styling — consumes `tokens.css` |
| `tokens.css` | CSS custom properties (color, type, scale, motion, layout) |
| `tokens.json` | Design token source of truth — keep in sync with `tokens.css` |
| `app.js` | Nav scroll state, mobile drawer, gallery filter + lightbox, before/after drag slider, form mock-submit, smooth-scroll offset |
| `server.js` | Express + SECURITY_HEADERS + `/healthz` |
| `design.md` | Full design system docs — palette, type scale, components, motion, a11y |
| `render.yaml` | Render Blueprint config |

## Design rules (don't violate without asking)

- **Aesthetic:** editorial luxury — bone (`#F5F1EA`) + walnut (`#3D2E22`) + champagne accent (`#B89968`) + ink text (`#15110D`). No cool greys, no SaaS gradients, no purple.
- **Type pairing:** Cormorant Garamond (display) + Inter Tight (body) + JetBrains Mono (numeral labels only). Don't swap these.
- **Hairlines, not boxes:** form inputs are underline-only; section heads use mono `— 0X / Label` with a single champagne dash. Avoid card shadows beyond `--shadow-lift`.
- **Italic = walnut + Cormorant italic** is a recurring micro-pattern — one italic word per major headline.
- **Imagery:** warm interior photography only. No people stock, no staged white kitchens.
- **Motion:** respect `prefers-reduced-motion`. New animations must check it.

When in doubt, re-read `design.md` — it is the canonical spec, not the code.

## Editing conventions

- **Tokens are the source of truth.** If a color/size needs to change, update `tokens.json` AND `tokens.css` together. Don't hardcode hex values in `styles.css` — use `var(--token)`.
- **One section = one labeled comment block** in `styles.css` (already structured this way — keep it). New sections follow the `/* ───────── Section Name ───────── */` divider.
- **Section numerals in `index.html`** (`— 01 / Services`, `— 02 / Portfolio`, …) — renumber sequentially if a section is added/removed.
- **No build step.** Keep it that way unless the user explicitly opts in.
- **Mobile breakpoints already used:** 960px (drawer/nav), 900px (most grids collapse), 760px (mobile CTA bar shows), 560px (gallery single column).

## Local dev

```bash
PORT=2999 node server.js > /tmp/elevate-wall.log 2>&1 &
curl -sI http://localhost:2999/
```

Always 2999 per top-level CLAUDE.md.

## Render deployment

- Type: **Web Service** (NOT Static Site — we need Express for headers + healthz)
- Build: `npm install` · Start: `npm start`
- No env vars required. Render injects `PORT`. `NODE_VERSION=20.11.1` is pinned in `render.yaml`.
- Health check path: `/healthz` → `{"ok":true,"app":"elevate-wall"}`
- Free tier sleeps after ~15 min idle — fine for demo, warn user before pitches.
- Auto-deploys on push to `main`.

## What the client may ask to change

Likely requests during demo iteration — handle without redesigning the system:

- **Copy edits** — headline, service descriptions, testimonials, pricing copy
- **Pricing numbers** — `Starting at $1,480` etc. live in the three `.tier__price` blocks in `index.html`
- **Real photography** — swap Unsplash URLs in `index.html` (hero `.hero__media`, `.gallery__tile`, `.about__img`, `.ba__before`/`.ba__after`)
- **Real Instagram handle / phone** — search/replace `754-332-0699`, `+17543320699`, `@elevatewalldesigns`
- **Brand mark / logo** — currently text-only in `.brand` and `.footer__brand`. If a logo arrives, swap in an SVG, keep `view-transition-name: brand-mark`
- **Lead form destination** — currently mocks submit in `app.js`. To wire real email, add a `/api/contact` route in `server.js` (Resend pattern from sibling tkprojects — env var must fail gracefully)
- **Additional service pages** — current build is single-page anchored. If client wants individual service pages, scaffold under `/services/<slug>/index.html` and keep tokens shared

## What to avoid

- Don't switch to React / Next / Astro for "future-proofing." This is a demo.
- Don't add a CMS. If content changes are frequent, point the client at a static-CMS option but don't implement without sign-off.
- Don't add tracking pixels / analytics without explicit user confirmation.
- Don't push to `main` without confirmation — Render auto-deploys.

## Security

Standard tkprojects rules apply. Never commit `.env`. `SECURITY_HEADERS` in `server.js` must be preserved on every response including the 404 fallback. No third-party API keys in this build yet — if a contact endpoint is added, the env var must be optional and the endpoint must return a graceful error when missing.
