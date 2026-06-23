// ═══════════════════════════════════════════════════════════════════════════
// Wishlist Page - Saved Properties with Share, Sort, Bulk Actions & Lists
// ═══════════════════════════════════════════════════════════════════════════

import {
  getWishlistIds,
  clearWishlist,
  removeFromWishlist,
  generateWishlistShareLink,
  parseSharedWishlist,
  importSharedWishlist,
  updateWishlistBadge,
  showWishlistToast
} from '../components/wishlist';
import {
  getRecentlyViewedIds,
  clearRecentlyViewed
} from '../components/recently-viewed';
import {
  getPropertyById,
  getDisplayPrice,
  generatePropertySlug,
  type Property
} from '../data/properties';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  type BreadcrumbItem
} from '../components/internal-linking';
import { createSEOImage, generateSrcSet } from '../utils/image-seo';
import { createEmptyState as createUiEmptyState } from '../utils/ui-states';

// ─── Helper Functions ────────────────────────────────────────────────────────

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

function createHeartFilledSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('class', 'wishlist-page__heart-icon');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
  svg.appendChild(path);

  return svg;
}

function createShareSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('aria-hidden', 'true');

  const c1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c1.setAttribute('cx', '18'); c1.setAttribute('cy', '5'); c1.setAttribute('r', '3');
  svg.appendChild(c1);
  const c2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c2.setAttribute('cx', '6'); c2.setAttribute('cy', '12'); c2.setAttribute('r', '3');
  svg.appendChild(c2);
  const c3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c3.setAttribute('cx', '18'); c3.setAttribute('cy', '19'); c3.setAttribute('r', '3');
  svg.appendChild(c3);
  const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  l1.setAttribute('x1', '8.59'); l1.setAttribute('y1', '13.51'); l1.setAttribute('x2', '15.42'); l1.setAttribute('y2', '17.49');
  svg.appendChild(l1);
  const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  l2.setAttribute('x1', '15.41'); l2.setAttribute('y1', '6.51'); l2.setAttribute('x2', '8.59'); l2.setAttribute('y2', '10.49');
  svg.appendChild(l2);

  return svg;
}

function createTrashSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('aria-hidden', 'true');

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '3 6 5 6 21 6');
  svg.appendChild(polyline);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2');
  svg.appendChild(path);

  return svg;
}

function createCloseSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('aria-hidden', 'true');
  const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  l1.setAttribute('x1', '18'); l1.setAttribute('y1', '6'); l1.setAttribute('x2', '6'); l1.setAttribute('y2', '18');
  svg.appendChild(l1);
  const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  l2.setAttribute('x1', '6'); l2.setAttribute('y1', '6'); l2.setAttribute('x2', '18'); l2.setAttribute('y2', '18');
  svg.appendChild(l2);
  return svg;
}

// ─── State ─────────────────────────────────────────────────────────────────

type SortMode = 'newest' | 'price-asc' | 'price-desc' | 'recently-viewed';

interface NamedList {
  name: string;
  ids: string[];
}

const DEFAULT_LIST = 'My Wishlist';
const LISTS_KEY = 'wishlist_lists';

const selection = new Set<string>();
let currentSort: SortMode = 'newest';
let activeListName: string = DEFAULT_LIST;

