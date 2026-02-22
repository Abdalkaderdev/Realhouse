// ═══════════════════════════════════════════════════════════════════════════
// Offers Page Renderer for Real House
// ═══════════════════════════════════════════════════════════════════════════

import {
  offers,
  getOfferBySlug,
  getActiveOffers,
  getOffersByType,
  offerTypes,
  isOfferExpiringSoon,
  getTimeRemaining,
  formatOfferPrice,
  getDiscountLabel,
  getActiveOffersCount,
  type Offer,
  type OfferType
} from '../data/offers';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  createInternalCTA,
  type BreadcrumbItem
} from '../components/internal-linking';

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

function createSVGUse(iconId: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

// ─── Breadcrumbs ──────────────────────────────────────────────────────────
function getOffersBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Special Offers', url: '/offers', current: true }
  ];
}

function getOfferDetailBreadcrumbs(offer: Offer): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Special Offers', url: '/offers' },
    { name: offer.title, url: `/offers/${offer.slug}`, current: true }
  ];
}

// ─── Countdown Timer Component ────────────────────────────────────────────
function createCountdownTimer(endDate: string, offerId: string): HTMLElement {
  const container = createElement('div', 'offer-countdown');
  container.setAttribute('data-end-date', endDate);
  container.setAttribute('data-offer-id', offerId);

  const timeRemaining = getTimeRemaining(endDate);
  const isExpiringSoon = isOfferExpiringSoon({ endDate } as Offer, 7);

  if (isExpiringSoon) {
    container.classList.add('offer-countdown--urgent');
  }

  const label = createElement('span', 'offer-countdown__label', 'Ends in:');
  container.appendChild(label);

  const timer = createElement('div', 'offer-countdown__timer');

  const units = [
    { value: timeRemaining.days, label: 'Days' },
    { value: timeRemaining.hours, label: 'Hrs' },
    { value: timeRemaining.minutes, label: 'Min' },
    { value: timeRemaining.seconds, label: 'Sec' }
  ];

  units.forEach((unit, index) => {
    const unitEl = createElement('div', 'offer-countdown__unit');
    const valueEl = createElement('span', 'offer-countdown__value', unit.value.toString().padStart(2, '0'));
    valueEl.setAttribute('data-unit', unit.label.toLowerCase());
    const labelEl = createElement('span', 'offer-countdown__unit-label', unit.label);
    unitEl.appendChild(valueEl);
    unitEl.appendChild(labelEl);
    timer.appendChild(unitEl);

    if (index < units.length - 1) {
      const separator = createElement('span', 'offer-countdown__separator', ':');
      timer.appendChild(separator);
    }
  });

  container.appendChild(timer);

  return container;
}

// ─── Urgency Badge Component ──────────────────────────────────────────────
function createUrgencyBadge(indicator: string): HTMLElement {
  const badge = createElement('span', 'offer-urgency-badge');

  switch (indicator) {
    case 'Limited Time':
      badge.classList.add('offer-urgency-badge--limited');
      break;
    case 'Last Units':
      badge.classList.add('offer-urgency-badge--last');
      break;
    case 'Ending Soon':
      badge.classList.add('offer-urgency-badge--ending');
      break;
    case 'New Offer':
      badge.classList.add('offer-urgency-badge--new');
      break;
    case 'Exclusive':
      badge.classList.add('offer-urgency-badge--exclusive');
      break;
  }

  badge.textContent = indicator;
  return badge;
}

// ─── Discount Badge Component ─────────────────────────────────────────────
function createDiscountBadge(offer: Offer): HTMLElement {
  const badge = createElement('div', 'offer-discount-badge');
  const label = getDiscountLabel(offer);
  badge.textContent = label;
  return badge;
}

