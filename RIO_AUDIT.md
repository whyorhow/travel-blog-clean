# Rio.js Audit — Stress Test Results

**Date:** 2024-05-07  
**Status:** Hardcoded values found — System needs extension

---

## 🚨 CRITICAL: System Extensions Required

Rio.js exposes gaps in the current token system. This is **valuable feedback**, not failure.

### Missing Tokens (Must Add)

| Current Value | Context | Required Token |
|--------------|---------|----------------|
| `#D4AF37` | Hero title, accents, borders | `tokens.colors.rioGold` or `tokens.colors.heroGold` |
| `#4a044e` | Carnival section background | `tokens.colors.rio.carnival` |
| `#3b0764` | Geography section background | `tokens.colors.rio.geography` |
| `#2e1065` | Corcovado section background | `tokens.colors.rio.corcovado` |
| `#1e1b4b` | Sea section background | `tokens.colors.rio.sea` |
| `#1c1917` | Hero gradient, overlays | `tokens.colors.rio.dark` |
| `#581c87` | Page background | `tokens.colors.rio.pageBg` |
| `90vh` | Hero height | `tokens.layout.heroHeightTall` |
| `#ede0d4` | Caption text | `tokens.colors.rio.cream` |

### Pattern Discovery

Rio uses **destination-specific color palette** — different from São Paulo's `#B8860B` gold and neutral text scale.

**Insight:** The system needs **palette variants** per destination type.

---

## Hardcoded Values Inventory

### Colors (24 instances)
```
Line 53:   bg-[#4a044e]/95      → tokens.colors.rio.carnival
Line 69:   bg-[#3b0764]/95      → tokens.colors.rio.geography
Line 84:   bg-[#2e1065]/95      → tokens.colors.rio.corcovado
Line 103:  bg-[#1e1b4b]/95      → tokens.colors.rio.sea
Line 114:  #581c87              → tokens.colors.rio.pageBg
Line 148:  from-[#1c1917]/40    → tokens.colors.rio.overlay
Line 148:  to-[#1c1917]         → tokens.colors.rio.dark
Line 157:  text-[#D4AF37]       → tokens.colors.rio.gold
Line 217:  border-[#D4AF37]     → tokens.colors.rio.gold
Line 217:  text-[#D4AF37]       → tokens.colors.rio.gold
Line 218:  hover:bg-[#2e1065]/30 → tokens.colors.rio.corcovado
Line 221:  (same patterns)
Line 318:  bg-[#1c1917]/85      → tokens.colors.rio.overlay
Line 318:  border-[#D4AF37]/30  → tokens.colors.rio.gold
Line 322:  text-[#D4AF37]       → tokens.colors.rio.gold
Line 327:  text-[#ede0d4]       → tokens.colors.rio.cream
Line 339:  border-[#D4AF37]/50  → tokens.colors.rio.gold
Line 343:  bg-[#D4AF37]/50      → tokens.colors.rio.gold
Line 366:  text-[#D4AF37]       → tokens.colors.rio.gold (conditional)
Line 392:  text-stone-400       → tokens.colors.text.muted (OK)
Line 409:  text-stone-300       → tokens.colors.text.tertiaryDark (MISSING)
Line 451:  border-[#D4AF37]      → tokens.colors.rio.gold
Line 459:  text-stone-100       → tokens.colors.text.primaryDark (MISSING)
```

### Spacing (8 instances)
```
Line 136:  h-[90vh]             → tokens.layout.heroHeightTall
Line 151:  mt-[-36vh]           → tokens.spacing.heroOffsetMobile
Line 151:  md:mt-[-66vh]        → tokens.spacing.heroOffsetDesktop
Line 166:  mb-16                → tokens.spacing.sectionGap
Line 289:  my-8                 → tokens.spacing.imageGap
Line 337:  mt-6                 → tokens.spacing.tight
Line 406:  space-y-10           → tokens.spacing.contentStack
Line 409:  max-w-3xl            → tokens.layout.maxContent (OK)
```

### Shadows/Borders (5 instances)
```
Line 157:  drop-shadow-2xl      → tokens.shadows.hero (custom)
Line 217:  shadow-lg            → tokens.shadows.card (OK)
Line 318:  shadow-2xl           → tokens.shadows.floatingCard
Line 318:  shadow-black/60      → Custom shadow color
Line 339:  shadow-sm            → tokens.shadows.subtle
```

