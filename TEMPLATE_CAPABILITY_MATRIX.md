# Template Capability Matrix

**Purpose:** Prevent "hybrid drift" — uncontrolled blending between Dense and Light template philosophies.

**Rule:** Pages must commit to ONE template class. Variants modify tonal flavour only — never structure.

---

## The Two Templates

| Template | Core Identity | Metaphor |
|----------|--------------|---------|
| `DenseTemplate` | Exploration + navigation + layered discovery | *City as network* |
| `LightTemplate` | Atmosphere + pacing + immersion | *Place as memory* |

Users perceive this as "dense pages" vs "lighter pages." That's the intended distinction.

---

## DenseTemplate

**Philosophy:** Modular • Exploratory • Branching • Navigational

| Feature | Status | Notes |
|---------|--------|-------|
| **Hero** | required | Cinematic preferred, standard acceptable |
| **IntroGrid** | required | Two-column intro with sidebar image |
| **Map + SubsectionNavigator** | required | Spatial context is non-negotiable |
| **Subsections** | required | 3-4 minimum, navigation active |
| **NarrativeSplit** | required | One deep narrative moment |
| **RhythmInsert** | required | At least one atmospheric pause |
| **BridgeQuote** | required | Major section transition |
| **Gallery** | required | `{City} Gallery` heading |
| **ReflectiveClose** | required | Standard gold-bordered close |

### Variants

| Variant | Tonal Difference | Use For |
|---------|-----------------|---------|
| `megacity` | Full pacing, snapshot block, editorial energy | São Paulo, Antwerp |
| `industrial` | No snapshot, leaner feel | Future industrial/port cities |

---

## LightTemplate

**Philosophy:** Immersive • Linear • Reflective • Continuous

| Feature | Status | Notes |
|---------|--------|-------|
| **Hero** | required | Lighter overlay than Dense |
| **BridgeQuote** | required | Always uses handwriting font |
| **Gallery** | required | "Further Fragments" or "Uncatalogued Moments" |
| **ReflectiveClose** | required | Style varies by variant |
| **Map + SubsectionNavigator** | optional | Only if spatial context genuinely adds value |
| **Subsections** | forbidden | Violates linear flow |
| **IntroGrid** | forbidden | Destroys atmospheric pacing |

### Variants

| Variant | Content Shape | Tonal Treatment | Use For |
|---------|--------------|----------------|---------|
| `urban` | intro paragraph | Clean palette, compact | Future lighter city pages |
| `immersive` | intro paragraphs[] + narratives[] + rhythmInserts[] | Torn-paper texture, essayistic | Rio, Budapest, Athens |
| `nature` | introText + featureImage | Neutral clean, minimal text | Pantanal, Iguazu |
| `coastal` | introText + featureImage | Lightest overlay, open feeling | Ilha Grande |

---

## Forbidden Patterns (Anti-Drift Rules)

1. **Light page with subsections** → Violates linear flow; use Dense instead
2. **Dense page without map** → Missing spatial anchor; map is non-negotiable for Dense
3. **Dense page without IntroGrid** → Kills modularity; IntroGrid is the Dense identity
4. **Light page without ReflectiveClose** → No narrative closure
5. **Using variant to add structure** → Variants control tonal flavour only, never layout components

---

## State Change Boundaries

| Transition | DenseTemplate | LightTemplate |
|------------|--------------|---------------|
| **Hero → Content** | Immediate IntroGrid split | Gentle intro entry |
| **Content → Gallery** | Post-navigator | Post-BridgeQuote |
| **Gallery → End** | Often continues to related | Clean close |

---

## Gallery Language by Template

| Template | Variant | Gallery Heading | Emotional Role |
|----------|---------|----------------|----------------|
| Dense | any | `{City} Gallery` | Supplementary material |
| Light | urban / nature / coastal | "Further Fragments" | Beyond the written account |
| Light | immersive | "Further Fragments" | Essayistic, reflective unfolding |

---

## Classification Decision

When building a new destination page, ask one question:

> *Is this a place you navigate or a place you inhabit?*

- **Navigate** → `DenseTemplate`
- **Inhabit** → `LightTemplate`

Then choose the variant that matches the destination's emotional register.

---

**Last Updated:** 2026-05-08  
**Status:** Active system constraint
