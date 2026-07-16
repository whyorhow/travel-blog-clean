# AI_DESTINATION_WORKFLOW.md

**Operational workflow for safely adding new destinations to Nomad Scribbles.**

| Document | Purpose |
|----------|---------|
| `PROJECT_CONTEXT.md` | Architecture, stack and design decisions |
| `AI_HANDOVER.md` | Historical context, hidden dependencies and migration notes |
| `AI_RULES.md` | Assistant behaviour, constraints and completion criteria |
| `REPOSITORY_INDEX.md` | File locations, directory structure and risk levels |
| `AI_DESTINATION_WORKFLOW.md` | **This file** — destination creation workflow |

Use this document when creating or integrating a destination.

For rules and restrictions:
`AI_RULES.md`

For architecture:
`PROJECT_CONTEXT.md`

For known traps:
`AI_HANDOVER.md`

For file locations:
`REPOSITORY_INDEX.md`

---

# Workflow Overview

Every destination should follow the same lifecycle.

Confirm destination scope

↓

Confirm template and reference implementation

↓

Prepare destination assets

↓

Integrate assets into repository structure

↓

Configure destination data
- hero configuration
- route requirements
- SEO metadata
- gallery references

↓

Update image catalogue

↓

Generate image slices

↓

Create destination page

↓

Register routes and build integration

↓

Verify mobile behaviour

↓

Validate implementation

↓

Commit and deploy

Do not skip stages.

A destination should not enter page construction until the asset package, metadata, hero handling, and template requirements are confirmed.

If a stage cannot be completed, stop and resolve the dependency before continuing.

---

# Before Starting

## Purpose

Confirm the destination request is understood before repository changes begin.

---

## Inputs

A clearly defined destination task.

Examples:

- New country hub
- New destination story page
- Existing destination expansion
- Hero replacement
- Image library update

---

## Outputs

A confirmed destination plan.

---

## Stop if...

- destination scope is unclear
- template choice is unknown
- required assets are unavailable
- supporting documentation has not been reviewed
- the correct reference implementation has not been identified

---

# Identify Task Type

Confirm what type of destination work is being performed.

---

## New Country Hub

Requires:

- country landing page
- hero configuration
- route registration
- SEO metadata
- destination scope

Reference existing country hub implementations.

---

## New Destination Story Page

Requires:

- image catalogue entries
- destination page component
- hero configuration
- route registration
- SEO metadata
- gallery integration

Choose the correct template before coding.

---

## Existing Destination Expansion

Examples:

- adding galleries
- adding categories
- importing additional photography
- extending sections

Check existing:

- routes
- asset structure
- gallery categories
- Cloudinary paths

---

## Hero Replacement

Requires:

- prepared hero asset
- Cloudinary update
- hero configuration update
- optimisation checks
- mobile verification

Do not replace heroes by editing page files directly.

---

## Image Library Update

Requires:

- metadata preparation
- `artImages.json` update
- slice regeneration
- gallery validation

Generated files are never the source of truth.

---

# Confirm Template

## Purpose

Select the correct page architecture before implementation.

---

## Inputs

- destination type
- editorial approach
- reference implementation

---

## Outputs

Confirmed template choice.

---

## Stop if...

- the page type is unclear
- a template is being selected only because another page looks similar
- a new structure is being proposed without review

---

# Template Selection

Use existing templates only.

---

## CountryLandingTemplate

Use for:

- country overview pages
- regional entry points

---

## DenseTemplate

Use for:

- exploration-heavy destinations
- cities
- destinations requiring structured navigation

Common characteristics:

- multiple sections
- stronger navigation
- category exploration

---

## LightTemplate

Use for:

- atmosphere-led destinations
- immersive stories
- slower editorial journeys

Common characteristics:

- linear narrative
- visual rhythm
- reflective close

---

# Reference Implementation

## Purpose

Use an existing working destination as the structural reference.

---

## Required

Before creating a page:

- select a matching reference page
- understand its template
- review its component structure
- identify required supporting systems

---

## Rule

Copy the pattern, not the page.

Do not duplicate a destination and replace names without understanding:

- assets
- routing
- metadata
- hero handling
- mobile behaviour

---

