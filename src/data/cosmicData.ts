import { PracticeTestQuestion } from '../types';

export interface CosmicTargetInfo {
  id: string;
  name: string;
  subtitle: string;
  dominantColorHex: string;
  rgbValues: [number, number, number];
  apparentTempK: number;
  description: string;
  spectralPeakNm: number;
  keyMolecules: string[];
}

export const COSMIC_TARGETS: Record<string, CosmicTargetInfo> = {
  'cosmic-latte': {
    id: 'cosmic-latte',
    name: 'Integrated Universe ("Cosmic Latte")',
    subtitle: 'Spectral Average of >200,000 Galaxies (Baldry & Glazebrook 2002)',
    dominantColorHex: '#FFF8E7',
    rgbValues: [255, 248, 231],
    apparentTempK: 5500,
    description:
      'Although the night sky appears ink-black to the naked human eye due to the inverse-square dilution of light across vast cosmic voids, the aggregate light emitted by billions of stars, galaxies, and nebulae averages to a faint, warm beige-white tone known as Cosmic Latte (#FFF8E7).',
    spectralPeakNm: 540,
    keyMolecules: ['H I (21cm / Lyman)', 'He II', 'Stellar Continuum', 'Dust polycyclic aromatics'],
  },
  'solar-corona': {
    id: 'solar-corona',
    name: 'Solar Flare & Corona Emission',
    subtitle: 'Extreme Thermal & Magnetohydrodynamic Plasma',
    dominantColorHex: '#FBBF24',
    rgbValues: [251, 191, 36],
    apparentTempK: 2000000,
    description:
      'High-energy solar flares release intense ultraviolet, X-ray, and near-infrared thermal fluxes exceeding 1400 W/m² in orbit. Tested against the spaceborne Aṁśu Bodhinī liquid thermal heat shield.',
    spectralPeakNm: 500,
    keyMolecules: ['Fe XIV (Coronium green line)', 'Ca II', 'Hα (656.3 nm)'],
  },
  'intergalactic-gas': {
    id: 'intergalactic-gas',
    name: 'Intergalactic Gas & Raman Scatter',
    subtitle: 'Raman Inelastic Scattering in Cold Molecular Clouds',
    dominantColorHex: '#38BDF8',
    rgbValues: [56, 189, 248],
    apparentTempK: 15,
    description:
      'When starlight penetrates diffuse interstellar and intergalactic gas clouds, a fraction undergoes inelastic Raman scattering, shifting photon frequencies by molecular vibrational energy quanta (ΔE = hΔν), fingerprinting cosmic hydrogen and carbon compounds.',
    spectralPeakNm: 440,
    keyMolecules: ['H₂ Vibrational Stokes', 'CO (J=1-0)', 'Water ice grains'],
  },
  'cmb-relic': {
    id: 'cmb-relic',
    name: 'Cosmic Microwave Background (CMB)',
    subtitle: 'J.C. Bose Millimeter-Wave Radio Detection (2.725 K Blackbody)',
    dominantColorHex: '#6366F1',
    rgbValues: [99, 102, 241],
    apparentTempK: 2.725,
    description:
      'The cooled relic glow of the Big Bang, discovered at microwave frequencies predicted by J.C. Bose’s pioneering millimeter-wave experiments. Peak emission lies at 160 GHz (1.9 mm wavelength), detected via spaceborne millimeter horn antennas.',
    spectralPeakNm: 1900000, // 1.9 mm
    keyMolecules: ['Relic Photons (z ≈ 1100)', 'Primordial Hydrogen / Helium plasma'],
  },
};

