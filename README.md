# tigranagekyan.com

My personal portfolio site, live at **[tigranagekyan.com](https://tigranagekyan.com)**.

It's a single-page React app with motion-heavy sections, a live, clickable demo of my Simmer app, real-time stats from my home server, and a working contact form, all running on Cloudflare Pages.

## Highlights

- **Live Simmer demo.** The Work section opens a working build of Simmer in a phone-shaped floating window, next to an interactive diagram of its pipeline (URL → backend → transcription → AI extraction → database).
- **Live homelab stats.** A Cloudflare Pages Function signs in to my server's Beszel hub with a read-only user and returns CPU, memory, disk and uptime. Responses are cached at the edge for 30 seconds, so visitors never hit the server directly.
- **Contact form.** A second Pages Function sends messages through Resend. No backend server needed.
- **Motion and detail.** Scroll reveals, 3D tilt cards, a text-flip headline, a tracing beam, a background ripple effect and a photo/video marquee, built with Motion and Tailwind.
- **Responsive.** Every section is designed for phones as well as desktop, including tap-to-inspect states for elements that use hover on desktop.

## Tech stack

| Area | Tools |
|---|---|
| Framework | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4, shadcn/ui, Geist font |
| Animation | Motion |
| Icons | Lucide |
| Backend | Cloudflare Pages Functions |
| Email | Resend |
| Linting | Oxlint |
| Hosting | Cloudflare Pages |

## Project structure

```
functions/api/
  contact.ts        POST /api/contact  sends the contact form via Resend
  homelab.ts        GET  /api/homelab  live server stats from Beszel
src/
  components/       page sections: Hero, About, Work, Experience, Contact, Footer
    ui/             reusable animated components (3D card, marquee, tracing beam…)
  lib/              theme and utilities
style/              design spec and reference mockup
public/simmer-demo/ built Simmer demo, embedded in the Work section
```

## Running locally

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build to dist/
npm run lint      # run Oxlint
```

To test the API routes locally, run the build through Wrangler (`npx wrangler pages dev dist`) with the variables below in a `.dev.vars` file.

### Environment variables

Set these in **Cloudflare Pages → Settings → Variables and Secrets**:

| Variable | Used by | Purpose |
|---|---|---|
| `RESEND_API_KEY` | `/api/contact` | Sends contact form emails |
| `BESZEL_URL` | `/api/homelab` | Public address of the Beszel hub |
| `BESZEL_EMAIL` | `/api/homelab` | Beszel user with the read-only role |
| `BESZEL_PASSWORD` | `/api/homelab` | That user's password (store as a secret) |
| `BESZEL_SYSTEM` | `/api/homelab` | Server name as shown in Beszel |

### Updating the Simmer demo

```bash
npm run demo:sync
```

This builds the demo version of Simmer from `../recipe-app` and copies it into `public/simmer-demo/`.

## Deployment

Pushes to `main` deploy automatically through Cloudflare Pages. The site is served on `tigranagekyan.com`, and `www` redirects to the apex domain.

## Contact

**Tigran Agekyan** · [tigranagekyan.com](https://tigranagekyan.com) · [tigrana334@gmail.com](mailto:tigrana334@gmail.com)
