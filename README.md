# 🏛️ Optical Spectroscopy Engine (Graphic Novel App Core)

A monolithic, ultra-high-performance 2D/3D WebGL optical simulation engine designed for low-latency sandboxed execution within native mobile application wrappers (`iOS WKWebView`, `Android WebView`, and `Flutter Platform Views`). 

This engine pairs with narrative modules to illustrate the global evolution of camera and light science—tracing physics concepts from **Mozi's rectilinear propagation models (Ancient China)**, through **Ibn al-Haytham’s dark rooms (Islamic Golden Age Iran/Egypt)**, to the precision glass and crystal dispersion mechanics detailed in technical traditions like the **Aṁśu Bodhinī**.

---

## ⚡ Core Engine Highlights
* **Zero-Latency Monolithic Architecture:** All CSS vector graphics, WebGL rendering loops, and asynchronous bridge channels are compiled into a single `index.html` file to instantly bypass local browser sandboxing `CORS` restrictions.
* **Mobile-Clamped Render Loop:** Enforces a hard `60 FPS` loop on mobile chipsets using an `isDirty` reactive drawing framework that cuts off execution loops during static reading segments to prevent device battery drain and thermal throttling.
* **BCP-47 Auto-Localization Matrix:** Features a runtime-swappable translation grid supporting English (`en`), Sanskrit (`sa`), and Persian (`fa`) UI elements out of the box.
* **Deep Memory Recycling Safety:** Includes manual teardown hooks (`destroyEngineContext()`) that collapse canvas components down to `1x1` buffers, preventing memory leaks during multi-hour app usage.

---

## 📂 Structural Project Directory Layout

```text
my-graphic-novel-app/
├── .github/workflows/
│   └── deploy-optics.yml       # Production GitHub Actions CI/CD Pipeline
├── src/
│   └── optical-engine/
│       └── index.html          # Source Engine File (HTML5/ES6/WebGL Core)
├── scripts/
│   └── bundle-optics.js        # Minification & Build Automation Utility Script
├── native-platforms/
│   ├── iOS/                    # Xcode Target Shell Workspace Container
│   ├── Android/                # Android Studio/Gradle Architecture Roots
│   └── Flutter/                # Cross-Platform Integration Assets Folder
└── README.md                   # System Architecture Documentation (This File)
```

---

## 🛠️ Local Engine Pipeline Automation

### Installation
Ensure your desktop or compilation environment runs **Node.js 20+**. Fetch runtime dependencies locally by executing:
```bash
npm ci
```

### Development Execution & Build Processing
To compile the raw development script nodes, strip code comments, minify file layouts, and deploy the asset files simultaneously to all host wrapper structures, run the optimization build step:
```bash
npm run build:optics
```

---

## 🔌 Host Bridge Interoperability Layer

The engine uses a bi-directional platform interface to sync with the native operating system.

### Outbound Telemetry Pipeline (JavaScript -> Native)
The engine transmits real-time telemetry packets (e.g., dial modifications) directly across cross-platform message channels:
```json
{
  "event": "ANGLE_CHANGED",
  "payload": { "angle": 45.0 },
  "timestamp": 1791581700000
}
```

### Inbound Parameter Control Commands (Native -> JavaScript)
To pass commands from native app events (such as text box adjustments or tutorial flows) back down into the WebGL simulation, pass structured payloads directly to the core runtime listener hook:

```javascript
// Example: Trigger alchemical fluid cell injection from Swift/Kotlin components
window.AppEngineCore.receiveNativeCommand('{"command": "INJECT_SOLUTION", "value": 2}');
```

---

## 🔬 Local Device QA Verification Checklist
Before committing pipeline upgrades to the `main` tracking branch, execute these quality assurance checks on a connected device:
1. **Haptic Calibration Snapping:** Drag the prism dial slowly toward `45.0°`. Verify that the physical hardware emits a precise tactile pulse right when alignment locks onto the centerline target.
2. **Memory Leak Inspection:** Navigate between app pages 10 times consecutively while tracking memory graphs in Xcode Profiler or Android Studio Profiler. Ensure the system total flatlines to its baseline, verifying memory is being wiped correctly.
3. **OS System Locale Detection:** Change your test device's system interface language to Persian or Sanskrit. Relaunch the engine and confirm that HUD nodes automatically render structural terms like **"Al-Bayt al-Muzlim"** or **"Chhādya-Gṛha Yantra"**.

