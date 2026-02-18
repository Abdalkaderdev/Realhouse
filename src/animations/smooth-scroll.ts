// ═══════════════════════════════════════════════════════════════════════════
// Smooth Scroll System for Real House
// Lenis-powered buttery smooth scrolling with GSAP ScrollTrigger integration
// ═══════════════════════════════════════════════════════════════════════════

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ─── Types ─────────────────────────────────────────────────────────────────
interface ScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

interface ScrollVelocity {
  current: number;
  direction: 1 | -1 | 0;
  isScrolling: boolean;
}

interface SmoothScrollInstance {
  lenis: Lenis;
  velocity: ScrollVelocity;
}

// ─── Custom Easing Functions (Luxury Feel) ─────────────────────────────────
const EASING = {
  // Smooth, premium feel - perfect for luxury real estate
  luxury: (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  },

  // Gentle ease out for natural deceleration
  smooth: (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  },

  // Elastic feel for playful interactions
  elastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
        ? 1
        : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },

  // Power curve for dramatic reveals
  power: (t: number): number => {
    return 1 - Math.pow(1 - t, 5);
  },

  // Linear for scrub animations
  linear: (t: number): number => t
};

// ─── Module State ──────────────────────────────────────────────────────────
let instance: SmoothScrollInstance | null = null;
let isInitialized = false;
let scrollCallbacks: Set<(velocity: ScrollVelocity) => void> = new Set();

// ─── Velocity Tracking ─────────────────────────────────────────────────────
function createVelocityTracker(): ScrollVelocity {
  return {
    current: 0,
    direction: 0,
    isScrolling: false
  };
}

function updateVelocity(velocity: number): void {
  if (!instance) return;

  instance.velocity.current = velocity;
  instance.velocity.direction = velocity > 0 ? 1 : velocity < 0 ? -1 : 0;
  instance.velocity.isScrolling = Math.abs(velocity) > 0.01;

  // Notify subscribers
  scrollCallbacks.forEach((callback) => {
    callback(instance!.velocity);
  });
}

// ─── Initialize Smooth Scroll ──────────────────────────────────────────────
export function initSmoothScroll(): Lenis | null {
  if (isInitialized && instance) {
    console.warn('[SmoothScroll] Already initialized');
    return instance.lenis;
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    console.info('[SmoothScroll] Reduced motion preferred, using native scroll');
    isInitialized = true;
    return null;
  }

  // Create Lenis instance with luxury configuration
  const lenis = new Lenis({
    duration: 1.2,                    // Smooth, not sluggish
    easing: EASING.luxury,            // Custom luxury easing
    orientation: 'vertical',          // Vertical scrolling
    gestureOrientation: 'vertical',   // Touch gesture direction
    smoothWheel: true,                // Smooth wheel scrolling
    wheelMultiplier: 1,               // Natural wheel speed
    touchMultiplier: 2,               // Responsive touch
    infinite: false,                  // No infinite scroll
    autoResize: true                  // Handle resize automatically
  });

  // Initialize instance
  instance = {
    lenis,
    velocity: createVelocityTracker()
  };

  // Velocity tracking on scroll
  lenis.on('scroll', ({ velocity }: { velocity: number }) => {
    updateVelocity(velocity);
  });

  // Integrate with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Sync GSAP ticker with Lenis
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });

  // Disable GSAP's lag smoothing for better sync
  gsap.ticker.lagSmoothing(0);

  // Update ScrollTrigger on Lenis scroll
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value?: number): number {
      if (arguments.length && value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect(): DOMRect {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        bottom: window.innerHeight,
        right: window.innerWidth,
        x: 0,
        y: 0,
        toJSON: () => ({})
      } as DOMRect;
    },
    pinType: 'transform'
  });

  // Refresh ScrollTrigger after Lenis is ready
  ScrollTrigger.defaults({
    scroller: document.documentElement
  });

  // Handle hash links with smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      if (href && href !== '#') {
        scrollToElement(href);
      }
    });
  });

  // Handle resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

  isInitialized = true;
  console.info('[SmoothScroll] Initialized with Lenis');

  return lenis;
}

// ─── Scroll To Target ──────────────────────────────────────────────────────
export function scrollTo(
  target: number | string | HTMLElement,
  options: ScrollToOptions = {}
): void {
  if (!instance) {
    // Fallback to native scroll
    const element =
      typeof target === 'string'
        ? document.querySelector(target)
        : typeof target === 'number'
          ? null
          : target;

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    return;
  }

  const {
    offset = 0,
    duration,
    easing = EASING.luxury,
    immediate = false,
    lock = false,
    onComplete
  } = options;

  instance.lenis.scrollTo(target, {
    offset,
    duration,
    easing,
    immediate,
    lock,
    onComplete
  });
}

// ─── Scroll To Element ─────────────────────────────────────────────────────
export function scrollToElement(
  selector: string,
  options: ScrollToOptions = {}
): void {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`[SmoothScroll] Element not found: ${selector}`);
    return;
  }

  scrollTo(element as HTMLElement, options);
}

// ─── Scroll To Top ─────────────────────────────────────────────────────────
export function scrollToTop(options: ScrollToOptions = {}): void {
  scrollTo(0, {
    duration: 1.5,
    easing: EASING.power,
    ...options
  });
}

