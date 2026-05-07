# Page Implementation Guide

Quick reference for creating new destination pages using the design system.

## Step 1: Choose Your Template

| Destination Type | Template | Example |
|------------------|----------|---------|
| Urban, complex, fast | `DenseEditorialTemplate` | São Paulo, Rio, Antwerp |
| Natural, spacious, slow | `BreathAndSpaceTemplate` | Ilha Grande, Pantanal |
| Historical, layered | `SlowRevealTemplate` | Tennessee, Athens, Budapest |
| Custom mix | Individual layout components | Unique cases |

## Step 2: Define Your Signature Object

From `SIGNATURE_OBJECTS.md`, choose ONE visual anchor:

```javascript
// São Paulo → graffiti textures
// Ilha Grande → open water horizons  
// Tennessee → old paper folds
// etc.
```

Use it 2-3 times per page, subtly.

## Step 3: Use Handwriting Font Once

```javascript
// Option 1: Bridge quote (emotional transition)
<BridgeQuote quote="..." useHandwriting={true} />

// Option 2: Section navigator (if no bridge)
<h2 className="font-handwriting">Inside the City</h2>

// Option 3: Reflective close (if nothing else uses it)
<ReflectiveClose text="..." useHandwriting={true} />
```

**Only one per page.**

## Step 4: Structure Your Content

### Dense Editorial (São Paulo)

```javascript
import { DenseEditorialTemplate } from './templates';

function SaoPaulo() {
  const locationData = {
    name: 'São Paulo',
    seo: { title: '...', description: '...' },
    coords: destinations.find(d => d.id === 'saopaulo'),
    spatialContext: 'The distances between places...'
  };

  return (
    <DenseEditorialTemplate
      locationData={locationData}
      heroImage={{ src: diaryHero, alt: 'São Paulo skyline' }}
      intro={{
        paragraphs: ['...', '...', '...'],
        snapshot: 'São Paulo is the largest city...'
      }}
      sidebarImage={{ src: '...', alt: '...', caption: '...' }}
      rhythmText="Dinner rarely marks the end..."
      narrative={{
        image: { src: '...', alt: '...', width: 1200 },
        heading: 'A Quiet Religion',
        paragraph: 'Pizza in São Paulo is a quiet ritual...'
      }}
      bridgeQuote="These moments only sketch the surface..."
      sections={[
        { title: 'Green Spaces', path: '/brazil/saopaulo/green-spaces' },
        // ... 3-4 sections
      ]}
      galleryImages={processedGalleryImages}
      galleryBackground={galleryBgImage}
      reflectiveClose="São Paulo never fully reveals itself..."
    />
  );
}
```

### Breath & Space (Ilha Grande)

```javascript
import { BreathAndSpaceTemplate } from './templates';

function IlhaGrande() {
  return (
    <BreathAndSpaceTemplate
      locationData={locationData}
      heroImage={{ src: heroImage, alt: '...' }}
      introText="The island reveals itself slowly..."
      largeFeatureImage={{ 
        src: featureImage, 
        alt: '...',
        caption: 'Morning light on the bay'
      }}
      bridgeQuote="Water defines everything here..."
      sections={[...]} // optional
      galleryImages={galleryImages}
      reflectiveClose="The island keeps its own time..."
    />
  );
}
```

### Slow Reveal (Tennessee)

```javascript
import { SlowRevealTemplate } from './templates';

function Tennessee() {
  return (
    <SlowRevealTemplate
      locationData={locationData}
      heroImage={{ src: heroImage, alt: '...' }}
      intro={{
        paragraphs: ['...', '...', '...']
      }}
      rhythmInserts={[
        'The hills seem to breathe at dawn...',
        'Every road here leads somewhere old...',
        'Music hangs in the air like humidity...'
      ]}
      narratives={[
        {
          image: { src: '...', alt: '...' },
          heading: 'Nashville Nights',
          paragraph: 'The city moves to its own rhythm...'
        },
        {
          image: { src: '...', alt: '...' },
          heading: 'Memphis Blues',
          paragraph: 'History sits heavy on these streets...'
        }
      ]}
      bridgeQuote="Some places you visit. Others visit you."
      sections={[...]}
      reflectiveClose="Tennessee stays with you..."
      paperTexture={true} // enables aged paper background
    />
  );
}
```

