// ═══════════════════════════════════════════════════════════════════════════
// Hub Pages for SEO Internal Linking
// /buy, /rent, /invest, /luxury
// ═══════════════════════════════════════════════════════════════════════════

import { properties, type Property, formatPrice } from '../data/properties';
import { projects, type Project, formatPriceRange } from '../data/projects';
import { blogPosts } from '../data/blog';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  getBuyBreadcrumbs,
  getRentBreadcrumbs,
  getInvestBreadcrumbs,
  getLuxuryBreadcrumbs
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
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

// ─── Property Card for Hub Pages ─────────────────────────────────────────
function createHubPropertyCard(property: Property): HTMLElement {
  const card = createElement('a', 'hub-property-card');
  card.href = `/properties/${property.id}`;
  card.setAttribute('data-route', '');

  // Image
  const imageWrapper = createElement('div', 'hub-property-card__image-wrapper');
  const img = createElement('img', 'hub-property-card__image');
  img.src = property.images[0];
  img.alt = `${property.title} - ${property.type} ${property.status.toLowerCase()} in ${property.location.district}, Erbil`;
  img.loading = 'lazy';
  imageWrapper.appendChild(img);

  // Badges
  const badges = createElement('div', 'hub-property-card__badges');
  if (property.badges && property.badges.length > 0) {
    property.badges.forEach(badge => {
      const badgeEl = createElement('span', `hub-property-card__badge hub-property-card__badge--${badge.toLowerCase()}`, badge);
      badges.appendChild(badgeEl);
    });
  }
  const statusBadge = createElement('span', `hub-property-card__badge hub-property-card__badge--status`, property.status);
  badges.appendChild(statusBadge);
  imageWrapper.appendChild(badges);

  card.appendChild(imageWrapper);

  // Content
  const content = createElement('div', 'hub-property-card__content');

  const type = createElement('span', 'hub-property-card__type', property.type);
  content.appendChild(type);

  const title = createElement('h3', 'hub-property-card__title', property.title);
  content.appendChild(title);

  const location = createElement('p', 'hub-property-card__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${property.location.district}, ${property.location.city}`));
  content.appendChild(location);

  // Specs
  const specs = createElement('div', 'hub-property-card__specs');
  const specItems = [
    { icon: 'icon-bed', value: `${property.specs.beds} Beds` },
    { icon: 'icon-bath', value: `${property.specs.baths} Baths` },
    { icon: 'icon-area', value: `${property.specs.sqm.toLocaleString()} m\u00B2` }
  ];
  specItems.forEach(spec => {
    const specEl = createElement('span', 'hub-property-card__spec');
    specEl.appendChild(createSVGUse(spec.icon));
    specEl.appendChild(document.createTextNode(spec.value));
    specs.appendChild(specEl);
  });
  content.appendChild(specs);

  // Price
  const price = createElement('div', 'hub-property-card__price');
  if (property.price > 0) {
    price.textContent = formatPrice(property.price);
    if (property.status === 'For Rent') {
      price.textContent += '/month';
    }
  } else {
    price.textContent = 'Contact for Price';
  }
  content.appendChild(price);

  card.appendChild(content);
  return card;
}

// ─── Hub Page Template ─────────────────────────────────────────────────────
interface HubPageConfig {
  title: string;
  titleEm: string;
  subtitle: string;
  metaDescription: string;
  filterFn: (p: Property) => boolean;
  relatedLinks: { name: string; url: string; description: string }[];
  ctaTitle: string;
  ctaText: string;
}

function renderHubPage(config: HubPageConfig, breadcrumbsFn: () => ReturnType<typeof getBuyBreadcrumbs>): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = breadcrumbsFn();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'hub-page');
  const container = createElement('div', 'container');

  // Breadcrumbs
  container.appendChild(createBreadcrumbs(breadcrumbs));

  // Header
  const header = createElement('header', 'hub-page__header');
  const title = createElement('h1', 'hub-page__title');
  title.textContent = config.title + ' ';
  const em = createElement('em', undefined, config.titleEm);
  title.appendChild(em);
  header.appendChild(title);
  const subtitle = createElement('p', 'hub-page__subtitle', config.subtitle);
  header.appendChild(subtitle);
  container.appendChild(header);

  // Stats Section
  const filteredProperties = properties.filter(config.filterFn);
  const stats = createElement('div', 'hub-page__stats');

  const statItems = [
    { value: filteredProperties.length.toString(), label: 'Properties Available' },
    { value: [...new Set(filteredProperties.map(p => p.type))].length.toString(), label: 'Property Types' },
    { value: [...new Set(filteredProperties.map(p => p.location.district))].length.toString(), label: 'Locations' }
  ];

  statItems.forEach(stat => {
    const statEl = createElement('div', 'hub-page__stat');
    const value = createElement('span', 'hub-page__stat-value', stat.value);
    statEl.appendChild(value);
    const label = createElement('span', 'hub-page__stat-label', stat.label);
    statEl.appendChild(label);
    stats.appendChild(statEl);
  });

  container.appendChild(stats);

  // Quick Filters / Property Type Links
  const quickFilters = createElement('div', 'hub-page__quick-filters');
  const filterTitle = createElement('h2', 'hub-page__section-title', 'Browse by Property Type');
  quickFilters.appendChild(filterTitle);

  const filterLinks = createElement('div', 'hub-page__filter-links');
  const types = [...new Set(filteredProperties.map(p => p.type))];
  types.forEach(type => {
    const count = filteredProperties.filter(p => p.type === type).length;
    const link = createElement('a', 'hub-page__filter-link');
    link.href = `/properties?type=${type}&status=${config.filterFn.toString().includes('For Sale') ? 'For%20Sale' : config.filterFn.toString().includes('For Rent') ? 'For%20Rent' : ''}`;
    link.setAttribute('data-route', '');
    link.textContent = `${type}s (${count})`;
    filterLinks.appendChild(link);
  });
  quickFilters.appendChild(filterLinks);
  container.appendChild(quickFilters);

  // Properties Grid
  const propertiesSection = createElement('section', 'hub-page__properties');
  const propertiesTitle = createElement('h2', 'hub-page__section-title', 'Featured Properties');
  propertiesSection.appendChild(propertiesTitle);

  const grid = createElement('div', 'hub-page__grid');
  filteredProperties.slice(0, 12).forEach(property => {
    grid.appendChild(createHubPropertyCard(property));
  });
  propertiesSection.appendChild(grid);

  // View All Link
  if (filteredProperties.length > 12) {
    const viewAllWrapper = createElement('div', 'hub-page__view-all-wrapper');
    const viewAll = createElement('a', 'btn btn--primary', `View All ${filteredProperties.length} Properties`);
    viewAll.href = '/properties';
    viewAll.setAttribute('data-route', '');
    viewAllWrapper.appendChild(viewAll);
    propertiesSection.appendChild(viewAllWrapper);
  }

  container.appendChild(propertiesSection);

  // Location Links
  const locationsSection = createElement('section', 'hub-page__locations');
  const locationsTitle = createElement('h2', 'hub-page__section-title', 'Browse by Location');
  locationsSection.appendChild(locationsTitle);

  const locationLinks = createElement('div', 'hub-page__location-links');
  const districts = [...new Set(filteredProperties.map(p => p.location.district))];
  districts.forEach(district => {
    const count = filteredProperties.filter(p => p.location.district === district).length;
    const link = createElement('a', 'hub-page__location-link');
    link.href = `/properties?district=${encodeURIComponent(district)}`;
    link.setAttribute('data-route', '');

    const districtName = createElement('span', 'hub-page__location-name', district);
    link.appendChild(districtName);
    const districtCount = createElement('span', 'hub-page__location-count', `${count} properties`);
    link.appendChild(districtCount);

    locationLinks.appendChild(link);
  });
  locationsSection.appendChild(locationLinks);
  container.appendChild(locationsSection);

  // Related Links Section
  const relatedSection = createElement('section', 'hub-page__related');
  const relatedTitle = createElement('h2', 'hub-page__section-title', 'Related Resources');
  relatedSection.appendChild(relatedTitle);

  const relatedGrid = createElement('div', 'hub-page__related-grid');
  config.relatedLinks.forEach(link => {
    const card = createElement('a', 'hub-page__related-card');
    card.href = link.url;
    card.setAttribute('data-route', '');

    const cardTitle = createElement('h3', 'hub-page__related-card-title', link.name);
    card.appendChild(cardTitle);
    const cardDesc = createElement('p', 'hub-page__related-card-desc', link.description);
    card.appendChild(cardDesc);
    card.appendChild(createSVGUse('icon-arrow-right'));

    relatedGrid.appendChild(card);
  });
  relatedSection.appendChild(relatedGrid);
  container.appendChild(relatedSection);

  // CTA Section
  const ctaSection = createElement('section', 'hub-page__cta');
  const ctaContent = createElement('div', 'hub-page__cta-content');
  const ctaTitle = createElement('h2', 'hub-page__cta-title', config.ctaTitle);
  ctaContent.appendChild(ctaTitle);
  const ctaText = createElement('p', 'hub-page__cta-text', config.ctaText);
  ctaContent.appendChild(ctaText);
  const ctaBtn = createElement('a', 'btn btn--primary', 'Contact Our Experts');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  ctaContent.appendChild(ctaBtn);
  ctaSection.appendChild(ctaContent);
  container.appendChild(ctaSection);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// BUY PAGE - Properties for Sale
