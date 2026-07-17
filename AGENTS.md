# Code Wiki

`CODE_WIKI.md` is the fifth documentation layer in this repository.

Use the primary docs first:

1. `PROJECT_CONTEXT.md` — architecture, priorities, assumptions
2. `AI_HANDOVER.md` — history, lessons, hidden traps
3. `REPOSITORY_INDEX.md` — where things live
4. `AI_RULES.md` — behavior and editing constraints
5. `CODE_WIKI.md` — reference map of code flow, intent, workflows, and risky systems

This document is a reference document, not an instruction document. Read it when you need architectural understanding, dependency flow, modification paths, or the purpose behind systems that may look more complex than necessary.

## Repository Philosophy

Nomad Scribbles is not built around DRY architecture. It is built around editorial quality.

- Individual pages are expected to have unique composition.
- Destination pages are intentionally hand-authored, not CMS-generated.
- Duplicate code is acceptable when it preserves page identity or performance.
- Readability for future editors matters more than maximum abstraction.
- Performance compromises are acceptable when they preserve mobile LCP.
- Templates exist to protect storytelling rhythm, not to force visual uniformity.

## Architectural Principles

These principles explain why the codebase looks the way it does.

- Destination pages are intentionally hand-authored.
- Repetition is acceptable when it preserves editorial freedom.
- Performance takes precedence over architectural elegance.
- Desktop and mobile are allowed to diverge if it improves LCP.
- Templates exist to enforce storytelling rhythm, not visual uniformity.
- AI should prefer matching nearby code over introducing abstractions.
- Small targeted edits are preferred over global refactors.
- Generated content artifacts are acceptable when they improve runtime simplicity.

## Intentional Complexity

These systems are intentionally more complex than they appear. Do not simplify them unless explicitly asked.

- Mobile shells
- Hero resolution
- Static HTML heroes
- Hero preload chains
- Editorial templates
- Cloudinary fallback mapping
- Build-time metadata injection

Why this matters:

- these systems are not accidental complexity
- most of them exist because earlier simpler versions caused LCP, SEO, or editorial regressions
- a "cleanup" that removes visible duplication can easily remove hidden guarantees

## Project Overview

**Project name:** Nomad Scribbles  
**Package name:** `brazil-travel-blog`  
**Primary app type:** React SPA with Vercel serverless API endpoints  
**Domain:** Editorial travel storytelling with destination pages, galleries, search, and a small shop/contact surface

At a high level, the repository is five systems working together:

1. A React SPA for desktop and standard mobile routes.
2. A mobile-shell delivery path for selected high-priority routes.
3. A template-based editorial page system.
4. A Cloudinary and generated-JSON image pipeline.
5. A small Vercel-hosted API layer for the contact form.

## Architecture At A Glance

### Runtime Flow

```text
browser request
  -> src/index.js
     -> bootstrapPath()
        -> Mobile*ShellApp.js   # selected mobile LCP routes
        -> App.js               # everything else

App.js / Mobile shell
  -> Router
  -> routes.js
  -> pageChunks.js
  -> lazy page component
  -> page template
  -> layout/editorial/media systems
  -> Cloudinary assets / generated slice JSON
```

### Content Flow

```text
page file
  -> template
  -> hero config
  -> destinations.json
  -> generated art slice JSON
  -> editorial blocks
  -> shared layout/media components
```

### Build Flow

```text
package.json scripts
  -> generate-sitemap.js
  -> generate-art-slices.js
  -> optimize-logo.js
  -> react-scripts build
  -> inject-static-meta.js
```

## Common Modification Paths

AI works better with workflows than with abstract architecture. These are the main modification paths in this repository.

### Adding A New Destination

Read first:

- `AI_DESTINATION_WORKFLOW.md`
- `PROJECT_CONTEXT.md` section on templates
- `REPOSITORY_INDEX.md`

Usually edit:

- `src/config/routes.js`
- `src/config/pageChunks.js`
- `src/config/seoTitles.js`
- `src/config/staticRouteMeta.js`
- `src/config/breadcrumbLabels.js`
- `src/config/searchIndex.js`
- `src/assets/destinations.json`
- new page file in `src/pages/`
- new `*.hero.config.js`
- `src/assets/artImages.json`
- generated slices via `npm run generate:art-slices`
- navigation components if the route should be surfaced

