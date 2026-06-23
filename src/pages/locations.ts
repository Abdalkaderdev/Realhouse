// ═══════════════════════════════════════════════════════════════════════════
// Location Pages for Real House — Local SEO + Editorial Redesign
// ═══════════════════════════════════════════════════════════════════════════

import {
  districts,
  getDistrictBySlug,
  getPropertiesByDistrict,
  getPropertyCountByDistrict,
  getAveragePriceByDistrict,
  businessNAP,
  type DistrictLocation
} from '../data/locations';
import { properties, getDisplayPrice, formatPrice, type Property } from '../data/properties';
import { isFavorite, toggleFavorite, updateFavoriteButton, updateFavoritesBadge } from '../utils/favorites';
import { t } from '../i18n';

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent !== undefined) node.textContent = textContent;
  return node;
}

function svg(pathD: string, className?: string): SVGSVGElement {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('fill', 'none');
  s.setAttribute('stroke', 'currentColor');
  s.setAttribute('stroke-width', '1.6');
  s.setAttribute('stroke-linecap', 'round');
  s.setAttribute('stroke-linejoin', 'round');
  if (className) s.setAttribute('class', className);
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', pathD);
  s.appendChild(p);
  return s;
}

// Iconography — single-line strokes, refined editorial feel
const ICONS = {
  school: 'M3 10l9-5 9 5-9 5-9-5zM6 12v5c0 1 3 3 6 3s6-2 6-3v-5',
  mall: 'M3 9h18l-1 11H4L3 9zM8 9V6a4 4 0 018 0v3',
  park: 'M12 3l5 8h-3l4 7H6l4-7H7l5-8zM12 18v3',
  hospital: 'M12 4v16M4 12h16M8 8h8v8H8z',
  transit: 'M5 17h14M7 17V5h10v12M8 9h8M9 13h.01M15 13h.01',
  marker: 'M12 21s-7-7.5-7-12a7 7 0 1114 0c0 4.5-7 12-7 12zM12 11a2 2 0 100-4 2 2 0 000 4z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  bed: 'M2 17v-7h20v7M2 14h20M6 10V8a2 2 0 012-2h2v4M14 10V8a2 2 0 012-2h2v4',
  bath: 'M3 12h18v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2zM7 12V6a2 2 0 014 0',
  area: 'M3 3h6v6M21 3h-6v6M21 21h-6v-6M3 21h6v-6',
  check: 'M5 12l4 4 10-10',
  star: 'M12 3l2.7 5.5 6 .9-4.3 4.2 1 6L12 16.8 6.6 19.6l1-6L3.3 9.4l6-.9z',
  trend: 'M3 17l6-6 4 4 8-8M14 7h6v6',
  scale: 'M12 3v18M5 8l7-3 7 3M3 18a4 4 0 008 0L7 8 3 18zM13 18a4 4 0 008 0l-4-10-4 10z',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5',
  close: 'M6 6l12 12M6 18L18 6',
  compass: 'M12 22a10 10 0 100-20 10 10 0 000 20zM15.5 8.5l-2 5-5 2 2-5 5-2z',
};

function iconCheckFilled(): SVGSVGElement {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('fill', 'currentColor');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z');
  s.appendChild(p);
  return s;
}

// ═══════════════════════════════════════════════════════════════════════════
// District categorization (heuristic tags for filter chips)
// ═══════════════════════════════════════════════════════════════════════════

type DistrictTag = 'premium' | 'family' | 'investment' | 'new';

function getDistrictTags(d: DistrictLocation): DistrictTag[] {
  const tags = new Set<DistrictTag>();
  const lifestyle = (d.demographics?.lifestyle || '').toLowerCase();
  const desc = (d.description + ' ' + d.longDescription).toLowerCase();

  if (d.priceRange.max >= 300000 || lifestyle.includes('luxury') || lifestyle.includes('premium')) {
    tags.add('premium');
  }
  if (
    d.propertyTypes.some(p => /villa|townhouse|mansion/i.test(p)) ||
    lifestyle.includes('family') ||
    desc.includes('school') ||
    desc.includes('family')
  ) {
    tags.add('family');
  }
  if (desc.includes('invest') || desc.includes('rental') || desc.includes('yield') || desc.includes('commercial')) {
    tags.add('investment');
  }
  if (desc.includes('new development') || desc.includes('mega-project') || desc.includes('mega project') || desc.includes('upcoming') || desc.includes('under construction')) {
    tags.add('new');
  }
  // Sensible fallback — every district keeps at least one tag
  if (tags.size === 0) tags.add('premium');
  return [...tags];
}

const TAG_LABELS: Record<DistrictTag, string> = {
  premium: 'Premium',
  family: 'Family-friendly',
  investment: 'Investment',
  new: 'New Developments',
};

// ═══════════════════════════════════════════════════════════════════════════
// Locations Index Page
// ═══════════════════════════════════════════════════════════════════════════

export function renderLocationsPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = el('div', 'locations-page');

  page.appendChild(buildHero());
  page.appendChild(buildBreadcrumb());
  page.appendChild(buildStatsStrip());
  page.appendChild(buildFeaturedAreas());
  page.appendChild(buildMapSection());
  page.appendChild(buildFilterableGrid());
  page.appendChild(buildCompareTray());
  page.appendChild(buildCTA());

  fragment.appendChild(page);
  // Defer enhancements until the fragment is in the DOM
  queueMicrotask(() => {
    initParallax();
    initComparison();
    initFilterChips();
    initMapMarkers();
    initRevealOnScroll();
  });
  return fragment;
}

// ─── Cinematic Hero ────────────────────────────────────────────────────────

