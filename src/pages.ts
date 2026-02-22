// ═══════════════════════════════════════════════════════════════════════════
// Page Renderers for Real House
// Using Safe DOM Methods
// ═══════════════════════════════════════════════════════════════════════════

import { properties, featuredProperties, getDisplayPrice, getPropertyById, formatPrice, type Property, type PropertyFeature, PROPERTY_FEATURES } from './data/properties';
import { testimonials } from './data/testimonials';
import { agents, trustBadges, enhancedStats, featuredInMedia, partnerLogos } from './data/agents';
import { projects, getProjectById, formatPriceRange, type Project, type ProjectStatus } from './data/projects';
import { submitInquiry } from './services/api';
import { updateAriaCurrentPage, announcePageChange, createTimeElement, createFigure } from './utils/semantic-html';
import { isFavorite, toggleFavorite, getFavorites, clearFavorites, updateFavoriteButton, updateFavoritesBadge } from './utils/favorites';
import { createCompareButton, initComparisonBar, updateComparisonBar } from './comparison';
import { getAmenitiesForDistrict, getCategoryIcon, getCategoryLabel, type Amenity, type DistrictAmenities } from './data/amenities';
import { openAppointmentScheduler } from './components/appointment-scheduler';
import { openVirtualTourModal, injectVirtualTourStyles } from './components/virtual-tour-modal';
import { openFloorPlanModal, injectFloorPlanStyles } from './components/floor-plan-modal';
import { initPropertiesMap, updateMapMarkers, initPropertyDetailMap, getSavedViewPreference, saveViewPreference, type ViewMode } from './components/property-map';
import { createPropertyShareButtons, createProjectShareButtons, createFloatingShareButton } from './components/share-buttons';
import {
  generatePropertyAltText,
  generatePropertyTitle,
  generateProjectAltText,
  generateProjectTitle,
  generateSrcSet,
  generateSizes,
  createSEOImage,
  updateImageMetaTags,
  generatePropertyImageSchema,
  addPropertyImageSchemaToPage,
  IMAGE_DIMENSIONS
} from './utils/image-seo';
export { renderComparisonPage } from './comparison';
import { renderComprehensiveFAQPage } from './pages/faq';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  getPropertyDetailBreadcrumbs,
  getPropertiesBreadcrumbs,
  getContactBreadcrumbs,
  getFavoritesBreadcrumbs,
  getRelatedProperties,
  createRelatedPropertiesSection,
  createPropertyCrossLinks,
  createInternalCTA,
  createLocationLinks,
  createPopularPropertiesWidget,
  createPopularProjectsWidget,
  createRecentBlogWidget,
  type BreadcrumbItem
} from './components/internal-linking';

// ─── Mortgage Calculator Interface ─────────────────────────────────────────
interface MortgageCalculation {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  principalPayments: number[];
  interestPayments: number[];
}

// ─── Mortgage Calculator Logic ─────────────────────────────────────────────
function calculateMortgage(
  principal: number,
  annualRate: number,
  termYears: number
): MortgageCalculation {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;

  // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numPayments;
  } else {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                     (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;

  // Calculate amortization schedule (simplified - first 5 years)
  const principalPayments: number[] = [];
  const interestPayments: number[] = [];
  let balance = principal;

  for (let year = 1; year <= Math.min(termYears, 5); year++) {
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    for (let month = 1; month <= 12; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      yearlyInterest += interestPayment;
      yearlyPrincipal += principalPayment;
      balance -= principalPayment;
    }

    principalPayments.push(yearlyPrincipal);
    interestPayments.push(yearlyInterest);
  }

  return {
    monthlyPayment,
    totalInterest,
    totalPayment,
    principalPayments,
    interestPayments
  };
}

// ─── Filter State Interface ─────────────────────────────────────────────────
interface FilterState {
  type: string;
  priceRange: string;
  minBeds: number;
  searchQuery: string;
  status: string;
  // Advanced filters
  minArea: number;
  maxArea: number;
  badges: string[];
  minYearBuilt: number;
  maxYearBuilt: number;
  district: string;
  // New advanced filters
  minPrice: number;
  maxPrice: number;
  furnishing: string;
  propertyFeatures: string[];
  viewType: string;
  minFloors: number;
  maxFloors: number;
}

// Current filter state
let currentFilterState: FilterState = {
  type: 'All',
  priceRange: 'All',
  minBeds: 0,
  searchQuery: '',
  status: 'All',
  // Advanced filters
  minArea: 0,
  maxArea: 1000,
  badges: [],
  minYearBuilt: 2000,
  maxYearBuilt: new Date().getFullYear(),
  district: 'All',
  // New advanced filters
  minPrice: 0,
  maxPrice: 10000000,
  furnishing: 'All',
  propertyFeatures: [],
  viewType: 'All',
  minFloors: 0,
  maxFloors: 20
};

// Store scroll position for properties page
let propertiesScrollPosition = 0;

// ─── URL Filter Functions ────────────────────────────────────────────────────
export function parseFiltersFromURL(): FilterState {
  const params = new URLSearchParams(window.location.search);
  const currentYear = new Date().getFullYear();

  return {
    type: params.get('type') || 'All',
    priceRange: params.get('priceRange') || 'All',
    minBeds: parseInt(params.get('minBeds') || '0', 10),
    searchQuery: params.get('q') || '',
    status: params.get('status') || 'All',
    // Advanced filters
    minArea: parseInt(params.get('minArea') || '0', 10),
    maxArea: parseInt(params.get('maxArea') || '1000', 10),
    badges: params.get('badges') ? params.get('badges')!.split(',') : [],
    minYearBuilt: parseInt(params.get('minYear') || '2000', 10),
    maxYearBuilt: parseInt(params.get('maxYear') || currentYear.toString(), 10),
    district: params.get('district') || 'All',
    // New advanced filters
    minPrice: parseInt(params.get('minPrice') || '0', 10),
    maxPrice: parseInt(params.get('maxPrice') || '10000000', 10),
    furnishing: params.get('furnishing') || 'All',
    propertyFeatures: params.get('features') ? params.get('features')!.split(',') : [],
    viewType: params.get('viewType') || 'All',
    minFloors: parseInt(params.get('minFloors') || '0', 10),
    maxFloors: parseInt(params.get('maxFloors') || '20', 10)
  };
}

function updateURLWithFilters(state: FilterState, replace: boolean = false): void {
  const params = new URLSearchParams();
  const currentYear = new Date().getFullYear();

  if (state.type !== 'All') params.set('type', state.type);
  if (state.priceRange !== 'All') params.set('priceRange', state.priceRange);
  if (state.minBeds > 0) params.set('minBeds', state.minBeds.toString());
  if (state.searchQuery.trim()) params.set('q', state.searchQuery.trim());
  if (state.status !== 'All') params.set('status', state.status);
  // Advanced filters
  if (state.minArea > 0) params.set('minArea', state.minArea.toString());
  if (state.maxArea < 1000) params.set('maxArea', state.maxArea.toString());
  if (state.badges.length > 0) params.set('badges', state.badges.join(','));
  if (state.minYearBuilt > 2000) params.set('minYear', state.minYearBuilt.toString());
  if (state.maxYearBuilt < currentYear) params.set('maxYear', state.maxYearBuilt.toString());
  if (state.district !== 'All') params.set('district', state.district);
  // New advanced filters
  if (state.minPrice > 0) params.set('minPrice', state.minPrice.toString());
  if (state.maxPrice < 10000000) params.set('maxPrice', state.maxPrice.toString());
  if (state.furnishing !== 'All') params.set('furnishing', state.furnishing);
  if (state.propertyFeatures.length > 0) params.set('features', state.propertyFeatures.join(','));
  if (state.viewType !== 'All') params.set('viewType', state.viewType);
  if (state.minFloors > 0) params.set('minFloors', state.minFloors.toString());
  if (state.maxFloors < 20) params.set('maxFloors', state.maxFloors.toString());

  const queryString = params.toString();
  const newURL = queryString ? `/properties?${queryString}` : '/properties';

  if (replace) {
    history.replaceState({ scroll: propertiesScrollPosition }, '', newURL);
  } else {
    history.pushState({ scroll: propertiesScrollPosition }, '', newURL);
  }
}

function hasActiveFilters(state: FilterState): boolean {
  const currentYear = new Date().getFullYear();
  return state.type !== 'All' ||
         state.priceRange !== 'All' ||
         state.minBeds > 0 ||
         state.searchQuery.trim() !== '' ||
         state.status !== 'All' ||
         state.minArea > 0 ||
         state.maxArea < 1000 ||
         state.badges.length > 0 ||
         state.minYearBuilt > 2000 ||
         state.maxYearBuilt < currentYear ||
         state.district !== 'All' ||
         state.minPrice > 0 ||
         state.maxPrice < 10000000 ||
         state.furnishing !== 'All' ||
         state.propertyFeatures.length > 0 ||
         state.viewType !== 'All' ||
         state.minFloors > 0 ||
         state.maxFloors < 20;
}

function hasAdvancedFiltersActive(state: FilterState): boolean {
  const currentYear = new Date().getFullYear();
  return state.minArea > 0 ||
         state.maxArea < 1000 ||
         state.badges.length > 0 ||
         state.minYearBuilt > 2000 ||
         state.maxYearBuilt < currentYear ||
         state.district !== 'All' ||
         state.minPrice > 0 ||
         state.maxPrice < 10000000 ||
         state.furnishing !== 'All' ||
         state.propertyFeatures.length > 0 ||
         state.viewType !== 'All' ||
         state.minFloors > 0 ||
         state.maxFloors < 20;
}

function countActiveAdvancedFilters(state: FilterState): number {
  const currentYear = new Date().getFullYear();
  let count = 0;
  if (state.minArea > 0 || state.maxArea < 1000) count++;
  if (state.badges.length > 0) count++;
  if (state.minYearBuilt > 2000 || state.maxYearBuilt < currentYear) count++;
  if (state.district !== 'All') count++;
  if (state.minPrice > 0 || state.maxPrice < 10000000) count++;
  if (state.furnishing !== 'All') count++;
  if (state.propertyFeatures.length > 0) count++;
  if (state.viewType !== 'All') count++;
  if (state.minFloors > 0 || state.maxFloors < 20) count++;
  return count;
}

function formatPriceForBreadcrumb(priceRange: string): string {
  if (priceRange === 'All') return '';
  return priceRange;
}

function formatBedsForBreadcrumb(minBeds: number): string {
  if (minBeds === 0) return '';
  return `${minBeds}+ Beds`;
}

// Save scroll position when navigating away
export function savePropertiesScrollPosition(): void {
  propertiesScrollPosition = window.scrollY;
}

// Get saved scroll position
export function getPropertiesScrollPosition(): number {
  return propertiesScrollPosition;
}

// Reset scroll position
export function resetPropertiesScrollPosition(): void {
  propertiesScrollPosition = 0;
}

// ─── Filter Function ────────────────────────────────────────────────────────
function filterProperties(props: Property[], state: FilterState): Property[] {
  return props.filter(property => {
    // Type filter
    if (state.type !== 'All' && property.type !== state.type) {
      return false;
    }

    // Price range filter (updated for Erbil market)
    if (state.priceRange !== 'All') {
      const price = property.price;
      switch (state.priceRange) {
        case 'Under $200K':
          if (price >= 200000) return false;
          break;
        case '$200K-$400K':
          if (price < 200000 || price >= 400000) return false;
          break;
        case '$400K-$700K':
          if (price < 400000 || price >= 700000) return false;
          break;
        case '$700K+':
          if (price < 700000) return false;
          break;
      }
    }

    // Beds filter
    if (state.minBeds > 0 && property.specs.beds < state.minBeds) {
      return false;
    }

    // Search query filter
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      const searchableText = [
        property.title,
        property.type,
        property.location.city,
        property.location.district,
        property.location.address,
        property.description,
        ...property.features
      ].join(' ').toLowerCase();

      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Status filter
    if (state.status !== 'All' && property.status !== state.status) {
      return false;
    }

    // ─── Advanced Filters ─────────────────────────────────────────────────────

    // Area/sqm filter
    const sqm = property.specs.sqm;
    if (state.minArea > 0 && sqm < state.minArea) {
      return false;
    }
    if (state.maxArea < 1000 && sqm > state.maxArea) {
      return false;
    }

    // Badges filter (match any selected badge)
    if (state.badges.length > 0) {
      const hasMatchingBadge = state.badges.some(badge =>
        property.badges.includes(badge as any)
      );
      if (!hasMatchingBadge) {
        return false;
      }
    }

    // Year built filter
    const yearBuilt = property.specs.yearBuilt;
    if (yearBuilt) {
      if (state.minYearBuilt > 2000 && yearBuilt < state.minYearBuilt) {
        return false;
      }
      const currentYear = new Date().getFullYear();
      if (state.maxYearBuilt < currentYear && yearBuilt > state.maxYearBuilt) {
        return false;
      }
    }

    // District filter
    if (state.district !== 'All' && property.location.district !== state.district) {
      return false;
    }

    // ─── New Advanced Filters ─────────────────────────────────────────────────

    // Price slider filter (min/max numeric values)
    const price = property.price;
    if (state.minPrice > 0 && price < state.minPrice) {
      return false;
    }
    if (state.maxPrice < 10000000 && price > state.maxPrice) {
      return false;
    }

    // Furnishing status filter
    if (state.furnishing !== 'All') {
      // Check both the furnishing field and features array for furnishing info
      const hasFurnishing = property.furnishing === state.furnishing ||
        property.features.some(f => f.toLowerCase().includes(state.furnishing.toLowerCase()));
      if (!hasFurnishing) {
        return false;
      }
    }

    // Property features filter (must have ALL selected features)
    if (state.propertyFeatures.length > 0) {
      const propertyFeaturesList = property.propertyFeatures || [];
      const allFeaturesText = [...property.features, ...propertyFeaturesList].join(' ').toLowerCase();
      const hasAllFeatures = state.propertyFeatures.every(feature => {
        // Check in propertyFeatures array first, then in features text
        return propertyFeaturesList.includes(feature as any) ||
               allFeaturesText.includes(feature.toLowerCase());
      });
      if (!hasAllFeatures) {
        return false;
      }
    }

    // View type filter
    if (state.viewType !== 'All') {
      const hasView = property.viewType === state.viewType ||
        property.features.some(f => f.toLowerCase().includes(state.viewType.toLowerCase().replace(' view', '')));
      if (!hasView) {
        return false;
      }
    }

    // Number of floors filter (for villas/buildings)
    const numberOfFloors = property.specs.numberOfFloors || property.specs.totalFloors;
    if (numberOfFloors) {
      if (state.minFloors > 0 && numberOfFloors < state.minFloors) {
        return false;
      }
      if (state.maxFloors < 20 && numberOfFloors > state.maxFloors) {
        return false;
      }
    }

    return true;
  });
}

// ─── Helper Functions ─────────────────────────────────────────────────────
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

// Creates a decorative SVG icon (aria-hidden for screen readers)
function createSVGUse(iconId: string, ariaLabel?: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  if (ariaLabel) {
    svg.setAttribute('aria-label', ariaLabel);
    svg.setAttribute('role', 'img');
  } else {
    // Decorative icon - hide from screen readers
    svg.setAttribute('aria-hidden', 'true');
  }
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

// ─── Screen Reader Announcements ───────────────────────────────────────────
function announceToScreenReader(message: string): void {
  const announcer = document.getElementById('sr-announcements');
  if (announcer) {
    announcer.textContent = message;
    // Clear after announcement to allow repeated messages
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  }
}

// ─── Property Card Component ──────────────────────────────────────────────
function createPropertyCard(property: Property): HTMLElement {
  // Use article element for self-contained property listing
  const card = createElement('article', 'property-card');
  card.setAttribute('data-id', property.id);
  // Add structured data attributes for SEO
  card.setAttribute('itemscope', '');
  card.setAttribute('itemtype', 'https://schema.org/RealEstateListing');

  // Media section with figure element for semantic markup
  const media = createElement('figure', 'property-card__media');

  // SEO-Optimized Image with srcset, sizes, dimensions
  const img = createSEOImage({
    src: property.images[0],
    alt: generatePropertyAltText(property, 0, 'card'),
    title: generatePropertyTitle(property),
    className: 'property-card__image',
    loading: 'lazy',
    width: IMAGE_DIMENSIONS.card.width,
    height: IMAGE_DIMENSIONS.card.height,
    srcset: generateSrcSet(property.images[0], [400, 600, 800]),
    sizes: generateSizes('card'),
  });
  media.appendChild(img);

  const overlay = createElement('div', 'property-card__overlay');
  overlay.setAttribute('aria-hidden', 'true'); // Decorative element
  media.appendChild(overlay);

  // Badges
  if (property.isFeatured || property.isNew) {
    const badge = createElement('div', 'property-card__badge');
    if (property.isFeatured) {
      const tag = createElement('span', 'property-card__tag', 'Featured');
      badge.appendChild(tag);
    }
    if (property.isNew) {
      const tag = createElement('span', 'property-card__tag property-card__tag--new', 'New');
      badge.appendChild(tag);
    }
    media.appendChild(badge);
  }

  // Favorite button
  const favorite = createElement('button', 'property-card__favorite');
  const isPropertyFavorite = isFavorite(property.id);
  favorite.setAttribute('aria-label', isPropertyFavorite ? 'Remove from favorites' : 'Add to favorites');
  if (isPropertyFavorite) {
    favorite.classList.add('active');
  }

  // Create heart icons (outline and filled)
  const heartOutline = createSVGUse('icon-heart-outline');
  heartOutline.classList.add('heart-outline');
  const heartFilled = createSVGUse('icon-heart');
  heartFilled.classList.add('heart-filled');
  favorite.appendChild(heartOutline);
  favorite.appendChild(heartFilled);

  // Toggle favorite on click
  favorite.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = toggleFavorite(property.id);
    updateFavoriteButton(favorite, newState);

    // Add animation class
    favorite.classList.add('animate');
    setTimeout(() => {
      favorite.classList.remove('animate');
    }, 300);
  });

  media.appendChild(favorite);

  // Compare button
  const compareBtn = createCompareButton(property.id);
  media.appendChild(compareBtn);

  card.appendChild(media);

  // Content section
  const content = createElement('div', 'property-card__content');

  const type = createElement('div', 'property-card__type', property.type);
  type.setAttribute('itemprop', 'additionalType');
  content.appendChild(type);

  const title = createElement('h3', 'property-card__title', property.title);
  title.setAttribute('itemprop', 'name');
  content.appendChild(title);

  const location = createElement('p', 'property-card__location');
  location.setAttribute('itemprop', 'address');
  const locationIcon = createSVGUse('icon-location');
  locationIcon.setAttribute('aria-hidden', 'true');
  location.appendChild(locationIcon);
  location.appendChild(document.createTextNode(`${property.location.district}, ${property.location.city}`));
  content.appendChild(location);

  // Specs
  const specs = createElement('div', 'property-card__specs');

  const bedSpec = createElement('span', 'property-card__spec');
  bedSpec.appendChild(createSVGUse('icon-bed'));
  bedSpec.appendChild(document.createTextNode(`${property.specs.beds} Beds`));
  specs.appendChild(bedSpec);

  const bathSpec = createElement('span', 'property-card__spec');
  bathSpec.appendChild(createSVGUse('icon-bath'));
  bathSpec.appendChild(document.createTextNode(`${property.specs.baths} Baths`));
  specs.appendChild(bathSpec);

  const areaSpec = createElement('span', 'property-card__spec');
  areaSpec.appendChild(createSVGUse('icon-area'));
  areaSpec.appendChild(document.createTextNode(`${property.specs.sqm.toLocaleString()} m²`));
  specs.appendChild(areaSpec);

  content.appendChild(specs);

  // Footer
  const footer = createElement('footer', 'property-card__footer');

  const price = createElement('span', 'property-card__price', getDisplayPrice(property));
  price.setAttribute('itemprop', 'price');
  footer.appendChild(price);

  const viewBtn = createElement('a', 'btn btn--ghost btn--sm', 'View property details');
  viewBtn.href = `/properties/${property.id}`;
  viewBtn.setAttribute('data-route', '');
  viewBtn.setAttribute('itemprop', 'url');
  viewBtn.setAttribute('aria-label', `View details for ${property.title}`);
  footer.appendChild(viewBtn);

  content.appendChild(footer);
  card.appendChild(content);

  return card;
}

