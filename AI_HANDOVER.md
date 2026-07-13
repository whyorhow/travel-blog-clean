# AI_HANDOVER.md

**What previous work has taught us** — historical decisions, failed approaches, and traps that code alone won't explain.

Read `PROJECT_CONTEXT.md` first for architecture. Use this document for **why** things exist and **what breaks** when you change them.

**Core question this document answers:** *What mistakes would a new AI assistant make if it only read the code?*

| Document | Consult for |
|----------|-------------|
| `PROJECT_CONTEXT.md` | How the project is built |
| `AI_HANDOVER.md` | **This file** — lessons, history, traps |
| `REPOSITORY_INDEX.md` | Where files live |
| `AI_RULES.md` | How assistants should behave |

Be blunt with yourself. This project punishes confident shortcuts.

---

## When to read this

Read this after `PROJECT_CONTEXT.md`.

`PROJECT_CONTEXT.md` explains how the repository is organised.

This document explains the practical lessons, recurring failures, hidden dependencies and engineering decisions that only become obvious after working in the codebase.

Think of this as operational knowledge rather than architectural documentation.

---

## Quick Reality Check

Before making assumptions, remember:

• This project optimises for mobile Lighthouse performance as aggressively as editorial quality.  
• Many strange-looking implementation details exist because simpler versions already failed in production.  
• The shortest-looking change is often the one with the most hidden dependencies.  
• If something feels unnecessarily complicated, check the git history before simplifying it.

---

## What I've learned

### 1. Performance is not a nice-to-have — it's the hardest constraint

Roughly half the recent commit history is LCP fixes. Not refactors. Not features. **Fixing Lighthouse scores on mobile.**

The site has a split personality:
- **Desktop:** normal React app
- **Mobile (≤767px):** a parallel universe of static HTML heroes, scroll gates, delayed font loads, and timer-based chunk loading

If you change a hero image, add content above the fold, or mount a big image early on a page that has a mobile shell, you will probably steal LCP from the static hero and get a 10–30 second Lighthouse score. I've seen this happen repeatedly — Rio, Santos, São Paulo, USA hub, Tennessee hub, Memphis.

The comments in `src/utils/staticHeroScrollGate.js` are not theoretical. They document real failures:

- Scroll-triggered page loading caused PSI to mount React while already scrolled → journal map became LCP at ~24s
- Web fonts loading at ~7s stole LCP from static heroes
- Feature cards on hub pages stole LCP from the hero

**Lesson:** Mobile LCP regressions are easy to introduce and hard to spot without testing. Verification steps: `AI_RULES.md` § Completion checklist.

**Rule of thumb:** Never assume a visual change only affects the page you're editing — check mobile LCP before calling anything done.

### 2. The mobile shell system is powerful but exhausting

There are 33 `Mobile*ShellApp.js` files. Each new shell route requires **five wiring touchpoints** (see § Hidden dependency chains → Mobile shell wiring). Missing any one breaks mobile LCP or causes runtime crashes — e.g. omitting `NarrativeProvider` in a shell caused a real production crash (`Fix mobile Adventures crash by adding NarrativeProvider to shell`).

**Do not add a mobile shell casually.** Copy an existing one (Rio or Memphis are good references).

**Rule of thumb:** A new mobile shell route means five required wiring points minimum — not one file.

### 3. Hero config is law, Cloudinary is just storage

This took me a while to internalise. Uploading an image to Cloudinary does **nothing** until the matching `*.hero.config.js` has `status: 'active'`.

The resolver (`src/system/resolvers/resolveHero.js`) never checks whether the asset exists. It only reads config. If you set `status: 'active'` on a missing asset, you get a broken image — not a fallback.

The hierarchy is fixed: diary → location → fallback → placeholder. Don't reorder it.

**Rule of thumb:** Cloudinary upload is storage; `*.hero.config.js` with `status: 'active'` is what makes a hero live.

### 4. Brazil images live in two namespaces at once

`src/utils/cloudinary.js` has `BRAZIL_LEGACY_PREFIXES` because images were re-organised from `Rio/`, `SaoPauloLanding/`, etc. to `Brazil/Rio/`, `Brazil/Sao Paulo/...`. The code maps between them.

**If a Brazil image 404s:** check both the new path and the legacy prefix before assuming it's missing from Cloudinary. Don't remove the legacy mapping until someone confirms the migration is complete.

