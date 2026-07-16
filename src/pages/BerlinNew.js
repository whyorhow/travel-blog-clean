import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import berlinArt from "../assets/artImages/slices/story/germany-berlin.json";
import { makeImgResolver } from "../utils/artImageResolver";
import { hasBerlinStaticHero, isMobileViewport } from "../utils/staticPageHero";
import galleryBg from '../assets/Backgrounds/Gray-Wall-Rough.webp';
import GalleryWall from '../components/GalleryWall';
import '../styles/berlin-overrides.css';

const berlinCatalog = berlinArt;
const img = makeImgResolver(berlinCatalog);

const BERLIN_HERO_ID = "Germany/Berlin/Berlin-Hero-Backup";
const BERLIN_HERO_WIDTHS = [600, 900, 1200, 1600, 2400, 3200];
const BERLIN_HERO_LCP_WIDTH = 1200;
const BERLIN_HERO_SIZES = "(max-width: 767px) 100vw, (max-width: 1200px) 90vw, 1200px";

const berlinHeroUrl = (width) =>
  cloudinaryImageUrl(BERLIN_HERO_ID, { width });

const sectionAnchor = (name) => ({
  type: 'heading',
  heading: name,
  anchorId: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
});

const prose = (text) => ({ type: 'prose', paragraph: text });

const narrativeImage = (id, opts = {}) => {
  const entry = berlinCatalog.find(e => e.id === id);
  if (!entry) return null;
  const base = {
    src: cloudinaryImageUrl(entry.cloudinary.blog, { width: 1200 }),
    alt: entry.title,
    lightboxSrc: entry.cloudinary.lightbox,
    lightboxAlt: entry.title,
    caption: opts.caption || entry.description,
  };
  return { ...base, ...opts };
};

const editorialSplit = (id, opts = {}) => ({
  type: 'photo',
  layout: 'editorial-split',
  image: narrativeImage(id, opts),
  heading: opts.heading,
  eyebrow: opts.eyebrow,
  paragraph: opts.paragraph,
  imageLeft: opts.imageLeft ?? true,
});

const asymmetricFocus = (id, opts = {}) => ({
  type: 'photo',
  layout: 'asymmetric-focus',
  image: narrativeImage(id, opts),
  heading: opts.heading,
  eyebrow: opts.eyebrow,
  paragraph: opts.paragraph,
  imageLeft: opts.imageLeft ?? true,
});

const immersiveBreak = (id, opts = {}) => ({
  type: 'photo',
  layout: 'immersive-break',
  image: narrativeImage(id, opts),
  heading: opts.heading,
  eyebrow: opts.eyebrow,
  paragraph: opts.paragraph,
  afterParagraph: opts.afterParagraph,
});

const splitOffset = (id, opts = {}) => ({
  type: 'photo',
  layout: 'split-offset',
  image: narrativeImage(id, opts),
  heading: opts.heading,
  eyebrow: opts.eyebrow,
  paragraph: opts.paragraph,
  imageLeft: opts.imageLeft ?? true,
});

const insert = (id, opts = {}) => ({
  type: 'photo',
  layout: 'insert',
  image: narrativeImage(id, opts),
  imageLeft: opts.imageLeft ?? true,
  paragraph: opts.paragraph,
});

const featureImage = (id, opts = {}) => ({
  type: 'photo',
  layout: 'feature-image',
  image: narrativeImage(id, opts),
  anchorId: opts.anchorId,
});

