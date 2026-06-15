import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { cloudinaryUrlFromLegacyPath, cloudinaryImageUrl } from "../utils/cloudinary";
import CloudinaryImage from "../components/CloudinaryImage";
import { useNarrative } from "../context/NarrativeContext";
import { prefetchRoute } from "../config/pageChunks";
import { getMapHint } from "../config/regionScope";
import paperTexture from "../assets/Backgrounds/PaperTexture.webp";

function Adventures({ hideTitle = false, enlargeMap = false }) {
  const navigate = useNavigate();
  const { setCurrentCountry, setCurrentCity, setActiveIndex } = useNarrative();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedFuture, setExpandedFuture] = useState(null);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (expandedCard === null) return;
    const dismiss = (e) => { if (!e.target.closest('[data-flag]')) setExpandedCard(null); };
    document.addEventListener('click', dismiss);
    return () => document.removeEventListener('click', dismiss);
  }, [expandedCard]);
  useEffect(() => {
    if (expandedFuture === null) return;
    const dismiss = (e) => { if (!e.target.closest('[data-future-flag]')) setExpandedFuture(null); };
    document.addEventListener('click', dismiss);
    return () => document.removeEventListener('click', dismiss);
  }, [expandedFuture]);

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
  const [mapInView, setMapInView] = useState(false);
  const [mapBgReady, setMapBgReady] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const flagEntrance = (index, baseDelay = 0.2) => ({
    initial: { opacity: 0, y: 12, scale: 0.94 },
    animate: mapBgReady
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 12, scale: 0.94 },
    transition: {
      duration: 0.55,
      delay: baseDelay + index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  const futureEntrance = (index) => ({
    initial: { opacity: 0, scale: 0.92 },
    animate: mapBgReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 },
    transition: {
      duration: 0.5,
      delay: 0.8 + index * 0.03,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  const mobileFlagLayouts = [
    { top: "30%", left: "22%", size: "w-20 sm:w-32 md:w-48", rotate: "-rotate-6", deg: -6 },
    { top: "40%", left: "62%", size: "w-28 sm:w-40 md:w-64", rotate: "rotate-3", deg: 3 },
    { top: "60%", left: "32%", size: "w-20 sm:w-32 md:w-44", rotate: "rotate-6", deg: 6 },
    { top: "70%", left: "68%", size: "w-20 sm:w-36 md:w-56", rotate: "-rotate-3", deg: -3 },
    { top: "50%", left: "48%", size: "w-28 sm:w-36 md:w-52", rotate: "-rotate-2", deg: -2 },
  ];

  const mobileFuturePositions = [
    { top: "8%",  left: "28%", deg: -4, size: "w-12 sm:w-16 md:w-24" },
    { top: "8%",  left: "68%", deg: 3,  size: "w-11 sm:w-14 md:w-20" },
    { top: "18%", left: "78%", deg: -2, size: "w-12 sm:w-16 md:w-24" },
    { top: "22%", left: "14%", deg: 4,  size: "w-11 sm:w-14 md:w-20" },
    { top: "32%", left: "80%", deg: -3, size: "w-11 sm:w-14 md:w-20" },
    { top: "55%", left: "78%", deg: 2,  size: "w-11 sm:w-14 md:w-20" },
    { top: "78%", left: "14%", deg: -4, size: "w-12 sm:w-16 md:w-24" },
    { top: "86%", left: "30%", deg: 3,  size: "w-11 sm:w-14 md:w-20" },
    { top: "86%", left: "78%", deg: -2, size: "w-12 sm:w-16 md:w-24" },
    { top: "72%", left: "52%", deg: 4,  size: "w-11 sm:w-14 md:w-20" },
    { top: "28%", left: "52%", deg: -3, size: "w-12 sm:w-16 md:w-24" },
  ];

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

  // Start path animation when the map is actually on screen
  useEffect(() => {
    const node = mapRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Chain segments with timers once the map is in view
  useEffect(() => {
    if (!mapInView) return;
    const duration = 1550; // matches 1.5s transition + buffer
    const t0 = setTimeout(() => setSegmentPhase(0), duration);
    const t1 = setTimeout(() => setSegmentPhase(1), duration * 2);
    const t2 = setTimeout(() => setSegmentPhase(2), duration * 3);
    const t3 = setTimeout(() => setSegmentPhase(3), duration * 4);
    const t4 = setTimeout(() => setSegmentPhase(4), duration * 5);
    const t5 = setTimeout(() => setSegmentPhase(5), duration * 6);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [mapInView]);

  // Delayed hint trigger — only if user hasn't interacted
  useEffect(() => {
    if (segmentPhase === 0 && !hasInteracted) {
      const t = setTimeout(() => setShowHint(true), 2500);
      return () => clearTimeout(t);
    }
  }, [segmentPhase, hasInteracted]);

  // Coordinate system
  const viewBox = { w: 1000, h: 1500 };

  const getCardRect = (card, size) => {
    const x = (card.left / 100) * viewBox.w;
    const y = (card.top / 100) * viewBox.h;
    const width = size;
    const height = size * (9 / 16);
    return { x, y, width, height };
  };

  const getAnchorPoint = ({ card, size, anchor }) => {
    const width = size;
    const height = size * (9 / 16);
    const base = { x: (card.left / 100) * viewBox.w, y: (card.top / 100) * viewBox.h };
    return {
      x: base.x + anchor.x * width,
      y: base.y + anchor.y * height
    };
  };

  // Mobile node definitions (compact positions — keep in sync with mobileFlagLayouts)
  const mobileNodes = {
    belgium: { card: { top: 30, left: 22 }, size: 160, anchor: { x: 0.5, y: 0.5 }, exit: { x: 0.8, y: 0.45 } },
    brazil:  { card: { top: 40, left: 62 }, size: 224, anchor: { x: 0.25, y: 0.5 }, entry: { x: 0.1, y: 0.4 } },
    greece:  { card: { top: 60, left: 32 }, size: 160, anchor: { x: 0.5, y: 0.5 }, entry: { x: 0.3, y: 0.4 }, exit: { x: 0.7, y: 0.5 } },
    hungary: { card: { top: 70, left: 68 }, size: 160, anchor: { x: 0.5, y: 0.5 }, entry: { x: 0.3, y: 0.5 } },
    usa:     { card: { top: 50, left: 48 }, size: 224, anchor: { x: 0, y: 0.35 }, entry: { x: -0.1, y: 0.30 }, exit: { x: 0.2, y: 0.45 } }
  };

  // Desktop node definitions (spread positions matching smLayouts)
  const desktopNodes = {
    belgium: { card: { top: 28, left: 20 }, size: 192, anchor: { x: 0.5, y: 0.5 }, exit: { x: 0.8, y: 0.45 } },
    brazil:  { card: { top: 40, left: 70 }, size: 256, anchor: { x: 0.25, y: 0.5 }, entry: { x: 0.1, y: 0.4 } },
    greece:  { card: { top: 62, left: 35 }, size: 208, anchor: { x: 0.5, y: 0.5 }, entry: { x: 0.3, y: 0.4 }, exit: { x: 0.7, y: 0.5 } },
    hungary: { card: { top: 72, left: 75 }, size: 176, anchor: { x: 0.5, y: 0.5 }, entry: { x: 0.3, y: 0.5 } },
    usa:     { card: { top: 50, left: 50 }, size: 224, anchor: { x: 0, y: 0.35 }, entry: { x: -0.1, y: 0.30 }, exit: { x: 0.2, y: 0.45 } }
  };

  const countryNodes = isMobile ? mobileNodes : desktopNodes;

  // Resolve all anchor positions
  const belgiumPos  = { ...getAnchorPoint(countryNodes.belgium), y: getAnchorPoint(countryNodes.belgium).y - 20 };
  const brazilPos   = getAnchorPoint(countryNodes.brazil);
  const usaRect     = getCardRect(countryNodes.usa.card, countryNodes.usa.size);
  // Card is centred via -translate-x-1/2, so left edge = base.x - width/2
  const usaPos      = { x: usaRect.x - usaRect.width * 0.55, y: usaRect.y + usaRect.height * 0.25 };
  const greeceRect  = getCardRect(countryNodes.greece.card, countryNodes.greece.size);
  const greecePos   = { x: greeceRect.x - greeceRect.width * 0.6, y: greeceRect.y + greeceRect.height * 0.5 - 40 };
  const hungaryRect = getCardRect(countryNodes.hungary.card, countryNodes.hungary.size);
  const hungaryPos  = { x: hungaryRect.x - hungaryRect.width * 0.5 + hungaryRect.width * 0.1, y: hungaryRect.y + hungaryRect.height * 0.6 + 20 };

  // Segment definitions — each leg of the journey
  const segmentDefs = [
    { from: belgiumPos, to: brazilPos },
    { from: brazilPos, to: usaPos },
    { from: usaPos,    to: greecePos },
    { from: greecePos, to: hungaryPos, invertCurve: true }
  ];

  // Entry path from above into Belgium (static — always draws first)
  const entryStartX = 500;
  const entryStartY = belgiumPos.y - 220;
  const entryPath = `M ${entryStartX} ${entryStartY.toFixed(0)} C ${entryStartX} ${(belgiumPos.y - 140).toFixed(0)}, ${belgiumPos.x.toFixed(0)} ${(belgiumPos.y - 80).toFixed(0)}, ${belgiumPos.x.toFixed(0)} ${belgiumPos.y.toFixed(0)}`;

  // Build a cubic Bézier path — control points follow direction of travel
  const buildSegPath = (from, to, invertCurve = false) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const sign = invertCurve ? -1 : 1;
    const bend = 0.15;
    const cp1x = from.x + dx * 0.4 + sign * dy * bend;
    const cp1y = from.y + dy * 0.1 - sign * dx * bend;
    const cp2x = to.x - dx * 0.2 + sign * dy * bend;
    const cp2y = to.y - dy * 0.1 - sign * dx * bend;
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

  const prefetchCountryRoute = (country) => {
    if (country?.link) prefetchRoute(country.link);
  };

  const handleCountryClick = (country, index) => {
    prefetchCountryRoute(country);
    setShowHint(false);
    setHasInteracted(true);
    setCurrentCountry(country.name.toLowerCase());
    setCurrentCity(null);
    setActiveIndex(0);
  };

  const handleMapBgLoad = () => setMapBgReady(true);

  const handleMapBgError = () => setMapBgReady(true);

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
    { name: "Wales", img: "/images/Adventures/WalesFlag.webp" },
  ].map((country) =>
    country.link
      ? { ...country, scopeHint: getMapHint(country.link) }
      : country
  );

  return (
    <div className="pt-0 md:pt-6 min-h-screen bg-stone-800 text-darkText relative overflow-x-hidden">
      {/* Paper texture background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.18]"
        style={{ backgroundImage: `url(${paperTexture})`, backgroundSize: '400px 400px' }}
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

      {/* Page Title — hidden when embedded in HomeNew */}
      {!hideTitle && (
        <div className="flex justify-center mt-6 mb-10">
          <div className="px-6 py-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <img
              src="/assets/Title.svg"
              alt="Adventures"
              className="w-[250px] sm:w-[300px] md:w-[400px] h-auto"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`py-0 mx-auto text-center text-darkText space-y-0 ${enlargeMap ? 'max-w-screen-xl px-0 sm:px-6' : 'max-w-screen-lg px-0 sm:px-2'}`} style={{ position: 'relative' }}>
        {/* Journey Map Background Section */}
        <div className={`mx-auto px-0 sm:px-4 ${enlargeMap ? 'mb-0 max-w-[1400px]' : 'mt-20 mb-24 max-w-6xl'}`} style={enlargeMap ? { marginTop: '0px' } : {}}>

          <div ref={mapRef} className="relative overflow-hidden rounded-2xl" style={{ paddingBottom: '20px' }}>

            {/* Background image - doubled height */}
            <CloudinaryImage
              publicId="Assets/maps"
              alt="Vintage maps background"
              onLoad={handleMapBgLoad}
              onError={handleMapBgError}
              sizes="100vw"
              widths={[800, 1600, 2400]}
              className={`w-full aspect-[1/2] sm:aspect-[5/6] object-cover rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-opacity duration-700 ease-out ${mapBgReady ? "opacity-100" : "opacity-0"}`}
            />

            {/* SVG Path Layer - shared coordinate space with map */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-40"
              viewBox="0 0 1000 1500"
              preserveAspectRatio="none"
              overflow="visible"
            >
              {/* Entry path: top of map → Belgium */}
              <path
                ref={entryRef}
                d={entryPath}
                stroke="#8a7040"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity={mapInView ? 1 : 0}
                strokeDasharray={entryLength || 1}
                strokeDashoffset={mapInView ? 0 : (entryLength || 1)}
                style={{ transition: 'stroke-dashoffset 1.5s ease-in-out, opacity 0.3s ease' }}
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
                    stroke="#8a7040"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity={segmentPhase >= i ? 1 : 0}
                    strokeDasharray={len || 1}
                    strokeDashoffset={segmentPhase >= i ? len - len * segProg : len}
                    style={{ transition: 'stroke-dashoffset 1.5s ease-in-out, opacity 0.3s ease' }}
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
                  r={node.r * 0.75}
                  fill={isLit ? "#b8924e" : "#241a14"}
                  opacity="0.55"
                  style={{ transition: 'fill 0.5s ease' }}
                />);
              })}

              {/* Connector + arrow — inside same SVG coordinate space, below y=1200 */}
              {(() => {
                const sx = isNaN(hungaryPos.x) ? 750 : hungaryPos.x;
                const sy = isNaN(hungaryPos.y) ? 1104 : hungaryPos.y;
                const pathEnd = { x: 500, y: sy + 280 };
                const arrowTip = { x: 500, y: sy + 390 };
                const connD = `M ${sx} ${sy} C ${sx} ${sy + 300}, 500 ${sy + 200}, 500 ${arrowTip.y - 9}`;
                const lastProg = getSegProgress(3);
                const connLen = connectorLength > 1 ? connectorLength : null;
                const arrowAngle = 180;
                const connDrawn = segmentPhase >= 4;
                const arrowOpacity = segmentPhase >= 4 ? 1 : 0;
                return (
                  <g>
                    <path
                      ref={connectorRef}
                      d={connD}
                      stroke="#8a7040"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      opacity={segmentPhase >= 4 ? 1 : 0}
                      strokeDasharray={connLen || 1}
                      strokeDashoffset={connDrawn ? 0 : (connLen || 1)}
                      style={{ transition: 'stroke-dashoffset 1.5s ease-in-out, opacity 0.3s ease' }}
                    />
                    <g transform={`translate(${arrowTip.x}, ${arrowTip.y}) rotate(${arrowAngle}) scale(0.17) translate(-120.9, -40)`} opacity={arrowOpacity * 0.9} style={{ transition: 'opacity 0.5s ease 1.6s' }}>
                      <path fill="#b8924e" d="M194.4,172.7c-22.7-51.2-28.9-72.6-48-111.9c-5.1-10.4-13.4-26.9-24.8-46.9c-6.7,12.9-12.2,24.1-16.5,32.9c-21.3,43.5-38.2,82.2-46,100c-3.1,7.1-7.6,17.6-14.5,32.9c-6.4,14.2-11.7,25.6-15,32.9c34.3-33.5,50.2-51.1,58.2-61c2-2.5,10.8-13.7,23.7-28c3.9-4.3,7.1-7.8,9.2-10c15.8,18.3,32.5,37,50.2,55.9c14.1,15,28,29.4,41.8,43.2C208.8,204.5,202.2,190.4,194.4,172.7z M154.8,143c-1.2-1.3-6.5-7.5-13.6-16c-6.3-7.5-11.7-14-16-19.2c-1-13-1.6-23.9-1.9-32.4c-0.1-1.6-0.3-8.9-0.5-18.8c-0.2-11.1-0.1-20.5,0-27.7c9.7,18.4,17,33.4,21.6,43.2c14.1,29.9,20,45.9,38.8,87.6c5.8,12.9,10.7,23.3,13.5,29.5c-9.3-9.8-17.3-18.4-23.7-25.5C171.2,161.6,164.1,153.6,154.8,143z" />
                    </g>
                  </g>
                );
              })()}
            </svg>

            {/* Dark overlay for readability — only over the map image */}
            <div className={`absolute z-5 bg-black/60 w-full aspect-[1/2] sm:aspect-[5/6] transition-opacity duration-700 ease-out ${mapBgReady ? "opacity-100" : "opacity-0"}`} style={{ top: 0, left: 0, right: 0 }} />

            {/* Intro text box overlay */}
            <div className={`absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-2xl mx-auto px-4 sm:px-10 py-3 sm:py-4 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 transition-opacity duration-700 ease-out delay-100 ${mapBgReady ? "opacity-100" : "opacity-0"}`}>
              <p className="mt-3 text-sm md:text-base uppercase tracking-[0.35em] text-gold font-semibold">
                Begin the journey
              </p>
              <div className="mt-3 w-16 h-[1px] bg-gold/40 mx-auto" />
              <p className="text-[0.8rem] sm:text-[1.1rem] md:text-[1.4rem] font-cormorant italic leading-snug tracking-wide text-darkText text-center">
                Explore the places we&apos;ve journeyed through.<br />
                Brazil is our deepest archive; other flags open what&apos;s live so far.
              </p>
            </div>

            {/* Countries overlay - designed positions */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 'auto' }}>

              {countries.filter(c => c.link).map((country, index) => {
                const cardPhase = [0, 1, 3, 4, 2]; // belgium, brazil, greece, hungary, usa → phase order
                const isJustArrived = segmentPhase === cardPhase[index];

                const layouts = [
                  { top: "32%", left: "20%", size: "w-24 sm:w-32 md:w-48", rotate: "-rotate-6", deg: -6 },  // Belgium
                  { top: "42%", left: "70%", size: "w-40 sm:w-40 md:w-64", rotate: "rotate-3", deg: 3 },    // Brazil
                  { top: "60%", left: "35%", size: "w-20 sm:w-32 md:w-44", rotate: "rotate-6", deg: 6 },    // Greece
                  { top: "68%", left: "75%", size: "w-24 sm:w-36 md:w-56", rotate: "-rotate-3", deg: -3 },  // Hungary
                  { top: "51%", left: "50%", size: "w-36 sm:w-36 md:w-52", rotate: "-rotate-2", deg: -2 }   // USA
                ];

                const smLayouts = [
                  { top: "28%", left: "20%" },  // Belgium
                  { top: "40%", left: "70%" },  // Brazil
                  { top: "62%", left: "35%" },  // Greece
                  { top: "72%", left: "75%" },  // Hungary
                  { top: "50%", left: "50%" },  // USA
                ];

                const smLayout = smLayouts[index % smLayouts.length];
                const layout = isMobile ? mobileFlagLayouts[index] : layouts[index];
                const activeLayout = isMobile ? mobileFlagLayouts[index] : smLayout;

                const isMobileExpanded = isMobile && expandedCard === index;

                const isBelgium = index === 0;

                return isMobile ? (
                  <div
                    key={index}
                    className={`absolute pointer-events-auto z-10 ${isMobileExpanded ? 'z-50' : ''}`}
                    style={{
                      top: activeLayout.top,
                      left: activeLayout.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                    data-flag="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isMobileExpanded) {
                        prefetchCountryRoute(country);
                        setExpandedCard(index);
                      } else {
                        handleCountryClick(country, index);
                        navigate(country.link);
                      }
                    }}
                  >
                    <motion.div {...flagEntrance(index)}>
                      <motion.div
                        className={`relative ${layout.size} aspect-video rounded-lg overflow-hidden shadow-2xl ring-1 ${isMobileExpanded ? 'ring-gold shadow-2xl' : 'ring-gold/30'} ${layout.rotate}`}
                        initial={false}
                        animate={
                          isBelgium && isJustArrived
                            ? { scale: [1, 1.12, 1.06], y: [0, -6, -2] }
                            : isBelgium && showHint
                              ? { rotate: [layout.deg, layout.deg + 1.2, layout.deg - 1, layout.deg], y: [0, -4, 0] }
                              : isMobileExpanded
                                ? { scale: 1.5 }
                                : {}
                        }
                        transition={
                          isJustArrived
                            ? { duration: 0.6, ease: "easeOut" }
                            : showHint
                              ? { duration: 1.2, ease: "easeInOut", repeat: 2, repeatDelay: 3 }
                              : { duration: 0.5 }
                        }
                      >
                        <CloudinaryImage
                          legacyPath={country.img}
                          alt={country.name}
                          sizes="(max-width: 640px) 30vw, 15vw"
                          widths={[200, 400, 800]}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 transition-all duration-500 ${isMobileExpanded ? 'bg-black/10' : 'bg-black/40'}`} />

                        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isMobileExpanded ? 'opacity-100' : 'opacity-0'}`}>
                          <img src="/assets/Magnifyv2.svg" alt="Explore" className="w-8 h-8 opacity-90 drop-shadow-lg" />
                        </div>

                        {isBelgium && showHint && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2.5 }}
                            className="absolute text-xs italic text-gold"
                            style={{ top: '-18px', left: '50%', transform: 'translateX(-50%)' }}
                          >
                            start here
                          </motion.span>
                        )}
                      </motion.div>
                      {isMobileExpanded && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 text-center opacity-0 animate-fadeIn"
                          style={{ top: 'calc(100% + 28px)', transform: `translateX(-50%) rotate(${layout.deg}deg)`, animation: 'fadeIn 0.4s ease 0.3s forwards' }}
                        >
                          <p className="text-xs uppercase tracking-widest text-gold font-semibold whitespace-nowrap">
                            {country.name}
                          </p>
                          {country.scopeHint && (
                            <p className="text-[0.65rem] normal-case tracking-normal font-cormorant italic text-gold/80 mt-0.5 whitespace-nowrap">
                              {country.scopeHint}
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="absolute z-10"
                    style={{
                      top: activeLayout.top,
                      left: activeLayout.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                  <motion.div {...flagEntrance(index)}>
                  <Link
                    to={country.link}
                    onMouseEnter={() => prefetchCountryRoute(country)}
                    onFocus={() => prefetchCountryRoute(country)}
                    onClick={() => handleCountryClick(country, index)}
                    className="group block pointer-events-auto opacity-100 hover:z-50"
                  >
                    <motion.div
                      className={`relative ${layout.size} aspect-video rounded-lg overflow-hidden shadow-2xl ring-1 ${isJustArrived ? 'ring-gold/80 shadow-2xl' : 'ring-gold/30 group-hover:ring-gold/70'} group-hover:z-50`}
                      initial={false}
                      animate={
                        isBelgium && isJustArrived
                          ? { scale: [1, 1.12, 1.06], y: [0, -6, -2], rotate: layout.deg }
                          : isBelgium && showHint
                            ? { rotate: [layout.deg, layout.deg + 1.2, layout.deg - 1, layout.deg], y: [0, -4, 0] }
                            : { rotate: layout.deg }
                      }
                      whileHover={!isJustArrived && !showHint ? { scale: 1.73, y: -1 } : {}}
                      transition={
                        isJustArrived
                          ? { duration: 0.6, ease: "easeOut" }
                          : showHint
                            ? { duration: 1.2, ease: "easeInOut", repeat: 2, repeatDelay: 3 }
                            : { duration: 0.5 }
                      }
                    >
                      <CloudinaryImage
                        legacyPath={country.img}
                        alt={country.name}
                        sizes="(max-width: 640px) 30vw, 15vw"
                        widths={[200, 400, 800]}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                      
                      {/* Magnify icon for enlarged state */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <img src="/assets/Magnifyv2.svg" alt="Explore" className="w-8 h-8 opacity-90 drop-shadow-lg" />
                      </div>

                      {isBelgium && showHint && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2.5 }}
                          className="absolute text-xs italic text-gold"
                          style={{ top: '-18px', left: '50%', transform: 'translateX(-50%)' }}
                        >
                          start here
                        </motion.span>
                      )}
                    </motion.div>
                    <div
                      className="absolute left-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ top: 'calc(100% + 56px)', transform: `translateX(-50%) rotate(${layout.deg}deg)` }}
                    >
                      <p className="text-xs uppercase tracking-widest text-gold font-semibold whitespace-nowrap">
                        {country.name}
                      </p>
                      {country.scopeHint && (
                        <p className="text-[0.65rem] normal-case tracking-normal font-cormorant italic text-gold/80 mt-0.5 whitespace-nowrap">
                          {country.scopeHint}
                        </p>
                      )}
                    </div>
                  </Link>
                  </motion.div>
                  </div>
                );
              })}

            </div>

            {/* Future Destinations - subtle greyed flags off the path */}
            <div className="absolute inset-0 pointer-events-none">
              {countries.filter(c => !c.link).map((country, index) => {
                const futurePositions = [
                  { top: "8%",  left: "30%", deg: -4, size: "w-14 sm:w-16 md:w-24" },  // Austria
                  { top: "8%",  left: "72%", deg: 3,  size: "w-12 sm:w-14 md:w-20" },  // Czech Rep
                  { top: "18%", left: "88%", deg: -2, size: "w-14 sm:w-16 md:w-24" },  // England
                  { top: "22%", left: "10%", deg: 4,  size: "w-12 sm:w-14 md:w-20" },  // France
                  { top: "32%", left: "92%", deg: -3, size: "w-12 sm:w-14 md:w-20" },  // Germany
                  { top: "55%", left: "88%", deg: 2,  size: "w-12 sm:w-14 md:w-20" },  // India
                  { top: "78%", left: "10%", deg: -4, size: "w-14 sm:w-16 md:w-24" },  // Italy
                  { top: "88%", left: "30%", deg: 3,  size: "w-12 sm:w-14 md:w-20" },  // Scotland
                  { top: "88%", left: "88%", deg: -2, size: "w-14 sm:w-16 md:w-24" },  // Switzerland
                  { top: "72%", left: "55%", deg: 4,  size: "w-12 sm:w-14 md:w-20" },  // Thailand
                  { top: "28%", left: "55%", deg: -3, size: "w-14 sm:w-16 md:w-24" },  // Wales
                ];
                const pos = (isMobile ? mobileFuturePositions : futurePositions)[index % futurePositions.length];
                const isFutureExpanded = isMobile && expandedFuture === index;
                return isMobile ? (
                  <div
                    key={country.name}
                    data-future-flag="true"
                    className={`absolute pointer-events-auto z-[2] ${isFutureExpanded ? 'z-50' : ''}`}
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedFuture(isFutureExpanded ? null : index);
                    }}
                  >
                    <motion.div
                      {...futureEntrance(index)}
                      className={`${isFutureExpanded ? 'opacity-70 saturate-75' : 'opacity-40 saturate-50 scale-90'} transition-all duration-500`}
                    >
                    <div
                      className={`${pos.size} aspect-[3/2] rounded overflow-hidden shadow-sm ring-1 transition-all duration-500 ${isFutureExpanded ? 'scale-150 ring-gold/50 shadow-2xl' : 'ring-transparent'}`}
                      style={{ transform: `${isFutureExpanded ? 'scale(1.5)' : 'scale(1)'} rotate(${pos.deg}deg)` }}
                    >
                      <CloudinaryImage legacyPath={country.img} alt={country.name} sizes="(max-width: 640px) 15vw, 10vw" widths={[200, 400]} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none ${isFutureExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="text-[0.4rem] sm:text-[0.5rem] italic text-gold/90 tracking-wide">coming soon</span>
                      </div>
                    </div>
                    {isFutureExpanded && (
                      <p
                        className="absolute left-1/2 text-xs uppercase tracking-widest text-gold/70 font-semibold text-center whitespace-nowrap opacity-0 animate-fadeIn"
                        style={{ top: 'calc(100% + 28px)', transform: `translateX(-50%) rotate(${pos.deg}deg)`, animation: 'fadeIn 0.4s ease 0.3s forwards' }}
                      >
                        {country.name}
                      </p>
                    )}
                    </motion.div>
                  </div>
                ) : (
                  <div
                    key={country.name}
                    className="absolute z-[2]"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                  <motion.div
                    {...futureEntrance(index)}
                    className="group pointer-events-auto opacity-40 saturate-50 hover:opacity-70 hover:saturate-75 hover:z-50 transition-all duration-500"
                  >
                    {/* Rotation wrapper — keeps rotate separate from scale */}
                    <div style={{ transform: `rotate(${pos.deg}deg)`, transition: 'transform 0.5s ease' }}>
                      <div
                        className={`${pos.size} aspect-[3/2] rounded overflow-hidden shadow-sm ring-1 ring-transparent group-hover:scale-[1.73] group-hover:ring-gold/50 group-hover:shadow-2xl transition-all duration-500 relative`}
                      >
                        <CloudinaryImage legacyPath={country.img} alt={country.name} sizes="(max-width: 640px) 15vw, 10vw" widths={[200, 400]} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <span className="text-[0.4rem] sm:text-[0.5rem] italic text-gold/90 tracking-wide">coming soon</span>
                        </div>
                      </div>
                    </div>
                    <p
                      className="absolute left-1/2 text-xs uppercase tracking-widest text-gold/70 font-semibold text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ top: 'calc(100% + 56px)', transform: `translateX(-50%) rotate(${pos.deg}deg)` }}
                    >
                      {country.name}
                    </p>
                  </motion.div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>


        {/* Future Destinations note */}
        <div className="relative z-30 max-w-xl px-6 py-2 text-left">
          <p className="text-xs md:text-sm text-gold">
            more destinations arriving as the journey unfolds
          </p>
        </div>

      </main>

      {/* Torn paper edge - bottom */}
      <div className="relative z-50" style={{ lineHeight: 0, marginTop: '-1px' }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ height: "40px", display: "block" }}>
          <path d="M0,40 L0,20 C30,12 60,26 90,18 C120,10 150,28 180,20 C210,12 240,24 270,16 C300,8 330,30 360,22 C390,14 420,26 450,18 C480,10 510,32 540,24 C570,16 600,22 630,14 C660,6 690,28 720,20 C750,12 780,26 810,18 C840,10 870,30 900,22 C930,14 960,24 990,16 C1020,8 1050,28 1080,20 C1110,12 1140,26 1170,18 C1185,14 1195,12 1200,10 L1200,40 Z" fill="#50473e" />
        </svg>
      </div>

    </div>
  );
}

export default Adventures;