If mobile LCP shell is needed, also update:

- `src/index.js`
- `src/Mobile{Route}ShellApp.js`
- matching `scripts/*StaticShell.js`
- `scripts/inject-static-meta.js`
- `src/utils/staticPageHero.js`
- page-level `skipHero`
- `src/system/resolvers/resolveHero.js`
- route hero optimize script if needed

### Changing A Hero

Read first:

- `src/system/resolvers/resolveHero.js`
- route `*.hero.config.js`
- `scripts/inject-static-meta.js`

If the route has a mobile shell, also inspect:

- `src/Mobile*ShellApp.js`
- matching `scripts/*StaticShell.js`
- `src/utils/staticPageHero.js`

Typical chain:

```text
hero.config.js
  -> resolveHero.js
  -> preload mapping
  -> static shell / skipHero behavior
  -> optimized local hero asset
```

### Adding Photography

Typical flow:

```text
src/assets/artImages.json
  -> npm run generate:art-slices
  -> src/assets/artImages/slices/*
  -> page imports slice JSON
  -> gallery/editorial/template usage
```

Files usually involved:

- `src/assets/artImages.json`
- `scripts/generate-art-slices.js`
- relevant page file
- possibly `src/config/searchIndex.js`

### Changing A Route

Typical chain:

- `src/config/routes.js`
- `src/config/pageChunks.js`
- `src/config/seoTitles.js`
- `src/config/staticRouteMeta.js`
- `src/config/breadcrumbLabels.js`
- `src/config/searchIndex.js`
- navigation
- redirects in `vercel.json` if public URL behavior changes

If the route is a mobile shell route, route work is infrastructure work, not just page work.

### Changing Editorial Structure

Read first:

- `PROJECT_CONTEXT.md` template section
- `TEMPLATE_CAPABILITY_MATRIX.md`
- nearby page using the same template

Usually edit:

- page file props
- one of the active templates only if the task is truly structural
- `src/components/editorial/*` if the task is about insert types or placements

### Changing Search Behavior

Read first:

- `src/config/searchIndex.js`
- `src/config/searchImages.js`

Purpose:

- search is intentionally lightweight and partly image-aware
- it is designed to help readers move between destinations and moments, not to behave like full-site search infrastructure

## Critical Files

These files are dangerous because they sit on hidden dependency chains.

### ★★★★★ Critical Infrastructure

#### `scripts/inject-static-meta.js`

Purpose:

- post-build HTML transformation for route-specific metadata, mobile shell HTML, and preload behavior

Breaking it can affect:

- mobile shells
- LCP
- hero preload
- route HTML
- SEO

#### `src/system/resolvers/resolveHero.js`

Purpose:

- hero selection contract and hero preload mapping

Breaking it can affect:

- hero rendering
- fallbacks
- local optimized preload assets
- static/mobile hero behavior

#### `src/utils/staticHeroScrollGate.js`

Purpose:

- preserves static hero as LCP by delaying chunk loads, font loads, and below-fold reveal

Breaking it can affect:

- performance timing
- LCP attribution
- early hydration behavior
- mobile route stability

#### `src/index.js`

Purpose:

- top-level bootstrap switchboard for App vs route-specific mobile shells

Breaking it can affect:

- which app path a route boots into
- whether a mobile shell is used at all
- route-specific performance behavior

### ★★★★ High Risk

#### `src/config/routes.js`

Purpose:

- canonical route table

#### `src/config/pageChunks.js`

Purpose:

- dynamic import and prefetch map

#### `src/utils/cloudinary.js`

Purpose:

- Cloudinary URL generation plus Brazil legacy-path compatibility

#### `src/assets/artImages.json`

Purpose:

- source catalog for all generated slice JSON

#### `scripts/generate-art-slices.js`

Purpose:

- transforms master image catalog into route-sized JSON dependencies

## Why The Major Systems Exist

These sections focus on intent, not just implementation.

### `src/index.js`

Purpose:

- chooses the correct runtime path before the application fully boots

Responsibilities:

- create the React root
- detect mobile viewport
- choose `App.js` or a route-specific `Mobile*ShellApp.js`

