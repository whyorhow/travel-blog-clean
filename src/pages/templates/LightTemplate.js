import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { tw, tokens } from '../../styles';
import SEO from '../../components/SEO';
import {
  Hero,
  LocationHero,
  NarrativeSplit,
  RhythmInsert,
  BridgeQuote,
  SubsectionNavigator,
  ReflectiveClose
} from '../../components/layout';
import GalleryWall from '../../components/GalleryWall';
import SimpleLightbox from '../../components/SimpleLightbox';
import ContextMap from '../../components/ContextMap';
import { cloudinaryImageUrl } from '../../utils/cloudinary';

/**
 * LIGHT EDITORIAL TEMPLATE
 * 
 * Core identity: atmosphere + pacing + immersion
 * 
 * Use for: Destinations that are felt more than navigated.
 * Linear storytelling, emotional pacing, visual breathing room.
 * 
 * VARIANTS — each defines a content contract:
 * 
 *   "urban"      → Compact city page. Single intro paragraph, clean palette.
 *                  Props: intro (single paragraph), bridgeQuote
 * 
 *   "immersive"  → Essayistic/reflective. Rio, Budapest, Athens-style.
 *                  Paper texture surface, multi-paragraph intro, narrative sequences.
 *                  Props: intro.paragraphs[], narratives[], rhythmInserts[], bridgeQuote
 * 
 *   "nature"     → Pantanal/Iguazu-style. Feature image, minimal text.
 *                  Props: introText (single string), featureImage, bridgeQuote
 * 
 *   "coastal"    → Same content shape as nature, lightest overlay.
 *                  Props: introText (single string), featureImage, bridgeQuote
 * 
 * Shared across all variants: locationData, heroImage, sections (optional),
 * galleryImages, reflectiveClose
 * 
 * Structure: Hero → [variant content] → Bridge → [optional Navigator] → Gallery → Close
 */

// ── Variant config ────────────────────────────────────────────────────────────
// Controls tonal flavour: palette, hero overlay, gallery language, close style.
// Never changes which layout components exist — only how they look.

const VARIANT_CONFIG = {
  urban: {
    overlayOpacity: 25,
    surface: 'dark',        // dark backgrounds, light text
    galleryHeading: 'Further Fragments',
    bridgeHandwriting: true,
    closeStyle: 'inline',   // no border — just quiet italic text
    paperTexture: false,
  },
  immersive: {
    overlayOpacity: 35,
    surface: 'tornPaper',   // paper texture with torn-paper SVG filter
    galleryHeading: 'Further Fragments',
    bridgeHandwriting: true,
    closeStyle: 'vintage',  // gold-bordered box
    paperTexture: true,
  },
  nature: {
    overlayOpacity: 20,
    surface: 'default',     // neutral, clean
    galleryHeading: 'Further Fragments',
    bridgeHandwriting: true,
    closeStyle: 'inline',
    paperTexture: false,
  },
  coastal: {
    overlayOpacity: 15,
    surface: 'default',
    galleryHeading: 'Further Fragments',
    bridgeHandwriting: true,
    closeStyle: 'inline',
    paperTexture: false,
  },
};

// ── Surface styles ────────────────────────────────────────────────────────────

const SURFACE_STYLES = {
  dark: {
    wrapper: `min-h-screen pb-16 ${tw.surface.dark.body}`,
    wrapperInline: {},
    title: `text-5xl md:text-6xl font-semibold ${tw.rio.gold} mb-8`,
    intro: `text-xl md:text-2xl leading-relaxed ${tw.surface.dark.lead} max-w-2xl mx-auto`,
  },
  paper: {
    wrapper: `min-h-screen pb-16 ${tw.surface.paper.body}`,
    wrapperInline: {
      backgroundColor: tokens.colors.background.paper,
    },
    title: `text-5xl md:text-6xl font-semibold ${tw.surface.paper.accent} mb-8 text-center`,
    intro: `${tw.surface.paper.body} mb-8`,
  },
  tornPaper: {
    wrapper: `min-h-screen pb-16 ${tw.surface.paper.body}`,
    wrapperInline: {},
    title: `text-5xl md:text-6xl font-semibold ${tw.surface.paper.accent} mb-8 text-center`,
    intro: `${tw.surface.paper.body} mb-8`,
  },
  default: {
    wrapper: 'min-h-screen pb-16',
    wrapperInline: {},
    title: `text-5xl md:text-6xl font-semibold ${tw.gold} mb-8`,
    intro: `text-xl md:text-2xl leading-relaxed ${tw.textTertiary} max-w-2xl mx-auto`,
  },
};

