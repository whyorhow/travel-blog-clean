# AI_RULES.md

**How an AI assistant should behave** when editing Nomad Scribbles.

This file contains instructions and checklists only — not architecture explanations.

| Document | Consult for |
|----------|-------------|
| `PROJECT_CONTEXT.md` | How the project is built |
| `AI_HANDOVER.md` | Lessons, history, traps |
| `REPOSITORY_INDEX.md` | Where files live |
| `AI_RULES.md` | **This file** — assistant behaviour |

---

## Before you edit

1. Read the page you're touching and one similar known-good page (`AthensNew.js`, `Rio.js`, or `SaoPaulo.js`).
2. Check `REPOSITORY_INDEX.md` for risk level of files you'll modify.
3. Read `nomad-editorial-system.md` before editing copy.
4. Grep for mobile shell wiring if adding or changing a route.
5. Review the git diff before committing — especially when using Cursor or another AI editor.
6. Identify the page template being used and check the relevant template rules in `PROJECT_CONTEXT.md` before modifying structure.

---

## Never do without explicit user request

- Eject CRA or add TypeScript
- Refactor all 33 `Mobile*ShellApp.js` files into one abstraction
- Batch-migrate every page to design tokens
- Force-push `main`
- Skip git hooks (`--no-verify`)
- Commit `.env` or secrets
- Delete legacy files without confirming zero references
- Remove `BRAZIL_LEGACY_PREFIXES` from `cloudinary.js`
- Use legacy templates (`DenseEditorialTemplate`, `BreathAndSpaceTemplate`, `SlowRevealTemplate`) for new pages

---

## Always do

- Match the coding pattern already used in neighbouring files before introducing newer abstractions
- Prefer the smallest correct change over broad refactoring
- Do not improve architecture unless the current task requires it
- Avoid drive-by cleanup or unrelated formatting changes
- Use `tw.*` / `tokens.*` in new page code — never `text-[#hex]`
- Set hero `status: 'active'` in `*.hero.config.js` only after the asset exists on Cloudinary
- Run `node scripts/audit-page.js src/pages/YourPage.js` before committing page changes
- Run `npm run build` after touching `inject-static-meta.js`, static shells, or `resolveHero.js`
- Regenerate art slices after editing `artImages.json` (`npm run generate:art-slices`)
- Wrap mobile shell content in `NarrativeProvider`
- Pass `skipHero={has*StaticHero() && isMobileViewport()}` on pages with mobile static shells
- Use `CloudinaryImage` / `cloudinaryImageUrl()` for photography — never raw `<img>` with Cloudinary URLs
- Match `legacyPath` vs `publicId` pattern of sibling pages in the same region

---

## Route changes checklist

When adding or renaming a route, update all that apply:

- [ ] `src/config/routes.js`
- [ ] `src/config/pageChunks.js`
- [ ] `src/config/seoTitles.js`
- [ ] `src/config/staticRouteMeta.js` (build-time SEO)
- [ ] `src/config/breadcrumbLabels.js` (if user-facing)
- [ ] `src/config/searchIndex.js` (if page should be searchable)
- [ ] `src/assets/destinations.json` (if destination page)
- [ ] Navigation components (if user-facing)
- [ ] `src/index.js` mobile bootstrap (if LCP shell required)
- [ ] `src/Mobile{Route}ShellApp.js` with `NarrativeProvider` (if LCP shell required)
- [ ] Static shell chain per `AI_HANDOVER.md` § Mobile shell wiring: `*StaticShell.js` → `inject-static-meta.js` → `staticPageHero.js` → page `skipHero` → `resolveHero.js` preload (if applicable) → optimise script
- [ ] Sitemap output (via `prebuild` / `generate-sitemap.js`)

---

## Template rules

Structural template architecture: `PROJECT_CONTEXT.md` §4. Capability matrix: `TEMPLATE_CAPABILITY_MATRIX.md`.

| Page type | Template | Never |
|-----------|----------|-------|
| Navigate a city (subsections, map) | `DenseTemplate` | Remove `SubsectionNavigator` |
| Inhabit a place (linear, atmospheric) | `LightTemplate` | Add `IntroGrid` or `SubsectionNavigator` |
| Country hub | `CountryLandingTemplate` | Mix Dense/Light structure |