// ─── Offer Card Component ─────────────────────────────────────────────────
function createOfferCard(offer: Offer): HTMLElement {
  const card = createElement('article', 'offer-card');
  card.setAttribute('data-offer-id', offer.id);
  card.setAttribute('data-offer-type', offer.offerType);

  if (offer.featured) {
    card.classList.add('offer-card--featured');
  }

  // Media section
  const media = createElement('div', 'offer-card__media');

  const img = createElement('img', 'offer-card__image');
  img.src = offer.featuredImage;
  img.alt = `${offer.title} - Special Offer at ${offer.location}`;
  img.loading = 'lazy';
  img.width = 400;
  img.height = 250;
  media.appendChild(img);

  const overlay = createElement('div', 'offer-card__overlay');
  media.appendChild(overlay);

  // Discount badge
  const discountBadge = createDiscountBadge(offer);
  media.appendChild(discountBadge);

  // Urgency badge
  const urgencyBadge = createUrgencyBadge(offer.urgencyIndicator);
  media.appendChild(urgencyBadge);

  // Offer type tag
  const typeTag = createElement('span', 'offer-card__type-tag', offer.offerType);
  media.appendChild(typeTag);

  card.appendChild(media);

  // Content section
  const content = createElement('div', 'offer-card__content');

  // Title
  const title = createElement('h3', 'offer-card__title', offer.title);
  content.appendChild(title);

  // Location
  const location = createElement('p', 'offer-card__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(offer.location));
  content.appendChild(location);

  // Short description
  const description = createElement('p', 'offer-card__description', offer.shortDescription);
  content.appendChild(description);

  // Price section (if available)
  if (offer.originalPrice || offer.discountedPrice) {
    const priceSection = createElement('div', 'offer-card__price-section');

    if (offer.originalPrice) {
      const originalPrice = createElement('span', 'offer-card__original-price', formatOfferPrice(offer.originalPrice));
      priceSection.appendChild(originalPrice);
    }

    if (offer.discountedPrice) {
      const newPrice = createElement('span', 'offer-card__new-price', formatOfferPrice(offer.discountedPrice));
      priceSection.appendChild(newPrice);
    } else if (offer.discountAmount && offer.originalPrice) {
      const savingsLabel = createElement('span', 'offer-card__savings', `Save $${offer.discountAmount.toLocaleString()}`);
      priceSection.appendChild(savingsLabel);
    }

    content.appendChild(priceSection);
  }

  // Countdown timer
  const countdown = createCountdownTimer(offer.endDate, offer.id);
  content.appendChild(countdown);

  // Footer
  const footer = createElement('div', 'offer-card__footer');

  // Units available (if applicable)
  if (offer.unitsAvailable) {
    const units = createElement('span', 'offer-card__units');
    units.appendChild(createSVGUse('icon-home'));
    units.appendChild(document.createTextNode(`${offer.unitsAvailable} units available`));
    footer.appendChild(units);
  }

  // View offer button
  const viewBtn = createElement('a', 'btn btn--primary btn--sm', 'View Offer');
  viewBtn.href = `/offers/${offer.slug}`;
  viewBtn.setAttribute('data-route', '');
  footer.appendChild(viewBtn);

  content.appendChild(footer);
  card.appendChild(content);

  return card;
}

// ─── Filter State ─────────────────────────────────────────────────────────
interface OffersFilterState {
  type: string;
}

let currentFilterState: OffersFilterState = {
  type: 'All'
};

// ─── Offers Listing Page ──────────────────────────────────────────────────
export function renderOffersPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Reset filter state
  currentFilterState = { type: 'All' };

  const page = createElement('div', 'offers-page');
  const container = createElement('div', 'container');

  // Breadcrumbs
  const breadcrumbItems = getOffersBreadcrumbs();
  container.appendChild(createBreadcrumbs(breadcrumbItems));
  injectBreadcrumbSchema(breadcrumbItems);

  // Hero Section
  const hero = createElement('section', 'offers-page__hero');
  const heroContent = createElement('div', 'offers-page__hero-content');

  const badge = createElement('span', 'offers-page__badge', 'Limited Time Deals');
  heroContent.appendChild(badge);

  const title = createElement('h1', 'offers-page__title');
  title.appendChild(document.createTextNode('Special '));
  const em = createElement('em', undefined, 'Offers');
  title.appendChild(em);
  title.appendChild(document.createTextNode(' & Deals'));
  heroContent.appendChild(title);

  const subtitle = createElement('p', 'offers-page__subtitle', 'Discover exclusive property offers, discounts, and flexible payment plans on premium real estate in Erbil, Kurdistan. Limited time opportunities for smart investors.');
  heroContent.appendChild(subtitle);

  // Stats row
  const stats = createElement('div', 'offers-page__stats');
  const activeCount = getActiveOffersCount();

  const statItems = [
    { value: activeCount.toString(), label: 'Active Offers' },
    { value: 'Up to 20%', label: 'Discounts' },
    { value: '5-Year', label: 'Payment Plans' }
  ];

  statItems.forEach(stat => {
    const statItem = createElement('div', 'offers-page__stat');
    const valueEl = createElement('span', 'offers-page__stat-value', stat.value);
    const labelEl = createElement('span', 'offers-page__stat-label', stat.label);
    statItem.appendChild(valueEl);
    statItem.appendChild(labelEl);
    stats.appendChild(statItem);
  });

  heroContent.appendChild(stats);
  hero.appendChild(heroContent);
  container.appendChild(hero);

  // Filter Section
  const filterSection = createElement('div', 'offers-page__filters');
  const filterLabel = createElement('span', 'offers-page__filter-label', 'Filter by type:');
  filterSection.appendChild(filterLabel);

  const filterGroup = createElement('div', 'offers-page__filter-group');

  // All filter
  const allBtn = createElement('button', 'offers-page__filter active', 'All Offers');
  allBtn.setAttribute('data-filter-type', 'All');
  filterGroup.appendChild(allBtn);

  // Type filters
  offerTypes.forEach(type => {
    const btn = createElement('button', 'offers-page__filter', type);
    btn.setAttribute('data-filter-type', type);
    filterGroup.appendChild(btn);
  });

  filterSection.appendChild(filterGroup);
  container.appendChild(filterSection);

  // Offers Grid
  const grid = createElement('div', 'offers-page__grid');
  grid.id = 'offers-grid';

  offers.forEach(offer => {
    grid.appendChild(createOfferCard(offer));
  });

  container.appendChild(grid);

  // CTA Section
  const ctaSection = createInternalCTA(
    'Looking for Custom Investment Solutions?',
    'Our property experts can help you find exclusive deals tailored to your investment goals. Contact us for personalized offers.',
    { text: 'Contact Our Team', url: '/contact' },
    { text: 'Browse Projects', url: '/projects' }
  );
  container.appendChild(ctaSection);

  page.appendChild(container);
  fragment.appendChild(page);

  // Add JSON-LD structured data for offers
  injectOffersSchema();

  // Initialize countdown timers and event listeners
  setTimeout(() => {
    initCountdownTimers();
    initFilterListeners();
  }, 0);

  return fragment;
}

