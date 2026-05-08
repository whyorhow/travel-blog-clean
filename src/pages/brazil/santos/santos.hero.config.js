/**
 * SANTOS HERO CONFIG — System authority for hero availability
 *
 * Resolution order: diary → location → fallback → PlaceholderHero
 *
 * STATUS VALUES:
 * - 'active':   Asset confirmed uploaded and approved
 * - 'disabled': Intentionally turned off
 * - 'missing':  Not ready yet
 */

export const santosHeroConfig = {
  diary: {
    publicId: 'hero/diary/santos/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Santos',
  },
  location: {
    publicId: 'hero/location/santos/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'hero/fallback/santos/main',
    status: 'active',
    intent: 'fallback',
    notes: 'Santos backup image uploaded 2026-05-08',
  },
};

export default santosHeroConfig;