**Rule of thumb:** When a Brazil image 404s, check both the new `Brazil/*` path and the legacy prefix before re-uploading.

### 5. Templates are structural commitments, not styling choices

`DenseTemplate` = navigate a city (subsections, maps, branching).  
`LightTemplate` = inhabit a place (linear, atmospheric).

This is enforced in `TEMPLATE_CAPABILITY_MATRIX.md` and the code will let you violate it — with ugly results. I've seen assistants add `SubsectionNavigator` to Light pages or strip it from Dense pages. Don't.

The `*New.js` suffix (e.g. `AthensNew.js`, `ViennaNew.js`) means "this page went through the editorial system refactor." The unsuffixed file may still exist as legacy. Route to the `*New` version.

**Rule of thumb:** Dense navigates; Light inhabits — pick one template philosophy and commit; see `TEMPLATE_CAPABILITY_MATRIX.md`.

### 6. Editorial voice is a system, not a vibe

Copy edits are not freeform. The project has:
- `nomad-editorial-system.md` — hard rules
- `nomad-editorial-linter.md` — how to review without destroying good passages
- `doThisAgainBlock()` — a specific block type with word count limits and dev warnings

The `editorial-review` branch spent significant effort rewriting USA, Greece, Czech, and Austria copy to be more observational. Generic travel writing gets rejected.

**Note:** Some existing pages still contain phrases the editorial system forbids (`reveals itself`, `without warning` in Salvador, Rio data file). Don't copy those as models. Copy AthensNew, AntwerpNew, ViennaNew instead.

**Rule of thumb:** Read `nomad-editorial-system.md` before editing copy; copy from `AthensNew.js` or `AntwerpNew.js`, not from legacy pages.

### 7. The design token migration is half-done and that's intentional

Layout components use tokens. Most pages don't. Pre-commit runs `audit-page.js` only on `src/pages/**/*.js` — not components, not `.jsx`.

Don't batch-migrate 40 pages. Migrate the page you're touching. `SaoPauloRefactored.js` is the reference implementation; `SaoPaulo.js` is what's in production. Yes, that's confusing. No, don't delete either without asking.

**Rule of thumb:** Token-migrate only the page you're already editing — never batch-migrate untouched pages.

### 8. `artImages.json` is a build dependency

Edit it → run `npm run generate:art-slices` (or just `npm start`/`npm run build` which run it automatically). The slices in `src/assets/artImages/slices/` are generated. Don't hand-edit slices unless you know exactly why.

**Rule of thumb:** Edit `artImages.json` → regenerate slices — never hand-edit files in `artImages/slices/`.

---

## Recurring mistakes future assistants make

| Mistake | What happens |
|---------|--------------|
| Adding a route without updating `index.js` mobile bootstrap | Mobile users get slow full App bundle; LCP regresses |
| Setting hero `status: 'active'` before asset is uploaded | Broken hero, no automatic fallback to next tier |
| Using `publicId` with spaces or special chars for Cloudinary | Upload fails — see `cloudinary-upload-failures.json` (hundreds of Food&Drink failures) |
| Putting `fetchpriority="high"` on below-fold images | Steals LCP — hub feature cards use `fetchpriority="low"` for a reason |
| Loading page chunk on scroll for static-hero pages | Was tried, reverted — caused 24s LCP |
| Forgetting `NarrativeProvider` in mobile shells | Runtime crash on pages using narrative context |
| Using `legacyPath` and `publicId` inconsistently | Image works in dev, breaks in prod or vice versa — pick one pattern from a sibling page |
| Mixing Dense and Light template props | Page renders but pacing feels wrong; subsections on a Light page break the flow |
| Rewriting entire pages of copy with AI travel prose | Editorial linter flags fire; user rejects the tone |
| Trusting `SYSTEM_MATURITY_REPORT.md` | References deleted routes (`/brazil/rio-new`) and files (`RioTokenized.js`) — stale |
| Editing `inject-static-meta.js` without testing build | Easy to break SEO injection or static shells for all routes |
| Using `text-[#B8860B]` in new page code | Pre-commit audit fails |
| Adding a second handwriting moment per page | Violates design system; looks chaotic |
| Assuming `README.md` has setup instructions | It's default CRA boilerplate |

---