Why it exists:

- the project needs different first-load behavior on selected mobile routes
- a single universal boot path would be simpler, but slower where LCP matters most

### `src/App.js`

Purpose:

- global SPA shell for standard rendering

Responsibilities:

- provide router, context, and metadata providers
- manage cookie consent and analytics loading
- render shared shell UI such as nav, visual header, footer, and route transitions

Why it exists:

- it centralizes site-wide behavior so most page files stay focused on storytelling rather than shell concerns

### `src/config/routes.js`

Purpose:

- canonical map of public URL to page component

Responsibilities:

- define routes
- define client-side redirects
- connect route paths to lazy elements

Why it exists:

- keeping route shape centralized reduces the chance that page discovery, SEO, and navigation drift apart

### `src/config/pageChunks.js`

Purpose:

- canonical map of path to dynamic import and prefetch behavior

Responsibilities:

- provide `chunkLoaders`
- support `React.lazy`
- provide `prefetchRoute()`
- define idle warmup sets

Why it exists:

- destination pages are heavy, image-rich, and narratively linked
- warming the next likely route reduces perceived delay when readers naturally continue the journey

### `src/hooks/useRoutePrefetch.js`

Purpose:

- warm likely next routes before readers click them

Responsibilities:

- prefetch on internal link hover
- prefetch selected high-traffic routes during idle time

Why it exists:

- this is not speed for its own sake
- destination pages contain large media payloads, so warming likely next routes noticeably improves perceived continuity

### `src/pages/templates/LightTemplate.js`

Purpose:

- provide a structured editorial framework for atmospheric, linear destinations

Responsibilities:

- hero
- intro or narrative lead
- narrative blocks
- rhythm inserts
- bridge quote
- context map or subsections
- gallery
- closing reflection

Key dependencies:

- `Hero`
- `LocationHero`
- `NarrativeSplit`
- `RhythmInsert`
- `BridgeQuote`
- `GalleryWall`

Why it exists:

- many destinations should feel inhabited rather than navigated
- this template protects pacing without forcing every page into the same exact composition

### `src/pages/templates/DenseTemplate.js`

Purpose:

- provide a structured editorial framework for navigable, multi-threaded cities

Responsibilities:

- hero
- intro grid
- narrative blocks
- rhythm insert
- bridge quote
- subsection navigation
- gallery
- closing

Key dependencies:

- `LocationHero`
- `IntroGrid`
- `NarrativeSplit`
- `SubsectionNavigator`
- `NextStopNav`

Why it exists:

- some cities need orientation, branching, and cross-linking
- the template exists to make exploration legible, not to homogenize city pages

### `src/pages/templates/CountryLandingTemplate.js`

Purpose:

- orchestrate a country-level journey rather than a single destination essay

Responsibilities:

- hero
- intro bridge
- featured destination carousel
- map synchronization
- destination grid
- feature banners
- exit navigation

Key dependencies:

- `useNarrative()`
- Swiper
- `ContextMap`
- `resolveHero()`

Why it exists:

- country pages are meant to stage the journey and invite branching
- they are navigational essays, not simple landing pages

### `src/components/editorial/editorialConfig.js`

Purpose:

- separate editorial atmosphere from structural template logic

Responsibilities:

- define placement constants
- define atmosphere variants
- map template variants to surface contexts

Why it exists:

- pages need tonal flexibility without fragmenting the structural template system

### `src/utils/cloudinary.js`

Purpose:

- standardize how photography is resolved and delivered

Responsibilities:

- normalize public IDs
- build Cloudinary URLs and srcsets
- preserve Brazil legacy mapping during migration

Why it exists:

- image infrastructure changed over time
- this file lets newer semantic IDs coexist with older folder conventions without breaking pages

### `src/system/resolvers/resolveHero.js`

Purpose:

- define the hero contract

Responsibilities:

- choose hero tier
- return hero metadata for rendering
- map hero config to LCP preload URL
- expose debug information

Why it exists:

- hero availability is a content decision, not a storage lookup
- this resolver keeps that distinction explicit and prevents pages from making ad hoc assumptions

### `src/utils/staticHeroScrollGate.js`

Purpose:

