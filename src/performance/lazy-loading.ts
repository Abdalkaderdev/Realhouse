// ═══════════════════════════════════════════════════════════════════════════
// Lazy Loading - Optimized for Core Web Vitals
// LCP: Eager loading for above-fold images
// CLS: Explicit dimensions and aspect ratios
// ═══════════════════════════════════════════════════════════════════════════

interface LazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
  placeholder?: string;
}

interface ResponsiveImageConfig {
  src: string;
  alt: string;
  sizes?: string;
  widths?: number[];
  aspectRatio?: string;
  priority?: 'high' | 'low' | 'auto';
  className?: string;
}

const defaultOptions: LazyLoadOptions = {
  rootMargin: '200px 0px',  // Start loading 200px before visible for smoother experience
  threshold: 0.01,
  placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect fill="%231C1C2E" width="1" height="1"/%3E%3C/svg%3E'
};

const supportsNativeLazyLoad = 'loading' in HTMLImageElement.prototype;
const supportsAvif = checkAvifSupport();
const supportsWebp = checkWebpSupport();

let imageObserver: IntersectionObserver | null = null;
const loadedImages = new Set<string>();

// ─────────────────────────────────────────────────────────────────────────────
// Format Support Detection
// ─────────────────────────────────────────────────────────────────────────────

function checkAvifSupport(): boolean {
  if (typeof document === 'undefined') return false;

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  return canvas.toDataURL('image/avif').startsWith('data:image/avif');
}

function checkWebpSupport(): boolean {
  if (typeof document === 'undefined') return false;

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
}

// ─────────────────────────────────────────────────────────────────────────────
// Initialization
// ─────────────────────────────────────────────────────────────────────────────

export function initLazyLoading(options: LazyLoadOptions = {}): void {
  const opts = { ...defaultOptions, ...options };

  // Use native lazy loading when available
  if (supportsNativeLazyLoad) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => {
      const imgEl = img as HTMLImageElement;
      if (imgEl.dataset.src) {
        imgEl.loading = 'lazy';
        imgEl.decoding = 'async';

        // Set explicit dimensions if available
        if (imgEl.dataset.width) imgEl.width = parseInt(imgEl.dataset.width);
        if (imgEl.dataset.height) imgEl.height = parseInt(imgEl.dataset.height);

        imgEl.src = imgEl.dataset.src;
        delete imgEl.dataset.src;
      }
    });

    // Still use observer for dynamic content
    setupIntersectionObserver(opts);
    return;
  }

  // Fallback to Intersection Observer
  if (!('IntersectionObserver' in window)) {
    loadAllImages();
    return;
  }

  setupIntersectionObserver(opts);
  observeImages();
}