function readNamedLists(): NamedList[] {
  try {
    const raw = localStorage.getItem(LISTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(l => l && typeof l.name === 'string' && Array.isArray(l.ids));
  } catch {
    return [];
  }
}

function writeNamedLists(lists: NamedList[]): void {
  try {
    localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
  } catch {
    /* storage full or disabled */
  }
}

function getActiveListIds(): string[] {
  if (activeListName === DEFAULT_LIST) return getWishlistIds();
  const lists = readNamedLists();
  const list = lists.find(l => l.name === activeListName);
  return list ? list.ids : [];
}

// ─── Sort logic ────────────────────────────────────────────────────────────

function sortPropertyIds(ids: string[], mode: SortMode): string[] {
  if (mode === 'newest') return ids;

  if (mode === 'recently-viewed') {
    const recent = getRecentlyViewedIds();
    const inWishlist = new Set(ids);
    const ordered = recent.filter(id => inWishlist.has(id));
    const remaining = ids.filter(id => !ordered.includes(id));
    return [...ordered, ...remaining];
  }

  // Price sorts — drop ids without a property, keep zero-price at the end
  const enriched = ids
    .map(id => ({ id, prop: getPropertyById(id) }))
    .filter(e => e.prop !== undefined) as { id: string; prop: Property }[];

  enriched.sort((a, b) => {
    const ap = a.prop.price || 0;
    const bp = b.prop.price || 0;
    if (mode === 'price-asc') {
      // Send 0-priced ("contact for price") items to the end
      if (ap === 0 && bp === 0) return 0;
      if (ap === 0) return 1;
      if (bp === 0) return -1;
      return ap - bp;
    }
    return bp - ap;
  });

  return enriched.map(e => e.id);
}

// ─── Wishlist Property Card (row layout) ───────────────────────────────────

function createWishlistPropertyCard(property: Property, onRemove: () => void): HTMLElement {
  const card = createElement('article', 'wishlist-card wishlist-card--row');
  card.setAttribute('data-id', property.id);

  // Selection checkbox
  const checkboxWrap = createElement('label', 'wishlist-card__checkbox');
  checkboxWrap.setAttribute('aria-label', `Select ${property.title}`);
  const checkbox = createElement('input', 'wishlist-card__checkbox-input');
  checkbox.type = 'checkbox';
  checkbox.checked = selection.has(property.id);
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      selection.add(property.id);
      card.classList.add('wishlist-card--selected');
    } else {
      selection.delete(property.id);
      card.classList.remove('wishlist-card--selected');
    }
    updateBulkBar();
    updateSelectAllCheckbox();
  });
  if (checkbox.checked) card.classList.add('wishlist-card--selected');
  checkboxWrap.appendChild(checkbox);
  const checkboxIndicator = createElement('span', 'wishlist-card__checkbox-indicator');
  checkboxWrap.appendChild(checkboxIndicator);
  card.appendChild(checkboxWrap);

  // Remove X (top-right)
  const closeBtn = createElement('button', 'wishlist-card__close');
  closeBtn.setAttribute('aria-label', `Remove ${property.title} from wishlist`);
  closeBtn.type = 'button';
  closeBtn.appendChild(createCloseSVG());
  closeBtn.addEventListener('click', () => {
    card.classList.add('wishlist-card--removing');
    setTimeout(() => onRemove(), 250);
  });
  card.appendChild(closeBtn);

  // Image section
  const imageWrapper = createElement('a', 'wishlist-card__image');
  imageWrapper.href = `/properties/${generatePropertySlug(property)}`;
  imageWrapper.setAttribute('data-route', '');

  const img = createSEOImage({
    src: property.images[0],
    alt: `${property.title} - ${property.type} in ${property.location.district}`,
    className: 'wishlist-card__img',
    loading: 'lazy',
    width: 300,
    height: 200,
    srcset: generateSrcSet(property.images[0], [300, 400, 600]),
    sizes: '(max-width: 768px) 100vw, 200px'
  });
  imageWrapper.appendChild(img);

  const statusBadge = createElement('span', `wishlist-card__status wishlist-card__status--${property.status.toLowerCase().replace(/\s/g, '-')}`);
  statusBadge.textContent = property.status;
  imageWrapper.appendChild(statusBadge);

  card.appendChild(imageWrapper);

  // Content section
  const content = createElement('div', 'wishlist-card__content');

  const typeTag = createElement('span', 'wishlist-card__type', property.type);
  content.appendChild(typeTag);

  const titleLink = createElement('a', 'wishlist-card__title');
  titleLink.href = `/properties/${generatePropertySlug(property)}`;
  titleLink.setAttribute('data-route', '');
  titleLink.textContent = property.title;
  content.appendChild(titleLink);

  const location = createElement('p', 'wishlist-card__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${property.location.district}, ${property.location.city}`));
  content.appendChild(location);

  const specs = createElement('div', 'wishlist-card__specs');

  if (property.specs.beds > 0) {
    const beds = createElement('span', 'wishlist-card__spec');
    beds.appendChild(createSVGUse('icon-bed'));
    beds.appendChild(document.createTextNode(`${property.specs.beds} beds`));
    specs.appendChild(beds);
  }

  const baths = createElement('span', 'wishlist-card__spec');
  baths.appendChild(createSVGUse('icon-bath'));
  baths.appendChild(document.createTextNode(`${property.specs.baths} baths`));
  specs.appendChild(baths);

  const area = createElement('span', 'wishlist-card__spec');
  area.appendChild(createSVGUse('icon-area'));
  area.appendChild(document.createTextNode(`${property.specs.sqm.toLocaleString()} m²`));
  specs.appendChild(area);

  content.appendChild(specs);

  const price = createElement('span', 'wishlist-card__price');
  price.textContent = getDisplayPrice(property);
  content.appendChild(price);

  card.appendChild(content);

  // Actions section
  const actions = createElement('div', 'wishlist-card__actions');

  const inquireBtn = createElement('a', 'btn btn--primary btn--sm wishlist-card__btn');
  inquireBtn.href = `/contact?property=${property.id}`;
  inquireBtn.setAttribute('data-route', '');
  inquireBtn.textContent = 'Inquire';
  actions.appendChild(inquireBtn);

  const viewBtn = createElement('a', 'btn btn--outline btn--sm wishlist-card__btn');
  viewBtn.href = `/properties/${generatePropertySlug(property)}`;
  viewBtn.setAttribute('data-route', '');
  viewBtn.textContent = 'View Details';
  actions.appendChild(viewBtn);

  card.appendChild(actions);

  return card;
}

