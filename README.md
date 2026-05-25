# Elevate Wall Designs — Client Demo

Premium single-page mockup for **Elevate Wall Designs**, a South Florida custom wall-panel studio.

Temporary demo hosted on **Render.com** for client pitch review.

## Stack
- Static HTML / CSS / vanilla JS — no build step
- Express static server (`server.js`) for Render hosting + security headers
- Design tokens in `tokens.json` → `tokens.css` (single source of truth)

## Local dev
```bash
npm install
npm run dev          # → http://localhost:2999
```

## Files
| File | Purpose |
|---|---|
| `index.html`   | Single-page site (anchored nav, 8 sections) |
| `styles.css`   | All styling (consumes tokens.css) |
| `tokens.css`   | CSS custom properties |
| `tokens.json`  | Design token source of truth |
| `app.js`       | Nav scroll, drawer, gallery filter + lightbox, before/after slider, form, smooth scroll |
| `server.js`    | Express static + `/healthz` + security headers |
| `design.md`    | Full design system documentation |
| `render.yaml`  | Render blueprint |

## Sections
1. Hero + editorial meta strip
2. Marquee strip (service tags)
3. Services grid (7)
4. Portfolio (filterable masonry + lightbox)
5. Before / After (drag slider)
6. Process (5 steps)
7. Pricing (3 tiers + custom-quote callout)
8. Testimonials (3 cards)
9. About + stats
10. Service Area (dark band)
11. CTA banner
12. Contact (premium inquiry form)
13. Footer + mobile sticky CTA

## Brand contacts in mockup
- Phone: **754-332-0699**
- Instagram: `@elevatewalldesigns` (placeholder)
- Service area: South Florida (Miami-Dade · Broward · Palm Beach)

## Template lineage
Structurally based on **agency-blackbook** (from `Production-Templates/templates/`) — editorial type, hairline rules, oversized headlines — but fully reskinned to warm luxury interior aesthetic. See `design.md` for the full creative brief.