const GALLERY_ORDER = [
  'glass-and-steel-berlin-2',
  'neon-and-puddles-berlin-1',
  'dome-by-river-berlin-4',
  'grief-in-light-berlin-7',
  'feet-on-history-berlin-8',
  'words-in-stone-berlin-9',
  'concrete-sea-berlin-12',
  'the-corridor-berlin-13',
  'the-bunker-sign-berlin-14',
  'graffiti-pink-call-berlin-3',
  'the-brain-house-berlin-19',
  'faces-of-berlin-berlin-20',
  'mobile-home-berlin-21',
  'kulturbrauerei-courtyard-berlin-26',
  'the-playwright-berlin-31',
  'table-light-berlin-22',
  'tavern-1840-berlin-23',
  'fresh-rolls-berlin-28',
  'brunch-bowls-berlin-29',
  'sweet-side-berlin-30',
  'the-sushi-platter-berlin-36',
  'brandenburg-berlin-10',
  'hotel-adlon-berlin-11',
  'stone-and-scale-berlin-5',
  'dome-and-wire-berlin-6',
  'world-clock-berlin-27',
  'misty-city-view-berlin-39',
  'socialist-realism-berlin-15',
  'the-soldier-berlin-17',
  'charlie-berlin-18',
  'fraternal-berlin-34',
  'to-the-german-people-berlin-38',
  'the-dome-berlin-41',
  'mirrored-berlin-42',
  'the-obelisk-berlin-24',
  'iron-gates-berlin-25',
  'river-walk-berlin-37',
  'reflections-on-the-spree-berlin-35',
  'x-marks-the-spot-berlin-40',
  'panda-nap-berlin-32',
  'the-giants-berlin-33',
];

const SIZE_CLASSES = {
  'glass-and-steel-berlin-2': 'wide',
  'neon-and-puddles-berlin-1': 'small',
  'dome-by-river-berlin-4': 'large',
  'grief-in-light-berlin-7': 'small',
  'feet-on-history-berlin-8': 'small',
  'words-in-stone-berlin-9': 'small',
  'concrete-sea-berlin-12': 'wide',
  'the-corridor-berlin-13': 'large',
  'the-bunker-sign-berlin-14': 'small',
  'graffiti-pink-call-berlin-3': 'small',
  'the-brain-house-berlin-19': 'large',
  'faces-of-berlin-berlin-20': 'small',
  'mobile-home-berlin-21': 'small',
  'kulturbrauerei-courtyard-berlin-26': 'large',
  'the-playwright-berlin-31': 'large',
  'table-light-berlin-22': 'small',
  'tavern-1840-berlin-23': 'large',
  'fresh-rolls-berlin-28': 'small',
  'brunch-bowls-berlin-29': 'small',
  'sweet-side-berlin-30': 'small',
  'the-sushi-platter-berlin-36': 'small',
  'brandenburg-berlin-10': 'wide',
  'hotel-adlon-berlin-11': 'large',
  'stone-and-scale-berlin-5': 'large',
  'dome-and-wire-berlin-6': 'large',
  'world-clock-berlin-27': 'small',
  'misty-city-view-berlin-39': 'wide',
  'socialist-realism-berlin-15': 'large',
  'the-soldier-berlin-17': 'small',
  'charlie-berlin-18': 'small',
  'fraternal-berlin-34': 'large',
  'to-the-german-people-berlin-38': 'large',
  'the-dome-berlin-41': 'large',
  'mirrored-berlin-42': 'small',
  'the-obelisk-berlin-24': 'wide',
  'iron-gates-berlin-25': 'large',
  'river-walk-berlin-37': 'large',
  'reflections-on-the-spree-berlin-35': 'wide',
  'x-marks-the-spot-berlin-40': 'small',
  'panda-nap-berlin-32': 'small',
  'the-giants-berlin-33': 'small',
};

const galleryImages = GALLERY_ORDER
  .map(id => berlinCatalog.find(entry => entry.id === id))
  .filter(Boolean)
  .map(entry => ({
    src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
    fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
    alt: entry.title,
    imageId: entry.cloudinary.gallery,
    cloudinary: entry.cloudinary,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    gumroadLink: entry.gumroadLink,
    shopLink: entry.shopLink,
    storyLink: entry.storyLink,
    sizeClass: SIZE_CLASSES[entry.id] || 'small',
    isAnchor: entry.category === 'City Scale' || entry.category === 'Slices of History',
    theme: entry.category || 'general',
    energy: entry.category === 'City Scale' ? 'medium' : entry.category === 'The Routine' ? 'low' : 'high',
  }));

