import React, { useState, useRef, useEffect, useId } from 'react';
import { CosmicColorSatelliteState, CosmicObservationTarget } from '../types';
import { COSMIC_TARGETS, PIONEER_PROFILES, PRACTICE_TEST_QUESTIONS } from '../data/cosmicData';
import { FLUID_SOLUTIONS } from '../data/comparativeData';
import { mobileOpticalRenderer } from '../utils/mobileRenderer';
import { soundEffects } from '../utils/audio';
import {
  Satellite,
  Radio,
  Sparkles,
  Zap,
  Shield,
  Sun,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Award,
  BatteryCharging,
  BatteryMedium,
  RotateCcw,
  Eye,
  Sliders,
  Compass,
} from 'lucide-react';

export const CosmicColorObserver: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Core state
  const [satelliteState, setSatelliteState] = useState<CosmicColorSatelliteState>({
    target: 'cosmic-latte',
    orbitAltitudeKm: 1500000, // L2 point
    solarFlareIntensity: 35,
    fluidCoolant: 'water',
    ramanLaserWavelengthNm: 532,
    ramanEnabled: true,
    boseRadioFrequencyGhz: 60, // Bose 60 GHz / 5mm pioneer frequency
    detectorTempKelvin: 4.2, // Cryogenic
    integratedCosmicColorHex: '#FFF8E7',
    batterySaver: false,
  });

  // Practice Test State
  const [testMode, setTestMode] = useState<'interactive-quiz' | 'answer-key'>('interactive-quiz');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [showExplanations, setShowExplanations] = useState<boolean>(true);

  // Animation frame loop
  const animFrameRef = useRef<number | null>(null);
  const phaseAngleRef = useRef<number>(0);

  const currentTarget = COSMIC_TARGETS[satelliteState.target];
  const currentFluid = FLUID_SOLUTIONS.find((f) => f.id === satelliteState.fluidCoolant) || FLUID_SOLUTIONS[0];

  // Unique IDs for accessibility
  const altitudeId = useId();
  const solarFlareId = useId();
  const boseFreqId = useId();

  // Battery saver toggle
  const toggleBatterySaver = () => {
    const nextVal = !satelliteState.batterySaver;
    setSatelliteState((s) => ({ ...s, batterySaver: nextVal }));
    mobileOpticalRenderer.setBatterySaver(nextVal);
    soundEffects.playRatchetClick(1.2);
  };

  // High-frequency slider dragging throttled via mobileOpticalRenderer
  const handleAltitudeChange = (valStr: string) => {
    const num = parseFloat(valStr);
    mobileOpticalRenderer.throttleValueChange('orbit_alt', num, (val) => {
      setSatelliteState((s) => ({ ...s, orbitAltitudeKm: val }));
    });
  };

  const handleFlareChange = (valStr: string) => {
    const num = parseFloat(valStr);
    mobileOpticalRenderer.throttleValueChange('solar_flare', num, (val) => {
      setSatelliteState((s) => ({ ...s, solarFlareIntensity: val }));
    });
  };

  const handleBoseFreqChange = (valStr: string) => {
    const num = parseFloat(valStr);
    mobileOpticalRenderer.throttleValueChange('bose_freq', num, (val) => {
      setSatelliteState((s) => ({ ...s, boseRadioFrequencyGhz: val }));
    });
  };

  // Fluid cooling thermal absorption
  const coolantAbsorbedPct = currentFluid.nirAbsorbedPct;
  const rawSolarFlux = 1361 * (1 + satelliteState.solarFlareIntensity / 100);
  const residualHeatLoadW = rawSolarFlux * (1 - coolantAbsorbedPct / 100);
  const detectorTempK = Math.min(
    290,
    Math.max(2.7, 4.2 + (residualHeatLoadW / 1400) * (satelliteState.orbitAltitudeKm < 1000 ? 60 : 35))
  );

  // Render canvas visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const w = canvas.width;
      const h = canvas.height;
      phaseAngleRef.current += 0.02;

      // Dark Cosmic Deep Space Background
      ctx.fillStyle = '#070709';
      ctx.fillRect(0, 0, w, h);

      // Starfield generator
      ctx.save();
      for (let i = 0; i < 60; i++) {
        const starX = (Math.sin(i * 123.45) * 0.5 + 0.5) * w;
        const starY = (Math.cos(i * 678.9) * 0.5 + 0.5) * h;
        const starSize = (i % 3) + 1;
        const twinkle = Math.sin(phaseAngleRef.current + i) * 0.4 + 0.6;
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.8})`;
        ctx.beginPath();
        ctx.arc(starX, starY, starSize * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Cosmic background aura depending on target
      const auraGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 40, w * 0.5, h * 0.5, w * 0.45);
      const [r, g, b] = currentTarget.rgbValues;
      auraGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.25)`);
      auraGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.08)`);
      auraGrad.addColorStop(1, 'rgba(7, 7, 9, 0)');
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Galaxies / Nebular dust clouds
      ctx.save();
      const galaxyCount = satelliteState.target === 'cosmic-latte' ? 8 : 3;
      for (let gIdx = 0; gIdx < galaxyCount; gIdx++) {
        const gx = w * (0.2 + (gIdx * 0.18) % 0.65);
        const gy = h * (0.25 + (gIdx * 0.22) % 0.5);
        const gRad = 35 + (gIdx % 4) * 15;

        const gGrad = ctx.createRadialGradient(gx, gy, 2, gx, gy, gRad);
        gGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.4)`);
        gGrad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.12)`);
        gGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gGrad;
        ctx.beginPath();
        ctx.ellipse(
          gx,
          gy,
          gRad,
          gRad * 0.45,
          phaseAngleRef.current * 0.1 + gIdx,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.restore();

      // Satellite schematic in orbit
      const satX = w * 0.32;
      const satY = h * 0.5;

      ctx.save();
      ctx.translate(satX, satY);

      // Orbit tether / scan cone pointing to deep space
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.3)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w * 0.55, -h * 0.35);
      ctx.moveTo(0, 0);
      ctx.lineTo(w * 0.55, h * 0.35);
      ctx.stroke();
      ctx.setLineDash([]);

      // Satellite Central Bus
      ctx.fillStyle = '#292524';
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.fillRect(-24, -20, 48, 40);
      ctx.strokeRect(-24, -20, 48, 40);

      // Gold Multi-Layer Insulation Foil
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-20, -16, 40, 32);

      // Solar Panels
      ctx.fillStyle = '#0369a1';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      // Left Wing
      ctx.fillRect(-70, -12, 42, 24);
      ctx.strokeRect(-70, -12, 42, 24);
      // Right Wing
      ctx.fillRect(28, -12, 42, 24);
      ctx.strokeRect(28, -12, 42, 24);

      // J.C. Bose Millimeter-Wave Pyramidal Horn Antenna
      ctx.fillStyle = '#eab308';
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(12, -8);
      ctx.lineTo(34, -18);
      ctx.lineTo(34, 18);
      ctx.lineTo(12, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Aṁśu Bodhinī Fluid Thermal Shield Jacket
      ctx.fillStyle = currentFluid.color;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Quartz Optical Spectrometer Prism (Sphātika)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-6, -8);
      ctx.lineTo(6, -8);
      ctx.lineTo(0, 8);
      ctx.closePath();
      ctx.fill();

      // Raman Scattering Laser Beam (if enabled)
      if (satelliteState.ramanEnabled) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(34, 0);
        ctx.lineTo(w * 0.45, 0);
        ctx.stroke();

        // Inelastic Raman scattered photon pulses
        const pulseX = 34 + ((phaseAngleRef.current * 60) % (w * 0.4));
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(pulseX, 0, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Live HUD Readout Overlay (Top-Right)
      ctx.save();
      const hudX = w * 0.62;
      const hudY = 24;
      const hudW = w * 0.35;
      const hudH = h - 48;

      ctx.fillStyle = 'rgba(15, 14, 13, 0.88)';
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.lineWidth = 1;
      ctx.fillRect(hudX, hudY, hudW, hudH);
      ctx.strokeRect(hudX, hudY, hudW, hudH);

      // HUD Title
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('CCO-1 ORBITAL TELEMETRY', hudX + 14, hudY + 22);

      // Cosmic Color Patch Box
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(hudX + 14, hudY + 36, hudW - 28, 54);
      ctx.strokeStyle = '#44403c';
      ctx.strokeRect(hudX + 14, hudY + 36, hudW - 28, 54);

      // Color sample chip
      ctx.fillStyle = currentTarget.dominantColorHex;
      ctx.fillRect(hudX + 22, hudY + 44, 40, 38);
      ctx.strokeStyle = '#d6d3d1';
      ctx.strokeRect(hudX + 22, hudY + 44, 40, 38);

      ctx.fillStyle = '#fafaf9';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(currentTarget.name.slice(0, 20), hudX + 70, hudY + 54);

      ctx.fillStyle = '#a8a29e';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`HEX: ${currentTarget.dominantColorHex}`, hudX + 70, hudY + 68);
      ctx.fillText(`sRGB(${r}, ${g}, ${b})`, hudX + 70, hudY + 80);

      // Telemetry list
      ctx.fillStyle = '#d6d3d1';
      ctx.font = '10px "JetBrains Mono", monospace';
      let rowY = hudY + 110;
      const lineGap = 17;

      ctx.fillText(`ORBIT ALT: ${satelliteState.orbitAltitudeKm.toLocaleString()} km`, hudX + 14, rowY);
      rowY += lineGap;

      ctx.fillText(`TARGET: ${satelliteState.target.toUpperCase()}`, hudX + 14, rowY);
      rowY += lineGap;

      ctx.fillText(`FLUID SHIELD: ${currentFluid.name.slice(0, 16)}`, hudX + 14, rowY);
      rowY += lineGap;

      ctx.fillText(`NIR ABSORB: ${coolantAbsorbedPct}% SHIELDED`, hudX + 14, rowY);
      rowY += lineGap;

      ctx.fillText(`DETECTOR T: ${detectorTempK.toFixed(1)} K (Cryo)`, hudX + 14, rowY);
      rowY += lineGap;

      ctx.fillText(`BOSE HORN: ${satelliteState.boseRadioFrequencyGhz} GHz (5mm)`, hudX + 14, rowY);
      rowY += lineGap;

      ctx.fillText(
        `RAMAN SCATTER: ${satelliteState.ramanEnabled ? 'INELASTIC ACTIVE' : 'OFF'}`,
        hudX + 14,
        rowY
      );
      rowY += lineGap + 6;

      // Real-time Mini Spectral Curve graph
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const graphX = hudX + 14;
      const graphY = rowY + 36;
      const graphW = hudW - 28;
      const graphH = 34;

      // Draw axis
      ctx.fillStyle = '#0c0a09';
      ctx.fillRect(graphX, graphY - graphH, graphW, graphH);
      ctx.strokeStyle = '#292524';
      ctx.strokeRect(graphX, graphY - graphH, graphW, graphH);

      // Plot curve
      ctx.strokeStyle = currentTarget.dominantColorHex;
      ctx.beginPath();
      for (let px = 0; px < graphW; px++) {
        const normX = px / graphW;
        const wl = 380 + normX * 370;
        const distFromPeak = (wl - currentTarget.spectralPeakNm) / 90;
        let intensity = Math.exp(-distFromPeak * distFromPeak);

        // Add Raman Stokes peak if Raman active
        if (satelliteState.ramanEnabled && px > graphW * 0.6 && px < graphW * 0.75) {
          intensity += 0.45 * Math.sin((px - graphW * 0.6) * 0.3);
        }

        const plotY = graphY - intensity * (graphH - 6) - 3;
        if (px === 0) ctx.moveTo(graphX + px, plotY);
        else ctx.lineTo(graphX + px, plotY);
      }
      ctx.stroke();

      ctx.fillStyle = '#78716c';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText('380nm (UV)', graphX, graphY + 10);
      ctx.fillText('750nm (IR)', graphX + graphW - 52, graphY + 10);

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [satelliteState, currentTarget, currentFluid, coolantAbsorbedPct, detectorTempK]);

  // Quiz submission logic
  const handleSelectAnswer = (qId: string, optionKey: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionKey }));
    soundEffects.playRatchetClick(1.1);
  };

  const handleGradeQuiz = () => {
    setSubmittedQuiz(true);
    let correctCount = 0;
    PRACTICE_TEST_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctKey) correctCount++;
    });

    if (correctCount >= 4) {
      soundEffects.playChime();
    } else {
      soundEffects.playWaterDrip();
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSubmittedQuiz(false);
    soundEffects.playRatchetClick(1.0);
  };

  const score = PRACTICE_TEST_QUESTIONS.reduce((acc, q) => {
    return acc + (userAnswers[q.id] === q.correctKey ? 1 : 0);
  }, 0);

  return (
    <section id="cosmic-observer" className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-stone-800">
      {/* Module Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-tabular tracking-wider uppercase mb-2">
          <span>Modern Synthesis · Astrophysics & Classical Lineage</span>
          <span aria-hidden="true">·</span>
          <span>Sir C.V. Raman · J.C. Bose · Aṁśu Fluid Spaceflight Shield</span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-stone-100 tracking-tight">
          What Color Is the Universe?
        </h2>
        <p className="font-serif italic text-lg text-amber-200/90 mt-1 mb-3">
          The Cosmic Color Observer & The Indian Modern Optical Pioneers
        </p>
        <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-4xl">
          Although the human night sky appears completely black, astronomers analyzing the aggregated starlight of over 200,000 galaxies have calculated that the universe has a faint beige-white hue dubbed{' '}
          <strong className="text-amber-300 font-semibold">&ldquo;Cosmic Latte&rdquo; (#FFF8E7)</strong>. Explore how Sir C.V. Raman&apos;s inelastic light scattering and Sir J.C. Bose&apos;s millimeter-wave radio horn antennas converge with the ancient Aṁśu Bodhinī liquid thermal shield to power a modern deep-space satellite concept.
        </p>
      </div>

      {/* Interactive Satellite Simulator Panel */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl mb-12">
        <div className="p-4 md:p-6 bg-stone-950/80 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Satellite className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-stone-100 text-sm md:text-base flex items-center gap-2">
                <span>COSMIC COLOR OBSERVER (CCO-1) SIMULATOR</span>
                <span className="text-[10px] font-mono-tabular bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded">
                  ORBIT ACTIVE
                </span>
              </div>
              <div className="text-xs text-stone-400 font-mono-tabular">
                Aṁśu Bodhinī Fluid Shield · Quartz Raman Spectrometer · Bose 60 GHz Millimeter Horn
              </div>
            </div>
          </div>

          {/* Battery Saver / Frame Pacing Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleBatterySaver}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular flex items-center gap-1.5 transition-colors cursor-pointer border ${
                satelliteState.batterySaver
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
              title="Limits re-renders during high-frequency slider dragging for battery efficiency"
            >
              {satelliteState.batterySaver ? (
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
              ) : (
                <BatteryMedium className="w-4 h-4 text-amber-400" />
              )}
              <span>{satelliteState.batterySaver ? '30 FPS Eco Mode (Active)' : '60 FPS Full Precision'}</span>
            </button>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="relative bg-black w-full overflow-hidden border-b border-stone-800">
          <canvas
            ref={canvasRef}
            width={900}
            height={380}
            className="w-full h-auto block select-none"
          />
        </div>

        {/* Interactive Flight Controls */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-stone-950/60">
          {/* Target Selector */}
          <div>
            <label className="text-xs font-mono-tabular text-stone-300 font-semibold block mb-2">
              Observation Target
            </label>
            <div className="space-y-1.5">
              {Object.values(COSMIC_TARGETS).map((tgt) => (
                <button
                  key={tgt.id}
                  onClick={() => {
                    setSatelliteState((s) => ({ ...s, target: tgt.id as CosmicObservationTarget }));
                    soundEffects.playRatchetClick(1.0);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer border ${
                    satelliteState.target === tgt.id
                      ? 'bg-amber-500/10 text-amber-200 border-amber-500/40 font-semibold shadow-sm'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800/80 hover:bg-stone-900 hover:text-stone-200'
                  }`}
                >
                  <span className="truncate">{tgt.name}</span>
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-stone-600 shrink-0"
                    style={{ backgroundColor: tgt.dominantColorHex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Fluid Coolant Selection (Ancient Rasa-Shastra Alchemical Shields) */}
          <div>
            <label className="text-xs font-mono-tabular text-stone-300 font-semibold block mb-2">
              Aṁśu Liquid Thermal Shield
            </label>
            <div className="space-y-1.5">
              {FLUID_SOLUTIONS.map((fluid) => (
                <button
                  key={fluid.id}
                  onClick={() => {
                    setSatelliteState((s) => ({ ...s, fluidCoolant: fluid.id }));
                    soundEffects.playWaterDrip();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer border ${
                    satelliteState.fluidCoolant === fluid.id
                      ? 'bg-sky-500/10 text-sky-200 border-sky-500/40 font-semibold shadow-sm'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800/80 hover:bg-stone-900 hover:text-stone-200'
                  }`}
                >
                  <span className="truncate">{fluid.name.split('(')[0]}</span>
                  <span className="text-[10px] font-mono-tabular text-stone-400">
                    {fluid.nirAbsorbedPct}% IR
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Orbit Altitude & Solar Flare Sliders with Throttling */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs font-mono-tabular mb-1">
                <label htmlFor={altitudeId} className="text-stone-300 font-semibold cursor-pointer">
                  Orbit Altitude
                </label>
                <span className="text-amber-400">
                  {satelliteState.orbitAltitudeKm.toLocaleString()} km
                </span>
              </div>
              <input
                id={altitudeId}
                type="range"
                min="400"
                max="1500000"
                step="10000"
                value={satelliteState.orbitAltitudeKm}
                onChange={(e) => handleAltitudeChange(e.target.value)}
                className="w-full accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-0.5 font-mono-tabular">
                <span>400 km (LEO)</span>
                <span>1.5M km (L2 Deep Space)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono-tabular mb-1">
                <label htmlFor={solarFlareId} className="text-stone-300 font-semibold cursor-pointer">
                  Solar Flare IR Intensity
                </label>
                <span className="text-red-400 font-bold">+{satelliteState.solarFlareIntensity}%</span>
              </div>
              <input
                id={solarFlareId}
                type="range"
                min="0"
                max="100"
                step="1"
                value={satelliteState.solarFlareIntensity}
                onChange={(e) => handleFlareChange(e.target.value)}
                className="w-full accent-red-400 bg-stone-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-0.5 font-mono-tabular">
                <span>Quiet Sun</span>
                <span>X-Class Superflare</span>
              </div>
            </div>
          </div>

          {/* Sir C.V. Raman & J.C. Bose Instrumentation Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs font-mono-tabular mb-1">
                <label htmlFor={boseFreqId} className="text-stone-300 font-semibold cursor-pointer">
                  Bose Horn Frequency
                </label>
                <span className="text-amber-300 font-bold">
                  {satelliteState.boseRadioFrequencyGhz} GHz (λ=5mm)
                </span>
              </div>
              <input
                id={boseFreqId}
                type="range"
                min="10"
                max="160"
                step="5"
                value={satelliteState.boseRadioFrequencyGhz}
                onChange={(e) => handleBoseFreqChange(e.target.value)}
                className="w-full accent-amber-300 bg-stone-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-0.5 font-mono-tabular">
                <span>10 GHz (Microwave)</span>
                <span className="text-amber-400">60 GHz (Bose 1895)</span>
                <span>160 GHz (CMB Peak)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono-tabular mb-1.5">
                <span className="text-stone-300 font-semibold">Raman Inelastic Laser</span>
                <span className={satelliteState.ramanEnabled ? 'text-emerald-400' : 'text-stone-500'}>
                  {satelliteState.ramanEnabled ? 'Active (532 nm)' : 'Disabled'}
                </span>
              </div>
              <button
                onClick={() => {
                  setSatelliteState((s) => ({ ...s, ramanEnabled: !s.ramanEnabled }));
                  soundEffects.playRatchetClick(1.2);
                }}
                className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                  satelliteState.ramanEnabled
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                    : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>{satelliteState.ramanEnabled ? 'Inelastic Scatter Active' : 'Enable Raman Laser'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Historical & Scientific Context Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* Sir C.V. Raman Card */}
        <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-display font-bold text-amber-300 text-lg">
                {PIONEER_PROFILES.raman.name}
              </span>
              <span className="text-[11px] font-mono-tabular text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                1928 Nobel Prize
              </span>
            </div>
            <p className="text-xs text-amber-200/80 font-serif italic mb-2">
              {PIONEER_PROFILES.raman.title}
            </p>
            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              {PIONEER_PROFILES.raman.experimentSummary}
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              {PIONEER_PROFILES.raman.cosmicLink}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-800 font-mono-tabular text-[11px] text-amber-300 bg-stone-950 p-2.5 rounded">
            Formula: {PIONEER_PROFILES.raman.keyFormula}
          </div>
        </div>

        {/* Sir J.C. Bose Card */}
        <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-display font-bold text-amber-300 text-lg">
                {PIONEER_PROFILES.bose.name}
              </span>
              <span className="text-[11px] font-mono-tabular text-sky-400/90 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                1895 EHF Pioneer
              </span>
            </div>
            <p className="text-xs text-sky-200/80 font-serif italic mb-2">
              {PIONEER_PROFILES.bose.title}
            </p>
            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              {PIONEER_PROFILES.bose.experimentSummary}
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              {PIONEER_PROFILES.bose.cosmicLink}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-800 font-mono-tabular text-[11px] text-sky-300 bg-stone-950 p-2.5 rounded">
            Formula: {PIONEER_PROFILES.bose.keyFormula}
          </div>
        </div>

        {/* Innovative Satellite Concept Card */}
        <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-display font-bold text-emerald-300 text-lg">
                {PIONEER_PROFILES.satelliteConcept.name}
              </span>
              <span className="text-[11px] font-mono-tabular text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Orbital Concept
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 font-serif italic mb-3">
              Hybrid Spectrometer & Millimeter Radio Payload
            </p>
            <div className="space-y-2 text-xs text-stone-300">
              {PIONEER_PROFILES.satelliteConcept.modules.map((m, idx) => (
                <div key={idx} className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                  <div className="font-semibold text-amber-200 text-[11px] mb-0.5">{m.name}</div>
                  <div className="text-[11px] text-stone-400 leading-normal">{m.role}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-800 font-mono-tabular text-[10px] text-stone-400">
            Heritage: Aṁśu Bodhinī Fluid Jacket + Modern Cryogenics
          </div>
        </div>
      </div>

      {/* Practice Test & Interactive Student Quiz */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-tabular tracking-wider uppercase mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Interactive Practice Test & Study Guide</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-stone-100">
              Cosmic Optics & Spectroscopy Exam
            </h3>
            <p className="text-stone-400 text-xs md:text-sm mt-1">
              Test your engineering and astrophysical mastery of Cosmic Latte, Raman scattering, J.C. Bose radio waves, and the Aṁśu Bodhinī spaceborne fluid shield.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1 bg-stone-950 border border-stone-800 rounded-lg shrink-0">
            <button
              onClick={() => {
                setTestMode('interactive-quiz');
                soundEffects.playRatchetClick(1.0);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                testMode === 'interactive-quiz'
                  ? 'bg-amber-400 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Interactive Quiz</span>
            </button>
            <button
              onClick={() => {
                setTestMode('answer-key');
                soundEffects.playRatchetClick(1.0);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                testMode === 'answer-key'
                  ? 'bg-amber-400 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Complete Answer Key</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Quiz Mode */}
        {testMode === 'interactive-quiz' && (
          <div className="space-y-8">
            {PRACTICE_TEST_QUESTIONS.map((q) => {
              const selectedAnswer = userAnswers[q.id];
              const isCorrect = selectedAnswer === q.correctKey;
              const hasAnswered = !!selectedAnswer;

              return (
                <div
                  key={q.id}
                  className="bg-stone-950 p-6 rounded-xl border border-stone-800/80 hover:border-stone-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-tabular text-amber-400 uppercase tracking-wider font-semibold">
                      Question {q.questionNumber} of {PRACTICE_TEST_QUESTIONS.length}
                    </span>
                    <span className="text-[11px] font-mono-tabular text-stone-500">
                      {q.engineeringConcept}
                    </span>
                  </div>

                  <h4 className="font-display text-base md:text-lg font-bold text-stone-100 mb-2">
                    {q.title}
                  </h4>
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed mb-4">
                    {q.question}
                  </p>

                  {/* Options List */}
                  <div className="space-y-2 mb-4">
                    {q.options.map((opt) => {
                      const isSelected = selectedAnswer === opt.key;
                      let btnStyle = 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800';

                      if (submittedQuiz) {
                        if (opt.key === q.correctKey) {
                          btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-red-950/60 border-red-500 text-red-200 line-through';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-200 font-semibold shadow-sm';
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectAnswer(q.id, opt.key)}
                          className={`w-full text-left p-3 rounded-lg text-xs md:text-sm border transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono-tabular font-bold shrink-0 w-6 h-6 rounded-full bg-stone-950 flex items-center justify-center border border-stone-700 text-stone-300 text-xs">
                            {opt.key}
                          </span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Feedback Explanation after submission or answering */}
                  {(submittedQuiz || hasAnswered) && (
                    <div
                      className={`p-4 rounded-lg border text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                          : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold mb-1 font-mono-tabular">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Correct! (Option {q.correctKey})</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>Correct Answer: Option {q.correctKey}</span>
                          </>
                        )}
                      </div>
                      <p className="mb-2 text-stone-200">{q.shortExplanation}</p>
                      {showExplanations && (
                        <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                          <strong className="text-stone-300">Pedagogical Analysis: </strong>
                          {q.deepPedagogicalAnalysis}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quiz Submit & Reset Bar */}
            <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleGradeQuiz}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs md:text-sm rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Grade Exam & Check Answers</span>
                </button>
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 text-xs rounded-lg border border-stone-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Answers</span>
                </button>
              </div>

              {submittedQuiz && (
                <div className="flex items-center gap-3 font-mono-tabular text-sm">
                  <span className="text-stone-400">Your Score:</span>
                  <span className="font-bold text-amber-400 text-base">
                    {score} / {PRACTICE_TEST_QUESTIONS.length}
                  </span>
                  <span className="text-xs text-stone-500">
                    ({((score / PRACTICE_TEST_QUESTIONS.length) * 100).toFixed(0)}%)
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Complete Answer Key & Study Guide Mode */}
        {testMode === 'answer-key' && (
          <div className="space-y-8">
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-200 leading-relaxed">
              <strong className="font-semibold block mb-1">
                Official Answer Key & Teacher Study Guide:
              </strong>
              Each question is annotated with the exact physics mechanism, historical pioneer context (Mozi, Ibn al-Haytham, Aṁśu Bodhinī, C.V. Raman, J.C. Bose), and spacecraft engineering application.
            </div>

            <div className="grid grid-cols-1 gap-6">
              {PRACTICE_TEST_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="bg-stone-950 p-6 rounded-xl border border-stone-800 relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3 mb-4">
                    <span className="text-xs font-mono-tabular text-amber-400 font-bold uppercase tracking-wider">
                      Question {q.questionNumber}: {q.title}
                    </span>
                    <span className="text-xs font-mono-tabular bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                      Answer Key: Option {q.correctKey}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-stone-300 font-medium mb-4">
                    {q.question}
                  </p>

                  {/* Correct Option Highlight */}
                  <div className="bg-stone-900/90 border border-emerald-500/50 p-3.5 rounded-lg mb-4">
                    <div className="text-[11px] font-mono-tabular text-emerald-400 font-bold mb-1">
                      CORRECT OPTION ({q.correctKey}):
                    </div>
                    <div className="text-xs md:text-sm text-stone-200">
                      {q.options.find((o) => o.key === q.correctKey)?.text}
                    </div>
                  </div>

                  {/* Short Explanation */}
                  <div className="mb-3">
                    <div className="text-[11px] font-mono-tabular text-amber-400 uppercase tracking-wider mb-1">
                      Short Answer Summary:
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {q.shortExplanation}
                    </p>
                  </div>

                  {/* Deep Pedagogical Analysis */}
                  <div className="bg-stone-900/40 p-4 rounded-lg border border-stone-800/80 mb-3">
                    <div className="text-[11px] font-mono-tabular text-stone-400 uppercase tracking-wider mb-1">
                      In-Depth Pedagogical & Engineering Breakdown:
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      {q.deepPedagogicalAnalysis}
                    </p>
                  </div>

                  {/* Metadata Footer */}
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 font-mono-tabular pt-3 border-t border-stone-900 gap-2">
                    <span>Pioneer / Origin: <strong className="text-stone-300">{q.historicalPioneer}</strong></span>
                    <span>Engineering Principle: <strong className="text-amber-400/90">{q.engineeringConcept}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
