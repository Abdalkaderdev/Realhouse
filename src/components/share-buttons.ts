// =============================================================================
// Social Share Buttons Component for Real House
// Shareable content for properties, projects, and blog posts
// =============================================================================

import { getShareUrl } from '../seo/social';
import { t } from '../i18n';

// =============================================================================
// Types
// =============================================================================

export interface ShareButtonsConfig {
  url: string;
  title: string;
  description?: string;
  image?: string;
  platforms?: SharePlatform[];
  style?: 'horizontal' | 'vertical' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  showCounts?: boolean;
}

export type SharePlatform = 'facebook' | 'twitter' | 'linkedin' | 'pinterest' | 'whatsapp' | 'telegram' | 'copy';

// =============================================================================
// Default Configuration
// =============================================================================

const DEFAULT_PLATFORMS: SharePlatform[] = ['facebook', 'twitter', 'linkedin', 'whatsapp', 'copy'];

// Platform config getter function to enable dynamic translation
function getPlatformConfig(): Record<SharePlatform, {
  name: string;
  color: string;
  ariaLabel: string;
}> {
  return {
    facebook: {
      name: t('share.platforms.facebook'),
      color: '#1877F2',
      ariaLabel: t('share.shareOnFacebook'),
    },
    twitter: {
      name: t('share.platforms.x'),
      color: '#000000',
      ariaLabel: t('share.shareOnTwitter'),
    },
    linkedin: {
      name: t('share.platforms.linkedin'),
      color: '#0A66C2',
      ariaLabel: t('share.shareOnLinkedIn'),
    },
    pinterest: {
      name: t('share.platforms.pinterest'),
      color: '#E60023',
      ariaLabel: t('share.shareOnPinterest'),
    },
    whatsapp: {
      name: t('share.whatsApp'),
      color: '#25D366',
      ariaLabel: t('share.shareOnWhatsApp'),
    },
    telegram: {
      name: t('share.platforms.telegram'),
      color: '#0088CC',
      ariaLabel: t('share.shareOnTelegram'),
    },
    copy: {
      name: t('share.copyLink'),
      color: '#6B7280',
      ariaLabel: t('share.copyLink'),
    },
  };
}

// =============================================================================
// SVG Icon Creators (Safe DOM-based approach)
// =============================================================================

function createFacebookIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z');
  svg.appendChild(path);
  return svg;
}

function createTwitterIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z');
  svg.appendChild(path);
  return svg;
}

function createLinkedInIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z');
  svg.appendChild(path);
  return svg;
}

function createPinterestIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z');
  svg.appendChild(path);
  return svg;
}

function createWhatsAppIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z');
  svg.appendChild(path);
  return svg;
}

function createTelegramIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z');
  svg.appendChild(path);
  return svg;
}

function createCopyIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '9');
  rect.setAttribute('y', '9');
  rect.setAttribute('width', '13');
  rect.setAttribute('height', '13');
  rect.setAttribute('rx', '2');
  rect.setAttribute('ry', '2');
  svg.appendChild(rect);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1');
  svg.appendChild(path);

  return svg;
}

function createCheckIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '20 6 9 17 4 12');
  svg.appendChild(polyline);

  return svg;
}

function createShareIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle1.setAttribute('cx', '18');
  circle1.setAttribute('cy', '5');
  circle1.setAttribute('r', '3');
  svg.appendChild(circle1);

  const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle2.setAttribute('cx', '6');
  circle2.setAttribute('cy', '12');
  circle2.setAttribute('r', '3');
  svg.appendChild(circle2);

  const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle3.setAttribute('cx', '18');
  circle3.setAttribute('cy', '19');
  circle3.setAttribute('r', '3');
  svg.appendChild(circle3);

  const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line1.setAttribute('x1', '8.59');
  line1.setAttribute('y1', '13.51');
  line1.setAttribute('x2', '15.42');
  line1.setAttribute('y2', '17.49');
  svg.appendChild(line1);

  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttribute('x1', '15.41');
  line2.setAttribute('y1', '6.51');
  line2.setAttribute('x2', '8.59');
  line2.setAttribute('y2', '10.49');
  svg.appendChild(line2);

  return svg;
}

