import React from "react";
import { LightTemplate } from "./templates";
import mountainImages from "../assets/artImages/slices/category/mountains.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import mountainsHeroConfig from "./united-states/tennessee/mountains.hero.config";
import galleryBg from '../assets/Backgrounds/Weathered-Concrete-Wall.webp';

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
    title: 'Great Smoky Mountains | Nomad Scribbles',
    description: 'Explore the layers of the Great Smoky Mountains through arrival, forest immersion, water, human traces, and twilight perspective.',
  },
};

function Mountains() {
  return (
    <LightTemplate
      variant="nature"
      locationData={locationData}
      heroConfig={mountainsHeroConfig}
      heroPageData={{ title: 'The Great Smoky Mountains', subtitle: 'Tennessee · Appalachian Range' }}
      intro={{
        paragraphs: [
          'The Smokies are defined by ancient ridges and blue-grey mist. The mountains were old before anyone thought to name them, and they carry that weight visibly — in the thickness of the forest, the cold clarity of the streams, and the way the haze settles between the ridges at dusk.',
          'Hiking trails, rivers, and small settlements reveal both the scale of the land and the history of those who lived within it. The Appalachian settlers left behind cabins, churches, and split-rail fences that the park has preserved but not prettied up.',
          'Wildlife appears on its own schedule. You either see the deer or you don\'t.',
        ],
      }}
      rhythmInserts={[
        "The mountains don't care about your itinerary. The mist comes in when it wants to.",
        "Old-growth forest smells different from managed woodland. Denser. Richer. Like something has been accumulating for centuries.",
      ]}
      narratives={[
        { type: 'heading', heading: 'Arrival' },
        {
          layout: 'cinematic',
          image: img('mount-sign', 'Entrance sign to the Great Smoky Mountains National Park'),
          paragraph: "The mountains roll in like they own the place. You just drive along and let them set the pace. The entrance sign appears sooner than expected, and the road narrows not long after.",
        },
        {
          layout: 'diptych',
          image: img('mount-panoramic', 'Panoramic view of the Smoky Mountains'),
          imageB: img('mount-vista', 'Spring vista across a mountain ridge'),
          paragraph: null,
        },
        {
          layout: 'insert',
          image: img('mount-hills', 'Rolling green hills of the Smokies'),
          caption: 'Ridge after ridge, each a slightly different shade of blue.',
        },

        { type: 'heading', heading: 'Forest Immersion' },
        {
          layout: 'cinematic',
          image: img('mount-dense', 'Dense tree canopy inside the national park'),
          paragraph: "The trees take over your view. Step in and the scale shifts — individual leaves matter as much as the canopy above.",
        },
        {
          layout: 'diptych',
          image: img('mount-branches', 'Forest branches close-up'),
          imageB: img('mount-roots', 'Exposed tree roots along a trail'),
          paragraph: "The roots push through the trail surface. Old trees anchor themselves visibly, as if the ground is something to be argued with.",
        },
        {
          layout: 'diptych',
          image: img('mount-woodland', 'Tree against woodland background'),
          imageB: img('mount-stretching', 'Tall trees stretching upward'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('mount-towering', 'Towering trees in old-growth forest'),
          imageB: img('mount-pine', 'Pine branch with needles'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('mount-redbud', 'Redbud flowers in early spring'),
          imageB: img('mount-fleabane', 'Fleabane wildflowers along a trail'),
          paragraph: "Spring in the Smokies moves upward — flowers bloom first in the valleys, then climb the ridges week by week.",
        },

        { type: 'heading', heading: 'Water Through the Mountains' },
        {
          layout: 'cinematic',
          image: img('mount-peaceful-river', 'Peaceful winding river through the mountains'),
          paragraph: "Rivers and streams are everywhere, moving at their own speed. Follow them and you'll see the land's natural flow — around rocks, through roots, into pools that are deeper than they look.",
        },
        {
          layout: 'diptych',
          image: img('mount-serene-river', 'Serene river scene'),
          imageB: img('mount-rushing-river', 'Rushing mountain river'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('mount-moss-rocks', 'Moss-covered rocks beside a stream'),
          imageB: img('mount-river-view', 'River view through the trees'),
          paragraph: "The moss on the rocks is a reliable indicator. Green means consistently wet. Here, everything is consistently wet.",
        },

        { type: 'heading', heading: 'Human Traces' },
        {
          layout: 'cinematic',
          image: img('mount-church', 'Historic mountain church'),
          paragraph: "Cabins, churches, and fences show how people figured it out here. Nothing was built for appearance — only for use. The park preserved the structures without restoring them to a version that never existed.",
        },
        {
          layout: 'diptych',
          image: img('mount-cabin', 'Historic log cabin in the Smokies'),
          imageB: img('mount-wooden-cabin', 'Wooden cabin with split-rail fence'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('mount-perched-house', 'House perched on a mountain hillside'),
          imageB: img('mount-chairs', 'Rocking chairs on a cabin porch'),
          paragraph: "Rocking chairs on a porch facing the mountain. The obvious thing to do here is sit down and stop moving.",
        },
        {
          layout: 'diptych',
          image: img('mount-scenic-valley', 'Scenic valley view from a high ridge'),
          imageB: img('mount-horses', 'Horses grazing in a mountain meadow'),
          paragraph: null,
        },
        {
          layout: 'insert',
          image: img('mount-firetrack', 'Old fire track through the forest'),
          caption: 'Fire roads cut through the forest — functional, not scenic.',
        },

        { type: 'heading', heading: 'Wildlife & Quiet Encounters' },
        {
          layout: 'cinematic',
          image: img('mount-alert-deer', 'Alert deer in a mountain clearing'),
          paragraph: "Eyes open, ears alert. Deer appear at the edge of clearings and disappear just as quickly. The park has more wildlife than most people see — patience is the only strategy.",
        },
        {
          layout: 'diptych',
          image: img('mount-wild-deer', 'Wild deer in the Smoky Mountains'),
          imageB: img('mount-groundhog', 'Groundhog beside a trail'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Valley Perspective & Twilight' },
        {
          layout: 'cinematic',
          image: img('mount-valley-view', 'Valley view at golden hour'),
          paragraph: "Ridges and fading light change the view fast. From the overlooks, the scale becomes apparent — not in a manageable way, but in the way that makes you recalibrate what large means.",
        },
        {
          layout: 'diptych',
          image: img('mount-twilight', 'Twilight over the mountain ridges'),
          imageB: img('mount-breakfast', 'Morning light and breakfast at a mountain cabin'),
          paragraph: "Morning and evening are the most honest times here. The light is lower, the mist thicker, and the mountains look exactly like what they are.",
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="The Smokies don't resolve into a single image. They accumulate — ridge after ridge, mist after mist — until you stop trying to frame them and just look."
      returnLink={{ label: 'Return to Tennessee', path: '/united-states/tennessee' }}
      nextLink={{ label: 'Next: Memphis', path: '/united-states/tennessee/memphis' }}
    />
  );
}

export default Mountains;