const locationData = {
  name: 'Berlin',
  seo: {
    title: SEO_TITLES["/germany/berlin"],
    description: 'Berlin — surfaces of glass, steel, concrete, and memory. A city experienced through weather, reflection, and everyday persistence.',
  },
  coords: undefined,
  spatialContext: 'Berlin carries its history in the open — not confined to museums but embedded in the pavement, the riverbanks, and the streets where the city keeps rebuilding itself through surfaces.',
};

const editorialBlocks = [
  doThisAgainBlock(
    "We'd trace the Wall's route again — not for the famous sections, but for the patches where the double cobblestone line crosses a side street and the city has simply built around it."
  ),
];

const narratives = [
  sectionAnchor('Arrival'),
  featureImage('glass-and-steel-berlin-2', {
    caption: 'The Hauptbahnhof curves above the platforms, filtering grey light through its glass and steel roof.',
    anchorId: 'arrival',
  }),
  prose('Arriving into Berlin by train, the city presents itself through glass and steel. The Hauptbahnhof curves above the platforms, filtering grey light through its roof. Outside, wet pavements reflect neon signs, and the air has that specific weight of a city used to overcast skies.'),
  asymmetricFocus('neon-and-puddles-berlin-1', {
    paragraph: 'Running a hand along the wet pavement, the cold seeps through. Neon signs bleed into puddles, and the air carries the metallic tang of a city perpetually rebuilding its surface.',
    imageLeft: true,
  }),
  insert('dome-by-river-berlin-4', {
    paragraph: 'We walked towards the Spree. The Berlin Cathedral stood heavy on the water, its reflection separated from the real building only by the stone bridge.',
  }),

  sectionAnchor('First Impressions'),
  editorialSplit('stone-and-scale-berlin-5', {
    eyebrow: 'Architecture',
    paragraph: 'The physical city before its history. Stone and scale, steel against grey sky — the city announces itself through materials before anything else. Run your palm along the facade: rough-hewn granite, cold steel frames, the grit of weathered brick.',
    imageLeft: false,
    anchorId: 'first-impressions',
  }),
  prose('Dome and wire above the Spree. The architecture speaks first; memory arrives later.'),
  splitOffset('dome-and-wire-berlin-6', {
    paragraph: 'Dome and wire above the Spree. The architecture speaks first; memory arrives later.',
  }),
  splitOffset('river-walk-berlin-37', {
    paragraph: 'We walked the riverbank more than once. Water, glass, traffic — the same elements rearranged each time.',
  }),

  sectionAnchor('Memory Set in Stone'),
  immersiveBreak('grief-in-light-berlin-7', {
    heading: 'Where Memory is Set in Stone',
    paragraph: 'The Neue Wache holds a single sculpture beneath an oculus of light. A step away, glass panels in the cobblestones mark the Empty Library where books once burned — our shadows cast into the void below. Bronze plaques preserve words in the pavement. This is history you touch underfoot, not just read about.',
    afterParagraph: 'Beyond it, the concrete fields of the memorial pull the city noise down to a muted scrape of shoes on gravel. The slabs hold cold after rain; their narrow passages make the open sky feel suddenly far away.',
    anchorId: 'memory-set-in-stone',
  }),
  prose('A step away, glass panels in the cobblestones mark the Empty Library where books once burned — our shadows cast into the void below. Bronze plaques preserve words in the pavement.'),
  asymmetricFocus('feet-on-history-berlin-8', {
    paragraph: 'Stand at the glass edge and look down into the underground room. The cold radiates up through the soles of your shoes. History here is not abstract; it has temperature, depth, and the sound of footsteps echoing in empty space.',
    imageLeft: false,
  }),
  splitOffset('concrete-sea-berlin-12', {
    paragraph: 'The Holocaust Memorial stretches in concrete waves, its corridors narrowing the view to stone walls and gravel. Stand between the slabs and the city falls away — only the rough texture of concrete and the crunch of stones underfoot remain.',
    imageLeft: true,
  }),
  insert('the-corridor-berlin-13', {
    paragraph: 'The corridors close in. Stone walls on both sides, gravel underfoot.',
  }),
  insert('the-bunker-sign-berlin-14', {
    paragraph: 'At the bunker site, an information board stands on scruffy grass — history marked in gravel and ordinary asphalt.',
  }),

  sectionAnchor('Street Berlin'),
  splitOffset('the-brain-house-berlin-19', {
    paragraph: 'Street Berlin feels like the most authentic version of the city. A phone booth in pink marker. A floating brain looking down from brickwork. Touch the walls: layers of paint, plaster peeling, the rough grain of old brickwork that has absorbed decades of weather.',
    imageLeft: false,
    anchorId: 'street-berlin',
  }),
  insert('graffiti-pink-call-berlin-3', {
    paragraph: 'The graffiti corridors run between ordinary buildings — colour added without removing what was already there.',
  }),
  insert('faces-of-berlin-berlin-20', {
    paragraph: 'Faces pasted onto brickwork until the plaster shows through. Berlin adds layers without scrubbing the old ones clean.',
  }),
  insert('mobile-home-berlin-21', {
    paragraph: 'Details accumulate. The city keeps every version of itself visible.',
  }),
  immersiveBreak('kulturbrauerei-courtyard-berlin-26', {
    heading: 'Courtyard Light',
    paragraph: 'Courtyards hold their own light. The Kulturbrauerei yard sits between buildings, bottles on tables, a different rhythm from the main streets. Here the stone walls trap sound and warmth, creating a pocket of afternoon stillness.',
    afterParagraph: 'Old brewery brick darkens at the joints, ironwork catches the last dull shine, and damp flagstones keep the day’s footsteps long after the tables empty.',
    anchorId: 'courtyard',
  }),

  sectionAnchor('Everyday Pause'),
  asymmetricFocus('table-light-berlin-22', {
    eyebrow: 'Pause',
    paragraph: 'Stepping away from history. A table by a window, light across the surface. The wood worn smooth by elbows, the ceramic mug chipped at the rim — small, imperfect things that anchor you to the present.',
    imageLeft: true,
    anchorId: 'everyday-pause',
  }),
  insert('tavern-1840-berlin-23', {
    paragraph: 'The old taverns run alongside the new. No review needed — just a place to stop.',
  }),
  insert('fresh-rolls-berlin-28', {
    paragraph: 'Fresh rolls bought from a window, eaten on the walk.',
  }),
  insert('brunch-bowls-berlin-29', {
    paragraph: 'Brunch bowls, coffee, the morning extended.',
    imageLeft: false,
  }),
  insert('sweet-side-berlin-30', {
    paragraph: 'The sweet side of the same streets.',
  }),
  insert('the-sushi-platter-berlin-36', {
    paragraph: 'Late-night sushi after the museums, after the memorials. The city kept offering ordinary moments beside the monumental ones.',
    imageLeft: false,
  }),

  sectionAnchor('Familiar Berlin'),
  featureImage('brandenburg-berlin-10', {
    caption: 'The Brandenburg Gate — not a discovery, but an acknowledgment.',
    anchorId: 'familiar-berlin',
  }),
  prose('Readers have already arrived in Berlin. Now they encounter its famous places — not as discoveries, but as acknowledgments.'),
  insert('hotel-adlon-berlin-11', {
    paragraph: 'Hotel Adlon behind the gate. The polished surface of a city that performs for visitors.',
  }),
  insert('world-clock-berlin-27', {
    paragraph: 'World Clock on the square. Time displayed for every timezone, Berlin at the centre.',
  }),
  immersiveBreak('misty-city-view-berlin-39', {
    heading: 'Misty View',
    paragraph: 'Misty view across familiar streets. The same landmarks from a different angle, softened by weather. Berlin reveals itself slowly, through layers of atmosphere and distance — you never see the whole city at once.',
    afterParagraph: 'From above, roofs, tram wires, soot-darkened stone and pale glass dissolve into one weather-beaten surface. Nothing resolves all at once; the city asks you to keep looking.',
    anchorId: 'misty',
  }),
  insert('x-marks-the-spot-berlin-40', {
    paragraph: 'X marks the spot. Not on a map — on the city itself. The marks change faster than any map could track.',
  }),

  sectionAnchor('Divided City'),
  editorialSplit('socialist-realism-berlin-15', {
    paragraph: 'Paint, concrete, signs, architecture — the physical traces of division remain visible. Run your fingers along the remaining Wall segments: coarse, pitted concrete still sharp enough to cut.',
    imageLeft: false,
  }),
  insert('the-soldier-berlin-17', {
    paragraph: 'The soldier looking east. A figure frozen in the architecture.',
  }),
  insert('charlie-berlin-18', {
    paragraph: 'Checkpoint Charlie reduced to a sign and a queue. History compressed into a photograph.',
  }),
  splitOffset('fraternal-berlin-34', {
    heading: 'Divided City',
    paragraph: 'The visible traces of division: paint, concrete, signs, architecture. The marks remain. Touch the painted wall sections: the plaster flakes under pressure, decades of graffiti layers crumble at the edges.',
    imageLeft: true,
    anchorId: 'divided-city',
  }),
  insert('to-the-german-people-berlin-38', {
    paragraph: 'The dome above the rebuilt assembly. Iron and glass on a footprint that remembers borders.',
  }),
  insert('the-dome-berlin-41', {
    paragraph: 'Reichstag dome — the view across the city. Every direction shows a different Berlin.',
  }),
  insert('mirrored-berlin-42', {
    paragraph: 'Inside the dome. Reflections stacked above the chamber below.',
  }),

  sectionAnchor('Sachsenhausen'),
  immersiveBreak('the-obelisk-berlin-24', {
    heading: 'Sachsenhausen',
    paragraph: 'A quieter register of the same history. The camp sits outside the city rhythm — quieter, older, heavier. The stones here carry a different weight than those in Berlin; the silence has a different texture, colder and more complete.',
    afterParagraph: 'Rusted gates, raw stone and wet ground make the distance from central Berlin feel physical. The quiet is broken only by wind moving through the bare structure.',
    anchorId: 'sachsenhausen',
  }),
  prose('A quieter register of the same history. The camp sits outside the city rhythm — quieter, older, heavier.'),
  insert('iron-gates-berlin-25', {
    paragraph: 'Iron gates. The architecture of containment, preserved without comment from the road.',
  }),

  sectionAnchor('Quiet Departure'),
  asymmetricFocus('reflections-on-the-spree-berlin-35', {
    paragraph: 'Leaving Berlin without trying to explain it. The river became a dark mirror for the city lights. Standing on the bank, the cold bite of the air, the weight of everything seen and unseen — the city leaves you with fragments rather than conclusions.',
    imageLeft: false,
    anchorId: 'quiet-departure',
  }),
  insert('panda-nap-berlin-32', {
    paragraph: 'Rain and reflection. The city seen from a different position on the way out.',
  }),
  insert('the-giants-berlin-33', {
    paragraph: 'The giants at the gate. Berlin leaves you with fragments rather than conclusions.',
  }),
];

