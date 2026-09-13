# Shifting Expert — Packers & Movers, East Bangalore

A mobile-first React + Vite + Tailwind CSS site with GSAP/ScrollTrigger reveal
animations and Lenis smooth scrolling. Every service and every East Bangalore
locality has its own working page and URL.

## Stack
- React 18 + React Router 6 (client-side routing)
- Vite 5
- Tailwind CSS 3 (custom navy/ember design tokens in `tailwind.config.js`)
- GSAP 3 + ScrollTrigger for scroll-triggered reveals and the hero intro
- Lenis for smooth scrolling, wired into GSAP's ticker (`src/lib/smoothScroll.js`)

## Run locally
```bash
npm install
npm run dev
```
Then open the printed local URL. `npm run build` produces a production build in `dist/`, and `npm run preview` serves that build locally.

## Site structure
- `/` — home page (hero, stats, services, areas, testimonials, FAQ)
- `/services` — all services
- `/services/:slug` — one page per service (house shifting, office relocation, packing, loading/unloading, vehicle transport, storage)
- `/areas` — all East Bangalore localities served
- `/areas/:slug` — one page per locality (Whitefield, Marathahalli, Indiranagar, etc.)
- `/about`, `/contact` — company info and the enquiry form

All services and areas are defined once in `src/siteData.js` — add a new
entry there and its page, nav links and sitemap-ready route are generated
automatically from the existing route templates (`ServiceDetail.jsx`,
`AreaDetail.jsx`).

## Animation notes
- `src/lib/smoothScroll.js` sets up Lenis and syncs it to GSAP's `ScrollTrigger`. It's skipped automatically when the visitor has `prefers-reduced-motion` set.
- `src/components/Reveal.jsx` is a small wrapper that fades/lifts its children into view once as they scroll into the viewport — used across the section grids.
- The homepage hero runs a single GSAP timeline on load (eyebrow → heading → copy → buttons → image → rating badge).

## Before launch
1. Add verified phone, WhatsApp, email and public address in `src/siteData.js` (`business` object — currently `PLACEHOLDER` values).
2. Replace the Unsplash placeholder photography in `src/siteData.js` (`images` object) with genuine job-site, crew and office photos. Current URLs are free-to-use stock images matched by subject, not real photos of this business.
3. Replace the sample testimonials in `src/siteData.js` (`testimonials`) with genuine, permissioned reviews.
4. Connect the enquiry form (`src/pages/Contact.jsx`) to a real CRM, email service, or server endpoint — it currently drafts a `mailto:` link and a WhatsApp deep link, with no backend.
5. Replace `YOUR-DOMAIN.example` in `public/sitemap.xml` and `public/robots.txt` with the real domain.
6. Add LocalBusiness JSON-LD structured data once verified business details (address, GSTIN, hours) are final.
7. Hosting must serve `index.html` for all routes (SPA fallback) — `public/_redirects` is set up for Netlify and `vercel.json` for Vercel; other hosts need an equivalent rewrite rule.
