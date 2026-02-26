// ═══════════════════════════════════════════════════════════════════════════
// Location Pages for Real House - Local SEO Optimization
// Targets: "real estate erbil" searches
// ═══════════════════════════════════════════════════════════════════════════

import {
  districts,
  getDistrictBySlug,
  getPropertiesByDistrict,
  getPropertyCountByDistrict,
  businessNAP,
  type DistrictLocation
} from '../data/locations';
import { properties, getDisplayPrice, formatPrice, type Property } from '../data/properties';
import { isFavorite, toggleFavorite, updateFavoriteButton, updateFavoritesBadge } from '../utils/favorites';
import { createCompareButton, updateComparisonBar } from '../comparison';
import { t } from '../i18n';

// ═══════════════════════════════════════════════════════════════════════════
// Locations Index Page - All Districts
// ═══════════════════════════════════════════════════════════════════════════

export function renderLocationsPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Page Container
  const page = document.createElement('div');
  page.className = 'locations-page';

  // Hero Section
  const hero = document.createElement('section');
  hero.className = 'locations-page__hero';

  const heroContent = document.createElement('div');
  heroContent.className = 'locations-page__hero-content';

  const h1 = document.createElement('h1');
  h1.className = 'locations-page__title';
  h1.textContent = t('locations.pageTitle');
  heroContent.appendChild(h1);

  const subtitle = document.createElement('p');
  subtitle.className = 'locations-page__subtitle';
  subtitle.textContent = t('locations.pageSubtitle');
  heroContent.appendChild(subtitle);

  hero.appendChild(heroContent);
  page.appendChild(hero);

  // Breadcrumb
  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'locations-page__breadcrumb';
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');

  const breadcrumbOl = document.createElement('ol');
  breadcrumbOl.className = 'breadcrumb';

  const breadcrumbLi1 = document.createElement('li');
  const breadcrumbLink1 = document.createElement('a');
  breadcrumbLink1.href = '/';
  breadcrumbLink1.setAttribute('data-route', '');
  breadcrumbLink1.textContent = t('locations.breadcrumbHome');
  breadcrumbLi1.appendChild(breadcrumbLink1);
  breadcrumbOl.appendChild(breadcrumbLi1);

  const breadcrumbLi2 = document.createElement('li');
  const breadcrumbSpan = document.createElement('span');
  breadcrumbSpan.setAttribute('aria-current', 'page');
  breadcrumbSpan.textContent = t('locations.breadcrumbLocations');
  breadcrumbLi2.appendChild(breadcrumbSpan);
  breadcrumbOl.appendChild(breadcrumbLi2);

  breadcrumb.appendChild(breadcrumbOl);
  page.appendChild(breadcrumb);

  // Districts Grid
  const gridSection = document.createElement('section');
  gridSection.className = 'locations-page__grid-section';

  const gridContainer = document.createElement('div');
  gridContainer.className = 'locations-page__container';

  const grid = document.createElement('div');
  grid.className = 'locations-page__grid';

  districts.forEach(district => {
    const propertyCount = getPropertyCountByDistrict(district.name);
    const card = createDistrictCard(district, propertyCount);
    grid.appendChild(card);
  });

  gridContainer.appendChild(grid);
  gridSection.appendChild(gridContainer);
  page.appendChild(gridSection);

  // Map Overview Section
  const mapSection = document.createElement('section');
  mapSection.className = 'locations-page__map-section';

  const mapContainer = document.createElement('div');
  mapContainer.className = 'locations-page__container';

  const mapTitle = document.createElement('h2');
  mapTitle.className = 'locations-page__section-title';
  mapTitle.textContent = t('locations.mapSectionTitle');
  mapContainer.appendChild(mapTitle);

  const mapSubtitle = document.createElement('p');
  mapSubtitle.className = 'locations-page__section-subtitle';
  mapSubtitle.textContent = t('locations.mapSectionSubtitle');
  mapContainer.appendChild(mapSubtitle);

  const mapPlaceholder = document.createElement('div');
  mapPlaceholder.className = 'locations-page__map-placeholder';
  mapPlaceholder.id = 'locations-map';

  const mapIframe = document.createElement('iframe');
  mapIframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51792.93776619287!2d43.96810876953125!3d36.19109500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40072f8c8b7b5d49%3A0x234e8e7d0f7d9ddd!2sErbil%2C%20Iraq!5e0!3m2!1sen!2s!4v1708500000000!5m2!1sen!2s';
  mapIframe.width = '100%';
  mapIframe.height = '450';
  mapIframe.style.border = '0';
  mapIframe.allowFullscreen = true;
  mapIframe.loading = 'lazy';
  mapIframe.referrerPolicy = 'no-referrer-when-downgrade';
  mapIframe.title = 'Map of Erbil Districts';
  mapPlaceholder.appendChild(mapIframe);

  mapContainer.appendChild(mapPlaceholder);
  mapSection.appendChild(mapContainer);
  page.appendChild(mapSection);

  // Stats Section
  const statsSection = document.createElement('section');
  statsSection.className = 'locations-page__stats-section';

  const statsContainer = document.createElement('div');
  statsContainer.className = 'locations-page__container';

  const statsTitle = document.createElement('h2');
  statsTitle.className = 'locations-page__section-title';
  statsTitle.textContent = t('locations.statsTitle');
  statsContainer.appendChild(statsTitle);

  const statsGrid = document.createElement('div');
  statsGrid.className = 'locations-page__stats';

  const statsData = [
    { number: `${properties.length}+`, label: t('locations.statsActiveListings') },
    { number: `${districts.length}`, label: t('locations.statsPrimeDistricts') },
    { number: '$85K+', label: t('locations.statsStartingFrom') },
    { number: '127+', label: t('locations.statsHappyClients') }
  ];

  statsData.forEach(stat => {
    const statDiv = document.createElement('div');
    statDiv.className = 'locations-page__stat';

    const statNumber = document.createElement('span');
    statNumber.className = 'locations-page__stat-number';
    statNumber.textContent = stat.number;
    statDiv.appendChild(statNumber);

    const statLabel = document.createElement('span');
    statLabel.className = 'locations-page__stat-label';
    statLabel.textContent = stat.label;
    statDiv.appendChild(statLabel);

    statsGrid.appendChild(statDiv);
  });

  statsContainer.appendChild(statsGrid);
  statsSection.appendChild(statsContainer);
  page.appendChild(statsSection);

  // CTA Section
  const ctaSection = document.createElement('section');
  ctaSection.className = 'locations-page__cta';

  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'locations-page__container';

  const ctaTitle = document.createElement('h2');
  ctaTitle.textContent = t('locations.ctaTitle');
  ctaContainer.appendChild(ctaTitle);

  const ctaText = document.createElement('p');
  ctaText.textContent = t('locations.ctaText');
  ctaContainer.appendChild(ctaText);

  const ctaButtons = document.createElement('div');
  ctaButtons.className = 'locations-page__cta-buttons';

  const contactBtn = document.createElement('a');
  contactBtn.href = '/contact';
  contactBtn.className = 'btn btn--primary';
  contactBtn.setAttribute('data-route', '');
  contactBtn.textContent = t('locations.ctaContactUs');
  ctaButtons.appendChild(contactBtn);

  const propertiesBtn = document.createElement('a');
  propertiesBtn.href = '/properties';
  propertiesBtn.className = 'btn btn--secondary';
  propertiesBtn.setAttribute('data-route', '');
  propertiesBtn.textContent = t('locations.ctaViewAllProperties');
  ctaButtons.appendChild(propertiesBtn);

  ctaContainer.appendChild(ctaButtons);
  ctaSection.appendChild(ctaContainer);
  page.appendChild(ctaSection);

  fragment.appendChild(page);
  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// Individual District Page
