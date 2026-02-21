// ═══════════════════════════════════════════════════════════════════════════
// Core Web Vitals Performance Optimization
// Target: LCP < 2.5s, FID < 100ms, CLS < 0.1, INP < 200ms
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType?: string;
}

interface PerformanceData {
  url: string;
  timestamp: number;
  metrics: Partial<Record<string, WebVitalMetric>>;
  userAgent: string;
  connectionType?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  sizes?: string;
  priority?: 'high' | 'low' | 'auto';
}

interface LayoutReservation {
  selector: string;
  width: string | number;
  height: string | number;
  aspectRatio?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Web Vitals Thresholds (Google's Core Web Vitals)
// ─────────────────────────────────────────────────────────────────────────────

const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  TTFB: { good: 800, needsImprovement: 1800 },
  FCP: { good: 1800, needsImprovement: 3000 },
  INP: { good: 200, needsImprovement: 500 },
};

// ─────────────────────────────────────────────────────────────────────────────
// LCP Optimization: Hero Image Preloading
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Preload hero images for faster LCP
 * Should be called as early as possible (ideally in <head>)
 */
export function preloadHeroImage(src: string, srcset?: string): void {
  if (!src) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.fetchPriority = 'high';

  if (srcset) {
    link.setAttribute('imagesrcset', srcset);
  }

  // Insert at the beginning of head for faster discovery
  const firstScript = document.head.querySelector('script');
  if (firstScript) {
    document.head.insertBefore(link, firstScript);
  } else {
    document.head.appendChild(link);
  }
}

/**
 * Create optimized responsive image HTML with srcset for LCP
 */
export function createResponsiveHeroImage(
  src: string,
  alt: string,
  options: ImageOptimizationOptions = {}
): string {
  const {
    width,
    height,
    sizes = '100vw',
    priority = 'high'
  } = options;

  // Generate srcset for different viewport sizes
  const widths = [320, 640, 960, 1280, 1920, 2560];
  const srcset = widths
    .map(w => {
      const url = generateOptimizedImageUrl(src, { width: w });
      return `${url} ${w}w`;
    })
    .join(', ');

  // Determine loading strategy
  const loading = priority === 'high' ? 'eager' : 'lazy';
  const fetchPriority = priority;
  const decoding = priority === 'high' ? 'sync' : 'async';

  // Build image attributes
  const attrs = [
    `src="${src}"`,
    `srcset="${srcset}"`,
    `sizes="${sizes}"`,
    `alt="${alt}"`,
    `loading="${loading}"`,
    `fetchpriority="${fetchPriority}"`,
    `decoding="${decoding}"`,
  ];

  // Add explicit dimensions to prevent CLS
  if (width) attrs.push(`width="${width}"`);
  if (height) attrs.push(`height="${height}"`);

  return `<img ${attrs.join(' ')} class="hero-image optimized-image" />`;
}

/**
 * Generate optimized image URL (for CDN/image service)
 */
function generateOptimizedImageUrl(src: string, options: { width?: number; quality?: number; format?: string }): string {
  const { width, quality = 80, format = 'webp' } = options;

  // If using Unsplash, use their optimization API
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    if (width) url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality));
    url.searchParams.set('fm', format);
    url.searchParams.set('auto', 'format');
    return url.toString();
  }

  // For other images, return as-is (implement your CDN logic here)
  return src;
}

// ─────────────────────────────────────────────────────────────────────────────
// CLS Prevention: Layout Shift Prevention
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Reserve space for dynamic content to prevent CLS
 */
export function reserveLayoutSpace(reservations: LayoutReservation[]): void {
  reservations.forEach(({ selector, width, height, aspectRatio }) => {
    const elements = document.querySelectorAll<HTMLElement>(selector);

    elements.forEach(el => {
      if (aspectRatio) {
        el.style.aspectRatio = aspectRatio;
      } else {
        if (width) el.style.width = typeof width === 'number' ? `${width}px` : width;
        if (height) el.style.height = typeof height === 'number' ? `${height}px` : height;
      }
      el.style.contain = 'layout style';
    });
  });
}

/**
 * Set explicit dimensions on all images to prevent CLS
 */
export function setImageDimensions(): void {
  const images = document.querySelectorAll<HTMLImageElement>('img:not([width]):not([height])');

  images.forEach(img => {
    // If image is loaded, set natural dimensions
    if (img.complete && img.naturalWidth) {
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;
    } else {
      // Set placeholder dimensions based on aspect ratio
      img.addEventListener('load', () => {
        if (!img.hasAttribute('width')) {
          img.width = img.naturalWidth;
          img.height = img.naturalHeight;
        }
      }, { once: true });
    }
  });
}