// ═══════════════════════════════════════════════════════════════════════════

export function renderBuyPage(): DocumentFragment {
  return renderHubPage({
    title: 'Properties',
    titleEm: 'For Sale',
    subtitle: 'Discover your dream home in Erbil. Browse our exclusive collection of apartments, villas, penthouses, and more available for purchase.',
    metaDescription: 'Find properties for sale in Erbil, Kurdistan. Browse luxury villas, apartments, penthouses, and commercial properties. Expert guidance for property buyers.',
    filterFn: (p) => p.status === 'For Sale',
    relatedLinks: [
      { name: 'Rental Properties', url: '/rent', description: 'Browse properties available for rent in Erbil' },
      { name: 'Investment Opportunities', url: '/invest', description: 'Find high-yield investment properties' },
      { name: 'Buying Guide', url: '/blog/how-to-buy-property-in-erbil', description: 'Essential guide for property buyers in Kurdistan' },
      { name: 'Development Projects', url: '/projects', description: 'Explore new residential developments' }
    ],
    ctaTitle: 'Ready to Find Your Dream Home?',
    ctaText: 'Our expert team will help you find the perfect property that matches your requirements and budget.'
  }, getBuyBreadcrumbs);
}

export function setupBuyPageSEO(): void {
  document.title = 'Properties for Sale in Erbil | Buy Homes & Apartments | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Find properties for sale in Erbil, Kurdistan. Browse luxury villas, apartments, penthouses, and commercial properties. Expert guidance for property buyers.');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// RENT PAGE - Properties for Rent