function buildHero(): HTMLElement {
  const hero = el('section', 'locations-hero');

  const bg = el('div', 'locations-hero__bg');
  const bgImg = el('img', 'locations-hero__image');
  bgImg.src = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2000&q=85&fm=webp';
  bgImg.alt = 'Aerial view of Erbil, Kurdistan';
  bgImg.loading = 'eager';
  (bgImg as HTMLImageElement).decoding = 'async';
  bg.appendChild(bgImg);
  bg.appendChild(el('div', 'locations-hero__veil'));
  bg.appendChild(el('div', 'locations-hero__grain'));
  hero.appendChild(bg);

  const content = el('div', 'locations-hero__content');

  const eyebrow = el('div', 'locations-hero__eyebrow');
  eyebrow.appendChild(el('span', 'locations-hero__rule'));
  eyebrow.appendChild(el('span', 'locations-hero__eyebrow-text', 'ERBIL · KURDISTAN'));
  eyebrow.appendChild(el('span', 'locations-hero__rule'));
  content.appendChild(eyebrow);

  const title = el('h1', 'locations-hero__title');
  const titleLines = [
    { text: 'Explore', em: false },
    { text: 'Erbil’s', em: true },
    { text: 'Districts', em: false },
  ];
  titleLines.forEach((line, i) => {
    const span = el('span', `locations-hero__title-line${line.em ? ' locations-hero__title-line--em' : ''}`);
    span.style.animationDelay = `${0.2 + i * 0.12}s`;
    span.textContent = line.text;
    title.appendChild(span);
  });
  content.appendChild(title);

  const sub = el('p', 'locations-hero__sub', 'A curated atlas of the city’s finest neighborhoods — from the boulevard towers of Gulan to the garden villas of Italian Village.');
  content.appendChild(sub);

  // Inline mini stats
  const mini = el('div', 'locations-hero__mini');
  const totalProps = properties.length;
  const minPrice = Math.min(...districts.map(d => d.priceRange.min));
  [
    { value: `${districts.length}`, label: 'Prime districts' },
    { value: `${totalProps}+`, label: 'Active listings' },
    { value: `${formatPrice(minPrice)}`, label: 'From' },
  ].forEach(s => {
    const item = el('div', 'locations-hero__mini-item');
    item.appendChild(el('span', 'locations-hero__mini-value', s.value));
    item.appendChild(el('span', 'locations-hero__mini-label', s.label));
    mini.appendChild(item);
  });
  content.appendChild(mini);

  hero.appendChild(content);

  const scrollHint = el('div', 'locations-hero__scroll');
  scrollHint.appendChild(el('span', 'locations-hero__scroll-text', 'SCROLL'));
  scrollHint.appendChild(el('span', 'locations-hero__scroll-line'));
  hero.appendChild(scrollHint);

  return hero;
}

// ─── Breadcrumb ────────────────────────────────────────────────────────────

function buildBreadcrumb(): HTMLElement {
  const nav = el('nav', 'locations-page__breadcrumb');
  nav.setAttribute('aria-label', 'Breadcrumb');
  const ol = el('ol', 'breadcrumb');

  const li1 = el('li');
  const a1 = el('a');
  a1.href = '/';
  a1.setAttribute('data-route', '');
  a1.textContent = t('locations.breadcrumbHome');
  li1.appendChild(a1);
  ol.appendChild(li1);

  const li2 = el('li');
  const s2 = el('span');
  s2.setAttribute('aria-current', 'page');
  s2.textContent = t('locations.breadcrumbLocations');
  li2.appendChild(s2);
  ol.appendChild(li2);

  nav.appendChild(ol);
  return nav;
}

// ─── Stats Strip ───────────────────────────────────────────────────────────

function buildStatsStrip(): HTMLElement {
  const section = el('section', 'locations-stats');
  const container = el('div', 'locations-stats__container');

  const prices = districts.flatMap(d => [d.priceRange.min, d.priceRange.max]);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const avgP = Math.round(districts.reduce((sum, d) => sum + d.averagePrice, 0) / districts.length);

  const stats = [
    { value: `${districts.length}`, label: 'Districts mapped', sub: 'across Erbil' },
    { value: `${properties.length}+`, label: 'Curated listings', sub: 'actively for sale' },
    { value: `${formatPrice(avgP)}`, label: 'Average price', sub: 'citywide median' },
    { value: `${formatPrice(minP)} – ${formatPrice(maxP)}`, label: 'Range', sub: 'entry to penthouse' },
  ];

  stats.forEach((s, i) => {
    const item = el('div', 'locations-stats__item');
    item.style.setProperty('--reveal-delay', `${i * 80}ms`);
    item.appendChild(el('span', 'locations-stats__value', s.value));
    item.appendChild(el('span', 'locations-stats__label', s.label));
    item.appendChild(el('span', 'locations-stats__sub', s.sub));
    container.appendChild(item);
  });

  section.appendChild(container);
  return section;
}

// ─── Featured Areas ────────────────────────────────────────────────────────