// ─── Offer Detail Page ────────────────────────────────────────────────────
export function renderOfferDetailPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const offer = getOfferBySlug(slug);

  if (!offer) {
    // 404 - Offer not found
    const page = createElement('div', 'offer-detail-page offer-detail-page--not-found');
    const container = createElement('div', 'container');

    const content = createElement('div', 'offer-detail-page__not-found');
    const title = createElement('h1', undefined, 'Offer Not Found');
    const message = createElement('p', undefined, 'This offer may have expired or does not exist.');
    const backLink = createElement('a', 'btn btn--primary', 'View All Offers');
    backLink.href = '/offers';
    backLink.setAttribute('data-route', '');

    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(backLink);
    container.appendChild(content);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  const page = createElement('div', 'offer-detail-page');

  // Breadcrumbs Section
  const breadcrumbSection = createElement('section', 'offer-detail__breadcrumbs');
  const breadcrumbContainer = createElement('div', 'container');
  const breadcrumbItems = getOfferDetailBreadcrumbs(offer);
  breadcrumbContainer.appendChild(createBreadcrumbs(breadcrumbItems));
  breadcrumbSection.appendChild(breadcrumbContainer);
  page.appendChild(breadcrumbSection);
  injectBreadcrumbSchema(breadcrumbItems);

  // Hero Section
  const hero = createElement('section', 'offer-detail__hero');
  const heroImage = createElement('div', 'offer-detail__hero-image');
  heroImage.style.backgroundImage = `url(${offer.featuredImage})`;

  const heroOverlay = createElement('div', 'offer-detail__hero-overlay');
  const heroContainer = createElement('div', 'container');
  const heroContent = createElement('div', 'offer-detail__hero-content');

  // Badges row
  const badgesRow = createElement('div', 'offer-detail__badges');
  badgesRow.appendChild(createUrgencyBadge(offer.urgencyIndicator));

  const typeBadge = createElement('span', 'offer-detail__type-badge', offer.offerType);
  badgesRow.appendChild(typeBadge);
  heroContent.appendChild(badgesRow);

  // Title
  const heroTitle = createElement('h1', 'offer-detail__title', offer.title);
  heroContent.appendChild(heroTitle);

  // Location
  const heroLocation = createElement('p', 'offer-detail__location');
  heroLocation.appendChild(createSVGUse('icon-location'));
  heroLocation.appendChild(document.createTextNode(offer.location));
  if (offer.projectName) {
    heroLocation.appendChild(document.createTextNode(` | ${offer.projectName}`));
  }
  heroContent.appendChild(heroLocation);

  // Discount badge large
  const discountBadgeLarge = createElement('div', 'offer-detail__discount-badge');
  discountBadgeLarge.textContent = getDiscountLabel(offer);
  heroContent.appendChild(discountBadgeLarge);

  heroContainer.appendChild(heroContent);
  heroOverlay.appendChild(heroContainer);
  heroImage.appendChild(heroOverlay);
  hero.appendChild(heroImage);
  page.appendChild(hero);

  // Main Content Section
  const main = createElement('section', 'offer-detail__main');
  const mainContainer = createElement('div', 'container');
  const mainGrid = createElement('div', 'offer-detail__grid');

  // Left Column - Details
  const detailsCol = createElement('div', 'offer-detail__details');

  // Countdown Timer
  const countdownSection = createElement('div', 'offer-detail__countdown-section');
  const countdownTitle = createElement('h3', 'offer-detail__section-title', 'Offer Ends In');
  countdownSection.appendChild(countdownTitle);
  countdownSection.appendChild(createCountdownTimer(offer.endDate, offer.id));
  detailsCol.appendChild(countdownSection);

  // Price Section
  if (offer.originalPrice || offer.discountedPrice) {
    const priceSection = createElement('div', 'offer-detail__price-section');
    const priceTitle = createElement('h3', 'offer-detail__section-title', 'Price');
    priceSection.appendChild(priceTitle);

    const priceContainer = createElement('div', 'offer-detail__price-container');

    if (offer.originalPrice) {
      const originalPriceEl = createElement('div', 'offer-detail__original-price');
      const originalLabel = createElement('span', 'offer-detail__price-label', 'Original Price');
      const originalValue = createElement('span', 'offer-detail__price-value offer-detail__price-value--strikethrough', formatOfferPrice(offer.originalPrice));
      originalPriceEl.appendChild(originalLabel);
      originalPriceEl.appendChild(originalValue);
      priceContainer.appendChild(originalPriceEl);
    }

    if (offer.discountedPrice) {
      const newPriceEl = createElement('div', 'offer-detail__new-price');
      const newLabel = createElement('span', 'offer-detail__price-label', 'Offer Price');
      const newValue = createElement('span', 'offer-detail__price-value offer-detail__price-value--highlight', formatOfferPrice(offer.discountedPrice));
      newPriceEl.appendChild(newLabel);
      newPriceEl.appendChild(newValue);
      priceContainer.appendChild(newPriceEl);
    }

    if (offer.discountAmount || (offer.originalPrice && offer.discountedPrice)) {
      const savings = offer.discountAmount || (offer.originalPrice! - offer.discountedPrice!);
      const savingsEl = createElement('div', 'offer-detail__savings');
      savingsEl.textContent = `You Save: $${savings.toLocaleString()}`;
      priceContainer.appendChild(savingsEl);
    }

    priceSection.appendChild(priceContainer);
    detailsCol.appendChild(priceSection);
  }

  // Description
  const descSection = createElement('div', 'offer-detail__description-section');
  const descTitle = createElement('h3', 'offer-detail__section-title', 'About This Offer');
  descSection.appendChild(descTitle);

  const descText = createElement('div', 'offer-detail__description');
  offer.description.split('\n').forEach(para => {
    if (para.trim()) {
      const p = createElement('p', undefined, para.trim());
      descText.appendChild(p);
    }
  });
  descSection.appendChild(descText);
  detailsCol.appendChild(descSection);

  // Highlights
  if (offer.highlights && offer.highlights.length > 0) {
    const highlightsSection = createElement('div', 'offer-detail__highlights-section');
    const highlightsTitle = createElement('h3', 'offer-detail__section-title', 'Offer Highlights');
    highlightsSection.appendChild(highlightsTitle);

    const highlightsList = createElement('ul', 'offer-detail__highlights');
    offer.highlights.forEach(highlight => {
      const li = createElement('li', 'offer-detail__highlight');
      li.appendChild(createSVGUse('icon-check'));
      li.appendChild(document.createTextNode(highlight));
      highlightsList.appendChild(li);
    });
    highlightsSection.appendChild(highlightsList);
    detailsCol.appendChild(highlightsSection);
  }

  // Terms and Conditions
  const termsSection = createElement('div', 'offer-detail__terms-section');
  const termsTitle = createElement('h3', 'offer-detail__section-title', 'Terms & Conditions');
  termsSection.appendChild(termsTitle);

  const termsList = createElement('ul', 'offer-detail__terms');
  offer.termsAndConditions.forEach(term => {
    const li = createElement('li', 'offer-detail__term', term);
    termsList.appendChild(li);
  });
  termsSection.appendChild(termsList);
  detailsCol.appendChild(termsSection);

  mainGrid.appendChild(detailsCol);

  // Right Column - Sidebar
  const sidebar = createElement('div', 'offer-detail__sidebar');

  // Contact Card
  const contactCard = createElement('div', 'offer-detail__contact-card');
  const contactTitle = createElement('h3', 'offer-detail__contact-title', 'Interested in This Offer?');
  contactCard.appendChild(contactTitle);

  const contactText = createElement('p', 'offer-detail__contact-text', 'Contact us now to secure this exclusive deal. Limited availability!');
  contactCard.appendChild(contactText);

  const contactActions = createElement('div', 'offer-detail__contact-actions');

  // Inquiry button
  const inquiryBtn = createElement('a', 'btn btn--primary btn--full', 'Claim This Offer');
  inquiryBtn.href = `/contact?offer=${offer.slug}`;
  inquiryBtn.setAttribute('data-route', '');
  contactActions.appendChild(inquiryBtn);

  // Call button
  const callBtn = createElement('a', 'btn btn--ghost btn--full', `Call ${offer.contactPhone || '+964 750 792 2138'}`);
  callBtn.href = `tel:${(offer.contactPhone || '+964 750 792 2138').replace(/\s/g, '')}`;
  contactActions.appendChild(callBtn);

  // WhatsApp button
  const whatsappBtn = createElement('a', 'btn btn--whatsapp btn--full');
  whatsappBtn.href = `https://wa.me/9647507922138?text=${encodeURIComponent(`Hi, I'm interested in the offer: ${offer.title}`)}`;
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.appendChild(createSVGUse('icon-whatsapp'));
  whatsappBtn.appendChild(document.createTextNode(' WhatsApp Us'));
  contactActions.appendChild(whatsappBtn);

  contactCard.appendChild(contactActions);
  sidebar.appendChild(contactCard);

  // Applicable Units Card
  if (offer.applicableUnits) {
    const unitsCard = createElement('div', 'offer-detail__units-card');
    const unitsTitle = createElement('h4', 'offer-detail__units-title', 'Applicable Units');
    const unitsValue = createElement('p', 'offer-detail__units-value', offer.applicableUnits);
    unitsCard.appendChild(unitsTitle);
    unitsCard.appendChild(unitsValue);

    if (offer.unitsAvailable) {
      const availability = createElement('p', 'offer-detail__units-available');
      const strong = createElement('strong', undefined, offer.unitsAvailable.toString());
      availability.appendChild(strong);
      availability.appendChild(document.createTextNode(' units remaining'));
      unitsCard.appendChild(availability);
    }

    sidebar.appendChild(unitsCard);
  }

  // View Project Link (if applicable)
  if (offer.projectId) {
    const projectLink = createElement('a', 'offer-detail__project-link', 'View Full Project Details');
    projectLink.href = `/projects/${offer.projectId}`;
    projectLink.setAttribute('data-route', '');
    projectLink.appendChild(createSVGUse('icon-arrow-right'));
    sidebar.appendChild(projectLink);
  }

  mainGrid.appendChild(sidebar);
  mainContainer.appendChild(mainGrid);
  main.appendChild(mainContainer);
  page.appendChild(main);

  // Back Link
  const backSection = createElement('section', 'offer-detail__back');
  const backContainer = createElement('div', 'container');
  const backLink = createElement('a', 'offer-detail__back-link', 'Back to All Offers');
  backLink.href = '/offers';
  backLink.setAttribute('data-route', '');
  const backIcon = createSVGUse('icon-arrow-left');
  backLink.insertBefore(backIcon, backLink.firstChild);
  backContainer.appendChild(backLink);
  backSection.appendChild(backContainer);
  page.appendChild(backSection);

  fragment.appendChild(page);

  // Inject offer detail schema
  injectOfferDetailSchema(offer);

  // Initialize countdown timer
  setTimeout(() => {
    initCountdownTimers();
  }, 0);

  return fragment;
}

