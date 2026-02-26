// ===============================================================================
// Neighborhood Guide Pages - Comprehensive Area Information for Erbil
// SEO-optimized with JSON-LD LocalBusiness/Place schema
// ===============================================================================

import {
  neighborhoods,
  getNeighborhoodBySlug,
  getAllNeighborhoodSlugs,
  formatNeighborhoodPrice,
  getNeighborhoodPriceDisplay,
  type Neighborhood,
  type NeighborhoodAmenity
} from '../data/neighborhoods';
import { businessNAP } from '../data/locations';
import { properties, getDisplayPrice, type Property } from '../data/properties';
import { projects, type Project } from '../data/projects';
import { t } from '../i18n';

// ===============================================================================
// Helper Functions
// ===============================================================================

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

function createSVG(pathD: string, className?: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  if (className) svg.setAttribute('class', className);
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathD);
  svg.appendChild(path);
  return svg;
}

// SVG icon paths
const ICONS = {
  location: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  phone: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  school: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
  hospital: 'M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z',
  shopping: 'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z',
  restaurant: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z',
  park: 'M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.96v-4H21l-4-6z',
  plane: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z',
  car: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  safety: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
  family: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  arrow: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'
};

// ===============================================================================
// Get Properties in Neighborhood
// ===============================================================================

function getPropertiesInNeighborhood(neighborhoodName: string): Property[] {
  const normalizedName = neighborhoodName.toLowerCase().replace(/[- ]/g, '');
  return properties.filter(p => {
    const district = p.location.district.toLowerCase().replace(/[- ]/g, '');
    return district.includes(normalizedName) || normalizedName.includes(district);
  }).slice(0, 6);
}

function getProjectsInNeighborhood(neighborhoodName: string): Project[] {
  const normalizedName = neighborhoodName.toLowerCase().replace(/[- ]/g, '');
  return projects.filter(p => {
    const district = p.location.district.toLowerCase().replace(/[- ]/g, '');
    const name = p.name.toLowerCase().replace(/[- ]/g, '');
    return district.includes(normalizedName) || normalizedName.includes(district) || name.includes(normalizedName);
  }).slice(0, 4);
}

// ===============================================================================
// Neighborhoods Listing Page - /neighborhoods
// ===============================================================================

