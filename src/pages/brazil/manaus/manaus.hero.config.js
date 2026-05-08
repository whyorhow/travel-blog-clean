/**
 * MANAUS HERO CONFIG — System authority for hero availability
 *
 * Resolution order: diary → location → fallback → PlaceholderHero
 *
 * STATUS VALUES:
 * - 'active':   Asset confirmed uploaded and approved
 * - 'disabled': Intentionally turned off
 * - 'missing':  Not ready yet
 */

export const manausHeroConfig = {
  diary: {
    publicId: 'hero/diary/manaus/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Manaus',
  },
  location: {
    publicId: 'hero/location/manaus/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'hero/fallback/manaus/main',
    status: 'active',
    intent: 'fallback',
    notes: 'Manaus backup image uploaded 2026-05-08',
  },
};

export default manausHeroConfig;
