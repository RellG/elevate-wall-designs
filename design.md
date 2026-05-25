# Elevate Wall Designs — Design System

> A premium mockup for a South Florida custom wall-panel studio.
> Editorial-luxury tone: bone, walnut, champagne. Fraunces-quality display type, generous whitespace, hairline rules, oversized headlines.

---

## 1. Brand Positioning

| Axis | Direction |
|---|---|
| Tier | High-end residential |
| Voice | Quiet confidence, tailored, craft-led |
| Audience | South Florida homeowners upgrading bedrooms, living rooms, ceilings, feature walls |
| Promise | *Tailored to your space. Built to your measurements. Installed with precision.* |
| Forbidden | Contractor clip-art, stock "before & after" cheese, SaaS gradients, emoji ticks |

## 2. Aesthetic Direction

A blend of an **interior design studio monograph** and a **fashion-house lookbook**.
Imagery does the heavy lifting — the UI is mostly hairlines, numerals, and serif headlines that step out of the way.

- Oversized display serif headlines (clamp 56–150px), 0.85 line-height
- Editorial numeral labels (`— 01 / Services`) in mono uppercase
- Walnut accent line as the brand mark — one 1px champagne underline beneath every section number
- Imagery: warm-toned interior photography (bedrooms, slat walls, headboards), no people-stock
- Motion: hairline reveals, soft fades on scroll, before/after drag slider, transparent → solid sticky nav

## 3. Color Tokens

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#15110D` | Primary text, dark panels |
| `--bone` | `#F5F1EA` | Page background |
| `--cream` | `#FBF8F2` | Card surfaces |
| `--walnut` | `#3D2E22` | Deep secondary, feature blocks |
| `--champagne` | `#B89968` | Accent / hairline / CTA underline |
| `--champagne-deep` | `#8A6F46` | Hover state accent |
| `--stone` | `#928679` | Muted text |
| `--stone-soft` | `#C8BEB1` | Hairline rules |
| `--white` | `#FFFFFF` | Pure white reserved for imagery surfaces |
| `--error` | `#A4413A` | Form error |

Contrast: `--ink` on `--bone` = 14.8:1. `--champagne` on `--ink` = 4.9:1 (AA). `--stone` on `--bone` = 4.6:1.

## 4. Typography

- **Display:** Cormorant Garamond — 400 / 500 / 600 / italic. Tracking -0.01em. Line-height 0.92 for headlines.
- **Body:** Inter Tight — 300 / 400 / 500 / 600. Tracking -0.005em. Line-height 1.55.
- **Mono label:** JetBrains Mono — 500 uppercase, tracking 0.18em, used only for section numerals and form labels.

Scale (rem at 16px base):
```
display-xl  clamp(3.5rem, 9vw, 9.5rem)   /* hero */
display-l   clamp(2.6rem, 6vw, 5.25rem)  /* section heads */
display-m   clamp(1.9rem, 3.4vw, 2.75rem)/* card heads */
body-l      1.125rem
body        1rem
caption     0.8125rem
mono        0.7rem  letter-spacing 0.18em uppercase
```

## 5. Spatial System

8px base. Section padding `clamp(96px, 12vw, 200px)` vertical.
Max content width: 1280px. Editorial gutter: `min(64px, 6vw)`.

## 6. Components

- **Sticky Nav** — transparent over hero, solidifies to `--bone` with hairline rule once scrolled past 80px
- **Section Number Label** — `— 01 / Services` mono, sits above every section head
- **Service Card** — cream surface, hairline border, hover lifts 4px and reveals champagne underline
- **Gallery Tile** — CSS columns masonry, hover overlay reveals project title + room type
- **Before/After Slider** — drag handle with hairline track, champagne grip
- **Testimonial** — large italic Cormorant quote, mono author label
- **Pricing Tier Card** — three cards, middle one elevated (walnut surface, cream text)
- **Form** — underline-only inputs, no boxes; champagne focus rule
- **Mobile sticky CTA bar** — appears below 760px, fixed bottom, ink surface, two buttons (Call / Estimate)

## 7. Motion

| Trigger | Effect |
|---|---|
| Page load | Hero headline staggers in, line by line, 80ms each |
| Scroll | `IntersectionObserver` fades+rises sections 16px → 0 |
| Sticky nav | Transparent → bone background, shadow on after 80px |
| Hover (links) | Champagne underline draws left → right (200ms) |
| Hover (cards) | translateY(-4px), shadow 0 18px 40px rgba(0,0,0,0.06) |
| Before/After | Drag or click-track; respects `prefers-reduced-motion` |

`prefers-reduced-motion: reduce` disables all transforms and slows transitions to opacity-only.

## 8. Accessibility

- WCAG AA color contrast on all text
- 44px minimum touch targets
- Focus rings: 2px solid `--champagne`, 2px offset
- All form fields labelled, `aria-describedby` for hints
- Lightbox traps focus, Escape closes
- Decorative numerals marked `aria-hidden`

## 9. Page Structure (single-page anchored)

1. Hero — headline, dual CTA, scroll cue
2. Services (— 01) — 7 service cards
3. Portfolio (— 02) — masonry gallery with filter chips + lightbox
4. Before/After (— 03) — interactive drag slider
5. How It Works (— 04) — 5 numbered steps
6. Pricing (— 05) — 3 starting-price tiers + custom-quote callout
7. Testimonials (— 06) — 3 cards, editorial italic quotes
8. About (— 07) — story + service area
9. Contact (— 08) — premium inquiry form + phone/IG
10. Footer — hairline, brand mark, phone, IG, service area

## 10. Imagery Direction (placeholders)

Use Unsplash interior photography keywords:
`fluted wall`, `slat wall bedroom`, `upholstered headboard`, `wood accent wall`, `dark feature wall living room`, `coffered ceiling`, `wainscoting bedroom`. Warm tones only — no cool greys or staged white kitchens.

## 11. Tech / Delivery

- Static HTML/CSS/JS — no framework
- `server.js` (Express, port from env) for Render static hosting
- Tokens exported as both `tokens.json` (design source of truth) and `tokens.css` (consumed by `styles.css`)
- Single bundle, no build step