function buildFeaturedAreas(): HTMLElement {
  const section = el('section', 'locations-featured');
  const container = el('div', 'locations-featured__container');

  const header = el('div', 'locations-featured__header');
  const eyebrow = el('span', 'locations-featured__eyebrow', '· EDITORIAL PICK ·');
  const title = el('h2', 'locations-featured__title', 'Featured Areas');
  const subtitle = el('p', 'locations-featured__subtitle', 'Three of Erbil’s most coveted addresses — chosen for character, capital potential, and a way of living.');
  header.appendChild(eyebrow);
  header.appendChild(title);
  header.appendChild(subtitle);
  container.appendChild(header);

  // Pick top 3 by averagePrice descending, with stable fallback
  const featured = [...districts]
    .sort((a, b) => b.averagePrice - a.averagePrice)
    .slice(0, 3);

  const grid = el('div', 'locations-featured__grid');
  featured.forEach((d, i) => {
    const tags = getDistrictTags(d);
    const card = el('a', 'featured-area-card');
    (card as HTMLAnchorElement).href = `/properties/${d.slug}`;
    card.setAttribute('data-route', '');
    card.style.setProperty('--reveal-delay', `${i * 120}ms`);
    if (i === 0) card.classList.add('featured-area-card--large');

    const media = el('div', 'featured-area-card__media');
    const img = el('img', 'featured-area-card__image') as HTMLImageElement;
    img.src = d.image;
    img.alt = `${d.name}, Erbil`;
    img.loading = 'lazy';
    img.decoding = 'async';
    media.appendChild(img);
    media.appendChild(el('div', 'featured-area-card__gradient'));

    const index = el('span', 'featured-area-card__index', `0${i + 1}`);
    media.appendChild(index);

    const tagRow = el('div', 'featured-area-card__tags');
    tags.slice(0, 2).forEach(tag => {
      const t = el('span', `featured-area-card__tag featured-area-card__tag--${tag}`, TAG_LABELS[tag]);
      tagRow.appendChild(t);
    });
    media.appendChild(tagRow);

    card.appendChild(media);

    const body = el('div', 'featured-area-card__body');
    const heading = el('h3', 'featured-area-card__name');
    heading.appendChild(document.createTextNode(d.name));
    const localized = el('span', 'featured-area-card__name-local', `${d.nameKu} · ${d.nameAr}`);
    heading.appendChild(localized);
    body.appendChild(heading);

    const description = el('p', 'featured-area-card__desc', d.description);
    body.appendChild(description);

    const meta = el('div', 'featured-area-card__meta');
    [
      { label: 'Avg', value: formatPrice(d.averagePrice) },
      { label: 'Listings', value: `${getPropertyCountByDistrict(d.name)}` },
      { label: 'From', value: formatPrice(d.priceRange.min) },
    ].forEach(m => {
      const mItem = el('div', 'featured-area-card__meta-item');
      mItem.appendChild(el('span', 'featured-area-card__meta-label', m.label));
      mItem.appendChild(el('span', 'featured-area-card__meta-value', m.value));
      meta.appendChild(mItem);
    });
    body.appendChild(meta);

    const cta = el('span', 'featured-area-card__cta');
    cta.appendChild(document.createTextNode(`Explore ${d.name}`));
    cta.appendChild(svg(ICONS.arrow));
    body.appendChild(cta);

    card.appendChild(body);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── Interactive Map Section ───────────────────────────────────────────────

function buildMapSection(): HTMLElement {
  const section = el('section', 'locations-map');
  const container = el('div', 'locations-map__container');

  const header = el('div', 'locations-map__header');
  const eyebrow = el('span', 'locations-map__eyebrow', '· INTERACTIVE ATLAS ·');
  const title = el('h2', 'locations-map__title', 'A City, Mapped');
  const subtitle = el('p', 'locations-map__subtitle', t('locations.mapSectionSubtitle'));
  header.appendChild(eyebrow);
  header.appendChild(title);
  header.appendChild(subtitle);
  container.appendChild(header);

  const stage = el('div', 'locations-map__stage');

  // SVG schematic map of Erbil with district hotspots
  const mapWrap = el('div', 'locations-map__canvas');
  mapWrap.innerHTML = `
    <svg viewBox="0 0 800 520" class="locations-map__svg" role="img" aria-label="Schematic map of Erbil districts">
      <defs>
        <radialGradient id="lm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(201,168,76,0.35)"/>
          <stop offset="100%" stop-color="rgba(201,168,76,0)"/>
        </radialGradient>
        <pattern id="lm-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" stroke="rgba(255,255,255,0.04)" fill="none"/>
        </pattern>
      </defs>
      <rect width="800" height="520" fill="url(#lm-grid)"/>
      <circle cx="400" cy="260" r="220" fill="url(#lm-glow)"/>
      <!-- Stylized citadel ring at the heart of Erbil -->
      <circle cx="400" cy="260" r="46" fill="none" stroke="rgba(201,168,76,0.4)" stroke-dasharray="3 6"/>
      <circle cx="400" cy="260" r="22" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.55)"/>
      <text x="400" y="263" text-anchor="middle" fill="rgba(240,237,232,0.65)" font-family="Cormorant, serif" font-size="11" letter-spacing="2">CITADEL</text>
      <!-- Concentric ring roads -->
      <circle cx="400" cy="260" r="130" fill="none" stroke="rgba(255,255,255,0.06)"/>
      <circle cx="400" cy="260" r="200" fill="none" stroke="rgba(255,255,255,0.04)"/>
    </svg>
  `;

  // District markers — calculate positions distributed around the map
  const markerLayer = el('div', 'locations-map__markers');
  districts.forEach((d, i) => {
    const angle = (i / districts.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 38 + (i % 2 === 0 ? 0 : 6); // alternate ring distance
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius * 0.85;

    const marker = el('button', 'map-marker');
    marker.dataset.slug = d.slug;
    marker.style.left = `${x}%`;
    marker.style.top = `${y}%`;
    marker.setAttribute('aria-label', `${d.name}: ${getPropertyCountByDistrict(d.name)} properties`);

    const pulse = el('span', 'map-marker__pulse');
    const dot = el('span', 'map-marker__dot');
    const labelWrap = el('span', 'map-marker__label');
    labelWrap.appendChild(el('span', 'map-marker__name', d.name));
    const badge = el('span', 'map-marker__badge');
    badge.appendChild(document.createTextNode(`${getPropertyCountByDistrict(d.name)} listings`));
    labelWrap.appendChild(badge);

    marker.appendChild(pulse);
    marker.appendChild(dot);
    marker.appendChild(labelWrap);
    markerLayer.appendChild(marker);
  });

  mapWrap.appendChild(markerLayer);
  stage.appendChild(mapWrap);

  // Map detail panel
  const panel = el('aside', 'locations-map__panel');
  panel.id = 'locations-map-panel';
  panel.innerHTML = `
    <div class="locations-map__panel-default">
      <span class="locations-map__panel-eyebrow">Hover a marker</span>
      <h3 class="locations-map__panel-title">A living portrait of Erbil</h3>
      <p class="locations-map__panel-text">Each pin reveals a district’s pulse — current listings, average price per square meter, and the way of living it offers.</p>
      <div class="locations-map__legend">
        <span class="locations-map__legend-item"><span class="locations-map__legend-dot"></span> Active districts</span>
        <span class="locations-map__legend-item"><span class="locations-map__legend-ring"></span> Citadel reference</span>
      </div>
    </div>
  `;
  stage.appendChild(panel);

  container.appendChild(stage);
  section.appendChild(container);
  return section;
}

// ─── Filterable Districts Grid ─────────────────────────────────────────────

function buildFilterableGrid(): HTMLElement {
  const section = el('section', 'locations-grid');
  const container = el('div', 'locations-grid__container');

  const header = el('div', 'locations-grid__header');
  const eyebrow = el('span', 'locations-grid__eyebrow', '· EVERY ADDRESS ·');
  const title = el('h2', 'locations-grid__title', 'All Districts');
  const subtitle = el('p', 'locations-grid__subtitle', 'Filter by lifestyle, compare side-by-side, and step into the streets you may one day call home.');
  header.appendChild(eyebrow);
  header.appendChild(title);
  header.appendChild(subtitle);
  container.appendChild(header);

  // Filter chips
  const chips = el('div', 'locations-grid__chips');
  chips.setAttribute('role', 'tablist');
  const filterList: { id: 'all' | DistrictTag; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'premium', label: TAG_LABELS.premium },
    { id: 'family', label: TAG_LABELS.family },
    { id: 'investment', label: TAG_LABELS.investment },
    { id: 'new', label: TAG_LABELS.new },
  ];
  filterList.forEach((f, i) => {
    const chip = el('button', `locations-chip${i === 0 ? ' locations-chip--active' : ''}`);
    chip.dataset.filter = f.id;
    chip.setAttribute('role', 'tab');
    chip.setAttribute('aria-selected', String(i === 0));
    chip.appendChild(el('span', 'locations-chip__label', f.label));
    const count = el('span', 'locations-chip__count');
    if (f.id === 'all') {
      count.textContent = `${districts.length}`;
    } else {
      count.textContent = `${districts.filter(d => getDistrictTags(d).includes(f.id as DistrictTag)).length}`;
    }
    chip.appendChild(count);
    chips.appendChild(chip);
  });
  container.appendChild(chips);

  // Grid
  const grid = el('div', 'locations-grid__list');
  districts.forEach((d, i) => {
    const card = createDistrictCard(d, getPropertyCountByDistrict(d.name));
    card.style.setProperty('--reveal-delay', `${i * 70}ms`);
    grid.appendChild(card);
  });
  container.appendChild(grid);

  section.appendChild(container);
  return section;
}

// ─── Compare Tray (drawer) ─────────────────────────────────────────────────

function buildCompareTray(): HTMLElement {
  const tray = el('div', 'compare-tray');
  tray.id = 'compare-tray';
  tray.setAttribute('aria-hidden', 'true');

  const inner = el('div', 'compare-tray__inner');

  const head = el('div', 'compare-tray__head');
  const title = el('span', 'compare-tray__title', 'Compare Districts');
  const counter = el('span', 'compare-tray__counter');
  counter.id = 'compare-tray-counter';
  counter.textContent = '0 of 3 selected';
  head.appendChild(title);
  head.appendChild(counter);
  inner.appendChild(head);

  const slots = el('div', 'compare-tray__slots');
  slots.id = 'compare-tray-slots';
  for (let i = 0; i < 3; i++) {
    const slot = el('div', 'compare-tray__slot');
    slot.dataset.index = String(i);
    slot.innerHTML = '<span class="compare-tray__slot-placeholder">Empty</span>';
    slots.appendChild(slot);
  }
  inner.appendChild(slots);

  const actions = el('div', 'compare-tray__actions');
  const compareBtn = el('button', 'compare-tray__btn compare-tray__btn--primary');
  compareBtn.id = 'compare-tray-compare';
  compareBtn.textContent = 'Compare';
  compareBtn.disabled = true;
  const clearBtn = el('button', 'compare-tray__btn compare-tray__btn--ghost');
  clearBtn.id = 'compare-tray-clear';
  clearBtn.textContent = 'Clear';
  actions.appendChild(clearBtn);
  actions.appendChild(compareBtn);
  inner.appendChild(actions);

  tray.appendChild(inner);

  // Comparison modal
  const modal = el('div', 'compare-modal');
  modal.id = 'compare-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="compare-modal__backdrop" data-close></div>
    <div class="compare-modal__card" role="dialog" aria-modal="true" aria-label="Compare districts">
      <button class="compare-modal__close" data-close aria-label="Close comparison">×</button>
      <div class="compare-modal__header">
        <span class="compare-modal__eyebrow">SIDE BY SIDE</span>
        <h3 class="compare-modal__title">District Comparison</h3>
      </div>
      <div class="compare-modal__body" id="compare-modal-body"></div>
    </div>
  `;
  tray.appendChild(modal);

  return tray;
}

// ─── CTA ───────────────────────────────────────────────────────────────────

function buildCTA(): HTMLElement {
  const section = el('section', 'locations-cta');
  const container = el('div', 'locations-cta__container');

  const eyebrow = el('span', 'locations-cta__eyebrow', '· BEGIN THE CONVERSATION ·');
  const title = el('h2', 'locations-cta__title', t('locations.ctaTitle'));
  const text = el('p', 'locations-cta__text', t('locations.ctaText'));

  const buttons = el('div', 'locations-cta__buttons');
  const contactBtn = el('a', 'btn btn--primary btn--large');
  (contactBtn as HTMLAnchorElement).href = '/contact';
  contactBtn.setAttribute('data-route', '');
  contactBtn.textContent = t('locations.ctaContactUs');
  const propertiesBtn = el('a', 'btn btn--ghost btn--large');
  (propertiesBtn as HTMLAnchorElement).href = '/properties';
  propertiesBtn.setAttribute('data-route', '');
  propertiesBtn.textContent = t('locations.ctaViewAllProperties');
  buttons.appendChild(contactBtn);
  buttons.appendChild(propertiesBtn);

  container.appendChild(eyebrow);
  container.appendChild(title);
  container.appendChild(text);
  container.appendChild(buttons);

  section.appendChild(container);
  return section;
}

// ─── District Card ─────────────────────────────────────────────────────────

function createDistrictCard(district: DistrictLocation, propertyCount: number): HTMLElement {
  const card = el('article', 'district-card');
  card.dataset.slug = district.slug;
  card.dataset.tags = getDistrictTags(district).join(',');

  // Image side
  const media = el('div', 'district-card__media');
  const img = el('img', 'district-card__image') as HTMLImageElement;
  img.src = district.image;
  img.alt = `Properties in ${district.name}, Erbil`;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.width = 800;
  img.height = 600;
  media.appendChild(img);
  media.appendChild(el('div', 'district-card__gradient'));

  // Top-left count badge
  const countBadge = el('span', 'district-card__count');
  countBadge.appendChild(document.createTextNode(`${propertyCount}`));
  const countSmall = el('small');
  countSmall.textContent = 'listings';
  countBadge.appendChild(countSmall);
  media.appendChild(countBadge);

  // Compare toggle (top-right)
  const compareBtn = el('button', 'district-card__compare');
  compareBtn.setAttribute('aria-label', `Add ${district.name} to comparison`);
  compareBtn.dataset.slug = district.slug;
  compareBtn.dataset.name = district.name;
  compareBtn.dataset.image = district.image;
  compareBtn.appendChild(svg(ICONS.scale));
  compareBtn.appendChild(el('span', 'district-card__compare-text', 'Compare'));
  media.appendChild(compareBtn);

  card.appendChild(media);

  // Body
  const body = el('div', 'district-card__body');

  // Name + Kurdish/Arabic
  const head = el('div', 'district-card__head');
  const name = el('h3', 'district-card__name', district.name);
  head.appendChild(name);
  const local = el('div', 'district-card__local');
  local.appendChild(el('span', 'district-card__local-ku', district.nameKu));
  local.appendChild(el('span', 'district-card__local-divider', '·'));
  local.appendChild(el('span', 'district-card__local-ar', district.nameAr));
  head.appendChild(local);
  body.appendChild(head);

  // Description
  const desc = el('p', 'district-card__desc', district.description);
  body.appendChild(desc);

  // Stats row — price, avg/sqm, properties
  const avg = getAveragePriceByDistrict(district.name) || district.averagePrice;
  // Estimate $/sqm using a rough 150sqm assumption when not provided
  const pricePerSqm = Math.round(avg / 150);

  const stats = el('div', 'district-card__stats');
  [
    { label: 'From', value: formatPrice(district.priceRange.min) },
    { label: 'USD/sqm', value: `$${pricePerSqm.toLocaleString()}` },
    { label: 'Listings', value: `${propertyCount}` },
  ].forEach(s => {
    const item = el('div', 'district-card__stat');
    item.appendChild(el('span', 'district-card__stat-label', s.label));
    item.appendChild(el('span', 'district-card__stat-value', s.value));
    stats.appendChild(item);
  });
  body.appendChild(stats);

  // Amenities icons
  const amenities = el('div', 'district-card__amenities');
  amenities.setAttribute('aria-label', 'Top amenities');
  const amenityIcons = pickAmenityIcons(district);
  amenityIcons.forEach(a => {
    const item = el('span', 'district-card__amenity');
    item.title = a.label;
    item.appendChild(svg(a.icon));
    item.appendChild(el('span', 'district-card__amenity-label', a.label));
    amenities.appendChild(item);
  });
  body.appendChild(amenities);

  // Tags
  const tagRow = el('div', 'district-card__tags');
  getDistrictTags(district).forEach(tag => {
    const tagEl = el('span', `district-card__tag district-card__tag--${tag}`, TAG_LABELS[tag]);
    tagRow.appendChild(tagEl);
  });
  body.appendChild(tagRow);

  // CTA
  const cta = el('a', 'district-card__cta');
  (cta as HTMLAnchorElement).href = `/properties/${district.slug}`;
  cta.setAttribute('data-route', '');
  cta.appendChild(document.createTextNode(`Explore ${district.name}`));
  cta.appendChild(svg(ICONS.arrow));
  body.appendChild(cta);

  card.appendChild(body);

  return card;
}

function pickAmenityIcons(d: DistrictLocation): Array<{ icon: string; label: string }> {
  const out: Array<{ icon: string; label: string }> = [];
  const combined = [...d.amenities, ...d.nearbyLandmarks].join(' ').toLowerCase();
  if (/school|education|university|college/.test(combined)) out.push({ icon: ICONS.school, label: 'Schools' });
  if (/mall|shopping|retail/.test(combined)) out.push({ icon: ICONS.mall, label: 'Malls' });
  if (/park|garden|green|recreation/.test(combined)) out.push({ icon: ICONS.park, label: 'Parks' });
  if (/hospital|medical|clinic|health/.test(combined)) out.push({ icon: ICONS.hospital, label: 'Healthcare' });
  if (/airport|highway|road|transit|taxi/.test(combined)) out.push({ icon: ICONS.transit, label: 'Transit' });
  // Always show at least 3
  while (out.length < 3) {
    const fallback = { icon: ICONS.compass, label: 'Lifestyle' };
    if (!out.find(o => o.label === fallback.label)) out.push(fallback);
    else break;
  }
  return out.slice(0, 4);
}

// ═══════════════════════════════════════════════════════════════════════════
// Enhancers (parallax, comparison, filters, map markers, reveal)
// ═══════════════════════════════════════════════════════════════════════════

function initParallax(): void {
  const bg = document.querySelector<HTMLElement>('.locations-hero__bg');
  if (!bg) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < 1000) bg.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(${1 + y * 0.0003})`;
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initFilterChips(): void {
  const chips = document.querySelectorAll<HTMLButtonElement>('.locations-chip');
  const cards = document.querySelectorAll<HTMLElement>('.district-card');
  if (!chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => {
        c.classList.remove('locations-chip--active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('locations-chip--active');
      chip.setAttribute('aria-selected', 'true');
      const filter = chip.dataset.filter || 'all';
      cards.forEach(card => {
        const tags = (card.dataset.tags || '').split(',');
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('district-card--hidden', !show);
      });
    });
  });
}

interface CompareState {
  slugs: string[];
}
const compareState: CompareState = { slugs: [] };

function initComparison(): void {
  const tray = document.getElementById('compare-tray');
  const counter = document.getElementById('compare-tray-counter');
  const slotsHost = document.getElementById('compare-tray-slots');
  const compareBtn = document.getElementById('compare-tray-compare') as HTMLButtonElement | null;
  const clearBtn = document.getElementById('compare-tray-clear');
  const modal = document.getElementById('compare-modal');
  if (!tray || !counter || !slotsHost || !compareBtn || !clearBtn || !modal) return;

  function syncTray() {
    if (!tray || !counter || !slotsHost || !compareBtn) return;
    const slots = slotsHost.querySelectorAll<HTMLElement>('.compare-tray__slot');
    slots.forEach((slot, i) => {
      const slug = compareState.slugs[i];
      slot.innerHTML = '';
      if (slug) {
        const d = districts.find(dd => dd.slug === slug);
        if (d) {
          const img = el('img');
          (img as HTMLImageElement).src = d.image;
          (img as HTMLImageElement).alt = d.name;
          img.className = 'compare-tray__slot-img';
          slot.appendChild(img);
          const label = el('span', 'compare-tray__slot-name', d.name);
          slot.appendChild(label);
          const remove = el('button', 'compare-tray__slot-remove');
          remove.setAttribute('aria-label', `Remove ${d.name}`);
          remove.textContent = '×';
          remove.addEventListener('click', () => {
            compareState.slugs = compareState.slugs.filter(s => s !== slug);
            updateCardButtons();
            syncTray();
          });
          slot.appendChild(remove);
          slot.classList.add('compare-tray__slot--filled');
        }
      } else {
        const ph = el('span', 'compare-tray__slot-placeholder', 'Empty');
        slot.appendChild(ph);
        slot.classList.remove('compare-tray__slot--filled');
      }
    });
    counter.textContent = `${compareState.slugs.length} of 3 selected`;
    compareBtn.disabled = compareState.slugs.length < 2;
    tray.classList.toggle('compare-tray--visible', compareState.slugs.length > 0);
    tray.setAttribute('aria-hidden', compareState.slugs.length === 0 ? 'true' : 'false');
  }

  function updateCardButtons() {
    document.querySelectorAll<HTMLButtonElement>('.district-card__compare').forEach(btn => {
      const slug = btn.dataset.slug || '';
      const isSelected = compareState.slugs.includes(slug);
      btn.classList.toggle('district-card__compare--active', isSelected);
      btn.setAttribute('aria-pressed', String(isSelected));
    });
  }

  function bindCardButtons() {
    document.querySelectorAll<HTMLButtonElement>('.district-card__compare').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const slug = btn.dataset.slug || '';
        if (!slug) return;
        if (compareState.slugs.includes(slug)) {
          compareState.slugs = compareState.slugs.filter(s => s !== slug);
        } else if (compareState.slugs.length < 3) {
          compareState.slugs.push(slug);
        } else {
          // shake feedback
          btn.classList.remove('district-card__compare--shake');
          void (btn as HTMLElement).offsetWidth;
          btn.classList.add('district-card__compare--shake');
        }
        updateCardButtons();
        syncTray();
      });
    });
  }

  function openModal() {
    if (compareState.slugs.length < 2) return;
    const body = document.getElementById('compare-modal-body');
    if (!body) return;
    body.innerHTML = '';

    const cols = compareState.slugs
      .map(s => districts.find(d => d.slug === s))
      .filter((d): d is DistrictLocation => !!d);

    const grid = el('div', 'compare-modal__grid');
    grid.style.gridTemplateColumns = `200px repeat(${cols.length}, minmax(0, 1fr))`;

    // Header row
    grid.appendChild(el('div', 'compare-modal__row-label'));
    cols.forEach(d => {
      const head = el('div', 'compare-modal__col-head');
      const img = el('img', 'compare-modal__col-img') as HTMLImageElement;
      img.src = d.image;
      img.alt = d.name;
      head.appendChild(img);
      head.appendChild(el('h4', 'compare-modal__col-name', d.name));
      head.appendChild(el('span', 'compare-modal__col-local', `${d.nameKu} · ${d.nameAr}`));
      grid.appendChild(head);
    });

    const rowDefs: Array<{ label: string; value: (d: DistrictLocation) => string }> = [
      { label: 'Average price', value: d => formatPrice(getAveragePriceByDistrict(d.name) || d.averagePrice) },
      { label: 'Price range', value: d => `${formatPrice(d.priceRange.min)} – ${formatPrice(d.priceRange.max)}` },
      { label: 'Listings', value: d => `${getPropertyCountByDistrict(d.name)}` },
      { label: 'Lifestyle', value: d => d.demographics?.lifestyle || '—' },
      { label: 'Property types', value: d => d.propertyTypes.join(', ') },
      { label: 'Ideal for', value: d => (d.demographics?.targetBuyers || []).join(', ') || '—' },
      { label: 'Top landmarks', value: d => d.nearbyLandmarks.slice(0, 3).join(', ') },
    ];

    rowDefs.forEach(row => {
      const labelCell = el('div', 'compare-modal__row-label', row.label);
      grid.appendChild(labelCell);
      cols.forEach(d => {
        const cell = el('div', 'compare-modal__cell', row.value(d));
        grid.appendChild(cell);
      });
    });

    body.appendChild(grid);

    modal!.classList.add('compare-modal--open');
    modal!.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal!.classList.remove('compare-modal--open');
    modal!.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modal.querySelectorAll<HTMLElement>('[data-close]').forEach(elClose => {
    elClose.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
  compareBtn.addEventListener('click', openModal);
  clearBtn.addEventListener('click', () => {
    compareState.slugs = [];
    updateCardButtons();
    syncTray();
  });

  bindCardButtons();
  syncTray();
}

function initMapMarkers(): void {
  const panel = document.getElementById('locations-map-panel');
  if (!panel) return;
  const defaultHTML = panel.innerHTML;
  const markers = document.querySelectorAll<HTMLButtonElement>('.map-marker');

  function renderPanel(slug: string) {
    const d = districts.find(dd => dd.slug === slug);
    if (!d) return;
    const count = getPropertyCountByDistrict(d.name);
    const avg = getAveragePriceByDistrict(d.name) || d.averagePrice;
    const tags = getDistrictTags(d);
    panel!.innerHTML = `
      <span class="locations-map__panel-eyebrow">${d.nameKu} · ${d.nameAr}</span>
      <h3 class="locations-map__panel-title">${d.name}</h3>
      <p class="locations-map__panel-text">${d.description}</p>
      <dl class="locations-map__panel-stats">
        <div><dt>Listings</dt><dd>${count}</dd></div>
        <div><dt>Average</dt><dd>${formatPrice(avg)}</dd></div>
        <div><dt>From</dt><dd>${formatPrice(d.priceRange.min)}</dd></div>
      </dl>
      <div class="locations-map__panel-tags">
        ${tags.map(t => `<span class="locations-map__panel-tag locations-map__panel-tag--${t}">${TAG_LABELS[t]}</span>`).join('')}
      </div>
      <a class="locations-map__panel-cta" href="/properties/${d.slug}" data-route>
        Step inside ${d.name}
      </a>
    `;
  }

  markers.forEach(m => {
    const enter = () => {
      if (m.dataset.slug) renderPanel(m.dataset.slug);
      markers.forEach(other => other.classList.remove('map-marker--active'));
      m.classList.add('map-marker--active');
    };
    m.addEventListener('mouseenter', enter);
    m.addEventListener('focus', enter);
    m.addEventListener('click', e => {
      e.preventDefault();
      if (m.dataset.slug) renderPanel(m.dataset.slug);
    });
  });

  const stage = document.querySelector('.locations-map__stage');
  if (stage) {
    stage.addEventListener('mouseleave', () => {
      panel.innerHTML = defaultHTML;
      markers.forEach(other => other.classList.remove('map-marker--active'));
    });
  }
}

function initRevealOnScroll(): void {
  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll<HTMLElement>(
    '.locations-stats__item, .featured-area-card, .district-card, .locations-featured__header, .locations-map__header, .locations-grid__header, .locations-cta__container'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  targets.forEach(t => io.observe(t));
}

// ═══════════════════════════════════════════════════════════════════════════
// Individual District Page (preserves previous structure, lightly polished)
// ═══════════════════════════════════════════════════════════════════════════

export function renderDistrictPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const district = getDistrictBySlug(slug);

  if (!district) {
    return render404DistrictPage(slug);
  }

  const districtProperties = getPropertiesByDistrict(district.name);

  const page = el('div', 'district-page');

  // Hero
  const hero = el('section', 'district-page__hero');
  hero.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${district.image})`;

  const heroContent = el('div', 'district-page__hero-content');
  heroContent.appendChild(el('span', 'district-page__label', t('locations.realEstateInErbil')));
  heroContent.appendChild(el('h1', 'district-page__title', t('locations.districtProperties', { district: district.name })));
  heroContent.appendChild(el('p', 'district-page__subtitle', district.description));

  const heroStats = el('div', 'district-page__hero-stats');
  const heroStatsData = [
    { number: String(districtProperties.length), label: t('locations.propertiesAvailable') },
    { number: formatPrice(district.averagePrice), label: t('locations.averagePrice') },
    { number: String(district.propertyTypes.length), label: t('locations.propertyTypes') }
  ];
  heroStatsData.forEach(stat => {
    const statDiv = el('div', 'district-page__hero-stat');
    statDiv.appendChild(el('span', 'district-page__hero-stat-number', stat.number));
    statDiv.appendChild(el('span', 'district-page__hero-stat-label', stat.label));
    heroStats.appendChild(statDiv);
  });
  heroContent.appendChild(heroStats);
  hero.appendChild(heroContent);
  page.appendChild(hero);

  // Breadcrumb
  const breadcrumb = el('nav', 'district-page__breadcrumb');
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');
  const breadcrumbOl = el('ol', 'breadcrumb');
  const breadcrumbItems = [
    { href: '/', text: t('locations.breadcrumbHome') },
    { href: '/locations', text: t('locations.breadcrumbLocations') },
    { text: district.name, current: true }
  ];
  breadcrumbItems.forEach(item => {
    const li = el('li');
    if (item.href) {
      const a = el('a');
      (a as HTMLAnchorElement).href = item.href;
      a.setAttribute('data-route', '');
      a.textContent = item.text;
      li.appendChild(a);
    } else {
      const span = el('span');
      if (item.current) span.setAttribute('aria-current', 'page');
      span.textContent = item.text;
      li.appendChild(span);
    }
    breadcrumbOl.appendChild(li);
  });
  breadcrumb.appendChild(breadcrumbOl);
  page.appendChild(breadcrumb);

  // Main content
  const mainContent = el('div', 'district-page__content');
  const leftCol = el('div', 'district-page__main');

  const aboutSection = el('section', 'district-page__about');
  aboutSection.appendChild(el('h2', undefined, t('locations.aboutDistrict', { district: district.name })));
  const descriptionDiv = el('div', 'district-page__description');
  district.longDescription.split('\n\n').forEach(paragraph => {
    descriptionDiv.appendChild(el('p', undefined, paragraph));
  });
  aboutSection.appendChild(descriptionDiv);
  leftCol.appendChild(aboutSection);

  // Highlights
  const highlightsSection = el('section', 'district-page__highlights');
  highlightsSection.appendChild(el('h3', undefined, t('locations.whyChooseDistrict', { district: district.name })));
  const highlightsList = el('ul', 'district-page__highlights-list');
  district.highlights.forEach(highlight => {
    const li = el('li');
    li.appendChild(iconCheckFilled());
    li.appendChild(document.createTextNode(highlight));
    highlightsList.appendChild(li);
  });
  highlightsSection.appendChild(highlightsList);
  leftCol.appendChild(highlightsSection);

  // Landmarks
  const landmarksSection = el('section', 'district-page__landmarks');
  landmarksSection.appendChild(el('h3', undefined, t('locations.nearbyLandmarks')));
  const landmarksGrid = el('div', 'district-page__landmarks-grid');
  const landmarksData = [
    { title: t('locations.pointsOfInterest'), items: district.nearbyLandmarks },
    { title: t('locations.amenities'), items: district.amenities },
    { title: t('locations.transportLinks'), items: district.transportLinks }
  ];
  landmarksData.forEach(col => {
    const colDiv = el('div', 'district-page__landmarks-col');
    colDiv.appendChild(el('h4', undefined, col.title));
    const colList = el('ul');
    col.items.forEach(item => {
      colList.appendChild(el('li', undefined, item));
    });
    colDiv.appendChild(colList);
    landmarksGrid.appendChild(colDiv);
  });
  landmarksSection.appendChild(landmarksGrid);
  leftCol.appendChild(landmarksSection);

  // Map
  const mapSection = el('section', 'district-page__map');
  mapSection.appendChild(el('h3', undefined, t('locations.districtLocation', { district: district.name })));
  const mapContainer = el('div', 'district-page__map-container');
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

  // Sidebar
  const rightCol = el('aside', 'district-page__sidebar');

  const infoCard = el('div', 'district-page__info-card');
  infoCard.appendChild(el('h3', undefined, t('locations.quickFacts')));
  const infoList = el('dl', 'district-page__info-list');
  const infoData = [
    { term: t('locations.propertyTypes'), definition: district.propertyTypes.join(', ') },
    { term: t('locations.priceRange'), definition: `${formatPrice(district.priceRange.min)} - ${formatPrice(district.priceRange.max)}` },
    { term: t('locations.lifestyle'), definition: district.demographics.lifestyle },
    { term: t('locations.idealFor'), definition: district.demographics.targetBuyers.join(', ') }
  ];
  infoData.forEach(item => {
    infoList.appendChild(el('dt', undefined, item.term));
    infoList.appendChild(el('dd', undefined, item.definition));
  });
  infoCard.appendChild(infoList);
  const viewPropertiesBtn = el('a', 'btn btn--primary btn--full');
  (viewPropertiesBtn as HTMLAnchorElement).href = `/properties?district=${district.slug}`;
  viewPropertiesBtn.setAttribute('data-route', '');
  viewPropertiesBtn.textContent = t('locations.viewDistrictProperties', { district: district.name });
  infoCard.appendChild(viewPropertiesBtn);
  rightCol.appendChild(infoCard);

  const contactCard = el('div', 'district-page__contact-card');
  contactCard.appendChild(el('h3', undefined, t('locations.interestedInDistrict', { district: district.name })));
  contactCard.appendChild(el('p', undefined, t('locations.contactExpertsText')));
  const contactInfo = el('div', 'district-page__contact-info');

  const phoneLink = el('a', 'district-page__contact-link');
  (phoneLink as HTMLAnchorElement).href = `tel:${businessNAP.phones[0].number.replace(/\s/g, '')}`;
  phoneLink.appendChild(svg('M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'));
  phoneLink.appendChild(document.createTextNode(businessNAP.phones[0].number));
  contactInfo.appendChild(phoneLink);

  const emailLink = el('a', 'district-page__contact-link');
  (emailLink as HTMLAnchorElement).href = `mailto:${businessNAP.email}`;
  emailLink.appendChild(svg('M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'));
  emailLink.appendChild(document.createTextNode(businessNAP.email));
  contactInfo.appendChild(emailLink);

  contactCard.appendChild(contactInfo);
  const scheduleBtn = el('a', 'btn btn--secondary btn--full');
  (scheduleBtn as HTMLAnchorElement).href = '/contact';
  scheduleBtn.setAttribute('data-route', '');
  scheduleBtn.textContent = t('locations.scheduleConsultation');
  contactCard.appendChild(scheduleBtn);
  rightCol.appendChild(contactCard);

  const otherDistrictsCard = el('div', 'district-page__other-districts');
  otherDistrictsCard.appendChild(el('h3', undefined, t('locations.exploreOtherAreas')));
  const otherDistricts = districts.filter(d => d.id !== district.id).slice(0, 4);
  const districtLinks = el('ul', 'district-page__district-links');
  otherDistricts.forEach(d => {
    const li = el('li');
    const a = el('a');
    (a as HTMLAnchorElement).href = `/properties/${d.slug}`;
    a.setAttribute('data-route', '');
    a.textContent = d.name;
    const span = el('span', undefined, `${getPropertyCountByDistrict(d.name)} ${t('locations.properties')}`);
    a.appendChild(span);
    li.appendChild(a);
    districtLinks.appendChild(li);
  });
  otherDistrictsCard.appendChild(districtLinks);
  const viewAllLink = el('a', 'district-page__view-all');
  (viewAllLink as HTMLAnchorElement).href = '/locations';
  viewAllLink.setAttribute('data-route', '');
  viewAllLink.textContent = t('locations.viewAllLocations');
  otherDistrictsCard.appendChild(viewAllLink);
  rightCol.appendChild(otherDistrictsCard);

  mainContent.appendChild(rightCol);
  page.appendChild(mainContent);

  // Properties section
  if (districtProperties.length > 0) {
    const propertiesSection = el('section', 'district-page__properties');
    const propertiesHeader = el('div', 'district-page__properties-header');
    propertiesHeader.appendChild(el('h2', undefined, t('locations.availablePropertiesIn', { district: district.name })));
    const viewAllBtn = el('a', 'btn btn--secondary');
    (viewAllBtn as HTMLAnchorElement).href = `/properties?district=${district.slug}`;
    viewAllBtn.setAttribute('data-route', '');
    viewAllBtn.textContent = t('locations.viewAll');
    propertiesHeader.appendChild(viewAllBtn);
    propertiesSection.appendChild(propertiesHeader);

    const propertiesGrid = el('div', 'district-page__properties-grid');
    districtProperties.slice(0, 6).forEach(property => {
      propertiesGrid.appendChild(createPropertyCard(property));
    });
    propertiesSection.appendChild(propertiesGrid);
    page.appendChild(propertiesSection);
  }

  const schema = generateDistrictSchema(district);
  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.id = 'schema-district';
  schemaScript.textContent = JSON.stringify(schema);
  page.appendChild(schemaScript);

  fragment.appendChild(page);
  return fragment;
}

// Property card for the district page
function createPropertyCard(property: Property): HTMLElement {
  const card = el('article', 'property-card');
  card.dataset.propertyId = property.id;
  const favorited = isFavorite(property.id);

  const link = el('a', 'property-card__link');
  (link as HTMLAnchorElement).href = `/properties/${property.id}`;
  link.setAttribute('data-route', '');

  const media = el('div', 'property-card__media');
  const img = el('img', 'property-card__image') as HTMLImageElement;
  img.src = property.images[0];
  img.alt = property.title;
  img.width = 400;
  img.height = 300;
  img.loading = 'lazy';
  media.appendChild(img);

  const badges = el('div', 'property-card__badges');
  property.badges.forEach(badge => {
    const badgeSpan = el('span', `property-card__badge property-card__badge--${badge.toLowerCase()}`, badge);
    badges.appendChild(badgeSpan);
  });
  media.appendChild(badges);

  const favoriteBtn = el('button', `property-card__favorite ${favorited ? 'property-card__favorite--active' : ''}`);
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

  const content = el('div', 'property-card__content');
  content.appendChild(el('span', 'property-card__type', property.type));
  content.appendChild(el('h3', 'property-card__title', property.title));

  const location = el('p', 'property-card__location');
  location.appendChild(svg(ICONS.marker));
  location.appendChild(document.createTextNode(`${property.location.district}, ${property.location.city}`));
  content.appendChild(location);

  const specs = el('div', 'property-card__specs');
  specs.appendChild(el('span', undefined, `${property.specs.beds} Beds`));
  specs.appendChild(el('span', undefined, `${property.specs.baths} Baths`));
  specs.appendChild(el('span', undefined, `${property.specs.sqm} m`));
  content.appendChild(specs);

  const footer = el('div', 'property-card__footer');
  footer.appendChild(el('span', 'property-card__price', getDisplayPrice(property)));
  footer.appendChild(el('span', `property-card__status property-card__status--${property.status.toLowerCase().replace(' ', '-')}`, property.status));
  content.appendChild(footer);

  link.appendChild(content);
  card.appendChild(link);

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
  const page = el('div', 'district-page district-page--404');
  const container = el('div', 'district-page__404');
  container.appendChild(el('h1', undefined, t('locations.districtNotFound')));
  container.appendChild(el('p', undefined, t('locations.districtNotFoundText', { slug })));

  const buttons = el('div', 'district-page__404-buttons');
  const locationsBtn = el('a', 'btn btn--primary');
  (locationsBtn as HTMLAnchorElement).href = '/locations';
  locationsBtn.setAttribute('data-route', '');
  locationsBtn.textContent = t('locations.viewAllLocations');
  buttons.appendChild(locationsBtn);
  const propertiesBtn = el('a', 'btn btn--secondary');
  (propertiesBtn as HTMLAnchorElement).href = '/properties';
  propertiesBtn.setAttribute('data-route', '');
  propertiesBtn.textContent = t('locations.browseProperties');
  buttons.appendChild(propertiesBtn);
  container.appendChild(buttons);
  page.appendChild(container);
  fragment.appendChild(page);
  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// Schema & SEO (unchanged)
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