export function renderNeighborhoodsPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('div', 'neighborhoods-page');

  // Hero Section
  const hero = createElement('section', 'neighborhoods-page__hero');
  hero.style.backgroundImage = 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%), url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80&fm=webp)';

  const heroContent = createElement('div', 'neighborhoods-page__hero-content');

  const badge = createElement('span', 'neighborhoods-page__badge', t('neighborhoodGuide.heroBadge'));
  heroContent.appendChild(badge);

  const h1 = createElement('h1', 'neighborhoods-page__title', t('neighborhoodGuide.heroTitle'));
  heroContent.appendChild(h1);

  const subtitle = createElement('p', 'neighborhoods-page__subtitle', t('neighborhoodGuide.heroSubtitle'));
  heroContent.appendChild(subtitle);

  // Stats
  const stats = createElement('div', 'neighborhoods-page__stats');
  const statsData = [
    { value: neighborhoods.length.toString(), label: t('neighborhoodGuide.neighborhoods') },
    { value: '100+', label: t('neighborhoodGuide.properties') },
    { value: '$50K-$2M', label: t('neighborhoodGuide.priceRange') }
  ];
  statsData.forEach(stat => {
    const statEl = createElement('div', 'neighborhoods-page__stat');
    const value = createElement('span', 'neighborhoods-page__stat-value', stat.value);
    const label = createElement('span', 'neighborhoods-page__stat-label', stat.label);
    statEl.appendChild(value);
    statEl.appendChild(label);
    stats.appendChild(statEl);
  });
  heroContent.appendChild(stats);

  hero.appendChild(heroContent);
  page.appendChild(hero);

  // Breadcrumb
  const breadcrumb = createElement('nav', 'neighborhoods-page__breadcrumb');
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');
  const ol = createElement('ol', 'breadcrumb');

  const li1 = createElement('li');
  const a1 = createElement('a', undefined, t('neighborhoodGuide.home'));
  a1.href = '/';
  a1.setAttribute('data-route', '');
  li1.appendChild(a1);
  ol.appendChild(li1);

  const li2 = createElement('li');
  const span2 = createElement('span', undefined, t('neighborhoodGuide.neighborhoodsLabel'));
  span2.setAttribute('aria-current', 'page');
  li2.appendChild(span2);
  ol.appendChild(li2);

  breadcrumb.appendChild(ol);
  page.appendChild(breadcrumb);

  // Main Content
  const main = createElement('main', 'neighborhoods-page__main');
  const container = createElement('div', 'container');

  const intro = createElement('div', 'neighborhoods-page__intro');
  const introTitle = createElement('h2', 'neighborhoods-page__intro-title', t('neighborhoodGuide.findYourPerfectNeighborhood'));
  const introText = createElement('p', 'neighborhoods-page__intro-text', t('neighborhoodGuide.introText'));
  intro.appendChild(introTitle);
  intro.appendChild(introText);
  container.appendChild(intro);

  // Neighborhoods Grid
  const grid = createElement('div', 'neighborhoods-page__grid');

  neighborhoods.forEach(neighborhood => {
    const card = createNeighborhoodCard(neighborhood);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  main.appendChild(container);
  page.appendChild(main);

  // CTA Section
  const cta = createElement('section', 'neighborhoods-page__cta');
  const ctaContent = createElement('div', 'neighborhoods-page__cta-content');
  const ctaTitle = createElement('h2', undefined, t('neighborhoodGuide.needHelpFindingRightArea'));
  const ctaText = createElement('p', undefined, t('neighborhoodGuide.ctaExpertsText'));
  const ctaButtons = createElement('div', 'neighborhoods-page__cta-buttons');

  const contactBtn = createElement('a', 'btn btn--primary btn--large', t('neighborhoodGuide.getExpertAdvice'));
  contactBtn.href = '/contact';
  contactBtn.setAttribute('data-route', '');
  ctaButtons.appendChild(contactBtn);

  const phoneBtn = createElement('a', 'btn btn--secondary btn--large');
  phoneBtn.href = `tel:${businessNAP.phones[0].number.replace(/\s/g, '')}`;
  phoneBtn.appendChild(createSVG(ICONS.phone, 'btn__icon'));
  phoneBtn.appendChild(document.createTextNode(` ${businessNAP.phones[0].number}`));
  ctaButtons.appendChild(phoneBtn);

  ctaContent.appendChild(ctaTitle);
  ctaContent.appendChild(ctaText);
  ctaContent.appendChild(ctaButtons);
  cta.appendChild(ctaContent);
  page.appendChild(cta);

  // Schema
  const schema = generateNeighborhoodsListSchema();
  const schemaScript = createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.id = 'schema-neighborhoods-list';
  schemaScript.textContent = JSON.stringify(schema);
  page.appendChild(schemaScript);

  fragment.appendChild(page);
  return fragment;
}

function createNeighborhoodCard(neighborhood: Neighborhood): HTMLElement {
  const card = createElement('article', 'neighborhood-card');

  const link = createElement('a', 'neighborhood-card__link');
  link.href = `/neighborhoods/${neighborhood.slug}`;
  link.setAttribute('data-route', '');

  // Image
  const imageWrapper = createElement('div', 'neighborhood-card__image-wrapper');
  const img = createElement('img', 'neighborhood-card__image');
  img.src = neighborhood.image;
  img.alt = `${neighborhood.name} - ${neighborhood.tagline}`;
  img.loading = 'lazy';
  imageWrapper.appendChild(img);

  // Overlay with price
  const overlay = createElement('div', 'neighborhood-card__overlay');
  const price = createElement('span', 'neighborhood-card__price', t('neighborhoodGuide.fromPrice', { price: formatNeighborhoodPrice(neighborhood.priceRange.min) }));
  overlay.appendChild(price);
  imageWrapper.appendChild(overlay);

  link.appendChild(imageWrapper);

  // Content
  const content = createElement('div', 'neighborhood-card__content');

  const header = createElement('div', 'neighborhood-card__header');
  const name = createElement('h3', 'neighborhood-card__name', neighborhood.name);
  const tagline = createElement('p', 'neighborhood-card__tagline', neighborhood.tagline);
  header.appendChild(name);
  header.appendChild(tagline);
  content.appendChild(header);

  const description = createElement('p', 'neighborhood-card__description', neighborhood.description);
  content.appendChild(description);

  // Features
  const features = createElement('div', 'neighborhood-card__features');
  const featuresList = [
    neighborhood.lifestyle.type,
    t('neighborhoodGuide.propertyTypesCount', { count: neighborhood.propertyTypes.length.toString() }),
    neighborhood.lifestyle.safetyRating >= 4 ? t('neighborhoodGuide.highSecurity') : t('neighborhoodGuide.goodSecurity')
  ];
  featuresList.forEach(feature => {
    const featureEl = createElement('span', 'neighborhood-card__feature');
    featureEl.appendChild(createSVG(ICONS.check, 'neighborhood-card__feature-icon'));
    featureEl.appendChild(document.createTextNode(feature));
    features.appendChild(featureEl);
  });
  content.appendChild(features);

  // Footer
  const footer = createElement('div', 'neighborhood-card__footer');
  const viewBtn = createElement('span', 'neighborhood-card__cta', t('neighborhoodGuide.exploreArea'));
  viewBtn.appendChild(createSVG(ICONS.arrow, 'neighborhood-card__cta-icon'));
  footer.appendChild(viewBtn);
  content.appendChild(footer);

  link.appendChild(content);
  card.appendChild(link);

  return card;
}

// ===============================================================================
// Neighborhood Detail Page - /neighborhoods/:slug
// ===============================================================================

export function renderNeighborhoodDetailPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const neighborhood = getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    return render404NeighborhoodPage(slug);
  }

  const page = createElement('div', 'neighborhood-detail');

  // Hero Section
  const hero = createHeroSection(neighborhood);
  page.appendChild(hero);

  // Breadcrumb
  const breadcrumb = createBreadcrumb(neighborhood);
  page.appendChild(breadcrumb);

  // Main Content
  const main = createElement('main', 'neighborhood-detail__main');
  const container = createElement('div', 'container');

  // Overview Section
  const overview = createOverviewSection(neighborhood);
  container.appendChild(overview);

  // Price Section
  const priceSection = createPriceSection(neighborhood);
  container.appendChild(priceSection);

  // Amenities Section
  const amenitiesSection = createAmenitiesSection(neighborhood);
  container.appendChild(amenitiesSection);

  // Transportation Section
  const transportSection = createTransportSection(neighborhood);
  container.appendChild(transportSection);

  // Lifestyle Section
  const lifestyleSection = createLifestyleSection(neighborhood);
  container.appendChild(lifestyleSection);

  // Map Section
  const mapSection = createMapSection(neighborhood);
  container.appendChild(mapSection);

  // Properties Section
  const propertiesInArea = getPropertiesInNeighborhood(neighborhood.name);
  if (propertiesInArea.length > 0) {
    const propertiesSection = createPropertiesSection(neighborhood, propertiesInArea);
    container.appendChild(propertiesSection);
  }

  // Projects Section
  const projectsInArea = getProjectsInNeighborhood(neighborhood.name);
  if (projectsInArea.length > 0) {
    const projectsSection = createProjectsSection(neighborhood, projectsInArea);
    container.appendChild(projectsSection);
  }

  main.appendChild(container);
  page.appendChild(main);

  // Sidebar
  const sidebar = createSidebar(neighborhood);
  page.appendChild(sidebar);

  // CTA Section
  const cta = createCTASection(neighborhood);
  page.appendChild(cta);

  // Other Neighborhoods
  const otherNeighborhoods = createOtherNeighborhoodsSection(neighborhood);
  page.appendChild(otherNeighborhoods);

  // Schema
  const schema = generateNeighborhoodSchema(neighborhood);
  const schemaScript = createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.id = 'schema-neighborhood-detail';
  schemaScript.textContent = JSON.stringify(schema);
  page.appendChild(schemaScript);

  fragment.appendChild(page);
  return fragment;
}

