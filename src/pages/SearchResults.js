import React from "react";
import { useLocation, Link } from "react-router-dom";
import SEO from "../components/SEO";

// Expanded site content with more synonyms
const siteContent = [
  {
    title: "Home",
    path: "/home",
    description: "Explore shops, galleries, travel stories, and more.",
    keywords: ["shop", "gallery", "travel", "story", "home", "explore", "store", "exhibit", "adventure", "journey"]
  },
  {
    title: "Travel Blog",
    path: "/travel-blog",
    description: "Stories and experiences from our journeys.",
    keywords: ["blog", "journey", "story", "experience", "adventure", "travel", "trip", "diary", "memoir"]
  },
  {
    title: "Brazil",
    path: "/brazil",
    description: "Travel stories and info about Brazil.",
    keywords: ["Brazil", "travel", "culture", "cities", "adventure", "South America", "destinations", "tourism", "holiday"]
  },
  {
    title: "São Paulo",
    path: "/brazil/saopaulo",
    description: "Discover São Paulo city, parks, museums, and Carnival.",
    keywords: ["São Paulo", "SP", "city", "parks", "museums", "Carnival", "urban", "sights", "festival", "landmarks"]
  },
  {
    title: "Shop",
    path: "/shop",
    description: "Check out our products.",
    keywords: ["shop", "products", "store", "buy", "purchase", "items", "merchandise", "collection", "goods"]
  },
  {
    title: "Art Gallery",
    path: "/art-gallery",
    description: "Explore artwork and exhibitions.",
    keywords: ["art", "gallery", "exhibition", "painting", "sculpture", "display", "showcase", "artists", "collections"]
  },
  {
    title: "News",
    path: "/news",
    description: "Latest news and updates.",
    keywords: ["news", "update", "article", "story", "information", "bulletin", "announcement", "press"]
  },
  {
    title: "Contact Us",
    path: "/contact-us",
    description: "Get in touch with us.",
    keywords: ["contact", "email", "message", "reach", "inquiry", "support", "connect", "form", "questions"]
  },
];

// Function to highlight matched words
function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
  );
}

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q")?.toLowerCase() || "";

  // Filter results
  const results = siteContent.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.keywords.some(word => word.toLowerCase().includes(query))
  );

  return (
    <div className="flex flex-col items-center justify-start py-12 px-4 bg-stony-paper-light font-cormorant">
      <SEO
        title={`Search Results for "${query}" | Nomad Scribbles`}
        description={`Search results for "${query}" on Nomad Scribbles.`}
        slug={`search?q=${query}`}
      />
      <h1 className="text-3xl font-bold mb-8 text-[#101E0E] tracking-tight">Search Results for "{query}"</h1>

      {results.length > 0 ? (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
          {results.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="w-full bg-white/40 backdrop-blur-sm border border-black/5 rounded-lg p-6 shadow-sm hover:bg-white/60 transition-all duration-300 group"
            >
              <h2 className="text-2xl font-bold text-[#101E0E] mb-2 group-hover:text-[#5F7536] transition-colors">{highlightMatch(item.title, query)}</h2>
              <p className="text-[#101E0E]/80 text-lg leading-relaxed">{highlightMatch(item.description, query)}</p>
              <div className="mt-3 text-sm text-[#5F7536] font-semibold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                Explore &rarr;
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white/40 backdrop-blur-sm p-8 rounded-lg border border-black/5">
          <p className="text-[#101E0E]/70 text-xl font-medium mb-4 italic">Alas, no matches found in our journals.</p>
        </div>
      )}

      <Link
        to="/"
        className="mt-12 px-8 py-3 bg-[#101E0E] text-[#E5CF6B] rounded-full hover:bg-[#101E0E]/90 transition-all transform hover:scale-105 font-bold uppercase tracking-widest text-sm shadow-md"
      >
        ← Return Home
      </Link>
    </div>
  );
}

export default SearchResults;
