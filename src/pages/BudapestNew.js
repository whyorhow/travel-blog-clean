import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import budapestImages from "../assets/artImages/slices/story/hungary-budapest.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from '../assets/Backgrounds/Dirty-Wall-Texture.webp';
import { hasBudapestStaticHero, isMobileViewport } from "../utils/staticPageHero";

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
    text: 'Ivy behind a gate we almost walked past. Paths that did not lead to a main road. The Mulberry Garden visible only once we had stepped inside.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Across Europe',
    title: 'Athens',
    tagline: 'Back to marble hills — the Acropolis above apartment blocks, bread ovens, and winter oranges on the pavement.',
    path: '/greece/athens',
    image: 'Greece/Athens/Athens-backup',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 15,
    type: 'local-tip',
    title: 'Go at dusk',
    text: 'The Széchenyi Baths when the crowds thin and the outdoor pools turn amber — that is the version worth planning around. Midday is impressive. Evening is when the cold air meets warm water and the façade lights up from below.',
    location: 'City Park',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
    type: 'do-this-again',
    text: [
      'We would cross the Chain Bridge on foot rather than from a bus window, and time our bath visits for when the outdoor pools had emptied slightly.',
      'Heroes\' Square and the Parliament were impressive from a distance. We spent more time on the embankment, in courtyards, and in the baths once the outdoor pools had emptied slightly.',
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Evenings at Széchenyi',
    text: [
      'Conversations in Hungarian and half a dozen other languages drifted out of the changing rooms into cold air.',
      'We kept returning at the end of long walking days — outdoor pools, Neo-Baroque façade lit from below, water warm enough to stay in until our fingers wrinkled.',
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
      'We went to New York Café once. Gilded ceilings, mirrors, waiters in formal dress. We spent longer reading the menu than drinking the coffee.',
      'Once was enough. The next afternoon we sat on a balcony off Király utca with a single espresso — no gilding, no menu thicker than a postcard.',
    ],
    image: img('new-york-cafe'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The garden time forgot',
    subtitle: 'Mulberry Garden · Epreskert',
    text: [
      'We almost walked past the gate to the Mulberry Garden. Ivy over statues. Paths that did not lead to a main road. A courtyard visible only once we had stepped inside.',
      'We stayed longer than we meant to — sitting on a low wall, a tram faint in the distance, watching light move across stone figures half-hidden in leaves.',
    ],
    image: img('mulberry-garden-epreskert'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our slow loop along the Danube',
    subtitle: 'Chain Bridge → embankment → nothing in particular',
    text: 'Chain Bridge to the embankment and back — sometimes at midday with ferries cutting across the water, sometimes at dusk when lights reflected in the Danube and we could not remember which turn we had taken last time.',
    image: img('danube-river'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'divider-image',
    image: img('yellow-weathered-door'),
    caption: 'A yellow door on Szondi utca — paint cracked, handle worn smooth.',
    compact: true,
  },
];

const rhythmInserts = [];
rhythmInserts[3] = 'Tour groups spread across Heroes\' Square with maps half unfolded — we walked toward the trees and the castle behind.';
rhythmInserts[10] = 'Yellow changing-room doors inside Széchenyi, lockers clicking shut.';
rhythmInserts[13] = 'Chain Bridge underfoot at eight — grey water below, parliament still in shadow.';

function BudapestNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="hungary"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroImage={{
        src: cloudinaryImageUrl('Hungary/Budapest/Budapest-backup', { width: 1600 }),
        alt: 'Budapest',
      }}
      skipHero={hasBudapestStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Budapest', subtitle: 'Hungary · Grand & Quiet' }}
      intro={{
        paragraphs: [
          'We came up from the metro into wide boulevards and stone façades. Heroes\' Square opened in front of us — monuments, columns, tourists with maps. The Danube was visible from the first bridge we crossed, grey in the morning light.',
          'By the second day we were on narrower streets. Steam from Széchenyi above the rooftops in City Park. Coffee at a small table while trams passed.',
          'One Tuesday: embankment at eight, Ják Chapel gate at two, outdoor pools amber by seven. We had stopped checking the list of monuments.',
        ],
      }}
      rhythmInserts={rhythmInserts}
      narratives={[
        { type: 'heading', heading: 'First Impressions' },
        {
          type: 'prose',
          paragraph:
            'Tour groups spread across the square with maps half unfolded. We walked toward Vajdahunyad Castle — turrets behind the trees, bridges over the moat, pigeons on the paths.',
        },
        {
          layout: 'cinematic',
          image: img('heroes-square'),
          paragraph: null,
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
          type: 'prose',
          paragraph:
            'Past Heroes\' Square the avenues narrowed. Decorative façades at eye level instead of overhead. We found Ják Chapel through a gate we had walked past twice. A courtyard on Szondi utca visible only once the door was open.',
        },
        {
          layout: 'split',
          image: img('jak-chapel'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('historic-building-szondi'),
          imageB: img('yellow-weathered-door'),
          paragraph: null,
        },
        {
          type: 'prose',
          paragraph:
            'We arrived at the Count Sándor Károlyi statue just as a school group left. The square emptied. We read the plaque, took a photograph, and walked on without a next destination.',
        },
        {
          layout: 'cinematic',
          image: img('count-sandor-karolyi-statue'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Along the Danube' },
        {
          type: 'prose',
          paragraph:
            'We walked the embankment three mornings in a row. Grey water and ferries at eight o\'clock. Sun on the parliament façade at midday. At dusk the lights came on one section at a time and the river held all of it — bridges, buildings, and the reflection broken by a passing boat.',
        },
        {
          layout: 'split',
          image: img('danube-river'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Taking It Slower' },
        {
          type: 'prose',
          paragraph:
            'Steam from the outdoor pools at Széchenyi was visible before we paid at the gate. Inside: yellow changing rooms, tiled floors, and the Neo-Baroque façade lit from below after sunset. We sat in the hot water while conversations in Hungarian drifted across the surface.',
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
      bridgeQuote="By the last evening we were on the embankment again rather than climbing monument steps."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Steam in cold air above the outdoor pools. Amber light on the Danube. Tram wires on the walk back to the hotel."
      returnLink={{ label: 'Return to Hungary', path: '/hungary' }}
    />
  );
}

export default BudapestNew;
