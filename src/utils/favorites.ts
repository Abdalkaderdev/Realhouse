// ═══════════════════════════════════════════════════════════════════════════
// Favorites/Wishlist System - localStorage Persistence
// ═══════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'rh-favorites';

/**
 * Get all favorite property IDs from localStorage
 */
export function getFavorites(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Add a property to favorites
 */
export function addToFavorites(propertyId: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(propertyId)) {
    favorites.push(propertyId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    dispatchFavoritesChange();
  }
}

/**
 * Remove a property from favorites
 */
export function removeFromFavorites(propertyId: string): void {
  const favorites = getFavorites();
  const index = favorites.indexOf(propertyId);
  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    dispatchFavoritesChange();
  }
}

/**
 * Toggle a property's favorite state
 * Returns the new state (true = favorited, false = not favorited)
 */
export function toggleFavorite(propertyId: string): boolean {
  if (isFavorite(propertyId)) {
    removeFromFavorites(propertyId);
    return false;
  } else {
    addToFavorites(propertyId);
    return true;
  }
}

/**
 * Toggle favorite with loading state support
 * Provides visual feedback during the operation
 */
export function toggleFavoriteWithLoading(
  propertyId: string,
  button: HTMLElement
): boolean {
  // Set loading state
  button.classList.add('loading');
  button.setAttribute('aria-busy', 'true');
  button.setAttribute('disabled', '');

  // Perform the toggle (synchronous but we add visual feedback)
  const newState = toggleFavorite(propertyId);

  // Update button state
  updateFavoriteButton(button, newState);

  // Remove loading state after a brief delay for visual feedback
  setTimeout(() => {
    button.classList.remove('loading');
    button.setAttribute('aria-busy', 'false');
    button.removeAttribute('disabled');
  }, 150);

  return newState;
}

/**
 * Check if a property is in favorites
 */
export function isFavorite(propertyId: string): boolean {
  return getFavorites().includes(propertyId);
}

/**
 * Clear all favorites
 */
export function clearFavorites(): void {
  localStorage.removeItem(STORAGE_KEY);
  dispatchFavoritesChange();
}

/**
 * Get the count of favorites
 */
export function getFavoritesCount(): number {
  return getFavorites().length;
}

/**
 * Dispatch a custom event when favorites change
 * This allows UI components to react to changes
 */
function dispatchFavoritesChange(): void {
  const event = new CustomEvent('favoritesChanged', {
    detail: {
      favorites: getFavorites(),
      count: getFavoritesCount()
    }
  });
  window.dispatchEvent(event);
}

/**
 * Initialize favorites UI - updates badge counts and button states
 */
export function initFavoritesUI(): void {
  updateFavoritesBadge();
  updateAllFavoriteButtons();
}

/**
 * Update the favorites badge in the navigation
 */
export function updateFavoritesBadge(): void {
  const badge = document.getElementById('favorites-badge');
  const count = getFavoritesCount();

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
 * Update all favorite buttons on the page to reflect current state
 */
export function updateAllFavoriteButtons(): void {
  const buttons = document.querySelectorAll('.property-card__favorite');
  buttons.forEach(btn => {
    const card = btn.closest('.property-card');
    if (card) {
      const propertyId = card.getAttribute('data-id');
      if (propertyId) {
        updateFavoriteButton(btn as HTMLElement, isFavorite(propertyId));
      }
    }
  });
}

/**
 * Update a single favorite button's appearance
 */
export function updateFavoriteButton(button: HTMLElement, isFav: boolean): void {
  if (isFav) {
    button.classList.add('active');
    button.setAttribute('aria-label', 'Remove from favorites');
    button.setAttribute('aria-pressed', 'true');
  } else {
    button.classList.remove('active');
    button.setAttribute('aria-label', 'Add to favorites');
    button.setAttribute('aria-pressed', 'false');
  }
}

// Listen for favorites changes and update UI
window.addEventListener('favoritesChanged', () => {
  updateFavoritesBadge();
});