# Next Stage

→ Preparing Destination Assets

---

# Preparing Destination Assets

Editorial writing should not begin during asset preparation.

Asset selection affects:
- narrative sections
- gallery categories
- image ordering
- template decisions

Complete the asset package first.

## Purpose

Prepare every asset required before repository integration begins.

No page components or application logic should be written during this stage.

The objective is to create a complete, stable asset package before application changes begin.

---

## Inputs

- final image collection
- selected hero image
- metadata CSV
- destination type
- editorial notes (if available)

---

## Outputs

A validated destination asset package ready for integration.

---

## Stop if...

- images are incomplete
- metadata is incomplete
- hero image has not been selected
- filenames are likely to change
- destination scope is still unclear

---

# Required Destination Inputs

Every destination should include:

## Required

- complete image set
- one hero image
- metadata CSV
- destination name
- destination route
- destination type

## Optional

- editorial notes
- signature locations
- GPS information
- SEO notes

---

# Image Requirements

Every image should:

- be fully edited
- be final resolution
- follow project naming conventions
- have a unique filename
- belong to one destination
- have matching metadata

Images should not require editing after metadata preparation.

---

# Hero Image Requirements

The hero image should:

- represent the destination clearly
- support text overlay
- have suitable composition
- exist within the destination image set
- have a final filename

Hero selection should happen before upload.

Do not upload first and decide later.
# Metadata CSV

## Purpose

Create a single source of truth for image metadata before repository integration.

---

## Required Fields

| Column | Purpose |
|---------|---------|
| filename | Image filename and Cloudinary reference |
| title | Image title |
| description | Gallery description |
| altText | Accessibility text |
| category | Gallery grouping |

---

## Rules

Every uploaded image must have one metadata record.

Metadata must match filenames exactly.

Do not rename files after metadata preparation.

---

# Naming Conventions

Filenames must remain identical across:

- local assets
- Cloudinary
- metadata CSV
- `artImages.json`
- generated slices

A filename mismatch creates broken image references.

---

# Next Stage

→ Repository Integration

---

# Repository Integration

## Purpose

Move the validated destination asset package into the repository structure.

The objective is to integrate assets without creating broken references or inconsistent patterns.

---

## Inputs

- validated destination asset package
- confirmed filenames
- metadata CSV
- existing asset structure

---

## Outputs

A repository-ready destination asset structure.

---

## Stop if...

- filenames have changed
- metadata does not match images
- destination folder structure is unclear
- existing asset conventions are unknown
- required configuration files have not been identified

---

# Asset Integration

Before adding files:

- check existing destination examples
- confirm folder naming
- confirm image format requirements
- confirm whether assets are local or Cloudinary managed

Follow existing structures.

Do not create new asset patterns unless required.

---

# Cloudinary Integration

## Purpose

Upload final destination assets using the existing image pipeline.

Cloudinary storage alone does not make an asset available to the application. Required configuration must also be updated where applicable.

---

## Inputs

- final images
- confirmed filenames
- metadata

---

## Outputs

Cloudinary assets ready for application use.

---

## Before Upload

Confirm:

- filenames are final
- images are final versions
- destination folder is correct
- metadata mapping is complete

---

## Rules

Do not upload temporary versions.

Do not rename Cloudinary paths without checking migration impact.

Do not create new folder structures when an existing pattern applies.

---

# Image Catalogue Integration

## Purpose

Connect destination images to the gallery system.

---

## Inputs

- metadata CSV
- Cloudinary assets
- destination categories

---

## Outputs

Updated image catalogue.

---

# artImages.json

`artImages.json` is the authoritative source for gallery image data.

Before updating:

- confirm every image exists
- confirm metadata matches filenames
- confirm categories are correct
- confirm ordering requirements

Every image entry must contain the required fields.

Do not manually create incomplete entries.

---

# Generated Image Slices

## Purpose

Generate the supporting image slice files used by the application.

---

## Inputs

- updated `artImages.json`
- final image metadata

---

## Outputs

Updated generated slices.

---

## Rules

Generated files are outputs only.

The source of truth remains:

- original assets
- metadata
- `artImages.json`

After editing `artImages.json`:

Run:

