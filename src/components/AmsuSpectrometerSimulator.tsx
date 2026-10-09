import React, { useState, useRef, useEffect, useId } from 'react';
import { AmsuSpectrometerState, FluidSolutionType } from '../types';
import { SPECTRAL_BANDS, FLUID_SOLUTIONS } from '../data/comparativeData';
import { soundEffects } from '../utils/audio';
import { Flame, Droplet, Sun, Compass, RotateCcw, AlertTriangle, Filter } from 'lucide-react';
import { OpticalSpectrumVisualization } from './OpticalSpectrumVisualization';
import { mobileOpticalRenderer } from '../utils/mobileRenderer';

export const AmsuSpectrometerSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [state, setState] = useState<AmsuSpectrometerState>({
    sunbeamIntensity: 850, // W/m^2
    sunbeamAngleDeg: 0, // -10 to +10 deg
    jabakachaLensPositionMm: 50, // 0 to 100 mm (50mm is optimal collimation)
    waterCellDepthPct: 75, // 0 to 100%
    fluidSolution: 'water',
    quartzPrismAngleDeg: 48, // 35 to 65 deg (48 deg is minimum deviation)
    selectedWavelengthNm: 550,
    thermalEquilibriumC: 32,
    isCollimated: true,
    isThermalSafe: true,
    gratingDensityLinesPerMm: 600,
    dispersionMode: 'cross-dispersion',
  });

  // Calculate thermodynamic and optical status
  const collimationDeviation = Math.abs(state.jabakachaLensPositionMm - 50);
  const isCollimated = collimationDeviation <= 6;

  // Thermal physics: high solar intensity + low water depth heats quartz up to 90C
  const absorbedHeatFactor = (1 - state.waterCellDepthPct / 100);
  const currentTempC = 24 + (state.sunbeamIntensity / 1000) * 65 * absorbedHeatFactor;
  const isThermalSafe = currentTempC < 55;

  // Dispersion calculation via Cauchy quartz model
  const getQuartzN = (wlNm: number) => {
    const wlMicrons = wlNm / 1000;
    return 1.5388 + 0.00458 / (wlMicrons * wlMicrons);
  };

  const handleReset = () => {
    setState({
      sunbeamIntensity: 850,
      sunbeamAngleDeg: 0,
      jabakachaLensPositionMm: 50,
      waterCellDepthPct: 75,
      fluidSolution: 'water',
      quartzPrismAngleDeg: 48,
      selectedWavelengthNm: 550,
      thermalEquilibriumC: 32,
      isCollimated: true,
      isThermalSafe: true,
      gratingDensityLinesPerMm: 600,
      dispersionMode: 'cross-dispersion',
    });
    soundEffects.playRatchetClick(1.2);
  };

  // Find active spectral band based on probe wavelength
  const activeBand = SPECTRAL_BANDS.find(
    (b) => state.selectedWavelengthNm >= b.wavelengthMin && state.selectedWavelengthNm <= b.wavelengthMax
  ) || SPECTRAL_BANDS[3]; // default yellow

  // Render optical bench simulation on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear with dark ambient background
    ctx.fillStyle = '#0a0908';
    ctx.fillRect(0, 0, w, h);

    // Chamber casing box (Antique brass rim and dark velvet interior)
    const boxX = w * 0.35;
    const boxY = h * 0.12;
    const boxW = w * 0.62;
    const boxH = h * 0.76;

    // Brass Chamber Outer Rim
    const brassGradient = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
    brassGradient.addColorStop(0, '#d97706');
    brassGradient.addColorStop(0.3, '#78350f');
    brassGradient.addColorStop(0.7, '#b45309');
    brassGradient.addColorStop(1, '#451a03');

    ctx.fillStyle = brassGradient;
    ctx.beginPath();
    ctx.roundRect(boxX - 8, boxY - 8, boxW + 16, boxH + 16, 12);
    ctx.fill();

    // Chamber Interior (Dark light-absorbent felt)
    ctx.fillStyle = '#060504';
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();

    // Central optical axis Y
    const axisY = h * 0.5;

    // 1. INCOMING SUNBEAM (from outside left to Jabākācha barrel)
    const beamAngleRad = (state.sunbeamAngleDeg * Math.PI) / 180;
    const beamYOffset = Math.tan(beamAngleRad) * 150;

    const sunBeamAlpha = Math.min(0.9, 0.3 + (state.sunbeamIntensity / 1200) * 0.6);
    const sunGrad = ctx.createLinearGradient(0, axisY - 40, boxX * 0.5, axisY + 40);
    sunGrad.addColorStop(0, `rgba(254, 240, 138, ${sunBeamAlpha})`);
    sunGrad.addColorStop(1, `rgba(245, 158, 11, ${sunBeamAlpha})`);

    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.moveTo(0, axisY - 60 + beamYOffset);
    ctx.lineTo(boxX * 0.2, axisY - 30);
    ctx.lineTo(boxX * 0.2, axisY + 30);
    ctx.lineTo(0, axisY + 60 + beamYOffset);
    ctx.closePath();
    ctx.fill();

    // Sunbeam Label
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('SŪRYARAŚMI (SUNBEAM)', 15, axisY - 70);

    // 2. JABĀKĀCHA COLLIMATING TUBE (Brass cylinder mounted on left chamber wall)
    const tubeX = boxX - 90;
    const tubeY = axisY - 35;
    const tubeW = 90;
    const tubeH = 70;

    ctx.fillStyle = brassGradient;
    ctx.fillRect(tubeX, tubeY, tubeW, tubeH);
    // Brass Flange
    ctx.fillRect(tubeX - 8, tubeY - 8, 12, tubeH + 16);

    // Jabākācha Curved Glass Lens inside tube
    const lensX = tubeX + (state.jabakachaLensPositionMm / 100) * (tubeW - 20) + 10;
    ctx.fillStyle = 'rgba(186, 230, 253, 0.75)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(lensX, axisY, 8, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fde68a';
    ctx.font = '10px monospace';
    ctx.fillText('JABĀKĀCHA LENS', tubeX + 5, tubeY - 14);

    // 3. COLLIMATED BEAM FROM LENS INTO WATER VESSEL
    const waterVesselX = boxX + boxW * 0.28;
    const beamSpread = (state.jabakachaLensPositionMm - 50) * 0.3; // divergence if not 50mm

    ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
    ctx.beginPath();
    ctx.moveTo(boxX, axisY - 10);
    ctx.lineTo(waterVesselX, axisY - 10 - beamSpread);
    ctx.lineTo(waterVesselX, axisY + 10 + beamSpread);
    ctx.lineTo(boxX, axisY + 10);
    ctx.closePath();
    ctx.fill();

    // 4. WATER VESSEL / FLUID CELL (Thermal IR Heat Absorber)
    const gobletW = 50;
    const gobletH = 110;
    const gobletY = axisY - 55;

    // Goblet Brass Stand
    ctx.fillStyle = brassGradient;
    ctx.fillRect(waterVesselX + 20, gobletY + gobletH, 10, 45);
    ctx.beginPath();
    ctx.ellipse(waterVesselX + 25, gobletY + gobletH + 45, 24, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glass Vessel Body
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(2, 132, 199, 0.15)';
    ctx.beginPath();
    ctx.roundRect(waterVesselX, gobletY, gobletW, gobletH, 6);
    ctx.fill();
    ctx.stroke();

    // Fluid Level (Water / Herbal / Copper Salts)
    const fluidH = (state.waterCellDepthPct / 100) * (gobletH - 12);
    const fluidY = gobletY + gobletH - fluidH - 6;

    if (state.waterCellDepthPct > 5) {
      let fluidColor = 'rgba(56, 189, 248, 0.45)';
      let meniscusColor = 'rgba(125, 211, 252, 0.7)';

      if (!isThermalSafe) {
        fluidColor = 'rgba(248, 113, 113, 0.55)';
        meniscusColor = 'rgba(252, 165, 165, 0.75)';
      } else if (state.fluidSolution === 'yavakshara') {
        fluidColor = 'rgba(220, 190, 100, 0.55)';
        meniscusColor = 'rgba(253, 224, 71, 0.8)';
      } else if (state.fluidSolution === 'kasisa') {
        fluidColor = 'rgba(16, 185, 129, 0.55)';
        meniscusColor = 'rgba(110, 231, 183, 0.8)';
      } else if (state.fluidSolution === 'saurastri') {
        fluidColor = 'rgba(236, 72, 153, 0.45)';
        meniscusColor = 'rgba(244, 114, 182, 0.75)';
      } else if (state.fluidSolution === 'saffron') {
        fluidColor = 'rgba(245, 158, 11, 0.55)';
        meniscusColor = 'rgba(254, 240, 138, 0.8)';
      } else if (state.fluidSolution === 'copper') {
        fluidColor = 'rgba(6, 182, 212, 0.55)';
        meniscusColor = 'rgba(103, 232, 249, 0.8)';
      }

      ctx.fillStyle = fluidColor;
      ctx.fillRect(waterVesselX + 4, fluidY, gobletW - 8, fluidH);

      // Fluid Meniscus
      ctx.fillStyle = meniscusColor;
      ctx.beginPath();
      ctx.ellipse(waterVesselX + gobletW / 2, fluidY, (gobletW - 8) / 2, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#7dd3fc';
    ctx.font = '10px monospace';
    ctx.fillText('WATER VESSEL', waterVesselX - 10, gobletY - 14);

    // 5. FILTERED BEAM FROM WATER VESSEL TO QUARTZ PRISM
    const prismX = boxX + boxW * 0.62;
    const prismY = axisY - 45;
    const prismSize = 70;

    // Beam color: pure white filtered light if water is full; unfiltered thermal red if dry
    ctx.fillStyle = state.waterCellDepthPct > 40 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(251, 191, 36, 0.95)';
    ctx.beginPath();
    ctx.moveTo(waterVesselX + gobletW, axisY - 8);
    ctx.lineTo(prismX - 15, axisY - 8);
    ctx.lineTo(prismX - 15, axisY + 8);
    ctx.lineTo(waterVesselX + gobletW, axisY + 8);
    ctx.closePath();
    ctx.fill();

    // 6. QUARTZ CRYSTAL PRISM (Sphātika)
    // Rotation based on quartzPrismAngleDeg
    ctx.save();
    ctx.translate(prismX, axisY);
    const prismRad = ((state.quartzPrismAngleDeg - 48) * Math.PI) / 180;
    ctx.rotate(prismRad);

    // Quartz Triangular Body
    ctx.fillStyle = isThermalSafe ? 'rgba(224, 242, 254, 0.75)' : 'rgba(254, 202, 202, 0.75)';
    ctx.strokeStyle = isThermalSafe ? '#bae6fd' : '#f87171';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(0, -prismSize / 2);
    ctx.lineTo(-prismSize * 0.45, prismSize / 2);
    ctx.lineTo(prismSize * 0.45, prismSize / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Quartz Facet Reflection
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -prismSize / 2);
    ctx.lineTo(0, prismSize / 2);
    ctx.stroke();

    ctx.restore();

    ctx.fillStyle = '#e0f2fe';
    ctx.font = '10px monospace';
    ctx.fillText('SPHĀTIKA (QUARTZ)', prismX - 45, prismY - 14);

    // 7. SPECTRAL DISPERSION FAN ONTO BACK WALL
    const backWallX = boxX + boxW - 8;
    const dispersionOrigins = [
      { name: 'Red', wl: 700, color: '#ef4444', n: getQuartzN(700) },
      { name: 'Orange', wl: 610, color: '#f97316', n: getQuartzN(610) },
      { name: 'Yellow', wl: 580, color: '#eab308', n: getQuartzN(580) },
      { name: 'Green', wl: 530, color: '#22c55e', n: getQuartzN(530) },
      { name: 'Blue', wl: 470, color: '#06b6d4', n: getQuartzN(470) },
      { name: 'Violet', wl: 410, color: '#8b5cf6', n: getQuartzN(410) },
    ];

    const baseDev = (state.quartzPrismAngleDeg - 35) * 1.5;

    // Disperse rays
    dispersionOrigins.forEach((ray, i) => {
      // Angular deviation proportional to refractive index n
      const nDelta = (ray.n - 1.5388) * 900;
      const targetY = axisY - 80 + i * 28 + baseDev - nDelta;

      // Draw dispersion fan polygon
      ctx.fillStyle = ray.color;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(prismX + 20, axisY);
      ctx.lineTo(backWallX, targetY);
      ctx.lineTo(backWallX, targetY + 24);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1.0;
    });

    // 8. CALIBRATED BRASS MEASUREMENT SCALE ON BACK WALL
    ctx.fillStyle = brassGradient;
    ctx.fillRect(backWallX - 10, boxY + 20, 14, boxH - 40);

    // Ticks & Wavelength Scale Numbers
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#fef08a';
    ctx.font = '9px monospace';

    for (let y = boxY + 30; y < boxY + boxH - 30; y += 18) {
      ctx.beginPath();
      ctx.moveTo(backWallX - 10, y);
      ctx.lineTo(backWallX, y);
      ctx.stroke();
    }
  }, [state, isCollimated, isThermalSafe, currentTempC]);

  const sunbeamIntensityId = useId();
  const jabakachaPosId = useId();
  const waterDepthId = useId();
  const prismAngleId = useId();
  const probeWavelengthId = useId();

  return (
    <section id="amsu-spectrometer" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-tabular tracking-wider uppercase mb-2">
            <span>Experiment 2 · Classical Indian Spectrometry</span>
            <span aria-hidden="true">·</span>
            <span>Aṁśu Bodhinī & Bharadwaja Tradition</span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-stone-100 tracking-tight">
            The Aṁśu Bodhinī Optical Spectrometer Bench
          </h2>
          <p className="text-stone-400 text-sm md:text-base mt-1 max-w-3xl">
            Simulate the antique brass optical assembly: isolate the solar sunbeam (Sūryaraśmi), collimate via Jabākācha, attenuate thermal IR in the water cell, and disperse through pure quartz crystal (Sphātika).
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-medium rounded-lg border border-stone-700 transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Bench</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Main Apparatus Canvas Viewport (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-stone-900 border-2 border-stone-800 rounded-xl overflow-hidden shadow-xl p-3 relative">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-mono-tabular text-amber-300 font-semibold uppercase tracking-wider">
                Optical Assembly · Top-Down Cross-Section
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono-tabular px-2 py-0.5 rounded ${isCollimated ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {isCollimated ? '● Collimated (0.2°)' : '▲ Divergent Beam'}
                </span>
                <span className={`text-xs font-mono-tabular px-2 py-0.5 rounded ${isThermalSafe ? 'bg-sky-500/20 text-sky-300' : 'bg-red-500/20 text-red-300'}`}>
                  {isThermalSafe ? `Quartz: ${currentTempC.toFixed(0)}°C` : `▲ Overheating: ${currentTempC.toFixed(0)}°C`}
                </span>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={750}
              height={440}
              className="w-full h-auto aspect-16/10 rounded-lg border border-stone-950 bg-stone-950 block"
            />

            {/* Thermal Safety Banner if water level is dangerously low */}
            {!isThermalSafe && (
              <div className="mt-3 p-3 bg-red-950/80 border border-red-700/80 rounded-lg flex items-center gap-3 text-red-200 text-xs">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <strong className="block font-semibold">THERMAL SHOCK HAZARD (T &gt; 55°C):</strong>
                  Insufficient liquid in water vessel! Concentrated infrared solar flux will induce quartz crystal cleavage and thermal index distortion (dn/dT). Increase water depth immediately.
                </div>
              </div>
            )}
          </div>

          {/* Calibrated Spectral Band Analyzer & Probe Tool */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono-tabular text-amber-400 font-bold uppercase tracking-wider block">
                  Solar Spectral Band Probe & Fraunhofer Analysis
                </span>
                <span className="text-xs text-stone-400">
                  Slide probe to measure energy constituents of Sūryaraśmi
                </span>
              </div>
              <div className="text-right font-mono-tabular">
                <span className="text-xs text-stone-400 block">Probe Wavelength:</span>
                <strong className="text-amber-300 text-sm">{state.selectedWavelengthNm} nm</strong>
              </div>
            </div>

            {/* Full Rainbow Band Bar with Interactive Click/Drag Probe */}
            <div className="relative">
              <div
                className="h-10 rounded-lg overflow-hidden border border-stone-700 shadow-inner flex"
                style={{
                  background: 'linear-gradient(to right, #6366f1 0%, #8b5cf6 15%, #06b6d4 30%, #22c55e 50%, #eab308 68%, #f97316 82%, #ef4444 95%, #991b1b 100%)',
                }}
              >
                {/* Visual Fraunhofer lines markers */}
                <div className="w-full h-full relative pointer-events-none">
                  {/* H/K lines 393 nm */}
                  <div className="absolute top-0 bottom-0 w-[2px] bg-black opacity-80 left-[3%]" title="K (Ca II 393nm)" />
                  {/* F line 486 nm */}
                  <div className="absolute top-0 bottom-0 w-[2px] bg-black opacity-80 left-[28%]" title="F (H-beta 486nm)" />
                  {/* b lines 517 nm */}
                  <div className="absolute top-0 bottom-0 w-[2px] bg-black opacity-80 left-[37%]" title="b (Mg 517nm)" />
                  {/* E line 527 nm */}
                  <div className="absolute top-0 bottom-0 w-[2px] bg-black opacity-80 left-[40%]" title="E (Fe 527nm)" />
                  {/* D lines 589 nm */}
                  <div className="absolute top-0 bottom-0 w-[3px] bg-black opacity-90 left-[56%]" title="D (Na 589nm)" />
                  {/* C line 656 nm */}
                  <div className="absolute top-0 bottom-0 w-[2px] bg-black opacity-80 left-[75%]" title="C (H-alpha 656nm)" />
                  {/* B line 687 nm */}
                  <div className="absolute top-0 bottom-0 w-[3px] bg-black opacity-80 left-[83%]" title="B (O2 687nm)" />
                </div>
              </div>

              {/* Slider overlay for smooth probe dragging */}
              <input
                id={probeWavelengthId}
                type="range"
                min="380"
                max="750"
                step="1"
                value={state.selectedWavelengthNm}
                onChange={(e) => {
                  const wl = parseInt(e.target.value, 10);
                  setState((s) => ({ ...s, selectedWavelengthNm: wl }));
                  soundEffects.playPrismChime(wl);
                }}
                className="w-full mt-2 accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono-tabular mt-1">
                <span>380 nm (Violet / UV)</span>
                <span>550 nm (Solar Peak)</span>
                <span>750 nm (Crimson / NIR)</span>
              </div>
            </div>

            {/* Probe Readout Matrix */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-stone-950 p-4 rounded-lg border border-stone-800 text-xs">
              <div>
                <span className="text-[11px] text-stone-500 block font-mono-tabular">Spectral Band:</span>
                <span className="font-bold text-stone-200" style={{ color: activeBand.colorHex }}>
                  {activeBand.name}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block font-mono-tabular">Aṁśu Bodhinī Term:</span>
                <span className="font-semibold text-amber-300">
                  {activeBand.classicalSanskritTerm || 'Raśmi'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block font-mono-tabular">Photon Energy (E=hν):</span>
                <span className="font-mono-tabular text-stone-200">
                  {activeBand.photonEnergyEv}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block font-mono-tabular">Fraunhofer Marker:</span>
                <span className="font-mono-tabular text-stone-300 truncate block">
                  {activeBand.fraunhoferLine || 'Solar continuum'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Optical Bench Controls Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="font-display text-base font-bold text-amber-200 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Apparatus Controls</span>
              </span>
              <span className="text-xs font-mono-tabular text-stone-500">
                Aṁśu Train Calibrated
              </span>
            </div>

            {/* Control 1: Solar Sunbeam Intensity */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
                <label htmlFor={sunbeamIntensityId} className="text-stone-300 font-semibold flex items-center gap-1.5 cursor-pointer">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Solar Flux (Sūryaraśmi)</span>
                </label>
                <span className="text-amber-400 font-bold">{state.sunbeamIntensity} W/m²</span>
              </div>
              <input
                id={sunbeamIntensityId}
                type="range"
                min="200"
                max="1200"
                step="25"
                value={state.sunbeamIntensity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  mobileOpticalRenderer.throttleValueChange('sunbeam_flux', val, (v) => {
                    setState((s) => ({ ...s, sunbeamIntensity: v }));
                  });
                  soundEffects.playRatchetClick(1.0);
                }}
                className="w-full accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1 font-mono-tabular">
                <span>200 W/m² (Morning)</span>
                <span>1200 W/m² (Zenith Noon)</span>
              </div>
            </div>

            {/* Control 2: Jabākācha Collimating Lens Position */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
                <label htmlFor={jabakachaPosId} className="text-stone-300 font-semibold cursor-pointer">
                  Jabākācha Lens Position
                </label>
                <span className={`font-bold ${isCollimated ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {state.jabakachaLensPositionMm} mm ({isCollimated ? 'Collimated' : 'Divergent'})
                </span>
              </div>
              <input
                id={jabakachaPosId}
                type="range"
                min="10"
                max="90"
                step="2"
                value={state.jabakachaLensPositionMm}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  mobileOpticalRenderer.throttleValueChange('jabakacha_pos', val, (v) => {
                    setState((s) => ({ ...s, jabakachaLensPositionMm: v }));
                  });
                  soundEffects.playRatchetClick(1.1);
                }}
                className="w-full accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1 font-mono-tabular">
                <span>10 mm</span>
                <span className="text-emerald-400 font-medium">Sweet Spot: 50 mm</span>
                <span>90 mm</span>
              </div>
            </div>

            {/* Control 3: Fluid Solution Injection Valve */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
                <span className="text-stone-300 font-semibold flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-sky-400" />
                  <span>Fluid Solution Compound</span>
                </span>
                <span className="text-amber-400 font-bold truncate max-w-[140px] text-right">
                  {state.fluidSolution === 'water' ? 'Shuddha Jala' : state.fluidSolution === 'yavakshara' ? 'Yavakshāra' : state.fluidSolution === 'kasisa' ? 'Kāsīsa' : state.fluidSolution === 'saurastri' ? 'Saurāṣṭrī' : state.fluidSolution === 'saffron' ? 'Saffron' : 'Tuttha'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['water', 'yavakshara', 'kasisa', 'saurastri', 'saffron', 'copper'] as FluidSolutionType[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setState((s) => ({ ...s, fluidSolution: f }));
                      soundEffects.playWaterBubble();
                    }}
                    className={`py-1 px-1.5 rounded text-[10px] font-mono-tabular transition-colors cursor-pointer text-center truncate ${
                      state.fluidSolution === f
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    {f === 'water' ? 'Jala' : f === 'yavakshara' ? 'Yavakshāra' : f === 'kasisa' ? 'Kāsīsa' : f === 'saurastri' ? 'Saurāṣṭrī' : f === 'saffron' ? 'Saffron' : 'Tuttha'}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Water Cell Fluid Depth (Thermal IR Heat Filter) */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
                <label htmlFor={waterDepthId} className="text-stone-300 font-semibold flex items-center gap-1.5 cursor-pointer">
                  <Droplet className="w-3.5 h-3.5 text-sky-400" />
                  <span>Fluid Depth (IR Absorption)</span>
                </label>
                <span className={`font-bold ${state.waterCellDepthPct < 30 ? 'text-red-400' : 'text-sky-400'}`}>
                  {state.waterCellDepthPct}% Depth
                </span>
              </div>
              <input
                id={waterDepthId}
                type="range"
                min="0"
                max="100"
                step="5"
                value={state.waterCellDepthPct}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  mobileOpticalRenderer.throttleValueChange('fluid_depth', val, (v) => {
                    setState((s) => ({ ...s, waterCellDepthPct: v }));
                  });
                  soundEffects.playWaterBubble();
                }}
                className="w-full accent-sky-400 bg-stone-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1 font-mono-tabular">
                <span className="text-red-400">0% (Dry / Hazard)</span>
                <span className="text-sky-300">Optimal: 70-85%</span>
                <span>100% (Max Shield)</span>
              </div>
            </div>

            {/* Control 5: Sphātika Quartz Prism Angle */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
                <label htmlFor={prismAngleId} className="text-stone-300 font-semibold cursor-pointer">
                  Sphātika Prism Angle (θ)
                </label>
                <span className="text-amber-400 font-bold">{state.quartzPrismAngleDeg}°</span>
              </div>
              <input
                id={prismAngleId}
                type="range"
                min="35"
                max="65"
                step="1"
                value={state.quartzPrismAngleDeg}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  mobileOpticalRenderer.throttleValueChange('quartz_angle', val, (v) => {
                    setState((s) => ({ ...s, quartzPrismAngleDeg: v }));
                  });
                  soundEffects.playRatchetClick(0.9);
                }}
                className="w-full accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
              />

              <div className="flex justify-between text-[11px] text-stone-500 mt-1 font-mono-tabular">
                <span>35°</span>
                <span className="text-emerald-400">Min Deviation: 48°</span>
                <span>65°</span>
              </div>
            </div>

            {/* Engineering Diagnostics Matrix */}
            <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2.5 font-mono-tabular text-xs">
              <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px] mb-1">
                Thermal & Optical Telemetry
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Beam Divergence:</span>
                <span className={isCollimated ? 'text-emerald-300' : 'text-amber-300'}>
                  {(collimationDeviation * 0.04).toFixed(2)}°
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>IR Heat Attenuation:</span>
                <span className="text-sky-300">
                  {(Math.min(98, (state.waterCellDepthPct / 100) * 98)).toFixed(0)}% Absorbed
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Quartz Temperature:</span>
                <span className={isThermalSafe ? 'text-emerald-300 font-bold' : 'text-red-400 font-bold'}>
                  {currentTempC.toFixed(1)}°C
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Refractive Index n(550nm):</span>
                <span className="text-stone-200">
                  {getQuartzN(550).toFixed(4)}
                </span>
              </div>
            </div>
          </div>

          {/* Sūtra Engineering Context Card */}
          <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-5">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-2 font-mono-tabular">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>The Conceptual Bridge: From Picture to Spectrum</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Unlike the Camera Obscura—which maps external geometric landmarks onto an inverted screen—the Aṁśu Bodhinī apparatus strips away the spatial picture entirely. By forcing the rays through a water heat-trap and crystalline quartz, it isolates the fundamental energy profile and discrete color frequencies of the light source itself.
            </p>
          </div>
        </div>
      </div>

      {/* Synchronized Optical Spectrum & Diffraction Grating Engine */}
      <div className="mt-12">
        <OpticalSpectrumVisualization
          quartzPrismAngleDeg={state.quartzPrismAngleDeg}
          onPrismAngleChange={(angle) => setState((s) => ({ ...s, quartzPrismAngleDeg: angle }))}
          fluidSolution={state.fluidSolution}
          onFluidSolutionChange={(fluid) => setState((s) => ({ ...s, fluidSolution: fluid }))}
          isCollimated={isCollimated}
          sunbeamIntensity={state.sunbeamIntensity}
          selectedWavelengthNm={state.selectedWavelengthNm}
          onWavelengthSelect={(wl) => setState((s) => ({ ...s, selectedWavelengthNm: wl }))}
        />
      </div>
    </section>
  );
};
