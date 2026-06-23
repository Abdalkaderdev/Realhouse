// ═══════════════════════════════════════════════════════════════════════════
// Testimonials Page — Cinematic Editorial Redesign
// /testimonials - Filterable, animated client stories
// ═══════════════════════════════════════════════════════════════════════════

import {
  testimonials,
  getTestimonialStats,
  getVideoTestimonials,
  type Testimonial
} from '../data/testimonials';
import {
  createTestimonialCard,
  createVideoTestimonialCard,
  createStarIcon,
  createVerifiedIcon
} from '../components/testimonial-card';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema
} from '../components/internal-linking';
import { partnerLogos } from '../data/agents';

// ─── Helpers ──────────────────────────────────────────────────────────────
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent !== undefined) el.textContent = textContent;
  return el;
}

function getTestimonialsBreadcrumbs() {
  return [
    { name: 'Home', url: '/' },
    { name: 'Testimonials', url: '/testimonials' }
  ];
}

// Derive the language a testimonial was written in. We assume English unless
// the quote contains Arabic/Kurdish script.
function detectLanguage(t: Testimonial): 'en' | 'ar' | 'ku' {
  if (t.quoteAr) return 'ar';
  if (t.quoteKu) return 'ku';
  return 'en';
}

// ═══════════════════════════════════════════════════════════════════════════
// Cinematic Hero
// ═══════════════════════════════════════════════════════════════════════════

function createHero(stats: ReturnType<typeof getTestimonialStats>): HTMLElement {
  const hero = createElement('section', 'testimonials-hero');

  // Atmospheric layers
  const orb1 = createElement('div', 'testimonials-hero__orb testimonials-hero__orb--gold');
  const orb2 = createElement('div', 'testimonials-hero__orb testimonials-hero__orb--violet');
  const grain = createElement('div', 'testimonials-hero__grain');
  const grid = createElement('div', 'testimonials-hero__gridlines');
  hero.append(orb1, orb2, grain, grid);

  const inner = createElement('div', 'testimonials-hero__inner container');

  // Eyebrow
  const eyebrow = createElement('div', 'testimonials-hero__eyebrow');
  eyebrow.appendChild(createElement('span', 'testimonials-hero__eyebrow-dot'));
  eyebrow.appendChild(createElement('span', 'testimonials-hero__eyebrow-text', 'Voices of Our Clients'));
  inner.appendChild(eyebrow);

  // Title
  const title = createElement('h1', 'testimonials-hero__title');
  const w1 = createElement('span', 'testimonials-hero__word', 'What');
  const w2 = createElement('span', 'testimonials-hero__word', 'Our');
  const w3 = createElement('span', 'testimonials-hero__word testimonials-hero__word--accent');
  const accentEm = createElement('em', undefined, 'Clients');
  w3.appendChild(accentEm);
  const w4 = createElement('span', 'testimonials-hero__word', 'Say');
  title.append(w1, document.createTextNode(' '), w2, document.createTextNode(' '), w3, document.createTextNode(' '), w4);
  inner.appendChild(title);

  // Subtitle
  const subtitle = createElement('p', 'testimonials-hero__subtitle',
    'A decade of trust, written in the words of the families and investors who built their futures with Real House.');
  inner.appendChild(subtitle);

  // Animated stat overlay
  const overlay = createElement('div', 'testimonials-hero__stats');
  const heroStats = [
    { value: 1000, suffix: '+', label: 'Happy Clients' },
    { value: stats.averageRating, suffix: '', label: 'Avg Rating', decimal: true },
    { value: stats.satisfactionPercentage, suffix: '%', label: 'Recommend' }
  ];

  heroStats.forEach((stat, i) => {
    const item = createElement('div', 'testimonials-hero__stat');
    item.style.setProperty('--stat-delay', `${i * 120}ms`);

    const valueWrap = createElement('div', 'testimonials-hero__stat-value-wrap');
    const value = createElement('span', 'testimonials-hero__stat-value');
    value.setAttribute('data-target', stat.value.toString());
    if (stat.decimal) value.setAttribute('data-decimal', '1');
    value.textContent = '0';
    const suffix = createElement('span', 'testimonials-hero__stat-suffix', stat.suffix);
    valueWrap.append(value, suffix);

    const label = createElement('span', 'testimonials-hero__stat-label', stat.label);

    item.append(valueWrap, label);
    overlay.appendChild(item);
  });
  inner.appendChild(overlay);

  // Scroll indicator
  const scroll = createElement('div', 'testimonials-hero__scroll');
  scroll.appendChild(createElement('span', 'testimonials-hero__scroll-line'));
  scroll.appendChild(createElement('span', 'testimonials-hero__scroll-text', 'Scroll'));
  inner.appendChild(scroll);

  hero.appendChild(inner);
  return hero;
}

