import React, { useState } from "react";
import { Link } from "react-router-dom";
import CloudinaryImage from "../CloudinaryImage";
import {
  PersonalContainer,
  EditorialImage,
  BlockTitle,
  BlockBody,
  LocationNote,
  EditorialBlockLinks,
  EditorialExternalLink,
  useEditorialSurface,
} from "./EditorialPrimitives";
import { DO_THIS_AGAIN_TITLE } from "./editorialUtils";

function imageClickHandler(onImageClick, image) {
  if (image?.interactive === false) return undefined;
  return onImageClick ? () => onImageClick(image) : undefined;
}

function EditorialImageColumn({
  image,
  onImageClick,
  compact = false,
  objectFit = "cover",
}) {
  const natural = objectFit === "natural";
  return (
    <div
      className={`md:col-span-2 mt-6 md:mt-0 min-w-0 w-full overflow-hidden rounded-lg ${
        natural
          ? ""
          : compact
            ? "max-h-52 aspect-[4/3]"
            : "max-h-72 md:max-h-80 aspect-[4/3] md:aspect-[3/4]"
      }`}
    >
      <EditorialImage
        image={image}
        onClick={imageClickHandler(onImageClick, image)}
        objectFit={objectFit}
        className={natural ? "" : "h-full w-full"}
        showCaption={false}
      />
    </div>
  );
}

function LinkBannerImage({ block, title }) {
  if (!block.image && !block.imageUrl) return null;

  const imageClass =
    "absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105";

  return (
    <div className="link-banner-card__image">
      {block.image ? (
        <CloudinaryImage
          legacyPath={block.image}
          alt={block.imageAlt || title || ""}
          sizes="(max-width: 1023px) 100vw, 224px"
          widths={[400, 600, 900, 1200]}
          className={imageClass}
        />
      ) : (
        <img
          src={block.imageUrl}
          alt={block.imageAlt || title || ""}
          loading="lazy"
          decoding="async"
          className={imageClass}
        />
      )}
    </div>
  );
}

