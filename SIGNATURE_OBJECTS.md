# Signature Objects — Visual Anchors by Destination

Each location has **ONE** recurring visual anchor unique to that place.
Used subtly (2-3 touches per page max) to create memory.

## Brazil

### São Paulo
**Object:** Layered graffiti textures
**Usage:** 
- Section dividers with subtle paint stroke overlays
- Gallery backgrounds with urban texture
- Navigation hover states with spray-paint edge effects

### Rio de Janeiro
**Object:** Portuguese tile patterns (azulejos)
**Usage:**
- Section borders with blue geometric patterns
- Gallery frames with tile-inspired corners
- Map markers styled as ceramic tiles

### Salvador
**Object:** Colonial architectural curves
**Usage:**
- Rounded section containers
- Arch-shaped image masks
- Navigation buttons with curved edges

### Pantanal
**Object:** Water reflections
**Usage:**
- Image overlays with subtle mirror effect
- Section transitions with ripple gradients
- Typography with water-distortion effects

### Ilha Grande
**Object:** Open water horizons
**Usage:**
- Full-bleed horizontal dividers
- Gallery gaps as negative space (white/water)
- Gradient transitions from color to horizon blue

### Bonito
**Object:** Natural pool clarity (crystal water)
**Usage:**
- Glass-morphism card effects
- Transparent overlays with aqua tint
- Image borders with submerged-stone colors

### Manaus
**Object:** Meeting of Waters contrast line
**Usage:**
- Sharp dividing lines between sections
- Two-tone backgrounds (dark/light split)
- Typography with dual-color treatments

### Iguazu
**Object:** Waterfall motion blur
**Usage:**
- Vertical gradient streaks
- Animated mist effects on scroll
- Section separators with cascade flow

### Florianopolis
**Object:** Dune and beach horizon lines
**Usage:**
- Soft diagonal section dividers
- Sand-textured backgrounds
- Wave-pattern borders

---

## United States

### Tennessee
**Object:** Old paper/map folds
**Usage:**
- Background textures with fold shadows
- Navigation with torn-edge aesthetics
- Gallery images with vintage map overlays

### Nashville
**Object:** Vinyl record grooves
**Usage:**
- Circular section containers
- Radial gradient backgrounds
- Typography with concentric line details

### Memphis
**Object:** Blues club neon glow
**Usage:**
- Dark sections with electric blue accents
- Button hover states with neon flicker
- Image borders with gradient glow

### Great Smoky Mountains
**Object:** Mist layers
**Usage:**
- Overlapping semi-transparent sections
- Gradient fades between content blocks
- Typography with ghosted shadow layers

---

## Europe

### Belgium
**Object:** Typography/poster aesthetics (Art Nouveau)
**Usage:**
- Bold display type for headings
- Ornamental section dividers
- Vintage poster-style image frames

### Antwerp
**Object:** Diamond facet geometry
**Usage:**
- Angular section shapes
- Geometric image masks (hexagons, triangles)
- Navigation with faceted button styles

### Greece
**Object:** Whitewash and shadow contrast
**Usage:**
- Stark white sections with deep blue shadows
- Image treatment: high contrast, brightened
- Minimal negative space as architectural element

### Athens
**Object:** Marble/light contrast (Parthenon stone)
**Usage:**
- Textured stone backgrounds
- Light-flare image overlays
- Typography with chiseled shadow effects

### Hungary
**Object:** Thermal bath steam + geometric tiles
**Usage:**
- Soft blur transitions between sections
- Geometric patterns (Zsolnay ceramics)
- Warm gradient backgrounds

### Budapest
**Object:** Chain bridge ironwork patterns
**Usage:**
- Wrought-iron style borders and dividers
- Chain-link motif in navigation
- Vintage metal texture accents

---

## Usage Guidelines

### DO:
- Use signature object 2-3 times per page maximum
- Apply subtly as texture, border, or transition
- Vary implementation (don't repeat identical pattern)
- Pair with page-specific rhythm (e.g., Pantanal water works with slow pacing)

### DON'T:
- Overwhelm the content with signature motifs
- Use multiple signatures on one page
- Apply identically across all pages of a country
- Let signature compete with photography

---

## Technical Implementation

Signature objects are implemented via:
1. **CSS utilities** in `index.css` (e.g., `.signature-saopaulo-graffiti`)
2. **Component props** (e.g., `<BridgeQuote signature="azulejos" />`)
3. **Background images** in `tailwind.config.js` (e.g., `bg-azulejos-pattern`)
4. **Section variants** (e.g., `variant="pantanal-water"`)