// ─── Home Page ────────────────────────────────────────────────────────────
export function renderHomePage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Hero Section with proper semantic structure
  const hero = createElement('section', 'hero');
  hero.id = 'hero';
  hero.setAttribute('aria-label', 'Welcome to Real House - Luxury Real Estate');

  // YouTube Video Background
  const videoBackground = createElement('div', 'hero__video-background');
  videoBackground.setAttribute('aria-hidden', 'true'); // Decorative video
  const videoIframe = document.createElement('iframe');
  videoIframe.src = 'https://www.youtube.com/embed/N2nROpXXG88?autoplay=1&mute=1&loop=1&playlist=N2nROpXXG88&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=0&end=60';
  videoIframe.className = 'hero__video-iframe';
  videoIframe.setAttribute('frameborder', '0');
  videoIframe.setAttribute('allow', 'autoplay; encrypted-media');
  videoIframe.setAttribute('allowfullscreen', '');
  videoIframe.setAttribute('loading', 'lazy');
  videoIframe.setAttribute('title', 'Real House promotional video background');
  videoBackground.appendChild(videoIframe);
  hero.appendChild(videoBackground);

  // Video Overlay for text readability
  const videoOverlay = createElement('div', 'hero__video-overlay');
  videoOverlay.setAttribute('aria-hidden', 'true');
  hero.appendChild(videoOverlay);

  const heroContent = createElement('div', 'hero__content container');

  // Headline - Primary keyword in H1 (only one h1 per page)
  const headline = createElement('h1', 'hero__headline', 'Real Estate Erbil — Houses for Sale Erbil & Apartments Erbil Iraq');
  heroContent.appendChild(headline);

  // Subline with LSI keywords
  const subline = createElement('p', 'hero__subline', 'The most trusted property Erbil agency for luxury homes Kurdistan, apartments Erbil Iraq, villas Erbil Iraq, and penthouse Erbil. Best real estate agent Erbil helping you buy house Erbil in the Erbil property market.');
  heroContent.appendChild(subline);

  // CTA
  const cta = createElement('div', 'hero__cta');
  const primaryBtn = createElement('a', 'btn btn--primary btn--large', 'Houses for Sale Erbil');
  primaryBtn.href = '/properties';
  primaryBtn.setAttribute('data-route', '');
  cta.appendChild(primaryBtn);
  const consultationBtn = createElement('a', 'btn btn--ghost btn--large', 'Best Real Estate Agent Erbil');
  consultationBtn.href = '/contact';
  consultationBtn.setAttribute('data-route', '');
  cta.appendChild(consultationBtn);
  heroContent.appendChild(cta);

  hero.appendChild(heroContent);
  fragment.appendChild(hero);

  // Trust Badges Section
  const trustSection = createElement('section', 'trust-badges');
  trustSection.setAttribute('aria-label', 'Why choose Real House');
  const trustContainer = createElement('div', 'container');
  const trustGrid = createElement('div', 'trust-badges__grid');
  trustGrid.setAttribute('role', 'list');

  trustBadges.forEach(badge => {
    const badgeEl = createElement('div', 'trust-badges__item');
    badgeEl.setAttribute('role', 'listitem');
    const iconWrapper = createElement('div', 'trust-badges__icon');
    iconWrapper.setAttribute('aria-hidden', 'true');
    iconWrapper.appendChild(createSVGUse(badge.icon));
    badgeEl.appendChild(iconWrapper);
    const badgeContent = createElement('div', 'trust-badges__content');
    const badgeTitle = createElement('span', 'trust-badges__title', badge.title);
    const badgeDesc = createElement('span', 'trust-badges__desc', badge.description);
    badgeContent.appendChild(badgeTitle);
    badgeContent.appendChild(badgeDesc);
    badgeEl.appendChild(badgeContent);
    trustGrid.appendChild(badgeEl);
  });

  trustContainer.appendChild(trustGrid);
  trustSection.appendChild(trustContainer);
  fragment.appendChild(trustSection);

  // Stats Section
  const stats = createElement('section', 'stats');
  stats.setAttribute('aria-label', 'Our achievements in numbers');
  const statsContainer = createElement('div', 'container');
  const statsGrid = createElement('div', 'stats__grid');
  statsGrid.setAttribute('role', 'list');

  const statsData = [
    { number: 2400, suffix: '+', label: 'Properties Sold' },
    { number: 98, suffix: '%', label: 'Client Satisfaction' },
    { number: 24, suffix: '+', label: 'Years Experience' },
    { number: 15, suffix: '', label: 'Global Markets' }
  ];

  statsData.forEach(stat => {
    const item = createElement('div', 'stats__item');
    item.setAttribute('role', 'listitem');
    const num = createElement('span', 'stats__number', '0');
    num.setAttribute('data-target', stat.number.toString());
    num.setAttribute('data-suffix', stat.suffix);
    const label = createElement('span', 'stats__label', stat.label);
    item.appendChild(num);
    item.appendChild(label);
    statsGrid.appendChild(item);
  });

  statsContainer.appendChild(statsGrid);
  stats.appendChild(statsContainer);
  fragment.appendChild(stats);

  // Featured Properties Section
  const featured = createElement('section', 'featured');
  featured.setAttribute('aria-labelledby', 'featured-title');
  const featuredContainer = createElement('div', 'container');

  const featuredHeader = createElement('header', 'featured__header');
  const featuredTitle = createElement('h2', 'featured__title');
  featuredTitle.id = 'featured-title';
  featuredTitle.textContent = 'Featured Property Erbil — ';
  const em = createElement('em', undefined, 'Luxury Homes Kurdistan');
  featuredTitle.appendChild(em);
  featuredHeader.appendChild(featuredTitle);

  const viewAllLink = createElement('a', 'featured__link', 'View all houses for sale Erbil');
  viewAllLink.href = '/properties';
  viewAllLink.setAttribute('data-route', '');
  viewAllLink.appendChild(createSVGUse('icon-arrow-right'));
  featuredHeader.appendChild(viewAllLink);

  featuredContainer.appendChild(featuredHeader);

  const featuredGrid = createElement('div', 'featured__grid');

  // Initial display: show first 3 featured properties
  const initialCount = 3;
  let displayedCount = initialCount;

  featuredProperties.slice(0, initialCount).forEach(property => {
    featuredGrid.appendChild(createPropertyCard(property));
  });
  featuredContainer.appendChild(featuredGrid);

  // Load More button (only show if there are more properties)
  if (featuredProperties.length > initialCount) {
    const loadMoreContainer = createElement('div', 'featured__load-more');
    const loadMoreBtn = createElement('button', 'btn btn--outline btn--lg', 'Load More Properties');
    loadMoreBtn.setAttribute('data-load-more', '');

    loadMoreBtn.addEventListener('click', () => {
      const nextBatch = featuredProperties.slice(displayedCount, displayedCount + 3);
      nextBatch.forEach(property => {
        const card = createPropertyCard(property);
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        featuredGrid.appendChild(card);
        // Animate in
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
      displayedCount += nextBatch.length;

      // Hide button if no more properties
      if (displayedCount >= featuredProperties.length) {
        loadMoreBtn.style.display = 'none';
      }
    });

    loadMoreContainer.appendChild(loadMoreBtn);
    featuredContainer.appendChild(loadMoreContainer);
  }

  featured.appendChild(featuredContainer);
  fragment.appendChild(featured);

  // Marquee Banner
  const marquee = createElement('div', 'marquee-banner marquee-banner--large');
  marquee.setAttribute('data-scroll-marquee', '');
  marquee.setAttribute('data-marquee-text', 'Luxury Living • Premium Properties • Exclusive Locations • Award Winning');
  fragment.appendChild(marquee);

  // Horizontal Showcase Section
  const showcase = createElement('section', 'showcase');
  showcase.id = 'showcase';

  const showcaseProgress = createElement('div', 'showcase__progress');
  const progressBar = createElement('div', 'showcase__progress-bar');
  showcaseProgress.appendChild(progressBar);
  showcase.appendChild(showcaseProgress);

  const showcaseWrapper = createElement('div', 'showcase__wrapper');

  // Showcase panels with featured properties
  const showcaseProperties = featuredProperties.slice(0, 4);
  showcaseProperties.forEach((property, index) => {
    const panel = createElement('div', 'showcase-panel');
    panel.setAttribute('data-panel', (index + 1).toString());

    // Background with SEO-optimized image
    const bg = createElement('div', 'showcase-panel__bg');
    const bgImg = createSEOImage({
      src: property.images[0],
      alt: generatePropertyAltText(property, 0, 'detail'),
      title: generatePropertyTitle(property),
      loading: index === 0 ? 'eager' : 'lazy',
      width: 1200,
      height: 800,
      srcset: generateSrcSet(property.images[0], [800, 1200, 1600]),
      sizes: '100vw',
      fetchPriority: index === 0 ? 'high' : 'auto',
    });
    bg.appendChild(bgImg);
    panel.appendChild(bg);

    // Overlay
    const overlay = createElement('div', 'showcase-panel__overlay');
    panel.appendChild(overlay);

    // Content
    const content = createElement('div', 'showcase-panel__content');

    const eyebrow = createElement('div', 'showcase-panel__eyebrow');
    const eyebrowSpan = createElement('span', undefined, property.type.toUpperCase());
    eyebrow.appendChild(eyebrowSpan);
    content.appendChild(eyebrow);

    const title = createElement('h2', 'showcase-panel__title');
    const titleParts = property.title.split(' ');
    title.textContent = titleParts.slice(0, -1).join(' ') + ' ';
    const titleEm = createElement('em', undefined, titleParts[titleParts.length - 1]);
    title.appendChild(titleEm);
    content.appendChild(title);

    const subtitle = createElement('p', 'showcase-panel__subtitle', property.description);
    content.appendChild(subtitle);

    const price = createElement('div', 'showcase-panel__price', getDisplayPrice(property));
    content.appendChild(price);

    const specs = createElement('div', 'showcase-panel__specs');
    const specData = [
      { icon: 'icon-bed', value: `${property.specs.beds} Beds` },
      { icon: 'icon-bath', value: `${property.specs.baths} Baths` },
      { icon: 'icon-area', value: `${property.specs.sqm.toLocaleString()} m²` }
    ];
    specData.forEach(spec => {
      const specEl = createElement('div', 'showcase-panel__spec');
      specEl.appendChild(createSVGUse(spec.icon));
      specEl.appendChild(document.createTextNode(spec.value));
      specs.appendChild(specEl);
    });
    content.appendChild(specs);

    const cta = createElement('div', 'showcase-panel__cta');
    const ctaBtn = createElement('a', 'btn btn--primary', 'View Property');
    ctaBtn.href = `/properties/${property.id}`;
    ctaBtn.setAttribute('data-route', '');
    ctaBtn.setAttribute('data-magnetic', '');
    cta.appendChild(ctaBtn);
    content.appendChild(cta);

    panel.appendChild(content);

    // Panel number
    const number = createElement('div', 'showcase-panel__number', `0${index + 1}`);
    panel.appendChild(number);

    showcaseWrapper.appendChild(panel);
  });

  showcase.appendChild(showcaseWrapper);
  fragment.appendChild(showcase);

  // Second Marquee (gold)
  const marquee2 = createElement('div', 'marquee-banner marquee-banner--gold');
  marquee2.setAttribute('data-marquee', '');
  marquee2.setAttribute('data-marquee-text', 'Real House — Where Dreams Find Address — Exceptional Properties — Unmatched Service');
  marquee2.setAttribute('data-marquee-speed', '60');
  fragment.appendChild(marquee2);

  // Process Section
  const process = createElement('section', 'process');
  const processContainer = createElement('div', 'container');

  const processHeader = createElement('div', 'process__header');
  const processTitle = createElement('h2', 'process__title');
  processTitle.textContent = 'The ';
  const emProcess = createElement('em', undefined, 'Real House');
  processTitle.appendChild(emProcess);
  processTitle.appendChild(document.createTextNode(' Real Estate Kurdistan Experience'));
  processHeader.appendChild(processTitle);

  const processSubtitle = createElement('p', 'process__subtitle', 'Our expert property Erbil team ensures a seamless journey from discovery to acquisition. We specialize in apartments Erbil Iraq, houses for sale Erbil, villas Erbil Iraq, and penthouse Erbil transactions in the Erbil property market.');
  processHeader.appendChild(processSubtitle);
  processContainer.appendChild(processHeader);

  const processGrid = createElement('div', 'process__grid');
  const steps = [
    { num: '01', title: 'Discovery', desc: 'We learn your vision, lifestyle, and investment goals through personalized consultation.' },
    { num: '02', title: 'Curation', desc: 'Our experts handpick properties that match your unique criteria from exclusive listings.' },
    { num: '03', title: 'Experience', desc: 'Private tours, 3D walkthroughs, and white-glove service at every property.' },
    { num: '04', title: 'Acquisition', desc: 'Expert negotiation and seamless transaction management to close your dream home.' }
  ];

  steps.forEach(step => {
    const stepEl = createElement('div', 'process__step');
    const num = createElement('span', 'process__number', step.num);
    const title = createElement('h3', 'process__step-title', step.title);
    const desc = createElement('p', 'process__step-desc', step.desc);
    stepEl.appendChild(num);
    stepEl.appendChild(title);
    stepEl.appendChild(desc);
    processGrid.appendChild(stepEl);
  });

  processContainer.appendChild(processGrid);
  process.appendChild(processContainer);
  fragment.appendChild(process);

  // Testimonials Section
  const testimonialsSection = createElement('section', 'testimonials');
  const testimonialsContainer = createElement('div', 'container');

  const testimonialsHeader = createElement('div', 'testimonials__header');
  const testimonialsTitle = createElement('h2', 'testimonials__title');
  testimonialsTitle.textContent = 'What Our Property Erbil ';
  const emTestimonials = createElement('em', undefined, 'Clients');
  testimonialsTitle.appendChild(emTestimonials);
  testimonialsTitle.appendChild(document.createTextNode(' Say About Real Estate Erbil'));
  testimonialsHeader.appendChild(testimonialsTitle);
  testimonialsContainer.appendChild(testimonialsHeader);

  const testimonialsGrid = createElement('div', 'testimonials__grid');

  // Display first 3 testimonials
  testimonials.slice(0, 3).forEach(testimonial => {
    const card = createElement('article', 'testimonials__card');

    // Quote
    const quote = createElement('blockquote', 'testimonials__quote');
    quote.textContent = `"${testimonial.quote}"`;
    card.appendChild(quote);

    // Rating
    const rating = createElement('div', 'testimonials__rating');
    for (let i = 0; i < testimonial.rating; i++) {
      rating.appendChild(document.createTextNode('\u2605')); // Star character
    }
    card.appendChild(rating);

    // Author section
    const author = createElement('div', 'testimonials__author');

    // SEO-optimized testimonial avatar
    const avatar = createSEOImage({
      src: testimonial.image,
      alt: `${testimonial.name} from ${testimonial.location} - Real House client testimonial`,
      title: `${testimonial.name} - Satisfied Real House client`,
      className: 'testimonials__avatar',
      loading: 'lazy',
      width: 60,
      height: 60,
    });
    author.appendChild(avatar);

    const authorInfo = createElement('div', 'testimonials__author-info');
    const name = createElement('span', 'testimonials__name', testimonial.name);
    const location = createElement('span', 'testimonials__location', testimonial.location);
    authorInfo.appendChild(name);
    authorInfo.appendChild(location);
    author.appendChild(authorInfo);

    card.appendChild(author);
    testimonialsGrid.appendChild(card);
  });

  testimonialsContainer.appendChild(testimonialsGrid);

  // View All Testimonials link
  const testimonialsViewAll = createElement('div', 'testimonials__view-all');
  const testimonialsLink = createElement('a', 'testimonials__view-all-link');
  testimonialsLink.href = '/testimonials';
  testimonialsLink.setAttribute('data-route', '');
  testimonialsLink.textContent = 'Read All Client Reviews';
  // Add arrow icon
  const testimonialsArrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  testimonialsArrowSvg.setAttribute('viewBox', '0 0 24 24');
  testimonialsArrowSvg.setAttribute('fill', 'none');
  testimonialsArrowSvg.setAttribute('stroke', 'currentColor');
  testimonialsArrowSvg.setAttribute('stroke-width', '2');
  testimonialsArrowSvg.setAttribute('stroke-linecap', 'round');
  testimonialsArrowSvg.setAttribute('stroke-linejoin', 'round');
  const testimonialsArrowPath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  testimonialsArrowPath1.setAttribute('d', 'M5 12h14');
  const testimonialsArrowPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  testimonialsArrowPath2.setAttribute('d', 'M12 5l7 7-7 7');
  testimonialsArrowSvg.appendChild(testimonialsArrowPath1);
  testimonialsArrowSvg.appendChild(testimonialsArrowPath2);
  testimonialsLink.appendChild(testimonialsArrowSvg);
  testimonialsViewAll.appendChild(testimonialsLink);
  testimonialsContainer.appendChild(testimonialsViewAll);

  testimonialsSection.appendChild(testimonialsContainer);
  fragment.appendChild(testimonialsSection);

  // Agent Showcase
  const agentSection = createElement('section', 'agent-showcase');
  const agentContainer = createElement('div', 'container');
  const agentHeader = createElement('div', 'agent-showcase__header');
  const agentTitleEl = createElement('h2', 'agent-showcase__title');
  agentTitleEl.textContent = 'Best Real Estate Agent Erbil — Meet Our ';
  agentTitleEl.appendChild(createElement('em', undefined, 'Expert'));
  agentTitleEl.appendChild(document.createTextNode(' Team'));
  agentHeader.appendChild(agentTitleEl);
  agentHeader.appendChild(createElement('p', 'agent-showcase__subtitle', 'Dedicated property Erbil professionals committed to helping you buy house Erbil. Our experts specialize in real estate Kurdistan, apartments Erbil Iraq, villas Erbil Iraq, and property investment Kurdistan Iraq.'));
  agentContainer.appendChild(agentHeader);
  const agentGrid = createElement('div', 'agent-showcase__grid');
  agents.forEach(agentData => {
    const agentCard = createElement('div', 'agent-showcase__card');
    const imageWrapper = createElement('div', 'agent-showcase__image');
    // SEO-optimized agent image
    const agentImg = createSEOImage({
      src: agentData.image,
      alt: `${agentData.name}, ${agentData.role} - Best real estate agent Erbil specializing in ${agentData.specialization}`,
      title: `${agentData.name} - ${agentData.role} at Real House Erbil`,
      loading: 'lazy',
      width: 300,
      height: 400,
      srcset: generateSrcSet(agentData.image, [200, 300, 400]),
      sizes: '(max-width: 640px) 100vw, 300px',
    });
    imageWrapper.appendChild(agentImg);
    agentCard.appendChild(imageWrapper);
    const agentContent = createElement('div', 'agent-showcase__content');
    agentContent.appendChild(createElement('h3', 'agent-showcase__name', agentData.name));
    agentContent.appendChild(createElement('p', 'agent-showcase__role', agentData.role));
    agentContent.appendChild(createElement('p', 'agent-showcase__specialization', agentData.specialization));
    const agentStatsDiv = createElement('div', 'agent-showcase__stats');
    const yearsStat = createElement('div', 'agent-showcase__stat');
    yearsStat.appendChild(createElement('span', 'agent-showcase__stat-value', `${agentData.yearsExperience}+`));
    yearsStat.appendChild(createElement('span', 'agent-showcase__stat-label', 'Years'));
    agentStatsDiv.appendChild(yearsStat);
    const soldStat = createElement('div', 'agent-showcase__stat');
    soldStat.appendChild(createElement('span', 'agent-showcase__stat-value', agentData.propertiesSold.toString()));
    soldStat.appendChild(createElement('span', 'agent-showcase__stat-label', 'Sold'));
    agentStatsDiv.appendChild(soldStat);
    agentContent.appendChild(agentStatsDiv);
    const agentContactDiv = createElement('div', 'agent-showcase__contact');
    const phoneLink = createElement('a', 'agent-showcase__link');
    phoneLink.href = `tel:${agentData.phone.replace(/\s/g, '')}`;
    phoneLink.appendChild(createSVGUse('icon-phone'));
    phoneLink.appendChild(document.createTextNode(agentData.phone));
    agentContactDiv.appendChild(phoneLink);
    agentContent.appendChild(agentContactDiv);
    agentCard.appendChild(agentContent);
    agentGrid.appendChild(agentCard);
  });
  agentContainer.appendChild(agentGrid);
  agentSection.appendChild(agentContainer);
  fragment.appendChild(agentSection);

  // Featured In Media
  const featuredInSection = createElement('section', 'featured-in');
  const featuredInContainer = createElement('div', 'container');
  const featuredInHeader = createElement('div', 'featured-in__header');
  featuredInHeader.appendChild(createElement('h3', 'featured-in__title', 'As Featured In'));
  featuredInContainer.appendChild(featuredInHeader);
  const featuredInGrid = createElement('div', 'featured-in__grid');
  featuredInMedia.forEach(mediaItem => {
    const mediaEl = createElement('div', 'featured-in__item');
    mediaEl.appendChild(createElement('span', 'featured-in__logo', mediaItem.logo));
    mediaEl.appendChild(createElement('span', 'featured-in__name', mediaItem.name));
    featuredInGrid.appendChild(mediaEl);
  });
  featuredInContainer.appendChild(featuredInGrid);
  featuredInSection.appendChild(featuredInContainer);
  fragment.appendChild(featuredInSection);

  // Partners
  const partnersSection = createElement('section', 'partners');
  const partnersContainer = createElement('div', 'container');
  const partnersHeader = createElement('div', 'partners__header');
  partnersHeader.appendChild(createElement('h3', 'partners__title', 'Our Trusted Partners'));
  partnersContainer.appendChild(partnersHeader);
  const partnersGrid = createElement('div', 'partners__grid');
  partnerLogos.forEach(partnerData => {
    const partnerItem = createElement('div', 'partners__item');
    partnerItem.appendChild(createElement('span', 'partners__logo', partnerData.logo));
    partnerItem.appendChild(createElement('span', 'partners__name', partnerData.name));
    partnersGrid.appendChild(partnerItem);
  });
  partnersContainer.appendChild(partnersGrid);
  partnersSection.appendChild(partnersContainer);
  fragment.appendChild(partnersSection);

  // CTA Section
  const ctaSection = createElement('section', 'cta-section');
  const ctaContainer = createElement('div', 'container cta-section__content');

  const ctaTitle = createElement('h2', 'cta-section__title');
  ctaTitle.textContent = 'Ready to Find Your ';
  const emCta = createElement('em', undefined, 'Dream Property Erbil');
  ctaTitle.appendChild(emCta);
  ctaTitle.appendChild(document.createTextNode('? Houses for Sale Erbil Await'));
  ctaContainer.appendChild(ctaTitle);

  const ctaBtn = createElement('a', 'btn btn--primary btn--large', 'Contact Best Real Estate Agent Erbil');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  ctaContainer.appendChild(ctaBtn);

  ctaSection.appendChild(ctaContainer);
  fragment.appendChild(ctaSection);

  return fragment;
}

// ─── Properties Page ──────────────────────────────────────────────────────
export function renderPropertiesPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Read filters from URL on page load
  currentFilterState = parseFiltersFromURL();

  // Track view mode and map instance - load from localStorage
  let currentViewMode: ViewMode = getSavedViewPreference();
  let mapInstance: ReturnType<typeof initPropertiesMap> = null;

  // Main section for properties listing
  const page = createElement('section', 'properties-page');
  page.setAttribute('aria-labelledby', 'properties-title');
  const container = createElement('div', 'container');

  // Header with view toggle - only ONE h1 per page
  const header = createElement('header', 'properties-page__header');
  const headerContent = createElement('div', 'properties-page__header-content');
  const title = createElement('h1', 'properties-page__title', 'Property Erbil — Houses for Sale Erbil, Apartments Erbil Iraq & Luxury Homes Kurdistan');
  title.id = 'properties-title';
  const subtitle = createElement('p', 'properties-page__subtitle', 'Discover exceptional real estate Erbil listings. Browse villas Erbil Iraq, penthouse Erbil, apartments Erbil Iraq, and luxury homes Kurdistan. Best real estate agent Erbil for buy house Erbil and real estate Kurdistan property investment Kurdistan Iraq.');
  headerContent.appendChild(title);
  headerContent.appendChild(subtitle);
  header.appendChild(headerContent);

  // View Toggle Buttons with proper ARIA - Grid | List | Map
  const viewToggle = createElement('div', 'properties-page__view-toggle');
  viewToggle.setAttribute('role', 'group');
  viewToggle.setAttribute('aria-label', 'View mode');

  // Grid View Button
  const gridBtn = createElement('button', `properties-page__view-btn${currentViewMode === 'grid' ? ' properties-page__view-btn--active' : ''}`);
  gridBtn.setAttribute('data-view', 'grid');
  gridBtn.setAttribute('aria-label', 'View properties as grid');
  gridBtn.setAttribute('aria-pressed', currentViewMode === 'grid' ? 'true' : 'false');
  gridBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg><span>Grid</span>';
  viewToggle.appendChild(gridBtn);

  // List View Button
  const listBtn = createElement('button', `properties-page__view-btn${currentViewMode === 'list' ? ' properties-page__view-btn--active' : ''}`);
  listBtn.setAttribute('data-view', 'list');
  listBtn.setAttribute('aria-label', 'View properties as list');
  listBtn.setAttribute('aria-pressed', currentViewMode === 'list' ? 'true' : 'false');
  listBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg><span>List</span>';
  viewToggle.appendChild(listBtn);

  // Map View Button
  const mapBtn = createElement('button', `properties-page__view-btn${currentViewMode === 'map' ? ' properties-page__view-btn--active' : ''}`);
  mapBtn.setAttribute('data-view', 'map');
  mapBtn.setAttribute('aria-label', 'View properties on map');
  mapBtn.setAttribute('aria-pressed', currentViewMode === 'map' ? 'true' : 'false');
  mapBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg><span>Map</span>';
  viewToggle.appendChild(mapBtn);

  header.appendChild(viewToggle);
  container.appendChild(header);

  // Filter Breadcrumbs Section (shows active filters)
  const breadcrumbsSection = createElement('div', 'properties-page__breadcrumbs');
  breadcrumbsSection.id = 'filter-breadcrumbs';
  container.appendChild(breadcrumbsSection);

  // Search Input
  const searchSection = createElement('div', 'properties-page__search');
  const searchInput = createElement('input', 'properties-page__search-input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search properties by location, type, or features...';
  searchInput.setAttribute('aria-label', 'Search properties');
  searchInput.value = currentFilterState.searchQuery;
  searchSection.appendChild(searchInput);
  container.appendChild(searchSection);

  // Property Type Filters
  const typeFilterGroup = createElement('div', 'properties-page__filter-group');
  const typeLabel = createElement('span', 'properties-page__filter-label', 'Type:');
  typeFilterGroup.appendChild(typeLabel);
  const filterTypes = ['All', 'Villa', 'Apartment', 'Penthouse', 'Townhouse', 'Duplex', 'Land', 'Commercial'];
  filterTypes.forEach((type) => {
    const isActive = currentFilterState.type === type;
    const btn = createElement('button', `properties-page__filter${isActive ? ' active' : ''}`, type);
    btn.setAttribute('data-filter-type', 'type');
    btn.setAttribute('data-filter-value', type);
    typeFilterGroup.appendChild(btn);
  });
  container.appendChild(typeFilterGroup);

  // Price Range Filters
  const priceFilterGroup = createElement('div', 'properties-page__filter-group');
  const priceLabel = createElement('span', 'properties-page__filter-label', 'Price:');
  priceFilterGroup.appendChild(priceLabel);
  const priceRanges = ['All', 'Under $200K', '$200K-$400K', '$400K-$700K', '$700K+'];
  priceRanges.forEach((range) => {
    const isActive = currentFilterState.priceRange === range;
    const btn = createElement('button', `properties-page__filter${isActive ? ' active' : ''}`, range);
    btn.setAttribute('data-filter-type', 'price');
    btn.setAttribute('data-filter-value', range);
    priceFilterGroup.appendChild(btn);
  });
  container.appendChild(priceFilterGroup);

  // Beds Filters
  const bedsFilterGroup = createElement('div', 'properties-page__filter-group');
  const bedsLabel = createElement('span', 'properties-page__filter-label', 'Bedrooms:');
  bedsFilterGroup.appendChild(bedsLabel);
  const bedOptions = [
    { label: 'Any', value: 0 },
    { label: '3+', value: 3 },
    { label: '4+', value: 4 },
    { label: '5+', value: 5 },
    { label: '6+', value: 6 }
  ];
  bedOptions.forEach((option) => {
    const isActive = currentFilterState.minBeds === option.value;
    const btn = createElement('button', `properties-page__filter${isActive ? ' active' : ''}`, option.label);
    btn.setAttribute('data-filter-type', 'beds');
    btn.setAttribute('data-filter-value', option.value.toString());
    bedsFilterGroup.appendChild(btn);
  });
  container.appendChild(bedsFilterGroup);

  // Status Filters (For Sale / For Rent / Daily Rent)
  const statusFilterGroup = createElement('div', 'properties-page__filter-group');
  const statusLabel = createElement('span', 'properties-page__filter-label', 'Status:');
  statusFilterGroup.appendChild(statusLabel);
  const statusOptions = ['All', 'For Sale', 'For Rent', 'Daily Rent'];
  statusOptions.forEach((status) => {
    const isActive = currentFilterState.status === status;
    const btn = createElement('button', `properties-page__filter${isActive ? ' active' : ''}`, status);
    btn.setAttribute('data-filter-type', 'status');
    btn.setAttribute('data-filter-value', status);
    statusFilterGroup.appendChild(btn);
  });
  container.appendChild(statusFilterGroup);

  // ─── Advanced Filters Section ───────────────────────────────────────────────
  const advancedToggle = createElement('div', 'properties-page__advanced-toggle');
  const advToggleBtn = createElement('button', 'properties-page__advanced-toggle-btn');
  advToggleBtn.setAttribute('aria-expanded', 'false');
  advToggleBtn.setAttribute('aria-controls', 'advanced-filters-panel');
  const advToggleText = createElement('span', 'properties-page__advanced-toggle-text', 'Advanced Filters');
  advToggleBtn.appendChild(advToggleText);
  const advToggleIcon = createElement('span', 'properties-page__advanced-toggle-icon', '+');
  advToggleBtn.appendChild(advToggleIcon);
  advancedToggle.appendChild(advToggleBtn);
  container.appendChild(advancedToggle);

  const advancedPanel = createElement('div', 'properties-page__advanced-panel');
  advancedPanel.id = 'advanced-filters-panel';
  const advancedContent = createElement('div', 'properties-page__advanced-content');

  // Row 1: Price Range Slider
  const advRowPrice = createElement('div', 'properties-page__advanced-row properties-page__advanced-row--full');
  const priceSliderWrapper = createElement('div', 'advanced-filter__slider-group');
  priceSliderWrapper.appendChild(createElement('label', 'advanced-filter__label', 'Price Range (USD)'));
  const priceSliderContainer = createElement('div', 'advanced-filter__dual-slider');

  // Price display
  const priceDisplay = createElement('div', 'advanced-filter__price-display');
  const minPriceDisplay = createElement('span', 'advanced-filter__price-value', '$0');
  minPriceDisplay.id = 'min-price-display';
  const priceDisplaySep = createElement('span', 'advanced-filter__price-separator', ' - ');
  const maxPriceDisplay = createElement('span', 'advanced-filter__price-value', '$10M+');
  maxPriceDisplay.id = 'max-price-display';
  priceDisplay.appendChild(minPriceDisplay);
  priceDisplay.appendChild(priceDisplaySep);
  priceDisplay.appendChild(maxPriceDisplay);
  priceSliderWrapper.appendChild(priceDisplay);

  // Price slider track and inputs
  const priceSliderTrack = createElement('div', 'advanced-filter__slider-track');
  const priceSliderProgress = createElement('div', 'advanced-filter__slider-progress');
  priceSliderProgress.id = 'price-slider-progress';
  priceSliderTrack.appendChild(priceSliderProgress);

  const minPriceSlider = createElement('input', 'advanced-filter__slider') as HTMLInputElement;
  minPriceSlider.type = 'range'; minPriceSlider.min = '0'; minPriceSlider.max = '10000000'; minPriceSlider.step = '10000'; minPriceSlider.value = '0'; minPriceSlider.id = 'min-price-slider';
  const maxPriceSlider = createElement('input', 'advanced-filter__slider') as HTMLInputElement;
  maxPriceSlider.type = 'range'; maxPriceSlider.min = '0'; maxPriceSlider.max = '10000000'; maxPriceSlider.step = '10000'; maxPriceSlider.value = '10000000'; maxPriceSlider.id = 'max-price-slider';

  priceSliderTrack.appendChild(minPriceSlider);
  priceSliderTrack.appendChild(maxPriceSlider);
  priceSliderWrapper.appendChild(priceSliderTrack);
  priceSliderContainer.appendChild(priceSliderWrapper);
  advRowPrice.appendChild(priceSliderContainer);
  advancedContent.appendChild(advRowPrice);

  // Row 2: Area Range & Year Built
  const advRow1 = createElement('div', 'properties-page__advanced-row');
  const areaWrapper = createElement('div', 'advanced-filter__range');
  areaWrapper.appendChild(createElement('label', 'advanced-filter__label', 'Area (sqm)'));
  const areaSliderContainer = createElement('div', 'advanced-filter__slider-container');
  const minAreaInput = createElement('input', 'advanced-filter__range-input') as HTMLInputElement;
  minAreaInput.type = 'number'; minAreaInput.min = '0'; minAreaInput.placeholder = 'Min'; minAreaInput.id = 'min-area-input';
  const maxAreaInput = createElement('input', 'advanced-filter__range-input') as HTMLInputElement;
  maxAreaInput.type = 'number'; maxAreaInput.min = '0'; maxAreaInput.placeholder = 'Max (1000+)'; maxAreaInput.id = 'max-area-input';
  areaSliderContainer.appendChild(minAreaInput);
  areaSliderContainer.appendChild(createElement('span', 'advanced-filter__separator', 'to'));
  areaSliderContainer.appendChild(maxAreaInput);
  areaWrapper.appendChild(areaSliderContainer);
  advRow1.appendChild(areaWrapper);

  const yearWrapper = createElement('div', 'advanced-filter__range');
  yearWrapper.appendChild(createElement('label', 'advanced-filter__label', 'Year Built'));
  const yearSliderContainer = createElement('div', 'advanced-filter__slider-container');
  const minYearInput = createElement('input', 'advanced-filter__range-input') as HTMLInputElement;
  minYearInput.type = 'number'; minYearInput.min = '2000'; minYearInput.placeholder = 'Min Year'; minYearInput.id = 'min-year-input';
  const maxYearInput = createElement('input', 'advanced-filter__range-input') as HTMLInputElement;
  maxYearInput.type = 'number'; maxYearInput.min = '2000'; maxYearInput.placeholder = 'Max Year'; maxYearInput.id = 'max-year-input';
  yearSliderContainer.appendChild(minYearInput);
  yearSliderContainer.appendChild(createElement('span', 'advanced-filter__separator', 'to'));
  yearSliderContainer.appendChild(maxYearInput);
  yearWrapper.appendChild(yearSliderContainer);
  advRow1.appendChild(yearWrapper);
  advancedContent.appendChild(advRow1);

  // Row 3: District & Furnishing Status
  const advRow2 = createElement('div', 'properties-page__advanced-row');
  const districtWrapper = createElement('div', 'advanced-filter__dropdown');
  const districtLbl = createElement('label', 'advanced-filter__label', 'District/Neighborhood');
  districtLbl.setAttribute('for', 'district-filter');
  districtWrapper.appendChild(districtLbl);
  const districtSelect = createElement('select', 'advanced-filter__select') as HTMLSelectElement;
  districtSelect.id = 'district-filter';
  const allDistOpt = createElement('option', undefined, 'All Districts');
  allDistOpt.value = 'All';
  districtSelect.appendChild(allDistOpt);
  const uniqueDistricts = new Set<string>();
  properties.forEach(p => { if (p.location.district) uniqueDistricts.add(p.location.district); });
  Array.from(uniqueDistricts).sort().forEach(d => { const opt = createElement('option', undefined, d); opt.value = d; districtSelect.appendChild(opt); });
  districtWrapper.appendChild(districtSelect);
  advRow2.appendChild(districtWrapper);

  // Furnishing Status Dropdown
  const furnishingWrapper = createElement('div', 'advanced-filter__dropdown');
  const furnishingLbl = createElement('label', 'advanced-filter__label', 'Furnishing Status');
  furnishingLbl.setAttribute('for', 'furnishing-filter');
  furnishingWrapper.appendChild(furnishingLbl);
  const furnishingSelect = createElement('select', 'advanced-filter__select') as HTMLSelectElement;
  furnishingSelect.id = 'furnishing-filter';
  const furnishingOptions = ['All', 'Fully Furnished', 'Semi-Furnished', 'Unfurnished'];
  furnishingOptions.forEach(opt => {
    const option = createElement('option', undefined, opt === 'All' ? 'Any Furnishing' : opt);
    option.value = opt;
    furnishingSelect.appendChild(option);
  });
  furnishingWrapper.appendChild(furnishingSelect);
  advRow2.appendChild(furnishingWrapper);
  advancedContent.appendChild(advRow2);

  // Row 4: View Type & Number of Floors
  const advRow3 = createElement('div', 'properties-page__advanced-row');

  // View Type Dropdown
  const viewWrapper = createElement('div', 'advanced-filter__dropdown');
  const viewLbl = createElement('label', 'advanced-filter__label', 'View Type');
  viewLbl.setAttribute('for', 'view-filter');
  viewWrapper.appendChild(viewLbl);
  const viewSelect = createElement('select', 'advanced-filter__select') as HTMLSelectElement;
  viewSelect.id = 'view-filter';
  const viewOptions = ['All', 'City View', 'Garden View', 'Pool View', 'Street View', 'Mountain View', 'Park View'];
  viewOptions.forEach(opt => {
    const option = createElement('option', undefined, opt === 'All' ? 'Any View' : opt);
    option.value = opt;
    viewSelect.appendChild(option);
  });
  viewWrapper.appendChild(viewSelect);
  advRow3.appendChild(viewWrapper);

  // Number of Floors
  const floorsWrapper = createElement('div', 'advanced-filter__range');
  floorsWrapper.appendChild(createElement('label', 'advanced-filter__label', 'Number of Floors'));
  const floorsSliderContainer = createElement('div', 'advanced-filter__slider-container');
  const minFloorsInput = createElement('input', 'advanced-filter__range-input') as HTMLInputElement;
  minFloorsInput.type = 'number'; minFloorsInput.min = '0'; minFloorsInput.max = '20'; minFloorsInput.placeholder = 'Min'; minFloorsInput.id = 'min-floors-input';
  const maxFloorsInput = createElement('input', 'advanced-filter__range-input') as HTMLInputElement;
  maxFloorsInput.type = 'number'; maxFloorsInput.min = '0'; maxFloorsInput.max = '20'; maxFloorsInput.placeholder = 'Max'; maxFloorsInput.id = 'max-floors-input';
  floorsSliderContainer.appendChild(minFloorsInput);
  floorsSliderContainer.appendChild(createElement('span', 'advanced-filter__separator', 'to'));
  floorsSliderContainer.appendChild(maxFloorsInput);
  floorsWrapper.appendChild(floorsSliderContainer);
  advRow3.appendChild(floorsWrapper);
  advancedContent.appendChild(advRow3);

  // Row 5: Property Features (checkboxes)
  const advRowFeatures = createElement('div', 'properties-page__advanced-row properties-page__advanced-row--full');
  const featuresWrapper = createElement('div', 'advanced-filter__checkbox-group');
  featuresWrapper.appendChild(createElement('label', 'advanced-filter__label', 'Property Features'));
  const featuresOpts = createElement('div', 'advanced-filter__options advanced-filter__options--features');
  const propertyFeaturesList = ['Central AC', 'Balcony', 'Parking', 'Security', 'Pool', 'Gym', 'Garden', 'Elevator', 'Smart Home', "Maid's Room", 'Storage', 'Pet Friendly'];
  propertyFeaturesList.forEach(feature => {
    const optLbl = createElement('label', 'advanced-filter__option');
    const cb = createElement('input') as HTMLInputElement;
    cb.type = 'checkbox'; cb.className = 'advanced-filter__feature-checkbox'; cb.value = feature; cb.id = 'feature-' + feature.toLowerCase().replace(/[^a-z0-9]/g, '-');
    optLbl.appendChild(cb);
    optLbl.appendChild(createElement('span', 'advanced-filter__option-label', feature));
    featuresOpts.appendChild(optLbl);
  });
  featuresWrapper.appendChild(featuresOpts);
  advRowFeatures.appendChild(featuresWrapper);
  advancedContent.appendChild(advRowFeatures);

  // Row 6: Badges
  const advRowBadges = createElement('div', 'properties-page__advanced-row properties-page__advanced-row--full');
  const badgesWrapper = createElement('div', 'advanced-filter__checkbox-group');
  badgesWrapper.appendChild(createElement('label', 'advanced-filter__label', 'Property Badges'));
  const badgesOpts = createElement('div', 'advanced-filter__options');
  ['Hot', 'New', 'Exclusive', 'Discount', 'Installment'].forEach(badge => {
    const optLbl = createElement('label', 'advanced-filter__option');
    const cb = createElement('input') as HTMLInputElement;
    cb.type = 'checkbox'; cb.className = 'advanced-filter__checkbox'; cb.value = badge; cb.id = 'badge-' + badge.toLowerCase();
    optLbl.appendChild(cb);
    optLbl.appendChild(createElement('span', 'advanced-filter__option-label', badge));
    badgesOpts.appendChild(optLbl);
  });
  badgesWrapper.appendChild(badgesOpts);
  advRowBadges.appendChild(badgesWrapper);
  advancedContent.appendChild(advRowBadges);

  // Clear All & Reset Advanced Filters
  const resetRow = createElement('div', 'properties-page__advanced-row properties-page__advanced-reset');
  const clearAllBtn = createElement('button', 'btn btn--primary btn--sm', 'Clear All Filters');
  clearAllBtn.id = 'clear-all-filters';
  resetRow.appendChild(clearAllBtn);
  const resetAdvBtn = createElement('button', 'btn btn--ghost btn--sm', 'Reset Advanced Filters');
  resetAdvBtn.id = 'reset-advanced-filters';
  resetRow.appendChild(resetAdvBtn);
  advancedContent.appendChild(resetRow);

  advancedPanel.appendChild(advancedContent);
  container.appendChild(advancedPanel);

  // Filters Summary
  const filtersSummary = createElement('div', 'properties-page__filters-summary');
  filtersSummary.id = 'filters-summary';
  const filtersCount = createElement('span', 'properties-page__filters-count');
  filtersCount.id = 'filters-count';
  filtersCount.textContent = properties.length + ' properties found';
  filtersSummary.appendChild(filtersCount);
  container.appendChild(filtersSummary);

  // Content wrapper for grid and map
  const contentWrapper = createElement('div', 'properties-page__content');
  const grid = createElement('div', 'properties-page__grid');
  grid.id = 'properties-grid';
  const initialFilteredProps = filterProperties(properties, currentFilterState);
  if (initialFilteredProps.length === 0) {
    const noResults = createElement('div', 'properties-page__no-results');
    const noResultsTitle = createElement('h3', undefined, 'No properties found');
    const noResultsText = createElement('p', undefined, 'Try adjusting your filters.');
    noResults.appendChild(noResultsTitle);
    noResults.appendChild(noResultsText);
    grid.appendChild(noResults);
  } else {
    initialFilteredProps.forEach(property => {
      grid.appendChild(createPropertyCard(property));
    });
  }
  contentWrapper.appendChild(grid);
  const mapContainer = createElement('div', 'properties-page__map-container');
  mapContainer.id = 'properties-map-container';
  mapContainer.style.display = 'none';
  const mapDiv = createElement('div', 'properties-page__map');
  mapDiv.id = 'properties-map';
  mapContainer.appendChild(mapDiv);
  contentWrapper.appendChild(mapContainer);
  container.appendChild(contentWrapper);

  page.appendChild(container);

  // ─── Location Links Section ─────────────────────────────────────────────
  const locationLinks = createLocationLinks();
  page.appendChild(locationLinks);

  // ─── Internal CTA ─────────────────────────────────────────────────────────
  const listingCta = createInternalCTA(
    'Need Help Finding Your Perfect Property?',
    'Our experienced real estate consultants are here to help you find the ideal property that matches your lifestyle and budget.',
    { text: 'Contact Our Experts', url: '/contact' },
    { text: 'View Development Projects', url: '/projects' }
  );
  page.appendChild(listingCta);

  fragment.appendChild(page);

  // Breadcrumb helper functions
  function updateBreadcrumbs() {
    const el = document.getElementById('filter-breadcrumbs');
    if (!el) return;
    while (el.firstChild) el.removeChild(el.firstChild);
    if (!hasActiveFilters(currentFilterState)) { el.style.display = 'none'; return; }
    el.style.display = 'flex';
    el.appendChild(createElement('span', 'properties-page__breadcrumb-base', 'Properties'));
    if (currentFilterState.type !== 'All') el.appendChild(createFilterChip(currentFilterState.type, 'type'));
    if (currentFilterState.minBeds > 0) el.appendChild(createFilterChip(formatBedsForBreadcrumb(currentFilterState.minBeds), 'beds'));
    if (currentFilterState.priceRange !== 'All') el.appendChild(createFilterChip(formatPriceForBreadcrumb(currentFilterState.priceRange), 'price'));
    if (currentFilterState.status !== 'All') el.appendChild(createFilterChip(currentFilterState.status, 'status'));
    if (currentFilterState.searchQuery.trim()) el.appendChild(createFilterChip(`"${currentFilterState.searchQuery}"`, 'search'));
    const clearBtn = createElement('button', 'properties-page__clear-filters', 'Clear All Filters');
    clearBtn.setAttribute('type', 'button');
    clearBtn.addEventListener('click', clearAllFilters);
    el.appendChild(clearBtn);
  }
  function createFilterChip(label: string, filterType: string): HTMLElement {
    const chip = createElement('span', 'properties-page__filter-chip');
    chip.appendChild(createElement('span', 'properties-page__breadcrumb-separator', '>'));
    chip.appendChild(createElement('span', 'properties-page__chip-label', label));
    const removeBtn = createElement('button', 'properties-page__chip-remove', '\u00D7');
    removeBtn.setAttribute('type', 'button');
    removeBtn.addEventListener('click', (e) => { e.stopPropagation(); removeFilter(filterType); });
    chip.appendChild(removeBtn);
    return chip;
  }
  function removeFilter(filterType: string) {
    if (filterType === 'type') currentFilterState.type = 'All';
    else if (filterType === 'beds') currentFilterState.minBeds = 0;
    else if (filterType === 'price') currentFilterState.priceRange = 'All';
    else if (filterType === 'status') currentFilterState.status = 'All';
    else if (filterType === 'search') { currentFilterState.searchQuery = ''; const s = document.querySelector('.properties-page__search-input') as HTMLInputElement; if (s) s.value = ''; }
    updateFilterButtonsUI(); updateURLWithFilters(currentFilterState); updateBreadcrumbs(); renderGrid();
  }
  function clearAllFilters() {
    const currentYear = new Date().getFullYear();
    currentFilterState = {
      type: 'All', priceRange: 'All', minBeds: 0, searchQuery: '', status: 'All',
      minArea: 0, maxArea: 1000, badges: [], minYearBuilt: 2000, maxYearBuilt: currentYear, district: 'All',
      minPrice: 0, maxPrice: 10000000, furnishing: 'All', propertyFeatures: [], viewType: 'All', minFloors: 0, maxFloors: 20
    };
    const s = document.querySelector('.properties-page__search-input') as HTMLInputElement; if (s) s.value = '';
    resetAllAdvancedFilterInputs();
    updateFilterButtonsUI(); updateURLWithFilters(currentFilterState); updateBreadcrumbs(); renderGrid();
  }
  function resetAllAdvancedFilterInputs() {
    const minAreaEl = document.getElementById('min-area-input') as HTMLInputElement;
    const maxAreaEl = document.getElementById('max-area-input') as HTMLInputElement;
    const minYearEl = document.getElementById('min-year-input') as HTMLInputElement;
    const maxYearEl = document.getElementById('max-year-input') as HTMLInputElement;
    const districtEl = document.getElementById('district-filter') as HTMLSelectElement;
    const furnishingEl = document.getElementById('furnishing-filter') as HTMLSelectElement;
    const viewEl = document.getElementById('view-filter') as HTMLSelectElement;
    const minFloorsEl = document.getElementById('min-floors-input') as HTMLInputElement;
    const maxFloorsEl = document.getElementById('max-floors-input') as HTMLInputElement;
    const minPriceSliderEl = document.getElementById('min-price-slider') as HTMLInputElement;
    const maxPriceSliderEl = document.getElementById('max-price-slider') as HTMLInputElement;
    if (minAreaEl) minAreaEl.value = '';
    if (maxAreaEl) maxAreaEl.value = '';
    if (minYearEl) minYearEl.value = '';
    if (maxYearEl) maxYearEl.value = '';
    if (districtEl) districtEl.value = 'All';
    if (furnishingEl) furnishingEl.value = 'All';
    if (viewEl) viewEl.value = 'All';
    if (minFloorsEl) minFloorsEl.value = '';
    if (maxFloorsEl) maxFloorsEl.value = '';
    if (minPriceSliderEl) minPriceSliderEl.value = '0';
    if (maxPriceSliderEl) maxPriceSliderEl.value = '10000000';
    updatePriceSliderDisplay();
    document.querySelectorAll('.advanced-filter__checkbox').forEach(c => { (c as HTMLInputElement).checked = false; });
    document.querySelectorAll('.advanced-filter__feature-checkbox').forEach(c => { (c as HTMLInputElement).checked = false; });
  }
  function updatePriceSliderDisplay() {
    const minPriceSlider = document.getElementById('min-price-slider') as HTMLInputElement;
    const maxPriceSlider = document.getElementById('max-price-slider') as HTMLInputElement;
    const minDisplay = document.getElementById('min-price-display');
    const maxDisplay = document.getElementById('max-price-display');
    const progress = document.getElementById('price-slider-progress');
    if (minPriceSlider && maxPriceSlider && minDisplay && maxDisplay && progress) {
      const minVal = parseInt(minPriceSlider.value, 10);
      const maxVal = parseInt(maxPriceSlider.value, 10);
      const maxLimit = 10000000;
      const formatPrice = (val: number) => {
        if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
        return `$${val}`;
      };
      minDisplay.textContent = formatPrice(minVal);
      maxDisplay.textContent = maxVal >= maxLimit ? '$10M+' : formatPrice(maxVal);
      const minPercent = (minVal / maxLimit) * 100;
      const maxPercent = (maxVal / maxLimit) * 100;
      progress.style.left = `${minPercent}%`;
      progress.style.width = `${maxPercent - minPercent}%`;
    }
  }
  function updateFilterButtonsUI() {
    document.querySelectorAll('[data-filter-type="type"]').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter-value') === currentFilterState.type));
    document.querySelectorAll('[data-filter-type="price"]').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter-value') === currentFilterState.priceRange));
    document.querySelectorAll('[data-filter-type="beds"]').forEach(b => b.classList.toggle('active', parseInt(b.getAttribute('data-filter-value') || '0', 10) === currentFilterState.minBeds));
    document.querySelectorAll('[data-filter-type="status"]').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter-value') === currentFilterState.status));
  }

  // Toggle between grid, list, and map views
  function toggleView(view: ViewMode) {
    if (view === currentViewMode) return;
    const gridEl = document.getElementById('properties-grid');
    const mapContainerEl = document.getElementById('properties-map-container');
    const gridBtnEl = document.querySelector('[data-view="grid"]');
    const listBtnEl = document.querySelector('[data-view="list"]');
    const mapBtnEl = document.querySelector('[data-view="map"]');
    if (!gridEl || !mapContainerEl) return;

    currentViewMode = view;
    // Save preference to localStorage
    saveViewPreference(view);

    // Update all button states
    gridBtnEl?.classList.remove('properties-page__view-btn--active');
    listBtnEl?.classList.remove('properties-page__view-btn--active');
    mapBtnEl?.classList.remove('properties-page__view-btn--active');
    gridBtnEl?.setAttribute('aria-pressed', 'false');
    listBtnEl?.setAttribute('aria-pressed', 'false');
    mapBtnEl?.setAttribute('aria-pressed', 'false');

    if (view === 'map') {
      gridEl.style.display = 'none';
      mapContainerEl.style.display = 'block';
      mapBtnEl?.classList.add('properties-page__view-btn--active');
      mapBtnEl?.setAttribute('aria-pressed', 'true');
      if (!mapInstance) {
        const filteredProps = filterProperties(properties, currentFilterState);
        mapInstance = initPropertiesMap('properties-map', filteredProps, (id) => {
          window.history.pushState({}, '', `/properties/${id}`);
          window.dispatchEvent(new PopStateEvent('popstate'));
        });
      } else {
        updateMapMarkers(mapInstance, filterProperties(properties, currentFilterState));
      }
      setTimeout(() => { if (mapInstance) mapInstance.invalidateSize(); }, 100);
    } else if (view === 'list') {
      gridEl.style.display = '';
      gridEl.classList.add('properties-page__grid--list');
      mapContainerEl.style.display = 'none';
      listBtnEl?.classList.add('properties-page__view-btn--active');
      listBtnEl?.setAttribute('aria-pressed', 'true');
    } else {
      // Grid view (default)
      gridEl.style.display = '';
      gridEl.classList.remove('properties-page__grid--list');
      mapContainerEl.style.display = 'none';
      gridBtnEl?.classList.add('properties-page__view-btn--active');
      gridBtnEl?.setAttribute('aria-pressed', 'true');
    }
  }

  // Function to re-render the grid
  function renderGrid() {
    const gridEl = document.getElementById('properties-grid');
    if (!gridEl) return;
    // Update map if visible
    if (currentViewMode === 'map' && mapInstance) {
      updateMapMarkers(mapInstance, filterProperties(properties, currentFilterState));
    }

    // Clear the grid safely (no innerHTML)
    while (gridEl.firstChild) {
      gridEl.removeChild(gridEl.firstChild);
    }

    // Filter properties
    const filteredProperties = filterProperties(properties, currentFilterState);

    if (filteredProperties.length === 0) {
      // Show no results message
      const noResults = createElement('div', 'properties-page__no-results');
      const noResultsTitle = createElement('h3', undefined, 'No properties found');
      const noResultsText = createElement('p', undefined, 'Try adjusting your filters to find more properties.');
      noResults.appendChild(noResultsTitle);
      noResults.appendChild(noResultsText);
      gridEl.appendChild(noResults);
      // Announce to screen readers
      announceToScreenReader('No properties found. Try adjusting your filters.');
    } else {
      // Render filtered properties
      filteredProperties.forEach(property => {
        gridEl.appendChild(createPropertyCard(property));
      });
      // Announce results to screen readers
      announceToScreenReader(`Showing ${filteredProperties.length} ${filteredProperties.length === 1 ? 'property' : 'properties'}`);
    }
  }

  // Add event listeners after the fragment is appended to DOM
  setTimeout(() => {
    // Apply initial view state from localStorage
    const gridEl = document.getElementById('properties-grid');
    const mapContainerEl = document.getElementById('properties-map-container');
    if (gridEl && mapContainerEl) {
      if (currentViewMode === 'map') {
        gridEl.style.display = 'none';
        mapContainerEl.style.display = 'block';
        const filteredProps = filterProperties(properties, currentFilterState);
        mapInstance = initPropertiesMap('properties-map', filteredProps, (id) => {
          window.history.pushState({}, '', `/properties/${id}`);
          window.dispatchEvent(new PopStateEvent('popstate'));
        });
        setTimeout(() => { if (mapInstance) mapInstance.invalidateSize(); }, 100);
      } else if (currentViewMode === 'list') {
        gridEl.classList.add('properties-page__grid--list');
        mapContainerEl.style.display = 'none';
      } else {
        // Grid view (default)
        gridEl.classList.remove('properties-page__grid--list');
        mapContainerEl.style.display = 'none';
      }
    }

    // View toggle handlers
    document.querySelectorAll('.properties-page__view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view') as ViewMode;
        if (view) toggleView(view);
      });
    });

    // Search input handler
    const searchEl = document.querySelector('.properties-page__search-input') as HTMLInputElement;
    if (searchEl) {
      let debounceTimeout: ReturnType<typeof setTimeout>;
      searchEl.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          currentFilterState.searchQuery = searchEl.value;
          updateURLWithFilters(currentFilterState);
          updateBreadcrumbs();
          renderGrid();
        }, 300);
      });
    }

    // Filter button handlers
    const filterButtons = document.querySelectorAll('.properties-page__filter');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterType = btn.getAttribute('data-filter-type');
        const filterValue = btn.getAttribute('data-filter-value');

        if (!filterType || !filterValue) return;

        // Update active state for buttons in the same group
        const parentGroup = btn.parentElement;
        if (parentGroup) {
          parentGroup.querySelectorAll('.properties-page__filter').forEach(b => {
            b.classList.remove('active');
          });
        }
        btn.classList.add('active');

        // Update filter state
        switch (filterType) {
          case 'type':
            currentFilterState.type = filterValue;
            break;
          case 'price':
            currentFilterState.priceRange = filterValue;
            break;
          case 'beds':
            currentFilterState.minBeds = parseInt(filterValue, 10);
            break;
        }

        // Update URL and breadcrumbs
        updateURLWithFilters(currentFilterState);
        updateBreadcrumbs();
        // Re-render the grid
        renderGrid();
      });
    });

    // Initial breadcrumbs update
    updateBreadcrumbs();

    // ─── Advanced Filters Event Handlers ────────────────────────────────────
    const advToggleBtnEl = document.querySelector('.properties-page__advanced-toggle-btn');
    if (advToggleBtnEl) {
      advToggleBtnEl.addEventListener('click', () => {
        const panel = document.getElementById('advanced-filters-panel');
        const icon = document.querySelector('.properties-page__advanced-toggle-icon');
        if (panel && icon) {
          panel.classList.toggle('expanded');
          icon.textContent = panel.classList.contains('expanded') ? '-' : '+';
          advToggleBtnEl.setAttribute('aria-expanded', panel.classList.contains('expanded') ? 'true' : 'false');
        }
      });
    }

    // Get all advanced filter elements
    const minAreaEl = document.getElementById('min-area-input') as HTMLInputElement;
    const maxAreaEl = document.getElementById('max-area-input') as HTMLInputElement;
    const minYearEl = document.getElementById('min-year-input') as HTMLInputElement;
    const maxYearEl = document.getElementById('max-year-input') as HTMLInputElement;
    const districtEl = document.getElementById('district-filter') as HTMLSelectElement;
    const furnishingEl = document.getElementById('furnishing-filter') as HTMLSelectElement;
    const viewEl = document.getElementById('view-filter') as HTMLSelectElement;
    const minFloorsEl = document.getElementById('min-floors-input') as HTMLInputElement;
    const maxFloorsEl = document.getElementById('max-floors-input') as HTMLInputElement;
    const minPriceSliderEl = document.getElementById('min-price-slider') as HTMLInputElement;
    const maxPriceSliderEl = document.getElementById('max-price-slider') as HTMLInputElement;
    const badgeCheckboxes = document.querySelectorAll('.advanced-filter__checkbox');
    const featureCheckboxes = document.querySelectorAll('.advanced-filter__feature-checkbox');

    let advDebounce: ReturnType<typeof setTimeout>;
    function updateAdvancedFiltersAndRender() {
      clearTimeout(advDebounce);
      advDebounce = setTimeout(() => {
        currentFilterState.minArea = parseInt(minAreaEl?.value || '0', 10);
        currentFilterState.maxArea = parseInt(maxAreaEl?.value || '1000', 10);
        currentFilterState.minYearBuilt = parseInt(minYearEl?.value || '2000', 10);
        currentFilterState.maxYearBuilt = parseInt(maxYearEl?.value || new Date().getFullYear().toString(), 10);
        currentFilterState.district = districtEl?.value || 'All';
        currentFilterState.furnishing = furnishingEl?.value || 'All';
        currentFilterState.viewType = viewEl?.value || 'All';
        currentFilterState.minFloors = parseInt(minFloorsEl?.value || '0', 10);
        currentFilterState.maxFloors = parseInt(maxFloorsEl?.value || '20', 10);
        currentFilterState.minPrice = parseInt(minPriceSliderEl?.value || '0', 10);
        currentFilterState.maxPrice = parseInt(maxPriceSliderEl?.value || '10000000', 10);
        const selectedBadges: string[] = [];
        document.querySelectorAll('.advanced-filter__checkbox:checked').forEach(c => selectedBadges.push((c as HTMLInputElement).value));
        currentFilterState.badges = selectedBadges;
        const selectedFeatures: string[] = [];
        document.querySelectorAll('.advanced-filter__feature-checkbox:checked').forEach(c => selectedFeatures.push((c as HTMLInputElement).value));
        currentFilterState.propertyFeatures = selectedFeatures;
        updateURLWithFilters(currentFilterState, true);
        renderGrid();
        updateFiltersCountDisplay();
        updateAdvancedFilterCountBadge();
      }, 300);
    }

    // Bind event listeners to all advanced filter inputs
    if (minAreaEl) minAreaEl.addEventListener('input', updateAdvancedFiltersAndRender);
    if (maxAreaEl) maxAreaEl.addEventListener('input', updateAdvancedFiltersAndRender);
    if (minYearEl) minYearEl.addEventListener('input', updateAdvancedFiltersAndRender);
    if (maxYearEl) maxYearEl.addEventListener('input', updateAdvancedFiltersAndRender);
    if (minFloorsEl) minFloorsEl.addEventListener('input', updateAdvancedFiltersAndRender);
    if (maxFloorsEl) maxFloorsEl.addEventListener('input', updateAdvancedFiltersAndRender);
    if (districtEl) districtEl.addEventListener('change', updateAdvancedFiltersAndRender);
    if (furnishingEl) furnishingEl.addEventListener('change', updateAdvancedFiltersAndRender);
    if (viewEl) viewEl.addEventListener('change', updateAdvancedFiltersAndRender);

    // Price slider event handlers
    if (minPriceSliderEl && maxPriceSliderEl) {
      const handlePriceSlider = () => {
        let minVal = parseInt(minPriceSliderEl.value, 10);
        let maxVal = parseInt(maxPriceSliderEl.value, 10);
        // Ensure min doesn't exceed max
        if (minVal > maxVal) {
          if (document.activeElement === minPriceSliderEl) {
            minPriceSliderEl.value = maxVal.toString();
            minVal = maxVal;
          } else {
            maxPriceSliderEl.value = minVal.toString();
            maxVal = minVal;
          }
        }
        updatePriceSliderDisplay();
        updateAdvancedFiltersAndRender();
      };
      minPriceSliderEl.addEventListener('input', handlePriceSlider);
      maxPriceSliderEl.addEventListener('input', handlePriceSlider);
      // Initialize price slider display
      updatePriceSliderDisplay();
    }

    // Badge checkboxes
    badgeCheckboxes.forEach(cb => cb.addEventListener('change', updateAdvancedFiltersAndRender));
    // Feature checkboxes
    featureCheckboxes.forEach(cb => cb.addEventListener('change', updateAdvancedFiltersAndRender));

    // Reset Advanced Filters button
    const resetAdvBtnEl = document.getElementById('reset-advanced-filters');
    if (resetAdvBtnEl) {
      resetAdvBtnEl.addEventListener('click', () => {
        const currentYear = new Date().getFullYear();
        currentFilterState.minArea = 0;
        currentFilterState.maxArea = 1000;
        currentFilterState.badges = [];
        currentFilterState.minYearBuilt = 2000;
        currentFilterState.maxYearBuilt = currentYear;
        currentFilterState.district = 'All';
        currentFilterState.minPrice = 0;
        currentFilterState.maxPrice = 10000000;
        currentFilterState.furnishing = 'All';
        currentFilterState.propertyFeatures = [];
        currentFilterState.viewType = 'All';
        currentFilterState.minFloors = 0;
        currentFilterState.maxFloors = 20;
        resetAllAdvancedFilterInputs();
        updateURLWithFilters(currentFilterState, true);
        renderGrid();
        updateFiltersCountDisplay();
        updateAdvancedFilterCountBadge();
      });
    }

    // Clear All Filters button
    const clearAllBtnEl = document.getElementById('clear-all-filters');
    if (clearAllBtnEl) {
      clearAllBtnEl.addEventListener('click', clearAllFilters);
    }

    function updateFiltersCountDisplay() {
      const countEl = document.getElementById('filters-count');
      if (countEl) {
        const filteredCount = filterProperties(properties, currentFilterState).length;
        countEl.textContent = filteredCount + ' properties found';
      }
    }

    function updateAdvancedFilterCountBadge() {
      const toggleText = document.querySelector('.properties-page__advanced-toggle-text');
      if (!toggleText) return;
      const existingBadge = toggleText.querySelector('.properties-page__advanced-count');
      if (existingBadge) existingBadge.remove();
      const count = countActiveAdvancedFilters(currentFilterState);
      if (count > 0) {
        const countBadge = createElement('span', 'properties-page__advanced-count', count.toString());
        toggleText.appendChild(countBadge);
      }
    }

    updateFiltersCountDisplay();
    updateAdvancedFilterCountBadge();

    // Initialize comparison bar
    initComparisonBar();
    updateComparisonBar();
  }, 0);

  return fragment;
}

