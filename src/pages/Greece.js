import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { CountryLandingTemplate } from "./templates";
import CountryFeatureCard from "../components/CountryFeatureCard";
import greeceMap from "../assets/images/Greece-Map.svg";
import greeceHeroConfig from "./greece/greece.hero.config";
import { hasGreeceStaticHero, isMobileViewport } from "../utils/staticPageHero";
import { getHubNote } from "../config/regionScope";

function Greece() {
  const featureCard = (
    <div className="flex w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] flex-col items-center gap-5">
      <CountryFeatureCard
        to="/greece/athens"
        legacyPath="/images/Greece/Athens/Small/Tragopogon Flower.webp"
        title="Athens"
        subtitle="Enter the city"
        rounded="xl"
      />
      <p className="max-w-sm text-center font-cormorant text-[1.1rem] sm:text-[1.2rem] leading-relaxed text-stone-700 px-2">
        Stone streets, hillside neighbourhoods, ancient ruins, and everyday life beneath the Acropolis.
      </p>
    </div>
  );

  const mapEl = (
    <img
      src={greeceMap}
      alt="Map of Greece"
      className="h-auto w-full"
      width={800}
      height={600}
    />
  );

  return (
    <CountryLandingTemplate
      variant="mediterranean"
      seo={{
        title: SEO_TITLES["/greece"],
        description:
          'Begin in Athens, where ancient stone, everyday life, and steep streets meet beneath the Acropolis.',
        image: "/images/Greece/Athens/Small/Acropolis Hill.webp",
        slug: "/greece",
      }}
      heroConfig={greeceHeroConfig}
      skipHero={hasGreeceStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Greece' }}
      showHeroTitle
      scopeNote={getHubNote("/greece")}
      introBridge={{
        paragraphs: [
          'Some cities preserve their history.',
          'Athens carries it through everyday life.',
          'Ancient stone sits above busy streets, old neighbourhoods climb the hillsides below the Acropolis, and ordinary walks often pass places that have stood for thousands of years. This is where our journey through Greece begins.',
        ],
      }}
      featureCard={featureCard}
      mapComponent={mapEl}
      returnLink={{ label: "All Adventures", path: "/" }}
    />
  );
}

export default Greece;
