/**
 * Chamber of Light: The Global Lineage of Optical Spectrometry
 * An interactive engineering graphic novel and optical physics workbench.
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { GraphicNovelViewer } from './components/GraphicNovelViewer';
import { PinholeSimulator } from './components/PinholeSimulator';
import { AmsuSpectrometerSimulator } from './components/AmsuSpectrometerSimulator';
import { CosmicColorObserver } from './components/CosmicColorObserver';
import { ComparativeMatrix } from './components/ComparativeMatrix';
import { ProductionPromptStudio } from './components/ProductionPromptStudio';
import { CalibrationGameModal } from './components/CalibrationGameModal';
import { FloatingLanguageSelector } from './components/FloatingLanguageSelector';
import { Sparkles, BookOpen, Compass, ArrowRight, ArrowDown, Globe2 } from 'lucide-react';
import { soundEffects } from './utils/audio';
import { mobileOpticalRenderer } from './utils/mobileRenderer';
import { SupportedLanguage, TRANSLATIONS, SUPPORTED_LANGUAGES } from './data/translations';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('graphic-novel');
  const [isCalibrationOpen, setIsCalibrationOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');

  // Synchronize language with mobileOpticalRenderer and AppEngineCore
  useEffect(() => {
    const unsub = mobileOpticalRenderer.onLanguageChange((lang) => {
      setCurrentLang(lang);
    });
    return () => unsub();
  }, []);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    mobileOpticalRenderer.setEngineLanguage(lang);
    setCurrentLang(lang);
  };

  const t = TRANSLATIONS[currentLang];
  const activeLangConfig = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    soundEffects.playRatchetClick(1.0);
  };

  return (
    <div
      className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans"
      style={{ direction: activeLangConfig.dir }}
    >
      {/* Universal Top Bar Contract */}
      <Header
        onOpenCalibration={() => setIsCalibrationOpen(true)}
        activeSection={activeSection}
        setActiveSection={scrollToSection}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 px-4 md:px-8 border-b border-stone-800/80 bg-stone-950">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl">
              {/* Unboxed Metadata Line with typographic separators */}
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-tabular tracking-wider uppercase mb-3">
                <span>{t.heroBadge}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 text-balance mb-4">
                {t.appTitle}
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-amber-200/90 mb-4">
                {t.appSubtitle}
              </p>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                {t.heroDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollToSection('graphic-novel')}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.exploreNovel}</span>
                </button>

                <button
                  onClick={() => scrollToSection('amsu-spectrometer')}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-200 font-medium text-xs sm:text-sm rounded-lg border border-stone-700 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t.launchSpectrometer}</span>
                </button>

                <button
                  onClick={() => scrollToSection('cosmic-observer')}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-sky-200 font-medium text-xs sm:text-sm rounded-lg border border-sky-900/60 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Globe2 className="w-4 h-4 text-sky-400" />
                  <span>{t.launchCosmicObserver}</span>
                </button>

                <button
                  onClick={() => setIsCalibrationOpen(true)}
                  className="px-4 py-2.5 bg-stone-950 hover:bg-stone-900 text-stone-400 hover:text-stone-200 text-xs sm:text-sm rounded-lg border border-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>{t.calibrationChallenge}</span>
                </button>
              </div>
            </div>

            {/* Historical Relay Milestone Strip */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mt-12 pt-8 border-t border-stone-800/60">
              <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-800/80">
                <div className="text-[11px] font-mono-tabular text-amber-400 font-semibold uppercase">
                  {t.moziEra}
                </div>
                <div className="font-display text-lg font-bold text-stone-100 mt-0.5">
                  {t.moziTitle}
                </div>
                <div className="text-[11px] text-amber-300/80 font-medium mt-0.5">
                  {t.moziRole}
                </div>
                <p className="text-xs text-stone-400 mt-1 leading-normal">
                  {t.moziDesc}
                </p>
              </div>

              <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-800/80">
                <div className="text-[11px] font-mono-tabular text-amber-400 font-semibold uppercase">
                  {t.alhaythamEra}
                </div>
                <div className="font-display text-lg font-bold text-stone-100 mt-0.5">
                  {t.alhaythamTitle}
                </div>
                <div className="text-[11px] text-amber-300/80 font-medium mt-0.5">
                  {t.alhaythamRole}
                </div>
                <p className="text-xs text-stone-400 mt-1 leading-normal">
                  {t.alhaythamDesc}
                </p>
              </div>

              <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-800/80">
                <div className="text-[11px] font-mono-tabular text-amber-400 font-semibold uppercase">
                  {t.bharadwajaEra}
                </div>
                <div className="font-display text-lg font-bold text-stone-100 mt-0.5">
                  {t.bharadwajaTitle}
                </div>
                <div className="text-[11px] text-amber-300/80 font-medium mt-0.5">
                  {t.bharadwajaRole}
                </div>
                <p className="text-xs text-stone-400 mt-1 leading-normal">
                  {t.bharadwajaDesc}
                </p>
              </div>

              <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-800/80">
                <div className="text-[11px] font-mono-tabular text-amber-400 font-semibold uppercase">
                  {t.newtonEra}
                </div>
                <div className="font-display text-lg font-bold text-stone-100 mt-0.5">
                  {t.newtonTitle}
                </div>
                <div className="text-[11px] text-amber-300/80 font-medium mt-0.5">
                  {t.newtonRole}
                </div>
                <p className="text-xs text-stone-400 mt-1 leading-normal">
                  {t.newtonDesc}
                </p>
              </div>

              <div className="bg-stone-900/40 p-4 rounded-xl border border-stone-800/80">
                <div className="text-[11px] font-mono-tabular text-sky-400 font-semibold uppercase">
                  {t.ramanBoseEra}
                </div>
                <div className="font-display text-lg font-bold text-stone-100 mt-0.5">
                  {t.ramanBoseTitle}
                </div>
                <div className="text-[11px] text-sky-300/80 font-medium mt-0.5">
                  {t.ramanBoseRole}
                </div>
                <p className="text-xs text-stone-400 mt-1 leading-normal">
                  {t.ramanBoseDesc}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Section 1: Interactive Graphic Novel & 4-Panel Script Viewer */}
        <GraphicNovelViewer
          onJumpToPinhole={() => scrollToSection('pinhole-obscura')}
          onJumpToAmsu={() => scrollToSection('amsu-spectrometer')}
        />

        {/* Section 2: Experiment 1 Interactive Sandbox (Pinhole Camera Obscura) */}
        <PinholeSimulator />

        {/* Section 3: Experiment 2 Interactive Sandbox (Aṁśu Bodhinī Spectrometer Bench) */}
        <AmsuSpectrometerSimulator />

        {/* Section 4: Modern Synthesis: What Color Is the Universe? Cosmic Color Observer & Practice Test */}
        <CosmicColorObserver />

        {/* Section 5: Side-by-Side Comparative Matrix & Deep Dives */}
        <ComparativeMatrix />

        {/* Section 6: AI Studio Master Prompt & Asset Pipeline Studio */}
        <ProductionPromptStudio />
      </main>


      {/* Interactive Calibration Mini-Game Modal */}
      <CalibrationGameModal
        isOpen={isCalibrationOpen}
        onClose={() => setIsCalibrationOpen(false)}
        onApplySettings={() => {
          scrollToSection('amsu-spectrometer');
        }}
      />

      {/* Quiet, Compliant Site Footer */}
      <footer className="bg-stone-950 border-t border-stone-800/80 px-4 md:px-8 py-8 mt-16 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-stone-300">Chamber of Light</span>
            <span aria-hidden="true">·</span>
            <span>Historical Optics & Spectrometry Engineering</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection('graphic-novel')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              {t.navGraphicNovel}
            </button>
            <button
              onClick={() => scrollToSection('pinhole-obscura')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              {t.navPinhole}
            </button>
            <button
              onClick={() => scrollToSection('amsu-spectrometer')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              {t.navAmsu}
            </button>
            <button
              onClick={() => scrollToSection('cosmic-observer')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              {t.navCosmic}
            </button>
            <button
              onClick={() => scrollToSection('comparative-matrix')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              {t.navMatrix}
            </button>
            <button
              onClick={() => scrollToSection('master-prompt')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              {t.navPromptStudio}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span>Built with React & Vite for Google AI Studio</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular text-amber-400 font-semibold uppercase">{currentLang}</span>
          </div>
        </div>
      </footer>

      {/* Floating Language Selector UI Component (calls setEngineLanguage('en' | 'sa' | 'fa')) */}
      <FloatingLanguageSelector
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
}
