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
    title: 'Houses for Sale Erbil —',
    titleEm: 'Buy Property Erbil',
    subtitle: 'Find your dream home with the best real estate agent Erbil. Browse houses for sale Erbil, apartments Erbil Iraq, villas Erbil Iraq, and luxury homes Kurdistan. Our real estate Erbil experts help you buy house Erbil in the Erbil property market.',
    metaDescription: 'Houses for sale Erbil - Browse property Erbil listings. Find apartments Erbil Iraq, villas Erbil Iraq, penthouse Erbil. Best real estate agent Erbil for luxury homes Kurdistan.',
    filterFn: (p) => p.status === 'For Sale',
    relatedLinks: [
      { name: 'Apartments Erbil Iraq for Rent', url: '/rent', description: 'Browse rental properties in the Erbil property market' },
      { name: 'Real Estate Kurdistan Investment', url: '/invest', description: 'High-yield property Erbil investment opportunities' },
      { name: 'Buy House Erbil Guide', url: '/blog/how-to-buy-property-in-erbil', description: 'Essential guide for property buyers in Kurdistan' },
      { name: 'Luxury Homes Kurdistan Projects', url: '/projects', description: 'Explore new villas Erbil Iraq developments' }
    ],
    ctaTitle: 'Ready to Buy House Erbil?',
    ctaText: 'Our best real estate agent Erbil team will help you find the perfect property Erbil that matches your requirements in the Erbil property market.'
  }, getBuyBreadcrumbs);
}

export function setupBuyPageSEO(): void {
  document.title = 'Houses for Sale Erbil | Buy Property Erbil | Apartments Erbil Iraq | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Houses for sale Erbil - Find property Erbil with best real estate agent Erbil. Browse apartments Erbil Iraq, villas Erbil Iraq, penthouse Erbil, luxury homes Kurdistan. Buy house Erbil in the Erbil property market.');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// RENT PAGE - Properties for Rent
// ═══════════════════════════════════════════════════════════════════════════

export function renderRentPage(): DocumentFragment {
  return renderHubPage({
    title: 'Apartments Erbil Iraq —',
    titleEm: 'Rent Property Erbil',
    subtitle: 'Find apartments Erbil Iraq for rent with real estate Erbil experts. Browse villas Erbil Iraq, penthouse Erbil, and luxury homes Kurdistan rentals. Best real estate agent Erbil for premium property Erbil in the Erbil property market.',
    metaDescription: 'Rent apartments Erbil Iraq, villas Erbil Iraq, and penthouse Erbil. Property Erbil rentals from best real estate agent Erbil. Real estate Kurdistan premium rentals.',
    filterFn: (p) => p.status === 'For Rent',
    relatedLinks: [
      { name: 'Houses for Sale Erbil', url: '/buy', description: 'Buy house Erbil - Browse property Erbil for sale' },
      { name: 'Expat Real Estate Kurdistan Guide', url: '/blog/expat-guide-to-living-in-erbil', description: 'Essential tips for property Erbil renters' },
      { name: 'Furnished Apartments Erbil Iraq', url: '/properties?furnished=true', description: 'Move-in ready luxury homes Kurdistan' },
      { name: 'Commercial Real Estate Erbil', url: '/properties?type=Commercial&status=For%20Rent', description: 'Office and retail property Erbil for rent' }
    ],
    ctaTitle: 'Looking for Apartments Erbil Iraq?',
    ctaText: 'Our best real estate agent Erbil team will find the perfect rental property Erbil that fits your lifestyle in the Erbil property market.'
  }, getRentBreadcrumbs);
}