// ─── Empty State Component ───────────────────────────────────────────────────

function createEmptyState(): HTMLElement {
  return createUiEmptyState({
    className: 'wishlist-page__empty',
    icon: 'heart',
    title: 'Your wishlist is empty',
    description: 'Tap the heart icon on any property to save it here. You can share your wishlist with family or our agents in one tap once you have some picks.',
    primaryAction: { label: 'Browse properties', href: '/properties' },
    secondaryAction: { label: 'Explore projects', href: '/projects' }
  });
}

// ─── Shared Wishlist Banner ──────────────────────────────────────────────────

function createSharedWishlistBanner(sharedIds: string[], onImport: () => void): HTMLElement {
  const banner = createElement('div', 'wishlist-page__shared-banner');

  const icon = createElement('span', 'wishlist-page__shared-icon');
  icon.appendChild(createShareSVG());
  banner.appendChild(icon);

  const text = createElement('div', 'wishlist-page__shared-text');
  const title = createElement('strong', '', `Shared Wishlist (${sharedIds.length} properties)`);
  text.appendChild(title);
  const desc = createElement('span', '', ' - Would you like to add these to your wishlist?');
  text.appendChild(desc);
  banner.appendChild(text);

  const actions = createElement('div', 'wishlist-page__shared-actions');

  const importBtn = createElement('button', 'btn btn--primary btn--sm', 'Add to My Wishlist');
  importBtn.addEventListener('click', () => {
    importSharedWishlist(sharedIds);
    onImport();
    showWishlistToast(`Added ${sharedIds.length} properties to your wishlist`);
  });
  actions.appendChild(importBtn);

  const dismissBtn = createElement('button', 'btn btn--ghost btn--sm', 'Dismiss');
  dismissBtn.addEventListener('click', () => {
    banner.remove();
    const url = new URL(window.location.href);
    url.searchParams.delete('share');
    window.history.replaceState({}, '', url.toString());
  });
  actions.appendChild(dismissBtn);

  banner.appendChild(actions);

  return banner;
}

// ─── Lists tabs ────────────────────────────────────────────────────────────

