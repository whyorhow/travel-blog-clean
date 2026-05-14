import React from "react";
import { LightTemplate } from "./templates";
import artImages from "../assets/artImages.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";

const parkImages = artImages.filter(img => img.category === "Parks");

const resolvePublicId = (id) => {
  const img = parkImages.find(i => i.id === id);
  if (!img) return null;
  return img.cloudinary.blog;
};

const locationData = {
  name: 'Green Spaces',
  seo: {
    title: 'Green Spaces — São Paulo | Nomad Scribbles',
    description: "São Paulo's parks as living rhythm, not decoration.",
  },
  coords: null,
  spatialContext: null,
};

function GreenSpaces() {
  return (
    <LightTemplate
      variant="nature"
      locationData={locationData}
      heroPageData={{ title: 'Green Spaces', subtitle: 'São Paulo' }}
      intro={{
        paragraphs: [
          "São Paulo's parks are not escapes from the city. They are where everyday life continues outdoors.",
          "People sit, move, and rest in the same spaces at the same time. There's a quiet understanding in how it all runs. Everyone brings their own pace and activity, but no one fully dominates the space. Over time, that creates a feeling that the park belongs to everyone and no one in particular, just for as long as you're in it.",
        ],
      }}
      rhythmInserts={[
        "It's still São Paulo. Just with less urgency.",
        'The trees here were already established before much of the city was built around them — and they haven\'t been pushed aside.',
      ]}
      narratives={[
        {
          image: { src: resolvePublicId('park2'), alt: 'A caterpillar crosses stone warmed by the sun' },
          heading: 'Shared Pace',
          paragraph: 'People sit on the grass with takeaway containers still half open, eating between conversations. Runners move through at a steady, even pace. People drift toward shade and stay there. Light moves across bags, arms, and the ground as leaves above move in the breeze.',
        },
        {
          image: { src: resolvePublicId('park1'), alt: 'Brazilwood tree' },
          heading: 'Part of Everyday Life',
          paragraph: "São Paulo is a city built in concrete, but it doesn't stay that way for long. Green spaces aren't treated as something separate or occasional — they're used as part of everyday life. People bring what they need and stay for hours. The same scenes repeat across different parks, on different days. After a while, you start to expect it.",
        },
        {
          image: { src: resolvePublicId('park4'), alt: 'A monkey pauses in the canopy above the paths' },
          heading: 'Moving Around Each Other',
          paragraph: "Monkeys move between branches without hesitation. Birds build nests in light posts. Ants cross picnic blankets in steady lines. People step around ants without thinking. It's not organised, and no one is directing it. They move around each other, close enough to notice, but not close enough to interrupt.",
        },
        {
          image: { src: resolvePublicId('park7'), alt: 'Bamboo canopy tunnel' },
          heading: 'What Stays',
          paragraph: 'Tree stumps gather moss over time. Fungi spread in rings around fallen wood. Fine cracks widen slightly, holding bits of soil where something new starts to grow. The parks hold their shape — not because they\'re maintained into stillness, but because they\'re used constantly.',
        },
      ]}
      bridgeQuote="It never settles into one way of being used."
      reflectiveClose="São Paulo's green spaces don't ask you to slow down. They simply make it easier."
      returnLink={{ label: 'Back to São Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Street Murals', path: '/brazil/saopaulo/street-murals' }}
    />
  );
}

export default GreenSpaces;
