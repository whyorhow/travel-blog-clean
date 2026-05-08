/**
 * IGUAZU HERO CONFIG — System authority for hero availability
 *
 * Resolution order: diary → location → fallback → PlaceholderHero
 *
 * STATUS VALUES:
 * - 'active':   Asset confirmed uploaded and approved
 * - 'disabled': Intentionally turned off
 * - 'missing':  Not ready yet
 */

export const iguazuHeroConfig = {
  diary: {
    publicId: 'hero/diary/iguazu/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Iguazu',
  },
  location: {
    publicId: 'hero/location/iguazu/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'hero/fallback/iguazu/main',
    status: 'active',
    intent: 'fallback',
    notes: 'Iguazu backup image uploaded 2026-05-08',
  },
};

export default iguazuHeroConfig;
