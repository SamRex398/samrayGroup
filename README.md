# Samray Energy Solutions — Website Redesign

A React + TypeScript + Tailwind rebuild of the Samray Energy page, built to Samray's
official design system: a premium industrial/corporate engineering aesthetic (not a
generic AI-SaaS look), using the company's real logo.

> **Note on sourcing:** samraygroup.com blocks automated crawling (robots.txt disallow),
> so the copy was built from the page's public text content rather than a pixel-for-pixel
> scrape. Swap in real photography and exact copy before shipping.

## Quick start

```bash
npm install
npm run dev
```

Open `preview.html` for a zero-install, CDN-based preview of the same UI (share this
without needing a build step — keep it in the same folder as `logo-light-bg.png` and
`logo-dark-bg.png`).

## Design tokens (per brand spec)

| Token | Value | Use |
|---|---|---|
| Primary Blue | `#2F35D3` | Buttons, links, icons, active nav |
| Deep Energy Blue | `#1A237E` | Hero, footer, dark/premium sections |
| Energy Gold | `#F4BE18` | Sparing accent — highlights, energy icons, CTA emphasis |
| Solar Gold | `#FFD54A` | Secondary accent, gradients |
| Paper | `#FAFAF8` | Page background |
| Surface | `#FFFFFF` | Cards, forms |
| Surface Alt | `#F3F6FB` | Alternate section background |
| Border | `#D9E2EF` | Dividers, card borders |
| Text Primary/Secondary/Muted | `#1A1F2E` / `#5D6678` / `#8B95A7` | Type hierarchy |
| Success/Warning/Danger/Info | `#1FA971` / `#E59A00` / `#D64545` / `#2F7AE5` | Status colors |

**Typography:** Space Grotesk (hero + major section titles only), Inter (body, card
titles), IBM Plex Mono (eyebrows, stat labels, technical tags, project IDs).

**Components:** Buttons use 12px radius (`rounded-btn`) in three variants — Primary
(blue/white), Secondary (white/blue border), Accent (gold/deep blue). Cards use 16px
radius (`rounded-card`), white background, thin blue-tinted border, soft shadow.

**Signature element:** the animated Upstream → Midstream → Downstream flow diagram in
`ValueChain.tsx`, rendered as a moving gold dashed line — a real business sequence, not
decoration.

## Logo usage

Two logo assets are provided (extracted with a transparent background from the supplied
brand files):

- `public/logo-light-bg.png` — used on white/Paper surfaces (nav, light sections)
- `public/logo-dark-bg.png` — used on Deep Energy Blue surfaces (footer)

Referenced via `src/lib/images.ts` → `LOGO.light` / `LOGO.dark`.

## Structure

```
src/
  components/
    ui/            Button, Reveal, Eyebrow/StatusBadge, modal system
    sections/       Nav, Hero, ValueChain, About, Sectors, Projects, Careers, Footer
  lib/              images.ts (photo + logo URLs), scroll.ts, utils.ts
  App.tsx
  main.tsx
  index.css
public/
  logo-light-bg.png
  logo-dark-bg.png
```

## Interactivity

- **Talk to us** (nav + footer) opens a working contact modal with client-side
  validation and a simulated send flow. Wire the `setTimeout` in `contact-modal.tsx`
  to a real endpoint before shipping.
- **See open roles** (hero, Careers band, footer) opens a roles modal; **Apply** drafts
  a real `mailto:` to careers@samraygroup.com.
- **Explore our work** smooth-scrolls to Projects; project cards open the contact modal.
- Nav links (desktop + mobile) smooth-scroll to their section.

## Accessibility

- Semantic landmarks, visible focus rings in Primary Blue
- Icon-only buttons have `aria-label`s; decorative icons are `aria-hidden`
- Type/background combinations checked against WCAG AA
- Respects `prefers-reduced-motion`

## Before shipping

1. Replace Unsplash placeholder photography in `src/lib/images.ts` with licensed
   Samray photography
2. Wire the contact form and roles application flow to real backends
3. Confirm logo files are exported at 2x/3x resolution for crisp retina rendering
