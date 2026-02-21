// ═══════════════════════════════════════════════════════════════════════════
// Font Optimization - Optimized font loading for Core Web Vitals
// Prevents FOIT (Flash of Invisible Text) and FOUT (Flash of Unstyled Text)
// ═══════════════════════════════════════════════════════════════════════════

interface FontConfig {
  family: string;
  weights: number[];
  styles?: ('normal' | 'italic')[];
  display?: 'swap' | 'block' | 'fallback' | 'optional' | 'auto';
  preload?: boolean;
  subset?: string;
}

// System font stacks for fallbacks
export const SYSTEM_FONTS = {
  sans: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif'
  ].join(', '),

  serif: [
    'Georgia',
    'Cambria',
    '"Times New Roman"',
    'Times',
    'serif'
  ].join(', '),

  mono: [
    'ui-monospace',
    'SFMono-Regular',
    '"SF Mono"',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace'
  ].join(', ')
};

// Font metrics for size-adjust (prevents layout shift)
// These values are calculated for specific font pairs
export const FONT_METRICS = {
  Inter: {
    fallback: SYSTEM_FONTS.sans,
    sizeAdjust: '100%',
    ascentOverride: '90%',
    descentOverride: '22%',
    lineGapOverride: '0%'
  },
  Cormorant: {
    fallback: SYSTEM_FONTS.serif,
    sizeAdjust: '105%',
    ascentOverride: '95%',
    descentOverride: '25%',
    lineGapOverride: '0%'
  }
};

/**
 * Generate @font-face declarations with optimal settings
 */
export function generateFontFace(config: FontConfig): string {
  const {
    family,
    weights,
    styles = ['normal'],
    display = 'swap',
    subset = 'latin'
  } = config;

  const declarations: string[] = [];

  weights.forEach((weight) => {
    styles.forEach((style) => {
      // Generate URL for font file
      const fontUrl = `https://fonts.gstatic.com/s/${family.toLowerCase()}/v21/${family.toLowerCase()}-${weight}${style === 'italic' ? '-italic' : ''}-${subset}.woff2`;

      declarations.push(`
        @font-face {
          font-family: '${family}';
          font-style: ${style};
          font-weight: ${weight};
          font-display: ${display};
          src: url('${fontUrl}') format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `);
    });
  });

  return declarations.join('\n');
}

/**
 * Generate fallback @font-face with size adjustments
 * Prevents CLS when web fonts load
 */
export function generateFallbackFontFace(fontFamily: keyof typeof FONT_METRICS): string {
  const metrics = FONT_METRICS[fontFamily];
  if (!metrics) return '';

  return `
    @font-face {
      font-family: '${fontFamily} Fallback';
      src: local('${metrics.fallback.split(',')[0].trim().replace(/"/g, '')}');
      size-adjust: ${metrics.sizeAdjust};
      ascent-override: ${metrics.ascentOverride};
      descent-override: ${metrics.descentOverride};
      line-gap-override: ${metrics.lineGapOverride};
    }
  `;
}

/**
 * Initialize font loading with optimal strategy
 * Uses the Font Loading API for precise control
 */
export async function initFontLoading(): Promise<void> {
  // Add fonts-loading class immediately
  document.documentElement.classList.add('fonts-loading');

  // Check if fonts are already cached
  if ('fonts' in document) {
    try {
      // Check for critical fonts
      const interLoaded = await document.fonts.check('400 1em Inter');
      const cormorantLoaded = await document.fonts.check('400 1em Cormorant');

      if (interLoaded && cormorantLoaded) {
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-loaded');
        return;
      }

      // Load fonts with the Font Loading API
      await Promise.all([
        document.fonts.load('400 1em Inter'),
        document.fonts.load('500 1em Inter'),
        document.fonts.load('600 1em Inter'),
        document.fonts.load('400 1em Cormorant'),
        document.fonts.load('500 1em Cormorant'),
        document.fonts.load('600 1em Cormorant')
      ]);

      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-loaded');

      if (import.meta.env.DEV) {
        console.log('[Fonts] Web fonts loaded successfully');
      }
    } catch (error) {
      // Fallback to system fonts on error
      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-failed');

      if (import.meta.env.DEV) {
        console.warn('[Fonts] Failed to load web fonts, using fallbacks:', error);
      }
    }
  }
}

/**
 * Preload critical fonts for above-the-fold content
 */
export function preloadCriticalFonts(): void {
  const criticalFonts = [
    // Inter - Primary UI font
    'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.woff2',
    // Cormorant - Display font
    'https://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIiRPmvgoq5.woff2'
  ];

  criticalFonts.forEach((fontUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = fontUrl;
    link.crossOrigin = 'anonymous';
    (link as HTMLLinkElement & { fetchPriority: string }).fetchPriority = 'high';

    document.head.appendChild(link);
  });
}

/**
 * Generate CSS for font-display optimization
 */
export function getFontDisplayCSS(): string {
  return `
    /* Font loading states */
    .fonts-loading body {
      font-family: ${SYSTEM_FONTS.sans};
    }

    .fonts-loading h1,
    .fonts-loading h2,
    .fonts-loading h3,
    .fonts-loading .font-serif,
    .fonts-loading [class*="heading"] {
      font-family: ${SYSTEM_FONTS.serif};
    }

    .fonts-loaded body {
      font-family: 'Inter', ${SYSTEM_FONTS.sans};
    }

    .fonts-loaded h1,
    .fonts-loaded h2,
    .fonts-loaded h3,
    .fonts-loaded .font-serif,
    .fonts-loaded [class*="heading"] {
      font-family: 'Cormorant', ${SYSTEM_FONTS.serif};
    }

    /* Prevent FOIT */
    .fonts-loading .critical-text {
      visibility: visible !important;
    }

    /* Smooth font swap transition */
    .fonts-loaded body,
    .fonts-loaded h1,
    .fonts-loaded h2,
    .fonts-loaded h3 {
      transition: opacity 0.1s ease-in-out;
    }
  `;
}

/**
 * Subset fonts to include only needed characters
 * Reduces font file size significantly
 */
export function getFontSubsetURL(
  family: string,
  weights: number[],
  text?: string
): string {
  const baseUrl = 'https://fonts.googleapis.com/css2';
  const params = new URLSearchParams();

  // Build family parameter
  const weightStr = weights.join(';');
  params.append('family', `${family}:wght@${weightStr}`);

  // Add display parameter
  params.append('display', 'swap');

  // Add text parameter for subsetting
  if (text) {
    params.append('text', encodeURIComponent(text));
  }

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Check if a specific font is available
 */
export function isFontAvailable(fontFamily: string): boolean {
  if (!('fonts' in document)) {
    return false;
  }

  return document.fonts.check(`1em ${fontFamily}`);
}

/**
 * Get font loading status
 */
export function getFontLoadingStatus(): 'loading' | 'loaded' | 'failed' | 'unknown' {
  if (document.documentElement.classList.contains('fonts-loaded')) {
    return 'loaded';
  }
  if (document.documentElement.classList.contains('fonts-failed')) {
    return 'failed';
  }
  if (document.documentElement.classList.contains('fonts-loading')) {
    return 'loading';
  }
  return 'unknown';
}

/**
 * Add variable font support detection
 */
export function supportsVariableFonts(): boolean {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return false;

  // Check if the browser supports font-variation-settings
  ctx.font = '16px Inter';
  const width1 = ctx.measureText('m').width;

  ctx.font = 'italic 16px Inter';
  const width2 = ctx.measureText('m').width;

  return width1 !== width2;
}
