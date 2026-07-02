import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
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
    text: 'We arrived with almost no plan. The map stayed folded in a jacket pocket the entire week.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Across Europe',
    title: 'Budapest',
    tagline: 'Next: Heroes\' Square, steam above Széchenyi, and evenings when the Danube turned amber.',
    path: '/hungary/budapest',
    image: 'Hungary/Budapest/Budapest-backup',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 23,
    type: 'local-tip',
    title: 'Let the chocolate find you',
    text: 'The best chocolate shops were rarely the ones with queues outside. Follow the smell of cocoa down quieter streets and trust your nose more than your phone.',
    location: 'Old town',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 23,
    type: 'favourite-place',
    title: 'The Chocolate Counter We Kept Returning To',
    text: [
      'We kept walking past the same little window, noticing new pralines each time and buying one more than we\'d planned.',
      'On the fourth afternoon we bought the same dark praline again — the woman behind the counter had already started wrapping it before we pointed.',
    ],
    image: img('chocolate-shop'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
    type: 'do-this-again',
    text: [
      'We wouldn\'t change how little we planned.',
      'We\'d still walk from the Grote Markt to the Scheldt without a fixed route, and turn down whichever side street looked interesting.',
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our Default Loop',
    subtitle: 'Grote Markt → side streets → Scheldt',
    text: 'Just repetition until the cobblestones began to feel familiar — the same loop half a dozen times, never quite the same route twice.',
    image: img('grote-markt'),
    images: [img('cobblestone-street'), img('grote-markt')],
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'quote-card',
    quote: 'We left with no clear list of what we had seen.',
  },
];

const rhythmInserts = [];
rhythmInserts[0] = 'Cocoa on a side street off the Grote Markt before the outdoor stalls had fully opened.';
rhythmInserts[11] = 'Cobblestones we had walked twice already — still not sure of the street name.';

function AntwerpNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="belgium"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroImage={{
        src: cloudinaryImageUrl('Belgium/Antwerp/antwerp-backup', { width: 1600 }),
        alt: 'Antwerp',
      }}
      skipHero={hasAntwerpStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Antwerp', subtitle: 'Belgium · Quietly Exceptional' }}
      intro={{
        paragraphs: [
          'We arrived at Centraal Station with no fixed plan. Cobblestones, tram wires, and the smell of coffee from a corner café. Within ten minutes we had turned down a side street and lost sight of the main road.',
          'The Cathedral of Our Lady appeared above the rooftops before we found it on the map. One street became another — brick façades, narrow canals, flower stalls — and we kept walking without deciding where to stop.',
        ],
      }}
      rhythmInserts={rhythmInserts}
      narratives={[
        { type: 'heading', heading: 'Every Street Led Somewhere' },
        {
          type: 'prose',
          paragraph:
            'We started walking each morning without a destination. Brick turned to cobblestone, canals appeared between buildings, and the light changed on the gables as we moved east or west.',
        },
        {
          type: 'prose',
          paragraph:
            'Sooner or later we ended up at the Grote Markt — cyclists weaving past market stalls. We paused there, bought coffee, and walked on.',
        },
        {
          layout: 'cinematic',
          image: img('cathedral-of-our-lady'),
          paragraph: 'Brabo and the guild houses from the centre of the square.',
        },
        {
          layout: 'diptych',
          image: img('brabo-statue'),
          imageB: img('grote-markt'),
          paragraph: null,
        },

        { type: 'heading', heading: 'The Joy of Getting Slightly Lost' },
        {
          type: 'prose',
          paragraph:
            'A quiet corner of weathered brick, a stone bridge over a narrow canal, a medieval tower visible between rooftops.',
        },
        {
          type: 'prose',
          paragraph:
            'We crossed small bridges, stopped at shop windows, and turned back when a street ended at the water. A cyclist passed on cobblestones. An old man carried bags from the outdoor market. We had no route and no hurry.',
        },
        {
          layout: 'split',
          image: img('historic-brick-buildings'),
          paragraph: null,
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

        { type: 'heading', heading: 'Following the Smell of Chocolate' },
        {
          type: 'prose',
          paragraph:
            'It became hard to walk quickly. Every few streets there was another bakery, chocolate counter, or flower stall. Vendors called to each other across the outdoor market. Seafood sat on ice behind glass. We bought pralines we had not planned for, lingered at a flower stall, and kept walking.',
        },
        {
          layout: 'split',
          image: img('flower-market'),
          paragraph: null,
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

        { type: 'heading', heading: 'Old Foundations, New Ideas' },
        {
          type: 'prose',
          paragraph:
            "We stopped twice where old and new sat side by side. The Port House by Zaha Hadid — glass and steel on top of a historic brick base. Centraal Station's iron and glass roof rising above the platforms. Both made us stand still and look up.",
        },
        {
          layout: 'diptych',
          image: img('zaha-hadid-port-house'),
          imageB: img('centraal-railway-station'),
          paragraph: null,
        },

        { type: 'heading', heading: 'After Dark' },
        {
          type: 'prose',
          paragraph:
            'By evening we had usually walked all day without a fixed route. Street lamps reflected on wet cobblestones after rain. Het Steen and the Lange Wapper statue lit from below. Fewer cyclists, more footsteps.',
        },
        {
          layout: 'cinematic',
          image: img('evening-glow'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('het-steen-castle'),
          imageB: img('lange-wapper-statue'),
          paragraph: null,
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose={[
        'Wet cobblestones under street lamps. Tram wires above a street we had walked six times without naming.',
      ]}
      returnLink={{ label: 'Return to Belgium', path: '/belgium' }}
    />
  );
}

export default AntwerpNew;
