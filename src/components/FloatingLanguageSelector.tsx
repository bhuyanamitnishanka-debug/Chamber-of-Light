import React, { useState, useEffect } from 'react';
import { Globe2, Check, ChevronDown } from 'lucide-react';
import { mobileOpticalRenderer } from '../utils/mobileRenderer';
import { SUPPORTED_LANGUAGES, SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { soundEffects } from '../utils/audio';

interface FloatingLanguageSelectorProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const FloatingLanguageSelector: React.FC<FloatingLanguageSelectorProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeLangConfig = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
  const t = TRANSLATIONS[currentLang];

  // Listen for outside click to close popover
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.language-floating-widget')) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSelect = (code: SupportedLanguage) => {
    mobileOpticalRenderer.setEngineLanguage(code);
    onLanguageChange(code);
    soundEffects.playRatchetClick(1.2);
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed bottom-6 ${currentLang === 'fa' ? 'left-6' : 'right-6'} z-50 language-floating-widget`}
      style={{ direction: currentLang === 'fa' ? 'rtl' : 'ltr' }}
    >
      {/* Floating Action Trigger Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
          soundEffects.playRatchetClick(1.0);
        }}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title={`${t.languageSelector}: ${activeLangConfig.label} (${activeLangConfig.nativeLabel})`}
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-stone-900/95 hover:bg-stone-850 text-stone-200 border border-amber-500/40 hover:border-amber-400 shadow-[0_8px_25px_rgba(0,0,0,0.65)] hover:shadow-amber-500/20 backdrop-blur-md transition-all cursor-pointer select-none"
      >
        {/* Pulsing indicator pill */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
        </span>

        <Globe2 className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />

        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span className="font-mono-tabular font-bold text-amber-300 uppercase tracking-wider">
            {activeLangConfig.code}
          </span>
          <span className="hidden sm:inline text-stone-400">·</span>
          <span className="hidden sm:inline font-sans text-stone-200">
            {activeLangConfig.nativeLabel}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-400 group-hover:text-amber-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Modal / Popover */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-full mb-3 ${
            currentLang === 'fa' ? 'left-0' : 'right-0'
          } w-72 sm:w-80 rounded-2xl bg-stone-950/98 border border-amber-500/60 shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl p-3.5 text-stone-200 animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-stone-800/80">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-amber-400" />
              <span className="font-display text-xs font-bold text-stone-100 tracking-wide uppercase">
                {t.languageSelector}
              </span>
            </div>
            <span className="text-[10px] font-mono-tabular text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              setEngineLanguage()
            </span>
          </div>

          <p className="text-[11px] text-stone-400 leading-tight mb-3">
            {t.selectLanguage}
          </p>

          {/* Language Options Grid */}
          <div className="space-y-1.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400/80 text-amber-200 shadow-sm'
                      : 'bg-stone-900/50 hover:bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-300'
                  }`}
                  style={{ direction: lang.dir }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base select-none" aria-hidden="true">
                      {lang.flag}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold font-sans text-stone-100">
                        {lang.nativeLabel}
                      </span>
                      <span className="text-[10px] font-mono-tabular text-stone-400">
                        {lang.label} ({lang.script}) · {lang.code.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Native Bridge / Engine Status Footer */}
          <div className="mt-3 pt-2.5 border-t border-stone-800/80 text-[10px] text-stone-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>window.AppEngineCore active</span>
            </span>
            <span className="font-mono-tabular text-stone-400">
              dir="{activeLangConfig.dir}"
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
