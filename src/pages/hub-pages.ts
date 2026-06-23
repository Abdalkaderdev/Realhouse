// ═══════════════════════════════════════════════════════════════════════════
// Hub Pages — Cinematic, Unique Per Hub
// /buy, /rent, /invest, /luxury
// ═══════════════════════════════════════════════════════════════════════════

import { properties, type Property, formatPrice } from '../data/properties';
import { projects, formatPriceRange } from '../data/projects';
import { blogPosts } from '../data/blog';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  getBuyBreadcrumbs,
  getRentBreadcrumbs,
  getInvestBreadcrumbs,
  getLuxuryBreadcrumbs
} from '../components/internal-linking';

// ─── Helpers ──────────────────────────────────────────────────────────────
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

// ─── Property Card ────────────────────────────────────────────────────────
function createHubPropertyCard(property: Property): HTMLElement {
  const card = createElement('a', 'hub-property-card');
  card.href = `/properties/${property.id}`;
  card.setAttribute('data-route', '');

  const imageWrapper = createElement('div', 'hub-property-card__image-wrapper');
  const img = createElement('img', 'hub-property-card__image') as HTMLImageElement;
  img.src = property.images[0];
  img.alt = `${property.title} - ${property.type} ${property.status.toLowerCase()} in ${property.location.district}, Erbil`;
  img.width = 400;
  img.height = 300;
  img.loading = 'lazy';
  imageWrapper.appendChild(img);

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

  const content = createElement('div', 'hub-property-card__content');
  content.appendChild(createElement('span', 'hub-property-card__type', property.type));
  content.appendChild(createElement('h3', 'hub-property-card__title', property.title));

  const location = createElement('p', 'hub-property-card__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${property.location.district}, ${property.location.city}`));
  content.appendChild(location);

  const specs = createElement('div', 'hub-property-card__specs');
  [
    { icon: 'icon-bed', value: `${property.specs.beds} Beds` },
    { icon: 'icon-bath', value: `${property.specs.baths} Baths` },
    { icon: 'icon-area', value: `${property.specs.sqm.toLocaleString()} m²` }
  ].forEach(spec => {
    const specEl = createElement('span', 'hub-property-card__spec');
    specEl.appendChild(createSVGUse(spec.icon));
    specEl.appendChild(document.createTextNode(spec.value));
    specs.appendChild(specEl);
  });
  content.appendChild(specs);

  const price = createElement('div', 'hub-property-card__price');
  if (property.price > 0) {
    price.textContent = formatPrice(property.price);
    if (property.status === 'For Rent') price.textContent += '/month';
  } else {
    price.textContent = 'Contact for Price';
  }
  content.appendChild(price);

  card.appendChild(content);
  return card;
}

// ─── Cinematic Hero ──────────────────────────────────────────────────────
interface HubHeroConfig {
  variant: 'buy' | 'rent' | 'invest' | 'luxury';
  eyebrow: string;
  titlePre: string;
  titleEm: string;
  titlePost?: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

function createHubHero(config: HubHeroConfig): HTMLElement {
  const hero = createElement('section', `hub-hero hub-hero--${config.variant}`);

  // Background image
  const bg = createElement('div', 'hub-hero__background');
  const img = createElement('img', 'hub-hero__image') as HTMLImageElement;
  img.src = config.image;
  img.alt = config.imageAlt;
  img.loading = 'eager';
  img.decoding = 'async';
  img.width = 1920;
  img.height = 1080;
  bg.appendChild(img);
  hero.appendChild(bg);

  // Themed visual layer (each hub has a different decorative overlay)
  const visual = createElement('div', 'hub-hero__visual');
  hero.appendChild(visual);

  // Gradient overlay
  hero.appendChild(createElement('div', 'hub-hero__overlay'));

  // Content
  const content = createElement('div', 'hub-hero__content');

  const eyebrow = createElement('div', 'hub-hero__eyebrow');
  eyebrow.appendChild(createElement('span', 'hub-hero__eyebrow-line'));
  eyebrow.appendChild(createElement('span', 'hub-hero__eyebrow-text', config.eyebrow));
  eyebrow.appendChild(createElement('span', 'hub-hero__eyebrow-line'));
  content.appendChild(eyebrow);

  const title = createElement('h1', 'hub-hero__title');
  title.appendChild(document.createTextNode(config.titlePre + ' '));
  const em = createElement('em', 'hub-hero__title-em', config.titleEm);
  title.appendChild(em);
  if (config.titlePost) title.appendChild(document.createTextNode(' ' + config.titlePost));
  content.appendChild(title);

  content.appendChild(createElement('p', 'hub-hero__subtitle', config.subtitle));

  const cta = createElement('div', 'hub-hero__cta');
  const primary = createElement('a', 'btn btn--primary btn--lg', config.primaryCta.label);
  primary.href = config.primaryCta.href;
  primary.setAttribute('data-route', '');
  cta.appendChild(primary);
  if (config.secondaryCta) {
    const secondary = createElement('a', 'btn btn--ghost btn--lg', config.secondaryCta.label);
    secondary.href = config.secondaryCta.href;
    secondary.setAttribute('data-route', '');
    cta.appendChild(secondary);
  }
  content.appendChild(cta);

  hero.appendChild(content);

  // Scroll indicator
  const scroll = createElement('div', 'hub-hero__scroll');
  scroll.appendChild(createElement('span', 'hub-hero__scroll-text', 'Scroll'));
  scroll.appendChild(createElement('span', 'hub-hero__scroll-line'));
  hero.appendChild(scroll);

  return hero;
}

// ─── Stats Strip ────────────────────────────────────────────────────────
interface HubStat { value: string; label: string; sub?: string; }

function createHubStats(stats: HubStat[], variant: string): HTMLElement {
  const section = createElement('section', `hub-stats hub-stats--${variant}`);
  const container = createElement('div', 'container');
  const grid = createElement('div', 'hub-stats__grid');
  stats.forEach((stat, i) => {
    const item = createElement('div', 'hub-stats__item');
    item.style.setProperty('--i', String(i));
    item.appendChild(createElement('span', 'hub-stats__value', stat.value));
    item.appendChild(createElement('span', 'hub-stats__label', stat.label));
    if (stat.sub) item.appendChild(createElement('span', 'hub-stats__sub', stat.sub));
    grid.appendChild(item);
  });
  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── Why Choose ──────────────────────────────────────────────────────────
interface HubReason { icon: string; title: string; desc: string; }

function createWhyChoose(title: string, reasons: HubReason[], variant: string): HTMLElement {
  const section = createElement('section', `hub-why hub-why--${variant}`);
  const container = createElement('div', 'container');

  const header = createElement('div', 'hub-why__header');
  header.appendChild(createElement('span', 'hub-why__eyebrow', 'Why Choose Us'));
  header.appendChild(createElement('h2', 'hub-why__title', title));
  container.appendChild(header);

  const grid = createElement('div', 'hub-why__grid');
  reasons.forEach(r => {
    const card = createElement('article', 'hub-why__card');
    const iconWrap = createElement('div', 'hub-why__icon');
    iconWrap.appendChild(createSVGUse(r.icon));
    card.appendChild(iconWrap);
    card.appendChild(createElement('h3', 'hub-why__card-title', r.title));
    card.appendChild(createElement('p', 'hub-why__card-desc', r.desc));
    grid.appendChild(card);
  });
  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── Quick Filter Chips ──────────────────────────────────────────────────
interface FilterChip { label: string; href: string; }

function createFilterChips(label: string, chips: FilterChip[]): HTMLElement {
  const wrap = createElement('section', 'hub-chips');
  const container = createElement('div', 'container');
  container.appendChild(createElement('span', 'hub-chips__label', label));
  const list = createElement('div', 'hub-chips__list');
  chips.forEach(c => {
    const a = createElement('a', 'hub-chips__chip', c.label);
    a.href = c.href;
    a.setAttribute('data-route', '');
    list.appendChild(a);
  });
  container.appendChild(list);
  wrap.appendChild(container);
  return wrap;
}

// ─── Featured Properties Carousel ────────────────────────────────────────
function createFeaturedCarousel(title: string, subtitle: string, props: Property[], variant: string): HTMLElement {
  const section = createElement('section', `hub-carousel hub-carousel--${variant}`);
  const container = createElement('div', 'container');

  const header = createElement('div', 'hub-carousel__header');
  const headerText = createElement('div');
  headerText.appendChild(createElement('h2', 'hub-carousel__title', title));
  headerText.appendChild(createElement('p', 'hub-carousel__subtitle', subtitle));
  header.appendChild(headerText);

  const controls = createElement('div', 'hub-carousel__controls');
  const prevBtn = createElement('button', 'hub-carousel__nav hub-carousel__nav--prev');
  prevBtn.setAttribute('aria-label', 'Previous properties');
  prevBtn.appendChild(createSVGUse('icon-arrow-left'));
  const nextBtn = createElement('button', 'hub-carousel__nav hub-carousel__nav--next');
  nextBtn.setAttribute('aria-label', 'Next properties');
  nextBtn.appendChild(createSVGUse('icon-arrow-right'));
  controls.appendChild(prevBtn);
  controls.appendChild(nextBtn);
  header.appendChild(controls);
  container.appendChild(header);

  const track = createElement('div', 'hub-carousel__track');
  props.forEach(p => {
    const slide = createElement('div', 'hub-carousel__slide');
    slide.appendChild(createHubPropertyCard(p));
    track.appendChild(slide);
  });
  container.appendChild(track);

  // Carousel scroll behavior
  setTimeout(() => {
    const scrollByAmount = () => Math.min(track.clientWidth * 0.8, 600);
    prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollByAmount(), behavior: 'smooth' }));
  }, 0);

  section.appendChild(container);
  return section;
}

// ─── Related Content ─────────────────────────────────────────────────────
interface RelatedLink { name: string; url: string; description: string; }

function createRelatedSection(title: string, links: RelatedLink[]): HTMLElement {
  const section = createElement('section', 'hub-related');
  const container = createElement('div', 'container');
  container.appendChild(createElement('h2', 'hub-related__title', title));
  const grid = createElement('div', 'hub-related__grid');
  links.forEach(link => {
    const card = createElement('a', 'hub-related__card');
    card.href = link.url;
    card.setAttribute('data-route', '');
    card.appendChild(createElement('h3', 'hub-related__card-title', link.name));
    card.appendChild(createElement('p', 'hub-related__card-desc', link.description));
    const arrow = createElement('span', 'hub-related__arrow');
    arrow.appendChild(createSVGUse('icon-arrow-right'));
    card.appendChild(arrow);
    grid.appendChild(card);
  });
  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// BUY PAGE — Aspirational Ownership
// ═══════════════════════════════════════════════════════════════════════════

export function renderBuyPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getBuyBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'hub-page-v2 hub-page-v2--buy');
  const forSale = properties.filter(p => p.status === 'For Sale');

  // Hero
  page.appendChild(createHubHero({
    variant: 'buy',
    eyebrow: 'Houses for Sale Erbil',
    titlePre: 'Find Your',
    titleEm: 'Forever Home',
    subtitle: 'Aspirational ownership starts here. Discover hand-picked houses for sale Erbil, villas Erbil Iraq, and luxury homes Kurdistan that match the life you imagine.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80&fm=webp',
    imageAlt: 'Modern family home with warm lighting at dusk',
    primaryCta: { label: 'Browse Homes', href: '/properties?status=For%20Sale' },
    secondaryCta: { label: 'Talk to an Expert', href: '/contact' }
  }));

  const container = createElement('div', 'container');
  container.appendChild(createBreadcrumbs(breadcrumbs));
  page.appendChild(container);

  // Stats
  const districts = new Set(forSale.map(p => p.location.district)).size;
  const minPrice = Math.min(...forSale.filter(p => p.price > 0).map(p => p.price));
  page.appendChild(createHubStats([
    { value: `${forSale.length}+`, label: 'Homes For Sale', sub: 'Verified listings' },
    { value: `${districts}`, label: 'Districts', sub: 'Across Erbil' },
    { value: `${Math.round(minPrice / 1000)}K`, label: 'Starting From', sub: 'USD' },
    { value: '24h', label: 'Average Response', sub: 'From our agents' }
  ], 'buy'));

  // Quick filter chips
  page.appendChild(createFilterChips('Quick filters', [
    { label: 'Villas', href: '/properties?type=Villa&status=For%20Sale' },
    { label: 'Apartments', href: '/properties?type=Apartment&status=For%20Sale' },
    { label: 'Penthouses', href: '/properties?type=Penthouse&status=For%20Sale' },
    { label: 'Duplexes', href: '/properties?type=Duplex&status=For%20Sale' },
    { label: 'Under $200K', href: '/properties?status=For%20Sale&price=Under%20%24200K' },
    { label: 'Move-in Ready', href: '/properties?status=For%20Sale&ready=true' },
    { label: 'Family Friendly', href: '/properties?status=For%20Sale&beds=3%2B' }
  ]));

  // Why Choose Buy
  page.appendChild(createWhyChoose('Why buy with Real House', [
    { icon: 'icon-shield', title: 'Verified Ownership', desc: 'Every listing legally vetted and title-checked before it reaches you.' },
    { icon: 'icon-award', title: 'Negotiation Power', desc: 'Our agents have closed thousands of deals — and bring that leverage to your offer.' },
    { icon: 'icon-lock', title: 'Move-in Support', desc: 'From mortgage intros to handover, we walk you through every step to the keys.' },
    { icon: 'icon-home', title: 'Family-First Picks', desc: 'School zones, parks, and community fit weighed alongside square footage.' }
  ], 'buy'));

  // Featured properties carousel
  page.appendChild(createFeaturedCarousel(
    'Featured Homes For Sale',
    'Hand-picked from this week’s market — schedule a viewing before they’re gone.',
    forSale.slice(0, 10),
    'buy'
  ));

  // Related
  page.appendChild(createRelatedSection('Helpful resources for buyers', [
    { name: 'How to Buy Property in Erbil', url: '/blog/how-to-buy-property-in-erbil', description: 'Step-by-step buyer guide tailored to the Erbil market.' },
    { name: 'New Development Projects', url: '/projects', description: 'Off-plan villas and apartments with payment plans.' },
    { name: 'Mortgage Calculator', url: '/mortgage-calculator', description: 'Estimate your monthly payment before you offer.' },
    { name: 'Renting Instead?', url: '/rent', description: 'Flexible apartments and villas for rent across Erbil.' }
  ]));

  fragment.appendChild(page);
  return fragment;
}

