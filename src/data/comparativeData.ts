import { ComparisonRow, SpectralBandInfo, FluidSolutionInfo, TechnicalTermGlossary } from '../types';

export interface FraunhoferLineData {
  letter: string;
  element: string;
  wavelengthNm: number;
  colorHex: string;
  astrophysicalSource: string;
}

export const TECHNICAL_TERMS_GLOSSARY: Record<string, TechnicalTermGlossary> = {
  'Rectilinear Propagation': {
    term: 'Rectilinear Propagation',
    category: 'Geometric',
    shortDef: 'Light travels in straight lines within an isotropic, homogeneous medium.',
    engineeringExplanation:
      'Because light does not bend on its own in uniform air, optical paths can be modeled as straight geometric rays. First rigorously documented by Mozi in 400 BCE and mathematically formulated in Ibn al-Haytham’s Kitab al-Manazir.',
    formula: 'k × r = 0  (straight wavevector)',
    historicalPioneer: 'Mozi (400 BCE) & Ibn al-Haytham (1010 CE)',
  },
  'Spectral Dispersion': {
    term: 'Spectral Dispersion',
    category: 'Spectrometry',
    shortDef: 'Wavelength-dependent angular refraction (dn/dλ) that separates white light into its spectral colors.',
    engineeringExplanation:
      'In dispersive dielectric media like quartz or glass, shorter wavelengths (violet) travel at lower phase velocities than longer wavelengths (red), experiencing a higher refractive index and bending more sharply.',
    formula: 'n(λ) = A + B/λ² (Cauchy) ; dθ/dλ = (dn/dλ) · (dθ/dn)',
    historicalPioneer: 'Aṁśu Bodhinī Tradition & Sir Isaac Newton (1666)',
  },
  'Pinhole Diffraction': {
    term: 'Pinhole Diffraction',
    category: 'Wave Optics',
    shortDef: 'Wave bending and interference around the perimeter of sub-millimeter apertures.',
    engineeringExplanation:
      'When pinhole aperture diameter d approaches the wavelength scale, light spreads into an Airy disc pattern of diameter 2.44λf/d rather than projecting a sharp geometric point.',
    formula: 'B_diff = 2.44 · λ · f / d',
    historicalPioneer: 'Lord Rayleigh & Joseph von Fraunhofer',
  },
  'Collimation': {
    term: 'Collimation',
    category: 'Geometric',
    shortDef: 'Aligning divergent rays into a strictly parallel, non-diverging optical beam.',
    engineeringExplanation:
      'Conducted via the Jabākācha lens barrel in classical optics. Ensures every ray strikes subsequent dispersion elements (prisms or gratings) at the exact same angle of incidence θ_i.',
    formula: 'f_lens = d_source  (parallel planar wavefronts)',
    historicalPioneer: 'Maharishi Bharadwaja Tradition (Jabākācha)',
  },
  'Dual-Stage Liquid Filtering': {
    term: 'Dual-Stage Liquid Filtering',
    category: 'Thermodynamics',
    shortDef: 'Using a liquid water or mineral cell to absorb near-infrared heat prior to crystal dispersion.',
    engineeringExplanation:
      'Over 50% of direct solar energy is thermal infrared (> 800 nm). The fluid jacket attenuates up to 98% of this thermal load while transmitting 95%+ of visible light, protecting quartz from thermal shock cleavage and temperature-induced refractive drift (dn/dT).',
    formula: 'I(λ) = I_0(λ) · exp(-α_liquid(λ) · L)',
    historicalPioneer: 'Aṁśu Bodhinī & Rasa-Shastra Metallurgists',
  },
  'Crystalline Quartz': {
    term: 'Crystalline Quartz (Sphātika)',
    category: 'Spectrometry',
    shortDef: 'Pure crystalline silicon dioxide (SiO₂) used for high-clarity optical dispersion.',
    engineeringExplanation:
      'Unlike antique iron-rich green bottle glass, pure quartz crystal provides broad ultraviolet-to-infrared transparency (190 nm to 2500 nm) and superior dispersion stability without internal chromatic bubbles.',
    formula: 'n_e = 1.553, n_o = 1.544  (uniaxial quartz)',
    historicalPioneer: 'Classical Indian Vedic Mineral Crafts',
  },
  'Rayleigh-Petzval Paradox': {
    term: 'Rayleigh-Petzval Paradox',
    category: 'Wave Optics',
    shortDef: 'The fundamental engineering conflict between geometric blur and wave diffraction blur in pinholes.',
    engineeringExplanation:
      'Enlarging a pinhole increases geometric blur circles (B_geo ≈ d); shrinking it increases diffraction disc diameter (B_diff ∝ 1/d). The optimal aperture occurs at their exact intersection: d_opt ≈ 1.9√(λf).',
    formula: 'd_opt ≈ 1.9 · √(λ · f)',
    historicalPioneer: 'Lord Rayleigh (1891)',
  },
  'Fraunhofer Absorption Lines': {
    term: 'Fraunhofer Absorption Lines',
    category: 'Spectrometry',
    shortDef: 'Dark spectral gaps caused by resonant atomic absorption in the solar photosphere.',
    engineeringExplanation:
      'Cold elemental gases in the sun’s outer envelope absorb specific discrete photons emitted by the hotter core, producing characteristic dark absorption barcodes (e.g. Sodium D-lines at 589 nm, Hydrogen Balmer lines).',
    formula: 'ΔE = h · ν = h · c / λ',
    historicalPioneer: 'Joseph von Fraunhofer (1814)',
  },
  'Cross-Dispersion': {
    term: 'Cross-Dispersion (Prism + Grating)',
    category: 'Spectrometry',
    shortDef: 'Combining prism refraction with orthogonal diffraction grating orders to produce 2D spectral matrices.',
    engineeringExplanation:
      'Separates overlapping higher diffraction orders (m = 1, 2, 3...) along an orthogonal axis, providing extremely high chromatic resolving power R = λ/Δλ > 50,000 in compact dimensions.',
    formula: 'R = m · N_grooves',
    historicalPioneer: 'Modern Astrophysical Spectrographs',
  },
};

