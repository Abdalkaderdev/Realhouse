// ═══════════════════════════════════════════════════════════════════════════
// Wishlist Page - Saved Properties with Share Functionality
// ═══════════════════════════════════════════════════════════════════════════

import {
  getWishlist,
  getWishlistIds,
  clearWishlist,
  removeFromWishlist,
  generateWishlistShareLink,
  parseSharedWishlist,
  importSharedWishlist,
  updateWishlistBadge,
  showWishlistToast,
  type WishlistItem
} from '../components/wishlist';
import {
  getRecentlyViewed,
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
import { createSEOImage, generateSrcSet, generateSizes, IMAGE_DIMENSIONS } from '../utils/image-seo';

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

  const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle1.setAttribute('cx', '18');
  circle1.setAttribute('cy', '5');
  circle1.setAttribute('r', '3');
  svg.appendChild(circle1);

  const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle2.setAttribute('cx', '6');
  circle2.setAttribute('cy', '12');
  circle2.setAttribute('r', '3');
  svg.appendChild(circle2);

  const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle3.setAttribute('cx', '18');
  circle3.setAttribute('cy', '19');
  circle3.setAttribute('r', '3');
  svg.appendChild(circle3);

  const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line1.setAttribute('x1', '8.59');
  line1.setAttribute('y1', '13.51');
  line1.setAttribute('x2', '15.42');
  line1.setAttribute('y2', '17.49');
  svg.appendChild(line1);

  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttribute('x1', '15.41');
  line2.setAttribute('y1', '6.51');
  line2.setAttribute('x2', '8.59');
  line2.setAttribute('y2', '10.49');
  svg.appendChild(line2);

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

function createLinkSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('aria-hidden', 'true');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71');
  svg.appendChild(path1);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71');
  svg.appendChild(path2);

  return svg;
}

// ─── Wishlist Property Card ──────────────────────────────────────────────────

function createWishlistPropertyCard(property: Property, onRemove: () => void): HTMLElement {
  const card = createElement('article', 'wishlist-card');
  card.setAttribute('data-id', property.id);

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
    sizes: '(max-width: 768px) 100vw, 300px'
  });
  imageWrapper.appendChild(img);

  // Status badge
  const statusBadge = createElement('span', `wishlist-card__status wishlist-card__status--${property.status.toLowerCase().replace(/\s/g, '-')}`);
  statusBadge.textContent = property.status;
  imageWrapper.appendChild(statusBadge);

  card.appendChild(imageWrapper);

  // Content section
  const content = createElement('div', 'wishlist-card__content');

  // Type tag
  const typeTag = createElement('span', 'wishlist-card__type', property.type);
  content.appendChild(typeTag);

  // Title
  const titleLink = createElement('a', 'wishlist-card__title');
  titleLink.href = `/properties/${generatePropertySlug(property)}`;
  titleLink.setAttribute('data-route', '');
  titleLink.textContent = property.title;
  content.appendChild(titleLink);

  // Location
  const location = createElement('p', 'wishlist-card__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${property.location.district}, ${property.location.city}`));
  content.appendChild(location);

  // Specs
  const specs = createElement('div', 'wishlist-card__specs');

  if (property.specs.beds > 0) {
    const beds = createElement('span', 'wishlist-card__spec');
    beds.appendChild(createSVGUse('icon-bed'));
    beds.appendChild(document.createTextNode(property.specs.beds.toString()));
    specs.appendChild(beds);
  }

  const baths = createElement('span', 'wishlist-card__spec');
  baths.appendChild(createSVGUse('icon-bath'));
  baths.appendChild(document.createTextNode(property.specs.baths.toString()));
  specs.appendChild(baths);

  const area = createElement('span', 'wishlist-card__spec');
  area.appendChild(createSVGUse('icon-area'));
  area.appendChild(document.createTextNode(`${property.specs.sqm.toLocaleString()} m\u00B2`));
  specs.appendChild(area);

  content.appendChild(specs);

  // Price
  const price = createElement('span', 'wishlist-card__price');
  price.textContent = getDisplayPrice(property);
  content.appendChild(price);

  card.appendChild(content);

  // Actions section
  const actions = createElement('div', 'wishlist-card__actions');

  // View button
  const viewBtn = createElement('a', 'btn btn--primary btn--sm wishlist-card__btn');
  viewBtn.href = `/properties/${generatePropertySlug(property)}`;
  viewBtn.setAttribute('data-route', '');
  viewBtn.textContent = 'View Details';
  actions.appendChild(viewBtn);

  // Remove button
  const removeBtn = createElement('button', 'btn btn--ghost btn--sm wishlist-card__btn wishlist-card__btn--remove');
  removeBtn.appendChild(createTrashSVG());
  removeBtn.appendChild(document.createTextNode('Remove'));
  removeBtn.addEventListener('click', () => {
    card.classList.add('wishlist-card--removing');
    setTimeout(() => {
      onRemove();
    }, 300);
  });
  actions.appendChild(removeBtn);

  card.appendChild(actions);

  return card;
}