// ═══════════════════════════════════════════════════════════════════════════

export function renderRentPage(): DocumentFragment {
  return renderHubPage({
    title: 'Properties',
    titleEm: 'For Rent',
    subtitle: 'Find your perfect rental in Erbil. From furnished apartments to luxury villas, discover premium rental properties across Kurdistan.',
    metaDescription: 'Rent apartments, villas, and homes in Erbil. Browse furnished and unfurnished rental properties in top locations across Kurdistan Region.',
    filterFn: (p) => p.status === 'For Rent',
    relatedLinks: [
      { name: 'Properties for Sale', url: '/buy', description: 'Looking to buy? Browse properties for sale' },
      { name: 'Expat Housing Guide', url: '/blog/expat-guide-to-living-in-erbil', description: 'Essential tips for expats renting in Erbil' },
      { name: 'Furnished Apartments', url: '/properties?furnished=true', description: 'Move-in ready furnished properties' },
      { name: 'Commercial Rentals', url: '/properties?type=Commercial&status=For%20Rent', description: 'Office and retail spaces for rent' }
    ],
    ctaTitle: 'Looking for the Perfect Rental?',
    ctaText: 'Let us help you find a rental property that fits your lifestyle and budget.'
  }, getRentBreadcrumbs);
}

export function setupRentPageSEO(): void {
  document.title = 'Properties for Rent in Erbil | Apartments & Villas | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Rent apartments, villas, and homes in Erbil. Browse furnished and unfurnished rental properties in top locations across Kurdistan Region.');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// INVEST PAGE - Investment Properties