export const FRAUNHOFER_LINES: FraunhoferLineData[] = [
  { letter: 'K', element: 'Ca II (Ionized Calcium)', wavelengthNm: 393.4, colorHex: '#7c3aed', astrophysicalSource: 'Solar Chromosphere resonance' },
  { letter: 'H', element: 'Ca II (Ionized Calcium)', wavelengthNm: 396.8, colorHex: '#8b5cf6', astrophysicalSource: 'Solar Chromosphere resonance' },
  { letter: 'G', element: 'CH Molecular Band + Fe', wavelengthNm: 430.8, colorHex: '#6366f1', astrophysicalSource: 'Solar Photosphere hydrocarbon band' },
  { letter: 'F', element: 'Hβ (Hydrogen Beta)', wavelengthNm: 486.1, colorHex: '#06b6d4', astrophysicalSource: 'Balmer atomic hydrogen transition (n=4 to 2)' },
  { letter: 'b₁', element: 'Mg (Magnesium)', wavelengthNm: 516.7, colorHex: '#10b981', astrophysicalSource: 'Photospheric neutral magnesium triplet' },
  { letter: 'b₂', element: 'Mg (Magnesium)', wavelengthNm: 517.3, colorHex: '#10b981', astrophysicalSource: 'Photospheric neutral magnesium triplet' },
  { letter: 'b₄', element: 'Mg (Magnesium)', wavelengthNm: 518.4, colorHex: '#22c55e', astrophysicalSource: 'Photospheric neutral magnesium triplet' },
  { letter: 'E', element: 'Fe (Neutral Iron)', wavelengthNm: 527.0, colorHex: '#84cc16', astrophysicalSource: 'Photospheric atomic iron vapor' },
  { letter: 'D₂', element: 'Na (Sodium Doublet)', wavelengthNm: 589.0, colorHex: '#eab308', astrophysicalSource: 'Fraunhofer sodium resonance doublet' },
  { letter: 'D₁', element: 'Na (Sodium Doublet)', wavelengthNm: 589.6, colorHex: '#eab308', astrophysicalSource: 'Fraunhofer sodium resonance doublet' },
  { letter: 'C', element: 'Hα (Hydrogen Alpha)', wavelengthNm: 656.3, colorHex: '#ef4444', astrophysicalSource: 'Balmer atomic hydrogen transition (n=3 to 2)' },
  { letter: 'B', element: 'O₂ (Terrestrial Oxygen)', wavelengthNm: 686.7, colorHex: '#dc2626', astrophysicalSource: 'Earth atmospheric molecular absorption telluric band' },
  { letter: 'A', element: 'O₂ (Terrestrial Oxygen)', wavelengthNm: 759.4, colorHex: '#991b1b', astrophysicalSource: 'Earth atmospheric molecular telluric head' },
];