function BerlinGallery({ images, backgroundImage }) {
  const sachsenhausenStart = images.findIndex(img => img.imageId === 'Germany/Berlin/Small/Berlin 24');
  const closingStart = images.findIndex(img => img.imageId === 'Germany/Berlin/Small/Berlin 37');

  const mainImages = sachsenhausenStart > 0 ? images.slice(0, sachsenhausenStart) : images;
  const sachsenhausenImages = closingStart > 0 && sachsenhausenStart > 0
    ? images.slice(sachsenhausenStart, closingStart)
    : sachsenhausenStart > 0
      ? images.slice(sachsenhausenStart)
      : [];
  const closingImages = closingStart > 0 ? images.slice(closingStart) : [];

  return (
    <>
      {mainImages.length > 0 && (
        <div className="pb-4">
          <GalleryWall images={mainImages} backgroundImage={backgroundImage} />
        </div>
      )}
      {sachsenhausenImages.length > 0 && (
        <div className="bg-stone-50 py-20">
          <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-handwriting text-stone-800 mb-4">Sachsenhausen</h2>
            <p className="text-lg text-stone-600 italic">A quieter register of the same history. The camp sits outside the city rhythm — quieter, older, heavier.</p>
          </div>
          <GalleryWall images={sachsenhausenImages} backgroundImage={backgroundImage} />
        </div>
      )}
      {closingImages.length > 0 && (
        <div className="pt-8">
          <GalleryWall images={closingImages} backgroundImage={galleryBg} />
        </div>
      )}
    </>
  );
}

