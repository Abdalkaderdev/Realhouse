// ═══════════════════════════════════════════════════════════════════════════
// Testimonial Card Component
// Reusable component for displaying client testimonials
// ═══════════════════════════════════════════════════════════════════════════

import type { Testimonial } from '../data/testimonials';

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

function createSVG(paths: string[], viewBox: string = '0 0 24 24'): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  paths.forEach(d => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  });

  return svg;
}

// Star icon filled
function createStarIcon(filled: boolean): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', `testimonial-card__star ${filled ? 'testimonial-card__star--filled' : ''}`);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');

  if (filled) {
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('stroke', 'currentColor');
  } else {
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
  }
  path.setAttribute('stroke-width', '1.5');

  svg.appendChild(path);
  return svg;
}

// Verified badge icon
function createVerifiedIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', 'testimonial-card__verified-icon');
  svg.setAttribute('fill', 'currentColor');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  svg.appendChild(path);
  return svg;
}

// Play icon for video testimonials
function createPlayIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', 'testimonial-card__play-icon');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '12');
  circle.setAttribute('cy', '12');
  circle.setAttribute('r', '10');
  circle.setAttribute('fill', 'rgba(201, 168, 76, 0.9)');
  circle.setAttribute('stroke', 'white');
  circle.setAttribute('stroke-width', '2');
  svg.appendChild(circle);

  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', '10 8 16 12 10 16');
  polygon.setAttribute('fill', 'white');
  svg.appendChild(polygon);

  return svg;
}

// Quote icon
function createQuoteIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', 'testimonial-card__quote-icon');
  svg.setAttribute('fill', 'currentColor');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z');
  svg.appendChild(path);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z');
  svg.appendChild(path2);

  return svg;
}

// ═══════════════════════════════════════════════════════════════════════════
// Testimonial Card Component
// ═══════════════════════════════════════════════════════════════════════════

export interface TestimonialCardOptions {
  size?: 'compact' | 'standard' | 'large';
  showVideo?: boolean;
  showServiceType?: boolean;
  showDate?: boolean;
  showCompany?: boolean;
}

