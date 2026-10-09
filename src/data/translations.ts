/**
 * Localization dictionary and engine state for 'en' (English), 'sa' (Sanskrit / संस्कृतम्), and 'fa' (Persian / فارسی).
 * Connects with native bridges and the AppEngineCore/setEngineLanguage() interface.
 */

export type SupportedLanguage = 'en' | 'sa' | 'fa';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  dir: 'ltr' | 'rtl';
  flag: string;
  script: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
    script: 'Latin',
  },
  {
    code: 'sa',
    label: 'Sanskrit',
    nativeLabel: 'संस्कृतम्',
    dir: 'ltr',
    flag: '🕉️',
    script: 'Devanagari',
  },
  {
    code: 'fa',
    label: 'Persian',
    nativeLabel: 'فارسی',
    dir: 'rtl',
    flag: '🇮🇷',
    script: 'Perso-Arabic',
  },
];

export interface LocaleTranslations {
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  heroBadge: string;
  heroDescription: string;
  
  // Navigation
  navGraphicNovel: string;
  navPinhole: string;
  navAmsu: string;
  navCosmic: string;
  navMatrix: string;
  navPromptStudio: string;
  calibrateBench: string;
  
  // Quick Actions
  exploreNovel: string;
  launchSpectrometer: string;
  launchCosmicObserver: string;
  calibrationChallenge: string;
  
  // Historical Milestones
  moziTitle: string;
  moziRole: string;
  moziEra: string;
  moziDesc: string;
  
  alhaythamTitle: string;
  alhaythamRole: string;
  alhaythamEra: string;
  alhaythamDesc: string;
  
  bharadwajaTitle: string;
  bharadwajaRole: string;
  bharadwajaEra: string;
  bharadwajaDesc: string;
  
  newtonTitle: string;
  newtonRole: string;
  newtonEra: string;
  newtonDesc: string;
  
  ramanBoseTitle: string;
  ramanBoseRole: string;
  ramanBoseEra: string;
  ramanBoseDesc: string;
  
  // Technical Terms
  rectilinearPropagation: string;
  spectralDispersion: string;
  pinholeObscura: string;
  collimation: string;
  thermalFiltering: string;
  quartzPrism: string;
  universeColor: string;
  cosmicLatte: string;
  
