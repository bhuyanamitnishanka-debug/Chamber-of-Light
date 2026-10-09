import React, { useState } from 'react';
import { COMPARISON_MATRIX, TECHNICAL_DEEP_DIVES, TECHNICAL_TERMS_GLOSSARY, FLUID_SOLUTIONS } from '../data/comparativeData';
import { TechnicalTermGlossary } from '../types';
import { soundEffects } from '../utils/audio';
import {
  ArrowLeftRight,
  Layers,
  ShieldCheck,
  Microscope,
  BookOpen,
  Sparkles,
  HelpCircle,
  Eye,
  Flame,
  Droplet,
  Beaker,
} from 'lucide-react';

interface TermTooltipProps {
  termKey: string;
  displayText?: string;
}

export const TermTooltip: React.FC<TermTooltipProps> = ({ termKey, displayText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const data: TechnicalTermGlossary | undefined = TECHNICAL_TERMS_GLOSSARY[termKey];

  if (!data) return <span>{displayText || termKey}</span>;

  return (
    <span
      className="relative inline-block cursor-help group"
      onMouseEnter={() => {
        setIsOpen(true);
        soundEffects.playRatchetClick(1.2);
      }}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => {
        setIsOpen(true);
        soundEffects.playRatchetClick(1.2);
      }}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      role="button"
      aria-label={`Definition for ${data.term}`}
    >
      <span className="underline decoration-amber-400/70 decoration-dotted underline-offset-4 text-amber-200 font-semibold group-hover:text-amber-100 group-hover:decoration-amber-300 transition-colors">
        {displayText || data.term}
      </span>

      {/* Floating Tooltip Card */}
      {isOpen && (
        <span
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-72 sm:w-80 p-4 bg-stone-950/98 border border-amber-500/90 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.85)] backdrop-blur-lg text-left text-xs pointer-events-none block animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Tooltip Header */}
          <span className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2 block">
            <strong className="font-display font-bold text-amber-300 text-sm block">
              {data.term}
            </strong>
            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-amber-400/90 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
              {data.category}
            </span>
          </span>

          {/* Quick Definition */}
          <span className="text-stone-200 font-medium block leading-relaxed mb-2 font-serif text-[11.5px]">
            {data.shortDef}
          </span>

          {/* Engineering Mechanism */}
          <span className="text-stone-400 block text-[11px] leading-relaxed mb-2.5">
            {data.engineeringExplanation}
          </span>

          {/* Formula if present */}
          {data.formula && (
            <span className="block bg-stone-900/90 px-2.5 py-1.5 rounded border border-stone-800 text-[10.5px] font-mono-tabular text-amber-200 mb-2">
              Formula: {data.formula}
            </span>
          )}

          {/* Historical Pioneer */}
          <span className="flex items-center justify-between text-[10px] text-stone-500 font-mono-tabular pt-1 border-t border-stone-900 block">
            <span>Historical Pioneer:</span>
            <span className="text-stone-300 font-medium">{data.historicalPioneer}</span>
          </span>

          {/* Tooltip Caret Pointer */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-amber-500 border-t-8 border-x-transparent border-x-8 border-b-0 block" />
        </span>
      )}
    </span>
  );
};

// Formats table text strings by injecting interactive tooltips for key optical terms
function renderFormattedCell(text: string) {
  // Ordered matching patterns
  const patterns = [
    { key: 'Rectilinear Propagation', regex: /Rectilinear Propagation/g },
    { key: 'Spectral Dispersion', regex: /Spectral Angular Dispersion|Spectral Dispersion/g },
    { key: 'Pinhole Diffraction', regex: /Pinhole Diffraction/g },
    { key: 'Collimation', regex: /Collimating brass barrel|Collimation/g },
    { key: 'Dual-Stage Liquid Filtering', regex: /Dual-Stage Liquid Filtering|thermal liquid cell stage|water jacket/g },
    { key: 'Crystalline Quartz', regex: /crystalline quartz prism|crystalline quartz|pure quartz/g },
    { key: 'Rayleigh-Petzval Paradox', regex: /Rayleigh-Petzval Paradox|Airy disk/g },
  ];

  let elements: React.ReactNode[] = [text];

  patterns.forEach(({ key, regex }) => {
    const nextElements: React.ReactNode[] = [];
    elements.forEach((el) => {
      if (typeof el === 'string') {
        const parts = el.split(regex);
        const matches = el.match(regex);
        if (matches && parts.length > 1) {
          parts.forEach((part, i) => {
            nextElements.push(part);
            if (i < matches.length) {
              nextElements.push(
                <TermTooltip key={`${key}-${i}`} termKey={key} displayText={matches[i]} />
              );
            }
          });
        } else {
          nextElements.push(el);
        }
      } else {
        nextElements.push(el);
      }
    });
    elements = nextElements;
  });

  return elements;
}