export const FLUID_SOLUTIONS: FluidSolutionInfo[] = [
  {
    id: 'water',
    name: 'Shuddha Jala (Pure Water)',
    chemicalCompound: 'Distilled H₂O Liquid Jacket',
    color: 'rgba(56, 189, 248, 0.4)',
    nirAbsorbedPct: 92,
    blockedWavelengths: 'Absorbs NIR > 850 nm; transmits 95%+ visible (380-750 nm)',
    historicalContext: 'Traditional neutral cooling medium described in Aṁśu Bodhinī to prevent thermal shock in pure Sphātika crystal.',
  },
  {
    id: 'yavakshara',
    name: 'Yavakshāra Sol. (Potassium Ash)',
    chemicalCompound: 'Potassium Carbonate / Alkaline Barley Ash Solution',
    color: 'rgba(220, 190, 100, 0.45)',
    nirAbsorbedPct: 96,
    blockedWavelengths: 'Alkaline ash filter; quenches deep red & orange wavelengths (> 630 nm)',
    historicalContext: 'Prepared from barley stalks (Yava) in Rasa-shastra to produce a transparent alkaline heat sink.',
  },
  {
    id: 'kasisa',
    name: 'Kāsīsa Sol. (Green Vitriol)',
    chemicalCompound: 'Classical Ferrous Sulphate (FeSO₄·7H₂O) Mineral Bath',
    color: 'rgba(16, 185, 129, 0.45)',
    nirAbsorbedPct: 99,
    blockedWavelengths: 'Iron-based salt solution; quenches violet and indigo bands (< 460 nm)',
    historicalContext: 'Ancient green vitriol used to suppress high-energy actinic scatter before quartz dispersion.',
  },
  {
    id: 'saurastri',
    name: 'Saurāṣṭrī Mix (Alum Crystal)',
    chemicalCompound: 'Purified Potash Alum KAl(SO₄)₂·12H₂O Matrix',
    color: 'rgba(236, 72, 153, 0.35)',
    nirAbsorbedPct: 94,
    blockedWavelengths: 'Mineral alum mix; selectively attenuates yellow and green bands (520-580 nm)',
    historicalContext: 'Clay-derived crystalline alum from Saurashtra used for clear multi-layer thermal stabilization.',
  },
  {
    id: 'saffron',
    name: 'Saffron / Herbal Infusion',
    chemicalCompound: 'Crocin / Carotenoid Natural Dye Matrix',
    color: 'rgba(245, 158, 11, 0.45)',
    nirAbsorbedPct: 95,
    blockedWavelengths: 'Filters out high-energy UV & violet (< 470 nm); isolates yellow, orange, and crimson bands',
    historicalContext: 'Ayurvedic & Rasa-shastra herbal infusion used for selective long-pass solar energy filtration.',
  },
  {
    id: 'copper',
    name: 'Copper Salts / Tuttha',
    chemicalCompound: 'Dilute Cupric Sulphate CuSO₄·5H₂O',
    color: 'rgba(6, 182, 212, 0.45)',
    nirAbsorbedPct: 98,
    blockedWavelengths: 'Strongly absorbs red and thermal crimson (> 620 nm); isolates blue and emerald rays',
    historicalContext: 'Classical alchemical solution known as Tuttha / Blue Vitriol, acting as a potent short-pass visible filter.',
  },
];