function createListsBar(): HTMLElement {
  const wrap = createElement('div', 'wishlist-page__lists');
  wrap.setAttribute('role', 'tablist');

  const lists = readNamedLists();
  const names = [DEFAULT_LIST, ...lists.map(l => l.name)];

  names.forEach(name => {
    const tab = createElement('button', 'wishlist-page__list-tab');
    tab.type = 'button';
    tab.textContent = name;
    if (name === activeListName) tab.classList.add('wishlist-page__list-tab--active');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', name === activeListName ? 'true' : 'false');
    tab.addEventListener('click', () => {
      activeListName = name;
      selection.clear();
      rerenderWishlistContent();
      rerenderToolbar();
    });
    wrap.appendChild(tab);
  });

  const newBtn = createElement('button', 'wishlist-page__new-list-btn', '+ New List');
  newBtn.type = 'button';
  newBtn.addEventListener('click', () => {
    if (wrap.querySelector('.wishlist-page__new-list-input')) return;
    const input = createElement('input', 'wishlist-page__new-list-input');
    input.type = 'text';
    input.placeholder = 'List name…';
    input.maxLength = 40;
    const commit = () => {
      const value = input.value.trim();
      if (!value) {
        input.remove();
        return;
      }
      const existing = readNamedLists();
      if (existing.some(l => l.name === value) || value === DEFAULT_LIST) {
        showWishlistToast('That list name is already taken');
        input.remove();
        return;
      }
      existing.push({ name: value, ids: [] });
      writeNamedLists(existing);
      activeListName = value;
      selection.clear();
      rerenderToolbar();
      rerenderWishlistContent();
      showWishlistToast(`Created list "${value}"`);
    };
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); commit(); }
      else if (e.key === 'Escape') input.remove();
    });
    input.addEventListener('blur', commit);
    wrap.insertBefore(input, newBtn);
    input.focus();
  });
  wrap.appendChild(newBtn);

  return wrap;
}

// ─── Toolbar ───────────────────────────────────────────────────────────────

function createToolbar(): HTMLElement {
  const toolbar = createElement('div', 'wishlist-page__toolbar');

  // Left: select all + lists
  const left = createElement('div', 'wishlist-page__toolbar-left');

  const selectAllLabel = createElement('label', 'wishlist-page__select-all');
  const selectAll = createElement('input', 'wishlist-page__select-all-input');
  selectAll.type = 'checkbox';
  selectAll.id = 'wishlist-select-all';
  selectAll.addEventListener('change', () => {
    const ids = sortPropertyIds(getActiveListIds(), currentSort);
    if (selectAll.checked) ids.forEach(id => selection.add(id));
    else ids.forEach(id => selection.delete(id));
    rerenderGridOnly();
    updateBulkBar();
  });
  selectAllLabel.appendChild(selectAll);
  const selectAllText = createElement('span', undefined, 'Select all');
  selectAllLabel.appendChild(selectAllText);
  left.appendChild(selectAllLabel);

  left.appendChild(createListsBar());
  toolbar.appendChild(left);

  // Right: sort
  const right = createElement('div', 'wishlist-page__toolbar-right');
  const sortLabel = createElement('label', 'wishlist-page__sort-label');
  sortLabel.setAttribute('for', 'wishlist-sort');
  sortLabel.textContent = 'Sort:';
  right.appendChild(sortLabel);

  const sort = createElement('select', 'wishlist-page__sort');
  sort.id = 'wishlist-sort';
  const sortOptions: { value: SortMode; label: string }[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price (low to high)' },
    { value: 'price-desc', label: 'Price (high to low)' },
    { value: 'recently-viewed', label: 'Recently viewed' }
  ];
  sortOptions.forEach(opt => {
    const o = createElement('option', undefined, opt.label);
    o.value = opt.value;
    if (opt.value === currentSort) o.selected = true;
    sort.appendChild(o);
  });
  sort.addEventListener('change', () => {
    currentSort = sort.value as SortMode;
    rerenderGridOnly();
  });
  right.appendChild(sort);

  toolbar.appendChild(right);

  return toolbar;
}

function rerenderToolbar(): void {
  const old = document.querySelector('.wishlist-page__toolbar');
  if (!old || !old.parentElement) return;
  const fresh = createToolbar();
  old.parentElement.replaceChild(fresh, old);
}

function updateSelectAllCheckbox(): void {
  const cb = document.getElementById('wishlist-select-all') as HTMLInputElement | null;
  if (!cb) return;
  const ids = sortPropertyIds(getActiveListIds(), currentSort);
  if (ids.length === 0) {
    cb.checked = false;
    cb.indeterminate = false;
    return;
  }
  const selectedCount = ids.filter(id => selection.has(id)).length;
  cb.checked = selectedCount === ids.length;
  cb.indeterminate = selectedCount > 0 && selectedCount < ids.length;
}

