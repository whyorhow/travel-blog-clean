import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import { useNarrative } from "../context/NarrativeContext";
import mapsBg from "../assets/images/maps.webp";

function Adventures() {
  const { setCurrentCountry, setCurrentCity, setActiveIndex } = useNarrative();
  const [progress, setProgress] = useState(0);

  // One ref + length per segment (hooks must be declared statically)
  const entryRef = useRef(null);
  const [entryLength, setEntryLength] = useState(0);
  const segRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [segLengths, setSegLengths] = useState([0, 0, 0, 0]);
  const [exitVector, setExitVector] = useState({ x: 0, y: 1 });
  const [segmentPhase, setSegmentPhase] = useState(-1); // -1=not started, 0-3=drawing segment i
  const connectorRef = useRef(null);
  const [connectorLength, setConnectorLength] = useState(0);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);
  const mapRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Measure all SVG paths after paint
  useEffect(() => {
    const measure = () => {
      // Entry path length
      if (entryRef.current) setEntryLength(entryRef.current.getTotalLength());

      // Segment lengths
      const lens = segRefs.map(r => r.current ? r.current.getTotalLength() : 0);
      setSegLengths(lens);

      // Exit tangent from last segment
      const lastPath = segRefs[3].current;
      if (lastPath) {
        const len = lastPath.getTotalLength();
        if (len > 0) {
          const p1 = lastPath.getPointAtLength(len - 2);
          const p2 = lastPath.getPointAtLength(len);
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const mag = Math.sqrt(dx * dx + dy * dy) || 1;
          setExitVector({ x: dx / mag, y: dy / mag });
        }
      }

      // Connector renders after exitVector state update — measure on next frame
      requestAnimationFrame(() => {
        if (connectorRef.current) {
          setConnectorLength(connectorRef.current.getTotalLength());
        }
      });
    };

    // Defer to ensure SVG is painted
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Track container width for responsive connector
  useEffect(() => {
    const handleResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll handler — just tracks position
  useEffect(() => {
    const handleScroll = () => {
      if (!mapRef.current) return;
      setHasScrolled(true);
      const rect = mapRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const elapsed = vh - rect.top;
      setProgress(Math.min(Math.max(elapsed / total, 0), 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chain segments with timers once scroll begins — each fires after previous transition completes
  useEffect(() => {
    if (!hasScrolled) return;
    const duration = 3100; // matches 3s transition + buffer
    const t0 = setTimeout(() => setSegmentPhase(0), duration);
    const t1 = setTimeout(() => setSegmentPhase(1), duration * 2);
    const t2 = setTimeout(() => setSegmentPhase(2), duration * 3);
    const t3 = setTimeout(() => setSegmentPhase(3), duration * 4);
    const t4 = setTimeout(() => setSegmentPhase(4), duration * 5);
    const t5 = setTimeout(() => setSegmentPhase(5), duration * 6);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [hasScrolled]);

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
  const belgiumPos  = { ...getAnchorPoint(countryNodes.belgium), y: getAnchorPoint(countryNodes.belgium).y - 20 };
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
  const entryStartX = 500;
  const entryStartY = belgiumPos.y - 340;
  const entryPath = `M ${entryStartX} ${entryStartY.toFixed(0)} C ${entryStartX} ${(belgiumPos.y - 200).toFixed(0)}, ${belgiumPos.x.toFixed(0)} ${(belgiumPos.y - 120).toFixed(0)}, ${belgiumPos.x.toFixed(0)} ${belgiumPos.y.toFixed(0)}`;

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

  // Segment draws when its phase is reached — 1 = fully drawn, 0 = hidden
  const getSegProgress = (i) => {
    if (segmentPhase < i) return 0;
    if (segmentPhase > i) return 1;
    return 1; // currently drawing — CSS transition handles the animation
  };

  // All visible node markers — use resolved positions (not re-computed from anchor)
  const entryStartNode = { x: entryStartX, y: entryStartY };

  const visibleNodes = [
    { key: "start",   ...entryStartNode, r: 5 },
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
      <main className="px-2 py-0 max-w-screen-lg mx-auto text-center text-[#f1e4b3] space-y-0" style={{ position: 'relative' }}>
        {/* Journey Map Background Section */}
        <div className="mt-20 mb-24 max-w-6xl mx-auto px-4">

          <div ref={mapRef} className="relative" style={{ paddingBottom: '200px' }}>

            {/* Background image - doubled height */}
            <img
              src={mapsBg}
              alt="Vintage maps background"
              className="w-full aspect-[5/6] object-cover rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            />

            {/* SVG Path Layer - shared coordinate space with map */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-40"
              viewBox="0 0 1000 1400"
              preserveAspectRatio="none"
            >
              {/* Entry path: top of map → Belgium */}
              <path
                ref={entryRef}
                d={entryPath}
                stroke="#f1e4b3"
                strokeWidth="2"
                fill="none"
                opacity={hasScrolled ? 0.75 : 0}
                strokeDasharray={entryLength || 1}
                strokeDashoffset={hasScrolled ? 0 : (entryLength || 1)}
                style={{ transition: 'stroke-dashoffset 3s ease-in-out, opacity 0.3s ease' }}
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
                    opacity={segmentPhase >= i ? 0.75 : 0}
                    strokeDasharray={len || 1}
                    strokeDashoffset={segmentPhase >= i ? len - len * segProg : len}
                    style={{ transition: 'stroke-dashoffset 3s ease-in-out, opacity 0.3s ease' }}
                  />
                );
              })}

              {/* Visible node markers */}
              {visibleNodes.map((node) => {
                const nodePhase = { start: -1, belgium: 0, brazil: 1, usa: 2, greece: 3, hungary: 4 };
                const activateAt = nodePhase[node.key] ?? 0;
                const isLit = segmentPhase >= activateAt;
                return (<circle
                  key={node.key}
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={isLit ? "#f1e4b3" : "#241a14"}
                  opacity="0.9"
                  style={{ transition: 'fill 0.5s ease' }}
                />);
              })}

              {/* Connector + arrow — inside same SVG coordinate space, below y=1200 */}
              {(() => {
                const sx = isNaN(hungaryPos.x) ? 750 : hungaryPos.x;
                const sy = isNaN(hungaryPos.y) ? 1104 : hungaryPos.y;
                const pathEnd = { x: 500, y: sy + 140 };
                const arrowTip = { x: 500, y: sy + 149 };
                const connD = `M ${sx} ${sy} C ${sx} ${sy + 120}, 500 ${sy + 60}, 500 ${pathEnd.y}`;
                const lastProg = getSegProgress(3);
                const connLen = connectorLength > 1 ? connectorLength : null;
                const arrowAngle = 180;
                const connDrawn = segmentPhase >= 4;
                const arrowOpacity = segmentPhase >= 5 ? 1 : 0;
                return (
                  <g>
                    <path
                      ref={connectorRef}
                      d={connD}
                      stroke="#f1e4b3"
                      strokeWidth="2"
                      fill="none"
                      opacity={segmentPhase >= 4 ? 0.75 : 0}
                      strokeDasharray={connLen || 1}
                      strokeDashoffset={connDrawn ? 0 : (connLen || 1)}
                      style={{ transition: 'stroke-dashoffset 3s ease-in-out, opacity 0.3s ease' }}
                    />
                    <g transform={`translate(${arrowTip.x}, ${arrowTip.y}) rotate(${arrowAngle}) scale(0.17) translate(-120.9, -40)`} opacity={arrowOpacity * 0.75} style={{ transition: 'opacity 0.8s ease' }}>
                      <path className="st0" d="M194.4,172.7c-22.7-51.2-28.9-72.6-48-111.9c-5.1-10.4-13.4-26.9-24.8-46.9c-6.7,12.9-12.2,24.1-16.5,32.9c-21.3,43.5-38.2,82.2-46,100c-3.1,7.1-7.6,17.6-14.5,32.9c-6.4,14.2-11.7,25.6-15,32.9c34.3-33.5,50.2-51.1,58.2-61c2-2.5,10.8-13.7,23.7-28c3.9-4.3,7.1-7.8,9.2-10c15.8,18.3,32.5,37,50.2,55.9c14.1,15,28,29.4,41.8,43.2C208.8,204.5,202.2,190.4,194.4,172.7z M154.8,143c-1.2-1.3-6.5-7.5-13.6-16c-6.3-7.5-11.7-14-16-19.2c-1-13-1.6-23.9-1.9-32.4c-0.1-1.6-0.3-8.9-0.5-18.8c-0.2-11.1-0.1-20.5,0-27.7c9.7,18.4,17,33.4,21.6,43.2c14.1,29.9,20,45.9,38.8,87.6c5.8,12.9,10.7,23.3,13.5,29.5c-9.3-9.8-17.3-18.4-23.7-25.5C171.2,161.6,164.1,153.6,154.8,143z" fill="#f5eece" />
                    </g>
                  </g>
                );
              })()}
            </svg>

            {/* Dark overlay for readability — only over the map image */}
            <div className="absolute z-5 bg-black/60" style={{ top: 0, left: 0, right: 0, aspectRatio: '5/6' }} />

            {/* Intro text box overlay */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-2xl mx-auto px-4 sm:px-10 py-3 sm:py-4 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
              <p className="text-[0.8rem] sm:text-[1.1rem] md:text-[1.4rem] font-cormorant italic leading-snug tracking-wide text-[#f1e4b3] text-center">
                Explore the places we've journeyed through,<br />
                each flag opening a window into new stories and adventures.
              </p>
              <div className="mt-3 w-16 h-[1px] bg-[#f1e4b3]/40 mx-auto" />
              <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[#e0c96a]">
                Begin the journey
              </p>
            </div>

            {/* Countries overlay - designed positions */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 'auto' }}>

              {countries.filter(c => c.link).map((country, index) => {

                const layouts = [
                  { top: "32%", left: "20%", size: "w-16 sm:w-32 md:w-48", rotate: "-rotate-6" },
                  { top: "40%", left: "70%", size: "w-20 sm:w-40 md:w-64", rotate: "rotate-3" },
                  { top: "76%", left: "35%", size: "w-16 sm:w-36 md:w-52", rotate: "-rotate-2" },
                  { top: "79%", left: "75%", size: "w-14 sm:w-32 md:w-44", rotate: "rotate-6" },
                  { top: "58%", left: "50%", size: "w-18 sm:w-36 md:w-56", rotate: "-rotate-3" }
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

                    <p className="hidden sm:block mt-2 text-[10px] sm:text-xs uppercase tracking-widest text-[#f1e4b3]/80 text-center group-hover:text-[#f1e4b3] transition-colors">
                      {country.name}
                    </p>

                  </Link>
                );
              })}

            </div>
          </div>


        </div>


        <div className="pt-24" style={{ marginTop: '-240px', position: 'relative', zIndex: 1 }}>
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
