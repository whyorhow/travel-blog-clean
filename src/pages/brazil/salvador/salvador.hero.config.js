/**
 * SALVADOR HERO CONFIG — System authority for hero availability
 *
 * Resolution order: diary → location → fallback → PlaceholderHero
 *
 * STATUS VALUES:
 * - 'active':   Asset confirmed uploaded and approved
 * - 'disabled': Intentionally turned off
 * - 'missing':  Not ready yet
 */

export const salvadorHeroConfig = {
  diary: {
    publicId: 'hero/diary/salvador/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Salvador',
  },
  location: {
    publicId: 'hero/location/salvador/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'hero/fallback/salvador/main',
    status: 'active',
    intent: 'fallback',
    notes: 'Salvador backup image uploaded 2026-05-08',
  },
};

export default salvadorHeroConfig;
