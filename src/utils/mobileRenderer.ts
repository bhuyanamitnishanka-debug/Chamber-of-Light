/**
 * MobileOpticalRenderer
 * High-performance touch-event throttling & frame-pacing engine.
 * Limits re-renders during high-frequency slider dragging, ensuring smooth frame pacing
 * (60 FPS / 120 FPS or 30 FPS battery-saver mode) while maintaining mobile battery efficiency.
 */

export interface ThrottleConfig {
  fpsLimit?: number; // e.g. 60 or 30
  batterySaver?: boolean;
  epsilonThreshold?: number; // minimum change required to trigger re-render
  smoothingFactor?: number; // 0 to 1 for lerp
}

export interface DragEventData {
  value: number; // normalized 0 to 1
  rawX: number;
  rawY: number;
  deltaX: number;
  deltaY: number;
}

export class MobileOpticalRenderer {
  private static instance: MobileOpticalRenderer | null = null;
  private fpsLimit: number = 60;
  private minIntervalMs: number = 1000 / 60;
  private batterySaver: boolean = false;
  private lastDispatchTimestamp: number = 0;
  private pendingRafId: number | null = null;
  private activeListeners: Map<string, (val: number) => void> = new Map();
  private pendingValues: Map<string, number> = new Map();
  private frameCount: number = 0;
  private droppedFrameCount: number = 0;

  constructor(config?: ThrottleConfig) {
    if (config?.batterySaver) {
      this.setBatterySaver(true);
    } else if (config?.fpsLimit) {
      this.setFpsLimit(config.fpsLimit);
    }
  }

  public static getInstance(): MobileOpticalRenderer {
    if (!MobileOpticalRenderer.instance) {
      MobileOpticalRenderer.instance = new MobileOpticalRenderer();
    }
    return MobileOpticalRenderer.instance;
  }

  /**
   * Set target FPS limit (e.g., 30 for low power, 60 for standard)
   */
  public setFpsLimit(fps: number): void {
    this.fpsLimit = Math.max(15, Math.min(120, fps));
    this.minIntervalMs = 1000 / this.fpsLimit;
  }

  /**
   * Toggle battery-saver mode (caps execution to 30 FPS and skips micro-jitter)
   */
  public setBatterySaver(enabled: boolean): void {
    this.batterySaver = enabled;
    this.fpsLimit = enabled ? 30 : 60;
    this.minIntervalMs = 1000 / this.fpsLimit;
  }

  public isBatterySaver(): boolean {
    return this.batterySaver;
  }

  public getFpsLimit(): number {
    return this.fpsLimit;
  }

  public getStats() {
    return {
      fpsLimit: this.fpsLimit,
      batterySaver: this.batterySaver,
      frameCount: this.frameCount,
      droppedFrameCount: this.droppedFrameCount,
    };
  }

  /**
   * Throttles high-frequency touch/pointer value updates using requestAnimationFrame
   * and timestamp gating to limit expensive React re-renders.
   */
  public throttleValueChange(
    key: string,
    nextValue: number,
    callback: (val: number) => void,
    epsilon: number = 0.005
  ): void {
    this.activeListeners.set(key, callback);

    const prevValue = this.pendingValues.get(key);
    if (prevValue !== undefined && Math.abs(nextValue - prevValue) < epsilon) {
      // Sub-threshold change, ignore to conserve CPU/battery
      return;
    }

    this.pendingValues.set(key, nextValue);

    if (this.pendingRafId === null) {
      this.pendingRafId = requestAnimationFrame((now) => this.flushScheduledUpdates(now));
    }
  }

  private flushScheduledUpdates(timestamp: number): void {
    this.pendingRafId = null;
    const elapsed = timestamp - this.lastDispatchTimestamp;

    if (elapsed < this.minIntervalMs) {
      this.droppedFrameCount++;
      // Schedule for the next eligible frame if pending values exist
      if (this.pendingValues.size > 0 && this.pendingRafId === null) {
        this.pendingRafId = requestAnimationFrame((t) => this.flushScheduledUpdates(t));
      }
      return;
    }

    this.lastDispatchTimestamp = timestamp;
    this.frameCount++;

    // Dispatch all pending updates in one cohesive tick
    this.pendingValues.forEach((val, key) => {
      const listener = this.activeListeners.get(key);
      if (listener) {
        listener(val);
      }
    });

    this.pendingValues.clear();
  }

