# REPOSITORY_INDEX.md

**Nomad Scribbles** (`travel-blog-clean`) — navigational index for AI assistants.  
**Companion docs:** `PROJECT_CONTEXT.md` (architecture reference) · `AI_HANDOVER.md` (tribal knowledge & pitfalls)

Read this file first to find *where* things live and *how risky* they are. Read the companions for *how* things work and *what not to do*.

---

## 1. Project Overview

Nomad Scribbles is a hand-authored editorial travel blog (Brazil, Europe, USA) built as an **un-ejected Create React App** deployed on **Vercel**. It is not a CMS — each destination page is individually composed.

| Layer | What it does |
|-------|--------------|
| **React SPA** | Route-based pages, lazy-loaded via `pageChunks.js` |
| **Template system** | `DenseTemplate`, `LightTemplate`, `CountryLandingTemplate` compose shared layout components |
| **Asset pipeline** | Cloudinary CDN for photos; `artImages.json` → generated slices; local WebP heroes for mobile LCP |
| **Mobile performance layer** | 33 `Mobile*ShellApp.js` bootstraps + build-injected static HTML heroes (≤767px) |
| **Serverless API** | Gmail contact form via `api/contact.js` |
| **Editorial system** | Observation-first copy rules + placement-driven editorial blocks |

**Data flow for a typical destination page:**

```
routes.js → lazy page component → template (Dense/Light/Country)
  → hero config (*.hero.config.js) → resolveHero.js → CloudinaryImage
  → art slice JSON → gallery
  → editorialBlocks → EditorialBlocks component
```

**Active branch (as of last session):** `editorial-review` · **Production:** `main` · **Live site:** `https://www.nomadscribbles.com`

---

## 2. Directory Map

