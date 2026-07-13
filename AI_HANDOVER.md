# AI_HANDOVER.md

**For the next AI assistant.** This is not architecture — read `PROJECT_CONTEXT.md` for that. This is what you actually need to know after working in this repo and watching things break.

Be blunt with yourself. This project punishes confident shortcuts.

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

**Lesson:** Before you call a mobile page "done", run Lighthouse mobile. If you don't have that, at least check that nothing large renders above the static hero on mobile shell pages.

### 2. The mobile shell system is powerful but exhausting

There are 33 `Mobile*ShellApp.js` files. Each one needs:
- A matching entry in `src/index.js` bootstrap
- A `scripts/*StaticShell.js` for build-time HTML injection
- Wiring in `scripts/inject-static-meta.js` (this file is enormous — it imports every shell)
- A `has*StaticHero()` check in `src/utils/staticPageHero.js`
- Often a `skipHero={has*StaticHero() && isMobileViewport()}` prop on the page template
- Sometimes entries in `resolveHero.js` for local preload URL mapping

**Do not add a mobile shell casually.** Copy an existing one (Rio or Memphis are good references) and touch all five places. Missing `NarrativeProvider` in a shell caused a real production crash (`Fix mobile Adventures crash by adding NarrativeProvider to shell`).

### 3. Hero config is law, Cloudinary is just storage

This took me a while to internalise. Uploading an image to Cloudinary does **nothing** until the matching `*.hero.config.js` has `status: 'active'`.

The resolver (`src/system/resolvers/resolveHero.js`) never checks whether the asset exists. It only reads config. If you set `status: 'active'` on a missing asset, you get a broken image — not a fallback.

The hierarchy is fixed: diary → location → fallback → placeholder. Don't reorder it.

### 4. Brazil images live in two namespaces at once

`src/utils/cloudinary.js` has `BRAZIL_LEGACY_PREFIXES` because images were re-organised from `Rio/`, `SaoPauloLanding/`, etc. to `Brazil/Rio/`, `Brazil/Sao Paulo/...`. The code maps between them.

**If a Brazil image 404s:** check both the new path and the legacy prefix before assuming it's missing from Cloudinary. Don't remove the legacy mapping until someone confirms the migration is complete.

### 5. Templates are structural commitments, not styling choices

`DenseTemplate` = navigate a city (subsections, maps, branching).  
`LightTemplate` = inhabit a place (linear, atmospheric).

This is enforced in `TEMPLATE_CAPABILITY_MATRIX.md` and the code will let you violate it — with ugly results. I've seen assistants add `SubsectionNavigator` to Light pages or strip it from Dense pages. Don't.

The `*New.js` suffix (e.g. `AthensNew.js`, `ViennaNew.js`) means "this page went through the editorial system refactor." The unsuffixed file may still exist as legacy. Route to the `*New` version.

### 6. Editorial voice is a system, not a vibe

Copy edits are not freeform. The project has:
- `nomad-editorial-system.md` — hard rules
- `nomad-editorial-linter.md` — how to review without destroying good passages
- `doThisAgainBlock()` — a specific block type with word count limits and dev warnings

The `editorial-review` branch spent significant effort rewriting USA, Greece, Czech, and Austria copy to be more observational. Generic travel writing gets rejected.

**Note:** Some existing pages still contain phrases the editorial system forbids (`reveals itself`, `without warning` in Salvador, Rio data file). Don't copy those as models. Copy AthensNew, AntwerpNew, ViennaNew instead.

### 7. The design token migration is half-done and that's intentional

Layout components use tokens. Most pages don't. Pre-commit runs `audit-page.js` only on `src/pages/**/*.js` — not components, not `.jsx`.

Don't batch-migrate 40 pages. Migrate the page you're touching. `SaoPauloRefactored.js` is the reference implementation; `SaoPaulo.js` is what's in production. Yes, that's confusing. No, don't delete either without asking.

### 8. `artImages.json` is a build dependency

Edit it → run `npm run generate:art-slices` (or just `npm start`/`npm run build` which run it automatically). The slices in `src/assets/artImages/slices/` are generated. Don't hand-edit slices unless you know exactly why.

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

### The `skipHero` dance

Pages with mobile static shells pass `skipHero={hasXStaticHero() && isMobileViewport()}` to their template. The static HTML hero (injected at build time, outside `#root`) is the LCP element. React must not render a competing hero.

If you add a hero to a page that already has a static shell but forget `skipHero`, you get **two heroes** on mobile — and the wrong one may win LCP.

### Timer-based chunk loading, not scroll-based

`useStaticHeroPageChunkLoader` loads the React page chunk after **6 seconds**, not on scroll. This was an explicit fix. Don't "optimise" it back to scroll.

Below-fold content uses `useStaticHeroBelowFoldGate` — requires 8 seconds dwell + 160px scroll delta before revealing. Heavy.