---
🔬 Interactive Camera Modules & Experimental Physics

The engine houses two distinct, historically significant optical setups. Both are built to demonstrate the rectilinear propagation of light and the mathematical breakdown of light energy.
                    [ MODULE 01: PINHOLE CAMERA SANDBOX ]
              Light Rays Cross Natively Through a Small Aperture
    
        Object (Sky/Tree)                                Inverted Real Image
             (Top)   \                                  /   (Bottom)
                      \        ┌─ Pinhole ─┐           /
                       ───────>│     •     │──────────>
                      /        └───────────┘           \
          (Bottom)   /                                  \   (Top)

Module 01: Pinhole Camera Engine ([Mod_01])

• Scientific Core: Demonstrates that light travels in perfectly straight lines (rectilinear propagation). When rays filter through a constrained aperture, they cross at a central point, projecting a real, inverted, and reversed representation of the external scene onto the back viewing wall.
• Historical Track: Maps the observations of Mozi (China, c. 400 BCE) regarding crossing rays and the mathematical proofs of Ibn al-Haytham (Persia/Egypt, c. 1010 CE), who designed the Al-Bayt al-Muzlim (Dark Room) to establish experimental optics.
• Interactive Variable Physics:
	• Focal Length (f): User adjustments change the depth of the box, altering magnification levels and light distribution metrics.
	• Aperture Diameter (d): Implements Lord Rayleigh’s Optimization Formula (\(d \approx 1.9 \times \sqrt{f \times \lambda}\)). The simulator models the push-and-pull between geometric overlap (blurring caused by large holes) and wave interference patterns (fuzziness caused by diffraction when holes drop below 0.6mm).
                     [ MODULE 02: SPECTROMETER MATRIX ]
          Sunbeam Isolated -> Thermal Filtered -> Crystalline Dispersed
    
     [Raw Sunlight] ──> [Collimating Lens] ──> [Fluid Cell (NIR Sink)] ──> [Quartz Prism] ──> [Spectrum]

Module 02: Spectrometer Matrix ([Mod_02])

• Scientific Core: Demonstrates optical isolation, thermal filtration, and spectral dispersion. Instead of mapping an image to a plane, this module strips spatial image points to profile the raw wavelength spectrum of the light source itself.
• Historical Track: Explores mechanics described in classical technical traditions like the Aṁśu Bodhinī, bridging ancient global concepts of solar profiling with the foundational Western prism experiments of Sir Isaac Newton.
• Interactive Variable Physics:
	• Fluid Cell Absorption (Rasa-Dravya): Models dynamic Near-Infrared (NIR) attenuation. Users inject solutions like Shuddha Jala (Water) or Kāsīsa (Iron-sulfate mix) to absorb raw thermal energy, stabilizing high-intensity light beams while selectively filtering specific color bands.
	• Angle of Incidence (\(\theta _{i}\)): Users rotate a natural quartz crystal elements prism (Sphātika Darpana) to calculate Snell's Law updates in real time, driving color refraction widths across the display.
💰 Experimental Setup Cost & Bill of Materials (BOM)

To assist curriculum developers, makers, and students using this graphic novel app, the table below outlines the real-world manufacturing and component costs required to replicate these digital simulations physically.

Component / Material	Function	Physical Realization Type	Estimated Cost (USD)	Estimated Cost (INR)
Module 01: Pinhole Camera				
Recycled Cardboard Box	Camera Body / Opaque Dark Enclosure	Upcycled Content (Shoebox / Shipping)	$0.00	₹0
Heavy-duty Aluminum Foil	Clean, light-blocking sheet for aperture	Household Kitchen Supply	$0.20	₹15
Tracing / Matte White Paper	Translucent projection viewing screen	Standard Stationery Office Stock	$0.10	₹10
Matte Black Paint or Paper	Inner lining to isolate environmental scattering	Standard Craft Supply	$1.50	₹120
Pinhole Aperture Needle	Puncturing clean 0.5mm - 1.5mm opening	Household Tool	$0.05	₹5
Total Physical Cost (Mod 01)	Geometric Ray Projection Assembly	Low-Cost Maker Project	~$1.85	~₹150
				Module 02: Spectrometer				
