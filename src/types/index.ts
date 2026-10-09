/**
 * Chamber of Light - Optical Spectrometry Data Types
 */

export interface GraphicNovelPanel {
  id: string;
  chapterNumber: number;
  era: string;
  location: string;
  title: string;
  subtitle: string;
  historicalFigures: string[];
  composition: string;
  lightingAndAtmosphere: string;
  narrativeCaptions: string[];
  dialogueBubbles: Array<{
    speaker: string;
    text: string;
    role: string;
  }>;
  technicalCallouts: Array<{
    term: string;
    definition: string;
    mechanicalSignificance: string;
  }>;
  directorScriptNotes: string;
  soundDesignCue: string;
}

export interface ComparisonRow {
  vector: string;
  pinholeProjection: string;
  classicalSpectrometer: string;
  scientificPrinciple: string;
  engineeringTradeoff: string;
}

export interface TechnicalTermGlossary {
  term: string;
  category: 'Geometric' | 'Wave Optics' | 'Spectrometry' | 'Thermodynamics' | 'Classical Mechanics';
  shortDef: string;
  engineeringExplanation: string;
  formula?: string;
  historicalPioneer: string;
}

export interface PinholeSimulationState {
  diameterMm: number; // 0.1 to 4.0 mm
  focalLengthMm: number; // 50 to 500 mm
  objectDistanceM: number; // 1 to 10 m
  scene: 'pagoda' | 'multicandle' | 'landscape';
  candleCount: number; // 1 to 5
  showRayPencils: boolean;
  showDiffractionDisk: boolean;
  ambientBrightness: number;
}

export type FluidSolutionType = 'water' | 'saffron' | 'copper' | 'yavakshara' | 'kasisa' | 'saurastri';

export interface FluidSolutionInfo {
  id: FluidSolutionType;
  name: string;
  chemicalCompound: string;
  color: string;
  nirAbsorbedPct: number;
  blockedWavelengths: string;
  historicalContext: string;
}

export interface AmsuSpectrometerState {
  sunbeamIntensity: number; // 200 to 1200 W/m^2
  sunbeamAngleDeg: number; // -15 to +15 deg
  jabakachaLensPositionMm: number; // 0 to 100 mm (collimation sweet spot ~50mm)
  waterCellDepthPct: number; // 0 to 100 % (thermal absorption)
  fluidSolution: FluidSolutionType;
  quartzPrismAngleDeg: number; // 30 to 75 deg (minimum deviation around 48 deg)
  selectedWavelengthNm: number; // 380 to 750 nm
  thermalEquilibriumC: number;
  isCollimated: boolean;
  isThermalSafe: boolean;
  gratingDensityLinesPerMm: number; // 300, 600, or 1200 lines/mm
  dispersionMode: 'prism' | 'grating' | 'cross-dispersion';
}

export interface SpectralBandInfo {
  name: string;
  wavelengthMin: number;
  wavelengthMax: number;
  colorHex: string;
  photonEnergyEv: string;
  frequencyThz: string;
  classicalSanskritTerm?: string;
  fraunhoferLine?: string;
}

export type CosmicObservationTarget = 'cosmic-latte' | 'solar-corona' | 'intergalactic-gas' | 'cmb-relic';

export interface CosmicColorSatelliteState {
  target: CosmicObservationTarget;
  orbitAltitudeKm: number; // 400 to 1,500,000 km (LEO to L2 point)
  solarFlareIntensity: number; // 0 to 100%
  fluidCoolant: FluidSolutionType;
  ramanLaserWavelengthNm: number; // 532 nm or 785 nm
  ramanEnabled: boolean;
  boseRadioFrequencyGhz: number; // 1 to 100 GHz (with CMB peak around 60-160 GHz)
  detectorTempKelvin: number; // Cryogenic to thermal
  integratedCosmicColorHex: string; // #FFF8E7 (Cosmic Latte)
  batterySaver: boolean;
}

export interface PracticeTestQuestion {
  id: string;
  questionNumber: number;
  title: string;
  question: string;
  options: {
    key: string;
    text: string;
  }[];
  correctKey: string;
  shortExplanation: string;
  deepPedagogicalAnalysis: string;
  historicalPioneer: string;
  engineeringConcept: string;
}
