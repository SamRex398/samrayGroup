# Samray Energy Solutions — Website Redesign (JSX)

A React + JSX + Tailwind rebuild of the Samray Energy page, built to Samray's official
design system (Primary Blue / Deep Energy Blue / Energy Gold), using the company's real
logo. No TypeScript — plain `.jsx`/`.js` throughout.


## Quick start

```bash
npm install
npm run dev
```

## What's intentionally left out (for now)

The contact form and "open roles" flow (and the modal system behind them) have been
removed — not needed at this stage:

- No "Talk to us" button in the nav
- No "See open roles" button in the hero or Careers band
- No "Get in touch" / "Open roles" links in the footer
- Project cards are static info panels (no click-to-inquire)

The Careers section still exists as an informational band; add a CTA back in whenever
a contact flow is ready.

## Design tokens

| Token | Value | Use |
|---|---|---|
| Primary Blue | `#2F35D3` | Buttons, links, icons, active nav |
| Deep Energy Blue | `#1A237E` | Hero, footer, dark/premium sections |
| Energy Gold | `#F4BE18` | Sparing accent — highlights, energy icons |
| Solar Gold | `#FFD54A` | Secondary accent, gradients |
| Paper / Surface / Surface Alt | `#FAFAF8` / `#FFFFFF` / `#F3F6FB` | Backgrounds |
| Border | `#D9E2EF` | Dividers, card borders |
| Text Primary/Secondary/Muted | `#1A1F2E` / `#5D6678` / `#8B95A7` | Type hierarchy |
| Success/Warning/Danger/Info | `#1FA971` / `#E59A00` / `#D64545` / `#2F7AE5` | Status colors |

**Typography:** Space Grotesk (hero + major section titles only), Inter (body, card
titles), IBM Plex Mono (eyebrows, stat labels, technical tags).

**Components:** Buttons — 12px radius (`rounded-btn`), Primary/Secondary/Accent variants.
Cards — 16px radius (`rounded-card`), white background, thin blue-tinted border, soft
shadow.

**Signature element:** the animated Upstream → Midstream → Downstream flow diagram in
`ValueChain.jsx`.

**Featured initiative:** `Projects.jsx` leads with a currently-signed project (Central
African Republic solar-diesel hybridization) via `FeaturedInitiative.jsx`, ahead of the
historical "Track record" grid.

## Logo usage

- `public/logo-light-bg.png` — white/Paper surfaces (nav)
- `public/logo-dark-bg.png` — Deep Energy Blue surfaces (footer)

Referenced via `src/lib/images.js` → `LOGO.light` / `LOGO.dark`.

## Structure

```
src/
  components/
    ui/            Button, Reveal, Eyebrow/StatusBadge
    sections/       Nav, Hero, ValueChain, About, Sectors, Projects,
                     FeaturedInitiative, Careers, Footer
  lib/              images.js, scroll.js, utils.js
  App.jsx
  main.jsx
  index.css
public/
  logo-light-bg.png
  logo-dark-bg.png
```

## Accessibility

- Semantic landmarks, visible focus rings in Primary Blue
- Decorative icons are `aria-hidden`
- Type/background combinations checked against WCAG AA
- Respects `prefers-reduced-motion`

## Before shipping

1. Replace Unsplash placeholder photography in `src/lib/images.js` with licensed
   Samray photography
2. Re-add a contact/careers flow when ready (form, email, or a connected CRM)