// ═══════════════════════════════════════════════════════════════════════════
// Featured Testimonial (editorial card)
// ═══════════════════════════════════════════════════════════════════════════

function createFeaturedTestimonial(testimonial: Testimonial, featuredList: Testimonial[] = [], index: number = 0): HTMLElement {
  const section = createElement('section', 'testimonials-featured container');
  section.id = 'testimonials-featured-section';
  if (featuredList.length > 0) {
    section.setAttribute('data-featured-index', index.toString());
    section.setAttribute('data-featured-total', featuredList.length.toString());
  }

  const header = createElement('div', 'testimonials-featured__header');

  const label = createElement('div', 'testimonials-featured__label');
  label.appendChild(createElement('span', 'testimonials-featured__label-line'));
  label.appendChild(createElement('span', 'testimonials-featured__label-text', 'Featured Story'));
  header.appendChild(label);

  // Navigation (only when we have more than one featured story)
  if (featuredList.length > 1) {
    const nav = createElement('div', 'testimonials-featured__nav');
    const counter = createElement('span', 'testimonials-featured__nav-counter');
    counter.id = 'featured-counter';
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(featuredList.length).padStart(2, '0')}`;

    const prev = createElement('button', 'testimonials-featured__nav-btn');
    prev.type = 'button';
    prev.setAttribute('aria-label', 'Previous featured story');
    prev.setAttribute('data-featured-prev', '');
    prev.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 6l-6 6 6 6"/></svg>';

    const next = createElement('button', 'testimonials-featured__nav-btn');
    next.type = 'button';
    next.setAttribute('aria-label', 'Next featured story');
    next.setAttribute('data-featured-next', '');
    next.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 6l6 6-6 6"/></svg>';

    nav.append(counter, prev, next);
    header.appendChild(nav);
  }

  const card = createElement('article', 'testimonials-featured__card');
  card.id = 'featured-card';

  // Decorative quote glyph
  const glyph = createElement('div', 'testimonials-featured__glyph', '“');
  card.appendChild(glyph);

  // Body
  const body = createElement('div', 'testimonials-featured__body');

  // Stars + verified
  const meta = createElement('div', 'testimonials-featured__meta');
  const stars = createElement('div', 'testimonials-featured__stars');
  for (let i = 1; i <= 5; i++) {
    stars.appendChild(createStarIcon(i <= testimonial.rating));
  }
  meta.appendChild(stars);

  if (testimonial.isVerifiedBuyer) {
    const verified = createElement('span', 'testimonials-featured__verified');
    verified.appendChild(createVerifiedIcon());
    verified.appendChild(document.createTextNode('Verified Client'));
    meta.appendChild(verified);
  }
  body.appendChild(meta);

  // Quote
  const quote = createElement('blockquote', 'testimonials-featured__quote', testimonial.quote);
  body.appendChild(quote);

  // Author block
  const author = createElement('div', 'testimonials-featured__author');
  const avatar = createElement('img', 'testimonials-featured__avatar');
  avatar.src = testimonial.image;
  avatar.alt = testimonial.name;
  avatar.loading = 'eager';
  avatar.width = 80;
  avatar.height = 80;

  const authorInfo = createElement('div', 'testimonials-featured__author-info');
  authorInfo.appendChild(createElement('span', 'testimonials-featured__author-name', testimonial.name));
  const roleLine = createElement('span', 'testimonials-featured__author-role');
  roleLine.textContent = testimonial.company
    ? `${testimonial.role} · ${testimonial.company}`
    : testimonial.role;
  authorInfo.appendChild(roleLine);
  authorInfo.appendChild(createElement('span', 'testimonials-featured__author-loc', testimonial.location));

  author.append(avatar, authorInfo);
  body.appendChild(author);

  // Side strip
  const side = createElement('div', 'testimonials-featured__side');
  const sideLabel = createElement('span', 'testimonials-featured__side-label', 'Purchase');
  const sideValue = createElement('span', 'testimonials-featured__side-value', testimonial.propertyType);
  const sideYear = createElement('span', 'testimonials-featured__side-year', testimonial.purchaseYear.toString());
  side.append(sideLabel, sideValue, sideYear);

  card.append(body, side);

  section.append(header, card);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Filter Bar (chip style)
// ═══════════════════════════════════════════════════════════════════════════

interface FilterState {
  propertyType: string;
  rating: string;
  language: string;
  sort: string;
}

function createFilterBar(state: FilterState): HTMLElement {
  const section = createElement('section', 'testimonials-filters container');

  // Header row: count + sort
  const head = createElement('div', 'testimonials-filters__head');
  const heading = createElement('h2', 'testimonials-filters__heading', 'Every Review, Every Story');
  const count = createElement('span', 'testimonials-filters__count');
  count.id = 'testimonials-count';
  count.textContent = `${testimonials.length} reviews`;

  const sortWrap = createElement('div', 'testimonials-filters__sort');
  const sortLabel = createElement('label', 'testimonials-filters__sort-label', 'Sort');
  sortLabel.setAttribute('for', 'sort-filter');
  const sortSelect = createElement('select', 'testimonials-filters__sort-select');
  sortSelect.id = 'sort-filter';
  [
    { v: 'newest', t: 'Newest First' },
    { v: 'oldest', t: 'Oldest First' },
    { v: 'rating-high', t: 'Highest Rating' },
    { v: 'rating-low', t: 'Lowest Rating' }
  ].forEach(({ v, t }) => {
    const o = createElement('option', undefined, t);
    o.value = v;
    sortSelect.appendChild(o);
  });
  sortSelect.value = state.sort;
  sortWrap.append(sortLabel, sortSelect);

  const headLeft = createElement('div', 'testimonials-filters__head-left');
  headLeft.append(heading, count);
  head.append(headLeft, sortWrap);
  section.appendChild(head);

  // Chip rows
  const groups: Array<{ key: keyof FilterState; label: string; options: { v: string; t: string }[] }> = [
    {
      key: 'propertyType',
      label: 'Property',
      options: [
        { v: 'all', t: 'All' },
        { v: 'Villa', t: 'Villa' },
        { v: 'Apartment', t: 'Apartment' },
        { v: 'Penthouse', t: 'Penthouse' },
        { v: 'Townhouse', t: 'Townhouse' },
        { v: 'Commercial', t: 'Commercial' }
      ]
    },
    {
      key: 'rating',
      label: 'Rating',
      options: [
        { v: 'all', t: 'All' },
        { v: '5', t: '5 Stars' },
        { v: '4', t: '4 Stars' },
        { v: '3', t: '3 Stars' }
      ]
    },
    {
      key: 'language',
      label: 'Language',
      options: [
        { v: 'all', t: 'All' },
        { v: 'en', t: 'English' },
        { v: 'ar', t: 'Arabic' },
        { v: 'ku', t: 'Kurdish' }
      ]
    }
  ];

  const rows = createElement('div', 'testimonials-filters__rows');

  groups.forEach(group => {
    const row = createElement('div', 'testimonials-filters__row');
    row.setAttribute('data-filter-group', group.key);

    const lbl = createElement('span', 'testimonials-filters__row-label', group.label);
    row.appendChild(lbl);

    const chips = createElement('div', 'testimonials-filters__chips');
    group.options.forEach(opt => {
      const chip = createElement('button', 'testimonials-filters__chip', opt.t);
      chip.type = 'button';
      chip.setAttribute('data-filter-key', group.key);
      chip.setAttribute('data-filter-value', opt.v);
      if (state[group.key] === opt.v) {
        chip.classList.add('testimonials-filters__chip--active');
      }
      chips.appendChild(chip);
    });
    row.appendChild(chips);
    rows.appendChild(row);
  });

  section.appendChild(rows);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Filter / Sort logic
// ═══════════════════════════════════════════════════════════════════════════

function applyFilters(state: FilterState, all: Testimonial[]): Testimonial[] {
  let out = [...all];

  if (state.propertyType !== 'all') {
    out = out.filter(t => t.propertyType === state.propertyType);
  }
  if (state.rating !== 'all') {
    out = out.filter(t => t.rating === parseInt(state.rating, 10));
  }
  if (state.language !== 'all') {
    out = out.filter(t => detectLanguage(t) === state.language);
  }

  out.sort((a, b) => {
    switch (state.sort) {
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

  return out;
}

function renderGrid(grid: HTMLElement, list: Testimonial[]): void {
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  if (list.length === 0) {
    const empty = createElement('div', 'testimonials-grid__empty');
    const icon = createElement('div', 'testimonials-grid__empty-icon', '✤');
    const title = createElement('h3', 'testimonials-grid__empty-title', 'No stories to show');
    const text = createElement('p', 'testimonials-grid__empty-text',
      'Try widening your filters — there are more voices waiting to be heard.');
    const btn = createElement('button', 'btn btn--outline testimonials-grid__empty-btn', 'Reset Filters');
    btn.setAttribute('data-reset-filters', '');
    empty.append(icon, title, text, btn);
    grid.appendChild(empty);
    return;
  }

  list.forEach((testimonial, i) => {
    const card = createTestimonialCard(testimonial, {
      size: 'standard',
      showVideo: true,
      showServiceType: true,
      showDate: true,
      showCompany: true
    });
    card.classList.add('testimonials-grid__item');
    (card as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(i, 11) * 60}ms`);
    grid.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// Press / Featured-in strip