export function createTestimonialCard(
  testimonial: Testimonial,
  options: TestimonialCardOptions = {}
): HTMLElement {
  const {
    size = 'standard',
    showVideo = true,
    showServiceType = true,
    showDate = true,
    showCompany = true
  } = options;

  const card = createElement('article', `testimonial-card testimonial-card--${size}`);
  card.setAttribute('data-id', testimonial.id);
  card.setAttribute('data-rating', testimonial.rating.toString());
  card.setAttribute('data-service', testimonial.serviceType);
  card.setAttribute('itemscope', '');
  card.setAttribute('itemtype', 'https://schema.org/Review');

  // Video thumbnail (if available and showVideo is true)
  if (showVideo && testimonial.videoUrl && testimonial.videoThumbnail) {
    const videoWrapper = createElement('div', 'testimonial-card__video');
    const thumbnail = createElement('img', 'testimonial-card__video-thumbnail');
    thumbnail.src = testimonial.videoThumbnail;
    thumbnail.alt = `Video testimonial from ${testimonial.name}`;
    thumbnail.loading = 'lazy';
    videoWrapper.appendChild(thumbnail);

    const playButton = createElement('button', 'testimonial-card__video-play');
    playButton.setAttribute('aria-label', `Play video testimonial from ${testimonial.name}`);
    playButton.appendChild(createPlayIcon());
    playButton.setAttribute('data-video-url', testimonial.videoUrl);
    videoWrapper.appendChild(playButton);

    card.appendChild(videoWrapper);
  }

  // Card content wrapper
  const content = createElement('div', 'testimonial-card__content');

  // Header: Photo, Name, Role, Verified Badge
  const header = createElement('div', 'testimonial-card__header');

  const avatarWrapper = createElement('div', 'testimonial-card__avatar-wrapper');
  const avatar = createElement('img', 'testimonial-card__avatar');
  avatar.src = testimonial.image;
  avatar.alt = `${testimonial.name} - Real House client`;
  avatar.loading = 'lazy';
  avatar.width = 64;
  avatar.height = 64;
  avatarWrapper.appendChild(avatar);

  if (testimonial.isVerifiedBuyer) {
    const verifiedBadge = createElement('span', 'testimonial-card__verified');
    verifiedBadge.appendChild(createVerifiedIcon());
    verifiedBadge.setAttribute('title', 'Verified Buyer');
    avatarWrapper.appendChild(verifiedBadge);
  }
  header.appendChild(avatarWrapper);

  const authorInfo = createElement('div', 'testimonial-card__author-info');

  const name = createElement('span', 'testimonial-card__name', testimonial.name);
  name.setAttribute('itemprop', 'author');
  authorInfo.appendChild(name);

  const roleWrapper = createElement('div', 'testimonial-card__role-wrapper');
  const role = createElement('span', 'testimonial-card__role', testimonial.role);
  roleWrapper.appendChild(role);

  if (showCompany && testimonial.company) {
    const company = createElement('span', 'testimonial-card__company', ` at ${testimonial.company}`);
    roleWrapper.appendChild(company);
  }
  authorInfo.appendChild(roleWrapper);

  // Location
  const location = createElement('span', 'testimonial-card__location');
  const locationIcon = createSVG(['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', 'M12 13a3 3 0 100-6 3 3 0 000 6z']);
  locationIcon.setAttribute('class', 'testimonial-card__location-icon');
  location.appendChild(locationIcon);
  location.appendChild(document.createTextNode(testimonial.location));
  authorInfo.appendChild(location);

  header.appendChild(authorInfo);
  content.appendChild(header);

  // Rating stars
  const ratingWrapper = createElement('div', 'testimonial-card__rating');
  ratingWrapper.setAttribute('itemprop', 'reviewRating');
  ratingWrapper.setAttribute('itemscope', '');
  ratingWrapper.setAttribute('itemtype', 'https://schema.org/Rating');

  const starsContainer = createElement('div', 'testimonial-card__stars');
  for (let i = 1; i <= 5; i++) {
    starsContainer.appendChild(createStarIcon(i <= testimonial.rating));
  }
  ratingWrapper.appendChild(starsContainer);

  const ratingValue = createElement('meta');
  ratingValue.setAttribute('itemprop', 'ratingValue');
  ratingValue.setAttribute('content', testimonial.rating.toString());
  ratingWrapper.appendChild(ratingValue);

  const bestRating = createElement('meta');
  bestRating.setAttribute('itemprop', 'bestRating');
  bestRating.setAttribute('content', '5');
  ratingWrapper.appendChild(bestRating);

  content.appendChild(ratingWrapper);

  // Quote / Review text
  const quoteWrapper = createElement('div', 'testimonial-card__quote-wrapper');
  quoteWrapper.appendChild(createQuoteIcon());

  const quote = createElement('blockquote', 'testimonial-card__quote');
  quote.setAttribute('itemprop', 'reviewBody');
  quote.textContent = testimonial.quote;
  quoteWrapper.appendChild(quote);

  content.appendChild(quoteWrapper);

  // Footer: Service type, Property type, Date
  const footer = createElement('div', 'testimonial-card__footer');

  // Tags row
  const tags = createElement('div', 'testimonial-card__tags');

  if (showServiceType) {
    const serviceTag = createElement('span', `testimonial-card__tag testimonial-card__tag--${testimonial.serviceType.toLowerCase()}`);
    serviceTag.textContent = testimonial.serviceType;
    tags.appendChild(serviceTag);
  }

  const propertyTag = createElement('span', 'testimonial-card__tag testimonial-card__tag--property');
  propertyTag.textContent = testimonial.propertyType;
  tags.appendChild(propertyTag);

  footer.appendChild(tags);

  // Date
  if (showDate) {
    const dateWrapper = createElement('div', 'testimonial-card__date');
    const date = new Date(testimonial.reviewDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
    dateWrapper.textContent = formattedDate;
    dateWrapper.setAttribute('itemprop', 'datePublished');
    dateWrapper.setAttribute('content', testimonial.reviewDate);
    footer.appendChild(dateWrapper);
  }

  content.appendChild(footer);
  card.appendChild(content);

  // Hidden metadata for schema
  const itemReviewed = createElement('div');
  itemReviewed.setAttribute('itemprop', 'itemReviewed');
  itemReviewed.setAttribute('itemscope', '');
  itemReviewed.setAttribute('itemtype', 'https://schema.org/RealEstateAgent');
  itemReviewed.style.display = 'none';

  const reviewedName = createElement('meta');
  reviewedName.setAttribute('itemprop', 'name');
  reviewedName.setAttribute('content', 'Real House IQ');
  itemReviewed.appendChild(reviewedName);

  card.appendChild(itemReviewed);

  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// Video Testimonial Card (Featured / Large Format)
// ═══════════════════════════════════════════════════════════════════════════

export function createVideoTestimonialCard(testimonial: Testimonial): HTMLElement {
  const card = createElement('article', 'testimonial-card testimonial-card--video-featured');
  card.setAttribute('data-id', testimonial.id);

  // Video section
  const videoSection = createElement('div', 'testimonial-card__video-section');

  if (testimonial.videoThumbnail) {
    const thumbnail = createElement('img', 'testimonial-card__video-bg');
    thumbnail.src = testimonial.videoThumbnail;
    thumbnail.alt = `Video testimonial from ${testimonial.name}`;
    thumbnail.loading = 'lazy';
    videoSection.appendChild(thumbnail);
  }

  const overlay = createElement('div', 'testimonial-card__video-overlay');
  videoSection.appendChild(overlay);

  const playButton = createElement('button', 'testimonial-card__video-play testimonial-card__video-play--large');
  playButton.setAttribute('aria-label', `Play video testimonial from ${testimonial.name}`);
  playButton.setAttribute('data-video-url', testimonial.videoUrl || '');
  playButton.appendChild(createPlayIcon());

  const playText = createElement('span', 'testimonial-card__play-text', 'Watch Video');
  playButton.appendChild(playText);
  videoSection.appendChild(playButton);

  card.appendChild(videoSection);

  // Info section
  const infoSection = createElement('div', 'testimonial-card__info-section');

  // Stars
  const stars = createElement('div', 'testimonial-card__stars');
  for (let i = 1; i <= 5; i++) {
    stars.appendChild(createStarIcon(i <= testimonial.rating));
  }
  infoSection.appendChild(stars);

  // Quote excerpt
  const quoteExcerpt = createElement('p', 'testimonial-card__quote-excerpt');
  const excerptText = testimonial.quote.length > 120
    ? testimonial.quote.substring(0, 120) + '...'
    : testimonial.quote;
  quoteExcerpt.textContent = `"${excerptText}"`;
  infoSection.appendChild(quoteExcerpt);

  // Author
  const author = createElement('div', 'testimonial-card__video-author');

  const avatar = createElement('img', 'testimonial-card__avatar testimonial-card__avatar--small');
  avatar.src = testimonial.image;
  avatar.alt = testimonial.name;
  avatar.loading = 'lazy';
  author.appendChild(avatar);

  const authorDetails = createElement('div', 'testimonial-card__author-details');
  authorDetails.appendChild(createElement('span', 'testimonial-card__name', testimonial.name));
  authorDetails.appendChild(createElement('span', 'testimonial-card__role', `${testimonial.role}, ${testimonial.company || ''}`));
  author.appendChild(authorDetails);

  if (testimonial.isVerifiedBuyer) {
    const badge = createElement('span', 'testimonial-card__verified-badge');
    badge.appendChild(createVerifiedIcon());
    badge.appendChild(document.createTextNode('Verified'));
    author.appendChild(badge);
  }

  infoSection.appendChild(author);
  card.appendChild(infoSection);

  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// Compact Testimonial Widget (for homepage/sidebars)
// ═══════════════════════════════════════════════════════════════════════════

export function createTestimonialWidget(testimonials: Testimonial[], limit: number = 3): HTMLElement {
  const widget = createElement('div', 'testimonial-widget');

  const grid = createElement('div', 'testimonial-widget__grid');

  testimonials.slice(0, limit).forEach(testimonial => {
    grid.appendChild(createTestimonialCard(testimonial, {
      size: 'compact',
      showVideo: false,
      showServiceType: false,
      showDate: false,
      showCompany: false
    }));
  });

  widget.appendChild(grid);

  // View all link
  const viewAll = createElement('div', 'testimonial-widget__footer');
  const viewAllLink = createElement('a', 'testimonial-widget__view-all', 'Read All Reviews');
  viewAllLink.href = '/testimonials';
  viewAllLink.setAttribute('data-route', '');

  const arrow = createSVG(['M5 12h14', 'M12 5l7 7-7 7']);
  arrow.setAttribute('class', 'testimonial-widget__arrow');
  viewAllLink.appendChild(arrow);

  viewAll.appendChild(viewAllLink);
  widget.appendChild(viewAll);

  return widget;
}

export { createStarIcon, createVerifiedIcon, createPlayIcon, createQuoteIcon };