function BerlinNew() {
  return (
    <div className="berlin-editorial">
      <LightTemplate
        variant="immersive"
        atmosphere="default"
        heroImage={{
          src: berlinHeroUrl(BERLIN_HERO_LCP_WIDTH),
          preloadSrc: berlinHeroUrl(BERLIN_HERO_LCP_WIDTH),
          srcSet: BERLIN_HERO_WIDTHS.map((w) => `${berlinHeroUrl(w)} ${w}w`).join(", "),
          sizes: BERLIN_HERO_SIZES,
          width: 1200,
          height: 900,
          alt: 'Berlin — a lime-green Trabant driving past a preserved section of the Berlin Wall',
          objectPosition: 'center 50%',
        }}
        narratives={narratives}
        rhythmInserts={[
          'History in Berlin is not a past tense. It sits in the cobblestones, in the gaps between apartment blocks, in the river light that still breaks through scaffolding.',
        ]}
        narrativePhotoClass="saturate-[0.88] brightness-[1.03] contrast-[0.98]"
        intro={{
          lead: 'Arriving into Berlin by train, the city presents itself through glass and steel.',
          paragraphs: [
            'The Hauptbahnhof curves above the platforms, filtering grey light through its roof. Outside, wet pavements reflect neon signs, and the air has that specific weight of a city used to overcast skies.',
            'Movement continues on the streets: commuters and drifters, red S-Bahn fronts pulling into curved platforms, the Friedrichstadt-Palast facade bleeding colour across rain-slicked asphalt. The Berlin Cathedral stands heavy on the Spree, its reflection separated from the real building only by water and a stone bridge.',
            'We walked between these layers — from the glass dome to the grey stelae, from Checkpoint Charlie to the riverbank where bare winter branches framed the distant dome. The currywurst stands, the graffiti corridors, the late-night sushi — Berlin kept offering small, ordinary moments beside the monumental ones.',
          ],
        }}
        snapshot="Berlin carries its history in the open — not confined to museums but embedded in the pavement, the riverbanks, and the streets where the city keeps rebuilding itself through surfaces."
        sidebarImage={{
          src: 'Germany/Berlin/Small/Berlin 4',
          alt: 'Berlin Cathedral viewed across the Spree River',
          caption: 'The Berlin Cathedral stands beneath a flat, overcast sky — its reflection in the Spree separated only by the stone bridge.',
        }}
        narrative={{
          eyebrow: 'Memory & monument',
          headingStyle: 'handwriting',
          image: { src: 'Germany/Berlin/Small/Berlin 7', alt: 'Neue Wache memorial interior' },
          heading: 'Where Memory is Set in Stone',
          paragraph: 'The Neue Wache holds a single sculpture beneath an oculus of light. A step away, glass panels in the cobblestones mark the Empty Library where books once burned — our shadows cast into the void below. Bronze plaques preserve words in the pavement. The Holocaust Memorial stretches in concrete waves, its corridors narrowing the view to stone walls and gravel. At the bunker site, an information board stands on scruffy grass — history marked in gravel and ordinary asphalt.',
        }}
        bridgeQuote="The river became a dark mirror for the city lights — quiet waterfront blocks sitting still under a heavy night sky, while history kept surfacing through paint, concrete, and iron."
        reflectiveClose="A river walk under bright winter branches, the Reichstag dome in the distance, jet trails crossing above the skyline — Berlin leaves you with fragments rather than conclusions."
        returnLink={{ label: 'Return to Germany', path: '/germany' }}
        editorialBlocks={editorialBlocks}
        locationData={locationData}
        skipHero={hasBerlinStaticHero() && isMobileViewport()}
        journalMap={null}
        showContextMap={null}
        sections={[]}
        galleryImages={galleryImages}
        galleryBackground={galleryBg}
        GalleryComponent={BerlinGallery}
      />
    </div>
  );
}

export default BerlinNew;