function createPlatformIcon(platform: SharePlatform): SVGSVGElement {
  switch (platform) {
    case 'facebook':
      return createFacebookIcon();
    case 'twitter':
      return createTwitterIcon();
    case 'linkedin':
      return createLinkedInIcon();
    case 'pinterest':
      return createPinterestIcon();
    case 'whatsapp':
      return createWhatsAppIcon();
    case 'telegram':
      return createTelegramIcon();
    case 'copy':
      return createCopyIcon();
    default:
      return createShareIcon();
  }
}

// =============================================================================
// Share Buttons Component
// =============================================================================

/**
 * Create share buttons component
 */
export function createShareButtons(config: ShareButtonsConfig): HTMLElement {
  const platforms = config.platforms || DEFAULT_PLATFORMS;
  const style = config.style || 'horizontal';
  const size = config.size || 'md';
  const showLabels = config.showLabels ?? false;
  const PLATFORM_CONFIG = getPlatformConfig();

  const container = document.createElement('div');
  container.className = `share-buttons share-buttons--${style} share-buttons--${size}`;
  container.setAttribute('role', 'group');
  container.setAttribute('aria-label', t('share.shareThis'));

  // Create share label
  const label = document.createElement('span');
  label.className = 'share-buttons__label';
  label.textContent = t('share.share') + ':';
  container.appendChild(label);

  // Create buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'share-buttons__buttons';

  platforms.forEach(platform => {
    const platformConfig = PLATFORM_CONFIG[platform];
    if (!platformConfig) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = `share-buttons__btn share-buttons__btn--${platform}`;
    button.setAttribute('aria-label', platformConfig.ariaLabel);
    button.style.setProperty('--share-btn-color', platformConfig.color);

    // Icon
    const iconSpan = document.createElement('span');
    iconSpan.className = 'share-buttons__icon';
    iconSpan.appendChild(createPlatformIcon(platform));
    button.appendChild(iconSpan);

    // Label (if enabled)
    if (showLabels) {
      const labelSpan = document.createElement('span');
      labelSpan.className = 'share-buttons__btn-label';
      labelSpan.textContent = platformConfig.name;
      button.appendChild(labelSpan);
    }

    // Click handler
    button.addEventListener('click', () => {
      handleShare(platform, config, button);
    });

    buttonsContainer.appendChild(button);
  });

  container.appendChild(buttonsContainer);
  return container;
}

/**
 * Handle share button click
 */
function handleShare(
  platform: SharePlatform,
  config: ShareButtonsConfig,
  button: HTMLElement
): void {
  if (platform === 'copy') {
    // Copy to clipboard
    navigator.clipboard.writeText(config.url).then(() => {
      showCopyFeedback(button);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = config.url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showCopyFeedback(button);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      document.body.removeChild(textArea);
    });
  } else {
    // Open share URL in popup
    const shareUrl = getShareUrl(platform, {
      url: config.url,
      title: config.title,
      description: config.description,
      image: config.image,
    });

    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      shareUrl,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
    );

    // Track share event (if analytics is available)
    trackShareEvent(platform, config.url);
  }
}

/**
 * Show copy feedback animation
 */
function showCopyFeedback(button: HTMLElement): void {
  const iconSpan = button.querySelector('.share-buttons__icon');

  if (iconSpan) {
    // Clear existing icon and add check icon
    while (iconSpan.firstChild) {
      iconSpan.removeChild(iconSpan.firstChild);
    }
    iconSpan.appendChild(createCheckIcon());
  }

  button.classList.add('share-buttons__btn--copied');

  setTimeout(() => {
    if (iconSpan) {
      while (iconSpan.firstChild) {
        iconSpan.removeChild(iconSpan.firstChild);
      }
      iconSpan.appendChild(createCopyIcon());
    }
    button.classList.remove('share-buttons__btn--copied');
  }, 2000);
}

/**
 * Track share event for analytics
 */
function trackShareEvent(platform: string, url: string): void {
  // Google Analytics 4 event tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'share', {
      method: platform,
      content_type: 'page',
      item_id: url,
    });
  }

  // Custom analytics event
  if (typeof window !== 'undefined' && (window as any).analytics) {
    (window as any).analytics.track('Content Shared', {
      platform,
      url,
      timestamp: new Date().toISOString(),
    });
  }
}

// =============================================================================
// Specialized Share Button Creators
// =============================================================================

/**
 * Create share buttons for a property
 */