`npm run generate:art-slices`

---

## Destination Ready Gate

Before construction begins confirm:

✓ destination type confirmed
✓ template confirmed
✓ reference page reviewed
✓ hero selected
✓ all images final
✓ filenames locked
✓ metadata CSV complete
✓ Cloudinary mapping confirmed
✓ route decided
✓ SEO information available

If any item is incomplete, return to asset preparation.

# Next Stage

→ Destination Page Construction

---

# Destination Page Construction

## Purpose

Create the destination page after assets and configuration are ready.

The page should follow the confirmed template and existing implementation patterns.

---

## Inputs

- integrated assets
- metadata
- selected template
- reference implementation
- editorial content

---

## Outputs

A working destination page connected to the existing application.

---

## Stop if...

- required assets are missing
- template choice has changed
- reference implementation has not been reviewed
- required supporting systems are unknown

---

# Page Implementation

Process:

1. Create or update destination page component
2. Connect selected template
3. Add destination content
4. Connect gallery data
5. Connect hero system
6. Register supporting configuration
7. Validate rendering

---

## Rules

Use existing components before creating new ones.

Follow neighbouring destination patterns.

Do not introduce one-off structures.

---

# Hero Configuration

## Purpose

Connect the destination hero through the existing resolver system.

---

## Required

Check:

- hero data configuration
- hero asset availability
- resolver behaviour
- fallback behaviour

Relevant systems:

- `heroData.js`
- `resolveHero.js`
- `*.hero.config.js`

---

## Rules

Do not hardcode hero images inside page components.

Hero configuration should only become active after the asset exists correctly.

---

# Route and Metadata Registration

## Purpose

Connect the destination to the application routing and SEO systems.

---

## Required Checks

Update where applicable:

- `src/config/routes.js`
- `src/config/pageChunks.js`
- `src/config/seoTitles.js`
- `src/config/staticRouteMeta.js`
- `src/config/breadcrumbLabels.js`
- `src/config/searchIndex.js`
- `src/assets/destinations.json`

---

## Confirm

- route resolves correctly
- metadata loads correctly
- sitemap generation includes the destination
- navigation links work where applicable

---

# Mobile Verification

## Mobile Shell Decision

Before completion confirm whether the destination requires a static mobile hero shell.

If required, follow the mobile shell wiring checklist:

- `src/index.js`
- `src/Mobile{Route}ShellApp.js`
- `scripts/{route}StaticShell.js`
- `scripts/inject-static-meta.js`
- `src/utils/staticPageHero.js`

Also verify:

- `resolveLcpHeroPreloadUrl`
- hero optimisation script
- generated `public/assets/*-hero-400.webp`

Do not add a mobile shell unless the performance benefit is required.

## Purpose

Confirm the destination works correctly within the mobile architecture.

---

## Required Checks

Verify:

- mobile shell requirements
- hero behaviour
- static shell behaviour
- navigation
- responsive rendering

Do not assume desktop changes automatically apply to mobile.

---

# Validation Stage

## Purpose

Confirm the destination is complete before committing.

---

## Required Checks

Application:

- page loads correctly
- no console errors
- no broken imports
- no missing assets

Assets:

- images resolve
- hero loads
- gallery loads
- metadata matches

Responsive:

- desktop verified
- mobile verified

Build:

- production build succeeds

---

# Completion Checklist

Before considering the destination complete:

- [ ] task type confirmed
- [ ] template confirmed
- [ ] reference implementation reviewed
- [ ] assets prepared
- [ ] metadata completed
- [ ] Cloudinary integration completed
- [ ] `artImages.json` updated
- [ ] image slices regenerated
- [ ] destination page created
- [ ] hero configured
- [ ] routes registered
- [ ] SEO metadata verified
- [ ] mobile behaviour checked
- [ ] build passes
- [ ] changes reviewed before commit
- [ ] no unrelated architectural refactors introduced

---

# Final Rule

A destination task should remain focused.

Do not refactor unrelated systems while adding a destination.

If a wider architectural issue is discovered:

- document the issue
- explain the impact
- avoid expanding scope
- ask before making structural changes

The goal is a repeatable destination workflow that preserves the existing Nomad Scribbles architecture.