// ─── Empty State Component ───────────────────────────────────────────────────

function createEmptyState(): HTMLElement {
  const empty = createElement('div', 'wishlist-page__empty');

  const icon = createElement('div', 'wishlist-page__empty-icon');
  icon.appendChild(createHeartFilledSVG());
  empty.appendChild(icon);

  const title = createElement('h2', 'wishlist-page__empty-title', 'Your Wishlist is Empty');
  empty.appendChild(title);

  const text = createElement('p', 'wishlist-page__empty-text');
  text.textContent = 'Save properties you love by clicking the heart icon on any property card. Your saved properties will appear here.';
  empty.appendChild(text);

  const browseBtn = createElement('a', 'btn btn--primary wishlist-page__empty-btn', 'Browse Properties');
  browseBtn.href = '/properties';
  browseBtn.setAttribute('data-route', '');
  empty.appendChild(browseBtn);

  return empty;
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
    // Remove share param from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('share');
    window.history.replaceState({}, '', url.toString());
  });
  actions.appendChild(dismissBtn);

  banner.appendChild(actions);

  return banner;
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Wishlist Page Renderer
// ═══════════════════════════════════════════════════════════════════════════

export function renderWishlistPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('section', 'wishlist-page');
  page.setAttribute('aria-labelledby', 'wishlist-title');

  const container = createElement('div', 'container');

  // Breadcrumbs
  const breadcrumbNav = createElement('nav', 'wishlist-page__breadcrumbs');
  breadcrumbNav.setAttribute('aria-label', 'Breadcrumb navigation');
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Wishlist', url: '/wishlist', current: true }
  ];
  breadcrumbNav.appendChild(createBreadcrumbs(breadcrumbs));
  container.appendChild(breadcrumbNav);
  injectBreadcrumbSchema(breadcrumbs);

  // Check for shared wishlist
  const sharedIds = parseSharedWishlist();
  if (sharedIds && sharedIds.length > 0) {
    const banner = createSharedWishlistBanner(sharedIds, () => {
      // Re-render the page after import
      rerenderWishlistContent();
    });
    container.appendChild(banner);
  }

  // Header
  const header = createElement('header', 'wishlist-page__header');

  const titleWrapper = createElement('div', 'wishlist-page__title-wrapper');
  const title = createElement('h1', 'wishlist-page__title');
  title.id = 'wishlist-title';
  title.appendChild(createHeartFilledSVG());
  title.appendChild(document.createTextNode('My Wishlist'));
  titleWrapper.appendChild(title);

  const wishlistIds = getWishlistIds();
  const subtitle = createElement('p', 'wishlist-page__subtitle');
  subtitle.textContent = wishlistIds.length === 0
    ? 'Save your favorite properties'
    : `${wishlistIds.length} saved ${wishlistIds.length === 1 ? 'property' : 'properties'}`;
  titleWrapper.appendChild(subtitle);

  header.appendChild(titleWrapper);

  // Header actions (if has items)
  if (wishlistIds.length > 0) {
    const headerActions = createElement('div', 'wishlist-page__header-actions');

    // Share button
    const shareBtn = createElement('button', 'btn btn--outline wishlist-page__share-btn');
    shareBtn.appendChild(createShareSVG());
    shareBtn.appendChild(document.createTextNode('Share Wishlist'));
    shareBtn.addEventListener('click', async () => {
      const shareLink = generateWishlistShareLink();

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My Real House Wishlist',
            text: `Check out ${wishlistIds.length} properties I saved on Real House`,
            url: shareLink
          });
        } catch {
          // User cancelled or share failed, fall back to copy
          copyToClipboard(shareLink);
        }
      } else {
        copyToClipboard(shareLink);
      }
    });
    headerActions.appendChild(shareBtn);

    // Clear all button
    const clearBtn = createElement('button', 'btn btn--ghost wishlist-page__clear-btn');
    clearBtn.appendChild(createTrashSVG());
    clearBtn.appendChild(document.createTextNode('Clear All'));
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your entire wishlist?')) {
        clearWishlist();
        rerenderWishlistContent();
        updateWishlistBadge();
        showWishlistToast('Wishlist cleared');
      }
    });
    headerActions.appendChild(clearBtn);

    header.appendChild(headerActions);
  }

  container.appendChild(header);

  // Content area (grid or empty state)
  const content = createElement('div', 'wishlist-page__content');
  content.id = 'wishlist-content';

  if (wishlistIds.length === 0) {
    content.appendChild(createEmptyState());
  } else {
    const grid = createElement('div', 'wishlist-page__grid');
    grid.id = 'wishlist-grid';

    wishlistIds.forEach(id => {
      const property = getPropertyById(id);
      if (property) {
        const card = createWishlistPropertyCard(property, () => {
          removeFromWishlist(id);
          updateWishlistBadge();
          rerenderWishlistContent();
        });
        grid.appendChild(card);
      }
    });

    content.appendChild(grid);
  }

  container.appendChild(content);

  // Recently Viewed Section
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
      clearRecentlyViewed();
      recentSection.remove();
    });
    recentHeader.appendChild(clearRecentBtn);

    recentSection.appendChild(recentHeader);

    const recentGrid = createElement('div', 'wishlist-page__recent-grid');

    let count = 0;
    for (const id of recentlyViewedIds) {
      if (count >= 4) break;
      const property = getPropertyById(id);
      if (property) {
        const card = createRecentlyViewedCard(property);
        recentGrid.appendChild(card);
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

  // Clear existing content
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  const wishlistIds = getWishlistIds();

  // Update subtitle
  const subtitle = document.querySelector('.wishlist-page__subtitle');
  if (subtitle) {
    subtitle.textContent = wishlistIds.length === 0
      ? 'Save your favorite properties'
      : `${wishlistIds.length} saved ${wishlistIds.length === 1 ? 'property' : 'properties'}`;
  }

  // Update header actions visibility
  const headerActions = document.querySelector('.wishlist-page__header-actions');
  if (headerActions) {
    (headerActions as HTMLElement).style.display = wishlistIds.length === 0 ? 'none' : 'flex';
  }

  if (wishlistIds.length === 0) {
    content.appendChild(createEmptyState());
  } else {
    const grid = createElement('div', 'wishlist-page__grid');
    grid.id = 'wishlist-grid';

    wishlistIds.forEach(id => {
      const property = getPropertyById(id);
      if (property) {
        const card = createWishlistPropertyCard(property, () => {
          removeFromWishlist(id);
          updateWishlistBadge();
          rerenderWishlistContent();
        });
        grid.appendChild(card);
      }
    });

    content.appendChild(grid);
  }
}

// ─── Helper: Copy to Clipboard ───────────────────────────────────────────────

async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    showWishlistToast('Wishlist link copied to clipboard!');
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showWishlistToast('Wishlist link copied to clipboard!');
  }
}

// ─── SEO Setup ───────────────────────────────────────────────────────────────

export function setupWishlistPageSEO(): void {
  document.title = 'My Wishlist | Saved Properties | Real House Erbil';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'View and manage your saved properties on Real House. Share your wishlist with friends and family. Find your dream home in Erbil, Kurdistan.');
  }

  // Noindex wishlist pages (user-specific content)
  let robots = document.querySelector('meta[name="robots"]');
  if (!robots) {
    robots = document.createElement('meta');
    robots.setAttribute('name', 'robots');
    document.head.appendChild(robots);
  }
  robots.setAttribute('content', 'noindex, follow');
}
