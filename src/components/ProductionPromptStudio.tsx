import React, { useState } from 'react';
import { Copy, Check, Download, Sparkles, FileText, Code } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const MASTER_PROMPT_TEXT = `# SYSTEM INSTRUCTIONS & CONTEXT
You are an expert Content Architect, Technical Writer, and Storyboarder for a highly interactive, educational Engineering Graphic Novel App.

Your task is to analyze two distinct historical optical experiments and synthesize them into a highly scannable, script-ready production document for our creative team.

## SOURCE ARTWORK DATA PROVIDED:
- Experiment 1 (The Pinhole Projection): A cardboard-and-foil Camera Obscura illustrating rectilinear propagation, crossing rays, and an inverted screen imaging a bright external landscape.
- Experiment 2 (The Classical Spectrometer): An antique brass/wood optical assembly based on traditional texts like the "Aṁśu Bodhinī". It uses a "Jabākācha" (collimating lens), a water-vessel thermal filter, and a "Sphātika" (quartz prism) to split an isolated sunbeam into a vibrant color spectrum.

---
# GENERATION REQUIREMENTS
Generate a production-ready script and asset outline adhering strictly to the following parameters:

### 1. TITLE SPECIFICATION
Create an authoritative, highly engaging Title and Subtitle combination that captures the intersection of historical lore, global engineering, and optical physics.

### 2. CORE EXPERIMENTAL ANALYSIS (SIDE-BY-SIDE)
Present a highly scannable, direct comparison of the two optical configurations. Use a clean Markdown table comparing the following vectors:
- Primary Optical Phenomenon
- Mechanical Isolation Method
- Medium of Refraction/Transmission
- Core Scientific Limitation vs. Engineering Trade-off

### 3. THE HISTORICAL EVOLUTION SCRIPT (GRAPHIC NOVEL FORMAT)
Write a 4-panel graphic novel scene script tracing the global relay of camera/optical evolution. For each panel, provide:
- Visual Description: Composition, lighting, and historical setting (From Mozi's China, to Ibn al-Haytham's dark room in Cairo, to the classical Indian lens-crafting crucibles, to Western European glass prism refinements).
- Lettering & Dialogue: Narrative captions and speech bubbles that emphasize *engineering terminology* over abstract philosophy.

### 4. TECHNICAL DEEP DIVE: THE SPECIFIC EXPERIMENT HIGHLIGHTS
Provide a punchy, fragment-based bulleted breakdown explicitly isolating the mechanics of:
- The Pinhole Optimization: The mathematical push-and-pull between Rayleigh diffraction boundaries and ray geometry overlap.
- The Dual-Stage Filtering: How the combination of a liquid water jacket and pure quartz crystal protects and perfectly disperses high-intensity solar beams without thermal distortion.
- Cosmic Color Synthesis: How Sir C.V. Raman's inelastic scattering (1928) and Sir J.C. Bose's millimeter-wave radio horns (1895) link to modern cosmic latte analysis and the Cosmic Color Observer satellite concept.

---
# OUTPUT STYLE GUIDELINES
- Lead with your strongest, most direct conceptual definitions first.
- Maintain a technical, human-centric, and scannable tone. Do not use generic filler commentary.
- Ensure all optical terms (e.g., rectilinear propagation, collimation, spectral dispersion, diffraction) are used with perfect mechanical accuracy.`;