  // Engine Controls
  languageSelector: string;
  selectLanguage: string;
  nativeSyncNotice: string;
  activeLocaleTag: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, LocaleTranslations> = {
  en: {
    appTitle: 'Chamber of Light',
    appSubtitle: 'The Global Lineage of Optical Spectrometry',
    tagline: 'An interactive engineering graphic novel and optical physics workbench.',
    heroBadge: 'Optical Physics · Engineering Graphic Novel · Mozi (400 BCE) to Aṁśu Bodhinī & Newton',
    heroDescription:
      'Trace humanity’s greatest optical evolution: from Mozi’s discovery of intersecting rays and Ibn al-Haytham’s multi-candle dark room, to the classical Indian Aṁśu Bodhinī optical train that coupled a Jabākācha collimating lens, a water thermal heat jacket, and pure quartz crystals to isolate the sun’s internal spectrum.',
    navGraphicNovel: 'Graphic Novel',
    navPinhole: 'Pinhole Obscura',
    navAmsu: 'Aṁśu Spectrometer',
    navCosmic: 'Cosmic Observer',
    navMatrix: 'Comparative Matrix',
    navPromptStudio: 'Master Prompt',
    calibrateBench: 'Calibrate Bench',
    exploreNovel: 'Explore Graphic Novel',
    launchSpectrometer: 'Launch Aṁśu Spectrometer',
    launchCosmicObserver: 'Cosmic Color Observer',
    calibrationChallenge: 'Calibration Challenge',
    moziTitle: 'Mozi (墨子)',
    moziRole: 'Needle Gate & Inverted Rays',
    moziEra: '400 BCE · China',
    moziDesc: 'Rectilinear light propagation through a needle gate; first recorded inverted pinhole projection.',
    alhaythamTitle: 'Ibn al-Haytham (Alhazen)',
    alhaythamRole: 'Al-Bayt al-Muzlim',
    alhaythamEra: '1010 CE · Cairo',
    alhaythamDesc: 'Al-Bayt al-Muzlim dark room; multi-candle experiment proving rays cross without mixing.',
    bharadwajaTitle: 'Aṁśu Bodhinī Bench',
    bharadwajaRole: 'Jabākācha & Sphātika',
    bharadwajaEra: 'Classical India',
    bharadwajaDesc: 'Jabākācha collimating lens, water-vessel thermal heat filter, and quartz crystal dispersion.',
    newtonTitle: 'Newton & Fraunhofer',
    newtonRole: 'Recombination & Solar Lines',
    newtonEra: '17th–19th Century',
    newtonDesc: 'Glass prism recombination and 574 solar absorption lines, establishing modern spectrometry.',
    ramanBoseTitle: 'Raman & Bose',
    ramanBoseRole: 'Scattering & Radio Astronomy',
    ramanBoseEra: 'Modern Pioneers',
    ramanBoseDesc: 'Inelastic photon scattering (1928) & 60 GHz millimeter radio horns, bridging to Cosmic Latte & CMB.',
    rectilinearPropagation: 'Rectilinear Propagation',
    spectralDispersion: 'Spectral Dispersion',
    pinholeObscura: 'Camera Obscura (Pinhole)',
    collimation: 'Collimation (Jabākācha)',
    thermalFiltering: 'Thermal Fluid Jacket (Jala-Yantra)',
    quartzPrism: 'Quartz Prism (Sphātika)',
    universeColor: 'What Color Is the Universe?',
    cosmicLatte: 'Cosmic Latte (#FFF8E7)',
    languageSelector: 'Engine Language',
    selectLanguage: 'Select Engine Language',
    nativeSyncNotice: 'Native Bridge: Syncs with iOS/Android OS locale and WebGL runtime',
    activeLocaleTag: 'Active Locale',
  },
  sa: {
    appTitle: 'छाया-प्रभा मन्दिरम् (Chamber of Light)',
    appSubtitle: 'दृग्विज्ञानस्य वैश्विकपरम्परा (Global Lineage of Optics)',
    tagline: 'संवादात्मिका चित्रकथा दृग्भौतिकी-यन्त्रशाला च।',
    heroBadge: 'दृग्भौतिकी · चित्रात्मिका यन्त्रविद्या · मोजी (४०० ई.पू.) तः अंशुबोधिनी न्यूटन-पर्यन्तम्',
    heroDescription:
      'मानवस्य श्रेष्ठतमस्य दृग्विज्ञानविकासस्य अनुशीलनम्: मोजी-मुनेः ऋजुरेखा-रश्मि-सङ्गमनात्, इब्न् अल्-हैसमस्य बहुदीप-गृह-प्रयोगात् (अल्-बैत् अल्-मुज्लिम्), भारद्वाज-परम्परायाः अंशुबोधिनी-यन्त्रपर्यन्तम्—यत्र जबाकाच-समाहित-रश्मयः, जलपात्रस्य उष्णातप-वारणम्, स्फटिक-प्रिज्मेन च सूर्यकिरण-वर्णविभेदनं सम्पादितम्।',
    navGraphicNovel: 'चित्रात्मिका कथा (Graphic Novel)',
    navPinhole: 'सूचिच्छिद्र-यन्त्रम् (Pinhole Obscura)',
    navAmsu: 'अंशुबोधिनी यन्त्रम् (Aṁśu Spectrometer)',
    navCosmic: 'ब्रह्माण्ड-वर्ण-वेधशाला (Cosmic Observer)',
    navMatrix: 'तुलना-सारणी (Comparative Matrix)',
    navPromptStudio: 'यन्त्र-निर्देश-शाला (Master Prompt)',
    calibrateBench: 'यन्त्र-समाधानम् (Calibrate)',
    exploreNovel: 'चित्रकथां पश्यतु (Read Novel)',
    launchSpectrometer: 'अंशुबोधिनीं चालयतु (Launch Aṁśu)',
    launchCosmicObserver: 'ब्रह्माण्डवर्ण-दर्शकम् (Cosmic View)',
    calibrationChallenge: 'समाधान-परीक्षा (Calibration Challenge)',
    moziTitle: 'मोजी (Mozi · 墨子)',
    moziRole: 'सूचिच्छिद्र-विपरीत-प्रतिबिम्बम्',
    moziEra: '४०० ई.पू. · चीनदेशः',
    moziDesc: 'सूक्ष्म-च्छिद्रेण ऋजु-गति-प्रकाश-गमनम्; प्रथमं प्रतिलोमित-छाया-दर्शनम्।',
    alhaythamTitle: 'इब्न् अल्-हैसम् (Ibn al-Haytham)',
    alhaythamRole: 'अल्-बैत् अल्-मुज्लिम् (तमिस्रा-गृहम्)',
    alhaythamEra: '१०१० ई. · काहिरा (मिस्र)',
    alhaythamDesc: 'बहुदीप-यन्त्रेण किरण-पारस्पर्या-सङ्कर-प्रमाणम्; दीप्ति-रश्मयः परस्परं न विदारयन्ति।',
    bharadwajaTitle: 'अंशुबोधिनी यन्त्रपीठम् (Aṁśu Bodhinī)',
    bharadwajaRole: 'जबाकाच-जलपात्र-स्फटिक-योगः',
    bharadwajaEra: 'प्राचीन-भारतम् (Classical India)',
    bharadwajaDesc: 'जबाकाचेन किरण-समाहतिः, जल-कोष्ठेन उष्णातप-शोषणम्, स्फटिकेन सूर्य-सप्तवर्ण-विभाजनम्।',
    newtonTitle: 'न्यूटन-फ़्राउनहोफ़रौ (Newton & Fraunhofer)',
    newtonRole: 'सप्तवर्ण-पुनर्योजनं कृष्णरेखा-वेधश्च',
    newtonEra: '१७–१९ शतकम · यूरोप',
    newtonDesc: 'प्रिज्मेन धवल-प्रकाश-विश्लेषणम्, ५७४ सौर-अवशोषण-रेखाभिः च आधुनिक-वर्णक्रम-विज्ञानम्।',
    ramanBoseTitle: 'रामन्-बोस-महोदयौ (Raman & Bose)',
    ramanBoseRole: 'प्रकीर्णन-तरङ्ग-शास्त्रम्',
    ramanBoseEra: 'आधुनिक-विद्वांसौ',
    ramanBoseDesc: 'अपरिवर्ती-फोटोन-विक्षेपः (१९२८) तथा ६० GHz सूक्ष्म-तरङ्ग-शृङ्गम्, ब्रह्माण्ड-वर्ण-प्राप्तिश्च।',
    rectilinearPropagation: 'ऋजु-गति-प्रकाशः (Rectilinear Propagation)',
    spectralDispersion: 'वर्णक्रम-विक्षेपणम् (Spectral Dispersion)',
    pinholeObscura: 'छाद्य-गृह-यन्त्रम् (Camera Obscura)',
    collimation: 'जबाकाच-समाधानम् (Collimation)',
    thermalFiltering: 'जल-यन्त्र-उष्ण-वारणम् (Thermal Water Cell)',
    quartzPrism: 'स्फटिक-त्रिकोण-मणिः (Quartz Prism)',
    universeColor: 'किं वर्णं ब्रह्माण्डम्? (Cosmic Color)',
    cosmicLatte: 'ब्रह्माण्ड-दुग्धवर्णः (#FFF8E7)',
    languageSelector: 'यन्त्र-भाषा (Engine Language)',
    selectLanguage: 'भाषां वृणु (Select Language)',
    nativeSyncNotice: 'Native Bridge: iOS / Android OS locale सह WebGL संयोजनम्',
    activeLocaleTag: 'प्रयुक्ता भाषा',
  },
  fa: {
    appTitle: 'حجره نور (Chamber of Light)',
    appSubtitle: 'سلسله‌مراتب جهانی طیف‌سنجی نوری',
    tagline: 'رمان مصور تعاملی مهندسی و میز کار فیزیک نور.',
    heroBadge: 'فیزیک نور · رمان گرافیکی مهندسی · از موزی (۴۰۰ ق.م) تا انشوبودهینی و نیوتن',
    heroDescription:
      'ردپای بزرگترین جهش نوری بشریت: از کشف پرتوهای متقاطع موزی و اتاق تاریک چندشمعی ابن هیثم (البیت المظلم)، تا میز کار طیف‌سنجی انشوبودهینی در هند باستان که عدسی موازی‌ساز، غلاف فیلتر حرارتی آب و منشور کوارتز خالص را برای جداسازی طیف نور خورشید تلفیق نمود.',
    navGraphicNovel: 'رمان گرافیکی',
    navPinhole: 'اتاقک تاریک (سوراخ‌ریز)',
    navAmsu: 'طیف‌سنج انشوبودهینی',
    navCosmic: 'دیده‌بان رنگ کیهانی',
    navMatrix: 'ماتریس تطبیقی',
    navPromptStudio: 'استودیوی فرمان مهندسی',
    calibrateBench: 'کالیبراسیون میزکار',
    exploreNovel: 'مشاهده رمان مصور',
    launchSpectrometer: 'راه‌اندازی طیف‌سنج انشو',
    launchCosmicObserver: 'دیده‌بان رنگ کیهان',
    calibrationChallenge: 'چالش کالیبراسیون',
    moziTitle: 'موزی (Mozi · 墨子)',
    moziRole: 'سوزن‌گاه و تصویر وارونه',
    moziEra: '۴۰۰ ق.م · چین باستان',
    moziDesc: 'انتشار مستقیم نور از روزنه باریک؛ نخستین ثبت تصویر وارونه در تاریخ.',
    alhaythamTitle: 'ابن هیثم (Alhazen)',
    alhaythamRole: 'البیت المظلم (اتاق تاریک)',
    alhaythamEra: '۱۰۱۰ م · قاهره',
    alhaythamDesc: 'آزمایش شاهکار چندشمعی؛ اثبات اینکه پرتوهای نور در تقاطع با یکدیگر در هوا ترکیب یا منحرف نمی‌شوند.',
    bharadwajaTitle: 'میز کار انشوبودهینی (Aṁśu Bodhinī)',
    bharadwajaRole: 'عدسی جاباکاچا و فیلتر آب',
    bharadwajaEra: 'هند کلاسیک',
    bharadwajaDesc: 'موازی‌سازی پرتوها، جذب گرمای مادون‌قرمز با سلول آب، و شکست نور با بلور کوارتز.',
    newtonTitle: 'نیوتن و فراونهوفر (Newton & Fraunhofer)',
    newtonRole: 'ترکیب مجدد و خطوط جذب خورشیدی',
    newtonEra: 'قرن هفدهم تا نوزدهم',
    newtonDesc: 'تجزیه و بازترکیب نور سفید با منشور و کشف ۵۷۴ خط تاریک جذبی در طیف خورشید.',
    ramanBoseTitle: 'رامان و بوز (Raman & Bose)',
    ramanBoseRole: 'پراکندگی فوتون و رادیو نجوم',
    ramanBoseEra: 'پیشگامان عصر نوین',
    ramanBoseDesc: 'پراکندگی غیرالاستیک نور (۱۹۲۸) و آنتن‌های میلی‌متری ۶۰ گیگاهرتز؛ کشف رنگ واقعی کیهان.',
    rectilinearPropagation: 'انتشار مستقیم نور (Rectilinear Propagation)',
    spectralDispersion: 'پاشندگی طیفی (Spectral Dispersion)',
    pinholeObscura: 'اتاقک تاریک روزنه‌ای (Camera Obscura)',
    collimation: 'موازی‌سازی پرتوها (Collimation)',
    thermalFiltering: 'غلاف مایع فیلتر حرارت (Thermal Water Cell)',
    quartzPrism: 'منشور کوارتز (Sphātika Quartz)',
    universeColor: 'کیهان چه رنگی است؟',
    cosmicLatte: 'کازمیک لاته (#FFF8E7)',
    languageSelector: 'زبان موتور شبیه‌ساز',
    selectLanguage: 'انتخاب زبان سیستم',
    nativeSyncNotice: 'اتصال نیتیو: همگام‌سازی خودکار با تنظیمات سیستم‌عامل iOS و Android',
    activeLocaleTag: 'زبان فعال',
  },
};