// ===============================================================================
// Section Builders
// ===============================================================================

function createHeroSection(neighborhood: Neighborhood): HTMLElement {
  const hero = createElement('section', 'neighborhood-detail__hero');
  hero.style.backgroundImage = `linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.75) 100%), url(${neighborhood.image})`;

  const content = createElement('div', 'neighborhood-detail__hero-content');

  // Location badge
  const badge = createElement('div', 'neighborhood-detail__badge');
  badge.appendChild(createSVG(ICONS.location, 'neighborhood-detail__badge-icon'));
  const badgeText = createElement('span', undefined, t('neighborhoodGuide.erbilKurdistanIraq'));
  badge.appendChild(badgeText);
  content.appendChild(badge);

  // Title
  const h1 = createElement('h1', 'neighborhood-detail__title');
  h1.textContent = neighborhood.name;
  const titleSpan = createElement('span', 'neighborhood-detail__title-sub', neighborhood.tagline);
  h1.appendChild(document.createElement('br'));
  h1.appendChild(titleSpan);
  content.appendChild(h1);

  // Description
  const desc = createElement('p', 'neighborhood-detail__hero-desc', neighborhood.description);
  content.appendChild(desc);

  // Stats
  const stats = createElement('div', 'neighborhood-detail__hero-stats');
  const statsData = [
    { value: getNeighborhoodPriceDisplay(neighborhood), label: t('neighborhoodGuide.priceRange') },
    { value: neighborhood.propertyTypes.length.toString(), label: t('neighborhoodGuide.propertyTypesLabel') },
    { value: neighborhood.lifestyle.type, label: t('neighborhoodGuide.lifestyle') },
    { value: `${neighborhood.lifestyle.safetyRating}/5`, label: t('neighborhoodGuide.safetyRating') }
  ];
  statsData.forEach(stat => {
    const statEl = createElement('div', 'neighborhood-detail__hero-stat');
    const value = createElement('span', 'neighborhood-detail__hero-stat-value', stat.value);
    const label = createElement('span', 'neighborhood-detail__hero-stat-label', stat.label);
    statEl.appendChild(value);
    statEl.appendChild(label);
    stats.appendChild(statEl);
  });
  content.appendChild(stats);

  // CTA Buttons
  const buttons = createElement('div', 'neighborhood-detail__hero-buttons');

  const viewBtn = createElement('a', 'btn btn--primary btn--large', t('neighborhoodGuide.viewProperties'));
  viewBtn.href = `/properties?district=${neighborhood.slug}`;
  viewBtn.setAttribute('data-route', '');
  buttons.appendChild(viewBtn);

  const contactBtn = createElement('a', 'btn btn--secondary btn--large');
  contactBtn.href = `tel:${businessNAP.phones[0].number.replace(/\s/g, '')}`;
  contactBtn.appendChild(createSVG(ICONS.phone, 'btn__icon'));
  contactBtn.appendChild(document.createTextNode(` ${businessNAP.phones[0].number}`));
  buttons.appendChild(contactBtn);

  content.appendChild(buttons);
  hero.appendChild(content);

  return hero;
}

function createBreadcrumb(neighborhood: Neighborhood): HTMLElement {
  const breadcrumb = createElement('nav', 'neighborhood-detail__breadcrumb');
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');

  const ol = createElement('ol', 'breadcrumb');
  ol.setAttribute('itemscope', '');
  ol.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');

  const items = [
    { name: t('neighborhoodGuide.home'), url: '/' },
    { name: t('neighborhoodGuide.neighborhoodsLabel'), url: '/neighborhoods' },
    { name: neighborhood.name, url: null }
  ];

  items.forEach((item, index) => {
    const li = createElement('li');
    li.setAttribute('itemprop', 'itemListElement');
    li.setAttribute('itemscope', '');
    li.setAttribute('itemtype', 'https://schema.org/ListItem');

    if (item.url) {
      const a = createElement('a');
      a.href = item.url;
      a.setAttribute('data-route', '');
      a.setAttribute('itemprop', 'item');
      const span = createElement('span');
      span.setAttribute('itemprop', 'name');
      span.textContent = item.name;
      a.appendChild(span);
      li.appendChild(a);
    } else {
      const span = createElement('span');
      span.setAttribute('itemprop', 'name');
      span.setAttribute('aria-current', 'page');
      span.textContent = item.name;
      li.appendChild(span);
    }

    const meta = createElement('meta');
    meta.setAttribute('itemprop', 'position');
    meta.setAttribute('content', (index + 1).toString());
    li.appendChild(meta);

    ol.appendChild(li);
  });

  breadcrumb.appendChild(ol);
  return breadcrumb;
}

function createOverviewSection(neighborhood: Neighborhood): HTMLElement {
  const section = createElement('section', 'neighborhood-detail__overview');

  const header = createElement('div', 'neighborhood-detail__section-header');
  const title = createElement('h2', 'neighborhood-detail__section-title', t('neighborhoodGuide.aboutNeighborhood', { name: neighborhood.name }));
  header.appendChild(title);
  section.appendChild(header);

  const content = createElement('div', 'neighborhood-detail__overview-content');

  // Long description paragraphs
  const paragraphs = neighborhood.longDescription.split('\n\n');
  paragraphs.forEach(para => {
    if (para.trim()) {
      const p = createElement('p', 'neighborhood-detail__text', para.trim());
      content.appendChild(p);
    }
  });

  section.appendChild(content);

  // Highlights
  const highlightsSection = createElement('div', 'neighborhood-detail__highlights');
  const highlightsTitle = createElement('h3', 'neighborhood-detail__highlights-title', t('neighborhoodGuide.whyChooseNeighborhood', { name: neighborhood.name }));
  highlightsSection.appendChild(highlightsTitle);

  const highlightsGrid = createElement('div', 'neighborhood-detail__highlights-grid');
  neighborhood.highlights.forEach(highlight => {
    const item = createElement('div', 'neighborhood-detail__highlight');
    item.appendChild(createSVG(ICONS.check, 'neighborhood-detail__highlight-icon'));
    const text = createElement('span', undefined, highlight);
    item.appendChild(text);
    highlightsGrid.appendChild(item);
  });
  highlightsSection.appendChild(highlightsGrid);
  section.appendChild(highlightsSection);

  return section;
}