// ═══════════════════════════════════════════════════════════════════════════

function createPressStrip(): HTMLElement {
  const section = createElement('section', 'testimonials-press');
  const inner = createElement('div', 'testimonials-press__inner container');

  const label = createElement('div', 'testimonials-press__label');
  label.appendChild(createElement('span', 'testimonials-press__label-line'));
  label.appendChild(createElement('span', 'testimonials-press__label-text', 'As Featured In'));
  inner.appendChild(label);

  const track = createElement('div', 'testimonials-press__track');
  const lane = createElement('div', 'testimonials-press__lane');

  // Duplicate twice so the CSS marquee loops seamlessly
  const items = [...partnerLogos, ...partnerLogos];
  items.forEach(p => {
    const item = createElement('div', 'testimonials-press__item');
    const logo = createElement('span', 'testimonials-press__item-logo', p.logo);
    const name = createElement('span', 'testimonials-press__item-name', p.name);
    item.append(logo, name);
    lane.appendChild(item);
  });

  track.appendChild(lane);
  inner.appendChild(track);
  section.appendChild(inner);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Animated stats counter section
// ═══════════════════════════════════════════════════════════════════════════

function createStatsBand(stats: ReturnType<typeof getTestimonialStats>): HTMLElement {
  const section = createElement('section', 'testimonials-stats container');

  const items = [
    { value: stats.totalReviews, suffix: '', label: 'Total Reviews', sub: 'Verified buyers and sellers' },
    { value: stats.averageRating, suffix: '/5', label: 'Average Rating', sub: 'Across all transactions', decimal: true },
    { value: stats.satisfactionPercentage, suffix: '%', label: 'Recommend Us', sub: 'Would refer Real House to family' }
  ];

  items.forEach((item, i) => {
    const card = createElement('div', 'testimonials-stats__card');
    card.style.setProperty('--stats-delay', `${i * 100}ms`);

    const top = createElement('div', 'testimonials-stats__top');
    const idx = createElement('span', 'testimonials-stats__index', `0${i + 1}`);
    top.appendChild(idx);
    card.appendChild(top);

    const value = createElement('div', 'testimonials-stats__value-wrap');
    const num = createElement('span', 'testimonials-stats__value');
    num.setAttribute('data-target', item.value.toString());
    if (item.decimal) num.setAttribute('data-decimal', '1');
    num.textContent = '0';
    const suf = createElement('span', 'testimonials-stats__suffix', item.suffix);
    value.append(num, suf);
    card.appendChild(value);

    card.appendChild(createElement('span', 'testimonials-stats__label', item.label));
    card.appendChild(createElement('span', 'testimonials-stats__sub', item.sub));

    section.appendChild(card);
  });

  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Submit Your Story CTA + Modal
// ═══════════════════════════════════════════════════════════════════════════

function createSubmitCTA(): HTMLElement {
  const section = createElement('section', 'testimonials-submit container');

  const card = createElement('div', 'testimonials-submit__card');
  const decor = createElement('div', 'testimonials-submit__decor');
  decor.appendChild(createElement('span', 'testimonials-submit__decor-1'));
  decor.appendChild(createElement('span', 'testimonials-submit__decor-2'));
  card.appendChild(decor);

  const content = createElement('div', 'testimonials-submit__content');

  content.appendChild(createElement('span', 'testimonials-submit__eyebrow', 'Your turn'));

  const title = createElement('h2', 'testimonials-submit__title');
  title.appendChild(document.createTextNode('Tell us '));
  const em = createElement('em', undefined, 'your story');
  title.appendChild(em);
  content.appendChild(title);

  content.appendChild(createElement('p', 'testimonials-submit__text',
    'Worked with Real House? Share the moment you found home. Your words could help the next family begin theirs.'));

  const actions = createElement('div', 'testimonials-submit__actions');
  const primary = createElement('button', 'btn btn--primary btn--lg testimonials-submit__btn');
  primary.type = 'button';
  primary.textContent = 'Submit Your Story';
  primary.setAttribute('data-open-submit-modal', '');
  actions.appendChild(primary);

  const secondary = createElement('a', 'btn btn--outline btn--lg', 'Contact Us');
  secondary.href = '/contact';
  secondary.setAttribute('data-route', '');
  actions.appendChild(secondary);

  content.appendChild(actions);
  card.appendChild(content);

  section.appendChild(card);
  return section;
}

function openSubmitModal(): void {
  if (document.getElementById('submit-story-modal')) return;

  const modal = createElement('div', 'submit-modal');
  modal.id = 'submit-story-modal';

  const overlay = createElement('div', 'submit-modal__overlay');
  overlay.addEventListener('click', closeSubmitModal);
  modal.appendChild(overlay);

  const sheet = createElement('div', 'submit-modal__sheet');

  const close = createElement('button', 'submit-modal__close');
  close.type = 'button';
  close.setAttribute('aria-label', 'Close');
  close.textContent = '×';
  close.addEventListener('click', closeSubmitModal);
  sheet.appendChild(close);

  sheet.appendChild(createElement('span', 'submit-modal__eyebrow', 'Share Your Story'));
  const title = createElement('h3', 'submit-modal__title');
  title.appendChild(document.createTextNode('Leave a '));
  const em = createElement('em', undefined, 'review');
  title.appendChild(em);
  sheet.appendChild(title);
  sheet.appendChild(createElement('p', 'submit-modal__sub',
    'Reviews are moderated and published within 48 hours.'));

  const form = createElement('form', 'submit-modal__form');
  form.setAttribute('novalidate', '');

  const fields: Array<{ id: string; label: string; type: string; required?: boolean; full?: boolean }> = [
    { id: 'sm-name', label: 'Full Name', type: 'text', required: true },
    { id: 'sm-email', label: 'Email', type: 'email', required: true },
    { id: 'sm-property', label: 'Property Type', type: 'select', required: true },
    { id: 'sm-rating', label: 'Rating', type: 'rating', required: true, full: true },
    { id: 'sm-story', label: 'Your Story', type: 'textarea', required: true, full: true }
  ];

  fields.forEach(f => {
    const group = createElement('label', 'submit-modal__group');
    if (f.full) group.classList.add('submit-modal__group--full');

    group.appendChild(createElement('span', 'submit-modal__label', f.label));

    if (f.type === 'textarea') {
      const ta = createElement('textarea', 'submit-modal__input submit-modal__textarea');
      ta.id = f.id;
      ta.rows = 5;
      ta.placeholder = 'Tell us about your experience with Real House...';
      if (f.required) ta.required = true;
      group.appendChild(ta);
    } else if (f.type === 'select') {
      const sel = createElement('select', 'submit-modal__input submit-modal__select');
      sel.id = f.id;
      ['Villa', 'Apartment', 'Penthouse', 'Townhouse', 'Commercial', 'Other'].forEach(o => {
        const opt = createElement('option', undefined, o);
        opt.value = o;
        sel.appendChild(opt);
      });
      group.appendChild(sel);
    } else if (f.type === 'rating') {
      const rating = createElement('div', 'submit-modal__rating');
      rating.id = f.id;
      let current = 5;
      const setRating = (n: number) => {
        current = n;
        rating.querySelectorAll('.submit-modal__rating-star').forEach((el, idx) => {
          el.classList.toggle('submit-modal__rating-star--active', idx < n);
        });
        rating.setAttribute('data-value', n.toString());
      };
      for (let i = 1; i <= 5; i++) {
        const btn = createElement('button', 'submit-modal__rating-star', '★');
        btn.type = 'button';
        btn.setAttribute('aria-label', `${i} star${i > 1 ? 's' : ''}`);
        btn.addEventListener('click', () => setRating(i));
        rating.appendChild(btn);
      }
      group.appendChild(rating);
      setRating(current);
    } else {
      const input = createElement('input', 'submit-modal__input');
      input.id = f.id;
      input.type = f.type;
      if (f.required) input.required = true;
      group.appendChild(input);
    }

    form.appendChild(group);
  });

  const submitRow = createElement('div', 'submit-modal__submit-row');
  const submit = createElement('button', 'btn btn--primary submit-modal__submit', 'Send Story');
  submit.type = 'submit';
  submitRow.appendChild(submit);
  form.appendChild(submitRow);

  // Success message slot
  const success = createElement('div', 'submit-modal__success');
  success.id = 'submit-modal-success';
  const successIcon = createElement('div', 'submit-modal__success-icon', '✓');
  const successTitle = createElement('h4', 'submit-modal__success-title', 'Thank you');
  const successText = createElement('p', 'submit-modal__success-text',
    'Your story has been received. We will be in touch shortly.');
  success.append(successIcon, successTitle, successText);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('submit-modal__form--sent');
    success.classList.add('submit-modal__success--visible');
    setTimeout(() => closeSubmitModal(), 2400);
  });

  sheet.appendChild(form);
  sheet.appendChild(success);
  modal.appendChild(sheet);
  document.body.appendChild(modal);

  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('submit-modal--active'));

  const escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSubmitModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function closeSubmitModal(): void {
  const modal = document.getElementById('submit-story-modal');
  if (!modal) return;
  modal.classList.remove('submit-modal--active');
  setTimeout(() => {
    modal.remove();
    document.body.style.overflow = '';
  }, 300);
}

