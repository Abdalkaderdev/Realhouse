// ═══════════════════════════════════════════════════════════════════════════
// Page Renderers for Real House
// Using Safe DOM Methods
// ═══════════════════════════════════════════════════════════════════════════

import { properties, featuredProperties, formatPrice, getPropertyById, type Property } from './data/properties';

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

// ─── Property Card Component ──────────────────────────────────────────────
function createPropertyCard(property: Property): HTMLElement {
  const card = createElement('article', 'property-card');
  card.setAttribute('data-id', property.id);

  // Media section
  const media = createElement('div', 'property-card__media');

  const img = createElement('img', 'property-card__image');
  img.src = property.images[0];
  img.alt = property.title;
  img.loading = 'lazy';
  media.appendChild(img);

  const overlay = createElement('div', 'property-card__overlay');
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
  favorite.setAttribute('aria-label', 'Add to favorites');
  favorite.appendChild(createSVGUse('icon-heart'));
  media.appendChild(favorite);

  card.appendChild(media);

  // Content section
  const content = createElement('div', 'property-card__content');

  const type = createElement('div', 'property-card__type', property.type);
  content.appendChild(type);

  const title = createElement('h3', 'property-card__title', property.title);
  content.appendChild(title);

  const location = createElement('p', 'property-card__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${property.location.city}, ${property.location.state}`));
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
  areaSpec.appendChild(document.createTextNode(`${property.specs.sqft.toLocaleString()} sqft`));
  specs.appendChild(areaSpec);

  content.appendChild(specs);

  // Footer
  const footer = createElement('div', 'property-card__footer');

  const price = createElement('span', 'property-card__price', formatPrice(property.price));
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

  const heroContent = createElement('div', 'hero__content container');

  // Eyebrow
  const eyebrow = createElement('div', 'hero__eyebrow');
  const line1 = createElement('span', 'hero__line');
  const eyebrowText = createElement('span', undefined, 'Premium Real Estate');
  const line2 = createElement('span', 'hero__line');
  eyebrow.appendChild(line1);
  eyebrow.appendChild(eyebrowText);
  eyebrow.appendChild(line2);
  heroContent.appendChild(eyebrow);

  // Headline
  const headline = createElement('h1', 'hero__headline', 'Where Luxury Meets Living');
  heroContent.appendChild(headline);

  // Subline
  const subline = createElement('p', 'hero__subline', 'Curated properties for the discerning buyer. Architecture that inspires. Locations that define.');
  heroContent.appendChild(subline);

  // CTA
  const cta = createElement('div', 'hero__cta');

  const primaryBtn = createElement('a', 'btn btn--primary btn--large', 'Explore Properties');
  primaryBtn.href = '/properties';
  primaryBtn.setAttribute('data-route', '');
  cta.appendChild(primaryBtn);

  const ghostBtn = createElement('a', 'btn btn--ghost btn--large', 'Our Story');
  ghostBtn.href = '/about';
  ghostBtn.setAttribute('data-route', '');
  cta.appendChild(ghostBtn);

  heroContent.appendChild(cta);
  hero.appendChild(heroContent);

  // Scroll indicator
  const scroll = createElement('div', 'hero__scroll');
  const scrollLine = createElement('div', 'hero__scroll-line');
  const scrollText = createElement('span', undefined, 'Scroll');
  scroll.appendChild(scrollLine);
  scroll.appendChild(scrollText);
  hero.appendChild(scroll);

  fragment.appendChild(hero);

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
  featuredProperties.slice(0, 3).forEach(property => {
    featuredGrid.appendChild(createPropertyCard(property));
  });
  featuredContainer.appendChild(featuredGrid);

  featured.appendChild(featuredContainer);
  fragment.appendChild(featured);

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

  const page = createElement('div', 'properties-page');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'properties-page__header');
  const title = createElement('h1', 'properties-page__title', 'Our Properties');
  const subtitle = createElement('p', 'properties-page__subtitle', 'Discover exceptional homes in the world\'s most desirable locations.');
  header.appendChild(title);
  header.appendChild(subtitle);
  container.appendChild(header);

  // Filters
  const filters = createElement('div', 'properties-page__filters');
  const filterTypes = ['All', 'Villa', 'Penthouse', 'Estate', 'Townhouse', 'Condominium'];
  filterTypes.forEach((type, index) => {
    const btn = createElement('button', `properties-page__filter${index === 0 ? ' active' : ''}`, type);
    filters.appendChild(btn);
  });
  container.appendChild(filters);

  // Grid
  const grid = createElement('div', 'properties-page__grid');
  properties.forEach(property => {
    grid.appendChild(createPropertyCard(property));
  });
  container.appendChild(grid);

  page.appendChild(container);
  fragment.appendChild(page);

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
  img.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80';
  img.alt = 'Luxury property';
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
    { name: 'Alexandra Chen', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
    { name: 'Marcus Williams', role: 'Head of Sales', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
    { name: 'Sofia Rodriguez', role: 'Chief Marketing Officer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
    { name: 'James Mitchell', role: 'Senior Agent', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }
  ];

  teamMembers.forEach(member => {
    const memberEl = createElement('div', 'about-page__member');
    const imgDiv = createElement('div', 'about-page__member-image');
    const memberImg = createElement('img');
    memberImg.src = member.image;
    memberImg.alt = member.name;
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
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you shortly.');
  });

  const fields = [
    { label: 'Full Name', type: 'text', name: 'name', placeholder: 'John Doe' },
    { label: 'Email Address', type: 'email', name: 'email', placeholder: 'john@example.com' },
    { label: 'Phone Number', type: 'tel', name: 'phone', placeholder: '+1 (555) 000-0000' }
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
    group.appendChild(label);
    group.appendChild(input);
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
  msgGroup.appendChild(msgLabel);
  msgGroup.appendChild(textarea);
  form.appendChild(msgGroup);

  const submit = createElement('button', 'form__submit', 'Send Message');
  submit.type = 'submit';
  form.appendChild(submit);

  formWrapper.appendChild(form);
  grid.appendChild(formWrapper);

  // Info
  const info = createElement('div', 'contact-page__info');

  const infoItems = [
    { title: 'Office', content: '100 Park Avenue, Suite 1500\nNew York, NY 10017' },
    { title: 'Phone', content: '+1 (212) 555-0100', isLink: true, href: 'tel:+12125550100' },
    { title: 'Email', content: 'hello@realhouse.com', isLink: true, href: 'mailto:hello@realhouse.com' },
    { title: 'Hours', content: 'Monday - Friday: 9AM - 6PM\nWeekends: By Appointment' }
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

  // Main image
  const mainImageWrapper = createElement('div', 'property-gallery__main');
  const mainImage = createElement('img', 'property-gallery__main-image');
  mainImage.src = property.images[0];
  mainImage.alt = property.title;
  mainImage.id = 'property-main-image';
  mainImageWrapper.appendChild(mainImage);
  galleryContainer.appendChild(mainImageWrapper);

  // Thumbnails
  if (property.images.length > 1) {
    const thumbnails = createElement('div', 'property-gallery__thumbnails');
    property.images.forEach((imageSrc, index) => {
      const thumb = createElement('button', `property-gallery__thumb${index === 0 ? ' active' : ''}`);
      thumb.setAttribute('data-index', index.toString());
      const thumbImg = createElement('img');
      thumbImg.src = imageSrc;
      thumbImg.alt = `${property.title} - Image ${index + 1}`;
      thumb.appendChild(thumbImg);

      thumb.addEventListener('click', () => {
        const mainImg = document.getElementById('property-main-image') as HTMLImageElement;
        if (mainImg) {
          mainImg.src = imageSrc;
        }
        thumbnails.querySelectorAll('.property-gallery__thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
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
  location.appendChild(document.createTextNode(`${property.location.address}, ${property.location.city}, ${property.location.state}`));
  header.appendChild(location);

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
    { icon: 'icon-area', label: 'Square Feet', value: property.specs.sqft.toLocaleString() },
    { icon: 'icon-calendar', label: 'Year Built', value: property.specs.yearBuilt.toString() }
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
  agentImg.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80';
  agentImg.alt = 'Marcus Williams';
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
  phoneLink.href = 'tel:+12125550100';
  phoneLink.appendChild(createSVGUse('icon-phone'));
  phoneLink.appendChild(document.createTextNode('+1 (212) 555-0100'));
  agentContact.appendChild(phoneLink);

  const emailLink = createElement('a', 'property-detail__agent-link');
  emailLink.href = 'mailto:marcus@realhouse.com';
  emailLink.appendChild(createSVGUse('icon-email'));
  emailLink.appendChild(document.createTextNode('marcus@realhouse.com'));
  agentContact.appendChild(emailLink);

  agentCard.appendChild(agentContact);

  // Contact buttons
  const agentActions = createElement('div', 'property-detail__agent-actions');

  const scheduleBtn = createElement('a', 'btn btn--primary btn--full', 'Schedule Viewing');
  scheduleBtn.href = '/contact';
  scheduleBtn.setAttribute('data-route', '');
  agentActions.appendChild(scheduleBtn);

  const callBtn = createElement('a', 'btn btn--ghost btn--full', 'Call Agent');
  callBtn.href = 'tel:+12125550100';
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

  const cityLine = createElement('p', 'property-detail__city-line', `${property.location.city}, ${property.location.state}`);
  addressInfo.appendChild(cityLine);

  const countryLine = createElement('p', 'property-detail__country-line', property.location.country);
  addressInfo.appendChild(countryLine);

  locationCard.appendChild(addressInfo);
  sidebar.appendChild(locationCard);

  contentGrid.appendChild(sidebar);
  contentContainer.appendChild(contentGrid);
  content.appendChild(contentContainer);
  page.appendChild(content);

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