### Fonts are weapons

Dancing Script (handwriting) is deferred 12 seconds on static-hero pages. Cormorant loads synchronously. If you import Dancing Script synchronously in a new entry point, you can steal LCP.

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

## Files that should rarely be edited

Touch these only when you know exactly why, and test the build afterwards.

| File | Why it's dangerous |
|------|-------------------|
| `src/index.js` | 330 lines of mobile bootstrap conditionals; one wrong branch breaks a route |
| `scripts/inject-static-meta.js` | Imports every static shell; build-time SEO + LCP for all routes |
| `scripts/staticHeroGenerator.cjs` | Template for generating shell boilerplate — understand before modifying |
| `src/system/resolvers/resolveHero.js` | LCP preload mappings; hero resolution contract |
| `src/utils/staticHeroScrollGate.js` | Timing constants tuned against real Lighthouse failures |
| `src/utils/cloudinary.js` | Legacy prefix mapping; breaking this 404s Brazil images |
| `src/assets/artImages.json` | Master catalog — edit with care, always regenerate slices |
| `src/assets/artImages/slices/**` | Generated — don't hand-edit |
| `public/assets/*-hero-400.webp` | Generated by optimise scripts — regenerate, don't Photoshop |
| `build/` | Output directory — never edit |
| `package-lock.json` | Only when deliberately changing dependencies |
| `tailwind.config.js` | Token mirror — change `tokens.js` first, then mirror here |
| `vercel.json` | Redirects are load-bearing for SEO (soft 404 fixes landed here) |
| `src/pages/templates/DenseEditorialTemplate.js` etc. | Legacy — don't extend, don't copy |
| `SYSTEM_MATURITY_REPORT.md` | Stale — don't use as source of truth |

**The 33 `Mobile*ShellApp.js` files:** edit when working on that specific route's mobile performance. Don't refactor them collectively. They're repetitive by design.

---

## Files that are safe to edit

| File | Typical task |
|------|-------------|
| `src/pages/{Destination}.js` or `*New.js` | Copy, images, template props, editorial blocks |
| `src/pages/{region}/*.hero.config.js` | Hero availability (status, publicId) |
| `src/pages/{region}/*.data.js` | Page content data |
| `src/config/seoTitles.js` | SEO titles/descriptions |
| `src/assets/destinations.json` | Map coordinates |
| `src/components/editorial/editorialConfig.js` | Atmosphere variants for editorial blocks |
| `src/components/editorial/editorialUtils.js` | Block helpers (careful — dev warnings are intentional) |
| `src/styles/tokens.js` | Design tokens (mirror to tailwind.config.js) |
| `src/components/layout/*.js` | Layout vocabulary (already tokenized) |
| `api/contact.js` | Contact form (test with `vercel dev`) |
| `.env.development.local` | Local env (never commit) |
| Region-specific maps (`*Map.js`, `*JournalMap.jsx`) | Map interactions, path data |
| `MIGRATION_AUDIT.md` | Mark pages done after token migration |

**Generally safe:** individual page files, hero configs, SEO config, editorial content, new components that don't touch the shell/bootstrap layer.

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

## Editorial style rules (the short version)

Full rules: `nomad-editorial-system.md`. Linter process: `nomad-editorial-linter.md`.

**Write like a notebook, not a guidebook.**

1. **Observation before interpretation.** What did you see, touch, walk past?
2. **Specificity test.** If the sentence works for Athens AND Prague, rewrite it.
3. **Photograph test.** Could you take a photo of what this sentence describes?
4. **No personification.** Cities don't "reveal themselves" or "feel like" things.
5. **Banned phrases** (soft block): reveals itself, hidden gem, without warning, life continues, layers, heartbeat of the city, the city feels like...
6. **Handwriting font:** max once per page (BridgeQuote, section nav, or ReflectiveClose — pick one).
7. **"We'd Do This Again" blocks:** 28–80 words, experience not advice, no "you should" / "must visit".
8. **Protect strong passages.** The editorial linter says: find the three best paragraphs first, don't rewrite them.
9. **SEO snippets are LOW severity** for editorial flags — but body copy is not.

When doing an editorial pass, recent commits suggest this order works: hub pages first, then story pages, then image captions last.

---

## CSS conventions not documented elsewhere

### `text-darkText` vs `text-lightText` vs `text-text-primary`

