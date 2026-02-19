// ═══════════════════════════════════════════════════════════════════════════
// Page Renderers for Real House
// Using Safe DOM Methods
// ═══════════════════════════════════════════════════════════════════════════

import { properties, featuredProperties, getDisplayPrice, getPropertyById, type Property } from './data/properties';
import { testimonials } from './data/testimonials';
import { submitInquiry } from './services/api';

// ─── Filter State Interface ─────────────────────────────────────────────────
interface FilterState {
  type: string;
  priceRange: string;
  minBeds: number;
  searchQuery: string;
}

// Current filter state
let currentFilterState: FilterState = {
  type: 'All',
  priceRange: 'All',
  minBeds: 0,
  searchQuery: ''
};

// ─── Filter Function ────────────────────────────────────────────────────────
function filterProperties(props: Property[], state: FilterState): Property[] {
  return props.filter(property => {
    // Type filter
    if (state.type !== 'All' && property.type !== state.type) {
      return false;
    }

    // Price range filter (updated for Erbil market)
    if (state.priceRange !== 'All') {
      const price = property.price;
      switch (state.priceRange) {
        case 'Under $200K':
          if (price >= 200000) return false;
          break;
        case '$200K-$400K':
          if (price < 200000 || price >= 400000) return false;
          break;
        case '$400K-$700K':
          if (price < 400000 || price >= 700000) return false;
          break;
        case '$700K+':
          if (price < 700000) return false;
          break;
      }
    }

    // Beds filter
    if (state.minBeds > 0 && property.specs.beds < state.minBeds) {
      return false;
    }

    // Search query filter
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      const searchableText = [
        property.title,
        property.type,
        property.location.city,
        property.location.district,
        property.location.address,
        property.description,
        ...property.features
      ].join(' ').toLowerCase();

      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

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
  location.appendChild(document.createTextNode(`${property.location.district}, ${property.location.city}`));
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
  areaSpec.appendChild(document.createTextNode(`${property.specs.sqm.toLocaleString()} m²`));
  specs.appendChild(areaSpec);

  content.appendChild(specs);

  // Footer
  const footer = createElement('div', 'property-card__footer');

  const price = createElement('span', 'property-card__price', getDisplayPrice(property));
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

  // YouTube Video Background
  const videoBackground = createElement('div', 'hero__video-background');
  const videoIframe = document.createElement('iframe');
  videoIframe.src = 'https://www.youtube.com/embed/N2nROpXXG88?autoplay=1&mute=1&loop=1&playlist=N2nROpXXG88&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1';
  videoIframe.className = 'hero__video-iframe';
  videoIframe.setAttribute('frameborder', '0');
  videoIframe.setAttribute('allow', 'autoplay; encrypted-media');
  videoIframe.setAttribute('allowfullscreen', '');
  videoIframe.setAttribute('loading', 'lazy');
  videoBackground.appendChild(videoIframe);
  hero.appendChild(videoBackground);

  // Video Overlay for text readability
  const videoOverlay = createElement('div', 'hero__video-overlay');
  hero.appendChild(videoOverlay);

  const heroContent = createElement('div', 'hero__content container');

  // Headline
  const headline = createElement('h1', 'hero__headline', 'Find Your Dream Home');
  heroContent.appendChild(headline);

  // Subline
  const subline = createElement('p', 'hero__subline', 'What makes us different is trust.');
  heroContent.appendChild(subline);

  // CTA
  const cta = createElement('div', 'hero__cta');
  const primaryBtn = createElement('a', 'btn btn--primary btn--large', 'View Properties');
  primaryBtn.href = '/properties';
  primaryBtn.setAttribute('data-route', '');
  cta.appendChild(primaryBtn);
  heroContent.appendChild(cta);

  hero.appendChild(heroContent);
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

  // Initial display: show first 3 featured properties
  const initialCount = 3;
  let displayedCount = initialCount;

  featuredProperties.slice(0, initialCount).forEach(property => {
    featuredGrid.appendChild(createPropertyCard(property));
  });
  featuredContainer.appendChild(featuredGrid);

  // Load More button (only show if there are more properties)
  if (featuredProperties.length > initialCount) {
    const loadMoreContainer = createElement('div', 'featured__load-more');
    const loadMoreBtn = createElement('button', 'btn btn--outline btn--lg', 'Load More Properties');
    loadMoreBtn.setAttribute('data-load-more', '');

    loadMoreBtn.addEventListener('click', () => {
      const nextBatch = featuredProperties.slice(displayedCount, displayedCount + 3);
      nextBatch.forEach(property => {
        const card = createPropertyCard(property);
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        featuredGrid.appendChild(card);
        // Animate in
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
      displayedCount += nextBatch.length;

      // Hide button if no more properties
      if (displayedCount >= featuredProperties.length) {
        loadMoreBtn.style.display = 'none';
      }
    });

    loadMoreContainer.appendChild(loadMoreBtn);
    featuredContainer.appendChild(loadMoreContainer);
  }

  featured.appendChild(featuredContainer);
  fragment.appendChild(featured);

  // Marquee Banner
  const marquee = createElement('div', 'marquee-banner marquee-banner--large');
  marquee.setAttribute('data-scroll-marquee', '');
  marquee.setAttribute('data-marquee-text', 'Luxury Living • Premium Properties • Exclusive Locations • Award Winning • Luxury Living • Premium Properties •');
  fragment.appendChild(marquee);

  // Horizontal Showcase Section
  const showcase = createElement('section', 'showcase');
  showcase.id = 'showcase';

  const showcaseProgress = createElement('div', 'showcase__progress');
  const progressBar = createElement('div', 'showcase__progress-bar');
  showcaseProgress.appendChild(progressBar);
  showcase.appendChild(showcaseProgress);

  const showcaseWrapper = createElement('div', 'showcase__wrapper');

  // Showcase panels with featured properties
  const showcaseProperties = featuredProperties.slice(0, 4);
  showcaseProperties.forEach((property, index) => {
    const panel = createElement('div', 'showcase-panel');
    panel.setAttribute('data-panel', (index + 1).toString());

    // Background
    const bg = createElement('div', 'showcase-panel__bg');
    const bgImg = createElement('img');
    bgImg.src = property.images[0];
    bgImg.alt = property.title;
    bgImg.loading = index === 0 ? 'eager' : 'lazy';
    bg.appendChild(bgImg);
    panel.appendChild(bg);

    // Overlay
    const overlay = createElement('div', 'showcase-panel__overlay');
    panel.appendChild(overlay);

    // Content
    const content = createElement('div', 'showcase-panel__content');

    const eyebrow = createElement('div', 'showcase-panel__eyebrow');
    const eyebrowSpan = createElement('span', undefined, property.type.toUpperCase());
    eyebrow.appendChild(eyebrowSpan);
    content.appendChild(eyebrow);

    const title = createElement('h2', 'showcase-panel__title');
    const titleParts = property.title.split(' ');
    title.textContent = titleParts.slice(0, -1).join(' ') + ' ';
    const titleEm = createElement('em', undefined, titleParts[titleParts.length - 1]);
    title.appendChild(titleEm);
    content.appendChild(title);

    const subtitle = createElement('p', 'showcase-panel__subtitle', property.description);
    content.appendChild(subtitle);

    const price = createElement('div', 'showcase-panel__price', getDisplayPrice(property));
    content.appendChild(price);

    const specs = createElement('div', 'showcase-panel__specs');
    const specData = [
      { icon: 'icon-bed', value: `${property.specs.beds} Beds` },
      { icon: 'icon-bath', value: `${property.specs.baths} Baths` },
      { icon: 'icon-area', value: `${property.specs.sqm.toLocaleString()} m²` }
    ];
    specData.forEach(spec => {
      const specEl = createElement('div', 'showcase-panel__spec');
      specEl.appendChild(createSVGUse(spec.icon));
      specEl.appendChild(document.createTextNode(spec.value));
      specs.appendChild(specEl);
    });
    content.appendChild(specs);

    const cta = createElement('div', 'showcase-panel__cta');
    const ctaBtn = createElement('a', 'btn btn--primary', 'View Property');
    ctaBtn.href = `/properties/${property.id}`;
    ctaBtn.setAttribute('data-route', '');
    ctaBtn.setAttribute('data-magnetic', '');
    cta.appendChild(ctaBtn);
    content.appendChild(cta);

    panel.appendChild(content);

    // Panel number
    const number = createElement('div', 'showcase-panel__number', `0${index + 1}`);
    panel.appendChild(number);

    showcaseWrapper.appendChild(panel);
  });

  showcase.appendChild(showcaseWrapper);
  fragment.appendChild(showcase);

  // Second Marquee (gold)
  const marquee2 = createElement('div', 'marquee-banner marquee-banner--gold');
  marquee2.setAttribute('data-marquee', '');
  marquee2.setAttribute('data-marquee-text', 'Real House — Where Dreams Find Address — Exceptional Properties — Unmatched Service —');
  marquee2.setAttribute('data-marquee-speed', '60');
  fragment.appendChild(marquee2);

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

  // Testimonials Section
  const testimonialsSection = createElement('section', 'testimonials');
  const testimonialsContainer = createElement('div', 'container');

  const testimonialsHeader = createElement('div', 'testimonials__header');
  const testimonialsTitle = createElement('h2', 'testimonials__title');
  testimonialsTitle.textContent = 'What Our ';
  const emTestimonials = createElement('em', undefined, 'Clients');
  testimonialsTitle.appendChild(emTestimonials);
  testimonialsTitle.appendChild(document.createTextNode(' Say'));
  testimonialsHeader.appendChild(testimonialsTitle);
  testimonialsContainer.appendChild(testimonialsHeader);

  const testimonialsGrid = createElement('div', 'testimonials__grid');

  // Display first 3 testimonials
  testimonials.slice(0, 3).forEach(testimonial => {
    const card = createElement('article', 'testimonials__card');

    // Quote
    const quote = createElement('blockquote', 'testimonials__quote');
    quote.textContent = `"${testimonial.quote}"`;
    card.appendChild(quote);

    // Rating
    const rating = createElement('div', 'testimonials__rating');
    for (let i = 0; i < testimonial.rating; i++) {
      rating.appendChild(document.createTextNode('\u2605')); // Star character
    }
    card.appendChild(rating);

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
    testimonialsGrid.appendChild(card);
  });

  testimonialsContainer.appendChild(testimonialsGrid);
  testimonialsSection.appendChild(testimonialsContainer);
  fragment.appendChild(testimonialsSection);

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

  // Reset filter state when page loads
  currentFilterState = {
    type: 'All',
    priceRange: 'All',
    minBeds: 0,
    searchQuery: ''
  };

  const page = createElement('div', 'properties-page');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'properties-page__header');
  const title = createElement('h1', 'properties-page__title', 'Our Properties');
  const subtitle = createElement('p', 'properties-page__subtitle', 'Discover exceptional homes in the world\'s most desirable locations.');
  header.appendChild(title);
  header.appendChild(subtitle);
  container.appendChild(header);

  // Search Input
  const searchSection = createElement('div', 'properties-page__search');
  const searchInput = createElement('input', 'properties-page__search-input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search properties by location, type, or features...';
  searchInput.setAttribute('aria-label', 'Search properties');
  searchSection.appendChild(searchInput);
  container.appendChild(searchSection);

  // Property Type Filters
  const typeFilterGroup = createElement('div', 'properties-page__filter-group');
  const typeLabel = createElement('span', 'properties-page__filter-label', 'Type:');
  typeFilterGroup.appendChild(typeLabel);
  const filterTypes = ['All', 'Villa', 'Apartment', 'Penthouse', 'Townhouse', 'Duplex', 'Land', 'Commercial'];
  filterTypes.forEach((type, index) => {
    const btn = createElement('button', `properties-page__filter${index === 0 ? ' active' : ''}`, type);
    btn.setAttribute('data-filter-type', 'type');
    btn.setAttribute('data-filter-value', type);
    typeFilterGroup.appendChild(btn);
  });
  container.appendChild(typeFilterGroup);

  // Price Range Filters
  const priceFilterGroup = createElement('div', 'properties-page__filter-group');
  const priceLabel = createElement('span', 'properties-page__filter-label', 'Price:');
  priceFilterGroup.appendChild(priceLabel);
  const priceRanges = ['All', 'Under $200K', '$200K-$400K', '$400K-$700K', '$700K+'];
  priceRanges.forEach((range, index) => {
    const btn = createElement('button', `properties-page__filter${index === 0 ? ' active' : ''}`, range);
    btn.setAttribute('data-filter-type', 'price');
    btn.setAttribute('data-filter-value', range);
    priceFilterGroup.appendChild(btn);
  });
  container.appendChild(priceFilterGroup);

  // Beds Filters
  const bedsFilterGroup = createElement('div', 'properties-page__filter-group');
  const bedsLabel = createElement('span', 'properties-page__filter-label', 'Bedrooms:');
  bedsFilterGroup.appendChild(bedsLabel);
  const bedOptions = [
    { label: 'Any', value: 0 },
    { label: '3+', value: 3 },
    { label: '4+', value: 4 },
    { label: '5+', value: 5 },
    { label: '6+', value: 6 }
  ];
  bedOptions.forEach((option, index) => {
    const btn = createElement('button', `properties-page__filter${index === 0 ? ' active' : ''}`, option.label);
    btn.setAttribute('data-filter-type', 'beds');
    btn.setAttribute('data-filter-value', option.value.toString());
    bedsFilterGroup.appendChild(btn);
  });
  container.appendChild(bedsFilterGroup);

  // Grid
  const grid = createElement('div', 'properties-page__grid');
  grid.id = 'properties-grid';
  properties.forEach(property => {
    grid.appendChild(createPropertyCard(property));
  });
  container.appendChild(grid);

  page.appendChild(container);
  fragment.appendChild(page);

  // Function to re-render the grid
  function renderGrid() {
    const gridEl = document.getElementById('properties-grid');
    if (!gridEl) return;

    // Clear the grid safely (no innerHTML)
    while (gridEl.firstChild) {
      gridEl.removeChild(gridEl.firstChild);
    }

    // Filter properties
    const filteredProperties = filterProperties(properties, currentFilterState);

    if (filteredProperties.length === 0) {
      // Show no results message
      const noResults = createElement('div', 'properties-page__no-results');
      const noResultsTitle = createElement('h3', undefined, 'No properties found');
      const noResultsText = createElement('p', undefined, 'Try adjusting your filters to find more properties.');
      noResults.appendChild(noResultsTitle);
      noResults.appendChild(noResultsText);
      gridEl.appendChild(noResults);
    } else {
      // Render filtered properties
      filteredProperties.forEach(property => {
        gridEl.appendChild(createPropertyCard(property));
      });
    }
  }

  // Add event listeners after the fragment is appended to DOM
  setTimeout(() => {
    // Search input handler
    const searchEl = document.querySelector('.properties-page__search-input') as HTMLInputElement;
    if (searchEl) {
      let debounceTimeout: ReturnType<typeof setTimeout>;
      searchEl.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          currentFilterState.searchQuery = searchEl.value;
          renderGrid();
        }, 300);
      });
    }

    // Filter button handlers
    const filterButtons = document.querySelectorAll('.properties-page__filter');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterType = btn.getAttribute('data-filter-type');
        const filterValue = btn.getAttribute('data-filter-value');

        if (!filterType || !filterValue) return;

        // Update active state for buttons in the same group
        const parentGroup = btn.parentElement;
        if (parentGroup) {
          parentGroup.querySelectorAll('.properties-page__filter').forEach(b => {
            b.classList.remove('active');
          });
        }
        btn.classList.add('active');

        // Update filter state
        switch (filterType) {
          case 'type':
            currentFilterState.type = filterValue;
            break;
          case 'price':
            currentFilterState.priceRange = filterValue;
            break;
          case 'beds':
            currentFilterState.minBeds = parseInt(filterValue, 10);
            break;
        }

        // Re-render the grid
        renderGrid();
      });
    });
  }, 0);

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
  form.setAttribute('novalidate', '');

  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[0-9]{1,4}[-.\s]?[0-9]{3}[-.\s]?[0-9]{3}[-.\s]?[0-9]{4,}$/;

  // Validation error messages
  const errorMessages: Record<string, string> = {
    name: 'Please enter your full name',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid US phone number',
    message: 'Please enter a message'
  };

  // Helper to validate a single field
  function validateField(input: HTMLInputElement | HTMLTextAreaElement): boolean {
    const name = input.name;
    const value = input.value.trim();
    let isValid = true;

    if (!value) {
      isValid = false;
    } else if (name === 'email' && !emailPattern.test(value)) {
      isValid = false;
    } else if (name === 'phone' && !phonePattern.test(value)) {
      isValid = false;
    }

    input.setAttribute('aria-invalid', String(!isValid));
    const errorSpan = document.getElementById(`${name}-error`);
    if (errorSpan) {
      errorSpan.textContent = isValid ? '' : errorMessages[name];
    }

    return isValid;
  }

  // Helper to validate all fields
  function validateAllFields(): boolean {
    const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('.form__input, .form__textarea');
    let allValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        allValid = false;
      }
    });
    return allValid;
  }

  // Success message container
  const successMessage = createElement('div', 'form__success');
  successMessage.style.display = 'none';
  successMessage.textContent = 'Thank you for your inquiry! We will contact you shortly.';
  successMessage.setAttribute('role', 'status');
  successMessage.setAttribute('aria-live', 'polite');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide any previous success message
    successMessage.style.display = 'none';

    // Validate all fields
    if (!validateAllFields()) {
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('.form__submit') as HTMLButtonElement;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    // Submit to API
    submitInquiry({ name, email, phone, message })
      .then((result) => {
        if (result.success) {
          // Reset form
          form.reset();

          // Reset aria-invalid attributes
          const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('.form__input, .form__textarea');
          inputs.forEach(input => {
            input.setAttribute('aria-invalid', 'false');
          });

          // Clear error messages
          const errorSpans = form.querySelectorAll('.form__error-message');
          errorSpans.forEach(span => {
            span.textContent = '';
          });

          // Show success message
          successMessage.textContent = result.message;
          successMessage.style.display = 'block';
        } else {
          // Show error
          successMessage.textContent = result.message;
          successMessage.style.color = 'var(--color-error, #ef4444)';
          successMessage.style.display = 'block';
        }
      })
      .catch(() => {
        successMessage.textContent = 'Something went wrong. Please try again.';
        successMessage.style.color = 'var(--color-error, #ef4444)';
        successMessage.style.display = 'block';
      })
      .finally(() => {
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
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
    input.setAttribute('aria-required', 'true');
    input.setAttribute('aria-invalid', 'false');
    input.setAttribute('aria-describedby', `${field.name}-error`);

    // Add blur validation
    input.addEventListener('blur', () => validateField(input));

    // Error message span
    const errorSpan = createElement('span', 'form__error-message');
    errorSpan.id = `${field.name}-error`;
    errorSpan.setAttribute('aria-live', 'polite');

    group.appendChild(label);
    group.appendChild(input);
    group.appendChild(errorSpan);
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
  textarea.required = true;
  textarea.setAttribute('aria-required', 'true');
  textarea.setAttribute('aria-invalid', 'false');
  textarea.setAttribute('aria-describedby', 'message-error');

  // Add blur validation for textarea
  textarea.addEventListener('blur', () => validateField(textarea));

  // Error message span for message
  const msgErrorSpan = createElement('span', 'form__error-message');
  msgErrorSpan.id = 'message-error';
  msgErrorSpan.setAttribute('aria-live', 'polite');

  msgGroup.appendChild(msgLabel);
  msgGroup.appendChild(textarea);
  msgGroup.appendChild(msgErrorSpan);
  form.appendChild(msgGroup);

  const submit = createElement('button', 'form__submit', 'Send Message');
  submit.type = 'submit';
  form.appendChild(submit);

  // Add success message after the form
  form.appendChild(successMessage);

  formWrapper.appendChild(form);
  grid.appendChild(formWrapper);

  // Info
  const info = createElement('div', 'contact-page__info');

  const infoItems = [
    { title: 'Office', content: 'Dream City, Erbil\nKurdistan Region, Iraq' },
    { title: 'Abdalkader', content: '+964 750 792 2138', isLink: true, href: 'tel:+9647507922138' },
    { title: 'Mahmood', content: '+964 751 441 5003', isLink: true, href: 'tel:+9647514415003' },
    { title: 'Email', content: 'info@realhouseiq.com', isLink: true, href: 'mailto:info@realhouseiq.com' },
    { title: 'Hours', content: 'Saturday - Thursday: 9AM - 6PM\nFriday: By Appointment' }
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
  location.appendChild(document.createTextNode(`${property.location.address}, ${property.location.district}, ${property.location.city}`));
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
    { icon: 'icon-area', label: 'Area (m²)', value: property.specs.sqm.toLocaleString() },
    ...(property.specs.yearBuilt ? [{ icon: 'icon-calendar', label: 'Year Built', value: property.specs.yearBuilt.toString() }] : [])
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
  phoneLink.href = 'tel:+9647507922138';
  phoneLink.appendChild(createSVGUse('icon-phone'));
  phoneLink.appendChild(document.createTextNode('+964 750 792 2138'));
  agentContact.appendChild(phoneLink);

  const emailLink = createElement('a', 'property-detail__agent-link');
  emailLink.href = 'mailto:contact@realhouseiq.com';
  emailLink.appendChild(createSVGUse('icon-email'));
  emailLink.appendChild(document.createTextNode('contact@realhouseiq.com'));
  agentContact.appendChild(emailLink);

  agentCard.appendChild(agentContact);

  // Contact buttons
  const agentActions = createElement('div', 'property-detail__agent-actions');

  const scheduleBtn = createElement('a', 'btn btn--primary btn--full', 'Schedule Viewing');
  scheduleBtn.href = '/contact';
  scheduleBtn.setAttribute('data-route', '');
  agentActions.appendChild(scheduleBtn);

  const callBtn = createElement('a', 'btn btn--ghost btn--full', 'Call Agent');
  callBtn.href = 'tel:+9647507922138';
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

  const cityLine = createElement('p', 'property-detail__city-line', `${property.location.district}, ${property.location.city}`);
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

// ─── Privacy Policy Page ──────────────────────────────────────────────────
export function renderPrivacyPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'privacy-page');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'privacy-page__header');
  const title = createElement('h1', 'privacy-page__title', 'Privacy Policy');
  const lastUpdated = createElement('p', 'privacy-page__date', 'Last Updated: February 2026');
  header.appendChild(title);
  header.appendChild(lastUpdated);
  container.appendChild(header);

  // Content
  const content = createElement('div', 'privacy-page__content');

  // Introduction
  const intro = createElement('section', 'privacy-page__section');
  const introTitle = createElement('h2', undefined, 'Introduction');
  const introP1 = createElement('p', undefined, 'Real House ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.');
  const introP2 = createElement('p', undefined, 'Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.');
  intro.appendChild(introTitle);
  intro.appendChild(introP1);
  intro.appendChild(introP2);
  content.appendChild(intro);

  // Information We Collect
  const collection = createElement('section', 'privacy-page__section');
  const collectionTitle = createElement('h2', undefined, 'Information We Collect');

  const personalInfo = createElement('h3', undefined, 'Personal Information');
  const personalP = createElement('p', undefined, 'We may collect personal information that you voluntarily provide to us when you:');
  const personalList = createElement('ul');
  const personalItems = [
    'Register on our website or request property information',
    'Schedule property viewings or consultations',
    'Subscribe to our newsletter or marketing communications',
    'Contact us through our website, email, or phone',
    'Apply for financing or mortgage pre-approval assistance'
  ];
  personalItems.forEach(item => {
    const li = createElement('li', undefined, item);
    personalList.appendChild(li);
  });

  const autoInfo = createElement('h3', undefined, 'Automatically Collected Information');
  const autoP = createElement('p', undefined, 'When you visit our website, we automatically collect certain information about your device, including:');
  const autoList = createElement('ul');
  const autoItems = [
    'IP address and browser type',
    'Operating system and device information',
    'Pages visited and time spent on our website',
    'Referring website addresses',
    'Property search history and preferences'
  ];
  autoItems.forEach(item => {
    const li = createElement('li', undefined, item);
    autoList.appendChild(li);
  });

  collection.appendChild(collectionTitle);
  collection.appendChild(personalInfo);
  collection.appendChild(personalP);
  collection.appendChild(personalList);
  collection.appendChild(autoInfo);
  collection.appendChild(autoP);
  collection.appendChild(autoList);
  content.appendChild(collection);

  // How We Use Your Information
  const usage = createElement('section', 'privacy-page__section');
  const usageTitle = createElement('h2', undefined, 'How We Use Your Information');
  const usageP = createElement('p', undefined, 'We use the information we collect to:');
  const usageList = createElement('ul');
  const usageItems = [
    'Provide, operate, and maintain our services',
    'Process property inquiries and schedule viewings',
    'Send you relevant property listings and market updates',
    'Respond to your comments, questions, and requests',
    'Improve our website and customer service',
    'Send you marketing and promotional communications (with your consent)',
    'Protect against fraudulent or illegal activity'
  ];
  usageItems.forEach(item => {
    const li = createElement('li', undefined, item);
    usageList.appendChild(li);
  });
  usage.appendChild(usageTitle);
  usage.appendChild(usageP);
  usage.appendChild(usageList);
  content.appendChild(usage);

  // Cookies
  const cookies = createElement('section', 'privacy-page__section');
  const cookiesTitle = createElement('h2', undefined, 'Cookies and Tracking Technologies');
  const cookiesP1 = createElement('p', undefined, 'We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.');
  const cookiesP2 = createElement('p', undefined, 'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.');
  const cookiesTypes = createElement('h3', undefined, 'Types of Cookies We Use:');
  const cookiesList = createElement('ul');
  const cookiesItems = [
    'Essential Cookies: Required for the website to function properly',
    'Analytics Cookies: Help us understand how visitors interact with our website',
    'Marketing Cookies: Used to track visitors across websites for advertising purposes',
    'Preference Cookies: Remember your settings and preferences'
  ];
  cookiesItems.forEach(item => {
    const li = createElement('li', undefined, item);
    cookiesList.appendChild(li);
  });
  cookies.appendChild(cookiesTitle);
  cookies.appendChild(cookiesP1);
  cookies.appendChild(cookiesP2);
  cookies.appendChild(cookiesTypes);
  cookies.appendChild(cookiesList);
  content.appendChild(cookies);

  // Third Party Disclosure
  const thirdParty = createElement('section', 'privacy-page__section');
  const thirdPartyTitle = createElement('h2', undefined, 'Third-Party Disclosure');
  const thirdPartyP1 = createElement('p', undefined, 'We may share your information with third parties in the following circumstances:');
  const thirdPartyList = createElement('ul');
  const thirdPartyItems = [
    'With property owners, sellers, or their agents when you inquire about a property',
    'With mortgage lenders and financial institutions when you request financing assistance',
    'With service providers who assist us in operating our website and services',
    'With legal authorities when required by law or to protect our rights',
    'In connection with a merger, acquisition, or sale of assets'
  ];
  thirdPartyItems.forEach(item => {
    const li = createElement('li', undefined, item);
    thirdPartyList.appendChild(li);
  });
  const thirdPartyP2 = createElement('p', undefined, 'We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties for marketing purposes without your explicit consent.');
  thirdParty.appendChild(thirdPartyTitle);
  thirdParty.appendChild(thirdPartyP1);
  thirdParty.appendChild(thirdPartyList);
  thirdParty.appendChild(thirdPartyP2);
  content.appendChild(thirdParty);

  // Data Security
  const security = createElement('section', 'privacy-page__section');
  const securityTitle = createElement('h2', undefined, 'Data Security');
  const securityP = createElement('p', undefined, 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.');
  security.appendChild(securityTitle);
  security.appendChild(securityP);
  content.appendChild(security);

  // Your Rights
  const rights = createElement('section', 'privacy-page__section');
  const rightsTitle = createElement('h2', undefined, 'Your Privacy Rights');
  const rightsP = createElement('p', undefined, 'Depending on your location, you may have the following rights regarding your personal information:');
  const rightsList = createElement('ul');
  const rightsItems = [
    'Right to access and obtain a copy of your personal data',
    'Right to rectify inaccurate or incomplete information',
    'Right to erasure ("right to be forgotten")',
    'Right to restrict or object to processing',
    'Right to data portability',
    'Right to withdraw consent at any time'
  ];
  rightsItems.forEach(item => {
    const li = createElement('li', undefined, item);
    rightsList.appendChild(li);
  });
  const rightsP2 = createElement('p', undefined, 'To exercise any of these rights, please contact us using the information provided below.');
  rights.appendChild(rightsTitle);
  rights.appendChild(rightsP);
  rights.appendChild(rightsList);
  rights.appendChild(rightsP2);
  content.appendChild(rights);

  // Contact
  const contact = createElement('section', 'privacy-page__section');
  const contactTitle = createElement('h2', undefined, 'Contact Us');
  const contactP = createElement('p', undefined, 'If you have any questions about this Privacy Policy or our data practices, please contact us at:');
  const contactInfo = createElement('div', 'privacy-page__contact');
  const contactEmail = createElement('p');
  contactEmail.textContent = 'Email: ';
  const emailLink = createElement('a');
  emailLink.href = 'mailto:privacy@realhouseiq.com';
  emailLink.textContent = 'privacy@realhouseiq.com';
  contactEmail.appendChild(emailLink);
  const contactPhone = createElement('p', undefined, 'Phone: +964 750 792 2138');
  const contactAddress = createElement('p', undefined, 'Address: Dream City, Erbil, Kurdistan Region, Iraq');
  contactInfo.appendChild(contactEmail);
  contactInfo.appendChild(contactPhone);
  contactInfo.appendChild(contactAddress);
  contact.appendChild(contactTitle);
  contact.appendChild(contactP);
  contact.appendChild(contactInfo);
  content.appendChild(contact);

  container.appendChild(content);
  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── Terms of Service Page ────────────────────────────────────────────────
export function renderTermsPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'terms-page');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'terms-page__header');
  const title = createElement('h1', 'terms-page__title', 'Terms of Service');
  const lastUpdated = createElement('p', 'terms-page__date', 'Last Updated: February 2026');
  header.appendChild(title);
  header.appendChild(lastUpdated);
  container.appendChild(header);

  // Content
  const content = createElement('div', 'terms-page__content');

  // Agreement
  const agreement = createElement('section', 'terms-page__section');
  const agreementTitle = createElement('h2', undefined, 'Agreement to Terms');
  const agreementP1 = createElement('p', undefined, 'By accessing or using the Real House website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.');
  const agreementP2 = createElement('p', undefined, 'These Terms of Service apply to all visitors, users, and others who access or use our services. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting.');
  agreement.appendChild(agreementTitle);
  agreement.appendChild(agreementP1);
  agreement.appendChild(agreementP2);
  content.appendChild(agreement);

  // Use of Service
  const useService = createElement('section', 'terms-page__section');
  const useServiceTitle = createElement('h2', undefined, 'Use of Service');
  const useServiceP1 = createElement('p', undefined, 'Our services are intended to provide information about luxury real estate properties and connect potential buyers with property listings. You agree to use our services only for lawful purposes and in accordance with these Terms.');
  const useServiceP2 = createElement('p', undefined, 'You agree not to:');
  const useServiceList = createElement('ul');
  const useServiceItems = [
    'Use the service for any unlawful purpose or in violation of any applicable laws',
    'Attempt to gain unauthorized access to any portion of the service or any systems',
    'Interfere with or disrupt the service or servers connected to the service',
    'Use any robot, spider, or other automatic device to access the service',
    'Transmit any viruses, worms, or other malicious code',
    'Collect or harvest any personally identifiable information from other users',
    'Impersonate any person or entity or misrepresent your affiliation'
  ];
  useServiceItems.forEach(item => {
    const li = createElement('li', undefined, item);
    useServiceList.appendChild(li);
  });
  useService.appendChild(useServiceTitle);
  useService.appendChild(useServiceP1);
  useService.appendChild(useServiceP2);
  useService.appendChild(useServiceList);
  content.appendChild(useService);

  // Property Listings
  const listings = createElement('section', 'terms-page__section');
  const listingsTitle = createElement('h2', undefined, 'Property Listings and Information');
  const listingsP1 = createElement('p', undefined, 'All property information, including but not limited to prices, availability, features, and descriptions, is provided for informational purposes only. While we strive to ensure accuracy, we do not guarantee that all information is complete, accurate, or current.');
  const listingsP2 = createElement('p', undefined, 'Property listings may be subject to change without notice. Prices listed do not include closing costs, taxes, or other fees that may be applicable. All property purchases are subject to separate purchase agreements and due diligence.');
  listings.appendChild(listingsTitle);
  listings.appendChild(listingsP1);
  listings.appendChild(listingsP2);
  content.appendChild(listings);

  // Intellectual Property
  const ip = createElement('section', 'terms-page__section');
  const ipTitle = createElement('h2', undefined, 'Intellectual Property Rights');
  const ipP1 = createElement('p', undefined, 'The Real House website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by Real House, its licensors, or other providers and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.');
  const ipP2 = createElement('p', undefined, 'You may not:');
  const ipList = createElement('ul');
  const ipItems = [
    'Copy, reproduce, or distribute any content without express written permission',
    'Modify, create derivative works based on, or reverse engineer any content',
    'Use any content for commercial purposes without authorization',
    'Remove any copyright or proprietary notices from materials',
    'Transfer content to another person or "mirror" content on any other server'
  ];
  ipItems.forEach(item => {
    const li = createElement('li', undefined, item);
    ipList.appendChild(li);
  });
  ip.appendChild(ipTitle);
  ip.appendChild(ipP1);
  ip.appendChild(ipP2);
  ip.appendChild(ipList);
  content.appendChild(ip);

  // User Accounts
  const accounts = createElement('section', 'terms-page__section');
  const accountsTitle = createElement('h2', undefined, 'User Accounts');
  const accountsP1 = createElement('p', undefined, 'When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.');
  const accountsP2 = createElement('p', undefined, 'You agree to immediately notify us of any unauthorized use of your account or any other security breach. We will not be liable for any loss or damage arising from your failure to comply with this section.');
  accounts.appendChild(accountsTitle);
  accounts.appendChild(accountsP1);
  accounts.appendChild(accountsP2);
  content.appendChild(accounts);

  // Disclaimers
  const disclaimers = createElement('section', 'terms-page__section');
  const disclaimersTitle = createElement('h2', undefined, 'Disclaimers');
  const disclaimersP1 = createElement('p', undefined, 'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.');
  const disclaimersP2 = createElement('p', undefined, 'Real House does not warrant that the service will be uninterrupted, timely, secure, or error-free. We do not warrant the accuracy or reliability of any information obtained through the service.');
  const disclaimersP3 = createElement('p', undefined, 'Real House is not a licensed real estate broker or agent in all jurisdictions and may refer you to licensed professionals for certain transactions.');
  disclaimers.appendChild(disclaimersTitle);
  disclaimers.appendChild(disclaimersP1);
  disclaimers.appendChild(disclaimersP2);
  disclaimers.appendChild(disclaimersP3);
  content.appendChild(disclaimers);

  // Limitation of Liability
  const liability = createElement('section', 'terms-page__section');
  const liabilityTitle = createElement('h2', undefined, 'Limitation of Liability');
  const liabilityP1 = createElement('p', undefined, 'TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, REAL HOUSE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.');
  const liabilityP2 = createElement('p', undefined, 'In no event shall our total liability exceed the amount you have paid to us in the twelve (12) months prior to the event giving rise to the liability, or one hundred dollars ($100) if you have not made any payments.');
  liability.appendChild(liabilityTitle);
  liability.appendChild(liabilityP1);
  liability.appendChild(liabilityP2);
  content.appendChild(liability);

  // Indemnification
  const indemnification = createElement('section', 'terms-page__section');
  const indemnificationTitle = createElement('h2', undefined, 'Indemnification');
  const indemnificationP = createElement('p', undefined, 'You agree to defend, indemnify, and hold harmless Real House and its officers, directors, employees, contractors, agents, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys\' fees) arising out of or relating to your violation of these Terms or your use of the service.');
  indemnification.appendChild(indemnificationTitle);
  indemnification.appendChild(indemnificationP);
  content.appendChild(indemnification);

  // Governing Law
  const governing = createElement('section', 'terms-page__section');
  const governingTitle = createElement('h2', undefined, 'Governing Law');
  const governingP = createElement('p', undefined, 'These Terms shall be governed by and construed in accordance with the laws of the Kurdistan Region of Iraq. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Erbil, Kurdistan Region, Iraq.');
  governing.appendChild(governingTitle);
  governing.appendChild(governingP);
  content.appendChild(governing);

  // Changes to Terms
  const changes = createElement('section', 'terms-page__section');
  const changesTitle = createElement('h2', undefined, 'Changes to Terms');
  const changesP = createElement('p', undefined, 'We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after revisions become effective, you agree to be bound by the revised terms.');
  changes.appendChild(changesTitle);
  changes.appendChild(changesP);
  content.appendChild(changes);

  // Contact
  const contact = createElement('section', 'terms-page__section');
  const contactTitle = createElement('h2', undefined, 'Contact Us');
  const contactP = createElement('p', undefined, 'If you have any questions about these Terms of Service, please contact us at:');
  const contactInfo = createElement('div', 'terms-page__contact');
  const contactEmail = createElement('p');
  contactEmail.textContent = 'Email: ';
  const emailLink = createElement('a');
  emailLink.href = 'mailto:legal@realhouseiq.com';
  emailLink.textContent = 'legal@realhouseiq.com';
  contactEmail.appendChild(emailLink);
  const contactPhone = createElement('p', undefined, 'Phone: +964 750 792 2138');
  const contactAddress = createElement('p', undefined, 'Address: Dream City, Erbil, Kurdistan Region, Iraq');
  contactInfo.appendChild(contactEmail);
  contactInfo.appendChild(contactPhone);
  contactInfo.appendChild(contactAddress);
  contact.appendChild(contactTitle);
  contact.appendChild(contactP);
  contact.appendChild(contactInfo);
  content.appendChild(contact);

  container.appendChild(content);
  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── FAQ Page ─────────────────────────────────────────────────────────────
export function renderFAQPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'faq-page');
  const container = createElement('div', 'container');

  // Header
  const header = createElement('div', 'faq-page__header');
  const title = createElement('h1', 'faq-page__title', 'Frequently Asked Questions');
  const subtitle = createElement('p', 'faq-page__subtitle', 'Find answers to common questions about our services and the home buying process.');
  header.appendChild(title);
  header.appendChild(subtitle);
  container.appendChild(header);

  // FAQ Accordion
  const accordion = createElement('div', 'faq-page__accordion');

  const faqs = [
    {
      question: 'How do I schedule a viewing?',
      answer: 'Scheduling a viewing is easy. Simply navigate to any property listing and click the "Schedule Viewing" button, or contact us directly through our contact page. You can also call our office at +964 750 792 2138. Our agents are available Monday through Friday from 9 AM to 6 PM, and by appointment on weekends. We offer both in-person tours and virtual walkthroughs via video call for your convenience.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'Real House specializes in luxury properties across 15 global markets. Our primary focus areas include Manhattan, The Hamptons, Miami, Los Angeles, San Francisco, and international destinations such as London, Paris, Monaco, and Dubai. We have established networks of trusted partners in each market to ensure seamless service regardless of location. Contact us to discuss your specific geographic preferences.'
    },
    {
      question: 'How does the buying process work?',
      answer: 'Our buying process is designed to be smooth and transparent. It typically involves: 1) Initial consultation to understand your needs and preferences, 2) Property curation where we handpick listings matching your criteria, 3) Private viewings and tours of selected properties, 4) Making an offer with expert negotiation support, 5) Due diligence including inspections and appraisals, 6) Closing with full transaction management support. Our team guides you through every step, typically completing transactions within 30-90 days depending on complexity.'
    },
    {
      question: 'Do you help with financing?',
      answer: 'Yes, we provide comprehensive financing assistance. While Real House is not a lender, we have established relationships with premier private banks, mortgage lenders, and financial institutions specializing in luxury real estate. We can connect you with financing options including jumbo mortgages, portfolio loans, and international financing solutions. Our team can also assist with mortgage pre-approval to strengthen your purchasing position.'
    },
    {
      question: 'What are your fees?',
      answer: 'For buyers, our services are typically free of charge as we receive compensation from the listing side of the transaction. For sellers, our commission structure is competitive and varies based on the property value and market. We offer tiered commission rates for high-value properties and portfolio listings. All fees are transparent and discussed upfront before any agreement. Contact us for a personalized consultation to discuss your specific situation.'
    },
    {
      question: 'Can you help me sell my property?',
      answer: 'Absolutely. We offer comprehensive selling services including professional photography and videography, virtual tours, targeted marketing to our network of qualified buyers, staging consultations, and expert pricing strategy. Our properties receive exposure through our website, partner networks, and exclusive luxury real estate platforms. Our average time to sell is significantly below market average for comparable properties.'
    },
    {
      question: 'Do you work with international buyers?',
      answer: 'Yes, we have extensive experience working with international buyers and investors. We understand the unique requirements including visa considerations, foreign national financing, tax implications, and currency exchange. Our multilingual team can assist clients from around the world, and we have established processes for remote transactions including virtual tours, digital document signing, and coordination with international attorneys and financial institutions.'
    },
    {
      question: 'What makes Real House different from other agencies?',
      answer: 'Real House combines over 24 years of experience with a personalized, white-glove approach to luxury real estate. Unlike large agencies, we maintain a curated portfolio ensuring quality over quantity. Our agents specialize exclusively in luxury properties and provide dedicated attention to each client. We offer access to off-market listings, a global network of partners, and comprehensive concierge services including relocation assistance, interior design referrals, and property management connections.'
    }
  ];

  faqs.forEach((faq) => {
    const item = createElement('div', 'faq-page__item');
    item.setAttribute('data-faq-item', '');

    const question = createElement('button', 'faq-page__question');
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('data-faq-trigger', '');

    const questionText = createElement('span', 'faq-page__question-text', faq.question);
    question.appendChild(questionText);

    const icon = createElement('span', 'faq-page__icon');
    icon.textContent = '+';
    question.appendChild(icon);

    const answer = createElement('div', 'faq-page__answer');
    answer.setAttribute('data-faq-answer', '');
    const answerContent = createElement('div', 'faq-page__answer-content');
    const answerP = createElement('p', undefined, faq.answer);
    answerContent.appendChild(answerP);
    answer.appendChild(answerContent);

    // Add click handler for accordion functionality
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      // Close all other items
      accordion.querySelectorAll('.faq-page__item').forEach(otherItem => {
        const otherQuestion = otherItem.querySelector('.faq-page__question');
        const otherAnswer = otherItem.querySelector('.faq-page__answer') as HTMLElement;
        const otherIcon = otherItem.querySelector('.faq-page__icon');
        if (otherQuestion && otherAnswer && otherIcon && otherQuestion !== question) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherAnswer.style.maxHeight = '0';
          otherIcon.textContent = '+';
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      if (isExpanded) {
        question.setAttribute('aria-expanded', 'false');
        (answer as HTMLElement).style.maxHeight = '0';
        icon.textContent = '+';
        item.classList.remove('active');
      } else {
        question.setAttribute('aria-expanded', 'true');
        (answer as HTMLElement).style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '-';
        item.classList.add('active');
      }
    });

    item.appendChild(question);
    item.appendChild(answer);
    accordion.appendChild(item);
  });

  container.appendChild(accordion);

  // Contact CTA
  const cta = createElement('div', 'faq-page__cta');
  const ctaTitle = createElement('h3', undefined, 'Still have questions?');
  const ctaText = createElement('p', undefined, 'Our team is here to help. Contact us for personalized assistance.');
  const ctaBtn = createElement('a', 'btn btn--primary', 'Contact Us');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  cta.appendChild(ctaTitle);
  cta.appendChild(ctaText);
  cta.appendChild(ctaBtn);
  container.appendChild(cta);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── 404 Not Found Page ───────────────────────────────────────────────────
