# Semantic Asset Architecture

**Date:** 2024-05-07  
**Status:** Implemented for Hero System

---

## The Shift: From Page-Centric to Role-Centric

### OLD: Page-Owned Assets

```
/images/saopaulo/hero.jpg
/images/rio/hero.jpg
/images/rio/carnival1.jpg
/images/rio/carnival2.jpg
```

**Problems:**
- Assets tied to routing structure
- Hard to reuse across pages
- Implicit knowledge required
- Cloudinary becomes file dump

### NEW: Role-Defined Resources

```
/hero/location/saopaulo/main
/hero/location/rio/main
/hero/diary/rio/main
/gallery/rio/carnival/001
/textures/paper/
```

**Benefits:**
- Assets organized by semantic role
- Reusable across pages
- Self-documenting structure
- Mirrors component architecture

---

## Implementation

### 1. Hero Registry (`src/assets/heroData.js`)

```javascript
HERO_REGISTRY = {
  rio: {
    location: {
      publicId: 'hero/location/rio/main',
      treatment: 'location',
      theme: 'rio',
    },
    diary: {
      publicId: 'hero/diary/rio/main', 
      treatment: 'diary',
      theme: 'rio',
      title: 'Rio de Janeiro',
      subtitle: 'The Marvellous City',
    }
  }
}
```

### 2. Semantic Hero Component (`src/components/layout/Hero.js`)

**NOT a visual component. A routing component.**

```jsx
// Page says WHAT (destination), not HOW (which hero variant)
<Hero destinationId="rio" treatment="diary" />

// Component resolves:
// 1. Which treatment? (LocationHero vs DiaryHero)
// 2. Which asset? (hero/diary/rio/main)
// 3. Which theme? (rio gold vs default gold)
```

### 3. Page Usage Comparison

#### OLD: Page knows everything
```jsx
<DiaryHero 
  imageSrc={cloudinaryImageUrl(
    rioImages.find(img => img.id === 'rio1')?.imagePublicId,
    { width: 2000 }
  )}
  alt="Rio de Janeiro dramatic landscape"
  title="Rio de Janeiro"
  subtitle="The Marvellous City"
  accentColor={tw.rio.gold}
  overlayOpacity={30}
/>
```

**Problems:**
- Page knows image ID
- Page knows dimensions
- Page knows alt text
- Page knows theme colors
- **Asset logic leaks into page**

#### NEW: Page knows destination
```jsx
hero: {
  destinationId: 'rio',
  treatment: 'diary',
}

// ...in JSX:
<Hero destinationId={hero.destinationId} treatment={hero.treatment} />
```

**Benefits:**
- Page declares intent ("Rio diary hero")
- Component resolves implementation
- Assets defined by role, not location
- **Separation of concerns restored**

---

## Cloudinary Structure

### Proposed Organization

```
cloudinary.com/xxx/
├── hero/
│   ├── location/
│   │   ├── saopaulo/main
│   │   ├── rio/main
│   │   ├── salvador/main
│   │   └── pantanal/main
│   └── diary/
│       ├── rio/main
│       └── saopaulo/main
├── gallery/
│   └── rio/
│       ├── carnival/
│       ├── geography/
│       └── beaches/
├── textures/
│   ├── paper/
│   └── grunge/
└── signatures/
    ├── rio/corcovado
    └── saopaulo/coffee
```

### Why This Works

1. **Matches React structure**
   - Components = behaviour
   - Assets = semantic resources
   - Pages = composition

2. **Enables reasoning**
   - "What heroes exist?" → Check `hero/`
   - "What's available for Rio?" → Check `hero/*/rio/`

3. **Supports fallback**
   - Missing `hero/diary/rio`? → Use `hero/location/rio`
   - Missing destination-specific? → Use system default

---

## Migration Strategy

### Phase 1: Hero System (DONE)
- ✅ Created `heroData.js` registry
- ✅ Created semantic `Hero` component
- ✅ Updated `RioSystemCompliant.js` to use new pattern

### Phase 2: Gallery System (Next)
- Create `galleryData.js` registry
- Organize by: `/gallery/{destination}/{category}/{id}`
- Update GalleryWall to pull from semantic registry

### Phase 3: Textures & Signatures (Future)
- `/textures/paper/`
- `/signatures/{destination}/`
- Used by components, not pages

---

## Files Changed

| File | Change |
|------|--------|
| `src/assets/heroData.js` | NEW — Semantic asset registry |
| `src/components/layout/Hero.js` | NEW — Semantic hero router |
| `src/components/layout/index.js` | Added Hero export + documentation |
| `src/pages/RioSystemCompliant.js` | Uses semantic `<Hero destinationId="rio" />` |

---

## Key Insight

**Assets are not page-owned. They are role-defined and context-injected.**

```
Pages = composition (declare: "I need Rio's diary hero")
Components = behaviour (render: LocationHero vs DiaryHero)
Tokens = styling rules (apply: Rio gold vs default gold)
Assets = semantic resources (resolve: hero/diary/rio/main)
```

The system now supports:
- **Swapping themes** without changing pages
- **Reusing heroes** across different page types
- **Falling back gracefully** when variants missing
- **Reasoning about assets** from filesystem alone

---

## Next Steps

1. **Restart dev server** — Test `/brazil/rio-system`
2. **Verify Cloudinary paths** — Update `heroData.js` with actual publicIds
3. **Migrate São Paulo** — Update to use semantic `<Hero destinationId="saopaulo" />`
4. **Document gallery pattern** — Apply same role-centric thinking

**Result:** Assets organized by semantic role, mirroring component architecture. Pages declare intent. System resolves implementation.
