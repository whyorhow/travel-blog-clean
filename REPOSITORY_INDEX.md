# REPOSITORY_INDEX.md

**Where everything lives** — file and folder map for the Nomad Scribbles repository.

| Document | Purpose |
|----------|---------|
| `PROJECT_CONTEXT.md` | How the project is built — architecture, stack, assumptions, priorities |
| `AI_HANDOVER.md` | What previous work taught us — history, traps, why patterns look unusual |
| `AI_RULES.md` | How assistants should behave — checklists, constraints, completion criteria |
| `AI_DESTINATION_WORKFLOW.md` | Destination creation lifecycle — assets, pages, heroes, routes, validation |
| `REPOSITORY_INDEX.md` | **This file** — where code, config, scripts, and assets live |

Open this when you ask: "Where is the code for this?"

For new destination creation, follow `AI_DESTINATION_WORKFLOW.md`.
For architecture decisions, use `PROJECT_CONTEXT.md`.
For operational lessons and known traps, use `AI_HANDOVER.md`.
For assistant behaviour rules, use `AI_RULES.md`.

Behavioural rules: `AI_RULES.md`. Why a file is risky: `AI_HANDOVER.md`. Architecture: `PROJECT_CONTEXT.md`.

---

## Quick lookup

### Destination creation workflow

New destination lifecycle:
`AI_DESTINATION_WORKFLOW.md`

Covers:
- planning destination structure
- preparing assets
- integrating heroes/gallery images
- updating image catalogues
- generating slices
- creating page components
- wiring heroes
- registering routes and metadata
- mobile verification
- validation
- deployment

### Config files (`src/config/`)

| File | Locates |
|------|---------|
| `routes.js` | Route path → page component |
| `pageChunks.js` | Route path → lazy `import()` |
| `seoTitles.js` | Route SEO titles and descriptions |
| `staticRouteMeta.js` | Build-time meta for `inject-static-meta.js` |
| `searchIndex.js` | Site search documents |
| `breadcrumbLabels.js` | Visual header breadcrumb text |
| `regionScope.js` | Nav/search region scoping |
| `homeHeroSlots.js`, `homeLcpLogo.js` | Homepage hero/LCP |
| `journalMaps.js` | Journal map configuration |
| `siteUpdates.js` | Homepage "What's new" |
| `nomadsGalleryWall.js` | Nomads Gallery wall layout |

Co-located page config: `src/pages/{region}/*.hero.config.js`, `*.data.js` · Map coords: `src/assets/destinations.json`

### Scripts (`scripts/`) by category

| Category | Files | Output / effect |
|----------|-------|-----------------|
| Build pipeline | `generate-art-slices.js`, `generate-sitemap.js`, `inject-static-meta.js`, `optimize-logo.js` | Slices, sitemap, per-route HTML, logo |
| Mobile LCP | `*StaticShell.js` (~33), `optimize-*-hero.js`, `staticHeroGenerator.cjs` | Static HTML heroes, `public/assets/*-hero-400.webp` |
| Quality | `audit-page.js` | Pre-commit token compliance |
| Cloudinary | `upload-cloudinary.js`, `upload-one-cloudinary.js`, `migrate-artimages-publicids.js` | CDN uploads, catalog migration |

npm script names: `package.json` · Full file index below.

### Components by feature

| Feature | Location |
|---------|----------|
| Page templates | `src/pages/templates/` — `DenseTemplate`, `LightTemplate`, `CountryLandingTemplate` |
| Layout / pacing | `src/components/layout/` |
| Editorial blocks | `src/components/editorial/` |
| Filmstrip gallery | `src/components/filmstrip/` + `src/data/nomadsFilmstrips.js` |
| Navigation | `src/components/nav/`, `src/components/Nav.js` |
| Maps | `src/components/*Map.js`, `*JournalMap.jsx` |
| Images | `src/components/CloudinaryImage.js`, `GalleryWall`, `UnifiedLightbox` |
| Homepage | `src/components/home/` → `src/pages/HomeNew.js` |
| Shop | `src/components/shop/` → `src/pages/NomadsShop*.js` |
| SEO | `src/components/SEO.js` |
| Hero resolution | `src/system/resolvers/resolveHero.js` |
| Mobile shells | `src/Mobile*ShellApp.js` (33 at `src/` root) |

---

## Directory map

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

**Low-value / ignore unless asked:** `build/`, `node_modules/`, `tmp-*`, stray git helper files, `cloudinary-upload-failures.json`.

---

## Route → file mapping