export function setupRentPageSEO(): void {
  document.title = 'Apartments Erbil Iraq for Rent | Villas Erbil Iraq | Property Erbil | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Rent apartments Erbil Iraq, villas Erbil Iraq, penthouse Erbil. Best real estate agent Erbil for property Erbil rentals. Luxury homes Kurdistan in the Erbil property market.');
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
  title.textContent = 'Real Estate Erbil Investment — ';
  const em = createElement('em', undefined, 'Property Erbil');
  title.appendChild(em);
  header.appendChild(title);
  const subtitle = createElement('p', 'hub-page__subtitle', 'Maximize returns with real estate Erbil investments. Property Erbil opportunities include luxury homes Kurdistan, apartments Erbil Iraq, villas Erbil Iraq, and penthouse Erbil. Best real estate agent Erbil for the Erbil property market.');
  header.appendChild(subtitle);
  container.appendChild(header);

  // Investment benefits
  const benefits = createElement('section', 'hub-page__benefits');
  const benefitsTitle = createElement('h2', 'hub-page__section-title', 'Why Invest in Real Estate Erbil — Erbil Property Market');
  benefits.appendChild(benefitsTitle);

  const benefitsGrid = createElement('div', 'hub-page__benefits-grid');
  const benefitItems = [
    { title: 'High ROI Property Erbil', desc: 'Rental yields averaging 8-12% annually on apartments Erbil Iraq and luxury homes Kurdistan' },
    { title: 'Growing Erbil Property Market', desc: 'Real estate Kurdistan economy expands, driving property Erbil values' },
    { title: 'Tax Benefits Real Estate Erbil', desc: 'Favorable tax environment for villas Erbil Iraq and property investment' },
    { title: 'Strategic Location', desc: 'Erbil is a regional business hub - ideal for buy house Erbil investment' }
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
  const propertiesTitle = createElement('h2', 'hub-page__section-title', 'Property Erbil Investment Opportunities');
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

  const projectsSubtitle = createElement('p', 'hub-page__projects-subtitle', 'Invest early in luxury homes Kurdistan developments with attractive payment plans. Best real estate agent Erbil for villas Erbil Iraq and apartments Erbil Iraq projects.');
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
  const articlesTitle = createElement('h2', 'hub-page__section-title', 'Real Estate Erbil Investment Insights');
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
  const ctaTitle = createElement('h2', 'hub-page__cta-title', 'Ready to Invest in Property Erbil?');
  ctaContent.appendChild(ctaTitle);
  const ctaText = createElement('p', 'hub-page__cta-text', 'Our best real estate agent Erbil investment advisors will guide you through the best houses for sale Erbil and apartments Erbil Iraq opportunities in the Erbil property market.');
  ctaContent.appendChild(ctaText);
  const ctaBtn = createElement('a', 'btn btn--primary', 'Contact Best Real Estate Agent Erbil');
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
  document.title = 'Real Estate Erbil Investment | Property Erbil | Buy House Erbil | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Invest in real estate Erbil. Property Erbil investment including houses for sale Erbil, apartments Erbil Iraq, villas Erbil Iraq. Best real estate agent Erbil for Erbil property market opportunities.');
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
  title.textContent = 'Luxury Homes Kurdistan — ';
  const em = createElement('em', undefined, 'Property Erbil');
  title.appendChild(em);
  header.appendChild(title);
  const subtitle = createElement('p', 'hub-page__subtitle', 'Experience the finest real estate Erbil living. Browse luxury homes Kurdistan, villas Erbil Iraq, penthouse Erbil, and premium apartments Erbil Iraq. Best real estate agent Erbil for exclusive property Erbil in the Erbil property market.');
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
  const propertiesTitle = createElement('h2', 'hub-page__section-title', 'Luxury Homes Kurdistan Collection — Villas Erbil Iraq');
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
  const typeTitle = createElement('h2', 'hub-page__section-title', 'Property Erbil by Type — Real Estate Erbil');
  typeSection.appendChild(typeTitle);

  const typeGrid = createElement('div', 'hub-page__type-grid');
  const luxuryTypes = [
    { type: 'Villa', desc: 'Exclusive villas Erbil Iraq with private gardens - luxury homes Kurdistan', count: luxuryProps.filter(p => p.type === 'Villa').length },
    { type: 'Penthouse', desc: 'Penthouse Erbil sky-high living with panoramic city views', count: luxuryProps.filter(p => p.type === 'Penthouse').length },
    { type: 'Duplex', desc: 'Two-story luxury property Erbil living spaces', count: luxuryProps.filter(p => p.type === 'Duplex').length },
    { type: 'Apartment', desc: 'Premium apartments Erbil Iraq in prestigious buildings', count: luxuryProps.filter(p => p.type === 'Apartment').length }
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
  const locTitle = createElement('h2', 'hub-page__section-title', 'Premium Locations — Houses for Sale Erbil');
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
  const ctaTitle = createElement('h2', 'hub-page__cta-title', 'Experience Luxury Homes Kurdistan with Best Real Estate Agent Erbil');
  ctaContent.appendChild(ctaTitle);
  const ctaText = createElement('p', 'hub-page__cta-text', 'Our best real estate agent Erbil luxury property specialists provide personalized service for villas Erbil Iraq, penthouse Erbil, and apartments Erbil Iraq.');
  ctaContent.appendChild(ctaText);
  const ctaBtn = createElement('a', 'btn btn--primary', 'Request Property Erbil Viewing');
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
  document.title = 'Luxury Homes Kurdistan | Villas Erbil Iraq | Penthouse Erbil | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Luxury homes Kurdistan - Find villas Erbil Iraq, penthouse Erbil, apartments Erbil Iraq. Best real estate agent Erbil for property Erbil. Real estate Erbil in the Erbil property market.');
  }
}
