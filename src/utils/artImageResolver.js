function normalizeArtSlice(slice, label) {
  if (Array.isArray(slice)) return slice;
  if (slice && Array.isArray(slice.default)) return slice.default;
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[mergeArtSlices] Expected an array${label ? ` for ${label}` : ""}, got ${slice === undefined ? "undefined" : typeof slice}. ` +
        "If slices were just regenerated, restart the dev server."
    );
  }
  return [];
}

/**
 * Merge art catalog slices (later slices override same id).
 */
export function mergeArtSlices(...slices) {
  const byId = new Map();
  for (const slice of slices) {
    const items = normalizeArtSlice(slice);
    for (const item of items) {
      if (item?.id) byId.set(item.id, item);
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
