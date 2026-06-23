// ═══════════════════════════════════════════════════════════════════════════
// Agent Profile Page - Cinematic Editorial Redesign
// /agents/:slug - Individual agent detail page
// ═══════════════════════════════════════════════════════════════════════════

import {
  getAgentBySlug,
  generateAgentSchema,
  formatSalesVolume,
  agents,
  type Agent
} from '../data/agents';
import { properties, type Property } from '../data/properties';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema
} from '../components/internal-linking';
import { t } from '../i18n';

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

// ─── Breadcrumb Helpers ─────────────────────────────────────────────────────
function getAgentDetailBreadcrumbs(agent: Agent) {
  return [
    { name: t('agentProfile.home'), url: '/' },
    { name: t('agentProfile.ourAgents'), url: '/agents' },
    { name: agent.name, url: `/agents/${agent.slug}` }
  ];
}

// ─── Get Agent Properties ───────────────────────────────────────────────────
function getAgentProperties(agent: Agent): Property[] {
  return properties
    .filter(p => agent.featuredAreas.some(area =>
      p.location.district.toLowerCase().includes(area.toLowerCase()) ||
      area.toLowerCase().includes(p.location.district.toLowerCase())
    ))
    .slice(0, 6);
}

// ─── Language flag emoji helper ─────────────────────────────────────────────
function getLanguageFlag(lang: string): string {
  const map: Record<string, string> = {
    'Kurdish': '🇮🇶',
    'Arabic': '🇸🇦',
    'English': '🇬🇧',
    'Turkish': '🇹🇷',
    'Persian': '🇮🇷',
    'French': '🇫🇷',
    'German': '🇩🇪',
    'Spanish': '🇪🇸'
  };
  return map[lang] || '🌐';
}

// ─── Specialization Icon Mapping ────────────────────────────────────────────
function getSpecIcon(spec: string): string {
  const s = spec.toLowerCase();
  if (s.includes('villa') || s.includes('residential') || s.includes('home')) return 'icon-home';
  if (s.includes('commercial') || s.includes('investment') || s.includes('roi')) return 'icon-chart';
  if (s.includes('luxury') || s.includes('high-end') || s.includes('dream')) return 'icon-award';
  if (s.includes('waterfront') || s.includes('off-plan')) return 'icon-building';
  return 'icon-check';
}

// ─── Create Star Rating ─────────────────────────────────────────────────────
function createStarRating(rating: number): HTMLElement {
  const stars = createElement('div', 'agent-profile__stars');
  for (let i = 1; i <= 5; i++) {
    const star = createElement('span', i <= rating ? 'agent-profile__star agent-profile__star--filled' : 'agent-profile__star');
    star.textContent = '★';
    stars.appendChild(star);
  }
  return stars;
}

// ─── Create Testimonial Card ────────────────────────────────────────────────
function createTestimonialCard(testimonial: Agent['testimonials'][0]): HTMLElement {
  const card = createElement('figure', 'agent-profile__testimonial');

  const quoteMark = createElement('span', 'agent-profile__testimonial-quote', '“');
  card.appendChild(quoteMark);

  const header = createElement('div', 'agent-profile__testimonial-header');
  header.appendChild(createStarRating(testimonial.rating));

  if (testimonial.propertyType) {
    const badge = createElement('span', 'agent-profile__testimonial-badge', testimonial.propertyType);
    header.appendChild(badge);
  }
  card.appendChild(header);

  const text = createElement('blockquote', 'agent-profile__testimonial-text', testimonial.text);
  card.appendChild(text);

  const footer = createElement('figcaption', 'agent-profile__testimonial-footer');
  const clientName = createElement('span', 'agent-profile__testimonial-client', testimonial.clientName);
  footer.appendChild(clientName);
  const clientLocation = createElement('span', 'agent-profile__testimonial-location', testimonial.clientLocation);
  footer.appendChild(clientLocation);
  card.appendChild(footer);

  const date = createElement('span', 'agent-profile__testimonial-date', testimonial.date);
  card.appendChild(date);

  return card;
}

