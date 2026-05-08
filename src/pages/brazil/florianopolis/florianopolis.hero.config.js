/**
 * FLORIANÓPOLIS HERO CONFIG — System authority for hero availability
 *
 * Resolution order: diary → location → fallback → PlaceholderHero
 *
 * STATUS VALUES:
 * - 'active':   Asset confirmed uploaded and approved
 * - 'disabled': Intentionally turned off
 * - 'missing':  Not ready yet
 */

export const florianopolisHeroConfig = {
  diary: {
    publicId: 'hero/diary/florianopolis/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Florianópolis',
  },
  location: {
    publicId: 'hero/location/florianopolis/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'hero/fallback/florianopolis/main',
    status: 'active',
    intent: 'fallback',
    notes: 'Florianópolis backup image uploaded 2026-05-08',
  },
};

export default florianopolisHeroConfig;
