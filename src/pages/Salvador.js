import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import salvadorImages from "../assets/artImages/slices/category/salvador.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Beige-Wall-Grunge-Cracked.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { salvadorHeroConfig } from './brazil/salvador/salvador.hero.config';

const img = (id, alt) => {
  const entry = salvadorImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const GALLERY_ORDER = Array.from({ length: 22 }, (_, i) => `salvador${i + 1}`);

const galleryImages = GALLERY_ORDER
  .map(id => salvadorImages.find(image => image.id === id))
  .filter(Boolean)
  .map(image => ({
    src: cloudinaryImageUrl(image.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(image.cloudinary.lightbox, { width: 1600 }),
    alt: image.title,
    imageId: image.id,
    title: image.title,
    description: image.description,
    sizeClass: 'small',
    theme: 'salvador',
    energy: 'high',
  }));

const locationData = {
  name: 'Salvador',
  seo: {
    title: 'Salvador Brazil Travel Guide: Bahia Culture, History & Coast',
    description: 'Salvador: A city where history moves, sings, resists, and remembers.',
  },
  coords: destinations.find(d => d.id === 'salvador'),
  spatialContext: 'On the coast of Bahia — where Brazil\'s African heritage is most visibly, loudly, and deliberately present.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Salvador does not ask you to decode it from a distance. Colour, drum, and ritual meet you in the street — and paying attention is part of the exchange.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Brazil',
    title: 'Rio de Janeiro',
    tagline: 'From Bahia\'s rhythm to Rio\'s coast — carnival, granite, and neighbourhoods pressed between forest and sea.',
    path: '/brazil/rio',
    image: 'Brazil/Rio/small/Rio9.webp',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Follow the elevation',
    text: 'Pelourinho is experienced in climbs and glimpses — ocean between rooftops, courtyards opening without warning. Walk slowly upward and let the city reveal itself in fragments rather than one panoramic view.',
    location: 'Pelourinho',
    image: img('salvador12', 'An alley between worn walls'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Tie a ribbon, then step back',
    text: 'At Senhor do Bonfim the coloured ribbons are wishes, not souvenirs — tie three knots, leave space for others, and let the gate do the remembering. The ritual works best when you are not the only one at the rail.',
    location: 'Igreja do Bonfim',
    image: img('salvador6', 'Coloured ribbons on iron gates'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Samba without a stage',
    text: 'Some of the truest rhythm in Salvador happens on the pavement — a circle of players, no ticket, no separation. Stand at the edge long enough and the street becomes the venue.',
    location: 'Historic centre streets',
    image: img('salvador4', 'Samba group playing in the street'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 3,
    type: 'local-tip',
    title: 'Let the coast reset the pace',
    text: 'Hand-painted signs point toward shade and water without urgency. The beaches are not an escape from Salvador — they are how the city exhales after the density uphill.',
    location: 'Barra / coastline',
    image: img('salvador16', 'Shoreline signs toward shade and water'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Rhythm, colour, and presence.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Pelourinho in layers',
    text: [
      'The historic centre rises in blocks shaped by elevation — churches, homes, and public space pressed together, still lived in rather than sealed behind glass.',
      'We kept returning at different hours: morning quiet, afternoon heat, night when paint held its colour under uneven lamps.',
    ],
    image: img('salvador2', 'Pelourinho from above'),
    location: 'Pelourinho',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Facades after dark',
    text: 'Painted walls lit by street lamps and passing movement — the city does not switch off when tourism thins. Night in Salvador feels like continuation, not closure.',
    image: img('salvador21', 'Colonial facades at night'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our uphill loop',
    subtitle: 'Square → alley → descent toward the sea',
    text: 'We walked the same rise each day: church square as anchor, narrow alleys for shade and echo, then down toward water where boats sat close enough to swim to and far enough to feel like another world.',
    image: img('salvador5', 'Church square in Salvador'),
  },
];

function Salvador() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={salvadorHeroConfig}
      heroPageData={{ title: 'Salvador', subtitle: 'The Soul of Bahia' }}
      intro={{
        paragraphs: [
          'Salvador announces itself immediately — through colour, sound, movement, and ritual. This is one of Brazil\'s most historically layered cities, and it doesn\'t hide that history behind distance or subtlety.',
          'Much of what defines Salvador today is designed to be encountered. The streets invite observation. The food is offered openly. Music spills outward. Tradition is worn, carried, and performed in public space. This isn\'t a city that pretends not to be watched — it has learned how to meet attention directly.',
          'In the cobblestone streets of Pelourinho, the past and present are inseparable. It is here that Brazil\'s African heart beats strongest, expressed through the rhythm of drums, the grace of capoeira, and the vibrant colours of colonial architecture.',
        ],
      }}
      rhythmInserts={[
        'History doesn\'t unfold chronologically here. It stacks.',
        'Observation is part of the exchange. The spectacle is real, but it doesn\'t pretend to be effortless.',
      ]}
      narratives={[
        {
          image: img('salvador10', 'Upper levels of the historic centre'),
          heading: 'History That Stays Visible',
          paragraph: 'Salvador\'s historic centre isn\'t preserved behind glass. Colonial buildings are still walked past, leaned against, adapted, and repainted. The city\'s elevation shapes how it\'s experienced — streets rise and fall sharply, revealing new views in fragments: ocean glimpses, rooftops, courtyards, towers.',
        },
        {
          image: img('salvador11', 'Baiana in traditional dress'),
          heading: 'Ritual in Public Space',
          paragraph: 'Many of Salvador\'s most recognisable traditions exist where visitors can see them — and that visibility is intentional. Baianas in traditional dress offer food shaped by religious and cultural practice. Coloured ribbons collect wishes without explanation. Music and dance move through streets without requiring a ticket. These are public rituals that continue regardless of who is watching.',
        },
        {
          image: img('salvador13', 'Two dancers mid-motion'),
          heading: 'Performance Without Illusion',
          paragraph: 'Salvador\'s relationship with performance is unusually direct. Dance, music, and Carnival are not presented as spontaneous miracles, but as practiced, physical disciplines shaped by repetition and strength. Performers move with intent — not to impress, but to hold rhythm, timing, and presence.',
        },
        {
          image: img('salvador9', 'Atlantic coastline at Salvador'),
          heading: 'The City at Rest',
          paragraph: 'Away from the density of the historic centre, the pace shifts. The coastline opens outward. Boats drift just offshore, beaches fill gradually, shade structures appear and disappear with the sun. This isn\'t escape from Salvador — it\'s part of how the city balances itself.',
        },
      ]}
      bridgeQuote="Salvador is well suited to travellers who want to engage directly with Brazil's visible culture — without needing to decode it first. It may feel intense, layered, and busy. That's not a flaw — it's the point."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="This isn't a place to disappear into. It's a place to pay attention — and Salvador rewards that attention fully."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: São Paulo', path: '/brazil/saopaulo' }}
    />
  );
}

export default Salvador;
