// ═══════════════════════════════════════════════════════════════════════════
// Comprehensive Property Detail Page for Real House
// Features: Hero Gallery, Specs, Description, Features, Map, Inquiry Form,
// Similar Properties, JSON-LD Structured Data, Breadcrumbs
// ═══════════════════════════════════════════════════════════════════════════

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  type Property,
  getPropertyBySlug,
  generatePropertySlug,
  getSimilarProperties,
  getDisplayPrice
} from '../data/properties';
import { agents as fullAgents } from '../data/agents';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  getPropertyDetailBreadcrumbs
} from '../components/internal-linking';
import {
  createSEOImage,
  generateSrcSet,
  generateSizes,
  IMAGE_DIMENSIONS,
  updateImageMetaTags
} from '../utils/image-seo';
import { createMortgageWidget } from '../components/mortgage-calculator';
import { createPrintButton } from '../components/print-property';
import { createVideoTourSection } from '../components/video-tour';
import { trackPropertyView } from '../components/recently-viewed';
import { createWishlistButton } from '../components/wishlist';
import { t } from '../i18n';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

interface FeatureCategory {
  name: string;
  icon: string;
  features: string[];
}

// ─── Helper Functions ────────────────────────────────────────────────────────

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

function createSVGUse(iconId: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

function createChevronSVG(direction: 'left' | 'right'): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6');
  svg.appendChild(polyline);

  return svg;
}

function createExpandSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3');
  svg.appendChild(path);

  return svg;
}

function createPhoneSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z');
  svg.appendChild(path);

  return svg;
}

function createWhatsAppSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z');
  svg.appendChild(path);

  return svg;
}

function createFacebookSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z');
  svg.appendChild(path);

  return svg;
}

function createLinkSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71');
  svg.appendChild(path1);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71');
  svg.appendChild(path2);

  return svg;
}

function createMapPinSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z');
  svg.appendChild(path);

  return svg;
}

function createCloseButton(className: string): HTMLButtonElement {
  const btn = createElement('button', className);
  btn.textContent = '\u00D7';
  btn.setAttribute('aria-label', t('buttons.close'));
  return btn;
}

// ─── JSON-LD Schema Generator ────────────────────────────────────────────────