export type VectorOverlayType = 'all' | 'spatial' | 'spectral' | 'thermo' | 'mechanical';

export const ComparativeMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'pinhole-deep' | 'filter-deep' | 'glossary'>('matrix');
  const [vectorOverlay, setVectorOverlay] = useState<VectorOverlayType>('all');
  const [selectedAlchemicalId, setSelectedAlchemicalId] = useState<string>('yavakshara');

  const selectedAlchemical = FLUID_SOLUTIONS.find((f) => f.id === selectedAlchemicalId) || FLUID_SOLUTIONS[1];

  return (
    <section id="comparative-matrix" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-tabular tracking-wider uppercase mb-2">
            <span>Engineering Analysis · Side-by-Side Synthesis</span>
            <span aria-hidden="true">·</span>
            <span>Spatial Imaging vs. Spectral Decomposition</span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-stone-100 tracking-tight">
            The Comparative Optical Matrix
          </h2>
          <p className="text-stone-400 text-sm md:text-base mt-1 max-w-3xl">
            A rigorous engineering comparison between the Pinhole Camera Obscura and the Classical Aṁśu Spectrometer configurations. Hover over underlined terms to inspect real-time physics definitions.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-lg shrink-0">
          <button
            onClick={() => {
              setActiveTab('matrix');
              soundEffects.playRatchetClick(1.0);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Core Matrix</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('pinhole-deep');
              soundEffects.playRatchetClick(1.0);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pinhole-deep'
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>Pinhole Math</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('filter-deep');
              soundEffects.playRatchetClick(1.0);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'filter-deep'
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dual-Stage Filtering</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('glossary');
              soundEffects.playRatchetClick(1.0);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'glossary'
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Optical Lexicon</span>
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'matrix' && (
        <div className="space-y-8">
          {/* Responsive Vector Overlay Toggle Bar */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono-tabular">
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="text-stone-300 font-semibold uppercase tracking-wider">
                Responsive Vector Overlay Toggle:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Vectors' },
                { id: 'spatial', label: 'Spatial Cone (Mozi)' },
                { id: 'spectral', label: 'Spectral Rays (Prism)' },
                { id: 'thermo', label: 'Thermal Shield (Fluid)' },
                { id: 'mechanical', label: 'Mechanical Slits' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setVectorOverlay(opt.id as VectorOverlayType);
                    soundEffects.playRatchetClick(1.1);
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg font-mono-tabular transition-all cursor-pointer border ${
                    vectorOverlay === opt.id
                      ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 shadow-sm'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Tooltip Help Indicator Banner */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg px-4 py-2.5 flex items-center justify-between text-xs text-amber-200">
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Interactive Tooltips Active:</strong> Hover or focus on dotted-underlined terms (e.g. <TermTooltip termKey="Rectilinear Propagation" />, <TermTooltip termKey="Spectral Dispersion" />) to reveal engineering definitions and mathematical invariants.
              </span>
            </span>
            <span className="text-[11px] text-amber-400/80 font-mono-tabular hidden sm:inline">
              9 Verified Optical Invariants
            </span>
          </div>

          {/* Comparative Data Table */}
          <div className="overflow-x-auto bg-stone-900 border border-stone-800 rounded-xl shadow-xl">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-stone-800 bg-stone-950/80 text-stone-300 font-mono-tabular">
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-amber-400 w-1/4">
                    Vector
                  </th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-amber-200 w-3/8">
                    Experiment 1: Pinhole Projection
                  </th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-sky-300 w-3/8">
                    Experiment 2: Classical Spectrometer
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-sans">
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-800/30 transition-colors">
                    <td className="py-4 px-5 font-semibold text-stone-200 align-top bg-stone-950/40">
                      {row.vector}
                      <span className="block text-[11px] font-mono-tabular text-stone-500 font-normal mt-1">
                        Principle: {row.scientificPrinciple.split('vs.')[0]}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-stone-300 leading-relaxed align-top">
                      {renderFormattedCell(row.pinholeProjection)}
                    </td>
                    <td className="py-4 px-5 text-stone-300 leading-relaxed align-top">
                      {renderFormattedCell(row.classicalSpectrometer)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Conceptual Mapping Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-amber-400 font-bold uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                <span>The Spatial Mapping Paradigm</span>
              </div>
              <h3 className="font-display text-lg font-bold text-stone-100 mb-2">
                Camera Obscura: Geometry Inversion
              </h3>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed mb-4">
                The Camera Obscura preserves the spatial structure of the scene through{' '}
                <TermTooltip termKey="Rectilinear Propagation" />. Every point (x, y) in the outer world casts a single geometric cone through the pinhole to (-x&apos;, -y&apos;) on the screen. The color spectrum is never split—it serves solely as a luminance map.
              </p>
              <div className="bg-stone-950 p-3 rounded font-mono-tabular text-xs text-amber-200 border border-stone-800">
                {"Transformation: (x, y, scene) ⟶ (-x', -y', inverted image)"}
              </div>
            </div>

            <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-sky-400 font-bold uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                <span>The Spectral Decomposition Paradigm</span>
              </div>
              <h3 className="font-display text-lg font-bold text-stone-100 mb-2">
                Aṁśu Spectrometer: Energy Dissection
              </h3>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed mb-4">
                The Aṁśu Bodhinī apparatus discards the pictorial scene completely. <TermTooltip termKey="Collimation" /> eliminates spatial divergence, transforming the beam into a 1D pencil of light. The <TermTooltip termKey="Crystalline Quartz" /> then achieves <TermTooltip termKey="Spectral Dispersion" />, profiling elemental constituents.
              </p>
              <div className="bg-stone-950 p-3 rounded font-mono-tabular text-xs text-sky-200 border border-stone-800">
                {"Transformation: I_total(sunbeam) ⟶ I(λ) across [380 nm, 750 nm]"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deep Dive 1: Pinhole Optimization Math */}
      {activeTab === 'pinhole-deep' && (
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 md:p-8 space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <span className="text-xs font-mono-tabular text-amber-400 uppercase tracking-widest block mb-1">
              Technical Deep Dive 01
            </span>
            <h3 className="font-display text-2xl font-bold text-stone-100">
              {TECHNICAL_DEEP_DIVES.pinholeOptimization.title}
            </h3>
            <p className="text-stone-400 text-sm mt-1">
              {TECHNICAL_DEEP_DIVES.pinholeOptimization.subtitle}
            </p>
          </div>

          <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 font-mono-tabular text-center">
            <span className="text-xs text-stone-500 block mb-1">Rayleigh-Petzval Optimal Formula:</span>
            <span className="text-lg md:text-xl text-amber-300 font-bold tracking-wider">
              d_opt ≈ 1.9 · √(λ · f)
            </span>
          </div>

          <p className="text-sm text-stone-300 leading-relaxed">
            {TECHNICAL_DEEP_DIVES.pinholeOptimization.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {TECHNICAL_DEEP_DIVES.pinholeOptimization.points.map((pt, i) => (
              <div key={i} className="bg-stone-950/80 p-4 rounded-lg border border-stone-800/80">
                <div className="text-amber-300 font-semibold text-xs mb-2 font-mono-tabular">
                  {pt.heading}
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {pt.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deep Dive 2: Dual-Stage Filtering & Precision Classical Alchemical Compounds */}
      {activeTab === 'filter-deep' && (
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 md:p-8 space-y-8">
          <div className="border-b border-stone-800 pb-4">
            <span className="text-xs font-mono-tabular text-sky-400 uppercase tracking-widest block mb-1">
              Technical Deep Dive 02 · Classical Alchemical Fluid Shielding
            </span>
            <h3 className="font-display text-2xl font-bold text-stone-100">
              {TECHNICAL_DEEP_DIVES.dualStageFiltering.title}
            </h3>
            <p className="text-stone-400 text-sm mt-1">
              {TECHNICAL_DEEP_DIVES.dualStageFiltering.subtitle}
            </p>
          </div>

          <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 font-mono-tabular text-center">
            <span className="text-xs text-stone-500 block mb-1">Dual Thermodynamic & Optical Transmission:</span>
            <span className="text-sm md:text-base text-sky-300 font-bold tracking-wider">
              I_transmitted(λ) = I_0(λ) · exp(-α_liquid(λ) · L) · T_quartz(λ)
            </span>
          </div>

          <p className="text-sm text-stone-300 leading-relaxed">
            {TECHNICAL_DEEP_DIVES.dualStageFiltering.summary}
          </p>

          {/* Interactive Classical Alchemical Compounds Inspector */}
          <div className="bg-stone-950 p-6 rounded-xl border border-stone-800">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-amber-400 font-bold uppercase tracking-wider mb-4">
              <Beaker className="w-4 h-4 text-amber-400" />
              <span>Precision Classical Alchemical Compounds (Rasa-Shastra & Aṁśu Bodhinī Metrics)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-6">
              {FLUID_SOLUTIONS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedAlchemicalId(f.id);
                    soundEffects.playWaterDrip();
                  }}
                  className={`p-3 rounded-lg text-xs text-left transition-all cursor-pointer border ${
                    selectedAlchemicalId === f.id
                      ? 'bg-amber-500/20 text-amber-200 border-amber-500 font-semibold shadow-sm'
                      : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  <div className="font-bold truncate">{f.name.split('(')[0]}</div>
                  <div className="text-[10px] font-mono-tabular text-amber-400 mt-1">
                    {f.nirAbsorbedPct}% NIR Shield
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Alchemical Compound Dossier */}
            <div className="bg-stone-900/80 p-5 rounded-xl border border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-lg font-bold text-amber-300">
                    {selectedAlchemical.name}
                  </h4>
                  <span className="text-xs font-mono-tabular bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {selectedAlchemical.nirAbsorbedPct}% Near-Infrared Heat Absorbed
                  </span>
                </div>
                <div className="text-xs font-mono-tabular text-sky-300">
                  Chemical Formulation: {selectedAlchemical.chemicalCompound}
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {selectedAlchemical.historicalContext}
                </p>
                <div className="p-2.5 rounded bg-stone-950 font-mono-tabular text-[11px] text-amber-200 border border-stone-800">
                  Spectral Cutoff: {selectedAlchemical.blockedWavelengths}
                </div>
              </div>

              {/* Liquid Visual Indicator */}
              <div className="flex flex-col items-center justify-center p-4 bg-stone-950 rounded-xl border border-stone-800 text-center">
                <div
                  className="w-16 h-16 rounded-full border-2 border-stone-700 shadow-inner mb-3"
                  style={{ backgroundColor: selectedAlchemical.color }}
                />
                <span className="text-xs font-mono-tabular text-stone-400 block">
                  Absorption Profile
                </span>
                <span className="text-[11px] font-mono-tabular text-emerald-400 font-bold">
                  Thermal Safety Index: 9.8 / 10
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {TECHNICAL_DEEP_DIVES.dualStageFiltering.points.map((pt, i) => (
              <div key={i} className="bg-stone-950/80 p-4 rounded-lg border border-stone-800/80">
                <div className="text-sky-300 font-semibold text-xs mb-2 font-mono-tabular">
                  {pt.heading}
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {pt.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Optical Lexicon Explorer */}
      {activeTab === 'glossary' && (
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 md:p-8 space-y-6">
          <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono-tabular text-amber-400 uppercase tracking-widest block mb-1">
                Complete Reference Directory
              </span>
              <h3 className="font-display text-2xl font-bold text-stone-100">
                Optical Lexicon & Invariant Glossary
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-mono-tabular">
              {Object.keys(TECHNICAL_TERMS_GLOSSARY).length} Terms Documented
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(TECHNICAL_TERMS_GLOSSARY).map((item) => (
              <div
                key={item.term}
                className="bg-stone-950 p-4 rounded-xl border border-stone-800/90 hover:border-amber-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-amber-300 text-sm">
                      {item.term}
                    </span>
                    <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-amber-400/90 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-200 font-medium font-serif leading-relaxed mb-2">
                    {item.shortDef}
                  </p>
                  <p className="text-[11px] text-stone-400 leading-normal mb-3">
                    {item.engineeringExplanation}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-stone-900 text-[10px] space-y-1 font-mono-tabular">
                  {item.formula && (
                    <div className="text-amber-200">
                      Formula: {item.formula}
                    </div>
                  )}
                  <div className="text-stone-500">
                    Pioneer: {item.historicalPioneer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