- protect mobile LCP on shell routes

Responsibilities:

- delay page chunk loading
- delay below-fold reveal
- delay non-critical font loading

Why it exists:

- earlier scroll-triggered or eager-loading approaches caused the wrong elements to become LCP
- this file preserves measured performance behavior rather than theoretical cleanliness

### `src/Mobile*ShellApp.js`

Purpose:

- keep selected mobile routes on a special fast path before upgrading into the full app

Responsibilities:

- render shell-safe shared UI
- preserve static hero ownership of first paint
- load the real page chunk later
- upgrade to full `App` after navigation

Why it exists:

- some routes need a lighter first-load path than the standard SPA shell can provide

### `scripts/generate-art-slices.js`

Purpose:

- convert one large image catalog into route-sized runtime dependencies

Responsibilities:

- read `artImages.json`
- group by category and story
- generate slices and bundle JSON
- write slice manifest

Why it exists:

- page files should import only the image subsets they need
- this keeps runtime payloads simpler and lets page code stay explicit

### `scripts/inject-static-meta.js`

Purpose:

- bridge the gap between a generic CRA build and route-specific production HTML needs

Responsibilities:

- inject route-specific metadata
- add mobile shell HTML
- coordinate preload behavior

Why it exists:

- CRA alone does not express the project's route-specific SEO and mobile-shell delivery requirements

## Hidden Dependency Chains

These are the chains that most often cause accidental regressions.

### Hero Chain

```text
{route}.hero.config.js
  -> resolveHero.js
  -> template hero rendering
  -> resolveLcpHeroPreloadUrl()
  -> static shell / local optimized hero / preload
```

### Mobile Shell Chain

```text
src/index.js
  -> Mobile*ShellApp.js
  -> scripts/*StaticShell.js
  -> scripts/inject-static-meta.js
  -> src/utils/staticPageHero.js
  -> page skipHero prop
  -> resolveHero preload mapping
```

### Image Catalog Chain

```text
src/assets/artImages.json
  -> scripts/generate-art-slices.js
  -> src/assets/artImages/slices/*
  -> page imports
  -> galleries / editorial blocks / templates
```

## Running The Project

### Install

```bash
npm install
```

### Recommended Local Development

Run the site and API together:

```bash
npx vercel dev
```

Use this when the contact form or API behavior matters.

### CRA-Only Development

```bash
npm start
```

Important behavior:

- `npm start` runs `prestart`
- `prestart` executes `node scripts/generate-art-slices.js`

If you need the contact form locally in CRA mode, use `.env.example` and `src/setupProxy.js`.

### Production Build

```bash
npm run build
```

Build chain:

```text
prebuild
  -> generate-sitemap.js
  -> generate-art-slices.js
  -> optimize-logo.js
build
  -> react-scripts build
post-build
  -> inject-static-meta.js
```

### Tests

```bash
npm test
```

Testing exists, but visual verification and build verification are still important because many risks are architectural or performance-related.

## Environment Variables

From `.env.example`:

```env
GMAIL_APP_PASSWORD=
SMTP_USER=
CONTACT_TO=
CONTACT_FROM=
CONTACT_API_PROXY=http://localhost:3000
```

Cloudinary upload scripts also expect:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Quick Reading Order

If you need to understand how the repository fits together quickly, read in this order:

1. `PROJECT_CONTEXT.md`
2. `AI_HANDOVER.md`
3. `REPOSITORY_INDEX.md`
4. `src/index.js`
5. `src/App.js`
6. `src/config/routes.js`
7. `src/config/pageChunks.js`
8. one template: `LightTemplate.js`, `DenseTemplate.js`, or `CountryLandingTemplate.js`
9. `src/system/resolvers/resolveHero.js`
10. `src/utils/cloudinary.js`
11. `src/utils/staticHeroScrollGate.js`
12. `scripts/generate-art-slices.js`
13. `scripts/inject-static-meta.js`

## Summary

The key idea of this repository is simple even though the implementation is not:

- editorial quality comes first
- performance constraints shape architecture
- duplication is sometimes intentional
- mobile and desktop do not have to behave identically
- templates enforce rhythm, not sameness
- the dangerous parts are dangerous because they sit on chains of hidden dependencies