function generatePropertySchema(property: Property): string {
  const slug = generatePropertySlug(property);
  const canonicalUrl = `https://realhouseiq.com/properties/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': canonicalUrl,
    'name': property.title,
    'description': property.description || `${property.type} for ${property.status} in ${property.location.district}, ${property.location.city}. ${property.specs.beds} bedrooms, ${property.specs.baths} bathrooms, ${property.specs.sqm} sqm.`,
    'url': canonicalUrl,
    'image': property.images,
    'datePosted': new Date().toISOString().split('T')[0],
    'offers': {
      '@type': 'Offer',
      'price': property.price,
      'priceCurrency': 'USD',
      'availability': property.status === 'Sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      'itemCondition': property.status === 'Off Plan' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': property.location.address,
      'addressLocality': property.location.district,
      'addressRegion': property.location.city,
      'addressCountry': 'IQ'
    },
    'geo': property.location.coordinates ? {
      '@type': 'GeoCoordinates',
      'latitude': property.location.coordinates.lat,
      'longitude': property.location.coordinates.lng
    } : undefined,
    'numberOfRooms': property.specs.beds + property.specs.baths,
    'numberOfBedrooms': property.specs.beds,
    'numberOfBathroomsTotal': property.specs.baths,
    'floorSize': {
      '@type': 'QuantitativeValue',
      'value': property.specs.sqm,
      'unitCode': 'MTK'
    },
    'amenityFeature': property.features?.map(feature => ({
      '@type': 'LocationFeatureSpecification',
      'name': feature,
      'value': true
    })),
    'broker': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': 'https://realhouseiq.com',
      'telephone': '+964 750 792 2138',
      'email': 'info@realhouseiq.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Gulan Street',
        'addressLocality': 'Erbil',
        'addressRegion': 'Kurdistan Region',
        'addressCountry': 'IQ'
      }
    }
  };

  return JSON.stringify(schema);
}

function injectPropertySchema(property: Property): void {
  const existing = document.querySelector('script[data-schema="property-detail"]');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'property-detail');
  script.textContent = generatePropertySchema(property);
  document.head.appendChild(script);
}

// ─── Feature Categorization ─────────────────────────────────────────────────

function categorizeFeatures(features: string[]): FeatureCategory[] {
  const categories: Record<string, string[]> = {
    [t('propertyDetail.categories.interior')]: [],
    [t('propertyDetail.categories.exterior')]: [],
    [t('propertyDetail.categories.security')]: [],
    [t('propertyDetail.categories.amenities')]: [],
    [t('propertyDetail.categories.other')]: []
  };

  features.forEach(feature => {
    const lower = feature.toLowerCase();

    if (lower.includes('kitchen') || lower.includes('floor') || lower.includes('ceiling') ||
        lower.includes('bathroom') || lower.includes('bedroom') || lower.includes('living') ||
        lower.includes('dining') || lower.includes('closet') || lower.includes('storage') ||
        lower.includes('laundry') || lower.includes('room') || lower.includes('window') ||
        lower.includes('door') || lower.includes('wall') || lower.includes('paint') ||
        lower.includes('marble') || lower.includes('granite') || lower.includes('wood') ||
        lower.includes('tile') || lower.includes('carpet') || lower.includes('appliance') ||
        lower.includes('ac') || lower.includes('heating') || lower.includes('cooling') ||
        lower.includes('smart') || lower.includes('light')) {
      categories[t('propertyDetail.categories.interior')].push(feature);
    } else if (lower.includes('garden') || lower.includes('balcony') || lower.includes('terrace') ||
               lower.includes('patio') || lower.includes('pool') || lower.includes('garage') ||
               lower.includes('parking') || lower.includes('driveway') || lower.includes('yard') ||
               lower.includes('outdoor') || lower.includes('view') || lower.includes('landscap') ||
               lower.includes('fence') || lower.includes('gate')) {
      categories[t('propertyDetail.categories.exterior')].push(feature);
    } else if (lower.includes('security') || lower.includes('camera') || lower.includes('alarm') ||
               lower.includes('cctv') || lower.includes('guard') || lower.includes('intercom') ||
               lower.includes('safe') || lower.includes('lock') || lower.includes('24/7') ||
               lower.includes('surveillance') || lower.includes('doorman') || lower.includes('entry')) {
      categories[t('propertyDetail.categories.security')].push(feature);
    } else if (lower.includes('gym') || lower.includes('fitness') || lower.includes('spa') ||
               lower.includes('sauna') || lower.includes('jacuzzi') || lower.includes('club') ||
               lower.includes('community') || lower.includes('lounge') || lower.includes('rooftop') ||
               lower.includes('elevator') || lower.includes('concierge') || lower.includes('valet') ||
               lower.includes('play') || lower.includes('children') || lower.includes('park') ||
               lower.includes('recreation')) {
      categories[t('propertyDetail.categories.amenities')].push(feature);
    } else {
      categories[t('propertyDetail.categories.other')].push(feature);
    }
  });

  const iconMap: Record<string, string> = {
    [t('propertyDetail.categories.interior')]: 'icon-home',
    [t('propertyDetail.categories.exterior')]: 'icon-area',
    [t('propertyDetail.categories.security')]: 'icon-check',
    [t('propertyDetail.categories.amenities')]: 'icon-check',
    [t('propertyDetail.categories.other')]: 'icon-check'
  };

  const result: FeatureCategory[] = [];
  for (const [name, items] of Object.entries(categories)) {
    if (items.length > 0) {
      result.push({ name, icon: iconMap[name], features: items });
    }
  }

  return result;
}

// ─── 404 Not Found Page ──────────────────────────────────────────────────────

function renderNotFoundPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('div', 'property-detail property-detail--not-found');
  const container = createElement('div', 'container');

  const content = createElement('div', 'property-detail__error');

  const icon = createElement('div', 'property-detail__error-icon');
  icon.textContent = '?';
  content.appendChild(icon);

  const title = createElement('h1', 'property-detail__error-title', t('propertyDetail.propertyNotFound'));
  content.appendChild(title);

  const message = createElement('p', 'property-detail__error-message');
  message.textContent = t('propertyDetail.propertyNotFoundMessage');
  content.appendChild(message);

  const actions = createElement('div', 'property-detail__error-actions');

  const browseBtn = createElement('a', 'btn btn--primary', t('propertyDetail.browseAllProperties'));
  browseBtn.href = '/properties';
  browseBtn.setAttribute('data-route', '');
  actions.appendChild(browseBtn);

  const contactBtn = createElement('a', 'btn btn--ghost', t('common.contactUs'));
  contactBtn.href = '/contact';
  contactBtn.setAttribute('data-route', '');
  actions.appendChild(contactBtn);

  content.appendChild(actions);
  container.appendChild(content);
  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Property Detail Page Renderer
// ═══════════════════════════════════════════════════════════════════════════

export function renderPropertyDetailPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const property = getPropertyBySlug(slug);

  if (!property) {
    return renderNotFoundPage(slug);
  }

  // Track this property view for "Recently Viewed" feature
  trackPropertyView(property.id);

  const page = createElement('article', 'property-detail');
  page.setAttribute('itemscope', '');
  page.setAttribute('itemtype', 'https://schema.org/RealEstateListing');

  // Inject JSON-LD Schema
  injectPropertySchema(property);

  // ─── Breadcrumbs Navigation ──────────────────────────────────────────────
  const breadcrumbSection = createElement('nav', 'property-detail__breadcrumbs');
  breadcrumbSection.setAttribute('aria-label', 'Breadcrumb navigation');
  const breadcrumbContainer = createElement('div', 'container');
  const breadcrumbItems = getPropertyDetailBreadcrumbs(property);
  breadcrumbContainer.appendChild(createBreadcrumbs(breadcrumbItems));
  breadcrumbSection.appendChild(breadcrumbContainer);
  page.appendChild(breadcrumbSection);
  injectBreadcrumbSchema(breadcrumbItems);

  // ─── Hero Gallery Section ────────────────────────────────────────────────
  const heroSection = createElement('section', 'property-detail__hero');
  heroSection.setAttribute('aria-label', 'Property images');
  const heroContainer = createElement('div', 'container');

  const galleryWrapper = createElement('div', 'property-detail__gallery');

  // Main Image
  const mainImageWrapper = createElement('div', 'property-detail__gallery-main');
  const mainImage = createSEOImage({
    src: property.images[0],
    alt: `${property.title} - ${property.type} in ${property.location.district}`,
    title: property.title,
    className: 'property-detail__main-image',
    loading: 'eager',
    width: IMAGE_DIMENSIONS.detail.width,
    height: IMAGE_DIMENSIONS.detail.height,
    srcset: generateSrcSet(property.images[0], [600, 900, 1200, 1600]),
    sizes: generateSizes('detail'),
    fetchPriority: 'high'
  });
  mainImage.id = 'property-main-image';
  mainImageWrapper.appendChild(mainImage);

  // Status badge
  const statusBadge = createElement('span', `property-detail__status property-detail__status--${property.status.toLowerCase().replace(/\s/g, '-')}`);
  statusBadge.textContent = property.status;
  mainImageWrapper.appendChild(statusBadge);

  // Property badges
  if (property.badges && property.badges.length > 0) {
    const badgesContainer = createElement('div', 'property-detail__badges');
    property.badges.forEach(badge => {
      const badgeEl = createElement('span', `property-detail__badge property-detail__badge--${badge.toLowerCase()}`);
      badgeEl.textContent = badge;
      badgesContainer.appendChild(badgeEl);
    });
    mainImageWrapper.appendChild(badgesContainer);
  }

  // Gallery controls
  const galleryControls = createElement('div', 'property-detail__gallery-controls');

  const prevBtn = createElement('button', 'property-detail__gallery-btn property-detail__gallery-btn--prev');
  prevBtn.setAttribute('aria-label', 'Previous image');
  prevBtn.appendChild(createChevronSVG('left'));
  galleryControls.appendChild(prevBtn);

  const nextBtn = createElement('button', 'property-detail__gallery-btn property-detail__gallery-btn--next');
  nextBtn.setAttribute('aria-label', 'Next image');
  nextBtn.appendChild(createChevronSVG('right'));
  galleryControls.appendChild(nextBtn);

  mainImageWrapper.appendChild(galleryControls);

  // Fullscreen button
  const fullscreenBtn = createElement('button', 'property-detail__fullscreen-btn');
  fullscreenBtn.setAttribute('aria-label', 'View fullscreen gallery');
  fullscreenBtn.appendChild(createExpandSVG());
  mainImageWrapper.appendChild(fullscreenBtn);

  // Wishlist/Save button
  const wishlistBtn = createWishlistButton(property.id);
  wishlistBtn.classList.add('property-detail__wishlist-btn');
  mainImageWrapper.appendChild(wishlistBtn);

  galleryWrapper.appendChild(mainImageWrapper);

  // Thumbnails
  if (property.images.length > 1) {
    const thumbnailsWrapper = createElement('div', 'property-detail__thumbnails');

    property.images.forEach((imgSrc, index) => {
      const thumb = createElement('button', `property-detail__thumb${index === 0 ? ' active' : ''}`);
      thumb.setAttribute('data-index', index.toString());
      thumb.setAttribute('aria-label', `View image ${index + 1} of ${property.images.length}`);
      thumb.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');

      const thumbImg = createSEOImage({
        src: imgSrc,
        alt: '',
        loading: index < 6 ? 'eager' : 'lazy',
        width: 120,
        height: 80
      });
      thumbImg.setAttribute('aria-hidden', 'true');
      thumb.appendChild(thumbImg);

      thumbnailsWrapper.appendChild(thumb);
    });

    galleryWrapper.appendChild(thumbnailsWrapper);
  }

  heroContainer.appendChild(galleryWrapper);
  heroSection.appendChild(heroContainer);
  page.appendChild(heroSection);

  updateImageMetaTags(property.images[0], `${property.title} - ${property.type} in ${property.location.district}`, 'property');

  // ─── Main Content Section ────────────────────────────────────────────────
  const mainSection = createElement('section', 'property-detail__content');
  const mainContainer = createElement('div', 'container');
  const contentGrid = createElement('div', 'property-detail__grid');

  // ─── Left Column (Main Info) ─────────────────────────────────────────────
  const mainColumn = createElement('div', 'property-detail__main');

  // Header
  const header = createElement('header', 'property-detail__header');

  const typeTag = createElement('span', 'property-detail__type');
  typeTag.textContent = property.type;
  header.appendChild(typeTag);

  const title = createElement('h1', 'property-detail__title');
  title.textContent = property.title;
  title.setAttribute('itemprop', 'name');
  header.appendChild(title);

  const location = createElement('p', 'property-detail__location');
  location.appendChild(createSVGUse('icon-location'));
  const locationText = document.createTextNode(`${property.location.address}, ${property.location.district}, ${property.location.city}`);
  location.appendChild(locationText);
  location.setAttribute('itemprop', 'address');
  header.appendChild(location);

  // Share buttons
  const shareSection = createElement('div', 'property-detail__share');
  const shareLabel = createElement('span', 'property-detail__share-label', t('propertyDetail.share'));
  shareSection.appendChild(shareLabel);

  const shareButtons = createElement('div', 'property-detail__share-buttons');

  const shareData = {
    url: window.location.href,
    text: `Check out this ${property.type}: ${property.title} - ${getDisplayPrice(property)}`
  };

  // WhatsApp
  const whatsappBtn = createElement('button', 'property-detail__share-btn');
  whatsappBtn.setAttribute('aria-label', 'Share on WhatsApp');
  whatsappBtn.appendChild(createWhatsAppSVG());
  whatsappBtn.addEventListener('click', () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`, '_blank', 'noopener,noreferrer');
  });
  shareButtons.appendChild(whatsappBtn);

  // Facebook
  const facebookBtn = createElement('button', 'property-detail__share-btn');
  facebookBtn.setAttribute('aria-label', 'Share on Facebook');
  facebookBtn.appendChild(createFacebookSVG());
  facebookBtn.addEventListener('click', () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`, '_blank', 'noopener,noreferrer,width=600,height=400');
  });
  shareButtons.appendChild(facebookBtn);

  // Copy Link
  const copyBtn = createElement('button', 'property-detail__share-btn');
  copyBtn.setAttribute('aria-label', 'Copy link');
  copyBtn.appendChild(createLinkSVG());
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      showToast('Link copied to clipboard!');
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = shareData.url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('Link copied to clipboard!');
    }
  });
  shareButtons.appendChild(copyBtn);

  // Print/PDF button
  const printBtn = createPrintButton(property, 'icon');
  printBtn.classList.add('property-detail__share-btn');
  shareButtons.appendChild(printBtn);

  shareSection.appendChild(shareButtons);
  header.appendChild(shareSection);
  mainColumn.appendChild(header);

  // Price Section
  const priceSection = createElement('div', 'property-detail__price-section');

  const priceWrapper = createElement('div', 'property-detail__price-wrapper');
  const priceLabel = createElement('span', 'property-detail__price-label');
  priceLabel.textContent = property.status === 'For Rent' ? t('propertyDetail.monthlyRent') : t('propertyDetail.askingPrice');
  priceWrapper.appendChild(priceLabel);

  const priceValue = createElement('span', 'property-detail__price');
  priceValue.textContent = getDisplayPrice(property);
  priceValue.setAttribute('itemprop', 'price');
  priceWrapper.appendChild(priceValue);

  priceSection.appendChild(priceWrapper);

  // Price per sqm
  if (property.price > 0 && property.specs.sqm > 0) {
    const pricePerSqm = createElement('span', 'property-detail__price-sqm');
    const perSqm = Math.round(property.price / property.specs.sqm);
    pricePerSqm.textContent = `$${perSqm.toLocaleString()}/sqm`;
    priceSection.appendChild(pricePerSqm);
  }

  mainColumn.appendChild(priceSection);

  // Specs Grid
  const specsSection = createElement('div', 'property-detail__specs');
  const specsTitle = createElement('h2', 'property-detail__section-title', t('propertyDetail.propertyDetails'));
  specsSection.appendChild(specsTitle);

  const specsGrid = createElement('div', 'property-detail__specs-grid');

  const specsData: Array<{ icon: string; label: string; value: string; itemprop: string | null }> = [
    { icon: 'icon-bed', label: t('propertyDetail.bedrooms'), value: property.specs.beds.toString(), itemprop: 'numberOfBedrooms' },
    { icon: 'icon-bath', label: t('propertyDetail.bathrooms'), value: property.specs.baths.toString(), itemprop: 'numberOfBathroomsTotal' },
    { icon: 'icon-area', label: t('propertyDetail.area'), value: `${property.specs.sqm.toLocaleString()} m\u00B2`, itemprop: 'floorSize' },
    { icon: 'icon-building', label: t('propertyDetail.type'), value: property.type, itemprop: null }
  ];

  if (property.specs.yearBuilt) {
    specsData.push({ icon: 'icon-calendar', label: t('propertyDetail.yearBuilt'), value: property.specs.yearBuilt.toString(), itemprop: 'yearBuilt' });
  }

  if (property.specs.totalFloors) {
    specsData.push({ icon: 'icon-building', label: t('propertyDetail.floors'), value: property.specs.totalFloors.toString(), itemprop: null });
  }

  specsData.forEach(spec => {
    const specItem = createElement('div', 'property-detail__spec-item');

    const iconWrapper = createElement('div', 'property-detail__spec-icon');
    iconWrapper.appendChild(createSVGUse(spec.icon));
    specItem.appendChild(iconWrapper);

    const specContent = createElement('div', 'property-detail__spec-content');
    const specLabel = createElement('span', 'property-detail__spec-label', spec.label);
    specContent.appendChild(specLabel);

    const specValue = createElement('span', 'property-detail__spec-value', spec.value);
    if (spec.itemprop) {
      specValue.setAttribute('itemprop', spec.itemprop);
    }
    specContent.appendChild(specValue);

    specItem.appendChild(specContent);
    specsGrid.appendChild(specItem);
  });

  specsSection.appendChild(specsGrid);
  mainColumn.appendChild(specsSection);

  // Description Section
  if (property.description) {
    const descSection = createElement('div', 'property-detail__description');
    const descTitle = createElement('h2', 'property-detail__section-title', t('propertyDetail.description'));
    descSection.appendChild(descTitle);

    const descContent = createElement('div', 'property-detail__description-content');
    descContent.setAttribute('itemprop', 'description');

    const paragraphs = property.description.split('\n\n');
    paragraphs.forEach(para => {
      if (para.trim()) {
        const p = createElement('p');
        p.textContent = para.trim();
        descContent.appendChild(p);
      }
    });

    descSection.appendChild(descContent);
    mainColumn.appendChild(descSection);
  }

  // Features Section
  if (property.features && property.features.length > 0) {
    const featuresSection = createElement('div', 'property-detail__features');
    const featuresTitle = createElement('h2', 'property-detail__section-title', t('propertyDetail.featuresAmenities'));
    featuresSection.appendChild(featuresTitle);

    const categories = categorizeFeatures(property.features);

    if (categories.length > 0) {
      const featuresGrid = createElement('div', 'property-detail__features-grid');

      categories.forEach(category => {
        const categorySection = createElement('div', 'property-detail__feature-category');

        const categoryTitle = createElement('h3', 'property-detail__feature-category-title');
        categoryTitle.appendChild(createSVGUse(category.icon));
        categoryTitle.appendChild(document.createTextNode(category.name));
        categorySection.appendChild(categoryTitle);

        const featuresList = createElement('ul', 'property-detail__features-list');
        category.features.forEach(feature => {
          const li = createElement('li', 'property-detail__feature-item');
          li.appendChild(createSVGUse('icon-check'));
          li.appendChild(document.createTextNode(feature));
          featuresList.appendChild(li);
        });

        categorySection.appendChild(featuresList);
        featuresGrid.appendChild(categorySection);
      });

      featuresSection.appendChild(featuresGrid);
    } else {
      const featuresList = createElement('ul', 'property-detail__features-list property-detail__features-list--simple');
      property.features.forEach(feature => {
        const li = createElement('li', 'property-detail__feature-item');
        li.appendChild(createSVGUse('icon-check'));
        li.appendChild(document.createTextNode(feature));
        featuresList.appendChild(li);
      });
      featuresSection.appendChild(featuresList);
    }

    mainColumn.appendChild(featuresSection);
  }

  // Video Tour Section (if property has video)
  if (property.videoTourUrl) {
    const videoSection = createVideoTourSection({
      videoUrl: property.videoTourUrl,
      propertyTitle: property.title,
      thumbnailUrl: property.images[0]
    });
    mainColumn.appendChild(videoSection);
  }

  // Location Map Section
  const mapSection = createElement('div', 'property-detail__map');
  const mapTitle = createElement('h2', 'property-detail__section-title', t('propertyDetail.location'));
  mapSection.appendChild(mapTitle);

  const mapInfo = createElement('div', 'property-detail__map-info');
  const mapAddress = createElement('p', 'property-detail__map-address');
  mapAddress.appendChild(createSVGUse('icon-location'));
  mapAddress.appendChild(document.createTextNode(`${property.location.address}, ${property.location.district}, ${property.location.city}`));
  mapInfo.appendChild(mapAddress);
  mapSection.appendChild(mapInfo);

  const mapPlaceholder = createElement('div', 'property-detail__map-placeholder');

  if (property.location.coordinates) {
    const mapFrame = createElement('div', 'property-detail__map-frame');
    mapFrame.setAttribute('data-lat', property.location.coordinates.lat.toString());
    mapFrame.setAttribute('data-lng', property.location.coordinates.lng.toString());

    const mapOverlay = createElement('div', 'property-detail__map-overlay');
    const mapIcon = createElement('div', 'property-detail__map-icon');
    mapIcon.appendChild(createMapPinSVG());
    mapOverlay.appendChild(mapIcon);

    const mapText = createElement('span', 'property-detail__map-text', t('propertyDetail.clickToViewMap'));
    mapOverlay.appendChild(mapText);

    mapFrame.appendChild(mapOverlay);

    mapFrame.addEventListener('click', () => {
      const lat = property.location.coordinates?.lat;
      const lng = property.location.coordinates?.lng;
      if (lat && lng) {
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank', 'noopener,noreferrer');
      }
    });

    mapPlaceholder.appendChild(mapFrame);
  } else {
    const noMapMsg = createElement('div', 'property-detail__map-no-coords');
    noMapMsg.appendChild(createMapPinSVG());
    const noMapText = createElement('p', undefined, t('propertyDetail.mapUponRequest'));
    noMapMsg.appendChild(noMapText);
    mapPlaceholder.appendChild(noMapMsg);
  }

  mapSection.appendChild(mapPlaceholder);
  mainColumn.appendChild(mapSection);

  contentGrid.appendChild(mainColumn);

  // ─── Right Column (Sidebar) ──────────────────────────────────────────────
  const sidebar = createElement('aside', 'property-detail__sidebar');

  // Contact Card
  const contactCard = createElement('div', 'property-detail__contact-card');

  const contactTitle = createElement('h3', 'property-detail__contact-title', t('propertyDetail.interestedInProperty'));
  contactCard.appendChild(contactTitle);

  const contactDesc = createElement('p', 'property-detail__contact-desc', t('propertyDetail.contactForInfo'));
  contactCard.appendChild(contactDesc);

  // Quick contact buttons
  const quickContact = createElement('div', 'property-detail__quick-contact');

  const callBtn = createElement('a', 'btn btn--primary property-detail__contact-btn');
  callBtn.href = 'tel:+9647507922138';
  callBtn.appendChild(createPhoneSVG());
  const callBtnText = document.createTextNode(t('propertyDetail.callNow'));
  callBtn.appendChild(callBtnText);
  quickContact.appendChild(callBtn);

  const whatsappContact = createElement('a', 'btn btn--whatsapp property-detail__contact-btn');
  whatsappContact.href = `https://wa.me/9647507922138?text=${encodeURIComponent(`Hi, I'm interested in: ${property.title}`)}`;
  whatsappContact.target = '_blank';
  whatsappContact.rel = 'noopener noreferrer';
  whatsappContact.appendChild(createWhatsAppSVG());
  const whatsappText = document.createTextNode(t('propertyDetail.whatsApp'));
  whatsappContact.appendChild(whatsappText);
  quickContact.appendChild(whatsappContact);

  contactCard.appendChild(quickContact);

  // Inquiry Form
  const form = createElement('form', 'property-detail__inquiry-form');
  form.setAttribute('id', 'property-inquiry-form');

  const formTitle = createElement('h4', 'property-detail__form-title', t('propertyDetail.sendInquiry'));
  form.appendChild(formTitle);

  const hiddenProperty = createElement('input');
  hiddenProperty.type = 'hidden';
  hiddenProperty.name = 'property';
  hiddenProperty.value = property.title;
  form.appendChild(hiddenProperty);

  // Name field
  const nameGroup = createElement('div', 'property-detail__form-group');
  const nameLabel = createElement('label', 'property-detail__form-label', t('propertyDetail.yourName'));
  nameLabel.setAttribute('for', 'inquiry-name');
  nameGroup.appendChild(nameLabel);
  const nameInput = createElement('input', 'property-detail__form-input');
  nameInput.type = 'text';
  nameInput.id = 'inquiry-name';
  nameInput.name = 'name';
  nameInput.required = true;
  nameInput.placeholder = t('propertyDetail.enterYourName');
  nameGroup.appendChild(nameInput);
  form.appendChild(nameGroup);

  // Email field
  const emailGroup = createElement('div', 'property-detail__form-group');
  const emailLabel = createElement('label', 'property-detail__form-label', t('propertyDetail.emailAddress'));
  emailLabel.setAttribute('for', 'inquiry-email');
  emailGroup.appendChild(emailLabel);
  const emailInput = createElement('input', 'property-detail__form-input');
  emailInput.type = 'email';
  emailInput.id = 'inquiry-email';
  emailInput.name = 'email';
  emailInput.required = true;
  emailInput.placeholder = t('propertyDetail.enterYourEmail');
  emailGroup.appendChild(emailInput);
  form.appendChild(emailGroup);

  // Phone field
  const phoneGroup = createElement('div', 'property-detail__form-group');
  const phoneLabel = createElement('label', 'property-detail__form-label', t('propertyDetail.phoneNumber'));
  phoneLabel.setAttribute('for', 'inquiry-phone');
  phoneGroup.appendChild(phoneLabel);
  const phoneInput = createElement('input', 'property-detail__form-input');
  phoneInput.type = 'tel';
  phoneInput.id = 'inquiry-phone';
  phoneInput.name = 'phone';
  phoneInput.placeholder = t('propertyDetail.phonePlaceholder');
  phoneGroup.appendChild(phoneInput);
  form.appendChild(phoneGroup);

  // Message field
  const messageGroup = createElement('div', 'property-detail__form-group');
  const messageLabel = createElement('label', 'property-detail__form-label', t('propertyDetail.message'));
  messageLabel.setAttribute('for', 'inquiry-message');
  messageGroup.appendChild(messageLabel);
  const messageTextarea = createElement('textarea', 'property-detail__form-textarea');
  messageTextarea.id = 'inquiry-message';
  messageTextarea.name = 'message';
  messageTextarea.rows = 4;
  messageTextarea.placeholder = t('propertyDetail.messagePlaceholder');
  messageGroup.appendChild(messageTextarea);
  form.appendChild(messageGroup);

  // Submit button
  const submitBtn = createElement('button', 'btn btn--gold property-detail__form-submit');
  submitBtn.type = 'submit';
  submitBtn.textContent = t('propertyDetail.sendInquiry');
  form.appendChild(submitBtn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log('Inquiry submitted:', Object.fromEntries(formData));
    showToast(t('propertyDetail.thankYouMessage'));
    form.reset();
  });

  contactCard.appendChild(form);
  sidebar.appendChild(contactCard);

  // Agent Info
  if (property.agent) {
    const agentCard = createElement('div', 'property-detail__agent-card');
    const agentTitle = createElement('h4', 'property-detail__agent-title', t('propertyDetail.listedBy'));
    agentCard.appendChild(agentTitle);

    // Find full agent profile by matching name
    const fullAgent = fullAgents.find(a =>
      a.name.toLowerCase().includes(property.agent!.name.toLowerCase()) ||
      property.agent!.name.toLowerCase().includes(a.name.split(' ')[0].toLowerCase())
    );

    const agentInfo = createElement('div', 'property-detail__agent-info');

    const agentAvatar = createElement('div', 'property-detail__agent-avatar');
    if (property.agent.image) {
      const agentImg = createElement('img');
      agentImg.src = fullAgent?.image || property.agent.image;
      agentImg.alt = fullAgent?.name || property.agent.name;
      agentImg.loading = 'lazy';
      agentAvatar.appendChild(agentImg);
    } else {
      agentAvatar.textContent = property.agent.name.charAt(0);
    }
    agentInfo.appendChild(agentAvatar);

    const agentDetails = createElement('div', 'property-detail__agent-details');

    // Make agent name a link if full profile exists
    if (fullAgent) {
      const agentNameLink = createElement('a', 'property-detail__agent-name property-detail__agent-link');
      agentNameLink.href = `/agents/${fullAgent.slug}`;
      agentNameLink.setAttribute('data-route', '');
      agentNameLink.textContent = fullAgent.name;
      agentDetails.appendChild(agentNameLink);
    } else {
      const agentName = createElement('span', 'property-detail__agent-name', property.agent.name);
      agentDetails.appendChild(agentName);
    }

    const agentRole = createElement('span', 'property-detail__agent-role', fullAgent?.role || t('propertyDetail.realEstateAgent'));
    agentDetails.appendChild(agentRole);
    agentInfo.appendChild(agentDetails);

    agentCard.appendChild(agentInfo);

    // Add View Profile button if full agent exists
    if (fullAgent) {
      const viewProfileBtn = createElement('a', 'btn btn--ghost btn--sm property-detail__agent-btn', t('propertyDetail.viewProfile'));
      viewProfileBtn.href = `/agents/${fullAgent.slug}`;
      viewProfileBtn.setAttribute('data-route', '');
      agentCard.appendChild(viewProfileBtn);
    }

    sidebar.appendChild(agentCard);
  }

  // Mortgage Calculator Widget (for sale properties only)
  if (property.status === 'For Sale' && property.price > 0) {
    const mortgageWidget = createMortgageWidget(property.price);
    sidebar.appendChild(mortgageWidget);
  }

  contentGrid.appendChild(sidebar);
  mainContainer.appendChild(contentGrid);
  mainSection.appendChild(mainContainer);
  page.appendChild(mainSection);

  // ─── Similar Properties Section ──────────────────────────────────────────
  const similarProperties = getSimilarProperties(property, 4);

  if (similarProperties.length > 0) {
    const similarSection = createElement('section', 'property-detail__similar');
    similarSection.setAttribute('aria-label', 'Similar properties');
    const similarContainer = createElement('div', 'container');

    const similarHeader = createElement('div', 'property-detail__similar-header');
    const similarTitle = createElement('h2', 'property-detail__section-title', t('propertyDetail.similarProperties'));
    similarHeader.appendChild(similarTitle);

    const viewAllLink = createElement('a', 'property-detail__view-all', t('propertyDetail.viewAllProperties'));
    viewAllLink.href = '/properties';
    viewAllLink.setAttribute('data-route', '');
    similarHeader.appendChild(viewAllLink);

    similarContainer.appendChild(similarHeader);

    const similarGrid = createElement('div', 'property-detail__similar-grid');

    similarProperties.forEach(similarProp => {
      const card = createElement('a', 'property-detail__similar-card');
      card.href = `/properties/${generatePropertySlug(similarProp)}`;
      card.setAttribute('data-route', '');

      const cardImage = createElement('div', 'property-detail__similar-image');
      const img = createSEOImage({
        src: similarProp.images[0],
        alt: `${similarProp.title} - ${similarProp.type} in ${similarProp.location.district}`,
        loading: 'lazy',
        width: 400,
        height: 250
      });
      cardImage.appendChild(img);

      const cardBadge = createElement('span', `property-detail__similar-status property-detail__similar-status--${similarProp.status.toLowerCase().replace(/\s/g, '-')}`);
      cardBadge.textContent = similarProp.status;
      cardImage.appendChild(cardBadge);

      card.appendChild(cardImage);

      const cardContent = createElement('div', 'property-detail__similar-content');

      const cardTitle = createElement('h3', 'property-detail__similar-title', similarProp.title);
      cardContent.appendChild(cardTitle);

      const cardLocation = createElement('p', 'property-detail__similar-location');
      cardLocation.textContent = `${similarProp.location.district}, ${similarProp.location.city}`;
      cardContent.appendChild(cardLocation);

      const cardSpecs = createElement('div', 'property-detail__similar-specs');
      cardSpecs.textContent = `${similarProp.specs.beds} Beds | ${similarProp.specs.baths} Baths | ${similarProp.specs.sqm.toLocaleString()} m\u00B2`;
      cardContent.appendChild(cardSpecs);

      const cardPrice = createElement('span', 'property-detail__similar-price');
      cardPrice.textContent = getDisplayPrice(similarProp);
      cardContent.appendChild(cardPrice);

      card.appendChild(cardContent);
      similarGrid.appendChild(card);
    });

    similarContainer.appendChild(similarGrid);
    similarSection.appendChild(similarContainer);
    page.appendChild(similarSection);
  }

  fragment.appendChild(page);

  // Initialize interactions
  setTimeout(() => {
    initializeGallery(property);
    initializeAnimations();
  }, 0);

  return fragment;
}

