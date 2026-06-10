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

/** @type {Record<string, string>} */
const ROUTE_LCP_PRELOAD = {
  '/brazil': cloudinaryImageUrl('Brazil/Brazil-hero', {
    width: 400,
    version: 1779448919,
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

module.exports = { ROUTE_LCP_PRELOAD, brazilTransitionPreloadUrl };