export function setupBuyPageSEO(): void {
  document.title = 'Houses for Sale Erbil | Find Your Forever Home | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Houses for sale Erbil - Find property Erbil with best real estate agent Erbil. Browse apartments, villas, penthouses across Erbil and Kurdistan.');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// RENT PAGE — Flexibility & Modern Living
// ═══════════════════════════════════════════════════════════════════════════

export function renderRentPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getRentBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'hub-page-v2 hub-page-v2--rent');
  const forRent = properties.filter(p => p.status === 'For Rent');

  page.appendChild(createHubHero({
    variant: 'rent',
    eyebrow: 'Apartments Erbil Iraq',
    titlePre: 'Discover Your',
    titleEm: 'Next Home',
    subtitle: 'Flexible living, beautifully done. Move into modern apartments and furnished villas across Erbil — short stays, long leases, your call.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80&fm=webp',
    imageAlt: 'Bright modern apartment interior with floor-to-ceiling windows',
    primaryCta: { label: 'Browse Rentals', href: '/properties?status=For%20Rent' },
    secondaryCta: { label: 'Furnished Only', href: '/properties?status=For%20Rent&furnished=true' }
  }));

  const container = createElement('div', 'container');
  container.appendChild(createBreadcrumbs(breadcrumbs));
  page.appendChild(container);

  const validRent = forRent.filter(p => p.price > 0);
  const avgRent = validRent.length > 0
    ? Math.round(validRent.reduce((s, p) => s + p.price, 0) / validRent.length)
    : 0;
  const types = new Set(forRent.map(p => p.type)).size;

  page.appendChild(createHubStats([
    { value: `${forRent.length}+`, label: 'Available Rentals', sub: 'Updated daily' },
    { value: `${types}`, label: 'Property Types', sub: 'Studios to villas' },
    { value: `$${avgRent.toLocaleString()}`, label: 'Avg. Monthly', sub: 'Across Erbil' },
    { value: '48h', label: 'Move-In Window', sub: 'On furnished units' }
  ], 'rent'));

  page.appendChild(createFilterChips('Quick filters', [
    { label: 'Studios', href: '/properties?type=Studio&status=For%20Rent' },
    { label: '1 Bedroom', href: '/properties?status=For%20Rent&beds=1' },
    { label: '2 Bedroom', href: '/properties?status=For%20Rent&beds=2' },
    { label: 'Furnished', href: '/properties?status=For%20Rent&furnished=true' },
    { label: 'Pet Friendly', href: '/properties?status=For%20Rent&pets=true' },
    { label: 'Short Stay', href: '/properties?status=For%20Rent&term=short' },
    { label: 'Under $1,000/mo', href: '/properties?status=For%20Rent&price=Under%20%241K' }
  ]));

  page.appendChild(createWhyChoose('Why rent with Real House', [
    { icon: 'icon-lock', title: 'Flexible Leases', desc: 'Month-to-month, 6-month, or annual — choose the term that fits your life.' },
    { icon: 'icon-shield', title: 'Verified Landlords', desc: 'No scams, no surprises. Every host is background-checked and rated.' },
    { icon: 'icon-home', title: 'Move-in Ready', desc: 'Furnished and serviced options ready for tonight, not next month.' },
    { icon: 'icon-award', title: 'Digital Contracts', desc: 'Sign, pay, and get keys without leaving your laptop.' }
  ], 'rent'));

  page.appendChild(createFeaturedCarousel(
    'Featured Rentals',
    'Modern apartments and villas ready to move in.',
    forRent.slice(0, 10),
    'rent'
  ));

  page.appendChild(createRelatedSection('Helpful resources for renters', [
    { name: 'Expat Living in Erbil', url: '/blog/expat-guide-to-living-in-erbil', description: 'Everything new arrivals need to know about renting in Erbil.' },
    { name: 'Neighborhood Guides', url: '/locations', description: 'Find the right district for your lifestyle and commute.' },
    { name: 'List Your Property', url: '/list-property', description: 'Earn rental income with verified listings.' },
    { name: 'Thinking of Buying?', url: '/buy', description: 'Explore homes for sale when you’re ready to settle down.' }
  ]));

  fragment.appendChild(page);
  return fragment;
}

