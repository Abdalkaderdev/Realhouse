// ═══════════════════════════════════════════════════════════════════════════
// Script Loading - Optimized JavaScript loading strategies
// Improves First Input Delay (FID) and Interaction to Next Paint (INP)
// ═══════════════════════════════════════════════════════════════════════════

interface ScriptOptions {
  async?: boolean;
  defer?: boolean;
  module?: boolean;
  priority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// Track loaded scripts to prevent duplicates
const loadedScripts = new Set<string>();
const pendingScripts = new Map<string, Promise<void>>();

/**
 * Load a script with optimal strategy
 * - High priority: Load immediately with async
 * - Low priority: Load with requestIdleCallback
 * - Auto: Browser decides based on defer attribute
 */
export function loadScript(src: string, options: ScriptOptions = {}): Promise<void> {
  const {
    async = true,
    defer = false,
    module = false,
    priority = 'auto',
    onLoad,
    onError
  } = options;

  // Return cached promise if already loading
  if (pendingScripts.has(src)) {
    return pendingScripts.get(src)!;
  }

  // Skip if already loaded
  if (loadedScripts.has(src)) {
    return Promise.resolve();
  }

  const promise = new Promise<void>((resolve, reject) => {
    const load = () => {
      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.defer = defer;

      if (module) {
        script.type = 'module';
      }

      // Add fetchpriority for supported browsers
      if (priority !== 'auto') {
        (script as HTMLScriptElement & { fetchPriority: string }).fetchPriority = priority;
      }

      script.onload = () => {
        loadedScripts.add(src);
        pendingScripts.delete(src);
        onLoad?.();
        resolve();
      };

      script.onerror = () => {
        pendingScripts.delete(src);
        const error = new Error(`Failed to load script: ${src}`);
        onError?.(error);
        reject(error);
      };

      document.head.appendChild(script);
    };

    // Schedule based on priority
    if (priority === 'low') {
      const scheduleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
      scheduleTask(load);
    } else {
      load();
    }
  });

  pendingScripts.set(src, promise);
  return promise;
}

/**
 * Load analytics scripts asynchronously without blocking
 * Uses the recommended async pattern for analytics
 */
export function loadAnalytics(config: {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
}): void {
  const { googleAnalyticsId, googleTagManagerId } = config;

  // Schedule analytics loading for after main content
  const scheduleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

  scheduleTask(() => {
    // Google Analytics 4
    if (googleAnalyticsId) {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`, {
        async: true,
        priority: 'low'
      }).then(() => {
        // Initialize GA4
        (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
        function gtag(...args: unknown[]) {
          (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', googleAnalyticsId, {
          send_page_view: true,
          cookie_flags: 'SameSite=None;Secure'
        });

        if (import.meta.env.DEV) {
          console.log('[Analytics] Google Analytics initialized');
        }
      });
    }

    // Google Tag Manager
    if (googleTagManagerId) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });

      loadScript(`https://www.googletagmanager.com/gtm.js?id=${googleTagManagerId}`, {
        async: true,
        priority: 'low'
      });
    }
  });
}

/**
 * Preload JavaScript modules that will be needed soon
 * Uses modulepreload for optimal loading
 */
export function preloadModule(src: string): void {
  if (loadedScripts.has(src)) return;

  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Load third-party scripts in a non-blocking way
 * Wraps third-party code to prevent main thread blocking
 */
export function loadThirdParty(
  name: string,
  loader: () => Promise<void>
): Promise<void> {
  return new Promise((resolve) => {
    const scheduleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

    scheduleTask(async () => {
      try {
        await loader();

        if (import.meta.env.DEV) {
          console.log(`[Third-party] ${name} loaded`);
        }

        resolve();
      } catch (error) {
        console.error(`[Third-party] Failed to load ${name}:`, error);
        resolve(); // Don't reject - third-party failures shouldn't break the app
      }
    });
  });
}

/**
 * Defer execution of non-critical code
 * Uses requestIdleCallback for optimal scheduling
 */
export function deferExecution(callback: () => void, timeout = 2000): void {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout });
  } else {
    // Fallback for Safari and older browsers
    setTimeout(callback, 1);
  }
}

/**
 * Split long tasks to prevent main thread blocking
 * Yields to the browser between chunks
 */
export async function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    if ('scheduler' in window && 'yield' in (window as unknown as { scheduler: { yield: () => Promise<void> } }).scheduler) {
      (window as unknown as { scheduler: { yield: () => Promise<void> } }).scheduler.yield().then(resolve);
    } else {
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Process items in chunks to prevent long tasks
 * Yields to main thread between chunks
 */
export async function processInChunks<T>(
  items: T[],
  processor: (item: T) => void,
  chunkSize = 5
): Promise<void> {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);

    chunk.forEach(processor);

    // Yield to main thread between chunks
    if (i + chunkSize < items.length) {
      await yieldToMain();
    }
  }
}

/**
 * Create a debounced function for event handlers
 * Prevents excessive function calls that can cause jank
 */
export function debounce<T extends (...args: unknown[]) => void>(
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
 * Create a throttled function for scroll/resize handlers
 * Uses requestAnimationFrame for smooth performance
 */
export function throttleRAF<T extends (...args: unknown[]) => void>(
  fn: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    lastArgs = args;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          fn(...lastArgs);
        }
        rafId = null;
      });
    }
  };
}

/**
 * Check if code is running in the main thread
 * Useful for deciding whether to offload to Web Worker
 */
export function isMainThread(): boolean {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

/**
 * Create a Web Worker from a function
 * Allows offloading heavy computation from main thread
 */
export function createWorkerFromFunction(fn: () => void): Worker {
  const blob = new Blob([`(${fn.toString()})()`], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);

  // Clean up blob URL when worker is terminated
  const originalTerminate = worker.terminate.bind(worker);
  worker.terminate = () => {
    URL.revokeObjectURL(url);
    return originalTerminate();
  };

  return worker;
}