// ─── Initialize Countdown Timers ──────────────────────────────────────────
function initCountdownTimers(): void {
  const countdowns = document.querySelectorAll('.offer-countdown');

  const updateCountdowns = () => {
    countdowns.forEach(countdown => {
      const endDate = countdown.getAttribute('data-end-date');
      if (!endDate) return;

      const timeRemaining = getTimeRemaining(endDate);

      const daysEl = countdown.querySelector('[data-unit="days"]');
      const hoursEl = countdown.querySelector('[data-unit="hrs"]');
      const minutesEl = countdown.querySelector('[data-unit="min"]');
      const secondsEl = countdown.querySelector('[data-unit="sec"]');

      if (daysEl) daysEl.textContent = timeRemaining.days.toString().padStart(2, '0');
      if (hoursEl) hoursEl.textContent = timeRemaining.hours.toString().padStart(2, '0');
      if (minutesEl) minutesEl.textContent = timeRemaining.minutes.toString().padStart(2, '0');
      if (secondsEl) secondsEl.textContent = timeRemaining.seconds.toString().padStart(2, '0');

      // Add urgent class if less than 7 days
      if (timeRemaining.days < 7 && timeRemaining.days >= 0) {
        countdown.classList.add('offer-countdown--urgent');
      }

      // Handle expired offers
      if (timeRemaining.days <= 0 && timeRemaining.hours <= 0 && timeRemaining.minutes <= 0 && timeRemaining.seconds <= 0) {
        countdown.classList.add('offer-countdown--expired');
        const timer = countdown.querySelector('.offer-countdown__timer');
        if (timer) {
          // Clear and add expired message
          while (timer.firstChild) {
            timer.removeChild(timer.firstChild);
          }
          const expiredSpan = createElement('span', 'offer-countdown__expired', 'Offer Expired');
          timer.appendChild(expiredSpan);
        }
      }
    });
  };

  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}