export const COMPARISON_MATRIX: ComparisonRow[] = [
  {
    vector: 'Primary Optical Phenomenon',
    pinholeProjection: 'Rectilinear Propagation & Geometric Crossing Rays (Pinhole Diffraction limits at small apertures).',
    classicalSpectrometer: 'Spectral Angular Dispersion via Wavelength-Dependent Refraction (dn/dλ) in crystalline quartz.',
    scientificPrinciple: 'Straight-line photon trajectory vs. Phase velocity variation in dispersive dielectric media.',
    engineeringTradeoff: 'Image sharpness vs. Illuminance flux (pinhole) vs. Angular resolution vs. Light throughput (slit-prism).',
  },
  {
    vector: 'Mechanical Isolation Method',
    pinholeProjection: 'Sub-millimeter circular aperture in opaque foil or cedar timber barrier (single ray constriction).',
    classicalSpectrometer: 'Collimating brass barrel (Jabākācha) + narrow entrance slit + thermal liquid cell stage.',
    scientificPrinciple: 'Spatial spatial-filter aperture vs. Phase collimation and thermal energy attenuation.',
    engineeringTradeoff: 'Simplicity with no moving components vs. High mechanical alignment sensitivity and thermal management.',
  },
  {
    vector: 'Medium of Refraction / Transmission',
    pinholeProjection: 'None (vacuum / ambient air transmission only; zero glass absorption or chromatic dispersion).',
    classicalSpectrometer: 'Dual-phase optical train: High-purity water cell (liquid H₂O) followed by crystalline quartz prism (Sphātika).',
    scientificPrinciple: 'Homogeneous medium without dielectric boundary vs. Multi-interface Snell refraction and selective IR absorption.',
    engineeringTradeoff: 'Zero chromatic aberration but extremely dim vs. High spectral fidelity requiring pure quartz and thermal cooling.',
  },
  {
    vector: 'Core Target of Information',
    pinholeProjection: 'Spatial 2D Geometrical Image of the external landscape or light source positions (Inverted Projection).',
    classicalSpectrometer: 'Internal Energy & Spectral Distribution Profile I(λ) of the light source (Discarding spatial geometry).',
    scientificPrinciple: 'Spatial transformation (x, y) → (-x\', -y\') vs. Spectral decomposition I(x, y, λ) → I(λ).',
    engineeringTradeoff: 'Preserves object shapes but masks spectral composition vs. Sacrifices visual shapes to reveal elemental signatures.',
  },
  {
    vector: 'Scientific Limitation vs. Engineering Trade-Off',
    pinholeProjection: 'The Rayleigh-Petzval Paradox: Enlarging pinhole increases light but blurs geometrically; shrinking pinhole sharpens rays until wave diffraction dominates and destroys contrast.',
    classicalSpectrometer: 'Thermal Lensing & Quartz Fracture: Concentrating intense raw solar radiation superheats crystals, causing thermal stress cracking and temperature-dependent index shifts (dn/dT). Resolved via water jacket.',
    scientificPrinciple: 'Airy disk diffraction limit vs. Thermal absorption spectrum of water vs. optical quartz dispersion.',
    engineeringTradeoff: 'Fundamentally limited by flux-to-resolution ratio vs. Requires pristine crystal cutting, collimation alignment, and fluid maintenance.',
  },
];

export const SPECTRAL_BANDS: SpectralBandInfo[] = [
  {
    name: 'Infrared (Thermal)',
    wavelengthMin: 750,
    wavelengthMax: 1200,
    colorHex: '#991b1b',
    photonEnergyEv: '1.24 - 1.65 eV',
    frequencyThz: '250 - 400 THz',
    classicalSanskritTerm: 'Ushna / Tapana Raśmi (Heat Rays)',
    fraunhoferLine: 'Water vapor absorption bands (A, B bands ~687-760 nm)',
  },
  {
    name: 'Red',
    wavelengthMin: 625,
    wavelengthMax: 740,
    colorHex: '#ef4444',
    photonEnergyEv: '1.68 - 1.98 eV',
    frequencyThz: '405 - 480 THz',
    classicalSanskritTerm: 'Lohita (Crimson / Flame)',
    fraunhoferLine: 'C-line (Hydrogen Alpha, 656.3 nm)',
  },
  {
    name: 'Orange',
    wavelengthMin: 590,
    wavelengthMax: 625,
    colorHex: '#f97316',
    photonEnergyEv: '1.98 - 2.10 eV',
    frequencyThz: '480 - 510 THz',
    classicalSanskritTerm: 'Pingala (Amber / Tawny)',
    fraunhoferLine: 'D-lines (Sodium doublet, 589.0 & 589.6 nm)',
  },
  {
    name: 'Yellow',
    wavelengthMin: 565,
    wavelengthMax: 590,
    colorHex: '#eab308',
    photonEnergyEv: '2.10 - 2.19 eV',
    frequencyThz: '510 - 530 THz',
    classicalSanskritTerm: 'Pīta (Golden Solar)',
    fraunhoferLine: 'E-line (Iron Fe, 527.0 nm)',
  },
  {
    name: 'Green',
    wavelengthMin: 500,
    wavelengthMax: 565,
    colorHex: '#22c55e',
    photonEnergyEv: '2.19 - 2.48 eV',
    frequencyThz: '530 - 600 THz',
    classicalSanskritTerm: 'Harita (Emerald Vegetation)',
    fraunhoferLine: 'b-lines (Magnesium triplet, 516.7 - 518.4 nm)',
  },
  {
    name: 'Cyan / Blue',
    wavelengthMin: 450,
    wavelengthMax: 500,
    colorHex: '#06b6d4',
    photonEnergyEv: '2.48 - 2.75 eV',
    frequencyThz: '600 - 665 THz',
    classicalSanskritTerm: 'Nīla (Sky & Deep Water)',
    fraunhoferLine: 'F-line (Hydrogen Beta, 486.1 nm)',
  },
  {
    name: 'Indigo / Violet',
    wavelengthMin: 380,
    wavelengthMax: 450,
    colorHex: '#8b5cf6',
    photonEnergyEv: '2.75 - 3.26 eV',
    frequencyThz: '665 - 790 THz',
    classicalSanskritTerm: 'Dhumra / Jambu (Deep Amethyst)',
    fraunhoferLine: 'G & H lines (Calcium Ca II, 396.8 & 393.4 nm)',
  },
  {
    name: 'Ultraviolet (Chemical)',
    wavelengthMin: 300,
    wavelengthMax: 380,
    colorHex: '#6366f1',
    photonEnergyEv: '3.26 - 4.13 eV',
    frequencyThz: '790 - 1000 THz',
    classicalSanskritTerm: 'Guhya Raśmi (Invisible Active Rays)',
    fraunhoferLine: 'K-line (Solar Calcium Resonance, 393.4 nm)',
  },
];

