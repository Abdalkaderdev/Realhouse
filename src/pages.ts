// ═══════════════════════════════════════════════════════════════════════════
// Page Renderers for Real House
// Using Safe DOM Methods
// ═══════════════════════════════════════════════════════════════════════════

import { properties, featuredProperties, getDisplayPrice, getPropertyById, formatPrice, type Property } from './data/properties';
import { testimonials } from './data/testimonials';
import { agents, trustBadges, enhancedStats, featuredInMedia, partnerLogos } from './data/agents';
import { projects, getProjectById, formatPriceRange, type Project, type ProjectStatus } from './data/projects';
import { submitInquiry } from './services/api';
import { isFavorite, toggleFavorite, getFavorites, clearFavorites, updateFavoriteButton, updateFavoritesBadge } from './utils/favorites';
import { createCompareButton, initComparisonBar, updateComparisonBar } from './comparison';
import { getAmenitiesForDistrict, getCategoryIcon, getCategoryLabel, type Amenity, type DistrictAmenities } from './data/amenities';
import { openAppointmentScheduler } from './components/appointment-scheduler';
import { openVirtualTourModal, injectVirtualTourStyles } from './components/virtual-tour-modal';
import { openFloorPlanModal, injectFloorPlanStyles } from './components/floor-plan-modal';
import { initPropertiesMap, updateMapMarkers, initPropertyDetailMap } from './components/property-map';
export { renderComparisonPage } from './comparison';

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
  district: 'All'
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
    district: params.get('district') || 'All'
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
         state.district !== 'All';
}

function hasAdvancedFiltersActive(state: FilterState): boolean {
  const currentYear = new Date().getFullYear();
  return state.minArea > 0 ||
         state.maxArea < 1000 ||
         state.badges.length > 0 ||
         state.minYearBuilt > 2000 ||
         state.maxYearBuilt < currentYear ||
         state.district !== 'All';
}

function countActiveAdvancedFilters(state: FilterState): number {
  const currentYear = new Date().getFullYear();
  let count = 0;
  if (state.minArea > 0 || state.maxArea < 1000) count++;
  if (state.badges.length > 0) count++;
  if (state.minYearBuilt > 2000 || state.maxYearBuilt < currentYear) count++;
  if (state.district !== 'All') count++;
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
  const card = createElement('article', 'property-card');
  card.setAttribute('data-id', property.id);

  // Media section
  const media = createElement('div', 'property-card__media');

  const img = createElement('img', 'property-card__image');
  img.src = property.images[0];
  // Descriptive alt text for accessibility
  img.alt = `${property.type} - ${property.title} in ${property.location.district}, ${property.location.city}. ${property.specs.beds} bedrooms, ${property.specs.baths} bathrooms, ${property.specs.sqm.toLocaleString()} square meters.`;
  img.loading = 'lazy';
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
  content.appendChild(type);

  const title = createElement('h3', 'property-card__title', property.title);
  content.appendChild(title);

  const location = createElement('p', 'property-card__location');
  location.appendChild(createSVGUse('icon-location'));
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
  const footer = createElement('div', 'property-card__footer');

  const price = createElement('span', 'property-card__price', getDisplayPrice(property));
  footer.appendChild(price);

  const viewBtn = createElement('a', 'btn btn--ghost btn--sm', 'View');
  viewBtn.href = `/properties/${property.id}`;
  viewBtn.setAttribute('data-route', '');
  footer.appendChild(viewBtn);

  content.appendChild(footer);
  card.appendChild(content);

  return card;
}

