import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import salvadorImages from "../assets/artImages/slices/category/salvador.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Beige-Wall-Grunge-Cracked.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { salvadorHeroConfig } from './brazil/salvador/salvador.hero.config';
import SalvadorJournalMap from '../components/SalvadorJournalMap';
import { hasSalvadorStaticHero, isMobileViewport } from '../utils/staticPageHero';

const img = (id, alt) => {
  const entry = salvadorImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const GALLERY_ORDER = [
  ...Array.from({ length: 22 }, (_, i) => `salvador${i + 1}`),
  'salvador23',
];

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
    title: SEO_TITLES["/brazil/salvador"],
    description: 'Salvador: A city where history moves, sings, resists, and remembers.',
  },
  coords: destinations.find(d => d.id === 'salvador'),
  spatialContext: 'On the coast of Bahia — where Brazil\'s African heritage is most visibly, loudly, and deliberately present.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Colour on colonial façades, drums from a street still out of sight, ribbons knotting on the Bonfim gate.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
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
    anchorId: 'bonfim-ribbons',
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
    text: 'Hand-painted signs point toward shade and water after the climb through Pelourinho — the coast resetting heat without urgency.',
    location: 'Barra / coastline',
    image: img('salvador16', 'Shoreline signs toward shade and water'),
    anchorId: 'barra-beach',
  },
  doThisAgainBlock(
    "We'd let Pelourinho's rhythm arrive without chasing it — drums from somewhere unseen, colour layered over worn stone. We'd walk the coast when the heat loosened, following the sea breeze rather than a schedule.",
  ),
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
    anchorId: 'pelourinho',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Igreja Nosso Senhor do Bonfim',
    text: 'The pale façade and twin towers rise above the neighbourhood — a pilgrimage church whose gate has become as famous as the building itself.',
    image: img('salvador6', 'Coloured ribbons on iron gates'),
    location: 'Igreja do Bonfim',
    anchorId: 'igreja-do-bonfim',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Farol da Barra at dusk',
    text: 'The lighthouse turns slowly above the Atlantic, marking Barra where the promenade opens toward open water.',
    image: img('salvador15', 'Farol da Barra lighthouse'),
    location: 'Farol da Barra',
    anchorId: 'farol-da-barra',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Facades after dark',
    text: 'Painted walls lit by street lamps after the tour groups thin — vendors still selling, drums still audible from a side street.',
    image: img('salvador21', 'Colonial facades at night'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our uphill loop',
    subtitle: 'Square → alley → descent toward the sea',
    text: 'We walked the same rise each day: Cathedral Basilica rising above the church square as anchor, narrow alleys for shade and echo, then down toward water where boats sat close enough to swim to and far enough to feel like another world.',
    image: img('salvador5', 'Cathedral Basilica and church square in Salvador'),
    anchorId: 'cathedral-basilica',
  },
];

function Salvador() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="brazil"
      skipHero={hasSalvadorStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={salvadorHeroConfig}
      heroPageData={{ title: 'Salvador', subtitle: 'The Soul of Bahia' }}
      journalMap={<SalvadorJournalMap />}
      intro={{
        paragraphs: [
          'Salvador announces itself immediately — colour on colonial façades, drums in the street, vendors calling across squares.',
          'Baianas in traditional dress offer food at open stalls. Capoeira circles form on cobblestones without a ticket booth. Ribbons collect on the gate at Bonfim while tourists and locals share the same rail.',
          'In Pelourinho, past and present share the same climb — ocean glimpses between rooftops, capoeira in the square, paint holding its colour under uneven lamps after dark.',
        ],
      }}
      rhythmInserts={[
        'History stacks here — colonial paint over worn stone, drums from a street you have not reached yet, ocean glimpses between rooftops on the climb.',
      ]}
      narratives={[
        {
          image: img('salvador23', 'Casa do Carnaval da Bahia, Pelourinho'),
          heading: 'History That Stays Visible',
          paragraph: 'Salvador\'s historic centre isn\'t preserved behind glass. Colonial buildings are still walked past, leaned against, adapted, and repainted. The city\'s elevation shapes how it\'s experienced — streets rise and fall sharply, revealing new views in fragments: ocean glimpses, rooftops, courtyards, towers.',
        },
        {
          image: img('salvador11', 'Baiana in traditional dress'),
          heading: 'Ritual in Public Space',
          paragraph: 'Many traditions here happen in public view — Baianas in white lace offer acarajé from trays, ribbons knot on the Bonfim gate, capoeira circles form on cobblestones without a ticket booth. The drums continue whether or not a tour group is watching.',
          anchorId: 'baiana',
        },
        {
          image: img('salvador13', 'Two capoeira players mid-motion'),
          heading: 'Capoeira Without Illusion',
          paragraph: 'Salvador\'s relationship with capoeira is unusually direct. The roda is not presented as a spontaneous miracle, but as a practiced, physical discipline shaped by repetition, rhythm, and strength. Players move with intent — not to impress, but to hold timing, presence, and the circle itself.',
          anchorId: 'capoeira',
        },
        {
          image: img('salvador9', 'Atlantic coastline at Salvador'),
          heading: 'The City at Rest',
          paragraph: 'Away from Pelourinho the climb eases. Barra opens toward the Atlantic — Farol da Barra above the promenade, boats drifting just offshore, hand-painted signs pointing toward shade and water.',
        },
      ]}
      bridgeQuote="Pelourinho at dusk, ribbons on the Bonfim gate, drums from a circle we stood at the edge of — attention returned as often as it was offered."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Coloured ribbons in our pockets, capoeira still audible two streets away, salt air on the walk down toward Barra."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: São Paulo', path: '/brazil/saopaulo' }}
    />
  );
}

export default Salvador;