// ═══════════════════════════════════════════════════════════════════════════
// Video Modal (existing behavior, preserved)
// ═══════════════════════════════════════════════════════════════════════════

function initVideoModal(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const playBtn = target.closest('[data-video-url]') as HTMLElement | null;
    if (playBtn) {
      const url = playBtn.getAttribute('data-video-url');
      if (url) openVideoModal(url);
    }
  });
}

function openVideoModal(videoUrl: string): void {
  const modal = createElement('div', 'video-modal');
  modal.id = 'video-modal';

  const overlay = createElement('div', 'video-modal__overlay');
  overlay.addEventListener('click', closeVideoModal);
  modal.appendChild(overlay);

  const content = createElement('div', 'video-modal__content');
  const close = createElement('button', 'video-modal__close', '×');
  close.setAttribute('aria-label', 'Close video');
  close.addEventListener('click', closeVideoModal);
  content.appendChild(close);

  const iframe = document.createElement('iframe');
  iframe.src = videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;
  iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.className = 'video-modal__iframe';
  content.appendChild(iframe);

  modal.appendChild(content);
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('video-modal--active'));

  const escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function closeVideoModal(): void {
  const modal = document.getElementById('video-modal');
  if (!modal) return;
  modal.classList.remove('video-modal--active');
  setTimeout(() => {
    modal.remove();
    document.body.style.overflow = '';
  }, 300);
}