export const PIONEER_PROFILES = {
  raman: {
    name: 'Sir C.V. Raman',
    lifespan: '1888–1970',
    title: 'Nobel Laureate in Physics (1928) · Discoverer of the Raman Effect',
    experimentSummary:
      'Using focused sunlight, violet glass filters, and liquid benzene/water cells, Raman proved that light traversing a transparent medium undergoes inelastic scattering: a minute fraction of scattered photons exchanges energy with molecular vibrational modes, exiting at distinctly shifted wavelengths.',
    cosmicLink:
      'Raman scattering explains why planetary atmospheres scatter specific spectral hues, why the Earth’s sky and deep seas appear blue, and provides astronomical spectrographs with non-destructive molecular fingerprinting of interstellar nebulae.',
    keyFormula: 'ν_scattered = ν_incident ± ν_molecular  (Stokes & Anti-Stokes)',
  },
  bose: {
    name: 'Sir Jagadish Chandra Bose',
    lifespan: '1858–1937',
    title: 'Father of Millimeter-Wave Radio Science & Semiconductor Detectors',
    experimentSummary:
      'In Calcutta (1895), Bose generated and detected 60 GHz (5 mm wavelength) microwave radio waves using spark-gap transmitters, dielectric waveguides, horn antennas, and galena (PbS) crystal semiconductor point-contact detectors.',
    cosmicLink:
      'Bose’s millimeter-wave horn antennas and crystal detectors laid the foundational hardware architecture for modern radio astronomy, enabling satellite observatories to detect the non-optical universe and the 2.725 K Cosmic Microwave Background.',
    keyFormula: 'λ = c / f = 3×10⁸ / 60×10⁹ = 5 mm  (EHF Millimeter Wave)',
  },
  satelliteConcept: {
    name: 'COSMIC COLOR OBSERVER (CCO-1)',
    designation: 'Orbital Optical-Radio Hybrid Spacecraft',
    modules: [
      {
        name: 'Quartz Raman Spectrometer',
        role: 'Disperses starlight via pure Sphātika quartz prism and measures faint inelastic scatter from cosmic molecular clouds.',
      },
      {
        name: 'Bose Millimeter-Wave Horn',
        role: 'A compact 60–160 GHz horn antenna & cryogenic crystal detector tracking Cosmic Microwave Background relic blackbody radiation.',
      },
      {
        name: 'Aṁśu Bodhinī Fluid Thermal Shield',
        role: 'A space-qualified fluid circulation jacket containing classical alchemical compounds (Shuddha Jala, Yavakshāra, Kāsīsa) absorbing 98% of solar infrared flares to protect cryogenic sensors.',
      },
    ],
  },
};

