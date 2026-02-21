// ═══════════════════════════════════════════════════════════════════════════
// Image Optimization - Advanced image loading for Core Web Vitals
// Improves LCP, reduces CLS, and optimizes bandwidth
// ═══════════════════════════════════════════════════════════════════════════

interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
  className?: string;
  aspectRatio?: string;
  placeholder?: 'blur' | 'color' | 'none';
  placeholderColor?: string;
}

// Default breakpoints for responsive images
const DEFAULT_WIDTHS = [320, 640, 768, 1024, 1280, 1536, 1920];

// Default sizes attribute for responsive images
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

/**
 * Generate srcset for responsive images
 * Supports WebP and AVIF formats with fallback
 */
export function generateSrcset(
  baseSrc: string,
  widths: number[] = DEFAULT_WIDTHS,
  format?: 'webp' | 'avif' | 'original'
): string {
  const extension = baseSrc.split('.').pop() || 'jpg';
  const basePath = baseSrc.replace(`.${extension}`, '');

  return widths
    .map((width) => {
      let src = `${basePath}-${width}w`;

      if (format === 'webp') {
        src += '.webp';
      } else if (format === 'avif') {
        src += '.avif';
      } else {
        src += `.${extension}`;
      }

      return `${src} ${width}w`;
    })
    .join(', ');
}

/**
 * Create an optimized picture element with multiple formats
 * Includes WebP and AVIF sources with fallback
 */
export function createOptimizedPicture(config: ImageConfig): string {
  const {
    src,
    alt,
    width,
    height,
    sizes = DEFAULT_SIZES,
    loading = 'lazy',
    fetchPriority = 'auto',
    decoding = 'async',
    className = '',
    aspectRatio,
    placeholder = 'none',
    placeholderColor = '#1C1C2E'
  } = config;

  const extension = src.split('.').pop() || 'jpg';
  const basePath = src.replace(`.${extension}`, '');

  // Generate srcsets for different formats
  const avifSrcset = generateSrcset(src, DEFAULT_WIDTHS, 'avif');
  const webpSrcset = generateSrcset(src, DEFAULT_WIDTHS, 'webp');
  const fallbackSrcset = generateSrcset(src, DEFAULT_WIDTHS, 'original');

  // Build style attribute
  const styles: string[] = [];
  if (aspectRatio) {
    styles.push(`aspect-ratio: ${aspectRatio}`);
  }
  if (placeholder === 'color') {
    styles.push(`background-color: ${placeholderColor}`);
  }
  const styleAttr = styles.length > 0 ? ` style="${styles.join('; ')}"` : '';

  // Build dimension attributes
  const dimensionAttrs = [
    width ? `width="${width}"` : '',
    height ? `height="${height}"` : ''
  ].filter(Boolean).join(' ');

  // Build loading attributes
  const loadingAttrs = [
    `loading="${loading}"`,
    `decoding="${decoding}"`,
    fetchPriority !== 'auto' ? `fetchpriority="${fetchPriority}"` : ''
  ].filter(Boolean).join(' ');

  return `
    <picture class="optimized-picture ${className}">
      <source
        type="image/avif"
        srcset="${avifSrcset}"
        sizes="${sizes}"
      />
      <source
        type="image/webp"
        srcset="${webpSrcset}"
        sizes="${sizes}"
      />
      <img
        src="${src}"
        srcset="${fallbackSrcset}"
        sizes="${sizes}"
        alt="${alt}"
        ${dimensionAttrs}
        ${loadingAttrs}
        ${styleAttr}
      />
    </picture>
  `.trim();
}

/**
 * Create a lazy-loaded image with blur-up placeholder
 */
export function createLazyImage(config: ImageConfig): string {
  const {
    src,
    alt,
    width,
    height,
    sizes = DEFAULT_SIZES,
    className = '',
    aspectRatio = '16/9',
    placeholderColor = '#1C1C2E'
  } = config;

  // Generate a tiny placeholder (LQIP - Low Quality Image Placeholder)
  const placeholderSrc = src.replace(/\.(jpg|jpeg|png|webp)$/i, '-placeholder.$1');

  return `
    <div class="lazy-image-wrapper ${className}" style="aspect-ratio: ${aspectRatio}; background-color: ${placeholderColor}">
      <img
        class="lazy-image lazy-image--placeholder"
        src="${placeholderSrc}"
        alt=""
        aria-hidden="true"
        style="filter: blur(10px); transform: scale(1.1)"
      />
      <img
        class="lazy-image lazy-image--main"
        data-src="${src}"
        data-srcset="${generateSrcset(src)}"
        data-sizes="${sizes}"
        alt="${alt}"
        ${width ? `width="${width}"` : ''}
        ${height ? `height="${height}"` : ''}
        loading="lazy"
        decoding="async"
      />
    </div>
  `.trim();
}