// ─── Toast Notification ──────────────────────────────────────────────────────

function showToast(message: string): void {
  const existingToast = document.querySelector('.property-detail__toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = createElement('div', 'property-detail__toast');
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('property-detail__toast--visible');
  });

  setTimeout(() => {
    toast.classList.remove('property-detail__toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── Gallery Initialization ──────────────────────────────────────────────────

function initializeGallery(property: Property): void {
  const mainImage = document.getElementById('property-main-image') as HTMLImageElement;
  const thumbnails = document.querySelectorAll('.property-detail__thumb');
  const prevBtn = document.querySelector('.property-detail__gallery-btn--prev');
  const nextBtn = document.querySelector('.property-detail__gallery-btn--next');
  const fullscreenBtn = document.querySelector('.property-detail__fullscreen-btn');

  if (!mainImage || thumbnails.length === 0) return;

  let currentIndex = 0;

  const updateMainImage = (index: number) => {
    if (index < 0) index = property.images.length - 1;
    if (index >= property.images.length) index = 0;

    currentIndex = index;
    mainImage.src = property.images[index];
    mainImage.alt = `${property.title} - Image ${index + 1} of ${property.images.length}`;

    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
      thumb.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
  };

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => updateMainImage(index));
  });

  prevBtn?.addEventListener('click', () => updateMainImage(currentIndex - 1));
  nextBtn?.addEventListener('click', () => updateMainImage(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') updateMainImage(currentIndex - 1);
    if (e.key === 'ArrowRight') updateMainImage(currentIndex + 1);
  });

  fullscreenBtn?.addEventListener('click', () => {
    openFullscreenGallery(property, currentIndex);
  });
}

