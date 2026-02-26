// ═══════════════════════════════════════════════════════════════════════════
// Area Landing Pages - Comprehensive Local SEO for Erbil, Kurdistan
// Targets: "real estate near me", "property [area name] erbil", "homes [district]"
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
import { t } from '../i18n';

// ═══════════════════════════════════════════════════════════════════════════
// NAP Component - Consistent Name, Address, Phone across site
// Critical for Local SEO - must be identical everywhere
// ═══════════════════════════════════════════════════════════════════════════

export function createNAPComponent(variant: 'full' | 'compact' | 'footer' = 'full'): HTMLElement {
  const nap = document.createElement('div');
  nap.className = `nap nap--${variant}`;
  nap.setAttribute('itemscope', '');
  nap.setAttribute('itemtype', 'https://schema.org/RealEstateAgent');

  const content = document.createElement('div');
  content.className = 'nap__content';

  if (variant === 'full') {
    // Name
    const name = document.createElement('h3');
    name.className = 'nap__name';
    name.setAttribute('itemprop', 'name');
    name.textContent = businessNAP.name;
    content.appendChild(name);

    // Legal name
    const legal = document.createElement('p');
    legal.className = 'nap__legal';
    legal.setAttribute('itemprop', 'legalName');
    legal.textContent = businessNAP.legalName;
    content.appendChild(legal);

    // Address
    const address = document.createElement('address');
    address.className = 'nap__address';
    address.setAttribute('itemprop', 'address');
    address.setAttribute('itemscope', '');
    address.setAttribute('itemtype', 'https://schema.org/PostalAddress');

    const addressSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    addressSvg.setAttribute('viewBox', '0 0 24 24');
    addressSvg.setAttribute('fill', 'currentColor');
    addressSvg.setAttribute('aria-hidden', 'true');
    const addressPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    addressPath.setAttribute('d', 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z');
    addressSvg.appendChild(addressPath);
    address.appendChild(addressSvg);

    const addressSpan = document.createElement('span');
    const street = document.createElement('span');
    street.setAttribute('itemprop', 'streetAddress');
    street.textContent = businessNAP.address.street;
    addressSpan.appendChild(street);
    addressSpan.appendChild(document.createTextNode(', '));

    const city = document.createElement('span');
    city.setAttribute('itemprop', 'addressLocality');
    city.textContent = businessNAP.address.city;
    addressSpan.appendChild(city);
    addressSpan.appendChild(document.createTextNode(', '));

    const region = document.createElement('span');
    region.setAttribute('itemprop', 'addressRegion');
    region.textContent = businessNAP.address.region;
    addressSpan.appendChild(region);
    addressSpan.appendChild(document.createTextNode(' '));

    const postal = document.createElement('span');
    postal.setAttribute('itemprop', 'postalCode');
    postal.textContent = businessNAP.address.postalCode;
    addressSpan.appendChild(postal);
    addressSpan.appendChild(document.createTextNode(', '));

    const country = document.createElement('span');
    country.setAttribute('itemprop', 'addressCountry');
    country.textContent = businessNAP.address.country;
    addressSpan.appendChild(country);

    address.appendChild(addressSpan);
    content.appendChild(address);

    // Phones
    const phonesDiv = document.createElement('div');
    phonesDiv.className = 'nap__phones';

    businessNAP.phones.forEach(phone => {
      const phoneLink = document.createElement('a');
      phoneLink.href = `tel:${phone.number.replace(/\s/g, '')}`;
      phoneLink.className = 'nap__phone';
      phoneLink.setAttribute('itemprop', 'telephone');

      const phoneSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      phoneSvg.setAttribute('viewBox', '0 0 24 24');
      phoneSvg.setAttribute('fill', 'currentColor');
      phoneSvg.setAttribute('aria-hidden', 'true');
      const phonePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      phonePath.setAttribute('d', 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z');
      phoneSvg.appendChild(phonePath);
      phoneLink.appendChild(phoneSvg);

      const phoneSpan = document.createElement('span');
      phoneSpan.textContent = phone.number;
      phoneLink.appendChild(phoneSpan);

      const phoneSmall = document.createElement('small');
      phoneSmall.textContent = `(${phone.agent} - ${phone.type})`;
      phoneLink.appendChild(phoneSmall);

      phonesDiv.appendChild(phoneLink);
    });

    content.appendChild(phonesDiv);

    // Email
    const emailLink = document.createElement('a');
    emailLink.href = `mailto:${businessNAP.email}`;
    emailLink.className = 'nap__email';
    emailLink.setAttribute('itemprop', 'email');

    const emailSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    emailSvg.setAttribute('viewBox', '0 0 24 24');
    emailSvg.setAttribute('fill', 'currentColor');
    emailSvg.setAttribute('aria-hidden', 'true');
    const emailPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    emailPath.setAttribute('d', 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z');
    emailSvg.appendChild(emailPath);
    emailLink.appendChild(emailSvg);
    emailLink.appendChild(document.createTextNode(businessNAP.email));
    content.appendChild(emailLink);

    // Hours
    const hoursDiv = document.createElement('div');
    hoursDiv.className = 'nap__hours';
    const hoursStrong = document.createElement('strong');
    hoursStrong.textContent = t('areas.businessHours');
    hoursDiv.appendChild(hoursStrong);

    const hoursList = document.createElement('ul');
    const weekdaysLi = document.createElement('li');
    weekdaysLi.textContent = `${t('areas.satToThu')}${businessNAP.openingHours.weekdays.open} - ${businessNAP.openingHours.weekdays.close}`;
    hoursList.appendChild(weekdaysLi);

    const friday = document.createElement('li');
    friday.textContent = `${t('areas.friday')}${businessNAP.openingHours.friday.note}`;
    hoursList.appendChild(friday);

    hoursDiv.appendChild(hoursList);
    content.appendChild(hoursDiv);

    // Meta
    const priceMeta = document.createElement('meta');
    priceMeta.setAttribute('itemprop', 'priceRange');
    priceMeta.setAttribute('content', businessNAP.businessDetails.priceRange);
    content.appendChild(priceMeta);

    const urlLink = document.createElement('link');
    urlLink.setAttribute('itemprop', 'url');
    urlLink.setAttribute('href', businessNAP.website);
    content.appendChild(urlLink);

  } else if (variant === 'compact') {
    const nameSpan = document.createElement('span');
    nameSpan.className = 'nap__name';
    nameSpan.setAttribute('itemprop', 'name');
    nameSpan.textContent = businessNAP.name;
    content.appendChild(nameSpan);

    const sep1 = document.createElement('span');
    sep1.className = 'nap__separator';
    sep1.textContent = '|';
    content.appendChild(sep1);

    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${businessNAP.phones[0].number.replace(/\s/g, '')}`;
    phoneLink.setAttribute('itemprop', 'telephone');
    phoneLink.textContent = businessNAP.phones[0].number;
    content.appendChild(phoneLink);

    const sep2 = document.createElement('span');
    sep2.className = 'nap__separator';
    sep2.textContent = '|';
    content.appendChild(sep2);

    const addressSpan = document.createElement('span');
    addressSpan.setAttribute('itemprop', 'address');
    addressSpan.setAttribute('itemscope', '');
    addressSpan.setAttribute('itemtype', 'https://schema.org/PostalAddress');

    const citySpan = document.createElement('span');
    citySpan.setAttribute('itemprop', 'addressLocality');
    citySpan.textContent = businessNAP.address.city;
    addressSpan.appendChild(citySpan);
    addressSpan.appendChild(document.createTextNode(', '));

    const regionSpan = document.createElement('span');
    regionSpan.setAttribute('itemprop', 'addressRegion');
    regionSpan.textContent = businessNAP.address.region;
    addressSpan.appendChild(regionSpan);

    content.appendChild(addressSpan);

  } else {
    // footer variant
    const name = document.createElement('h4');
    name.className = 'nap__name';
    name.setAttribute('itemprop', 'name');
    name.textContent = businessNAP.name;
    content.appendChild(name);

    const address = document.createElement('address');
    address.className = 'nap__address';
    address.setAttribute('itemprop', 'address');
    address.setAttribute('itemscope', '');
    address.setAttribute('itemtype', 'https://schema.org/PostalAddress');

    const street = document.createElement('span');
    street.setAttribute('itemprop', 'streetAddress');
    street.textContent = businessNAP.address.street;
    address.appendChild(street);
    address.appendChild(document.createElement('br'));

    const city = document.createElement('span');
    city.setAttribute('itemprop', 'addressLocality');
    city.textContent = businessNAP.address.city;
    address.appendChild(city);
    address.appendChild(document.createTextNode(', '));

    const region = document.createElement('span');
    region.setAttribute('itemprop', 'addressRegion');
    region.textContent = businessNAP.address.region;
    address.appendChild(region);
    address.appendChild(document.createTextNode(' '));

    const postal = document.createElement('span');
    postal.setAttribute('itemprop', 'postalCode');
    postal.textContent = businessNAP.address.postalCode;
    address.appendChild(postal);

    content.appendChild(address);

    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${businessNAP.phones[0].number.replace(/\s/g, '')}`;
    phoneLink.setAttribute('itemprop', 'telephone');
    phoneLink.textContent = businessNAP.phones[0].number;
    content.appendChild(phoneLink);
  }

  nap.appendChild(content);
  return nap;
}

// ═══════════════════════════════════════════════════════════════════════════
// Google Maps Embed Component with Business Location
// ═══════════════════════════════════════════════════════════════════════════

export function createGoogleMapEmbed(coordinates: { lat: number; lng: number }, title: string, zoom: number = 15): HTMLElement {
  const mapContainer = document.createElement('div');
  mapContainer.className = 'google-map-embed';

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${coordinates.lat}N+${coordinates.lng}E!5e0!3m2!1sen!2s!4v1708500000000`;
  iframe.width = '100%';
  iframe.height = '400';
  iframe.style.border = '0';
  iframe.style.borderRadius = '12px';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.title = title;

  mapContainer.appendChild(iframe);

  // Add directions link
  const directionsLink = document.createElement('a');
  directionsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
  directionsLink.className = 'google-map-embed__directions';
  directionsLink.target = '_blank';
  directionsLink.rel = 'noopener noreferrer';

  const dirSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  dirSvg.setAttribute('viewBox', '0 0 24 24');
  dirSvg.setAttribute('fill', 'currentColor');
  dirSvg.setAttribute('aria-hidden', 'true');
  const dirPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  dirPath.setAttribute('d', 'M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z');
  dirSvg.appendChild(dirPath);
  directionsLink.appendChild(dirSvg);
  directionsLink.appendChild(document.createTextNode(' ' + t('areas.getDrivingDirections')));

  mapContainer.appendChild(directionsLink);

  return mapContainer;
}

// ═══════════════════════════════════════════════════════════════════════════
// Business Location Map Component (for main office)
// ═══════════════════════════════════════════════════════════════════════════

export function createBusinessLocationMap(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'business-location';

  const header = document.createElement('div');
  header.className = 'business-location__header';

  const headerTitle = document.createElement('h3');
  headerTitle.textContent = t('areas.visitOurOffice');
  header.appendChild(headerTitle);

  const headerSubtitle = document.createElement('p');
  headerSubtitle.textContent = t('areas.visitOurOfficeSubtitle');
  header.appendChild(headerSubtitle);

  container.appendChild(header);

  const mapEmbed = createGoogleMapEmbed(
    businessNAP.coordinates,
    'Real House Office - Dream City, Erbil',
    16
  );
  container.appendChild(mapEmbed);

  const nap = createNAPComponent('full');
  container.appendChild(nap);

  return container;
}

// ═══════════════════════════════════════════════════════════════════════════
// Neighborhood Guide Component
// ═══════════════════════════════════════════════════════════════════════════

export function createNeighborhoodGuide(district: DistrictLocation): HTMLElement {
  const guide = document.createElement('section');
  guide.className = 'neighborhood-guide';

  // Header
  const header = document.createElement('div');
  header.className = 'neighborhood-guide__header';

  const title = document.createElement('h2');
  title.textContent = t('areas.completeGuideTo', { district: district.name });
  header.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'neighborhood-guide__subtitle';
  subtitle.textContent = t('areas.everythingYouNeedToKnow', { district: district.name });
  header.appendChild(subtitle);

  guide.appendChild(header);

  // Content
  const content = document.createElement('div');
  content.className = 'neighborhood-guide__content';

  // Overview
  const overview = document.createElement('div');
  overview.className = 'neighborhood-guide__overview';

  const overviewTitle = document.createElement('h3');
  overviewTitle.textContent = t('areas.aboutDistrict', { district: district.name });
  overview.appendChild(overviewTitle);

  const paragraphs = district.longDescription.split('\n\n');
  paragraphs.slice(0, 2).forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    overview.appendChild(p);
  });

  content.appendChild(overview);

  // Grid
  const grid = document.createElement('div');
  grid.className = 'neighborhood-guide__grid';

  // Location card
  const locationCard = createGuideCard(
    t('areas.locationAccessibility'),
    'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    district.transportLinks
  );
  grid.appendChild(locationCard);

  // Amenities card
  const amenitiesCard = createGuideCard(
    t('areas.nearbyAmenities'),
    'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    district.amenities.slice(0, 6)
  );
  grid.appendChild(amenitiesCard);

  // Points of Interest card
  const poiCard = createGuideCard(
    t('areas.pointsOfInterest'),
    'M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7a2.5 2.5 0 010-5 2.5 2.5 0 010 5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z',
    district.nearbyLandmarks.slice(0, 5)
  );
  grid.appendChild(poiCard);

  // Ideal For card
  const idealForCard = createGuideCard(
    t('areas.idealFor'),
    'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    district.demographics.targetBuyers
  );
  grid.appendChild(idealForCard);

  content.appendChild(grid);

  // Highlights
  const highlights = document.createElement('div');
  highlights.className = 'neighborhood-guide__highlights';

  const highlightsTitle = document.createElement('h3');
  highlightsTitle.textContent = t('areas.whyChooseDistrict', { district: district.name });
  highlights.appendChild(highlightsTitle);

  const highlightsGrid = document.createElement('div');
  highlightsGrid.className = 'neighborhood-guide__highlights-grid';

  district.highlights.forEach(highlight => {
    const item = document.createElement('div');
    item.className = 'neighborhood-guide__highlight';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z');
    svg.appendChild(path);
    item.appendChild(svg);

    const span = document.createElement('span');
    span.textContent = highlight;
    item.appendChild(span);

    highlightsGrid.appendChild(item);
  });

  highlights.appendChild(highlightsGrid);
  content.appendChild(highlights);

  guide.appendChild(content);

  return guide;
}

function createGuideCard(title: string, iconPath: string, items: string[]): HTMLElement {
  const card = document.createElement('div');
  card.className = 'neighborhood-guide__card';

  const iconDiv = document.createElement('div');
  iconDiv.className = 'neighborhood-guide__card-icon';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', iconPath);
  svg.appendChild(path);
  iconDiv.appendChild(svg);
  card.appendChild(iconDiv);

  const h4 = document.createElement('h4');
  h4.textContent = title;
  card.appendChild(h4);

  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  card.appendChild(ul);

  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// Area Landing Page - /areas/{slug}
// Optimized for local SEO and "near me" searches
// ═══════════════════════════════════════════════════════════════════════════

export function renderAreaPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const district = getDistrictBySlug(slug);

  if (!district) {
    return render404AreaPage(slug);
  }

  const districtProperties = getPropertiesByDistrict(district.name);
  const propertyCount = districtProperties.length;

  const page = document.createElement('div');
  page.className = 'area-page';

  // Hero Section
  const hero = document.createElement('section');
  hero.className = 'area-page__hero';
  hero.style.backgroundImage = `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%), url(${district.image})`;

  const heroContent = document.createElement('div');
  heroContent.className = 'area-page__hero-content';

  // Location badge
  const locationBadge = document.createElement('div');
  locationBadge.className = 'area-page__location-badge';

  const badgeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  badgeSvg.setAttribute('viewBox', '0 0 24 24');
  badgeSvg.setAttribute('fill', 'currentColor');
  badgeSvg.setAttribute('aria-hidden', 'true');
  const badgePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  badgePath.setAttribute('d', 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z');
  badgeSvg.appendChild(badgePath);
  locationBadge.appendChild(badgeSvg);

  const badgeText = document.createElement('span');
  badgeText.textContent = t('areas.erbilKurdistanRegionIraq');
  locationBadge.appendChild(badgeText);

  heroContent.appendChild(locationBadge);

  // H1
  const h1 = document.createElement('h1');
  h1.className = 'area-page__title';
  h1.textContent = `${district.name} ${t('areas.realEstate')}`;

  const h1Span = document.createElement('span');
  h1Span.textContent = t('areas.propertiesForSaleAndRentInErbil');
  h1.appendChild(document.createElement('br'));
  h1.appendChild(h1Span);

  heroContent.appendChild(h1);

  // Subtitle
  const subtitle = document.createElement('p');
  subtitle.className = 'area-page__subtitle';
  subtitle.textContent = district.description;
  heroContent.appendChild(subtitle);

  // Hero stats
  const heroStats = document.createElement('div');
  heroStats.className = 'area-page__hero-stats';

  const statsData = [
    { value: propertyCount.toString(), label: t('areas.availableProperties') },
    { value: formatPrice(district.averagePrice), label: t('areas.averagePrice') },
    { value: district.propertyTypes.length.toString(), label: t('areas.propertyTypes') },
    { value: district.demographics.lifestyle, label: t('areas.lifestyle') }
  ];

  statsData.forEach(stat => {
    const statEl = document.createElement('div');
    statEl.className = 'area-page__hero-stat';

    const valueEl = document.createElement('span');
    valueEl.className = 'area-page__hero-stat-value';
    valueEl.textContent = stat.value;
    statEl.appendChild(valueEl);

    const labelEl = document.createElement('span');
    labelEl.className = 'area-page__hero-stat-label';
    labelEl.textContent = stat.label;
    statEl.appendChild(labelEl);

    heroStats.appendChild(statEl);
  });

  heroContent.appendChild(heroStats);

  // CTA buttons
  const ctaButtons = document.createElement('div');
  ctaButtons.className = 'area-page__hero-cta';

  const viewPropertiesBtn = document.createElement('a');
  viewPropertiesBtn.href = `/properties?district=${district.slug}`;
  viewPropertiesBtn.className = 'btn btn--primary btn--large';
  viewPropertiesBtn.setAttribute('data-route', '');
  viewPropertiesBtn.textContent = t('areas.browseDistrictProperties', { district: district.name });
  ctaButtons.appendChild(viewPropertiesBtn);

  const contactBtn = document.createElement('a');
  contactBtn.href = `tel:${businessNAP.phones[0].number.replace(/\s/g, '')}`;
  contactBtn.className = 'btn btn--secondary btn--large';

  const contactSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  contactSvg.setAttribute('viewBox', '0 0 24 24');
  contactSvg.setAttribute('fill', 'currentColor');
  const contactPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  contactPath.setAttribute('d', 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z');
  contactSvg.appendChild(contactPath);
  contactBtn.appendChild(contactSvg);
  contactBtn.appendChild(document.createTextNode(` ${t('areas.call')} ${businessNAP.phones[0].number}`));
  ctaButtons.appendChild(contactBtn);

  heroContent.appendChild(ctaButtons);
  hero.appendChild(heroContent);
  page.appendChild(hero);

  // Breadcrumb
  const breadcrumb = createBreadcrumb(district.name, district.slug);
  page.appendChild(breadcrumb);

  // Main content wrapper
  const mainContent = document.createElement('div');
  mainContent.className = 'area-page__main';

  // Neighborhood Guide
  const neighborhoodGuide = createNeighborhoodGuide(district);
  mainContent.appendChild(neighborhoodGuide);

  // Map Section
  const mapSection = document.createElement('section');
  mapSection.className = 'area-page__map-section';

  const mapHeader = document.createElement('div');
  mapHeader.className = 'area-page__map-header';

  const mapTitle = document.createElement('h2');
  mapTitle.textContent = t('areas.districtLocation', { district: district.name });
  mapHeader.appendChild(mapTitle);

  const mapSubtitle = document.createElement('p');
  mapSubtitle.textContent = t('areas.exploreDistrictAndSurrounding', { district: district.name });
  mapHeader.appendChild(mapSubtitle);

  mapSection.appendChild(mapHeader);

  const mapEmbed = createGoogleMapEmbed(
    district.coordinates,
    `${district.name} - Erbil, Kurdistan`,
    district.mapZoom
  );
  mapSection.appendChild(mapEmbed);

  mainContent.appendChild(mapSection);

  // Properties Section
  if (propertyCount > 0) {
    const propertiesSection = createPropertiesSection(district, districtProperties);
    mainContent.appendChild(propertiesSection);
  }

  page.appendChild(mainContent);

  // Sidebar
  const sidebar = createSidebar(district);
  page.appendChild(sidebar);

  // Bottom CTA
  const bottomCta = createBottomCTA(district);
  page.appendChild(bottomCta);

  // Inject schema
  const schema = generateAreaLocalBusinessSchema(district);
  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.id = 'schema-area-local-business';
  schemaScript.textContent = JSON.stringify(schema);
  page.appendChild(schemaScript);

  fragment.appendChild(page);
  return fragment;
}

function createBreadcrumb(districtName: string, districtSlug: string): HTMLElement {
  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'area-page__breadcrumb';
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');

  const ol = document.createElement('ol');
  ol.className = 'breadcrumb';
  ol.setAttribute('itemscope', '');
  ol.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');

  // Home
  const li1 = document.createElement('li');
  li1.setAttribute('itemprop', 'itemListElement');
  li1.setAttribute('itemscope', '');
  li1.setAttribute('itemtype', 'https://schema.org/ListItem');

  const a1 = document.createElement('a');
  a1.href = '/';
  a1.setAttribute('data-route', '');
  a1.setAttribute('itemprop', 'item');

  const span1 = document.createElement('span');
  span1.setAttribute('itemprop', 'name');
  span1.textContent = t('areas.home');
  a1.appendChild(span1);

  li1.appendChild(a1);

  const meta1 = document.createElement('meta');
  meta1.setAttribute('itemprop', 'position');
  meta1.setAttribute('content', '1');
  li1.appendChild(meta1);

  ol.appendChild(li1);

  // Locations
  const li2 = document.createElement('li');
  li2.setAttribute('itemprop', 'itemListElement');
  li2.setAttribute('itemscope', '');
  li2.setAttribute('itemtype', 'https://schema.org/ListItem');

  const a2 = document.createElement('a');
  a2.href = '/locations';
  a2.setAttribute('data-route', '');
  a2.setAttribute('itemprop', 'item');

  const span2 = document.createElement('span');
  span2.setAttribute('itemprop', 'name');
  span2.textContent = t('areas.locations');
  a2.appendChild(span2);

  li2.appendChild(a2);

  const meta2 = document.createElement('meta');
  meta2.setAttribute('itemprop', 'position');
  meta2.setAttribute('content', '2');
  li2.appendChild(meta2);

  ol.appendChild(li2);

  // Current district
  const li3 = document.createElement('li');
  li3.setAttribute('itemprop', 'itemListElement');
  li3.setAttribute('itemscope', '');
  li3.setAttribute('itemtype', 'https://schema.org/ListItem');

  const span3 = document.createElement('span');
  span3.setAttribute('itemprop', 'name');
  span3.setAttribute('aria-current', 'page');
  span3.textContent = districtName;
  li3.appendChild(span3);

  const meta3 = document.createElement('meta');
  meta3.setAttribute('itemprop', 'position');
  meta3.setAttribute('content', '3');
  li3.appendChild(meta3);

  ol.appendChild(li3);

  breadcrumb.appendChild(ol);
  return breadcrumb;
}

function createPropertiesSection(district: DistrictLocation, districtProperties: Property[]): HTMLElement {
  const section = document.createElement('section');
  section.className = 'area-page__properties';

  const header = document.createElement('div');
  header.className = 'area-page__properties-header';

  const title = document.createElement('h2');
  title.textContent = t('areas.propertiesForSaleIn', { district: district.name });
  header.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.textContent = t('areas.propertiesAvailableStartingFrom', { count: districtProperties.length.toString(), price: formatPrice(district.priceRange.min) });
  header.appendChild(subtitle);

  section.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'area-page__properties-grid';

  districtProperties.slice(0, 6).forEach(property => {
    const card = createPropertyCard(property);
    grid.appendChild(card);
  });

  section.appendChild(grid);

  if (districtProperties.length > 6) {
    const viewAllBtn = document.createElement('a');
    viewAllBtn.href = `/properties?district=${district.slug}`;
    viewAllBtn.className = 'btn btn--primary area-page__view-all';
    viewAllBtn.setAttribute('data-route', '');
    viewAllBtn.textContent = t('areas.viewAllPropertiesIn', { count: districtProperties.length.toString(), district: district.name });
    section.appendChild(viewAllBtn);
  }

  return section;
}

function createSidebar(district: DistrictLocation): HTMLElement {
  const sidebar = document.createElement('aside');
  sidebar.className = 'area-page__sidebar';

  // Quick Info Card
  const infoCard = document.createElement('div');
  infoCard.className = 'area-page__info-card';

  const infoTitle = document.createElement('h3');
  infoTitle.textContent = t('areas.quickFacts', { district: district.name });
  infoCard.appendChild(infoTitle);

  const dl = document.createElement('dl');
  dl.className = 'area-page__info-list';

  const infoItems = [
    [t('areas.propertyTypes'), district.propertyTypes.join(', ')],
    [t('areas.priceRange'), `${formatPrice(district.priceRange.min)} - ${formatPrice(district.priceRange.max)}`],
    [t('areas.averagePrice'), formatPrice(district.averagePrice)],
    [t('areas.lifestyle'), district.demographics.lifestyle],
    [t('areas.idealFor'), district.demographics.targetBuyers.join(', ')]
  ];

  infoItems.forEach(([term, def]) => {
    const dt = document.createElement('dt');
    dt.textContent = term;
    dl.appendChild(dt);

    const dd = document.createElement('dd');
    dd.textContent = def;
    dl.appendChild(dd);
  });

  infoCard.appendChild(dl);
  sidebar.appendChild(infoCard);

  // Contact Card
  const contactCard = document.createElement('div');
  contactCard.className = 'area-page__contact-card';

  const contactTitle = document.createElement('h3');
  contactTitle.textContent = t('areas.interestedIn', { district: district.name });
  contactCard.appendChild(contactTitle);

  const contactText = document.createElement('p');
  contactText.textContent = t('areas.ourLocalExpertsCanHelp', { district: district.name });
  contactCard.appendChild(contactText);

  const napCompact = createNAPComponent('compact');
  contactCard.appendChild(napCompact);

  const scheduleBtn = document.createElement('a');
  scheduleBtn.href = '/contact';
  scheduleBtn.className = 'btn btn--primary btn--full';
  scheduleBtn.setAttribute('data-route', '');
  scheduleBtn.textContent = t('areas.scheduleFreeConsultation');
  contactCard.appendChild(scheduleBtn);

  sidebar.appendChild(contactCard);

  // Other Areas Card
  const otherAreasCard = document.createElement('div');
  otherAreasCard.className = 'area-page__other-areas';

  const otherTitle = document.createElement('h3');
  otherTitle.textContent = t('areas.exploreOtherAreasInErbil');
  otherAreasCard.appendChild(otherTitle);

  const areasList = document.createElement('ul');
  areasList.className = 'area-page__area-links';

  districts
    .filter(d => d.id !== district.id)
    .slice(0, 5)
    .forEach(d => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `/areas/${d.slug}`;
      a.setAttribute('data-route', '');

      const nameSpan = document.createElement('span');
      nameSpan.className = 'area-name';
      nameSpan.textContent = d.name;
      a.appendChild(nameSpan);

      const countSpan = document.createElement('span');
      countSpan.className = 'area-count';
      countSpan.textContent = `${getPropertyCountByDistrict(d.name)} ${t('areas.properties')}`;
      a.appendChild(countSpan);

      li.appendChild(a);
      areasList.appendChild(li);
    });

  otherAreasCard.appendChild(areasList);

  const viewAllAreasLink = document.createElement('a');
  viewAllAreasLink.href = '/locations';
  viewAllAreasLink.className = 'area-page__view-all-areas';
  viewAllAreasLink.setAttribute('data-route', '');
  viewAllAreasLink.textContent = t('areas.viewAllErbilLocations');
  otherAreasCard.appendChild(viewAllAreasLink);

  sidebar.appendChild(otherAreasCard);

  return sidebar;
}

function createBottomCTA(district: DistrictLocation): HTMLElement {
  const section = document.createElement('section');
  section.className = 'area-page__bottom-cta';

  const content = document.createElement('div');
  content.className = 'area-page__bottom-cta-content';

  const title = document.createElement('h2');
  title.textContent = t('areas.readyToFindYourProperty', { district: district.name });
  content.appendChild(title);

  const text = document.createElement('p');
  text.textContent = t('areas.contactRealHouseToday', { district: district.name });
  content.appendChild(text);

  const buttons = document.createElement('div');
  buttons.className = 'area-page__bottom-cta-buttons';

  const scheduleBtn = document.createElement('a');
  scheduleBtn.href = '/contact';
  scheduleBtn.className = 'btn btn--primary btn--large';
  scheduleBtn.setAttribute('data-route', '');
  scheduleBtn.textContent = t('areas.scheduleViewing');
  buttons.appendChild(scheduleBtn);

  const whatsappBtn = document.createElement('a');
  whatsappBtn.href = `https://wa.me/${businessNAP.phones[0].number.replace(/[\s+]/g, '')}`;
  whatsappBtn.className = 'btn btn--secondary btn--large';
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';

  const waSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  waSvg.setAttribute('viewBox', '0 0 24 24');
  waSvg.setAttribute('fill', 'currentColor');
  waSvg.setAttribute('width', '20');
  waSvg.setAttribute('height', '20');
  const waPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  waPath.setAttribute('d', 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z');
  waSvg.appendChild(waPath);
  whatsappBtn.appendChild(waSvg);
  whatsappBtn.appendChild(document.createTextNode(' ' + t('areas.whatsAppUs')));
  buttons.appendChild(whatsappBtn);

  content.appendChild(buttons);
  section.appendChild(content);

  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Helper: Property Card
// ═══════════════════════════════════════════════════════════════════════════

function createPropertyCard(property: Property): HTMLElement {
  const card = document.createElement('article');
  card.className = 'property-card';
  card.dataset.propertyId = property.id;

  const favorited = isFavorite(property.id);

  const link = document.createElement('a');
  link.href = `/properties/${property.id}`;
  link.className = 'property-card__link';
  link.setAttribute('data-route', '');

  // Media section
  const media = document.createElement('div');
  media.className = 'property-card__media';

  const img = document.createElement('img');
  img.src = property.images[0];
  img.alt = `${property.title} - ${property.location.district}, Erbil`;
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

  // Content section
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
  sqmSpan.textContent = `${property.specs.sqm} m\u00B2`;
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

  // Add favorite toggle listener
  favoriteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
    updateFavoriteButton(favoriteBtn, isFavorite(property.id));
    updateFavoritesBadge();
  });

  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// 404 Area Page
// ═══════════════════════════════════════════════════════════════════════════

function render404AreaPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = document.createElement('div');
  page.className = 'area-page area-page--404';

  const container = document.createElement('div');
  container.className = 'area-page__404';

  const title = document.createElement('h1');
  title.textContent = t('areas.areaNotFound');
  container.appendChild(title);

  const text = document.createElement('p');
  text.textContent = t('areas.areaNotFoundMessage', { slug });
  container.appendChild(text);

  const buttons = document.createElement('div');
  buttons.className = 'area-page__404-buttons';

  const locationsBtn = document.createElement('a');
  locationsBtn.href = '/locations';
  locationsBtn.className = 'btn btn--primary';
  locationsBtn.setAttribute('data-route', '');
  locationsBtn.textContent = t('areas.viewAllLocations');
  buttons.appendChild(locationsBtn);

  const propertiesBtn = document.createElement('a');
  propertiesBtn.href = '/properties';
  propertiesBtn.className = 'btn btn--secondary';
  propertiesBtn.setAttribute('data-route', '');
  propertiesBtn.textContent = t('areas.browseProperties');
  buttons.appendChild(propertiesBtn);

  container.appendChild(buttons);
  page.appendChild(container);
  fragment.appendChild(page);
  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// LocalBusiness Schema with Geo Coordinates and Driving Directions
// Optimized for local SEO and "near me" searches
// ═══════════════════════════════════════════════════════════════════════════

export function generateAreaLocalBusinessSchema(district: DistrictLocation): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // LocalBusiness for Real House
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://realhouseiq.com/#organization',
        'name': businessNAP.name,
        'legalName': businessNAP.legalName,
        'url': businessNAP.website,
        'logo': 'https://realhouseiq.com/logo.png',
        'image': [
          'https://realhouseiq.com/logo.png',
          'https://realhouseiq.com/office.jpg'
        ],
        'description': `Premier real estate agency specializing in ${district.name} and Erbil properties. Buy, sell, or rent luxury villas, apartments, and commercial properties in Kurdistan.`,
        'telephone': businessNAP.phones.map(p => p.number),
        'email': businessNAP.email,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': businessNAP.address.street,
          'addressLocality': businessNAP.address.city,
          'addressRegion': businessNAP.address.region,
          'postalCode': businessNAP.address.postalCode,
          'addressCountry': businessNAP.address.countryCode
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': businessNAP.coordinates.lat,
          'longitude': businessNAP.coordinates.lng
        },
        'hasMap': `https://www.google.com/maps?q=${businessNAP.coordinates.lat},${businessNAP.coordinates.lng}`,
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': businessNAP.openingHours.weekdays.days,
            'opens': businessNAP.openingHours.weekdays.open,
            'closes': businessNAP.openingHours.weekdays.close
          }
        ],
        'priceRange': businessNAP.businessDetails.priceRange,
        'currenciesAccepted': businessNAP.businessDetails.currenciesAccepted.join(', '),
        'paymentAccepted': businessNAP.businessDetails.paymentMethods.join(', '),
        'areaServed': [
          {
            '@type': 'City',
            'name': 'Erbil',
            'containedInPlace': {
              '@type': 'AdministrativeArea',
              'name': 'Kurdistan Region'
            }
          },
          {
            '@type': 'Place',
            'name': district.name,
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Erbil',
              'addressRegion': 'Kurdistan Region',
              'addressCountry': 'Iraq'
            }
          }
        ],
        'knowsLanguage': businessNAP.businessDetails.languages,
        'sameAs': Object.values(businessNAP.social)
      },
      // Place schema for the district
      {
        '@type': 'Place',
        '@id': `https://realhouseiq.com/areas/${district.slug}#place`,
        'name': `${district.name}, Erbil`,
        'description': district.description,
        'url': `https://realhouseiq.com/areas/${district.slug}`,
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
          'sameAs': 'https://en.wikipedia.org/wiki/Erbil'
        },
        'amenityFeature': district.amenities.map(amenity => ({
          '@type': 'LocationFeatureSpecification',
          'name': amenity,
          'value': true
        }))
      },
      // Driving directions / HowToDirection
      {
        '@type': 'HowTo',
        '@id': `https://realhouseiq.com/areas/${district.slug}#directions`,
        'name': `How to Get to ${district.name}, Erbil`,
        'description': `Driving directions to ${district.name} district in Erbil, Kurdistan Region`,
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'From Erbil International Airport',
            'text': district.transportLinks.find(t => t.toLowerCase().includes('airport')) || '20-30 minutes by car'
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'From Erbil City Center',
            'text': district.transportLinks.find(t => t.toLowerCase().includes('center')) || '15-20 minutes by car'
          }
        ],
        'supply': [],
        'tool': [
          {
            '@type': 'HowToTool',
            'name': 'Car or Taxi'
          },
          {
            '@type': 'HowToTool',
            'name': 'Google Maps Navigation'
          }
        ]
      },
      // ItemList for properties in this area
      {
        '@type': 'ItemList',
        '@id': `https://realhouseiq.com/areas/${district.slug}#properties`,
        'name': `Properties for Sale in ${district.name}, Erbil`,
        'description': `${getPropertyCountByDistrict(district.name)} properties available in ${district.name}. Prices from ${formatPrice(district.priceRange.min)} to ${formatPrice(district.priceRange.max)}.`,
        'numberOfItems': getPropertyCountByDistrict(district.name),
        'itemListOrder': 'https://schema.org/ItemListOrderDescending'
      }
    ]
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SEO Setup Functions for Area Pages
// ═══════════════════════════════════════════════════════════════════════════