export function createPropertyShareButtons(property: {
  id: string;
  title: string;
  type: string;
  location: { district: string; city: string };
  images: string[];
}): HTMLElement {
  return createShareButtons({
    url: `https://realhouseiq.com/properties/${property.id}`,
    title: `${property.title} | Luxury ${property.type} in ${property.location.district}, Erbil | Real House`,
    description: `Check out this ${property.type.toLowerCase()} in ${property.location.district}, ${property.location.city}. Contact Real House for viewings.`,
    image: property.images[0],
    platforms: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'pinterest', 'copy'],
    style: 'horizontal',
    size: 'md',
  });
}

/**
 * Create share buttons for a project
 */
export function createProjectShareButtons(project: {
  id: string;
  name: string;
  location: { district: string; city: string };
  status: string;
  images: string[];
}): HTMLElement {
  return createShareButtons({
    url: `https://realhouseiq.com/projects/${project.id}`,
    title: `${project.name} | ${project.status} | Real Estate Development in Erbil`,
    description: `Explore ${project.name} - a premier real estate development in ${project.location.district}, ${project.location.city}.`,
    image: project.images[0],
    platforms: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'copy'],
    style: 'horizontal',
    size: 'md',
  });
}

/**
 * Create share buttons for a blog post
 */
export function createBlogShareButtons(post: {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}): HTMLElement {
  return createShareButtons({
    url: `https://realhouseiq.com/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    image: post.image,
    platforms: ['facebook', 'twitter', 'linkedin', 'pinterest', 'telegram', 'copy'],
    style: 'horizontal',
    size: 'md',
    showLabels: true,
  });
}

// =============================================================================
// Floating Share Button
// =============================================================================

/**
 * Create a floating share button that expands on hover/click
 */
export function createFloatingShareButton(config: ShareButtonsConfig): HTMLElement {
  const PLATFORM_CONFIG = getPlatformConfig();
  const container = document.createElement('div');
  container.className = 'floating-share';
  container.setAttribute('role', 'group');
  container.setAttribute('aria-label', t('share.shareOptions'));

  // Main toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'floating-share__toggle';
  toggleBtn.setAttribute('aria-label', t('share.openShareMenu'));
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.appendChild(createShareIcon());

  // Options container
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'floating-share__options';

  const platforms = config.platforms || DEFAULT_PLATFORMS;
  platforms.forEach(platform => {
    const platformConfig = PLATFORM_CONFIG[platform];
    if (!platformConfig) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = `floating-share__btn floating-share__btn--${platform}`;
    button.setAttribute('aria-label', platformConfig.ariaLabel);
    button.style.setProperty('--share-btn-color', platformConfig.color);
    button.appendChild(createPlatformIcon(platform));

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      handleShare(platform, config, button);
    });

    optionsContainer.appendChild(button);
  });

  container.appendChild(optionsContainer);
  container.appendChild(toggleBtn);

  // Toggle functionality
  let isOpen = false;
  toggleBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    container.classList.toggle('floating-share--open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !container.contains(e.target as Node)) {
      isOpen = false;
      container.classList.remove('floating-share--open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  return container;
}

// =============================================================================
// Inline Share Link Generator
// =============================================================================

/**
 * Generate inline share links container (using safe DOM methods)
 */
export function createInlineShareLinks(config: {
  url: string;
  title: string;
  platforms?: SharePlatform[];
}): HTMLElement {
  const PLATFORM_CONFIG = getPlatformConfig();
  const platforms = config.platforms || ['twitter', 'facebook', 'linkedin'];
  const container = document.createElement('div');
  container.className = 'inline-share-links';

  platforms.forEach((platform, index) => {
    const platformConfig = PLATFORM_CONFIG[platform];
    if (!platformConfig || platform === 'copy') return;

    const shareUrl = getShareUrl(platform, {
      url: config.url,
      title: config.title,
    });

    const link = document.createElement('a');
    link.href = shareUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = `inline-share-link inline-share-link--${platform}`;
    link.setAttribute('aria-label', platformConfig.ariaLabel);
    link.textContent = platformConfig.name;
    container.appendChild(link);

    // Add separator except for last item
    if (index < platforms.length - 1) {
      const separator = document.createElement('span');
      separator.className = 'inline-share-separator';
      separator.textContent = t('share.separator');
      container.appendChild(separator);
    }
  });

  return container;
}
