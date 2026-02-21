// ═══════════════════════════════════════════════════════════════════════════
// Resource Hints - Preload, Prefetch, Preconnect for Core Web Vitals
// Optimizes LCP, FID, and reduces network latency
// ═══════════════════════════════════════════════════════════════════════════

interface PrefetchOptions {
  priority?: 'high' | 'low' | 'auto';
  type?: 'document' | 'script' | 'style' | 'image' | 'font';
}

interface PreloadOptions {
  as: 'script' | 'style' | 'font' | 'image' | 'fetch' | 'document';
  type?: string;
  crossorigin?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

// Track resources to avoid duplicates
const prefetchedResources = new Set<string>();
const preconnectedOrigins = new Set<string>();
const preloadedResources = new Set<string>();

// ─────────────────────────────────────────────────────────────────────────────
// Critical Origins for Real Estate Site
// ─────────────────────────────────────────────────────────────────────────────

const CRITICAL_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://images.unsplash.com',
  'https://www.google-analytics.com',
  'https://www.googletagmanager.com',
];

const CDN_ORIGINS = [
  'https://cdn.jsdelivr.net',
  'https://unpkg.com',
  'https://cdnjs.cloudflare.com',
];

// ─────────────────────────────────────────────────────────────────────────────
// Initialization
// ─────────────────────────────────────────────────────────────────────────────

export function initResourceHints(): void {
  // Preconnect to critical origins immediately
  CRITICAL_ORIGINS.forEach(origin => preconnectToCDN(origin));

  // Setup prefetch on hover for internal links
  setupPrefetchOnHover();

  // Setup prefetch on touch for mobile
  setupPrefetchOnTouch();

  // Preconnect to CDNs when idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      CDN_ORIGINS.forEach(origin => preconnectToCDN(origin, false));
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Preconnect - Establish Early Connections
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Preconnect to a CDN or API origin
 * Reduces DNS, TCP, and TLS handshake latency
 */
export function preconnectToCDN(origin: string, crossorigin: boolean = true): void {
  if (preconnectedOrigins.has(origin)) return;

  try {
    const url = new URL(origin);
    const normalizedOrigin = url.origin;

    if (preconnectedOrigins.has(normalizedOrigin)) return;

    // Create preconnect link
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = normalizedOrigin;

    if (crossorigin) {
      link.crossOrigin = 'anonymous';
    }

    // Insert at the beginning of head for faster discovery
    const firstScript = document.head.querySelector('script');
    if (firstScript) {
      document.head.insertBefore(link, firstScript);
    } else {
      document.head.appendChild(link);
    }

    preconnectedOrigins.add(normalizedOrigin);

    // Also add dns-prefetch as fallback for older browsers
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = normalizedOrigin;
    document.head.appendChild(dnsLink);

  } catch (e) {
    console.warn(`[Resource Hints] Invalid origin: ${origin}`);
  }
}

/**
 * Batch preconnect to multiple origins
 */
export function preconnectToOrigins(origins: string[]): void {
  origins.forEach(origin => preconnectToCDN(origin));
}

// ─────────────────────────────────────────────────────────────────────────────
// Preload - Load Critical Resources
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Preload a critical resource
 * Use for above-the-fold images, fonts, and critical scripts
 */
export function preloadResource(url: string, options: PreloadOptions): void {
  if (preloadedResources.has(url)) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = options.as;

  if (options.type) {
    link.type = options.type;
  }

  if (options.crossorigin || options.as === 'font') {
    link.crossOrigin = 'anonymous';
  }

  if (options.fetchPriority) {
    (link as any).fetchPriority = options.fetchPriority;
  }

  document.head.appendChild(link);
  preloadedResources.add(url);
}

/**
 * Preload critical fonts
 */
export function preloadCriticalFonts(fonts: string[]): void {
  fonts.forEach(fontUrl => {
    const ext = fontUrl.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      woff2: 'font/woff2',
      woff: 'font/woff',
      ttf: 'font/ttf',
      otf: 'font/otf'
    };

    preloadResource(fontUrl, {
      as: 'font',
      type: mimeTypes[ext || ''] || 'font/woff2',
      crossorigin: true,
      fetchPriority: 'high'
    });
  });
}

/**
 * Preload critical images (for LCP)
 */
export function preloadCriticalImage(src: string, srcset?: string, sizes?: string): void {
  if (preloadedResources.has(src)) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  (link as any).fetchPriority = 'high';

  if (srcset) {
    link.setAttribute('imagesrcset', srcset);
  }

  if (sizes) {
    link.setAttribute('imagesizes', sizes);
  }

  // Insert at the very beginning of head
  document.head.insertBefore(link, document.head.firstChild);
  preloadedResources.add(src);
}

/**
 * Preload a CSS stylesheet
 */
export function preloadStylesheet(url: string): void {
  preloadResource(url, { as: 'style' });
}

/**
 * Preload a script
 */
export function preloadScript(url: string): void {
  preloadResource(url, { as: 'script' });
}

// ─────────────────────────────────────────────────────────────────────────────
// Prefetch - Load Future Resources
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Prefetch a route/page for instant navigation
 */
