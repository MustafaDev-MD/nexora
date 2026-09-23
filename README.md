# Nexora — Production Next.js

Professional structure with components, data layer, hooks, and the original animation engine.

## Architecture

```
app/                  # App Router (pages + API)
  page.tsx            # composes sections
  layout.tsx          # metadata, fonts, html.js
  globals.css         # design system
  api/health/
components/
  layout/             # Navbar, Footer, Preloader, Shell
  sections/           # Hero → CTA (one file per section)
  ui/                 # Icon, IconSprite
  effects/            # EffectsEngine (Three.js + scroll)
data/                 # typed content (MVC "model")
hooks/                # shared React hooks
lib/                  # utils
public/nexora-app.js  # animation / WebGL engine
```

## Run

```bash
npm install
npm run dev
```

## Edit content

Change copy in `data/*.ts` — components stay untouched.

## Animations

`EffectsEngine` loads Three.js then `public/nexora-app.js` after mount.
DOM ids (`orb`, `mq`, `workCar`, `tl`, `tCar`, …) match the engine.
