# Samray Energy — Redesign

A modern React + TypeScript + Tailwind rebuild of the Samray Energy Solutions page
(samraygroup.com/samray-energy), aimed at 2026 SaaS-grade design quality while
preserving all original business content and user flows.

> **Note on sourcing:** samraygroup.com blocks automated crawling (robots.txt disallow),
> so this redesign was built from the page's public text content (search-indexed copy,
> company filings, and business descriptions) rather than a pixel-for-pixel scrape.
> Swap in real photography, exact copy, and live career listings before shipping.

## Quick start

```bash
npm install
npm run dev
```

Open `preview.html` in a browser for a zero-install, CDN-based preview of the same UI
(useful for quick sharing — the real app lives in `src/`).

## Design system

| Token | Value | Use |
|---|---|---|
| `ink` | `#0B1420` | Primary dark background |
| `surface` / `surface2` | `#111D2E` / `#16243A` | Cards & panels on dark |
| `paper` | `#F6F4EF` | Light section background |
| `copper` | `#B8703A` | Primary accent — CTAs, highlights |
| `teal` | `#2E9C93` | Secondary accent — flow diagram, gas/sustainability cues |
| Display type | Space Grotesk | Headlines, large numerals |
| Body type | Inter | Paragraph copy |
| Mono | IBM Plex Mono | Eyebrows, tags, stat labels |

**Signature element:** the animated Upstream → Midstream → Downstream flow diagram in
`ValueChain.tsx` — a real sequence in Samray's business, rendered as a moving dashed
line (like gas flow-through), not a decorative numbered list.

## Structure

```
src/
  components/
    ui/            shadcn-style primitives (Button, Reveal, Eyebrow)
    sections/       Nav, Hero, ValueChain, About, Sectors, Projects, Careers, Footer
  App.tsx
  main.tsx
  index.css
```

## What changed vs. the original

- Replaced generic stock-photo hero with a thesis-led headline, a real background
  photograph, and a live stat panel
- Turned the upstream/midstream/downstream description into an animated flow diagram
- Gave the four business lines (Energy, Agriculture, Sports, Media) distinct visual
  identity instead of undifferentiated text blocks
- Added a dedicated credibility/proof section (Zohr Field, Helm Field, IOC partnerships)
  with real photography
- Promoted Careers to a full-width CTA band instead of a buried nav link
- Rebuilt spacing, type scale, and color system for consistency
- Added scroll-reveal micro-animations, hover states, and keyboard focus rings
- Fully responsive (mobile nav, stacked grids) and respects `prefers-reduced-motion`

## Interactivity

Every button in this build does something real:

- **Talk to us** (nav + footer) opens a working contact modal with client-side
  validation (name, email format, message length) and a simulated send flow.
  Swap the `setTimeout` in `contact-modal.tsx` for a real API call before shipping.
- **See open roles** (hero, Careers band, footer) opens a roles modal listing sample
  openings; **Apply** drafts a real `mailto:` to careers@samraygroup.com.
- **Explore our work** smooth-scrolls to Projects; project cards open the contact modal
  to inquire.
- All nav links (desktop + mobile) smooth-scroll to their section instead of relying on
  bare anchor hrefs.

## Images

Photography is sourced from Unsplash (free license, no attribution required) as
stand-ins for real Samray photography:

- Hero background — offshore platform at night
- About panel — offshore gas platform
- Projects — Zohr Field / Helm Field (rig photo, two treatments) and the agriculture
  hub (aerial farmland)

Swap the URLs in `src/lib/images.ts` for licensed Samray photography before shipping.

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`, `nav[aria-label]`)
- Visible focus rings (`:focus-visible`) in copper
- Icon-only buttons have `aria-label`s; decorative icons are `aria-hidden`
- Color contrast checked against WCAG AA for text on both `ink` and `paper` backgrounds
- Reduced-motion media query disables animation for users who request it

## Next steps for production

1. Replace placeholder project imagery with real photography
2. Wire Careers CTA to an actual ATS/job board
3. Replace the "Talk to us" button with a real contact form or Calendly-style flow
4. Pull sector/project copy from a CMS if content changes frequently
