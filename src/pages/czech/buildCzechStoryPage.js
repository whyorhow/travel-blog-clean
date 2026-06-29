import { cloudinaryImageUrl } from "../../utils/cloudinary";

export function makeCzechImg(catalog) {
  return function img(id, alt, caption) {
    const entry =
      catalog.find((i) => i.id === id) ??
      catalog.find((i) => i.id === id.replace(/-czech-\d+$/, ""));
    if (!entry?.cloudinary?.blog) return null;
    return {
      src: entry.cloudinary.blog,
      lightboxSrc: entry.cloudinary.blog,
      alt: alt || entry.altText || entry.title,
      ...(caption ? { caption } : {}),
    };
  };
}

export function buildGalleryImages(storyImages) {
  return storyImages.map((entry) => ({
    src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(entry.cloudinary.blog, { width: 1600 }),
    fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
    alt: entry.altText || entry.title,
    title: entry.title,
    description: entry.description,
    imageId: entry.id,
    category: entry.category,
  }));
}

export function buildKutnaHoraSection(images, img, options = {}) {
  const {
    paragraphs = [
      "An hour east of Prague, the Sedlec Ossuary offers a striking contrast to the capital. Where Prague celebrates centuries of history above ground, Kutná Hora preserves it in a far more unusual form. We visited briefly, folding the journey into our final days in the Czech Republic.",
    ],
    titledCaptions = false,
  } = options;

  if (!images.length) return [];

  const caption = (entry) =>
    entry.description
      ? titledCaptions
        ? `${entry.title} — ${entry.description}`
        : entry.description
      : null;

  const blocks = [
    { type: "heading", heading: "A Short Journey to Kutná Hora" },
    ...paragraphs.map((paragraph) => ({ type: "prose", paragraph })),
  ];

  if (images.length >= 1) {
    blocks.push({
      layout: "cinematic",
      image: img(images[0].id),
      paragraph: caption(images[0]),
    });
  }

  if (images.length >= 3) {
    blocks.push({
      layout: "diptych",
      image: img(images[1].id),
      imageB: img(images[2].id),
      paragraph: caption(images[2]),
    });
  } else if (images.length === 2) {
    blocks.push({
      layout: "cinematic",
      image: img(images[1].id),
      paragraph: caption(images[1]),
    });
  }

  return blocks;
}

export function buildNarrativesFromCatalog(images, img, heading, options = {}) {
  const { sectionProse, titledCaptions = false } = options;
  const blocks = [{ type: "heading", heading }];
  if (sectionProse) {
    blocks.push({ type: "prose", paragraph: sectionProse });
  }
  const layoutCycle = ["cinematic", "split", "full"];

  for (let i = 0; i < images.length; i += 1) {
    const entry = images[i];
    const next = images[i + 1];
    const layout = layoutCycle[i % layoutCycle.length];
    const paragraph = entry.description
      ? titledCaptions
        ? `${entry.title} — ${entry.description}`
        : entry.description
      : null;

    if (layout === "split" && next) {
      blocks.push({
        layout: "diptych",
        image: img(entry.id),
        imageB: img(next.id),
        paragraph: null,
      });
      i += 1;
      continue;
    }

    blocks.push({
      layout,
      image: img(entry.id),
      paragraph,
    });
  }

  return blocks;
}
