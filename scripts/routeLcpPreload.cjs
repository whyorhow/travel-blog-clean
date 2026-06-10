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

/** Self-hosted LCP asset — regenerate via npm run optimize:brazil-hero */
const BRAZIL_HERO_LOCAL = '/assets/brazil-hero-400.webp';

/** Keep in sync with src/pages/SaoPaulo.js hero constants */
const SAO_PAULO_HERO = {
  publicId: 'Brazil/Sao Paulo/Landing/SaoPaulo-Hero',
  version: 1779120039,
  /** Mobile LCP width — matches SaoPaulo heroImage.preloadSrc */
  width: 600,
};

/** @type {Record<string, string>} */
const ROUTE_LCP_PRELOAD = {
  '/brazil': BRAZIL_HERO_LOCAL,
  '/brazil/saopaulo': cloudinaryImageUrl(SAO_PAULO_HERO.publicId, {
    width: SAO_PAULO_HERO.width,
    version: SAO_PAULO_HERO.version,
  }),
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