Collimating Lens (Jabākācha)	Focuses ambient sunbeams into narrow paths	Flux Purified Optical Convex Lens	$12.00	₹1,000
Liquid Absorption Vessel	Water / Alchemical solution jacket (NIR Heat Sink)	Quartz Glass Cylindrical Cell	$8.50	₹700
Quartz Prism (Sphātika)	UV-Visible-IR wide-band spectral dispersion	Pure Natural Triangular Quartz Crystal	$22.00	₹1,800
Brass / Hardwood Enclosure	Secure internal alignment tracking chassis	Machined Precision Mechanical Jig	$18.00	₹1,500
Alchemical Salts (Kāsīsa / Alum)	Wavelength pre-filtering solution matrix	Refined Mineral Compounds	$3.50	₹300
Total Physical Cost (Mod 02)	Precision Optical Spectrometry Platform	Scientific Apparatus Level	~$64.00	~₹5,300


Key Economic Takeaways:

• The Pinhole Advantage: Module 01 represents a near zero-cost engineering baseline. It proves that fundamental geometric optics can be analyzed using entirely upcycled everyday materials.
• The Spectrometer Baseline: Module 02 transitions into a specialized research instrument layout. The higher cost reflects the precision manufacturing required for optical-grade natural quartz elements (Sphātika) and purified, heat-resistant glass housings capable of focusing raw solar radiation safely without cracking.
🛠️ Classroom Sourcing Guide: Low-Cost Spectrometer Alternatives

To bring down the physical hardware budget of Module 02 from a scientific apparatus tier (~₹5,300) to an accessible classroom layer, use these mass-produced alternative components. This keeps the experimental physics intact while cutting baseline setup costs by more than 70%.

Budget Component Equivalents Matrix

• Dispersion Element (Prism):
	• Premium: Pure Natural Crystalline Quartz Crystal (Sphātika) [~₹1,800]
	• Low-Cost Alternative: Equilateral Acrylic / Polymer Prism (50mm) [~₹250 - ₹350]
	• Sourcing: Local educational lab suppliers or mass e-commerce catalogs. Acrylic provides high visible spectrum transmission, though it cuts off ultraviolet bands.
• Collimating Lens:
	• Premium: Custom Flux-Purified Convex Glass Lens (Jabākācha) [~₹1,000]
	• Low-Cost Alternative: Double Convex Acrylic Lens (Focal Length: 100mm–150mm) [~₹120 - ₹200]
	• Sourcing: Hobbyist optician sets or science kits.
• Liquid Vessel Housing:
	• Premium: Quartz Glass Cylindrical Cell [~₹700]
	• Low-Cost Alternative: Clear Borosilicate Glass Sample Vial or Acrylic Liquid Cell [~₹80 - ₹150]
	• Sourcing: Standard chemical supply channels or repurposed thick-walled clear containers.
• Chassis / Enclosure:
	• Premium: Machined Brass & Hardwood Alignment Jig [~₹1,500]
	• Low-Cost Alternative: 3D-Printed PLA Housing or Rigid Corrugated PVC Board Panels [~₹150 - ₹300]
	• Sourcing: Local makerspaces, school 3D printers, or standard hardware shops.

Adjusted Classroom Budget Projection

  ┌──────────────────────────────────────────────────────────┐
  │  Original Premium Hardware Blueprint Budget:  ~₹5,300   │
  └────────────────────────────┬─────────────────────────────┘
                               │
                               ▼ [Component Substitution]
  ┌──────────────────────────────────────────────────────────┐
  │  Classroom Optimized Component Budget:       ~₹1,150     │
  └──────────────────────────────────────────────────────────┘
By shifting to standard polymer optics and local structural boards, an entire classroom laboratory module set can be constructed for roughly ₹1,100 to ₹1,200 ($14.00 USD).
🏛️ लॉस्ट-वैक्स कास्टिंग और कैमरा एक्सपेरिमेंट्स में भविष्य की गुंजाइश (Future Scope for Research)

लॉस्ट-वैक्स कास्टिंग तकनीक केवल मूर्तियाँ बनाने तक सीमित नहीं है, बल्कि इसका उपयोग माइक्रो-मैकेनिकल और ऑप्टिकल हार्डवेयर इंजीनियरिंग में एक क्रांति ला सकता है। इस सेटअप पर निम्नलिखित एडवांस प्रयोग किए जा सकते हैं:

1. मेटल-बॉडी कैमरा ऑब्सक्यूरा (Durable Metal-Chassis Chamber)

• प्रयोग: कार्डबोर्ड बॉक्स के स्थान पर, पूरी तरह से पीतल (Brass) या कांसे (Bronze) से ढला हुआ एक सॉलिड ऑप्टिकल चैंबर बनाना।
• फायदा: यह आंतरिक प्रकाश के बिखराव (Internal Scatter) को पूरी तरह शून्य कर देगा और बाहरी वातावरणीय तापमान या नमी से कैमरे को सुरक्षित रखेगा, जिससे यह 100 साल तक चलने वाला एक टिकाऊ वैज्ञानिक उपकरण बन जाएगा।

2. माइक्रो-थ्रेड अपर्चर कंट्रोल (Lost-Wax Thread Casting Aperture)

• प्रयोग: एल्युमिनियम फॉयल में सुई से छेद करने के बजाय, लॉस्ट-वैक्स की बारीक धागा-कास्टिंग विधि (Lost-wax thread casting) का उपयोग करके धातु की प्लेट पर 0.1mm से 0.5mm के अत्यधिक सटीक, गोल और बूर-मुक्त (Burr-free) अपर्चर होल तैयार करना।
• फायदा: इससे लाइट रेज़ बिना किसी रुकावट या विवर्तन (Diffraction) के सीधे गुजरेंगी, जिससे बनने वाली इमेज की शार्पनेस 10 गुना तक बढ़ जाएगी।

3. इंटीग्रेटेड लेंस होल्डर और टेलिस्कोपिक ट्यूब (Cast Component Mechanics)

• प्रयोग: कैमरे के आगे जबाकांच (Collimating Lens) को सेट करने के लिए लॉस्ट-वैक्स विधि से सटीक ग्रूव्स (खांचे) वाला लेंस होल्डर और एक एडजस्टेबल मैकेनिज्म ढालना।
• फायदा: यह बिना किसी आधुनिक CNC मशीन की सहायता के, केवल पारंपरिक कारीगरी और सटीक रेखाचित्रों (Engineering Blueprints) के माध्यम से एक पूरी तरह कामकाजी मैकेनिकल ज़ूम मैकेनिज्म तैयार करने का मार्ग प्रशस्त करेगा।

4. रसशाला इलेक्ट्रोकैमिस्ट्री और ऑप्टिकल सेंसर इंटीग्रेशन (Chemical-Sensitized Plates)

• प्रयोग: इस धातु के कैमरे के भीतर, प्राचीन भारतीय रसायन विज्ञान और धातुकर्म (Rasashastra) के सिद्धांतों के अनुसार तैयार किए गए खनिज लवणों (जैसे चांदी/तांबे के सल्फेट्स) के घोल या लेपित प्लेट्स को रखकर प्रकाश-संवेदनशील (Light-sensitive) रासायनिक अभिक्रियाओं का परीक्षण करना।
• फायदा: यह आधुनिक फोटोग्राफी फिल्म या फोटो-पेपर को पूरी तरह से स्वदेशी और पारंपरिक ज्ञान (जैसे Chitrasutra के रंग-मिश्रण सिद्धांत) के आधार पर रिवर्स-इंजीनियर करने का एक अभूतपूर्व प्रयोग हो सकता है।

📝 README.md के लिए अपडेटेड नोट (Add to Document)

आप अपनी फाइल में यह छोटा सा पैराग्राफ जोड़ सकते हैं ताकि रिव्यू करने वाले डेवलपर्स या प्रोफेसरों को पता चले कि इस प्रोजेक्ट में आगे कितनी बड़ी रिसर्च की संभावना है:
markdown
## 🔮 भविष्य के प्रयोगों की संभावनाएं (Future Experimental Scope)