export function prefetchRoute(url: string, options: PrefetchOptions = {}): void {
  const { priority = 'auto', type = 'document' } = options;

  try {
    const normalizedUrl = new URL(url, window.location.origin).href;

    if (prefetchedResources.has(normalizedUrl)) return;

    // Don't prefetch external URLs
    if (!normalizedUrl.startsWith(window.location.origin)) return;

    // Schedule based on priority
    const scheduleTask = priority === 'low'
      ? (window.requestIdleCallback || ((cb) => setTimeout(cb, 1)))
      : (cb: () => void) => cb();

    scheduleTask(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = normalizedUrl;
      link.as = type;

      document.head.appendChild(link);
      prefetchedResources.add(normalizedUrl);
    });
  } catch (e) {
    console.warn(`[Resource Hints] Invalid URL: ${url}`);
  }
}

/**
 * Prefetch multiple resources
 */
export function prefetchResources(urls: string[], options: PrefetchOptions = {}): void {
  urls.forEach(url => prefetchRoute(url, options));
}

/**
 * Module preload for JavaScript chunks
 */
export function modulePreload(url: string): void {
  if (preloadedResources.has(url)) return;

  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = url;
  document.head.appendChild(link);
  preloadedResources.add(url);
}

// ─────────────────────────────────────────────────────────────────────────────
// Intelligent Prefetching
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Setup prefetch on hover (desktop)
 */
function setupPrefetchOnHover(): void {
  let hoverTimer: number | null = null;

  document.addEventListener('mouseover', (e) => {
    const link = (e.target as Element).closest('a[data-route]') as HTMLAnchorElement | null;
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;

    // Delay to avoid unnecessary prefetches on quick mouse movements
    hoverTimer = window.setTimeout(() => {
      prefetchRoute(href, { priority: 'low' });
    }, 65);
  });

  document.addEventListener('mouseout', (e) => {
    const link = (e.target as Element).closest('a[data-route]');
    if (link && hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  });
}

/**
 * Setup prefetch on touch (mobile)
 */
function setupPrefetchOnTouch(): void {
  document.addEventListener('touchstart', (e) => {
    const link = (e.target as Element).closest('a[data-route]') as HTMLAnchorElement | null;
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;

    // Immediate prefetch on touch for faster mobile navigation
    prefetchRoute(href, { priority: 'high' });
  }, { passive: true });
}

/**
 * Prefetch visible links in viewport
 */
export function prefetchVisibleLinks(): void {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = entry.target as HTMLAnchorElement;
          const href = link.getAttribute('href');

          if (href && !href.startsWith('#') && !href.startsWith('http')) {
            prefetchRoute(href, { priority: 'low' });
          }

          observer.unobserve(link);
        }
      });
    },
    { rootMargin: '0px', threshold: 0 }
  );

  document.querySelectorAll('a[data-route]').forEach((link) => {
    observer.observe(link);
  });
}

/**
 * Prefetch likely next pages based on current route
 */
export function prefetchLikelyNextPages(currentRoute: string): void {
  const routePrefetchMap: Record<string, string[]> = {
    '/': ['/properties', '/about', '/contact'],
    '/properties': ['/contact', '/about'],
    '/about': ['/contact', '/properties'],
    '/contact': ['/properties', '/about'],
    '/projects': ['/properties', '/contact'],
    '/blog': ['/about', '/contact'],
  };

  const pagesToPrefetch = routePrefetchMap[currentRoute] || [];

  // Use requestIdleCallback for low-priority prefetching
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      pagesToPrefetch.forEach(page => prefetchRoute(page, { priority: 'low' }));
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      pagesToPrefetch.forEach(page => prefetchRoute(page, { priority: 'low' }));
    }, 100);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Save-Data and Connection Awareness
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if user has Save-Data enabled
 */
export function shouldReduceData(): boolean {
  const connection = (navigator as any).connection;

  // Check Save-Data header
  if (connection?.saveData) return true;

  // Check slow connections
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
    return true;
  }

  return false;
}

/**
 * Get connection quality
 */
export function getConnectionQuality(): 'fast' | 'medium' | 'slow' | 'unknown' {
  const connection = (navigator as any).connection;

  if (!connection) return 'unknown';

  const effectiveType = connection.effectiveType;

  if (effectiveType === '4g' && connection.downlink > 5) return 'fast';
  if (effectiveType === '4g' || effectiveType === '3g') return 'medium';
  return 'slow';
}

/**
 * Adaptive prefetching based on connection quality
 */
export function adaptivePrefetch(url: string): void {
  const quality = getConnectionQuality();

  if (quality === 'fast') {
    prefetchRoute(url, { priority: 'low' });
  } else if (quality === 'medium') {
    // Only prefetch on explicit user intent (hover/touch)
    // Don't auto-prefetch
  }
  // Don't prefetch on slow connections
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clear all resource hint caches
 */
export function clearResourceHints(): void {
  prefetchedResources.clear();
  preconnectedOrigins.clear();
  preloadedResources.clear();
}

/**
 * Get prefetch stats
 */
export function getResourceHintStats(): {
  prefetched: number;
  preconnected: number;
  preloaded: number;
} {
  return {
    prefetched: prefetchedResources.size,
    preconnected: preconnectedOrigins.size,
    preloaded: preloadedResources.size
  };
}