// ═══════════════════════════════════════════════════════════════════════════

export function renderDistrictPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const district = getDistrictBySlug(slug);

  if (!district) {
    return render404DistrictPage(slug);
  }

  const districtProperties = getPropertiesByDistrict(district.name);

  const page = document.createElement('div');
  page.className = 'district-page';

  // Hero Section
  const hero = document.createElement('section');
  hero.className = 'district-page__hero';
  hero.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${district.image})`;

  const heroContent = document.createElement('div');
  heroContent.className = 'district-page__hero-content';

  const label = document.createElement('span');
  label.className = 'district-page__label';
  label.textContent = t('locations.realEstateInErbil');
  heroContent.appendChild(label);

  const title = document.createElement('h1');
  title.className = 'district-page__title';
  title.textContent = t('locations.districtProperties', { district: district.name });
  heroContent.appendChild(title);

  const subtitleP = document.createElement('p');
  subtitleP.className = 'district-page__subtitle';
  subtitleP.textContent = district.description;
  heroContent.appendChild(subtitleP);

  const heroStats = document.createElement('div');
  heroStats.className = 'district-page__hero-stats';

  const heroStatsData = [
    { number: String(districtProperties.length), label: t('locations.propertiesAvailable') },
    { number: formatPrice(district.averagePrice), label: t('locations.averagePrice') },
    { number: String(district.propertyTypes.length), label: t('locations.propertyTypes') }
  ];

  heroStatsData.forEach(stat => {
    const statDiv = document.createElement('div');
    statDiv.className = 'district-page__hero-stat';

    const statNumber = document.createElement('span');
    statNumber.className = 'district-page__hero-stat-number';
    statNumber.textContent = stat.number;
    statDiv.appendChild(statNumber);

    const statLabel = document.createElement('span');
    statLabel.className = 'district-page__hero-stat-label';
    statLabel.textContent = stat.label;
    statDiv.appendChild(statLabel);

    heroStats.appendChild(statDiv);
  });

  heroContent.appendChild(heroStats);
  hero.appendChild(heroContent);
  page.appendChild(hero);

  // Breadcrumb
  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'district-page__breadcrumb';
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');

  const breadcrumbOl = document.createElement('ol');
  breadcrumbOl.className = 'breadcrumb';

  const breadcrumbItems = [
    { href: '/', text: t('locations.breadcrumbHome') },
    { href: '/locations', text: t('locations.breadcrumbLocations') },
    { text: district.name, current: true }
  ];

  breadcrumbItems.forEach(item => {
    const li = document.createElement('li');
    if (item.href) {
      const a = document.createElement('a');
      a.href = item.href;
      a.setAttribute('data-route', '');
      a.textContent = item.text;
      li.appendChild(a);
    } else {
      const span = document.createElement('span');
      if (item.current) span.setAttribute('aria-current', 'page');
      span.textContent = item.text;
      li.appendChild(span);
    }
    breadcrumbOl.appendChild(li);
  });

  breadcrumb.appendChild(breadcrumbOl);
  page.appendChild(breadcrumb);

  // Main Content
  const mainContent = document.createElement('div');
  mainContent.className = 'district-page__content';

  // Left Column - Description & Details
  const leftCol = document.createElement('div');
  leftCol.className = 'district-page__main';

  // About Section
  const aboutSection = document.createElement('section');
  aboutSection.className = 'district-page__about';

  const aboutTitle = document.createElement('h2');
  aboutTitle.textContent = t('locations.aboutDistrict', { district: district.name });
  aboutSection.appendChild(aboutTitle);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'district-page__description';

  district.longDescription.split('\n\n').forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    descriptionDiv.appendChild(p);
  });

  aboutSection.appendChild(descriptionDiv);
  leftCol.appendChild(aboutSection);

  // Highlights
  const highlightsSection = document.createElement('section');
  highlightsSection.className = 'district-page__highlights';

  const highlightsTitle = document.createElement('h3');
  highlightsTitle.textContent = t('locations.whyChooseDistrict', { district: district.name });
  highlightsSection.appendChild(highlightsTitle);

  const highlightsList = document.createElement('ul');
  highlightsList.className = 'district-page__highlights-list';

  district.highlights.forEach(highlight => {
    const li = document.createElement('li');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z');
    svg.appendChild(path);

    li.appendChild(svg);
    li.appendChild(document.createTextNode(highlight));
    highlightsList.appendChild(li);
  });

  highlightsSection.appendChild(highlightsList);
  leftCol.appendChild(highlightsSection);

  // Nearby Landmarks
  const landmarksSection = document.createElement('section');
  landmarksSection.className = 'district-page__landmarks';

  const landmarksTitle = document.createElement('h3');
  landmarksTitle.textContent = t('locations.nearbyLandmarks');
  landmarksSection.appendChild(landmarksTitle);

  const landmarksGrid = document.createElement('div');
  landmarksGrid.className = 'district-page__landmarks-grid';

  const landmarksData = [
    { title: t('locations.pointsOfInterest'), items: district.nearbyLandmarks },
    { title: t('locations.amenities'), items: district.amenities },
    { title: t('locations.transportLinks'), items: district.transportLinks }
  ];

  landmarksData.forEach(col => {
    const colDiv = document.createElement('div');
    colDiv.className = 'district-page__landmarks-col';

    const colTitle = document.createElement('h4');
    colTitle.textContent = col.title;
    colDiv.appendChild(colTitle);

    const colList = document.createElement('ul');
    col.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      colList.appendChild(li);
    });
    colDiv.appendChild(colList);

    landmarksGrid.appendChild(colDiv);
  });

  landmarksSection.appendChild(landmarksGrid);
  leftCol.appendChild(landmarksSection);

  // Map Section
  const mapSection = document.createElement('section');
  mapSection.className = 'district-page__map';

  const mapTitle = document.createElement('h3');
  mapTitle.textContent = t('locations.districtLocation', { district: district.name });
  mapSection.appendChild(mapTitle);

  const mapContainer = document.createElement('div');
  mapContainer.className = 'district-page__map-container';

  const mapIframe = document.createElement('iframe');
  mapIframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12948.0!2d${district.coordinates.lng}!3d${district.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${district.coordinates.lat}N+${district.coordinates.lng}E!5e0!3m2!1sen!2s!4v1708500000000`;
  mapIframe.width = '100%';
  mapIframe.height = '350';
  mapIframe.style.border = '0';
  mapIframe.style.borderRadius = '12px';
  mapIframe.allowFullscreen = true;
  mapIframe.loading = 'lazy';
  mapIframe.referrerPolicy = 'no-referrer-when-downgrade';
  mapIframe.title = `Map of ${district.name}, Erbil`;
  mapContainer.appendChild(mapIframe);

  mapSection.appendChild(mapContainer);
  leftCol.appendChild(mapSection);

  mainContent.appendChild(leftCol);

  // Right Column - Sidebar
  const rightCol = document.createElement('aside');
  rightCol.className = 'district-page__sidebar';

  // Quick Info Card
  const infoCard = document.createElement('div');
  infoCard.className = 'district-page__info-card';

  const infoTitle = document.createElement('h3');
  infoTitle.textContent = t('locations.quickFacts');
  infoCard.appendChild(infoTitle);

  const infoList = document.createElement('dl');
  infoList.className = 'district-page__info-list';

  const infoData = [
    { term: t('locations.propertyTypes'), definition: district.propertyTypes.join(', ') },
    { term: t('locations.priceRange'), definition: `${formatPrice(district.priceRange.min)} - ${formatPrice(district.priceRange.max)}` },
    { term: t('locations.lifestyle'), definition: district.demographics.lifestyle },
    { term: t('locations.idealFor'), definition: district.demographics.targetBuyers.join(', ') }
  ];

  infoData.forEach(item => {
    const dt = document.createElement('dt');
    dt.textContent = item.term;
    infoList.appendChild(dt);

    const dd = document.createElement('dd');
    dd.textContent = item.definition;
    infoList.appendChild(dd);
  });

  infoCard.appendChild(infoList);

  const viewPropertiesBtn = document.createElement('a');
  viewPropertiesBtn.href = `/properties?district=${district.slug}`;
  viewPropertiesBtn.className = 'btn btn--primary btn--full';
  viewPropertiesBtn.setAttribute('data-route', '');
  viewPropertiesBtn.textContent = t('locations.viewDistrictProperties', { district: district.name });
  infoCard.appendChild(viewPropertiesBtn);

  rightCol.appendChild(infoCard);

  // Contact Card
  const contactCard = document.createElement('div');
  contactCard.className = 'district-page__contact-card';

  const contactTitle = document.createElement('h3');
  contactTitle.textContent = t('locations.interestedInDistrict', { district: district.name });
  contactCard.appendChild(contactTitle);

  const contactText = document.createElement('p');
  contactText.textContent = t('locations.contactExpertsText');
  contactCard.appendChild(contactText);

  const contactInfo = document.createElement('div');
  contactInfo.className = 'district-page__contact-info';

  const phoneLink = document.createElement('a');
  phoneLink.href = `tel:${businessNAP.phones[0].number.replace(/\s/g, '')}`;
  phoneLink.className = 'district-page__contact-link';

  const phoneSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  phoneSvg.setAttribute('viewBox', '0 0 24 24');
  phoneSvg.setAttribute('fill', 'currentColor');
  const phonePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  phonePath.setAttribute('d', 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z');
  phoneSvg.appendChild(phonePath);
  phoneLink.appendChild(phoneSvg);
  phoneLink.appendChild(document.createTextNode(businessNAP.phones[0].number));
  contactInfo.appendChild(phoneLink);

  const emailLink = document.createElement('a');
  emailLink.href = `mailto:${businessNAP.email}`;
  emailLink.className = 'district-page__contact-link';

  const emailSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  emailSvg.setAttribute('viewBox', '0 0 24 24');
  emailSvg.setAttribute('fill', 'currentColor');
  const emailPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  emailPath.setAttribute('d', 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z');
  emailSvg.appendChild(emailPath);
  emailLink.appendChild(emailSvg);
  emailLink.appendChild(document.createTextNode(businessNAP.email));
  contactInfo.appendChild(emailLink);

  contactCard.appendChild(contactInfo);

  const scheduleBtn = document.createElement('a');
  scheduleBtn.href = '/contact';
  scheduleBtn.className = 'btn btn--secondary btn--full';
  scheduleBtn.setAttribute('data-route', '');
  scheduleBtn.textContent = t('locations.scheduleConsultation');
  contactCard.appendChild(scheduleBtn);

  rightCol.appendChild(contactCard);

  // Other Districts Card
  const otherDistrictsCard = document.createElement('div');
  otherDistrictsCard.className = 'district-page__other-districts';

  const otherTitle = document.createElement('h3');
  otherTitle.textContent = t('locations.exploreOtherAreas');
  otherDistrictsCard.appendChild(otherTitle);

  const otherDistricts = districts.filter(d => d.id !== district.id).slice(0, 4);

  const districtLinks = document.createElement('ul');
  districtLinks.className = 'district-page__district-links';

  otherDistricts.forEach(d => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `/properties/${d.slug}`;
    a.setAttribute('data-route', '');
    a.textContent = d.name;

    const span = document.createElement('span');
    span.textContent = `${getPropertyCountByDistrict(d.name)} ${t('locations.properties')}`;
    a.appendChild(span);

    li.appendChild(a);
    districtLinks.appendChild(li);
  });

  otherDistrictsCard.appendChild(districtLinks);

  const viewAllLink = document.createElement('a');
  viewAllLink.href = '/locations';
  viewAllLink.className = 'district-page__view-all';
  viewAllLink.setAttribute('data-route', '');
  viewAllLink.textContent = t('locations.viewAllLocations');
  otherDistrictsCard.appendChild(viewAllLink);

  rightCol.appendChild(otherDistrictsCard);

  mainContent.appendChild(rightCol);
  page.appendChild(mainContent);

  // Properties Section
  if (districtProperties.length > 0) {
    const propertiesSection = document.createElement('section');
    propertiesSection.className = 'district-page__properties';

    const propertiesHeader = document.createElement('div');
    propertiesHeader.className = 'district-page__properties-header';

    const propertiesTitle = document.createElement('h2');
    propertiesTitle.textContent = t('locations.availablePropertiesIn', { district: district.name });
    propertiesHeader.appendChild(propertiesTitle);

    const viewAllBtn = document.createElement('a');
    viewAllBtn.href = `/properties?district=${district.slug}`;
    viewAllBtn.className = 'btn btn--secondary';
    viewAllBtn.setAttribute('data-route', '');
    viewAllBtn.textContent = t('locations.viewAll');
    propertiesHeader.appendChild(viewAllBtn);

    propertiesSection.appendChild(propertiesHeader);

    const propertiesGrid = document.createElement('div');
    propertiesGrid.className = 'district-page__properties-grid';

    districtProperties.slice(0, 6).forEach(property => {
      const card = createPropertyCard(property);
      propertiesGrid.appendChild(card);
    });

    propertiesSection.appendChild(propertiesGrid);
    page.appendChild(propertiesSection);
  }

  // Schema Markup (JSON-LD)
  const schema = generateDistrictSchema(district);
  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.id = 'schema-district';
  schemaScript.textContent = JSON.stringify(schema);
  page.appendChild(schemaScript);

  fragment.appendChild(page);
  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// Helper Components
// ═══════════════════════════════════════════════════════════════════════════

function createDistrictCard(district: DistrictLocation, propertyCount: number): HTMLElement {
  const card = document.createElement('article');
  card.className = 'district-card';

  const link = document.createElement('a');
  link.href = `/properties/${district.slug}`;
  link.className = 'district-card__link';
  link.setAttribute('data-route', '');

  const imageContainer = document.createElement('div');
  imageContainer.className = 'district-card__image-container';

  const img = document.createElement('img');
  img.src = district.image;
  img.alt = `Properties in ${district.name}, Erbil`;
  img.className = 'district-card__image';
  img.loading = 'lazy';
  imageContainer.appendChild(img);

  const overlay = document.createElement('div');
  overlay.className = 'district-card__overlay';

  const countSpan = document.createElement('span');
  countSpan.className = 'district-card__count';
  countSpan.textContent = t('locations.propertiesCount', { count: String(propertyCount) });
  overlay.appendChild(countSpan);

  imageContainer.appendChild(overlay);
  link.appendChild(imageContainer);

  const content = document.createElement('div');
  content.className = 'district-card__content';

  const name = document.createElement('h3');
  name.className = 'district-card__name';
  name.textContent = district.name;
  content.appendChild(name);

  const description = document.createElement('p');
  description.className = 'district-card__description';
  description.textContent = district.description;
  content.appendChild(description);

  const meta = document.createElement('div');
  meta.className = 'district-card__meta';

  const price = document.createElement('span');
  price.className = 'district-card__price';
  price.textContent = t('locations.fromPrice', { price: formatPrice(district.priceRange.min) });
  meta.appendChild(price);

  const types = document.createElement('span');
  types.className = 'district-card__types';
  types.textContent = district.propertyTypes.slice(0, 3).join(', ');
  meta.appendChild(types);

  content.appendChild(meta);
  link.appendChild(content);
  card.appendChild(link);

  return card;
}

function createPropertyCard(property: Property): HTMLElement {
  const card = document.createElement('article');
  card.className = 'property-card';
  card.dataset.propertyId = property.id;

  const favorited = isFavorite(property.id);

  const link = document.createElement('a');
  link.href = `/properties/${property.id}`;
  link.className = 'property-card__link';
  link.setAttribute('data-route', '');

  const media = document.createElement('div');
  media.className = 'property-card__media';

  const img = document.createElement('img');
  img.src = property.images[0];
  img.alt = property.title;
  img.className = 'property-card__image';
  img.loading = 'lazy';
  media.appendChild(img);

  const badges = document.createElement('div');
  badges.className = 'property-card__badges';
  property.badges.forEach(badge => {
    const badgeSpan = document.createElement('span');
    badgeSpan.className = `property-card__badge property-card__badge--${badge.toLowerCase()}`;
    badgeSpan.textContent = badge;
    badges.appendChild(badgeSpan);
  });
  media.appendChild(badges);

  const favoriteBtn = document.createElement('button');
  favoriteBtn.className = `property-card__favorite ${favorited ? 'property-card__favorite--active' : ''}`;
  favoriteBtn.setAttribute('aria-label', favorited ? 'Remove from favorites' : 'Add to favorites');
  favoriteBtn.dataset.propertyId = property.id;

  const favSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  favSvg.setAttribute('viewBox', '0 0 24 24');
  const favPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  favPath.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
  favSvg.appendChild(favPath);
  favoriteBtn.appendChild(favSvg);
  media.appendChild(favoriteBtn);

  link.appendChild(media);

  const content = document.createElement('div');
  content.className = 'property-card__content';

  const typeSpan = document.createElement('span');
  typeSpan.className = 'property-card__type';
  typeSpan.textContent = property.type;
  content.appendChild(typeSpan);

  const title = document.createElement('h3');
  title.className = 'property-card__title';
  title.textContent = property.title;
  content.appendChild(title);

  const location = document.createElement('p');
  location.className = 'property-card__location';

  const locSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  locSvg.setAttribute('viewBox', '0 0 24 24');
  locSvg.setAttribute('fill', 'currentColor');
  const locPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  locPath.setAttribute('d', 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z');
  locSvg.appendChild(locPath);
  location.appendChild(locSvg);
  location.appendChild(document.createTextNode(`${property.location.district}, ${property.location.city}`));
  content.appendChild(location);

  const specs = document.createElement('div');
  specs.className = 'property-card__specs';

  const bedsSpan = document.createElement('span');
  bedsSpan.textContent = `${property.specs.beds} Beds`;
  specs.appendChild(bedsSpan);

  const bathsSpan = document.createElement('span');
  bathsSpan.textContent = `${property.specs.baths} Baths`;
  specs.appendChild(bathsSpan);

  const sqmSpan = document.createElement('span');
  sqmSpan.textContent = `${property.specs.sqm} m`;
  specs.appendChild(sqmSpan);

  content.appendChild(specs);

  const footer = document.createElement('div');
  footer.className = 'property-card__footer';

  const priceSpan = document.createElement('span');
  priceSpan.className = 'property-card__price';
  priceSpan.textContent = getDisplayPrice(property);
  footer.appendChild(priceSpan);

  const statusSpan = document.createElement('span');
  statusSpan.className = `property-card__status property-card__status--${property.status.toLowerCase().replace(' ', '-')}`;
  statusSpan.textContent = property.status;
  footer.appendChild(statusSpan);

  content.appendChild(footer);
  link.appendChild(content);
  card.appendChild(link);

  // Add event listeners
  favoriteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
    updateFavoriteButton(favoriteBtn, isFavorite(property.id));
    updateFavoritesBadge();
  });

  return card;
}

