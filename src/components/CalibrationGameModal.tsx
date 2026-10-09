import React, { useState } from 'react';
import { X, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface CalibrationGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySettings?: (lensPos: number, waterDepth: number, prismAngle: number) => void;
}

export const CalibrationGameModal: React.FC<CalibrationGameModalProps> = ({
  isOpen,
  onClose,
  onApplySettings,
}) => {
  // Mini-game parameter states
  const [lensPos, setLensPos] = useState<number>(25); // Target: 48-52 mm
  const [waterDepth, setWaterDepth] = useState<number>(20); // Target: 65-85 %
  const [prismAngle, setPrismAngle] = useState<number>(62); // Target: 47-49 deg

  // Objective checks
  const isCollimated = lensPos >= 48 && lensPos <= 52;
  const isThermalProtected = waterDepth >= 65 && waterDepth <= 85;
  const isMinDeviation = prismAngle >= 47 && prismAngle <= 49;

  const totalScore = (isCollimated ? 35 : 0) + (isThermalProtected ? 35 : 0) + (isMinDeviation ? 30 : 0);
  const isCompleted = totalScore === 100;

  if (!isOpen) return null;

  const handleApply = () => {
    if (onApplySettings) {
      onApplySettings(lensPos, waterDepth, prismAngle);
    }
    soundEffects.playPrismChime(550);
    onClose();
  };

  const handleResetChallenge = () => {
    setLensPos(20);
    setWaterDepth(25);
    setPrismAngle(62);
    soundEffects.playRatchetClick(1.0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-stone-900 border-2 border-stone-700 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <span className="text-xs font-mono-tabular text-amber-400 font-bold uppercase tracking-widest block mb-1">
              Optical Bench Calibration Challenge
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-stone-100">
              Align the Aṁśu Optical Train
            </h3>
          </div>
          <button
            onClick={() => {
              soundEffects.playRatchetClick(0.9);
              onClose();
            }}
            className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close Calibration Challenge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Objectives Progress Bar */}
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-stone-400 font-mono-tabular">Alignment Precision Score:</div>
            <div className="font-display text-2xl font-bold text-amber-300">
              {totalScore} / 100 Points
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted ? (
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 rounded-lg text-xs font-bold flex items-center gap-1.5 font-mono-tabular">
                <Award className="w-4 h-4" />
                <span>BENCH SYNCHRONIZED</span>
              </span>
            ) : (
              <span className="text-xs text-amber-400 font-mono-tabular">
                3 Calibration Dials Remaining
              </span>
            )}
          </div>
        </div>

        {/* 3 Interactive Calibration Sliders */}
        <div className="space-y-5">
          {/* Objective 1: Collimation */}
          <div className={`p-4 rounded-xl border transition-all ${isCollimated ? 'bg-emerald-950/20 border-emerald-600/60' : 'bg-stone-950/60 border-stone-800'}`}>
            <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
              <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                {isCollimated ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-2 h-2 rounded-full bg-amber-400" />}
                <span>Dial 1: Jabākācha Lens Position (Beam Parallelism)</span>
              </span>
              <span className={isCollimated ? 'text-emerald-400 font-bold' : 'text-stone-400 font-bold'}>
                {lensPos} mm ({isCollimated ? 'Target Locked: 50mm' : 'Divergent'})
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={lensPos}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setLensPos(val);
                soundEffects.playRatchetClick(1.0);
                if (val >= 48 && val <= 52) soundEffects.playPrismChime(600);
              }}
              className="w-full accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
            />
            <div className="text-[11px] text-stone-500 mt-1 font-mono-tabular">
              Objective: Slide lens barrel until divergent beam converges into parallel rays (48–52 mm).
            </div>
          </div>

          {/* Objective 2: Liquid Heat Jacket */}
          <div className={`p-4 rounded-xl border transition-all ${isThermalProtected ? 'bg-emerald-950/20 border-emerald-600/60' : 'bg-stone-950/60 border-stone-800'}`}>
            <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
              <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                {isThermalProtected ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-2 h-2 rounded-full bg-sky-400" />}
                <span>Dial 2: Water Vessel Fluid Level (IR Heat Sink)</span>
              </span>
              <span className={isThermalProtected ? 'text-emerald-400 font-bold' : 'text-stone-400 font-bold'}>
                {waterDepth}% ({isThermalProtected ? 'Optimal Cooling' : waterDepth < 65 ? 'Thermal Risk' : 'Overfilled'})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={waterDepth}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setWaterDepth(val);
                soundEffects.playWaterBubble();
              }}
              className="w-full accent-sky-400 bg-stone-800 rounded-lg cursor-pointer h-2"
            />
            <div className="text-[11px] text-stone-500 mt-1 font-mono-tabular">
              Objective: Balance fluid depth between 65%–85% to absorb 98% of thermal infrared without excessive attenuation.
            </div>
          </div>

          {/* Objective 3: Minimum Deviation */}
          <div className={`p-4 rounded-xl border transition-all ${isMinDeviation ? 'bg-emerald-950/20 border-emerald-600/60' : 'bg-stone-950/60 border-stone-800'}`}>
            <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tabular">
              <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                {isMinDeviation ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-2 h-2 rounded-full bg-amber-400" />}
                <span>Dial 3: Sphātika Prism Angle (Minimum Deviation δ_min)</span>
              </span>
              <span className={isMinDeviation ? 'text-emerald-400 font-bold' : 'text-stone-400 font-bold'}>
                {prismAngle}° ({isMinDeviation ? 'δ_min Achieved: 48°' : 'Off-Axis'})
              </span>
            </div>
            <input
              type="range"
              min="35"
              max="65"
              value={prismAngle}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setPrismAngle(val);
                soundEffects.playRatchetClick(1.1);
                if (val >= 47 && val <= 49) soundEffects.playPrismChime(420);
              }}
              className="w-full accent-amber-400 bg-stone-800 rounded-lg cursor-pointer h-2"
            />
            <div className="text-[11px] text-stone-500 mt-1 font-mono-tabular">
              Objective: Rotate quartz crystal prism to the angle of minimum deviation (47°–49°) to resolve sharp Fraunhofer lines.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-800">
          <button
            onClick={handleResetChallenge}
            className="px-3.5 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 bg-stone-950 rounded-lg border border-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Challenge</span>
          </button>

          <button
            onClick={handleApply}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition-colors shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>{isCompleted ? 'Apply Master Calibration' : 'Apply Current Alignment'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