// ═══════════════════════════════════════════════════════════════════════════
// Counter & scroll animations
// ═══════════════════════════════════════════════════════════════════════════

function animateCounter(el: HTMLElement, target: number, decimal: boolean): void {
  const duration = 1600;
  const start = performance.now();
  const startVal = 0;

  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    // ease-out-quint
    const eased = 1 - Math.pow(1 - progress, 5);
    const current = startVal + (target - startVal) * eased;
    el.textContent = decimal ? current.toFixed(1) : Math.round(current).toString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = decimal ? target.toFixed(1) : Math.round(target).toString();
  };
  requestAnimationFrame(step);
}

function initCounters(root: ParentNode): void {
  const counters = root.querySelectorAll<HTMLElement>('[data-target]');
  if (counters.length === 0) return;

  const seen = new WeakSet<Element>();
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !seen.has(entry.target)) {
        seen.add(entry.target);
        const el = entry.target as HTMLElement;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const decimal = el.getAttribute('data-decimal') === '1';
        animateCounter(el, target, decimal);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => io.observe(c));
}

function initReveal(root: ParentNode): void {
  const items = root.querySelectorAll('.testimonials-grid__item, .testimonials-featured__card, .testimonials-stats__card, .testimonials-hero__stat');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  items.forEach(item => io.observe(item));
}