function render404DistrictPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = document.createElement('div');
  page.className = 'district-page district-page--404';

  const container = document.createElement('div');
  container.className = 'district-page__404';

  const title = document.createElement('h1');
  title.textContent = t('locations.districtNotFound');
  container.appendChild(title);

  const text = document.createElement('p');
  text.textContent = t('locations.districtNotFoundText', { slug });
  container.appendChild(text);

  const buttons = document.createElement('div');
  buttons.className = 'district-page__404-buttons';

  const locationsBtn = document.createElement('a');
  locationsBtn.href = '/locations';
  locationsBtn.className = 'btn btn--primary';
  locationsBtn.setAttribute('data-route', '');
  locationsBtn.textContent = t('locations.viewAllLocations');
  buttons.appendChild(locationsBtn);

  const propertiesBtn = document.createElement('a');
  propertiesBtn.href = '/properties';
  propertiesBtn.className = 'btn btn--secondary';
  propertiesBtn.setAttribute('data-route', '');
  propertiesBtn.textContent = t('locations.browseProperties');
  buttons.appendChild(propertiesBtn);

  container.appendChild(buttons);
  page.appendChild(container);

  fragment.appendChild(page);
  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// Schema Generation for Local SEO
// ═══════════════════════════════════════════════════════════════════════════

