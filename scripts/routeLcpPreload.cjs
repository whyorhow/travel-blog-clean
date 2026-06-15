/**
 * Per-route LCP image URLs for post-build <link rel="preload"> injection.
 * Keep publicId / version in sync with the matching *.hero.config.js.
 */
const CLOUDINARY_CLOUD_NAME = 'dqypj6rlw';

function cloudinaryImageUrl(publicId, { width, version } = {}) {
  const encodedId = publicId
    .split('/')
    .filter(Boolean)
    .map((seg) => encodeURIComponent(seg))
    .join('/');
  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`);
  const versionSegment = version ? `v${version}/` : '';
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms.join(',')}/${versionSegment}${encodedId}`;
}

/** Self-hosted LCP assets — regenerate via npm run optimize:*-hero */
const BRAZIL_HERO_LOCAL = '/assets/brazil-hero-400.webp';
const SAO_PAULO_HERO_LOCAL = '/assets/saopaulo-hero-400.webp';
const FLORIANOPOLIS_HERO_LOCAL = '/assets/florianopolis-hero-400.webp';
const RIO_HERO_LOCAL = '/assets/rio-hero-400.webp';
const SANTOS_HERO_LOCAL = '/assets/santos-hero-400.webp';
const PANTANAL_HERO_LOCAL = '/assets/pantanal-hero-400.webp';
const BONITO_HERO_LOCAL = '/assets/bonito-hero-400.webp';
const MANAUS_HERO_LOCAL = '/assets/manaus-hero-400.webp';
const SALVADOR_HERO_LOCAL = '/assets/salvador-hero-400.webp';
const FOZ_HERO_LOCAL = '/assets/foz-hero-400.webp';
const FOOD_DRINK_HERO_LOCAL = '/assets/food-drink-hero-400.webp';
const USA_HERO_LOCAL = '/assets/usa-hero-400.webp';
const MEMPHIS_HERO_LOCAL = '/assets/memphis-hero-400.webp';
const NASHVILLE_HERO_LOCAL = '/assets/nashville-hero-400.webp';
const MOUNTAINS_HERO_LOCAL = '/assets/mountains-hero-400.webp';
const ILHA_GRANDE_HERO_LOCAL = '/assets/ilha-grande-hero-400.webp';
const NATURAL_SPACES_HERO_LOCAL = '/assets/natural-spaces-hero-400.webp';

/** @type {Record<string, string>} */
const ROUTE_LCP_PRELOAD = {
  '/united-states': USA_HERO_LOCAL,
  '/united-states/tennessee': USA_HERO_LOCAL,
  '/united-states/tennessee/memphis': MEMPHIS_HERO_LOCAL,
  '/united-states/tennessee/nashville': NASHVILLE_HERO_LOCAL,
  '/united-states/tennessee/mountains': MOUNTAINS_HERO_LOCAL,
  '/brazil': BRAZIL_HERO_LOCAL,
  '/brazil/saopaulo': SAO_PAULO_HERO_LOCAL,
  '/brazil/florianopolis': FLORIANOPOLIS_HERO_LOCAL,
  '/brazil/rio': RIO_HERO_LOCAL,
  '/brazil/rio/ilha-grande': ILHA_GRANDE_HERO_LOCAL,
  '/brazil/natural-spaces': NATURAL_SPACES_HERO_LOCAL,
  '/brazil/santos': SANTOS_HERO_LOCAL,
  '/brazil/pantanal': PANTANAL_HERO_LOCAL,
  '/brazil/bonito': BONITO_HERO_LOCAL,
  '/brazil/manaus': MANAUS_HERO_LOCAL,
  '/brazil/salvador': SALVADOR_HERO_LOCAL,
  '/brazil/foz': FOZ_HERO_LOCAL,
  '/brazil/food-drink': FOOD_DRINK_HERO_LOCAL,
};

const BRAZIL_TRANSITION = {
  publicId: 'Brazil/Brazil-backup',
  version: 1779448250,
  width: 480,
};

function brazilTransitionPreloadUrl() {
  return cloudinaryImageUrl(BRAZIL_TRANSITION.publicId, {
    width: BRAZIL_TRANSITION.width,
    version: BRAZIL_TRANSITION.version,
  });
}

module.exports = {
  ROUTE_LCP_PRELOAD,
  BRAZIL_HERO_LOCAL,
  brazilTransitionPreloadUrl,
  cloudinaryImageUrl,
};