/**
 * Prevent font loading CLS with font-display
 */
export function optimizeFontLoading(): void {
  // Add font-display: swap to prevent FOIT (Flash of Invisible Text)
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-display: swap !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Create a placeholder skeleton for dynamic content
 */
export function createContentSkeleton(height: number, className: string = ''): string {
  return `
    <div
      class="content-skeleton ${className}"
      style="height: ${height}px; background: linear-gradient(90deg, var(--c-surface) 25%, var(--c-surface-2) 50%, var(--c-surface) 75%); background-size: 200% 100%; animation: skeleton-loading 1.5s infinite;"
      aria-hidden="true"
    ></div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// FID/INP Optimization: JavaScript Optimization
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Break up long tasks using scheduler API or requestIdleCallback
 */
export function yieldToMain(): Promise<void> {
  return new Promise(resolve => {
    // Use scheduler.yield() if available (Chrome 115+)
    if ('scheduler' in window && 'yield' in (window as any).scheduler) {
      (window as any).scheduler.yield().then(resolve);
    } else if ('requestIdleCallback' in window) {
      requestIdleCallback(() => resolve());
    } else {
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Run tasks in chunks to avoid blocking the main thread
 */
export async function runInChunks<T>(
  items: T[],
  processor: (item: T, index: number) => void,
  chunkSize: number = 5
): Promise<void> {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);

    chunk.forEach((item, index) => {
      processor(item, i + index);
    });

    // Yield to main thread between chunks
    if (i + chunkSize < items.length) {
      await yieldToMain();
    }
  }
}

/**
 * Debounce function for scroll/resize handlers
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle function for frequent events
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * RAF-based throttle for scroll handlers (optimized for 60fps)
 */
export function rafThrottle<T extends (...args: any[]) => void>(
  fn: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return (...args: Parameters<T>) => {
    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  };
}

/**
 * Defer non-critical JavaScript execution
 */
export function deferExecution(fn: () => void, delay: number = 0): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => fn(), { timeout: delay || 2000 });
  } else {
    setTimeout(fn, delay);
  }
}

/**
 * Execute task when browser is idle
 */
export function whenIdle(fn: () => void, timeout: number = 2000): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(fn, { timeout });
  } else {
    setTimeout(fn, 50);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// INP Optimization: Event Handler Optimization
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create an optimized click handler with visual feedback
 */
export function createOptimizedClickHandler(
  handler: (event: Event) => void | Promise<void>
): (event: Event) => void {
  return async (event: Event) => {
    const target = event.currentTarget as HTMLElement;

    // Add immediate visual feedback
    target.style.transform = 'scale(0.98)';
    target.style.transition = 'transform 0.1s ease';

    // Use requestAnimationFrame to ensure visual update
    requestAnimationFrame(() => {
      // Reset transform
      setTimeout(() => {
        target.style.transform = '';
      }, 100);
    });

    // Yield to allow paint before handling
    await yieldToMain();

    // Execute handler
    try {
      await handler(event);
    } catch (error) {
      console.error('Click handler error:', error);
    }
  };
}

/**
 * Create passive event listeners for better scrolling performance
 */
export function addPassiveEventListener(
  element: Element | Window,
  eventType: string,
  handler: EventListener,
  options: AddEventListenerOptions = {}
): () => void {
  const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove'];
  const isPassive = passiveEvents.includes(eventType);

  const listenerOptions: AddEventListenerOptions = {
    ...options,
    passive: isPassive ? true : options.passive,
  };

  element.addEventListener(eventType, handler, listenerOptions);

  // Return cleanup function
  return () => element.removeEventListener(eventType, handler, listenerOptions);
}

/**
 * Optimized scroll handler with RAF throttling
 */
export function createOptimizedScrollHandler(
  handler: () => void
): () => void {
  let ticking = false;

  const optimizedHandler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handler();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', optimizedHandler, { passive: true });

  return () => window.removeEventListener('scroll', optimizedHandler);
}

// ─────────────────────────────────────────────────────────────────────────────
// Resource Optimization
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Preconnect to critical third-party origins
 */
export function preconnectToCDN(origins: string[]): void {
  origins.forEach(origin => {
    // Check if already preconnected
    const existing = document.querySelector(`link[rel="preconnect"][href="${origin}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // Also add dns-prefetch as fallback
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = origin;
    document.head.appendChild(dnsLink);
  });
}

/**
 * Prefetch resources that will likely be needed
 */