// ─── Fullscreen Gallery ──────────────────────────────────────────────────────

function openFullscreenGallery(property: Property, startIndex: number): void {
  const overlay = createElement('div', 'property-detail__fullscreen-overlay');

  const closeBtn = createCloseButton('property-detail__fullscreen-close');
  closeBtn.addEventListener('click', () => overlay.remove());
  overlay.appendChild(closeBtn);

  const imageContainer = createElement('div', 'property-detail__fullscreen-container');

  const fullscreenImage = createElement('img', 'property-detail__fullscreen-image');
  fullscreenImage.src = property.images[startIndex];
  fullscreenImage.alt = `${property.title} - Image ${startIndex + 1}`;
  imageContainer.appendChild(fullscreenImage);

  let currentIndex = startIndex;

  const counter = createElement('div', 'property-detail__fullscreen-counter');
  counter.textContent = `${startIndex + 1} / ${property.images.length}`;

  const updateImage = (index: number) => {
    if (index < 0) index = property.images.length - 1;
    if (index >= property.images.length) index = 0;
    currentIndex = index;
    fullscreenImage.src = property.images[index];
    fullscreenImage.alt = `${property.title} - Image ${index + 1}`;
    counter.textContent = `${index + 1} / ${property.images.length}`;
  };

  const prevBtn = createElement('button', 'property-detail__fullscreen-nav property-detail__fullscreen-nav--prev');
  prevBtn.appendChild(createChevronSVG('left'));
  prevBtn.addEventListener('click', () => updateImage(currentIndex - 1));
  imageContainer.appendChild(prevBtn);

  const nextBtn = createElement('button', 'property-detail__fullscreen-nav property-detail__fullscreen-nav--next');
  nextBtn.appendChild(createChevronSVG('right'));
  nextBtn.addEventListener('click', () => updateImage(currentIndex + 1));
  imageContainer.appendChild(nextBtn);

  imageContainer.appendChild(counter);

  overlay.appendChild(imageContainer);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') overlay.remove();
    if (e.key === 'ArrowLeft') updateImage(currentIndex - 1);
    if (e.key === 'ArrowRight') updateImage(currentIndex + 1);
  };
  document.addEventListener('keydown', handleKeydown);

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const observer = new MutationObserver(() => {
    if (!document.body.contains(overlay)) {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeydown);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true });
}

