import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import mountainImages from "../assets/artImages/slices/category/mountains.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import mountainsHeroConfig from "./united-states/tennessee/mountains.hero.config";
import galleryBg from '../assets/Backgrounds/Weathered-Concrete-Wall.webp';
import { hasMountainsStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = (id, alt) => {
  const entry = mountainImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const galleryImages = mountainImages.map(entry => ({
  src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
  image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
  fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
  alt: entry.title,
  title: entry.title,
  description: entry.description,
  imageId: entry.id,
}));

const locationData = {
  name: 'Great Smoky Mountains',
  seo: {
    title: SEO_TITLES["/united-states/tennessee/mountains"],
    description:
      'Explore the forests, rivers, mountain roads, and Appalachian history of the Great Smoky Mountains.',
  },
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'No single view holds the whole range. One ridge gives way to another until the horizon is filled with blue.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 12,
    type: 'local-tip',
    title: 'Follow the streams downhill',
    text: 'They often lead to some of the park\'s quieter walks.',
    location: 'Along the trails',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 17,
    type: 'local-tip',
    title: 'The aerial tram above Gatlinburg',
    text: 'Worth doing once for a wider view across the valleys.',
    location: 'Gatlinburg',
    image: img('mount-scenic-valley', 'Aerial tram over the valley toward Gatlinburg'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 20,
    type: 'local-tip',
    title: 'Wildlife and timing',
    text: 'If you\'re hoping to see wildlife, head out early or stay until evening.',
  },
  doThisAgainBlock(
    "We'd spend less time searching for viewpoints and more time beside the streams. We often stayed longer than we expected, and the best wildlife sightings came early in the morning or as daylight faded.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The porch facing the ridge',
    text: [
      'The obvious thing to do was sit down.',
      'We\'d spend long stretches on the porch watching haze drift across the trees while the mountains filled the horizon. It became the pause between each day\'s walks.',
    ],
    image: img('mount-breakfast', 'Morning on a porch with mountain ridges beyond'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'When the mist lifted',
    text: [
      'Morning and evening always looked different.',
      'Mist hung between the ridges for longer, and the mountains stretched far beyond the nearest overlook. Each viewpoint opened another line of blue hills beyond the last.',
    ],
    image: img('mount-valley-view', 'Valley view at golden hour'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Old-growth quiet',
    text: 'Old-growth forest smells different from managed woodland. Denser. Richer. As though centuries have settled into the soil while you are only passing through.',
    image: img('mount-towering', 'Towering trees in old-growth forest'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our slow loop',
    subtitle: 'Ridge road → trail → overlook → back down',
    text: [
      'We never tried to see everything.',
      'Each day we chose one valley, one stream, one section of forest, and left the rest for another visit.',
    ],
    image: img('mount-woodland', 'Forest trail through mixed woodland'),
  },
];

const rhythmInserts = [];
rhythmInserts[0] =
  'The mist rolls in when the weather shifts. Your schedule does not change that.';
rhythmInserts[9] =
  'Old-growth forest smells different from managed woodland. Denser. Richer. As though centuries have settled into the soil.';

function Mountains() {
  return (
    <LightTemplate
      variant="nature"
      atmosphere="tennessee"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={mountainsHeroConfig}
      skipHero={hasMountainsStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'The Great Smoky Mountains', subtitle: 'Tennessee · Appalachian Range' }}
      intro={{
        paragraphs: [
          'The Smokies begin with ancient ridges and blue-grey mist. Long before the first roads crossed these mountains, forests already covered the slopes. Their age shows in towering trees, cold streams, and the haze settling between ridges towards evening.',
          'Trails, rivers, and quiet roads pass through forests, valleys, and small settlements scattered across the park. Appalachian cabins, churches, and split-rail fences remain where they have stood for generations, weathered rather than restored.',
          'Some days the deer are there. Some days they aren\'t.',
        ],
      }}
      rhythmInserts={rhythmInserts}
      narratives={[
        { type: 'heading', heading: 'Arrival' },
        {
          layout: 'cinematic',
          image: img('mount-sign', 'Entrance to the Smokies'),
          paragraph: 'The road narrows as the mountains begin.',
        },
        {
          layout: 'diptych',
          image: img('mount-panoramic', 'Panoramic view'),
          imageB: img('mount-vista', 'Spring hillside'),
          paragraph: null,
        },
        { type: 'heading', heading: 'Forest Immersion' },
        {
          layout: 'cinematic',
          image: img('mount-dense', 'Beneath the canopy'),
          paragraph: 'Trees rise overhead until only narrow patches of sky remain.',
        },
        {
          layout: 'diptych',
          image: img('mount-branches', 'Branches and exposed roots'),
          imageB: img('mount-roots', 'Exposed roots along the trail'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('mount-woodland', 'Woodland trail'),
          imageB: img('mount-stretching', 'Towering trees'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('mount-pine', 'Pine branch'),
          paragraph: 'The scent of old-growth forest.',
        },
        {
          layout: 'diptych',
          image: img('mount-redbud', 'Redbud in spring'),
          imageB: img('mount-fleabane', 'Fleabane wildflowers'),
          paragraph: 'Spring colour climbing the mountainside.',
        },

        { type: 'heading', heading: 'Water Through the Mountains' },
        {
          layout: 'cinematic',
          image: img('mount-peaceful-river', 'River through the mountains'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('mount-serene-river', 'Still water'),
          imageB: img('mount-rushing-river', 'Rushing current'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('mount-moss-rocks', 'Moss-covered rocks'),
          imageB: img('mount-river-view', 'Mountain stream through the trees'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Human Traces' },
        {
          layout: 'cinematic',
          image: img('mount-church', 'Mountain church'),
          paragraph: 'Cabins, churches, and split-rail fences left much as they were.',
        },
        {
          layout: 'diptych',
          image: img('mount-cabin', 'Historic cabin'),
          imageB: img('mount-wooden-cabin', 'Log house'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('mount-perched-house', 'Hillside homestead'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('mount-horses', 'Horses in the meadow'),
          paragraph: null,
        },
        { type: 'heading', heading: 'Wildlife & Quiet Encounters' },
        {
          layout: 'cinematic',
          image: img('mount-alert-deer', 'White-tailed deer at the forest edge'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('mount-wild-deer', 'Deer in the forest'),
          imageB: img('mount-groundhog', 'Groundhog beside the trail'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Valley Perspective & Twilight' },
        {
          layout: 'cinematic',
          image: img('mount-hills', 'Blue ridges'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('mount-twilight', 'Evening haze'),
          paragraph: null,
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Long after leaving, it isn't one particular viewpoint that comes back to mind. It's damp earth beneath the trees, water slipping over stone, and blue ridges fading into one another until they disappear into the distance."
      returnLink={{ label: 'Return to Tennessee', path: '/united-states/tennessee' }}
      nextLink={{ label: 'Next: Memphis', path: '/united-states/tennessee/memphis' }}
    />
  );
}

export default Mountains;