export function setupRentPageSEO(): void {
  document.title = 'Apartments for Rent in Erbil | Discover Your Next Home | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Rent apartments Erbil Iraq, villas, and penthouses. Flexible terms, verified listings, move-in ready homes across the Erbil property market.');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// INVEST PAGE — ROI Focus + ROI Calculator
// ═══════════════════════════════════════════════════════════════════════════

function createROICalculator(): HTMLElement {
  const section = createElement('section', 'hub-roi');
  const container = createElement('div', 'container');

  const header = createElement('div', 'hub-roi__header');
  header.appendChild(createElement('span', 'hub-roi__eyebrow', 'Smart Tools'));
  header.appendChild(createElement('h2', 'hub-roi__title', 'Project your real estate returns'));
  header.appendChild(createElement('p', 'hub-roi__subtitle', 'Enter a property price, expected monthly rent, and your investment horizon. We’ll estimate your projected return.'));
  container.appendChild(header);

  const card = createElement('div', 'hub-roi__card');

  const form = createElement('form', 'hub-roi__form');

  const fields: { id: string; label: string; placeholder: string; defaultValue: string; prefix?: string; suffix?: string }[] = [
    { id: 'roi-price', label: 'Property Price', placeholder: '250000', defaultValue: '250000', prefix: '$' },
    { id: 'roi-rent', label: 'Expected Monthly Rent', placeholder: '1800', defaultValue: '1800', prefix: '$' },
    { id: 'roi-years', label: 'Investment Horizon', placeholder: '5', defaultValue: '5', suffix: 'yrs' }
  ];

  fields.forEach(f => {
    const group = createElement('div', 'hub-roi__field');
    const label = createElement('label', 'hub-roi__label', f.label);
    label.htmlFor = f.id;
    group.appendChild(label);

    const inputWrap = createElement('div', 'hub-roi__input-wrap');
    if (f.prefix) inputWrap.appendChild(createElement('span', 'hub-roi__affix hub-roi__affix--prefix', f.prefix));
    const input = createElement('input', 'hub-roi__input') as HTMLInputElement;
    input.type = 'number';
    input.id = f.id;
    input.name = f.id;
    input.placeholder = f.placeholder;
    input.value = f.defaultValue;
    input.min = '0';
    input.inputMode = 'numeric';
    inputWrap.appendChild(input);
    if (f.suffix) inputWrap.appendChild(createElement('span', 'hub-roi__affix hub-roi__affix--suffix', f.suffix));
    group.appendChild(inputWrap);
    form.appendChild(group);
  });

  card.appendChild(form);

  const result = createElement('div', 'hub-roi__result');
  const resultLeft = createElement('div', 'hub-roi__result-block');
  resultLeft.appendChild(createElement('span', 'hub-roi__result-label', 'Projected Return'));
  const projectedEl = createElement('span', 'hub-roi__result-value', '$0');
  projectedEl.id = 'roi-projected';
  resultLeft.appendChild(projectedEl);
  result.appendChild(resultLeft);

  const resultMid = createElement('div', 'hub-roi__result-block');
  resultMid.appendChild(createElement('span', 'hub-roi__result-label', 'Total Rental Income'));
  const rentalEl = createElement('span', 'hub-roi__result-value', '$0');
  rentalEl.id = 'roi-rental';
  resultMid.appendChild(rentalEl);
  result.appendChild(resultMid);

  const resultRight = createElement('div', 'hub-roi__result-block');
  resultRight.appendChild(createElement('span', 'hub-roi__result-label', 'Annual Yield'));
  const yieldEl = createElement('span', 'hub-roi__result-value', '0%');
  yieldEl.id = 'roi-yield';
  resultRight.appendChild(yieldEl);
  result.appendChild(resultRight);

  card.appendChild(result);

  const note = createElement('p', 'hub-roi__note', 'Estimate assumes 5% annual property appreciation. Speak to our advisors for a personalized projection.');
  card.appendChild(note);

  container.appendChild(card);
  section.appendChild(container);

  // Live calculation
  setTimeout(() => {
    const priceInput = document.getElementById('roi-price') as HTMLInputElement | null;
    const rentInput = document.getElementById('roi-rent') as HTMLInputElement | null;
    const yearsInput = document.getElementById('roi-years') as HTMLInputElement | null;
    const projected = document.getElementById('roi-projected');
    const rental = document.getElementById('roi-rental');
    const yld = document.getElementById('roi-yield');
    if (!priceInput || !rentInput || !yearsInput || !projected || !rental || !yld) return;

    const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

    const calc = () => {
      const price = Math.max(0, parseFloat(priceInput.value) || 0);
      const rent = Math.max(0, parseFloat(rentInput.value) || 0);
      const years = Math.max(0, parseFloat(yearsInput.value) || 0);
      const totalRent = rent * 12 * years;
      const appreciation = price * (Math.pow(1.05, years) - 1);
      const total = totalRent + appreciation;
      const annualYield = price > 0 ? ((rent * 12) / price) * 100 : 0;
      projected.textContent = fmt(total);
      rental.textContent = fmt(totalRent);
      yld.textContent = annualYield.toFixed(1) + '%';
    };

    [priceInput, rentInput, yearsInput].forEach(i => i.addEventListener('input', calc));
    calc();
  }, 0);

  return section;
}

