import React, { useState, useRef, useEffect, useId } from 'react';
import { PinholeSimulationState } from '../types';
import { soundEffects } from '../utils/audio';
import { Sliders, RotateCcw, Info, Flame } from 'lucide-react';

export const PinholeSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [state, setState] = useState<PinholeSimulationState>({
    diameterMm: 0.45,
    focalLengthMm: 120,
    objectDistanceM: 2.0,
    scene: 'multicandle',
    candleCount: 3,
    showRayPencils: true,
    showDiffractionDisk: true,
    ambientBrightness: 1.0,
  });

  const [activeCandleArray, setActiveCandleArray] = useState<boolean[]>([true, true, true, false, false]);

  // Optical physics calculations
  const lambdaNm = 550; // green solar light
  const lambdaMm = lambdaNm * 1e-6; // 0.00055 mm
  const dOptMm = 1.9 * Math.sqrt(lambdaMm * state.focalLengthMm);
  const bGeoMm = state.diameterMm * (1 + state.focalLengthMm / (state.objectDistanceM * 1000));
  const bDiffMm = (2.44 * lambdaMm * state.focalLengthMm) / state.diameterMm;
  const bTotalMm = Math.sqrt(bGeoMm * bGeoMm + bDiffMm * bDiffMm);
  const illuminanceFluxRelative = Math.pow(state.diameterMm / state.focalLengthMm, 2) * 10000;

  // Toggle individual candle
  const toggleCandle = (idx: number) => {
    const updated = [...activeCandleArray];
    updated[idx] = !updated[idx];
    setActiveCandleArray(updated);
    soundEffects.playShutterClick();
  };

  const handleReset = () => {
    setState({
      diameterMm: Number(dOptMm.toFixed(2)),
      focalLengthMm: 120,
      objectDistanceM: 2.0,
      scene: 'multicandle',
      candleCount: 3,
      showRayPencils: true,
      showDiffractionDisk: true,
      ambientBrightness: 1.0,
    });
    setActiveCandleArray([true, true, true, false, false]);
    soundEffects.playRatchetClick(1.2);
  };

  // Render optical ray simulation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#0c0a09';
    ctx.fillRect(0, 0, width, height);

    const partitionX = width * 0.42;
    const pinholeY = height * 0.5;
    const pinholeHeight = Math.max(3, state.diameterMm * 10);
    const screenX = partitionX + (state.focalLengthMm / 350) * (width * 0.5);

    // Draw Dark Chamber Enclosure
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, 0, partitionX, height); // Exterior
    ctx.fillStyle = '#050505';
    ctx.fillRect(partitionX, 0, width - partitionX, height); // Interior Chamber

    // Partition Wall
    ctx.fillStyle = '#44403c';
    ctx.fillRect(partitionX - 6, 0, 12, pinholeY - pinholeHeight / 2);
    ctx.fillRect(partitionX - 6, pinholeY + pinholeHeight / 2, 12, height - (pinholeY + pinholeHeight / 2));

    // Pinhole opening highlight
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(partitionX - 2, pinholeY - pinholeHeight / 2, 4, pinholeHeight);

    // Projection Screen inside
    ctx.fillStyle = '#e7e5e4';
    ctx.fillRect(screenX - 4, 30, 8, height - 60);

    // Label for Screen
    ctx.fillStyle = '#a8a29e';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`FOCAL SCREEN (f=${state.focalLengthMm}mm)`, screenX, height - 12);
    ctx.fillText('PINHOLE APERTURE', partitionX, 20);

    // Magnification factor M = f / L
    const mag = state.focalLengthMm / (state.objectDistanceM * 100);

    // Render Scene Objects & Crossing Rays
    if (state.scene === 'multicandle') {
      const candleColors = ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#ec4899'];
      const totalCandles = state.candleCount;
      const startY = height * 0.25;
      const spacingY = (height * 0.5) / Math.max(1, totalCandles - 1);
      const candleX = width * 0.12;

      for (let i = 0; i < totalCandles; i++) {
        const cY = totalCandles === 1 ? height * 0.5 : startY + i * spacingY;
        const isActive = activeCandleArray[i];

        // Draw Candle Body outside
        ctx.fillStyle = '#d6d3d1';
        ctx.fillRect(candleX - 6, cY + 8, 12, 40);

        if (isActive) {
          // Flame outside
          ctx.beginPath();
          ctx.ellipse(candleX, cY, 6, 12, 0, 0, Math.PI * 2);
          ctx.fillStyle = candleColors[i % candleColors.length];
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(candleX, cY + 2, 3, 6, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#fef08a';
          ctx.fill();

          // Calculate Inverted Projected Position on Screen
          // Slope from flame through pinhole (partitionX, pinholeY)
          const slope = (pinholeY - cY) / (partitionX - candleX);
          const projectedY = pinholeY + slope * (screenX - partitionX);

          // Draw Ray Pencils if enabled
          if (state.showRayPencils) {
            ctx.strokeStyle = candleColors[i % candleColors.length];
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);

            // Top edge ray
            ctx.beginPath();
            ctx.moveTo(candleX, cY);
            ctx.lineTo(partitionX, pinholeY - pinholeHeight / 2);
            ctx.lineTo(screenX, projectedY - bTotalMm * 4);
            ctx.stroke();

            // Bottom edge ray
            ctx.beginPath();
            ctx.moveTo(candleX, cY);
            ctx.lineTo(partitionX, pinholeY + pinholeHeight / 2);
            ctx.lineTo(screenX, projectedY + bTotalMm * 4);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // Inverted Projected Spot on Screen with Blur calculation
          const spotRadius = Math.max(3, bTotalMm * 6);
          const spotAlpha = Math.min(1.0, 0.2 + illuminanceFluxRelative / 300);

          const grad = ctx.createRadialGradient(screenX, projectedY, 0, screenX, projectedY, spotRadius * 2);
          grad.addColorStop(0, candleColors[i % candleColors.length]);
          grad.addColorStop(0.6, candleColors[i % candleColors.length] + '88');
          grad.addColorStop(1, 'transparent');

          ctx.save();
          ctx.globalAlpha = spotAlpha;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(screenX, projectedY, spotRadius * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Inverted Indicator Label
          ctx.fillStyle = candleColors[i % candleColors.length];
          ctx.font = '10px monospace';
          ctx.fillText(`Spot ${i + 1} (Inverted)`, screenX + 16, projectedY + 4);
        } else {
          // Extinguished flame
          ctx.fillStyle = '#57534e';
          ctx.fillRect(candleX - 2, cY - 2, 4, 8);
        }
      }
    } else if (state.scene === 'pagoda') {
      // Mozi Pagoda Scene
      const pagodaX = width * 0.14;
      const pagodaY = height * 0.45;
      const pagodaH = 140;

      // Draw Exterior Pagoda
      ctx.fillStyle = '#b45309';
      // Base
      ctx.fillRect(pagodaX - 25, pagodaY + 40, 50, 40);
      // Tiers
      ctx.beginPath();
      ctx.moveTo(pagodaX, pagodaY - 40);
      ctx.lineTo(pagodaX - 35, pagodaY + 40);
      ctx.lineTo(pagodaX + 35, pagodaY + 40);
      ctx.closePath();
      ctx.fill();

      // Top Peak Ray (x=pagodaX, y=pagodaY-40)
      const peakY = pagodaY - 40;
      const baseY = pagodaY + 70;

      const slopePeak = (pinholeY - peakY) / (partitionX - pagodaX);
      const projPeakY = pinholeY + slopePeak * (screenX - partitionX);

      const slopeBase = (pinholeY - baseY) / (partitionX - pagodaX);
      const projBaseY = pinholeY + slopeBase * (screenX - partitionX);

      if (state.showRayPencils) {
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(pagodaX, peakY);
        ctx.lineTo(partitionX, pinholeY);
        ctx.lineTo(screenX, projPeakY);
        ctx.stroke();

        ctx.strokeStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(pagodaX, baseY);
        ctx.lineTo(partitionX, pinholeY);
        ctx.lineTo(screenX, projBaseY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Inverted Pagoda Image on Screen (with blur scale)
      const blurPx = Math.max(1, bTotalMm * 4);
      ctx.save();
      ctx.filter = `blur(${blurPx}px)`;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      // Inverted triangle
      ctx.moveTo(screenX, projPeakY);
      ctx.lineTo(screenX - 20 * mag, projBaseY);
      ctx.lineTo(screenX + 20 * mag, projBaseY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = '#fef08a';
      ctx.font = '10px monospace';
      ctx.fillText('Pagoda Peak (Inverted)', screenX + 16, projPeakY + 4);
      ctx.fillText('Pagoda Base', screenX + 16, projBaseY + 4);
    } else {
      // Landscape (Sun & Tree)
      const sunX = width * 0.12;
      const sunY = height * 0.3;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 20, 0, Math.PI * 2);
      ctx.fill();

      const slopeSun = (pinholeY - sunY) / (partitionX - sunX);
      const projSunY = pinholeY + slopeSun * (screenX - partitionX);

      if (state.showRayPencils) {
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(partitionX, pinholeY);
        ctx.lineTo(screenX, projSunY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      const blurPx = Math.max(1, bTotalMm * 5);
      ctx.save();
      ctx.filter = `blur(${blurPx}px)`;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(screenX, projSunY, 15 * mag, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, [state, activeCandleArray, bTotalMm, illuminanceFluxRelative]);

  // Render Blur Curve Graph on Chart Canvas
  useEffect(() => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = '#141210';
    ctx.fillRect(0, 0, w, h);

    // Padding
    const padX = 40;
    const padY = 25;
    const graphW = w - padX * 2;
    const graphH = h - padY * 2;

    // Draw Axes
    ctx.strokeStyle = '#44403c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, padY);
    ctx.lineTo(padX, h - padY);
    ctx.lineTo(w - padX, h - padY);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#a8a29e';
    ctx.font = '10px monospace';
    ctx.fillText('Spot Blur (mm)', padX - 5, padY - 8);
    ctx.textAlign = 'right';
    ctx.fillText('Aperture d (mm) →', w - padX, h - padY + 18);

    // Plot Curves for d from 0.1mm to 2.5mm
    const maxD = 2.5;
    const maxBlur = 2.5;

    // Helper map
    const mapX = (dVal: number) => padX + (dVal / maxD) * graphW;
    const mapY = (bVal: number) => h - padY - (Math.min(bVal, maxBlur) / maxBlur) * graphH;

    // Curve 1: Geometric Blur B_geo = d (Dotted blue)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    for (let d = 0.05; d <= maxD; d += 0.05) {
      const bG = d;
      const x = mapX(d);
      const y = mapY(bG);
      if (d === 0.05) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Curve 2: Diffraction Airy Disk B_diff = 2.44 * lambda * f / d (Dotted red)
    ctx.strokeStyle = '#f87171';
    ctx.beginPath();
    for (let d = 0.08; d <= maxD; d += 0.03) {
      const bD = (2.44 * lambdaMm * state.focalLengthMm) / d;
      const x = mapX(d);
      const y = mapY(bD);
      if (d === 0.08) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Curve 3: Total Blur B_total = sqrt(B_geo^2 + B_diff^2) (Solid Golden)
    ctx.setLineDash([]);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let d = 0.08; d <= maxD; d += 0.03) {
      const bG = d;
      const bD = (2.44 * lambdaMm * state.focalLengthMm) / d;
      const bT = Math.sqrt(bG * bG + bD * bD);
      const x = mapX(d);
      const y = mapY(bT);
      if (d === 0.08) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Optimum Rayleigh Point
    const optX = mapX(dOptMm);
    const optY = mapY(Math.sqrt(dOptMm * dOptMm + Math.pow((2.44 * lambdaMm * state.focalLengthMm) / dOptMm, 2)));
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(optX, optY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw Current Position Indicator
    const curX = mapX(Math.min(state.diameterMm, maxD));
    const curY = mapY(bTotalMm);
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(curX, curY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }, [state.diameterMm, state.focalLengthMm, bTotalMm, dOptMm, lambdaMm]);

  const diameterId = useId();
  const focalLengthId = useId();
  const candleCountId = useId();

  return (
    <section id="pinhole-obscura" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-tabular tracking-wider uppercase mb-2">
            <span>Experiment 1 · Classical Mechanics</span>
            <span aria-hidden="true">·</span>
            <span>Mozi (400 BCE) & Ibn al-Haytham (1010 CE)</span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-stone-100 tracking-tight">
            The Pinhole Camera Obscura Sandbox
          </h2>
          <p className="text-stone-400 text-sm md:text-base mt-1 max-w-3xl">
            Explore rectilinear propagation, ray crossing inversion, and the mathematical struggle between Rayleigh diffraction and geometric blur.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-medium rounded-lg border border-stone-700 transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Rayleigh Optimum</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Canvas Viewport (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-stone-900 border-2 border-stone-800 rounded-xl overflow-hidden shadow-xl p-3 relative">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-mono-tabular text-amber-300 font-semibold uppercase tracking-wider">
                Ray Tracing & Inverted Focal Plane (Cross-Section)
              </span>
              <span className="text-xs text-stone-400 font-mono-tabular">
                Status: {Math.abs(state.diameterMm - dOptMm) < 0.1 ? '✓ Optimum Focus' : state.diameterMm > dOptMm ? 'Geometric Blur' : 'Diffraction Airy Limit'}
              </span>
            </div>

            <canvas
              ref={canvasRef}
              width={700}
              height={420}
              className="w-full h-auto aspect-16/10 rounded-lg border border-stone-950 bg-stone-950 block"
            />

            {/* Scene Selector Segmented Control */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800/80">
              <div className="flex items-center gap-1 p-1 bg-stone-950 rounded-lg border border-stone-800">
                <button
                  onClick={() => {
                    setState((s) => ({ ...s, scene: 'multicandle' }));
                    soundEffects.playRatchetClick(1.0);
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    state.scene === 'multicandle'
                      ? 'bg-amber-400 text-stone-950 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Ibn al-Haytham Candles
                </button>
                <button
                  onClick={() => {
                    setState((s) => ({ ...s, scene: 'pagoda' }));
                    soundEffects.playRatchetClick(1.0);
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    state.scene === 'pagoda'
                      ? 'bg-amber-400 text-stone-950 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Mozi Pagoda & Silk
                </button>
                <button
                  onClick={() => {
                    setState((s) => ({ ...s, scene: 'landscape' }));
                    soundEffects.playRatchetClick(1.0);
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    state.scene === 'landscape'
                      ? 'bg-amber-400 text-stone-950 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Sun Horizon
                </button>
              </div>

              {state.scene === 'multicandle' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-stone-400 font-mono-tabular">Flames:</span>
                  {activeCandleArray.slice(0, state.candleCount).map((active, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleCandle(idx)}
                      className={`p-1.5 rounded transition-all cursor-pointer ${
                        active
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                          : 'bg-stone-800 text-stone-600 border border-stone-700'
                      }`}
                      title={`Toggle Candle #${idx + 1}`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mathematical Rayleigh Curve Chart */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono-tabular text-amber-300 font-bold uppercase tracking-wider">
                Rayleigh-Petzval Optimization Curve
              </span>
              <div className="flex items-center gap-3 text-[11px] font-mono-tabular">
                <span className="text-amber-400">● Total Spot Blur</span>
                <span className="text-sky-400">┄ Geometric (d)</span>
                <span className="text-red-400">┄ Wave (2.44λf/d)</span>
              </div>
            </div>

            <canvas
              ref={chartCanvasRef}
              width={650}
              height={160}
              className="w-full h-auto aspect-16/4 rounded bg-stone-950 border border-stone-800"
            />

            <div className="mt-2 text-[11px] text-stone-400 flex items-center justify-between font-mono-tabular">
              <span>Rayleigh Optimum: d ≈ 1.9√(λf) = <strong className="text-emerald-400">{dOptMm.toFixed(2)} mm</strong></span>
              <span>Current Spot Blur: <strong className="text-amber-300">{bTotalMm.toFixed(2)} mm</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Optical Parameter Controls Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="font-display text-base font-bold text-amber-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Optical Controls</span>
              </span>
              <span className="text-xs font-mono-tabular text-stone-500">
                λ = 550 nm
              </span>
            </div>

            {/* Slider 1: Pinhole Diameter d */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
                <label htmlFor={diameterId} className="text-stone-300 font-semibold cursor-pointer">
                  Aperture Diameter (d)
                </label>
                <span className="text-amber-400 font-bold">{state.diameterMm.toFixed(2)} mm</span>
              </div>
              <input
                id={diameterId}
                type="range"
                min="0.10"
                max="3.00"
                step="0.05"
                value={state.diameterMm}
                onChange={(e) => {
                  setState((s) => ({ ...s, diameterMm: parseFloat(e.target.value) }));
                  soundEffects.playRatchetClick(1.0);
                }}
                className="w-full accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1 font-mono-tabular">
                <span>0.10 mm (Diffraction)</span>
                <span className="text-emerald-400 font-medium">Optimum: {dOptMm.toFixed(2)} mm</span>
                <span>3.00 mm (Geometric)</span>
              </div>
            </div>

            {/* Slider 2: Focal Distance f */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
                <label htmlFor={focalLengthId} className="text-stone-300 font-semibold cursor-pointer">
                  Focal Chamber Length (f)
                </label>
                <span className="text-amber-400 font-bold">{state.focalLengthMm} mm</span>
              </div>
              <input
                id={focalLengthId}
                type="range"
                min="50"
                max="320"
                step="5"
                value={state.focalLengthMm}
                onChange={(e) => {
                  setState((s) => ({ ...s, focalLengthMm: parseInt(e.target.value, 10) }));
                  soundEffects.playRatchetClick(1.1);
                }}
                className="w-full accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1 font-mono-tabular">
                <span>50 mm (Wide Angle)</span>
                <span>320 mm (Telephoto Zoom)</span>
              </div>
            </div>

            {/* Candle count slider if in multicandle mode */}
            {state.scene === 'multicandle' && (
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
                  <label htmlFor={candleCountId} className="text-stone-300 font-semibold cursor-pointer">
                    External Candles (Ibn al-Haytham Rig)
                  </label>
                  <span className="text-amber-400 font-bold">{state.candleCount} Candles</span>
                </div>
                <input
                  id={candleCountId}
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={state.candleCount}
                  onChange={(e) => {
                    setState((s) => ({ ...s, candleCount: parseInt(e.target.value, 10) }));
                    soundEffects.playRatchetClick(0.9);
                  }}
                  className="w-full accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
                />
              </div>
            )}

            {/* Toggle Ray Pencils */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-800">
              <span className="text-xs text-stone-300">Show Ray Crossing Geometry:</span>
              <button
                onClick={() => {
                  setState((s) => ({ ...s, showRayPencils: !s.showRayPencils }));
                  soundEffects.playRatchetClick(1.0);
                }}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                  state.showRayPencils
                    ? 'bg-amber-400 text-stone-950 font-semibold'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                {state.showRayPencils ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Real-time Computed Physical Metrics */}
            <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2.5 font-mono-tabular text-xs">
              <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px] mb-1">
                Real-Time Optical Invariants
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Geometric Blur ($B_g$):</span>
                <span className="text-stone-200">{bGeoMm.toFixed(3)} mm</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Airy Diffraction Disk ($B_d$):</span>
                <span className="text-stone-200">{bDiffMm.toFixed(3)} mm</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Total Spot Diameter:</span>
                <span className="text-amber-300 font-bold">{bTotalMm.toFixed(3)} mm</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Effective Illuminance Flux:</span>
                <span className="text-stone-200">{illuminanceFluxRelative.toFixed(1)} lux rel.</span>
              </div>
            </div>
          </div>

          {/* Educational Callout Box */}
          <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-5">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-2 font-mono-tabular">
              <Info className="w-4 h-4" />
              <span>Mozi & Ibn al-Haytham’s Classical Principle</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              When light from separate candles passes through the identical aperture, each ray trajectory continues undisturbed along its geometric line. Intersecting rays in linear media do not scatter or merge—proving intromission and rectilinear propagation without requiring glass lenses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
