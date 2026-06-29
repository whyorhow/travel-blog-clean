import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import antwerpImages from "../assets/artImages/slices/story/belgium-antwerp.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from '../assets/Backgrounds/Gray-Wall-Rough.webp';
import { hasAntwerpStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = (id) => {
  const entry = antwerpImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, alt: entry.title };
};

const galleryImages = antwerpImages.map(entry => ({
  src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
  image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
  fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
  alt: entry.title,
  title: entry.title,
  description: entry.description,
  imageId: entry.id,
}));

const locationData = {
  name: 'Antwerp',
  seo: {
    title: SEO_TITLES["/belgium/antwerp"],
    description: "A personal diary of Antwerp — medieval streets, chocolate shops, the Grote Markt, and a city that settles into you quietly.",
  },
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'late-night-thought',
    text: 'We arrived with almost no plan. That turned out to be the right amount of preparation.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Across Europe',
    title: 'Athens',
    tagline: 'From Flemish brick to Attic light — another city where history sits in the open air.',
    path: '/greece/athens',
    image: 'Greece/Athens/Small/Acropolis Hill.webp',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 9,
    type: 'local-tip',
    title: 'Let the chocolate find you',
    text: 'The best shops are rarely the loudest ones. Follow the smell of cocoa on a damp side street and trust your nose over any map pin.',
    location: 'Old town',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 9,
    type: 'favourite-place',
    title: 'The chocolate counter we kept returning to',
    text: [
      'We did not set out to become experts. We just kept walking past the same window, noticing new pralines each time, buying one more than we meant to.',
      'It became a quiet reward at the end of long wandering days — not a spectacle, just something sweet and familiar.',
    ],
    image: img('chocolate-shop'),
  },
  doThisAgainBlock(
    "We'd wander without a plan and trust we'd find our way back to the Markt. We'd follow the smell of chocolate on damp side streets rather than hunting for the loudest shopfront — and we'd walk the same cobbled loop until it felt like a path we already knew.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our default loop',
    subtitle: 'Grote Markt → side streets → Scheldt',
    text: 'No map, just repetition until the cobblestones felt like a path we already knew. We must have walked this loop half a dozen times without tiring of it.',
    image: img('grote-markt'),
    images: [img('cobblestone-street'), img('grote-markt')],
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'quote-card',
    quote: 'Antwerp rewards people who wander without a plan. The streets do the work.',
  },
];

function AntwerpNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="belgium"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroImage={{ src: cloudinaryImageUrl('Assets/Diary Antwerp'), alt: 'Antwerp diary' }}
      skipHero={hasAntwerpStaticHero() && isMobileViewport()}
      heroFallbackSrc={cloudinaryImageUrl('Belgium/Antwerp/antwerp-backup', { width: 1600 })}
      heroObjectFit="contain"
      heroPageData={{ title: 'Antwerp', subtitle: 'Belgium · Quietly Exceptional' }}
      intro={{
        paragraphs: [
          "We didn't have much planned when we arrived in Antwerp. It was more of a stop than a destination.",
          "But it settled into us quickly. We spent most of our time just wandering — through quiet streets, past old stone buildings, stopping when something caught our attention.",
          "There wasn't any pressure to see everything, which made it easier to actually enjoy what we did see. It's an easy place to slow down without trying.",
        ],
      }}
      rhythmInserts={[
        "The chocolate shops are not optional. Commit to this early.",
        "Antwerp rewards people who wander without a plan. The streets do the work.",
      ]}
      narratives={[
        { type: 'heading', heading: 'Cathedral of Our Lady & the Grote Markt' },
        {
          layout: 'cinematic',
          image: img('cathedral-of-our-lady'),
          paragraph: "We kept finding ourselves back near the Cathedral of Our Lady — its soaring towers always drew our gaze, no matter which street we wandered down. The Grote Markt nearby felt alive and timeless, with the Brabo Statue standing quietly in the middle.",
        },
        {
          layout: 'diptych',
          image: img('brabo-statue'),
          imageB: img('grote-markt'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Historic Streets & Towers' },
        {
          layout: 'split',
          image: img('historic-brick-buildings'),
          paragraph: "The old town hides quiet corners. Walking down cobblestone streets past medieval towers and stone bridges felt like slipping back in time. We lingered, imagining the stories held in the bricks.",
        },
        {
          layout: 'diptych',
          image: img('cobblestone-street'),
          imageB: img('historic-stone-bridge'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('medieval-tower'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Markets & Food' },
        {
          layout: 'split',
          image: img('flower-market'),
          paragraph: "We drifted through the markets and food streets, drawn by smells and colours more than anything else. The chocolate shops and flower market seemed to invite us to pause, taste, and just watch the city breathe.",
        },
        {
          layout: 'diptych',
          image: img('confectionery-shop'),
          imageB: img('chocolate-shop'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('outdoor-market'),
          imageB: img('seafood-restaurant'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Modern & Quirky Architecture' },
        {
          layout: 'diptych',
          image: img('zaha-hadid-port-house'),
          imageB: img('centraal-railway-station'),
          paragraph: "The Port House by Zaha Hadid and the central station stunned us in very different ways — one futuristic, one monumental. Both made us stop, look up, and feel small in a good way.",
        },

        { type: 'heading', heading: 'Evening & Light' },
        {
          layout: 'cinematic',
          image: img('evening-glow'),
          paragraph: "Evenings in Antwerp were quiet revelations. The city seemed to glow differently as the sun set, statues and castles caught in amber light. Wandering felt endless but never tiring.",
        },
        {
          layout: 'diptych',
          image: img('lange-wapper-statue'),
          imageB: img('het-steen-castle'),
          paragraph: null,
        },
      ]}
      bridgeQuote="Antwerp doesn't try to impress you. It just quietly gets under your skin — and by the time you notice, you don't want to leave."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Antwerp stays with you as a feeling more than a list of sights. The cobblestones, the cathedral light, the praline you bought on the way somewhere else. It was more than a stop."
      returnLink={{ label: 'Return to Belgium', path: '/belgium' }}
    />
  );
}

export default AntwerpNew;
