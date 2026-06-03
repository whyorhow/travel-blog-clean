import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
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
    title: SEO_TITLES["/hungary/budapest"],
    description: "A personal diary of Budapest — grand architecture, thermal baths, Danube views, and the quiet spaces that reveal the city's true rhythm.",
  },
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Budapest announces itself in marble and steam. The quieter version only appears once you stop keeping pace with the monuments.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Across Europe',
    title: 'Athens',
    tagline: 'From Danube steam to Attic light — temples, chapels, and a city that whispers before it explains.',
    path: '/greece/athens',
    image: 'Greece/Athens/Small/Acropolis Hill.webp',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 10,
    type: 'local-tip',
    title: 'Go when the steam shows',
    text: 'The Széchenyi Baths at dusk, when the crowds thin and the water turns amber — that is the version worth planning around. Midday feels impressive; evening feels like the city exhaling.',
    location: 'City Park',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Not recommendations — just the places that became part of the rhythm.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Evenings at Széchenyi',
    text: [
      'We did not treat the baths as a one-time spectacle. The Neo-Baroque facade looks almost theatrical in daylight; in the evening, when steam rises off the outdoor pools, it feels less like a landmark and more like a ritual.',
      'We kept returning at the end of long walking days — the warmth, the murmur of conversation in Hungarian and half a dozen other languages, the sense that time had slowed to the speed of water.',
    ],
    image: img('szechenyi-thermal-baths'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-cafe',
    title: 'Afternoons at the New York Café',
    text: [
      'The New York Café is impossible to ignore — gilded ceilings, mirrors everywhere, the kind of room that makes you sit up straighter without meaning to.',
      'We went once for the spectacle and started calculating whether we could justify going back. We did. Not every day, but enough that it became a small reward at the end of cold afternoons.',
    ],
    image: img('new-york-cafe'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The garden time forgot',
    subtitle: 'Mulberry Garden · Epreskert',
    text: [
      'The Mulberry Garden felt like stumbling into someone\'s unfinished thought — statues half-hidden by ivy, paths that do not quite lead anywhere, a quiet that has nothing to prove.',
      'We stayed longer than we expected because it did not feel like it was performing for anyone. One of those places you find by accident and hesitate to describe too precisely afterward.',
    ],
    image: img('mulberry-garden-epreskert'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our slow loop along the Danube',
    subtitle: 'Chain Bridge → embankment → nothing in particular',
    text: 'No map, just the river on one side and the city folding into itself on the other. We walked this stretch more than once — always at the wrong hour to be efficient, which turned out to be the right hour to notice anything.',
    image: img('danube-river'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'divider-image',
    image: img('yellow-weathered-door'),
    caption: 'A yellow door on a side street — one of those details that stays after the monuments blur together.',
    compact: true,
  },
];

function BudapestNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="hungary"
      editorialBlocks={editorialBlocks}
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
