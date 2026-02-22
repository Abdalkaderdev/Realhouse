// ═══════════════════════════════════════════════════════════════════════════
// Wishlist/Favorites Component
// Features: Heart icon toggle, localStorage persistence, share wishlist
// ═══════════════════════════════════════════════════════════════════════════

const WISHLIST_STORAGE_KEY = 'rh-wishlist';

export interface WishlistItem {
  id: string;
  addedAt: number;
}

// ─── Wishlist Storage Functions ────────────────────────────────────────────

/**
 * Get all wishlist items from localStorage
 */
export function getWishlist(): WishlistItem[] {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Get wishlist property IDs only
 */
export function getWishlistIds(): string[] {
  return getWishlist().map(item => item.id);
}

/**
 * Add a property to wishlist
 */
export function addToWishlist(propertyId: string): void {
  const wishlist = getWishlist();
  if (!wishlist.some(item => item.id === propertyId)) {
    wishlist.push({
      id: propertyId,
      addedAt: Date.now()
    });
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    dispatchWishlistChange();
  }
}

/**
 * Remove a property from wishlist
 */
export function removeFromWishlist(propertyId: string): void {
  const wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.id === propertyId);
  if (index > -1) {
    wishlist.splice(index, 1);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    dispatchWishlistChange();
  }
}

/**
 * Toggle a property's wishlist state
 * Returns the new state (true = in wishlist, false = not in wishlist)
 */
export function toggleWishlist(propertyId: string): boolean {
  if (isInWishlist(propertyId)) {
    removeFromWishlist(propertyId);
    return false;
  } else {
    addToWishlist(propertyId);
    return true;
  }
}

/**
 * Check if a property is in wishlist
 */
export function isInWishlist(propertyId: string): boolean {
  return getWishlistIds().includes(propertyId);
}

/**
 * Clear all wishlist items
 */
export function clearWishlist(): void {
  localStorage.removeItem(WISHLIST_STORAGE_KEY);
  dispatchWishlistChange();
}

/**
 * Get the count of wishlist items
 */
export function getWishlistCount(): number {
  return getWishlist().length;
}

/**
 * Dispatch a custom event when wishlist changes
 */
function dispatchWishlistChange(): void {
  const event = new CustomEvent('wishlistChanged', {
    detail: {
      wishlist: getWishlist(),
      count: getWishlistCount()
    }
  });
  window.dispatchEvent(event);
}

// ─── Share Wishlist Functions ──────────────────────────────────────────────

/**
 * Generate a shareable wishlist link
 * Encodes property IDs in the URL
 */
export function generateWishlistShareLink(): string {
  const ids = getWishlistIds();
  if (ids.length === 0) return window.location.origin + '/wishlist';

  const encoded = btoa(JSON.stringify(ids));
  return `${window.location.origin}/wishlist?share=${encoded}`;
}

/**
 * Parse shared wishlist from URL
 * Returns array of property IDs or null if not a shared link
 */
export function parseSharedWishlist(url: string = window.location.href): string[] | null {
  try {
    const urlObj = new URL(url);
    const shareParam = urlObj.searchParams.get('share');
    if (!shareParam) return null;

    const decoded = atob(shareParam);
    const ids = JSON.parse(decoded);
    return Array.isArray(ids) ? ids : null;
  } catch {
    return null;
  }
}

/**
 * Import shared wishlist items (adds to existing)
 */
export function importSharedWishlist(ids: string[]): void {
  ids.forEach(id => {
    if (!isInWishlist(id)) {
      addToWishlist(id);
    }
  });
}

// ─── UI Helper Functions ───────────────────────────────────────────────────

/**
 * Update the wishlist badge in the navigation
 */
export function updateWishlistBadge(): void {
  const badge = document.getElementById('wishlist-badge');
  const count = getWishlistCount();

  if (badge) {
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count.toString();
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}

/**
 * Update all wishlist buttons on the page to reflect current state
 */
export function updateAllWishlistButtons(): void {
  const buttons = document.querySelectorAll('[data-wishlist-btn]');
  buttons.forEach(btn => {
    const propertyId = btn.getAttribute('data-property-id');
    if (propertyId) {
      updateWishlistButton(btn as HTMLElement, isInWishlist(propertyId));
    }
  });
}

/**
 * Update a single wishlist button's appearance
 */
export function updateWishlistButton(button: HTMLElement, isInList: boolean): void {
  if (isInList) {
    button.classList.add('active');
    button.setAttribute('aria-label', 'Remove from wishlist');
    button.setAttribute('aria-pressed', 'true');
  } else {
    button.classList.remove('active');
    button.setAttribute('aria-label', 'Add to wishlist');
    button.setAttribute('aria-pressed', 'false');
  }
}

/**
 * Create a wishlist heart button for property cards
 */
export function createWishlistButton(propertyId: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = 'wishlist-btn';
  button.setAttribute('data-wishlist-btn', '');
  button.setAttribute('data-property-id', propertyId);
  button.setAttribute('type', 'button');

  const isInList = isInWishlist(propertyId);
  button.setAttribute('aria-label', isInList ? 'Remove from wishlist' : 'Add to wishlist');
  button.setAttribute('aria-pressed', isInList ? 'true' : 'false');

  if (isInList) {
    button.classList.add('active');
  }

  // Heart outline SVG
  const heartOutline = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  heartOutline.setAttribute('class', 'wishlist-btn__icon wishlist-btn__icon--outline');
  heartOutline.setAttribute('viewBox', '0 0 24 24');
  heartOutline.setAttribute('fill', 'none');
  heartOutline.setAttribute('stroke', 'currentColor');
  heartOutline.setAttribute('stroke-width', '2');
  heartOutline.setAttribute('aria-hidden', 'true');

  const outlinePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  outlinePath.setAttribute('d', 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z');
  heartOutline.appendChild(outlinePath);
  button.appendChild(heartOutline);

  // Heart filled SVG
  const heartFilled = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  heartFilled.setAttribute('class', 'wishlist-btn__icon wishlist-btn__icon--filled');
  heartFilled.setAttribute('viewBox', '0 0 24 24');
  heartFilled.setAttribute('fill', 'currentColor');
  heartFilled.setAttribute('aria-hidden', 'true');

  const filledPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  filledPath.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
  heartFilled.appendChild(filledPath);
  button.appendChild(heartFilled);

  // Click handler
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = toggleWishlist(propertyId);
    updateWishlistButton(button, newState);

    // Add animation class
    button.classList.add('animate');
    setTimeout(() => {
      button.classList.remove('animate');
    }, 300);

    // Show toast notification
    showWishlistToast(newState ? 'Added to wishlist' : 'Removed from wishlist');
  });

  return button;
}

/**
 * Show a toast notification for wishlist actions
 */
export function showWishlistToast(message: string): void {
  // Remove existing toast
  const existing = document.querySelector('.wishlist-toast');
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'wishlist-toast';
  toast.textContent = message;

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('wishlist-toast--visible');
  });

  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('wishlist-toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─── Initialize Wishlist UI ────────────────────────────────────────────────

export function initWishlistUI(): void {
  updateWishlistBadge();
  updateAllWishlistButtons();
}

// Listen for wishlist changes and update UI
window.addEventListener('wishlistChanged', () => {
  updateWishlistBadge();
  updateAllWishlistButtons();
});