Never use more than one handwriting font moment per page.

---

## Editorial rules (body copy)

1. Lead with observation — never interpretation first.
2. Rewrite any sentence that works for Athens and Prague unchanged.
3. Never use: *reveals itself*, *hidden gem*, *without warning*, *the city feels like*, or city personification.
4. Keep `doThisAgainBlock` to 28–80 words — experience, not advice; never "you should" / "must visit".
5. Never rewrite strong existing passages unless asked.
6. During technical edits, preserve existing copy. Do not shorten, paraphrase, or rewrite editorial text unless explicitly requested.

---

## Performance rules (mobile ≤767px)

- Never duplicate the static HTML hero with a React hero — use `skipHero`.
- Do not change static-hero loading gates, chunk deferral, or font loading without measuring mobile LCP. These timings were tuned against real Lighthouse failures — preserve measured behaviour unless testing proves a safe improvement.
- Never set `fetchpriority="high"` on below-fold images.
- Never import Dancing Script synchronously in new entry points.
- Treat any above-the-fold change on a mobile shell route as a performance change — verify LCP before finishing.
- Wire all 5 static-hero touchpoints for new shell routes (see `AI_HANDOVER.md` § Hidden dependency chains → Mobile shell wiring).
- Do not rename or reorganise Cloudinary folders/public IDs without confirming migration impact and fallback behaviour.

---

## CSS rules

- Use `text-darkText` on dark/olive backgrounds; `text-text-primary` on paper.
- Use `tw.surface.shop.*` on shop pages — never generic `text-black`.
- Use `tokens.colors.rio.gold` on Rio pages — never site gold `#B8860B`.
- Never add competing page backgrounds — paper texture comes from `App.js`.

---

## Git & deploy

- Deploy production from `main`; active dev often on `editorial-review`
- Review generated diffs before committing — reject unrelated formatting churn
- Keep each commit focused on a single logical change
- Write commit messages: short, sentence-case, focus on why
- Run contact form tests with `vercel dev` or `CONTACT_API_PROXY` locally
- Set `GMAIL_APP_PASSWORD` on Vercel for the contact API

---

## When to ask before making changes

Ask the user before proceeding if the task involves:

- Creating or removing a mobile shell route
- Changing template structure (Dense ↔ Light, adding/removing structural sections)
- Renaming or reorganising Cloudinary folders or public IDs
- Removing legacy files, prefix maps (`BRAZIL_LEGACY_PREFIXES`), or exported legacy templates
- Batch-migrating design tokens across multiple pages
- Refactoring mobile shells into a shared abstraction
- Ejecting CRA, adding TypeScript, or introducing a CMS/data-driven page generator
- Rewriting editorial copy beyond the explicitly requested scope

If unsure whether a change is structural, grep a sibling route and ask.

---

## Completion checklist

Before considering work complete:

- [ ] `npm run build` succeeds (injects static meta for all shells)
- [ ] Page renders on desktop and mobile
- [ ] If page has static shell: mobile hero isn't duplicated (`skipHero` correct)
- [ ] If you edited `src/pages/*.js`: `node scripts/audit-page.js src/pages/YourPage.js` passes
- [ ] If you edited copy: read it aloud — does it sound like a guidebook or a notebook?
- [ ] If you changed images: they load (check Network tab, not just alt text)
- [ ] Check the Vercel preview if deployment behaviour changed
- [ ] Confirm redirects still work if routes or URLs changed
- [ ] Confirm hero preload still points at the expected image

Project-level success criteria: `PROJECT_CONTEXT.md` §16.

---

## When stuck

1. Run `git log --oneline -- path/to/file` — why does this look weird?
2. Read `AI_HANDOVER.md` — common mistakes
3. Ask the user before structural changes (templates, shells, Cloudinary folders)

---

## When in doubt

Project priorities and trade-off order: `PROJECT_CONTEXT.md` §2.

Default to:
- the smallest correct change
- preserving existing patterns over introducing new ones
- asking before architectural decisions

---

*Behavioural rules only — architecture: `PROJECT_CONTEXT.md` · history: `AI_HANDOVER.md` · file locations: `REPOSITORY_INDEX.md`*