// ═══════════════════════════════════════════════════════════════════════════

export function renderInvestPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getInvestBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'hub-page hub-page--invest');
  const container = createElement('div', 'container');

  // Breadcrumbs
  container.appendChild(createBreadcrumbs(breadcrumbs));

  // Header
  const header = createElement('header', 'hub-page__header');
  const title = createElement('h1', 'hub-page__title');
  title.textContent = 'Investment ';
  const em = createElement('em', undefined, 'Properties');
  title.appendChild(em);
  header.appendChild(title);
  const subtitle = createElement('p', 'hub-page__subtitle', 'Maximize your returns with strategic real estate investments in Erbil. From off-plan developments to rental income properties.');
  header.appendChild(subtitle);
  container.appendChild(header);

  // Investment benefits
  const benefits = createElement('section', 'hub-page__benefits');
  const benefitsTitle = createElement('h2', 'hub-page__section-title', 'Why Invest in Erbil Real Estate?');
  benefits.appendChild(benefitsTitle);

  const benefitsGrid = createElement('div', 'hub-page__benefits-grid');
  const benefitItems = [
    { title: 'High ROI Potential', desc: 'Rental yields averaging 8-12% annually in prime locations' },
    { title: 'Growing Market', desc: 'Kurdistan\'s economy continues to expand, driving property values' },
    { title: 'Tax Benefits', desc: 'Favorable tax environment for foreign investors' },
    { title: 'Strategic Location', desc: 'Erbil is a regional business and diplomatic hub' }
  ];

  benefitItems.forEach(benefit => {
    const card = createElement('div', 'hub-page__benefit-card');
    const cardTitle = createElement('h3', 'hub-page__benefit-title', benefit.title);
    card.appendChild(cardTitle);
    const cardDesc = createElement('p', 'hub-page__benefit-desc', benefit.desc);
    card.appendChild(cardDesc);
    benefitsGrid.appendChild(card);
  });
  benefits.appendChild(benefitsGrid);
  container.appendChild(benefits);

  // Investment Properties - Focus on off-plan and high-value
  const investProps = properties.filter(p =>
    p.badges?.includes('Installment') ||
    p.status === 'Off Plan' ||
    p.price >= 500000
  );

  const propertiesSection = createElement('section', 'hub-page__properties');
  const propertiesTitle = createElement('h2', 'hub-page__section-title', 'Investment Opportunities');
  propertiesSection.appendChild(propertiesTitle);

  const grid = createElement('div', 'hub-page__grid');
  investProps.slice(0, 8).forEach(property => {
    grid.appendChild(createHubPropertyCard(property));
  });
  propertiesSection.appendChild(grid);
  container.appendChild(propertiesSection);

  // Development Projects for investors
  const projectsSection = createElement('section', 'hub-page__projects');
  const projectsTitle = createElement('h2', 'hub-page__section-title', 'Featured Development Projects');
  projectsSection.appendChild(projectsTitle);

  const projectsSubtitle = createElement('p', 'hub-page__projects-subtitle', 'Invest early in premier developments with attractive payment plans and growth potential.');
  projectsSection.appendChild(projectsSubtitle);

  const projectsGrid = createElement('div', 'hub-page__projects-grid');
  projects.slice(0, 4).forEach(project => {
    const card = createElement('a', 'hub-page__project-card');
    card.href = `/projects/${project.id}`;
    card.setAttribute('data-route', '');

    const imgWrapper = createElement('div', 'hub-page__project-image-wrapper');
    const img = createElement('img', 'hub-page__project-image');
    img.src = project.images[0];
    img.alt = `${project.name} - ${project.status} in ${project.location.district}`;
    img.loading = 'lazy';
    imgWrapper.appendChild(img);

    const badge = createElement('span', 'hub-page__project-badge', project.status);
    imgWrapper.appendChild(badge);
    card.appendChild(imgWrapper);

    const content = createElement('div', 'hub-page__project-content');
    const projectTitle = createElement('h3', 'hub-page__project-title', project.name);
    content.appendChild(projectTitle);
    const projectLocation = createElement('p', 'hub-page__project-location', `${project.location.district}, ${project.location.city}`);
    content.appendChild(projectLocation);
    const projectPrice = createElement('p', 'hub-page__project-price', `From ${formatPriceRange(project)}`);
    content.appendChild(projectPrice);
    const projectUnits = createElement('p', 'hub-page__project-units', `${project.availableUnits} units available`);
    content.appendChild(projectUnits);
    card.appendChild(content);

    projectsGrid.appendChild(card);
  });
  projectsSection.appendChild(projectsGrid);

  const viewAllProjects = createElement('div', 'hub-page__view-all-wrapper');
  const viewAllBtn = createElement('a', 'btn btn--ghost', 'View All Projects');
  viewAllBtn.href = '/projects';
  viewAllBtn.setAttribute('data-route', '');
  viewAllProjects.appendChild(viewAllBtn);
  projectsSection.appendChild(viewAllProjects);

  container.appendChild(projectsSection);

  // Related Articles
  const articlesSection = createElement('section', 'hub-page__articles');
  const articlesTitle = createElement('h2', 'hub-page__section-title', 'Investment Insights');
  articlesSection.appendChild(articlesTitle);

  const articlesGrid = createElement('div', 'hub-page__articles-grid');
  const investmentPosts = blogPosts.filter(p =>
    p.category === 'Investment' ||
    p.tags.some(t => t.toLowerCase().includes('invest'))
  ).slice(0, 3);

  investmentPosts.forEach(post => {
    const card = createElement('a', 'hub-page__article-card');
    card.href = `/blog/${post.slug}`;
    card.setAttribute('data-route', '');

    const articleTitle = createElement('h3', 'hub-page__article-title', post.title);
    card.appendChild(articleTitle);
    const articleExcerpt = createElement('p', 'hub-page__article-excerpt', post.excerpt.substring(0, 100) + '...');
    card.appendChild(articleExcerpt);
    card.appendChild(createSVGUse('icon-arrow-right'));

    articlesGrid.appendChild(card);
  });
  articlesSection.appendChild(articlesGrid);
  container.appendChild(articlesSection);

  // CTA
  const ctaSection = createElement('section', 'hub-page__cta');
  const ctaContent = createElement('div', 'hub-page__cta-content');
  const ctaTitle = createElement('h2', 'hub-page__cta-title', 'Ready to Start Your Investment Journey?');
  ctaContent.appendChild(ctaTitle);
  const ctaText = createElement('p', 'hub-page__cta-text', 'Our investment advisors will guide you through the best opportunities in Erbil\'s real estate market.');
  ctaContent.appendChild(ctaText);
  const ctaBtn = createElement('a', 'btn btn--primary', 'Schedule a Consultation');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  ctaContent.appendChild(ctaBtn);
  ctaSection.appendChild(ctaContent);
  container.appendChild(ctaSection);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