export function prefetchResources(urls: string[]): void {
  const prefetchedSet = new Set<string>();

  urls.forEach(url => {
    if (prefetchedSet.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = url.endsWith('.js') ? 'script' :
              url.endsWith('.css') ? 'style' :
              url.match(/\.(jpg|jpeg|png|webp|avif|gif)$/i) ? 'image' : 'fetch';
    document.head.appendChild(link);
    prefetchedSet.add(url);
  });
}

/**
 * Inline critical CSS for above-the-fold content
 */
export function inlineCriticalCSS(css: string): void {
  const style = document.createElement('style');
  style.setAttribute('data-critical', 'true');
  style.textContent = css;
  document.head.insertBefore(style, document.head.firstChild);
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation Optimization (for CLS and INP)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Use CSS transforms instead of layout-triggering properties
 * This prevents layout shifts during animations
 */
export function animateWithTransform(
  element: HTMLElement,
  properties: {
    x?: number;
    y?: number;
    scale?: number;
    rotate?: number;
    opacity?: number;
  },
  duration: number = 300,
  easing: string = 'ease-out'
): Promise<void> {
  return new Promise(resolve => {
    const { x = 0, y = 0, scale = 1, rotate = 0, opacity } = properties;

    element.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;
    element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;

    if (opacity !== undefined) {
      element.style.opacity = String(opacity);
    }

    // Use will-change for complex animations
    element.style.willChange = 'transform, opacity';

    setTimeout(() => {
      element.style.willChange = '';
      resolve();
    }, duration);
  });
}

/**
 * Apply content-visibility for off-screen content
 * This reduces rendering work for hidden content
 */
export function applyContentVisibility(selector: string, height?: number): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);

  elements.forEach(el => {
    el.style.contentVisibility = 'auto';
    if (height) {
      el.style.containIntrinsicSize = `0 ${height}px`;
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Performance Monitoring
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get rating for a metric value
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[name as keyof typeof WEB_VITALS_THRESHOLDS];
  if (!thresholds) return 'good';

  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
}

/**
 * Log metric with color coding
 */
function logMetric(metric: WebVitalMetric): void {
  const colors = {
    'good': 'color: #0CCE6B; font-weight: bold',
    'needs-improvement': 'color: #FFA400; font-weight: bold',
    'poor': 'color: #FF4E42; font-weight: bold',
  };

  const unit = metric.name === 'CLS' ? '' : 'ms';
  const value = metric.name === 'CLS' ? metric.value.toFixed(3) : Math.round(metric.value);

  console.log(
    `%c[Web Vitals] ${metric.name}: ${value}${unit} (${metric.rating})`,
    colors[metric.rating]
  );
}

/**
 * Send metrics to analytics
 */
function sendToAnalytics(data: PerformanceData): void {
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics/web-vitals', blob);
  } else {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => {});
  }
}

/**
 * Initialize comprehensive performance monitoring
 */
export function initPerformanceMonitoring(): void {
  const isDebug = localStorage.getItem('debug-performance') === 'true';
  const isProduction = typeof import.meta !== 'undefined' && import.meta.env?.PROD;

  if (!isProduction && !isDebug) {
    console.log('[Performance] Monitoring disabled in development. Set localStorage "debug-performance" to "true" to enable.');
    return;
  }

  const metrics: Partial<Record<string, WebVitalMetric>> = {};

  // LCP Observer
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const value = lastEntry.startTime;
          const metric: WebVitalMetric = {
            name: 'LCP',
            value,
            rating: getRating('LCP', value),
            delta: value,
            id: `lcp-${Date.now()}`,
          };
          metrics.LCP = metric;
          logMetric(metric);
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {}

    // CLS Observer
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        const metric: WebVitalMetric = {
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
          delta: clsValue,
          id: `cls-${Date.now()}`,
        };
        metrics.CLS = metric;
        logMetric(metric);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}

    // FID Observer
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0] as PerformanceEventTiming;
        if (firstEntry) {
          const value = firstEntry.processingStart - firstEntry.startTime;
          const metric: WebVitalMetric = {
            name: 'FID',
            value,
            rating: getRating('FID', value),
            delta: value,
            id: `fid-${Date.now()}`,
          };
          metrics.FID = metric;
          logMetric(metric);
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {}

    // INP Observer
    try {
      let maxINP = 0;
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceEventTiming[]) {
          if (entry.interactionId && entry.duration > maxINP) {
            maxINP = entry.duration;
            const metric: WebVitalMetric = {
              name: 'INP',
              value: maxINP,
              rating: getRating('INP', maxINP),
              delta: maxINP,
              id: `inp-${Date.now()}`,
            };
            metrics.INP = metric;
            logMetric(metric);
          }
        }
      });
      inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 16 } as PerformanceObserverInit);
    } catch (e) {}
  }

  // Navigation timing
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        const ttfbMetric: WebVitalMetric = {
          name: 'TTFB',
          value: ttfb,
          rating: getRating('TTFB', ttfb),
          delta: ttfb,
          id: `ttfb-${Date.now()}`,
        };
        metrics.TTFB = ttfbMetric;
        logMetric(ttfbMetric);
      }

      const fcpEntry = paint.find(e => e.name === 'first-contentful-paint');
      if (fcpEntry) {
        const fcpMetric: WebVitalMetric = {
          name: 'FCP',
          value: fcpEntry.startTime,
          rating: getRating('FCP', fcpEntry.startTime),
          delta: fcpEntry.startTime,
          id: `fcp-${Date.now()}`,
        };
        metrics.FCP = fcpMetric;
        logMetric(fcpMetric);
      }

      // Log summary
      console.log('%c[Core Web Vitals Summary]', 'color: #C9A84C; font-weight: bold; font-size: 14px');
      console.table(
        Object.values(metrics).map(m => ({
          Metric: m?.name,
          Value: m?.name === 'CLS' ? m?.value.toFixed(3) : Math.round(m?.value || 0),
          Rating: m?.rating,
          Target: WEB_VITALS_THRESHOLDS[m?.name as keyof typeof WEB_VITALS_THRESHOLDS]?.good || 'N/A',
        }))
      );
    }, 0);
  });

  // Send metrics on page hide
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const data: PerformanceData = {
        url: window.location.href,
        timestamp: Date.now(),
        metrics,
        userAgent: navigator.userAgent,
        connectionType: (navigator as any).connection?.effectiveType,
        deviceMemory: (navigator as any).deviceMemory,
        hardwareConcurrency: navigator.hardwareConcurrency,
      };
      sendToAnalytics(data);
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Performance Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create performance mark
 */