// ─── Initialize Filter Listeners ──────────────────────────────────────────
function initFilterListeners(): void {
  const filterButtons = document.querySelectorAll('.offers-page__filter');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-filter-type');
      if (!type) return;

      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update filter state
      currentFilterState.type = type;

      // Re-render the grid
      renderOffersGrid();
    });
  });
}

function renderOffersGrid(): void {
  const gridEl = document.getElementById('offers-grid');
  if (!gridEl) return;

  // Clear the grid
  while (gridEl.firstChild) {
    gridEl.removeChild(gridEl.firstChild);
  }

  // Filter offers
  let filteredOffers = [...offers];

  if (currentFilterState.type !== 'All') {
    filteredOffers = getOffersByType(currentFilterState.type as OfferType);
  }

  if (filteredOffers.length === 0) {
    const noResults = createElement('div', 'offers-page__no-results');
    const noResultsTitle = createElement('h3', undefined, 'No offers found');
    const noResultsText = createElement('p', undefined, 'Try selecting a different filter or check back soon for new deals.');
    noResults.appendChild(noResultsTitle);
    noResults.appendChild(noResultsText);
    gridEl.appendChild(noResults);
  } else {
    filteredOffers.forEach(offer => {
      gridEl.appendChild(createOfferCard(offer));
    });

    // Re-init countdowns for new cards
    initCountdownTimers();
  }
}