export function setupInvestPageSEO(): void {
  document.title = 'Investment Properties in Erbil | Real Estate Investment | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Invest in Erbil real estate. High-yield investment properties, off-plan developments, and rental income opportunities in Kurdistan Region.');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// LUXURY PAGE - Premium Properties
// ═══════════════════════════════════════════════════════════════════════════

export function renderLuxuryPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getLuxuryBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'hub-page hub-page--luxury');
  const container = createElement('div', 'container');

  // Breadcrumbs
  container.appendChild(createBreadcrumbs(breadcrumbs));

  // Hero Header
  const header = createElement('header', 'hub-page__header hub-page__header--luxury');
  const title = createElement('h1', 'hub-page__title');
  title.textContent = 'Luxury ';
  const em = createElement('em', undefined, 'Properties');
  title.appendChild(em);
  header.appendChild(title);
  const subtitle = createElement('p', 'hub-page__subtitle', 'Experience the finest in Erbil living. Our curated collection of luxury homes represents the pinnacle of elegance, comfort, and prestige.');
  header.appendChild(subtitle);
  container.appendChild(header);

  // Luxury Properties - High-value and exclusive
  const luxuryProps = properties.filter(p =>
    p.price >= 400000 ||
    p.badges?.includes('Exclusive') ||
    p.type === 'Penthouse' ||
    p.type === 'Villa'
  ).sort((a, b) => b.price - a.price);

  // Featured Luxury Property
  if (luxuryProps.length > 0) {
    const featuredSection = createElement('section', 'hub-page__featured');
    const featured = luxuryProps[0];

    const featuredCard = createElement('a', 'hub-page__featured-card');
    featuredCard.href = `/properties/${featured.id}`;
    featuredCard.setAttribute('data-route', '');

    const featuredImage = createElement('div', 'hub-page__featured-image');
    const img = createElement('img');
    img.src = featured.images[0];
    img.alt = `${featured.title} - Premier ${featured.type} in ${featured.location.district}`;
    featuredImage.appendChild(img);
    featuredCard.appendChild(featuredImage);

    const featuredContent = createElement('div', 'hub-page__featured-content');
    const featuredBadge = createElement('span', 'hub-page__featured-badge', 'Featured Luxury Property');
    featuredContent.appendChild(featuredBadge);
    const featuredTitle = createElement('h2', 'hub-page__featured-title', featured.title);
    featuredContent.appendChild(featuredTitle);
    const featuredLocation = createElement('p', 'hub-page__featured-location', `${featured.location.district}, ${featured.location.city}`);
    featuredContent.appendChild(featuredLocation);

    const featuredSpecs = createElement('div', 'hub-page__featured-specs');
    featuredSpecs.textContent = `${featured.specs.beds} Bedrooms | ${featured.specs.baths} Bathrooms | ${featured.specs.sqm.toLocaleString()} m\u00B2`;
    featuredContent.appendChild(featuredSpecs);

    const featuredPrice = createElement('span', 'hub-page__featured-price', formatPrice(featured.price));
    featuredContent.appendChild(featuredPrice);

    const viewBtn = createElement('span', 'btn btn--primary', 'View Property');
    featuredContent.appendChild(viewBtn);

    featuredCard.appendChild(featuredContent);
    featuredSection.appendChild(featuredCard);
    container.appendChild(featuredSection);
  }

  // Luxury Collection Grid
  const propertiesSection = createElement('section', 'hub-page__properties');
  const propertiesTitle = createElement('h2', 'hub-page__section-title', 'The Luxury Collection');
  propertiesSection.appendChild(propertiesTitle);

  const grid = createElement('div', 'hub-page__grid');
  luxuryProps.slice(1, 9).forEach(property => {
    grid.appendChild(createHubPropertyCard(property));
  });
  propertiesSection.appendChild(grid);

  if (luxuryProps.length > 9) {
    const viewAllWrapper = createElement('div', 'hub-page__view-all-wrapper');
    const viewAll = createElement('a', 'btn btn--primary', `View All ${luxuryProps.length} Luxury Properties`);
    viewAll.href = '/properties?price=$400K%2B';
    viewAll.setAttribute('data-route', '');
    viewAllWrapper.appendChild(viewAll);
    propertiesSection.appendChild(viewAllWrapper);
  }
  container.appendChild(propertiesSection);

  // Luxury By Type
  const typeSection = createElement('section', 'hub-page__by-type');
  const typeTitle = createElement('h2', 'hub-page__section-title', 'Browse by Property Type');
  typeSection.appendChild(typeTitle);

  const typeGrid = createElement('div', 'hub-page__type-grid');
  const luxuryTypes = [
    { type: 'Villa', desc: 'Exclusive villas with private gardens and premium finishes', count: luxuryProps.filter(p => p.type === 'Villa').length },
    { type: 'Penthouse', desc: 'Sky-high living with panoramic city views', count: luxuryProps.filter(p => p.type === 'Penthouse').length },
    { type: 'Duplex', desc: 'Two-story luxury living spaces', count: luxuryProps.filter(p => p.type === 'Duplex').length },
    { type: 'Apartment', desc: 'Premium apartments in prestigious buildings', count: luxuryProps.filter(p => p.type === 'Apartment').length }
  ];

  luxuryTypes.forEach(lt => {
    if (lt.count > 0) {
      const card = createElement('a', 'hub-page__type-card');
      card.href = `/properties?type=${lt.type}&price=$400K%2B`;
      card.setAttribute('data-route', '');

      const typeCardTitle = createElement('h3', 'hub-page__type-title', `Luxury ${lt.type}s`);
      card.appendChild(typeCardTitle);
      const typeCardDesc = createElement('p', 'hub-page__type-desc', lt.desc);
      card.appendChild(typeCardDesc);
      const typeCardCount = createElement('span', 'hub-page__type-count', `${lt.count} properties`);
      card.appendChild(typeCardCount);

      typeGrid.appendChild(card);
    }
  });
  typeSection.appendChild(typeGrid);
  container.appendChild(typeSection);

  // Premium Locations
  const locSection = createElement('section', 'hub-page__locations');
  const locTitle = createElement('h2', 'hub-page__section-title', 'Premium Locations');
  locSection.appendChild(locTitle);

  const locGrid = createElement('div', 'hub-page__location-links');
  const premiumLocations = ['Gulan', 'Dream City', 'Empire World', 'Italian Village', 'English Village'];
  premiumLocations.forEach(loc => {
    const count = luxuryProps.filter(p => p.location.district === loc).length;
    if (count > 0) {
      const link = createElement('a', 'hub-page__location-link');
      link.href = `/properties?district=${encodeURIComponent(loc)}&price=$400K%2B`;
      link.setAttribute('data-route', '');

      const locName = createElement('span', 'hub-page__location-name', loc);
      link.appendChild(locName);
      const locCount = createElement('span', 'hub-page__location-count', `${count} luxury properties`);
      link.appendChild(locCount);

      locGrid.appendChild(link);
    }
  });
  locSection.appendChild(locGrid);
  container.appendChild(locSection);

  // CTA
  const ctaSection = createElement('section', 'hub-page__cta');
  const ctaContent = createElement('div', 'hub-page__cta-content');
  const ctaTitle = createElement('h2', 'hub-page__cta-title', 'Experience Exclusive Service');
  ctaContent.appendChild(ctaTitle);
  const ctaText = createElement('p', 'hub-page__cta-text', 'Our luxury property specialists provide personalized service to help you find the exceptional home you deserve.');
  ctaContent.appendChild(ctaText);
  const ctaBtn = createElement('a', 'btn btn--primary', 'Request Private Viewing');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  ctaContent.appendChild(ctaBtn);
  ctaSection.appendChild(ctaContent);
  container.appendChild(ctaSection);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

export function setupLuxuryPageSEO(): void {
  document.title = 'Luxury Properties in Erbil | Premium Homes & Villas | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Discover luxury properties in Erbil. Premium villas, penthouses, and exclusive apartments in the finest locations of Kurdistan Region.');
  }
}
