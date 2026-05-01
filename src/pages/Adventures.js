import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import { useNarrative } from "../context/NarrativeContext";
import mapsBg from "../assets/images/maps.webp";
import arrowHead from "../assets/images/ArrowHead.svg";

function Adventures() {
  const { setCurrentCountry, setCurrentCity, setActiveIndex } = useNarrative();
  const [progress, setProgress] = useState(0);

  // One ref + length per segment (hooks must be declared statically)
  const segRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [segLengths, setSegLengths] = useState([0, 0, 0, 0]);
  const [exitVector, setExitVector] = useState({ x: 0, y: 1 });
  const connectorRef = useRef(null);
  const [connectorLength, setConnectorLength] = useState(0);

  // Measure each segment path length once on mount
  useEffect(() => {
    setSegLengths(segRefs.map(r => r.current ? r.current.getTotalLength() : 0));
  }, []);

  // Measure connector length after it renders
  useEffect(() => {
    if (connectorRef.current) setConnectorLength(connectorRef.current.getTotalLength());
  });

  // Sample exit tangent from last segment once lengths are known
  useEffect(() => {
    const lastPath = segRefs[3].current;
    if (!lastPath) return;
    const len = lastPath.getTotalLength();
    if (len === 0) return;
    const p1 = lastPath.getPointAtLength(len - 2);
    const p2 = lastPath.getPointAtLength(len);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const mag = Math.sqrt(dx * dx + dy * dy) || 1;
    setExitVector({ x: dx / mag, y: dy / mag });
  }, [segLengths]);

  // Map scroll position to progress (0 → 1)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress = scrollY / docHeight;
      setProgress(Math.min(rawProgress, 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Coordinate system
  const viewBox = { w: 1000, h: 1200 };

  const getCardRect = (card, size) => {
    const x = (card.left / 100) * viewBox.w;
    const y = (card.top / 100) * viewBox.h;
    const width = size;
    const height = size * (9 / 16);
    return { x, y, width, height };
  };

  const getLeftEdgeCenter = (rect) => ({
    x: rect.x,
    y: rect.y + rect.height / 2
  });

  const getAnchorPoint = ({ card, size, anchor }) => {
    const width = size;
    const height = size * (9 / 16);
    const base = { x: (card.left / 100) * viewBox.w, y: (card.top / 100) * viewBox.h };
    return {
      x: base.x + anchor.x * width,
      y: base.y + anchor.y * height
    };
  };

  const getTangent = ({ card, size, tangent }) => {
    const width = size;
    const height = size * (9 / 16);
    const base = { x: (card.left / 100) * viewBox.w, y: (card.top / 100) * viewBox.h };
    return {
      x: base.x + tangent.x * width,
      y: base.y + tangent.y * height
    };
  };

  // Unified country node definitions
  const countryNodes = {
    belgium: {
      card: { top: 40, left: 20 }, size: 192,
      anchor: { x: 0.5, y: 0.5 },
      exit:   { x: 0.8, y: 0.45 }
    },
    brazil: {
      card: { top: 48, left: 70 }, size: 256,
      anchor: { x: 0.25, y: 0.5 },
      entry:  { x: 0.1, y: 0.4 },
    },
    usa: {
      card: { top: 68, left: 50 }, size: 224,
      anchor: { x: 0, y: 0.35 },
      entry:  { x: -0.1, y: 0.30 },
      exit:   { x: 0.2, y: 0.45 }
    },
    greece: {
      card: { top: 88, left: 35 }, size: 208,
      anchor: { x: 0.5, y: 0.5 },
      entry:  { x: 0.3, y: 0.4 },
      exit:   { x: 0.7, y: 0.5 }
    },
    hungary: {
      card: { top: 92, left: 75 }, size: 176,
      anchor: { x: 0.5, y: 0.5 },
      entry:  { x: 0.3, y: 0.5 }
    }
  };

  // Resolve all anchor positions
  const belgiumPos  = getAnchorPoint(countryNodes.belgium);
  const brazilPos   = getAnchorPoint(countryNodes.brazil);
  const usaRect     = getCardRect(countryNodes.usa.card, countryNodes.usa.size);
  // Card is centred via -translate-x-1/2, so left edge = base.x - width/2
  const usaPos      = { x: usaRect.x - usaRect.width * 0.65, y: usaRect.y + usaRect.height * 0.25 };
  const greeceRect  = getCardRect(countryNodes.greece.card, countryNodes.greece.size);
  const greecePos   = { x: greeceRect.x - greeceRect.width * 0.6, y: greeceRect.y + greeceRect.height * 0.5 };
  const hungaryRect = getCardRect(countryNodes.hungary.card, countryNodes.hungary.size);
  const hungaryPos  = { x: hungaryRect.x - hungaryRect.width * 0.5 + hungaryRect.width * 0.1, y: hungaryRect.y + hungaryRect.height * 0.6 };

  // Segment definitions — each leg of the journey
  const segmentDefs = [
    { from: belgiumPos, to: brazilPos },
    { from: brazilPos, to: usaPos },
    { from: usaPos,    to: greecePos },
    { from: greecePos, to: hungaryPos, invertCurve: true }
  ];

  // Entry path from above into Belgium (static — always draws first)
  const entryPath = [
    `M 300 80`,
    `C 320 170, 260 300, 300 410`,
    `C 330 500, 310 540, ${belgiumPos.x.toFixed(0)} ${belgiumPos.y.toFixed(0)}`
  ].join(" ");

  // Build a cubic Bézier path — control points follow direction of travel
  const buildSegPath = (from, to, invertCurve = false) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const sign = invertCurve ? -1 : 1;
    const cp1x = from.x + dx * 0.4 + sign * dy * 0.15;
    const cp1y = from.y + dy * 0.1 - sign * dx * 0.15;
    const cp2x = to.x - dx * 0.2 + sign * dy * 0.15;
    const cp2y = to.y - dy * 0.1 - sign * dx * 0.15;
    return `M ${from.x.toFixed(0)} ${from.y.toFixed(0)} C ${cp1x.toFixed(0)} ${cp1y.toFixed(0)}, ${cp2x.toFixed(0)} ${cp2y.toFixed(0)}, ${to.x.toFixed(0)} ${to.y.toFixed(0)}`;
  };

  // Segment scroll ranges: phase 0=0-25%, 1=25-55%, 2=55-80%, 3=80-100%
  const segRanges = [
    { start: 0,    end: 0.25 },
    { start: 0.25, end: 0.55 },
    { start: 0.55, end: 0.80 },
    { start: 0.70, end: 0.80 }
  ];

  const getSegProgress = (i) => {
    const { start, end } = segRanges[i];
    return Math.min(Math.max((progress - start) / (end - start), 0), 1);
  };

  // All visible node markers — use resolved positions (not re-computed from anchor)
  const visibleNodes = [
    { key: "belgium", ...belgiumPos, r: 5 },
    { key: "brazil",  ...brazilPos,  r: 5 },
    { key: "usa",     ...usaPos,     r: 5 },
    { key: "greece",  ...greecePos,  r: 5 },
    { key: "hungary", ...hungaryPos, r: 5 },
  ];

  const handleCountryClick = (country, index) => {
    setCurrentCountry(country.name.toLowerCase());
    setCurrentCity(null);
    setActiveIndex(0);
  };

  const countries = [
    { name: "Austria", img: "/images/Adventures/AustriaFlag.webp" },
    { name: "Belgium", img: "/images/Adventures/BelgiumFlag.webp", link: "/belgium" },
    { name: "Brazil", img: "/images/Adventures/BrazilFlag.webp", link: "/brazil" },
    { name: "Czech Republic", img: "/images/Adventures/CzechFlag.webp" },
    { name: "England", img: "/images/Adventures/EnglandFlag.webp" },
    { name: "France", img: "/images/Adventures/FranceFlag.webp" },
    { name: "Germany", img: "/images/Adventures/GermanyFlag.webp" },
    { name: "Greece", img: "/images/Adventures/GreeceFlag.webp", link: "/greece" },
    { name: "Hungary", img: "/images/Adventures/HungaryFlag.webp", link: "/hungary" },
    { name: "India", img: "/images/Adventures/IndiaFlag.webp" },
    { name: "Italy", img: "/images/Adventures/ItalyFlag.webp" },
    { name: "Scotland", img: "/images/Adventures/ScotlandFlag.webp" },
    { name: "Switzerland", img: "/images/Adventures/SwissFlag.webp" },
    { name: "Thailand", img: "/images/Adventures/ThaiFlag.webp" },
    { name: "United States", img: "/images/Adventures/USAFlag.webp", link: "/united-states" },
    { name: "Wales", img: "/images/Adventures/WalesFlag.webp" }
  ];

  return (
    <div className="pt-6 min-h-screen bg-[#50473e] text-[#f1e4b3] relative">
      {/* Paper texture background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.25]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* SEO Component */}
      <SEO
        title="Adventures Around the World | Nomad Scribbles"
        description="Join us on our journeys across the globe — from Europe to Asia and the Americas, explore flags, stories, and adventures with Nomad Scribbles."
        image={cloudinaryUrlFromLegacyPath("/images/Adventures/AdventuresBD.png", { width: 1200 })}
        slug="adventures"
      />


      {/* Hidden H1 for accessibility */}
      <h1 className="sr-only">Nomad Scribbles | Adventures Around the World</h1>

      {/* Page Title */}
      <div className="flex justify-center mt-6 mb-10">
        <div className="px-6 py-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
          <img
            src="/assets/Title.svg"
            alt="Adventures"
            className="w-[250px] sm:w-[300px] md:w-[400px] h-auto"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="px-2 py-0 max-w-screen-lg mx-auto text-center text-[#f1e4b3] space-y-0">
        {/* Journey Map Background Section */}
        <div className="mt-20 mb-24 max-w-6xl mx-auto px-4">

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">

            {/* Background image - doubled height */}
            <img
              src={mapsBg}
              alt="Vintage maps background"
              className="w-full h-[1000px] sm:h-[1200px] object-cover"
            />

            {/* SVG Path Layer - shared coordinate space with map */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1000 1200"
              preserveAspectRatio="none"
            >
              {/* Entry path: top of map → Belgium (always visible once in view) */}
              <path
                d={entryPath}
                stroke="#f1e4b3"
                strokeWidth="2"
                fill="none"
                opacity={progress > 0 ? 0.75 : 0}
              />

              {/* Journey segments — each reveals in its own scroll phase */}
              {segmentDefs.map((seg, i) => {
                const d = buildSegPath(seg.from, seg.to, seg.invertCurve);
                const len = segLengths[i];
                const segProg = getSegProgress(i);
                return (
                  <path
                    key={i}
                    ref={segRefs[i]}
                    d={d}
                    stroke="#f1e4b3"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.75"
                    strokeDasharray={len || 1}
                    strokeDashoffset={len - len * segProg}
                  />
                );
              })}

              {/* Visible node markers */}
              {visibleNodes.map((node) => (
                <circle
                  key={node.key}
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill="#f1e4b3"
                  opacity="0.9"
                />
              ))}
            </svg>

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 z-5 bg-black/60" />

            {/* Intro text box overlay */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 max-w-4xl mx-auto px-10 py-4 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
              <p className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] font-cormorant italic leading-tight tracking-wide text-[#f1e4b3] whitespace-nowrap">
                Explore the places we've journeyed through,<br />
                each flag opening a window into new stories and adventures.
              </p>
              <div className="mt-3 w-16 h-[1px] bg-[#f1e4b3]/40 mx-auto" />
              <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[#e0c96a]">
                Begin the journey
              </p>
            </div>

            {/* Countries overlay - designed positions */}
            <div className="absolute inset-0 pointer-events-none z-30">

              {countries.filter(c => c.link).map((country, index) => {

                const layouts = [
                  { top: "40%", left: "20%", size: "w-48", rotate: "-rotate-6" },
                  { top: "48%", left: "70%", size: "w-64", rotate: "rotate-3" },
                  { top: "88%", left: "35%", size: "w-52", rotate: "-rotate-2" },
                  { top: "92%", left: "75%", size: "w-44", rotate: "rotate-6" },
                  { top: "68%", left: "50%", size: "w-56", rotate: "-rotate-3" }
                ];

                const layout = layouts[index % layouts.length];

                return (
                  <Link
                    key={index}
                    to={country.link}
                    onClick={() => handleCountryClick(country, index)}
                    className="group absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 hover:z-50"
                    style={{ top: layout.top, left: layout.left }}
                  >

                    <div
                      className={`relative ${layout.size} aspect-video rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.7)] ring-1 ring-[#f1e4b3]/30 transition-all duration-500 md:group-hover:scale-[1.33] group-hover:scale-105 group-hover:-translate-y-1 group-hover:ring-[#f1e4b3]/70 group-hover:z-50 ${layout.rotate}`}
                    >
                      <img
                        src={cloudinaryUrlFromLegacyPath(country.img, { width: 800 })}
                        alt={country.name}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                    </div>

                    <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-widest text-[#f1e4b3]/80 text-center group-hover:text-[#f1e4b3] transition-colors">
                      {country.name}
                    </p>

                  </Link>
                );
              })}

            </div>
          </div>

          {/* Tangent-driven connector + arrow — all inside one SVG coordinate space */}
          {(() => {
            const svgW = 1000;
            const svgH = 260;
            const sx = isNaN(hungaryPos.x) ? 680 : hungaryPos.x;
            const ep = { x: sx - 200, y: 200 };
            const connD = `M ${sx} 0 C ${sx - 40} 60, ${ep.x + 40} 140, ${ep.x} ${ep.y}`;
            const lastProg = getSegProgress(3);
            const arrowOpacity = lastProg >= 1 ? 1 : 0;
            return (
              <div style={{ width: '100%', height: '260px', position: 'relative', background: 'transparent', zIndex: 9999, marginTop: '-42px' }}>
                <svg
                  width="100%"
                  height="260"
                  viewBox="0 0 1000 260"
                  preserveAspectRatio="none"
                  style={{ display: 'block' }}
                >
                  <path
                    d={connD}
                    stroke="#f1e4b3"
                    strokeWidth="2"
                    fill="none"
                    opacity={lastProg >= 1 ? 0.75 : 0}
                    style={{ transition: 'opacity 0.4s ease' }}
                  />
                  <image
                    href={arrowHead}
                    x={ep.x - 10}
                    y={ep.y - 12}
                    width="24"
                    height="24"
                    transform={`rotate(10, ${ep.x}, ${ep.y})`}
                    opacity={arrowOpacity}
                    style={{ transition: 'opacity 0.8s ease' }}
                  />
                </svg>
              </div>
            );
          })()}

        </div>

        <div className="pt-24" style={{ marginTop: '-240px' }}>
          <h3 className="text-base uppercase tracking-[0.35em] text-[#f1e4b3]/50 mb-12">Future Destinations</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4 opacity-70 pb-16">
          {countries.filter(c => !c.link).map((country, index) => (
            <div key={index} className="flex flex-col items-center gap-2 grayscale brightness-75">
              <div className="w-full aspect-[3/2] rounded overflow-hidden">
                <img src={cloudinaryUrlFromLegacyPath(country.img, { width: 800 })} alt={country.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] uppercase tracking-tighter text-[#f1e4b3]/50">{country.name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 mt-16 mb-12 relative z-10">
          <Link to="/" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]">
            <span className="text-xl mr-3 pb-1">←</span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Adventures;