// ─── Bulk Action Bar ───────────────────────────────────────────────────────

function createBulkBar(): HTMLElement {
  const bar = createElement('div', 'wishlist-page__bulk-bar');
  bar.id = 'wishlist-bulk-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Bulk actions');

  const count = createElement('span', 'wishlist-page__bulk-count', '0 selected');
  count.id = 'wishlist-bulk-count';
  bar.appendChild(count);

  const actions = createElement('div', 'wishlist-page__bulk-actions');

  const removeBtn = createElement('button', 'btn btn--ghost btn--sm');
  removeBtn.type = 'button';
  removeBtn.appendChild(createTrashSVG());
  removeBtn.appendChild(document.createTextNode('Remove Selected'));
  removeBtn.addEventListener('click', () => {
    if (selection.size === 0) return;
    const ids = Array.from(selection);
    if (activeListName === DEFAULT_LIST) {
      ids.forEach(id => removeFromWishlist(id));
      updateWishlistBadge();
    } else {
      const lists = readNamedLists();
      const list = lists.find(l => l.name === activeListName);
      if (list) {
        list.ids = list.ids.filter(id => !selection.has(id));
        writeNamedLists(lists);
      }
    }
    selection.clear();
    rerenderWishlistContent();
    updateBulkBar();
    showWishlistToast(`Removed ${ids.length} ${ids.length === 1 ? 'property' : 'properties'}`);
  });
  actions.appendChild(removeBtn);

  const shareBtn = createElement('button', 'btn btn--outline btn--sm');
  shareBtn.type = 'button';
  shareBtn.appendChild(createShareSVG());
  shareBtn.appendChild(document.createTextNode('Share Selected'));
  shareBtn.addEventListener('click', () => {
    if (selection.size === 0) return;
    const ids = Array.from(selection);
    const url = `${window.location.origin}/wishlist?share=${encodeURIComponent(ids.join(','))}`;
    copyToClipboard(url, 'Link copied!');
  });
  actions.appendChild(shareBtn);

  const clearSelBtn = createElement('button', 'btn btn--ghost btn--sm', 'Clear Selection');
  clearSelBtn.type = 'button';
  clearSelBtn.addEventListener('click', () => {
    selection.clear();
    rerenderGridOnly();
    updateBulkBar();
  });
  actions.appendChild(clearSelBtn);

  bar.appendChild(actions);

  return bar;
}