export const TECHNICAL_DEEP_DIVES = {
  pinholeOptimization: {
    title: 'The Pinhole Optimization Paradox',
    subtitle: 'Rayleigh Diffraction vs. Geometric Ray Overlap',
    formula: 'd_{opt} \\approx 1.9 \\sqrt{\\lambda \\cdot f}',
    summary:
      'A pinhole camera operates without glass refraction, but faces two antagonistic wave-particle phenomena that fight each other as aperture diameter d is varied.',
    points: [
      {
        heading: 'Geometric Blur Circle (d too large)',
        detail:
          'When the aperture is large (e.g. d > 2 mm), rays radiating from a single object point do not converge to a point; they cast a geometric disc of diameter B_geo ≈ d on the screen. Adjacent points bleed into overlapping discs, causing catastrophic geometric blur.',
      },
      {
        heading: 'Fraunhofer Diffraction Airy Disk (d too small)',
        detail:
          'When the aperture is made exceedingly small (e.g. d < 0.2 mm) to sharpen rays, light wave nature dominates. The aperture acts as a circular diffracting slit, spreading the wave into an Airy diffraction pattern of diameter B_diff ≈ 2.44 λ f / d. Shrinking d further ironically makes the spot larger and drastically reduces light intensity (flux ∝ d²).',
      },
      {
        heading: 'The Lord Rayleigh & Petzval Sweet Spot',
        detail:
          'Setting B_geo ≈ B_diff yields the optimal pinhole diameter d_opt ≈ 1.9√(λf). For green light (λ = 550 nm) at focal length f = 100 mm, d_opt ≈ 0.45 mm. Here alone does the pinhole camera achieve maximum contrast and resolution.',
      },
    ],
  },
  dualStageFiltering: {
    title: 'Dual-Stage Thermal Filtering in Classical Optics',
    subtitle: 'Liquid Water Jacket IR Absorption & Quartz Dispersion Mechanics',
    formula: 'I_{trans}(\\lambda) = I_0(\\lambda) \\cdot e^{-\\alpha_{H_2O}(\\lambda) \\cdot L} \\cdot T_{quartz}(\\lambda)',
    summary:
      'In high-intensity solar experiments like the Aṁśu Bodhinī apparatus, raw unfiltered solar radiation poses severe engineering hazards. The apparatus solves this via a two-stage thermodynamic and optical cascade.',
    points: [
      {
        heading: 'Selective IR Absorption in Liquid Water (Water Jacket)',
        detail:
          'Raw sunlight delivers ~1000 W/m², of which over 50% is thermal infrared (IR, λ > 750 nm). Water molecules exhibit powerful vibrational absorption bands in the NIR (O-H stretch overtones at 970 nm, 1200 nm, and 1450 nm). A 5–10 cm water vessel absorbs up to 98% of harmful thermal infrared while remaining 95%+ transparent to visible wavelengths (380–750 nm).',
      },
      {
        heading: 'Prevention of Thermal Shock & Refractive Lensing (dn/dT)',
        detail:
          'Uncooled solar rays focused onto a quartz crystal create steep thermal gradients. Natural quartz has anisotropic thermal expansion (α_parallel ≠ α_perpendicular), risking internal stress cleavage and cracking. Furthermore, temperature gradients induce localized refractive index drift (dn/dT), destroying spectral beam collimation.',
      },
      {
        heading: 'Pure Quartz Dispersion (Sphātika)',
        detail:
          'Once cleansed of thermal excess, the pure visible and UV beam enters the Sphātika prism. Quartz possesses high ultraviolet transmission (down to 200 nm, far superior to crown glass) and follow the Cauchy dispersion relation n(λ) = A + B/λ², cleanly peeling colors apart with zero thermal aberration.',
      },
    ],
  },
};
