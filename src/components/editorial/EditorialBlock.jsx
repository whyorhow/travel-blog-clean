import React, { useState } from 'react';
import {
  PersonalContainer,
  EditorialImage,
  BlockTitle,
  BlockBody,
  LocationNote,
  useEditorialSurface,
} from './EditorialPrimitives';

function imageClickHandler(onImageClick, image) {
  return onImageClick ? () => onImageClick(image) : undefined;
}

function EditorialImageColumn({ image, onImageClick, compact = false }) {
  return (
    <div
      className={`md:col-span-2 mt-6 md:mt-0 min-h-0 min-w-0 w-full overflow-hidden rounded-lg ${
        compact ? 'max-h-52 aspect-[4/3]' : 'max-h-72 md:max-h-80 aspect-[4/3] md:aspect-[3/4]'
      }`}
    >
      <EditorialImage
        image={image}
        onClick={imageClickHandler(onImageClick, image)}
        className="h-full w-full"
        showCaption={false}
      />
    </div>
  );
}

/**
 * Renders a single config-driven editorial block.
 */
function EditorialBlock({ block, atmosphere, surface, onImageClick }) {
  const { type } = block;
  const text = useEditorialSurface(surface);

  switch (type) {
    case 'memory':
      return (
        <PersonalContainer atmosphere={atmosphere} compact={block.compact} className="max-w-3xl">
          <BlockTitle {...pickTitle(block)} atmosphere={atmosphere} surface={surface} />
          {block.image ? (
            <div className="grid md:grid-cols-5 gap-6 items-start">
              <div className="md:col-span-3 min-w-0">
                <BlockBody text={block.text} surface={surface} className="font-cormorant italic text-lg" />
                {block.caption && <p className={`text-sm mt-3 ${text.muted}`}>{block.caption}</p>}
              </div>
              <EditorialImageColumn image={block.image} onImageClick={onImageClick} />
            </div>
          ) : (
            <BlockBody text={block.text} surface={surface} className="font-cormorant italic text-lg" />
          )}
        </PersonalContainer>
      );

    case 'favourite-place':
    case 'favourite-cafe':
    case 'favourite-bar':
      return (
        <PersonalContainer atmosphere={atmosphere}>
          <BlockTitle
            title={block.title}
            subtitle={block.subtitle || defaultFavouriteSubtitle(type)}
            atmosphere={atmosphere}
            surface={surface}
          />
          <div className={block.image ? 'grid md:grid-cols-5 gap-6 items-start' : undefined}>
            <div className={block.image ? 'md:col-span-3 min-w-0' : undefined}>
              <BlockBody text={block.text} surface={surface} />
              <LocationNote location={block.location} surface={surface} />
            </div>
            {block.image && (
              <EditorialImageColumn image={block.image} onImageClick={onImageClick} />
            )}
          </div>
        </PersonalContainer>
      );

    case 'custom-text':
      return (
        <PersonalContainer atmosphere={atmosphere} compact={block.compact}>
          <BlockTitle {...pickTitle(block)} atmosphere={atmosphere} surface={surface} align={block.align} />
          <BlockBody text={block.text} surface={surface} />
        </PersonalContainer>
      );

    case 'quote-card':
      return (
        <blockquote className="max-w-2xl mx-auto px-6 py-8 text-center">
          <div className={`border-l-2 pl-6 ${atmosphere.containerBorder} border-opacity-60`}>
            <p className={`text-xl md:text-2xl font-cormorant italic leading-relaxed ${text.body}`}>
              {block.quote || block.text}
            </p>
            {(block.attribution || block.caption) && (
              <footer className={`mt-4 text-sm ${text.muted}`}>
                — {block.attribution || block.caption}
              </footer>
            )}
          </div>
        </blockquote>
      );

    case 'small-gallery':
    case 'mini-photo-cluster':
      return (
        <div className="max-w-4xl mx-auto px-4">
          <BlockTitle {...pickTitle(block)} atmosphere={atmosphere} surface={surface} align="center" />
          <div className={`grid gap-3 ${galleryCols(block.images?.length)}`}>
            {block.images?.map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-md shadow-sm">
                <EditorialImage
                  image={img}
                  onClick={imageClickHandler(onImageClick, img)}
                  showCaption={false}
                  rounded="rounded-md"
                  className="h-full"
                />
              </div>
            ))}
          </div>
          {block.caption && (
            <p className={`text-sm text-center mt-4 italic ${atmosphere.captionClass}`}>{block.caption}</p>
          )}
        </div>
      );

    case 'divider-image':
      return (
        <figure className="w-full max-w-5xl mx-auto px-4 py-6">
          <div className={`overflow-hidden rounded-lg ${block.compact ? 'max-h-48 md:max-h-56' : 'max-h-72 md:max-h-96'}`}>
            <EditorialImage
              image={block.image}
              onClick={imageClickHandler(onImageClick, block.image)}
              showCaption={false}
              className="w-full h-full"
            />
          </div>
          {(block.caption || block.title) && (
            <figcaption className={`text-center text-sm mt-3 italic ${atmosphere.captionClass}`}>
              {block.caption || block.title}
            </figcaption>
          )}
        </figure>
      );

    case 'walking-route':
      return (
        <PersonalContainer atmosphere={atmosphere}>
          <BlockTitle title={block.title || 'A walk we kept taking'} subtitle={block.subtitle} atmosphere={atmosphere} surface={surface} />
          <div className={block.image ? 'grid md:grid-cols-5 gap-6 items-start' : undefined}>
            <div className={block.image ? 'md:col-span-3 min-w-0' : undefined}>
              <BlockBody text={block.text} surface={surface} />
              {block.note && <p className={`text-sm mt-2 ${text.muted}`}>{block.note}</p>}
              <LocationNote location={block.location} surface={surface} />
            </div>
            {block.image && (
              <EditorialImageColumn image={block.image} onImageClick={onImageClick} />
            )}
          </div>
          {!block.image && block.images?.length > 0 && (
            <div className={`grid gap-3 mt-6 ${block.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1 max-w-md'}`}>
              {block.images.map((routeImg, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg shadow-sm">
                  <EditorialImage image={routeImg} onClick={imageClickHandler(onImageClick, routeImg)} showCaption={false} />
                </div>
              ))}
            </div>
          )}
        </PersonalContainer>
      );

    case 'local-tip':
      return (
        <PersonalContainer atmosphere={atmosphere} compact className="border-dashed">
          <p className={`text-xs uppercase tracking-widest mb-2 ${text.muted}`}>Small discovery</p>
          <div className={block.image ? 'grid md:grid-cols-5 gap-5 items-start' : undefined}>
            <div className={block.image ? 'md:col-span-3 min-w-0' : undefined}>
              <BlockTitle title={block.title} atmosphere={atmosphere} surface={surface} />
              <BlockBody text={block.text || block.note} surface={surface} />
              <LocationNote location={block.location} surface={surface} />
            </div>
            {block.image && (
              <EditorialImageColumn image={block.image} onImageClick={onImageClick} compact />
            )}
          </div>
        </PersonalContainer>
      );

    case 'late-night-thought':
    case 'small-memory':
      return (
        <p className={`max-w-xl mx-auto px-6 py-4 text-center font-cormorant italic text-lg md:text-xl leading-relaxed ${text.muted}`}>
          {block.text || block.quote}
        </p>
      );

    case 'expandable-note':
      return <ExpandableNote block={block} atmosphere={atmosphere} surface={surface} onImageClick={onImageClick} />;

    case 'conversation-snippet':
      return (
        <PersonalContainer atmosphere={atmosphere} compact className="max-w-xl">
          <BlockTitle title={block.title} subtitle={block.subtitle} atmosphere={atmosphere} surface={surface} />
          <div className={`space-y-2 text-base ${text.body}`}>
            {(block.lines || []).map((line, i) => (
              <p key={i} className={line.speaker ? 'pl-4 border-l border-stone-300/50' : undefined}>
                {line.speaker && (
                  <span className={`text-xs uppercase tracking-wide block mb-1 ${text.muted}`}>{line.speaker}</span>
                )}
                {line.text}
              </p>
            ))}
          </div>
          {!block.lines?.length && <BlockBody text={block.text} surface={surface} />}
        </PersonalContainer>
      );

    case 'breathing-space':
      return <div className={block.compact ? 'h-8 md:h-12' : 'h-16 md:h-24'} aria-hidden />;

    case 'compact-section':
      return (
        <section className={`max-w-2xl mx-auto px-6 ${block.compact ? 'py-4' : 'py-6'}`}>
          <BlockTitle {...pickTitle(block)} atmosphere={atmosphere} surface={surface} />
          <BlockBody text={block.text} surface={surface} className="text-base" />
        </section>
      );

    case 'single-image-pause':
      return (
        <figure className="max-w-2xl mx-auto px-6 py-8">
          <div className="overflow-hidden rounded-lg shadow-md max-h-72 md:max-h-80">
            <EditorialImage
              image={block.image}
              onClick={imageClickHandler(onImageClick, block.image)}
              showCaption={false}
              className="w-full"
            />
          </div>
          {(block.caption || block.text) && (
            <figcaption className={`mt-3 text-sm text-center italic ${atmosphere.captionClass}`}>
              {block.caption || block.text}
            </figcaption>
          )}
        </figure>
      );

    case 'reflective-fragment':
      return (
        <aside className={`max-w-lg mx-auto px-8 py-6 border-y ${atmosphere.containerBorder}`}>
          <p className={`text-center font-cormorant italic text-lg ${text.muted}`}>{block.text}</p>
        </aside>
      );

    case 'personal-note':
      return (
        <PersonalContainer atmosphere={atmosphere} compact>
          <BlockBody text={block.text} surface={surface} />
        </PersonalContainer>
      );

    default:
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[EditorialBlock] Unknown type: ${type}`);
      }
      return null;
  }
}

function ExpandableNote({ block, atmosphere, surface, onImageClick }) {
  const [open, setOpen] = useState(block.defaultOpen ?? false);
  const text = useEditorialSurface(surface);

  return (
    <details
      className={`max-w-2xl mx-auto group border-b pb-2 ${atmosphere.containerBorder}`}
      open={open}
      onToggle={(e) => setOpen(e.target.open)}
    >
      <summary className={`cursor-pointer list-none flex justify-between items-center py-3 ${text.accent} font-medium`}>
        <span>{block.title || 'A note we almost left out'}</span>
        <span className="text-stone-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
      </summary>
      <div className="pt-4 pb-6">
        <BlockBody text={block.text} surface={surface} />
        {block.image && (
          <div className="mt-4 aspect-video max-h-48 rounded-md overflow-hidden">
            <EditorialImage image={block.image} onClick={imageClickHandler(onImageClick, block.image)} />
          </div>
        )}
      </div>
    </details>
  );
}

function pickTitle(block) {
  return { title: block.title, subtitle: block.subtitle };
}

function defaultFavouriteSubtitle(type) {
  if (type === 'favourite-cafe') return 'Somewhere we kept drifting back to';
  if (type === 'favourite-bar') return 'A bar we returned to more than once';
  return 'A place that stayed with us';
}

function galleryCols(count) {
  if (!count || count <= 2) return 'grid-cols-2';
  if (count === 3) return 'grid-cols-3';
  return 'grid-cols-2 md:grid-cols-4';
}

export default EditorialBlock;