export function renderInvestPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getInvestBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'hub-page-v2 hub-page-v2--invest');

  const investProps = properties.filter(p =>
    p.badges?.includes('Installment') ||
    p.status === 'Off Plan' ||
    p.price >= 300000
  );

  page.appendChild(createHubHero({
    variant: 'invest',
    eyebrow: 'Real Estate Erbil Investment',
    titlePre: 'Build Your',
    titleEm: 'Real Estate Portfolio',
    subtitle: 'High-yield property in one of the region’s fastest-growing markets. Track real returns, secure installments, and diversify into Erbil real estate.',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1920&q=80&fm=webp',
    imageAlt: 'Skyline view of Erbil with modern towers and investment growth concept',
    primaryCta: { label: 'See Investment Properties', href: '/properties?investment=true' },
    secondaryCta: { label: 'Book a Strategy Call', href: '/contact' }
  }));

  const container = createElement('div', 'container');
  container.appendChild(createBreadcrumbs(breadcrumbs));
  page.appendChild(container);

  page.appendChild(createHubStats([
    { value: '8–12%', label: 'Avg. Rental Yield', sub: 'Annualized' },
    { value: '5.2%', label: 'Price Growth', sub: 'Year-over-year' },
    { value: `${projects.length}+`, label: 'Off-Plan Projects', sub: 'With payment plans' },
    { value: '0%', label: 'Capital Gains Tax', sub: 'On primary investments' }
  ], 'invest'));

  page.appendChild(createFilterChips('Quick filters', [
    { label: 'Off-Plan', href: '/properties?status=Off%20Plan' },
    { label: 'Installments', href: '/properties?badge=Installment' },
    { label: 'High Yield', href: '/properties?yield=high' },
    { label: '$300K+', href: '/properties?price=%24300K%2B' },
    { label: 'Commercial', href: '/properties?type=Commercial' },
    { label: 'Pre-Launch', href: '/projects?status=Coming%20Soon' }
  ]));

  page.appendChild(createWhyChoose('Why invest in Erbil real estate', [
    { icon: 'icon-chart', title: 'Compounding Yields', desc: 'Rental income that consistently outperforms regional averages.' },
    { icon: 'icon-shield', title: 'Title-Secured Assets', desc: 'Every investment property comes title-verified and developer-vetted.' },
    { icon: 'icon-award', title: 'Payment Plans', desc: 'Off-plan deals with 5–10 year installments and locked-in pricing.' },
    { icon: 'icon-home', title: 'Portfolio Diversification', desc: 'Residential, commercial, and mixed-use — spread risk like a pro.' }
  ], 'invest'));

  // ROI Calculator
  page.appendChild(createROICalculator());

  // Featured investment properties
  page.appendChild(createFeaturedCarousel(
    'Top Investment Properties',
    'Curated for ROI, capital growth, and installment flexibility.',
    investProps.slice(0, 10),
    'invest'
  ));

  // Featured projects
  const projectsSection = createElement('section', 'hub-projects');
  const projectsContainer = createElement('div', 'container');
  projectsContainer.appendChild(createElement('h2', 'hub-projects__title', 'Off-plan projects worth watching'));
  projectsContainer.appendChild(createElement('p', 'hub-projects__subtitle', 'Lock in today’s prices on tomorrow’s developments.'));
  const projectsGrid = createElement('div', 'hub-projects__grid');
  projects.slice(0, 4).forEach(project => {
    const card = createElement('a', 'hub-projects__card');
    card.href = `/projects/${project.id}`;
    card.setAttribute('data-route', '');

    const imgWrap = createElement('div', 'hub-projects__image-wrapper');
    const img = createElement('img', 'hub-projects__image') as HTMLImageElement;
    img.src = project.images[0];
    img.alt = `${project.name} - ${project.status}`;
    img.loading = 'lazy';
    img.width = 400;
    img.height = 300;
    imgWrap.appendChild(img);
    imgWrap.appendChild(createElement('span', 'hub-projects__badge', project.status));
    card.appendChild(imgWrap);

    const content = createElement('div', 'hub-projects__content');
    content.appendChild(createElement('h3', 'hub-projects__name', project.name));
    content.appendChild(createElement('p', 'hub-projects__location', `${project.location.district}, ${project.location.city}`));
    content.appendChild(createElement('p', 'hub-projects__price', `From ${formatPriceRange(project)}`));
    card.appendChild(content);
    projectsGrid.appendChild(card);
  });
  projectsContainer.appendChild(projectsGrid);
  projectsSection.appendChild(projectsContainer);
  page.appendChild(projectsSection);

  // Investment insights
  const investmentPosts = blogPosts.filter(p =>
    p.category === 'Investment' || p.tags.some(t => t.toLowerCase().includes('invest'))
  ).slice(0, 3);

  if (investmentPosts.length > 0) {
    page.appendChild(createRelatedSection('Investment insights & market reports', investmentPosts.map(p => ({
      name: p.title,
      url: `/blog/${p.slug}`,
      description: p.excerpt.length > 120 ? p.excerpt.substring(0, 120) + '...' : p.excerpt
    }))));
  }

  fragment.appendChild(page);
  return fragment;
}

