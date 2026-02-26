// ═══════════════════════════════════════════════════════════════════════════
// Trust Signals Components for Real House
// ═══════════════════════════════════════════════════════════════════════════

import { agents, trustBadges, enhancedStats, featuredInMedia, partnerLogos } from '../data/agents';
import { t } from '../i18n';

// Helper function to create elements
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

// ─── Trust Badges Section ─────────────────────────────────────────────────
export function createTrustBadgesSection(): HTMLElement {
  const section = createElement('section', 'trust-badges');
  const container = createElement('div', 'container');
  const grid = createElement('div', 'trust-badges__grid');

  trustBadges.forEach(badge => {
    const badgeEl = createElement('div', 'trust-badges__item');

    const iconWrapper = createElement('div', 'trust-badges__icon');
    iconWrapper.appendChild(createSVGUse(badge.icon));
    badgeEl.appendChild(iconWrapper);

    const content = createElement('div', 'trust-badges__content');
    const title = createElement('span', 'trust-badges__title', badge.title);
    const desc = createElement('span', 'trust-badges__desc', badge.description);
    content.appendChild(title);
    content.appendChild(desc);
    badgeEl.appendChild(content);

    grid.appendChild(badgeEl);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── Enhanced Stats Section ───────────────────────────────────────────────
export function createEnhancedStatsSection(): HTMLElement {
  const section = createElement('section', 'stats');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'stats__header');
  const title = createElement('h2', 'stats__title');
  title.textContent = t('trustSignals.trustedByPrefix');
  const em = createElement('em', undefined, t('trustSignals.trustedByEmphasis'));
  title.appendChild(em);
  title.appendChild(document.createTextNode(t('trustSignals.trustedBySuffix')));
  header.appendChild(title);
  container.appendChild(header);

  // Grid
  const grid = createElement('div', 'stats__grid');

  enhancedStats.forEach(stat => {
    const item = createElement('div', 'stats__item');

    const num = createElement('span', 'stats__number', '0');
    num.setAttribute('data-target', stat.number.toString());
    num.setAttribute('data-suffix', stat.suffix);
    if (stat.prefix) {
      num.setAttribute('data-prefix', stat.prefix);
    }

    const label = createElement('span', 'stats__label', stat.label);
    const desc = createElement('span', 'stats__desc', stat.description);

    item.appendChild(num);
    item.appendChild(label);
    item.appendChild(desc);
    grid.appendChild(item);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── Featured In Media Section ────────────────────────────────────────────
export function createFeaturedInSection(): HTMLElement {
  const section = createElement('section', 'featured-in');
  const container = createElement('div', 'container');

  const header = createElement('div', 'featured-in__header');
  const title = createElement('h3', 'featured-in__title', 'As Featured In');
  header.appendChild(title);
  container.appendChild(header);

  const grid = createElement('div', 'featured-in__grid');

  featuredInMedia.forEach(media => {
    const item = createElement('div', 'featured-in__item');
    const logo = createElement('span', 'featured-in__logo', media.logo);
    const name = createElement('span', 'featured-in__name', media.name);
    item.appendChild(logo);
    item.appendChild(name);
    grid.appendChild(item);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── Partners Section ─────────────────────────────────────────────────────
export function createPartnersSection(): HTMLElement {
  const section = createElement('section', 'partners');
  const container = createElement('div', 'container');

  const header = createElement('div', 'partners__header');
  const title = createElement('h3', 'partners__title', 'Trusted Developer Partners');
  const subtitle = createElement('p', 'partners__subtitle', t('trustSignals.developerSubtitle'));
  header.appendChild(title);
  header.appendChild(subtitle);
  container.appendChild(header);

  const grid = createElement('div', 'partners__grid');

  partnerLogos.forEach(partner => {
    const item = createElement('a', 'partners__item');
    item.setAttribute('href', `/projects?developer=${encodeURIComponent(partner.name)}`);
    item.setAttribute('data-route', '');
    const name = createElement('span', 'partners__name', partner.name);
    item.appendChild(name);
    grid.appendChild(item);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── Agent Showcase Section ───────────────────────────────────────────────
export function createAgentShowcaseSection(): HTMLElement {
  const section = createElement('section', 'agent-showcase');
  const container = createElement('div', 'container');

  const header = createElement('div', 'agent-showcase__header');
  const title = createElement('h2', 'agent-showcase__title');
  title.textContent = t('trustSignals.meetOurPrefix');
  const em = createElement('em', undefined, t('trustSignals.meetOurEmphasis'));
  title.appendChild(em);
  title.appendChild(document.createTextNode(t('trustSignals.meetOurSuffix')));
  header.appendChild(title);

  const subtitle = createElement('p', 'agent-showcase__subtitle', t('trustSignals.teamSubtitle'));
  header.appendChild(subtitle);
  container.appendChild(header);

  const grid = createElement('div', 'agent-showcase__grid');

  agents.forEach(agent => {
    const card = createElement('div', 'agent-showcase__card');

    // Image
    const imageWrapper = createElement('div', 'agent-showcase__image');
    const img = createElement('img');
    img.src = agent.image;
    img.alt = agent.name;
    img.loading = 'lazy';
    imageWrapper.appendChild(img);
    card.appendChild(imageWrapper);

    // Content
    const content = createElement('div', 'agent-showcase__content');

    const name = createElement('h3', 'agent-showcase__name', agent.name);
    content.appendChild(name);

    const role = createElement('p', 'agent-showcase__role', agent.role);
    content.appendChild(role);

    const specialization = createElement('p', 'agent-showcase__specialization', agent.specialization);
    content.appendChild(specialization);

    // Stats
    const stats = createElement('div', 'agent-showcase__stats');

    const yearsStat = createElement('div', 'agent-showcase__stat');
    const yearsValue = createElement('span', 'agent-showcase__stat-value', `${agent.yearsExperience}+`);
    const yearsLabel = createElement('span', 'agent-showcase__stat-label', 'Years');
    yearsStat.appendChild(yearsValue);
    yearsStat.appendChild(yearsLabel);
    stats.appendChild(yearsStat);

    const soldStat = createElement('div', 'agent-showcase__stat');
    const soldValue = createElement('span', 'agent-showcase__stat-value', agent.propertiesSold.toString());
    const soldLabel = createElement('span', 'agent-showcase__stat-label', 'Sold');
    soldStat.appendChild(soldValue);
    soldStat.appendChild(soldLabel);
    stats.appendChild(soldStat);

    content.appendChild(stats);

    // Contact
    const contact = createElement('div', 'agent-showcase__contact');

    const phoneLink = createElement('a', 'agent-showcase__link');
    phoneLink.href = `tel:${agent.phone.replace(/\s/g, '')}`;
    phoneLink.appendChild(createSVGUse('icon-phone'));
    phoneLink.appendChild(document.createTextNode(agent.phone));
    contact.appendChild(phoneLink);

    const emailLink = createElement('a', 'agent-showcase__link');
    emailLink.href = `mailto:${agent.email}`;
    emailLink.appendChild(createSVGUse('icon-email'));
    emailLink.appendChild(document.createTextNode('Contact'));
    contact.appendChild(emailLink);

    content.appendChild(contact);
    card.appendChild(content);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── Enhanced Testimonial Card ────────────────────────────────────────────
export interface EnhancedTestimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  image: string;
  rating: number;
  propertyType: string;
  isVerifiedBuyer: boolean;
  purchaseYear: number;
}

export function createEnhancedTestimonialCard(testimonial: EnhancedTestimonial): HTMLElement {
  const card = createElement('article', 'testimonials__card testimonials__card--enhanced');

  // Header with rating and verified badge
  const header = createElement('div', 'testimonials__card-header');

  // Star rating
  const rating = createElement('div', 'testimonials__rating');
  for (let i = 0; i < 5; i++) {
    const star = createElement('span', i < testimonial.rating ? 'testimonials__star testimonials__star--filled' : 'testimonials__star');
    star.textContent = '\u2605';
    rating.appendChild(star);
  }
  header.appendChild(rating);

  // Verified badge
  if (testimonial.isVerifiedBuyer) {
    const badge = createElement('div', 'testimonials__verified');
    badge.appendChild(createSVGUse('icon-check'));
    const badgeText = createElement('span', undefined, 'Verified Buyer');
    badge.appendChild(badgeText);
    header.appendChild(badge);
  }

  card.appendChild(header);

  // Quote
  const quote = createElement('blockquote', 'testimonials__quote');
  quote.textContent = `"${testimonial.quote}"`;
  card.appendChild(quote);

  // Property type badge
  const propertyBadge = createElement('div', 'testimonials__property-type');
  propertyBadge.textContent = `Purchased: ${testimonial.propertyType} (${testimonial.purchaseYear})`;
  card.appendChild(propertyBadge);

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

  return card;
}
