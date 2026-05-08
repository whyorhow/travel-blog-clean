/**
 * PANTANAL HERO CONFIG — System authority for hero availability
 *
 * Resolution order: diary → location → fallback → PlaceholderHero
 *
 * STATUS VALUES:
 * - 'active':   Asset confirmed uploaded and approved
 * - 'disabled': Intentionally turned off
 * - 'missing':  Not ready yet
 */

export const pantanalHeroConfig = {
  diary: {
    publicId: 'hero/diary/pantanal/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Pantanal',
  },
  location: {
    publicId: 'hero/location/pantanal/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'hero/fallback/pantanal/main',
    status: 'active',
    intent: 'fallback',
    notes: 'Pantanal backup image uploaded 2026-05-08',
  },
};

export default pantanalHeroConfig;