// ─── Home Page ────────────────────────────────────────────────────────────
export function renderHomePage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Hero Section
  const hero = createElement('section', 'hero');
  hero.id = 'hero';

  // YouTube Video Background
  const videoBackground = createElement('div', 'hero__video-background');
  const videoIframe = document.createElement('iframe');
  videoIframe.src = 'https://www.youtube.com/embed/N2nROpXXG88?autoplay=1&mute=1&loop=1&playlist=N2nROpXXG88&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=0&end=60';
  videoIframe.className = 'hero__video-iframe';
  videoIframe.setAttribute('frameborder', '0');
  videoIframe.setAttribute('allow', 'autoplay; encrypted-media');
  videoIframe.setAttribute('allowfullscreen', '');
  videoIframe.setAttribute('loading', 'lazy');
  videoBackground.appendChild(videoIframe);
  hero.appendChild(videoBackground);

  // Video Overlay for text readability
  const videoOverlay = createElement('div', 'hero__video-overlay');
  hero.appendChild(videoOverlay);

  const heroContent = createElement('div', 'hero__content container');

  // Headline
  const headline = createElement('h1', 'hero__headline', 'Find Your Dream Home');
  heroContent.appendChild(headline);

  // Subline
  const subline = createElement('p', 'hero__subline', 'What makes us different is trust.');
  heroContent.appendChild(subline);

  // CTA
  const cta = createElement('div', 'hero__cta');
  const primaryBtn = createElement('a', 'btn btn--primary btn--large', 'View Properties');
  primaryBtn.href = '/properties';
  primaryBtn.setAttribute('data-route', '');
  cta.appendChild(primaryBtn);
  const consultationBtn = createElement('a', 'btn btn--ghost btn--large', 'Schedule Free Consultation');
  consultationBtn.href = '/contact';
  consultationBtn.setAttribute('data-route', '');
  cta.appendChild(consultationBtn);
  heroContent.appendChild(cta);

  hero.appendChild(heroContent);
  fragment.appendChild(hero);

  // Trust Badges Section
  const trustSection = createElement('section', 'trust-badges');
  const trustContainer = createElement('div', 'container');
  const trustGrid = createElement('div', 'trust-badges__grid');

  trustBadges.forEach(badge => {
    const badgeEl = createElement('div', 'trust-badges__item');
    const iconWrapper = createElement('div', 'trust-badges__icon');
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
  const statsContainer = createElement('div', 'container');
  const statsGrid = createElement('div', 'stats__grid');

  const statsData = [
    { number: 2400, suffix: '+', label: 'Properties Sold' },
    { number: 98, suffix: '%', label: 'Client Satisfaction' },
    { number: 24, suffix: '+', label: 'Years Experience' },
    { number: 15, suffix: '', label: 'Global Markets' }
  ];

  statsData.forEach(stat => {
    const item = createElement('div', 'stats__item');
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
  const featuredContainer = createElement('div', 'container');

  const featuredHeader = createElement('div', 'featured__header');
  const featuredTitle = createElement('h2', 'featured__title');
  featuredTitle.textContent = 'Featured ';
  const em = createElement('em', undefined, 'Properties');
  featuredTitle.appendChild(em);
  featuredHeader.appendChild(featuredTitle);

  const viewAllLink = createElement('a', 'featured__link', 'View All');
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

    // Background
    const bg = createElement('div', 'showcase-panel__bg');
    const bgImg = createElement('img');
    bgImg.src = property.images[0];
    bgImg.alt = property.title;
    bgImg.loading = index === 0 ? 'eager' : 'lazy';
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
  processTitle.appendChild(document.createTextNode(' Experience'));
  processHeader.appendChild(processTitle);

  const processSubtitle = createElement('p', 'process__subtitle', 'Our white-glove service ensures a seamless journey from discovery to acquisition.');
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
  testimonialsTitle.textContent = 'What Our ';
  const emTestimonials = createElement('em', undefined, 'Clients');
  testimonialsTitle.appendChild(emTestimonials);
  testimonialsTitle.appendChild(document.createTextNode(' Say'));
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

    const avatar = createElement('img', 'testimonials__avatar');
    avatar.src = testimonial.image;
    avatar.alt = testimonial.name;
    avatar.loading = 'lazy';
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
  testimonialsSection.appendChild(testimonialsContainer);
  fragment.appendChild(testimonialsSection);

  // Agent Showcase
  const agentSection = createElement('section', 'agent-showcase');
  const agentContainer = createElement('div', 'container');
  const agentHeader = createElement('div', 'agent-showcase__header');
  const agentTitleEl = createElement('h2', 'agent-showcase__title');
  agentTitleEl.textContent = 'Meet Our ';
  agentTitleEl.appendChild(createElement('em', undefined, 'Expert'));
  agentTitleEl.appendChild(document.createTextNode(' Team'));
  agentHeader.appendChild(agentTitleEl);
  agentHeader.appendChild(createElement('p', 'agent-showcase__subtitle', 'Dedicated professionals committed to finding your perfect property.'));
  agentContainer.appendChild(agentHeader);
  const agentGrid = createElement('div', 'agent-showcase__grid');
  agents.forEach(agentData => {
    const agentCard = createElement('div', 'agent-showcase__card');
    const imageWrapper = createElement('div', 'agent-showcase__image');
    const agentImg = createElement('img');
    agentImg.src = agentData.image;
    agentImg.alt = agentData.name;
    agentImg.loading = 'lazy';
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
  const emCta = createElement('em', undefined, 'Dream Home');
  ctaTitle.appendChild(emCta);
  ctaTitle.appendChild(document.createTextNode('?'));
  ctaContainer.appendChild(ctaTitle);

  const ctaBtn = createElement('a', 'btn btn--primary btn--large', 'Schedule a Consultation');
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

  // Track view mode and map instance
  let currentViewMode: 'list' | 'map' = 'list';
  let mapInstance: ReturnType<typeof initPropertiesMap> = null;

  const page = createElement('div', 'properties-page');
  const container = createElement('div', 'container');

  // Header with view toggle
  const header = createElement('div', 'properties-page__header');
  const headerContent = createElement('div', 'properties-page__header-content');
  const title = createElement('h1', 'properties-page__title', 'Our Properties');
  const subtitle = createElement('p', 'properties-page__subtitle', 'Discover exceptional homes in the world\'s most desirable locations.');
  headerContent.appendChild(title);
  headerContent.appendChild(subtitle);
  header.appendChild(headerContent);

  // View Toggle Buttons
  const viewToggle = createElement('div', 'properties-page__view-toggle');
  const listBtn = createElement('button', 'properties-page__view-btn properties-page__view-btn--active');
  listBtn.setAttribute('data-view', 'list');
  listBtn.setAttribute('aria-label', 'List view');
  listBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg><span>List</span>';
  viewToggle.appendChild(listBtn);
  const mapBtn = createElement('button', 'properties-page__view-btn');
  mapBtn.setAttribute('data-view', 'map');
  mapBtn.setAttribute('aria-label', 'Map view');
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

  // Status Filters (For Sale / For Rent)
  const statusFilterGroup = createElement('div', 'properties-page__filter-group');
  const statusLabel = createElement('span', 'properties-page__filter-label', 'Status:');
  statusFilterGroup.appendChild(statusLabel);
  const statusOptions = ['All', 'For Sale', 'For Rent'];
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

  // Row 1: Area Range & Year Built
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

  // Row 2: District Dropdown
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
  advRow2.appendChild(createElement('div'));
  advancedContent.appendChild(advRow2);

  // Row 3: Badges
  const advRow3 = createElement('div', 'properties-page__advanced-row properties-page__advanced-row--full');
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
  advRow3.appendChild(badgesWrapper);
  advancedContent.appendChild(advRow3);

  // Reset Advanced Filters
  const resetRow = createElement('div', 'properties-page__advanced-row properties-page__advanced-reset');
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
    currentFilterState = { type: 'All', priceRange: 'All', minBeds: 0, searchQuery: '', status: 'All', minArea: 0, maxArea: 1000, badges: [], minYearBuilt: 2000, maxYearBuilt: new Date().getFullYear(), district: 'All' };
    const s = document.querySelector('.properties-page__search-input') as HTMLInputElement; if (s) s.value = '';
    updateFilterButtonsUI(); updateURLWithFilters(currentFilterState); updateBreadcrumbs(); renderGrid();
  }
  function updateFilterButtonsUI() {
    document.querySelectorAll('[data-filter-type="type"]').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter-value') === currentFilterState.type));
    document.querySelectorAll('[data-filter-type="price"]').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter-value') === currentFilterState.priceRange));
    document.querySelectorAll('[data-filter-type="beds"]').forEach(b => b.classList.toggle('active', parseInt(b.getAttribute('data-filter-value') || '0', 10) === currentFilterState.minBeds));
    document.querySelectorAll('[data-filter-type="status"]').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter-value') === currentFilterState.status));
  }

  // Toggle between list and map views
  function toggleView(view: 'list' | 'map') {
    if (view === currentViewMode) return;
    const gridEl = document.getElementById('properties-grid');
    const mapContainerEl = document.getElementById('properties-map-container');
    const listBtnEl = document.querySelector('[data-view="list"]');
    const mapBtnEl = document.querySelector('[data-view="map"]');
    if (!gridEl || !mapContainerEl) return;
    currentViewMode = view;
    if (view === 'map') {
      gridEl.style.display = 'none';
      mapContainerEl.style.display = 'block';
      listBtnEl?.classList.remove('properties-page__view-btn--active');
      mapBtnEl?.classList.add('properties-page__view-btn--active');
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
    } else {
      gridEl.style.display = '';
      mapContainerEl.style.display = 'none';
      listBtnEl?.classList.add('properties-page__view-btn--active');
      mapBtnEl?.classList.remove('properties-page__view-btn--active');
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
    // View toggle handlers
    document.querySelectorAll('.properties-page__view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view') as 'list' | 'map';
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
        }
      });
    }

    const minAreaEl = document.getElementById('min-area-input') as HTMLInputElement;
    const maxAreaEl = document.getElementById('max-area-input') as HTMLInputElement;
    const minYearEl = document.getElementById('min-year-input') as HTMLInputElement;
    const maxYearEl = document.getElementById('max-year-input') as HTMLInputElement;
    const districtEl = document.getElementById('district-filter') as HTMLSelectElement;
    const badgeCheckboxes = document.querySelectorAll('.advanced-filter__checkbox');

    let advDebounce: ReturnType<typeof setTimeout>;
    function updateAdvancedFiltersAndRender() {
      clearTimeout(advDebounce);
      advDebounce = setTimeout(() => {
        currentFilterState.minArea = parseInt(minAreaEl?.value || '0', 10);
        currentFilterState.maxArea = parseInt(maxAreaEl?.value || '1000', 10);
        currentFilterState.minYearBuilt = parseInt(minYearEl?.value || '2000', 10);
        currentFilterState.maxYearBuilt = parseInt(maxYearEl?.value || new Date().getFullYear().toString(), 10);
        currentFilterState.district = districtEl?.value || 'All';
        const selectedBadges: string[] = [];
        document.querySelectorAll('.advanced-filter__checkbox:checked').forEach(c => selectedBadges.push((c as HTMLInputElement).value));
        currentFilterState.badges = selectedBadges;
        updateURLWithFilters(currentFilterState, true);
        renderGrid();
        updateFiltersCountDisplay();
        updateAdvancedFilterCountBadge();
      }, 300);
    }

    if (minAreaEl) minAreaEl.addEventListener('input', updateAdvancedFiltersAndRender);
    if (maxAreaEl) maxAreaEl.addEventListener('input', updateAdvancedFiltersAndRender);
    if (minYearEl) minYearEl.addEventListener('input', updateAdvancedFiltersAndRender);
    if (maxYearEl) maxYearEl.addEventListener('input', updateAdvancedFiltersAndRender);
    if (districtEl) districtEl.addEventListener('change', () => { currentFilterState.district = districtEl.value; updateURLWithFilters(currentFilterState, true); renderGrid(); updateFiltersCountDisplay(); updateAdvancedFilterCountBadge(); });
    badgeCheckboxes.forEach(cb => cb.addEventListener('change', () => {
      const selectedBadges: string[] = [];
      document.querySelectorAll('.advanced-filter__checkbox:checked').forEach(c => selectedBadges.push((c as HTMLInputElement).value));
      currentFilterState.badges = selectedBadges;
      updateURLWithFilters(currentFilterState, true);
      renderGrid();
      updateFiltersCountDisplay();
      updateAdvancedFilterCountBadge();
    }));

    const resetAdvBtnEl = document.getElementById('reset-advanced-filters');
    if (resetAdvBtnEl) {
      resetAdvBtnEl.addEventListener('click', () => {
        currentFilterState.minArea = 0;
        currentFilterState.maxArea = 1000;
        currentFilterState.badges = [];
        currentFilterState.minYearBuilt = 2000;
        currentFilterState.maxYearBuilt = new Date().getFullYear();
        currentFilterState.district = 'All';
        if (minAreaEl) minAreaEl.value = '';
        if (maxAreaEl) maxAreaEl.value = '';
        if (minYearEl) minYearEl.value = '';
        if (maxYearEl) maxYearEl.value = '';
        if (districtEl) districtEl.value = 'All';
        badgeCheckboxes.forEach(c => { (c as HTMLInputElement).checked = false; });
        updateURLWithFilters(currentFilterState, true);
        renderGrid();
        updateFiltersCountDisplay();
        updateAdvancedFilterCountBadge();
      });
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

    // Initialize comparison bar
    initComparisonBar();
    updateComparisonBar();
  }, 0);

  return fragment;
}

// ─── About Page ───────────────────────────────────────────────────────────
export function renderAboutPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'about-page');

  // Hero
  const hero = createElement('div', 'about-page__hero');
  const heroContent = createElement('div', 'container');

  const title = createElement('h1', 'about-page__title');
  title.textContent = 'Redefining ';
  const em = createElement('em', undefined, 'Luxury');
  title.appendChild(em);
  title.appendChild(document.createTextNode(' Real Estate'));
  heroContent.appendChild(title);

  const subtitle = createElement('p', 'about-page__subtitle', 'For over two decades, Real House has been the premier destination for discerning buyers seeking extraordinary properties.');
  heroContent.appendChild(subtitle);

  hero.appendChild(heroContent);
  page.appendChild(hero);

  // Story Section
  const story = createElement('section', 'about-page__story');
  const storyContainer = createElement('div', 'container about-page__story-grid');

  const storyContent = createElement('div', 'about-page__story-content');
  const storyTitle = createElement('h3', undefined, 'Our Story');
  const storyP1 = createElement('p', undefined, 'Founded in 2001 by a team of visionary real estate professionals, Real House was born from a simple belief: that finding your perfect home should be an extraordinary experience.');
  const storyP2 = createElement('p', undefined, 'Today, we represent the finest properties across 15 global markets, from Manhattan penthouses to Mediterranean villas, each one personally curated to meet the exacting standards of our clients.');
  storyContent.appendChild(storyTitle);
  storyContent.appendChild(storyP1);
  storyContent.appendChild(storyP2);
  storyContainer.appendChild(storyContent);

  const storyImage = createElement('div', 'about-page__story-image');
  const img = createElement('img');
  img.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp';
  img.alt = 'Luxury property';
  img.loading = 'lazy';
  storyImage.appendChild(img);
  storyContainer.appendChild(storyImage);

  story.appendChild(storyContainer);
  page.appendChild(story);

  // Values Section
  const values = createElement('section', 'about-page__values');
  const valuesContainer = createElement('div', 'container');

  const valuesHeader = createElement('div', 'about-page__values-header');
  const valuesTitle = createElement('h3', undefined, 'Our Values');
  valuesHeader.appendChild(valuesTitle);
  valuesContainer.appendChild(valuesHeader);

  const valuesGrid = createElement('div', 'about-page__values-grid');
  const valuesList = [
    { title: 'Excellence', desc: 'We pursue perfection in every detail, from property selection to client service.' },
    { title: 'Integrity', desc: 'Honesty and transparency guide every interaction with our clients and partners.' },
    { title: 'Innovation', desc: 'We leverage cutting-edge technology to deliver superior real estate experiences.' }
  ];

  valuesList.forEach(value => {
    const valueEl = createElement('div', 'about-page__value');
    const vTitle = createElement('h4', undefined, value.title);
    const vDesc = createElement('p', undefined, value.desc);
    valueEl.appendChild(vTitle);
    valueEl.appendChild(vDesc);
    valuesGrid.appendChild(valueEl);
  });

  valuesContainer.appendChild(valuesGrid);
  values.appendChild(valuesContainer);
  page.appendChild(values);

  // Team Section
  const team = createElement('section', 'about-page__team');
  const teamContainer = createElement('div', 'container');

  const teamHeader = createElement('div', 'about-page__team-header');
  const teamTitle = createElement('h3', undefined, 'Meet Our Team');
  teamHeader.appendChild(teamTitle);
  teamContainer.appendChild(teamHeader);

  const teamGrid = createElement('div', 'about-page__team-grid');
  const teamMembers = [
    { name: 'Alexandra Chen', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fm=webp' },
    { name: 'Marcus Williams', role: 'Head of Sales', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fm=webp' },
    { name: 'Sofia Rodriguez', role: 'Chief Marketing Officer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fm=webp' },
    { name: 'James Mitchell', role: 'Senior Agent', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fm=webp' }
  ];

  teamMembers.forEach(member => {
    const memberEl = createElement('div', 'about-page__member');
    const imgDiv = createElement('div', 'about-page__member-image');
    const memberImg = createElement('img');
    memberImg.src = member.image;
    memberImg.alt = member.name;
    memberImg.loading = 'lazy';
    imgDiv.appendChild(memberImg);
    memberEl.appendChild(imgDiv);

    const name = createElement('h4', undefined, member.name);
    const role = createElement('p', undefined, member.role);
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

  const page = createElement('div', 'contact-page');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'contact-page__header');
  const title = createElement('h1', 'contact-page__title', 'Get in Touch');
  const subtitle = createElement('p', 'contact-page__subtitle', 'Ready to find your dream property? Our team is here to help.');
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

  // Info
  const info = createElement('div', 'contact-page__info');

  const infoItems = [
    { title: 'Office', content: 'Dream City, Erbil\nKurdistan Region, Iraq' },
    { title: 'Abdalkader', content: '+964 750 792 2138', isLink: true, href: 'tel:+9647507922138' },
    { title: 'Mahmood', content: '+964 751 441 5003', isLink: true, href: 'tel:+9647514415003' },
    { title: 'Email', content: 'info@realhouseiq.com', isLink: true, href: 'mailto:info@realhouseiq.com' },
    { title: 'Hours', content: 'Saturday - Thursday: 9AM - 6PM\nFriday: By Appointment' }
  ];

  infoItems.forEach(item => {
    const infoItem = createElement('div', 'contact-page__info-item');
    const infoTitle = createElement('h4', undefined, item.title);
    infoItem.appendChild(infoTitle);

    if (item.isLink && item.href) {
      const link = createElement('a');
      link.href = item.href;
      link.textContent = item.content;
      const p = createElement('p');
      p.appendChild(link);
      infoItem.appendChild(p);
    } else {
      const lines = item.content.split('\n');
      lines.forEach(line => {
        const p = createElement('p', undefined, line);
        infoItem.appendChild(p);
      });
    }

    info.appendChild(infoItem);
  });

  grid.appendChild(info);
  container.appendChild(grid);
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

  const page = createElement('div', 'property-detail-page');

  // ─── Gallery Section ─────────────────────────────────────────────────────
  const gallery = createElement('section', 'property-gallery');
  const galleryContainer = createElement('div', 'container');

  // Main image with descriptive alt text
  const mainImageWrapper = createElement('div', 'property-gallery__main');
  const mainImage = createElement('img', 'property-gallery__main-image');
  mainImage.src = property.images[0];
  mainImage.alt = `${property.type} - ${property.title} in ${property.location.district}, ${property.location.city}. Main property image showing exterior view.`;
  mainImage.id = 'property-main-image';
  mainImageWrapper.appendChild(mainImage);
  galleryContainer.appendChild(mainImageWrapper);

  // Thumbnails with accessibility
  if (property.images.length > 1) {
    const thumbnails = createElement('div', 'property-gallery__thumbnails');
    thumbnails.setAttribute('role', 'group');
    thumbnails.setAttribute('aria-label', 'Property image gallery');
    property.images.forEach((imageSrc, index) => {
      const thumb = createElement('button', `property-gallery__thumb${index === 0 ? ' active' : ''}`);
      thumb.setAttribute('data-index', index.toString());
      thumb.setAttribute('aria-label', `View image ${index + 1} of ${property.images.length}`);
      thumb.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      const thumbImg = createElement('img');
      thumbImg.src = imageSrc;
      thumbImg.alt = ''; // Decorative, button has aria-label
      thumbImg.setAttribute('aria-hidden', 'true');
      thumb.appendChild(thumbImg);

      thumb.addEventListener('click', () => {
        const mainImg = document.getElementById('property-main-image') as HTMLImageElement;
        if (mainImg) {
          mainImg.src = imageSrc;
          // Update main image alt text
          mainImg.alt = `${property.type} - ${property.title}, image ${index + 1} of ${property.images.length}`;
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

  // ─── Social Share Buttons ────────────────────────────────────────────────
  const shareSection = createElement('div', 'property-detail__share');

  const shareLabel = createElement('span', 'property-detail__share-label', 'Share:');
  shareSection.appendChild(shareLabel);

  const shareButtons = createElement('div', 'property-detail__share-buttons');

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
  shareButtons.appendChild(whatsappBtn);

  // Facebook Share
  const facebookBtn = createElement('button', 'property-detail__share-btn');
  facebookBtn.setAttribute('aria-label', 'Share on Facebook');
  facebookBtn.setAttribute('title', 'Share on Facebook');
  facebookBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
  facebookBtn.addEventListener('click', () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  });
  shareButtons.appendChild(facebookBtn);

  // Twitter/X Share
  const twitterBtn = createElement('button', 'property-detail__share-btn');
  twitterBtn.setAttribute('aria-label', 'Share on X (Twitter)');
  twitterBtn.setAttribute('title', 'Share on X (Twitter)');
  twitterBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
  twitterBtn.addEventListener('click', () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  });
  shareButtons.appendChild(twitterBtn);

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
  shareButtons.appendChild(copyBtn);

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
  shareButtons.appendChild(emailBtn);

  shareSection.appendChild(shareButtons);

  // Share count placeholder (optional display)
  const shareCount = createElement('span', 'property-detail__share-count');
  shareCount.textContent = '0 shares';
  shareCount.setAttribute('aria-label', 'Number of shares');
  shareSection.appendChild(shareCount);

  header.appendChild(shareSection);

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
export function renderFAQPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'faq-page');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'faq-page__header');
  const title = createElement('h1', 'faq-page__title', 'Frequently Asked Questions');
  const subtitle = createElement('p', 'faq-page__subtitle', 'Find answers to common questions about our services and the home buying process.');
  header.appendChild(title);
  header.appendChild(subtitle);
  container.appendChild(header);

  // FAQ Accordion
  const accordion = createElement('div', 'faq-page__accordion');

  const faqs = [
    {
      question: 'How do I schedule a viewing?',
      answer: 'Scheduling a viewing is easy. Simply navigate to any property listing and click the "Schedule Viewing" button, or contact us directly through our contact page. You can also call our office at +964 750 792 2138. Our agents are available Monday through Friday from 9 AM to 6 PM, and by appointment on weekends. We offer both in-person tours and virtual walkthroughs via video call for your convenience.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'Real House specializes in luxury properties across 15 global markets. Our primary focus areas include Manhattan, The Hamptons, Miami, Los Angeles, San Francisco, and international destinations such as London, Paris, Monaco, and Dubai. We have established networks of trusted partners in each market to ensure seamless service regardless of location. Contact us to discuss your specific geographic preferences.'
    },
    {
      question: 'How does the buying process work?',
      answer: 'Our buying process is designed to be smooth and transparent. It typically involves: 1) Initial consultation to understand your needs and preferences, 2) Property curation where we handpick listings matching your criteria, 3) Private viewings and tours of selected properties, 4) Making an offer with expert negotiation support, 5) Due diligence including inspections and appraisals, 6) Closing with full transaction management support. Our team guides you through every step, typically completing transactions within 30-90 days depending on complexity.'
    },
    {
      question: 'Do you help with financing?',
      answer: 'Yes, we provide comprehensive financing assistance. While Real House is not a lender, we have established relationships with premier private banks, mortgage lenders, and financial institutions specializing in luxury real estate. We can connect you with financing options including jumbo mortgages, portfolio loans, and international financing solutions. Our team can also assist with mortgage pre-approval to strengthen your purchasing position.'
    },
    {
      question: 'What are your fees?',
      answer: 'For buyers, our services are typically free of charge as we receive compensation from the listing side of the transaction. For sellers, our commission structure is competitive and varies based on the property value and market. We offer tiered commission rates for high-value properties and portfolio listings. All fees are transparent and discussed upfront before any agreement. Contact us for a personalized consultation to discuss your specific situation.'
    },
    {
      question: 'Can you help me sell my property?',
      answer: 'Absolutely. We offer comprehensive selling services including professional photography and videography, virtual tours, targeted marketing to our network of qualified buyers, staging consultations, and expert pricing strategy. Our properties receive exposure through our website, partner networks, and exclusive luxury real estate platforms. Our average time to sell is significantly below market average for comparable properties.'
    },
    {
      question: 'Do you work with international buyers?',
      answer: 'Yes, we have extensive experience working with international buyers and investors. We understand the unique requirements including visa considerations, foreign national financing, tax implications, and currency exchange. Our multilingual team can assist clients from around the world, and we have established processes for remote transactions including virtual tours, digital document signing, and coordination with international attorneys and financial institutions.'
    },
    {
      question: 'What makes Real House different from other agencies?',
      answer: 'Real House combines over 24 years of experience with a personalized, white-glove approach to luxury real estate. Unlike large agencies, we maintain a curated portfolio ensuring quality over quantity. Our agents specialize exclusively in luxury properties and provide dedicated attention to each client. We offer access to off-market listings, a global network of partners, and comprehensive concierge services including relocation assistance, interior design referrals, and property management connections.'
    }
  ];

  // Store all question buttons for keyboard navigation
  const questionButtons: HTMLButtonElement[] = [];

  faqs.forEach((faq, index) => {
    const item = createElement('div', 'faq-page__item');
    item.setAttribute('data-faq-item', '');

    const question = createElement('button', 'faq-page__question') as HTMLButtonElement;
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('data-faq-trigger', '');
    // Add unique ID for aria-controls
    const answerId = `faq-answer-${index}`;
    question.setAttribute('aria-controls', answerId);
    question.id = `faq-question-${index}`;

    const questionText = createElement('span', 'faq-page__question-text', faq.question);
    question.appendChild(questionText);

    const icon = createElement('span', 'faq-page__icon');
    icon.textContent = '+';
    icon.setAttribute('aria-hidden', 'true'); // Decorative icon
    question.appendChild(icon);

    const answer = createElement('div', 'faq-page__answer');
    answer.id = answerId;
    answer.setAttribute('data-faq-answer', '');
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-labelledby', `faq-question-${index}`);

    const answerContent = createElement('div', 'faq-page__answer-content');
    const answerP = createElement('p', undefined, faq.answer);
    answerContent.appendChild(answerP);
    answer.appendChild(answerContent);

    // Toggle function for the accordion
    const toggleAccordion = (expand: boolean) => {
      // Close all other items
      accordion.querySelectorAll('.faq-page__item').forEach(otherItem => {
        const otherQuestion = otherItem.querySelector('.faq-page__question');
        const otherAnswer = otherItem.querySelector('.faq-page__answer') as HTMLElement;
        const otherIcon = otherItem.querySelector('.faq-page__icon');
        if (otherQuestion && otherAnswer && otherIcon && otherQuestion !== question) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherAnswer.style.maxHeight = '0';
          otherIcon.textContent = '+';
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      if (expand) {
        question.setAttribute('aria-expanded', 'true');
        (answer as HTMLElement).style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '-';
        item.classList.add('active');
        announceToScreenReader(`${faq.question} expanded`);
      } else {
        question.setAttribute('aria-expanded', 'false');
        (answer as HTMLElement).style.maxHeight = '0';
        icon.textContent = '+';
        item.classList.remove('active');
        announceToScreenReader(`${faq.question} collapsed`);
      }
    };

    // Add click handler for accordion functionality
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      toggleAccordion(!isExpanded);
    });

    // Add keyboard navigation (Enter, Space, Arrow keys)
    question.addEventListener('keydown', (e) => {
      const key = e.key;
      const currentIndex = questionButtons.indexOf(question);

      switch (key) {
        case 'ArrowDown':
          e.preventDefault();
          // Move focus to next question
          if (currentIndex < questionButtons.length - 1) {
            questionButtons[currentIndex + 1].focus();
          } else {
            // Wrap to first
            questionButtons[0].focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          // Move focus to previous question
          if (currentIndex > 0) {
            questionButtons[currentIndex - 1].focus();
          } else {
            // Wrap to last
            questionButtons[questionButtons.length - 1].focus();
          }
          break;
        case 'Home':
          e.preventDefault();
          // Move focus to first question
          questionButtons[0].focus();
          break;
        case 'End':
          e.preventDefault();
          // Move focus to last question
          questionButtons[questionButtons.length - 1].focus();
          break;
        // Enter and Space are handled by default button behavior (click)
      }
    });

    questionButtons.push(question);
    item.appendChild(question);
    item.appendChild(answer);
    accordion.appendChild(item);
  });

  // Set ARIA role for accordion
  accordion.setAttribute('role', 'presentation');

  container.appendChild(accordion);

  // Contact CTA
  const cta = createElement('div', 'faq-page__cta');
  const ctaTitle = createElement('h3', undefined, 'Still have questions?');
  const ctaText = createElement('p', undefined, 'Our team is here to help. Contact us for personalized assistance.');
  const ctaBtn = createElement('a', 'btn btn--primary', 'Contact Us');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  cta.appendChild(ctaTitle);
  cta.appendChild(ctaText);
  cta.appendChild(ctaBtn);
  container.appendChild(cta);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── Favorites Page ───────────────────────────────────────────────────────
export function renderFavoritesPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'favorites-page');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'favorites-page__header');
  const title = createElement('h1', 'favorites-page__title', 'My Favorites');

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

  const page = createElement('div', 'error-page');
  const container = createElement('div', 'container');

  const content = createElement('div', 'error-page__content');

  // Large 404 number
  const errorCode = createElement('h1', 'error-page__code', '404');
  content.appendChild(errorCode);

  // Title
  const title = createElement('h2', 'error-page__title', 'Page Not Found');
  content.appendChild(title);

  // Description
  const description = createElement('p', 'error-page__description',
    'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.');
  content.appendChild(description);

  // Action buttons
  const actions = createElement('div', 'error-page__actions');

  const homeBtn = createElement('a', 'btn btn--primary', 'Back to Home');
  homeBtn.href = '/';
  homeBtn.setAttribute('data-route', '');
  actions.appendChild(homeBtn);

  const propertiesBtn = createElement('a', 'btn btn--outline', 'View Properties');
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
  contactLink.textContent = 'Contact our team';
  contactInfo.appendChild(contactLink);
  content.appendChild(contactInfo);

  container.appendChild(content);
  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}
