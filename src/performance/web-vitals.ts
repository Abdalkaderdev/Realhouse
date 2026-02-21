// ═══════════════════════════════════════════════════════════════════════════
// Web Vitals - Core Web Vitals Performance Monitoring
// Target: LCP < 2.5s, FID < 100ms, CLS < 0.1, INP < 200ms for Top Google Ranking
// ═══════════════════════════════════════════════════════════════════════════

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
  entries?: PerformanceEntry[];
}

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  inp?: number;
}

// Rating thresholds based on Google's Core Web Vitals (2024 targets)
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },   // Target: < 2.5s
  FID: { good: 100, poor: 300 },     // Target: < 100ms
  CLS: { good: 0.1, poor: 0.25 },    // Target: < 0.1
  FCP: { good: 1800, poor: 3000 },   // Target: < 1.8s
  TTFB: { good: 800, poor: 1800 },   // Target: < 800ms
  INP: { good: 200, poor: 500 }      // Target: < 200ms (replaces FID)
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

type MetricCallback = (metric: WebVitalMetric) => void;

let metrics: PerformanceMetrics = {};

// Log metrics with color coding
function logMetric(metric: WebVitalMetric): void {
  const colors = {
    good: '#0CCE6B',
    'needs-improvement': '#FFA400',
    poor: '#FF4E42'
  };

  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
    const icon = metric.rating === 'good' ? '✓' : metric.rating === 'poor' ? '✗' : '!';
    console.log(
      `%c${icon} ${metric.name}: ${metric.value.toFixed(metric.name === 'CLS' ? 3 : 0)}${metric.name === 'CLS' ? '' : 'ms'} (${metric.rating})`,
      `color: ${colors[metric.rating]}; font-weight: bold;`
    );
  }
}

// Send metrics to analytics
function sendToAnalytics(metric: WebVitalMetric): void {
  if (typeof import.meta !== 'undefined' && import.meta.env?.PROD) {
    // Google Analytics 4
    if (typeof gtag === 'function') {
      gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_rating: metric.rating,
        navigation_type: metric.navigationType
      });
    }

    // Custom endpoint (optional)
    // navigator.sendBeacon('/api/vitals', JSON.stringify(metric));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// LCP - Largest Contentful Paint (Target: < 2.5s)
// ─────────────────────────────────────────────────────────────────────────────

