/**
 * ILHA GRANDE HERO CONFIG — System authority for hero availability
 *
 * Resolution order: diary → location → fallback → PlaceholderHero
 *
 * STATUS VALUES:
 * - 'active':   Asset confirmed uploaded and approved
 * - 'disabled': Intentionally turned off
 * - 'missing':  Not ready yet
 */

export const ilhaGrandeHeroConfig = {
  diary: {
    publicId: 'hero/diary/ilha-grande/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Ilha Grande',
  },
  location: {
    publicId: 'hero/location/ilha-grande/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'hero/fallback/ilha-grande/main',
    status: 'active',
    intent: 'fallback',
    notes: 'Ilha Grande backup image uploaded 2026-05-08',
  },
};

export default ilhaGrandeHeroConfig;