export const PRACTICE_TEST_QUESTIONS: PracticeTestQuestion[] = [
  {
    id: 'q1-cosmic-latte',
    questionNumber: 1,
    title: 'What Color Is the Universe?',
    question:
      'When astrophysicists average all visible light emitted by over 200,000 galaxies across the cosmos, what color is produced, and why does the night sky appear black to human observers?',
    options: [
      {
        key: 'A',
        text: 'Pitch black, because space is a complete vacuum containing no photons.',
      },
      {
        key: 'B',
        text: 'Deep cobalt blue, due to Rayleigh scattering by interstellar hydrogen gas.',
      },
      {
        key: 'C',
        text: 'A pale beige-white hue ("Cosmic Latte"), with the night sky appearing black because intergalactic light is spatially diluted and the universe has a finite age.',
      },
      {
        key: 'D',
        text: 'Vibrant crimson red, entirely due to cosmological Doppler redshift of distant supernovae.',
      },
    ],
    correctKey: 'C',
    shortExplanation:
      'The cosmic average of galactic starlight is a warm beige-white (#FFF8E7). The night sky appears black because light is diluted by inverse-square distance and cosmic expansion (Olbers’ Paradox solution).',
    deepPedagogicalAnalysis:
      'In 2002, astronomers Ivan Baldry and Karl Glazebrook analyzed the 2dF Galaxy Redshift Survey containing more than 200,000 galaxies. By summing their optical spectra and converting the spectral radiance to standard CIE chromaticity coordinates, they discovered the integrated cosmic spectrum corresponds to a pale beige-white (#FFF8E7), named "Cosmic Latte". While individual nebulae glow red or blue, the combined emission of all stellar populations balances into this warm off-white hue. The darkness of the night sky is explained by Olbers’ Paradox: the observable universe is finite in age and expanding, so distant starlight has not had infinite time to fill space.',
    historicalPioneer: 'Ivan Baldry & Karl Glazebrook (2002) / Britannica Optical Review',
    engineeringConcept: 'Spectral Integration & CIE XYZ-to-sRGB Chromaticity',
  },
  {
    id: 'q2-raman-scattering',
    questionNumber: 2,
    title: 'Raman Scattering vs. Elastic Scattering',
    question:
      'How does Sir C.V. Raman’s discovery (1928) fundamentally differ from classical Rayleigh scattering, and how does it aid cosmic analysis?',
    options: [
      {
        key: 'A',
        text: 'Raman scattering changes only the light’s polarization without changing its frequency or wavelength.',
      },
      {
        key: 'B',
        text: 'Raman scattering is inelastic: scattered photons gain or lose discrete vibrational energy quanta (ΔE = hΔν), revealing molecular identity even at astronomical distances.',
      },
      {
        key: 'C',
        text: 'Raman scattering only occurs in solid diamond prisms and cannot occur in cosmic gases or liquids.',
      },
      {
        key: 'D',
        text: 'Rayleigh scattering shifts the wavelength, whereas Raman scattering preserves the exact incident frequency.',
      },
    ],
    correctKey: 'B',
    shortExplanation:
      'Unlike elastic Rayleigh scattering (where photons bounce at the same frequency), Raman scattering is inelastic. Photons exchange energy with molecular bonds, creating diagnostic Stokes/Anti-Stokes frequency shifts.',
    deepPedagogicalAnalysis:
      'In Rayleigh scattering, photons scatter elastically with zero change in kinetic energy (ν_out = ν_in). Raman’s Nobel Prize-winning breakthrough in 1928 revealed that when monochromatic photons strike molecules, approximately 1 in 10⁷ photons undergoes an inelastic collision with molecular electron clouds. The molecule absorbs or imparts a quantum of vibrational/rotational energy: h·ν_scattered = h·ν_incident ± ΔE_vibrational. The resulting frequency shifts (Stokes lines when photon loses energy, Anti-Stokes when it gains energy) act as an unambiguous molecular fingerprint, enabling satellite spectrometers to identify chemical compounds in interstellar gas without physical contact.',
    historicalPioneer: 'Sir C.V. Raman (1928 Nobel Prize in Physics)',
    engineeringConcept: 'Inelastic Photon-Phonon Scattering & Stokes Spectral Shifts',
  },
  {
    id: 'q3-bose-millimeter',
    questionNumber: 3,
    title: 'J.C. Bose’s Millimeter-Wave Radio Pioneering',
    question:
      'Why is Sir J.C. Bose (1895) regarded as the pioneer of modern radio astronomy and Cosmic Microwave Background (CMB) detection?',
    options: [
      {
        key: 'A',
        text: 'He built the first optical telescope in India using ground lenses.',
      },
      {
        key: 'B',
        text: 'He was the first to invent the vacuum tube audio amplifier.',
      },
      {
        key: 'C',
        text: 'He pioneered millimeter waves (60 GHz / 5 mm), directional horn antennas, and semiconductor crystal detectors, creating the exact hardware architecture used by modern microwave space observatories.',
      },
      {
        key: 'D',
        text: 'He proved that sound waves could travel through the vacuum of space.',
      },
    ],
    correctKey: 'C',
    shortExplanation:
      'Bose generated and detected 60 GHz millimeter radio waves using horn antennas and crystal detectors in 1895, laying the foundations for microwave receivers that today detect the 2.725 K Cosmic Microwave Background.',
    deepPedagogicalAnalysis:
      'While Marconi focused on long-wave transmission for commercial Morse telegraphy, Sir J.C. Bose pioneered Extremely High Frequency (EHF) millimeter waves (down to 5 mm wavelength / 60 GHz) at Presidency College, Calcutta in 1895. Bose invented the pyramidal horn antenna, spark-gap microwave generators, dielectric waveguides, and point-contact semiconductor detectors using galena (lead sulfide) crystals (patented in 1904 as the first solid-state diode detector). Because the relic radiation of the Big Bang (CMB) peaks in this exact millimeter spectrum (160 GHz / 1.9 mm), modern space observatories (COBE, WMAP, Planck) rely directly on descendants of Bose’s horn antennas and crystal bolometers.',
    historicalPioneer: 'Sir Jagadish Chandra Bose (1895–1904)',
    engineeringConcept: 'Millimeter-Wave (EHF) Horn Antennas & Point-Contact Semiconductor Detection',
  },
  {
    id: 'q4-amsu-satellite',
    questionNumber: 4,
    title: 'Aṁśu Bodhinī Fluid Shielding in Spacecraft Optics',
    question:
      'In the "Cosmic Color Observer" satellite concept, why is the ancient Indian Aṁśu Bodhinī liquid thermal cell adapted into an orbital fluid jacket?',
    options: [
      {
        key: 'A',
        text: 'To make the satellite heavier so it remains in low Earth orbit longer.',
      },
      {
        key: 'B',
        text: 'To attenuate over 95% of intense near-infrared solar flare heat, preventing thermal shock, refractive drift (dn/dT), and sensor burnout in sensitive quartz crystals.',
      },
      {
        key: 'C',
        text: 'To completely block all visible light from reaching the spectrometer.',
      },
      {
        key: 'D',
        text: 'To provide drinking water for astronauts aboard robotic satellite missions.',
      },
    ],
    correctKey: 'B',
    shortExplanation:
      'The liquid cell (Shuddha Jala or alchemical solutions like Yavakshāra) absorbs destructive near-infrared thermal energy (>850 nm) while allowing pristine visible and UV light to reach the quartz prism without heating.',
    deepPedagogicalAnalysis:
      'The Aṁśu Bodhinī treatise explicitly specified placing a water-filled glass vessel immediately behind the Jabākācha collimator to intercept solar heat before it could hit the delicate Sphātika (quartz) crystal. In modern spacecraft instrumentation, solar irradiance without atmospheric buffering delivers up to 1361 W/m² of radiation, over half of which is thermal near-infrared. Unmitigated solar heat induces extreme thermo-optic distortion (dn/dT) in quartz prisms, alters prism apex geometry, and burns out cryogenically cooled detectors. A closed-loop fluid jacket performs selective spectral filtering: near-infrared photons are absorbed by water molecular vibrational overtones, while visible photons transmit at >95% efficiency.',
    historicalPioneer: 'Aṁśu Bodhinī Technical Tradition / Spacecraft Thermal Engineering',
    engineeringConcept: 'Selective Dielectric Liquid Infrared Attenuation & dn/dT Thermo-Optic Stability',
  },
  {
    id: 'q5-fraunhofer-barcodes',
    questionNumber: 5,
    title: 'Stellar Fingerprints & Fraunhofer Absorption Lines',
    question:
      'What physical mechanism causes the dark Fraunhofer lines observed in starlight, and how does it allow astronomers to determine what stars are made of?',
    options: [
      {
        key: 'A',
        text: 'Dust particles on the telescope eyepiece blocking physical rays of light.',
      },
      {
        key: 'B',
        text: 'Resonant quantum absorption: cooler gases in the star’s outer atmosphere absorb discrete photon wavelengths matching electron orbital energy transitions (ΔE = h·c/λ).',
      },
      {
        key: 'C',
        text: 'Optical illusions caused by chromatic aberration in the glass prism.',
      },
      {
        key: 'D',
        text: 'Gravitational bending of light around nearby planets.',
      },
    ],
    correctKey: 'B',
    shortExplanation:
      'Cooler atmospheric elemental gases absorb specific photons corresponding to exact atomic electron jumps. The missing wavelengths appear as dark absorption lines characteristic of specific elements.',
    deepPedagogicalAnalysis:
      'In 1814, Joseph von Fraunhofer cataloged 574 dark lines crossing the solar spectrum. When blackbody continuum radiation from a star’s dense core passes through its cooler outer gaseous atmosphere (photosphere/chromosphere), atomic electrons absorb photons whose energies exactly equal quantum transition gaps: ΔE = E_final - E_initial = h·ν = h·c/λ. For example, atomic sodium vapor absorbs at 589.0 nm and 589.6 nm (the D-lines), and atomic hydrogen absorbs at 656.3 nm (Hα) and 486.1 nm (Hβ). Because every element has a unique quantum energy level structure, Fraunhofer lines provide an immutable atomic barcode for identifying stellar composition billions of light-years away.',
    historicalPioneer: 'Joseph von Fraunhofer (1814) & Gustav Kirchhoff (1859)',
    engineeringConcept: 'Atomic Electronic Transitions & Quantum Resonance Spectroscopy',
  },
];
