import { GraphicNovelPanel } from '../types';

export const HISTORICAL_PANELS: GraphicNovelPanel[] = [
  {
    id: 'panel-1-mozi',
    chapterNumber: 1,
    era: 'c. 400 BCE',
    location: 'State of Song, Ancient China',
    title: 'The Intersecting Light: Mozi’s Silk Chamber',
    subtitle: 'Discovery of Rectilinear Propagation & Inverted Geometry',
    historicalFigures: ['Mozi (Mo Di)', 'Mohist Logician Disciples'],
    composition:
      'Interior wide shot inside a sealed, dark timber pavilion. A blinding needle of golden daylight penetrates a circular puncture in the wooden shutter. Floating cedar dust particles trace two intersecting cones of light. On the opposite hanging raw silk screen, an inverted, razor-sharp silhouette of an eight-tiered pagoda and willow trees glows upside down.',
    lightingAndAtmosphere:
      'High contrast chiaroscuro. Deep lacquer blacks and aged timber browns contrasted against incandescent amber solar rays and luminous pearl-white silk.',
    narrativeCaptions: [
      'Four centuries before the Common Era, the philosopher-engineer Mozi constructs humanity’s first controlled dark room.',
      'The Mohist canons record an immutable geometric law: light shoots straight like an arrow (rectilinear propagation).',
      'Because light traveling from the pagoda peak must cross the aperture downward, and light from the ground crosses upward, the projected world flips on its head.',
    ],
    dialogueBubbles: [
      {
        speaker: 'Mozi',
        text: 'Observe! The light from the top travels straight through the needle-gate to the bottom. The light from the foot travels to the top. They cross at the center, yet do not obstruct one another.',
        role: 'Philosopher & Mechanist',
      },
      {
        speaker: 'Disciple Qin',
        text: 'Master, if we widen the gate to let more light enter, the pagoda dissolves into a pale haze. The aperture must remain small to preserve the single ray paths!',
        role: 'Scribe & Observer',
      },
    ],
    technicalCallouts: [
      {
        term: 'Rectilinear Propagation',
        definition: 'Light travels in straight lines within an isotropic, homogeneous medium without curving on its own.',
        mechanicalSignificance: 'Forms the geometrical foundation for ray tracing and pinhole projection geometry.',
      },
      {
        term: 'Crossing Point Inversion',
        definition: 'A point aperture forces rays originating from spatial coordinates (x, y) to map to (-x\', -y\') on the focal plane.',
        mechanicalSignificance: 'Establishes the 1-to-1 geometric ray mapping without requiring glass refraction.',
      },
      {
        term: 'Aperture-Blur Tradeoff',
        definition: 'Enlarging the pinhole increases illumination power (flux) but expands geometric blur circles, destroying edge sharpness.',
        mechanicalSignificance: 'The core physical bottleneck that pushed later inventors toward glass lenses.',
      },
    ],
    directorScriptNotes:
      'Camera Angle: Low angle looking past Mozi’s inkstone toward the silk screen. Use visible geometric overlay lines showing ray crossing vectors.',
    soundDesignCue:
      'Muffled mountain wind outside, creaking bamboo timbers, faint brush strokes on silk, sudden focused high-frequency solar shimmer.',
  },
  {
    id: 'panel-2-alhaytham',
    chapterNumber: 2,
    era: '1010 CE',
    location: 'Cairo, Fatimid Caliphate (Ibn al-Haytham’s House Arrest)',
    title: 'Al-Bayt al-Muzlim: The Multi-Candle Proof',
    subtitle: 'Systematizing the Camera Obscura & Mathematical Proof of Ray Independence',
    historicalFigures: ['Al-Hasan Ibn al-Haytham (Alhazen)'],
    composition:
      'Close tracking view inside Ibn al-Haytham’s stone masonry cell along the Nile. Three brass oil lamps are positioned outside on a wooden bench at varying elevations. Light passes through three discrete pinpoint apertures in a heavy cedar window plate. Inside, three distinct glowing spots appear on the whitewashed wall, maintaining precise inverse relative coordinates.',
    lightingAndAtmosphere:
      'Deep lapis and basalt shadows of Fatimid Cairo masonry. Golden candle flame highlights. Volumetric light beams passing through fine Egyptian incense and sand dust.',
    narrativeCaptions: [
      'Confined under house arrest by Caliph Al-Hakim, Ibn al-Haytham transforms casual philosophy into empirical laboratory optics.',
      'In his Kitab al-Manazir (Book of Optics), he rejects the ancient Greek emission theory (eyes emitting light) and proves intromission: objects reflect light into the eye.',
      'To prove light rays do not coalesce or deflect one another when intersecting in mid-air, he designs the definitive multi-flame aperture rig.',
    ],
    dialogueBubbles: [
      {
        speaker: 'Ibn al-Haytham',
        text: 'When we screen one candle outside, only its corresponding spot vanishes on the inner wall. When we uncover it, the spot returns. The rays pass through the identical point in air without mingling or scattering!',
        role: 'Polymath & Father of Modern Optics',
      },
    ],
    technicalCallouts: [
      {
        term: 'Ray Non-Interference',
        definition: 'Electromagnetic rays in linear optical media obey the superposition principle: intersecting beams do not scatter off each other.',
        mechanicalSignificance: 'Proved light behaves as discrete independent geometric lines rather than fluid currents.',
      },
      {
        term: 'Al-Bayt al-Muzlim (Dark Room)',
        definition: 'The literal Arabic origin of the Latin term Camera Obscura, designed as a calibrated measurement chamber.',
        mechanicalSignificance: 'First systematic optical testbed with controlled aperture dimensions and screen distances.',
      },
      {
        term: 'Intromission Mechanics',
        definition: 'Formal proof that visual perception arises from external light reflected from points on objects converging into the optical aperture.',
        mechanicalSignificance: 'Demolished the 1,500-year Euclidean/Ptolemaic emission theory.',
      },
    ],
    directorScriptNotes:
      'Panel 2 Focus: Show Ibn al-Haytham placing a brass shutter shield over Candle #2, showing Spot #2 instantly extinguish on the wall while Spots #1 and #3 remain completely undisturbed.',
    soundDesignCue:
      'Echoing drip of Cairo stone fountain, flutter of heavy parchment manuscripts, crackle of olive-oil wicks, clean wooden shutter snap.',
  },
  {
    id: 'panel-3-amsu-bodhini',
    chapterNumber: 3,
    era: 'Classical Indian Technical Tradition',
    location: 'Solar Observatory Workshop, Ancient India',
    title: 'The Sūryaraśmi Crucible: Aṁśu Bodhinī Bench',
    subtitle: 'From Image Projection to Spectral Energy Isolation & Dual-Stage Filtering',
    historicalFigures: ['Maharishi Bharadwaja Optical Tradition', 'Rasa-Shastra Master Artisans'],
    composition:
      'Wide technical cross-section of a heavy hand-hammered antique brass optical casing. Intense collimated sunlight (Sūryaraśmi) enters through a heavy brass cylinder housing the Jabākācha lens assembly. The beam passes through a cut-glass fluid vessel filled with pure water (absorbing raw thermal infrared), then strikes a polished 60-degree quartz crystal prism (Sphātika). The beam refracts and splits into a dazzling, vivid seven-color spectrum projected onto an engraved brass measurement grid.',
    lightingAndAtmosphere:
      'Rich metallic bronze, patinated copper, luminous fluid refractions, and a blinding prism dispersion of violet, indigo, cyan, emerald, yellow, amber, and crimson bands against a dark chamber.',
    narrativeCaptions: [
      'In texts belonging to the Maharishi Bharadwaja lineage—such as the Aṁśu Bodhinī—the optical chamber ceases to be an image projector.',
      'The objective shifts entirely: discard spatial geometry and isolate the intrinsic energy constituents of solar radiation (Sūryaraśmi).',
      'To prevent solar thermal destruction, the apparatus incorporates an ingenious engineering innovation: a liquid water thermal barrier coupled to a pure quartz crystal.',
    ],
    dialogueBubbles: [
      {
        speaker: 'Optical Artisan (Vidyadhara)',
        text: 'The raw solar beam carries both Chhāyā (light) and Ushna (heat). Direct uncooled rays will crack the pure Sphātika crystal through thermal shock! The water vessel absorbs the invisible thermal fire while letting the pure light rays pass unhindered.',
        role: 'Master of Glass & Crystal Craft',
      },
      {
        speaker: 'Sūtra Scholar',
        text: 'Adjust the Jabākācha tube! When the rays enter perfectly parallel, the Sphātika does not blur the colors together—it isolates each distinct varna on the calibrated brass scale.',
        role: 'Apparatus Calibrator',
      },
    ],
    technicalCallouts: [
      {
        term: 'Jabākācha (Collimating Lens)',
        definition: 'Curved glass lens system designed to convert divergent rays into a strictly parallel, uniform optical pencil.',
        mechanicalSignificance: 'Eliminates spatial image divergence so every ray strikes the dispersion prism at identical incident angles.',
      },
      {
        term: 'Dual-Stage Liquid Heat Jacket',
        definition: 'Water cell that strongly absorbs infrared radiation (wavelengths > 800 nm) while maintaining 95%+ transmission of visible wavelengths (380-750 nm).',
        mechanicalSignificance: 'Protects quartz from thermal stress fractures and prevents heat-induced refractive index fluctuations (dn/dT).',
      },
      {
        term: 'Sphātika (Quartz Crystal Dispersion)',
        definition: 'Natural crystalline quartz providing wavelength-dependent refraction (dispersion: n(blue) > n(red)).',
        mechanicalSignificance: 'First mechanical isolation of the light source’s spectral profile rather than an inverted spatial scene.',
      },
    ],
    directorScriptNotes:
      'Exact visual match to the reference brass-and-wood antique apparatus. Show the water glass goblet on its brass stand bubbling gently as it absorbs IR heat, while the quartz crystal stays crystal clear and cool.',
    soundDesignCue:
      'Low thermal simmer of water in glass, heavy brass gear ratchets turning the Jabākācha lens barrel, crystalline chime of quartz prism.',
  },
  {
    id: 'panel-4-western-synthesis',
    chapterNumber: 4,
    era: '17th–19th Century',
    location: 'Cambridge & Munich, Western Europe',
    title: 'Prisms to Fraunhofer: The Modern Spectrometer',
    subtitle: 'From White Light Recombination to Discrete Stellar Fingerprints',
    historicalFigures: ['Sir Isaac Newton (1666)', 'Joseph von Fraunhofer (1814)'],
    composition:
      'Dual-split timeline panel. On the left: Newton in his Woolsthorpe manor chamber, holding a second inverted glass prism that recombines the dispersed rainbow beam back into a pristine white pencil of light, proving light is not altered by glass, but separated. On the right: Joseph von Fraunhofer in 1814 Munich peering through a custom precision theodolite telescope at a diffraction grating, hand-recording the dark absorption lines of the solar atmosphere.',
    lightingAndAtmosphere:
      'Left: Dusty English country manor in deep afternoon shadows with a brilliant rainbow ribbon. Right: Clean Bavarian scientific laboratory with polished steel scales, blackened brass micrometers, and razor-sharp Fraunhofer absorption stripes.',
    narrativeCaptions: [
      'In 1666, Isaac Newton performs the experimentum crucis: an inverted second prism recombines rainbow rays back into pure white light.',
      'No longer an occult modification of pure light by glass: white sunlight is fundamentally heterogeneous, composed of distinct refrangibilities.',
      'A century later, Joseph von Fraunhofer equips the spectrometer with fine slits and a telescope, discovering 574 dark absorption lines—the atomic barcode of the cosmos.',
    ],
    dialogueBubbles: [
      {
        speaker: 'Isaac Newton',
        text: 'The colors are not qualifications of light derived from refractions of natural bodies, but original and connate properties. Each specific ray possesses its own immutable degree of refrangibility.',
        role: 'Physicist & Mathematician',
      },
      {
        speaker: 'Joseph von Fraunhofer',
        text: 'Look closer through the telescope crosshairs! The spectrum is not continuous. Black lines—D, b, F—cut across the solar band at exact angles. The sun is singing in atomic chords.',
        role: 'Optician & Spectroscopist',
      },
    ],
    technicalCallouts: [
      {
        term: 'Experimentum Crucis',
        definition: 'Newton’s proof that isolated monochromatic rays (e.g. pure red) cannot be further separated by subsequent prisms.',
        mechanicalSignificance: 'Proved dispersion is an intrinsic constituent property of light rather than medium corruption.',
      },
      {
        term: 'Fraunhofer Absorption Lines',
        definition: 'Dark spectral gaps caused by resonant atomic absorption in the solar photosphere (e.g., Sodium D-lines at 589 nm).',
        mechanicalSignificance: 'Transformed the spectrometer from a visual curiosity into the ultimate tool for chemical astrophysics.',
      },
      {
        term: 'Angular Dispersion Scale',
        definition: 'Quantitative relationship dθ/dλ governing spectral resolution on a calibrated angle gauge.',
        mechanicalSignificance: 'The direct ancestor of modern astronomical spectrographs and Raman spectroscopy.',
      },
    ],
    directorScriptNotes:
      'Show the visual contrast between the broad emotional rainbow and the razor-sharp quantitative Fraunhofer scale with calibrated nanometer ticks.',
    soundDesignCue:
      'Gentle ticking of pendulum clock, precision micrometer click, brass theodolite focus ring whisper.',
  },
  {
    id: 'panel-5-unified-synthesis',
    chapterNumber: 5,
    era: 'Modern Synthesis',
    location: 'Global Optical Engineering Laboratory',
    title: 'Unified Apparatus: The Two Chambers Converge',
    subtitle: 'From the Geometry of Shadows to the Continuous Spectrum of Radiation',
    historicalFigures: ['Mozi', 'Ibn al-Haytham', 'Bharadwaja Tradition', 'Newton & Fraunhofer'],
    composition:
      'A split-screen holographic engineering workbench. The left chamber houses the cardboard and cedar Camera Obscura projecting the inverted world through a pinhole. The right chamber houses the antique brass Aṁśu Bodhinī spectrometer bench coupled to a modern ruled diffraction grating. Golden rays and rainbow interference fans merge in the center over interactive digital dials.',
    lightingAndAtmosphere:
      'High-contrast synthesis of antique warm candlelight, rich polished brass, crystalline prism flares, and sharp cyan holographic laser grids.',
    narrativeCaptions: [
      'Two thousand years of human inquiry unite: the chamber that preserves external spatial geometry, and the chamber that deconstructs light into its elemental wavelengths.',
      'From Mozi’s needle gate to Fraunhofer’s ruled diffraction grating, optics evolved from qualitative observation to absolute quantitative spectroscopy.',
      'Geometry meets spectrum: modern cameras and astronomical telescopes combine rectilinear apertures, liquid thermal coolers, quartz prisms, and diffraction gratings.',
    ],
    dialogueBubbles: [
      {
        speaker: 'Optical Systems Architect',
        text: 'The Camera Obscura solved spatial mapping: (x, y) maps to (-x\', -y\'). The Aṁśu Bodhinī spectrometer solved energy mapping: collapsing spatial width into a 1D wavelength axis I(λ). When we couple the quartz prism to a diffraction grating, we achieve full 2D cross-dispersion echelle spectrometry!',
        role: 'Modern Instrumentation Engineer',
      },
      {
        speaker: 'Observatory Astronomer',
        text: 'Rotate the quartz prism to minimum deviation! Look at the diffraction grating orders: each dark line tells us the exact temperature, pressure, and chemical makeup of a star light-years away.',
        role: 'Astrophysicist',
      },
    ],
    technicalCallouts: [
      {
        term: 'Cross-Dispersion (Prism + Grating)',
        definition: 'Combining a dispersing prism with an orthogonal diffraction grating to separate overlapping high diffraction orders into a 2D echelle spectral matrix.',
        mechanicalSignificance: 'The core optical architecture inside all research astronomical spectrographs.',
      },
      {
        term: 'Grating Resolving Power (R = mN)',
        definition: 'The chromatic resolving power R = λ/Δλ equals the diffraction order m multiplied by the total illuminated groove count N.',
        mechanicalSignificance: 'Enables resolving closely spaced atomic doublets such as the Sodium D-lines at 589.0 nm and 589.6 nm.',
      },
      {
        term: 'Thermal Infrared Attenuation',
        definition: 'Dual-stage liquid cooling prevents high-intensity solar radiation from inducing thermal gradients and quartz birefringence.',
        mechanicalSignificance: 'Fundamental safeguard for high-energy solar physics and high-power laser optics.',
      },
    ],
    directorScriptNotes:
      'Split-screen dual animation: show the user moving the quartz dial on the right, which shifts the diffraction grating interference fringes, while the pinhole aperture on the left independently controls image sharpness.',
    soundDesignCue:
      'Harmonic resonance chord, precision quartz chime blending with shutter click and electronic reticle lock.',
  },
];