// ─── About Page ───────────────────────────────────────────────────────────
export function renderAboutPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Main article wrapper for the about page content
  const page = createElement('article', 'about-page');
  page.setAttribute('itemscope', '');
  page.setAttribute('itemtype', 'https://schema.org/AboutPage');

  // Hero section (header for the article)
  const hero = createElement('header', 'about-page__hero');
  const heroContent = createElement('div', 'container');

  // Only ONE h1 per page
  const title = createElement('h1', 'about-page__title');
  title.setAttribute('itemprop', 'name');
  title.textContent = 'Real Estate Erbil — Redefining ';
  const em = createElement('em', undefined, 'Luxury');
  title.appendChild(em);
  title.appendChild(document.createTextNode(' Property Erbil'));
  heroContent.appendChild(title);

  const subtitle = createElement('p', 'about-page__subtitle');
  subtitle.setAttribute('itemprop', 'description');
  subtitle.textContent = 'Real House is the premier real estate Kurdistan agency for houses for sale Erbil and apartments Erbil Iraq. We are the best real estate agent Erbil for villas Erbil Iraq, penthouse Erbil, and luxury homes Kurdistan in the Erbil property market.';
  heroContent.appendChild(subtitle);

  hero.appendChild(heroContent);
  page.appendChild(hero);

  // Story Section - Proper heading hierarchy h2
  const story = createElement('section', 'about-page__story');
  story.setAttribute('aria-labelledby', 'story-title');
  const storyContainer = createElement('div', 'container about-page__story-grid');

  const storyContent = createElement('div', 'about-page__story-content');
  const storyTitle = createElement('h2', undefined, 'Our Real Estate Erbil Story');
  storyTitle.id = 'story-title';
  const storyP1 = createElement('p', undefined, 'Founded in 2001 by a team of visionary property Erbil professionals, Real House was born from a simple belief: that finding your perfect houses for sale Erbil or apartments Erbil should be an extraordinary experience. Our team became the trusted best real estate agent Erbil for buyers across the Erbil property market.');
  const storyP2 = createElement('p', undefined, 'Today, we represent the finest villas Erbil Iraq, penthouse Erbil, and luxury homes Kurdistan, including exclusive apartments Erbil Iraq. Every real estate Erbil listing is personally curated for clients seeking property investment Kurdistan Iraq and real estate Kurdistan opportunities.');
  storyContent.appendChild(storyTitle);
  storyContent.appendChild(storyP1);
  storyContent.appendChild(storyP2);
  storyContainer.appendChild(storyContent);

  const storyImage = createElement('div', 'about-page__story-image');
  // SEO-optimized about page image
  const img = createSEOImage({
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
    alt: 'Luxury villa Erbil Iraq - Premium real estate Erbil property featuring modern architecture in Kurdistan Region',
    title: 'Real House - Luxury Real Estate in Erbil, Kurdistan',
    loading: 'lazy',
    width: 800,
    height: 600,
    srcset: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80&fm=webp 400w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp 800w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&fm=webp 1200w',
    sizes: '(max-width: 768px) 100vw, 50vw',
  });
  storyImage.appendChild(img);
  storyContainer.appendChild(storyImage);

  story.appendChild(storyContainer);
  page.appendChild(story);

  // Values Section - h2 for proper hierarchy
  const values = createElement('section', 'about-page__values');
  values.setAttribute('aria-labelledby', 'values-title');
  const valuesContainer = createElement('div', 'container');

  const valuesHeader = createElement('header', 'about-page__values-header');
  const valuesTitle = createElement('h2', undefined, 'Our Real Estate Kurdistan Values');
  valuesTitle.id = 'values-title';
  valuesHeader.appendChild(valuesTitle);
  valuesContainer.appendChild(valuesHeader);

  const valuesGrid = createElement('div', 'about-page__values-grid');
  valuesGrid.setAttribute('role', 'list');
  const valuesList = [
    { title: 'Excellence in Property Erbil', desc: 'We pursue perfection in every real estate Erbil transaction, from houses for sale Erbil to luxury villa Erbil price negotiations.' },
    { title: 'Integrity', desc: 'Honesty and transparency guide every interaction, making us the best real estate agent Erbil for apartments Erbil and villas.' },
    { title: 'Innovation in Erbil Property Market', desc: 'We leverage cutting-edge technology to help you buy house in Erbil Iraq with superior real estate Kurdistan experiences.' }
  ];

  valuesList.forEach(value => {
    const valueEl = createElement('div', 'about-page__value');
    valueEl.setAttribute('role', 'listitem');
    // h3 since it's under h2
    const vTitle = createElement('h3', undefined, value.title);
    const vDesc = createElement('p', undefined, value.desc);
    valueEl.appendChild(vTitle);
    valueEl.appendChild(vDesc);
    valuesGrid.appendChild(valueEl);
  });

  valuesContainer.appendChild(valuesGrid);
  values.appendChild(valuesContainer);
  page.appendChild(values);

  // Team Section - h2 for proper hierarchy
  const team = createElement('section', 'about-page__team');
  team.id = 'team';
  team.setAttribute('aria-labelledby', 'team-title');
  const teamContainer = createElement('div', 'container');

  const teamHeader = createElement('header', 'about-page__team-header');
  const teamTitle = createElement('h2', undefined, 'Meet Our Best Real Estate Agent Erbil Team');
  teamTitle.id = 'team-title';
  teamHeader.appendChild(teamTitle);
  teamContainer.appendChild(teamHeader);

  const teamGrid = createElement('div', 'about-page__team-grid');
  teamGrid.setAttribute('role', 'list');
  const teamMembers = [
    { name: 'Alexandra Chen', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fm=webp' },
    { name: 'Marcus Williams', role: 'Head of Sales', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fm=webp' },
    { name: 'Sofia Rodriguez', role: 'Chief Marketing Officer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fm=webp' },
    { name: 'James Mitchell', role: 'Senior Agent', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fm=webp' }
  ];

  teamMembers.forEach(member => {
    // Use article for each team member (self-contained content)
    const memberEl = createElement('article', 'about-page__member');
    memberEl.setAttribute('role', 'listitem');
    memberEl.setAttribute('itemscope', '');
    memberEl.setAttribute('itemtype', 'https://schema.org/Person');
    const imgDiv = createElement('div', 'about-page__member-image');
    // SEO-optimized team member image
    const memberImg = createSEOImage({
      src: member.image,
      alt: `${member.name}, ${member.role} at Real House - Luxury real estate professional in Erbil, Kurdistan`,
      title: `${member.name} - ${member.role}`,
      loading: 'lazy',
      width: 300,
      height: 300,
      srcset: generateSrcSet(member.image, [200, 300, 400]),
      sizes: '(max-width: 640px) 150px, 300px',
    });
    memberImg.setAttribute('itemprop', 'image');
    imgDiv.appendChild(memberImg);
    memberEl.appendChild(imgDiv);

    // h3 since under h2
    const name = createElement('h3', undefined, member.name);
    name.setAttribute('itemprop', 'name');
    const role = createElement('p', undefined, member.role);
    role.setAttribute('itemprop', 'jobTitle');
    memberEl.appendChild(name);
    memberEl.appendChild(role);
    teamGrid.appendChild(memberEl);
  });

  teamContainer.appendChild(teamGrid);
  team.appendChild(teamContainer);
  page.appendChild(team);

  fragment.appendChild(page);
  return fragment;
}

// ─── Contact Page ─────────────────────────────────────────────────────────
export function renderContactPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Main article wrapper with structured data
  const page = createElement('article', 'contact-page');
  page.setAttribute('itemscope', '');
  page.setAttribute('itemtype', 'https://schema.org/ContactPage');
  const container = createElement('div', 'container');

  // Header section with h1
  const header = createElement('header', 'contact-page__header');
  const title = createElement('h1', 'contact-page__title', 'Contact Real Estate Erbil — Best Real Estate Agent Erbil for Houses for Sale Erbil');
  const subtitle = createElement('p', 'contact-page__subtitle', 'Ready to find your dream property Erbil? Looking for houses for sale Erbil, apartments Erbil Iraq, penthouse Erbil, or villas Erbil Iraq? Our real estate Kurdistan experts and best real estate agent Erbil team help you buy house Erbil in the Erbil property market.');
  header.appendChild(title);
  header.appendChild(subtitle);
  container.appendChild(header);

  // Grid
  const grid = createElement('div', 'contact-page__grid');

  // Form
  const formWrapper = createElement('div', 'contact-page__form');
  const form = createElement('form', 'form');
  form.setAttribute('novalidate', '');

  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Iraq phone formats: +964 7XX XXX XXXX, 07XX XXX XXXX, 075X XXXX XXX
  const phonePattern = /^(\+964\s?7\d{2}\s?\d{3}\s?\d{4}|07\d{2}\s?\d{3}\s?\d{4}|075\d\s?\d{4}\s?\d{3})$/;

  // Validation error messages
  const errorMessages: Record<string, string> = {
    name: 'Please enter your full name (at least 2 characters)',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid Iraq phone number (e.g., +964 750 123 4567 or 0750 123 4567)',
    message: 'Please enter a message (at least 10 characters)'
  };

  // Helper to validate a single field with visual feedback
  function validateField(input: HTMLInputElement | HTMLTextAreaElement, _showError: boolean = true): boolean {
    const fieldName = input.name;
    const value = input.value.trim();
    let isValid = true;

    // Field-specific validation
    if (fieldName === 'name') {
      isValid = value.length >= 2;
    } else if (fieldName === 'email') {
      isValid = value.length > 0 && emailPattern.test(value);
    } else if (fieldName === 'phone') {
      const normalizedPhone = value.replace(/\s/g, '');
      isValid = phonePattern.test(value) || /^(\+9647\d{9}|07\d{9})$/.test(normalizedPhone);
    } else if (fieldName === 'message') {
      isValid = value.length >= 10;
    }

    // Update visual feedback classes
    const group = input.closest('.form__group');
    if (group) {
      group.classList.remove('form__group--valid', 'form__group--invalid');
      if (value.length > 0) {
        group.classList.add(isValid ? 'form__group--valid' : 'form__group--invalid');
      }
    }

    input.setAttribute('aria-invalid', String(!isValid && value.length > 0));
    const errorSpan = document.getElementById(`${fieldName}-error`);
    if (errorSpan) {
      errorSpan.textContent = (!isValid && _showError && value.length > 0) ? (errorMessages[fieldName] || '') : '';
    }

    return isValid;
  }

  // Helper to validate all fields
  function validateAllFields(): boolean {
    const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('.form__input, .form__textarea');
    let allValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        allValid = false;
      }
    });
    return allValid;
  }

  // Success message container (fallback)
  const successMessage = createElement('div', 'form__success');
  successMessage.style.display = 'none';
  successMessage.textContent = 'Thank you for your inquiry! We will contact you shortly.';
  successMessage.setAttribute('role', 'status');
  successMessage.setAttribute('aria-live', 'polite');

  // Show success modal with next steps
  function showSuccessModal(message: string) {
    // Create modal overlay
    const overlay = createElement('div', 'form__modal-overlay');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'success-modal-title');

    // Create modal
    const modal = createElement('div', 'form__modal');

    // Success icon
    const iconWrapper = createElement('div', 'form__modal-icon');
    iconWrapper.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    modal.appendChild(iconWrapper);

    // Title
    const title = createElement('h3', 'form__modal-title', 'Message Sent Successfully!');
    title.id = 'success-modal-title';
    modal.appendChild(title);

    // Message
    const msgText = createElement('p', 'form__modal-message', message);
    modal.appendChild(msgText);

    // Next steps
    const nextSteps = createElement('div', 'form__modal-steps');
    const stepsTitle = createElement('h4', undefined, 'What happens next?');
    nextSteps.appendChild(stepsTitle);

    const stepsList = createElement('ul');
    const steps = [
      'Our team will review your inquiry within 24 hours',
      'A property specialist will contact you to discuss your needs',
      'We\'ll arrange property viewings at your convenience'
    ];
    steps.forEach(step => {
      const li = createElement('li', undefined, step);
      stepsList.appendChild(li);
    });
    nextSteps.appendChild(stepsList);
    modal.appendChild(nextSteps);

    // Close button
    const closeBtn = createElement('button', 'form__modal-close', 'Continue Browsing');
    closeBtn.type = 'button';
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('form__modal-overlay--closing');
      setTimeout(() => overlay.remove(), 300);
    });
    modal.appendChild(closeBtn);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Focus close button for accessibility
    setTimeout(() => closeBtn.focus(), 100);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('form__modal-overlay--closing');
        setTimeout(() => overlay.remove(), 300);
      }
    });

    // Close on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        overlay.classList.add('form__modal-overlay--closing');
        setTimeout(() => overlay.remove(), 300);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide any previous success message
    successMessage.style.display = 'none';

    // Validate all fields
    if (!validateAllFields()) {
      // Add shake animation on validation failure
      form.classList.add('form--shake');
      setTimeout(() => form.classList.remove('form--shake'), 500);
      // Focus first invalid field
      const firstInvalid = form.querySelector('.form__group--invalid .form__input, .form__group--invalid .form__textarea') as HTMLElement;
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Show loading state with ARIA
    const submitBtn = form.querySelector('.form__submit') as HTMLButtonElement;
    submitBtn.classList.add('form__submit--loading');
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    announceToScreenReader('Sending your message, please wait.');

    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    // Submit to API
    submitInquiry({ name, email, phone, message })
      .then((result) => {
        if (result.success) {
          // Reset form
          form.reset();

          // Reset aria-invalid attributes
          const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('.form__input, .form__textarea');
          inputs.forEach(input => {
            input.setAttribute('aria-invalid', 'false');
          });

          // Clear error messages
          const errorSpans = form.querySelectorAll('.form__error-message');
          errorSpans.forEach(span => {
            span.textContent = '';
          });

          // Clear validation states
          const groups = form.querySelectorAll('.form__group');
          groups.forEach(g => g.classList.remove('form__group--valid', 'form__group--invalid'));

          // Show success modal
          showSuccessModal(result.message);
          announceToScreenReader('Message sent successfully!');
        } else {
          // Show error
          successMessage.textContent = result.message;
          successMessage.style.color = 'var(--color-error, #ef4444)';
          successMessage.style.display = 'block';
          announceToScreenReader('Error: ' + result.message);
        }
      })
      .catch(() => {
        successMessage.textContent = 'Something went wrong. Please try again.';
        successMessage.style.color = 'var(--color-error, #ef4444)';
        successMessage.style.display = 'block';
        announceToScreenReader('Error: Something went wrong. Please try again.');
      })
      .finally(() => {
        // Restore button state
        submitBtn.classList.remove('form__submit--loading');
        submitBtn.disabled = false;
        submitBtn.setAttribute('aria-busy', 'false');
      });
  });

  // Parse URL params for property pre-fill
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get('property');
  const propertyTitle = urlParams.get('title');
  let prefillMessage = '';
  if (propertyId && propertyTitle) {
    prefillMessage = `I am interested in the property: ${decodeURIComponent(propertyTitle)} (ID: ${propertyId})\n\nPlease contact me with more information.`;
  } else if (propertyId) {
    const propData = getPropertyById(propertyId);
    if (propData) {
      prefillMessage = `I am interested in the property: ${propData.title}\n\nPlease contact me with more information.`;
    }
  }

  const fields = [
    { label: 'Full Name', type: 'text', name: 'name', placeholder: 'Ahmed Mohammed' },
    { label: 'Email Address', type: 'email', name: 'email', placeholder: 'ahmed@example.com' },
    { label: 'Phone Number', type: 'tel', name: 'phone', placeholder: '+964 750 123 4567' }
  ];

  fields.forEach(field => {
    const group = createElement('div', 'form__group');
    const label = createElement('label', 'form__label', field.label);
    label.setAttribute('for', field.name);
    const input = createElement('input', 'form__input');
    input.type = field.type;
    input.name = field.name;
    input.id = field.name;
    input.placeholder = field.placeholder;
    input.required = true;
    input.setAttribute('aria-required', 'true');
    input.setAttribute('aria-invalid', 'false');
    input.setAttribute('aria-describedby', `${field.name}-error`);

    // Add blur validation
    input.addEventListener('blur', () => validateField(input));

    // Add real-time validation as user types
    input.addEventListener('input', () => validateField(input, false));

    // Validation icon
    const validationIcon = createElement('span', 'form__validation-icon');
    validationIcon.setAttribute('aria-hidden', 'true');

    // Error message span
    const errorSpan = createElement('span', 'form__error-message');
    errorSpan.id = `${field.name}-error`;
    errorSpan.setAttribute('aria-live', 'polite');

    // Wrap input and icon in container
    const inputWrapper = createElement('div', 'form__input-wrapper');
    inputWrapper.appendChild(input);
    inputWrapper.appendChild(validationIcon);

    group.appendChild(label);
    group.appendChild(inputWrapper);
    group.appendChild(errorSpan);
    form.appendChild(group);
  });

  // Message field
  const msgGroup = createElement('div', 'form__group');
  const msgLabel = createElement('label', 'form__label', 'Message');
  msgLabel.setAttribute('for', 'message');
  const textarea = createElement('textarea', 'form__textarea');
  textarea.name = 'message';
  textarea.id = 'message';
  textarea.placeholder = 'Tell us about your ideal property...';
  textarea.rows = 5;
  textarea.required = true;
  textarea.setAttribute('aria-required', 'true');
  textarea.setAttribute('aria-invalid', 'false');
  textarea.setAttribute('aria-describedby', 'message-error');

  // Pre-fill message from URL params if available
  if (prefillMessage) {
    textarea.value = prefillMessage;
  }

  // Add blur validation for textarea
  textarea.addEventListener('blur', () => validateField(textarea));

  // Add real-time validation for textarea
  textarea.addEventListener('input', () => validateField(textarea, false));

  // Validation icon for textarea
  const msgValidationIcon = createElement('span', 'form__validation-icon');
  msgValidationIcon.setAttribute('aria-hidden', 'true');

  // Error message span for message
  const msgErrorSpan = createElement('span', 'form__error-message');
  msgErrorSpan.id = 'message-error';
  msgErrorSpan.setAttribute('aria-live', 'polite');

  // Wrap textarea and icon
  const textareaWrapper = createElement('div', 'form__input-wrapper form__input-wrapper--textarea');
  textareaWrapper.appendChild(textarea);
  textareaWrapper.appendChild(msgValidationIcon);

  msgGroup.appendChild(msgLabel);
  msgGroup.appendChild(textareaWrapper);
  msgGroup.appendChild(msgErrorSpan);
  form.appendChild(msgGroup);

  // Submit button with spinner
  const submit = createElement('button', 'form__submit');
  submit.type = 'submit';
  const submitText = createElement('span', 'form__submit-text', 'Send Message');
  const submitSpinner = createElement('span', 'form__submit-spinner');
  submitSpinner.setAttribute('aria-hidden', 'true');
  submit.appendChild(submitText);
  submit.appendChild(submitSpinner);
  form.appendChild(submit);

  // Add success message after the form
  form.appendChild(successMessage);

  formWrapper.appendChild(form);
  grid.appendChild(formWrapper);

  // Info - Using semantic <address> element for contact information
  const info = createElement('div', 'contact-page__info');

  // Office Address - Using semantic address element
  const officeSection = createElement('div', 'contact-page__info-item');
  const officeTitle = createElement('h3', 'contact-page__info-heading', 'Office Location');
  officeSection.appendChild(officeTitle);
  const officeAddress = document.createElement('address');
  officeAddress.className = 'contact-page__address';
  officeAddress.setAttribute('itemscope', '');
  officeAddress.setAttribute('itemtype', 'https://schema.org/PostalAddress');
  const streetLine = createElement('span', 'contact-page__address-street');
  streetLine.setAttribute('itemprop', 'streetAddress');
  streetLine.textContent = 'Dream City';
  officeAddress.appendChild(streetLine);
  officeAddress.appendChild(document.createElement('br'));
  const cityLine = createElement('span', 'contact-page__address-city');
  cityLine.setAttribute('itemprop', 'addressLocality');
  cityLine.textContent = 'Erbil';
  officeAddress.appendChild(cityLine);
  officeAddress.appendChild(document.createTextNode(', '));
  const regionLine = createElement('span', 'contact-page__address-region');
  regionLine.setAttribute('itemprop', 'addressRegion');
  regionLine.textContent = 'Kurdistan Region';
  officeAddress.appendChild(regionLine);
  officeAddress.appendChild(document.createElement('br'));
  const countryLine = createElement('span', 'contact-page__address-country');
  countryLine.setAttribute('itemprop', 'addressCountry');
  countryLine.textContent = 'Iraq';
  officeAddress.appendChild(countryLine);
  officeSection.appendChild(officeAddress);
  info.appendChild(officeSection);

  // Phone Numbers - Also part of address context
  const phoneSection = createElement('div', 'contact-page__info-item');
  const phoneTitle = createElement('h3', 'contact-page__info-heading', 'Call Us');
  phoneSection.appendChild(phoneTitle);
  const phoneAddress = document.createElement('address');
  phoneAddress.className = 'contact-page__phone-list';

  const phoneNumbers = [
    { name: 'Abdalkader', number: '+964 750 792 2138', href: 'tel:+9647507922138' },
    { name: 'Mahmood', number: '+964 751 441 5003', href: 'tel:+9647514415003' }
  ];

  phoneNumbers.forEach(phone => {
    const phoneWrapper = createElement('div', 'contact-page__phone-item');
    const phoneName = createElement('span', 'contact-page__phone-name', `${phone.name}: `);
    phoneWrapper.appendChild(phoneName);
    const phoneLink = createElement('a', 'contact-page__phone-link');
    phoneLink.href = phone.href;
    phoneLink.setAttribute('itemprop', 'telephone');
    phoneLink.textContent = phone.number;
    phoneWrapper.appendChild(phoneLink);
    phoneAddress.appendChild(phoneWrapper);
  });
  phoneSection.appendChild(phoneAddress);
  info.appendChild(phoneSection);

  // Email
  const emailSection = createElement('div', 'contact-page__info-item');
  const emailTitle = createElement('h3', 'contact-page__info-heading', 'Email Us');
  emailSection.appendChild(emailTitle);
  const emailAddress = document.createElement('address');
  emailAddress.className = 'contact-page__email';
  const emailLink = createElement('a');
  emailLink.href = 'mailto:info@realhouseiq.com';
  emailLink.setAttribute('itemprop', 'email');
  emailLink.textContent = 'info@realhouseiq.com';
  emailAddress.appendChild(emailLink);
  emailSection.appendChild(emailAddress);
  info.appendChild(emailSection);

  // Business Hours - Using definition list for key-value data
  const hoursSection = createElement('div', 'contact-page__info-item');
  const hoursTitle = createElement('h3', 'contact-page__info-heading', 'Business Hours');
  hoursSection.appendChild(hoursTitle);
  const hoursList = document.createElement('dl');
  hoursList.className = 'contact-page__hours';
  const hoursData = [
    { days: 'Saturday - Thursday', time: '9:00 AM - 6:00 PM' },
    { days: 'Friday', time: 'By Appointment' }
  ];
  hoursData.forEach(hour => {
    const dt = createElement('dt', 'contact-page__hours-days', hour.days);
    const dd = createElement('dd', 'contact-page__hours-time', hour.time);
    hoursList.appendChild(dt);
    hoursList.appendChild(dd);
  });
  hoursSection.appendChild(hoursList);
  info.appendChild(hoursSection);

  grid.appendChild(info);
  container.appendChild(grid);

  // ─── Google Maps Embed Section ─────────────────────────────────────────────
  const mapSection = createElement('section', 'contact-page__map-section');

  const mapHeader = createElement('div', 'contact-page__map-header');
  const mapTitle = createElement('h2', 'contact-page__map-title', 'Visit Our Office');
  const mapSubtitle = createElement('p', 'contact-page__map-subtitle', 'Located in Dream City, Erbil - Kurdistan\'s premier real estate hub');
  mapHeader.appendChild(mapTitle);
  mapHeader.appendChild(mapSubtitle);
  mapSection.appendChild(mapHeader);

  // Google Maps iframe embed - Real House office location
  const mapContainer = createElement('div', 'contact-page__map-container');
  const mapIframe = document.createElement('iframe');
  mapIframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d44.0091!3d36.1901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z36LCsDExJzI0LjQiTiA0NMKwMDAnMzIuOCJF!5e0!3m2!1sen!2s!4v1708500000000';
  mapIframe.width = '100%';
  mapIframe.height = '400';
  mapIframe.style.border = '0';
  mapIframe.style.borderRadius = '12px';
  mapIframe.allowFullscreen = true;
  mapIframe.loading = 'lazy';
  mapIframe.referrerPolicy = 'no-referrer-when-downgrade';
  mapIframe.title = 'Real House Office Location - Dream City, Erbil, Kurdistan';
  mapContainer.appendChild(mapIframe);

  // Get Directions link
  const directionsLink = createElement('a', 'contact-page__directions');
  directionsLink.href = 'https://www.google.com/maps/dir/?api=1&destination=36.1901,44.0091';
  directionsLink.target = '_blank';
  directionsLink.rel = 'noopener noreferrer';
  directionsLink.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"></path></svg> Get Driving Directions';
  mapContainer.appendChild(directionsLink);

  mapSection.appendChild(mapContainer);

  // NAP (Name, Address, Phone) Section for consistency
  const napSection = createElement('div', 'contact-page__nap');
  napSection.setAttribute('itemscope', '');
  napSection.setAttribute('itemtype', 'https://schema.org/RealEstateAgent');

  const napName = createElement('h3', 'contact-page__nap-name');
  napName.setAttribute('itemprop', 'name');
  napName.textContent = 'Real House';
  napSection.appendChild(napName);

  const napLegal = createElement('p', 'contact-page__nap-legal');
  napLegal.setAttribute('itemprop', 'legalName');
  napLegal.textContent = 'Real House Real Estate LLC';
  napSection.appendChild(napLegal);

  const napAddress = createElement('address', 'contact-page__nap-address');
  napAddress.setAttribute('itemprop', 'address');
  napAddress.setAttribute('itemscope', '');
  napAddress.setAttribute('itemtype', 'https://schema.org/PostalAddress');
  napAddress.innerHTML = `
    <span itemprop="streetAddress">Queen Tower, Erbil, Building A3</span><br>
    <span itemprop="addressLocality">Erbil</span>,
    <span itemprop="addressRegion">Kurdistan Region</span>
    <span itemprop="postalCode">44001</span><br>
    <span itemprop="addressCountry">Iraq</span>
  `;
  napSection.appendChild(napAddress);

  const napPhones = createElement('div', 'contact-page__nap-phones');
  napPhones.innerHTML = `
    <a href="tel:+9647507922138" itemprop="telephone">+964 750 792 2138</a> (Abdalkader - Sales)<br>
    <a href="tel:+9647514415003" itemprop="telephone">+964 751 441 5003</a> (Mahmood - Support)
  `;
  napSection.appendChild(napPhones);

  const napEmail = createElement('a', 'contact-page__nap-email');
  napEmail.href = 'mailto:info@realhouseiq.com';
  napEmail.setAttribute('itemprop', 'email');
  napEmail.textContent = 'info@realhouseiq.com';
  napSection.appendChild(napEmail);

  // Hidden geo coordinates for SEO
  const geoDiv = createElement('div');
  geoDiv.setAttribute('itemprop', 'geo');
  geoDiv.setAttribute('itemscope', '');
  geoDiv.setAttribute('itemtype', 'https://schema.org/GeoCoordinates');
  geoDiv.innerHTML = `
    <meta itemprop="latitude" content="36.1901">
    <meta itemprop="longitude" content="44.0091">
  `;
  geoDiv.style.display = 'none';
  napSection.appendChild(geoDiv);

  // Price range and other business meta
  const businessMeta = createElement('div');
  businessMeta.innerHTML = `
    <meta itemprop="priceRange" content="$$$">
    <link itemprop="url" href="https://realhouseiq.com">
    <meta itemprop="openingHours" content="Sa-Th 09:00-18:00">
  `;
  businessMeta.style.display = 'none';
  napSection.appendChild(businessMeta);

  mapSection.appendChild(napSection);
  container.appendChild(mapSection);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── Property Detail Page ─────────────────────────────────────────────────