Primary page component for each route (see `src/config/routes.js` for redirects). Hero configs and data files are co-located under `src/pages/{region}/`.

| Route | Page file | Template (typical) |
|-------|-----------|-------------------|
| `/` | `src/pages/HomeNew.js` | Home |
| `/brazil` | `src/pages/Brazil.js` | `CountryLandingTemplate` |
| `/brazil/rio` | `src/pages/Rio.js` | `LightTemplate` |
| `/brazil/saopaulo` | `src/pages/SaoPaulo.js` | `DenseTemplate` |
| `/brazil/saopaulo/green-spaces` | `src/pages/GreenSpaces.js` | subsection |
| `/brazil/saopaulo/galleries` | `src/pages/ArtGalleries.js` | subsection |
| `/brazil/saopaulo/carnival` | `src/pages/CarnivalSaoPaulo.js` | subsection |
| `/brazil/saopaulo/street-art` | `src/pages/Graffiti.js` | subsection |
| `/greece/athens` | `src/pages/AthensNew.js` | `LightTemplate` |
| `/austria/vienna` | `src/pages/ViennaNew.js` | factory-built |
| `/czech-republic/prague` | `src/pages/PragueNew.js` | factory-built |
| `/united-states/tennessee` | `src/pages/Tennessee.js` | varies |
| `/nomads-gallery` | `src/pages/NomadsGallery.js` | filmstrip |
| `/nomads-shop` | `src/pages/NomadsShop.js` | shop |

Full route table: `PROJECT_CONTEXT.md` §3. Mobile shell for a route: `src/Mobile{Route}ShellApp.js` (if exists) + `scripts/{route}StaticShell.js`.
New destination routes must also complete the checklist in `AI_DESTINATION_WORKFLOW.md`.

---

## File & directory index

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
| **Avoid** | Creating shell without full wiring (`AI_HANDOVER.md` § Hidden dependency chains → Mobile shell wiring) |

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
| **Avoid** | See `AI_RULES.md` § Always do / Template rules for page-level constraints |

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
New hero implementation sequence is defined in `AI_DESTINATION_WORKFLOW.md`.
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
| **Avoid** | `fetchpriority="high"` on hub cards (`AI_HANDOVER.md` § Patterns → CountryFeatureCard) |

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
| `AI_HANDOVER.md` | Lessons, traps, migration history |
| `AI_RULES.md` | Assistant behaviour and checklists |
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

## Critical files (almost never edit)

Brief list — full rationale: `PROJECT_CONTEXT.md` §15 · Historical context: `AI_HANDOVER.md` § Things that look wrong but are intentional.

| File | Why |
|------|-----|
| `src/index.js` | Mobile/desktop bootstrap — one wrong branch breaks a route |
| `scripts/inject-static-meta.js` | Build-time SEO + LCP for all shell routes |
| `src/utils/staticHeroScrollGate.js` | LCP timing tuned against real Lighthouse failures |
| `src/utils/cloudinary.js` | Brazil legacy prefix map |
| `src/system/resolvers/resolveHero.js` | Hero contract + LCP preload mappings |
| `src/assets/artImages/slices/**` | Generated — do not hand-edit |

---

## Safe editing areas

| Area | Typical tasks |
|------|---------------|
| `src/pages/{Destination}.js` | Copy, images, template props, editorial blocks |
| `src/pages/{region}/*.hero.config.js` | Hero availability |
| `src/config/seoTitles.js` | SEO copy |
| `src/assets/destinations.json` | Map coordinates |
| `src/components/layout/*.js` | Layout vocabulary (tokenized) |

Reference pages: Light → `AthensNew.js`, `Rio.js` · Dense → `SaoPaulo.js` · Hub → `Greece.js`, `Austria.js`

---

## Quick navigation

| I need to… | Go to |
|------------|------|
| Understand architecture | `PROJECT_CONTEXT.md` |
| Learn why something is unusual | `AI_HANDOVER.md` |
| Know how to behave | `AI_RULES.md` |
| Find a file's risk level | This document § File index |
| Add a new destination | AI_DESTINATION_WORKFLOW.md |
| Add a new route | routes.js + pageChunks.js + AI_RULES.md checklist |
| Change a hero image | `*.hero.config.js` + `AI_HANDOVER.md` § Hidden dependency chains |
| Build/deploy commands | `PROJECT_CONTEXT.md` § Document navigation |
| Check migration status | `MIGRATION_AUDIT.md` |
| Know if work is complete | `PROJECT_CONTEXT.md` §16 + `AI_RULES.md` § Completion checklist |

---

*Last updated: 2026-07-15*