// ─── JSON-LD Schema for Offers Listing ────────────────────────────────────
function injectOffersSchema(): void {
  // Remove existing offers schema
  const existingSchema = document.querySelector('script[data-schema="offers"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const activeOffers = getActiveOffers();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Special Offers on Real Estate in Erbil, Kurdistan',
    'description': 'Exclusive property deals, discounts, and flexible payment plans on luxury real estate in Erbil, Kurdistan Region, Iraq.',
    'numberOfItems': activeOffers.length,
    'itemListElement': activeOffers.map((offer, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Offer',
        '@id': `https://realhouseiq.com/offers/${offer.slug}`,
        'name': offer.title,
        'description': offer.shortDescription,
        'url': `https://realhouseiq.com/offers/${offer.slug}`,
        'image': offer.featuredImage,
        'validFrom': offer.startDate,
        'validThrough': offer.endDate,
        'priceSpecification': offer.discountedPrice ? {
          '@type': 'PriceSpecification',
          'price': offer.discountedPrice,
          'priceCurrency': 'USD'
        } : undefined,
        'offeredBy': {
          '@type': 'RealEstateAgent',
          'name': 'Real House',
          'url': 'https://realhouseiq.com'
        },
        'areaServed': {
          '@type': 'Place',
          'name': 'Erbil, Kurdistan Region, Iraq'
        }
      }
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'offers');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ─── JSON-LD Schema for Single Offer ──────────────────────────────────────
function injectOfferDetailSchema(offer: Offer): void {
  // Remove existing offer detail schema
  const existingSchema = document.querySelector('script[data-schema="offer-detail"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    '@id': `https://realhouseiq.com/offers/${offer.slug}`,
    'name': offer.title,
    'description': offer.description,
    'url': `https://realhouseiq.com/offers/${offer.slug}`,
    'image': offer.featuredImage,
    'validFrom': offer.startDate,
    'validThrough': offer.endDate,
    'availability': 'https://schema.org/InStock',
    'price': offer.discountedPrice || offer.originalPrice,
    'priceCurrency': 'USD',
    'priceValidUntil': offer.endDate,
    'category': offer.offerType,
    'offeredBy': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': 'https://realhouseiq.com',
      'telephone': '+964-750-792-2138',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Queen Tower, Erbil',
        'addressLocality': 'Erbil',
        'addressRegion': 'Kurdistan Region',
        'addressCountry': 'Iraq'
      }
    },
    'areaServed': {
      '@type': 'Place',
      'name': offer.location
    },
    'itemOffered': offer.projectId ? {
      '@type': 'RealEstateListing',
      'name': offer.projectName,
      'url': `https://realhouseiq.com/projects/${offer.projectId}`
    } : undefined
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'offer-detail');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ─── SEO Setup Functions ──────────────────────────────────────────────────
export function setupOffersPageSEO(): void {
  const activeCount = getActiveOffersCount();
  document.title = `Special Offers & Deals | ${activeCount} Active | Real House Erbil`;

  const description = `Discover ${activeCount} exclusive property offers in Erbil, Kurdistan. Up to 20% discounts, flexible payment plans, and limited-time deals on luxury villas, apartments, and more.`;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute('content', description);

  const keywords = 'special offers erbil, property deals kurdistan, real estate discounts, payment plans erbil, property discount erbil, limited time offers, real house deals';
  const keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta) keywordsMeta.setAttribute('content', keywords);
}

export function setupOfferDetailPageSEO(offer: Offer): void {
  const title = `${offer.title} | Special Offer | Real House Erbil`;
  document.title = title.length <= 60 ? title : `${offer.title} | Real House`;

  const description = offer.shortDescription.length <= 155
    ? `${offer.shortDescription} Valid until ${new Date(offer.endDate).toLocaleDateString()}. Contact Real House now!`
    : offer.shortDescription;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute('content', description);

  // Update canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', `https://realhouseiq.com/offers/${offer.slug}`);

  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', offer.featuredImage);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `https://realhouseiq.com/offers/${offer.slug}`);
}

// ─── Export helper for navigation ─────────────────────────────────────────
export { getActiveOffersCount };