function createPriceSection(neighborhood: Neighborhood): HTMLElement {
  const section = createElement('section', 'neighborhood-detail__prices');

  const header = createElement('div', 'neighborhood-detail__section-header');
  const title = createElement('h2', 'neighborhood-detail__section-title', t('neighborhoodGuide.propertyPrices'));
  const subtitle = createElement('p', 'neighborhood-detail__section-subtitle', t('neighborhoodGuide.currentMarketPrices', { name: neighborhood.name }));
  header.appendChild(title);
  header.appendChild(subtitle);
  section.appendChild(header);

  // Price Overview
  const overview = createElement('div', 'neighborhood-detail__price-overview');
  const overviewData = [
    { label: t('neighborhoodGuide.startingFrom'), value: formatNeighborhoodPrice(neighborhood.priceRange.min) },
    { label: t('neighborhoodGuide.upTo'), value: formatNeighborhoodPrice(neighborhood.priceRange.max) },
    { label: t('neighborhoodGuide.averagePrice'), value: formatNeighborhoodPrice(neighborhood.priceRange.average) },
    { label: t('neighborhoodGuide.pricePerSqm'), value: `$${neighborhood.priceRange.pricePerSqm.min} - $${neighborhood.priceRange.pricePerSqm.max}` }
  ];
  overviewData.forEach(item => {
    const card = createElement('div', 'neighborhood-detail__price-card');
    const label = createElement('span', 'neighborhood-detail__price-label', item.label);
    const value = createElement('span', 'neighborhood-detail__price-value', item.value);
    card.appendChild(label);
    card.appendChild(value);
    overview.appendChild(card);
  });
  section.appendChild(overview);

  // Property Types Table
  const tableWrapper = createElement('div', 'neighborhood-detail__table-wrapper');
  const table = createElement('table', 'neighborhood-detail__price-table');

  const thead = createElement('thead');
  const headerRow = createElement('tr');
  [t('neighborhoodGuide.propertyType'), t('neighborhoodGuide.priceRangeHeader'), t('neighborhoodGuide.availability')].forEach(text => {
    const th = createElement('th', undefined, text);
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = createElement('tbody');
  neighborhood.propertyTypes.forEach(prop => {
    const row = createElement('tr');

    const typeCell = createElement('td', undefined, prop.type);
    row.appendChild(typeCell);

    const priceCell = createElement('td', undefined, `${formatNeighborhoodPrice(prop.priceMin)} - ${formatNeighborhoodPrice(prop.priceMax)}`);
    row.appendChild(priceCell);

    const availCell = createElement('td');
    const availBadge = createElement('span', `neighborhood-detail__availability neighborhood-detail__availability--${prop.availability.toLowerCase().replace(' ', '-')}`, prop.availability);
    availCell.appendChild(availBadge);
    row.appendChild(availCell);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  section.appendChild(tableWrapper);

  return section;
}

function createAmenitiesSection(neighborhood: Neighborhood): HTMLElement {
  const section = createElement('section', 'neighborhood-detail__amenities');

  const header = createElement('div', 'neighborhood-detail__section-header');
  const title = createElement('h2', 'neighborhood-detail__section-title', t('neighborhoodGuide.nearbyAmenities'));
  const subtitle = createElement('p', 'neighborhood-detail__section-subtitle', t('neighborhoodGuide.amenitiesSubtitle', { name: neighborhood.name }));
  header.appendChild(title);
  header.appendChild(subtitle);
  section.appendChild(header);

  const grid = createElement('div', 'neighborhood-detail__amenities-grid');

  const categories = [
    { title: t('neighborhoodGuide.schoolsEducation'), icon: ICONS.school, items: neighborhood.amenities.schools },
    { title: t('neighborhoodGuide.healthcare'), icon: ICONS.hospital, items: neighborhood.amenities.hospitals },
    { title: t('neighborhoodGuide.shopping'), icon: ICONS.shopping, items: neighborhood.amenities.shopping },
    { title: t('neighborhoodGuide.dining'), icon: ICONS.restaurant, items: neighborhood.amenities.restaurants },
    { title: t('neighborhoodGuide.recreation'), icon: ICONS.park, items: neighborhood.amenities.recreation }
  ];

  categories.forEach(category => {
    if (category.items.length > 0) {
      const card = createElement('div', 'neighborhood-detail__amenity-card');

      const cardHeader = createElement('div', 'neighborhood-detail__amenity-header');
      cardHeader.appendChild(createSVG(category.icon, 'neighborhood-detail__amenity-icon'));
      const cardTitle = createElement('h3', 'neighborhood-detail__amenity-title', category.title);
      cardHeader.appendChild(cardTitle);
      card.appendChild(cardHeader);

      const list = createElement('ul', 'neighborhood-detail__amenity-list');
      category.items.forEach(item => {
        const li = createElement('li', 'neighborhood-detail__amenity-item');
        const name = createElement('span', 'neighborhood-detail__amenity-name', item.name);
        const distance = createElement('span', 'neighborhood-detail__amenity-distance', item.distance);
        li.appendChild(name);
        li.appendChild(distance);
        if (item.description) {
          const desc = createElement('span', 'neighborhood-detail__amenity-desc', item.description);
          li.appendChild(desc);
        }
        list.appendChild(li);
      });
      card.appendChild(list);

      grid.appendChild(card);
    }
  });

  section.appendChild(grid);
  return section;
}

function createTransportSection(neighborhood: Neighborhood): HTMLElement {
  const section = createElement('section', 'neighborhood-detail__transport');

  const header = createElement('div', 'neighborhood-detail__section-header');
  const title = createElement('h2', 'neighborhood-detail__section-title', t('neighborhoodGuide.transportationAccessibility'));
  const subtitle = createElement('p', 'neighborhood-detail__section-subtitle', t('neighborhoodGuide.gettingAroundFrom', { name: neighborhood.name }));
  header.appendChild(title);
  header.appendChild(subtitle);
  section.appendChild(header);

  const grid = createElement('div', 'neighborhood-detail__transport-grid');

  const iconMap: Record<string, string> = {
    'airport': ICONS.plane,
    'highway': ICONS.car,
    'public': ICONS.car,
    'taxi': ICONS.car
  };

  neighborhood.transportation.forEach(transport => {
    const card = createElement('div', 'neighborhood-detail__transport-card');

    const iconWrapper = createElement('div', 'neighborhood-detail__transport-icon-wrapper');
    iconWrapper.appendChild(createSVG(iconMap[transport.type] || ICONS.car, 'neighborhood-detail__transport-icon'));
    card.appendChild(iconWrapper);

    const content = createElement('div', 'neighborhood-detail__transport-content');
    const name = createElement('h4', 'neighborhood-detail__transport-name', transport.name);
    const distance = createElement('span', 'neighborhood-detail__transport-distance', transport.distance);
    content.appendChild(name);
    content.appendChild(distance);
    if (transport.details) {
      const details = createElement('p', 'neighborhood-detail__transport-details', transport.details);
      content.appendChild(details);
    }
    card.appendChild(content);

    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

function createLifestyleSection(neighborhood: Neighborhood): HTMLElement {
  const section = createElement('section', 'neighborhood-detail__lifestyle');

  const header = createElement('div', 'neighborhood-detail__section-header');
  const title = createElement('h2', 'neighborhood-detail__section-title', t('neighborhoodGuide.lifestyleCommunity'));
  const subtitle = createElement('p', 'neighborhood-detail__section-subtitle', t('neighborhoodGuide.whatItsLikeToLive', { name: neighborhood.name }));
  header.appendChild(title);
  header.appendChild(subtitle);
  section.appendChild(header);

  const content = createElement('div', 'neighborhood-detail__lifestyle-content');

  // Lifestyle Description
  const desc = createElement('p', 'neighborhood-detail__lifestyle-desc', neighborhood.lifestyle.description);
  content.appendChild(desc);

  // Lifestyle Grid
  const grid = createElement('div', 'neighborhood-detail__lifestyle-grid');

  // Vibe
  const vibeCard = createElement('div', 'neighborhood-detail__lifestyle-card');
  const vibeTitle = createElement('h4', undefined, t('neighborhoodGuide.communityVibe'));
  const vibeText = createElement('p', undefined, neighborhood.lifestyle.communityVibe);
  vibeCard.appendChild(vibeTitle);
  vibeCard.appendChild(vibeText);
  grid.appendChild(vibeCard);

  // Target Residents
  const targetCard = createElement('div', 'neighborhood-detail__lifestyle-card');
  const targetTitle = createElement('h4', undefined, t('neighborhoodGuide.idealFor'));
  const targetList = createElement('ul', 'neighborhood-detail__lifestyle-list');
  neighborhood.lifestyle.targetResidents.forEach(resident => {
    const li = createElement('li', undefined, resident);
    targetList.appendChild(li);
  });
  targetCard.appendChild(targetTitle);
  targetCard.appendChild(targetList);
  grid.appendChild(targetCard);

  // Features
  const featuresCard = createElement('div', 'neighborhood-detail__lifestyle-card');
  const featuresTitle = createElement('h4', undefined, t('neighborhoodGuide.features'));
  const featuresGrid = createElement('div', 'neighborhood-detail__lifestyle-features');

  const features = [
    { label: t('neighborhoodGuide.safetyRating'), value: `${neighborhood.lifestyle.safetyRating}/5`, icon: ICONS.safety },
    { label: t('neighborhoodGuide.familyFriendly'), value: neighborhood.lifestyle.familyFriendly ? t('neighborhoodGuide.yes') : t('neighborhoodGuide.no'), icon: ICONS.family },
    { label: t('neighborhoodGuide.petFriendly'), value: neighborhood.lifestyle.petFriendly ? t('neighborhoodGuide.yes') : t('neighborhoodGuide.no'), icon: ICONS.home },
    { label: t('neighborhoodGuide.expatFriendly'), value: neighborhood.lifestyle.expatFriendly ? t('neighborhoodGuide.yes') : t('neighborhoodGuide.no'), icon: ICONS.star }
  ];

  features.forEach(feature => {
    const item = createElement('div', 'neighborhood-detail__lifestyle-feature');
    const label = createElement('span', 'neighborhood-detail__lifestyle-feature-label', feature.label);
    const value = createElement('span', `neighborhood-detail__lifestyle-feature-value ${feature.value === 'Yes' || feature.value.includes('/5') ? 'neighborhood-detail__lifestyle-feature-value--positive' : ''}`, feature.value);
    item.appendChild(label);
    item.appendChild(value);
    featuresGrid.appendChild(item);
  });
  featuresCard.appendChild(featuresTitle);
  featuresCard.appendChild(featuresGrid);
  grid.appendChild(featuresCard);

  content.appendChild(grid);
  section.appendChild(content);

  return section;
}

function createMapSection(neighborhood: Neighborhood): HTMLElement {
  const section = createElement('section', 'neighborhood-detail__map');

  const header = createElement('div', 'neighborhood-detail__section-header');
  const title = createElement('h2', 'neighborhood-detail__section-title', t('neighborhoodGuide.neighborhoodLocation', { name: neighborhood.name }));
  const subtitle = createElement('p', 'neighborhood-detail__section-subtitle', t('neighborhoodGuide.exploreAreaOnMap'));
  header.appendChild(title);
  header.appendChild(subtitle);
  section.appendChild(header);

  const mapContainer = createElement('div', 'neighborhood-detail__map-container');

  const iframe = createElement('iframe', 'neighborhood-detail__map-iframe') as HTMLIFrameElement;
  iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${neighborhood.coordinates.lng}!3d${neighborhood.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${neighborhood.coordinates.lat}N+${neighborhood.coordinates.lng}E!5e0!3m2!1sen!2s!4v1708500000000`;
  iframe.width = '100%';
  iframe.height = '450';
  iframe.style.border = '0';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.title = `${neighborhood.name} location map`;
  mapContainer.appendChild(iframe);

  // Directions link
  const directionsLink = createElement('a', 'neighborhood-detail__directions');
  directionsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${neighborhood.coordinates.lat},${neighborhood.coordinates.lng}`;
  directionsLink.target = '_blank';
  directionsLink.rel = 'noopener noreferrer';
  directionsLink.appendChild(createSVG(ICONS.car, 'neighborhood-detail__directions-icon'));
  directionsLink.appendChild(document.createTextNode(' ' + t('neighborhoodGuide.getDrivingDirections')));
  mapContainer.appendChild(directionsLink);

  section.appendChild(mapContainer);

  return section;
}

function createPropertiesSection(neighborhood: Neighborhood, properties: Property[]): HTMLElement {
  const section = createElement('section', 'neighborhood-detail__properties');

  const header = createElement('div', 'neighborhood-detail__section-header');
  const title = createElement('h2', 'neighborhood-detail__section-title', t('neighborhoodGuide.propertiesInNeighborhood', { name: neighborhood.name }));
  const subtitle = createElement('p', 'neighborhood-detail__section-subtitle', t('neighborhoodGuide.featuredListingsAvailable'));
  header.appendChild(title);
  header.appendChild(subtitle);

  const viewAllLink = createElement('a', 'neighborhood-detail__view-all', t('neighborhoodGuide.viewAllProperties'));
  viewAllLink.href = `/properties?district=${neighborhood.slug}`;
  viewAllLink.setAttribute('data-route', '');
  viewAllLink.appendChild(createSVG(ICONS.arrow, 'neighborhood-detail__view-all-icon'));
  header.appendChild(viewAllLink);

  section.appendChild(header);

  const grid = createElement('div', 'neighborhood-detail__properties-grid');

  properties.forEach(property => {
    const card = createElement('article', 'property-card property-card--compact');

    const link = createElement('a', 'property-card__link');
    link.href = `/properties/${property.id}`;
    link.setAttribute('data-route', '');

    // Media
    const media = createElement('div', 'property-card__media');
    const img = createElement('img', 'property-card__image');
    img.src = property.images[0];
    img.alt = `${property.title} - ${property.location.district}`;
    img.loading = 'lazy';
    media.appendChild(img);
    link.appendChild(media);

    // Content
    const content = createElement('div', 'property-card__content');
    const type = createElement('span', 'property-card__type', property.type);
    const cardTitle = createElement('h3', 'property-card__title', property.title);
    const price = createElement('span', 'property-card__price', getDisplayPrice(property));
    content.appendChild(type);
    content.appendChild(cardTitle);
    content.appendChild(price);
    link.appendChild(content);

    card.appendChild(link);
    grid.appendChild(card);
  });

  section.appendChild(grid);

  return section;
}

function createProjectsSection(neighborhood: Neighborhood, projectsList: Project[]): HTMLElement {
  const section = createElement('section', 'neighborhood-detail__projects');

  const header = createElement('div', 'neighborhood-detail__section-header');
  const title = createElement('h2', 'neighborhood-detail__section-title', t('neighborhoodGuide.developmentProjectsIn', { name: neighborhood.name }));
  const subtitle = createElement('p', 'neighborhood-detail__section-subtitle', t('neighborhoodGuide.newDevelopmentsOpportunities'));
  header.appendChild(title);
  header.appendChild(subtitle);

  const viewAllLink = createElement('a', 'neighborhood-detail__view-all', t('neighborhoodGuide.viewAllProjects'));
  viewAllLink.href = '/projects';
  viewAllLink.setAttribute('data-route', '');
  viewAllLink.appendChild(createSVG(ICONS.arrow, 'neighborhood-detail__view-all-icon'));
  header.appendChild(viewAllLink);

  section.appendChild(header);

  const grid = createElement('div', 'neighborhood-detail__projects-grid');

  projectsList.forEach(project => {
    const card = createElement('article', 'project-card project-card--compact');

    const link = createElement('a', 'project-card__link');
    link.href = `/projects/${project.id}`;
    link.setAttribute('data-route', '');

    // Media
    const media = createElement('div', 'project-card__media');
    const img = createElement('img', 'project-card__image');
    img.src = project.images[0];
    img.alt = `${project.name} - ${project.status}`;
    img.loading = 'lazy';
    media.appendChild(img);

    const statusBadge = createElement('span', `project-card__status project-card__status--${project.status.toLowerCase().replace(' ', '-')}`, project.status);
    media.appendChild(statusBadge);

    link.appendChild(media);

    // Content
    const content = createElement('div', 'project-card__content');
    const cardTitle = createElement('h3', 'project-card__title', project.name);
    const location = createElement('p', 'project-card__location', `${project.location.district}, ${project.location.city}`);
    const priceFrom = createElement('span', 'project-card__price', `From $${(project.priceRange.min / 1000).toFixed(0)}K`);
    content.appendChild(cardTitle);
    content.appendChild(location);
    content.appendChild(priceFrom);
    link.appendChild(content);

    card.appendChild(link);
    grid.appendChild(card);
  });

  section.appendChild(grid);

  return section;
}

function createSidebar(neighborhood: Neighborhood): HTMLElement {
  const sidebar = createElement('aside', 'neighborhood-detail__sidebar');

  // Quick Info Card
  const infoCard = createElement('div', 'neighborhood-detail__sidebar-card');
  const infoTitle = createElement('h3', 'neighborhood-detail__sidebar-title', t('neighborhoodGuide.quickFacts', { name: neighborhood.name }));
  infoCard.appendChild(infoTitle);

  const dl = createElement('dl', 'neighborhood-detail__sidebar-list');
  const facts = [
    [t('neighborhoodGuide.lifestyle'), neighborhood.lifestyle.type],
    [t('neighborhoodGuide.priceRange'), getNeighborhoodPriceDisplay(neighborhood)],
    [t('neighborhoodGuide.avgPrice'), formatNeighborhoodPrice(neighborhood.priceRange.average)],
    [t('neighborhoodGuide.propertyTypesLabel'), neighborhood.propertyTypes.length.toString()],
    [t('neighborhoodGuide.safetyRating'), `${neighborhood.lifestyle.safetyRating}/5`],
    [t('neighborhoodGuide.familyFriendly'), neighborhood.lifestyle.familyFriendly ? t('neighborhoodGuide.yes') : t('neighborhoodGuide.no')]
  ];
  facts.forEach(([term, def]) => {
    const dt = createElement('dt', undefined, term);
    const dd = createElement('dd', undefined, def);
    dl.appendChild(dt);
    dl.appendChild(dd);
  });
  infoCard.appendChild(dl);
  sidebar.appendChild(infoCard);

  // Contact Card
  const contactCard = createElement('div', 'neighborhood-detail__sidebar-card');
  const contactTitle = createElement('h3', 'neighborhood-detail__sidebar-title', t('neighborhoodGuide.interestedInNeighborhood', { name: neighborhood.name }));
  const contactText = createElement('p', 'neighborhood-detail__sidebar-text', t('neighborhoodGuide.localExpertsHelp'));
  contactCard.appendChild(contactTitle);
  contactCard.appendChild(contactText);

  const scheduleBtn = createElement('a', 'btn btn--primary btn--full', t('neighborhoodGuide.scheduleFreeConsultation'));
  scheduleBtn.href = '/contact';
  scheduleBtn.setAttribute('data-route', '');
  contactCard.appendChild(scheduleBtn);

  const phoneLink = createElement('a', 'neighborhood-detail__sidebar-phone');
  phoneLink.href = `tel:${businessNAP.phones[0].number.replace(/\s/g, '')}`;
  phoneLink.appendChild(createSVG(ICONS.phone, 'neighborhood-detail__sidebar-phone-icon'));
  phoneLink.appendChild(document.createTextNode(businessNAP.phones[0].number));
  contactCard.appendChild(phoneLink);

  sidebar.appendChild(contactCard);

  return sidebar;
}

function createCTASection(neighborhood: Neighborhood): HTMLElement {
  const section = createElement('section', 'neighborhood-detail__cta');

  const content = createElement('div', 'neighborhood-detail__cta-content');
  const title = createElement('h2', undefined, t('neighborhoodGuide.readyToFindProperty', { name: neighborhood.name }));
  const text = createElement('p', undefined, t('neighborhoodGuide.contactTodayForGuidance', { name: neighborhood.name }));

  const buttons = createElement('div', 'neighborhood-detail__cta-buttons');

  const scheduleBtn = createElement('a', 'btn btn--primary btn--large', t('neighborhoodGuide.scheduleViewing'));
  scheduleBtn.href = '/contact';
  scheduleBtn.setAttribute('data-route', '');
  buttons.appendChild(scheduleBtn);

  const whatsappBtn = createElement('a', 'btn btn--secondary btn--large');
  whatsappBtn.href = `https://wa.me/${businessNAP.phones[0].number.replace(/[\s+]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in properties in ${neighborhood.name}, Erbil.`)}`;
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.textContent = t('neighborhoodGuide.whatsappUs');
  buttons.appendChild(whatsappBtn);

  content.appendChild(title);
  content.appendChild(text);
  content.appendChild(buttons);
  section.appendChild(content);

  return section;
}

function createOtherNeighborhoodsSection(currentNeighborhood: Neighborhood): HTMLElement {
  const section = createElement('section', 'neighborhood-detail__other');

  const header = createElement('div', 'neighborhood-detail__section-header');
  const title = createElement('h2', 'neighborhood-detail__section-title', t('neighborhoodGuide.exploreOtherNeighborhoods'));
  header.appendChild(title);
  section.appendChild(header);

  const grid = createElement('div', 'neighborhood-detail__other-grid');

  neighborhoods
    .filter(n => n.id !== currentNeighborhood.id)
    .slice(0, 4)
    .forEach(neighborhood => {
      const card = createElement('a', 'neighborhood-detail__other-card');
      card.href = `/neighborhoods/${neighborhood.slug}`;
      card.setAttribute('data-route', '');

      const img = createElement('img', 'neighborhood-detail__other-image');
      img.src = neighborhood.image;
      img.alt = neighborhood.name;
      img.loading = 'lazy';
      card.appendChild(img);

      const overlay = createElement('div', 'neighborhood-detail__other-overlay');
      const name = createElement('h3', 'neighborhood-detail__other-name', neighborhood.name);
      const price = createElement('span', 'neighborhood-detail__other-price', t('neighborhoodGuide.fromPrice', { price: formatNeighborhoodPrice(neighborhood.priceRange.min) }));
      overlay.appendChild(name);
      overlay.appendChild(price);
      card.appendChild(overlay);

      grid.appendChild(card);
    });

  section.appendChild(grid);

  const viewAll = createElement('a', 'neighborhood-detail__other-view-all btn btn--ghost', t('neighborhoodGuide.viewAllNeighborhoods'));
  viewAll.href = '/neighborhoods';
  viewAll.setAttribute('data-route', '');
  section.appendChild(viewAll);

  return section;
}

function render404NeighborhoodPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('div', 'neighborhood-detail neighborhood-detail--404');

  const container = createElement('div', 'neighborhood-detail__404');
  const title = createElement('h1', undefined, t('neighborhoodGuide.neighborhoodNotFound'));
  const text = createElement('p', undefined, t('neighborhoodGuide.couldntFindNeighborhood', { slug }));

  const buttons = createElement('div', 'neighborhood-detail__404-buttons');

  const neighborhoodsBtn = createElement('a', 'btn btn--primary', t('neighborhoodGuide.viewAllNeighborhoods'));
  neighborhoodsBtn.href = '/neighborhoods';
  neighborhoodsBtn.setAttribute('data-route', '');
  buttons.appendChild(neighborhoodsBtn);

  const propertiesBtn = createElement('a', 'btn btn--secondary', t('neighborhoodGuide.browseProperties'));
  propertiesBtn.href = '/properties';
  propertiesBtn.setAttribute('data-route', '');
  buttons.appendChild(propertiesBtn);

  container.appendChild(title);
  container.appendChild(text);
  container.appendChild(buttons);
  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ===============================================================================
// SEO Functions
// ===============================================================================

export function setupNeighborhoodsPageSEO(): void {
  document.title = 'Erbil Neighborhood Guides | Real House';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', 'Explore Erbil\'s premier neighborhoods. Comprehensive guides to Empire World, Dream City, Ankawa, Gulan & more. Find your perfect area. Real House experts.');
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', 'https://realhouseiq.com/neighborhoods');
  }
}

export function setupNeighborhoodDetailPageSEO(neighborhood: Neighborhood): void {
  document.title = neighborhood.metaTitle;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', neighborhood.metaDescription);
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://realhouseiq.com/neighborhoods/${neighborhood.slug}`);
  }

  // Keywords
  let keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (!keywordsMeta) {
    keywordsMeta = document.createElement('meta');
    keywordsMeta.setAttribute('name', 'keywords');
    document.head.appendChild(keywordsMeta);
  }
  keywordsMeta.setAttribute('content', neighborhood.seoKeywords.join(', '));

  // Geo meta tags for local SEO
  updateOrCreateMeta('geo.region', 'IQ-AR');
  updateOrCreateMeta('geo.placename', `${neighborhood.name}, Erbil, Kurdistan`);
  updateOrCreateMeta('geo.position', `${neighborhood.coordinates.lat};${neighborhood.coordinates.lng}`);
  updateOrCreateMeta('ICBM', `${neighborhood.coordinates.lat}, ${neighborhood.coordinates.lng}`);

  // Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', neighborhood.metaTitle);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', neighborhood.metaDescription);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `https://realhouseiq.com/neighborhoods/${neighborhood.slug}`);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', neighborhood.image);
}

function updateOrCreateMeta(name: string, content: string): void {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

// ===============================================================================
// JSON-LD Schema Generation
// ===============================================================================

function generateNeighborhoodSchema(neighborhood: Neighborhood): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Place schema for the neighborhood
      {
        '@type': 'Place',
        '@id': `https://realhouseiq.com/neighborhoods/${neighborhood.slug}#place`,
        'name': `${neighborhood.name}, Erbil`,
        'description': neighborhood.description,
        'url': `https://realhouseiq.com/neighborhoods/${neighborhood.slug}`,
        'image': neighborhood.galleryImages,
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': neighborhood.coordinates.lat,
          'longitude': neighborhood.coordinates.lng
        },
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Erbil',
          'addressRegion': 'Kurdistan Region',
          'addressCountry': 'Iraq'
        },
        'containedInPlace': {
          '@type': 'City',
          'name': 'Erbil',
          'sameAs': 'https://en.wikipedia.org/wiki/Erbil'
        },
        'amenityFeature': [
          ...neighborhood.amenities.schools.map(a => ({
            '@type': 'LocationFeatureSpecification',
            'name': a.name,
            'value': true
          })),
          ...neighborhood.amenities.hospitals.map(a => ({
            '@type': 'LocationFeatureSpecification',
            'name': a.name,
            'value': true
          })),
          ...neighborhood.amenities.shopping.map(a => ({
            '@type': 'LocationFeatureSpecification',
            'name': a.name,
            'value': true
          }))
        ]
      },
      // LocalBusiness for Real House
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://realhouseiq.com/#organization',
        'name': businessNAP.name,
        'url': businessNAP.website,
        'telephone': businessNAP.phones[0].number,
        'email': businessNAP.email,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': businessNAP.address.street,
          'addressLocality': businessNAP.address.city,
          'addressRegion': businessNAP.address.region,
          'addressCountry': businessNAP.address.countryCode
        },
        'areaServed': {
          '@type': 'Place',
          'name': neighborhood.name,
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Erbil',
            'addressRegion': 'Kurdistan Region',
            'addressCountry': 'Iraq'
          }
        },
        'priceRange': `${formatNeighborhoodPrice(neighborhood.priceRange.min)} - ${formatNeighborhoodPrice(neighborhood.priceRange.max)}`
      },
      // Breadcrumb schema
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://realhouseiq.com'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Neighborhoods',
            'item': 'https://realhouseiq.com/neighborhoods'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': neighborhood.name,
            'item': `https://realhouseiq.com/neighborhoods/${neighborhood.slug}`
          }
        ]
      }
    ]
  };
}

function generateNeighborhoodsListSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Erbil Neighborhoods',
    'description': 'Comprehensive guides to neighborhoods and areas in Erbil, Kurdistan',
    'url': 'https://realhouseiq.com/neighborhoods',
    'numberOfItems': neighborhoods.length,
    'itemListElement': neighborhoods.map((neighborhood, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': neighborhood.name,
      'url': `https://realhouseiq.com/neighborhoods/${neighborhood.slug}`,
      'item': {
        '@type': 'Place',
        'name': neighborhood.name,
        'description': neighborhood.description,
        'image': neighborhood.image
      }
    }))
  };
}

// ===============================================================================
// Exports
// ===============================================================================

export { getAllNeighborhoodSlugs, getNeighborhoodBySlug };