इस परियोजना में "लॉस्ट-वैक्स कास्टिंग (Lost-Wax Casting)" तकनीक को शामिल करके भविष्य के उन्नत प्रयोगों के लिए व्यापक गुंजाइश (Scope) छोड़ी गई है:
* **मेटल-ऑप्टिकल चैंबर:** कार्डबोर्ड को टिकाऊ पीतल/कांस्य कास्टिंग से बदलना।
* **प्रिसिजन थ्रेड अपर्चर:** बारीक मोम के धागे की तकनीक से सटीक 0.5mm माइक्रोन-स्तरीय अपर्चर बनाना।
* **मैकेनिकल कपलिंग:** बिना सीएनसी मशीनों के, पारंपरिक ढलाई से लेंस होल्डर और फोकल-स्लाइडर मैकेनिज्म तैयार करना।
* **इलेक्ट्रो-केमिकल सेंसिंग:** प्रकाश को रिकॉर्ड करने के लिए रसशाला ग्रंथों पर आधारित रासायनिक घटकों का परीक्षण।
Use code with caution.
🏛️ ଗୋଟିଏ କ୍ୟାମେରା ବାକ୍ସ ଏବଂ ମଲ୍ଟି-ଏକ୍ସପେରିମେଣ୍ଟର ସୁଯୋଗ (Future Scope for Multiple Experiments)


୧. କ୍ଷୁଦ୍ର ଦର୍ପଣ ନେଟୱର୍କ (Miniature Mirror Alignment)

• ପରୀକ୍ଷା: ବାକ୍ସ ଭିତରେ କୋଣ ଅନୁକ୍ରମରେ ଛୋଟ ଛୋଟ ଦର୍ପଣ (Mirrors) ଲଗାଇ ଆଲୋକ ରଶ୍ମିର ଗତିପଥକୁ ବଦଳାଇବା (Multiple Internal Refraction)।
• ଲାଭ: ଏହା ଦ୍ବାରା ବାକ୍ସର ଆକାର ନବଢ଼ାଇ ମଧ୍ୟ ଆଲୋକର ଫୋକାଲ୍ ଲିଙ୍ଗଥ୍ (Focal Length) କୁ ଅତି ସହଜରେ ନିୟନ୍ତ୍ରଣ କରାଯାଇପାରିବ ଏବଂ ପ୍ରତିବିମ୍ବକୁ ଅଧିକ ସ୍ପଷ୍ଟ କରାଯାଇପାରିବ।

୨. ଅଗସ୍ତ୍ୟ ଇଲେକ୍ଟ୍ରିକ୍ ପଟ୍ ସଂଯୋଗ (Agastya Samhita Electric Pot Integration)

• ପରୀକ୍ଷା: ପ୍ରାଚୀନ ଭାରତୀୟ ରସାୟନ ବିଜ୍ଞାନ ଆଧାରିତ ତ୍ରାମ୍ର ପ୍ଲେଟ୍, ଜିଙ୍କ୍ ଏବଂ ସଲଫ୍ୟୁରିକ୍ ଏସିଡ୍ ବିଶିଷ୍ଟ ଅଗସ୍ତ୍ୟ ବ୍ୟାଟେରୀ ସେଲ୍ (Electric Pot) କୁ ବାକ୍ସ ଭିତରେ ସ୍ଥାପନ କରିବା।
• ଲାଭ: ଏହି ସ୍ୱଦେଶୀ ଶକ୍ତି ଉତ୍ସ ଦ୍ବାରା କ୍ୟାମେରା ମଡ୍ୟୁଲ୍ ମଧ୍ୟରେ ଥିବା ଆଲୋକ ପ୍ରକ୍ରିୟା ଏବଂ କ୍ଷୁଦ୍ର ସେନ୍ସର ଗୁଡ଼ିକୁ ସମ୍ପୂର୍ଣ୍ଣ ରୂପେ ସେଲ୍ଫ-ପାୱାର୍ଡ (Self-Powered) କରାଯାଇପାରିବ।

୩. ଲିଥିୟମ୍-ଆୟନ୍ ବ୍ୟାଟେରୀ ଏବଂ ପାୱାର୍ ମ୍ୟାନେଜମେଣ୍ଟ (Lithium-Ion & Hybrid Battery Setup)

