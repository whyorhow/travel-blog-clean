/**
 * Curated six-frame preview for the homepage gallery banner.
 * Image ids must exist in gallery-pool.json.
 */

/**
 * ~50–90px layout frames — deliver /small masters at low width (CDN resize).
 * Dedicated /thumbnails/ assets are not on Cloudinary yet; set preferThumbnails
 * after upload (see scripts/add-artimage-thumbnails.js).
 */
export const GALLERY_BANNER_FRAME_IMAGE = {
  forceBlogSource: true,
  widths: [96, 140, 180, 240],
  sizes: "(max-width: 640px) 12vw, (max-width: 1024px) 10vw, 120px",
  quality: "q_auto:eco",
};

export const GALLERY_BANNER_STRIP = {
  id: "home-gallery-banner",
  title: "Visual Moments",
  frames: [
    { type: "image", id: "grote-markt" },
    { type: "image", id: "park2" },
    { type: "image", id: "rio3" },
    { type: "image", id: "athenian-graffiti" },
    { type: "image", id: "salvador12" },
    { type: "image", id: "blueLionMural" },
  ],
};