export function renderPropertyDetailPage(propertyId: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const property = getPropertyById(propertyId);

  if (!property) {
    // 404 - Property not found
    const page = createElement('div', 'property-detail-page property-detail-page--not-found');
    const container = createElement('div', 'container');

    const content = createElement('div', 'property-detail-page__not-found');
    const title = createElement('h1', undefined, 'Property Not Found');
    const message = createElement('p', undefined, 'The property you are looking for does not exist or has been removed.');
    const backLink = createElement('a', 'btn btn--primary', 'Browse All Properties');
    backLink.href = '/properties';
    backLink.setAttribute('data-route', '');

    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(backLink);
    container.appendChild(content);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  // Use article for the property detail as it's a self-contained content item
  const page = createElement('article', 'property-detail-page');
  page.setAttribute('itemscope', '');
  page.setAttribute('itemtype', 'https://schema.org/RealEstateListing');

  // ─── Breadcrumbs Navigation ────────────────────────────────────────────────
  const breadcrumbSection = createElement('nav', 'property-detail__breadcrumbs');
  breadcrumbSection.setAttribute('aria-label', 'Breadcrumb navigation');
  const breadcrumbContainer = createElement('div', 'container');
  const breadcrumbItems = getPropertyDetailBreadcrumbs(property);
  breadcrumbContainer.appendChild(createBreadcrumbs(breadcrumbItems));
  breadcrumbSection.appendChild(breadcrumbContainer);
  page.appendChild(breadcrumbSection);

  // Inject breadcrumb schema for SEO
  injectBreadcrumbSchema(breadcrumbItems);

  // ─── Gallery Section ─────────────────────────────────────────────────────
  const gallery = createElement('section', 'property-gallery');
  gallery.setAttribute('aria-label', 'Property image gallery');
  const galleryContainer = createElement('div', 'container');

  // Main image with SEO-optimized attributes wrapped in figure
  const mainImageWrapper = createElement('figure', 'property-gallery__main');
  const mainImage = createSEOImage({
    src: property.images[0],
    alt: generatePropertyAltText(property, 0, 'detail'),
    title: generatePropertyTitle(property),
    className: 'property-gallery__main-image',
    loading: 'eager',
    width: IMAGE_DIMENSIONS.detail.width,
    height: IMAGE_DIMENSIONS.detail.height,
    srcset: generateSrcSet(property.images[0], [600, 800, 1200]),
    sizes: generateSizes('detail'),
    fetchPriority: 'high',
  });
  mainImage.id = 'property-main-image';
  mainImageWrapper.appendChild(mainImage);
  galleryContainer.appendChild(mainImageWrapper);

  // Update meta tags with property image for social sharing
  updateImageMetaTags(property.images[0], generatePropertyAltText(property, 0, 'detail'), 'property');

  // Add structured data for property images (ImageObject schema)
  addPropertyImageSchemaToPage(property);

  // Thumbnails with accessibility and SEO attributes
  if (property.images.length > 1) {
    const thumbnails = createElement('div', 'property-gallery__thumbnails');
    thumbnails.setAttribute('role', 'group');
    thumbnails.setAttribute('aria-label', 'Property image gallery');
    property.images.forEach((imageSrc, index) => {
      const thumb = createElement('button', `property-gallery__thumb${index === 0 ? ' active' : ''}`);
      thumb.setAttribute('data-index', index.toString());
      thumb.setAttribute('aria-label', `View image ${index + 1} of ${property.images.length}`);
      thumb.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      // SEO-optimized thumbnail image
      const thumbImg = createSEOImage({
        src: imageSrc,
        alt: '', // Decorative, button has aria-label
        loading: 'lazy',
        width: IMAGE_DIMENSIONS.thumbnail.width,
        height: IMAGE_DIMENSIONS.thumbnail.height,
      });
      thumbImg.setAttribute('aria-hidden', 'true');
      thumb.appendChild(thumbImg);

      thumb.addEventListener('click', () => {
        const mainImg = document.getElementById('property-main-image') as HTMLImageElement;
        if (mainImg) {
          mainImg.src = imageSrc;
          // Update main image alt text with SEO-friendly description
          mainImg.alt = generatePropertyAltText(property, index, 'gallery');
          mainImg.title = `${property.title} - Image ${index + 1} of ${property.images.length}`;
        }
        // Update aria-pressed states
        thumbnails.querySelectorAll('.property-gallery__thumb').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-pressed', 'false');
        });
        thumb.classList.add('active');
        thumb.setAttribute('aria-pressed', 'true');
        announceToScreenReader(`Showing image ${index + 1} of ${property.images.length}`);
      });

      thumbnails.appendChild(thumb);
    });
    galleryContainer.appendChild(thumbnails);
  }

  gallery.appendChild(galleryContainer);
  page.appendChild(gallery);

  // ─── Content Section ─────────────────────────────────────────────────────
  const content = createElement('section', 'property-detail');
  const contentContainer = createElement('div', 'container');
  const contentGrid = createElement('div', 'property-detail__grid');

  // ─── Left Column - Main Info ─────────────────────────────────────────────
  const mainInfo = createElement('div', 'property-detail__main');

  // Header
  const header = createElement('div', 'property-detail__header');

  const typeTag = createElement('span', 'property-detail__type', property.type);
  header.appendChild(typeTag);

  const title = createElement('h1', 'property-detail__title', property.title);
  header.appendChild(title);

  const location = createElement('p', 'property-detail__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${property.location.address}, ${property.location.district}, ${property.location.city}`));
  header.appendChild(location);

  // ─── Inline Social Share Buttons in Header ────────────────────────────────
  const headerShareSection = createElement('div', 'property-detail__share');

  const shareLabel = createElement('span', 'property-detail__share-label', 'Share:');
  headerShareSection.appendChild(shareLabel);

  const headerShareButtons = createElement('div', 'property-detail__share-buttons');

  // Helper function for share URLs
  const getShareUrl = (): string => {
    return window.location.href;
  };

  const getShareText = (): string => {
    return `Check out this ${property.type}: ${property.title} - $${property.price.toLocaleString()}`;
  };

  // Toast notification function
  const showToast = (message: string): void => {
    // Remove any existing toast
    const existingToast = document.querySelector('.share-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = createElement('div', 'share-toast');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('share-toast--visible');
    });

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('share-toast--visible');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // WhatsApp Share (popular in Iraq)
  const whatsappBtn = createElement('button', 'property-detail__share-btn');
  whatsappBtn.setAttribute('aria-label', 'Share on WhatsApp');
  whatsappBtn.setAttribute('title', 'Share on WhatsApp');
  whatsappBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  whatsappBtn.addEventListener('click', () => {
    const url = `https://wa.me/?text=${encodeURIComponent(getShareText() + ' ' + getShareUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
  headerShareButtons.appendChild(whatsappBtn);

  // Facebook Share
  const facebookBtn = createElement('button', 'property-detail__share-btn');
  facebookBtn.setAttribute('aria-label', 'Share on Facebook');
  facebookBtn.setAttribute('title', 'Share on Facebook');
  facebookBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
  facebookBtn.addEventListener('click', () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  });
  headerShareButtons.appendChild(facebookBtn);

  // Twitter/X Share
  const twitterBtn = createElement('button', 'property-detail__share-btn');
  twitterBtn.setAttribute('aria-label', 'Share on X (Twitter)');
  twitterBtn.setAttribute('title', 'Share on X (Twitter)');
  twitterBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
  twitterBtn.addEventListener('click', () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  });
  headerShareButtons.appendChild(twitterBtn);

  // Copy Link
  const copyBtn = createElement('button', 'property-detail__share-btn');
  copyBtn.setAttribute('aria-label', 'Copy link');
  copyBtn.setAttribute('title', 'Copy link');
  copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
  copyBtn.addEventListener('click', async () => {
    try {
      // Try Web Share API first
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: getShareText(),
          url: getShareUrl()
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(getShareUrl());
        showToast('Link copied to clipboard!');
      }
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = getShareUrl();
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('Link copied to clipboard!');
    }
  });
  headerShareButtons.appendChild(copyBtn);

  // Email Share
  const emailBtn = createElement('button', 'property-detail__share-btn');
  emailBtn.setAttribute('aria-label', 'Share via Email');
  emailBtn.setAttribute('title', 'Share via Email');
  emailBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
  emailBtn.addEventListener('click', () => {
    const subject = encodeURIComponent(`${property.title} - Real House Property`);
    const body = encodeURIComponent(`${getShareText()}\n\nView the property: ${getShareUrl()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
  headerShareButtons.appendChild(emailBtn);

  headerShareSection.appendChild(headerShareButtons);

  // Share count placeholder (optional display)
  const shareCount = createElement('span', 'property-detail__share-count');
  shareCount.textContent = '0 shares';
  shareCount.setAttribute('aria-label', 'Number of shares');
  headerShareSection.appendChild(shareCount);

  header.appendChild(headerShareSection);

  mainInfo.appendChild(header);

  // Price
  const priceSection = createElement('div', 'property-detail__price-section');
  const priceLabel = createElement('span', 'property-detail__price-label', 'Asking Price');
  const priceValue = createElement('span', 'property-detail__price', `$${property.price.toLocaleString()}`);
  priceSection.appendChild(priceLabel);
  priceSection.appendChild(priceValue);
  mainInfo.appendChild(priceSection);

  // Specs Grid
  const specsSection = createElement('div', 'property-detail__specs');
  const specsTitle = createElement('h3', 'property-detail__section-title', 'Property Details');
  specsSection.appendChild(specsTitle);

  const specsGrid = createElement('div', 'property-detail__specs-grid');

  const specsData = [
    { icon: 'icon-bed', label: 'Bedrooms', value: property.specs.beds.toString() },
    { icon: 'icon-bath', label: 'Bathrooms', value: property.specs.baths.toString() },
    { icon: 'icon-area', label: 'Area (m²)', value: property.specs.sqm.toLocaleString() },
    ...(property.specs.yearBuilt ? [{ icon: 'icon-calendar', label: 'Year Built', value: property.specs.yearBuilt.toString() }] : [])
  ];

  specsData.forEach(spec => {
    const specItem = createElement('div', 'property-detail__spec-item');
    const iconWrapper = createElement('div', 'property-detail__spec-icon');
    iconWrapper.appendChild(createSVGUse(spec.icon));
    specItem.appendChild(iconWrapper);

    const specContent = createElement('div', 'property-detail__spec-content');
    const specValue = createElement('span', 'property-detail__spec-value', spec.value);
    const specLabel = createElement('span', 'property-detail__spec-label', spec.label);
    specContent.appendChild(specValue);
    specContent.appendChild(specLabel);
    specItem.appendChild(specContent);

    specsGrid.appendChild(specItem);
  });

  specsSection.appendChild(specsGrid);
  mainInfo.appendChild(specsSection);

  // Virtual Tour & Floor Plan Section
  const tourSection = createElement('div', 'property-detail__tour-section');
  const tourSectionTitle = createElement('h3', 'property-detail__section-title', 'Explore Property');
  tourSection.appendChild(tourSectionTitle);
  const tourActions = createElement('div', 'property-detail__tour-actions');
  const virtualTourBtn = createElement('button', 'property-detail__tour-btn property-detail__tour-btn--primary');
  const tourIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  tourIconSvg.setAttribute('viewBox', '0 0 24 24');
  tourIconSvg.setAttribute('fill', 'none');
  tourIconSvg.setAttribute('stroke', 'currentColor');
  tourIconSvg.setAttribute('stroke-width', '2');
  const tourCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  tourCircle.setAttribute('cx', '12');
  tourCircle.setAttribute('cy', '12');
  tourCircle.setAttribute('r', '10');
  tourIconSvg.appendChild(tourCircle);
  const tourEllipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  tourEllipse.setAttribute('cx', '12');
  tourEllipse.setAttribute('cy', '12');
  tourEllipse.setAttribute('rx', '10');
  tourEllipse.setAttribute('ry', '4');
  tourIconSvg.appendChild(tourEllipse);
  virtualTourBtn.appendChild(tourIconSvg);
  const tourBtnContent = createElement('div', 'property-detail__tour-btn-content');
  const tourBtnTitle = createElement('span', 'property-detail__tour-btn-title', 'Virtual Tour');
  const tourBtnSubtitle = createElement('span', 'property-detail__tour-btn-subtitle', property.virtualTourUrl ? 'Explore in 3D' : 'Demo Available');
  tourBtnContent.appendChild(tourBtnTitle);
  tourBtnContent.appendChild(tourBtnSubtitle);
  virtualTourBtn.appendChild(tourBtnContent);
  if (!property.virtualTourUrl) {
    const demoBadge = createElement('span', 'property-detail__tour-badge', 'Demo');
    virtualTourBtn.appendChild(demoBadge);
  }
  virtualTourBtn.addEventListener('click', () => {
    injectVirtualTourStyles();
    openVirtualTourModal({ url: property.virtualTourUrl || '', propertyTitle: property.title });
  });
  tourActions.appendChild(virtualTourBtn);
  const floorPlanBtn = createElement('button', 'property-detail__tour-btn property-detail__tour-btn--secondary');
  const planIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  planIconSvg.setAttribute('viewBox', '0 0 24 24');
  planIconSvg.setAttribute('fill', 'none');
  planIconSvg.setAttribute('stroke', 'currentColor');
  planIconSvg.setAttribute('stroke-width', '2');
  const planRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  planRect.setAttribute('x', '3');
  planRect.setAttribute('y', '3');
  planRect.setAttribute('width', '18');
  planRect.setAttribute('height', '18');
  planRect.setAttribute('rx', '2');
  planIconSvg.appendChild(planRect);
  const planLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  planLine1.setAttribute('x1', '3');
  planLine1.setAttribute('y1', '12');
  planLine1.setAttribute('x2', '21');
  planLine1.setAttribute('y2', '12');
  planIconSvg.appendChild(planLine1);
  const planLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  planLine2.setAttribute('x1', '12');
  planLine2.setAttribute('y1', '3');
  planLine2.setAttribute('x2', '12');
  planLine2.setAttribute('y2', '21');
  planIconSvg.appendChild(planLine2);
  floorPlanBtn.appendChild(planIconSvg);
  const planBtnContent = createElement('div', 'property-detail__tour-btn-content');
  const planBtnTitle = createElement('span', 'property-detail__tour-btn-title', 'Floor Plan');
  const planBtnSubtitle = createElement('span', 'property-detail__tour-btn-subtitle', property.floorPlanUrl ? 'View Layout' : 'Sample Plan');
  planBtnContent.appendChild(planBtnTitle);
  planBtnContent.appendChild(planBtnSubtitle);
  floorPlanBtn.appendChild(planBtnContent);
  if (!property.floorPlanUrl) {
    const sampleBadge = createElement('span', 'property-detail__tour-badge', 'Sample');
    floorPlanBtn.appendChild(sampleBadge);
  }
  floorPlanBtn.addEventListener('click', () => {
    injectFloorPlanStyles();
    openFloorPlanModal({ imageUrl: property.floorPlanUrl || '', propertyTitle: property.title });
  });
  tourActions.appendChild(floorPlanBtn);
  tourSection.appendChild(tourActions);
  mainInfo.appendChild(tourSection);

  // Description
  const descSection = createElement('div', 'property-detail__description');
  const descTitle = createElement('h3', 'property-detail__section-title', 'Description');
  const descText = createElement('p', 'property-detail__description-text', property.description);
  descSection.appendChild(descTitle);
  descSection.appendChild(descText);
  mainInfo.appendChild(descSection);

  // Features
  const featuresSection = createElement('div', 'property-detail__features');
  const featuresTitle = createElement('h3', 'property-detail__section-title', 'Features & Amenities');
  featuresSection.appendChild(featuresTitle);

  const featuresList = createElement('ul', 'property-detail__features-list');
  property.features.forEach(feature => {
    const featureItem = createElement('li', 'property-detail__feature');
    featureItem.appendChild(createSVGUse('icon-check'));
    featureItem.appendChild(document.createTextNode(feature));
    featuresList.appendChild(featureItem);
  });
  featuresSection.appendChild(featuresList);
  mainInfo.appendChild(featuresSection);

  // ─── Neighborhood Section ───────────────────────────────────────────────
  const neighborhoodSection = createElement('div', 'property-detail__neighborhood');
  const neighborhoodTitle = createElement('h3', 'property-detail__section-title', 'Neighborhood');
  neighborhoodSection.appendChild(neighborhoodTitle);

  // Walk Score Display
  if (property.neighborhood?.walkScore) {
    const walkScoreContainer = createElement('div', 'property-detail__walk-score');
    const walkScoreCircle = createElement('div', 'property-detail__walk-score-circle');

    const walkScoreValue = createElement('span', 'property-detail__walk-score-value', property.neighborhood.walkScore.toString());
    walkScoreCircle.appendChild(walkScoreValue);

    const walkScoreLabel = createElement('span', 'property-detail__walk-score-label', 'Walk Score');
    walkScoreCircle.appendChild(walkScoreLabel);

    walkScoreContainer.appendChild(walkScoreCircle);

    const walkScoreInfo = createElement('div', 'property-detail__walk-score-info');
    const walkScoreDesc = createElement('span', 'property-detail__walk-score-desc');

    // Determine walk score rating
    const score = property.neighborhood.walkScore;
    let rating = 'Walker\'s Paradise';
    if (score < 50) rating = 'Car-Dependent';
    else if (score < 70) rating = 'Somewhat Walkable';
    else if (score < 90) rating = 'Very Walkable';

    walkScoreDesc.textContent = rating;
    walkScoreInfo.appendChild(walkScoreDesc);

    if (property.neighborhood.description) {
      const neighborhoodDesc = createElement('p', 'property-detail__neighborhood-desc', property.neighborhood.description);
      walkScoreInfo.appendChild(neighborhoodDesc);
    }

    walkScoreContainer.appendChild(walkScoreInfo);
    neighborhoodSection.appendChild(walkScoreContainer);
  }

  // Nearby Amenities
  const districtName = property.location.district;
  const districtAmenities = getAmenitiesForDistrict(districtName);

  if (districtAmenities) {
    const amenitiesContainer = createElement('div', 'property-detail__amenities');
    const amenitiesSectionTitle = createElement('h4', 'property-detail__amenities-title', 'Nearby Amenities');
    amenitiesContainer.appendChild(amenitiesSectionTitle);

    const amenitiesGrid = createElement('div', 'property-detail__amenities-grid');

    // Define categories to display
    const categories: Array<{ key: keyof DistrictAmenities; icon: string; label: string }> = [
      { key: 'schools', icon: 'icon-school', label: 'Schools' },
      { key: 'restaurants', icon: 'icon-restaurant', label: 'Restaurants' },
      { key: 'shopping', icon: 'icon-shopping', label: 'Shopping' },
      { key: 'healthcare', icon: 'icon-healthcare', label: 'Healthcare' },
      { key: 'parks', icon: 'icon-park', label: 'Parks' }
    ];

    categories.forEach(category => {
      const categoryAmenities = districtAmenities[category.key];
      if (categoryAmenities && categoryAmenities.length > 0) {
        const categorySection = createElement('div', 'property-detail__amenity-category');

        const categoryHeader = createElement('div', 'property-detail__amenity-header');
        const categoryIcon = createElement('div', 'property-detail__amenity-icon');
        categoryIcon.appendChild(createSVGUse(category.icon));
        categoryHeader.appendChild(categoryIcon);

        const categoryLabel = createElement('span', 'property-detail__amenity-label', category.label);
        categoryHeader.appendChild(categoryLabel);
        categorySection.appendChild(categoryHeader);

        const amenityList = createElement('ul', 'property-detail__amenity-list');
        categoryAmenities.forEach((amenity: Amenity) => {
          const amenityItem = createElement('li', 'property-detail__amenity-item');

          const amenityName = createElement('span', 'property-detail__amenity-name', amenity.name);
          amenityItem.appendChild(amenityName);

          const amenityDistance = createElement('span', 'property-detail__amenity-distance', amenity.distance);
          amenityItem.appendChild(amenityDistance);

          amenityList.appendChild(amenityItem);
        });
        categorySection.appendChild(amenityList);

        amenitiesGrid.appendChild(categorySection);
      }
    });

    amenitiesContainer.appendChild(amenitiesGrid);
    neighborhoodSection.appendChild(amenitiesContainer);
  }

  mainInfo.appendChild(neighborhoodSection);

  contentGrid.appendChild(mainInfo);

  // ─── Right Column - Sidebar ──────────────────────────────────────────────
  const sidebar = createElement('div', 'property-detail__sidebar');

  // Agent Card
  const agentCard = createElement('div', 'property-detail__agent-card');
  const agentTitle = createElement('h3', 'property-detail__agent-title', 'Contact Agent');
  agentCard.appendChild(agentTitle);

  const agentInfo = createElement('div', 'property-detail__agent-info');
  const agentAvatar = createElement('div', 'property-detail__agent-avatar');
  const agentImg = createElement('img');
  agentImg.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fm=webp';
  agentImg.alt = 'Marcus Williams';
  agentImg.loading = 'lazy';
  agentAvatar.appendChild(agentImg);
  agentInfo.appendChild(agentAvatar);

  const agentDetails = createElement('div', 'property-detail__agent-details');
  const agentName = createElement('span', 'property-detail__agent-name', 'Marcus Williams');
  const agentRole = createElement('span', 'property-detail__agent-role', 'Senior Agent');
  agentDetails.appendChild(agentName);
  agentDetails.appendChild(agentRole);
  agentInfo.appendChild(agentDetails);
  agentCard.appendChild(agentInfo);

  const agentContact = createElement('div', 'property-detail__agent-contact');

  const phoneLink = createElement('a', 'property-detail__agent-link');
  phoneLink.href = 'tel:+9647507922138';
  phoneLink.appendChild(createSVGUse('icon-phone'));
  phoneLink.appendChild(document.createTextNode('+964 750 792 2138'));
  agentContact.appendChild(phoneLink);

  const emailLink = createElement('a', 'property-detail__agent-link');
  emailLink.href = 'mailto:contact@realhouseiq.com';
  emailLink.appendChild(createSVGUse('icon-email'));
  emailLink.appendChild(document.createTextNode('contact@realhouseiq.com'));
  agentContact.appendChild(emailLink);

  agentCard.appendChild(agentContact);

  // Contact buttons
  const agentActions = createElement('div', 'property-detail__agent-actions');

  const scheduleBtn = createElement('button', 'btn btn--primary btn--full', 'Schedule Viewing');
  scheduleBtn.addEventListener('click', () => {
    openAppointmentScheduler(property);
  });
  agentActions.appendChild(scheduleBtn);

  const callBtn = createElement('a', 'btn btn--ghost btn--full', 'Call Agent');
  callBtn.href = 'tel:+9647507922138';
  agentActions.appendChild(callBtn);

  agentCard.appendChild(agentActions);
  sidebar.appendChild(agentCard);

  // Location Card
  const locationCard = createElement('div', 'property-detail__location-card');
  const locationTitle = createElement('h3', 'property-detail__location-title', 'Location');
  locationCard.appendChild(locationTitle);

  const addressInfo = createElement('div', 'property-detail__address-info');

  const addressLine = createElement('p', 'property-detail__address-line');
  addressLine.appendChild(createSVGUse('icon-location'));
  addressLine.appendChild(document.createTextNode(property.location.address));
  addressInfo.appendChild(addressLine);

  const cityLine = createElement('p', 'property-detail__city-line', `${property.location.district}, ${property.location.city}`);
  addressInfo.appendChild(cityLine);

  const countryLine = createElement('p', 'property-detail__country-line', property.location.country);
  addressInfo.appendChild(countryLine);

  locationCard.appendChild(addressInfo);

  // Location Map
  if (property.location.coordinates) {
    const mapSection = createElement('div', 'property-detail__map-section');
    const mapDiv = createElement('div', 'property-location-map');
    mapDiv.id = 'property-detail-map';
    mapSection.appendChild(mapDiv);
    locationCard.appendChild(mapSection);

    // Initialize map after DOM is ready
    setTimeout(() => {
      initPropertyDetailMap('property-detail-map', property);
    }, 100);
  }

  // Nearby Landmarks
  if (property.location.nearbyLandmarks && property.location.nearbyLandmarks.length > 0) {
    const landmarksSection = createElement('div', 'property-landmarks');
    const landmarksTitle = createElement('h4', 'property-landmarks__title');
    landmarksTitle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> Nearby Landmarks';
    landmarksSection.appendChild(landmarksTitle);

    const landmarksList = createElement('div', 'property-landmarks__list');
    property.location.nearbyLandmarks.forEach(landmark => {
      const landmarkItem = createElement('div', 'property-landmarks__item', landmark);
      landmarksList.appendChild(landmarkItem);
    });
    landmarksSection.appendChild(landmarksList);
    locationCard.appendChild(landmarksSection);
  }

  sidebar.appendChild(locationCard);

  // Print/PDF Actions Card
  const printCard = createElement('div', 'property-detail__print-card');
  const printCardTitle = createElement('h3', 'property-detail__print-title', 'Save & Share');
  printCard.appendChild(printCardTitle);
  const printActions = createElement('div', 'property-detail__print-actions');
  // Print Button
  const printBtn = createElement('button', 'btn btn--ghost btn--full print-btn no-print');
  const printIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  printIcon.setAttribute('class', 'btn__icon');
  printIcon.setAttribute('viewBox', '0 0 24 24');
  printIcon.setAttribute('width', '18');
  printIcon.setAttribute('height', '18');
  const printPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  printPath.setAttribute('fill', 'currentColor');
  printPath.setAttribute('d', 'M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z');
  printIcon.appendChild(printPath);
  printBtn.appendChild(printIcon);
  printBtn.appendChild(document.createTextNode(' Print'));
  printBtn.addEventListener('click', () => { window.print(); });
  printActions.appendChild(printBtn);
  // Save PDF Button
  const pdfBtn = createElement('button', 'btn btn--primary btn--full pdf-btn no-print');
  const pdfIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  pdfIcon.setAttribute('class', 'btn__icon');
  pdfIcon.setAttribute('viewBox', '0 0 24 24');
  pdfIcon.setAttribute('width', '18');
  pdfIcon.setAttribute('height', '18');
  const pdfPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pdfPath.setAttribute('fill', 'currentColor');
  pdfPath.setAttribute('d', 'M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z');
  pdfIcon.appendChild(pdfPath);
  pdfBtn.appendChild(pdfIcon);
  pdfBtn.appendChild(document.createTextNode(' Save PDF'));
  pdfBtn.addEventListener('click', () => {
    const originalTitle = document.title;
    document.title = `${property.title} - Real House Property Listing`;
    window.print();
    document.title = originalTitle;
  });
  printActions.appendChild(pdfBtn);
  printCard.appendChild(printActions);
  const printHint = createElement('p', 'property-detail__print-hint', 'Select "Save as PDF" in print dialog');
  printCard.appendChild(printHint);
  sidebar.appendChild(printCard);
  // QR Code Section (for print view)
  const qrSection = createElement('div', 'property-detail__qr-section print-only');
  const qrCodeTitle = createElement('h4', 'property-detail__qr-title', 'View Online');
  qrSection.appendChild(qrCodeTitle);
  const qrCode = createElement('div', 'property-detail__qr-code');
  const qrImg = createElement('img', 'property-detail__qr-img');
  const propertyUrl = `https://realhouseiq.com/properties/${property.id}`;
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(propertyUrl)}&bgcolor=ffffff&color=0a0a0f`;
  qrImg.alt = 'QR Code to view this property online';
  qrImg.width = 120;
  qrImg.height = 120;
  qrCode.appendChild(qrImg);
  qrSection.appendChild(qrCode);
  const qrUrl = createElement('p', 'property-detail__qr-url', 'realhouseiq.com');
  qrSection.appendChild(qrUrl);
  sidebar.appendChild(qrSection);

  // ─── Social Share Section ────────────────────────────────────────────────
  const shareSection = createElement('div', 'property-detail__share-section');
  const shareSectionTitle = createElement('h4', 'property-detail__share-title', 'Share Property');
  shareSection.appendChild(shareSectionTitle);
  const shareButtons = createPropertyShareButtons(property);
  shareSection.appendChild(shareButtons);
  sidebar.appendChild(shareSection);

  contentGrid.appendChild(sidebar);
  contentContainer.appendChild(contentGrid);
  content.appendChild(contentContainer);
  page.appendChild(content);

  // Print Header (only visible in print)
  const printHeader = createElement('div', 'print-header print-only');
  printHeader.innerHTML = `<div class="print-header__logo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" fill="none" width="40" height="48"><path d="M38 108 C18 95, 12 70, 20 50 C28 30, 42 20, 50 10" stroke="#C9A84C" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M62 108 C82 95, 88 70, 80 50 C72 30, 58 20, 50 10" stroke="#C9A84C" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M38 100 L38 65 C38 55, 45 45, 50 38" stroke="#C9A84C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 100 L50 25 L62 40 L62 100" stroke="#C9A84C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="print-header__brand">Real House</span></div><div class="print-header__contact"><span>realhouseiq.com</span><span>+964 750 792 2138</span><span>info@realhouseiq.com</span></div>`;
  page.insertBefore(printHeader, page.firstChild);

  // Print Footer (only visible in print)
  const printFooter = createElement('div', 'print-footer print-only');
  printFooter.innerHTML = `<div class="print-footer__left"><span class="print-footer__brand">Real House - Luxury Real Estate</span><span class="print-footer__location">Dream City, Erbil, Kurdistan Region, Iraq</span></div><div class="print-footer__right"><span>Property ID: ${property.id}</span><span>Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>`;
  page.appendChild(printFooter);

  // ─── Related Properties Section ─────────────────────────────────────────
  const relatedProperties = getRelatedProperties(property, 4);
  if (relatedProperties.length > 0) {
    const relatedSection = createRelatedPropertiesSection(relatedProperties);
    page.appendChild(relatedSection);
  }

  // ─── Cross-Content Links (Projects & Blog) ─────────────────────────────
  const crossLinks = createPropertyCrossLinks(property);
  if (crossLinks.children.length > 0) {
    page.appendChild(crossLinks);
  }

  // ─── Internal CTA ─────────────────────────────────────────────────────────
  const ctaSection = createInternalCTA(
    'Find More Properties Like This',
    'Discover similar properties in our curated collection, or explore new development projects in Erbil.',
    { text: 'Browse All Properties', url: '/properties' },
    { text: 'View Projects', url: '/projects' }
  );
  page.appendChild(ctaSection);

  // ─── Back Link ───────────────────────────────────────────────────────────
  const backSection = createElement('section', 'property-detail__back');
  const backContainer = createElement('div', 'container');
  const backLink = createElement('a', 'property-detail__back-link', 'Back to Properties');
  backLink.href = '/properties';
  backLink.setAttribute('data-route', '');
  const backIcon = createSVGUse('icon-arrow-left');
  backLink.insertBefore(backIcon, backLink.firstChild);
  backContainer.appendChild(backLink);
  backSection.appendChild(backContainer);
  page.appendChild(backSection);

  fragment.appendChild(page);
  return fragment;
}

// ─── Privacy Policy Page ──────────────────────────────────────────────────
export function renderPrivacyPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'privacy-page');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'privacy-page__header');
  const title = createElement('h1', 'privacy-page__title', 'Privacy Policy');
  const lastUpdated = createElement('p', 'privacy-page__date', 'Last Updated: February 2026');
  header.appendChild(title);
  header.appendChild(lastUpdated);
  container.appendChild(header);

  // Content
  const content = createElement('div', 'privacy-page__content');

  // Introduction
  const intro = createElement('section', 'privacy-page__section');
  const introTitle = createElement('h2', undefined, 'Introduction');
  const introP1 = createElement('p', undefined, 'Real House ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.');
  const introP2 = createElement('p', undefined, 'Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.');
  intro.appendChild(introTitle);
  intro.appendChild(introP1);
  intro.appendChild(introP2);
  content.appendChild(intro);

  // Information We Collect
  const collection = createElement('section', 'privacy-page__section');
  const collectionTitle = createElement('h2', undefined, 'Information We Collect');

  const personalInfo = createElement('h3', undefined, 'Personal Information');
  const personalP = createElement('p', undefined, 'We may collect personal information that you voluntarily provide to us when you:');
  const personalList = createElement('ul');
  const personalItems = [
    'Register on our website or request property information',
    'Schedule property viewings or consultations',
    'Subscribe to our newsletter or marketing communications',
    'Contact us through our website, email, or phone',
    'Apply for financing or mortgage pre-approval assistance'
  ];
  personalItems.forEach(item => {
    const li = createElement('li', undefined, item);
    personalList.appendChild(li);
  });

  const autoInfo = createElement('h3', undefined, 'Automatically Collected Information');
  const autoP = createElement('p', undefined, 'When you visit our website, we automatically collect certain information about your device, including:');
  const autoList = createElement('ul');
  const autoItems = [
    'IP address and browser type',
    'Operating system and device information',
    'Pages visited and time spent on our website',
    'Referring website addresses',
    'Property search history and preferences'
  ];
  autoItems.forEach(item => {
    const li = createElement('li', undefined, item);
    autoList.appendChild(li);
  });

  collection.appendChild(collectionTitle);
  collection.appendChild(personalInfo);
  collection.appendChild(personalP);
  collection.appendChild(personalList);
  collection.appendChild(autoInfo);
  collection.appendChild(autoP);
  collection.appendChild(autoList);
  content.appendChild(collection);

  // How We Use Your Information
  const usage = createElement('section', 'privacy-page__section');
  const usageTitle = createElement('h2', undefined, 'How We Use Your Information');
  const usageP = createElement('p', undefined, 'We use the information we collect to:');
  const usageList = createElement('ul');
  const usageItems = [
    'Provide, operate, and maintain our services',
    'Process property inquiries and schedule viewings',
    'Send you relevant property listings and market updates',
    'Respond to your comments, questions, and requests',
    'Improve our website and customer service',
    'Send you marketing and promotional communications (with your consent)',
    'Protect against fraudulent or illegal activity'
  ];
  usageItems.forEach(item => {
    const li = createElement('li', undefined, item);
    usageList.appendChild(li);
  });
  usage.appendChild(usageTitle);
  usage.appendChild(usageP);
  usage.appendChild(usageList);
  content.appendChild(usage);

  // Cookies
  const cookies = createElement('section', 'privacy-page__section');
  const cookiesTitle = createElement('h2', undefined, 'Cookies and Tracking Technologies');
  const cookiesP1 = createElement('p', undefined, 'We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.');
  const cookiesP2 = createElement('p', undefined, 'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.');
  const cookiesTypes = createElement('h3', undefined, 'Types of Cookies We Use:');
  const cookiesList = createElement('ul');
  const cookiesItems = [
    'Essential Cookies: Required for the website to function properly',
    'Analytics Cookies: Help us understand how visitors interact with our website',
    'Marketing Cookies: Used to track visitors across websites for advertising purposes',
    'Preference Cookies: Remember your settings and preferences'
  ];
  cookiesItems.forEach(item => {
    const li = createElement('li', undefined, item);
    cookiesList.appendChild(li);
  });
  cookies.appendChild(cookiesTitle);
  cookies.appendChild(cookiesP1);
  cookies.appendChild(cookiesP2);
  cookies.appendChild(cookiesTypes);
  cookies.appendChild(cookiesList);
  content.appendChild(cookies);

  // Third Party Disclosure
  const thirdParty = createElement('section', 'privacy-page__section');
  const thirdPartyTitle = createElement('h2', undefined, 'Third-Party Disclosure');
  const thirdPartyP1 = createElement('p', undefined, 'We may share your information with third parties in the following circumstances:');
  const thirdPartyList = createElement('ul');
  const thirdPartyItems = [
    'With property owners, sellers, or their agents when you inquire about a property',
    'With mortgage lenders and financial institutions when you request financing assistance',
    'With service providers who assist us in operating our website and services',
    'With legal authorities when required by law or to protect our rights',
    'In connection with a merger, acquisition, or sale of assets'
  ];
  thirdPartyItems.forEach(item => {
    const li = createElement('li', undefined, item);
    thirdPartyList.appendChild(li);
  });
  const thirdPartyP2 = createElement('p', undefined, 'We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties for marketing purposes without your explicit consent.');
  thirdParty.appendChild(thirdPartyTitle);
  thirdParty.appendChild(thirdPartyP1);
  thirdParty.appendChild(thirdPartyList);
  thirdParty.appendChild(thirdPartyP2);
  content.appendChild(thirdParty);

  // Data Security
  const security = createElement('section', 'privacy-page__section');
  const securityTitle = createElement('h2', undefined, 'Data Security');
  const securityP = createElement('p', undefined, 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.');
  security.appendChild(securityTitle);
  security.appendChild(securityP);
  content.appendChild(security);

  // Your Rights
  const rights = createElement('section', 'privacy-page__section');
  const rightsTitle = createElement('h2', undefined, 'Your Privacy Rights');
  const rightsP = createElement('p', undefined, 'Depending on your location, you may have the following rights regarding your personal information:');
  const rightsList = createElement('ul');
  const rightsItems = [
    'Right to access and obtain a copy of your personal data',
    'Right to rectify inaccurate or incomplete information',
    'Right to erasure ("right to be forgotten")',
    'Right to restrict or object to processing',
    'Right to data portability',
    'Right to withdraw consent at any time'
  ];
  rightsItems.forEach(item => {
    const li = createElement('li', undefined, item);
    rightsList.appendChild(li);
  });
  const rightsP2 = createElement('p', undefined, 'To exercise any of these rights, please contact us using the information provided below.');
  rights.appendChild(rightsTitle);
  rights.appendChild(rightsP);
  rights.appendChild(rightsList);
  rights.appendChild(rightsP2);
  content.appendChild(rights);

  // Contact
  const contact = createElement('section', 'privacy-page__section');
  const contactTitle = createElement('h2', undefined, 'Contact Us');
  const contactP = createElement('p', undefined, 'If you have any questions about this Privacy Policy or our data practices, please contact us at:');
  const contactInfo = createElement('div', 'privacy-page__contact');
  const contactEmail = createElement('p');
  contactEmail.textContent = 'Email: ';
  const emailLink = createElement('a');
  emailLink.href = 'mailto:privacy@realhouseiq.com';
  emailLink.textContent = 'privacy@realhouseiq.com';
  contactEmail.appendChild(emailLink);
  const contactPhone = createElement('p', undefined, 'Phone: +964 750 792 2138');
  const contactAddress = createElement('p', undefined, 'Address: Dream City, Erbil, Kurdistan Region, Iraq');
  contactInfo.appendChild(contactEmail);
  contactInfo.appendChild(contactPhone);
  contactInfo.appendChild(contactAddress);
  contact.appendChild(contactTitle);
  contact.appendChild(contactP);
  contact.appendChild(contactInfo);
  content.appendChild(contact);

  container.appendChild(content);
  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── Terms of Service Page ────────────────────────────────────────────────
export function renderTermsPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'terms-page');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'terms-page__header');
  const title = createElement('h1', 'terms-page__title', 'Terms of Service');
  const lastUpdated = createElement('p', 'terms-page__date', 'Last Updated: February 2026');
  header.appendChild(title);
  header.appendChild(lastUpdated);
  container.appendChild(header);

  // Content
  const content = createElement('div', 'terms-page__content');

  // Agreement
  const agreement = createElement('section', 'terms-page__section');
  const agreementTitle = createElement('h2', undefined, 'Agreement to Terms');
  const agreementP1 = createElement('p', undefined, 'By accessing or using the Real House website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.');
  const agreementP2 = createElement('p', undefined, 'These Terms of Service apply to all visitors, users, and others who access or use our services. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting.');
  agreement.appendChild(agreementTitle);
  agreement.appendChild(agreementP1);
  agreement.appendChild(agreementP2);
  content.appendChild(agreement);

  // Use of Service
  const useService = createElement('section', 'terms-page__section');
  const useServiceTitle = createElement('h2', undefined, 'Use of Service');
  const useServiceP1 = createElement('p', undefined, 'Our services are intended to provide information about luxury real estate properties and connect potential buyers with property listings. You agree to use our services only for lawful purposes and in accordance with these Terms.');
  const useServiceP2 = createElement('p', undefined, 'You agree not to:');
  const useServiceList = createElement('ul');
  const useServiceItems = [
    'Use the service for any unlawful purpose or in violation of any applicable laws',
    'Attempt to gain unauthorized access to any portion of the service or any systems',
    'Interfere with or disrupt the service or servers connected to the service',
    'Use any robot, spider, or other automatic device to access the service',
    'Transmit any viruses, worms, or other malicious code',
    'Collect or harvest any personally identifiable information from other users',
    'Impersonate any person or entity or misrepresent your affiliation'
  ];
  useServiceItems.forEach(item => {
    const li = createElement('li', undefined, item);
    useServiceList.appendChild(li);
  });
  useService.appendChild(useServiceTitle);
  useService.appendChild(useServiceP1);
  useService.appendChild(useServiceP2);
  useService.appendChild(useServiceList);
  content.appendChild(useService);

  // Property Listings
  const listings = createElement('section', 'terms-page__section');
  const listingsTitle = createElement('h2', undefined, 'Property Listings and Information');
  const listingsP1 = createElement('p', undefined, 'All property information, including but not limited to prices, availability, features, and descriptions, is provided for informational purposes only. While we strive to ensure accuracy, we do not guarantee that all information is complete, accurate, or current.');
  const listingsP2 = createElement('p', undefined, 'Property listings may be subject to change without notice. Prices listed do not include closing costs, taxes, or other fees that may be applicable. All property purchases are subject to separate purchase agreements and due diligence.');
  listings.appendChild(listingsTitle);
  listings.appendChild(listingsP1);
  listings.appendChild(listingsP2);
  content.appendChild(listings);

  // Intellectual Property
  const ip = createElement('section', 'terms-page__section');
  const ipTitle = createElement('h2', undefined, 'Intellectual Property Rights');
  const ipP1 = createElement('p', undefined, 'The Real House website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by Real House, its licensors, or other providers and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.');
  const ipP2 = createElement('p', undefined, 'You may not:');
  const ipList = createElement('ul');
  const ipItems = [
    'Copy, reproduce, or distribute any content without express written permission',
    'Modify, create derivative works based on, or reverse engineer any content',
    'Use any content for commercial purposes without authorization',
    'Remove any copyright or proprietary notices from materials',
    'Transfer content to another person or "mirror" content on any other server'
  ];
  ipItems.forEach(item => {
    const li = createElement('li', undefined, item);
    ipList.appendChild(li);
  });
  ip.appendChild(ipTitle);
  ip.appendChild(ipP1);
  ip.appendChild(ipP2);
  ip.appendChild(ipList);
  content.appendChild(ip);

  // User Accounts
  const accounts = createElement('section', 'terms-page__section');
  const accountsTitle = createElement('h2', undefined, 'User Accounts');
  const accountsP1 = createElement('p', undefined, 'When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.');
  const accountsP2 = createElement('p', undefined, 'You agree to immediately notify us of any unauthorized use of your account or any other security breach. We will not be liable for any loss or damage arising from your failure to comply with this section.');
  accounts.appendChild(accountsTitle);
  accounts.appendChild(accountsP1);
  accounts.appendChild(accountsP2);
  content.appendChild(accounts);

  // Disclaimers
  const disclaimers = createElement('section', 'terms-page__section');
  const disclaimersTitle = createElement('h2', undefined, 'Disclaimers');
  const disclaimersP1 = createElement('p', undefined, 'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.');
  const disclaimersP2 = createElement('p', undefined, 'Real House does not warrant that the service will be uninterrupted, timely, secure, or error-free. We do not warrant the accuracy or reliability of any information obtained through the service.');
  const disclaimersP3 = createElement('p', undefined, 'Real House is not a licensed real estate broker or agent in all jurisdictions and may refer you to licensed professionals for certain transactions.');
  disclaimers.appendChild(disclaimersTitle);
  disclaimers.appendChild(disclaimersP1);
  disclaimers.appendChild(disclaimersP2);
  disclaimers.appendChild(disclaimersP3);
  content.appendChild(disclaimers);

  // Limitation of Liability
  const liability = createElement('section', 'terms-page__section');
  const liabilityTitle = createElement('h2', undefined, 'Limitation of Liability');
  const liabilityP1 = createElement('p', undefined, 'TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, REAL HOUSE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.');
  const liabilityP2 = createElement('p', undefined, 'In no event shall our total liability exceed the amount you have paid to us in the twelve (12) months prior to the event giving rise to the liability, or one hundred dollars ($100) if you have not made any payments.');
  liability.appendChild(liabilityTitle);
  liability.appendChild(liabilityP1);
  liability.appendChild(liabilityP2);
  content.appendChild(liability);

  // Indemnification
  const indemnification = createElement('section', 'terms-page__section');
  const indemnificationTitle = createElement('h2', undefined, 'Indemnification');
  const indemnificationP = createElement('p', undefined, 'You agree to defend, indemnify, and hold harmless Real House and its officers, directors, employees, contractors, agents, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys\' fees) arising out of or relating to your violation of these Terms or your use of the service.');
  indemnification.appendChild(indemnificationTitle);
  indemnification.appendChild(indemnificationP);
  content.appendChild(indemnification);

  // Governing Law
  const governing = createElement('section', 'terms-page__section');
  const governingTitle = createElement('h2', undefined, 'Governing Law');
  const governingP = createElement('p', undefined, 'These Terms shall be governed by and construed in accordance with the laws of the Kurdistan Region of Iraq. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Erbil, Kurdistan Region, Iraq.');
  governing.appendChild(governingTitle);
  governing.appendChild(governingP);
  content.appendChild(governing);

  // Changes to Terms
  const changes = createElement('section', 'terms-page__section');
  const changesTitle = createElement('h2', undefined, 'Changes to Terms');
  const changesP = createElement('p', undefined, 'We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after revisions become effective, you agree to be bound by the revised terms.');
  changes.appendChild(changesTitle);
  changes.appendChild(changesP);
  content.appendChild(changes);

  // Contact
  const contact = createElement('section', 'terms-page__section');
  const contactTitle = createElement('h2', undefined, 'Contact Us');
  const contactP = createElement('p', undefined, 'If you have any questions about these Terms of Service, please contact us at:');
  const contactInfo = createElement('div', 'terms-page__contact');
  const contactEmail = createElement('p');
  contactEmail.textContent = 'Email: ';
  const emailLink = createElement('a');
  emailLink.href = 'mailto:legal@realhouseiq.com';
  emailLink.textContent = 'legal@realhouseiq.com';
  contactEmail.appendChild(emailLink);
  const contactPhone = createElement('p', undefined, 'Phone: +964 750 792 2138');
  const contactAddress = createElement('p', undefined, 'Address: Dream City, Erbil, Kurdistan Region, Iraq');
  contactInfo.appendChild(contactEmail);
  contactInfo.appendChild(contactPhone);
  contactInfo.appendChild(contactAddress);
  contact.appendChild(contactTitle);
  contact.appendChild(contactP);
  contact.appendChild(contactInfo);
  content.appendChild(contact);

  container.appendChild(content);
  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── FAQ Page ─────────────────────────────────────────────────────────────
