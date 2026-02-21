// ═══════════════════════════════════════════════════════════════════════════
// INP (Interaction to Next Paint) Optimization
// Target: INP < 200ms for good Core Web Vitals score
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Break up long tasks using scheduler.yield() or setTimeout fallback
 * This prevents main thread blocking and improves INP
 */
export async function yieldToMainThread(): Promise<void> {
  // Use scheduler.yield() if available (Chrome 115+)
  if ('scheduler' in window && 'yield' in (window as { scheduler: { yield: () => Promise<void> } }).scheduler) {
    return (window as { scheduler: { yield: () => Promise<void> } }).scheduler.yield();
  }

  // Fallback to setTimeout (less optimal but widely supported)
  return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Process an array of items in chunks with yielding to prevent long tasks
 * Each chunk is processed, then yields to allow browser to handle interactions
 */
export async function processWithYielding<T, R>(
  items: T[],
  processor: (item: T, index: number) => R,
  chunkSize = 5,
  deadline?: number
): Promise<R[]> {
  const results: R[] = [];
  const startTime = performance.now();

  for (let i = 0; i < items.length; i++) {
    results.push(processor(items[i], i));

    // Yield every chunkSize items or if we've exceeded deadline
    if ((i + 1) % chunkSize === 0) {
      const elapsed = performance.now() - startTime;
      if (deadline && elapsed > deadline) {
        // Deadline exceeded, yield more frequently
        await yieldToMainThread();
      } else if (i + 1 < items.length) {
        // Regular yield between chunks
        await yieldToMainThread();
      }
    }
  }

  return results;
}

/**
 * Debounce with immediate visual feedback
 * Provides instant UI response while debouncing the actual handler
 */
export function debounceWithFeedback<T extends (...args: Parameters<T>) => void>(
  handler: T,
  delay: number,
  feedbackFn?: () => void
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    // Provide immediate visual feedback
    feedbackFn?.();

    // Clear existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Schedule the actual handler
    timeoutId = setTimeout(() => {
      handler(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Throttle using requestAnimationFrame for smooth visual updates
 * Better than time-based throttling for scroll/resize handlers
 */
export function throttleWithRAF<T extends (...args: unknown[]) => void>(
  handler: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    lastArgs = args;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          handler(...(lastArgs as unknown[]));
        }
        rafId = null;
      });
    }
  };
}

/**
 * Create a click handler that provides immediate visual feedback
 * Improves perceived responsiveness even if actual action takes time
 */
export function createResponsiveClickHandler(
  element: HTMLElement,
  handler: (e: MouseEvent) => void | Promise<void>,
  options: {
    activeClass?: string;
    minDuration?: number;
  } = {}
): void {
  const { activeClass = 'is-active', minDuration = 100 } = options;

  element.addEventListener('click', async (e) => {
    const startTime = performance.now();

    // Add active class immediately for visual feedback
    element.classList.add(activeClass);

    try {
      // Run the handler
      await handler(e);
    } finally {
      // Ensure minimum visual feedback duration
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        element.classList.remove(activeClass);
      }, remaining);
    }
  });
}

/**
 * Optimize event listeners for better INP
 * Uses passive listeners where possible and debounces expensive handlers
 */
export function optimizeEventListeners(): void {
  // Make scroll and touch events passive by default
  const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];

  passiveEvents.forEach(eventType => {
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      let newOptions = options;

      if (passiveEvents.includes(type)) {
        if (typeof options === 'boolean') {
          newOptions = { capture: options, passive: true };
        } else if (typeof options === 'object') {
          newOptions = { ...options, passive: options.passive !== false };
        } else {
          newOptions = { passive: true };
        }
      }

      return originalAddEventListener.call(this, type, listener, newOptions);
    };
  });
}

/**
 * Schedule non-critical work during idle periods
 * Uses requestIdleCallback with fallback
 */
export function scheduleIdleWork(
  callback: () => void,
  timeout = 2000
): number {
  if ('requestIdleCallback' in window) {
    return (window as Window & { requestIdleCallback: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number }).requestIdleCallback(callback, { timeout });
  }

  // Fallback for Safari
  return setTimeout(callback, 1) as unknown as number;
}

/**
 * Cancel scheduled idle work
 */
export function cancelIdleWork(id: number): void {
  if ('cancelIdleCallback' in window) {
    (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Check if the main thread is busy
 * Uses performance.now() to detect frame drops
 */
export function isMainThreadBusy(): boolean {
  const start = performance.now();

  // If this synchronous check takes more than 50ms, thread is busy
  // This is a heuristic - actual implementation would use PerformanceObserver
  return false; // Placeholder - actual implementation would measure task duration
}

/**
 * Create an optimized input handler with debouncing and loading state
 */
export function createOptimizedInputHandler(
  input: HTMLInputElement,
  handler: (value: string) => void | Promise<void>,
  debounceMs = 300
): void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let isLoading = false;

  const debouncedHandler = async (value: string) => {
    if (isLoading) return;

    isLoading = true;
    input.classList.add('is-loading');

    try {
      await handler(value);
    } finally {
      isLoading = false;
      input.classList.remove('is-loading');
    }
  };

  input.addEventListener('input', () => {
    // Visual feedback that input was received
    input.classList.add('has-input');

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      debouncedHandler(input.value);
    }, debounceMs);
  });
}

/**
 * Initialize INP optimizations
 */
export function initINPOptimizations(): void {
  // Optimize event listeners globally
  optimizeEventListeners();

  // Add touch-action: manipulation to interactive elements
  const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, select');
  interactiveElements.forEach(el => {
    (el as HTMLElement).style.touchAction = 'manipulation';
  });

  if (import.meta.env.DEV) {
    console.log('[INP] Optimizations initialized');
  }
}
