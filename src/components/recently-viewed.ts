// ═══════════════════════════════════════════════════════════════════════════
// Recently Viewed Properties Component
// Features: Track viewed properties, localStorage persistence, display widgets
// ═══════════════════════════════════════════════════════════════════════════

import { t } from '../i18n';

const RECENTLY_VIEWED_KEY = 'rh-recently-viewed';
const MAX_RECENTLY_VIEWED = 10;

export interface RecentlyViewedItem {
  id: string;
  viewedAt: number;
}

// ─── Storage Functions ─────────────────────────────────────────────────────

/**
 * Get all recently viewed items from localStorage
 */
export function getRecentlyViewed(): RecentlyViewedItem[] {
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Get recently viewed property IDs only
 */
export function getRecentlyViewedIds(): string[] {
  return getRecentlyViewed().map(item => item.id);
}

/**
 * Add a property to recently viewed
 * Moves to front if already exists, maintains max limit
 */
export function addToRecentlyViewed(propertyId: string): void {
  let items = getRecentlyViewed();

  // Remove if already exists (will be re-added at front)
  items = items.filter(item => item.id !== propertyId);

  // Add to front
  items.unshift({
    id: propertyId,
    viewedAt: Date.now()
  });

  // Maintain max limit
  if (items.length > MAX_RECENTLY_VIEWED) {
    items = items.slice(0, MAX_RECENTLY_VIEWED);
  }

  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
  dispatchRecentlyViewedChange();
}

/**
 * Remove a property from recently viewed
 */
export function removeFromRecentlyViewed(propertyId: string): void {
  const items = getRecentlyViewed();
  const index = items.findIndex(item => item.id === propertyId);
  if (index > -1) {
    items.splice(index, 1);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
    dispatchRecentlyViewedChange();
  }
}

/**
 * Clear all recently viewed items
 */
export function clearRecentlyViewed(): void {
  localStorage.removeItem(RECENTLY_VIEWED_KEY);
  dispatchRecentlyViewedChange();
}

/**
 * Get the count of recently viewed items
 */
export function getRecentlyViewedCount(): number {
  return getRecentlyViewed().length;
}

/**
 * Dispatch a custom event when recently viewed changes
 */
function dispatchRecentlyViewedChange(): void {
  const event = new CustomEvent('recentlyViewedChanged', {
    detail: {
      items: getRecentlyViewed(),
      count: getRecentlyViewedCount()
    }
  });
  window.dispatchEvent(event);
}

// ─── Track Property View ───────────────────────────────────────────────────

/**
 * Track when a user views a property detail page
 * Call this from the property detail page renderer
 */
export function trackPropertyView(propertyId: string): void {
  addToRecentlyViewed(propertyId);
}

// ─── UI Components ─────────────────────────────────────────────────────────

/**
 * Create the "Recently Viewed" section for homepage
 */
export function createRecentlyViewedSection(
  getPropertyById: (id: string) => unknown | undefined,
  createPropertyCard: (property: unknown) => HTMLElement
): HTMLElement | null {
  const items = getRecentlyViewed();
  if (items.length === 0) return null;

  const section = document.createElement('section');
  section.className = 'recently-viewed';
  section.setAttribute('aria-labelledby', 'recently-viewed-title');

  const container = document.createElement('div');
  container.className = 'container';

  // Header
  const header = document.createElement('div');
  header.className = 'recently-viewed__header';

  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'recently-viewed__title-wrapper';

  const title = document.createElement('h2');
  title.id = 'recently-viewed-title';
  title.className = 'recently-viewed__title';
  title.textContent = t('recentlyViewed.title');

  const subtitle = document.createElement('p');
  subtitle.className = 'recently-viewed__subtitle';
  subtitle.textContent = t('recentlyViewed.subtitle');

  titleWrapper.appendChild(title);
  titleWrapper.appendChild(subtitle);
  header.appendChild(titleWrapper);

  // Clear history button
  const clearBtn = document.createElement('button');
  clearBtn.className = 'recently-viewed__clear btn btn--ghost btn--sm';
  clearBtn.textContent = t('recentlyViewed.clearHistory');
  clearBtn.addEventListener('click', () => {
    clearRecentlyViewed();
    section.remove();
  });
  header.appendChild(clearBtn);

  container.appendChild(header);

  // Grid of properties
  const grid = document.createElement('div');
  grid.className = 'recently-viewed__grid';

  let validCount = 0;
  items.forEach(item => {
    const property = getPropertyById(item.id);
    if (property && validCount < 4) {
      const card = createPropertyCard(property);
      grid.appendChild(card);
      validCount++;
    }
  });

  // Only show section if we have valid properties
  if (validCount === 0) return null;

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

/**
 * Create the "Recently Viewed" sidebar widget for property pages
 */
export function createRecentlyViewedWidget(
  currentPropertyId: string,
  getPropertyById: (id: string) => unknown | undefined,
  generatePropertySlug: (property: unknown) => string,
  getDisplayPrice: (property: unknown) => string
): HTMLElement | null {
  const items = getRecentlyViewed().filter(item => item.id !== currentPropertyId);
  if (items.length === 0) return null;

  const widget = document.createElement('aside');
  widget.className = 'recently-viewed-widget';
  widget.setAttribute('aria-labelledby', 'rv-widget-title');

  const title = document.createElement('h4');
  title.id = 'rv-widget-title';
  title.className = 'recently-viewed-widget__title';
  title.textContent = t('recentlyViewed.title');
  widget.appendChild(title);

  const list = document.createElement('div');
  list.className = 'recently-viewed-widget__list';

  let validCount = 0;
  items.slice(0, 4).forEach(item => {
    const property = getPropertyById(item.id) as {
      id: string;
      title: string;
      images: string[];
      location: { district: string };
      type: string;
    } | undefined;

    if (property) {
      const card = document.createElement('a');
      card.className = 'recently-viewed-widget__item';
      card.href = `/properties/${generatePropertySlug(property as unknown)}`;
      card.setAttribute('data-route', '');

      const image = document.createElement('div');
      image.className = 'recently-viewed-widget__image';
      const img = document.createElement('img');
      img.src = property.images[0];
      img.alt = property.title;
      img.loading = 'lazy';
      img.width = 80;
      img.height = 60;
      image.appendChild(img);
      card.appendChild(image);

      const info = document.createElement('div');
      info.className = 'recently-viewed-widget__info';

      const name = document.createElement('span');
      name.className = 'recently-viewed-widget__name';
      name.textContent = property.title;
      info.appendChild(name);

      const details = document.createElement('span');
      details.className = 'recently-viewed-widget__details';
      details.textContent = `${property.type} in ${property.location.district}`;
      info.appendChild(details);

      const price = document.createElement('span');
      price.className = 'recently-viewed-widget__price';
      price.textContent = getDisplayPrice(property as unknown);
      info.appendChild(price);

      card.appendChild(info);
      list.appendChild(card);
      validCount++;
    }
  });

  if (validCount === 0) return null;

  widget.appendChild(list);

  // Clear link
  const clearLink = document.createElement('button');
  clearLink.className = 'recently-viewed-widget__clear';
  clearLink.textContent = t('recentlyViewed.clearHistory');
  clearLink.addEventListener('click', () => {
    clearRecentlyViewed();
    widget.remove();
  });
  widget.appendChild(clearLink);

  return widget;
}

/**
 * Create a compact recently viewed bar for mobile
 */
export function createRecentlyViewedBar(
  getPropertyById: (id: string) => unknown | undefined,
  generatePropertySlug: (property: unknown) => string
): HTMLElement | null {
  const items = getRecentlyViewed();
  if (items.length === 0) return null;

  const bar = document.createElement('div');
  bar.className = 'recently-viewed-bar';

  const label = document.createElement('span');
  label.className = 'recently-viewed-bar__label';
  label.textContent = t('recentlyViewed.label');
  bar.appendChild(label);

  const scrollContainer = document.createElement('div');
  scrollContainer.className = 'recently-viewed-bar__scroll';

  items.slice(0, 6).forEach(item => {
    const property = getPropertyById(item.id) as {
      id: string;
      images: string[];
      title: string;
    } | undefined;

    if (property) {
      const thumb = document.createElement('a');
      thumb.className = 'recently-viewed-bar__thumb';
      thumb.href = `/properties/${generatePropertySlug(property as unknown)}`;
      thumb.setAttribute('data-route', '');
      thumb.setAttribute('aria-label', property.title);

      const img = document.createElement('img');
      img.src = property.images[0];
      img.alt = '';
      img.loading = 'lazy';
      img.width = 48;
      img.height = 48;
      thumb.appendChild(img);

      scrollContainer.appendChild(thumb);
    }
  });

  bar.appendChild(scrollContainer);

  return bar;
}