  /**
   * Attaches touch-drag event listeners to an element with automatic touch coordinate extraction,
   * passive handling, and throttled output.
   */
  public attachTouchDrag(
    element: HTMLElement,
    onValueNormalized: (normalized: number) => void,
    options: {
      orientation?: 'horizontal' | 'vertical';
      min?: number;
      max?: number;
      step?: number;
      initial?: number;
      key?: string;
    } = {}
  ): () => void {
    const key = options.key || `slider_${Math.random().toString(36).substring(2, 9)}`;
    const orientation = options.orientation || 'horizontal';
    let isDragging = false;

    const computeNormalized = (clientX: number, clientY: number): number => {
      const rect = element.getBoundingClientRect();
      if (orientation === 'horizontal') {
        const x = clientX - rect.left;
        return Math.max(0, Math.min(1, x / rect.width));
      } else {
        const y = clientY - rect.top;
        return Math.max(0, Math.min(1, 1 - y / rect.height));
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      element.setPointerCapture(e.pointerId);
      const norm = computeNormalized(e.clientX, e.clientY);
      this.throttleValueChange(key, norm, onValueNormalized, 0.001);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const norm = computeNormalized(e.clientX, e.clientY);
      this.throttleValueChange(key, norm, onValueNormalized, 0.001);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        try {
          element.releasePointerCapture(e.pointerId);
        } catch {
          // ignore pointer capture errors if already released
        }
      }
    };

    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerup', handlePointerUp);
    element.addEventListener('pointercancel', handlePointerUp);

    // Cleanup function
    return () => {
      element.removeEventListener('pointerdown', handlePointerDown);
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerup', handlePointerUp);
      element.removeEventListener('pointercancel', handlePointerUp);
      this.activeListeners.delete(key);
      this.pendingValues.delete(key);
    };
  }

  // --- Engine Multi-Language Localization System ('en' | 'sa' | 'fa') ---
  private engineLanguage: 'en' | 'sa' | 'fa' = 'en';
  private languageListeners: Set<(lang: 'en' | 'sa' | 'fa') => void> = new Set();

  /**
   * Set engine language and notify all active listeners
   */
  public setEngineLanguage(lang: 'en' | 'sa' | 'fa'): void {
    const validLocales: Array<'en' | 'sa' | 'fa'> = ['en', 'sa', 'fa'];
    const target = validLocales.includes(lang) ? lang : 'en';
    this.engineLanguage = target;

    // Apply document-level RTL/LTR and lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = target;
      document.documentElement.dir = target === 'fa' ? 'rtl' : 'ltr';
    }

    // Trigger telemetry event to native bridge
    if (typeof window !== 'undefined') {
      const nativePayload = JSON.stringify({
        event: 'LANGUAGE_CHANGED',
        payload: { language: target, dir: target === 'fa' ? 'rtl' : 'ltr' },
        timestamp: Date.now(),
      });
      // iOS WebKit Message Handler
      try {
        const win = window as any;
        if (win.webkit?.messageHandlers?.nativeOpticalBridge) {
          win.webkit.messageHandlers.nativeOpticalBridge.postMessage(nativePayload);
        }
        // Android JavascriptInterface
        if (win.AndroidOpticalBridge?.sendTelemetry) {
          win.AndroidOpticalBridge.sendTelemetry(nativePayload);
        }
      } catch {
        // Native bridge optional in web browser preview
      }
    }

    // Notify registered UI subscribers
    this.languageListeners.forEach((listener) => {
      try {
        listener(target);
      } catch (err) {
        console.error('Error in language listener:', err);
      }
    });
  }

  /**
   * Get active engine language
   */
  public getEngineLanguage(): 'en' | 'sa' | 'fa' {
    return this.engineLanguage;
  }

  /**
   * Subscribe to engine language changes
   */
  public onLanguageChange(callback: (lang: 'en' | 'sa' | 'fa') => void): () => void {
    this.languageListeners.add(callback);
    callback(this.engineLanguage);
    return () => {
      this.languageListeners.delete(callback);
    };
  }

  /**
   * Deep Memory Evacuation Routine (as requested by iOS / Android WebView lifecycle)
   */
  public destroyEngineContext(): void {
    if (this.pendingRafId !== null) {
      cancelAnimationFrame(this.pendingRafId);
      this.pendingRafId = null;
    }
    this.activeListeners.clear();
    this.pendingValues.clear();
    console.log('🧹 MobileOpticalRenderer context safely evacuated.');
  }
}

// Bind AppEngineCore to window object for iOS WKWebView & Android WebView evaluation
if (typeof window !== 'undefined') {
  const win = window as any;
  win.AppEngineCore = {
    setEngineLanguage: (lang: 'en' | 'sa' | 'fa') => {
      MobileOpticalRenderer.getInstance().setEngineLanguage(lang);
    },
    getEngineLanguage: () => {
      return MobileOpticalRenderer.getInstance().getEngineLanguage();
    },
    receiveNativeCommand: (jsonPayloadString: string) => {
      try {
        const payload = JSON.parse(jsonPayloadString);
        if (payload.command === 'SET_LANGUAGE' && payload.value) {
          MobileOpticalRenderer.getInstance().setEngineLanguage(payload.value);
        } else if (payload.command === 'DESTROY_CONTEXT') {
          MobileOpticalRenderer.getInstance().destroyEngineContext();
        }
      } catch (e) {
        console.error('AppEngineCore failed to parse native command:', e);
      }
    },
    destroyEngineContext: () => {
      MobileOpticalRenderer.getInstance().destroyEngineContext();
    },
  };
}

export const mobileOpticalRenderer = MobileOpticalRenderer.getInstance();
