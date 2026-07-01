import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
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
    afterNarrativeIndex: 28,
    type: 'single-image-pause',
    image: img('orange-trees'),
    caption: 'Winter oranges hanging over the pavement became part of each morning\'s walk.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
    type: 'do-this-again',
    text: [
      'We\'d spend more time below the Acropolis than on top of it.',
      'The bakeries, neighbourhood streets, cafés and tiny churches became just as memorable as the ancient monuments. We\'d leave the map in our pocket, wander without much of a plan, and follow whatever caught our attention next. Athens rewards curiosity far more than ticking off a list of famous sights.',
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The Bakery Near the Acropolis',
    text: [
      'Bread came out of the oven throughout the day.',
      'We kept returning because it was close, the smell drifted into the street long before we reached the door, and the loaves were still warm when they were handed across the counter.',
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
      'We arrived as customers and left feeling more like familiar faces.',
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
rhythmInserts[5] = 'The Acropolis is at its quietest first thing in the morning. Go early if you can.';
rhythmInserts[11] = 'Fresh bread rarely stayed in the bag for long.';

function AthensNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="greece"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroImage={{
        src: cloudinaryImageUrl('Greece/Athens/Athens-backup', { width: 1600 }),
        alt: 'Athens',
      }}
      skipHero={hasAthensStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Athens', subtitle: 'Greece · Ancient & Alive' }}
      intro={{
        paragraphs: [
          'Athens never felt like a city frozen in the past.',
          'Ancient stone rises above apartment blocks, cafés spill into streets beneath the Acropolis, and ordinary neighbourhoods carry on around places that have stood here for thousands of years.',
          'We climbed to the Acropolis early, wandered through markets and side streets, found small chapels tucked between houses, and escaped to the coast whenever the city became too warm. Those are the moments that stayed with us most.',
        ],
      }}
      rhythmInserts={rhythmInserts}
      narratives={[
        { type: 'heading', heading: 'Where It Starts to Make Sense' },
        {
          type: 'prose',
          paragraph:
            'We reached the Acropolis while the city was still waking. Before the crowds arrived, the marble carried a soft golden light and the hill felt strangely peaceful. Looking out across Athens, the city stretched endlessly in every direction, interrupted only by church domes, distant hills and the occasional splash of green. It was the first moment the scale of Athens really made sense to us.',
        },
        {
          type: 'prose',
          paragraph:
            'Standing among ruins that have watched over the city for more than two thousand years is difficult to describe. The monuments are extraordinary, but what stayed with us was the contrast. Ancient temples stood above cafés opening for breakfast, commuters walked beneath columns older than entire countries, and life simply continued around them.',
        },
        {
          layout: 'cinematic',
          image: img('acropolis-hill'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('acropolis-view'),
          imageB: img('temple-of-hephaestus'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Where History Overlaps' },
        {
          type: 'prose',
          paragraph:
            'One of the things we loved most about Athens was how naturally different periods of history blended together. Greek temples stood only a short walk from Roman monuments, nineteenth-century buildings overlooked archaeological sites, and ordinary streets passed effortlessly between them all. Nothing felt separated into neat chapters. Instead, Athens felt like a city that had simply kept growing for thousands of years.',
        },
        {
          type: 'prose',
          paragraph:
            'Every turn revealed another reminder that history here isn\'t hidden behind museum glass. It sits beside cafés, apartment buildings and busy roads, becoming part of everyday life rather than something preserved at a distance.',
        },
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
          type: 'prose',
          paragraph:
            'After several days surrounded by marble, narrow streets and ancient hillsides, we found ourselves drawn towards the sea. It didn\'t take long before Athens gave way to quieter landscapes where ruined sanctuaries overlooked turquoise coves, pine trees leaned towards the water, and the pace of the day slowed completely.',
        },
        {
          type: 'prose',
          paragraph:
            'The contrast made us appreciate both sides of the journey even more. Athens offered history on an enormous scale, while the coastline reminded us how quickly Greece can become peaceful once you leave the city behind.',
        },
        {
          layout: 'cinematic',
          image: img('aegina-beach'),
          paragraph: 'A change from marble and streets to sea and open coastline.',
        },
        {
          layout: 'cinematic',
          image: img('sanctuary-of-hera-at-perachora'),
          paragraph: 'Stone foundations beside a cove where the water stays pale turquoise even in the shade.',
        },
        {
          layout: 'diptych',
          image: img('the-corinth-canal'),
          imageB: img('acrocorinth-mountain-slopes'),
          paragraph: null,
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
          type: 'prose',
          paragraph:
            'Some of our favourite memories had nothing to do with famous landmarks. They came from neighbourhood bakeries where warm bread barely made it back before we started eating it, long lunches that drifted into the afternoon, and cafés where nobody seemed to be in much of a hurry.',
        },
        {
          type: 'prose',
          paragraph:
            'Those ordinary moments quietly became some of the most memorable. Between visits to ancient sites, Athens felt wonderfully lived in—a city where everyday routines unfolded beneath one of the world\'s most recognisable skylines.',
        },
        {
          layout: 'diptych',
          image: img('traditional-greek-lunch-spread'),
          imageB: img('crusty-greek-bread'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('athenian-sunset'),
          paragraph: 'Warm stone, neighbourhood bakeries, cafés, and evenings spent outside.',
        },

        { type: 'heading', heading: 'Quiet Corners That Stayed With Us' },
        {
          type: 'prose',
          paragraph:
            'Not every memorable place appeared on our itinerary. Some were simply discovered while wandering.',
        },
        {
          type: 'prose',
          paragraph:
            'Small white chapels appeared beside coastal roads, tucked into residential streets or perched quietly above the sea. They offered moments of stillness between busier days, reminding us that Greece isn\'t only defined by its famous ruins. Sometimes the places we remember most are the ones we never planned to find.',
        },
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
      reflectiveClose={[
        'When we think about Athens, it isn\'t one monument that comes back first.',
        'It\'s warm bread wrapped in paper, orange trees hanging over the pavement, quiet conversations in neighbourhood cafés, narrow streets climbing towards the Acropolis, and marble catching the last light of the day.',
        'Athens wears its history lightly. It doesn\'t ask you to admire it—it simply gets on with life beneath it. That\'s the version of the city we\'ll remember.',
      ]}
      returnLink={{ label: 'Return to Greece', path: '/greece' }}
    />
  );
}

export default AthensNew;