### Custom Mix (Completely bespoke)

```javascript
import {
  LocationHero,
  IntroGrid,
  NarrativeSplit,
  RhythmInsert,
  BridgeQuote,
  SubsectionNavigator,
  ReflectiveClose
} from '../components/layout';

function CustomDestination() {
  return (
    <div className="min-h-screen">
      <LocationHero imageSrc={hero} alt="..." />
      
      {/* Skip intro grid, go straight to narrative */}
      <NarrativeSplit image={...} heading="..." paragraph="..." />
      
      {/* Multiple rhythm inserts for pacing */}
      <RhythmInsert text="..." />
      <RhythmInsert text="..." align="center" />
      
      {/* Custom gallery instead of GalleryWall */}
      <MyCustomGallery images={...} />
      
      {/* No subsection navigator — single-scroll experience */}
      <ReflectiveClose text="..." />
    </div>
  );
}
```

## Step 5: Add to Router

In `App.js`:

```javascript
import IlhaGrande from './pages/IlhaGrande';
// or import { BreathAndSpaceTemplate } and use inline

<Route 
  path="/brazil/ilha-grande" 
  element={<IlhaGrande openLightbox={openLightbox} />} 
/>
```

## Quick Reference: Layout Components

| Component | Purpose | When to Use |
|-----------|---------|-------------|
| `LocationHero` | Full-width hero image | Every page, top only |
| `IntroGrid` | Two-column intro (text + image) | Dense editorial pages |
| `NarrativeSplit` | Image + story side-by-side | Deep narrative moments |
| `RhythmInsert` | Brief atmospheric text | Pacing, between sections |
| `BridgeQuote` | Centered transitional quote | Major section transitions |
| `SubsectionNavigator` | Map + clickable sections | Pages with subsections |
| `ReflectiveClose` | Gold-bordered closing | Every page, bottom only |

## Style Tokens (Use These)

```javascript
// Colors
text-gold          // #B8860B — headings, accents
text-text-primary  // #222 — body text
text-text-muted    // #555 — captions
bg-paper           // #f5f0e8 — paper background

// Typography
text-hero          // 4rem — page titles
text-section       // 2.5rem — section headings
text-lead          // 1.5rem — intro paragraphs
text-body          // 1.125rem — body text
font-handwriting   // Dancing Script — ONE USE ONLY

// Spacing
py-bridge          // 3rem — Bridge section padding
py-section         // 1.5rem — Standard section padding

// Images
rounded-image      // 0.5rem border radius
shadow-image       // Standard image elevation
```

## Common Patterns

### Two-Column Intro
```jsx
<div className="flex flex-col md:flex-row gap-10">
  <div className="md:w-2/3">...</div>
  <div className="md:w-1/3">...</div>
</div>
```

### Centered Narrow Content
```jsx
<section className="max-w-3xl mx-auto px-6">
```

### Full-Width with Constrained Content
```jsx
<section className="w-full py-12">
  <div className="max-w-5xl mx-auto px-6">
    {/* content */}
  </div>
</section>
```

## Gallery Image Data Shape

```javascript
const galleryImages = artImages
  .filter(img => /* location folders */)
  .map(img => ({
    src: cloudinaryUrlFromLegacyPath(img.image),
    alt: img.title,
    imageId: img.id,
    lightboxImage: img.lightboxImage,
    title: img.title,
    description: img.description,
    gumroadLink: img.gumroadLink,
    shopLink: img.shopLink,
    // Behavioral properties
    sizeClass: 'small' | 'large' | 'wide' | 'tall',
    theme: img.category,
    energy: 'low' | 'medium' | 'high',
    contextLine: 'Note for lightbox only'
  }));
```

## Testing Checklist

- [ ] Mobile: All sections stack correctly
- [ ] Tablet: Two-column layouts switch at md breakpoint
- [ ] Desktop: Full layouts render properly
- [ ] Typography: Text scale feels natural at all sizes
- [ ] Handwriting: Used exactly once per page
- [ ] Signature object: Applied 2-3 times subtly
- [ ] Images: All have alt text
- [ ] Gallery: Lightbox opens and navigates
- [ ] SEO: Title and description set
- [ ] Map: ContextMap shows correct location
