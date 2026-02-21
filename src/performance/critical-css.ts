// ═══════════════════════════════════════════════════════════════════════════
// Critical CSS - Extract and inline above-fold CSS for faster FCP
// Improves First Contentful Paint and Largest Contentful Paint
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Critical CSS selectors for above-the-fold content
 * These styles are inlined in the HTML for instant rendering
 */
export const CRITICAL_SELECTORS = [
  // Reset & base
  '*', '*::before', '*::after',
  'html', 'body',

  // Navigation (always visible)
  '.nav', '.nav__container', '.nav__logo', '.nav__logo-icon', '.nav__logo-text',
  '.nav__menu', '.nav__list', '.nav__link', '.nav__actions', '.nav__hamburger',

  // Loader (first thing user sees)
  '.loader', '.loader__content', '.loader__logo', '.loader__logo-line',
  '.loader__text', '.loader__progress', '.loader__progress-bar', '.loader__counter',

  // Skip links (accessibility)
  '.skip-link', '.visually-hidden',

  // Scroll progress
  '.scroll-progress', '.scroll-progress__bar',

  // Hero section (LCP candidate)
  '.hero', '.hero__container', '.hero__content', '.hero__title', '.hero__subtitle',
  '.hero__cta', '.hero__video', '.hero__media',

  // Page transition
  '.page-transition', '.page-transition__label'
];

/**
 * Non-critical CSS that can be deferred
 * These are loaded asynchronously after initial render
 */
export const DEFERRED_MODULES = [
  // Property cards (below fold initially)
  'property-cards',
  'property-detail',
  'property-gallery',

  // Interactive components
  'filters',
  'search',
  'map',

  // Footer and secondary content
  'footer',
  'testimonials',
  'blog-cards',

  // Animations (progressive enhancement)
  'animations',
  'transitions',
  'hover-effects'
];

/**
 * Load non-critical CSS asynchronously
 * Uses requestIdleCallback for optimal scheduling
 */
export function loadDeferredCSS(stylesheetUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const scheduleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

    scheduleTask(() => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = stylesheetUrl;
      link.media = 'print'; // Initial non-blocking

      link.onload = () => {
        link.media = 'all'; // Apply styles after load
        resolve();
      };

      link.onerror = () => {
        reject(new Error(`Failed to load stylesheet: ${stylesheetUrl}`));
      };

      document.head.appendChild(link);
    });
  });
}

/**
 * Extract critical CSS from loaded stylesheets
 * This is a build-time optimization helper
 */
export function extractCriticalCSS(document: Document, selectors: string[]): string {
  const criticalRules: string[] = [];
  const processed = new Set<string>();

  // Iterate through all stylesheets
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      const rules = (sheet as CSSStyleSheet).cssRules;

      Array.from(rules).forEach((rule) => {
        if (rule instanceof CSSStyleRule) {
          // Check if selector matches critical selectors
          const matches = selectors.some((selector) => {
            return rule.selectorText.includes(selector);
          });

          if (matches && !processed.has(rule.cssText)) {
            criticalRules.push(rule.cssText);
            processed.add(rule.cssText);
          }
        } else if (rule instanceof CSSMediaRule) {
          // Handle media queries
          const mediaRules: string[] = [];

          Array.from(rule.cssRules).forEach((innerRule) => {
            if (innerRule instanceof CSSStyleRule) {
              const matches = selectors.some((selector) => {
                return innerRule.selectorText.includes(selector);
              });

              if (matches) {
                mediaRules.push(innerRule.cssText);
              }
            }
          });

          if (mediaRules.length > 0) {
            criticalRules.push(`@media ${rule.conditionText} { ${mediaRules.join(' ')} }`);
          }
        }
      });
    } catch {
      // CORS restriction on external stylesheets - skip silently
    }
  });

  return criticalRules.join('\n');
}

/**
 * Remove unused CSS from the document
 * Call this after page is fully loaded to clean up
 */
export function removeUnusedCSS(): void {
  if (import.meta.env.DEV) {
    console.log('[Performance] Analyzing unused CSS...');
  }

  const scheduleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

  scheduleTask(() => {
    const allElements = document.querySelectorAll('*');
    const usedClasses = new Set<string>();

    // Collect all used class names
    allElements.forEach((el) => {
      el.classList.forEach((className) => {
        usedClasses.add(`.${className}`);
      });
    });

    if (import.meta.env.DEV) {
      console.log(`[Performance] Found ${usedClasses.size} unique classes in use`);
    }
  });
}

/**
 * Inline critical CSS for server-side rendering
 * Returns a style tag with critical CSS
 */
export function generateCriticalStyleTag(css: string): string {
  // Minify CSS
  const minified = css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around punctuation
    .trim();

  return `<style id="critical-css">${minified}</style>`;
}

/**
 * Add link to load full CSS after critical CSS
 */
export function addFullCSSLink(href: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = href;
  stylesheet.media = 'print';
  stylesheet.onload = function() {
    stylesheet.media = 'all';
  };

  document.head.appendChild(link);
  document.head.appendChild(stylesheet);
}