## Patterns that aren't obvious from reading the code

*Factual architecture for these systems: `PROJECT_CONTEXT.md` §1 Mobile LCP delivery layer.*

### The `skipHero` dance

Pages with mobile static shells pass `skipHero={hasXStaticHero() && isMobileViewport()}` so React does not compete with the build-injected static HTML hero for LCP. Forgetting it produces duplicate heroes — the wrong one may win LCP.

### Timer-based chunk loading, not scroll-based

`useStaticHeroPageChunkLoader` uses a **timer**, not scroll. Scroll-triggered loading was tried and reverted after ~24s LCP failures (journal map became LCP element). Do not "optimise" it back to scroll without measuring.

### Fonts and LCP

Dancing Script deferred on static-hero routes; synchronous import in a new entry point can steal LCP. Assistant constraints: `AI_RULES.md` § Performance rules.

### `legacyPath` vs `publicId`

`CloudinaryImage` accepts both. Legacy paths look like `/images/Brazil/Rio/foo.webp`. They get normalised through `getPublicIdFromLegacyPath()`. New code should prefer `publicId` with semantic IDs, but half the codebase still uses `legacyPath` because the art catalog stores paths. **Match the pattern of the page you're editing.**

### Editorial blocks are placement-driven, not inline JSX

Personal content layers (`doThisAgainBlock`, favourite places, looking back) go through `editorialBlocks` with `EDITORIAL_PLACEMENTS`. Don't bolt a new section into `LightTemplate` JSX — add a block type or placement.

Content hierarchy on destination pages:
```
Narrative → We'd Do This Again → Favourite Places → Bridge → Looking Back → Gallery
```

### `CountryFeatureCard` is crawlable but LCP-poison on hub pages

It exists for SEO/crawlability on country landing pages. Images use `fetchpriority="low"`. Putting a large feature card above the hero on a hub page stole USA LCP — this was fixed in a dedicated commit.

### Hero configs and `resolveLcpHeroPreloadUrl` are coupled

The preload URL resolver has a long chain of `if (hero.publicId === '...')` mappings to local `/assets/*-hero-400.webp` files. Adding a new static hero means updating **both** the optimise script, the static shell, **and** this resolver function. Easy to miss.

### `editorial-review` is not production

Active development happens on `editorial-review`. `main` is production. Don't assume what's on the branch is deployed.

### Factory builders for regions

Austria and Czech story pages use `buildAustriaStoryPage.js` and `buildCzechStoryPage.js`. If you're adding Salzburg-style pages, extend the factory — don't clone 400 lines.

---

## Things that look wrong but are intentional

- **33 near-identical `Mobile*ShellApp.js` files** — per-route LCP tuning; abstraction was considered and rejected as too risky
- **`SaoPauloRefactored.js` alongside `SaoPaulo.js`** — tokenized reference vs production page; do not delete either without asking
- **`*New.js` suffix pages** alongside legacy unsuffixed files — `AthensNew.js` etc. are production; originals may remain as dead code
- **`BRAZIL_LEGACY_PREFIXES` in `cloudinary.js`** — dual namespace during folder migration; looks like tech debt, still required
- **Hardcoded accent colours in `editorialConfig.js`** — intentional regional atmosphere; not token migration oversights
- **Timer-based (6s) page chunk loading** — scroll-triggered loading was tried and reverted after 24s LCP failures
- **Paper texture via inline styles in `App.js`** — global shell pattern; not a token migration gap
- **Legacy templates still exported** — kept during migration; do not use for new pages
- **`editorial-review` branch ahead of `main`** — active dev branch; not necessarily deployed

---

## Migration history

### Design token migration (ongoing)

- **Phase 1 complete:** `tokens.js`, layout components, `audit-page.js`
- **Phase 2 in progress:** ~40 pages still have hardcoded Tailwind values; migrate only when touching a page
- **Reference:** `SaoPauloRefactored.js` (tokenized) vs `SaoPaulo.js` (production)
- **Tracker:** `MIGRATION_AUDIT.md`, `INFRASTRUCTURE_STATUS.md`

### Brazil Cloudinary folder migration (ongoing)

Images re-organised from `Rio/`, `SaoPauloLanding/`, etc. to `Brazil/Rio/`, `Brazil/Sao Paulo/...`. Code maps via `BRAZIL_LEGACY_PREFIXES`. Hundreds of `Food&Drink/*` uploads failed due to invalid public IDs (`cloudinary-upload-failures.json`).

