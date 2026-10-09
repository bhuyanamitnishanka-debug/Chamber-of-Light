import React, { useState, useRef, useEffect, useId } from 'react';
import { FluidSolutionType } from '../types';
import { FLUID_SOLUTIONS, FRAUNHOFER_LINES, FraunhoferLineData } from '../data/comparativeData';
import { soundEffects } from '../utils/audio';
import { mobileOpticalRenderer } from '../utils/mobileRenderer';
import { RotateCw, Sparkles, Filter, Sliders, Activity, Info, Check } from 'lucide-react';

interface OpticalSpectrumVisualizationProps {
  quartzPrismAngleDeg: number;
  onPrismAngleChange: (angle: number) => void;
  fluidSolution: FluidSolutionType;
  onFluidSolutionChange: (fluid: FluidSolutionType) => void;
  isCollimated: boolean;
  sunbeamIntensity: number;
  selectedWavelengthNm: number;
  onWavelengthSelect: (wl: number) => void;
}

export const OpticalSpectrumVisualization: React.FC<OpticalSpectrumVisualizationProps> = ({
  quartzPrismAngleDeg,
  onPrismAngleChange,
  fluidSolution,
  onFluidSolutionChange,
  isCollimated,
  sunbeamIntensity,
  selectedWavelengthNm,
  onWavelengthSelect,
}) => {
  const gratingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const intensityCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotaryDialRef = useRef<HTMLDivElement | null>(null);

  const [gratingDensity, setGratingDensity] = useState<number>(600); // lines per mm
  const [dispersionComparisonMode, setDispersionComparisonMode] = useState<'coupled' | 'grating-only' | 'prism-only'>('coupled');
  const [selectedFraunhofer, setSelectedFraunhofer] = useState<FraunhoferLineData | null>(FRAUNHOFER_LINES[8]); // Default D2 sodium
  const [isDraggingRotary, setIsDraggingRotary] = useState<boolean>(false);

  const currentFluid = FLUID_SOLUTIONS.find((f) => f.id === fluidSolution) || FLUID_SOLUTIONS[0];

  // Grating equation parameters: d in nm
  // 600 lines/mm => d = 1,000,000 / 600 = 1666.67 nm
  const gratingSpacingNm = 1000000 / gratingDensity;

  // Incident angle from prism output
  // Quartz minimum deviation occurs around 48 deg
  const incidentAngleRad = ((quartzPrismAngleDeg - 48) * 0.65 * Math.PI) / 180;
  const incidentAngleDeg = (incidentAngleRad * 180) / Math.PI;

  // Filter transmission attenuation based on selected solution
  const getWavelengthTransmission = (wlNm: number) => {
    if (fluidSolution === 'yavakshara') {
      // Yavakshara alkaline barley ash: quenches deep red & orange (> 630 nm)
      if (wlNm > 660) return 0.12;
      if (wlNm > 630) return 0.35;
      return 0.96;
    }
    if (fluidSolution === 'kasisa') {
      // Kasisa green vitriol: quenches violet & indigo (< 460 nm)
      if (wlNm < 430) return 0.05;
      if (wlNm < 460) return 0.25;
      return 0.98;
    }
    if (fluidSolution === 'saurastri') {
      // Saurastri alum mix: attenuates yellow/green bands (520-580 nm)
      if (wlNm >= 520 && wlNm <= 580) return 0.28;
      return 0.95;
    }
    if (fluidSolution === 'saffron') {
      // Saffron filters UV and deep violet (< 470 nm)
      if (wlNm < 440) return 0.08;
      if (wlNm < 470) return 0.35;
      return 0.95;
    }
    if (fluidSolution === 'copper') {
      // Copper salts absorb red & crimson (> 615 nm)
      if (wlNm > 670) return 0.05;
      if (wlNm > 615) return 0.25;
      return 0.98;
    }
    // Pure water absorbs NIR but passes 95%+ of visible (380-750 nm)
    return 0.96;
  };

  // Convert wavelength in nm to RGB color
  const wlToRgb = (wl: number, alpha: number = 1.0) => {
    let r = 0, g = 0, b = 0;
    if (wl >= 380 && wl < 440) {
      r = -(wl - 440) / (440 - 380);
      g = 0;
      b = 1;
    } else if (wl >= 440 && wl < 490) {
      r = 0;
      g = (wl - 440) / (490 - 440);
      b = 1;
    } else if (wl >= 490 && wl < 510) {
      r = 0;
      g = 1;
      b = -(wl - 510) / (510 - 490);
    } else if (wl >= 510 && wl < 580) {
      r = (wl - 510) / (580 - 510);
      g = 1;
      b = 0;
    } else if (wl >= 580 && wl < 645) {
      r = 1;
      g = -(wl - 645) / (645 - 580);
      b = 0;
    } else if (wl >= 645 && wl <= 780) {
      r = 1;
      g = 0;
      b = 0;
    }
    const t = getWavelengthTransmission(wl);
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha * t})`;
  };

  // Handle Rotary Dial mouse / touch drag with frame-paced throttling
  const handleRotaryMove = (clientX: number, clientY: number) => {
    if (!rotaryDialRef.current) return;
    const rect = rotaryDialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    let angleRad = Math.atan2(deltaY, deltaX);
    let deg = (angleRad * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;

    // Clamp angle to valid physical prism range (35° to 65°)
    const mapped = 35 + ((deg % 360) / 360) * 30;
    const clamped = Math.max(35, Math.min(65, mapped));
    const rounded = Math.round(clamped * 10) / 10;

    mobileOpticalRenderer.throttleValueChange('rotary_prism_angle', rounded, (val) => {
      onPrismAngleChange(val);
    });
    soundEffects.playRatchetClick(1.0);
  };

  // Render 2D Diffraction Grating Fan on Canvas
  useEffect(() => {
    const canvas = gratingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear background
    ctx.fillStyle = '#08080a';
    ctx.fillRect(0, 0, w, h);

    const gratingX = w * 0.28;
    const gratingY = h * 0.5;
    const gratingHeight = 160;

    // 1. Incoming Beam from Quartz Prism
    const beamStartX = 10;
    const beamStartY = gratingY - Math.tan(incidentAngleRad) * (gratingX - 10);

    const beamGrad = ctx.createLinearGradient(beamStartX, beamStartY, gratingX, gratingY);
    beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
    beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

    ctx.strokeStyle = beamGrad;
    ctx.lineWidth = isCollimated ? 8 : 14;
    ctx.beginPath();
    ctx.moveTo(beamStartX, beamStartY);
    ctx.lineTo(gratingX, gratingY);
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = '10px monospace';
    ctx.fillText(`BEAM FROM QUARTZ PRISM (θi = ${incidentAngleDeg.toFixed(1)}°)`, 15, beamStartY - 12);

    // 2. Diffraction Grating Aperture & Ruled Grooves
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.fillRect(gratingX - 4, gratingY - gratingHeight / 2, 8, gratingHeight);
    ctx.strokeRect(gratingX - 4, gratingY - gratingHeight / 2, 8, gratingHeight);

    // Ruled periodic slits indicator
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    for (let gy = gratingY - gratingHeight / 2 + 6; gy < gratingY + gratingHeight / 2 - 6; gy += 6) {
      ctx.beginPath();
      ctx.moveTo(gratingX - 4, gy);
      ctx.lineTo(gratingX + 4, gy);
      ctx.stroke();
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`GRATING (${gratingDensity} lines/mm)`, gratingX, gratingY - gratingHeight / 2 - 10);
    ctx.fillText(`d = ${gratingSpacingNm.toFixed(1)} nm`, gratingX, gratingY + gratingHeight / 2 + 18);
    ctx.textAlign = 'left';

    // 3. Diffracted Spectral Orders: m = 0, +1, -1, +2, -2
    const screenX = w - 40;
    const screenDist = screenX - gratingX;

    // Draw zero-order central undeviated beam (m = 0)
    // For m = 0: sin(theta_0) = -sin(theta_i) => theta_0 = -theta_i
    const theta0 = -incidentAngleRad;
    const zeroOrderY = gratingY + Math.tan(theta0) * screenDist;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(gratingX, gratingY);
    ctx.lineTo(screenX, zeroOrderY);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(screenX, zeroOrderY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#a8a29e';
    ctx.font = '10px monospace';
    ctx.fillText('Order m=0 (White)', screenX - 110, zeroOrderY - 8);

    // Draw first-order dispersed spectrum (m = +1 and m = -1)
    const orders = [1, -1];
    orders.forEach((m) => {
      // Step across visible wavelength range 380nm to 750nm
      for (let wl = 380; wl <= 750; wl += 5) {
        // Grating equation: sin(theta_m) = m * lambda / d - sin(theta_i)
        const sinTheta = (m * wl) / gratingSpacingNm - Math.sin(incidentAngleRad);

        // Check if diffracted wave exists (within real physical domain |sinθ| <= 1)
        if (Math.abs(sinTheta) <= 0.98) {
          const thetaM = Math.asin(sinTheta);
          const targetY = gratingY + Math.tan(thetaM) * screenDist;

          ctx.strokeStyle = wlToRgb(wl, 0.7);
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(gratingX + 4, gratingY);
          ctx.lineTo(screenX, targetY);
          ctx.stroke();

          // Spot on screen
          ctx.fillStyle = wlToRgb(wl, 0.9);
          ctx.fillRect(screenX - 2, targetY - 1.5, 4, 3);
        }
      }

      // Order label on screen
      const midSin = (m * 550) / gratingSpacingNm - Math.sin(incidentAngleRad);
      if (Math.abs(midSin) <= 0.98) {
        const midY = gratingY + Math.tan(Math.asin(midSin)) * screenDist;
        ctx.fillStyle = '#fde68a';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`Order m=${m > 0 ? '+' + m : m}`, screenX - 95, midY + (m > 0 ? -12 : 20));
      }
    });

    // 4. Highlight Selected Fraunhofer Line on the m = +1 order
    if (selectedFraunhofer) {
      const sinFraunhofer = (1 * selectedFraunhofer.wavelengthNm) / gratingSpacingNm - Math.sin(incidentAngleRad);
      if (Math.abs(sinFraunhofer) <= 0.98) {
        const thetaF = Math.asin(sinFraunhofer);
        const fY = gratingY + Math.tan(thetaF) * screenDist;

        // Dark absorption bar
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(screenX - 6, fY);
        ctx.lineTo(screenX + 6, fY);
        ctx.stroke();

        // Pulsing reticle
        ctx.strokeStyle = selectedFraunhofer.colorHex;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(screenX, fY, 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = selectedFraunhofer.colorHex;
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`Line ${selectedFraunhofer.letter} (${selectedFraunhofer.element.split(' ')[0]})`, screenX - 140, fY + 4);
      }
    }

    // 5. Calibrated Projection Focal Screen along right wall
    ctx.fillStyle = '#1c1917';
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.fillRect(screenX, 20, 14, h - 40);
    ctx.strokeRect(screenX, 20, 14, h - 40);

    // Scale graduation ticks
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1;
    for (let sy = 30; sy < h - 30; sy += 12) {
      ctx.beginPath();
      ctx.moveTo(screenX, sy);
      ctx.lineTo(screenX + 5, sy);
      ctx.stroke();
    }
  }, [quartzPrismAngleDeg, incidentAngleRad, incidentAngleDeg, gratingDensity, gratingSpacingNm, fluidSolution, isCollimated, selectedFraunhofer]);

  // Render Spectral Irradiance Cross-Section on Intensity Canvas
  useEffect(() => {
    const canvas = intensityCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, w, h);

    const padL = 45;
    const padR = 20;
    const padB = 25;
    const padT = 15;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    // Draw Grid & Axes
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, h - padB);
    ctx.lineTo(w - padR, h - padB);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#71717a';
    ctx.font = '9px monospace';
    ctx.fillText('Irradiance I(λ)', padL - 40, padT + 8);
    ctx.textAlign = 'right';
    ctx.fillText('Wavelength λ (nm) →', w - padR, h - padB + 16);
    ctx.textAlign = 'left';

    // Wavelength Ticks
    const wlMin = 380;
    const wlMax = 750;
    [400, 450, 500, 550, 600, 650, 700].forEach((wl) => {
      const x = padL + ((wl - wlMin) / (wlMax - wlMin)) * plotW;
      ctx.strokeStyle = '#27272a';
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, h - padB);
      ctx.stroke();
      ctx.fillStyle = '#71717a';
      ctx.fillText(`${wl}`, x - 10, h - padB + 14);
    });

    // Plot Solar Blackbody Spectrum with Atmospheric & Fraunhofer Troughs
    ctx.beginPath();
    let first = true;

    for (let wl = wlMin; wl <= wlMax; wl += 2) {
      const x = padL + ((wl - wlMin) / (wlMax - wlMin)) * plotW;

      // Planck blackbody curve approximation (peak around 520 nm)
      const planck = Math.exp(-Math.pow((wl - 520) / 140, 2)) * 0.85 + 0.15;
      const trans = getWavelengthTransmission(wl);

      // Fraunhofer absorption dips
      let absorptionDip = 1.0;
      FRAUNHOFER_LINES.forEach((fLine) => {
        const delta = Math.abs(wl - fLine.wavelengthNm);
        if (delta < 4) {
          absorptionDip -= 0.65 * (1 - delta / 4);
        }
      });
      absorptionDip = Math.max(0.12, absorptionDip);

      const intensity = planck * trans * absorptionDip * (isCollimated ? 1.0 : 0.65);
      const y = h - padB - intensity * plotH;

      if (first) {
        ctx.moveTo(x, y);
        first = false;
      } else {
        ctx.lineTo(x, y);
      }
    }

    // Gradient fill under the curve
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Mark current selected wavelength probe
    const probeX = padL + ((selectedWavelengthNm - wlMin) / (wlMax - wlMin)) * plotW;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(probeX, padT);
    ctx.lineTo(probeX, h - padB);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(probeX, padT + 8, 4, 0, Math.PI * 2);
    ctx.fill();
  }, [quartzPrismAngleDeg, fluidSolution, isCollimated, selectedWavelengthNm]);

  const rotaryAngleId = useId();

  return (
    <section className="bg-stone-900 border-2 border-stone-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Component Title & Integration Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-tabular tracking-wider uppercase mb-1.5">
            <span>High-Precision Diffraction Engine</span>
            <span aria-hidden="true">·</span>
            <span>Reacts Live to Quartz Prism (θ={quartzPrismAngleDeg}°)</span>
          </div>
          <h3 className="font-display text-xl md:text-3xl font-bold text-stone-100 tracking-tight">
            Optical Spectrum & Diffraction Grating Matrix
          </h3>
          <p className="text-stone-400 text-xs md:text-sm mt-1 max-w-2xl">
            Couples the Aṁśu Bodhinī quartz dispersion train with modern transmission diffraction mechanics, demonstrating Fraunhofer multi-slit interference, linear grating vs. non-linear prism dispersion, and alchemical solution filtration.
          </p>
        </div>

        {/* Mode Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-stone-950 border border-stone-800 rounded-lg shrink-0">
          <button
            onClick={() => {
              setDispersionComparisonMode('coupled');
              soundEffects.playRatchetClick(1.0);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              dispersionComparisonMode === 'coupled'
                ? 'bg-amber-400 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Coupled Train
          </button>
          <button
            onClick={() => {
              setDispersionComparisonMode('grating-only');
              soundEffects.playRatchetClick(1.0);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              dispersionComparisonMode === 'grating-only'
                ? 'bg-amber-400 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Grating Linear
          </button>
          <button
            onClick={() => {
              setDispersionComparisonMode('prism-only');
              soundEffects.playRatchetClick(1.0);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              dispersionComparisonMode === 'prism-only'
                ? 'bg-amber-400 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Prism Cauchy
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Diffraction Pattern Simulation Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-mono-tabular text-amber-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Diffraction Grating Wave Front & Orders (m = 0, ±1)</span>
              </span>
              <span className="text-xs font-mono-tabular text-stone-400">
                Grating Spacing d = <strong className="text-amber-300">{gratingSpacingNm.toFixed(1)} nm</strong>
              </span>
            </div>

            <canvas
              ref={gratingCanvasRef}
              width={750}
              height={380}
              className="w-full h-auto aspect-16/8 rounded-lg bg-stone-950 border border-stone-900 block"
            />

            {/* Quick Grating Density Segmented Tabs */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-900">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-mono-tabular">Groove Density:</span>
                {[300, 600, 1200].map((density) => (
                  <button
                    key={density}
                    onClick={() => {
                      setGratingDensity(density);
                      soundEffects.playRatchetClick(0.9 + density / 1000);
                    }}
                    className={`px-2.5 py-1 text-xs font-mono-tabular rounded font-medium cursor-pointer transition-colors ${
                      gratingDensity === density
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    {density} lines/mm
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono-tabular text-stone-400">
                Incident Angle: <span className="text-emerald-400 font-semibold">{incidentAngleDeg.toFixed(2)}°</span>
              </div>
            </div>
          </div>

          {/* Real-time Spectral Irradiance Cross-Section Chart */}
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono-tabular text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>Live Spectral Irradiance Curve I(λ) & Fraunhofer Absorption</span>
              </span>
              <span className="text-[11px] text-stone-400 font-mono-tabular">
                Filter: <strong className="text-amber-200">{currentFluid.name}</strong>
              </span>
            </div>

            <canvas
              ref={intensityCanvasRef}
              width={720}
              height={140}
              className="w-full h-auto aspect-16/3 rounded bg-stone-950 border border-stone-900 block"
            />
          </div>
        </div>

        {/* Right: Tactile Quartz Prism Dial & Fluid Valve Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* 1. Rotational Quartz Prism Touch-Ring Gizmo */}
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
              <span className="text-xs font-mono-tabular text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Rotational Quartz Gizmo</span>
              </span>
              <span className="text-xs font-mono-tabular text-stone-400">
                θ = <strong className="text-amber-300">{quartzPrismAngleDeg}°</strong>
              </span>
            </div>

            {/* Tactile Rotary Dial Visual Circle */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div
                ref={rotaryDialRef}
                onMouseDown={() => setIsDraggingRotary(true)}
                onMouseUp={() => setIsDraggingRotary(false)}
                onMouseLeave={() => setIsDraggingRotary(false)}
                onMouseMove={(e) => {
                  if (isDraggingRotary) {
                    handleRotaryMove(e.clientX, e.clientY);
                  }
                }}
                className="w-36 h-36 rounded-full border-4 border-stone-800 bg-stone-900/90 relative flex items-center justify-center shadow-xl cursor-grab active:cursor-grabbing select-none"
              >
                {/* Dial indicator ring */}
                <div
                  className="absolute w-full h-full rounded-full transition-transform duration-75"
                  style={{
                    transform: `rotate(${((quartzPrismAngleDeg - 35) / 30) * 180 - 90}deg)`,
                  }}
                >
                  <div className="w-3.5 h-3.5 bg-amber-400 rounded-full mx-auto -mt-2 shadow-md ring-2 ring-stone-950" />
                </div>

                {/* Inner Quartz Crystal Symbol */}
                <div className="w-20 h-20 rounded-full border border-stone-700 bg-stone-950/80 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-stone-500 font-mono-tabular">QUARTZ</span>
                  <strong className="text-sm font-mono-tabular text-amber-300">{quartzPrismAngleDeg}°</strong>
                  <span className="text-[9px] text-stone-500 font-mono-tabular">{quartzPrismAngleDeg === 48 ? 'MIN DEV' : 'ROTATING'}</span>
                </div>
              </div>

              <div className="w-full mt-3">
                <input
                  id={rotaryAngleId}
                  type="range"
                  min="35"
                  max="65"
                  step="0.5"
                  value={quartzPrismAngleDeg}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    mobileOpticalRenderer.throttleValueChange('slider_prism_angle', val, (v) => {
                      onPrismAngleChange(v);
                    });
                    soundEffects.playRatchetClick(1.0);
                  }}
                  className="w-full accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono-tabular mt-1">
                  <span>35° (Glancing)</span>
                  <span className="text-emerald-400">48° Minimum Deviation</span>
                  <span>65° (TIR Limit)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Fluid Cell Injection Valve (Compound Selection) */}
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="text-xs font-mono-tabular text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                <span>Fluid Solution Injection</span>
              </span>
              <span className="text-[11px] text-stone-400 font-mono-tabular">
                NIR Shield: {currentFluid.nirAbsorbedPct}%
              </span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {FLUID_SOLUTIONS.map((fluid) => {
                const isSelected = fluidSolution === fluid.id;
                return (
                  <button
                    key={fluid.id}
                    onClick={() => {
                      onFluidSolutionChange(fluid.id);
                      soundEffects.playWaterBubble();
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 border-amber-500/80 ring-1 ring-amber-500/30'
                        : 'bg-stone-950 border-stone-800/80 hover:bg-stone-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${isSelected ? 'text-amber-200' : 'text-stone-300'}`}>
                        {fluid.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5 font-mono-tabular">
                      {fluid.chemicalCompound}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1 leading-normal">
                      {fluid.blockedWavelengths}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Interactive Fraunhofer Solar Line Inspector */}
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2">
            <span className="text-xs font-mono-tabular text-amber-400 font-bold uppercase tracking-wider block">
              Fraunhofer Solar Absorption Lines
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FRAUNHOFER_LINES.map((fLine) => {
                const isSelected = selectedFraunhofer?.letter === fLine.letter;
                return (
                  <button
                    key={fLine.letter}
                    onClick={() => {
                      setSelectedFraunhofer(fLine);
                      onWavelengthSelect(Math.round(fLine.wavelengthNm));
                      soundEffects.playPrismChime(fLine.wavelengthNm);
                    }}
                    className={`px-2 py-1 rounded text-xs font-mono-tabular transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    {fLine.letter} ({fLine.wavelengthNm.toFixed(0)}nm)
                  </button>
                );
              })}
            </div>

            {selectedFraunhofer && (
              <div className="mt-2.5 p-3 rounded bg-stone-900/80 border border-stone-800 text-xs space-y-1">
                <div className="flex justify-between font-mono-tabular text-amber-300 font-semibold">
                  <span>Line {selectedFraunhofer.letter} — {selectedFraunhofer.wavelengthNm} nm</span>
                  <span style={{ color: selectedFraunhofer.colorHex }}>●</span>
                </div>
                <div className="text-stone-300 font-medium">
                  {selectedFraunhofer.element}
                </div>
                <div className="text-stone-400 text-[11px] leading-relaxed">
                  {selectedFraunhofer.astrophysicalSource}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Engineering Synthesis: Prism vs. Grating Comparison Bar */}
      <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-amber-400 font-bold uppercase font-mono-tabular block mb-1">
            Prism Dispersion Physics (Cauchy Model)
          </span>
          <p className="text-stone-400 leading-relaxed">
            Refractive index varies non-linearly: <code className="text-amber-200">n(λ) = A + B/λ²</code>. Violet is refracted far more sharply than red, causing cramped dispersion at longer wavelengths.
          </p>
        </div>
        <div>
          <span className="text-sky-400 font-bold uppercase font-mono-tabular block mb-1">
            Diffraction Grating Physics (Fraunhofer Equation)
          </span>
          <p className="text-stone-400 leading-relaxed">
            Diffraction angle varies linearly with wavelength: <code className="text-sky-200">d·(sin θ_m + sin θ_i) = m·λ</code>. Produces uniform nanometer spacing across the entire optical detector.
          </p>
        </div>
      </div>
    </section>
  );
};