// ── Reflective close variants ─────────────────────────────────────────────────

function CloseBlock({ text, style }) {
  if (style === 'vintage') {
    return (
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div
          className={`p-8 border-2 ${tw.surface.paper.border} rounded-sm`}
          style={{
            background: `linear-gradient(to bottom, rgba(184,134,11,0.05), rgba(184,134,11,0.1))`,
            boxShadow: tokens.shadows.highlight,
          }}
        >
          <p className={`text-xl leading-relaxed ${tw.surface.paper.body} font-cormorant italic`}>
            {text}
          </p>
        </div>
      </section>
    );
  }
  // "inline" — quiet, no border
  return <ReflectiveClose text={text} />;
}

// ── Template ──────────────────────────────────────────────────────────────────

function LightTemplate({
  variant = 'nature',
  locationData,
  heroImage,     // { src, alt } — use this OR heroConfig, not both
  heroConfig,    // from {location}.hero.config.js — uses semantic Hero resolver
  heroPageData,  // { title, subtitle } — passed to Hero if heroConfig used

  // urban variant
  intro,         // { paragraph: string } for urban; { paragraphs: string[] } for immersive

  // nature / coastal variant
  introText,     // single string
  featureImage,  // { src, alt, caption? }

  // immersive variant
  narratives,    // [{ image, heading, paragraph }]
  rhythmInserts, // string[]

  // shared
  bridgeQuote,
  sections,
  galleryImages,
  galleryBackground,
  reflectiveClose,
  returnLink,   // optional { label, path } — renders a back nav pill
  nextLink,     // optional { label, path } — renders a forward nav pill to sibling page
}) {
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(null);
  const [narrativeLightboxImage, setNarrativeLightboxImage] = useState(null);

  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.nature;
  const surface = SURFACE_STYLES[config.surface] ?? SURFACE_STYLES.default;

  return (
    <>
      {galleryImages?.length > 0 && (
        <SimpleLightbox
          images={galleryImages}
          currentIndex={galleryLightboxIndex}
          setCurrentIndex={setGalleryLightboxIndex}
        />
      )}

      {/* Narrative image lightbox — single-image, no index navigation */}
      {narrativeLightboxImage && (
        <SimpleLightbox
          images={[narrativeLightboxImage]}
          currentIndex={0}
          setCurrentIndex={(v) => { if (v === null) setNarrativeLightboxImage(null); }}
        />
      )}

      <div className={surface.wrapper} style={surface.wrapperInline}>
        <SEO {...locationData.seo} />

        {/* 1. HERO — semantic resolver if heroConfig provided, otherwise standard LocationHero */}
        {heroConfig ? (
          <Hero heroConfig={heroConfig} pageData={heroPageData} />
        ) : heroImage ? (
          <LocationHero
            imageSrc={heroImage.src}
            alt={heroImage.alt}
            overlayOpacity={config.overlayOpacity}
          />
        ) : (
          <Hero heroConfig={{}} pageData={heroPageData} />
        )}

        {/* 2. VARIANT CONTENT ─────────────────────────────────────────── */}

        {/* URBAN: compact single intro paragraph */}
        {variant === 'urban' && (
          <section className="max-w-3xl mx-auto px-6 py-16 text-center">
            {(heroConfig || heroImage) && <h1 className={surface.title}>{locationData.name}</h1>}
            <p className={surface.intro}>
              {intro?.paragraph}
            </p>
          </section>
        )}

        {/* IMMERSIVE: paper texture, multi-paragraph intro + narrative sequence + rhythm */}
        {variant === 'immersive' && (
          <>
            {/* Torn-paper texture wrapper — absorbed from Rio's bespoke treatment */}
            <div className="relative w-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                style={{
                  backgroundImage: `url(${require('../../assets/Backgrounds/PaperTexture.jpg')})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'url(#torn-paper-filter)',
                  opacity: 0.95,
                }}
              />
              <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 relative z-10">
                {(heroConfig || heroImage) && <h1 className={surface.title}>{locationData.name}</h1>}
                {intro?.paragraphs?.map((text, i) => (
                  <p key={i} className={`${surface.intro} mb-8`}>{text}</p>
                ))}

                {/* First rhythm insert — inside paper wrapper */}
                {rhythmInserts?.[0] && (
                  <RhythmInsert text={rhythmInserts[0]} align="center" />
                )}

                {/* Narrative sequence — alternating sides with rhythm between */}
                {narratives?.map((narrative, i) => (
                  <React.Fragment key={i}>
                    {narrative.type === 'heading' ? (
                      <h2 className="text-3xl md:text-4xl font-handwriting text-center mt-16 mb-8" style={{ color: '#B8860B' }}>
                        {narrative.heading}
                      </h2>
                    ) : (
                      <NarrativeSplit
                        image={narrative.image}
                        imageB={narrative.imageB}
                        heading={narrative.heading}
                        paragraph={narrative.paragraph}
                        layout={narrative.layout || 'split'}
                        imageLeft={narrative.imageLeft ?? (i % 2 === 0)}
                        onExpand={
                          narrative.layout === 'cinematic' ? () => setNarrativeLightboxImage({
                            image: cloudinaryImageUrl(narrative.image?.src, { width: 1600, format: 'webp' }),
                            title: narrative.image?.alt || '',
                            description: narrative.expandDescription ?? narrative.paragraph ?? '',
                          }) :
                          narrative.layout === 'split' ? () => setNarrativeLightboxImage({
                            image: cloudinaryImageUrl(narrative.image?.src, { width: 1200, format: 'webp' }),
                            title: narrative.image?.alt || '',
                            description: narrative.expandDescription ?? '',
                          }) : undefined
                        }
                      />
                    )}
                    {i < narratives.length - 1 && rhythmInserts?.[i + 1] && (
                      <RhythmInsert text={rhythmInserts[i + 1]} align="center" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* SVG filter for torn-paper edge effect */}
            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
              <defs>
                <filter id="torn-paper-filter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                </filter>
              </defs>
            </svg>
          </>
        )}

        {/* NATURE / COASTAL: minimal intro + feature image + optional narrative sequence */}
        {(variant === 'nature' || variant === 'coastal') && (
          <>
            <section className="max-w-3xl mx-auto px-6 py-16 text-center">
              {(heroConfig || heroImage) && <h1 className={surface.title}>{locationData.name}</h1>}
              {introText && <p className={surface.intro}>{introText}</p>}
              {intro?.paragraphs?.map((text, i) => (
                <p key={i} className={`${surface.intro} mb-6`}>{text}</p>
              ))}
            </section>

            {featureImage && (
              <section className="w-full py-8">
                <div className="max-w-6xl mx-auto px-6">
                  <div className="relative overflow-hidden rounded-lg shadow-md">
                    <img
                      src={featureImage.src}
                      alt={featureImage.alt}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {featureImage.caption && (
                    <p className={`text-sm mt-4 text-center italic ${surface.muted || 'text-stone-500'}`}>
                      {featureImage.caption}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Optional narrative sequence */}
            {narratives?.length > 0 && (
              <div className="max-w-5xl mx-auto px-6 md:px-12 py-8">
                {rhythmInserts?.[0] && <RhythmInsert text={rhythmInserts[0]} align="center" />}
                {narratives.map((narrative, i) => (
                  <React.Fragment key={i}>
                    {narrative.type === 'heading' ? (
                      <h2 className="text-3xl md:text-4xl font-handwriting text-center mt-16 mb-8" style={{ color: '#B8860B' }}>
                        {narrative.heading}
                      </h2>
                    ) : (
                      <NarrativeSplit
                        image={narrative.image}
                        imageB={narrative.imageB}
                        heading={narrative.heading}
                        paragraph={narrative.paragraph}
                        layout={narrative.layout || 'split'}
                        imageLeft={narrative.imageLeft ?? (i % 2 === 0)}
                        onExpand={
                          narrative.layout === 'cinematic' ? () => setNarrativeLightboxImage({
                            image: cloudinaryImageUrl(narrative.image?.src, { width: 1600, format: 'webp' }),
                            title: narrative.image?.alt || '',
                            description: narrative.expandDescription ?? narrative.paragraph ?? '',
                          }) :
                          narrative.layout === 'split' ? () => setNarrativeLightboxImage({
                            image: cloudinaryImageUrl(narrative.image?.src, { width: 1200, format: 'webp' }),
                            title: narrative.image?.alt || '',
                            description: narrative.expandDescription ?? '',
                          }) : undefined
                        }
                      />
                    )}
                    {i < narratives.length - 1 && rhythmInserts?.[i + 1] && (
                      <RhythmInsert text={rhythmInserts[i + 1]} align="center" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </>
        )}

        {/* 3. BRIDGE — emotional transition */}
        <BridgeQuote
          quote={bridgeQuote}
          useHandwriting={config.bridgeHandwriting}
        />

        {/* 4. MAP — always shown when coords exist */}
        {locationData.coords && (
          sections && sections.length > 0 ? (
            // Full navigator: map + subsection links
            <SubsectionNavigator
              locationCoords={locationData.coords}
              sections={sections}
              contextText={locationData.spatialContext}
            />
          ) : (
            // Map-only: orientation device, no nav links
            <div className="max-w-2xl mx-auto px-6 my-12 py-8 border-y border-stone-300/40">
              <p className="text-stone-500 text-xs uppercase tracking-widest text-center mb-4">
                Where these fragments exist
              </p>
              <ContextMap
                markers={[locationData.coords]}
                zoomToId={locationData.coords.id}
                geography={locationData.coords.geography}
                showTitle={false}
                transparent={true}
                lightBackground={true}
              />
              {locationData.spatialContext && (
                <p className="text-stone-600 text-sm italic text-center mt-3 font-handwriting">
                  {locationData.spatialContext}
                </p>
              )}
            </div>
          )
        )}

        {/* 5. GALLERY */}
        {galleryImages?.length > 0 && (
          <section id="gallery" className="relative py-16 w-full">
            <div
              className="w-full min-h-[60vh]"
              style={galleryBackground ? {
                backgroundImage: `url(${galleryBackground})`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
              } : {}}
            >
              <div className="w-full bg-stone-800/10 p-6 text-center">
                <h2 className="text-4xl md:text-6xl font-bold font-handwriting" style={{ color: tokens.colors.background.paper }}>
                  {config.galleryHeading}
                </h2>
              </div>
              <div className="p-8">
                <GalleryWall
                  images={galleryImages}
                  openLightbox={(index) => setGalleryLightboxIndex(index)}
                  backgroundImage={galleryBackground}
                />
              </div>
            </div>
          </section>
        )}

        {/* 6. REFLECTIVE CLOSE */}
        <CloseBlock text={reflectiveClose} style={config.closeStyle} />

        {/* 7. OPTIONAL NAV PILLS — return + next */}
        {(returnLink || nextLink) && (
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-16 px-4">
            {returnLink && (
              <Link
                to={returnLink.path}
                className={`flex flex-row items-center justify-center ${tw.rio.gold} hover:text-[#e8eac7] transition-colors bg-stone-950/80 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-lg`}
              >
                <span className="text-lg mr-2">←</span>
                <span className="text-xs md:text-sm font-bold tracking-widest uppercase">
                  {returnLink.label}
                </span>
              </Link>
            )}
            {nextLink && (
              <Link
                to={nextLink.path}
                className={`flex flex-row items-center justify-center ${tw.rio.gold} hover:text-[#e8eac7] transition-colors bg-stone-950/80 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-lg`}
              >
                <span className="text-xs md:text-sm font-bold tracking-widest uppercase">
                  {nextLink.label}
                </span>
                <span className="text-lg ml-2">→</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default LightTemplate;
