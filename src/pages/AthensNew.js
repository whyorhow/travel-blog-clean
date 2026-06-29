import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import athensImages from "../assets/artImages/slices/story/greece-athens.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from '../assets/Backgrounds/Beige-Wall-Grunge-Cracked.webp';
import { hasAthensStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = (id) => {
  const entry = athensImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, alt: entry.title };
};

const galleryImages = athensImages.map(entry => ({
  src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
  image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
  fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
  alt: entry.title,
  title: entry.title,
  description: entry.description,
  imageId: entry.id,
}));

const locationData = {
  name: 'Athens',
  seo: {
    title: SEO_TITLES["/greece/athens"],
    description:
      'Exploring Athens through the Acropolis, quiet neighbourhoods, hidden chapels, local bakeries, and the nearby coast.',
  },
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'The Acropolis is almost always somewhere above you.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Across Europe',
    title: 'Budapest',
    tagline: 'From the Acropolis to the Danube — bridges, bathhouses, and another capital built around history.',
    path: '/hungary/budapest',
    image: 'Hungary/Budapest/Small/Danube River',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 15,
    type: 'single-image-pause',
    image: img('orange-trees'),
    caption: 'Winter oranges hanging over the pavement became part of each morning\'s walk.',
  },
  doThisAgainBlock(
    "We'd spend more time below the Acropolis than on top of it. The bakeries, neighbourhood streets, cafés, and small churches became just as memorable as the ancient sites. We'd leave the map in our pocket and wander until something caught our attention.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The Bakery Near the Acropolis',
    text: [
      'Bread came out of the oven throughout the day.',
      'We kept returning because it was close, it smelled incredible, and the loaves were still warm when they were handed across the counter.',
    ],
    image: img('crusty-greek-bread'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-cafe',
    title: 'Kotili Café',
    text: [
      'A small café tucked away from the busiest streets.',
      'The owner would sit with us whenever business slowed, trading bits of English for bits of Greek while the afternoon passed outside.',
    ],
    image: img('kotili-cafe'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'divider-image',
    image: img('acropolis-view'),
    caption: 'The route that always led us back uphill.',
    compact: true,
  },
];

const rhythmInserts = [];
rhythmInserts[0] = 'The Acropolis is at its quietest first thing in the morning. Go early if you can.';
rhythmInserts[3] = 'Fresh bread rarely stayed in the bag for long.';

function AthensNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="greece"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroImage={{ src: cloudinaryImageUrl('Assets/Diary Athens'), alt: 'Athens diary' }}
      skipHero={hasAthensStaticHero() && isMobileViewport()}
      heroFallbackSrc={cloudinaryImageUrl('Greece/Athens/Athens-backup', { width: 1600 })}
      heroObjectFit="contain"
      heroPageData={{ title: 'Athens', subtitle: 'Greece · Ancient & Alive' }}
      intro={{
        paragraphs: [
          'Athens never felt like a city frozen in the past.',
          'Ancient stone stands above apartment blocks, cafés fill streets beneath the Acropolis, and ordinary neighbourhoods continue around places that have been here for thousands of years.',
          'We climbed to the Acropolis early, wandered through markets and side streets, found small chapels tucked between houses, and escaped to the coast whenever the city became too warm. Those are the moments that stay with us most.',
        ],
      }}
      rhythmInserts={rhythmInserts}
      narratives={[
        { type: 'heading', heading: 'Where It Starts to Make Sense' },
        {
          layout: 'cinematic',
          image: img('acropolis-hill'),
          paragraph: 'Standing above the city as the first light reached the marble.',
        },
        {
          layout: 'diptych',
          image: img('acropolis-view'),
          imageB: img('temple-of-hephaestus'),
          paragraph: null,
        },

        { type: 'heading', heading: "What's Been Left Behind" },
        {
          layout: 'cinematic',
          image: img('arch-of-hadrian'),
          paragraph: 'Greek and Roman stone standing only a short walk apart.',
        },
        {
          layout: 'diptych',
          image: img('hadrians-library'),
          imageB: img('roman-columns'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('zappeion-building'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Where the City Opens Out' },
        {
          layout: 'cinematic',
          image: img('aegina-beach'),
          paragraph: 'A change from marble and streets to sea and open coastline.',
        },
        {
          layout: 'diptych',
          image: img('loutraki-beach'),
          imageB: img('loutraki-view'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('wooden-pier'),
          imageB: img('turtle-pond'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Everyday Athens' },
        {
          layout: 'cinematic',
          image: img('athenian-sunset'),
          paragraph: 'Warm stone, neighbourhood bakeries, cafés, and evenings spent outside.',
        },

        { type: 'heading', heading: 'Quiet Corners That Stayed With Us' },
        {
          layout: 'cinematic',
          image: img('chapel-at-heraion'),
          paragraph: 'Small chapels on hillsides, beside the coast, and tucked into neighbourhood streets.',
        },
        {
          layout: 'diptych',
          image: img('chapel-ypanema-heraion'),
          imageB: img('church-transfiguration'),
          paragraph: null,
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="When we think about Athens, it isn't one monument that comes back first. It's warm bread wrapped in paper, orange trees beside the pavement, narrow streets climbing towards the Acropolis, and marble catching the last light of the day."
      returnLink={{ label: 'Return to Greece', path: '/greece' }}
    />
  );
}

export default AthensNew;