### Typography Scale (8 instances)
```
Line 157:  text-7xl md:text-9xl → tokens.typography.heroMassive (custom for Rio)
Line 160:  text-xl md:text-3xl  → tokens.typography.subtitle
Line 318:  text-2xl md:text-3xl → tokens.typography.captionTitle
Line 327:  text-lg              → tokens.typography.captionText
Line 366:  text-4xl md:text-6xl → tokens.typography.sectionDisplay
Line 371:  text-lg md:text-xl   → tokens.typography.subtitle
Line 409:  text-xl              → tokens.typography.bodyLarge
Line 451:  text-xl              → tokens.typography.quote
Line 459:  text-2xl md:text-3xl → tokens.typography.contentHeader
```

---

## System Extensions Required

### 1. Destination-Specific Palettes

```javascript
// tokens.js addition
colors: {
  // São Paulo (default urban)
  gold: '#B8860B',
  
  // Rio (dramatic/vibrant)
  rio: {
    gold: '#D4AF37',
    carnival: '#4a044e',
    geography: '#3b0764',
    corcovado: '#2e1065',
    sea: '#1e1b4b',
    dark: '#1c1917',
    pageBg: '#581c87',
    cream: '#ede0d4',
  },
  
  // Future: Athens (marble/white)
  // Future: Tennessee (warm/amber)
}
```

### 2. Dark Mode Text Scale

```javascript
text: {
  // Light backgrounds
  primary: '#222',
  secondary: '#333',
  tertiary: '#444',
  muted: '#555',
  subtle: '#666',
  
  // Dark backgrounds (Rio uses these)
  primaryDark: '#e5e5e5',    // stone-100
  tertiaryDark: '#d4d4d4',   // stone-300
}
```

### 3. Extended Layout Tokens

```javascript
layout: {
  heroHeight: '60vh',          // Standard
  heroHeightTall: '90vh',      // Cinematic (Rio)
  heroOffsetMobile: '-36vh',   // Text overlap
  heroOffsetDesktop: '-66vh',
}
```

### 4. Extended Shadows

```javascript
shadows: {
  card: '0 4px 6px rgba(0,0,0,0.1)',
  floatingCard: '0 25px 50px rgba(0,0,0,0.6)',  // Rio metadata card
  hero: '0 25px 50px rgba(0,0,0,0.5)',          // Hero text
  subtle: '0 1px 2px rgba(0,0,0,0.05)',
}
```

### 5. Extended Typography

```javascript
typography: {
  heroMassive: { size: '4.5rem', mdSize: '8rem' },  // 7xl / 9xl
  sectionDisplay: { size: '2.25rem', mdSize: '3.75rem' },  // 4xl / 6xl
  subtitle: { size: '1.25rem', mdSize: '1.875rem' },  // xl / 3xl
}
```

---

## Migration Strategy

### Option A: Extend System First (Recommended)

1. Add Rio palette to `tokens.js`
2. Add dark text scale
3. Add cinematic layout tokens
4. Then migrate Rio.js

**Pros:** System grows properly, reusable for similar pages  
**Cons:** Takes longer

### Option B: Inline Tokens Temporarily

Use `tokens.colors.rio = { ... }` as inline object, migrate to full system later.

**Pros:** Faster  
**Cons:** Technical debt

---

## Decision Required

**Question:** Should Rio's dramatic color palette be:

1. **Rio-specific** (tokens.colors.rio.*) — Only Rio uses these colors
2. **Template-specific** (tokens.palettes.dramatic.*) — Other pages can opt-in
3. **Both** — Rio uses its palette, but components accept palette prop

**Recommendation:** Start with Rio-specific (Option 1), generalize if patterns emerge.

---

## Immediate Actions

1. **Extend tokens.js** with Rio palette and dark text scale
2. **Create Rio-specific tw exports** (tw.rio.gold, etc.)
3. **Migrate Rio.js** section by section
4. **Test visual parity** against current version

---

## Key Insight

Rio.js proves the system needs **destination personality tokens**, not just universal ones.

São Paulo → restrained, editorial, gold #B8860B  
Rio → dramatic, cinematic, gold #D4AF37, purple depths

The abstraction isn't wrong — it just needs to account for **intentional variation**.
