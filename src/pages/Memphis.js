import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import memphisImages from "../assets/artImages/slices/category/memphis.json";
import nashvilleImages from "../assets/artImages/slices/category/nashville.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import memphisHeroConfig from "./united-states/tennessee/memphis.hero.config";
import galleryBg from '../assets/Backgrounds/Grunge-Texture-Wall.webp';
import { hasMemphisStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = (id, alt) => {
  const entry = memphisImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const nashvilleCatalogImage = (id) => {
  const entry = nashvilleImages.find((item) => item.id === id);
  return entry?.cloudinary?.blog ?? null;
};

const galleryImages = memphisImages.map(entry => ({
  src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
  image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
  fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
  alt: entry.title,
  title: entry.title,
  description: entry.description,
  imageId: entry.id,
}));

const locationData = {
  name: 'Memphis',
  seo: {
    title: SEO_TITLES["/united-states/tennessee/memphis"],
    description:
      'Beale Street, Sun Studio, Stax, the Mississippi River, and the live blues that continue to shape Memphis.',
  },
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'You hear Memphis before you see it.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Tennessee',
    title: 'Nashville',
    tagline:
      'Broadway, songwriter rooms, recording studios, and late-night music further east across the state.',
    path: '/united-states/tennessee/nashville',
    image: nashvilleCatalogImage('neon-signs'),
    imageAlt: 'Neon signs on Broadway — Nashville',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 7,
    type: 'local-tip',
    title: 'Sun Studio in the morning',
    text: 'Visit early in the day before the tours become busy.',
    location: 'Union Avenue',
    image: img('vintage-equipment', 'Vintage studio equipment'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 17,
    type: 'local-tip',
    title: 'On Beale Street',
    text: 'Stop wherever the sound draws you in rather than choosing somewhere in advance.',
    location: 'Beale Street',
  },
  doThisAgainBlock(
    "We'd wander along Beale Street without deciding where to spend the evening. The venues are close together, and it only takes a few steps to hear something completely different.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-bar',
    title: "B.B. King's Blues Club",
    text: 'The band played long sets, and the conversations between songs felt just as much a part of the evening as the blues itself.',
    image: img('bb-kings-blues-club-band', "Live band at B.B. King's Blues Club"),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Sun Studio',
    text: [
      'One recording room.',
      'Low ceiling, pale tiles, and a space much smaller than expected. We went back a second time simply because we wanted another look.',
    ],
    image: img('sun-studio', 'Sun Studio'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The Corner Booth at The Arcade',
    subtitle: 'The oldest diner in Memphis',
    text: 'It became our late-morning stop after evenings that stretched much later than planned.',
    image: img('arcade-restaurant', 'The Arcade Restaurant'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-bar',
    title: 'A Small Room off Beale',
    text: 'The smallest venues often became the most memorable. You could feel the guitars through the floor before the first song had finished.',
    image: img('cozy-club', 'Small intimate blues club interior'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Beale After Dark',
    subtitle: 'Beale Street Arch → side streets → whichever venue sounded most inviting',
    text: 'No fixed route. Just follow the sound.',
    image: img('neon-memphis', 'Neon Memphis sign'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'divider-image',
    image: img('illuminated-beale-street', 'Illuminated Beale Street'),
    caption: 'After dark, the signs leave little doubt where you are.',
    compact: true,
  },
];

const rhythmInserts = [];
rhythmInserts[0] =
  "The Mississippi is broad, slow, and powerful. Standing beside it, it's easy to understand why so much of the city's history began here.";
rhythmInserts[6] =
  'On Beale Street, the music reaches the pavement long before you find the stage.';

function Memphis() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="tennessee"
      skipHero={hasMemphisStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={memphisHeroConfig}
      heroPageData={{ title: 'Memphis', subtitle: 'Blues, Soul & the Mississippi' }}
      intro={{
        paragraphs: [
          'Memphis stands on the banks of the Mississippi River, where music has become part of the city\'s everyday life.',
          'Beale Street is still filled with live blues after dark. Sun Studio is much smaller than its reputation suggests, while the Stax Museum preserves the story of one of soul music\'s most influential recording labels. A short walk away, the river moves steadily past it all.',
          'By evening, the music is impossible to ignore.',
        ],
      }}
      rhythmInserts={rhythmInserts}
      narratives={[
        { type: 'heading', heading: 'Crossing the Mississippi' },
        {
          layout: 'cinematic',
          image: img('entering-tennessee', 'Crossing into Tennessee'),
          paragraph: 'The bridge carries you over one of North America\'s great rivers.',
        },
        {
          layout: 'cinematic',
          image: img('paddlewheel', 'Paddlewheel riverboat on the Mississippi'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('countess-riverboat', 'Countess riverboat'),
          imageB: img('wc-handy-statue', 'W.C. Handy statue'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('history-mural', 'History mural'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('flagg-grove-school', 'Flagg Grove School'),
          imageB: img('inside-schoolhouse', 'Classroom inside Flagg Grove School'),
          paragraph: null,
        },

        { type: 'heading', heading: 'The Sound of Memphis' },
        {
          layout: 'cinematic',
          image: img('sun-studio', 'Sun Studio'),
          paragraph: 'Smaller than expected, but every corner carries a story.',
        },
        {
          layout: 'cinematic',
          image: img('stax-museum', 'Stax Museum'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('guitars-collection', 'Guitar collection'),
          imageB: img('hanging-guitars', 'Guitars on the wall'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Streets of Music' },
        {
          layout: 'cinematic',
          image: img('guitar-art-installation1', 'Guitar art installation'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('guitar-art-installation2', 'Guitar sculpture'),
          imageB: img('icon-tina-turner', 'Tina Turner tribute'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('gold-plated-cadillac', 'Gold Cadillac'),
          imageB: img('pink-cadillac', 'Pink Cadillac'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Beale Street' },
        {
          layout: 'cinematic',
          image: img('beale-street-arch', 'Beale Street arch'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('beale-street-neon', 'Neon signs on Beale Street'),
          imageB: img('neon-memphis', 'Neon Memphis sign'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('jerry-lawler-bar', "Jerry Lawler's bar"),
          paragraph: null,
        },

        { type: 'heading', heading: 'Live Blues' },
        {
          layout: 'cinematic',
          image: img('bb-kings-blues-club-sign', "B.B. King's Blues Club"),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('blues-city-cafe', 'Blues City Café'),
          imageB: img('blues-hall', 'Blues Hall'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('musicians1', 'Live performers on stage'),
          imageB: img('musicians2', 'Another night on stage'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('musicians3', 'Blues band performing'),
          imageB: img('rustic-stage', 'Rustic blues stage'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Memphis After Dark' },
        {
          layout: 'cinematic',
          image: img('nightlife', 'Night streets'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('illuminated-bar', 'Bar lights'),
          imageB: img('fish-restaurant', 'Fish restaurant'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('gumball-machine', 'Vintage gumball machine'),
          paragraph: null,
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="When we think about Memphis, we don't picture a single building. We remember open doorways, guitars being tuned between songs, and the sound of live blues following us from one venue to the next."
      returnLink={{ label: 'Return to Tennessee', path: '/united-states/tennessee' }}
      nextLink={{ label: 'Next: Nashville', path: '/united-states/tennessee/nashville' }}
    />
  );
}

export default Memphis;
