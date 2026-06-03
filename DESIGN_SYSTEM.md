# Nomad Scribbles — Design System

## Editorial Philosophy

This is not a CMS. Each page draws from a shared vocabulary but speaks with its own rhythm.

- **São Paulo** → dense editorial, layered galleries, fast pacing
- **Ilha Grande** → large imagery, minimal text, generous negative space
- **Tennessee** → old paper textures, map folds, slower reveals

Same language. Different breathing.

---

## Color Tokens

### Primary
| Token | Value | Usage |
|-------|-------|-------|
| `--color-gold` | `#B8860B` | Headings, accents, borders, CTAs |
| `--color-dark-text` | `#E5CF6B` | Text on dark backgrounds |
| `--color-light-text` | `#101E0E` | Text on light/paper backgrounds |

### Neutral Scale (for body copy)
| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#222` | Main body text |
| `--text-secondary` | `#333` | Secondary paragraphs |
| `--text-tertiary` | `#444` | Lighter supporting text |
| `--text-muted` | `#555` | Captions, metadata |
| `--text-subtle` | `#666` | Fine print, timestamps |

### Backgrounds
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-paper` | `#f5f0e8` | Main content sections |
| `--bg-gradient-dark` | `linear-gradient(to bottom, #575E38, #292D18)` | Hero, home page |
| `--bg-overlay-dark` | `rgba(0,0,0,0.3)` | Hero image overlay |
| `--bg-overlay-subtle` | `rgba(0,0,0,0.05)` | Image tone overlays |