function setupIntersectionObserver(opts: LazyLoadOptions): void {
  imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        loadImage(img);
        imageObserver?.unobserve(img);
      }
    });
  }, {
    rootMargin: opts.rootMargin,
    threshold: opts.threshold
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Image Loading
// ─────────────────────────────────────────────────────────────────────────────

export function observeImages(container: Element = document.body): void {
  if (!imageObserver) return;

  const images = container.querySelectorAll('img[data-src], img[loading="lazy"]');
  images.forEach((img) => {
    const imgEl = img as HTMLImageElement;
    if (imgEl.dataset.src && !loadedImages.has(imgEl.dataset.src)) {
      imageObserver?.observe(img);
    }
  });
}

function loadImage(img: HTMLImageElement): void {
  const src = img.dataset.src;
  const srcset = img.dataset.srcset;

  if (!src || loadedImages.has(src)) return;

  // Mark as loading
  img.classList.add('loading');

  // Add blur-up effect with transform (no layout shift)
  img.style.filter = 'blur(10px)';
  img.style.transform = 'scale(1.05)';
  img.style.transition = 'filter 0.4s ease-out, transform 0.4s ease-out';

  img.onload = () => {
    // Remove blur with animation
    requestAnimationFrame(() => {
      img.style.filter = 'none';
      img.style.transform = 'scale(1)';
      img.classList.remove('loading');
      img.classList.add('loaded');
      loadedImages.add(src);
    });
  };

  img.onerror = () => {
    img.classList.remove('loading');
    img.classList.add('error');
    console.warn(`[Lazy Loading] Failed to load image: ${src}`);
  };

  if (srcset) {
    img.srcset = srcset;
    delete img.dataset.srcset;
  }

  img.src = src;
  delete img.dataset.src;
}

function loadAllImages(): void {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach((img) => loadImage(img as HTMLImageElement));
}

// ─────────────────────────────────────────────────────────────────────────────
// LCP Optimization: Critical Image Preloading
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Preload above-the-fold images for faster LCP
 * Call this early in the page lifecycle
 */
export function preloadCriticalImages(selectors: string[]): void {
  selectors.forEach((selector) => {
    const images = document.querySelectorAll(selector);
    images.forEach((img) => {
      const imgEl = img as HTMLImageElement;
      const src = imgEl.dataset.src || imgEl.src;

      if (src && !loadedImages.has(src)) {
        // Create preload link
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.setAttribute('fetchpriority', 'high');

        if (imgEl.dataset.srcset) {
          link.setAttribute('imagesrcset', imgEl.dataset.srcset);
        }

        if (imgEl.sizes) {
          link.setAttribute('imagesizes', imgEl.sizes);
        }

        // Insert at the start of head
        document.head.insertBefore(link, document.head.firstChild);

        // Also load immediately
        if (imgEl.dataset.src) {
          imgEl.loading = 'eager';
          imgEl.decoding = 'sync';
          imgEl.src = imgEl.dataset.src;
          delete imgEl.dataset.src;
          loadedImages.add(src);
        }
      }
    });
  });
}

/**
 * Preload a specific image URL
 */
export function preloadImage(src: string, srcset?: string): void {
  if (loadedImages.has(src)) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.setAttribute('fetchpriority', 'high');

  if (srcset) {
    link.setAttribute('imagesrcset', srcset);
  }

  document.head.appendChild(link);
}

// ─────────────────────────────────────────────────────────────────────────────
// CLS Prevention: Responsive Images with Explicit Dimensions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create responsive image HTML that prevents CLS
 */
export function createResponsiveImage(config: ResponsiveImageConfig): string {
  const {
    src,
    alt,
    sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    widths = [320, 640, 960, 1280, 1920],
    aspectRatio = '16/9',
    priority = 'auto',
    className = ''
  } = config;

  const srcset = widths
    .map((w) => {
      const url = generateImageUrl(src, w);
      return `${url} ${w}w`;
    })
    .join(', ');

  const loading = priority === 'high' ? 'eager' : 'lazy';
  const fetchPriority = priority === 'high' ? 'high' : 'auto';
  const decoding = priority === 'high' ? 'sync' : 'async';

  // Wrapper for aspect ratio (prevents CLS)
  return `
    <div class="image-wrapper ${className}" style="aspect-ratio: ${aspectRatio}; overflow: hidden;">
      <img
        ${priority === 'high' ? `src="${src}"` : `data-src="${src}"`}
        ${priority === 'high' ? `srcset="${srcset}"` : `data-srcset="${srcset}"`}
        sizes="${sizes}"
        alt="${alt}"
        loading="${loading}"
        fetchpriority="${fetchPriority}"
        decoding="${decoding}"
        style="width: 100%; height: 100%; object-fit: cover;"
        class="responsive-image"
      />
    </div>
  `;
}

/**
 * Create picture element with modern format fallbacks
 */
export function createPictureElement(
  src: string,
  alt: string,
  options: {
    aspectRatio?: string;
    sizes?: string;
    widths?: number[];
    className?: string;
    priority?: 'high' | 'low' | 'auto';
  } = {}
): string {
  const {
    aspectRatio = '16/9',
    sizes = '100vw',
    widths = [320, 640, 960, 1280, 1920],
    className = '',
    priority = 'auto'
  } = options;

  const avifSrcset = widths.map(w => `${generateImageUrl(src, w, 'avif')} ${w}w`).join(', ');
  const webpSrcset = widths.map(w => `${generateImageUrl(src, w, 'webp')} ${w}w`).join(', ');
  const defaultSrcset = widths.map(w => `${generateImageUrl(src, w)} ${w}w`).join(', ');

  const loading = priority === 'high' ? 'eager' : 'lazy';
  const fetchPriority = priority === 'high' ? 'high' : 'auto';

  return `
    <div class="picture-wrapper ${className}" style="aspect-ratio: ${aspectRatio}; overflow: hidden;">
      <picture>
        ${supportsAvif ? `<source type="image/avif" srcset="${avifSrcset}" sizes="${sizes}" />` : ''}
        ${supportsWebp ? `<source type="image/webp" srcset="${webpSrcset}" sizes="${sizes}" />` : ''}
        <img
          src="${src}"
          srcset="${defaultSrcset}"
          sizes="${sizes}"
          alt="${alt}"
          loading="${loading}"
          fetchpriority="${fetchPriority}"
          decoding="async"
          style="width: 100%; height: 100%; object-fit: cover;"
          class="picture-image"
        />
      </picture>
    </div>
  `;
}

/**
 * Generate optimized image URL
 */
function generateImageUrl(src: string, width?: number, format?: string): string {
  // Handle Unsplash URLs
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    if (width) url.searchParams.set('w', String(width));
    url.searchParams.set('q', '80');
    if (format) url.searchParams.set('fm', format);
    url.searchParams.set('auto', 'format');
    return url.toString();
  }

  // Return original for other sources
  return src;
}

// ─────────────────────────────────────────────────────────────────────────────
// CLS Prevention: Image Container Styles
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Add CSS to prevent CLS from images
 */
export function injectImageStyles(): void {
  const style = document.createElement('style');
  style.textContent = `
    /* Prevent CLS for lazy-loaded images */
    img[data-src] {
      background-color: var(--c-surface, #1C1C2E);
      background-image: linear-gradient(90deg, var(--c-surface) 25%, var(--c-surface-2) 50%, var(--c-surface) 75%);
      background-size: 200% 100%;
      animation: image-skeleton 1.5s ease-in-out infinite;
    }

    @keyframes image-skeleton {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    img.loaded {
      animation: none;
      background: none;
    }

    /* Aspect ratio containers */
    .image-wrapper,
    .picture-wrapper {
      position: relative;
      background-color: var(--c-surface, #1C1C2E);
      contain: layout style;
    }

    .image-wrapper img,
    .picture-wrapper img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Native aspect-ratio support */
    @supports (aspect-ratio: 16/9) {
      .image-wrapper img,
      .picture-wrapper img {
        position: static;
        aspect-ratio: inherit;
      }
    }
  `;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────────────────────────
// Cleanup
// ─────────────────────────────────────────────────────────────────────────────

export function destroyLazyLoading(): void {
  imageObserver?.disconnect();
  imageObserver = null;
  loadedImages.clear();
}

// ─────────────────────────────────────────────────────────────────────────────
// Export utilities
// ─────────────────────────────────────────────────────────────────────────────

export {
  supportsNativeLazyLoad,
  supportsAvif,
  supportsWebp
};
