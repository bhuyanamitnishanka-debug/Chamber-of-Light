import React, { useState } from 'react';
import { HISTORICAL_PANELS } from '../data/historicalChapters';
import { GraphicNovelPanel } from '../types';
import { soundEffects } from '../utils/audio';
import { BookOpen, Film, ChevronLeft, ChevronRight, Eye, ShieldAlert, Sparkles, Compass } from 'lucide-react';

interface GraphicNovelViewerProps {
  onJumpToPinhole: () => void;
  onJumpToAmsu: () => void;
}

export const GraphicNovelViewer: React.FC<GraphicNovelViewerProps> = ({
  onJumpToPinhole,
  onJumpToAmsu,
}) => {
  const [activePanelIdx, setActivePanelIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'novel' | 'script'>('novel');
  const [showRayPaths, setShowRayPaths] = useState<boolean>(true);
  const [candleToggles, setCandleToggles] = useState<[boolean, boolean, boolean]>([true, true, true]);
  const [waterFilterActive, setWaterFilterActive] = useState<boolean>(true);

  const panel: GraphicNovelPanel = HISTORICAL_PANELS[activePanelIdx];

  const handleNext = () => {
    if (activePanelIdx < HISTORICAL_PANELS.length - 1) {
      setActivePanelIdx(activePanelIdx + 1);
      soundEffects.playRatchetClick(1.1);
    }
  };

  const handlePrev = () => {
    if (activePanelIdx > 0) {
      setActivePanelIdx(activePanelIdx - 1);
      soundEffects.playRatchetClick(0.9);
    }
  };

  const toggleCandle = (idx: number) => {
    const updated: [boolean, boolean, boolean] = [...candleToggles];
    updated[idx] = !updated[idx];
    setCandleToggles(updated);
    soundEffects.playShutterClick();
  };

  return (
    <section id="graphic-novel" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Chapter header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-tabular tracking-wider uppercase mb-2">
            <span>Chapter {panel.chapterNumber} of 4</span>
            <span aria-hidden="true">·</span>
            <span>{panel.era}</span>
            <span aria-hidden="true">·</span>
            <span>{panel.location}</span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-stone-100 tracking-tight text-balance">
            {panel.title}
          </h2>
          <p className="text-stone-400 text-sm md:text-base mt-1 max-w-3xl">
            {panel.subtitle}
          </p>
        </div>

        {/* View mode segmented control (Functional tabs with click handlers) */}
        <div className="flex items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-lg shrink-0">
          <button
            onClick={() => {
              setViewMode('novel');
              soundEffects.playRatchetClick(1.0);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'novel'
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Graphic Novel</span>
          </button>
          <button
            onClick={() => {
              setViewMode('script');
              soundEffects.playRatchetClick(1.0);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'script'
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Director's Script</span>
          </button>
        </div>
      </div>

      {/* Chapter Selection Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-8">
        {HISTORICAL_PANELS.map((p, idx) => {
          const isCurrent = activePanelIdx === idx;
          return (
            <button
              key={p.id}
              onClick={() => {
                setActivePanelIdx(idx);
                soundEffects.playRatchetClick(0.9 + idx * 0.1);
              }}
              className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-stone-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                  : 'bg-stone-950/60 border-stone-800/80 hover:bg-stone-900/60 hover:border-stone-700'
              }`}
            >
              <div className="text-[11px] text-stone-400 font-mono-tabular">
                0{p.chapterNumber} · {p.era}
              </div>
              <div className={`text-xs md:text-sm font-semibold truncate mt-0.5 ${isCurrent ? 'text-amber-200' : 'text-stone-300'}`}>
                {p.title.split(':')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main View Area */}
      {viewMode === 'novel' ? (
        <div className="space-y-6">
          {/* Comic Panel Box */}
          <div className="relative bg-stone-900/90 border-2 border-stone-700 rounded-xl overflow-hidden shadow-2xl p-4 md:p-8 bg-halftone">
            {/* Top Comic Caption Box */}
            <div className="bg-amber-100 text-stone-900 border-2 border-stone-900 px-4 py-2.5 rounded shadow-[3px_3px_0px_rgba(0,0,0,0.8)] max-w-2xl mb-6">
              <span className="font-mono-tabular text-xs font-bold uppercase tracking-wider text-amber-900 block mb-1">
                Historical Chronicle · {panel.era}
              </span>
              <p className="text-xs md:text-sm font-medium leading-relaxed font-serif">
                "{panel.narrativeCaptions[0]}"
              </p>
            </div>

            {/* Interactive Vector Comic Stage */}
            <div className="relative w-full aspect-16/9 bg-stone-950 rounded-lg border border-stone-800 overflow-hidden shadow-inner flex items-center justify-center">
              {/* Panel 1: Mozi China */}
              {activePanelIdx === 0 && (
                <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <radialGradient id="sunGlow" cx="15%" cy="30%" r="50%">
                      <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                      <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#0c0a09" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="rayGolden" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Exterior World (Left side) */}
                  <rect x="0" y="0" width="350" height="450" fill="#1c1917" />
                  <circle cx="90" cy="110" r="45" fill="url(#sunGlow)" />
                  <circle cx="90" cy="110" r="24" fill="#fef08a" />

                  {/* Pagoda Silhouette (Outside) */}
                  <g transform="translate(140, 220)">
                    {/* Tier 3 */}
                    <polygon points="40,20 15,50 65,50" fill="#78350f" />
                    <rect x="32" y="50" width="16" height="15" fill="#451a03" />
                    {/* Tier 2 */}
                    <polygon points="40,65 5,100 75,100" fill="#92400e" />
                    <rect x="28" y="100" width="24" height="20" fill="#451a03" />
                    {/* Tier 1 */}
                    <polygon points="40,120 -5,165 85,165" fill="#b45309" />
                    <rect x="22" y="165" width="36" height="45" fill="#78350f" />
                    {/* Base */}
                    <rect x="10" y="210" width="60" height="15" fill="#292524" />
                  </g>

                  {/* Ground & willow tree */}
                  <line x1="0" y1="435" x2="350" y2="435" stroke="#44403c" strokeWidth="4" />
                  <path d="M 60 435 Q 80 340 100 290 Q 70 320 50 350" stroke="#15803d" strokeWidth="3" fill="none" />

                  {/* Dark Room Partition Wall with Pinhole */}
                  <rect x="350" y="0" width="20" height="205" fill="#44403c" stroke="#292524" strokeWidth="2" />
                  {/* Pinhole gap at y=205 to y=225 (center 215) */}
                  <circle cx="360" cy="215" r="7" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                  <rect x="350" y="225" width="20" height="225" fill="#44403c" stroke="#292524" strokeWidth="2" />

                  {/* Label on Wall */}
                  <text x="360" y="180" fill="#a8a29e" fontSize="11" textAnchor="middle" fontFamily="monospace">APERTURE</text>

                  {/* Interior Dark Chamber (Right side) */}
                  <rect x="370" y="0" width="430" height="450" fill="#09090b" />

                  {/* Raw Silk Projection Screen */}
                  <rect x="680" y="60" width="10" height="320" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="2" />
                  <text x="685" y="50" fill="#e7e5e4" fontSize="11" textAnchor="middle" fontFamily="monospace">SILK SCREEN</text>

                  {/* Inverted Pagoda Image on Silk Screen */}
                  <g transform="translate(675, 230) scale(0.65, -0.65)">
                    {/* Upside Down Pagoda Glow */}
                    <polygon points="40,20 15,50 65,50" fill="#f59e0b" opacity="0.8" />
                    <rect x="32" y="50" width="16" height="15" fill="#d97706" opacity="0.8" />
                    <polygon points="40,65 5,100 75,100" fill="#f59e0b" opacity="0.8" />
                    <rect x="28" y="100" width="24" height="20" fill="#d97706" opacity="0.8" />
                    <polygon points="40,120 -5,165 85,165" fill="#f59e0b" opacity="0.8" />
                    <rect x="22" y="165" width="36" height="45" fill="#b45309" opacity="0.8" />
                  </g>

                  {/* Crossing Rays if toggled */}
                  {showRayPaths && (
                    <g>
                      {/* Ray 1: From Pagoda Peak (x=180, y=240) down through pinhole (x=360, y=215) to silk (x=680, y=190) */}
                      <line x1="180" y1="240" x2="360" y2="215" stroke="#fef08a" strokeWidth="2" strokeDasharray="4,3" />
                      <line x1="360" y1="215" x2="680" y2="190" stroke="#fef08a" strokeWidth="2" strokeDasharray="4,3" />

                      {/* Ray 2: From Pagoda Base (x=180, y=430) up through pinhole (x=360, y=215) to silk (x=680, y=365) */}
                      <line x1="180" y1="430" x2="360" y2="215" stroke="#f97316" strokeWidth="2" strokeDasharray="4,3" />
                      <line x1="360" y1="215" x2="680" y2="365" stroke="#f97316" strokeWidth="2" strokeDasharray="4,3" />

                      {/* Crossing Intersection Highlight */}
                      <circle cx="360" cy="215" r="14" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="2,2" />
                      <text x="360" y="255" fill="#fef08a" fontSize="11" textAnchor="middle" fontFamily="monospace">CROSSING POINT (O)</text>
                    </g>
                  )}

                  {/* Mozi Silhouette inside chamber */}
                  <g transform="translate(540, 260)">
                    {/* Robe */}
                    <path d="M 40 180 Q 20 110 35 70 Q 50 65 65 70 Q 80 110 60 180 Z" fill="#292524" />
                    {/* Head */}
                    <circle cx="50" cy="50" r="16" fill="#44403c" />
                    {/* Arm pointing forward */}
                    <line x1="45" y1="85" x2="15" y2="70" stroke="#44403c" strokeWidth="7" strokeLinecap="round" />
                    <text x="50" y="20" fill="#a8a29e" fontSize="12" textAnchor="middle" fontFamily="serif">Mozi</text>
                  </g>
                </svg>
              )}

              {/* Panel 2: Ibn al-Haytham Multi-Candle Proof */}
              {activePanelIdx === 1 && (
                <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
                  {/* Left Exterior with 3 candles */}
                  <rect x="0" y="0" width="340" height="450" fill="#1c1917" />
                  
                  {/* Candle 1 (Top) */}
                  <g transform="translate(100, 90)">
                    <rect x="15" y="30" width="14" height="60" fill="#d6d3d1" />
                    {candleToggles[0] ? (
                      <g>
                        <ellipse cx="22" cy="22" rx="7" ry="12" fill="#f59e0b" />
                        <ellipse cx="22" cy="22" rx="3" ry="7" fill="#fef08a" />
                        <text x="-40" y="38" fill="#f59e0b" fontSize="11" fontFamily="monospace">FLAME 1</text>
                      </g>
                    ) : (
                      <rect x="10" y="10" width="24" height="80" fill="#44403c" opacity="0.9" />
                    )}
                  </g>

                  {/* Candle 2 (Middle) */}
                  <g transform="translate(100, 190)">
                    <rect x="15" y="30" width="14" height="60" fill="#d6d3d1" />
                    {candleToggles[1] ? (
                      <g>
                        <ellipse cx="22" cy="22" rx="7" ry="12" fill="#ef4444" />
                        <ellipse cx="22" cy="22" rx="3" ry="7" fill="#fef08a" />
                        <text x="-40" y="38" fill="#ef4444" fontSize="11" fontFamily="monospace">FLAME 2</text>
                      </g>
                    ) : (
                      <rect x="10" y="10" width="24" height="80" fill="#44403c" opacity="0.9" />
                    )}
                  </g>

                  {/* Candle 3 (Bottom) */}
                  <g transform="translate(100, 290)">
                    <rect x="15" y="30" width="14" height="60" fill="#d6d3d1" />
                    {candleToggles[2] ? (
                      <g>
                        <ellipse cx="22" cy="22" rx="7" ry="12" fill="#3b82f6" />
                        <ellipse cx="22" cy="22" rx="3" ry="7" fill="#93c5fd" />
                        <text x="-40" y="38" fill="#3b82f6" fontSize="11" fontFamily="monospace">FLAME 3</text>
                      </g>
                    ) : (
                      <rect x="10" y="10" width="24" height="80" fill="#44403c" opacity="0.9" />
                    )}
                  </g>

                  {/* Masonry Partition with Single Central Pin-hole */}
                  <rect x="340" y="0" width="24" height="210" fill="#292524" stroke="#1c1917" />
                  <circle cx="352" cy="225" r="6" fill="#fef08a" stroke="#b45309" strokeWidth="2" />
                  <rect x="340" y="240" width="24" height="210" fill="#292524" stroke="#1c1917" />

                  {/* Dark Room Interior */}
                  <rect x="364" y="0" width="436" height="450" fill="#0c0a09" />
                  {/* Stone Whitewashed Wall on right */}
                  <rect x="710" y="30" width="20" height="390" fill="#e7e5e4" stroke="#78716c" />

                  {/* Projection Spots on Wall (Inverted!) */}
                  {/* Flame 1 (Top) projects to Bottom Spot */}
                  {candleToggles[0] && (
                    <g>
                      <line x1="122" y1="112" x2="352" y2="225" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                      <line x1="352" y1="225" x2="710" y2="338" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                      <circle cx="710" cy="338" r="9" fill="#f59e0b" />
                      <text x="735" y="342" fill="#f59e0b" fontSize="11" fontFamily="monospace">SPOT 1</text>
                    </g>
                  )}

                  {/* Flame 2 (Middle) projects to Middle Spot */}
                  {candleToggles[1] && (
                    <g>
                      <line x1="122" y1="212" x2="352" y2="225" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                      <line x1="352" y1="225" x2="710" y2="238" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                      <circle cx="710" cy="238" r="9" fill="#ef4444" />
                      <text x="735" y="242" fill="#ef4444" fontSize="11" fontFamily="monospace">SPOT 2</text>
                    </g>
                  )}

                  {/* Flame 3 (Bottom) projects to Top Spot */}
                  {candleToggles[2] && (
                    <g>
                      <line x1="122" y1="312" x2="352" y2="225" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
                      <line x1="352" y1="225" x2="710" y2="138" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
                      <circle cx="710" cy="138" r="9" fill="#3b82f6" />
                      <text x="735" y="142" fill="#3b82f6" fontSize="11" fontFamily="monospace">SPOT 3</text>
                    </g>
                  )}

                  {/* Ibn al-Haytham Observer */}
                  <g transform="translate(520, 270)">
                    <circle cx="30" cy="30" r="15" fill="#57534e" />
                    <path d="M 15 150 Q 5 70 25 50 Q 40 45 50 50 Q 60 70 45 150 Z" fill="#292524" />
                    <text x="30" y="10" fill="#d6d3d1" fontSize="12" textAnchor="middle" fontFamily="serif">Ibn al-Haytham</text>
                  </g>
                </svg>
              )}

              {/* Panel 3: Aṁśu Bodhinī Technical Optical Chamber (Matching user's artwork!) */}
              {activePanelIdx === 2 && (
                <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="40%" stopColor="#b45309" />
                      <stop offset="80%" stopColor="#78350f" />
                      <stop offset="100%" stopColor="#451a03" />
                    </linearGradient>
                    <linearGradient id="spectrumRainbow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="20%" stopColor="#f97316" />
                      <stop offset="40%" stopColor="#eab308" />
                      <stop offset="60%" stopColor="#22c55e" />
                      <stop offset="80%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>

                  {/* Background Chamber */}
                  <rect x="0" y="0" width="800" height="450" fill="#0f0d0b" />

                  {/* Antique Brass Housing Chamber Box */}
                  <rect x="320" y="70" width="440" height="320" rx="8" fill="#1c1917" stroke="url(#brassGrad)" strokeWidth="8" />
                  <rect x="332" y="82" width="416" height="296" fill="#0a0a0a" />

                  {/* Intense Golden Sunbeam Entering */}
                  <polygon points="0,70 0,170 170,220 170,190" fill="#fef08a" opacity="0.65" />
                  <text x="60" y="120" fill="#fef08a" fontSize="14" fontWeight="bold" fontFamily="monospace">SUNBEAM (SŪRYARAŚMI)</text>

                  {/* Jabākācha Brass Collimator Assembly on the left */}
                  <g transform="translate(170, 160)">
                    {/* Outer Flange */}
                    <ellipse cx="20" cy="50" rx="16" ry="46" fill="url(#brassGrad)" stroke="#fef08a" strokeWidth="2" />
                    {/* Lens Tube Barrel */}
                    <path d="M 20 6 L 140 28 L 140 72 L 20 94 Z" fill="url(#brassGrad)" stroke="#78350f" strokeWidth="2" />
                    {/* Convex Glass Collimator Lens inside */}
                    <ellipse cx="30" cy="50" rx="8" ry="38" fill="#bae6fd" opacity="0.75" stroke="#38bdf8" strokeWidth="2" />
                    <text x="35" y="-5" fill="#fde68a" fontSize="12" fontWeight="bold" fontFamily="monospace">JABĀKĀCHA LENS</text>
                  </g>

                  {/* Parallel Collimated Beam from Lens into Water Cell */}
                  <rect x="310" y="202" width="130" height="16" fill="#fef08a" opacity="0.9" />

                  {/* Water Vessel (Fluid Cell IR Thermal Filter) */}
                  <g transform="translate(440, 160)">
                    {/* Stand & Base */}
                    <rect x="25" y="110" width="10" height="45" fill="url(#brassGrad)" />
                    <ellipse cx="30" cy="155" rx="25" ry="8" fill="url(#brassGrad)" />
                    {/* Glass Goblet / Cell */}
                    <rect x="5" y="10" width="50" height="100" rx="6" fill="#0284c7" opacity="0.2" stroke="#38bdf8" strokeWidth="2" />
                    {/* Water Level */}
                    {waterFilterActive ? (
                      <g>
                        <rect x="7" y="24" width="46" height="84" rx="4" fill="#38bdf8" opacity="0.45" />
                        <ellipse cx="30" cy="24" rx="23" ry="5" fill="#7dd3fc" opacity="0.6" />
                        <text x="30" y="-8" fill="#38bdf8" fontSize="11" textAnchor="middle" fontFamily="monospace">WATER VESSEL (IR HEAT FILTER)</text>
                        {/* Thermal absorb tag */}
                        <text x="30" y="125" fill="#34d399" fontSize="10" textAnchor="middle" fontFamily="monospace">✓ 98% IR ABSORBED</text>
                      </g>
                    ) : (
                      <text x="30" y="-8" fill="#f87171" fontSize="11" textAnchor="middle" fontFamily="monospace">WATER DRAINED (THERMAL RISK!)</text>
                    )}
                  </g>

                  {/* Filtered Visible Beam from Water Cell to Quartz Prism */}
                  <rect x="495" y="204" width="75" height="12" fill="#ffffff" opacity="0.95" />

                  {/* Sphātika (Pure Quartz Prism) */}
                  <g transform="translate(570, 150)">
                    {/* 60 deg Quartz Prism */}
                    <polygon points="40,20 0,110 80,110" fill="#e0f2fe" opacity="0.75" stroke="#bae6fd" strokeWidth="3" />
                    {/* Internal refraction lines */}
                    <line x1="18" y1="72" x2="60" y2="76" stroke="#ffffff" strokeWidth="2" />
                    <text x="40" y="132" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">SPHĀTIKA (QUARTZ)</text>
                  </g>

                  {/* Vivid Spectral Dispersion Fan onto Back Wall */}
                  <g>
                    {/* Red Ray */}
                    <polygon points="630,222 730,130 730,155" fill="#ef4444" opacity="0.95" />
                    {/* Orange Ray */}
                    <polygon points="630,224 730,155 730,180" fill="#f97316" opacity="0.95" />
                    {/* Yellow Ray */}
                    <polygon points="630,226 730,180 730,205" fill="#eab308" opacity="0.95" />
                    {/* Green Ray */}
                    <polygon points="630,227 730,205 730,230" fill="#22c55e" opacity="0.95" />
                    {/* Blue Ray */}
                    <polygon points="630,228 730,230 730,255" fill="#06b6d4" opacity="0.95" />
                    {/* Violet Ray */}
                    <polygon points="630,230 730,255 730,285" fill="#8b5cf6" opacity="0.95" />

                    {/* Calibrated Brass Scale on Wall */}
                    <rect x="732" y="115" width="12" height="185" fill="url(#brassGrad)" stroke="#fef08a" />
                    <text x="738" y="105" fill="#fef08a" fontSize="10" textAnchor="middle" fontFamily="monospace">SCALE</text>
                  </g>
                </svg>
              )}

              {/* Panel 4: Newton & Fraunhofer */}
              {activePanelIdx === 3 && (
                <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
                  {/* Left: Newton's Recombination Chamber */}
                  <rect x="0" y="0" width="395" height="450" fill="#141210" />
                  <rect x="395" y="0" width="10" height="450" fill="#292524" />
                  {/* Right: Fraunhofer Bavarian Lab */}
                  <rect x="405" y="0" width="395" height="450" fill="#090d16" />

                  {/* Left Header */}
                  <text x="200" y="40" fill="#fde68a" fontSize="13" textAnchor="middle" fontFamily="serif" fontWeight="bold">
                    Newton 1666: Experimentum Crucis
                  </text>

                  {/* Sunbeam through shutter */}
                  <polygon points="0,150 0,165 80,180 80,175" fill="#ffffff" opacity="0.9" />

                  {/* Prism 1 (Dispersing) */}
                  <polygon points="120,130 90,210 150,210" fill="#bae6fd" opacity="0.8" stroke="#38bdf8" strokeWidth="2" />

                  {/* Rainbow fan between prisms */}
                  <g>
                    <line x1="135" y1="170" x2="220" y2="155" stroke="#ef4444" strokeWidth="3" />
                    <line x1="135" y1="173" x2="220" y2="168" stroke="#eab308" strokeWidth="3" />
                    <line x1="135" y1="176" x2="220" y2="182" stroke="#22c55e" strokeWidth="3" />
                    <line x1="135" y1="180" x2="220" y2="198" stroke="#8b5cf6" strokeWidth="3" />
                  </g>

                  {/* Prism 2 (Inverted Recombining) */}
                  <polygon points="220,140 280,140 250,220" fill="#bae6fd" opacity="0.8" stroke="#38bdf8" strokeWidth="2" />

                  {/* Recombined White Pencil Beam */}
                  <line x1="265" y1="175" x2="380" y2="175" stroke="#ffffff" strokeWidth="4" />
                  <text x="320" y="160" fill="#ffffff" fontSize="10" fontFamily="monospace">WHITE BEAM</text>

                  {/* Right Header: Fraunhofer */}
                  <text x="600" y="40" fill="#93c5fd" fontSize="13" textAnchor="middle" fontFamily="serif" fontWeight="bold">
                    Fraunhofer 1814: Solar Absorption Lines
                  </text>

                  {/* Solar Spectral Band with Dark Absorption Lines */}
                  <g transform="translate(430, 150)">
                    {/* Continuous color ribbon */}
                    <rect x="0" y="0" width="340" height="60" fill="url(#spectrumRainbow)" rx="4" />

                    {/* Dark Fraunhofer Absorption Gaps */}
                    {/* B line 687 nm */}
                    <line x1="28" y1="0" x2="28" y2="60" stroke="#000000" strokeWidth="3.5" />
                    <text x="28" y="78" fill="#fca5a5" fontSize="10" textAnchor="middle" fontFamily="monospace">B(O₂)</text>

                    {/* C line 656 nm (H-alpha) */}
                    <line x1="58" y1="0" x2="58" y2="60" stroke="#000000" strokeWidth="3" />
                    <text x="58" y="78" fill="#fca5a5" fontSize="10" textAnchor="middle" fontFamily="monospace">C(Hα)</text>

                    {/* D line 589 nm (Sodium doublet) */}
                    <line x1="125" y1="0" x2="125" y2="60" stroke="#000000" strokeWidth="4" />
                    <text x="125" y="78" fill="#fef08a" fontSize="10" textAnchor="middle" fontFamily="monospace">D(Na)</text>

                    {/* E line 527 nm (Iron) */}
                    <line x1="195" y1="0" x2="195" y2="60" stroke="#000000" strokeWidth="2.5" />
                    <text x="195" y="78" fill="#86efac" fontSize="10" textAnchor="middle" fontFamily="monospace">E(Fe)</text>

                    {/* b line 517 nm (Magnesium) */}
                    <line x1="210" y1="0" x2="210" y2="60" stroke="#000000" strokeWidth="3" />
                    <text x="210" y="92" fill="#86efac" fontSize="10" textAnchor="middle" fontFamily="monospace">b(Mg)</text>

                    {/* F line 486 nm (H-beta) */}
                    <line x1="245" y1="0" x2="245" y2="60" stroke="#000000" strokeWidth="3" />
                    <text x="245" y="78" fill="#67e8f9" fontSize="10" textAnchor="middle" fontFamily="monospace">F(Hβ)</text>

                    {/* G & H lines (Calcium) */}
                    <line x1="310" y1="0" x2="310" y2="60" stroke="#000000" strokeWidth="4" />
                    <text x="310" y="78" fill="#c4b5fd" fontSize="10" textAnchor="middle" fontFamily="monospace">H/K(Ca)</text>
                  </g>

                  {/* Telescopic Reticle Crosshairs */}
                  <g transform="translate(600, 290)">
                    <circle cx="0" cy="0" r="35" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                    <line x1="-45" y1="0" x2="45" y2="0" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="0" y1="-45" x2="0" y2="45" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3,3" />
                    <text x="0" y="55" fill="#93c5fd" fontSize="10" textAnchor="middle" fontFamily="monospace">MICROMETER RETICLE</text>
                  </g>
                </svg>
              )}

              {/* Panel 5: Unified Apparatus Modern Synthesis */}
              {activePanelIdx === 4 && (
                <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
                  {/* Left: Camera Obscura Pin-hole Chamber */}
                  <rect x="0" y="0" width="395" height="450" fill="#141210" />
                  <rect x="395" y="0" width="10" height="450" fill="#292524" />
                  {/* Right: Modern Quartz & Diffraction Spectrograph */}
                  <rect x="405" y="0" width="395" height="450" fill="#08080c" />

                  {/* Left: Obscura Section */}
                  <text x="200" y="35" fill="#fde68a" fontSize="13" textAnchor="middle" fontFamily="serif" fontWeight="bold">
                    Spatial Domain: Camera Obscura
                  </text>
                  <text x="200" y="55" fill="#a8a29e" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    (x, y) ⟶ (-x&apos;, -y&apos;) Inverted Imaging
                  </text>

                  {/* Pinhole partition in left half */}
                  <rect x="180" y="80" width="8" height="135" fill="#44403c" />
                  <circle cx="184" cy="225" r="4" fill="#fef08a" />
                  <rect x="180" y="235" width="8" height="185" fill="#44403c" />

                  {/* Exterior Object & Crossing Rays */}
                  <polygon points="60,160 30,280 90,280" fill="#b45309" />
                  <rect x="52" y="280" width="16" height="30" fill="#78350f" />

                  <line x1="60" y1="160" x2="184" y2="225" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="184" y1="225" x2="330" y2="280" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="3,3" />

                  <line x1="60" y1="310" x2="184" y2="225" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="184" y1="225" x2="330" y2="150" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* Inverted projection on screen */}
                  <rect x="330" y="90" width="6" height="270" fill="#f5f5f4" />
                  <polygon points="325,280 305,170 345,170" fill="#f59e0b" opacity="0.85" />

                  {/* Right: Modern Cross-Dispersion Spectrograph Section */}
                  <text x="600" y="35" fill="#38bdf8" fontSize="13" textAnchor="middle" fontFamily="serif" fontWeight="bold">
                    Spectral Domain: Quartz &amp; Diffraction Grating
                  </text>
                  <text x="600" y="55" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    I(x, y) ⟶ I(λ) Wavelength Fingerprinting
                  </text>

                  {/* Incoming collimated beam */}
                  <line x1="420" y1="220" x2="490" y2="220" stroke="#ffffff" strokeWidth="4" />

                  {/* Quartz Prism */}
                  <polygon points="510,180 480,260 540,260" fill="#bae6fd" opacity="0.8" stroke="#38bdf8" strokeWidth="2" />
                  <text x="510" y="280" fill="#bae6fd" fontSize="9" textAnchor="middle" fontFamily="monospace">QUARTZ</text>

                  {/* Transmission Diffraction Grating */}
                  <rect x="590" y="160" width="6" height="120" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="593" y="150" fill="#38bdf8" fontSize="9" textAnchor="middle" fontFamily="monospace">GRATING</text>

                  {/* Dispersed orders onto digital sensor array */}
                  <line x1="530" y1="225" x2="590" y2="215" stroke="#fef08a" strokeWidth="2" />

                  {/* m=0 Central White Order */}
                  <line x1="596" y1="215" x2="730" y2="215" stroke="#ffffff" strokeWidth="3" />
                  <text x="740" y="219" fill="#ffffff" fontSize="9" fontFamily="monospace">m=0</text>

                  {/* m=+1 Dispersed Fan */}
                  <polygon points="596,215 730,120 730,165" fill="#f59e0b" opacity="0.9" />
                  <text x="740" y="145" fill="#fde68a" fontSize="9" fontFamily="monospace">m=+1</text>

                  {/* m=-1 Dispersed Fan */}
                  <polygon points="596,215 730,265 730,310" fill="#38bdf8" opacity="0.9" />
                  <text x="740" y="290" fill="#fde68a" fontSize="9" fontFamily="monospace">m=-1</text>

                  {/* CCD Sensor */}
                  <rect x="732" y="90" width="10" height="250" fill="#0284c7" stroke="#38bdf8" />
                </svg>
              )}
            </div>

            {/* In-Panel Interactive Controls */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800">
              <div className="flex flex-wrap items-center gap-3">
                {activePanelIdx === 0 && (
                  <button
                    onClick={() => {
                      setShowRayPaths(!showRayPaths);
                      soundEffects.playRatchetClick(1.0);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      showRayPaths
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showRayPaths ? 'Hide Ray Vectors' : 'Show Crossing Rays'}</span>
                  </button>
                )}

                {activePanelIdx === 1 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400">Toggle Exterior Flames:</span>
                    {candleToggles.map((state, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleCandle(idx)}
                        className={`px-2.5 py-1 text-xs font-mono-tabular rounded font-medium cursor-pointer transition-colors ${
                          state
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-stone-800 text-stone-500 border border-stone-700'
                        }`}
                      >
                        Flame {idx + 1}: {state ? 'ON' : 'OFF'}
                      </button>
                    ))}
                  </div>
                )}

                {activePanelIdx === 2 && (
                  <button
                    onClick={() => {
                      setWaterFilterActive(!waterFilterActive);
                      soundEffects.playWaterBubble();
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      waterFilterActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{waterFilterActive ? 'Water Cell Active (98% IR Filtered)' : 'Water Drained (Thermal Shock Risk!)'}</span>
                  </button>
                )}

                {activePanelIdx === 3 && (
                  <div className="text-xs text-stone-400 font-mono-tabular">
                    Fraunhofer Precision: 574 Discrete Dark Solar Spectral Lines Identified
                  </div>
                )}
              </div>

              {/* Direct sandbox jump actions */}
              <div className="flex items-center gap-2">
                {activePanelIdx <= 1 ? (
                  <button
                    onClick={onJumpToPinhole}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-medium rounded transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Open Pinhole Bench</span>
                  </button>
                ) : (
                  <button
                    onClick={onJumpToAmsu}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-medium rounded transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open Aṁśu Spectrometer Bench</span>
                  </button>
                )}
              </div>
            </div>

            {/* Character Dialogue Bubble Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {panel.dialogueBubbles.map((bubble, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950 border border-stone-800 rounded-lg p-4 relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-amber-300 text-sm">
                      {bubble.speaker}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {bubble.role}
                    </span>
                  </div>
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed italic">
                    "{bubble.text}"
                  </p>
                </div>
              ))}
            </div>

            {/* Technical Callout Strip */}
            <div className="mt-6 pt-6 border-t border-stone-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3 font-mono-tabular">
                Optical Physics & Engineering Invariants
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {panel.technicalCallouts.map((tc, idx) => (
                  <div key={idx} className="bg-stone-950/60 p-3.5 rounded border border-stone-800/80">
                    <div className="text-amber-200 font-semibold text-xs mb-1">
                      {tc.term}
                    </div>
                    <div className="text-stone-400 text-xs leading-normal mb-2">
                      {tc.definition}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono-tabular">
                      Impact: {tc.mechanicalSignificance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Director's Production Script Mode */
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 md:p-8 space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <span className="text-xs font-mono-tabular text-amber-400 uppercase tracking-widest block mb-1">
              Production Script Specification · Panel {panel.chapterNumber}
            </span>
            <h3 className="font-display text-2xl font-bold text-stone-100">
              {panel.title}
            </h3>
            <p className="text-stone-400 text-sm mt-1">
              Setting: {panel.location} ({panel.era})
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 font-mono-tabular">
                1. Visual Composition & Camera Blocking
              </h4>
              <p className="text-sm text-stone-300 leading-relaxed bg-stone-950/80 p-3.5 rounded border border-stone-800/80 font-serif">
                {panel.composition}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 font-mono-tabular">
                2. Lighting, Grading & Atmosphere
              </h4>
              <p className="text-sm text-stone-300 leading-relaxed bg-stone-950/80 p-3.5 rounded border border-stone-800/80 font-serif">
                {panel.lightingAndAtmosphere}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 font-mono-tabular">
                3. Lettering & Voice Script
              </h4>
              <div className="space-y-2 bg-stone-950/80 p-3.5 rounded border border-stone-800/80">
                {panel.narrativeCaptions.map((cap, i) => (
                  <p key={i} className="text-xs text-amber-100/90 font-mono-tabular">
                    <span className="text-amber-400 font-bold">[CAPTION {i + 1}]:</span> {cap}
                  </p>
                ))}
                {panel.dialogueBubbles.map((dia, i) => (
                  <p key={i} className="text-xs text-stone-200">
                    <span className="text-stone-400 font-semibold font-mono-tabular">[{dia.speaker} - {dia.role}]:</span> "{dia.text}"
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 font-mono-tabular">
                4. Audio & Sound Design Direction
              </h4>
              <p className="text-xs text-stone-400 bg-stone-950/80 p-3 rounded border border-stone-800 font-mono-tabular">
                CUE: {panel.soundDesignCue}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 font-mono-tabular">
                5. Director's Notes for Illustrators
              </h4>
              <p className="text-xs text-stone-400 bg-stone-950/80 p-3 rounded border border-stone-800">
                {panel.directorScriptNotes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pagination controls */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={activePanelIdx === 0}
          className="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Chapter</span>
        </button>

        <span className="text-xs text-stone-500 font-mono-tabular">
          {activePanelIdx + 1} / {HISTORICAL_PANELS.length}
        </span>

        <button
          onClick={handleNext}
          disabled={activePanelIdx === HISTORICAL_PANELS.length - 1}
          className="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>Next Chapter</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
