import React from 'react';
import { Volume2, VolumeX, Sparkles, Globe2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { SupportedLanguage, TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/translations';
import { mobileOpticalRenderer } from '../utils/mobileRenderer';

interface HeaderProps {
  onOpenCalibration: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  currentLang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCalibration,
  activeSection,
  setActiveSection,
  soundEnabled,
  setSoundEnabled,
  currentLang = 'en',
  onLanguageChange,
}) => {
  const t = TRANSLATIONS[currentLang];

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.enabled = next;
    if (next) soundEffects.playRatchetClick(1.2);
  };

  const navItems = [
    { id: 'graphic-novel', label: t.navGraphicNovel },
    { id: 'pinhole-obscura', label: t.navPinhole },
    { id: 'amsu-spectrometer', label: t.navAmsu },
    { id: 'cosmic-observer', label: t.navCosmic },
    { id: 'comparative-matrix', label: t.navMatrix },
    { id: 'master-prompt', label: t.navPromptStudio },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="#graphic-novel"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('graphic-novel');
            soundEffects.playRatchetClick(1.0);
          }}
          className="font-display text-lg md:text-xl font-bold tracking-wider text-amber-200 hover:text-amber-100 transition-colors whitespace-nowrap shrink-0"
        >
          {t.appTitle}
        </a>

        {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-400">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  soundEffects.playRatchetClick(0.9);
                }}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer text-sm ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'hover:text-stone-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language quick toggle + Audio Mute + Calibrate */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Header Compact Language Indicator */}
          <div className="hidden sm:flex items-center rounded-lg bg-stone-900 border border-stone-800 p-0.5 text-xs">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    mobileOpticalRenderer.setEngineLanguage(lang.code);
                    if (onLanguageChange) onLanguageChange(lang.code);
                    soundEffects.playRatchetClick(1.1);
                  }}
                  className={`px-2 py-1 rounded font-mono-tabular text-xs font-semibold uppercase transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title={`${lang.label} (${lang.nativeLabel})`}
                >
                  {lang.code}
                </button>
              );
            })}
          </div>

          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute tactile audio' : 'Enable tactile audio'}
            className="p-2 text-stone-400 hover:text-amber-300 transition-colors rounded-lg hover:bg-stone-900 border border-transparent hover:border-stone-800"
            title={soundEnabled ? 'Sound Enabled' : 'Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              onOpenCalibration();
              soundEffects.playRatchetClick(1.3);
            }}
            className="px-3.5 py-1.5 md:px-4 md:py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-sm hover:shadow-amber-500/20 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.calibrateBench}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