export function markPerformance(name: string): void {
  if ('performance' in window) {
    performance.mark(name);
  }
}

/**
 * Measure between two marks
 */
export function measurePerformance(name: string, startMark: string, endMark?: string): number {
  if (!('performance' in window)) return 0;

  try {
    if (endMark) {
      performance.measure(name, startMark, endMark);
    } else {
      performance.measure(name, startMark);
    }

    const measures = performance.getEntriesByName(name, 'measure');
    const lastMeasure = measures[measures.length - 1];

    if (lastMeasure) {
      console.log(`[Performance] ${name}: ${Math.round(lastMeasure.duration)}ms`);
      return lastMeasure.duration;
    }
  } catch (e) {}

  return 0;
}

/**
 * Get resource loading performance
 */
export function getResourcePerformance(): void {
  if (!('performance' in window)) return;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const byType: Record<string, { count: number; totalSize: number; totalDuration: number }> = {};

  resources.forEach(resource => {
    const type = resource.initiatorType || 'other';
    if (!byType[type]) {
      byType[type] = { count: 0, totalSize: 0, totalDuration: 0 };
    }
    byType[type].count++;
    byType[type].totalSize += resource.transferSize || 0;
    byType[type].totalDuration += resource.duration;
  });

  console.log('%c[Resource Performance]', 'color: #C9A84C; font-weight: bold; font-size: 14px');
  console.table(
    Object.entries(byType).map(([type, data]) => ({
      Type: type,
      Count: data.count,
      'Total Size (KB)': Math.round(data.totalSize / 1024),
      'Avg Duration (ms)': Math.round(data.totalDuration / data.count),
    }))
  );
}

/**
 * Check if Core Web Vitals pass thresholds
 */
export function checkWebVitalsPass(metrics: Partial<Record<string, WebVitalMetric>>): boolean {
  const requiredMetrics = ['LCP', 'FID', 'CLS', 'INP'];

  for (const name of requiredMetrics) {
    const metric = metrics[name];
    if (metric && metric.rating === 'poor') {
      return false;
    }
  }

  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Export for debugging
// ─────────────────────────────────────────────────────────────────────────────

if (typeof window !== 'undefined') {
  (window as any).__performanceUtils = {
    getResourcePerformance,
    markPerformance,
    measurePerformance,
    preloadHeroImage,
    preconnectToCDN,
    checkWebVitalsPass,
  };
}

// Type declarations
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  duration: number;
  interactionId?: number;
}
