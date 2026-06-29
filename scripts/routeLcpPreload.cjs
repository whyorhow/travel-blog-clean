/**
 * Per-route LCP image URLs for post-build <link rel="preload"> injection.
 * Keep publicId / version in sync with the matching *.hero.config.js.
 */
const CLOUDINARY_CLOUD_NAME = 'dqypj6rlw';

/** Map new Brazil/* folder IDs to legacy Cloudinary paths until re-upload completes. */
const BRAZIL_LEGACY_PREFIXES = [
  ['Brazil/Sao Paulo/Landing/', 'SaoPauloLanding/'],
  ['Brazil/Sao Paulo/Green Spaces/', 'SP-Parks/'],
  ['Brazil/Sao Paulo/Galleries/', 'ArtGallery/'],
  ['Brazil/Sao Paulo/Carnival/', 'CarnivalSP/'],
  ['Brazil/Sao Paulo/Street Art/', 'Murals/'],
];

function resolveCloudinaryPublicId(publicId) {
  if (!publicId || typeof publicId !== 'string') return '';
  for (const [newPrefix, oldPrefix] of BRAZIL_LEGACY_PREFIXES) {
    if (publicId.startsWith(newPrefix)) {
      return oldPrefix + publicId.slice(newPrefix.length);
    }
  }
  return publicId;
}

function cloudinaryImageUrl(publicId, { width, version } = {}) {
  const resolvedId = resolveCloudinaryPublicId(publicId);
  const encodedId = resolvedId
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
const GREEN_SPACES_HERO_LOCAL = '/assets/green-spaces-hero-400.webp';
const STREET_ART_HERO_LOCAL = '/assets/street-art-hero-400.webp';
const CARNIVAL_HERO_LOCAL = '/assets/carnival-hero-400.webp';
const GALLERIES_HERO_LOCAL = '/assets/galleries-hero-400.webp';
const ATHENS_HERO_LOCAL = '/assets/athens-hero-400.webp';
const ANTWERP_HERO_LOCAL = '/assets/antwerp-hero-400.webp';
const BUDAPEST_HERO_LOCAL = '/assets/budapest-hero-400.webp';
const BELGIUM_HERO_LOCAL = '/assets/belgium-hero-400.webp';
const GREECE_HERO_LOCAL = '/assets/greece-hero-400.webp';
const HUNGARY_HERO_LOCAL = '/assets/hungary-hero-400.webp';
const AUSTRIA_HERO_LOCAL = '/assets/austria-hero-400.webp';
const VIENNA_HERO_LOCAL = '/assets/vienna-hero-400.webp';
const SALZBURG_HERO_LOCAL = '/assets/salzburg-hero-400.webp';
const WIDER_COUNTRY_HERO_LOCAL = '/assets/wider-country-hero-400.webp';

/** @type {Record<string, string>} */
const ROUTE_LCP_PRELOAD = {
  '/united-states': USA_HERO_LOCAL,
  '/united-states/tennessee': USA_HERO_LOCAL,
  '/united-states/tennessee/memphis': MEMPHIS_HERO_LOCAL,
  '/united-states/tennessee/nashville': NASHVILLE_HERO_LOCAL,
  '/united-states/tennessee/mountains': MOUNTAINS_HERO_LOCAL,
  '/brazil': BRAZIL_HERO_LOCAL,
  '/brazil/saopaulo': SAO_PAULO_HERO_LOCAL,
  '/brazil/saopaulo/green-spaces': GREEN_SPACES_HERO_LOCAL,
  '/brazil/saopaulo/street-art': STREET_ART_HERO_LOCAL,
  '/brazil/saopaulo/carnival': CARNIVAL_HERO_LOCAL,
  '/brazil/saopaulo/galleries': GALLERIES_HERO_LOCAL,
  '/belgium': BELGIUM_HERO_LOCAL,
  '/belgium/antwerp': ANTWERP_HERO_LOCAL,
  '/greece': GREECE_HERO_LOCAL,
  '/greece/athens': ATHENS_HERO_LOCAL,
  '/hungary': HUNGARY_HERO_LOCAL,
  '/hungary/budapest': BUDAPEST_HERO_LOCAL,
  '/austria': AUSTRIA_HERO_LOCAL,
  '/austria/vienna': VIENNA_HERO_LOCAL,
  '/austria/salzburg': SALZBURG_HERO_LOCAL,
  '/austria/wider-country': WIDER_COUNTRY_HERO_LOCAL,
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