- `text-darkText` (#E5CF6B) — text **on dark/olive backgrounds** (home, shop panels)
- `text-lightText` (#101E0E) — text **on light backgrounds** (rare)
- `text-text-primary` (#222) — body text **on paper** (#f5f0e8)

Getting this wrong means gold text on gold background or invisible copy. Check what surface the component sits on.

### Paper texture is applied in App.js, not per-page

Non-home, non-gallery, non-search pages get `#f5f0e8` + `paperTextureTiledStyle` with `background-attachment: fixed`. Don't add competing `bg-white` or `bg-stone-50` to page wrappers unless you mean to opt out.

### Shop pages have their own surface tokens

Use `tw.surface.shop.*` from `shopTheme.js`. On paper, warm browns — not `text-black` or `text-text-primary`. Shop titles on olive panels use `text-darkText`.

### Rio / dark-palette pages

Layout components accept `variant="dark"` and `accentColor={tw.rio.gold}` or `tokens.colors.rio.gold`. Rio gold (#D4AF37) is different from site gold (#B8860B). Don't use site gold on Rio pages.

### `bg-black/30` triggers audit warnings

Use `tokens.colors.overlay.hero` instead. Same visual, passes audit.

### `rounded-sm` on images is wrong

Audit flags it. Images use `rounded-lg` via `tw.image`.

### Editorial atmosphere variants have hardcoded accent colors

`editorialConfig.js` has `titleAccent: 'text-[#8C6A2A]'` etc. per region. Yes, these violate the token rule. They're intentional atmosphere tuning — don't "fix" them to `text-gold` without visual checking.

### Lightbox open state hides nav

`src/index.css` has rules for when lightbox is open. If nav behaves strangely during lightbox, check there before adding z-index hacks.

### `background-attachment: fixed` on paper texture

Known to be janky on some mobile browsers. It's a deliberate aesthetic choice. Don't remove without asking.

---

## Things I repeatedly had to fix

1. **LCP stolen by React hero duplicating static hero** — add/fix `skipHero` prop
2. **LCP stolen by feature cards or fonts** — defer loading, set `fetchpriority="low"`
3. **LCP stolen by scroll-triggered chunk load** — use timer (6s), not scroll
4. **Mobile shell missing NarrativeProvider** — wrap shell content
5. **Broken hero after Cloudinary upload** — forgot to set `status: 'active'` in hero config
6. **Brazil image 404** — wrong folder prefix, needed legacy mapping
7. **Soft 404 on /home** — needed redirect in `vercel.json` (both `/home` and `/home/`)
8. **Adventures map path misalignment** — SVG path data didn't match route structure
9. **Editorial copy too generic** — rewritten to be observational (whole branch of work)
10. **Pre-commit audit failures** — hardcoded hex colors in page files
11. **Gallery empty after art catalog edit** — forgot to regenerate art slices
12. **Contact form 503 in production** — missing `GMAIL_APP_PASSWORD` on Vercel
13. **Polaroid gallery clipping into copy above** — tilt angles capped for a reason (see comments in `PolaroidGallery.jsx`)
14. **Stale docs sending assistants to wrong Rio files** — use `Rio.js` + `LightTemplate`, not RioTokenized/RioSystem

---

## Advice for tomorrow's assistant

### Start here

1. Read the specific page file you're editing and one similar page that's known-good (`AthensNew.js`, `Rio.js`, `SaoPaulo.js` depending on template type).
2. Check if the route has a mobile shell: grep for `Mobile{Route}ShellApp` and `has*StaticHero`.
3. If editing copy, read `nomad-editorial-system.md` first. Seriously.
4. If editing images, trace the full chain: catalog → cloudinary ID → hero config status → static hero asset.

### Do less than you think

- Don't refactor the shell system.
- Don't migrate tokens on pages you're not already editing.
- Don't delete legacy files without confirming they're unused.
- Don't "improve" the README unless asked.
- Don't add TypeScript.
- Don't eject CRA.

### Ask the user when

- Adding a new country/region (touches routes, nav, maps, shells, SEO, art catalog)
- Changing template structure (Dense vs Light commitment)
- Removing or renaming Cloudinary folders (legacy mapping implications)
- Anything that affects production `main` directly

### Verify before saying "done"

- [ ] `npm run build` succeeds (injects static meta for all shells)
- [ ] Page renders on desktop and mobile
- [ ] If page has static shell: mobile hero isn't duplicated
- [ ] If you edited `src/pages/*.js`: `node scripts/audit-page.js src/pages/YourPage.js` passes
- [ ] If you edited copy: read it aloud — does it sound like a guidebook or a notebook?
- [ ] If you changed images: they load (check Network tab, not just alt text)

### The one sentence summary

**This is a hand-crafted editorial site with a performance-obsessed mobile delivery layer glued on top — treat content and LCP as equally fragile.**

---

## What I don't know (be honest about gaps)

- Whether Brazil Cloudinary folder migration is complete or still in progress
- Which remote feature branches are still active vs abandoned
- Whether `SaoPauloRefactored.js` will ever replace `SaoPaulo.js` in production
- Full inventory of pages that still violate editorial rules from before the linter pass
- Whether the user wants more mobile shells or is trying to reduce them

When uncertain, check git history for that file (`git log --oneline -- path/to/file`) — it often explains *why* something looks weird.