### Rio structural grammar (2024)

`SYSTEM_MATURITY_REPORT.md` references obsolete `/brazil/rio-new`, `RioTokenized.js` — **stale**. Production is `Rio.js` + `LightTemplate`. Report is historical context only.

### Editorial voice rewrite (`editorial-review` branch)

Significant effort rewriting USA, Greece, Czech, and Austria copy to observation-first voice. Some older pages still contain pre-linter phrases — do not copy as models.

### Mobile LCP campaign (commit history)

Roughly half of recent commits are LCP fixes: static shells added for Rio, Santos, São Paulo, USA hub, Tennessee, Memphis, and others after 10–30s Lighthouse scores. Feature cards and web fonts stealing LCP were fixed in dedicated commits.

### Failed or reverted approaches

| Approach | Outcome |
|----------|---------|
| Scroll-triggered page chunk load on static-hero routes | Reverted — journal map became LCP at ~24s |
| Refactoring all mobile shells into one abstraction | Not attempted in production — deemed high regression risk |
| Batch token migration of all pages | Rejected — incremental migration only |
| Trusting Cloudinary upload alone for hero availability | Broken heroes — config `status: 'active'` is required |

---

## Hidden dependency chains

Many repository tasks look isolated but cascade across multiple files. Plan for the full chain before starting.

### Mobile shell wiring (canonical)

**Five required touchpoints** for a new mobile static-hero route:

1. `src/index.js` — mobile bootstrap branch (viewport ≤767px)
2. `src/Mobile{Route}ShellApp.js` — shell entry (**must** wrap `NarrativeProvider`)
3. `scripts/{route}StaticShell.js` — build-time HTML hero
4. `scripts/inject-static-meta.js` — imports and injects shell at build
5. `src/utils/staticPageHero.js` — `has{Route}StaticHero()` detector

**Often also required** (easy to miss):

- Page template: `skipHero={has*StaticHero() && isMobileViewport()}`
- `src/system/resolvers/resolveHero.js` — `resolveLcpHeroPreloadUrl` mapping
- `npm run optimize:{route}-hero` → `public/assets/{route}-hero-400.webp`

Architecture reference: `PROJECT_CONTEXT.md` §1 Mobile LCP delivery layer. Route checklist: `AI_RULES.md` § Route changes checklist.

### Hero image change

```
Cloudinary asset
  → *.hero.config.js (status: 'active', publicId)
  → npm run optimize:{route}-hero
  → public/assets/{route}-hero-400.webp
  → scripts/{route}StaticShell.js (build-time HTML)
  → resolveHero.js / resolveLcpHeroPreloadUrl (preload mapping)
  → page skipHero logic (has*StaticHero && isMobileViewport)
```

Skip any step and you get a broken hero, wrong LCP element, or duplicate heroes on mobile.

### New route

```
src/config/routes.js
  → src/config/pageChunks.js
  → src/config/seoTitles.js
  → src/config/staticRouteMeta.js (build-time SEO)
  → src/assets/destinations.json (if destination page)
  → navigation / breadcrumbLabels.js
  → src/index.js + Mobile*ShellApp.js (if mobile LCP shell required)
  → scripts/generate-sitemap.js output (via prebuild)
```

A route that works in React Router but is missing from `pageChunks.js` or the mobile bootstrap will fail silently or load slowly.

### New gallery images

```
src/assets/artImages.json
  → npm run generate:art-slices
  → src/assets/artImages/slices/{story,category,bundles}/*.json
  → page import of the relevant slice
```

Editing the catalog without regenerating slices leaves pages pointing at stale or empty image sets.

**The pattern:** if a task touches content, performance, or routing, assume at least three files — grep for a sibling route that already does what you need and trace its imports. Full route checklist: `AI_RULES.md`. File risk levels: `REPOSITORY_INDEX.md` (File index · Critical files).

---

## Common pitfalls

### Pitfall: "I'll just quickly improve the hero"

Changing a hero image touches: Cloudinary asset, hero config status, optimise script output, static shell HTML, `resolveLcpHeroPreloadUrl` mapping, possibly `routeLcpPreload.cjs`, and the page's `skipHero` logic. "Quick" is a lie.