export const ProductionPromptStudio: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [interactiveAddendum, setInteractiveAddendum] = useState(true);
  const [customTone, setCustomTone] = useState<'engineering' | 'storyboard'>('engineering');

  const getFullPrompt = () => {
    let prompt = MASTER_PROMPT_TEXT;
    if (interactiveAddendum) {
      prompt += `\n\n### 5. INTERACTIVE APP ARCHITECTURE ADDENDUM\nSpecify requirements for interactive simulation elements:\n- Real-time slide-to-zoom focal length (f) and aperture diameter (d) sliders.\n- Dynamic Rayleigh optimum calculator (d ≈ 1.9√(λf)).\n- Thermodynamic water cell slider with infrared absorption curve.\n- Touch-screen optical train calibration challenge mini-game with real-time collimation and minimum-deviation feedback.\n- Cosmic Color Observer (CCO-1) satellite simulator with live Cosmic Latte (#FFF8E7) chromaticity synthesis, Raman scattering laser, and Bose 60 GHz millimeter horn.\n- Interactive student exam with official answer key and pedagogical breakdowns.`;
    }
    return prompt;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullPrompt());
    setCopied(true);
    soundEffects.playRatchetClick(1.2);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([getFullPrompt()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'Chamber_of_Light_Master_Prompt.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    soundEffects.playRatchetClick(1.1);
  };

  return (
    <section id="master-prompt" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-tabular tracking-wider uppercase mb-2">
            <span>Asset Pipeline · Prompt Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Section 2 Specification</span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-stone-100 tracking-tight">
            Unified AI Studio Master Prompt
          </h2>
          <p className="text-stone-400 text-sm md:text-base mt-1 max-w-3xl">
            The exact structured master prompt formulated to generate asset scripts and storyboard specifications in Google AI Studio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-stone-950" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Prompt!' : 'Copy to Clipboard'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 font-medium text-xs rounded-lg border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Markdown</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Code Block Viewport (8 cols) */}
        <div className="lg:col-span-8">
          <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-xl">
            <div className="bg-stone-950 px-4 py-3 border-b border-stone-800 flex items-center justify-between text-xs font-mono-tabular text-stone-400">
              <span className="flex items-center gap-2 text-amber-400">
                <Code className="w-3.5 h-3.5" />
                <span>ai-studio-master-prompt.md</span>
              </span>
              <span>Tokens: ~680 · Markdown</span>
            </div>

            <pre className="p-6 text-xs text-stone-300 font-mono-tabular leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[580px] overflow-y-auto">
              {getFullPrompt()}
            </pre>
          </div>
        </div>

        {/* Right: Prompt Customizer Deck (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-5">
            <div className="border-b border-stone-800 pb-3 flex items-center gap-2 font-display text-base font-bold text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Prompt Options</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-stone-300 font-medium block mb-1.5 font-mono-tabular">
                  Include Interactive Elements Addendum
                </label>
                <button
                  onClick={() => {
                    setInteractiveAddendum(!interactiveAddendum);
                    soundEffects.playRatchetClick(1.0);
                  }}
                  className={`w-full py-2 px-3 rounded text-xs font-medium border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    interactiveAddendum
                      ? 'bg-amber-400/10 border-amber-500/50 text-amber-300'
                      : 'bg-stone-950 border-stone-800 text-stone-400'
                  }`}
                >
                  <span>Simulation & Mini-Game Specs</span>
                  <span>{interactiveAddendum ? 'Included' : 'Excluded'}</span>
                </button>
              </div>

              <div>
                <label className="text-xs text-stone-300 font-medium block mb-1.5 font-mono-tabular">
                  Target Tone Calibration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setCustomTone('engineering');
                      soundEffects.playRatchetClick(1.0);
                    }}
                    className={`py-1.5 px-3 rounded text-xs font-medium border transition-colors cursor-pointer ${
                      customTone === 'engineering'
                        ? 'bg-amber-400 text-stone-950 font-semibold border-amber-400'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    Rigorous Optical
                  </button>
                  <button
                    onClick={() => {
                      setCustomTone('storyboard');
                      soundEffects.playRatchetClick(1.0);
                    }}
                    className={`py-1.5 px-3 rounded text-xs font-medium border transition-colors cursor-pointer ${
                      customTone === 'storyboard'
                        ? 'bg-amber-400 text-stone-950 font-semibold border-amber-400'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    Storyboard Script
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800">
              <div className="bg-stone-950 p-3.5 rounded border border-stone-800 text-xs text-stone-400 space-y-2">
                <span className="font-semibold text-amber-300 block font-mono-tabular">
                  Execution Instructions
                </span>
                <p className="leading-relaxed">
                  Paste this master prompt into Google AI Studio (with Gemini 1.5 Pro / Flash). It will output production-grade artist notes, vector comparison tables, and dialog bubbles formatted for graphic novel illustrators.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2 font-mono-tabular uppercase">
              <FileText className="w-3.5 h-3.5" />
              <span>Pipeline Integration</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              The 4-chapter narrative generated above directly corresponds to the interactive simulation stages in this application, bridging Mozi's pinhole rectilinear rays to the Aṁśu Bodhinī spectrometer assembly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
