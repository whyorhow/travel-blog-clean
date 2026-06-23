import { cloudinaryImageUrl } from "../../utils/cloudinary";

const GALLERY_CONTEXT = {
  "Imperial Palaces & Gardens": "Grandeur here is not reserved for museums — it spills into gardens, gravel paths, and rose beds.",
  "City Centre Landmarks": "The city keeps its ornamentation at eye level as much as on the skyline.",
  "Imperial Libraries": "Knowledge stored as architecture — shelves, globes, and frescoed ceilings in the same breath.",
  "Viennese Café Culture": "Coffee here is less a drink than a permission to stay seated.",
  "Sound of Music Trail": "The film left its footprints — but the meadows and fortresses outlast the soundtrack.",
  "Old Town Architecture & Landmarks": "Baroque façades stacked against a rock face that refuses to be ignored.",
  "St. Peter's Cemetery & Catacombs": "The quietest parts of Salzburg are carved directly into the mountain.",
  "Krimml Waterfalls": "Europe's highest falls do not whisper. The forest absorbs the noise and returns mist.",
  "Alpine Wilderness": "Scale shifts on the forest floor — moss, mushrooms, and beetles holding their own drama.",
  "Lake Attersee": "Turquoise water and summer stillness — a different pace from the cities.",
  "Forests & Trails": "Pine, granite, and chapel trails threading through valleys most visitors drive past.",
};

export function makeAustriaImg(catalog) {
  return function img(id, alt, caption) {
    const entry =
      catalog.find((i) => i.id === id) ??
      catalog.find((i) => i.id === id.replace(/-austria-\d+$/, ""));
    if (!entry?.cloudinary?.blog) return null;
    return {
      src: entry.cloudinary.blog,
      lightboxSrc: entry.cloudinary.lightbox,
      alt: alt || entry.altText || entry.title,
      ...(caption ? { caption } : {}),
    };
  };
}

export function buildGalleryImages(storyImages) {
  return storyImages.map((entry) => ({
    src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
    fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
    alt: entry.altText || entry.title,
    title: entry.title,
    description: entry.description,
    imageId: entry.id,
    category: entry.category,
    contextLine: GALLERY_CONTEXT[entry.category] || null,
  }));
}