// ═══════════════════════════════════════════════════════════════════════════
// Hero parallax — mouse-driven orb drift for cinematic depth
// ═══════════════════════════════════════════════════════════════════════════

function initHeroParallax(): void {
  const hero = document.querySelector<HTMLElement>('.testimonials-hero');
  if (!hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const orbs = hero.querySelectorAll<HTMLElement>('.testimonials-hero__orb');
  const grid = hero.querySelector<HTMLElement>('.testimonials-hero__gridlines');

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbs.forEach((orb, i) => {
      const depth = i === 0 ? 30 : -22;
      orb.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });
    if (grid) grid.style.transform = `translate3d(${x * -10}px, ${y * -10}px, 0)`;
  });

  hero.addEventListener('mouseleave', () => {
    orbs.forEach(orb => { orb.style.transform = ''; });
    if (grid) grid.style.transform = '';
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// Read more — expandable quotes on testimonial cards
// ═══════════════════════════════════════════════════════════════════════════

function initReadMore(): void {
  document.querySelectorAll<HTMLElement>('.testimonials-grid__item .testimonial-card__quote').forEach(quote => {
    if (quote.dataset.readmoreInit === '1') return;
    quote.dataset.readmoreInit = '1';

    // Use rAF so layout has settled
    requestAnimationFrame(() => {
      const isOverflowing = quote.scrollHeight > quote.clientHeight + 2;
      if (!isOverflowing) return;

      const wrap = quote.parentElement;
      if (!wrap) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'testimonial-card__readmore';
      btn.textContent = 'Read more';
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = quote.classList.toggle('testimonial-card__quote--expanded');
        btn.textContent = expanded ? 'Show less' : 'Read more';
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });
      wrap.appendChild(btn);
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// Featured testimonial rotation
// ═══════════════════════════════════════════════════════════════════════════

function initFeaturedRotation(
  list: Testimonial[],
  getIndex: () => number,
  setIndex: (i: number) => void
): void {
  if (list.length <= 1) return;

  const replace = (newIndex: number) => {
    const section = document.getElementById('testimonials-featured-section');
    if (!section) return;
    const newSection = createFeaturedTestimonial(list[newIndex], list, newIndex);
    newSection.classList.add('testimonials-featured--swap');
    section.replaceWith(newSection);
    // Animate in
    requestAnimationFrame(() => {
      newSection.classList.remove('testimonials-featured--swap');
      const card = newSection.querySelector('.testimonials-featured__card');
      if (card) card.classList.add('is-revealed');
    });
    setIndex(newIndex);
  };

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-featured-next]')) {
      const i = getIndex();
      replace((i + 1) % list.length);
    } else if (target.closest('[data-featured-prev]')) {
      const i = getIndex();
      replace((i - 1 + list.length) % list.length);
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// Page Renderer
// ═══════════════════════════════════════════════════════════════════════════

export function renderTestimonialsPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getTestimonialsBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'testimonials-page');

  // Breadcrumbs (inside a container)
  const crumbWrap = createElement('div', 'testimonials-page__crumbs container');
  crumbWrap.appendChild(createBreadcrumbs(breadcrumbs));
  page.appendChild(crumbWrap);

  // Stats
  const stats = getTestimonialStats();

  // Hero
  page.appendChild(createHero(stats));

  // Featured testimonials: top recent 5-star verified stories (up to 5)
  const sortedByDate = [...testimonials].sort(
    (a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
  );
  const featuredPool = sortedByDate.filter(t => t.rating === 5 && t.isVerifiedBuyer).slice(0, 5);
  const featuredList = featuredPool.length > 0 ? featuredPool : sortedByDate.slice(0, 1);
  let featuredIndex = 0;
  if (featuredList.length > 0) {
    page.appendChild(createFeaturedTestimonial(featuredList[0], featuredList, featuredIndex));
  }

  // Filter state
  const state: FilterState = {
    propertyType: 'all',
    rating: 'all',
    language: 'all',
    sort: 'newest'
  };

  // Filter bar
  page.appendChild(createFilterBar(state));

  // Grid section
  const gridSection = createElement('section', 'testimonials-grid container');
  gridSection.setAttribute('aria-label', 'Client reviews');
  const grid = createElement('div', 'testimonials-grid__items');
  grid.id = 'testimonials-grid';
  renderGrid(grid, applyFilters(state, testimonials));
  gridSection.appendChild(grid);
  page.appendChild(gridSection);

  // Video testimonials (if any data exists)
  const videos = getVideoTestimonials();
  if (videos.length > 0) {
    const videoSection = createElement('section', 'testimonials-video container');
    const head = createElement('div', 'testimonials-video__head');
    head.appendChild(createElement('span', 'testimonials-video__eyebrow', 'Watch & Listen'));
    const title = createElement('h2', 'testimonials-video__title');
    title.appendChild(document.createTextNode('Video '));
    const em = createElement('em', undefined, 'Stories');
    title.appendChild(em);
    head.appendChild(title);
    videoSection.appendChild(head);

    const vGrid = createElement('div', 'testimonials-video__grid');
    videos.forEach(t => vGrid.appendChild(createVideoTestimonialCard(t)));
    videoSection.appendChild(vGrid);
    page.appendChild(videoSection);
  }

  // Stats band
  page.appendChild(createStatsBand(stats));

  // Press strip
  page.appendChild(createPressStrip());

  // Submit CTA
  page.appendChild(createSubmitCTA());

  fragment.appendChild(page);

  // Init runtime behaviors after mount
  setTimeout(() => {
    initVideoModal();

    // Counter & reveal animations
    initCounters(document);
    initReveal(document);

    // Hero parallax (mouse-driven)
    initHeroParallax();

    // Read more on testimonial card quotes
    initReadMore();

    // Featured story rotation
    initFeaturedRotation(featuredList, () => featuredIndex, (i) => { featuredIndex = i; });

    // Filter chip interactions
    document.querySelectorAll<HTMLButtonElement>('.testimonials-filters__chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const key = chip.getAttribute('data-filter-key') as keyof FilterState;
        const value = chip.getAttribute('data-filter-value') || 'all';
        if (!key) return;
        state[key] = value;

        // Toggle active class within same group
        document.querySelectorAll<HTMLButtonElement>(
          `.testimonials-filters__chip[data-filter-key="${key}"]`
        ).forEach(c => c.classList.remove('testimonials-filters__chip--active'));
        chip.classList.add('testimonials-filters__chip--active');

        refresh();
      });
    });

    const sortSelect = document.getElementById('sort-filter') as HTMLSelectElement | null;
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        state.sort = sortSelect.value;
        refresh();
      });
    }

    function refresh() {
      const filtered = applyFilters(state, testimonials);
      const gridEl = document.getElementById('testimonials-grid');
      const countEl = document.getElementById('testimonials-count');
      if (gridEl) renderGrid(gridEl, filtered);
      if (countEl) countEl.textContent = `${filtered.length} review${filtered.length === 1 ? '' : 's'}`;
      // Re-init reveal on new items
      initReveal(document);
    }

    // Reset filter button (from empty state)
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-reset-filters]')) {
        state.propertyType = 'all';
        state.rating = 'all';
        state.language = 'all';
        state.sort = 'newest';
        if (sortSelect) sortSelect.value = 'newest';
        document.querySelectorAll<HTMLButtonElement>('.testimonials-filters__chip').forEach(c => {
          const k = c.getAttribute('data-filter-key');
          const v = c.getAttribute('data-filter-value');
          c.classList.toggle('testimonials-filters__chip--active', v === 'all');
          void k;
        });
        refresh();
      }
      if (target.closest('[data-open-submit-modal]')) {
        openSubmitModal();
      }
    });
  }, 60);

  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// SEO Setup (unchanged contract)
