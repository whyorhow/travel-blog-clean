# PROJECT_CONTEXT.md

**Nomad Scribbles** — editorial travel blog  
**Repository:** `travel-blog-clean`  
**Package name:** `brazil-travel-blog` (historical CRA naming; do not rename without a migration plan)  
**Production:** `nomadscribbles.com`  
**Last updated:** 2026-07-13

This document describes **how the project is built** — architecture, routing, templates, deployment, assumptions, and current state.

| Document | Consult for |
|----------|-------------|
| `PROJECT_CONTEXT.md` | Architecture, stack, templates, CSS, images, deployment, priorities, success criteria |
| `AI_HANDOVER.md` | Historical decisions, traps, migration stories, why patterns look unusual |
| `REPOSITORY_INDEX.md` | File/folder locations, route→file mapping, risk levels |
| `AI_RULES.md` | How assistants should behave when editing |
DESTINATION_WORKFLOW.md | Step-by-step process for creating new destinations
---

## Table of Contents

1. [Overall Architecture](#1-overall-architecture)
2. [Project Priorities](#2-project-priorities)
3. [Routing Structure](#3-routing-structure)
4. [Template System](#4-template-system)
5. [Component Hierarchy](#5-component-hierarchy)
6. [CSS Organisation](#6-css-organisation)
7. [Coding Conventions](#7-coding-conventions)
8. [Naming Conventions](#8-naming-conventions)
9. [Image Organisation](#9-image-organisation)
10. [Vercel Deployment Process](#10-vercel-deployment-process)
11. [Git Workflow](#11-git-workflow)
12. [Current TODOs](#12-current-todos)
13. [Known Issues](#13-known-issues)
14. [Current Architectural Assumptions](#14-current-architectural-assumptions)
15. [High Risk Files](#15-high-risk-files)
16. [Success Criteria](#16-success-criteria)

---

## 1. Overall Architecture

### Stack

| Layer | Technology |
|-------|------------|
| Framework | Create React App (`react-scripts` 5.0.1) — **not ejected** |
| UI | React 18.2, functional components + hooks |
| Routing | `react-router-dom` 6.17 (`BrowserRouter`, v7 future flags) |
| Styling | Tailwind CSS 3.4 + design tokens in JS |
| Animation | Framer Motion 12 |
| Carousel | Swiper 12 |
| SEO | `react-helmet-async` |
| Fonts | `@fontsource/cormorant-garamond` (sync), `@fontsource/dancing-script` (deferred) |
| Images | Cloudinary CDN (`dqypj6rlw`) + local SVGs/textures |
| Contact API | Vercel serverless (`api/contact.js`) via Nodemailer + Gmail SMTP |
| Hosting | Vercel (CRA static build + serverless functions) |

### High-level architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  src/index.js — dual bootstrap (mobile shells vs desktop App)   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         ▼                                     ▼
  Mobile*ShellApp.js                    src/App.js
  (≤767px, LCP-optimised)              (full React app)
         │                                     │
         └──────────────────┬──────────────────┘
                            ▼
              src/config/routes.js + pageChunks.js
                            │
         ┌──────────────────┼──────────────────┐
         ▼                  ▼                  ▼
   Page components    Layout vocabulary    Shared features
   (src/pages/)       (components/layout/)  (filmstrip, maps, SEO)
```

### Build pipeline

| Script | What it does |
|--------|--------------|
| `prestart` | `scripts/generate-art-slices.js` — splits `artImages.json` into route-sized JSON |
| `start` | `react-scripts start` |
| `prebuild` | `generate-sitemap.js` + `generate-art-slices.js` + `optimize-logo.js` |
| `build` | `react-scripts build` then `scripts/inject-static-meta.js` |
| `prepare` | Husky git hooks |

**Post-build injection** (`inject-static-meta.js`): writes per-route HTML with SEO meta tags, LCP image preloads, and static mobile shells for fast first paint.

### Dual bootstrap (critical)

`src/index.js` is **not** a simple `ReactDOM.render(<App />)`. On mobile viewports (≤767px), many routes load dedicated `Mobile*ShellApp.js` bundles that hydrate from pre-rendered static HTML. Desktop and non-shell routes load `App.js` normally.

When adding a new route that needs mobile LCP optimisation, see the wiring chain in `AI_HANDOVER.md` → Hidden dependency chains → Mobile shell wiring and the checklist in `AI_RULES.md` § Route changes checklist.

Do not create a mobile shell automatically for every new route. Mobile shells are reserved for priority destinations or routes where measured LCP performance justifies the additional maintenance cost.

This is the highest-maintenance part of the codebase (33 mobile shell apps exist today).

### Mobile LCP delivery layer

On shell routes (mobile ≤767px), performance is a **parallel delivery path**, not a post-hoc optimisation:

| Layer | Implementation |
|-------|----------------|
| Static HTML hero | Injected at build by `scripts/*StaticShell.js` into per-route HTML (outside `#root`) |
| React hero suppressed | Pages pass `skipHero={has*StaticHero() && isMobileViewport()}` to templates |
| Page chunk deferral | `useStaticHeroPageChunkLoader` — timer-based, not scroll-triggered |
| Below-fold gating | `useStaticHeroBelowFoldGate` — dwell + scroll threshold before heavy content |
| Font deferral | Dancing Script delayed via `useStaticHeroDeferredFonts` / `loadDeferredFonts.js` |
| Local LCP asset | `public/assets/*-hero-400.webp` from `npm run optimize:{route}-hero` |
| Preload mapping | `resolveHero.js` → `resolveLcpHeroPreloadUrl` |

Wiring touchpoints for a new shell route: `AI_HANDOVER.md` → Hidden dependency chains → Mobile shell wiring. Why timings are conservative: `AI_HANDOVER.md` § What I've learned §1.

### Project philosophy

This project is intentionally organised differently from many React websites. Destination pages are **individually crafted** rather than generated from a CMS or data model — each route reflects specific editorial choices about pacing, imagery, and voice. Some duplication across files (especially the 33 mobile shells) is **intentional**: performance tuning and LCP behaviour vary per route in ways that resist clean abstraction. **Editorial quality is preferred over architectural purity** — a readable, authentic page matters more than a DRY component hierarchy. Performance work sometimes outweighs elegant code structure; the static-hero and scroll-gate systems exist because Lighthouse scores demanded them, not because they are theoretically ideal. Templates exist to **protect consistency** across destinations (structural grammar, typography hierarchy, pacing devices), not primarily to reduce lines of code. Understanding this explains why the repository tolerates patterns that would normally trigger a refactor.

### Editorial philosophy

This is **not a CMS**. Each destination page is hand-authored with shared layout vocabulary but distinct pacing and tone. See `nomad-editorial-system.md` and `nomad-editorial-linter.md` for writing rules.

---

## 2. Project Priorities

When trade-offs arise, use this order (highest priority first):

1. **Preserve editorial quality and authenticity** — observation-first copy, destination-specific voice, no generic travel prose.
2. **Preserve mobile performance (especially LCP)** — static heroes, shell wiring, deferred loading; do not regress Lighthouse for cleaner code.
3. **Preserve existing architecture and template philosophy** — Dense vs Light commitments, layout vocabulary, hero resolution contract.
4. **Preserve maintainability and readability** — clear page files, co-located configs, incremental changes over sweeping refactors.
5. **Continue incremental design-token migration** — use `tokens.js` in new and touched code; do not batch-migrate untouched pages.

When priorities conflict, **earlier priorities always win** — for example, do not simplify mobile shell code in a way that steals LCP, and do not refactor templates in a way that homogenises editorial voice.

---

## 3. Routing Structure

Routes are defined in `src/config/routes.js` and lazy-loaded via `src/config/pageChunks.js`.

### Core

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `HomeNew` | Interactive home map + gallery banner |
| `/adventures` | → redirect `/` | Legacy URL |
| `/nomads-gallery` | `NomadsGallery` | Filmstrip gallery |
| `/contact-us` | `ContactUs` | Contact form (POST to `/api/contact`) |
| `/search` | `SearchResults` | Site search |
| `/cookie-preferences` | `CookiePreferences` | Receives cookie consent props from App |

### Shop

| Path | Component |
|------|-----------|
| `/nomads-shop` | `NomadsShop` |
| `/nomadsshop` | → `/nomads-shop` |
| `/nomads-shop/brazil` | `NomadsShopBrazil` |
| `/nomads-shop/brazil/saopaulo` | `NomadsShopSaoPaulo` |
| `/nomads-shop/brazil/:city` | `NomadsShopCategory` |

### Brazil

| Path | Component |
|------|-----------|
| `/brazil` | `Brazil` |
| `/brazil/rio` | `Rio` |
| `/brazil/rio/ilha-grande` | `IlhaGrande` |
| `/brazil/ilha-grande` | → `/brazil/rio/ilha-grande` |
| `/brazil/salvador` | `Salvador` |
| `/brazil/pantanal` | `Pantanal` |
| `/brazil/foz` | `Iguazu` |
| `/brazil/manaus` | `Manaus` |
| `/brazil/food-drink` | `BrazilFoodDrink` |
| `/brazil/natural-spaces` | `BrazilNaturalSpaces` |
| `/brazil/saopaulo` | `SaoPaulo` |
| `/brazil/saopaulo/green-spaces` | `GreenSpaces` |
| `/brazil/saopaulo/galleries` | `ArtGalleries` |
| `/brazil/saopaulo/carnival` | `CarnivalSaoPaulo` |
| `/brazil/saopaulo/street-art` | `Graffiti` |
| `/brazil/santos` | `Santos` |
| `/brazil/florianopolis` | `Florianopolis` |
| `/brazil/bonito` | `Bonito` |

Legacy redirects (São Paulo subsections): `/parks` → `/green-spaces`, `/museums` and `/art-galleries` → `/galleries`, `/street-murals` and `/murals` → `/street-art`, `/saopaulo/santos` → `/brazil/santos`.

### Europe

| Path | Component |
|------|-----------|
| `/belgium` | `Belgium` |
| `/belgium/antwerp` | `AntwerpNew` |
| `/belgium/antwerp-legacy` | → `/belgium/antwerp` |
| `/greece` | `Greece` |
| `/greece/athens` | `AthensNew` |
| `/greece/athens-legacy` | → `/greece/athens` |
| `/hungary` | `Hungary` |
| `/hungary/budapest` | `BudapestNew` |
| `/hungary/budapest-legacy` | → `/hungary/budapest` |
| `/austria` | `Austria` |
| `/austria/vienna` | `ViennaNew` |
| `/austria/salzburg` | `SalzburgNew` |
| `/austria/wider-country` | `WiderCountryNew` |
| `/czech-republic` | `CzechRepublic` |
| `/czech-republic/prague` | `PragueNew` |
| `/czech-republic/bohemian-wilderness` | `BohemianWildernessNew` |
| `/czech-republic/nature` | → `/bohemian-wilderness` |
| `/czech-republic/kutna-hora` | → `/prague` |

### USA

| Path | Component |
|------|-----------|
| `/united-states` | `UnitedStates` |
| `/united-states/tennessee` | `Tennessee` |
| `/united-states/tennessee/mountains` | `Mountains` |
| `/united-states/tennessee/memphis` | `Memphis` |
| `/united-states/tennessee/nashville` | `Nashville` |

### Catch-all

| Path | Component |
|------|-----------|
| `*` | `NotFound` |

### App shell behaviour (`src/App.js`)

- Global `Nav` always present
- `VisualHeader` (breadcrumbs) hidden on home
- Paper-texture background on non-home, non-gallery, non-search pages
- `PageTransition` wrapper for route changes
- Cookie consent banner
- Footer deferred on mobile home (idle callback / 1.5s timeout) for LCP
- `NarrativeProvider` context wraps the app
- Analytics loaded only after cookie consent

---

## 4. Template System

### Active templates (`src/pages/templates/`)

Three structural templates with tonal variants. **Do not mix Dense and Light philosophies on one page** (see `TEMPLATE_CAPABILITY_MATRIX.md`).

| Template | Variants | Use case |
|----------|----------|----------|
| `CountryLandingTemplate` | `tropical` (Brazil), future: mediterranean, industrial, continental | Country hub / journey orchestrator |
| `DenseTemplate` | `megacity`, `industrial` | Complex cities — São Paulo, Antwerp |
| `LightTemplate` | `urban`, `historical`, `immersive`, `nature`, `coastal` | Atmospheric destinations — Rio, Budapest, Pantanal, Ilha Grande |

**Legacy templates (do not use for new pages):** `DenseEditorialTemplate`, `BreathAndSpaceTemplate`, `SlowRevealTemplate`

### Canonical page structure (structural grammar)

```
LocationHero → IntroGrid → NarrativeSplit × N → RhythmInsert → BridgeQuote
→ SubsectionNavigator → GalleryWall → ReflectiveClose
```

Dense pages require all sections. Light pages forbid `IntroGrid` and `SubsectionNavigator` (linear flow).

### Layout vocabulary (`src/components/layout/`)

| Component | Role |
|-----------|------|
| `Hero` / `LocationHero` / `DiaryHero` | Semantic hero resolution |
| `IntroGrid` | Two-column intro with sidebar image |
| `NarrativeSplit` | Image + heading + paragraph |
| `RhythmInsert` | Atmospheric pacing pause |
| `BridgeQuote` | Transitional moment (handwriting font candidate) |
| `SubsectionNavigator` | Map + section links |
| `GalleryWall` | Visual collection grid |
| `ReflectiveClose` | Emotional conclusion |
| `HeroSpreadLightbox` | Fullscreen hero expansion |
| `NextStopNav` | Sequential journey navigation |

### Page implementation pattern

Typical destination page (`src/pages/Rio.js` as reference):

```javascript
import { LightTemplate } from "./templates";
import { SEO_TITLES } from '../config/seoTitles';
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import rioImages from "../assets/artImages/slices/category/rio.json";
import destinations from "../assets/destinations.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { rioHeroConfig } from './brazil/rio/rio.hero.config';

// 1. Define locationData (SEO + coords from destinations.json)
// 2. Map gallery images via cloudinaryImageUrl()
// 3. Pass props into template + optional editorialBlocks
// 4. Hero config in co-located *.hero.config.js
```

### Factory helpers

- `src/pages/austria/buildAustriaStoryPage.js` — shared Austria story page builder
- `src/pages/czech/buildCzechStoryPage.js` — shared Czech story page builder

Use these when adding new pages in those regions to stay consistent.

### Choosing a template

See `PAGE_IMPLEMENTATION_GUIDE.md`. Quick rule:

- **Navigate a city** (subsections, maps, branching) → `DenseTemplate`
- **Inhabit a place** (atmosphere, linear flow) → `LightTemplate`
- **Country landing** → `CountryLandingTemplate`

---

## 5. Component Hierarchy

### Global shell (always in `App.js`)

```
App
├── HelmetProvider
├── NarrativeProvider
├── Router
│   ├── Nav (components/Nav.js + components/nav/*)
│   ├── VisualHeader (non-home)
│   ├── PageTransition
│   │   └── Routes → lazy page components
│   ├── Footer (deferred on mobile home)
│   └── CookieConsent
└── PageViewTracker (analytics)
```

### Shared feature areas

| Area | Location | Key exports |
|------|----------|-------------|
| Layout / pacing | `components/layout/` | Hero, IntroGrid, NarrativeSplit, etc. |
| Editorial inserts | `components/editorial/` | `EditorialBlock`, `EditorialBlocks`, placement system |
| Filmstrip gallery | `components/filmstrip/` | `FilmStrip`, lightbox, template registry |
| Maps | `components/` | `RioJournalMap`, `TennesseeMap`, `BelgiumMap`, `AustriaMap`, `CzechMap`, etc. |
| Media | `components/` | `CloudinaryImage`, `GalleryWall`, `UnifiedLightbox` |
| Home | `components/home/` | `GalleryBanner`, `WhatsNew`, parallax decor |
| Shop | `components/shop/` | `ShopPageHeader`, `shopTheme.js` |
| Navigation | `components/nav/` | Burger, search, region submenus |
| SEO | `components/SEO.js` | Per-page meta tags |

### Page-specific code

- Top-level route components: `src/pages/*.js` (~46 files)
- Co-located configs and data: `src/pages/brazil/`, `src/pages/austria/`, etc.
- Hero configs: `*.hero.config.js` next to page data
- Mobile shells: `src/Mobile*ShellApp.js` (33 files)

### Context / system layer

- `src/context/NarrativeContext.js` — narrative state
- `src/system/resolvers/resolveHero.js` — semantic hero asset resolution
- `src/assets/heroData.js` — hero registry (role-centric public IDs)

### Component file extensions

- `.js` — dominant (pages, layout, most components)
- `.jsx` — newer interactive pieces (filmstrip, editorial, lightbox, maps)

---

## 6. CSS Organisation

### Tailwind (primary styling mechanism)

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Extends theme with design tokens (colors, typography, spacing, shadows) |
| `postcss.config.js` | `tailwindcss` + `autoprefixer` |
| `src/index.css` | `@tailwind` directives, global resets, gradient utilities, lightbox nav hiding |

### Design tokens (JS source of truth)

| File | Purpose |
|------|---------|
| `src/styles/tokens.js` | All visual decisions — colors, typography, spacing, shadows, destination palettes |
| `src/styles/index.js` | Exports `{ tokens, tw, styles }` |
| `tailwind.config.js` | Mirrors token values into Tailwind classes |

**Rule:** Every visual decision should come from `tokens.js`. Use `tw.*` convenience classes or Tailwind token classes (`text-gold`, `text-text-primary`, `py-bridge`).

```javascript
// GOOD
import { tw, tokens } from '../styles';
className={tw.hero}
style={{ height: tokens.layout.heroHeight }}

// BAD
className="text-[#B8860B] mt-[37px]"
```

### Custom CSS files

| File | Purpose |
|------|---------|
| `src/styles/section-system.css` | Section layout system |
| `src/styles/swiper-a11y.css` | Swiper accessibility overrides |
| `src/components/filmstrip/filmstrip.css` | Filmstrip styling |
| `src/components/home/gallery-banner.css` | Home gallery banner |
| `src/components/handwritingEngine.css`, `ht.css` | Handwriting animation |

### JS style modules

| File | Purpose |
|------|---------|
| `src/styles/paperTexture.js` | Paper background tiled style (used in `App.js`) |
| `src/styles/swiper.js` | Swiper configuration |

### Paper texture pattern

The paper background is currently applied centrally in `App.js`. This is an existing global shell pattern and should not be duplicated at page level.

Non-home, non-gallery, non-search pages receive inline style in `App.js`:

```javascript
backgroundColor: "#f5f0e8",
backgroundBlendMode: "multiply",
backgroundAttachment: "fixed",
...paperTextureTiledStyle
```

### Dark mode / destination palettes

Layout components accept `variant="light|dark"`. Rio and other dark-palette destinations use `tokens.colors.rio.*`.

---

## 7. Coding Conventions

### General

- **JavaScript only** — no TypeScript; JSDoc in some config files
- **Functional components** with hooks throughout
- **Lazy loading** — all routes via `React.lazy` + `chunkLoaders` map in `pageChunks.js`
- **Config-driven pages** — separate hero configs, editorial placements, and art-image slices from JSX
- **Semantic assets** — heroes resolved via `heroData.js` + `resolveHero.js`, not hardcoded paths
- **Cloudinary abstraction** — use `CloudinaryImage` and `cloudinaryImageUrl()` / `cloudinaryUrlFromLegacyPath()`; avoid raw `<img>` for photography

### Design token migration (ongoing)

Layout components are tokenized; most page files are not. `scripts/audit-page.js` runs on `src/pages/**/*.js` via Husky pre-commit. Migration is incremental — see `MIGRATION_AUDIT.md` for status and `AI_RULES.md` for assistant constraints.

### Editorial discipline (structural)

- **Max 1 handwriting font moment per page** (`font-handwriting` / Dancing Script) — enforced across templates
- Writing voice rules: `nomad-editorial-system.md`
- Assistant copy-protection: `AI_RULES.md` § Editorial rules

### Adding pages and routes

New destination pages follow the template + co-located config pattern shown in §4. Operational checklists for routes, heroes, and audits: `AI_RULES.md`.

---

## 8. Naming Conventions

### Files

| Pattern | Example |
|---------|---------|
| Page components | `PascalCase.js` — `Rio.js`, `HomeNew.js` |
| Refactored pages | `*New.js` suffix — `AthensNew.js`, `ViennaNew.js`, `AntwerpNew.js` |
| Hero configs | `{route}.hero.config.js` — `rio.hero.config.js` |
| Mobile shells | `Mobile{Route}ShellApp.js` — `MobileRioShellApp.js` |
| Static shell scripts | `scripts/{route}StaticShell.js` |
| Art image slices | `story/brazil-rio.json`, `category/rio.json` |
| Page data | `rio.data.js`, co-located in region folders |

### Components

- PascalCase exports: `DenseTemplate`, `CloudinaryImage`
- Barrel exports: `components/layout/index.js`, `pages/templates/index.js`, `components/editorial/index.js`

### Routes / URLs

- Lowercase kebab-case: `/brazil/saopaulo/street-art`
- Country/region nesting: `/united-states/tennessee/memphis`
- No trailing slashes enforced (redirects handle `/home/`)

### Cloudinary public IDs

Semantic, role-centric structure:

```
hero/location/rio/main
hero/diary/rio/main
gallery/rio/carnival/001
Brazil/Rio/...
```

Legacy `/images/...` paths still supported via `getPublicIdFromLegacyPath()` in `src/utils/cloudinary.js`.

### Design token names

```
tokens.colors.gold
tokens.colors.text.primary
tokens.colors.rio.gold
tokens.spacing.bridge
tokens.layout.heroHeight
tw.hero, tw.lead, tw.body, tw.image
```

---

## 9. Image Organisation

### Three-tier asset strategy

| Tier | Location | Use |
|------|----------|-----|
| **Cloudinary (primary)** | CDN `dqypj6rlw` | All photography; responsive srcset via `CloudinaryImage` |
| **Local bundled** | `src/assets/images/`, `src/assets/Backgrounds/` | SVG maps, UI icons, textures |
| **Self-hosted LCP heroes** | `public/assets/*-hero-400.webp` | Mobile static shells, build-time preloads |

### Art image catalog

| File | Purpose |
|------|---------|
| `src/assets/artImages.json` | Master catalog of all gallery images |
| `src/assets/artImages/slices/category/*.json` | Per-destination category slices |
| `src/assets/artImages/slices/story/*.json` | Per-story narrative slices |
| `src/assets/artImages/slices/bundles/*.json` | Bundled multi-page sets |

Generated by `npm run generate:art-slices` (runs on `start` and `build`).

### Hero registry

`src/assets/heroData.js` — semantic hero definitions by destination + treatment (`location`, `diary`, etc.).

### Cloudinary utilities

`src/utils/cloudinary.js`:
- `CLOUDINARY_CLOUD_NAME = "dqypj6rlw"`
- `cloudinaryImageUrl(publicId, options)` — builds responsive URLs
- `BRAZIL_LEGACY_PREFIXES` — maps new `Brazil/*` folder IDs to legacy paths during migration

### Optimisation scripts

Per-route hero scripts in `package.json`:

```bash
npm run optimize:rio-hero
npm run optimize:brazil-hero
# ... 30+ destination-specific scripts
```

Pattern: fetch from Cloudinary → Sharp resize to 400px WebP → write to `public/assets/`.

### Upload scripts

```bash
npm run upload:cloudinary              # bulk upload from staging folder
npm run upload:cloudinary:one          # single file
npm run upload:cloudinary:food-drink   # category-specific
npm run migrate:artimages              # migrate public IDs in catalog
```

**Staging folder:** `C:\Users\benji\cloudinary-staging\images` (local machine path; adjust for your environment).

### Image component usage

```jsx
import CloudinaryImage from '../components/CloudinaryImage';
import { cloudinaryImageUrl } from '../utils/cloudinary';

<CloudinaryImage
  publicId="Brazil/Rio/some-image"
  alt="Description"
  widths={[400, 800, 1200]}
/>
```

---

## 10. Vercel Deployment Process

### Configuration (`vercel.json`)

**Cache headers:**
- `/static/*` — `max-age=31536000, immutable` (1 year)
- `/assets/*` — `max-age=604800, stale-while-revalidate=86400` (7 days)

**Redirects:**
- `/home` → `/`
- `/adventures` → `/`
- `/nomadsshop` → `/nomads-shop`
- Legacy page aliases (antwerp-legacy, athens-legacy, budapest-legacy)
- Apex `nomadscribbles.com` → `www.nomadscribbles.com`

### Build & deploy

Vercel auto-deploys from GitHub:
- **`main`** → production
- Feature branches → preview deployments

Build command (default CRA): `npm run build`  
Output directory: `build/`

The `prebuild` and post-build `inject-static-meta.js` run automatically as part of `npm run build`.

### Serverless API (`api/`)

| File | Purpose |
|------|---------|
| `api/contact.js` | POST handler — Gmail SMTP via nodemailer |
| `api/contact-status.js` | Health check for contact form |
| `api/_mailEnv.js` | Gmail app password env var lookup (supports alias keys) |

### Environment variables

Set in Vercel → Project → Settings → Environment Variables:

```env
GMAIL_APP_PASSWORD=          # Google App Password (2FA required)
SMTP_USER=<configured contact mailbox>
CONTACT_TO=<configured recipient>
CONTACT_FROM="Nomad Scribbles" <contact@nomadscribbles.com>
```

See `.env.example` for local development setup.

### Local development options

**Option A — single port:**
```bash
npx vercel dev
```

**Option B — CRA + API proxy (two terminals):**
```bash
# Terminal 1
npx vercel dev

# Terminal 2
# Add to .env.development.local:
# CONTACT_API_PROXY=http://localhost:3000
npm start
```

### No CI/CD workflows

There are no GitHub Actions workflows. Deployment is Vercel-native from branch pushes. Pre-commit quality gate is Husky + lint-staged only.

---

## 11. Git Workflow

### Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production (`origin/HEAD`) |
| `editorial-review` | **Current active branch** — editorial polish, new country content |
| `agents/fix-img-display-issues-travel-blog` | Agent worktree branch |
| Remote feature branches | Various (antwerp improvements, image rendering, nomads shop redesign) |

### Typical workflow

1. Branch from `main` (or continue on feature branch)
2. Make changes
3. Pre-commit hook runs `lint-staged` → `audit-page.js` on touched `src/pages/**/*.js`
4. Push to remote → Vercel preview deploy
5. Merge to `main` → production deploy

### Pre-commit hooks

`.husky/pre-commit` → `npx lint-staged`

`package.json` lint-staged config:
```json
"src/pages/**/*.js": ["node scripts/audit-page.js"]
```

Only page `.js` files are audited (not `.jsx`, not components).

### Commit message style (observed)

Short, descriptive, sentence-case summaries:
- `Polish Austria hub and Vienna story page for mobile layout, copy, and image accuracy.`
- `Add Czech Republic content and fix Adventures map path alignment.`
- `Editorial linter pass for review`

### What not to do

See `AI_RULES.md` § Never do / Git & deploy for contributor constraints (force-push, hook skipping, batch migrations, etc.).

---

## 12. Current TODOs

No `TODO` / `FIXME` / `HACK` comments exist in `src/` (verified 2026-07-13). Outstanding work is tracked in markdown docs and branch activity.

### Design token migration (from `MIGRATION_AUDIT.md`, `INFRASTRUCTURE_STATUS.md`)

**Phase 1 — Foundation:** ✅ Complete (tokens, layout components, audit tool)

**Phase 2 — Incremental page migration:** 🚧 In progress

| Page | Status |
|------|--------|
| `SaoPauloRefactored.js` | ✅ Tokenized reference implementation |
| `SaoPaulo.js` | Keep as-is (production page) |
| `Rio.js` | ⏳ Pending audit |
| `Athens.js` / `AthensNew.js` | ⏳ Pending audit |
| `Tennessee.js` | ⏳ Pending audit |
| Subsection pages (GreenSpaces, ArtGalleries, etc.) | ⏳ Pending |

Incremental migration workflow: `MIGRATION_AUDIT.md`. Assistant constraints: `AI_RULES.md` § Always do.

### Template / country expansion

| Item | Status |
|------|--------|
| `CountryLandingTemplate` variant `mediterranean` (Greece) | Future |
| `CountryLandingTemplate` variant `industrial` (Belgium) | Future |
| `CountryLandingTemplate` variant `continental` (Hungary) | Future |
| Czech Republic `czech-republic-bohemian-wilderness` art slice | Stub — awaiting catalog import |

### Infrastructure (from `INFRASTRUCTURE_STATUS.md`)

- [ ] Verify `SaoPauloRefactored.js` renders identically to original
- [ ] Migrate first real production page (Rio or Athens) to tokens
- [ ] Planned: `LocationLayout` shell component
- [ ] Planned: centralized animation system

### Editorial review branch (`editorial-review`)

Recent commits indicate active work on:
- Austria pages (Vienna, Salzburg, wider country)
- Greece / Athens expansion
- Czech Republic content
- USA / Tennessee hub copy
- Brazil hub and São Paulo mobile polish
- Mobile LCP heroes for country landings
- Editorial linter pass

### Cleanup candidates

- Delete obsolete `RioTokenized.js` if it still exists (per `SYSTEM_MATURITY_REPORT.md`)
- `Adventures.js` page file may be dead code (route redirects to `/`)
- Legacy templates can be removed once all pages are migrated

---

## 13. Known Issues

### Documentation staleness

`SYSTEM_MATURITY_REPORT.md` references obsolete Rio routes and files — treat as historical context, not current state. See `AI_HANDOVER.md` § Migration history.

`README.md` is default Create React App boilerplate — not project-specific.

### Cloudinary Brazil folder migration

`src/utils/cloudinary.js` maintains `BRAZIL_LEGACY_PREFIXES` mapping new `Brazil/*` folder IDs to legacy Cloudinary paths. Migration is incomplete; some images may resolve via fallback prefixes.

`cloudinary-upload-failures.json` logs hundreds of failed uploads — primarily `Food&Drink/*` assets with invalid public IDs (spaces, special characters). These need filename sanitisation before re-upload.

### Dual bootstrap complexity

33 `Mobile*ShellApp.js` files + matching static shell scripts create high maintenance surface. Adding a route without updating `index.js` bootstrap means mobile users get the full `App.js` bundle (slower LCP).

`src/index.js` bootstrap logic is ~330 lines of route-to-shell conditionals — fragile when adding routes.

### Token migration incomplete

~40 pages still contain hardcoded Tailwind values (`text-[#B8860B]`, arbitrary spacing). Layout components are tokenized; page-level migration is incremental.

Pre-commit audit only covers `src/pages/**/*.js`, not components or `.jsx` files.

### Legacy templates still exported

`src/pages/templates/index.js` exports legacy templates "kept during migration." Risk of accidental use on new pages.

### No automated tests in CI

`npm test` exists (CRA Jest) but no CI runs it. Visual/regression testing is manual.

### Contact form dependency

Contact form requires `GMAIL_APP_PASSWORD` on Vercel. Missing env var returns 503. Local dev requires `vercel dev` or proxy setup.

### Windows-specific paths in package.json

Several npm scripts reference `C:\\Users\\benji\\cloudinary-staging\\images`. These won't work on other machines without path adjustment.

---

## 14. Current Architectural Assumptions

These assumptions describe the current intended architecture based on the state of the repository. Validate them before making major architectural changes. Assistant enforcement: `AI_RULES.md`.

### Architecture assumptions

1. **CRA stays un-ejected.** The project deliberately avoids ejecting; build customisation happens via scripts (`inject-static-meta.js`, art-slice generation) rather than webpack config changes.

2. **Mobile-first LCP is a first-class concern.** Any new high-traffic destination page should get a mobile shell + static hero unless there is a strong reason not to.

3. **Cloudinary is the single source of truth for photography.** Local images are for SVGs, textures, and LCP hero fallbacks only.

4. **Pages are hand-authored, not generated.** Do not introduce a CMS or auto-generate destination pages from a database.

### Template assumptions

5. **Dense vs Light is a structural commitment, not a visual tweak.** Do not add `SubsectionNavigator` to Light pages or remove it from Dense pages.

6. **`*New.js` suffix means "editorial system refactor complete."** Pages like `AthensNew.js`, `ViennaNew.js`, `AntwerpNew.js` are the current production implementations; unsuffixed originals may be legacy.

7. **One handwriting moment per page is enforced.** If adding `useHandwriting={true}` to a BridgeQuote, do not also use handwriting in ReflectiveClose or section headings.

### Editorial assumptions

8. **Observation-first voice is mandatory for body copy.** See `nomad-editorial-system.md` and `AI_RULES.md` § Editorial rules.

9. **Recent editorial-review work prioritised Europe expansion** (Austria, Czech Republic, Greece) and mobile readability over token migration.

10. **Editorial blocks use placement system** (`EDITORIAL_PLACEMENTS`, `doThisAgainBlock`) — prefer this over ad-hoc inline inserts.

### Image assumptions

11. **Brazil images are mid-migration** from legacy folder names (`Rio/`, `SaoPauloLanding/`) to semantic `Brazil/*` paths. Code handles both via `BRAZIL_LEGACY_PREFIXES`; do not remove until migration is confirmed complete.

12. **Hero configs are co-located** with page data (`rio.hero.config.js`), not only in `heroData.js`. Both systems coexist.

### Deployment assumptions

13. **Production deploys from `main` only.** `editorial-review` is a staging/review branch, not production.

14. **Vercel handles redirects and caching** — do not duplicate redirect logic in React Router for URLs already in `vercel.json`.

### CSS assumptions

15. **Paper texture background is applied in App.js**, not per-page. Do not add competing background styles on individual pages unless the page explicitly opts out (home, gallery, search).

16. **Token migration is incremental.** When editing an existing page, migrate hardcoded values in that file; do not refactor unrelated pages.

---

## 15. High Risk Files

These files are **rarely edited** not because they are immutable, but because changes affect routing, performance, or build behaviour across many routes. Edit only when you understand the surrounding systems, and run a full `npm run build` plus mobile checks afterwards.

| File | Why it is high-risk |
|------|---------------------|
| `src/index.js` | Dual mobile/desktop bootstrap — one wrong branch sends a route down the wrong loading path or skips a static shell entirely |
| `src/App.js` | Global shell wrapping every non-shell route: nav, footer, paper texture, cookie consent, `NarrativeProvider` |
| `src/config/routes.js` | Canonical route table — omissions or mismatches break navigation and lazy loading |
| `src/config/pageChunks.js` | Lazy import map and prefetch targets — must stay in sync with `routes.js` |
| `scripts/inject-static-meta.js` | Post-build SEO injection and static mobile shell HTML for all shell routes |
| `src/system/resolvers/resolveHero.js` | Hero tier resolution and LCP preload URL mapping to local WebP assets |
| `src/utils/staticHeroScrollGate.js` | Timer-based chunk loading and below-fold gates — timing tuned against real Lighthouse failures |
| `src/utils/cloudinary.js` | Cloudinary URL builder and Brazil legacy prefix mapping — breaking it 404s images site-wide |

Related high-risk patterns (not single files): any `Mobile*ShellApp.js`, matching `scripts/*StaticShell.js`, and `src/utils/staticPageHero.js` when adding mobile LCP routes. File-level risk detail: `REPOSITORY_INDEX.md` (File index · Critical files).

---

## 16. Success Criteria

Work on this project is complete when these outcomes hold (unless the task explicitly scoped something narrower):

- **Editorial voice** remains authentic and unchanged unless copy was explicitly in scope
- **Mobile LCP** is maintained or improved on shell routes
- **SEO, redirects, and hero preload** remain correct for affected routes
- **Template structure** (Dense vs Light) remains consistent with the page's existing commitment
- **Changes are incremental** — no drive-by refactors on unrelated files

Assistant verification checklist: `AI_RULES.md` § Completion checklist.

---

## Document navigation

| I need to… | Read |
|------------|------|
| Understand how the project is built | This document |
| Know how to behave when editing | `AI_RULES.md` |
| Learn why something looks unusual | `AI_HANDOVER.md` |
| Find a file or route mapping | `REPOSITORY_INDEX.md` |
| Know if work is complete | This document §16 |

### Quick start (commands)

```bash
npm install
npx vercel dev          # recommended — site + API
# OR npm start          # CRA only; contact form needs proxy

npm run build
npm run generate:art-slices
node scripts/audit-page.js src/pages/Rio.js
```

For editing checklists and behavioural rules, see `AI_RULES.md`.