// ─── Create Property Card (Compact) ─────────────────────────────────────────
function createCompactPropertyCard(property: Property): HTMLElement {
  const card = createElement('a', 'agent-profile__property-card');
  card.href = `/properties/${property.id}`;
  card.setAttribute('data-route', '');

  const image = createElement('div', 'agent-profile__property-image');
  image.style.backgroundImage = `url(${property.images[0]})`;

  const badge = createElement('span', `agent-profile__property-badge agent-profile__property-badge--${property.status.toLowerCase().replace(' ', '-')}`);
  badge.textContent = property.status;
  image.appendChild(badge);

  card.appendChild(image);

  const content = createElement('div', 'agent-profile__property-content');

  const title = createElement('h4', 'agent-profile__property-title', property.title);
  content.appendChild(title);

  const location = createElement('p', 'agent-profile__property-location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${property.location.district}, ${property.location.city}`));
  content.appendChild(location);

  const price = createElement('p', 'agent-profile__property-price');
  price.textContent = property.price > 0 ? `$${property.price.toLocaleString()}` : t('agentProfile.priceOnRequest');
  content.appendChild(price);

  const specs = createElement('div', 'agent-profile__property-specs');
  if (property.specs.beds > 0) {
    const beds = createElement('span', undefined, `${property.specs.beds} ${t('agentProfile.beds')}`);
    specs.appendChild(beds);
  }
  const baths = createElement('span', undefined, `${property.specs.baths} ${t('agentProfile.baths')}`);
  specs.appendChild(baths);
  const sqm = createElement('span', undefined, `${property.specs.sqm} m²`);
  specs.appendChild(sqm);
  content.appendChild(specs);

  card.appendChild(content);

  return card;
}

// ─── Other Team Member Card ──────────────────────────────────────────────────
function createOtherMemberCard(agent: Agent): HTMLElement {
  const card = createElement('a', 'agent-profile__other-card');
  card.href = `/agents/${agent.slug}`;
  card.setAttribute('data-route', '');

  const imageWrap = createElement('div', 'agent-profile__other-image-wrap');
  const image = createElement('img', 'agent-profile__other-image') as HTMLImageElement;
  image.src = agent.image;
  image.alt = agent.name;
  image.loading = 'lazy';
  image.width = 200;
  image.height = 240;
  imageWrap.appendChild(image);
  card.appendChild(imageWrap);

  const body = createElement('div', 'agent-profile__other-body');
  const name = createElement('h4', 'agent-profile__other-name', agent.name);
  body.appendChild(name);
  const role = createElement('p', 'agent-profile__other-role', agent.role);
  body.appendChild(role);

  const cta = createElement('span', 'agent-profile__other-cta');
  cta.appendChild(document.createTextNode('View profile'));
  cta.appendChild(createSVGUse('icon-arrow-right'));
  body.appendChild(cta);

  card.appendChild(body);
  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// Agent Profile Page Renderer
// ═══════════════════════════════════════════════════════════════════════════

export function renderAgentProfilePage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const agent = getAgentBySlug(slug);

  if (!agent) {
    const page = createElement('div', 'agent-profile-page agent-profile-page--not-found');
    const container = createElement('div', 'container');

    const notFound = createElement('div', 'agent-profile-page__not-found');
    const title = createElement('h1', undefined, t('agentProfile.agentNotFound'));
    notFound.appendChild(title);
    const text = createElement('p', undefined, t('agentProfile.agentNotFoundMessage'));
    notFound.appendChild(text);
    const backLink = createElement('a', 'btn btn--primary', t('agentProfile.viewAllAgents'));
    backLink.href = '/agents';
    backLink.setAttribute('data-route', '');
    notFound.appendChild(backLink);
    container.appendChild(notFound);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  const breadcrumbs = getAgentDetailBreadcrumbs(agent);
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'agent-profile-page');

  // ═══════════════════════════════════════════════════════════════════════
  // CINEMATIC HERO - Full-bleed photo + gradient + content
  // ═══════════════════════════════════════════════════════════════════════
  const hero = createElement('section', 'agent-profile__hero');

  const heroBg = createElement('div', 'agent-profile__hero-bg');
  heroBg.setAttribute('aria-hidden', 'true');
  const heroImage = createElement('div', 'agent-profile__hero-image');
  heroImage.style.backgroundImage = `url(${agent.image})`;
  heroBg.appendChild(heroImage);
  const heroGradient = createElement('div', 'agent-profile__hero-gradient');
  heroBg.appendChild(heroGradient);
  const heroGrain = createElement('div', 'agent-profile__hero-grain');
  heroBg.appendChild(heroGrain);
  hero.appendChild(heroBg);

  const heroContainer = createElement('div', 'container');
  heroContainer.appendChild(createBreadcrumbs(breadcrumbs));

  const heroContent = createElement('div', 'agent-profile__hero-content');

  // Portrait
  const portraitWrap = createElement('div', 'agent-profile__portrait');
  const portraitFrame = createElement('div', 'agent-profile__portrait-frame');
  const portraitImg = createElement('img', 'agent-profile__portrait-img') as HTMLImageElement;
  portraitImg.src = agent.image;
  portraitImg.alt = `${agent.name}, ${agent.role}`;
  portraitImg.width = 480;
  portraitImg.height = 600;
  portraitFrame.appendChild(portraitImg);
  portraitWrap.appendChild(portraitFrame);
  heroContent.appendChild(portraitWrap);

  // Info
  const heroInfo = createElement('div', 'agent-profile__hero-info');

  const heroEyebrow = createElement('div', 'agent-profile__hero-eyebrow');
  const heroEyebrowLine = createElement('span', 'agent-profile__hero-eyebrow-line');
  const heroEyebrowText = createElement('span', 'agent-profile__hero-eyebrow-text', agent.role);
  heroEyebrow.appendChild(heroEyebrowLine);
  heroEyebrow.appendChild(heroEyebrowText);
  heroInfo.appendChild(heroEyebrow);

  const name = createElement('h1', 'agent-profile__name', agent.name);
  heroInfo.appendChild(name);

  const tagline = createElement('p', 'agent-profile__tagline', agent.bio);
  heroInfo.appendChild(tagline);

  // Spec pills
  const specPills = createElement('div', 'agent-profile__spec-pills');
  agent.specializations.slice(0, 4).forEach(spec => {
    const pill = createElement('span', 'agent-profile__spec-pill', spec);
    specPills.appendChild(pill);
  });
  heroInfo.appendChild(specPills);

  heroContent.appendChild(heroInfo);
  heroContainer.appendChild(heroContent);
  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // ═══════════════════════════════════════════════════════════════════════
  // QUICK STATS BAR
  // ═══════════════════════════════════════════════════════════════════════
  const statsBar = createElement('section', 'agent-profile__stats-bar');
  const statsBarContainer = createElement('div', 'container');
  const statsBarInner = createElement('div', 'agent-profile__stats-bar-inner');

  const statBarItems = [
    { value: `${agent.yearsExperience}+`, label: t('agentProfile.yearsExperience') },
    { value: agent.propertiesSold.toString(), label: t('agentProfile.propertiesSold') },
    { value: formatSalesVolume(agent.totalSalesVolume), label: t('agentProfile.totalSales') },
    { value: agent.activeListings.toString(), label: t('agentProfile.activeListings') }
  ];
  statBarItems.forEach((stat, i) => {
    const item = createElement('div', 'agent-profile__stats-bar-item');
    item.style.setProperty('--stat-delay', `${i * 80}ms`);
    const value = createElement('span', 'agent-profile__stats-bar-value', stat.value);
    const label = createElement('span', 'agent-profile__stats-bar-label', stat.label);
    item.appendChild(value);
    item.appendChild(label);
    statsBarInner.appendChild(item);
  });

  statsBarContainer.appendChild(statsBarInner);
  statsBar.appendChild(statsBarContainer);
  page.appendChild(statsBar);

  // ═══════════════════════════════════════════════════════════════════════
  // MAIN CONTENT GRID (main + sticky sidebar)
  // ═══════════════════════════════════════════════════════════════════════
  const mainContent = createElement('section', 'agent-profile__content');
  const mainContainer = createElement('div', 'container');
  const grid = createElement('div', 'agent-profile__grid');
  const main = createElement('div', 'agent-profile__main');

  // ─── About Me Section ───
  const aboutSection = createElement('div', 'agent-profile__section agent-profile__section--about');

  const aboutHeader = createElement('div', 'agent-profile__section-header');
  const aboutEyebrow = createElement('span', 'agent-profile__section-eyebrow', '01 · Story');
  aboutHeader.appendChild(aboutEyebrow);
  const aboutTitle = createElement('h2', 'agent-profile__section-title', `About ${agent.name}`);
  aboutHeader.appendChild(aboutTitle);
  aboutSection.appendChild(aboutHeader);

  const aboutLayout = createElement('div', 'agent-profile__about-layout');
  const aboutText = createElement('div', 'agent-profile__about-text');
  const bioParagraphs = agent.fullBio.split('\n\n');
  bioParagraphs.forEach((para, i) => {
    if (para.trim()) {
      const p = createElement('p', i === 0 ? 'agent-profile__bio-text agent-profile__bio-text--lead' : 'agent-profile__bio-text', para.trim());
      aboutText.appendChild(p);
    }
  });
  aboutLayout.appendChild(aboutText);

  const aboutSide = createElement('aside', 'agent-profile__about-side');
  const sideImg = createElement('div', 'agent-profile__about-side-img');
  sideImg.style.backgroundImage = `url(${agent.image})`;
  aboutSide.appendChild(sideImg);

  const sideCaption = createElement('div', 'agent-profile__about-side-caption');
  const sideCapName = createElement('span', 'agent-profile__about-side-name', agent.name);
  const sideCapTitle = createElement('span', 'agent-profile__about-side-title', agent.title);
  sideCaption.appendChild(sideCapName);
  sideCaption.appendChild(sideCapTitle);
  aboutSide.appendChild(sideCaption);

  aboutLayout.appendChild(aboutSide);
  aboutSection.appendChild(aboutLayout);
  main.appendChild(aboutSection);

  // ─── Specialties Section ───
  const specSection = createElement('div', 'agent-profile__section');
  const specHeader = createElement('div', 'agent-profile__section-header');
  const specEyebrow = createElement('span', 'agent-profile__section-eyebrow', '02 · Expertise');
  specHeader.appendChild(specEyebrow);
  const specTitle = createElement('h2', 'agent-profile__section-title', 'Specialties');
  specHeader.appendChild(specTitle);
  specSection.appendChild(specHeader);

  const specGrid = createElement('div', 'agent-profile__specialties-grid');
  agent.specializations.forEach(spec => {
    const item = createElement('div', 'agent-profile__specialty');
    const iconWrap = createElement('div', 'agent-profile__specialty-icon');
    iconWrap.appendChild(createSVGUse(getSpecIcon(spec)));
    item.appendChild(iconWrap);
    const label = createElement('span', 'agent-profile__specialty-label', spec);
    item.appendChild(label);
    specGrid.appendChild(item);
  });
  specSection.appendChild(specGrid);

  // Featured areas inline
  const areasBlock = createElement('div', 'agent-profile__areas-block');
  const areasLabel = createElement('span', 'agent-profile__areas-label', 'Active in');
  areasBlock.appendChild(areasLabel);
  const areasTags = createElement('div', 'agent-profile__areas-tags');
  agent.featuredAreas.forEach(area => {
    const tag = createElement('span', 'agent-profile__area-tag', area);
    areasTags.appendChild(tag);
  });
  areasBlock.appendChild(areasTags);
  specSection.appendChild(areasBlock);

  main.appendChild(specSection);

  // ─── Certifications & Awards ───
  if (agent.certifications.length > 0 || agent.awards.length > 0) {
    const credSection = createElement('div', 'agent-profile__section');
    const credHeader = createElement('div', 'agent-profile__section-header');
    const credEyebrow = createElement('span', 'agent-profile__section-eyebrow', '03 · Credentials');
    credHeader.appendChild(credEyebrow);
    const credTitle = createElement('h2', 'agent-profile__section-title', 'Certifications & Awards');
    credHeader.appendChild(credTitle);
    credSection.appendChild(credHeader);

    const credCards = createElement('div', 'agent-profile__cred-cards');

    agent.certifications.forEach(cert => {
      const card = createElement('div', 'agent-profile__cred-card agent-profile__cred-card--cert');
      const icon = createElement('div', 'agent-profile__cred-card-icon');
      icon.appendChild(createSVGUse('icon-shield'));
      card.appendChild(icon);
      const type = createElement('span', 'agent-profile__cred-card-type', 'Certification');
      card.appendChild(type);
      const name = createElement('p', 'agent-profile__cred-card-name', cert);
      card.appendChild(name);
      credCards.appendChild(card);
    });

    agent.awards.forEach(award => {
      const card = createElement('div', 'agent-profile__cred-card agent-profile__cred-card--award');
      const icon = createElement('div', 'agent-profile__cred-card-icon');
      icon.appendChild(createSVGUse('icon-award'));
      card.appendChild(icon);
      const type = createElement('span', 'agent-profile__cred-card-type', 'Award');
      card.appendChild(type);
      const name = createElement('p', 'agent-profile__cred-card-name', award);
      card.appendChild(name);
      credCards.appendChild(card);
    });

    credSection.appendChild(credCards);
    main.appendChild(credSection);
  }

  // ─── Featured Properties Carousel ───
  const agentProperties = getAgentProperties(agent);
  if (agentProperties.length > 0) {
    const propertiesSection = createElement('div', 'agent-profile__section');
    const propHeader = createElement('div', 'agent-profile__section-header');
    const propEyebrow = createElement('span', 'agent-profile__section-eyebrow', '04 · Portfolio');
    propHeader.appendChild(propEyebrow);
    const propTitleRow = createElement('div', 'agent-profile__section-title-row');
    const propTitle = createElement('h2', 'agent-profile__section-title', `${agent.name}'s Featured Listings`);
    propTitleRow.appendChild(propTitle);
    const viewAllLink = createElement('a', 'agent-profile__view-all', t('agentProfile.viewAllProperties'));
    viewAllLink.href = '/properties';
    viewAllLink.setAttribute('data-route', '');
    viewAllLink.appendChild(createSVGUse('icon-arrow-right'));
    propTitleRow.appendChild(viewAllLink);
    propHeader.appendChild(propTitleRow);
    propertiesSection.appendChild(propHeader);

    const carouselWrap = createElement('div', 'agent-profile__carousel-wrap');
    const carousel = createElement('div', 'agent-profile__carousel');
    carousel.id = `agent-${agent.slug}-carousel`;
    agentProperties.forEach(property => {
      const slide = createElement('div', 'agent-profile__carousel-slide');
      slide.appendChild(createCompactPropertyCard(property));
      carousel.appendChild(slide);
    });
    carouselWrap.appendChild(carousel);

    // Carousel controls
    const carouselControls = createElement('div', 'agent-profile__carousel-controls');
    const prevBtn = createElement('button', 'agent-profile__carousel-btn agent-profile__carousel-btn--prev');
    prevBtn.setAttribute('aria-label', 'Previous properties');
    prevBtn.appendChild(createSVGUse('icon-arrow-left'));
    const nextBtn = createElement('button', 'agent-profile__carousel-btn agent-profile__carousel-btn--next');
    nextBtn.setAttribute('aria-label', 'Next properties');
    nextBtn.appendChild(createSVGUse('icon-arrow-right'));
    carouselControls.appendChild(prevBtn);
    carouselControls.appendChild(nextBtn);
    carouselWrap.appendChild(carouselControls);

    propertiesSection.appendChild(carouselWrap);
    main.appendChild(propertiesSection);

    // Wire up carousel
    setTimeout(() => {
      const carouselEl = document.getElementById(`agent-${agent.slug}-carousel`);
      if (!carouselEl) return;
      prevBtn.addEventListener('click', () => {
        carouselEl.scrollBy({ left: -carouselEl.clientWidth * 0.8, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        carouselEl.scrollBy({ left: carouselEl.clientWidth * 0.8, behavior: 'smooth' });
      });
    }, 100);
  }

  // ─── Testimonials Section ───
  if (agent.testimonials.length > 0) {
    const testimonialsSection = createElement('div', 'agent-profile__section');
    const tHeader = createElement('div', 'agent-profile__section-header');
    const tEyebrow = createElement('span', 'agent-profile__section-eyebrow', '05 · Voices');
    tHeader.appendChild(tEyebrow);
    const tTitle = createElement('h2', 'agent-profile__section-title', 'What Clients Say');
    tHeader.appendChild(tTitle);
    testimonialsSection.appendChild(tHeader);

    const avgRating = agent.testimonials.reduce((sum, t) => sum + t.rating, 0) / agent.testimonials.length;
    const ratingRow = createElement('div', 'agent-profile__rating-row');
    ratingRow.appendChild(createStarRating(Math.round(avgRating)));
    const ratingText = createElement('span', 'agent-profile__rating-text', `${avgRating.toFixed(1)} out of 5 · ${agent.testimonials.length} client reviews`);
    ratingRow.appendChild(ratingText);
    testimonialsSection.appendChild(ratingRow);

    const testimonialsGrid = createElement('div', 'agent-profile__testimonials-grid');
    agent.testimonials.forEach(testimonial => {
      testimonialsGrid.appendChild(createTestimonialCard(testimonial));
    });
    testimonialsSection.appendChild(testimonialsGrid);

    main.appendChild(testimonialsSection);
  }

  // ─── Languages Section ───
  const langSection = createElement('div', 'agent-profile__section');
  const langHeader = createElement('div', 'agent-profile__section-header');
  const langEyebrow = createElement('span', 'agent-profile__section-eyebrow', '06 · Languages');
  langHeader.appendChild(langEyebrow);
  const langTitle = createElement('h2', 'agent-profile__section-title', 'Languages Spoken');
  langHeader.appendChild(langTitle);
  langSection.appendChild(langHeader);

  const langGrid = createElement('div', 'agent-profile__lang-grid');
  agent.languages.forEach(lang => {
    const card = createElement('div', 'agent-profile__lang-card');
    const flag = createElement('span', 'agent-profile__lang-flag', getLanguageFlag(lang));
    card.appendChild(flag);
    const name = createElement('span', 'agent-profile__lang-name', lang);
    card.appendChild(name);
    const fluency = createElement('span', 'agent-profile__lang-fluency', 'Fluent');
    card.appendChild(fluency);
    langGrid.appendChild(card);
  });
  langSection.appendChild(langGrid);
  main.appendChild(langSection);

  grid.appendChild(main);

  // ═══════════════════════════════════════════════════════════════════════
  // STICKY SIDEBAR
  // ═══════════════════════════════════════════════════════════════════════
  const sidebar = createElement('aside', 'agent-profile__sidebar');
  const stickyInner = createElement('div', 'agent-profile__sidebar-sticky');

  // Contact Card
  const contactCard = createElement('div', 'agent-profile__contact-card');

  const contactHeader = createElement('div', 'agent-profile__contact-header');
  const contactAvatar = createElement('img', 'agent-profile__contact-avatar') as HTMLImageElement;
  contactAvatar.src = agent.image;
  contactAvatar.alt = agent.name;
  contactAvatar.width = 64;
  contactAvatar.height = 64;
  contactHeader.appendChild(contactAvatar);
  const contactNameWrap = createElement('div', 'agent-profile__contact-name-wrap');
  const contactName = createElement('span', 'agent-profile__contact-name', agent.name);
  contactNameWrap.appendChild(contactName);
  const contactRole = createElement('span', 'agent-profile__contact-role', agent.role);
  contactNameWrap.appendChild(contactRole);
  contactHeader.appendChild(contactNameWrap);
  contactCard.appendChild(contactHeader);

  const contactStatus = createElement('div', 'agent-profile__contact-status');
  const statusDot = createElement('span', 'agent-profile__contact-status-dot');
  contactStatus.appendChild(statusDot);
  const statusText = createElement('span', 'agent-profile__contact-status-text', 'Available now · Replies within 2 hours');
  contactStatus.appendChild(statusText);
  contactCard.appendChild(contactStatus);

  // Primary action stack
  const contactActions = createElement('div', 'agent-profile__contact-actions');

  const whatsappBtn = createElement('a', 'agent-profile__contact-btn agent-profile__contact-btn--whatsapp');
  whatsappBtn.href = `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(`Hi ${agent.name}, I'd like to discuss a property.`)}`;
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.appendChild(createSVGUse('icon-whatsapp'));
  whatsappBtn.appendChild(document.createTextNode('WhatsApp'));
  contactActions.appendChild(whatsappBtn);

  const callBtn = createElement('a', 'agent-profile__contact-btn agent-profile__contact-btn--call');
  callBtn.href = `tel:${agent.phone.replace(/\s/g, '')}`;
  callBtn.appendChild(createSVGUse('icon-phone'));
  callBtn.appendChild(document.createTextNode('Call'));
  contactActions.appendChild(callBtn);

  const emailBtn = createElement('a', 'agent-profile__contact-btn agent-profile__contact-btn--email');
  emailBtn.href = `mailto:${agent.email}`;
  emailBtn.appendChild(createSVGUse('icon-email'));
  emailBtn.appendChild(document.createTextNode('Email'));
  contactActions.appendChild(emailBtn);

  contactCard.appendChild(contactActions);

  // Book consultation CTA
  const bookBtn = createElement('a', 'agent-profile__contact-book');
  bookBtn.href = `/contact?agent=${agent.slug}`;
  bookBtn.setAttribute('data-route', '');
  bookBtn.appendChild(createSVGUse('icon-calendar'));
  bookBtn.appendChild(document.createTextNode('Book Consultation'));
  contactCard.appendChild(bookBtn);

  // Mini stats inside contact card
  const miniStats = createElement('div', 'agent-profile__contact-mini-stats');
  const miniItems = [
    { v: `${agent.yearsExperience}+`, l: 'Years' },
    { v: agent.propertiesSold.toString(), l: 'Deals' },
    { v: agent.languages.length.toString(), l: 'Langs' }
  ];
  miniItems.forEach(m => {
    const mi = createElement('div', 'agent-profile__contact-mini-stat');
    const mv = createElement('span', 'agent-profile__contact-mini-value', m.v);
    const ml = createElement('span', 'agent-profile__contact-mini-label', m.l);
    mi.appendChild(mv);
    mi.appendChild(ml);
    miniStats.appendChild(mi);
  });
  contactCard.appendChild(miniStats);

  // Social Links
  if (Object.values(agent.socialLinks).some(Boolean)) {
    const socialLinks = createElement('div', 'agent-profile__social-links');
    const socialTitle = createElement('p', 'agent-profile__social-title', 'Connect');
    socialLinks.appendChild(socialTitle);
    const socialButtons = createElement('div', 'agent-profile__social-buttons');
    if (agent.socialLinks.linkedin) {
      const b = createElement('a', 'agent-profile__social-btn');
      b.href = agent.socialLinks.linkedin;
      b.target = '_blank';
      b.rel = 'noopener noreferrer';
      b.textContent = 'LinkedIn';
      socialButtons.appendChild(b);
    }
    if (agent.socialLinks.instagram) {
      const b = createElement('a', 'agent-profile__social-btn');
      b.href = agent.socialLinks.instagram;
      b.target = '_blank';
      b.rel = 'noopener noreferrer';
      b.textContent = 'Instagram';
      socialButtons.appendChild(b);
    }
    if (agent.socialLinks.facebook) {
      const b = createElement('a', 'agent-profile__social-btn');
      b.href = agent.socialLinks.facebook;
      b.target = '_blank';
      b.rel = 'noopener noreferrer';
      b.textContent = 'Facebook';
      socialButtons.appendChild(b);
    }
    socialLinks.appendChild(socialButtons);
    contactCard.appendChild(socialLinks);
  }

  stickyInner.appendChild(contactCard);
  sidebar.appendChild(stickyInner);

  grid.appendChild(sidebar);
  mainContainer.appendChild(grid);
  mainContent.appendChild(mainContainer);
  page.appendChild(mainContent);

  // ═══════════════════════════════════════════════════════════════════════
  // OTHER TEAM MEMBERS
  // ═══════════════════════════════════════════════════════════════════════
  const otherAgents = agents.filter(a => a.slug !== agent.slug);
  if (otherAgents.length > 0) {
    const otherSection = createElement('section', 'agent-profile__others');
    const otherContainer = createElement('div', 'container');

    const otherHeader = createElement('div', 'agent-profile__others-header');
    const otherEyebrow = createElement('span', 'agent-profile__others-eyebrow', 'The Rest of the Team');
    otherHeader.appendChild(otherEyebrow);
    const otherTitle = createElement('h2', 'agent-profile__others-title', 'Other Team Members');
    otherHeader.appendChild(otherTitle);
    const otherSub = createElement('p', 'agent-profile__others-sub', 'Need a different perspective? Meet the rest of our consultants.');
    otherHeader.appendChild(otherSub);
    otherContainer.appendChild(otherHeader);

    const othersGrid = createElement('div', 'agent-profile__others-grid');
    otherAgents.forEach(a => {
      othersGrid.appendChild(createOtherMemberCard(a));
    });
    otherContainer.appendChild(othersGrid);

    const viewAllBtn = createElement('a', 'agent-profile__others-view-all');
    viewAllBtn.href = '/agents';
    viewAllBtn.setAttribute('data-route', '');
    viewAllBtn.appendChild(document.createTextNode('View Full Team'));
    viewAllBtn.appendChild(createSVGUse('icon-arrow-right'));
    otherContainer.appendChild(viewAllBtn);

    otherSection.appendChild(otherContainer);
    page.appendChild(otherSection);
  }

  fragment.appendChild(page);
  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// SEO Setup
// ═══════════════════════════════════════════════════════════════════════════

export function setupAgentProfilePageSEO(agent: Agent): void {
  document.title = `${agent.name} - ${agent.role} | Real House Erbil`;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', `${agent.name} is a ${agent.role} at Real House with ${agent.yearsExperience}+ years experience. Specializing in ${agent.specialization}. ${agent.propertiesSold} properties sold. Contact today!`);
  }

  const schema = generateAgentSchema(agent);
  let script = document.querySelector('script[data-schema="agent-profile"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', 'agent-profile');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://realhouseiq.com/agents/${agent.slug}`);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${agent.name} - ${agent.role} | Real House`);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', agent.bio);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', agent.image);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `https://realhouseiq.com/agents/${agent.slug}`);
}

export { getAgentDetailBreadcrumbs };