export function setupAreaPageSEO(district: DistrictLocation): void {
  const propertyCount = getPropertyCountByDistrict(district.name);

  // Title optimized for local searches (max 60 chars)
  document.title = `${district.name} Properties Erbil | ${propertyCount} Homes for Sale | Real House`;

  // Meta description (max 160 chars)
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content',
      `Find ${propertyCount} properties in ${district.name}, Erbil. ${district.propertyTypes.join(', ')} from ${formatPrice(district.priceRange.min)}. ${district.demographics.lifestyle} living. Contact Real House: ${businessNAP.phones[0].number}`
    );
  }

  // Canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://realhouseiq.com/areas/${district.slug}`);
  }

  // Keywords meta - Enhanced for "near me" searches
  let keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (!keywordsMeta) {
    keywordsMeta = document.createElement('meta');
    keywordsMeta.setAttribute('name', 'keywords');
    document.head.appendChild(keywordsMeta);
  }
  keywordsMeta.setAttribute('content', [
    ...district.seoKeywords,
    `real estate ${district.name.toLowerCase()}`,
    `properties near ${district.name.toLowerCase()}`,
    `homes for sale ${district.name.toLowerCase()} erbil`,
    // Near me keywords
    'real estate near me erbil',
    'property near me kurdistan',
    'houses for sale near me erbil',
    'apartments near me kurdistan',
    `${district.propertyTypes[0]?.toLowerCase() || 'property'} near me erbil`,
    // Location-based keywords
    `${district.name.toLowerCase()} neighborhood guide`,
    `living in ${district.name.toLowerCase()} erbil`,
    `${district.name.toLowerCase()} real estate market`
  ].join(', '));

  // Geo meta tags for local SEO - Critical for "near me" searches
  updateOrCreateMeta('geo.region', 'IQ-AR');
  updateOrCreateMeta('geo.placename', `${district.name}, Erbil, Kurdistan`);
  updateOrCreateMeta('geo.position', `${district.coordinates.lat};${district.coordinates.lng}`);
  updateOrCreateMeta('ICBM', `${district.coordinates.lat}, ${district.coordinates.lng}`);

  // Additional geo targeting for mobile "near me" searches
  updateOrCreateMeta('DC.title', `${district.name} Real Estate - Properties Near You in Erbil`);
  updateOrCreateMeta('DC.coverage', `${district.name}, Erbil, Kurdistan Region, Iraq`);

  // Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${district.name} Real Estate | Properties in Erbil | Real House`);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', district.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `https://realhouseiq.com/areas/${district.slug}`);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', district.image);

  // Twitter
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', `${district.name} Properties | Real House Erbil`);

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute('content', district.description);

  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) twitterImage.setAttribute('content', district.image);
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

// Export all area slugs for routing
export function getAllAreaSlugs(): string[] {
  return districts.map(d => d.slug);
}
