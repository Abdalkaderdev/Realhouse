// ═══════════════════════════════════════════════════════════════════════════
// Services Pages Renderer for Real House
// SEO-Optimized Service Listing and Detail Pages
// Target Keywords: sell property erbil, property management erbil,
// real estate agent erbil, property valuation kurdistan, investment property erbil
// ═══════════════════════════════════════════════════════════════════════════

import {
  services,
  getServiceBySlug,
  getRelatedServices,
  type Service
} from '../data/services';
import { properties, featuredProperties } from '../data/properties';
import { testimonials, type Testimonial } from '../data/testimonials';
import { t } from '../i18n';

const BASE_URL = 'https://realhouseiq.com';

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

// ─── Safe HTML Parser for Service Content ─────────────────────────────────
function parseServiceContent(htmlContent: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  const allowedTags = ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br'];

  function processNode(node: Node, parent: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.appendChild(document.createTextNode(node.textContent || ''));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (allowedTags.includes(tagName)) {
        const newElement = document.createElement(tagName);

        if (tagName === 'a') {
          const href = element.getAttribute('href');
          if (href && (href.startsWith('/') || href.startsWith('https://') || href.startsWith('http://'))) {
            newElement.setAttribute('href', href);
            if (href.startsWith('http')) {
              newElement.setAttribute('target', '_blank');
              newElement.setAttribute('rel', 'noopener noreferrer');
            } else {
              newElement.setAttribute('data-route', '');
            }
          }
        }

        node.childNodes.forEach(child => processNode(child, newElement));
        parent.appendChild(newElement);
      } else {
        node.childNodes.forEach(child => processNode(child, parent));
      }
    }
  }

  doc.body.childNodes.forEach(child => processNode(child, fragment));
  return fragment;
}

// ─── Service Card Component ───────────────────────────────────────────────
function createServiceCard(service: Service): HTMLElement {
  const card = createElement('article', 'service-card');
  card.setAttribute('data-id', service.id);

  // Icon
  const iconWrapper = createElement('div', 'service-card__icon');
  iconWrapper.appendChild(createSVGUse(service.icon));
  card.appendChild(iconWrapper);

  // Content
  const content = createElement('div', 'service-card__content');

  const title = createElement('h3', 'service-card__title');
  const titleLink = createElement('a', undefined, service.title);
  titleLink.href = `/services/${service.slug}`;
  titleLink.setAttribute('data-route', '');
  title.appendChild(titleLink);
  content.appendChild(title);

  const description = createElement('p', 'service-card__description', service.shortDescription);
  content.appendChild(description);

  // Features preview
  const features = createElement('ul', 'service-card__features');
  service.features.slice(0, 3).forEach(feature => {
    const li = createElement('li', undefined, feature.title);
    features.appendChild(li);
  });
  content.appendChild(features);

  // CTA
  const cta = createElement('a', 'service-card__cta', t('common.learnMore'));
  cta.href = `/services/${service.slug}`;
  cta.setAttribute('data-route', '');
  cta.appendChild(createSVGUse('icon-arrow-right'));
  content.appendChild(cta);

  card.appendChild(content);
  return card;
}

// ─── Testimonial Card Component ───────────────────────────────────────────
function createTestimonialCard(testimonial: Testimonial): HTMLElement {
  const card = createElement('div', 'testimonial-card');

  // Quote
  const quote = createElement('blockquote', 'testimonial-card__quote');
  const quoteText = createElement('p', undefined, `"${testimonial.quote}"`);
  quote.appendChild(quoteText);
  card.appendChild(quote);

  // Author
  const author = createElement('div', 'testimonial-card__author');
  const authorImg = createElement('img', 'testimonial-card__avatar');
  authorImg.src = testimonial.image;
  authorImg.alt = testimonial.name;
  authorImg.loading = 'lazy';
  author.appendChild(authorImg);

  const authorInfo = createElement('div', 'testimonial-card__info');
  const authorName = createElement('span', 'testimonial-card__name', testimonial.name);
  authorInfo.appendChild(authorName);
  const authorRole = createElement('span', 'testimonial-card__role', `${testimonial.role} - ${testimonial.location}`);
  authorInfo.appendChild(authorRole);
  author.appendChild(authorInfo);

  card.appendChild(author);

  // Rating
  const rating = createElement('div', 'testimonial-card__rating');
  for (let i = 0; i < 5; i++) {
    rating.appendChild(createSVGUse(i < testimonial.rating ? 'icon-star' : 'icon-star-outline'));
  }
  card.appendChild(rating);

  return card;
}

// ─── Service Testimonial Card Component ───────────────────────────────────
function createServiceTestimonialCard(testimonial: { quote: string; name: string; role: string; image: string }): HTMLElement {
  const card = createElement('div', 'testimonial-card');

  // Quote
  const quote = createElement('blockquote', 'testimonial-card__quote');
  const quoteText = createElement('p', undefined, `"${testimonial.quote}"`);
  quote.appendChild(quoteText);
  card.appendChild(quote);

  // Author
  const author = createElement('div', 'testimonial-card__author');
  const authorImg = createElement('img', 'testimonial-card__avatar');
  authorImg.src = testimonial.image;
  authorImg.alt = testimonial.name;
  authorImg.loading = 'lazy';
  author.appendChild(authorImg);

  const authorInfo = createElement('div', 'testimonial-card__info');
  const authorName = createElement('span', 'testimonial-card__name', testimonial.name);
  authorInfo.appendChild(authorName);
  const authorRole = createElement('span', 'testimonial-card__role', testimonial.role);
  authorInfo.appendChild(authorRole);
  author.appendChild(authorInfo);

  card.appendChild(author);

  // 5-star rating (all filled for service testimonials)
  const rating = createElement('div', 'testimonial-card__rating');
  for (let i = 0; i < 5; i++) {
    rating.appendChild(createSVGUse('icon-star'));
  }
  card.appendChild(rating);

  return card;
}

