import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import rioImages from "../assets/artImages/slices/category/rio.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Grunge-Texture-Wall.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { rioHeroConfig } from './brazil/rio/rio.hero.config';
import RioJournalMap from '../components/RioJournalMap';
import { hasRioStaticHero, isMobileViewport } from '../utils/staticPageHero';

const img = (id, alt) => {
  const entry = rioImages.find((i) => i.id === id);
  if (!entry) return null;
  return {
    src: entry.cloudinary.blog,
    lightboxSrc: entry.cloudinary.lightbox,
    alt: alt || entry.title,
  };
};

const GALLERY_ORDER = ['rio1','rio2','rio3','rio4','rio5','rio6','rio7','rio8','rio9','rio10','rio11','rio12','rio13','rio14'];

const galleryImages = GALLERY_ORDER
  .map(id => rioImages.find(image => image.id === id))
  .filter(Boolean)
  .map(image => ({
    src: cloudinaryImageUrl(image.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(image.cloudinary.lightbox, { width: 1600 }),
    alt: image.title,
    imageId: image.id,
    title: image.title,
    description: image.description,
    sizeClass: image.id === 'rio1' ? 'wide' : image.id === 'rio9' ? 'tall' : 'small',
    theme: 'rio',
    energy: 'medium',
  }));

const locationData = {
  name: 'Rio de Janeiro',
  seo: {
    title: SEO_TITLES["/brazil/rio"],
    description: 'Rio de Janeiro: A city of granite, carnival, and sea, defined by its dramatic geography.',
  },
  coords: destinations.find(d => d.id === 'rio'),
  spatialContext: 'The city presses against the mountains, filling every flat space between forest and sea. Geography forces Rio upward rather than outward.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Rio never fully reveals itself. It offers moments — carnival, sunset, a view from a peak — and leaves the rest for you to find in the climb.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_JOURNAL_MAP,
    type: 'link-banner',
    eyebrow: 'Across the journey',
    title: 'Memphis',
    tagline: 'Where carnival spectacle meets a different kind of parade — blues, Beale Street, and river heat.',
    path: '/united-states/tennessee/memphis',
    image: 'United States/Tennessee/Memphis/Small/Illuminated Beale Street',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Carnival makes sense only at scale',
    text: 'From the stands the Sambadrome is overwhelming; from inside the parade it is labour, timing, and shared effort. If you go once, commit to understanding it as collective work — not just spectacle.',
    location: 'Sambódromo',
    image: img('rio3', 'A carnival float advancing down the avenue'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Look for the city pressed against stone',
    text: 'The most honest views of Rio are not the postcard ones — they are courtyards beneath rock faces, streets that end in forest, neighbourhoods stacked because flat land ran out.',
    location: 'Santa Teresa',
    image: img('rio6', 'Café tables beneath a towering rock face'),
    anchorId: 'santa-teresa',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Moments, not a checklist.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Morning on the beach',
    text: [
      'The shoreline fills gradually as the day begins — conversations slow, bodies stretch, the city exhales without fully stopping.',
      'We kept returning to the same stretch of sand not because it was the best beach in Brazil, but because it was where Rio\'s pace finally made sense.',
    ],
    image: img('rio13', 'Shade and colour overhead on the beach'),
    location: 'Ipanema',
    anchorId: 'ipanema',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Copacabana shoreline',
    text: 'The wide curve of sand and promenade where Rio\'s beach rhythm is easiest to read — football, vendors, and bodies slowing without anyone announcing that the day has changed pace.',
    image: img('rio14', 'Late afternoon on the promenade'),
    location: 'Copacabana',
    anchorId: 'copacabana',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Above the city, open-armed',
    subtitle: 'Corcovado at the edge of dusk',
    text: [
      'Christ the Redeemer is impossible to ignore and harder to photograph. What stays with you is the city below — layers of colour, noise, and heat spreading toward the sea.',
      'We went up once and spent most of the time looking past the statue, not at it.',
    ],
    image: img('rio9', 'Christ the Redeemer above Rio'),
    location: 'Corcovado',
    anchorId: 'christ-the-redeemer',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Selarón after dark',
    text: 'The tiled steps in Lapa fill after dark — people moving, pausing, gathering without urgency. It feels less like a landmark than a living room the whole city shares.',
    image: img('rio1', 'Escadaria Selarón at night'),
    location: 'Lapa',
    anchorId: 'lapa',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Sugarloaf from the water',
    text: 'Pão de Açúcar rises in two blunt granite blocks from the bay — less a viewpoint to conquer than a presence you keep circling back toward from the shoreline.',
    image: img('rio8', 'Rio geography from above'),
    location: 'Sugarloaf Mountain',
    anchorId: 'sugarloaf',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Rio from the helicopter',
    text: 'The tour we took looped past Corcovado at eye level — brief, costly, and impossible to forget. For a few minutes the city\'s vertical geography made sense all at once.',
    image: img('rio7', 'Evening light over Rio from above'),
    location: 'Helicopter tour',
    anchorId: 'helicopter',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our late-day loop',
    subtitle: 'Beach → promenade → fading light',
    text: 'We walked the promenade as the afternoon thinned — flip-flops left in sand, shade stretched overhead, the day slipping toward evening without anyone rushing it.',
    image: img('rio12', 'Flip-flops left behind in the sand'),
  },
];

function Rio() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="brazil"
      skipHero={hasRioStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={rioHeroConfig}
      heroPageData={{ title: 'Rio de Janeiro', subtitle: 'The Marvellous City' }}
      journalMap={<RioJournalMap />}
      intro={{
        paragraphs: [
          'Rio is a city defined by its geography. Mountains rise directly from the sea, leaving narrow bands of flat land where dense neighbourhoods cling to the coastline.',
          'The city breathes differently than others. Morning mist settles in the valleys. Afternoon sun bakes the granite peaks. Evening brings cool air from the ocean, carrying sound and music upward through the streets.',
          'Carnival transforms the entire city into performance space. But even without it, Rio carries that energy daily — in beach culture, in street life, in the way the city moves to its own rhythm.',
          'Christ the Redeemer watches from above, arms open to a city that sprawls beneath him in layers of colour, noise, and heat.',
        ],
      }}
      rhythmInserts={[
        "The city wakes beneath massive stone hills as early light skims across bare rock. In Rio, the landscape isn't a backdrop — it sets the limits and the mood.",
        'The beach marks a shift in pace. Conversations slow. Bodies stretch. The city exhales. In Rio, the shoreline isn\'t an escape; it\'s where daily life loosens without ever fully stopping.',
      ]}
      narratives={[
        {
          image: img('rio2', 'Carnival at the Sambadrome'),
          heading: 'Spectacle and Scale',
          paragraph: 'From the stands, the Sambadrome collapses into a dense field of light, sound, and movement. Each section performs with precision, but the scale of the crowd makes it clear that Carnival only works because it is shared. What looks overwhelming from a distance becomes cohesive only through collective effort.',
          anchorId: 'sambadrome',
        },
        {
          image: img('rio8', 'Rio geography from above'),
          heading: 'Pressed to the Mountain',
          paragraph: "Dense neighbourhoods climb the slopes between forest and sea, filling every available space. Rio's geography leaves little room for sprawl; instead, it layers daily life vertically, compressing homes, streets, and routines against the hills.",
        },
      ]}
      bridgeQuote="These fragments only sketch the surface. Beyond them, the city opens outward — toward Corcovado, toward the sea, and toward the island pause within reach."
      subsectionHeading="Beyond the city"
      exploreSectionId="rio-explore"
      sections={[
        {
          title: 'Ilha Grande',
          path: '/brazil/rio/ilha-grande',
          image: 'Brazil/IlhaGrande/Small/Ilha20new',
          imageAlt: 'Leaving Ilha Grande by boat',
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Rio never fully reveals itself. It offers moments — carnival, sunset, the view from a peak — and leaves the rest for you to discover in the climb."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: The Pantanal', path: '/brazil/pantanal' }}
    />
  );
}

export default Rio;
