# PROJECT_CONTEXT.md

**Nomad Scribbles** — editorial travel blog  
**Repository:** `https://github.com/whyorhow/travel-blog-clean`  
**Package name:** `brazil-travel-blog` (historical; site covers Brazil, Europe, USA)  
**Production URL:** `https://www.nomadscribbles.com`  
**Last updated:** 2026-07-13

This document is the onboarding guide for AI coding assistants continuing work on this project without prior context.

---

## Table of Contents

1. [Overall Architecture](#1-overall-architecture)
2. [Routing Structure](#2-routing-structure)
3. [Template System](#3-template-system)
4. [Component Hierarchy](#4-component-hierarchy)
5. [CSS Organisation](#5-css-organisation)
6. [Coding Conventions](#6-coding-conventions)
7. [Naming Conventions](#7-naming-conventions)
8. [Image Organisation](#8-image-organisation)
9. [Vercel Deployment Process](#9-vercel-deployment-process)
10. [Git Workflow](#10-git-workflow)
11. [Current TODOs](#11-current-todos)
12. [Known Issues](#12-known-issues)
13. [Assumptions Made While Editing](#13-assumptions-made-while-editing)
14. [Key File Reference](#14-key-file-reference)

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

When adding a new route that needs mobile LCP optimisation:
1. Add route to `src/config/routes.js` and `pageChunks.js`
2. Add mobile bootstrap condition in `src/index.js`
3. Create `src/Mobile{Route}ShellApp.js`
4. Create matching `scripts/{route}StaticShell.js` and hero optimise script
5. Wire into `inject-static-meta.js`

This is the highest-maintenance part of the codebase (33 mobile shell apps exist today).

### Editorial philosophy

This is **not a CMS**. Each destination page is hand-authored with shared layout vocabulary but distinct pacing and tone. See `nomad-editorial-system.md` and `nomad-editorial-linter.md` for writing rules.

---

## 2. Routing Structure

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

## 3. Template System

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

## 4. Component Hierarchy

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

- Top-level pages: `src/pages/*.js` (~83 files)
- Co-located configs: `src/pages/brazil/`, `src/pages/austria/`, etc.
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

## 5. CSS Organisation

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

## 6. Coding Conventions

### General

- **JavaScript only** — no TypeScript; JSDoc in some config files
- **Functional components** with hooks throughout
- **Lazy loading** — all routes via `React.lazy` + `chunkLoaders` map in `pageChunks.js`
- **Config-driven pages** — separate hero configs, editorial placements, and art-image slices from JSX
- **Semantic assets** — heroes resolved via `heroData.js` + `resolveHero.js`, not hardcoded paths
- **Cloudinary abstraction** — use `CloudinaryImage` and `cloudinaryImageUrl()` / `cloudinaryUrlFromLegacyPath()`; avoid raw `<img>` for photography

### Design token migration (ongoing)

- New code **must** use `tw.*` / `tokens.*`
- Pre-commit hook runs `scripts/audit-page.js` on `src/pages/**/*.js`
- Migrate pages incrementally when touched — do not batch-rebuild all pages

### Editorial discipline

- **Max 1 handwriting font moment per page** (`font-handwriting` / Dancing Script)
- Observation-first writing (see `nomad-editorial-system.md`)
- Forbidden generic travel phrases are soft-blocked in editorial linter

### Adding a new destination page

1. Choose template + variant (`PAGE_IMPLEMENTATION_GUIDE.md`)
2. Create page in `src/pages/`
3. Add route to `routes.js` and `pageChunks.js`
4. Add SEO title to `src/config/seoTitles.js`
5. Add coords to `src/assets/destinations.json`
6. Import art-image slice or add to `artImages.json` + run `generate:art-slices`
7. Create hero config + run `optimize:{route}-hero` script
8. If mobile LCP matters: add mobile shell bootstrap
9. Run `node scripts/audit-page.js src/pages/YourPage.js`

### Static shell / LCP optimisation

Priority travel guides have pre-rendered mobile HTML injected at build time. Hero images are self-hosted as `public/assets/*-hero-400.webp` for instant LCP.

---

## 7. Naming Conventions

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

## 8. Image Organisation

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

## 9. Vercel Deployment Process

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
SMTP_USER=nomadscribbles20@gmail.com
CONTACT_TO=nomadscribbles20@gmail.com
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

## 10. Git Workflow

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

- Do not force-push to `main`
- Do not skip hooks (`--no-verify`) unless explicitly requested
- Do not commit `.env` files with secrets
- Do not batch-migrate all pages to tokens — migrate incrementally

---

## 11. Current TODOs

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

**Workflow when touching a page:**
```bash
node scripts/audit-page.js src/pages/[PAGE].js
# Replace hardcoded values with tw.* / tokens.*
# Visual comparison + mobile check
# Mark done in MIGRATION_AUDIT.md
```

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

## 12. Known Issues

### Documentation staleness

`SYSTEM_MATURITY_REPORT.md` references obsolete routes `/brazil/rio-new`, `/brazil/rio-system` and files `RioTokenized.js` / `RioSystemCompliant.js`. The current production route `/brazil/rio` uses `Rio.js` with `LightTemplate`. Treat that report as historical context, not current state.

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

## 13. Assumptions Made While Editing

These assumptions reflect patterns observed in the codebase and recent `editorial-review` branch work. They should be validated before major architectural changes.

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

8. **Observation-first voice is mandatory for body copy.** Avoid generic travel writing ("the city reveals itself", "hidden gem", personification). See `nomad-editorial-system.md`.

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

## 14. Key File Reference

### Entry points

| File | Purpose |
|------|---------|
| `src/index.js` | Dual bootstrap (mobile shells vs App) |
| `src/App.js` | Router shell, nav, footer, cookie consent |
| `src/config/routes.js` | All route definitions |
| `src/config/pageChunks.js` | Lazy import map |

### Design system

| File | Purpose |
|------|---------|
| `src/styles/tokens.js` | Design token source of truth |
| `src/styles/index.js` | Token exports |
| `tailwind.config.js` | Tailwind theme extension |
| `DESIGN_SYSTEM.md` | Human-readable token reference |
| `PAGE_IMPLEMENTATION_GUIDE.md` | How to build new pages |
| `TEMPLATE_CAPABILITY_MATRIX.md` | Dense vs Light rules |
| `SIGNATURE_OBJECTS.md` | Visual anchors per destination |

### Editorial

| File | Purpose |
|------|---------|
| `nomad-editorial-system.md` | Writing rules |
| `nomad-editorial-linter.md` | Editorial review checklist |
| `nomad-editorial-commands.md` | Agent commands for editorial passes |

### Assets & images

| File | Purpose |
|------|---------|
| `src/assets/artImages.json` | Master image catalog |
| `src/assets/heroData.js` | Semantic hero registry |
| `src/assets/destinations.json` | Geo coords for maps/SEO |
| `src/utils/cloudinary.js` | Cloudinary URL builder |
| `src/components/CloudinaryImage.js` | Responsive image component |
| `SEMANTIC_ASSET_ARCHITECTURE.md` | Asset organisation philosophy |

### Build & deploy

| File | Purpose |
|------|---------|
| `vercel.json` | Redirects, cache headers |
| `api/contact.js` | Contact form API |
| `.env.example` | Environment variable template |
| `scripts/inject-static-meta.js` | Post-build SEO/shell injection |
| `scripts/generate-art-slices.js` | Art image code-splitting |
| `scripts/audit-page.js` | Design token linter |

### Migration tracking

| File | Purpose |
|------|---------|
| `MIGRATION_AUDIT.md` | Per-page token migration status |
| `INFRASTRUCTURE_STATUS.md` | Design system implementation status |
| `SYSTEM_MATURITY_REPORT.md` | Structural grammar (partially stale) |

### Config

| File | Purpose |
|------|---------|
| `src/config/seoTitles.js` | SEO title/description per route |
| `src/config/staticMeta.js` | Build-time meta injection data |
| `package.json` | Scripts, dependencies, lint-staged |

---

## Quick Start for a New Assistant

```bash
# Install
npm install

# Development (with art slices + API)
npx vercel dev
# OR
npm start   # CRA only; contact form needs proxy

# Build
npm run build

# Audit a page before committing
node scripts/audit-page.js src/pages/Rio.js

# Regenerate art image slices
npm run generate:art-slices
```

**Before making changes:** read the relevant page file, its template, hero config, and `nomad-editorial-system.md` if editing copy.

**Before adding a route:** update `routes.js`, `pageChunks.js`, `seoTitles.js`, and consider mobile shell bootstrap in `index.js`.

**Before committing page changes:** ensure `audit-page.js` passes (runs automatically via Husky on `src/pages/**/*.js`).