function LinkBannerContent({ block, atmosphere, text }) {
  const shellClass = `link-banner-card group relative overflow-hidden shadow-md border-y hover:shadow-lg transition-all duration-300 w-full ${atmosphere.containerBorder} ${atmosphere.containerBg}`;

  const inner = (
    <>
      <LinkBannerImage block={block} title={block.title} />
      <div className="flex w-full min-w-0 items-center">
        <div className="flex-1 px-6 lg:px-10 py-5 lg:py-6 min-w-0">
          {block.eyebrow && (
            <p
              className={`text-xs uppercase tracking-widest font-medium mb-1 ${text.muted}`}
            >
              {block.eyebrow}
            </p>
          )}
          <h3
            className={`text-2xl lg:text-3xl font-bold font-cormorant ${atmosphere.titleAccent}`}
          >
            {block.title}
          </h3>
          {block.tagline && (
            <p
              className={`text-base lg:text-lg italic font-cormorant mt-2 leading-relaxed ${text.body}`}
            >
              {block.tagline}
            </p>
          )}
        </div>
        <div className="pr-5 lg:pr-10 flex-shrink-0 self-center group-hover:translate-x-1 transition-transform duration-200">
          <img
            src={`${process.env.PUBLIC_URL}/assets/enlargev2.svg`}
            alt=""
            aria-hidden="true"
            className="w-7 h-7 lg:w-9 lg:h-9"
          />
        </div>
      </div>
    </>
  );

  if (block.href) {
    return (
      <a
        href={block.href}
        target="_blank"
        rel="noopener noreferrer"
        className={shellClass}
      >
        {inner}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  return (
    <Link to={block.path} className={shellClass}>
      {inner}
    </Link>
  );
}

/**
 * Renders a single config-driven editorial block.
 */
const BLOCK_SECTION = "my-8 md:my-12 px-4 sm:px-6";

function renderMemoryBlock({ block, atmosphere, surface, onImageClick, text }) {
  return (
    <PersonalContainer
      atmosphere={atmosphere}
      compact={block.compact}
      className="max-w-3xl"
    >
      <BlockTitle
        {...pickTitle(block)}
        atmosphere={atmosphere}
        surface={surface}
      />
      {block.image ? (
        <div className="grid md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-3 min-w-0">
            <BlockBody
              text={block.text}
              surface={surface}
              className="font-cormorant italic text-lg"
            />
            {block.caption && (
              <p
                className={`text-sm mt-3 leading-relaxed not-italic ${text.body}`}
              >
                {block.caption}
              </p>
            )}
            {(block.internalLink || block.link) && (
              <EditorialBlockLinks
                block={block}
                atmosphere={atmosphere}
                surface={surface}
              />
            )}
            <LocationNote location={block.location} surface={surface} />
          </div>
          <EditorialImageColumn
            image={block.image}
            onImageClick={onImageClick}
          />
        </div>
      ) : (
        <BlockBody
          text={block.text}
          surface={surface}
          className="font-cormorant italic text-lg"
        />
      )}
    </PersonalContainer>
  );
}

function renderFavouriteBlock({
  block,
  type,
  atmosphere,
  surface,
  onImageClick,
  favouriteCardLayout,
}) {
  if (favouriteCardLayout) {
    const subtitle = block.subtitle || defaultFavouriteSubtitle(type);
    return (
      <article className="place-card">
        {block.image && (
          <div className="place-card__media">
            <EditorialImage
              image={block.image}
              onClick={imageClickHandler(onImageClick, block.image)}
              showCaption={false}
              rounded="rounded-none"
              className="h-full w-full"
            />
          </div>
        )}
        <div className="place-card-content">
          {block.title && <h3 className="place-card-title">{block.title}</h3>}
          {subtitle && <p className="place-card-subtitle">{subtitle}</p>}
          <BlockBody
            text={block.text}
            surface={surface}
            className="place-card-text"
          />
          <EditorialBlockLinks
            block={block}
            atmosphere={atmosphere}
            surface={surface}
          />
          {block.location && (
            <p className="place-card-location">{block.location}</p>
          )}
          {block.images?.length > 0 && (
            <div
              className={`place-card-support-images ${block.images.length === 1 ? "!grid-cols-1" : ""}`}
            >
              {block.images.map((supportImg, i) => (
                <EditorialImage
                  key={i}
                  image={supportImg}
                  onClick={imageClickHandler(onImageClick, supportImg)}
                  showCaption={false}
                  rounded="rounded-md"
                />
              ))}
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <PersonalContainer atmosphere={atmosphere}>
      <BlockTitle
        title={block.title}
        subtitle={block.subtitle || defaultFavouriteSubtitle(type)}
        atmosphere={atmosphere}
        surface={surface}
      />
      <div
        className={
          block.image ? "grid md:grid-cols-5 gap-6 items-start" : undefined
        }
      >
        <div className={block.image ? "md:col-span-3 min-w-0" : undefined}>
          <BlockBody text={block.text} surface={surface} />
          <EditorialBlockLinks
            block={block}
            atmosphere={atmosphere}
            surface={surface}
          />
          <LocationNote location={block.location} surface={surface} />
        </div>
        {block.image && (
          <EditorialImageColumn
            image={block.image}
            onImageClick={onImageClick}
          />
        )}
      </div>
      {block.images?.length > 0 && (
        <div className={`grid gap-3 mt-6 ${galleryCols(block.images.length)}`}>
          {block.images.map((supportImg, i) => (
            <div
              key={i}
              className="aspect-[4/3] overflow-hidden rounded-md shadow-sm"
            >
              <EditorialImage
                image={supportImg}
                onClick={imageClickHandler(onImageClick, supportImg)}
                showCaption={false}
                rounded="rounded-md"
                className="h-full"
              />
            </div>
          ))}
        </div>
      )}
    </PersonalContainer>
  );
}

function renderCustomTextBlock({ block, atmosphere, surface, presentation }) {
  if (presentation === "narrative") {
    return (
      <div className={`section-narrative ${block.containerClass || ""}`}>
        <BlockTitle
          {...pickTitle(block)}
          atmosphere={atmosphere}
          surface={surface}
          align={block.align}
        />
        <BlockBody text={block.text} surface={surface} />
      </div>
    );
  }

  return (
    <PersonalContainer
      atmosphere={atmosphere}
      compact={block.compact}
      className={block.containerClass || ""}
    >
      <BlockTitle
        {...pickTitle(block)}
        atmosphere={atmosphere}
        surface={surface}
        align={block.align}
      />
      <BlockBody text={block.text} surface={surface} />
    </PersonalContainer>
  );
}

function EditorialBlock({
  block,
  atmosphere,
  surface,
  onImageClick,
  favouriteCardLayout = false,
  presentation = "default",
}) {
  const { type } = block;
  const text = useEditorialSurface(surface);

  const renderers = {
    memory: () =>
      renderMemoryBlock({ block, atmosphere, surface, onImageClick, text }),
    "favourite-place": () =>
      renderFavouriteBlock({
        block,
        type,
        atmosphere,
        surface,
        onImageClick,
        favouriteCardLayout,
      }),
    "favourite-cafe": () =>
      renderFavouriteBlock({
        block,
        type,
        atmosphere,
        surface,
        onImageClick,
        favouriteCardLayout,
      }),
    "favourite-bar": () =>
      renderFavouriteBlock({
        block,
        type,
        atmosphere,
        surface,
        onImageClick,
        favouriteCardLayout,
      }),
    "custom-text": () =>
      renderCustomTextBlock({ block, atmosphere, surface, presentation }),
    "quote-card": () => (
      <blockquote className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-10 text-center">
        <div
          className={`border-l-2 pl-6 ${atmosphere.containerBorder} border-opacity-60`}
        >
          <p
            className={`text-xl md:text-2xl font-cormorant italic leading-relaxed ${text.body}`}
          >
            {block.quote || block.text}
          </p>
          {(block.attribution || block.caption) && (
            <footer className={`mt-4 text-sm ${text.muted}`}>
              — {block.attribution || block.caption}
            </footer>
          )}
        </div>
      </blockquote>
    ),
    "small-gallery": () => (
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <BlockTitle
          {...pickTitle(block)}
          atmosphere={atmosphere}
          surface={surface}
          align="center"
        />
        <div className={`grid gap-3 ${galleryCols(block.images?.length)}`}>
          {block.images?.map((img, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-md shadow-sm"
            >
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
          <p
            className={`text-sm text-center mt-4 italic ${atmosphere.captionClass}`}
          >
            {block.caption}
          </p>
        )}
      </div>
    ),
    "mini-photo-cluster": () => (
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <BlockTitle
          {...pickTitle(block)}
          atmosphere={atmosphere}
          surface={surface}
          align="center"
        />
        <div className={`grid gap-3 ${galleryCols(block.images?.length)}`}>
          {block.images?.map((img, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-md shadow-sm"
            >
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
          <p
            className={`text-sm text-center mt-4 italic ${atmosphere.captionClass}`}
          >
            {block.caption}
          </p>
        )}
      </div>
    ),
    "divider-image": () => (
      <figure className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div
          className={`overflow-hidden rounded-lg ${block.compact ? "max-h-48 md:max-h-56" : "max-h-72 md:max-h-96"}`}
        >
          <EditorialImage
            image={block.image}
            onClick={imageClickHandler(onImageClick, block.image)}
            showCaption={false}
            className="w-full h-full"
          />
        </div>
        {(block.caption || block.title) && (
          <figcaption
            className={`text-center text-sm mt-3 italic ${atmosphere.captionClass}`}
          >
            {block.caption || block.title}
          </figcaption>
        )}
      </figure>
    ),
    "walking-route": () => (
      <PersonalContainer atmosphere={atmosphere}>
        <BlockTitle
          title={block.title || "A walk we kept taking"}
          subtitle={block.subtitle}
          atmosphere={atmosphere}
          surface={surface}
        />
        <div
          className={
            block.image ? "grid md:grid-cols-5 gap-6 items-start" : undefined
          }
        >
          <div className={block.image ? "md:col-span-3 min-w-0" : undefined}>
            <BlockBody text={block.text} surface={surface} />
            {block.note && (
              <p className={`text-sm mt-2 ${text.muted}`}>{block.note}</p>
            )}
            <LocationNote location={block.location} surface={surface} />
          </div>
          {block.image && (
            <EditorialImageColumn
              image={block.image}
              onImageClick={onImageClick}
            />
          )}
        </div>
        {!block.image && block.images?.length > 0 && (
          <div
            className={`grid gap-3 mt-6 ${block.images.length > 1 ? "grid-cols-2" : "grid-cols-1 max-w-md"}`}
          >
            {block.images.map((routeImg, i) => (
              <div
                key={i}
                className="aspect-[4/3] overflow-hidden rounded-lg shadow-sm"
              >
                <EditorialImage
                  image={routeImg}
                  onClick={imageClickHandler(onImageClick, routeImg)}
                  showCaption={false}
                />
              </div>
            ))}
          </div>
        )}
      </PersonalContainer>
    ),
    "local-tip": () => (
      <PersonalContainer
        atmosphere={atmosphere}
        compact
        className="border-dashed"
      >
        <p className={`text-xs uppercase tracking-widest mb-2 ${text.muted}`}>
          Small discovery
        </p>
        <div
          className={
            block.image ? "grid md:grid-cols-5 gap-5 items-start" : undefined
          }
        >
          <div className={block.image ? "md:col-span-3 min-w-0" : undefined}>
            <BlockTitle
              title={block.title}
              atmosphere={atmosphere}
              surface={surface}
            />
            <BlockBody text={block.text || block.note} surface={surface} />
            <EditorialBlockLinks
              block={block}
              atmosphere={atmosphere}
              surface={surface}
            />
            <LocationNote location={block.location} surface={surface} />
          </div>
          {block.image && (
            <EditorialImageColumn
              image={block.image}
              onImageClick={onImageClick}
              compact
            />
          )}
        </div>
      </PersonalContainer>
    ),
    "late-night-thought": () => (
      <aside
        className="editorial-diary-note max-w-2xl"
        aria-label="Journal note"
      >
        {block.text || block.quote}
      </aside>
    ),
    "small-memory": () => (
      <aside
        className="editorial-diary-note max-w-2xl"
        aria-label="Journal note"
      >
        {block.text || block.quote}
      </aside>
    ),
    "expandable-note": () => (
      <ExpandableNote
        block={block}
        atmosphere={atmosphere}
        surface={surface}
        onImageClick={onImageClick}
      />
    ),
    "conversation-snippet": () => (
      <PersonalContainer atmosphere={atmosphere} compact className="max-w-xl">
        <BlockTitle
          title={block.title}
          subtitle={block.subtitle}
          atmosphere={atmosphere}
          surface={surface}
        />
        <div className={`space-y-2 text-base ${text.body}`}>
          {(block.lines || []).map((line, i) => (
            <p
              key={i}
              className={
                line.speaker ? "pl-4 border-l border-stone-300/50" : undefined
              }
            >
              {line.speaker && (
                <span
                  className={`text-xs uppercase tracking-wide block mb-1 ${text.muted}`}
                >
                  {line.speaker}
                </span>
              )}
              {line.text}
            </p>
          ))}
        </div>
        {!block.lines?.length && (
          <BlockBody text={block.text} surface={surface} />
        )}
      </PersonalContainer>
    ),
    "breathing-space": () => (
      <div
        className={
          block.compact
            ? "h-4 md:h-5 -mt-6 md:-mt-8"
            : "h-8 md:h-10 -mt-8 md:-mt-10"
        }
        aria-hidden
      />
    ),
    "compact-section": () => (
      <section
        className={`max-w-2xl mx-auto px-4 sm:px-6 ${block.compact ? "py-4" : "py-6"}`}
      >
        <BlockTitle
          {...pickTitle(block)}
          atmosphere={atmosphere}
          surface={surface}
        />
        <BlockBody text={block.text} surface={surface} className="text-base" />
      </section>
    ),
    "single-image-pause": () => (
      <figure className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="overflow-hidden rounded-lg shadow-md max-h-72 md:max-h-80">
          <EditorialImage
            image={block.image}
            onClick={imageClickHandler(onImageClick, block.image)}
            showCaption={false}
            className="w-full"
          />
        </div>
        {(block.caption || block.text) && (
          <figcaption
            className={`mt-3 text-sm text-center italic ${atmosphere.captionClass}`}
          >
            {block.caption || block.text}
          </figcaption>
        )}
      </figure>
    ),
    "reflective-fragment": () => (
      <aside
        className="editorial-diary-note max-w-2xl"
        aria-label="Reflective note"
      >
        {block.text}
      </aside>
    ),
    "do-this-again": () => {
      const paragraphs = Array.isArray(block.text)
        ? block.text.filter(Boolean)
        : block.text
          ? [block.text]
          : [];
      return (
        <aside
          className="section-note"
          aria-label={block.title || DO_THIS_AGAIN_TITLE}
        >
          <h3>{block.title || DO_THIS_AGAIN_TITLE}</h3>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className={i > 0 ? "mt-3" : undefined}>
              {paragraph}
            </p>
          ))}
        </aside>
      );
    },
    "link-banner": () => (
      <div className={block.compact ? "pt-2" : "pt-6 md:pt-10"}>
        <LinkBannerContent block={block} atmosphere={atmosphere} text={text} />
      </div>
    ),
    "grouped-section": () => (
      <GroupedSection
        block={block}
        atmosphere={atmosphere}
        surface={surface}
        onImageClick={onImageClick}
      />
    ),
    "woven-section": () => (
      <WovenSection
        block={block}
        atmosphere={atmosphere}
        surface={surface}
        onImageClick={onImageClick}
      />
    ),
    "personal-note": () => (
      <PersonalContainer atmosphere={atmosphere} compact>
        <BlockBody text={block.text} surface={surface} />
      </PersonalContainer>
    ),
  };

  const renderer = renderers[type];
  if (!renderer) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[EditorialBlock] Unknown type: ${type}`);
    }
    return null;
  }

  const isBreathingSpace = type === "breathing-space";
  const content = renderer();

  return isBreathingSpace ? (
    content
  ) : (
    <div className={BLOCK_SECTION}>{content}</div>
  );
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
      <summary
        className={`cursor-pointer list-none flex justify-between items-center py-3 ${text.accent} font-medium`}
      >
        <span>{block.title || "A note we almost left out"}</span>
        <span className="text-stone-400 group-open:rotate-45 transition-transform text-xl leading-none">
          +
        </span>
      </summary>
      <div className="pt-4 pb-6">
        <BlockBody text={block.text} surface={surface} />
        {block.image && (
          <div className="mt-4 aspect-video max-h-48 rounded-md overflow-hidden">
            <EditorialImage
              image={block.image}
              onClick={imageClickHandler(onImageClick, block.image)}
            />
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
  if (type === "favourite-cafe") return "Somewhere we kept drifting back to";
  if (type === "favourite-bar") return "A bar we returned to more than once";
  return "A place that stayed with us";
}

function galleryCols(count) {
  if (!count || count <= 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-3";
  return "grid-cols-2 md:grid-cols-4";
}

function GroupedSectionEntry({
  entry,
  atmosphere,
  surface,
  onImageClick,
  text,
  isFirst,
}) {
  const memoryTone = entry.tone === "memory";
  const imageFit = entry.imageFit || "cover";
  const dividerClass = isFirst
    ? ""
    : `border-t ${atmosphere.containerBorder} pt-8 mt-8`;

  return (
    <article className={dividerClass}>
      <BlockTitle
        title={entry.title}
        atmosphere={atmosphere}
        surface={surface}
      />
      {entry.image ? (
        <div className="grid md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-3 min-w-0">
            <BlockBody
              text={entry.text}
              surface={surface}
              className={
                memoryTone ? "font-cormorant italic text-lg" : undefined
              }
            />
            {entry.caption && (
              <p
                className={`text-sm mt-3 leading-relaxed ${memoryTone ? "not-italic" : ""} ${text.body}`}
              >
                {entry.caption}
              </p>
            )}
            <EditorialBlockLinks
              block={entry}
              atmosphere={atmosphere}
              surface={surface}
            />
            <LocationNote location={entry.location} surface={surface} />
          </div>
          <EditorialImageColumn
            image={entry.image}
            onImageClick={onImageClick}
            objectFit={imageFit}
          />
        </div>
      ) : (
        <>
          <BlockBody
            text={entry.text}
            surface={surface}
            className={memoryTone ? "font-cormorant italic text-lg" : undefined}
          />
          {entry.caption && (
            <p
              className={`text-sm mt-3 leading-relaxed ${memoryTone ? "not-italic" : ""} ${text.body}`}
            >
              {entry.caption}
            </p>
          )}
          <EditorialBlockLinks
            block={entry}
            atmosphere={atmosphere}
            surface={surface}
          />
          <LocationNote location={entry.location} surface={surface} />
        </>
      )}
      {entry.images?.length > 0 && (
        <div
          className={`grid gap-3 mt-6 items-start ${galleryCols(entry.images.length)}`}
        >
          {entry.images.map((supportImg, i) => (
            <div
              key={i}
              className={
                imageFit === "natural"
                  ? "overflow-hidden rounded-md shadow-sm"
                  : "aspect-[4/3] overflow-hidden rounded-md shadow-sm"
              }
            >
              <EditorialImage
                image={supportImg}
                onClick={imageClickHandler(onImageClick, supportImg)}
                objectFit={imageFit}
                showCaption={false}
                rounded="rounded-md"
                className={imageFit === "natural" ? "" : "h-full"}
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function GroupedSection({ block, atmosphere, surface, onImageClick }) {
  const text = useEditorialSurface(surface);
  const entries = block.entries || [];

  return (
    <PersonalContainer
      atmosphere={atmosphere}
      className="max-w-4xl !px-4 sm:!px-6 md:!px-8"
    >
      <BlockTitle
        {...pickTitle(block)}
        atmosphere={atmosphere}
        surface={surface}
        align={block.align}
      />
      {entries.map((entry, i) => (
        <GroupedSectionEntry
          key={entry.id || entry.title || i}
          entry={entry}
          atmosphere={atmosphere}
          surface={surface}
          onImageClick={onImageClick}
          text={text}
          isFirst={i === 0}
        />
      ))}
    </PersonalContainer>
  );
}

const WOVEN_FLOAT_WIDTH = {
  sm: "w-[34%] md:w-[28%] max-w-[11rem]",
  md: "w-[42%] md:w-[36%] max-w-[15rem]",
  lg: "w-[48%] md:w-[42%] max-w-[18rem]",
};

const WOVEN_COL_SPAN = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
};

function WovenImageFrame({ image, onImageClick, className = "" }) {
  if (!image?.src) return null;
  return (
    <div className={`overflow-hidden rounded-lg shadow-sm ${className}`}>
      <EditorialImage
        image={image}
        onClick={imageClickHandler(onImageClick, image)}
        objectFit="natural"
        showCaption={false}
      />
    </div>
  );
}

function WovenCalendar({ segment, surface, atmosphere }) {
  const text = useEditorialSurface(surface);
  const entries = segment.entries || [];
  const links = [
    ...(segment.link?.href ? [segment.link] : []),
    ...(segment.links || []),
  ];

  return (
    <div
      className={`rounded-lg border ${atmosphere.containerBorder} bg-white/20 px-5 py-5 md:px-6 md:py-6`}
    >
      {segment.title && (
        <h3 className={`text-sm uppercase tracking-widest mb-4 ${text.muted}`}>
          {segment.title}
        </h3>
      )}
      {segment.intro && (
        <p className={`text-sm mb-5 leading-relaxed ${text.body}`}>
          {segment.intro}
        </p>
      )}
      {entries.length > 0 && (
        <dl className="space-y-4">
          {entries.map((entry, i) => (
            <div
              key={entry.phase || i}
              className="grid gap-x-4 gap-y-1 md:grid-cols-[8.5rem_1fr] md:gap-x-6"
            >
              <dt
                className={`text-xs uppercase tracking-wide pt-0.5 ${text.muted}`}
              >
                {entry.phase}
              </dt>
              <dd className={`text-sm leading-relaxed ${text.body}`}>
                {entry.timing && (
                  <span className="font-cormorant text-base italic">
                    {entry.timing}
                  </span>
                )}
                {entry.detail && (
                  <span className="block mt-1">{entry.detail}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {segment.footnote && (
        <p className={`text-xs mt-5 leading-relaxed ${text.muted}`}>
          {segment.footnote}
        </p>
      )}
      {links.length > 0 && (
        <div className="mt-5 flex flex-col items-start gap-2">
          {links.map((link) => (
            <EditorialExternalLink
              key={link.href}
              link={link}
              atmosphere={atmosphere}
              surface={surface}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WovenSplit({ segment, surface, onImageClick }) {
  const imageSide = segment.imageSide === "left" ? "left" : "right";
  const imageFrame = segment.image?.src ? (
    <WovenImageFrame
      image={{
        ...segment.image,
        sizes: segment.image?.sizes ?? "(max-width: 768px) 90vw, 660px",
      }}
      onImageClick={onImageClick}
      className={
        segment.imageClassName ??
        "w-full max-w-[30rem] sm:max-w-[33rem] mx-auto md:mx-0 md:w-full md:max-w-[33rem] md:flex-shrink-0"
      }
    />
  ) : null;

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">
      {imageSide === "left" && imageFrame}
      <div className="min-w-0 flex-1">
        <BlockBody text={segment.text} surface={surface} />
      </div>
      {imageSide === "right" && imageFrame}
    </div>
  );
}

function WovenSection({ block, atmosphere, surface, onImageClick }) {
  const text = useEditorialSurface(surface);
  const segments = block.segments || [];

  return (
    <PersonalContainer
      atmosphere={atmosphere}
      className="max-w-4xl !px-4 sm:!px-6 md:!px-8"
    >
      <BlockTitle
        {...pickTitle(block)}
        atmosphere={atmosphere}
        surface={surface}
        align={block.align}
      />
      <div className="space-y-8 md:space-y-12">
        {segments.map((segment, i) => {
          const key = segment.id || `${segment.type}-${i}`;

          if (segment.type === "wide-image") {
            return (
              <WovenImageFrame
                key={key}
                image={{
                  ...segment.image,
                  sizes:
                    segment.image?.sizes ?? "(max-width: 768px) 90vw, 640px",
                }}
                onImageClick={onImageClick}
                className={segment.className ?? "w-full"}
              />
            );
          }

          if (segment.type === "prose") {
            return (
              <div key={key}>
                <BlockBody text={segment.text} surface={surface} />
                {segment.caption && (
                  <p className={`text-sm mt-3 leading-relaxed ${text.body}`}>
                    {segment.caption}
                  </p>
                )}
              </div>
            );
          }

          if (segment.type === "split") {
            return (
              <WovenSplit
                key={key}
                segment={segment}
                surface={surface}
                onImageClick={onImageClick}
              />
            );
          }

          if (segment.type === "calendar") {
            return (
              <WovenCalendar
                key={key}
                segment={segment}
                surface={surface}
                atmosphere={atmosphere}
              />
            );
          }

          if (segment.type === "float") {
            const side = segment.side === "left" ? "left" : "right";
            const floatClass =
              side === "left"
                ? "float-left mr-5 mb-3"
                : "float-right ml-5 mb-3";
            const sizeClass =
              WOVEN_FLOAT_WIDTH[segment.size] || WOVEN_FLOAT_WIDTH.md;
            return (
              <div key={key} className="flow-root">
                <WovenImageFrame
                  image={segment.image}
                  onImageClick={onImageClick}
                  className={`${floatClass} ${sizeClass}`}
                />
                <BlockBody text={segment.text} surface={surface} />
              </div>
            );
          }

          if (segment.type === "pair") {
            const [primary, secondary] = segment.images || [];
            return (
              <div key={key} className="grid md:grid-cols-12 gap-3 items-start">
                {primary && (
                  <WovenImageFrame
                    image={primary}
                    onImageClick={onImageClick}
                    className="md:col-span-8"
                  />
                )}
                {secondary && (
                  <WovenImageFrame
                    image={secondary}
                    onImageClick={onImageClick}
                    className="md:col-span-4"
                  />
                )}
              </div>
            );
          }

          if (segment.type === "cluster") {
            const images = segment.images || [];
            const spans =
              segment.spans ||
              images.map(() => Math.floor(12 / Math.max(images.length, 1)));
            return (
              <div key={key} className="grid md:grid-cols-12 gap-3 items-start">
                {images.map((clusterImg, j) => (
                  <WovenImageFrame
                    key={clusterImg.src || j}
                    image={clusterImg}
                    onImageClick={onImageClick}
                    className={WOVEN_COL_SPAN[spans[j]] || WOVEN_COL_SPAN[4]}
                  />
                ))}
              </div>
            );
          }

          return null;
        })}
      </div>
      {block.caption && (
        <p className={`text-sm mt-6 leading-relaxed ${text.body}`}>
          {block.caption}
        </p>
      )}
      <EditorialBlockLinks
        block={block}
        atmosphere={atmosphere}
        surface={surface}
      />
      <LocationNote location={block.location} surface={surface} />
    </PersonalContainer>
  );
}

export default EditorialBlock;
