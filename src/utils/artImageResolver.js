/**
 * Merge art catalog slices (later slices override same id).
 */
export function mergeArtSlices(...slices) {
  const byId = new Map();
  for (const slice of slices) {
    for (const item of slice) {
      byId.set(item.id, item);
    }
  }
  return [...byId.values()];
}

export function makeImgResolver(catalog) {
  return function img(id, alt, caption) {
    const entry = catalog.find((i) => i.id === id);
    if (!entry?.cloudinary?.blog) return null;
    return {
      src: entry.cloudinary.blog,
      lightboxSrc: entry.cloudinary.lightbox,
      alt: alt || entry.title,
      ...(caption ? { caption } : {}),
    };
  };
}
