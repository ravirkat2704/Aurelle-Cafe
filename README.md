# AURELLE — Café, Kitchen & Banquets

React + Vite + Tailwind + GSAP + Framer Motion + React Three Fiber, with an Express API.

## Run
```bash
npm install
npm run dev          # frontend at http://localhost:5173
npm run server       # optional API at http://localhost:5000 (separate terminal)
```
Production: `npm run build` then `npm run server` (the server also serves `dist/`).

By default forms run in **demo mode** (saved to browser localStorage). For real enquiries:
copy `.env.example` to `.env`, set `VITE_API_MODE=live`, rebuild, deploy the server.
Enquiries are written to `server/storage/enquiries.json`; `GET /api/admin/enquiries` (header `x-admin-token`) lists them.

## What to replace before launch
| File | Replace |
|---|---|
| `src/config/business.js` | domain, phone/WhatsApp, email, Instagram, hours, address verification, `menuPdf` |
| `src/data/menu.js` | approved dish names, descriptions, prices, ingredients, signature flags |
| `src/data/banquet.js` | capacity, packages, facilities, spaces (venue info shows "shared on enquiry" while null) |
| `src/data/content.js` | real testimonials (samples only show in dev), offers, copy |
| `src/config/media.js` | swap stock photos for original client photography |
| `public/media/hero.mp4` | hero video (falls back to poster image if missing) |
| `public/sitemap.xml`, `robots.txt`, `Seo.jsx` | real domain |
| `Privacy.jsx`, `Terms.jsx` | legal review |

## Highlights
- **Menu booklet**: 3D page-flip book (13 sheets, 10 category spreads, contents that jump to chapters, keyboard/swipe/edge-click). Single-page flip on mobile. Search or filters switch to the **cards view** (tilt, hover reveal, category tabs).
- **Shuffling cards**: "Find Your Craving" (home + menu) and "Celebration inspiration" (banquets). Drag the top card away or press the button.
- Dish modal with similar dishes, WhatsApp enquiries, banquet enquiry form (validation, honeypot, timing check, demo/live API).
- Sound is OFF by default (toggle in the navbar). Reduced-motion respected.

## Honesty rules built in
No prices, capacities, offers or reviews are invented. Unverified data is `null` and the UI degrades gracefully. Stock photos are labelled illustrative. AURELLE is a development brand name; get owner approval before commercial use.

## Notes
- Unsplash URLs could not be verified from the build sandbox; broken ones fall back to a branded placeholder. Replace in `src/config/media.js`.
- Booking of tables is intentionally not included.
