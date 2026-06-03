import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { searchSite } from "../config/searchIndex";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import soilTexture from "../assets/images/soil-background.webp";

function highlightMatch(text, query) {
  if (!query || !text) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-goldAccent/50 text-warmTaupe rounded-sm px-0.5 not-italic">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function SearchResultCard({ item, query }) {
  return (
    <Link
      to={item.path}
      className="group flex flex-col overflow-hidden rounded-xl border border-goldAccent/25 bg-stone-950/50 backdrop-blur-md shadow-panel-deep transition-all duration-300 hover:border-goldAccent/55 hover:shadow-2xl hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warmTaupe/40">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-main-gradient opacity-80">
            <span className="font-handwriting text-3xl text-darkText/80 px-4 text-center">
              {item.title}
            </span>
          </div>
        )}
        <span className="absolute top-2 left-2 rounded-full bg-warmTaupe/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cream border border-goldAccent/40">
          {item.label}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2">
        <h2 className="font-cormorant text-xl sm:text-2xl font-semibold text-darkText leading-snug group-hover:text-warmGold transition-colors">
          {highlightMatch(item.title, query)}
        </h2>
        {item.description ? (
          <p className="font-cormorant text-sm sm:text-base text-cream/85 leading-relaxed line-clamp-3">
            {highlightMatch(item.description, query)}
          </p>
        ) : null}
        <span className="mt-auto pt-2 text-xs uppercase tracking-widest text-goldAccent font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
          Explore →
        </span>
      </div>
    </Link>
  );
}

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q")?.trim() || "";
  const [draft, setDraft] = useState(query);

  useEffect(() => {
    setDraft(query);
  }, [query]);

  const results = searchSite(query);
  const pageResults = results.filter((r) => r.type === "page");
  const imageResults = results.filter((r) => r.type === "image");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const suggestions = ["Brazil", "Rio", "São Paulo", "street art", "food", "gallery", "shop"];

  return (
    <div className="relative min-h-screen bg-main-gradient text-darkText overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: `url(${soilTexture})`,
          backgroundSize: "800px",
          backgroundRepeat: "repeat",
        }}
      />

      <SEO
        title={query ? `Search: ${query} | Nomad Scribbles` : "Search | Nomad Scribbles"}
        description={query ? `Results for "${query}" on Nomad Scribbles.` : "Search journeys and moments."}
        image={cloudinaryUrlFromLegacyPath("/images/Adventures/AdventuresBD.webp", { width: 1200 })}
        noindex
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <header className="text-center mb-10 sm:mb-12">
          <p className="font-handwriting text-4xl sm:text-5xl md:text-6xl text-darkText drop-shadow-sm">
            Search the journey
          </p>
          <p className="mt-3 font-cormorant text-base sm:text-lg text-cream/90 max-w-lg mx-auto">
            Find destinations, stories, and individual moments from the road.
          </p>

          <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl mx-auto flex gap-2">
            <input
              type="search"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Try Rio, carnival, food, Pantanal…"
              className="flex-1 rounded-full border border-goldAccent/40 bg-stone-950/60 px-5 py-3 text-cream placeholder:text-stone-400 outline-none focus:border-goldAccent focus:ring-1 focus:ring-goldAccent/50 font-cormorant text-lg"
              aria-label="Search query"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-goldAccent px-6 py-3 text-warmTaupe font-semibold uppercase tracking-wider text-sm hover:bg-warmGold transition-colors border border-warmGold/50"
            >
              Go
            </button>
          </form>
        </header>

        {query ? (
          <p className="text-center font-cormorant text-cream/80 mb-8">
            {results.length === 0 ? (
              <>No matches for &ldquo;<span className="text-darkText font-semibold">{query}</span>&rdquo;</>
            ) : (
              <>
                <span className="text-darkText font-semibold">{results.length}</span> result
                {results.length !== 1 ? "s" : ""} for &ldquo;
                <span className="text-darkText font-semibold">{query}</span>&rdquo;
              </>
            )}
          </p>
        ) : null}

        {results.length > 0 ? (
          <div className="space-y-12">
            {pageResults.length > 0 && (
              <section aria-labelledby="search-pages-heading">
                <h2
                  id="search-pages-heading"
                  className="font-cormorant text-sm uppercase tracking-[0.35em] text-goldAccent mb-5 text-center"
                >
                  Journeys & pages
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {pageResults.map((item) => (
                    <SearchResultCard key={`${item.type}-${item.path}`} item={item} query={query} />
                  ))}
                </div>
              </section>
            )}

            {imageResults.length > 0 && (
              <section aria-labelledby="search-moments-heading">
                <h2
                  id="search-moments-heading"
                  className="font-cormorant text-sm uppercase tracking-[0.35em] text-goldAccent mb-5 text-center"
                >
                  Moments & photographs
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {imageResults.map((item) => (
                    <SearchResultCard
                      key={`${item.type}-${item.path}-${item.title}`}
                      item={item}
                      query={query}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : query ? (
          <div className="text-center max-w-md mx-auto rounded-2xl border border-goldAccent/20 bg-stone-950/40 backdrop-blur p-8">
            <p className="font-cormorant italic text-xl text-cream/90 mb-6">
              Nothing in our journals matched that — try another word or browse a suggestion.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((term) => (
                <Link
                  key={term}
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-goldAccent/40 bg-warmTaupe/80 px-4 py-1.5 text-sm text-cream hover:bg-warmMuted transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-cormorant text-lg text-cream/80 mb-6">Popular starting points</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((term) => (
                <Link
                  key={term}
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-goldAccent/40 bg-stone-950/50 px-5 py-2 text-cream hover:border-goldAccent hover:bg-warmTaupe/60 transition-colors font-cormorant"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-14">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-full bg-warmTaupe/90 px-8 py-3 border border-goldAccent/50 text-cream hover:bg-warmMuted transition-colors font-semibold tracking-widest uppercase text-sm"
          >
            <span className="text-lg">←</span>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