export function generateDistrictSchema(district: DistrictLocation): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    'name': `${district.name}, Erbil`,
    'description': district.description,
    'url': `https://realhouseiq.com/properties/${district.slug}`,
    'image': district.image,
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': district.coordinates.lat,
      'longitude': district.coordinates.lng
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
      'containedInPlace': {
        '@type': 'AdministrativeArea',
        'name': 'Kurdistan Region'
      }
    },
    'amenityFeature': district.amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      'name': amenity,
      'value': true
    }))
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SEO Setup Functions
// ═══════════════════════════════════════════════════════════════════════════

export function setupLocationsPageSEO(): void {
  document.title = 'Real Estate by Location in Erbil | Properties in Kurdistan Districts | Real House';

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Explore properties by location in Erbil. Find real estate in Gulan, Dream City, Ankawa, Italian Village, English Village & Empire World. Local experts, premium listings.');
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', 'https://realhouseiq.com/locations');
  }
}

export function setupDistrictPageSEO(district: DistrictLocation): void {
  const propertyCount = getPropertyCountByDistrict(district.name);

  document.title = `${district.name} Real Estate Erbil | ${propertyCount} Properties for Sale & Rent | Real House`;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', `${district.name} properties in Erbil: ${propertyCount} listings from ${formatPrice(district.priceRange.min)}. ${district.description} Contact Real House for viewings.`);
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://realhouseiq.com/properties/${district.slug}`);
  }
}
