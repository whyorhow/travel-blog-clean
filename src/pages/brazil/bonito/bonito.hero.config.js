/**
 * BONITO HERO CONFIG — System authority for hero availability
 *
 * Resolution order: diary → location → fallback → PlaceholderHero
 *
 * STATUS VALUES:
 * - 'active':   Asset confirmed uploaded and approved
 * - 'disabled': Intentionally turned off
 * - 'missing':  Not ready yet
 */

export const bonitoHeroConfig = {
  diary: {
    publicId: 'hero/diary/bonito/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Bonito',
  },
  location: {
    publicId: 'hero/location/bonito/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'hero/fallback/bonito/main',
    status: 'active',
    intent: 'fallback',
    notes: 'Bonito backup image uploaded 2026-05-08',
  },
};

export default bonitoHeroConfig;
