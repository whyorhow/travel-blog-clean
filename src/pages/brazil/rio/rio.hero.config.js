/**
 * RIO HERO CONFIG — System authority for hero availability
 * 
 * 🔒 SYSTEM CONTRACT:
 * Cloudinary is storage. This config is authority.
 * 
 * - Cloudinary existence = irrelevant to system logic
 * - This file = only thing the resolver trusts
 * - Status determines availability, not physical files
 * 
 * Resolution order (never changes):
 * 1. diary (cinematic, 90vh) — hero/diary/rio/main
 * 2. location (standard, 60vh) — hero/location/rio/main
 * 3. fallback (safety, 60vh) — hero/fallback/rio/main
 * 4. PlaceholderHero (UI-only, no image)
 * 
 * STATUS VALUES:
 * - 'active': Use this hero (asset confirmed uploaded and approved)
 * - 'disabled': Intentionally turned off (design choice)
 * - 'missing': Not ready yet (content incomplete, asset not uploaded)
 */

export const rioHeroConfig = {
  // Tier 1: Diary Hero (cinematic, narrative weight, 90vh)
  // Upload to: staging/hero/diary/rio/main.webp
  diary: {
    publicId: 'hero/diary/rio/main',
    status: 'missing',  // 'active' | 'disabled' | 'missing'
    intent: 'primary',   // 'primary' | 'secondary' | 'fallback'
    notes: 'Cinematic hero - primary narrative identity for Rio',
  },
  
  // Tier 2: Location Hero (standard system hero, 60vh)
  // Upload to: staging/hero/location/rio/main.webp
  location: {
    publicId: 'hero/location/rio/main',
    status: 'missing',
    intent: 'secondary', // Standard representation when primary unavailable
    notes: 'Standard hero - safe establishing shot',
  },
  
  // Tier 3: Page Fallback (explicit safety asset, 60vh)
  // Upload to: staging/hero/fallback/rio/main.webp
  fallback: {
    publicId: 'hero/fallback/rio/main',
    status: 'active',    // ✅ Uploaded and ready
    intent: 'fallback',  // Safety net only
    notes: 'Rio backup image uploaded 2026-05-07',
  },
};

export default rioHeroConfig;
