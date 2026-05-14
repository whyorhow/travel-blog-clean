export const memphisHeroConfig = {
  diary: {
    publicId: 'hero/diary/usa/tennessee/memphis',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Memphis',
  },
  location: {
    publicId: 'hero/location/usa/tennessee/memphis',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - establishing shot for Memphis',
  },
  fallback: {
    publicId: 'United States/Tennessee/Memphis/Small/Illuminated Beale Street',
    status: 'active',
    intent: 'fallback',
    uncropped: false,
    notes: 'Beale Street at night — primary Memphis identity shot',
  },
};

export default memphisHeroConfig;