function updateBulkBar(): void {
  const bar = document.getElementById('wishlist-bulk-bar');
  const count = document.getElementById('wishlist-bulk-count');
  if (!bar || !count) return;
  count.textContent = `${selection.size} selected`;
  bar.classList.toggle('wishlist-page__bulk-bar--visible', selection.size > 0);
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Wishlist Page Renderer
// ═══════════════════════════════════════════════════════════════════════════

export function renderWishlistPage(): DocumentFragment {
  // Reset transient state on fresh renders
  selection.clear();
  currentSort = 'newest';
  activeListName = DEFAULT_LIST;

  const fragment = document.createDocumentFragment();
  const page = createElement('section', 'wishlist-page');
  page.setAttribute('aria-labelledby', 'wishlist-title');

  // ── Cinematic Hero ──────────────────────────────────────────────────────
  const hero = createElement('div', 'wishlist-page__hero');

  const heroBg = createElement('div', 'wishlist-page__hero-bg');
  heroBg.setAttribute('aria-hidden', 'true');
  hero.appendChild(heroBg);

  const heroContainer = createElement('div', 'container wishlist-page__hero-container');

  // Breadcrumbs inside hero
  const breadcrumbNav = createElement('nav', 'wishlist-page__breadcrumbs');
  breadcrumbNav.setAttribute('aria-label', 'Breadcrumb navigation');
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Wishlist', url: '/wishlist', current: true }
  ];
  breadcrumbNav.appendChild(createBreadcrumbs(breadcrumbs));
  heroContainer.appendChild(breadcrumbNav);
  injectBreadcrumbSchema(breadcrumbs);

  const titleWrapper = createElement('div', 'wishlist-page__title-wrapper');
  const title = createElement('h1', 'wishlist-page__title');
  title.id = 'wishlist-title';
  title.appendChild(createHeartFilledSVG());
  title.appendChild(document.createTextNode('My Wishlist'));
  titleWrapper.appendChild(title);

  const initialIds = getWishlistIds();
  const subtitle = createElement('p', 'wishlist-page__subtitle');
  subtitle.textContent = initialIds.length === 0
    ? 'Save your favorite properties — share them with family or your agent.'
    : `${initialIds.length} saved ${initialIds.length === 1 ? 'property' : 'properties'}`;
  titleWrapper.appendChild(subtitle);
  heroContainer.appendChild(titleWrapper);

  hero.appendChild(heroContainer);
  page.appendChild(hero);

  const container = createElement('div', 'container');

  // Shared wishlist banner
  const sharedIds = parseSharedWishlist();
  if (sharedIds && sharedIds.length > 0) {
    const banner = createSharedWishlistBanner(sharedIds, () => rerenderWishlistContent());
    container.appendChild(banner);
  }

  // Header actions (Share Wishlist, Clear All)
  if (initialIds.length > 0) {
    const headerActions = createElement('div', 'wishlist-page__header-actions');

    const shareBtn = createElement('button', 'btn btn--outline wishlist-page__share-btn');
    shareBtn.appendChild(createShareSVG());
    shareBtn.appendChild(document.createTextNode('Share Wishlist'));
    shareBtn.addEventListener('click', async () => {
      const shareLink = generateWishlistShareLink();
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My Real House Wishlist',
            text: `Check out ${initialIds.length} properties I saved on Real House`,
            url: shareLink
          });
        } catch {
          copyToClipboard(shareLink, 'Wishlist link copied to clipboard!');
        }
      } else {
        copyToClipboard(shareLink, 'Wishlist link copied to clipboard!');
      }
    });
    headerActions.appendChild(shareBtn);

    const clearBtn = createElement('button', 'btn btn--ghost wishlist-page__clear-btn');
    clearBtn.appendChild(createTrashSVG());
    clearBtn.appendChild(document.createTextNode('Clear All'));
    clearBtn.addEventListener('click', () => {
      if (!confirm('Are you sure you want to clear your entire wishlist?')) return;
      if (activeListName === DEFAULT_LIST) {
        clearWishlist();
        updateWishlistBadge();
      } else {
        const lists = readNamedLists();
        const list = lists.find(l => l.name === activeListName);
        if (list) { list.ids = []; writeNamedLists(lists); }
      }
      selection.clear();
      rerenderWishlistContent();
      showWishlistToast('Wishlist cleared');
    });
    headerActions.appendChild(clearBtn);

    container.appendChild(headerActions);
  }

  // Toolbar (lists + sort + select-all)
  container.appendChild(createToolbar());

  // Content area
  const content = createElement('div', 'wishlist-page__content');
  content.id = 'wishlist-content';
  renderGridInto(content);
  container.appendChild(content);

  // Bulk action bar
  container.appendChild(createBulkBar());

  // Recently Viewed
  const recentlyViewedIds = getRecentlyViewedIds();
  if (recentlyViewedIds.length > 0) {
    const recentSection = createElement('section', 'wishlist-page__recently-viewed');
    recentSection.setAttribute('aria-labelledby', 'recent-title');

    const recentHeader = createElement('div', 'wishlist-page__recent-header');
    const recentTitle = createElement('h2', 'wishlist-page__recent-title', 'Recently Viewed');
    recentTitle.id = 'recent-title';
    recentHeader.appendChild(recentTitle);

    const clearRecentBtn = createElement('button', 'btn btn--ghost btn--sm', 'Clear History');
    clearRecentBtn.addEventListener('click', () => {
      if (confirm('Clear your recently viewed properties?')) {
        clearRecentlyViewed();
        recentSection.remove();
      }
    });
    recentHeader.appendChild(clearRecentBtn);
    recentSection.appendChild(recentHeader);

    const recentGrid = createElement('div', 'wishlist-page__recent-grid');
    let count = 0;
    for (const id of recentlyViewedIds) {
      if (count >= 4) break;
      const property = getPropertyById(id);
      if (property) {
        recentGrid.appendChild(createRecentlyViewedCard(property));
        count++;
      }
    }
    if (count > 0) {
      recentSection.appendChild(recentGrid);
      container.appendChild(recentSection);
    }
  }

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── Grid Rendering ────────────────────────────────────────────────────────