export function render404Page(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'error-page');
  const container = createElement('div', 'container');

  const content = createElement('div', 'error-page__content');

  // Large 404 number
  const errorCode = createElement('h1', 'error-page__code', '404');
  content.appendChild(errorCode);

  // Title
  const title = createElement('h2', 'error-page__title', 'Page Not Found');
  content.appendChild(title);

  // Description
  const description = createElement('p', 'error-page__description',
    'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.');
  content.appendChild(description);

  // Action buttons
  const actions = createElement('div', 'error-page__actions');

  const homeBtn = createElement('a', 'btn btn--primary', 'Back to Home');
  homeBtn.href = '/';
  homeBtn.setAttribute('data-route', '');
  actions.appendChild(homeBtn);

  const propertiesBtn = createElement('a', 'btn btn--outline', 'View Properties');
  propertiesBtn.href = '/properties';
  propertiesBtn.setAttribute('data-route', '');
  actions.appendChild(propertiesBtn);

  content.appendChild(actions);

  // Contact info
  const contactInfo = createElement('p', 'error-page__contact');
  contactInfo.textContent = 'Need help? ';
  const contactLink = createElement('a');
  contactLink.href = '/contact';
  contactLink.setAttribute('data-route', '');
  contactLink.textContent = 'Contact our team';
  contactInfo.appendChild(contactLink);
  content.appendChild(contactInfo);

  container.appendChild(content);
  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}
