// ═══════════════════════════════════════════════════════════════════════════
// Testimonials Page
// /testimonials - Client reviews and testimonials with filtering
// ═══════════════════════════════════════════════════════════════════════════

import {
  testimonials,
  getTestimonialStats,
  getVideoTestimonials,
  getTestimonialsByServiceType,
  getTestimonialsByRating,
  type Testimonial
} from '../data/testimonials';
import {
  createTestimonialCard,
  createVideoTestimonialCard,
  createStarIcon
} from '../components/testimonial-card';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema
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

// ─── Breadcrumb Helpers ─────────────────────────────────────────────────────
function getTestimonialsBreadcrumbs() {
  return [
    { name: 'Home', url: '/' },
    { name: 'Testimonials', url: '/testimonials' }
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// Stats Card Component
// ═══════════════════════════════════════════════════════════════════════════

function createStatsCard(stats: ReturnType<typeof getTestimonialStats>): HTMLElement {
  const card = createElement('div', 'testimonials-page__stats-card');

  // Overall rating
  const ratingSection = createElement('div', 'testimonials-page__overall-rating');

  const ratingValue = createElement('span', 'testimonials-page__rating-value', stats.averageRating.toFixed(1));
  ratingSection.appendChild(ratingValue);

  const ratingStars = createElement('div', 'testimonials-page__rating-stars');
  for (let i = 1; i <= 5; i++) {
    ratingStars.appendChild(createStarIcon(i <= Math.round(stats.averageRating)));
  }
  ratingSection.appendChild(ratingStars);

  const ratingLabel = createElement('span', 'testimonials-page__rating-label', `Based on ${stats.totalReviews} reviews`);
  ratingSection.appendChild(ratingLabel);

  card.appendChild(ratingSection);

  // Stats grid
  const statsGrid = createElement('div', 'testimonials-page__stats-grid');

  const statItems = [
    { value: `${stats.satisfactionPercentage}%`, label: 'Satisfaction' },
    { value: stats.fiveStarCount.toString(), label: '5-Star Reviews' },
    { value: stats.fourStarCount.toString(), label: '4-Star Reviews' }
  ];

  statItems.forEach(item => {
    const statEl = createElement('div', 'testimonials-page__stat');
    statEl.appendChild(createElement('span', 'testimonials-page__stat-value', item.value));
    statEl.appendChild(createElement('span', 'testimonials-page__stat-label', item.label));
    statsGrid.appendChild(statEl);
  });

  card.appendChild(statsGrid);

  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// Filter Controls
// ═══════════════════════════════════════════════════════════════════════════

function createFilterControls(): HTMLElement {
  const controls = createElement('div', 'testimonials-page__controls');

  // Rating filter
  const ratingGroup = createElement('div', 'testimonials-page__filter-group');
  const ratingLabel = createElement('label', 'testimonials-page__filter-label', 'Rating');
  ratingLabel.setAttribute('for', 'rating-filter');
  ratingGroup.appendChild(ratingLabel);

  const ratingSelect = createElement('select', 'testimonials-page__filter-select');
  ratingSelect.id = 'rating-filter';

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' }
  ];

  ratingOptions.forEach(opt => {
    const option = createElement('option', undefined, opt.label);
    option.value = opt.value;
    ratingSelect.appendChild(option);
  });

  ratingGroup.appendChild(ratingSelect);
  controls.appendChild(ratingGroup);

  // Service type filter
  const serviceGroup = createElement('div', 'testimonials-page__filter-group');
  const serviceLabel = createElement('label', 'testimonials-page__filter-label', 'Service Type');
  serviceLabel.setAttribute('for', 'service-filter');
  serviceGroup.appendChild(serviceLabel);

  const serviceSelect = createElement('select', 'testimonials-page__filter-select');
  serviceSelect.id = 'service-filter';

  const serviceOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'Buying', label: 'Buying' },
    { value: 'Selling', label: 'Selling' },
    { value: 'Renting', label: 'Renting' },
    { value: 'Investment', label: 'Investment' }
  ];

  serviceOptions.forEach(opt => {
    const option = createElement('option', undefined, opt.label);
    option.value = opt.value;
    serviceSelect.appendChild(option);
  });

  serviceGroup.appendChild(serviceSelect);
  controls.appendChild(serviceGroup);

  // Sort control
  const sortGroup = createElement('div', 'testimonials-page__filter-group');
  const sortLabel = createElement('label', 'testimonials-page__filter-label', 'Sort By');
  sortLabel.setAttribute('for', 'sort-filter');
  sortGroup.appendChild(sortLabel);

  const sortSelect = createElement('select', 'testimonials-page__filter-select');
  sortSelect.id = 'sort-filter';

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating-high', label: 'Highest Rating' },
    { value: 'rating-low', label: 'Lowest Rating' }
  ];

  sortOptions.forEach(opt => {
    const option = createElement('option', undefined, opt.label);
    option.value = opt.value;
    sortSelect.appendChild(option);
  });

  sortGroup.appendChild(sortSelect);
  controls.appendChild(sortGroup);

  return controls;
}