| Directory | Purpose |
|-----------|---------|
| `src/` | All application source |
| `src/pages/` | Route-level page components (~46 top-level `.js` + region subfolders) |
| `src/pages/templates/` | Structural page templates (Dense, Light, CountryLanding + legacy) |
| `src/pages/{region}/` | Co-located hero configs, data files, page builders (brazil, austria, czech, etc.) |
| `src/components/` | Shared UI — layout, editorial, filmstrip, nav, maps, shop, home |
| `src/components/layout/` | Editorial pacing vocabulary (Hero, IntroGrid, NarrativeSplit, etc.) |
| `src/components/editorial/` | Placement-driven personal content blocks |
| `src/components/filmstrip/` | Nomads Gallery filmstrip system |
| `src/components/nav/` | Navigation, search, burger menu |
| `src/components/home/` | Homepage sections (gallery banner, what's new) |
| `src/components/shop/` | Nomads Shop theme and header |
| `src/config/` | Routes, lazy chunks, SEO, search index, static meta, breadcrumbs |
| `src/assets/` | JSON catalogs, image slices, SVG maps, backgrounds, hero registry |
| `src/assets/artImages/slices/` | **Generated** per-route image slices (do not hand-edit) |
| `src/styles/` | Design tokens, paper texture, section CSS |
| `src/utils/` | Cloudinary, analytics, static hero gates, art resolver |
| `src/system/resolvers/` | Hero resolution engine |
| `src/context/` | `NarrativeContext` (required in App + mobile shells) |
| `src/hooks/` | Route prefetch, lightbox nav lock |
| `src/data/` | `nomadsFilmstrips.js` gallery data |
| `src/Mobile*ShellApp.js` | Per-route mobile bootstrap shells (33 files at `src/` root) |
| `scripts/` | Build pipeline, static shells, hero optimisation, Cloudinary upload (~128 files) |
| `api/` | Vercel serverless functions (contact form) |
| `public/` | Static assets, generated sitemap, self-hosted LCP hero WebPs |
| `public/assets/` | Optimised `*-hero-400.webp` files for mobile LCP |
| `.husky/` | Git pre-commit hook |
| Root `*.md` | Design system, editorial rules, migration tracking, audits |

**Low-value / ignore unless asked:** `build/`, `node_modules/`, `tmp-*`, stray git helper files (`fix-git.ps1`, `git-output.txt`), `cloudinary-upload-failures.json` (upload error log).

---

## 3. File & Directory Index

Risk levels: **Low** = isolated changes rarely break other things · **Medium** = affects multiple routes or build · **High** = core infrastructure; regressions are site-wide

---

### Root configuration

#### `package.json`
| | |
|---|---|
| **Purpose** | Dependencies, npm scripts (start/build/optimise/upload), lint-staged config |
| **Edit when** | Adding dependencies, new optimise/upload scripts, changing pre-commit scope |
| **Depended on by** | npm, Vercel build, Husky, all script invocations |
| **Risk** | **Medium** |
| **Avoid** | Hardcoding machine-specific paths and committing them; removing `prebuild`/`prepare` hooks |

#### `vercel.json`
| | |
|---|---|
| **Purpose** | Cache headers, SEO redirects (`/home`, `/adventures`, apex→www), legacy route aliases |
| **Edit when** | Adding permanent redirects, changing cache policy |
| **Depended on by** | Vercel deployment, SEO crawlers |
| **Risk** | **High** |
| **Avoid** | Removing `/home` redirects (caused real soft-404 reports); duplicating redirects already in React Router |

#### `tailwind.config.js`
| | |
|---|---|
| **Purpose** | Tailwind theme extension mirroring `tokens.js` |
| **Edit when** | Adding new token classes after updating `src/styles/tokens.js` |
| **Depended on by** | All Tailwind class usage, PostCSS build |
| **Risk** | **Medium** |
| **Avoid** | Adding one-off arbitrary values here instead of tokens; editing without updating `tokens.js` |

#### `postcss.config.js`
| | |
|---|---|
| **Purpose** | Tailwind + Autoprefixer pipeline |
| **Edit when** | Almost never |
| **Depended on by** | CRA build |
| **Risk** | **Low** |

#### `.env.example`
| | |
|---|---|
| **Purpose** | Documents contact form env vars for Vercel and local dev |
| **Edit when** | Contact API env var names change |
| **Depended on by** | Developer onboarding, `api/_mailEnv.js` |
| **Risk** | **Low** |

#### `.husky/pre-commit`
| | |
|---|---|
| **Purpose** | Runs `lint-staged` → `audit-page.js` on staged `src/pages/**/*.js` |
| **Edit when** | Changing pre-commit scope (e.g. include `.jsx`) |
| **Depended on by** | Every commit touching page files |
| **Risk** | **Medium** |
| **Avoid** | Disabling without user request |

---

### `api/`

#### `api/contact.js`
| | |
|---|---|
| **Purpose** | POST handler — sends contact form via Gmail SMTP (Nodemailer) |
| **Edit when** | Changing contact form fields, error messages, SMTP config |
| **Depended on by** | `src/pages/ContactUs.js`, Vercel serverless runtime |
| **Risk** | **Medium** |
| **Avoid** | Committing credentials; testing only with `npm start` (needs `vercel dev` or proxy) |

#### `api/_mailEnv.js`
| | |
|---|---|
| **Purpose** | Resolves `GMAIL_APP_PASSWORD` from env (supports alias key names) |
| **Edit when** | Adding new supported env var aliases |
| **Depended on by** | `contact.js`, `contact-status.js` |
| **Risk** | **Low** |

#### `api/contact-status.js`
| | |
|---|---|
| **Purpose** | Health check for contact form configuration |
| **Edit when** | Debugging deployment env issues |
| **Depended on by** | Ops/debugging only |
| **Risk** | **Low** |

---

### `public/`

#### `public/index.html`
| | |
|---|---|
| **Purpose** | CRA HTML shell; post-build meta/LCP injection modifies per-route copies in `build/` |
| **Edit when** | Changing base HTML structure, global meta defaults |
| **Depended on by** | CRA build, `inject-static-meta.js` |
| **Risk** | **Medium** |
| **Avoid** | Expecting per-route changes here — most SEO is injected at build time |

#### `public/assets/*-hero-400.webp`
| | |
|---|---|
| **Purpose** | Self-hosted mobile LCP hero images |
| **Edit when** | Never manually — regenerate via `npm run optimize:{route}-hero` |
| **Depended on by** | Static shells, `resolveLcpHeroPreloadUrl`, mobile Lighthouse scores |
| **Risk** | **High** (if wrong file) |
| **Avoid** | Replacing with unoptimised images; forgetting to update after hero config change |

#### `public/sitemap.xml`
| | |
|---|---|
| **Purpose** | Generated sitemap |
| **Edit when** | Never manually — `scripts/generate-sitemap.js` on prebuild |
| **Depended on by** | SEO crawlers |
| **Risk** | **Low** |

---

### `scripts/` (grouped)

#### `scripts/generate-art-slices.js`
| | |
|---|---|
| **Purpose** | Splits `artImages.json` into route-sized JSON slices |
| **Edit when** | Adding new slice categories, new story slug patterns |
| **Depended on by** | `prestart`, `prebuild`, all pages importing slice JSON |
| **Risk** | **High** |
| **Avoid** | Editing generated slices instead of this script + master catalog |

#### `scripts/generate-sitemap.js`
| | |
|---|---|
| **Purpose** | Generates `public/sitemap.xml` from routes |
| **Edit when** | Adding routes (ensure new paths included) |
| **Depended on by** | `prebuild` |
| **Risk** | **Medium** |

#### `scripts/inject-static-meta.js`
| | |
|---|---|
| **Purpose** | Post-build: per-route SEO meta, LCP preloads, static mobile shell HTML injection |
| **Edit when** | Adding a new mobile static shell route |
| **Depended on by** | `npm run build`, all mobile LCP optimisation |
| **Risk** | **High** |
| **Avoid** | Casual edits; always run full build after changes |

#### `scripts/audit-page.js`
| | |
|---|---|
| **Purpose** | Detects hardcoded colors/spacing in page files (pre-commit) |
| **Edit when** | Tightening token migration rules |
| **Depended on by** | Husky pre-commit, manual page audits |
| **Risk** | **Low** |

#### `scripts/*StaticShell.js` (~33 files)
| | |
|---|---|
| **Purpose** | Build-time HTML/CSS for static mobile heroes per route |
| **Edit when** | Adding or fixing mobile LCP for a specific route |
| **Depended on by** | `inject-static-meta.js`, matching `Mobile*ShellApp.js` |
| **Risk** | **High** (per route) |
| **Avoid** | Creating shell without wiring all 5 touchpoints (see §6) |

#### `scripts/optimize-*-hero.js` / `*-hero-inline.cjs`
| | |
|---|---|
| **Purpose** | Fetch Cloudinary hero → Sharp resize → `public/assets/*-hero-400.webp` |
| **Edit when** | Hero image source changes for a route |
| **Depended on by** | Mobile static shells, LCP preloads |
| **Risk** | **Medium** |

#### `scripts/upload-cloudinary.js`, `upload-one-cloudinary.js`, `migrate-artimages-publicids.js`
| | |
|---|---|
| **Purpose** | Asset upload and catalog migration utilities |
| **Edit when** | Bulk image operations, folder restructures |
| **Depended on by** | `artImages.json`, Cloudinary CDN |
| **Risk** | **Medium** |
| **Avoid** | Public IDs with spaces/special characters (see `cloudinary-upload-failures.json`) |

#### `scripts/staticHeroGenerator.cjs`
| | |
|---|---|
| **Purpose** | Boilerplate generator for new mobile shell apps |
| **Edit when** | Shell pattern changes globally (rare) |
| **Depended on by** | New route shell scaffolding |
| **Risk** | **High** |

---

### `src/` — entry points

#### `src/index.js`
| | |
|---|---|
| **Purpose** | Dual bootstrap: routes mobile viewports to `Mobile*ShellApp` or `App` |
| **Edit when** | Adding a route with mobile static hero shell |
| **Depended on by** | Every page load |
| **Risk** | **High** |
| **Avoid** | Missing a route branch; wrong viewport breakpoint (767px) |

#### `src/App.js`
| | |
|---|---|
| **Purpose** | Router shell: Nav, VisualHeader, Footer, CookieConsent, PageTransition, paper texture |
| **Edit when** | Global layout, cookie/analytics, route-wide styling behaviour |
| **Depended on by** | Desktop + non-shell mobile routes; upgraded-to from mobile shells |
| **Risk** | **High** |
| **Avoid** | Removing `NarrativeProvider`; changing paper texture logic without checking all page types |

#### `src/index.css`
| | |
|---|---|
| **Purpose** | Tailwind directives, global resets, lightbox nav hiding, gradient utilities |
| **Edit when** | Global CSS that can't be expressed in Tailwind |
| **Depended on by** | Entire app |
| **Risk** | **Medium** |

#### `src/loadDeferredFonts.js`
| | |
|---|---|
| **Purpose** | Loads Dancing Script after LCP window on static-hero pages |
| **Edit when** | Font loading strategy changes |
| **Depended on by** | `staticHeroScrollGate.js`, `App.js` |
| **Risk** | **High** (LCP impact) |

---

### `src/config/`

| File | Purpose | Edit when | Depends on it | Risk |
|------|---------|-----------|---------------|------|
| `routes.js` | Route table + lazy component bindings | New/removed routes, redirects | `App.js`, `pageChunks.js` | **High** |
| `pageChunks.js` | `pathname → dynamic import()` map | New routes, prefetch tuning | `routes.js`, `useRoutePrefetch.js`, templates | **High** |
| `seoTitles.js` | Per-route SEO titles/descriptions | New routes, copy updates | Pages, `staticRouteMeta.js` | **Low** |
| `staticRouteMeta.js` | Build-time meta for `inject-static-meta.js` | New routes, SEO changes | Build script | **Medium** |
| `searchIndex.js` | Site search document index | New pages, searchable content | `SearchResults.js` | **Low** |
| `searchImages.js` | Search result thumbnails | Search UI changes | Search | **Low** |
| `breadcrumbLabels.js` | Visual header breadcrumb labels | New routes | `VisualHeader.js` | **Low** |
| `destinations.json` *(in assets)* | Map coordinates | New destinations | Maps, page `locationData` | **Low** |
| `homeHeroSlots.js` | Homepage hero layout slots | Home redesign | `HomeNew.js` | **Medium** |
| `homeLcpLogo.js` | Homepage LCP logo config | Home performance tuning | `HomeNew.js`, build | **Medium** |
| `journalMaps.js` | Journal map configuration | Map behaviour | `*JournalMap.jsx` | **Medium** |
| `regionScope.js` | Region scoping for nav/search | New countries | Nav, search | **Medium** |
| `galleryBannerPreview.js` | Home gallery banner preview images | Home gallery changes | `GalleryBanner.js` | **Low** |
| `siteUpdates.js` | "What's new" content | Homepage updates | `WhatsNew.js` | **Low** |
| `nomadsGalleryWall.js` | Gallery wall config | Gallery layout | `NomadsGallery.js` | **Low** |

---

### `src/pages/`

#### Top-level page files (e.g. `Rio.js`, `AthensNew.js`, `HomeNew.js`)
| | |
|---|---|
| **Purpose** | Route components — compose templates, data, images, editorial blocks |
| **Edit when** | Destination content, images, SEO props, template props — **primary work area** |
| **Depended on by** | `routes.js`, `pageChunks.js`, matching mobile shell |
| **Risk** | **Low–Medium** |
| **Avoid** | Hardcoded hex colors (pre-commit fails); mixing Dense/Light props; forgetting `skipHero` on shell routes |

#### `src/pages/templates/DenseTemplate.js`
| | |
|---|---|
| **Purpose** | Megacity/industrial — navigation-heavy city pages |
| **Edit when** | Changing Dense structural behaviour (rare — affects São Paulo, Antwerp) |
| **Depended on by** | All Dense pages |
| **Risk** | **High** |
| **Avoid** | Adding Light-only props; removing SubsectionNavigator |

#### `src/pages/templates/LightTemplate.js`
| | |
|---|---|
| **Purpose** | Immersive/linear — atmospheric destination pages |
| **Edit when** | Changing Light structural behaviour (affects Rio, Budapest, Pantanal, etc.) |
| **Depended on by** | All Light pages |
| **Risk** | **High** |
| **Avoid** | Adding IntroGrid or SubsectionNavigator |

#### `src/pages/templates/CountryLandingTemplate.js`
| | |
|---|---|
| **Purpose** | Country hub pages (Brazil, Greece, Austria, etc.) |
| **Edit when** | Hub layout, destination cards, hero treatment |
| **Depended on by** | All country landing routes |
| **Risk** | **High** |

#### `src/pages/templates/{DenseEditorial,BreathAndSpace,SlowReveal}Template.js`
| | |
|---|---|
| **Purpose** | **Legacy** — migration remnants |
| **Edit when** | **Don't** — do not use for new pages |
| **Risk** | **Medium** (if accidentally extended) |

#### `src/pages/{region}/*.hero.config.js`
| | |
|---|---|
| **Purpose** | Hero availability authority (`status: active|disabled|missing`, `publicId`) |
| **Edit when** | New hero images, enabling/disabling hero tiers |
| **Depended on by** | `resolveHero.js`, page component, static shell, LCP preload |
| **Risk** | **Medium** |
| **Avoid** | Setting `active` before asset exists; forgetting optimise script after image change |

#### `src/pages/austria/buildAustriaStoryPage.js`, `src/pages/czech/buildCzechStoryPage.js`
| | |
|---|---|
| **Purpose** | Factory builders for region story pages |
| **Edit when** | Adding Austria/Czech story pages |
| **Depended on by** | `ViennaNew.js`, `SalzburgNew.js`, `PragueNew.js`, etc. |
| **Risk** | **Medium** |
| **Avoid** | Cloning factory output into standalone pages instead of extending factory |

---

### `src/components/`

#### `src/components/layout/` (Hero, IntroGrid, NarrativeSplit, etc.)
| | |
|---|---|
| **Purpose** | Editorial pacing vocabulary — tokenized layout primitives |
| **Edit when** | System-wide layout/typography behaviour changes |
| **Depended on by** | All three active templates |
| **Risk** | **High** |
| **Avoid** | Hardcoded colors (these should be tokenized); breaking `variant="dark"` support |

#### `src/components/editorial/`
| | |
|---|---|
| **Purpose** | Placement-driven blocks (We'd Do This Again, Favourite Places, atmosphere variants) |
| **Edit when** | New editorial block types, regional atmosphere tuning |
| **Depended on by** | Templates, individual pages via `editorialBlocks` prop |
| **Risk** | **Medium** |
| **Avoid** | Inline editorial JSX in pages when placement system exists; guide-style phrasing in `doThisAgainBlock` |

#### `src/components/filmstrip/`
| | |
|---|---|
| **Purpose** | Nomads Gallery filmstrip carousel, lightbox, templates |
| **Edit when** | Gallery UX, new filmstrip templates |
| **Depended on by** | `NomadsGallery.js`, `src/data/nomadsFilmstrips.js` |
| **Risk** | **Medium** |

#### `src/components/nav/` + `Nav.js`
| | |
|---|---|
| **Purpose** | Site navigation, search, region menus |
| **Edit when** | New countries/routes in nav, search behaviour |
| **Depended on by** | Every page |
| **Risk** | **High** (nav affects all routes) |

#### `src/components/CloudinaryImage.js`
| | |
|---|---|
| **Purpose** | Responsive Cloudinary images with srcset, legacy path support |
| **Edit when** | Image loading behaviour, srcset strategy |
| **Depended on by** | Most pages and layout components |
| **Risk** | **High** |

#### `src/components/CountryFeatureCard.js`
| | |
|---|---|
| **Purpose** | Hub page destination teasers (crawlable, `fetchpriority="low"`) |
| **Edit when** | Hub card design |
| **Depended on by** | Country landing pages |
| **Risk** | **Medium** |
| **Avoid** | `fetchpriority="high"` — stole USA hub LCP in production |

#### `src/components/SEO.js`
| | |
|---|---|
| **Purpose** | Per-page react-helmet meta |
| **Edit when** | SEO tag structure |
| **Depended on by** | All pages |
| **Risk** | **Low** |

#### `src/components/home/`
| | |
|---|---|
| **Purpose** | Homepage-specific sections |
| **Edit when** | Home redesign |
| **Depended on by** | `HomeNew.js`, `MobileShellApp.js` |
| **Risk** | **Medium** (home LCP sensitive) |

#### `src/components/shop/`
| | |
|---|---|
| **Purpose** | Shop header + `shopTheme.js` (uses `tw.surface.shop`) |
| **Edit when** | Shop styling |
| **Depended on by** | All `/nomads-shop/*` routes |
| **Risk** | **Low** |

#### Map components (`*Map.js`, `*JournalMap.jsx`)
| | |
|---|---|
| **Purpose** | Interactive SVG maps per region |
| **Edit when** | Map paths, click targets, new destinations |
| **Depended on by** | Country hubs, Dense pages, home |
| **Risk** | **Medium** |
| **Avoid** | Path data misaligned with routes (fixed in Adventures commit) |

---

### `src/assets/`

#### `src/assets/artImages.json`
| | |
|---|---|
| **Purpose** | Master catalog of all gallery images |
| **Edit when** | Adding/removing images, changing public IDs |
| **Depended on by** | `generate-art-slices.js` → all slice imports |
| **Risk** | **High** |
| **Avoid** | Editing without running `generate:art-slices` |

#### `src/assets/artImages/slices/`
| | |
|---|---|
| **Purpose** | **Generated** route-sized image subsets |
| **Edit when** | **Never manually** |
| **Depended on by** | Individual page imports |
| **Risk** | **High** if hand-edited |

#### `src/assets/heroData.js`
| | |
|---|---|
| **Purpose** | Semantic hero registry (role-centric public IDs) |
| **Edit when** | New hero roles, theme mappings |
| **Depended on by** | `Hero.js`, `resolveHero.js` |
| **Risk** | **Medium** |

#### `src/assets/destinations.json`
| | |
|---|---|
| **Purpose** | Geo coordinates for maps and location metadata |
| **Edit when** | New destinations |
| **Depended on by** | Page `locationData`, maps |
| **Risk** | **Low** |

#### `src/assets/images/`, `src/assets/Backgrounds/`
| | |
|---|---|
| **Purpose** | Local SVG maps, UI icons, textures (bundled, not Cloudinary) |
| **Edit when** | Replacing SVG assets, textures |
| **Depended on by** | Maps, paper texture, UI |
| **Risk** | **Low** |

---

### `src/styles/`

#### `src/styles/tokens.js`
| | |
|---|---|
| **Purpose** | **Single source of truth** for colors, typography, spacing, shadows, destination palettes |
| **Edit when** | Design system changes — update here first, then `tailwind.config.js` |
| **Depended on by** | Layout components, templates, `tw` exports |
| **Risk** | **High** |
| **Avoid** | One-off values in pages instead of adding tokens |

#### `src/styles/index.js`
| | |
|---|---|
| **Purpose** | Exports `{ tokens, tw, styles }` |
| **Edit when** | New `tw` convenience classes |
| **Depended on by** | Pages, components |
| **Risk** | **Medium** |

#### `src/styles/paperTexture.js`
| | |
|---|---|
| **Purpose** | Paper background tiled style object |
| **Edit when** | Paper aesthetic changes |
| **Depended on by** | `App.js`, templates |
| **Risk** | **Medium** |

---

### `src/utils/`

| File | Purpose | Edit when | Risk |
|------|---------|-----------|------|
| `cloudinary.js` | URL builder, legacy Brazil prefix mapping | Brazil folder migration, URL format changes | **High** |
| `staticHeroScrollGate.js` | Timer-based chunk load, below-fold gate, font delay | LCP tuning (extreme caution) | **High** |
| `staticPageHero.js` | `has*StaticHero()` detectors per route | New mobile shell routes | **Medium** |
| `analytics.js` | Cookie-gated analytics loading | Privacy/analytics changes | **Medium** |
| `artImageResolver.js` | Resolves art image references from catalog | Gallery logic changes | **Medium** |
| `resolveLightboxImage.js` | Lightbox image URL resolution | Lightbox changes | **Low** |

---

### `src/system/resolvers/resolveHero.js`
| | |
|---|---|
| **Purpose** | Hero tier resolution + LCP preload URL mapping to local WebP assets |
| **Edit when** | New static hero routes, hero resolution logic |
| **Depended on by** | Templates, `CountryLandingTemplate`, build preloads |
| **Risk** | **High** |
| **Avoid** | Assuming Cloudinary upload = available hero; missing preload mapping for new routes |

---

### `src/Mobile*ShellApp.js` (33 files)
| | |
|---|---|
| **Purpose** | Mobile-only bootstrap: static hero preservation, delayed chunk load, upgrade to full App on navigation |
| **Edit when** | Fixing mobile LCP/behaviour for that specific route |
| **Depended on by** | `src/index.js`, matching `*StaticShell.js`, `inject-static-meta.js` |
| **Risk** | **High** (per file) |
| **Avoid** | Missing `NarrativeProvider`; scroll-triggered chunk loading; duplicating without all 5 wiring points |

---

### `src/context/NarrativeContext.js`
| | |
|---|---|
| **Purpose** | Narrative state for interactive map/story features |
| **Edit when** | Narrative interaction model changes |
| **Depended on by** | `App.js`, all mobile shells, Adventures/home map |
| **Risk** | **High** |
| **Avoid** | Removing from mobile shells (caused real crash) |

---

### Documentation files (reference — rarely edit)

| File | Use |
|------|-----|
| `PROJECT_CONTEXT.md` | Architecture onboarding |
| `AI_HANDOVER.md` | Pitfalls & tribal knowledge |
| `DESIGN_SYSTEM.md` | Token reference, typography, shop colours |
| `PAGE_IMPLEMENTATION_GUIDE.md` | How to build new pages |
| `TEMPLATE_CAPABILITY_MATRIX.md` | Dense vs Light rules |
| `nomad-editorial-system.md` | Writing rules |
| `nomad-editorial-linter.md` | Editorial review process |
| `MIGRATION_AUDIT.md` | Token migration tracker |
| `INFRASTRUCTURE_STATUS.md` | Design system implementation status |
| `SEMANTIC_ASSET_ARCHITECTURE.md` | Hero/asset organisation philosophy |
| `SIGNATURE_OBJECTS.md` | Per-destination visual anchors |
| `SYSTEM_MATURITY_REPORT.md` | ⚠️ Partially **stale** — references deleted Rio variants |

---

## 4. Critical Files (almost never edit)

| File | Why |
|------|-----|
| `src/index.js` | One wrong `if` branch breaks mobile bootstrap for a route |
| `scripts/inject-static-meta.js` | Build-time SEO + LCP for every shell route |
| `src/utils/staticHeroScrollGate.js` | Timing constants tuned against real Lighthouse failures |
| `src/utils/cloudinary.js` | Brazil legacy prefix map — breaking it 404s images |
| `src/system/resolvers/resolveHero.js` | Hero contract + LCP preload mappings |
| `src/assets/artImages/slices/**` | Generated — edits overwritten on next build |
| `build/` | Build output |
| `src/pages/templates/DenseEditorialTemplate.js` etc. | Legacy — extend active templates instead |
| `SYSTEM_MATURITY_REPORT.md` | Stale guidance — don't follow blindly |

**Edit only with full build + mobile Lighthouse check:** any `*StaticShell.js`, `Mobile*ShellApp.js`, `resolveHero.js`, `inject-static-meta.js`.

---

## 5. Safe Editing Areas

| Area | Typical tasks | Risk |
|------|---------------|------|
| `src/pages/{Destination}.js` | Copy, images, template props, editorial blocks | **Low** |
| `src/pages/{region}/*.hero.config.js` | Enable/disable hero tiers | **Low–Medium** |
| `src/pages/{region}/*.data.js` | Structured page content | **Low** |
| `src/config/seoTitles.js` | SEO copy | **Low** |
| `src/assets/destinations.json` | Coordinates | **Low** |
| `src/components/editorial/editorialConfig.js` | Atmosphere variants | **Low** |
| `api/contact.js` | Form behaviour | **Medium** |
| `src/components/shop/` | Shop styling | **Low** |
| Region map components | Path/click data | **Medium** |
| `MIGRATION_AUDIT.md` | Migration progress notes | **Low** |

**Safest reference pages to copy patterns from:**
- Light: `AthensNew.js`, `Rio.js`, `AntwerpNew.js`
- Dense: `SaoPaulo.js`
- Country hub: `Greece.js`, `Austria.js`
- Factory-built: `ViennaNew.js`, `PragueNew.js`

---

## 6. Build & Deployment

### Local development

```bash
npm install

# Recommended — site + API on one port:
npx vercel dev

# Alternative — CRA only (contact form needs proxy):
# .env.development.local → CONTACT_API_PROXY=http://localhost:3000
npm start
```

`prestart` auto-runs `generate-art-slices.js`.

### Production build

```bash
npm run build
# prebuild: sitemap + art slices + logo optimise
# build: react-scripts build + inject-static-meta.js
```

Output: `build/` directory deployed by Vercel.

### Vercel

- **Auto-deploy:** push to `main` → production; branches → preview URLs
- **Env vars required:** `GMAIL_APP_PASSWORD`, `SMTP_USER`, `CONTACT_TO`, `CONTACT_FROM` (see `.env.example`)
- **Config:** `vercel.json` (redirects, cache headers)
- **No GitHub Actions CI** — Husky pre-commit is the only automated gate

### Common build scripts

| Command | Purpose |
|---------|---------|
| `npm run generate:art-slices` | Regenerate image slices from catalog |
| `npm run optimize:{route}-hero` | Generate mobile LCP WebP for a route |
| `npm run upload:cloudinary` | Bulk upload to Cloudinary |
| `node scripts/audit-page.js src/pages/X.js` | Token compliance check |

---

## 7. Performance System

Mobile performance is a **parallel delivery layer**, not an optimisation pass.

### Dual bootstrap (`src/index.js`)

| Viewport | Behaviour |
|----------|-----------|
| ≤767px + shell route | Load `Mobile*ShellApp.js` |
| Otherwise | Load `App.js` |

### Mobile shell anatomy

Each shell route requires **five wiring points**:

1. `src/index.js` — bootstrap branch
2. `scripts/{route}StaticShell.js` — build-time HTML hero
3. `scripts/inject-static-meta.js` — imports and injects shell
4. `src/utils/staticPageHero.js` — `has{Route}StaticHero()` detector
5. Page component — `skipHero={has*StaticHero() && isMobileViewport()}`

Plus usually: `npm run optimize:{route}-hero` → `public/assets/{route}-hero-400.webp` and an entry in `resolveLcpHeroPreloadUrl`.

### LCP strategy

| Technique | Implementation |
|-----------|----------------|
| Static HTML hero outside `#root` | Injected at build by `*StaticShell.js` |
| React hero skipped on mobile | `skipHero` prop on templates |
| Page chunk delayed 6s | `useStaticHeroPageChunkLoader` — **not scroll-triggered** |
| Below-fold gated | 8s dwell + 160px scroll via `useStaticHeroBelowFoldGate` |
| Handwriting font delayed 12s | `useStaticHeroDeferredFonts` |
| Hub cards deprioritised | `fetchpriority="low"` on `CountryFeatureCard` |
| Self-hosted hero WebP | `public/assets/*-hero-400.webp` |

### Lazy loading

- All routes: `React.lazy` via `src/config/pageChunks.js`
- Prefetch: `useRoutePrefetch.js` + `IDLE_PREFETCH_PATHS`
- Art images: per-route JSON slices (not full `artImages.json`)

### Performance-sensitive — do not casually change

- `staticHeroScrollGate.js` timing constants
- `loadDeferredFonts.js` / font import strategy in `index.js`
- `fetchpriority` on above-fold images
- `CountryLandingTemplate` hero rendering on mobile shell routes
- Homepage (`HomeNew.js`, `MobileShellApp.js`) — separate LCP concerns

---

## 8. Editorial System

### Philosophy (`nomad-editorial-system.md`)

**Observation → Action → Detail → Reflection (only if needed).**

Write like a travel notebook, not a guidebook. Sentences must be specific enough that they couldn't apply to a different city unchanged.

### Template hierarchy

| Question | Template |
|----------|----------|
| Do users navigate subsections? | `DenseTemplate` |
| Do users experience linear atmosphere? | `LightTemplate` |
| Country hub with destination cards? | `CountryLandingTemplate` |

Variants adjust tone only — never structure. See `TEMPLATE_CAPABILITY_MATRIX.md`.

### Editorial blocks (`src/components/editorial/`)

Placement-driven inserts on top of templates:

```
Narrative → We'd Do This Again → Favourite Places → Bridge → Looking Back → Gallery
```

Use `doThisAgainBlock()`, `EDITORIAL_PLACEMENTS`, and `atmosphere` prop — not ad-hoc JSX sections.

### Handwriting font rule

**Max one per page** — BridgeQuote, section heading, or ReflectiveClose. Not body text.

### Review process

Use `nomad-editorial-linter.md`: identify three strongest passages first, then flag issues by severity (HIGH/MEDIUM/LOW). Don't rewrite good copy.

---

## 9. Common AI Mistakes

Consolidated from session history and `AI_HANDOVER.md`:

1. Adding routes without mobile bootstrap in `index.js`
2. Setting hero `status: 'active'` before Cloudinary asset exists
3. Scroll-triggered page chunk loading on static-hero routes (reverted — caused 24s LCP)
4. Forgetting `NarrativeProvider` in mobile shells
5. Duplicating React hero when static shell already provides one (missing `skipHero`)
6. `fetchpriority="high"` on below-fold hub images
7. Mixing Dense and Light template props/structure
8. Generic AI travel prose ("the city reveals itself", "hidden gem")
9. Multiple handwriting font moments per page
10. Editing `artImages.json` without regenerating slices
11. Hand-editing `artImages/slices/` directly
12. Removing Brazil legacy prefix mapping prematurely
13. Trusting stale `SYSTEM_MATURITY_REPORT.md`
14. Batch token-migrating all pages instead of incremental
15. Using `text-[#hex]` in page files (pre-commit fails)
16. Cloudinary public IDs with spaces/special characters
17. Refactoring 33 mobile shells "to reduce duplication"
18. Testing contact form with `npm start` only
19. Copying editorial phrases from old pages that violate current rules (e.g. Salvador `rio.data.js`)
20. Editing `inject-static-meta.js` without running full build

---

## 10. Current Technical Debt

### Unfinished migrations

| Item | Status |
|------|--------|
| Design token migration | Layout components done; ~40 pages still have hardcoded values (`MIGRATION_AUDIT.md`) |
| Brazil Cloudinary folder restructure | `BRAZIL_LEGACY_PREFIXES` still active in `cloudinary.js` |
| Legacy templates | `DenseEditorialTemplate`, `BreathAndSpaceTemplate`, `SlowRevealTemplate` still exported |
| `SaoPauloRefactored.js` vs `SaoPaulo.js` | Reference implementation exists; production uses original |
| Czech Bohemian Wilderness art slice | Stub slug in `generate-art-slices.js` — awaiting catalog import |
| CountryLandingTemplate variants | Only `tropical` (Brazil); mediterranean/industrial/continental planned |

### Known issues

| Issue | Notes |
|-------|-------|
| 33 mobile shells | High maintenance; repetitive by design |
| `inject-static-meta.js` size | Imports every shell — fragile |
| `cloudinary-upload-failures.json` | Hundreds of Food&Drink uploads failed (invalid public IDs) |
| `README.md` | Default CRA boilerplate — no project setup |
| `Adventures.js` | Dead code? Route redirects to `/` |
| Pre-commit scope | Only `src/pages/**/*.js` — not `.jsx` or components |
| Windows paths in `package.json` | Upload scripts reference `C:\Users\benji\cloudinary-staging\` |
| Stale docs | `SYSTEM_MATURITY_REPORT.md` references deleted Rio routes/files |
| Editorial debt | Some production copy still contains forbidden phrases from pre-linter era |
| No CI tests | Visual/Lighthouse QA is manual |

### Cleanup candidates

- Remove legacy templates once no pages reference them
- Delete `Adventures.js` if confirmed unused
- Sanitise and re-upload failed Food&Drink Cloudinary assets
- Replace `README.md` with project-specific setup (when asked)
- Complete token migration page-by-page as touched

---

## 11. Recommended Future Development Order

If continuing this project, this order minimises risk and builds on the `editorial-review` branch momentum:

### Phase 1 — Stabilise (low risk, high value)
1. **Finish editorial linter pass** on remaining pages with forbidden phrases
2. **Complete Czech Republic content** — import Bohemian Wilderness art catalog, remove stub
3. **Verify all mobile shells** have `NarrativeProvider` and correct `skipHero` wiring
4. **Run Lighthouse mobile** on top 10 routes; fix any LCP regressions

### Phase 2 — Content expansion (medium risk)
5. **CountryLandingTemplate variants** for Greece, Belgium, Hungary hubs
6. **New European destinations** using factory builders (`buildAustriaStoryPage` pattern)
7. **Nomads Shop** redesign (remote branch exists: `redesign-nomads-shop-editorial`)

### Phase 3 — Technical debt (higher risk, schedule carefully)
8. **Token migration** — one page at a time when touched; start with `Rio.js` or `Tennessee.js`
9. **Brazil Cloudinary migration** — complete re-upload, remove `BRAZIL_LEGACY_PREFIXES`
10. **Consolidate mobile shell generation** — only if user explicitly requests; use `staticHeroGenerator.cjs`

### Phase 4 — Infrastructure (only if needed)
11. **Add CI** — at minimum `npm run build` on PRs
12. **Extend pre-commit audit** to `.jsx` page files and components
13. **Replace README.md** with setup docs

### Do not prioritise unless asked
- Ejecting CRA
- Adding TypeScript
- Refactoring all 33 mobile shells into one abstraction
- Batch-migrating all pages to tokens
- Deleting legacy files without confirming zero references

---

## Quick Navigation

| I need to… | Go to |
|------------|-------|
| Understand architecture | `PROJECT_CONTEXT.md` |
| Avoid mistakes | `AI_HANDOVER.md` |
| Find a file's risk level | This document §3 |
| Add a new route | `routes.js` + `pageChunks.js` + `seoTitles.js` + §6 wiring |
| Edit destination copy/images | `src/pages/{Name}.js` |
| Change hero image | `*.hero.config.js` + optimise script + static shell chain |
| Check writing rules | `nomad-editorial-system.md` |
| Pick a template | `TEMPLATE_CAPABILITY_MATRIX.md` |
| Build/deploy | §5 above |
| Check token migration status | `MIGRATION_AUDIT.md` |

---

*Last updated: 2026-07-13 — final development session index.*
