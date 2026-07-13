# AI_RULES.md

Hard rules for AI coding assistants on **Nomad Scribbles**.  
For architecture → `PROJECT_CONTEXT.md` · pitfalls → `AI_HANDOVER.md` · file index → `REPOSITORY_INDEX.md`

---

## Before you edit

1. Read the page you're touching and one similar known-good page (`AthensNew.js`, `Rio.js`, or `SaoPaulo.js`).
2. Check `REPOSITORY_INDEX.md` for risk level of files you'll modify.
3. If editing copy, read `nomad-editorial-system.md` first.
4. Grep for mobile shell wiring if adding or changing a route.

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

- Use `tw.*` / `tokens.*` in new page code (no `text-[#hex]`)
- Set hero `status: 'active'` in `*.hero.config.js` only after the asset exists on Cloudinary
- Run `node scripts/audit-page.js src/pages/YourPage.js` before committing page changes
- Run `npm run build` after touching `inject-static-meta.js`, static shells, or `resolveHero.js`
- Regenerate art slices after editing `artImages.json` (`npm run generate:art-slices`)
- Wrap mobile shell content in `NarrativeProvider`
- Pass `skipHero={has*StaticHero() && isMobileViewport()}` on pages with mobile static shells
- Use `CloudinaryImage` / `cloudinaryImageUrl()` for photography — not raw `<img>` with Cloudinary URLs
- Match `legacyPath` vs `publicId` pattern of sibling pages in the same region

---

## Route changes checklist

When adding or renaming a route, update all that apply:

- [ ] `src/config/routes.js`
- [ ] `src/config/pageChunks.js`
- [ ] `src/config/seoTitles.js`
- [ ] `src/config/staticRouteMeta.js` (if build-time SEO needed)
- [ ] `scripts/generate-sitemap.js` output (via prebuild)
- [ ] `src/index.js` mobile bootstrap (if LCP shell required)
- [ ] Navigation / breadcrumbs if user-facing

---

## Template rules

| Page type | Template | Forbidden |
|-----------|----------|-----------|
| Navigate a city (subsections, map) | `DenseTemplate` | Removing `SubsectionNavigator` |
| Inhabit a place (linear, atmospheric) | `LightTemplate` | `IntroGrid`, `SubsectionNavigator` |
| Country hub | `CountryLandingTemplate` | Mixing Dense/Light structure |

One handwriting font moment per page maximum.

---

## Editorial rules (body copy)

1. Observation before interpretation.
2. If a sentence works for Athens and Prague unchanged → rewrite it.
3. Avoid: *reveals itself*, *hidden gem*, *without warning*, *the city feels like*, personification of cities.
4. `doThisAgainBlock`: 28–80 words, experience not advice, no "you should" / "must visit".
5. Protect the strongest existing passages — don't rewrite good copy.

---

## Performance rules (mobile ≤767px)

- Static HTML hero outside `#root` is LCP — do not duplicate with React hero (`skipHero`).
- Page chunk load is **timer-based (6s)**, not scroll-triggered.
- Do not set `fetchpriority="high"` on below-fold images.
- Defer Dancing Script — do not import synchronously in new entry points.
- New static-hero route = 5 wiring points (see `REPOSITORY_INDEX.md` §7).

---

## CSS rules

- `text-darkText` on dark/olive backgrounds; `text-text-primary` on paper.
- Shop pages: `tw.surface.shop.*` — not generic `text-black`.
- Rio pages: `tokens.colors.rio.gold` — not site gold `#B8860B`.
- Paper texture comes from `App.js` — don't add competing page backgrounds.

---

## Git & deploy

- Production: `main` · Active dev often on `editorial-review`
- Commit messages: short, sentence-case, focus on why
- Contact form needs `vercel dev` or `CONTACT_API_PROXY` locally
- Vercel env: `GMAIL_APP_PASSWORD` required for contact API

---

## When stuck

1. `git log --oneline -- path/to/file` — why does this look weird?
2. `AI_HANDOVER.md` — common mistakes
3. Ask the user before structural changes (templates, shells, Cloudinary folders)