function renderGridInto(target: HTMLElement): void {
  while (target.firstChild) target.removeChild(target.firstChild);

  const ids = sortPropertyIds(getActiveListIds(), currentSort);

  if (ids.length === 0) {
    target.appendChild(createEmptyState());
    return;
  }

  const grid = createElement('div', 'wishlist-page__grid');
  grid.id = 'wishlist-grid';

  ids.forEach(id => {
    const property = getPropertyById(id);
    if (!property) return;
    const card = createWishlistPropertyCard(property, () => {
      if (activeListName === DEFAULT_LIST) {
        removeFromWishlist(id);
        updateWishlistBadge();
      } else {
        const lists = readNamedLists();
        const list = lists.find(l => l.name === activeListName);
        if (list) {
          list.ids = list.ids.filter(x => x !== id);
          writeNamedLists(lists);
        }
      }
      selection.delete(id);
      rerenderWishlistContent();
      updateBulkBar();
    });
    grid.appendChild(card);
  });

  target.appendChild(grid);
}

function rerenderGridOnly(): void {
  const content = document.getElementById('wishlist-content');
  if (!content) return;
  renderGridInto(content);
  updateSelectAllCheckbox();
}

// ─── Recently Viewed Card (Compact) ──────────────────────────────────────────

function createRecentlyViewedCard(property: Property): HTMLElement {
  const card = createElement('a', 'recently-viewed-card');
  card.href = `/properties/${generatePropertySlug(property)}`;
  card.setAttribute('data-route', '');

  const imageWrapper = createElement('div', 'recently-viewed-card__image');
  const img = createSEOImage({
    src: property.images[0],
    alt: property.title,
    loading: 'lazy',
    width: 200,
    height: 150
  });
  imageWrapper.appendChild(img);
  card.appendChild(imageWrapper);

  const content = createElement('div', 'recently-viewed-card__content');
  const title = createElement('h3', 'recently-viewed-card__title', property.title);
  content.appendChild(title);
  const location = createElement('p', 'recently-viewed-card__location');
  location.textContent = `${property.type} in ${property.location.district}`;
  content.appendChild(location);
  const price = createElement('span', 'recently-viewed-card__price');
  price.textContent = getDisplayPrice(property);
  content.appendChild(price);
  card.appendChild(content);

  return card;
}

// ─── Helper: Re-render Content ───────────────────────────────────────────────

function rerenderWishlistContent(): void {
  const content = document.getElementById('wishlist-content');
  if (!content) return;

  const ids = getActiveListIds();
  const subtitle = document.querySelector('.wishlist-page__subtitle');
  if (subtitle) {
    subtitle.textContent = ids.length === 0
      ? 'Save your favorite properties — share them with family or your agent.'
      : `${ids.length} saved ${ids.length === 1 ? 'property' : 'properties'}`;
  }

  const headerActions = document.querySelector('.wishlist-page__header-actions') as HTMLElement | null;
  if (headerActions) {
    headerActions.style.display = ids.length === 0 ? 'none' : 'flex';
  }

  renderGridInto(content);
  updateSelectAllCheckbox();
  updateBulkBar();
}

// ─── Helper: Copy to Clipboard ───────────────────────────────────────────────

async function copyToClipboard(text: string, message: string = 'Link copied to clipboard!'): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    showWishlistToast(message);
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showWishlistToast(message);
  }
}

// ─── SEO Setup ───────────────────────────────────────────────────────────────

export function setupWishlistPageSEO(): void {
  document.title = 'My Wishlist | Saved Properties | Real House Erbil';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'View and manage your saved properties on Real House. Share your wishlist with friends and family. Find your dream home in Erbil, Kurdistan.');
  }

  let robots = document.querySelector('meta[name="robots"]');
  if (!robots) {
    robots = document.createElement('meta');
    robots.setAttribute('name', 'robots');
    document.head.appendChild(robots);
  }
  robots.setAttribute('content', 'noindex, follow');
}