// Uses comprehensive FAQ page with 60+ questions organized by category
export function renderFAQPage(): DocumentFragment {
  return renderComprehensiveFAQPage();
}

// ─── Favorites Page ───────────────────────────────────────────────────────
export function renderFavoritesPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Main section for favorites
  const page = createElement('section', 'favorites-page');
  page.setAttribute('aria-labelledby', 'favorites-title');
  const container = createElement('div', 'container');

  // Header with h1
  const header = createElement('header', 'favorites-page__header');
  const title = createElement('h1', 'favorites-page__title', 'My Saved Properties');
  title.id = 'favorites-title';

  const favoriteIds = getFavorites();
  const subtitle = createElement('p', 'favorites-page__subtitle');
  subtitle.textContent = favoriteIds.length === 0
    ? 'You haven\'t saved any properties yet.'
    : `You have ${favoriteIds.length} saved ${favoriteIds.length === 1 ? 'property' : 'properties'}.`;

  header.appendChild(title);
  header.appendChild(subtitle);
  container.appendChild(header);

  // If there are favorites, show clear all button and grid
  if (favoriteIds.length > 0) {
    // Actions row
    const actions = createElement('div', 'favorites-page__actions');

    const clearAllBtn = createElement('button', 'btn btn--ghost', 'Clear All Favorites');
    clearAllBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to remove all saved properties?')) {
        clearFavorites();
        // Re-render the page
        const app = document.getElementById('app');
        if (app) {
          while (app.firstChild) {
            app.removeChild(app.firstChild);
          }
          app.appendChild(renderFavoritesPage());
        }
        updateFavoritesBadge();
      }
    });
    actions.appendChild(clearAllBtn);
    container.appendChild(actions);

    // Grid of favorite properties
    const grid = createElement('div', 'favorites-page__grid');
    grid.id = 'favorites-grid';

    favoriteIds.forEach(id => {
      const property = getPropertyById(id);
      if (property) {
        grid.appendChild(createPropertyCard(property));
      }
    });

    container.appendChild(grid);
  } else {
    // Empty state
    const emptyState = createElement('div', 'favorites-page__empty');

    const emptyIcon = createElement('div', 'favorites-page__empty-icon');
    emptyIcon.appendChild(createSVGUse('icon-heart-outline'));
    emptyState.appendChild(emptyIcon);

    const emptyTitle = createElement('h3', 'favorites-page__empty-title', 'No Favorites Yet');
    emptyState.appendChild(emptyTitle);

    const emptyText = createElement('p', 'favorites-page__empty-text',
      'Start exploring properties and save your favorites by clicking the heart icon on any property card.');
    emptyState.appendChild(emptyText);

    const browseBtn = createElement('a', 'btn btn--primary', 'Browse Properties');
    browseBtn.href = '/properties';
    browseBtn.setAttribute('data-route', '');
    emptyState.appendChild(browseBtn);

    container.appendChild(emptyState);
  }

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── 404 Not Found Page ───────────────────────────────────────────────────
export function render404Page(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Use article for self-contained error page
  const page = createElement('article', 'error-page');
  page.setAttribute('role', 'alert');
  const container = createElement('div', 'container');

  const content = createElement('div', 'error-page__content');

  // Only ONE h1 per page - contains both error code and message
  const heading = createElement('h1', 'error-page__heading');

  // Large 404 number as part of h1
  const errorCode = createElement('span', 'error-page__code', '404');
  errorCode.setAttribute('aria-hidden', 'true');
  heading.appendChild(errorCode);

  // Screen reader text
  const srText = createElement('span', 'visually-hidden', 'Error 404: ');
  heading.appendChild(srText);

  // Title as part of h1
  const title = createElement('span', 'error-page__title', 'Page Not Found');
  heading.appendChild(title);
  content.appendChild(heading);

  // Description
  const description = createElement('p', 'error-page__description',
    'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.');
  content.appendChild(description);

  // Action buttons
  const actions = createElement('nav', 'error-page__actions');
  actions.setAttribute('aria-label', 'Error page navigation');

  const homeBtn = createElement('a', 'btn btn--primary', 'Return to homepage');
  homeBtn.href = '/';
  homeBtn.setAttribute('data-route', '');
  actions.appendChild(homeBtn);

  const propertiesBtn = createElement('a', 'btn btn--outline', 'Browse properties');
  propertiesBtn.href = '/properties';
  propertiesBtn.setAttribute('data-route', '');
  actions.appendChild(propertiesBtn);

  content.appendChild(actions);

  // Contact info
  const contactInfo = createElement('p', 'error-page__contact');
  contactInfo.textContent = 'Need help? ';
  const contactLink = createElement('a');
  contactLink.href = '/contact';
  contactLink.setAttribute('data-route', '');
  contactLink.textContent = 'Contact our support team';
  contactInfo.appendChild(contactLink);
  content.appendChild(contactInfo);

  container.appendChild(content);
  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}
