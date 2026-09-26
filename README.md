# Nexora — Next.js

Digital agency marketing site (App Router + Three.js effects).

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Run production build |

## Routes

| Path | Page |
|------|------|
| `/` | Home (all sections) |
| `/about` | About |

## Structure

```
app/           App Router pages + API
components/    UI, layout, sections, effects
data/          Content / copy
public/        Static assets + nexora-app.js + three.min.js
```

## Contact form (optional)

Copy `.env.example` → `.env.local` and set email provider keys if you wire Resend / similar.

## Deploy

Push to GitHub and import on Vercel. No special config required beyond env vars for contact.