// ═══════════════════════════════════════════════════════════════════════════

export function setupTestimonialsPageSEO(): void {
  const stats = getTestimonialStats();

  document.title = `Client Reviews & Testimonials | Real House Erbil | ${stats.averageRating}/5 Rating`;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute(
      'content',
      `Read ${stats.totalReviews}+ verified client reviews for Real House Erbil. ${stats.averageRating}/5 average rating with ${stats.satisfactionPercentage}% satisfaction. See why clients trust us for property buying, selling, renting, and investment in Kurdistan.`
    );
  }

  let keywords = document.querySelector('meta[name="keywords"]');
  if (!keywords) {
    keywords = document.createElement('meta');
    keywords.setAttribute('name', 'keywords');
    document.head.appendChild(keywords);
  }
  keywords.setAttribute(
    'content',
    'Real House reviews, Real House testimonials, Erbil real estate reviews, Kurdistan property agent reviews, best real estate agent Erbil reviews, client testimonials Erbil'
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://realhouseiq.com/#organization',
    name: 'Real House IQ',
    image: 'https://realhouseiq.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Queen Tower, Erbil',
      addressLocality: 'Erbil',
      addressRegion: 'Kurdistan Region',
      addressCountry: 'IQ'
    },
    telephone: '+964 750 792 2138',
    url: 'https://realhouseiq.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: stats.averageRating.toString(),
      reviewCount: stats.totalReviews.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    review: testimonials.slice(0, 10).map(t => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      datePublished: t.reviewDate,
      reviewBody: t.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating.toString(),
        bestRating: '5',
        worstRating: '1'
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