// ─── Property Card Mini Component ─────────────────────────────────────────
function createPropertyCardMini(property: typeof properties[0]): HTMLElement {
  const card = createElement('a', 'property-card-mini');
  card.href = `/properties/${property.id}`;
  card.setAttribute('data-route', '');

  const img = createElement('img', 'property-card-mini__image');
  img.src = property.images[0];
  img.alt = property.title;
  img.loading = 'lazy';
  card.appendChild(img);

  const content = createElement('div', 'property-card-mini__content');
  const title = createElement('h4', 'property-card-mini__title', property.title);
  content.appendChild(title);

  const location = createElement('span', 'property-card-mini__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(property.location.district));
  content.appendChild(location);

  const price = createElement('span', 'property-card-mini__price');
  if (property.price > 0) {
    price.textContent = `$${property.price.toLocaleString()}`;
  } else {
    price.textContent = t('mortgage.contactForPrice');
  }
  content.appendChild(price);

  card.appendChild(content);
  return card;
}

// ─── Decorative Hero Ornaments ────────────────────────────────────────────
function createHeroOrnaments(): HTMLElement {
  const ornaments = createElement('div', 'services-page__ornaments');
  ornaments.setAttribute('aria-hidden', 'true');

  // Glowing orbs
  for (let i = 0; i < 3; i++) {
    const orb = createElement('span', `services-page__orb services-page__orb--${i + 1}`);
    ornaments.appendChild(orb);
  }

  // Decorative gold lines
  const lineLeft = createElement('span', 'services-page__line services-page__line--left');
  const lineRight = createElement('span', 'services-page__line services-page__line--right');
  ornaments.appendChild(lineLeft);
  ornaments.appendChild(lineRight);

  // Floating diamond glyphs
  for (let i = 0; i < 4; i++) {
    const glyph = createElement('span', `services-page__glyph services-page__glyph--${i + 1}`);
    glyph.textContent = '◆';
    ornaments.appendChild(glyph);
  }

  return ornaments;
}

// ─── How It Works Step ────────────────────────────────────────────────────
interface ProcessStep {
  num: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

function createTimelineStep(step: ProcessStep, idx: number, total: number): HTMLElement {
  const node = createElement('div', 'services-page__timeline-step');
  node.style.setProperty('--step-delay', `${idx * 120}ms`);

  const connector = createElement('div', 'services-page__timeline-connector');
  const dot = createElement('span', 'services-page__timeline-dot');
  dot.textContent = step.num;
  connector.appendChild(dot);
  if (idx < total - 1) {
    connector.appendChild(createElement('span', 'services-page__timeline-line'));
  }
  node.appendChild(connector);

  const card = createElement('div', 'services-page__timeline-card');

  const iconWrap = createElement('div', 'services-page__timeline-icon');
  iconWrap.appendChild(createSVGUse(step.icon));
  card.appendChild(iconWrap);

  const titleRow = createElement('div', 'services-page__timeline-titlerow');
  const title = createElement('h3', 'services-page__timeline-title', step.title);
  const duration = createElement('span', 'services-page__timeline-duration', step.duration);
  titleRow.appendChild(title);
  titleRow.appendChild(duration);
  card.appendChild(titleRow);

  const desc = createElement('p', 'services-page__timeline-desc', step.description);
  card.appendChild(desc);

  node.appendChild(card);
  return node;
}

// ─── Pricing Package Card ────────────────────────────────────────────────
interface PricingPkg {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

function createPricingCard(pkg: PricingPkg): HTMLElement {
  const card = createElement('article', `services-page__pricing-card${pkg.featured ? ' services-page__pricing-card--featured' : ''}`);

  if (pkg.featured) {
    const badge = createElement('span', 'services-page__pricing-badge', 'Most Chosen');
    card.appendChild(badge);
  }

  const header = createElement('div', 'services-page__pricing-header');
  const name = createElement('h3', 'services-page__pricing-name', pkg.name);
  header.appendChild(name);
  const tagline = createElement('p', 'services-page__pricing-tagline', pkg.tagline);
  header.appendChild(tagline);
  card.appendChild(header);

  const priceBlock = createElement('div', 'services-page__pricing-priceblock');
  const price = createElement('span', 'services-page__pricing-price', pkg.price);
  const unit = createElement('span', 'services-page__pricing-unit', pkg.unit);
  priceBlock.appendChild(price);
  priceBlock.appendChild(unit);
  card.appendChild(priceBlock);

  const features = createElement('ul', 'services-page__pricing-features');
  pkg.features.forEach(feat => {
    const li = createElement('li');
    li.appendChild(createSVGUse('icon-check'));
    li.appendChild(document.createTextNode(feat));
    features.appendChild(li);
  });
  card.appendChild(features);

  const cta = createElement('a', `btn ${pkg.featured ? 'btn--primary' : 'btn--ghost'} btn--block`, pkg.cta);
  cta.href = '/contact';
  cta.setAttribute('data-route', '');
  card.appendChild(cta);

  return card;
}

// ─── Highlight Testimonial Card ───────────────────────────────────────────
function createHighlightTestimonial(testimonial: Testimonial): HTMLElement {
  const card = createElement('div', 'services-page__highlight');

  const quoteMark = createElement('span', 'services-page__highlight-mark');
  quoteMark.textContent = '"';
  quoteMark.setAttribute('aria-hidden', 'true');
  card.appendChild(quoteMark);

  const inner = createElement('div', 'services-page__highlight-inner');

  const rating = createElement('div', 'services-page__highlight-rating');
  for (let i = 0; i < 5; i++) {
    rating.appendChild(createSVGUse(i < testimonial.rating ? 'icon-star' : 'icon-star-outline'));
  }
  inner.appendChild(rating);

  const quote = createElement('blockquote', 'services-page__highlight-quote');
  quote.textContent = testimonial.quote;
  inner.appendChild(quote);

  const author = createElement('div', 'services-page__highlight-author');
  const avatar = createElement('img', 'services-page__highlight-avatar');
  avatar.src = testimonial.image;
  avatar.alt = testimonial.name;
  avatar.loading = 'lazy';
  author.appendChild(avatar);

  const meta = createElement('div', 'services-page__highlight-meta');
  const name = createElement('span', 'services-page__highlight-name', testimonial.name);
  meta.appendChild(name);
  const role = createElement('span', 'services-page__highlight-role', `${testimonial.role} · ${testimonial.location}`);
  meta.appendChild(role);
  author.appendChild(meta);

  inner.appendChild(author);
  card.appendChild(inner);

  return card;
}

// ─── Services Overview Page ───────────────────────────────────────────────
export function renderServicesPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('div', 'services-page');

  // ── Cinematic Hero Section ─────────────────────────────────────────────
  const hero = createElement('section', 'services-page__hero');
  hero.appendChild(createHeroOrnaments());

  const heroContainer = createElement('div', 'container services-page__hero-container');

  const heroEyebrow = createElement('div', 'services-page__eyebrow');
  const eyebrowDot = createElement('span', 'services-page__eyebrow-dot');
  heroEyebrow.appendChild(eyebrowDot);
  const eyebrowText = createElement('span', undefined, t('common.ourServices'));
  heroEyebrow.appendChild(eyebrowText);
  heroContainer.appendChild(heroEyebrow);

  const heroTitle = createElement('h1', 'services-page__title');
  const t1 = createElement('span', 'services-page__title-line', 'Real Estate Erbil');
  heroTitle.appendChild(t1);
  const t2 = createElement('span', 'services-page__title-line');
  const t2em = createElement('em', undefined, 'Crafted Services');
  t2.appendChild(t2em);
  heroTitle.appendChild(t2);
  heroContainer.appendChild(heroTitle);

  const heroSubtitle = createElement('p', 'services-page__subtitle');
  heroSubtitle.textContent = 'From discovery to keys in hand. Real House delivers white-glove property sales, acquisitions, management, and legal support across Erbil, Kurdistan — built around your goals.';
  heroContainer.appendChild(heroSubtitle);

  // Value props row
  const valueProps = createElement('div', 'services-page__valueprops');
  const props = [
    { icon: 'icon-shield', label: 'Licensed & Verified' },
    { icon: 'icon-star', label: '4.9 Client Rating' },
    { icon: 'icon-check', label: '15+ Years Local Insight' },
    { icon: 'icon-home', label: '500+ Properties Sold' }
  ];
  props.forEach(p => {
    const item = createElement('div', 'services-page__valueprop');
    const ic = createElement('span', 'services-page__valueprop-icon');
    ic.appendChild(createSVGUse(p.icon));
    item.appendChild(ic);
    const lbl = createElement('span', undefined, p.label);
    item.appendChild(lbl);
    valueProps.appendChild(item);
  });
  heroContainer.appendChild(valueProps);

  // Hero CTAs
  const heroCtas = createElement('div', 'services-page__hero-ctas');
  const heroCta1 = createElement('a', 'btn btn--primary btn--lg', t('common.getStarted'));
  heroCta1.href = '/contact';
  heroCta1.setAttribute('data-route', '');
  heroCtas.appendChild(heroCta1);
  const heroCta2 = createElement('a', 'btn btn--ghost btn--lg', 'Explore Services');
  heroCta2.href = '#services-grid';
  heroCtas.appendChild(heroCta2);
  heroContainer.appendChild(heroCtas);

  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // ── Featured Services Grid ─────────────────────────────────────────────
  const servicesSection = createElement('section', 'services-page__services');
  servicesSection.id = 'services-grid';
  const servicesContainer = createElement('div', 'container');

  const servicesHeader = createElement('div', 'services-page__section-header');
  const servicesEyebrow = createElement('span', 'services-page__section-eyebrow', '— Our Expertise');
  servicesHeader.appendChild(servicesEyebrow);
  const servicesTitle = createElement('h2', 'services-page__section-title');
  servicesTitle.textContent = 'A Complete Real Estate ';
  const stEm = createElement('em', undefined, 'Concierge');
  servicesTitle.appendChild(stEm);
  servicesHeader.appendChild(servicesTitle);
  const servicesSub = createElement('p', 'services-page__section-subtitle', 'Every service is led by a senior advisor — no scripts, no shortcuts.');
  servicesHeader.appendChild(servicesSub);
  servicesContainer.appendChild(servicesHeader);

  const servicesGrid = createElement('div', 'services-page__grid');
  services.forEach((service, idx) => {
    const card = createServiceCard(service);
    card.style.setProperty('--card-delay', `${idx * 80}ms`);
    servicesGrid.appendChild(card);
  });
  servicesContainer.appendChild(servicesGrid);
  servicesSection.appendChild(servicesContainer);
  page.appendChild(servicesSection);

  // ── How It Works Timeline ──────────────────────────────────────────────
  const howSection = createElement('section', 'services-page__how');
  const howContainer = createElement('div', 'container');

  const howHeader = createElement('div', 'services-page__section-header');
  const howEyebrow = createElement('span', 'services-page__section-eyebrow', '— Process');
  howHeader.appendChild(howEyebrow);
  const howTitle = createElement('h2', 'services-page__section-title');
  howTitle.textContent = 'How It ';
  const htEm = createElement('em', undefined, 'Works');
  howTitle.appendChild(htEm);
  howHeader.appendChild(howTitle);
  const howSub = createElement('p', 'services-page__section-subtitle', 'Four refined steps from first call to signed contract.');
  howHeader.appendChild(howSub);
  howContainer.appendChild(howHeader);

  const timelineSteps: ProcessStep[] = [
    { num: '01', title: 'Consult', description: 'A confidential conversation to map your goals, timeline, and budget. We surface what really matters.', icon: 'icon-phone', duration: 'Day 1' },
    { num: '02', title: 'Search', description: 'Curated property shortlists with floor plans, comparables, and neighborhood intelligence delivered to your inbox.', icon: 'icon-home', duration: 'Week 1–2' },
    { num: '03', title: 'Negotiate', description: 'Senior advisors handle every offer, counter, and concession — protecting your position from start to finish.', icon: 'icon-check', duration: 'Week 2–3' },
    { num: '04', title: 'Close', description: 'Legal review, escrow coordination, and a seamless handover. Keys in hand, paperwork archived.', icon: 'icon-star', duration: 'Week 3–4' }
  ];

  const timeline = createElement('div', 'services-page__timeline');
  timelineSteps.forEach((step, idx) => {
    timeline.appendChild(createTimelineStep(step, idx, timelineSteps.length));
  });
  howContainer.appendChild(timeline);
  howSection.appendChild(howContainer);
  page.appendChild(howSection);

  // ── Pricing / Packages ─────────────────────────────────────────────────
  const pricingSection = createElement('section', 'services-page__pricing');
  const pricingContainer = createElement('div', 'container');

  const pricingHeader = createElement('div', 'services-page__section-header');
  const pricingEyebrow = createElement('span', 'services-page__section-eyebrow', '— Packages');
  pricingHeader.appendChild(pricingEyebrow);
  const pricingTitle = createElement('h2', 'services-page__section-title');
  pricingTitle.textContent = 'Engagement ';
  const ptEm = createElement('em', undefined, 'Tiers');
  pricingTitle.appendChild(ptEm);
  pricingHeader.appendChild(pricingTitle);
  const pricingSub = createElement('p', 'services-page__section-subtitle', 'Transparent commission structures — pick the level of attention you need.');
  pricingHeader.appendChild(pricingSub);
  pricingContainer.appendChild(pricingHeader);

  const packages: PricingPkg[] = [
    {
      name: 'Essential',
      tagline: 'For self-directed buyers and sellers.',
      price: '1.5%',
      unit: 'transaction commission',
      features: ['Professional listing photography', 'Featured on Real House portal', 'Standard contract templates', 'Weekly performance updates', 'Email & WhatsApp support'],
      cta: 'Start with Essential'
    },
    {
      name: 'Signature',
      tagline: 'Our most popular full-service tier.',
      price: '2.5%',
      unit: 'transaction commission',
      featured: true,
      features: ['Everything in Essential', 'HDR photography + 360° tour', 'International portal syndication', 'Dedicated senior advisor', 'Contract negotiation support', 'Legal review included', 'Priority phone access'],
      cta: 'Go Signature'
    },
    {
      name: 'Bespoke',
      tagline: 'Concierge-level for luxury & investment.',
      price: 'Custom',
      unit: 'tailored engagement',
      features: ['Everything in Signature', 'Private off-market access', 'Drone & cinematic video', 'Dedicated PR campaign', 'Portfolio strategy sessions', 'Cross-border tax coordination', 'White-glove handover'],
      cta: 'Request Bespoke'
    }
  ];

  const pricingGrid = createElement('div', 'services-page__pricing-grid');
  packages.forEach((pkg, idx) => {
    const card = createPricingCard(pkg);
    card.style.setProperty('--card-delay', `${idx * 100}ms`);
    pricingGrid.appendChild(card);
  });
  pricingContainer.appendChild(pricingGrid);
  pricingSection.appendChild(pricingContainer);
  page.appendChild(pricingSection);

  // ── Trust Signals Row ──────────────────────────────────────────────────
  const trustSection = createElement('section', 'services-page__trust');
  const trustContainer = createElement('div', 'container');

  const trustHeader = createElement('div', 'services-page__section-header');
  const trustEyebrow = createElement('span', 'services-page__section-eyebrow', '— By the Numbers');
  trustHeader.appendChild(trustEyebrow);
  const trustTitle = createElement('h2', 'services-page__section-title');
  trustTitle.textContent = 'Trusted Across ';
  const ttEm = createElement('em', undefined, 'Kurdistan');
  trustTitle.appendChild(ttEm);
  trustHeader.appendChild(trustTitle);
  trustContainer.appendChild(trustHeader);

  const statsGrid = createElement('div', 'services-page__stats');
  const stats = [
    { value: '500+', label: t('servicesPage.propertiesListed'), icon: 'icon-home' },
    { value: '200+', label: t('servicesPage.happyClients'), icon: 'icon-check' },
    { value: '15+', label: t('servicesPage.yearsExperience'), icon: 'icon-star' },
    { value: '98%', label: t('servicesPage.clientSatisfaction'), icon: 'icon-shield' }
  ];

  stats.forEach((stat, idx) => {
    const statCard = createElement('div', 'services-page__stat');
    statCard.style.setProperty('--stat-delay', `${idx * 100}ms`);
    const statIcon = createElement('div', 'services-page__stat-icon');
    statIcon.appendChild(createSVGUse(stat.icon));
    statCard.appendChild(statIcon);
    const statValue = createElement('span', 'services-page__stat-value', stat.value);
    statCard.appendChild(statValue);
    const statLabel = createElement('span', 'services-page__stat-label', stat.label);
    statCard.appendChild(statLabel);
    statsGrid.appendChild(statCard);
  });
  trustContainer.appendChild(statsGrid);
  trustSection.appendChild(trustContainer);
  page.appendChild(trustSection);

  // ── Highlight Testimonial ──────────────────────────────────────────────
  if (testimonials.length > 0) {
    const highlightSection = createElement('section', 'services-page__highlight-section');
    const highlightContainer = createElement('div', 'container');
    highlightContainer.appendChild(createHighlightTestimonial(testimonials[0]));
    highlightSection.appendChild(highlightContainer);
    page.appendChild(highlightSection);
  }

  // ── Additional Testimonials ────────────────────────────────────────────
  const testimonialsSection = createElement('section', 'services-page__testimonials');
  const testimonialsContainer = createElement('div', 'container');

  const testimonialsHeader = createElement('div', 'services-page__section-header');
  const tEyebrow = createElement('span', 'services-page__section-eyebrow', '— Voices');
  testimonialsHeader.appendChild(tEyebrow);
  const testimonialsTitle = createElement('h2', 'services-page__section-title');
  testimonialsTitle.textContent = 'What Clients ';
  const tttEm = createElement('em', undefined, 'Say');
  testimonialsTitle.appendChild(tttEm);
  testimonialsHeader.appendChild(testimonialsTitle);
  testimonialsContainer.appendChild(testimonialsHeader);

  const testimonialsGrid = createElement('div', 'services-page__testimonials-grid');
  testimonials.slice(1, 4).forEach((testimonial, idx) => {
    const card = createTestimonialCard(testimonial);
    card.style.setProperty('--card-delay', `${idx * 100}ms`);
    testimonialsGrid.appendChild(card);
  });
  testimonialsContainer.appendChild(testimonialsGrid);

  testimonialsSection.appendChild(testimonialsContainer);
  page.appendChild(testimonialsSection);

  // ── Final CTA ──────────────────────────────────────────────────────────
  const ctaSection = createElement('section', 'services-page__cta');
  const ctaOrn = createElement('div', 'services-page__cta-ornaments');
  ctaOrn.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 6; i++) {
    ctaOrn.appendChild(createElement('span', `services-page__cta-glyph services-page__cta-glyph--${i + 1}`));
  }
  ctaSection.appendChild(ctaOrn);

  const ctaContainer = createElement('div', 'container');
  const ctaContent = createElement('div', 'services-page__cta-content');

  const ctaEyebrow = createElement('span', 'services-page__cta-eyebrow', '— Begin');
  ctaContent.appendChild(ctaEyebrow);

  const ctaTitle = createElement('h2', 'services-page__cta-title');
  ctaTitle.textContent = 'Ready for ';
  const ctaTitleEm = createElement('em', undefined, 'Real Service?');
  ctaTitle.appendChild(ctaTitleEm);
  ctaContent.appendChild(ctaTitle);

  const ctaText = createElement('p', 'services-page__cta-text');
  ctaText.textContent = 'Tell us what you need — we will respond personally within one business hour.';
  ctaContent.appendChild(ctaText);

  const ctaBtns = createElement('div', 'services-page__cta-btns');

  const ctaBtn1 = createElement('a', 'btn btn--primary btn--lg', t('common.contactUs'));
  ctaBtn1.href = '/contact';
  ctaBtn1.setAttribute('data-route', '');
  ctaBtns.appendChild(ctaBtn1);

  const ctaBtn2 = createElement('a', 'btn btn--ghost btn--lg', t('servicesPage.viewProperties'));
  ctaBtn2.href = '/properties';
  ctaBtn2.setAttribute('data-route', '');
  ctaBtns.appendChild(ctaBtn2);

  ctaContent.appendChild(ctaBtns);
  ctaContainer.appendChild(ctaContent);
  ctaSection.appendChild(ctaContainer);
  page.appendChild(ctaSection);

  fragment.appendChild(page);
  return fragment;
}

// ─── Service Detail Page ──────────────────────────────────────────────────
export function renderServiceDetailPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const service = getServiceBySlug(slug);

  if (!service) {
    // 404 for service not found
    const page = createElement('div', 'service-detail-page service-detail-page--not-found');
    const container = createElement('div', 'container');

    const errorContent = createElement('div', 'service-detail-page__error');
    const errorTitle = createElement('h1', undefined, t('servicesPage.serviceNotFound'));
    errorContent.appendChild(errorTitle);
    const errorText = createElement('p', undefined, t('servicesPage.serviceNotFoundText'));
    errorContent.appendChild(errorText);
    const backLink = createElement('a', 'btn btn--primary', t('servicesPage.viewAllServices'));
    backLink.href = '/services';
    backLink.setAttribute('data-route', '');
    errorContent.appendChild(backLink);

    container.appendChild(errorContent);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  const page = createElement('div', 'service-detail-page');

  // Hero Section
  const hero = createElement('section', 'service-detail-page__hero');
  const heroImage = createElement('img', 'service-detail-page__hero-image');
  heroImage.src = service.heroImage;
  heroImage.alt = service.title;
  hero.appendChild(heroImage);
  const heroOverlay = createElement('div', 'service-detail-page__hero-overlay');
  hero.appendChild(heroOverlay);

  // Decorative gold frame
  const heroFrame = createElement('div', 'service-detail-page__hero-frame');
  heroFrame.setAttribute('aria-hidden', 'true');
  hero.appendChild(heroFrame);

  const heroContainer = createElement('div', 'container');

  // Breadcrumb
  const breadcrumb = createElement('nav', 'service-detail-page__breadcrumb');
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');
  const breadcrumbList = createElement('ol', 'breadcrumb');

  const homeCrumb = createElement('li', 'breadcrumb__item');
  const homeLink = createElement('a', undefined, t('breadcrumbs.home'));
  homeLink.href = '/';
  homeLink.setAttribute('data-route', '');
  homeCrumb.appendChild(homeLink);
  breadcrumbList.appendChild(homeCrumb);

  const servicesCrumb = createElement('li', 'breadcrumb__item');
  const servicesLink = createElement('a', undefined, t('breadcrumbs.services'));
  servicesLink.href = '/services';
  servicesLink.setAttribute('data-route', '');
  servicesCrumb.appendChild(servicesLink);
  breadcrumbList.appendChild(servicesCrumb);

  const currentCrumb = createElement('li', 'breadcrumb__item breadcrumb__item--current');
  currentCrumb.textContent = service.title;
  currentCrumb.setAttribute('aria-current', 'page');
  breadcrumbList.appendChild(currentCrumb);

  breadcrumb.appendChild(breadcrumbList);
  heroContainer.appendChild(breadcrumb);

  // Hero Content
  const heroContent = createElement('div', 'service-detail-page__hero-content');

  const eyebrowRow = createElement('div', 'service-detail-page__hero-eyebrow');
  const heroIcon = createElement('div', 'service-detail-page__icon');
  heroIcon.appendChild(createSVGUse(service.icon));
  eyebrowRow.appendChild(heroIcon);
  const eyebrowLabel = createElement('span', 'service-detail-page__hero-label', service.title);
  eyebrowRow.appendChild(eyebrowLabel);
  heroContent.appendChild(eyebrowRow);

  // Use SEO-optimized H1 title with target keyword
  const heroTitle = createElement('h1', 'service-detail-page__title', service.h1Title || service.title);
  heroContent.appendChild(heroTitle);

  const heroSubtitle = createElement('p', 'service-detail-page__subtitle', service.shortDescription);
  heroContent.appendChild(heroSubtitle);

  const heroCtaRow = createElement('div', 'service-detail-page__hero-ctas');
  const heroCta = createElement('a', 'btn btn--primary btn--lg', t('common.getStarted'));
  heroCta.href = '/contact';
  heroCta.setAttribute('data-route', '');
  heroCtaRow.appendChild(heroCta);

  const heroCta2 = createElement('a', 'btn btn--ghost btn--lg', 'Book a Call');
  heroCta2.href = 'tel:+9647507922138';
  heroCtaRow.appendChild(heroCta2);
  heroContent.appendChild(heroCtaRow);

  heroContainer.appendChild(heroContent);
  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // Main Content Section
  const mainSection = createElement('section', 'service-detail-page__main');
  const mainContainer = createElement('div', 'container');
  const mainWrapper = createElement('div', 'service-detail-page__wrapper');

  // Article Content
  const article = createElement('article', 'service-detail-page__article');

  // Service Description
  const descriptionSection = createElement('div', 'service-detail-page__description');
  descriptionSection.appendChild(parseServiceContent(service.fullDescription));
  article.appendChild(descriptionSection);

  // Features Section
  const featuresSection = createElement('div', 'service-detail-page__features');
  const featuresTitle = createElement('h2', 'service-detail-page__features-title', t('servicesPage.serviceFeatures'));
  featuresSection.appendChild(featuresTitle);

  const featuresGrid = createElement('div', 'service-detail-page__features-grid');
  service.features.forEach(feature => {
    const featureCard = createElement('div', 'service-detail-page__feature');
    const featureIcon = createElement('div', 'service-detail-page__feature-icon');
    featureIcon.appendChild(createSVGUse(feature.icon));
    featureCard.appendChild(featureIcon);
    const featureTitle = createElement('h3', 'service-detail-page__feature-title', feature.title);
    featureCard.appendChild(featureTitle);
    const featureDesc = createElement('p', 'service-detail-page__feature-desc', feature.description);
    featureCard.appendChild(featureDesc);
    featuresGrid.appendChild(featureCard);
  });
  featuresSection.appendChild(featuresGrid);
  article.appendChild(featuresSection);

  // Process Section
  const processSection = createElement('div', 'service-detail-page__process');
  const processTitle = createElement('h2', 'service-detail-page__process-title', t('servicesPage.howItWorks'));
  processSection.appendChild(processTitle);

  const processSteps = createElement('div', 'service-detail-page__process-steps');
  service.process.forEach(step => {
    const stepCard = createElement('div', 'service-detail-page__step');
    const stepNumber = createElement('span', 'service-detail-page__step-number', step.step.toString());
    stepCard.appendChild(stepNumber);
    const stepContent = createElement('div', 'service-detail-page__step-content');
    const stepTitle = createElement('h3', 'service-detail-page__step-title', step.title);
    stepContent.appendChild(stepTitle);
    const stepDesc = createElement('p', 'service-detail-page__step-desc', step.description);
    stepContent.appendChild(stepDesc);
    stepCard.appendChild(stepContent);
    processSteps.appendChild(stepCard);
  });
  processSection.appendChild(processSteps);
  article.appendChild(processSection);

  // Benefits Section
  const benefitsSection = createElement('div', 'service-detail-page__benefits');
  const benefitsTitle = createElement('h2', 'service-detail-page__benefits-title', t('servicesPage.keyBenefits'));
  benefitsSection.appendChild(benefitsTitle);

  const benefitsList = createElement('ul', 'service-detail-page__benefits-list');
  service.benefits.forEach(benefit => {
    const benefitItem = createElement('li', 'service-detail-page__benefit');
    benefitItem.appendChild(createSVGUse('icon-check'));
    benefitItem.appendChild(document.createTextNode(benefit));
    benefitsList.appendChild(benefitItem);
  });
  benefitsSection.appendChild(benefitsList);
  article.appendChild(benefitsSection);

  // FAQs Section
  const faqSection = createElement('div', 'service-detail-page__faqs');
  const faqTitle = createElement('h2', 'service-detail-page__faqs-title', t('faqPage.title'));
  faqSection.appendChild(faqTitle);

  const faqList = createElement('div', 'service-detail-page__faq-list');
  service.faqs.forEach((faq, index) => {
    const faqItem = createElement('div', 'service-detail-page__faq-item');
    faqItem.setAttribute('data-faq-index', index.toString());

    const faqQuestion = createElement('button', 'service-detail-page__faq-question');
    faqQuestion.setAttribute('type', 'button');
    faqQuestion.setAttribute('aria-expanded', 'false');
    const faqQuestionText = createElement('span', undefined, faq.question);
    faqQuestion.appendChild(faqQuestionText);
    const faqIcon = createElement('span', 'service-detail-page__faq-icon', '+');
    faqQuestion.appendChild(faqIcon);
    faqItem.appendChild(faqQuestion);

    const faqAnswer = createElement('div', 'service-detail-page__faq-answer');
    const faqAnswerText = createElement('p', undefined, faq.answer);
    faqAnswer.appendChild(faqAnswerText);
    faqItem.appendChild(faqAnswer);

    faqList.appendChild(faqItem);
  });
  faqSection.appendChild(faqList);
  article.appendChild(faqSection);

  mainWrapper.appendChild(article);

  // Sidebar
  const sidebar = createElement('aside', 'service-detail-page__sidebar');

  // Contact CTA Card
  const ctaCard = createElement('div', 'service-detail-page__cta-card');
  const ctaCardTitle = createElement('h3', 'service-detail-page__cta-card-title', service.ctaTitle);
  ctaCard.appendChild(ctaCardTitle);
  const ctaCardText = createElement('p', 'service-detail-page__cta-card-text', service.ctaDescription);
  ctaCard.appendChild(ctaCardText);
  const ctaCardBtn = createElement('a', 'btn btn--primary btn--block', t('common.contactUs'));
  ctaCardBtn.href = '/contact';
  ctaCardBtn.setAttribute('data-route', '');
  ctaCard.appendChild(ctaCardBtn);

  const ctaCardPhone = createElement('div', 'service-detail-page__cta-phone');
  ctaCardPhone.appendChild(createSVGUse('icon-phone'));
  const phoneLink = createElement('a', undefined, '+964 750 792 2138');
  phoneLink.href = 'tel:+9647507922138';
  ctaCardPhone.appendChild(phoneLink);
  ctaCard.appendChild(ctaCardPhone);

  sidebar.appendChild(ctaCard);

  // Related Services
  const relatedServices = getRelatedServices(service);
  if (relatedServices.length > 0) {
    const relatedSection = createElement('div', 'service-detail-page__related');
    const relatedTitle = createElement('h3', 'service-detail-page__related-title', t('servicesPage.relatedServices'));
    relatedSection.appendChild(relatedTitle);

    const relatedList = createElement('div', 'service-detail-page__related-list');
    relatedServices.forEach(relatedService => {
      const relatedItem = createElement('a', 'service-detail-page__related-item');
      relatedItem.href = `/services/${relatedService.slug}`;
      relatedItem.setAttribute('data-route', '');

      const relatedIcon = createElement('span', 'service-detail-page__related-icon');
      relatedIcon.appendChild(createSVGUse(relatedService.icon));
      relatedItem.appendChild(relatedIcon);

      const relatedInfo = createElement('div', 'service-detail-page__related-info');
      const relatedItemTitle = createElement('span', 'service-detail-page__related-name', relatedService.title);
      relatedInfo.appendChild(relatedItemTitle);
      relatedItem.appendChild(relatedInfo);

      relatedList.appendChild(relatedItem);
    });
    relatedSection.appendChild(relatedList);
    sidebar.appendChild(relatedSection);
  }

  // Featured Properties (for relevant services)
  if (['buy', 'sell', 'rent', 'investment-consulting'].includes(service.id)) {
    const propertiesSection = createElement('div', 'service-detail-page__properties');
    const propertiesTitle = createElement('h3', 'service-detail-page__properties-title', t('servicesPage.featuredProperties'));
    propertiesSection.appendChild(propertiesTitle);

    const propertiesList = createElement('div', 'service-detail-page__properties-list');
    featuredProperties.slice(0, 3).forEach(property => {
      propertiesList.appendChild(createPropertyCardMini(property));
    });
    propertiesSection.appendChild(propertiesList);

    const viewAllLink = createElement('a', 'service-detail-page__view-all', t('servicesPage.viewAllProperties'));
    viewAllLink.href = '/properties';
    viewAllLink.setAttribute('data-route', '');
    propertiesSection.appendChild(viewAllLink);

    sidebar.appendChild(propertiesSection);
  }

  mainWrapper.appendChild(sidebar);
  mainContainer.appendChild(mainWrapper);
  mainSection.appendChild(mainContainer);
  page.appendChild(mainSection);

  // Testimonials Section - Use service-specific testimonials if available
  const testimonialsSection = createElement('section', 'service-detail-page__testimonials');
  const testimonialsContainer = createElement('div', 'container');

  const testimonialsHeader = createElement('div', 'service-detail-page__testimonials-header');
  const testimonialsTitle = createElement('h2', undefined, t('servicesPage.whatClientsSay'));
  testimonialsHeader.appendChild(testimonialsTitle);
  testimonialsContainer.appendChild(testimonialsHeader);

  const testimonialsGrid = createElement('div', 'service-detail-page__testimonials-grid');

  // Use service-specific testimonials if available, otherwise fall back to general
  const serviceTestimonials = service.testimonials && service.testimonials.length > 0
    ? service.testimonials
    : testimonials.slice(0, 3);

  serviceTestimonials.forEach(testimonial => {
    testimonialsGrid.appendChild(createServiceTestimonialCard(testimonial));
  });
  testimonialsContainer.appendChild(testimonialsGrid);

  testimonialsSection.appendChild(testimonialsContainer);
  page.appendChild(testimonialsSection);

  // Bottom CTA Section
  const bottomCta = createElement('section', 'service-detail-page__bottom-cta');
  const bottomCtaContainer = createElement('div', 'container');
  const bottomCtaContent = createElement('div', 'service-detail-page__bottom-cta-content');

  const bottomCtaTitle = createElement('h2', undefined, t('servicesPage.readyToStart'));
  bottomCtaContent.appendChild(bottomCtaTitle);
  const bottomCtaText = createElement('p', undefined, t('servicesPage.contactForAssistance'));
  bottomCtaContent.appendChild(bottomCtaText);

  const bottomCtaBtns = createElement('div', 'service-detail-page__bottom-cta-btns');
  const bottomCtaBtn1 = createElement('a', 'btn btn--primary btn--lg', t('common.contactUs'));
  bottomCtaBtn1.href = '/contact';
  bottomCtaBtn1.setAttribute('data-route', '');
  bottomCtaBtns.appendChild(bottomCtaBtn1);
  const bottomCtaBtn2 = createElement('a', 'btn btn--ghost btn--lg', t('servicesPage.viewAllServices'));
  bottomCtaBtn2.href = '/services';
  bottomCtaBtn2.setAttribute('data-route', '');
  bottomCtaBtns.appendChild(bottomCtaBtn2);
  bottomCtaContent.appendChild(bottomCtaBtns);

  bottomCtaContainer.appendChild(bottomCtaContent);
  bottomCta.appendChild(bottomCtaContainer);
  page.appendChild(bottomCta);

  fragment.appendChild(page);

  // Add FAQ toggle functionality after DOM is ready
  setTimeout(() => {
    const faqItems = document.querySelectorAll('.service-detail-page__faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.service-detail-page__faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const isExpanded = item.classList.contains('active');
          // Close all other FAQs
          faqItems.forEach(otherItem => otherItem.classList.remove('active'));
          // Toggle current
          if (!isExpanded) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
          } else {
            question.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  }, 0);

  return fragment;
}

// ─── SEO Helper Functions ─────────────────────────────────────────────────
export function setupServicesPageSEO(): void {
  document.title = 'Real Estate Services Erbil | Property Services Kurdistan | Real House';

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Comprehensive real estate services in Erbil, Kurdistan. Property buying, selling, rental, management, investment consulting, and valuation services. Contact Real House today.');
  }

  // Update canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `${BASE_URL}/services`);
  }

  // Add Services schema
  const existingSchema = document.querySelector('script[data-schema="services"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const servicesSchema = document.createElement('script');
  servicesSchema.type = 'application/ld+json';
  servicesSchema.setAttribute('data-schema', 'services');
  servicesSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Real House Services',
    'description': 'Professional real estate services in Erbil, Kurdistan',
    'numberOfItems': services.length,
    'itemListElement': services.map((service, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Service',
        'name': service.title,
        'description': service.shortDescription,
        'url': `${BASE_URL}/services/${service.slug}`,
        'provider': {
          '@type': 'RealEstateAgent',
          'name': 'Real House',
          'url': BASE_URL
        }
      }
    }))
  });
  document.head.appendChild(servicesSchema);

  // Add Breadcrumb schema
  const existingBreadcrumb = document.querySelector('script[data-schema="breadcrumb"]');
  if (existingBreadcrumb) {
    existingBreadcrumb.remove();
  }

  const breadcrumbSchema = document.createElement('script');
  breadcrumbSchema.type = 'application/ld+json';
  breadcrumbSchema.setAttribute('data-schema', 'breadcrumb');
  breadcrumbSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': BASE_URL
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Services',
        'item': `${BASE_URL}/services`
      }
    ]
  });
  document.head.appendChild(breadcrumbSchema);
}