export function setupInvestPageSEO(): void {
  document.title = 'Build Your Real Estate Portfolio in Erbil | ROI Calculator | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Invest in real estate Erbil. High-yield properties, off-plan projects with installments, and an ROI calculator to project your returns.');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// LUXURY PAGE — Ultra-Premium + Private Viewing
// ═══════════════════════════════════════════════════════════════════════════

function createPrivateViewingForm(): HTMLElement {
  const section = createElement('section', 'hub-private');
  const container = createElement('div', 'container');

  const wrap = createElement('div', 'hub-private__wrap');

  const left = createElement('div', 'hub-private__intro');
  left.appendChild(createElement('span', 'hub-private__eyebrow', 'By Invitation'));
  left.appendChild(createElement('h2', 'hub-private__title', 'Book a private viewing'));
  left.appendChild(createElement('p', 'hub-private__lede', 'Reserved for serious buyers. Tour our most exclusive properties with a senior advisor — discreet, unhurried, and tailored to you.'));

  const perks = createElement('ul', 'hub-private__perks');
  ['White-glove chauffeur on request', 'Private financial briefing', 'After-hours and weekend slots', 'Full discretion guaranteed'].forEach(text => {
    const li = createElement('li', 'hub-private__perk');
    const icon = createElement('span', 'hub-private__perk-icon');
    icon.appendChild(createSVGUse('icon-check'));
    li.appendChild(icon);
    li.appendChild(document.createTextNode(text));
    perks.appendChild(li);
  });
  left.appendChild(perks);
  wrap.appendChild(left);

  const form = createElement('form', 'hub-private__form') as HTMLFormElement;
  form.setAttribute('novalidate', '');

  const fields = [
    { id: 'pv-name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
    { id: 'pv-email', label: 'Email', type: 'email', placeholder: 'you@email.com', required: true },
    { id: 'pv-phone', label: 'Phone', type: 'tel', placeholder: '+964 ...', required: true },
    { id: 'pv-date', label: 'Preferred Date', type: 'date', placeholder: '', required: true }
  ];

  fields.forEach(f => {
    const group = createElement('div', 'hub-private__field');
    const label = createElement('label', 'hub-private__label', f.label);
    label.htmlFor = f.id;
    group.appendChild(label);
    const input = createElement('input', 'hub-private__input') as HTMLInputElement;
    input.type = f.type;
    input.id = f.id;
    input.name = f.id;
    input.placeholder = f.placeholder;
    if (f.required) input.required = true;
    group.appendChild(input);
    form.appendChild(group);
  });

  const selectGroup = createElement('div', 'hub-private__field hub-private__field--full');
  const selectLabel = createElement('label', 'hub-private__label', 'Property Interest');
  selectLabel.htmlFor = 'pv-interest';
  selectGroup.appendChild(selectLabel);
  const select = createElement('select', 'hub-private__input hub-private__select') as HTMLSelectElement;
  select.id = 'pv-interest';
  select.name = 'pv-interest';
  ['Featured Penthouse', 'Private Villa', 'Hilltop Mansion', 'Skyline Apartment', 'Surprise me'].forEach(opt => {
    const option = createElement('option', undefined, opt) as HTMLOptionElement;
    option.value = opt;
    select.appendChild(option);
  });
  selectGroup.appendChild(select);
  form.appendChild(selectGroup);

  const notesGroup = createElement('div', 'hub-private__field hub-private__field--full');
  const notesLabel = createElement('label', 'hub-private__label', 'Notes (optional)');
  notesLabel.htmlFor = 'pv-notes';
  notesGroup.appendChild(notesLabel);
  const textarea = createElement('textarea', 'hub-private__input hub-private__textarea') as HTMLTextAreaElement;
  textarea.id = 'pv-notes';
  textarea.name = 'pv-notes';
  textarea.rows = 3;
  textarea.placeholder = 'Anything we should know in advance?';
  notesGroup.appendChild(textarea);
  form.appendChild(notesGroup);

  const submit = createElement('button', 'btn btn--primary btn--lg hub-private__submit', 'Request Private Viewing');
  submit.type = 'submit';
  form.appendChild(submit);

  const status = createElement('p', 'hub-private__status');
  status.setAttribute('aria-live', 'polite');
  form.appendChild(status);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = form.querySelectorAll<HTMLInputElement>('input[required]');
    let valid = true;
    required.forEach(i => { if (!i.value.trim()) valid = false; });
    if (!valid) {
      status.textContent = 'Please fill in name, email, phone and preferred date.';
      status.classList.add('hub-private__status--error');
      return;
    }
    status.textContent = 'Thank you. A senior advisor will be in touch within 24 hours to confirm your private viewing.';
    status.classList.remove('hub-private__status--error');
    status.classList.add('hub-private__status--success');
    form.reset();
  });

  wrap.appendChild(form);
  container.appendChild(wrap);
  section.appendChild(container);
  return section;
}