// ─── Scroll To Bottom ──────────────────────────────────────────────────────
export function scrollToBottom(options: ScrollToOptions = {}): void {
  const scrollHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  scrollTo(scrollHeight - windowHeight, {
    duration: 1.5,
    easing: EASING.power,
    ...options
  });
}

// ─── Get Current Scroll Position ───────────────────────────────────────────
export function getScrollPosition(): number {
  if (!instance) {
    return window.scrollY || document.documentElement.scrollTop;
  }
  return instance.lenis.scroll;
}

// ─── Get Scroll Progress (0-1) ─────────────────────────────────────────────
export function getScrollProgress(): number {
  if (!instance) {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    return scrollTop / (scrollHeight - windowHeight);
  }
  return instance.lenis.progress;
}

// ─── Get Scroll Velocity ───────────────────────────────────────────────────
export function getScrollVelocity(): ScrollVelocity {
  if (!instance) {
    return createVelocityTracker();
  }
  return { ...instance.velocity };
}

// ─── Subscribe to Velocity Updates ─────────────────────────────────────────
export function onScrollVelocity(
  callback: (velocity: ScrollVelocity) => void
): () => void {
  scrollCallbacks.add(callback);

  // Return unsubscribe function
  return () => {
    scrollCallbacks.delete(callback);
  };
}

// ─── Pause/Resume Scrolling ────────────────────────────────────────────────
export function pauseScroll(): void {
  if (instance) {
    instance.lenis.stop();
  }
}

export function resumeScroll(): void {
  if (instance) {
    instance.lenis.start();
  }
}

export function toggleScroll(pause?: boolean): void {
  if (!instance) return;

  if (pause === undefined) {
    instance.lenis.isStopped ? instance.lenis.start() : instance.lenis.stop();
  } else {
    pause ? instance.lenis.stop() : instance.lenis.start();
  }
}

// ─── Check if Scrolling is Paused ──────────────────────────────────────────
export function isScrollPaused(): boolean {
  return instance?.lenis.isStopped ?? false;
}

// ─── Lock/Unlock Body Scroll (for modals) ──────────────────────────────────
export function lockBodyScroll(): void {
  pauseScroll();
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
}

export function unlockBodyScroll(): void {
  resumeScroll();
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
}

// ─── Refresh ScrollTrigger ─────────────────────────────────────────────────
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

// ─── Get Lenis Instance ────────────────────────────────────────────────────
export function getLenisInstance(): Lenis | null {
  return instance?.lenis ?? null;
}

// ─── Destroy Smooth Scroll ─────────────────────────────────────────────────
export function destroySmoothScroll(): void {
  if (!instance) return;

  // Remove GSAP ticker
  gsap.ticker.remove((time: number) => {
    instance?.lenis.raf(time * 1000);
  });

  // Kill ScrollTrigger instances
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Destroy Lenis
  instance.lenis.destroy();

  // Clear callbacks
  scrollCallbacks.clear();

  // Reset state
  instance = null;
  isInitialized = false;

  // Reset body styles
  document.body.style.overflow = '';
  document.body.style.touchAction = '';

  console.info('[SmoothScroll] Destroyed');
}

// ─── Utility: Scroll-linked Value ──────────────────────────────────────────
export function createScrollLinkedValue(
  start: number,
  end: number,
  startScroll: number = 0,
  endScroll: number = document.documentElement.scrollHeight - window.innerHeight
): () => number {
  return () => {
    const progress = Math.min(
      Math.max((getScrollPosition() - startScroll) / (endScroll - startScroll), 0),
      1
    );
    return start + (end - start) * progress;
  };
}

// ─── Utility: Apply Velocity-based Effect ──────────────────────────────────
export function applyVelocityEffect(
  element: HTMLElement,
  options: {
    property?: 'skewY' | 'scale' | 'blur' | 'opacity';
    intensity?: number;
    maxValue?: number;
  } = {}
): () => void {
  const {
    property = 'skewY',
    intensity = 0.5,
    maxValue = 5
  } = options;

  const unsubscribe = onScrollVelocity((velocity) => {
    const value = Math.min(
      Math.abs(velocity.current) * intensity,
      maxValue
    ) * velocity.direction;

    switch (property) {
      case 'skewY':
        gsap.to(element, {
          skewY: value,
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
      case 'scale':
        gsap.to(element, {
          scale: 1 + Math.abs(value) * 0.01,
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
      case 'blur':
        element.style.filter = `blur(${Math.abs(value) * 0.5}px)`;
        break;
      case 'opacity':
        gsap.to(element, {
          opacity: 1 - Math.abs(value) * 0.1,
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
    }
  });

  return unsubscribe;
}

// ─── Export Easing Functions ───────────────────────────────────────────────
export const easings = EASING;

// ─── Default Export ────────────────────────────────────────────────────────
export default {
  init: initSmoothScroll,
  destroy: destroySmoothScroll,
  scrollTo,
  scrollToElement,
  scrollToTop,
  scrollToBottom,
  getScrollPosition,
  getScrollProgress,
  getScrollVelocity,
  onScrollVelocity,
  pause: pauseScroll,
  resume: resumeScroll,
  toggle: toggleScroll,
  isPaused: isScrollPaused,
  lockBody: lockBodyScroll,
  unlockBody: unlockBodyScroll,
  refresh: refreshScrollTrigger,
  getInstance: getLenisInstance,
  easings
};