// ═══════════════════════════════════════════════════════════════════════════
// Filter/Sort Logic
// ═══════════════════════════════════════════════════════════════════════════

function initFilterSort(grid: HTMLElement, allTestimonials: Testimonial[]): void {
  const ratingSelect = document.getElementById('rating-filter') as HTMLSelectElement;
  const serviceSelect = document.getElementById('service-filter') as HTMLSelectElement;
  const sortSelect = document.getElementById('sort-filter') as HTMLSelectElement;

  if (!ratingSelect || !serviceSelect || !sortSelect) return;

  const filterAndSort = () => {
    const ratingValue = ratingSelect.value;
    const serviceValue = serviceSelect.value;
    const sortValue = sortSelect.value;

    // Filter
    let filtered = [...allTestimonials];

    if (ratingValue !== 'all') {
      filtered = filtered.filter(t => t.rating === parseInt(ratingValue, 10));
    }

    if (serviceValue !== 'all') {
      filtered = filtered.filter(t => t.serviceType === serviceValue);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortValue) {
        case 'newest':
          return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
        case 'oldest':
          return new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime();
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    // Update grid - clear children safely
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }

    if (filtered.length === 0) {
      const noResults = createElement('div', 'testimonials-page__no-results');
      noResults.appendChild(createElement('p', undefined, 'No testimonials match your filters.'));
      const resetBtn = createElement('button', 'btn btn--outline', 'Reset Filters');
      resetBtn.addEventListener('click', () => {
        ratingSelect.value = 'all';
        serviceSelect.value = 'all';
        sortSelect.value = 'newest';
        filterAndSort();
      });
      noResults.appendChild(resetBtn);
      grid.appendChild(noResults);
    } else {
      filtered.forEach(testimonial => {
        grid.appendChild(createTestimonialCard(testimonial, {
          size: 'standard',
          showVideo: true,
          showServiceType: true,
          showDate: true,
          showCompany: true
        }));
      });
    }

    // Update count
    const countEl = document.getElementById('testimonials-count');
    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} of ${allTestimonials.length} reviews`;
    }
  };

  ratingSelect.addEventListener('change', filterAndSort);
  serviceSelect.addEventListener('change', filterAndSort);
  sortSelect.addEventListener('change', filterAndSort);
}

// ═══════════════════════════════════════════════════════════════════════════
// Video Modal
// ═══════════════════════════════════════════════════════════════════════════

function initVideoModal(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const playBtn = target.closest('[data-video-url]') as HTMLElement;

    if (playBtn) {
      const videoUrl = playBtn.getAttribute('data-video-url');
      if (videoUrl) {
        openVideoModal(videoUrl);
      }
    }
  });
}

function openVideoModal(videoUrl: string): void {
  // Create modal
  const modal = createElement('div', 'video-modal');
  modal.id = 'video-modal';

  const overlay = createElement('div', 'video-modal__overlay');
  overlay.addEventListener('click', () => closeVideoModal());
  modal.appendChild(overlay);

  const content = createElement('div', 'video-modal__content');

  const closeBtn = createElement('button', 'video-modal__close');
  closeBtn.textContent = '\u00D7'; // Unicode multiplication sign (X)
  closeBtn.setAttribute('aria-label', 'Close video');
  closeBtn.addEventListener('click', () => closeVideoModal());
  content.appendChild(closeBtn);

  const iframe = document.createElement('iframe');
  iframe.src = videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;
  iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.className = 'video-modal__iframe';
  content.appendChild(iframe);

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Focus trap
  requestAnimationFrame(() => {
    modal.classList.add('video-modal--active');
    closeBtn.focus();
  });

  // Close on Escape
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

function closeVideoModal(): void {
  const modal = document.getElementById('video-modal');
  if (modal) {
    modal.classList.remove('video-modal--active');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Testimonials Page Renderer
// ═══════════════════════════════════════════════════════════════════════════

export function renderTestimonialsPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getTestimonialsBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'testimonials-page');
  const container = createElement('div', 'container');

  // Breadcrumbs
  container.appendChild(createBreadcrumbs(breadcrumbs));

  // Hero Section
  const hero = createElement('header', 'testimonials-page__hero');

  const heroContent = createElement('div', 'testimonials-page__hero-content');

  const title = createElement('h1', 'testimonials-page__title');
  title.textContent = 'Client ';
  const em = createElement('em', undefined, 'Testimonials');
  title.appendChild(em);
  heroContent.appendChild(title);

  const subtitle = createElement('p', 'testimonials-page__subtitle');
  subtitle.textContent = 'See what our clients say about their experience with Real House. We take pride in delivering exceptional service for every property transaction in Erbil.';
  heroContent.appendChild(subtitle);

  hero.appendChild(heroContent);

  // Stats Card
  const stats = getTestimonialStats();
  hero.appendChild(createStatsCard(stats));

  container.appendChild(hero);

  // Video Testimonials Section (if any)
  const videoTestimonials = getVideoTestimonials();
  if (videoTestimonials.length > 0) {
    const videoSection = createElement('section', 'testimonials-page__video-section');
    videoSection.setAttribute('aria-labelledby', 'video-testimonials-title');

    const videoHeader = createElement('div', 'testimonials-page__section-header');
    const videoTitle = createElement('h2', 'testimonials-page__section-title', 'Video Testimonials');
    videoTitle.id = 'video-testimonials-title';
    videoHeader.appendChild(videoTitle);
    videoSection.appendChild(videoHeader);

    const videoGrid = createElement('div', 'testimonials-page__video-grid');
    videoTestimonials.forEach(testimonial => {
      videoGrid.appendChild(createVideoTestimonialCard(testimonial));
    });
    videoSection.appendChild(videoGrid);

    container.appendChild(videoSection);
  }

  // Filter Controls
  const filterSection = createElement('div', 'testimonials-page__filter-section');

  const filterHeader = createElement('div', 'testimonials-page__filter-header');
  filterHeader.appendChild(createElement('h2', 'testimonials-page__section-title', 'All Reviews'));

  const countEl = createElement('span', 'testimonials-page__count');
  countEl.id = 'testimonials-count';
  countEl.textContent = `Showing ${testimonials.length} of ${testimonials.length} reviews`;
  filterHeader.appendChild(countEl);

  filterSection.appendChild(filterHeader);
  filterSection.appendChild(createFilterControls());

  container.appendChild(filterSection);

  // Testimonials Grid
  const gridSection = createElement('section', 'testimonials-page__grid-section');
  gridSection.setAttribute('aria-label', 'Client reviews');

  const grid = createElement('div', 'testimonials-page__grid');
  grid.id = 'testimonials-grid';

  // Sort by newest first by default
  const sortedTestimonials = [...testimonials].sort(
    (a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
  );

  sortedTestimonials.forEach(testimonial => {
    grid.appendChild(createTestimonialCard(testimonial, {
      size: 'standard',
      showVideo: true,
      showServiceType: true,
      showDate: true,
      showCompany: true
    }));
  });

  gridSection.appendChild(grid);
  container.appendChild(gridSection);

  // CTA Section
  const cta = createElement('section', 'testimonials-page__cta');

  const ctaContent = createElement('div', 'testimonials-page__cta-content');

  const ctaTitle = createElement('h2', 'testimonials-page__cta-title', 'Share Your Experience');
  ctaContent.appendChild(ctaTitle);

  const ctaText = createElement('p', 'testimonials-page__cta-text');
  ctaText.textContent = 'Had a great experience with Real House? We would love to hear from you! Leave a review and help others make informed decisions.';
  ctaContent.appendChild(ctaText);

  const ctaActions = createElement('div', 'testimonials-page__cta-actions');

  const reviewBtn = createElement('a', 'btn btn--primary btn--lg', 'Leave a Review');
  reviewBtn.href = '/contact';
  reviewBtn.setAttribute('data-route', '');
  ctaActions.appendChild(reviewBtn);

  const contactBtn = createElement('a', 'btn btn--outline btn--lg', 'Contact Us');
  contactBtn.href = '/contact';
  contactBtn.setAttribute('data-route', '');
  ctaActions.appendChild(contactBtn);

  ctaContent.appendChild(ctaActions);
  cta.appendChild(ctaContent);
  container.appendChild(cta);

  page.appendChild(container);
  fragment.appendChild(page);

  // Initialize filter/sort after DOM is ready
  setTimeout(() => {
    const gridEl = document.getElementById('testimonials-grid');
    if (gridEl) initFilterSort(gridEl, testimonials);
    initVideoModal();
  }, 100);

  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// SEO Setup
// ═══════════════════════════════════════════════════════════════════════════

export function setupTestimonialsPageSEO(): void {
  const stats = getTestimonialStats();

  document.title = `Client Reviews & Testimonials | Real House Erbil | ${stats.averageRating}/5 Rating`;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', `Read ${stats.totalReviews}+ verified client reviews for Real House Erbil. ${stats.averageRating}/5 average rating with ${stats.satisfactionPercentage}% satisfaction. See why clients trust us for property buying, selling, renting, and investment in Kurdistan.`);
  }

  // Keywords
  let keywords = document.querySelector('meta[name="keywords"]');
  if (!keywords) {
    keywords = document.createElement('meta');
    keywords.setAttribute('name', 'keywords');
    document.head.appendChild(keywords);
  }
  keywords.setAttribute('content', 'Real House reviews, Real House testimonials, Erbil real estate reviews, Kurdistan property agent reviews, best real estate agent Erbil reviews, client testimonials Erbil');

  // Inject AggregateRating schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://realhouseiq.com/#organization',
    'name': 'Real House IQ',
    'image': 'https://realhouseiq.com/logo.png',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Gulan Street, Dream City',
      'addressLocality': 'Erbil',
      'addressRegion': 'Kurdistan Region',
      'addressCountry': 'IQ'
    },
    'telephone': '+964-750-792-2138',
    'url': 'https://realhouseiq.com',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': stats.averageRating.toString(),
      'reviewCount': stats.totalReviews.toString(),
      'bestRating': '5',
      'worstRating': '1'
    },
    'review': testimonials.slice(0, 10).map(t => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': t.name
      },
      'datePublished': t.reviewDate,
      'reviewBody': t.quote,
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': t.rating.toString(),
        'bestRating': '5',
        'worstRating': '1'
      }
    }))
  };

  let script = document.querySelector('script[data-schema="testimonials"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', 'testimonials');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

export { getTestimonialsBreadcrumbs };