export function setupServiceDetailPageSEO(service: Service): void {
  // Update title
  document.title = service.metaTitle;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', service.metaDescription);
  }

  // Update canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `${BASE_URL}/services/${service.slug}`);
  }

  // Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', service.metaTitle);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', service.metaDescription);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', `${BASE_URL}/services/${service.slug}`);
  }

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    ogImage.setAttribute('content', service.heroImage);
  }

  // Add ProfessionalService schema
  const existingSchema = document.querySelector('script[data-schema="service"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const serviceSchema = document.createElement('script');
  serviceSchema.type = 'application/ld+json';
  serviceSchema.setAttribute('data-schema', 'service');
  serviceSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': service.title,
    'description': service.metaDescription,
    'url': `${BASE_URL}/services/${service.slug}`,
    'image': service.heroImage,
    'provider': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': BASE_URL,
      'telephone': '+964 750 792 2138',
      'email': 'info@realhouseiq.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Queen Tower, Erbil',
        'addressLocality': 'Erbil',
        'addressRegion': 'Kurdistan Region',
        'postalCode': '44001',
        'addressCountry': 'IQ'
      }
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Erbil',
      'containedInPlace': {
        '@type': 'State',
        'name': 'Kurdistan Region'
      }
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': service.title,
      'itemListElement': service.features.map(feature => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': feature.title,
          'description': feature.description
        }
      }))
    },
    'priceRange': '$$$'
  });
  document.head.appendChild(serviceSchema);

  // Add HowTo schema for process steps
  const existingHowTo = document.querySelector('script[data-schema="howto"]');
  if (existingHowTo) {
    existingHowTo.remove();
  }

  const howToSchema = document.createElement('script');
  howToSchema.type = 'application/ld+json';
  howToSchema.setAttribute('data-schema', 'howto');
  howToSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How to ${service.title} in Erbil`,
    'description': service.shortDescription,
    'image': service.heroImage,
    'totalTime': 'P4W',
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'USD',
      'value': 'Contact for pricing'
    },
    'step': service.process.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.title,
      'text': step.description,
      'url': `${BASE_URL}/services/${service.slug}#step-${index + 1}`
    })),
    'tool': service.features.map(feature => ({
      '@type': 'HowToTool',
      'name': feature.title
    }))
  });
  document.head.appendChild(howToSchema);

  // Add FAQ schema
  const existingFaq = document.querySelector('script[data-schema="faq"]');
  if (existingFaq) {
    existingFaq.remove();
  }

  const faqSchema = document.createElement('script');
  faqSchema.type = 'application/ld+json';
  faqSchema.setAttribute('data-schema', 'faq');
  faqSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'datePublished': '2025-01-01',
    'dateModified': '2026-03-28',
    'mainEntity': service.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  });
  document.head.appendChild(faqSchema);

  // Add Breadcrumb schema
  const existingBreadcrumb = document.querySelector('script[data-schema="breadcrumb"]');
  if (existingBreadcrumb) {
    existingBreadcrumb.remove();
  }

  const breadcrumbSchema = document.createElement('script');
  breadcrumbSchema.type = 'application/ld+json';
  breadcrumbSchema.setAttribute('data-schema', 'breadcrumb');
  breadcrumbSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': BASE_URL
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Services',
        'item': `${BASE_URL}/services`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': service.title,
        'item': `${BASE_URL}/services/${service.slug}`
      }
    ]
  });
  document.head.appendChild(breadcrumbSchema);
}
