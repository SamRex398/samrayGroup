# Samray Group — Website

A responsive React and Vite website for Samray Group. The Group site brings together
Energy, Agriculture, and Sports. Samray Energy Solutions has its own routes and uses
the approved energy website copy.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and serve the generated `dist/` directory.
The site uses clean URL paths, so production hosting must rewrite unknown paths to
`index.html` for direct visits to inner pages.

## Main routes

| Route | Page |
|---|---|
| `/` | Samray Group homepage |
| `/about` | About the Group |
| `/businesses/energy` | Samray Energy Solutions |
| `/businesses/agriculture` | Agriculture |
| `/businesses/sports` | Sports |
| `/whatwedo` | Energy development and technical services |
| `/projects` | Solar project portfolio |
| `/projects/drc` | DRC solar PV project |
| `/projects/car` | Central African Republic solar program |
| `/experience` | Oil and gas technical services experience and selected references |
| `/otherinterests` | Agriculture and Sports overview |
| `/partner` | Energy partnership information |
| `/contact` | Enquiry form |
| `/legal`, `/privacy` | Legal notice and privacy information |

## Design system

- **Palette:** Primary Blue `#2F35D3`, Deep Energy Blue `#1A237E`, Energy Gold
  `#F4BE18`, Solar Gold `#FFD54A`, Paper `#FAFAF8`, Surface `#FFFFFF`, Surface Alt
  `#F3F6FB`, Border `#D9E2EF`, and the approved primary, secondary, and muted text
  colors.
- **Typography:** Space Grotesk for editorial headlines, Inter for body copy, and
  Space Mono for labels and technical details.
- **Components:** Inter 600 primary-blue buttons with 12px corners; 20px cards; a
  white 84px navigation bar; four-column glass stat cards on dark sections.
- **Motion:** restrained reveal and hover transitions, with a full
  `prefers-reduced-motion` fallback and visible content when Intersection Observer is
  unavailable.
- **Navigation:** scroll-aware desktop header and a keyboard-operable mobile menu.

## Contact form integration

The contact form submits to the Node API in `server.js`, which validates the request,
rejects the honeypot, applies a per-process limit of five enquiries per IP per 15
minutes, and sends accepted messages through Resend. It never reports success until
Resend accepts the message. The in-memory rate limit is a basic safeguard for a
single API instance; use a shared rate-limit store before scaling the API horizontally.

The site is a Render Static Site, so deploy the API as a separate Render **Web
Service** from this repository:

1. Create a Render Web Service using Node 20 or newer. Set the build command to
   `npm install`, the start command to `npm run start:api`, and the health-check path
   to `/health`.
2. Add these environment variables to the Web Service:
   - `RESEND_API_KEY`: a Resend API key (keep it private; never use a `VITE_` prefix).
   - `CONTACT_TO_EMAIL`: comma-separated recipient inboxes, for example
     `as@samraygroup.com,info@samraygroup.com`.
   - `CONTACT_FROM_EMAIL`: `Samray Website <website@samraygroup.com>` (use this
     only after verifying `samraygroup.com` in Resend).
   - `ALLOWED_ORIGINS`: the exact website origins allowed to submit, comma-separated
     if needed (for example, `https://www.samraygroup.com,https://samraygroup.com`).
3. In the Render Static Site settings, set the build command to
   `npm install && npm run build`, the publish directory to `dist`, and the
   build-time variable `VITE_CONTACT_ENDPOINT` to
   `https://<your-api-service>.onrender.com/api/contact`. Redeploy the Static Site
   whenever this endpoint changes.

For local development, run the API and Vite in separate terminals. Configure the
four API variables above in the API process, including
`ALLOWED_ORIGINS=http://localhost:5173`, then run `npm run start:api` and `npm run
dev` in the other terminal. Vite proxies `/api` requests to
`http://localhost:10000` by default; override this with `CONTACT_API_PROXY_TARGET`
if the API listens elsewhere.

The API does not store enquiries. Resend delivers them to the configured inbox, with
the enquirer's address set as reply-to. Confirm the sender domain in Resend and
configure the production origins before testing a live submission. Never put API
credentials in `VITE_` variables. Review the privacy and legal copy and confirm the
company contact details before launch.

## Assets and launch checks

The supplied `public/logo-light-bg.png` and `public/logo-dark-bg.png` logos are used
throughout the shared header and footer. The Sports portfolio card and sector page use
the supplied `public/samraySportsImage.png` as explicitly illustrative imagery, not
as evidence of a Samray site or project. Other photography references remote Unsplash images in
`src/lib/images.js` as visual placeholders; replace them with approved, licensed
Samray photography before launch. Confirm project facts, project statuses, rights to
publish the client and end-user references listed on the Experience page, leadership
and governance details, image permissions, contact details, legal copy, and privacy
handling before publication. The source content still has unresolved
registered-address, email, telephone, and response-time fields. The About-page
portfolio map describes areas of focus, not legal ownership or reporting lines.
Agriculture and Sports are Group-level interests alongside the core energy business.