/**
 * Preload LCP image for above-the-fold content
 * Should be called early for hero images
 */
export function preloadLCPImage(src: string, sizes?: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;

  // Add fetchpriority for modern browsers
  (link as HTMLLinkElement & { fetchPriority: string }).fetchPriority = 'high';

  // Add sizes and srcset for responsive preloading
  if (sizes) {
    link.setAttribute('imagesizes', sizes);
    link.setAttribute('imagesrcset', generateSrcset(src));
  }

  document.head.appendChild(link);

  if (import.meta.env.DEV) {
    console.log('[LCP] Preloading hero image:', src);
  }
}

/**
 * Observe images and trigger loading animation when loaded
 */
export function observeImageLoading(container: Element = document.body): void {
  const images = container.querySelectorAll('img[data-src]');

  images.forEach((img) => {
    const imgEl = img as HTMLImageElement;

    // Store original src
    const dataSrc = imgEl.dataset.src;
    const dataSrcset = imgEl.dataset.srcset;
    const dataSizes = imgEl.dataset.sizes;

    if (!dataSrc) return;

    // Create intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load the image
            if (dataSrcset) {
              imgEl.srcset = dataSrcset;
            }
            if (dataSizes) {
              imgEl.sizes = dataSizes;
            }
            imgEl.src = dataSrc;

            // Add load handler for animation
            imgEl.onload = () => {
              imgEl.classList.add('loaded');

              // Fade out placeholder if exists
              const wrapper = imgEl.closest('.lazy-image-wrapper');
              if (wrapper) {
                const placeholder = wrapper.querySelector('.lazy-image--placeholder');
                if (placeholder) {
                  (placeholder as HTMLElement).style.opacity = '0';
                  setTimeout(() => placeholder.remove(), 300);
                }
              }
            };

            // Clean up data attributes
            delete imgEl.dataset.src;
            delete imgEl.dataset.srcset;
            delete imgEl.dataset.sizes;

            observer.unobserve(imgEl);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before visible
        threshold: 0.01
      }
    );

    observer.observe(imgEl);
  });
}

/**
 * Calculate optimal image dimensions to prevent CLS
 * Returns width and height based on aspect ratio
 */
export function calculateImageDimensions(
  containerWidth: number,
  aspectRatio: string
): { width: number; height: number } {
  const [widthRatio, heightRatio] = aspectRatio.split('/').map(Number);
  const ratio = widthRatio / heightRatio;

  return {
    width: containerWidth,
    height: Math.round(containerWidth / ratio)
  };
}

/**
 * Generate blur hash placeholder
 * Requires blurhash library for full implementation
 */
export function generatePlaceholderCSS(color: string, blur = 20): string {
  return `
    background-color: ${color};
    filter: blur(${blur}px);
    transform: scale(1.1);
  `;
}

/**
 * Check if native lazy loading is supported
 */
export function supportsNativeLazyLoading(): boolean {
  return 'loading' in HTMLImageElement.prototype;
}

/**
 * Check if AVIF format is supported
 */
export async function supportsAVIF(): Promise<boolean> {
  const avif = new Image();

  return new Promise((resolve) => {
    avif.onload = () => resolve(true);
    avif.onerror = () => resolve(false);
    // Tiny AVIF image
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKBzgADlAgIGkyCR/wAABAAACvcA==';
  });
}

/**
 * Check if WebP format is supported
 */
export async function supportsWebP(): Promise<boolean> {
  const webp = new Image();

  return new Promise((resolve) => {
    webp.onload = () => resolve(true);
    webp.onerror = () => resolve(false);
    // Tiny WebP image
    webp.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  });
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalFormat(): Promise<'avif' | 'webp' | 'original'> {
  if (await supportsAVIF()) {
    return 'avif';
  }
  if (await supportsWebP()) {
    return 'webp';
  }
  return 'original';
}
