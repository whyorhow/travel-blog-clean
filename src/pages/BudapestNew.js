import React from "react";
import { LightTemplate } from "./templates";
import budapestImages from "../assets/artImages/slices/story/hungary-budapest.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from '../assets/Backgrounds/Dirty-Wall-Texture.webp';

const img = (id) => {
  const entry = budapestImages.find(i => i.id === id);
  if (!entry) return null;
  const blogSrc = entry.cloudinary.blog;
  const gallerySrc = entry.cloudinary.gallery?.replace(/\/z([^/]+)$/, '/$1');
  const src = blogSrc.includes('(') ? gallerySrc || blogSrc : blogSrc;
  return { src, alt: entry.title };
};

const galleryImages = budapestImages.map(entry => ({
  src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
  image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
  fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
  alt: entry.title,
  title: entry.title,
  description: entry.description,
  imageId: entry.id,
}));

const locationData = {
  name: 'Budapest',
  seo: {
    title: 'Budapest | Nomad Scribbles',
    description: "A personal diary of Budapest — grand architecture, thermal baths, Danube views, and the quiet spaces that reveal the city's true rhythm.",
  },
};

function BudapestNew() {
  return (
    <LightTemplate
      variant="immersive"
      locationData={locationData}
      heroImage={{ src: cloudinaryImageUrl('Assets/Diary Budapest'), alt: 'Budapest diary' }}
      heroFallbackSrc={cloudinaryImageUrl('Hungary/Budapest/Budapest-backup', { width: 1600 })}
      heroObjectFit="contain"
      heroPageData={{ title: 'Budapest', subtitle: 'Hungary · Grand & Quiet' }}
      intro={{
        paragraphs: [
          "Budapest feels structured and expansive, where grand architecture defines the first impression and smaller details slowly emerge underneath.",
          "It announces itself with wide squares and soaring monuments, then reveals a quieter side — weathered doors, thermal baths, and gardens that time seems to have forgotten.",
        ],
      }}
      rhythmInserts={[
        "The Széchenyi Baths at dusk, when the crowds thin and the water turns amber — that's the real version.",
        "Budapest rewards the people who slow down enough to notice what's between the monuments.",
      ]}
      narratives={[
        { type: 'heading', heading: 'First Impressions' },
        {
          layout: 'cinematic',
          image: img('heroes-square'),
          paragraph: "Budapest announces itself with grand gestures — Heroes' Square stretching wide, the Millennium Monument reaching skyward, and Vajdahunyad Castle standing as a testament to Hungarian history. These first impressions set the tone: structured, impressive, and impossible to overlook.",
        },
        {
          layout: 'diptych',
          image: img('millennium-monument'),
          imageB: img('vajdahunyad-castle'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('entrance-to-vajdahunyad-castle'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Closer Look' },
        {
          layout: 'split',
          image: img('jak-chapel'),
          paragraph: "Moving closer reveals the details — the intricate Romanesque facade of Ják Chapel, the weathered elegance of historic buildings, and the quiet dignity of statues that have watched over the city for generations.",
        },
        {
          layout: 'diptych',
          image: img('historic-building-szondi'),
          imageB: img('yellow-weathered-door'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('count-sandor-karolyi-statue'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Taking It Slower' },
        {
          layout: 'split',
          image: img('danube-river'),
          paragraph: "Sometimes the best moments come when you stop trying to see everything. The Danube flowing slowly, the warmth of Széchenyi Baths, the quiet corners of cafés where writers once gathered, and gardens that time forgot.",
        },
        {
          layout: 'diptych',
          image: img('outside-szechenyi-baths'),
          imageB: img('szechenyi-thermal-baths'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('new-york-cafe'),
          imageB: img('cafe-balcony'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('mulberry-garden-epreskert'),
          paragraph: null,
        },
      ]}
      bridgeQuote="Budapest doesn't give itself away quickly. It keeps its best parts for the people who stay long enough to find them."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Budapest stays with you as a quality of light — the late afternoon gold on the Danube, the amber glow of a café window. You leave with the feeling that you've only just started to understand it."
      returnLink={{ label: 'Return to Hungary', path: '/hungary' }}
    />
  );
}

export default BudapestNew;