function observeLCP(callback: MetricCallback): PerformanceObserver | null {
  if (!('PerformanceObserver' in window)) return null;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        startTime: number;
        element?: Element;
        url?: string;
      };

      if (lastEntry) {
        const value = lastEntry.startTime;
        metrics.lcp = value;

        callback({
          name: 'LCP',
          value,
          rating: getRating('LCP', value),
          delta: value,
          id: `lcp-${Date.now()}`,
          navigationType: getNavigationType(),
          entries: [lastEntry]
        });

        // Log LCP element for debugging
        if (typeof import.meta !== 'undefined' && import.meta.env?.DEV && lastEntry.element) {
          console.log('[LCP Element]', lastEntry.element);
        }
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
    return observer;
  } catch (e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FID - First Input Delay (Target: < 100ms)
// ─────────────────────────────────────────────────────────────────────────────

function observeFID(callback: MetricCallback): PerformanceObserver | null {
  if (!('PerformanceObserver' in window)) return null;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0] as PerformanceEventTiming;

      if (firstEntry) {
        const value = firstEntry.processingStart - firstEntry.startTime;
        metrics.fid = value;

        callback({
          name: 'FID',
          value,
          rating: getRating('FID', value),
          delta: value,
          id: `fid-${Date.now()}`,
          navigationType: getNavigationType(),
          entries: [firstEntry]
        });
      }
    });

    observer.observe({ type: 'first-input', buffered: true });
    return observer;
  } catch (e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CLS - Cumulative Layout Shift (Target: < 0.1)
// ─────────────────────────────────────────────────────────────────────────────

function observeCLS(callback: MetricCallback): PerformanceObserver | null {
  if (!('PerformanceObserver' in window)) return null;

  let clsValue = 0;
  let sessionValue = 0;
  let sessionEntries: PerformanceEntry[] = [];

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean; sources?: { node?: Element }[] })[]) {
        // Only count shifts not preceded by user input
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0] as PerformanceEntry | undefined;
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1] as PerformanceEntry | undefined;

          // Session window: <1s between entries, <5s total
          if (
            sessionValue &&
            entry.startTime - (lastSessionEntry?.startTime || 0) < 1000 &&
            entry.startTime - (firstSessionEntry?.startTime || 0) < 5000
          ) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            metrics.cls = clsValue;

            callback({
              name: 'CLS',
              value: clsValue,
              rating: getRating('CLS', clsValue),
              delta: entry.value,
              id: `cls-${Date.now()}`,
              navigationType: getNavigationType(),
              entries: sessionEntries
            });

            // Log CLS sources for debugging
            if (typeof import.meta !== 'undefined' && import.meta.env?.DEV && entry.sources) {
              entry.sources.forEach(source => {
                if (source.node) {
                  console.log('[CLS Source]', source.node);
                }
              });
            }
          }
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });
    return observer;
  } catch (e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FCP - First Contentful Paint
// ─────────────────────────────────────────────────────────────────────────────

function observeFCP(callback: MetricCallback): PerformanceObserver | null {
  if (!('PerformanceObserver' in window)) return null;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');

      if (fcpEntry) {
        const value = fcpEntry.startTime;
        metrics.fcp = value;

        callback({
          name: 'FCP',
          value,
          rating: getRating('FCP', value),
          delta: value,
          id: `fcp-${Date.now()}`,
          navigationType: getNavigationType()
        });

        observer.disconnect();
      }
    });

    observer.observe({ type: 'paint', buffered: true });
    return observer;
  } catch (e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TTFB - Time to First Byte
// ─────────────────────────────────────────────────────────────────────────────

function observeTTFB(callback: MetricCallback): PerformanceObserver | null {
  if (!('PerformanceObserver' in window)) return null;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const navigationEntry = entries[0] as PerformanceNavigationTiming;

      if (navigationEntry) {
        const value = navigationEntry.responseStart - navigationEntry.requestStart;
        metrics.ttfb = value;

        callback({
          name: 'TTFB',
          value,
          rating: getRating('TTFB', value),
          delta: value,
          id: `ttfb-${Date.now()}`,
          navigationType: getNavigationType()
        });

        observer.disconnect();
      }
    });

    observer.observe({ type: 'navigation', buffered: true });
    return observer;
  } catch (e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// INP - Interaction to Next Paint (Target: < 200ms, replaces FID in 2024)
// ─────────────────────────────────────────────────────────────────────────────

function observeINP(callback: MetricCallback): PerformanceObserver | null {
  if (!('PerformanceObserver' in window)) return null;

  // Track all interactions to get the 98th percentile
  const interactions: number[] = [];

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as PerformanceEventTiming[]) {
        if (entry.interactionId) {
          interactions.push(entry.duration);

          // Calculate INP (98th percentile approximation)
          interactions.sort((a, b) => b - a);
          const index = Math.min(interactions.length - 1, Math.floor(interactions.length / 50));
          const inpValue = interactions[index];

          if (inpValue) {
            metrics.inp = inpValue;

            callback({
              name: 'INP',
              value: inpValue,
              rating: getRating('INP', inpValue),
              delta: entry.duration,
              id: `inp-${Date.now()}`,
              navigationType: getNavigationType(),
              entries: [entry]
            });
          }
        }
      }
    });

    observer.observe({ type: 'event', buffered: true, durationThreshold: 16 } as PerformanceObserverInit);
    return observer;
  } catch (e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Long Tasks Detection (for FID/INP debugging)
// ─────────────────────────────────────────────────────────────────────────────

function observeLongTasks(): PerformanceObserver | null {
  if (!('PerformanceObserver' in window)) return null;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
          console.warn(
            `[Long Task] Duration: ${Math.round(entry.duration)}ms`,
            entry
          );
        }
      }
    });

    observer.observe({ type: 'longtask', buffered: true });
    return observer;
  } catch (e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

function getNavigationType(): string {
  if (typeof performance === 'undefined') return 'unknown';

  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  return navEntry?.type || 'unknown';
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

const observers: (PerformanceObserver | null)[] = [];

export function initWebVitals(): void {
  const callback: MetricCallback = (metric) => {
    logMetric(metric);
    sendToAnalytics(metric);
  };

  if (document.readyState === 'complete') {
    startObserving(callback);
  } else {
    window.addEventListener('load', () => startObserving(callback));
  }
}

function startObserving(callback: MetricCallback): void {
  const scheduleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

  scheduleTask(() => {
    observers.push(observeTTFB(callback));
    observers.push(observeFCP(callback));
    observers.push(observeLCP(callback));
    observers.push(observeFID(callback));
    observers.push(observeCLS(callback));
    observers.push(observeINP(callback));
    observers.push(observeLongTasks());
  });
}

export function getMetrics(): PerformanceMetrics {
  return { ...metrics };
}

export function reportOnPageHide(): void {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const currentMetrics = getMetrics();

      if (typeof import.meta !== 'undefined' && import.meta.env?.PROD && Object.keys(currentMetrics).length > 0) {
        navigator.sendBeacon?.('/api/vitals', JSON.stringify(currentMetrics));
      }
    }
  });
}

export function disconnectObservers(): void {
  observers.forEach(observer => observer?.disconnect());
  observers.length = 0;
}

// Get performance score (0-100)
export function getPerformanceScore(): number {
  const m = getMetrics();
  let score = 100;

  // LCP weight: 25%
  if (m.lcp) {
    if (m.lcp > THRESHOLDS.LCP.poor) score -= 25;
    else if (m.lcp > THRESHOLDS.LCP.good) score -= 12.5;
  }

  // FID weight: 10%
  if (m.fid) {
    if (m.fid > THRESHOLDS.FID.poor) score -= 10;
    else if (m.fid > THRESHOLDS.FID.good) score -= 5;
  }

  // CLS weight: 25%
  if (m.cls) {
    if (m.cls > THRESHOLDS.CLS.poor) score -= 25;
    else if (m.cls > THRESHOLDS.CLS.good) score -= 12.5;
  }

  // INP weight: 30%
  if (m.inp) {
    if (m.inp > THRESHOLDS.INP.poor) score -= 30;
    else if (m.inp > THRESHOLDS.INP.good) score -= 15;
  }

  // FCP weight: 10%
  if (m.fcp) {
    if (m.fcp > THRESHOLDS.FCP.poor) score -= 10;
    else if (m.fcp > THRESHOLDS.FCP.good) score -= 5;
  }

  return Math.max(0, score);
}

// Type declarations
declare function gtag(command: string, event: string, params?: Record<string, unknown>): void;

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  duration: number;
  interactionId?: number;
}
