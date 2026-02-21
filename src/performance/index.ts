// ═══════════════════════════════════════════════════════════════════════════
// Performance Module - Core Web Vitals Optimization
// Target: LCP < 2.5s, FID < 100ms, CLS < 0.1, INP < 200ms
// ═══════════════════════════════════════════════════════════════════════════

// Web Vitals Monitoring
export {
  initWebVitals,
  getMetrics,
  reportOnPageHide,
  disconnectObservers,
  getPerformanceScore
} from './web-vitals';

// Lazy Loading & Image Optimization
export {
  initLazyLoading,
  observeImages,
  preloadCriticalImages,
  preloadImage,
  createResponsiveImage,
  createPictureElement,
  injectImageStyles,
  destroyLazyLoading,
  supportsNativeLazyLoad,
  supportsAvif,
  supportsWebp
} from './lazy-loading';

// Advanced Image Optimization
export {
  createOptimizedPicture,
  createLazyImage,
  preloadLCPImage,
  observeImageLoading,
  getOptimalFormat
} from './image-optimization';

// Resource Hints (Preconnect, Prefetch, Preload)
export {
  initResourceHints,
  prefetchRoute,
  prefetchResources,
  prefetchVisibleLinks,
  prefetchLikelyNextPages,
  preconnectToCDN,
  preconnectToOrigins,
  preloadResource,
  preloadCriticalFonts,
  preloadCriticalImage,
  preloadStylesheet,
  preloadScript,
  modulePreload,
  shouldReduceData,
  getConnectionQuality,
  adaptivePrefetch,
  clearResourceHints,
  getResourceHintStats
} from './resource-hints';

// Script Loading Optimization
export {
  loadScript,
  loadAnalytics,
  preloadModule,
  loadThirdParty,
  deferExecution,
  yieldToMain,
  processInChunks,
  debounce,
  throttleRAF
} from './script-loading';

// Critical CSS Management
export {
  CRITICAL_SELECTORS,
  DEFERRED_MODULES,
  loadDeferredCSS,
  extractCriticalCSS,
  removeUnusedCSS
} from './critical-css';

// Font Optimization
export {
  SYSTEM_FONTS,
  FONT_METRICS,
  initFontLoading,
  preloadCriticalFonts as preloadFonts,
  getFontDisplayCSS,
  isFontAvailable,
  getFontLoadingStatus
} from './font-optimization';

// ─────────────────────────────────────────────────────────────────────────────
// Combined Initialization
// ─────────────────────────────────────────────────────────────────────────────

import { initWebVitals, reportOnPageHide } from './web-vitals';
import { initLazyLoading, injectImageStyles, observeImages } from './lazy-loading';
import { initResourceHints, prefetchVisibleLinks, preconnectToCDN } from './resource-hints';
import { initFontLoading } from './font-optimization';
import { observeImageLoading } from './image-optimization';

/**
 * Initialize all performance optimizations
 * Call this early in your app's lifecycle
 */
export function initPerformance(): void {
  // Inject critical CSS for images (prevents CLS)
  injectImageStyles();

  // Preconnect to critical CDNs immediately
  const criticalOrigins = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://images.unsplash.com'
  ];
  criticalOrigins.forEach(origin => preconnectToCDN(origin));

  // Initialize font loading (prevents CLS from font swap)
  initFontLoading().catch(() => {
    // Font loading failed - fallbacks will be used
  });

  // Initialize Web Vitals monitoring
  initWebVitals();
  reportOnPageHide();

  // Initialize lazy loading
  initLazyLoading();

  // Initialize resource hints
  initResourceHints();

  // Observe image loading performance
  observeImageLoading();

  // Prefetch visible links when idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      prefetchVisibleLinks();
    }, { timeout: 3000 });
  } else {
    setTimeout(prefetchVisibleLinks, 1000);
  }
}

/**
 * Initialize performance for dynamic content
 * Call this after SPA navigation or dynamic content load
 */
export function initDynamicContentPerformance(container?: Element): void {
  observeImages(container);
  observeImageLoading(container);
}