### Pitfall: "The image uploaded so it should work"

Cloudinary upload ≠ `status: 'active'` in hero config. Also check `BRAZIL_LEGACY_PREFIXES` if the public ID changed folders.

### Pitfall: "I'll refactor the mobile shells to reduce duplication"

The duplication is intentional. Each shell has subtly different timing, body classes, and skipLcpPreload flags. Abstracting them has been tempting and would be a multi-day project with high regression risk. Don't start this unless the user explicitly asks.

### Pitfall: "I'll modernise the CSS with arbitrary Tailwind values"

The pre-commit hook will reject hardcoded hex colors in page files. More importantly, the design system exists because 40+ pages need to feel cohesive. Use `tw.*` or token classes.

### Pitfall: "I'll rewrite the copy to sound more professional"

Professional travel writing is exactly what this site rejects. Observation-first, specific, physical. Read three paragraphs of `AthensNew.js` before writing anything.

### Pitfall: "Tests pass so we're good"

There are no CI tests. `npm test` is CRA default and not run in deployment. Visual check + Lighthouse is the actual QA.

### Pitfall: Local dev without `vercel dev`

Contact form won't work on plain `npm start` unless you set up `CONTACT_API_PROXY`. Not a bug.

### Pitfall: Windows paths in package.json scripts

`upload:cloudinary:food-drink` references `C:\\Users\\benji\\cloudinary-staging\\images`. Won't work on your machine if paths differ. Adjust locally, don't commit your paths.

---

## CSS traps (not obvious from `PROJECT_CONTEXT.md`)

- `text-darkText` on dark/olive backgrounds; `text-text-primary` on paper — swapping them causes invisible copy
- Rio gold (`tokens.colors.rio.gold`) ≠ site gold (`#B8860B`)
- `editorialConfig.js` hardcoded accent colours are intentional — don't "fix" to `text-gold` without visual check
- `background-attachment: fixed` on paper texture is janky on some mobile browsers but deliberate

Full CSS rules for assistants: `AI_RULES.md` § CSS rules. Token reference: `PROJECT_CONTEXT.md` §6.

---

## Fixes from real sessions (not obvious from the mistake table)

Historical fixes worth knowing — most recurring patterns are in the table above.

1. **Soft 404 on `/home`** — required redirect in `vercel.json` (both `/home` and `/home/`)
2. **Adventures map path misalignment** — SVG path data didn't match route structure
3. **Polaroid gallery clipping into copy above** — tilt angles capped for a reason (see `PolaroidGallery.jsx` comments)
4. **Stale docs sending assistants to wrong Rio files** — production is `Rio.js` + `LightTemplate`, not `RioTokenized.js` / `RioSystem`

---

## Where to go next

| Need | Document |
|------|----------|
| How to behave, checklists, completion criteria | `AI_RULES.md` |
| File locations and risk levels | `REPOSITORY_INDEX.md` |
| Current TODOs and known architectural issues | `PROJECT_CONTEXT.md` §12–13 |
| Success criteria for finished work | `PROJECT_CONTEXT.md` §16 |

### The one sentence summary

**This is a hand-crafted editorial site with a performance-obsessed mobile delivery layer glued on top — treat content and LCP as equally fragile.**

### Recommended next work (if continuing)

Tracked in `PROJECT_CONTEXT.md` §12. Historical context: editorial linter pass, Czech Bohemian Wilderness catalog, mobile shell wiring audit, Lighthouse on top routes, incremental token migration when pages are touched.

---

## What I don't know (be honest about gaps)

- Whether Brazil Cloudinary folder migration is complete or still in progress
- Which remote feature branches are still active vs abandoned
- Whether `SaoPauloRefactored.js` will ever replace `SaoPaulo.js` in production
- Full inventory of pages that still violate editorial rules from before the linter pass
- Whether the user wants more mobile shells or is trying to reduce them

When uncertain, check git history for that file (`git log --oneline -- path/to/file`) — it often explains *why* something looks weird.

---

## If you're completely lost

1. Read `PROJECT_CONTEXT.md` (architecture).
2. Open `REPOSITORY_INDEX.md` (locate files).
3. Read `AI_RULES.md` (behaviour and checklists).
4. Return here for why something looks unusual.
5. Find a sibling page that already works — then follow `AI_RULES.md` § Before you edit.