export function renderLuxuryPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getLuxuryBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'hub-page-v2 hub-page-v2--luxury');

  const luxuryProps = properties.filter(p =>
    p.price >= 400000 ||
    p.badges?.includes('Exclusive') ||
    p.type === 'Penthouse' ||
    p.type === 'Villa'
  ).sort((a, b) => b.price - a.price);

  page.appendChild(createHubHero({
    variant: 'luxury',
    eyebrow: 'Luxury Homes Kurdistan',
    titlePre: 'Where',
    titleEm: 'Excellence',
    titlePost: 'Lives',
    subtitle: 'A private collection of mansions, sky-high penthouses, and architect-designed villas. Curated for those who expect more than four walls.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80&fm=webp',
    imageAlt: 'Ultra-luxury modern mansion with infinity pool at twilight',
    primaryCta: { label: 'View the Collection', href: '/properties?price=%24400K%2B' },
    secondaryCta: { label: 'Private Viewing', href: '#private-viewing' }
  }));

  const container = createElement('div', 'container');
  container.appendChild(createBreadcrumbs(breadcrumbs));
  page.appendChild(container);

  const avgLux = luxuryProps.length > 0
    ? Math.round(luxuryProps.reduce((s, p) => s + p.price, 0) / luxuryProps.length)
    : 0;
  const maxLux = luxuryProps.length > 0 ? Math.max(...luxuryProps.map(p => p.price)) : 0;

  page.appendChild(createHubStats([
    { value: `${luxuryProps.length}`, label: 'Luxury Listings', sub: 'In the collection' },
    { value: `$${(avgLux / 1000).toFixed(0)}K`, label: 'Avg. Asking', sub: 'USD' },
    { value: `$${(maxLux / 1000000).toFixed(1)}M`, label: 'Top Listing', sub: 'Current price' },
    { value: '24/7', label: 'Concierge', sub: 'Private advisors' }
  ], 'luxury'));

  page.appendChild(createFilterChips('Quick filters', [
    { label: 'Mansions', href: '/properties?type=Villa&price=%24400K%2B' },
    { label: 'Penthouses', href: '/properties?type=Penthouse' },
    { label: 'Architect-Designed', href: '/properties?badge=Exclusive' },
    { label: 'Sea & Skyline', href: '/properties?view=skyline' },
    { label: 'Smart Homes', href: '/properties?smart=true' },
    { label: 'Private Pool', href: '/properties?pool=true' }
  ]));

  page.appendChild(createWhyChoose('The Real House luxury difference', [
    { icon: 'icon-shield', title: 'Absolute Discretion', desc: 'NDAs as standard. Your identity and search history stay private.' },
    { icon: 'icon-lock', title: 'Off-Market Access', desc: 'See properties that never hit a public listing site.' },
    { icon: 'icon-award', title: 'Senior Advisors Only', desc: 'Your search is handled by partners — never juniors or call centers.' },
    { icon: 'icon-home', title: 'Lifestyle Curation', desc: 'Interior designers, security, staff — we connect the dots beyond the keys.' }
  ], 'luxury'));

  page.appendChild(createFeaturedCarousel(
    'The Luxury Collection',
    'Mansions, penthouses, and signature estates currently available.',
    luxuryProps.slice(0, 10),
    'luxury'
  ));

  // Private viewing form (anchor)
  const privateWrap = createElement('div');
  privateWrap.id = 'private-viewing';
  privateWrap.appendChild(createPrivateViewingForm());
  page.appendChild(privateWrap);

  page.appendChild(createRelatedSection('Continue exploring', [
    { name: 'Investment Properties', url: '/invest', description: 'Build wealth alongside your lifestyle.' },
    { name: 'Featured Developments', url: '/projects', description: 'Signature developer collaborations.' },
    { name: 'Buy a Home', url: '/buy', description: 'Browse our full sale catalog.' },
    { name: 'Luxury Living Insights', url: '/blog', description: 'Trends, profiles, and design from our editors.' }
  ]));

  fragment.appendChild(page);
  return fragment;
}

export function setupLuxuryPageSEO(): void {
  document.title = 'Luxury Homes Kurdistan | Where Excellence Lives | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Luxury homes Kurdistan - Private collection of mansions, penthouses, and villas. Discreet service, off-market listings, private viewings.');
  }
}
