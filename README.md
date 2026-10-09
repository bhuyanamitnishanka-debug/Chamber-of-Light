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