// ─── Animations ──────────────────────────────────────────────────────────────

function initializeAnimations(): void {
  const sections = document.querySelectorAll('.property-detail__specs, .property-detail__description, .property-detail__features, .property-detail__map');

  sections.forEach(section => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  const cards = document.querySelectorAll('.property-detail__similar-card');
  cards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// ─── SEO Setup ───────────────────────────────────────────────────────────────

export function setupPropertyDetailSEO(slug: string): void {
  const property = getPropertyBySlug(slug);

  if (!property) {
    document.title = `${t('propertyDetail.propertyNotFound')} | Real House`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'The requested property could not be found. Browse our collection of properties in Erbil.');
    }
    return;
  }

  const propertySlug = generatePropertySlug(property);
  const canonicalUrl = `https://realhouseiq.com/properties/${propertySlug}`;

  document.title = `${property.title} | ${property.type} in ${property.location.district} | Real House`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content',
      `${property.type} for ${property.status} in ${property.location.district}, ${property.location.city}. ${property.specs.beds} bedrooms, ${property.specs.baths} bathrooms, ${property.specs.sqm} sqm. ${getDisplayPrice(property)}. Contact Real House for viewing.`
    );
  }

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', `${property.title} | ${property.type} for ${property.status}`);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', `${property.specs.beds} beds, ${property.specs.baths} baths, ${property.specs.sqm} sqm in ${property.location.district}. ${getDisplayPrice(property)}`);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', canonicalUrl);
  }

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && property.images[0]) {
    ogImage.setAttribute('content', property.images[0]);
  }

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', `${property.title} | ${property.type} for ${property.status}`);
  }

  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) {
    twitterDesc.setAttribute('content', `${property.specs.beds} beds, ${property.specs.baths} baths in ${property.location.district}. ${getDisplayPrice(property)}`);
  }

  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage && property.images[0]) {
    twitterImage.setAttribute('content', property.images[0]);
  }
}