• ପରୀକ୍ଷା: ଆଧୁନିକ ଲିଥିୟମ୍-ଆୟନ୍ ବ୍ୟାଟେରୀ (Lithium-Ion Battery) ସହିତ ଅଗସ୍ତ୍ୟ ପଟ୍‌କୁ ଏକ ହାଇବ୍ରିଡ୍ ପାୱାର୍ ସିଷ୍ଟମ୍ ଭାବେ ବାକ୍ସରେ ଖଞ୍ଜିବା।
• ଲାଭ: ଏହା ଦ୍ବାରା କ୍ୟାମେରା ଭିତରେ ଥିବା କ୍ଷୁଦ୍ର ଏଲ୍.ଇ.ଡି (LED), ଭେଣ୍ଟିଲେସନ୍ ଫ୍ୟାନ୍ କିମ୍ବା ଆଲାର୍ମ ସିଷ୍ଟମକୁ ଦୀର୍ଘ ସମୟ ପର୍ଯ୍ୟନ୍ତ ନିରବଚ୍ଛିନ୍ନ ଶକ୍ତି ମିଳିପାରିବ।

୪. କ୍ଷୁଦ୍ର କ୍ଷେତ୍ରୀୟ ପରୀକ୍ଷା (Sensor & IoT Experiments)

• ପରୀକ୍ଷା: ବାକ୍ସ ମଧ୍ୟରେ ୱାଇ-ଫାଇ ଆଇଓଟି (WiFi-IoT) ନେଟୱର୍କ କିମ୍ବା ଆଲେକ୍ସା ସିଷ୍ଟମ ଲଗାଇ ଆଲୋକର ତୀବ୍ରତା (Lux Metrics) ଏବଂ ତାପମାତ୍ରାକୁ ରିମୋଟ୍‌ଲି ମନିଟରିଂ କରିବା।

📝 README.md ପାଇଁ ଓଡ଼ିଆ ଅପଡେଟେଡ୍ ନୋଟ୍ (Add to Document)

ଆପଣ ଆପଣଙ୍କର GitHub README ଫାଇଲ୍‌ରେ ଏହି ବିଷୟକୁ ଏକ "Future Core Roadmap" ଭାବରେ ଯୋଡ଼ିପାରିବେ:
markdown
## 🔮 ବହୁମୁଖୀ ପରୀକ୍ଷାର ସମ୍ଭାବନା (Advanced Multi-Experiment Roadmap)

ଏହି କ୍ୟାମେରା ବାକ୍ସର ସଂରଚନା ଏପରି କରାଯାଇଛି ଯେଉଁଥିରେ ଗୋଟିଏ ପ୍ଲାଟଫର୍ମରେ ଏକାଧିକ ଉନ୍ନତ ଇଞ୍ଜିନିୟରିଂ ପରୀକ୍ଷା ପାଇଁ ବ୍ୟାପକ ସୁଯୋଗ (Scope) ରହିଛି:
* **ଇଣ୍ଟରନାଲ୍ ମିରର୍ ନେଟୱର୍କ:** ଆଲୋକର ପ୍ରତିଫଳନକୁ ନିୟନ୍ତ୍ରଣ କରିବା ପାଇଁ ଛୋଟ ଛୋଟ ଦର୍ପଣର ବ୍ୟବହାର।
* **ଅଗସ୍ତ୍ୟ ଇଲେକ୍ଟ୍ରିକ୍ ପଟ୍:** ପ୍ରାଚୀନ ଭାରତୀୟ ଇଲେକ୍ଟ୍ରୋ-କେମିଷ୍ଟ୍ରି ଆଧାରରେ କ୍ୟାମେରାକୁ ସେଲ୍ଫ-ପାୱାର୍ଡ କରିବା।
* **ହାଇବ୍ରିଡ୍ ଶକ୍ତି ସ୍ରୋତ:** ସିଷ୍ଟମ୍ ସ୍ଥିରତା ପାଇଁ ଲିଥିୟମ୍-ଆୟନ୍ ବ୍ୟାଟେରୀ ଏବଂ ପାୱାର୍ ମ୍ୟାନେଜମେଣ୍ଟ କୋଡ୍‌ର ଏକୀକରଣ।
* **ମଡ୍ୟୁଲାର୍ ହାର୍ଡୱେର୍ ସ୍ପେସ୍:** ଭବିଷ୍ୟତରେ ଅନ୍ୟାନ୍ୟ କ୍ଷୁଦ୍ର ମେକାନିକାଲ୍ ଏବଂ ଇଲେକ୍ଟ୍ରୋନିକ୍ସ ଉପକରଣ ଯୋଡ଼ିବା ପାଇଁ ଉନ୍ମୁକ୍ତ ସୁଯୋଗ।
Use code with caution.