### Nomads Shop (on paper shell)
| Token / class | Value | Usage |
|---------------|-------|-------|
| `tw.surface.shop.brandTitle` | `#2B2118` handwriting | “Nomads Shop” on all shop pages |
| `tw.surface.shop.collectionTitle` | `#3A2D22` Cormorant | “Brazil Collection”, city names |
| `tw.surface.shop.subtitle` | `#5B4A3D` | Instructions under titles |
| `tw.surface.shop.panel` | `bg-main-gradient` | Featured carousel only |
| `tw.surface.shop.itemTitle` | `text-darkText` (#E5CF6B) | Titles **on olive panels** only |
| `tw.surface.shop.returnLink` | `bg-warmTaupe` + `text-cream` | Return navigation pills |

On paper, use warm browns — not `lightText`, `text-black`, or neutral `#222`. All shop routes share `ShopPageHeader` + `shopTheme`.

---

## Typography Scale

### Font Families
| Token | Value | Usage |
|-------|-------|-------|
| `--font-serif` | `'Cormorant Garamond', serif` | Body, headings, editorial |
| `--font-handwriting` | `'Dancing Script', cursive` | **One emotional moment per page only** |

### Type Scale
| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-hero` | `4rem / 64px` | 1.1 | 600 | Page titles |
| `text-section` | `2.5rem / 40px` | 1.2 | 600 | Section headings |
| `text-subsection` | `1.5rem / 24px` | 1.3 | 600 | Subsection titles |
| `text-lead` | `1.5rem / 24px` | 1.6 | 400 | Intro paragraphs |
| `text-body` | `1.125rem / 18px` | 1.7 | 400 | Main body text |
| `text-small` | `0.875rem / 14px` | 1.5 | 400 | Captions, metadata |
| `text-tiny` | `0.75rem / 12px` | 1.4 | 400 | Fine print |

### Handwriting Usage (LIMITED)
- **Max 1x per page**
- Use for: emotional bridge moment, section navigator titles, or closing quote
- Never use for: body text, navigation, buttons, captions

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `0.5rem / 8px` | Tight gaps, icon spacing |
| `--space-sm` | `1rem / 16px` | Small padding, related elements |
| `--space-md` | `1.5rem / 24px` | Standard section padding |
| `--space-lg` | `2.5rem / 40px` | Large gaps, major breaks |
| `--space-xl` | `4rem / 64px` | Section separators |
| `--space-2xl` | `6rem / 96px` | Major section breaks |
| `--space-bridge` | `3rem / 48px` | Bridge section vertical rhythm |

---

## Layout

### Content Widths
| Token | Value | Usage |
|-------|-------|-------|
| `--max-content` | `42rem / 672px` | Optimal reading width |
| `--max-wide` | `56rem / 896px` | Narrative splits, wider content |
| `--max-full` | `80rem / 1280px` | Full-width sections |
| `--max-hero` | `100%` | Hero images (60vh height) |

### Grid Patterns
| Pattern | Usage |
|---------|-------|
| `md:w-2/3 + md:w-1/3` | Intro split (text + sidebar image) |
| `md:w-1/2 + md:w-1/2` | Map + Subsection navigator |
| `flex-col md:flex-row` | Responsive narrative splits |

---

## Image Treatments

### Hero Images
- Height: `60vh`
- Object-fit: `cover`
- Overlay: `bg-black/30` (subtle, 30%)
- No border radius

### Content Images
- Default: `rounded-lg` (0.5rem)
- Elevation: `shadow-md`
- Optional tone overlay: `bg-black/5`

### Gallery Images
- Masonry layout via `GalleryWall`
- Size classes: `small`, `wide`, `tall`, `large`
- Hover: `opacity-90 → opacity-100`

### Overlays (Standardized)
| Usage | Opacity |
|-------|---------|
| Hero (dark) | `bg-black/30` |
| Image tone | `bg-black/5` |
| Dark sections | `bg-stone-800/10` |

---

## Borders & Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `0.125rem` | Subtle rounding |
| `--radius-md` | `0.375rem` | Buttons, cards |
| `--radius-lg` | `0.5rem` | Images, containers |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Images, cards |
| `--border-gold` | `4px solid #B8860B` | Highlight blocks |
| `--border-subtle` | `1px solid #e5e5e5` | Dividers, underlines |

---

## Animation & Timing

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `150ms` | Hover states |
| `--duration-normal` | `300ms` | Transitions, fades |
| `--duration-slow` | `500ms` | Page transitions |
| `--easing-default` | `ease-out` | Standard transitions |
| `--easing-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful elements |

### Standard Transitions
```css
/* Hover opacity */
transition: opacity 300ms ease-out;

/* Slide interactions */
transition: all 300ms ease-out;

/* Navigation shift */
hover:pl-2 transition-all duration-300
```

---

## Narrative Pacing Devices

These three components create authored flow (not assembled):

### 1. Bridge
**Purpose:** Create breathing room between major sections
**Visual:** Centered italic text, generous vertical padding (`py-12`)
**Tone:** Reflective, transitional
**Usage:** Once per page, between intro and deep content

### 2. Rhythm Insert
**Purpose:** Brief atmospheric moment
**Visual:** Short paragraph (2-3 lines), understated
**Tone:** Observational, sensory
**Usage:** After narrative blocks, before transitions

### 3. Reflective Close
**Purpose:** Emotional landing at page end
**Visual:** Highlighted block with gold left border
**Tone:** Concluding, memorable
**Usage:** Final section only

---

## Signature Objects (Per Destination)

Each location has ONE recurring visual anchor:

| Destination | Signature Object |
|-------------|-------------------|
| São Paulo | Layered graffiti textures |
| Tennessee | Old paper/map folds |
| Athens | Marble/light contrast |
| Pantanal | Water reflections |
| Belgium | Typography/poster aesthetics |
| Ilha Grande | Open water horizons |
| Rio | Tile patterns (azulejos) |
| Budapest | Thermal steam/geometry |

**Usage:** Subtle recurrence, not overwhelming. 2-3 touches per page max.

---

## Component Inventory

### Layout Components
- `LocationHero` — Full-width hero with overlay
- `NarrativeSplit` — Image + text side-by-side
- `RhythmInsert` — Brief atmospheric text block
- `BridgeQuote` — Centered transitional text
- `SubsectionNavigator` — Map + clickable section list
- `ReflectiveClose` — Gold-bordered closing block
- `IntroGrid` — Two-column intro (2/3 text + 1/3 image)

### Gallery Components
- `GalleryWall` — Masonry layout with behavioral sizing
- `SimpleLightbox` — Image viewer with purchase links

### Utility Components
- `SEO` — Meta tags
- `ContextMap` — Location map with markers
- `VisualHeader` — Consistent page header

---

## Page Rhythm Examples

### Dense Editorial (São Paulo)
```
Hero → Intro Grid → Rhythm Insert → Narrative Split → 
Bridge → Map/Navigator → Gallery → Reflective Close
```

### Breath & Space (Ilha Grande)
```
Hero → Minimal Intro → Large Image → Bridge → 
Wide Gallery → Reflective Close
```

### Slow Reveal (Tennessee)
```
Hero → Text Block → Rhythm Insert → Narrative Split → 
Rhythm Insert → Bridge → Subsection Navigator → Reflective Close
```
