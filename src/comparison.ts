// ═══════════════════════════════════════════════════════════════════════════
// Property Comparison Module
// ═══════════════════════════════════════════════════════════════════════════

import { getPropertyById, getDisplayPrice, type Property } from './data/properties';

const MAX_COMPARE_ITEMS = 3;
const STORAGE_KEY = 'rh-compare-properties';

// ─── Comparison State ─────────────────────────────────────────────────────
export function getCompareIds(): string[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function setCompareIds(ids: string[]): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  updateComparisonBar();
  updateCompareButtons();
}

export function addToCompare(id: string): boolean {
  const current = getCompareIds();
  if (current.length >= MAX_COMPARE_ITEMS) {
    return false;
  }
  if (!current.includes(id)) {
    current.push(id);
    setCompareIds(current);
  }
  return true;
}

export function removeFromCompare(id: string): void {
  const current = getCompareIds();
  const index = current.indexOf(id);
  if (index > -1) {
    current.splice(index, 1);
    setCompareIds(current);
  }
}

export function isInCompare(id: string): boolean {
  return getCompareIds().includes(id);
}

/**
 * Toggle compare with loading state support
 * Provides visual feedback during the operation
 */
export function toggleCompareWithLoading(
  propertyId: string,
  button: HTMLElement
): boolean {
  // Set loading state
  button.classList.add('loading');
  button.setAttribute('aria-busy', 'true');

  let success = true;
  let newState: boolean;

  if (isInCompare(propertyId)) {
    removeFromCompare(propertyId);
    newState = false;
  } else {
    success = addToCompare(propertyId);
    newState = success;
  }

  // Update button aria-pressed
  button.setAttribute('aria-pressed', newState ? 'true' : 'false');

  // Remove loading state after a brief delay for visual feedback
  setTimeout(() => {
    button.classList.remove('loading');
    button.setAttribute('aria-busy', 'false');
  }, 150);

  return success;
}

export function clearCompare(): void {
  setCompareIds([]);
}

export function getCompareProperties(): Property[] {
  const ids = getCompareIds();
  return ids
    .map(id => getPropertyById(id))
    .filter((p): p is Property => p !== undefined);
}

// ─── Update Compare Buttons ───────────────────────────────────────────────
function updateCompareButtons(): void {
  const ids = getCompareIds();
  const count = ids.length;

  document.querySelectorAll('.property-card__compare').forEach(btn => {
    const propertyId = btn.getAttribute('data-property-id');
    if (!propertyId) return;

    const isActive = ids.includes(propertyId);
    btn.classList.toggle('active', isActive);

    const checkbox = btn.querySelector('.compare-checkbox') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = isActive;
    }

    // Disable buttons when max reached and not already selected
    if (count >= MAX_COMPARE_ITEMS && !isActive) {
      btn.setAttribute('disabled', 'true');
      btn.classList.add('disabled');
    } else {
      btn.removeAttribute('disabled');
      btn.classList.remove('disabled');
    }
  });
}

// ─── Comparison Bar ───────────────────────────────────────────────────────
export function createComparisonBar(): HTMLElement {
  const bar = document.createElement('div');
  bar.className = 'comparison-bar';
  bar.id = 'comparison-bar';

  const container = document.createElement('div');
  container.className = 'comparison-bar__container';

  // Properties preview section
  const propertiesSection = document.createElement('div');
  propertiesSection.className = 'comparison-bar__properties';
  propertiesSection.id = 'comparison-bar-properties';
  container.appendChild(propertiesSection);

  // Actions section
  const actions = document.createElement('div');
  actions.className = 'comparison-bar__actions';

  const compareBtn = document.createElement('a');
  compareBtn.className = 'btn btn--primary comparison-bar__compare-btn';
  compareBtn.textContent = 'Compare Now';
  compareBtn.href = '/compare';
  compareBtn.setAttribute('data-route', '');
  compareBtn.id = 'comparison-bar-compare-btn';
  actions.appendChild(compareBtn);

  const clearBtn = document.createElement('button');
  clearBtn.className = 'btn btn--ghost comparison-bar__clear-btn';
  clearBtn.textContent = 'Clear All';
  clearBtn.addEventListener('click', () => {
    clearCompare();
  });
  actions.appendChild(clearBtn);

  container.appendChild(actions);
  bar.appendChild(container);

  return bar;
}

export function updateComparisonBar(): void {
  const bar = document.getElementById('comparison-bar');
  const propertiesContainer = document.getElementById('comparison-bar-properties');
  const compareBtn = document.getElementById('comparison-bar-compare-btn');

  if (!bar) return;

  const properties = getCompareProperties();

  // Show/hide bar based on selection
  if (properties.length === 0) {
    bar.classList.remove('visible');
    return;
  }

  bar.classList.add('visible');

  // Update compare button text
  if (compareBtn) {
    compareBtn.textContent = `Compare (${properties.length})`;
  }

  // Update properties preview
  if (propertiesContainer) {
    // Clear existing
    while (propertiesContainer.firstChild) {
      propertiesContainer.removeChild(propertiesContainer.firstChild);
    }

    // Add property previews
    properties.forEach(property => {
      const item = document.createElement('div');
      item.className = 'comparison-bar__item';

      const img = document.createElement('img');
      img.src = property.images[0];
      img.alt = property.title;
      img.className = 'comparison-bar__item-image';
      item.appendChild(img);

      const info = document.createElement('div');
      info.className = 'comparison-bar__item-info';

      const title = document.createElement('span');
      title.className = 'comparison-bar__item-title';
      title.textContent = property.title;
      info.appendChild(title);

      const price = document.createElement('span');
      price.className = 'comparison-bar__item-price';
      price.textContent = getDisplayPrice(property);
      info.appendChild(price);

      item.appendChild(info);

      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'comparison-bar__item-remove';
      removeBtn.setAttribute('aria-label', 'Remove from comparison');
      removeBtn.textContent = '\u00D7';
      removeBtn.addEventListener('click', () => {
        removeFromCompare(property.id);
      });
      item.appendChild(removeBtn);

      propertiesContainer.appendChild(item);
    });

    // Add empty slots
    for (let i = properties.length; i < MAX_COMPARE_ITEMS; i++) {
      const emptySlot = document.createElement('div');
      emptySlot.className = 'comparison-bar__item comparison-bar__item--empty';

      const placeholder = document.createElement('span');
      placeholder.className = 'comparison-bar__item-placeholder';
      placeholder.textContent = `+ Add Property`;
      emptySlot.appendChild(placeholder);

      propertiesContainer.appendChild(emptySlot);
    }
  }
}

// ─── Initialize Comparison Bar ────────────────────────────────────────────
export function initComparisonBar(): void {
  // Check if bar already exists
  if (document.getElementById('comparison-bar')) return;

  const bar = createComparisonBar();
  document.body.appendChild(bar);
  updateComparisonBar();
}

// ─── Create Compare Button for Property Card ──────────────────────────────
export function createCompareButton(propertyId: string): HTMLElement {
  const button = document.createElement('button');
  button.className = 'property-card__compare';
  button.setAttribute('data-property-id', propertyId);
  button.setAttribute('aria-label', 'Add to comparison');

  const checkbox = document.createElement('span');
  checkbox.className = 'compare-checkbox';
  button.appendChild(checkbox);

  const label = document.createElement('span');
  label.className = 'compare-label';
  label.textContent = 'Compare';
  button.appendChild(label);

  // Set initial state
  if (isInCompare(propertyId)) {
    button.classList.add('active');
  }

  const ids = getCompareIds();
  if (ids.length >= MAX_COMPARE_ITEMS && !isInCompare(propertyId)) {
    button.setAttribute('disabled', 'true');
    button.classList.add('disabled');
  }

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isInCompare(propertyId)) {
      removeFromCompare(propertyId);
    } else {
      const success = addToCompare(propertyId);
      if (!success) {
        // Show max reached notification
        showMaxReachedToast();
      }
    }
  });

  return button;
}

// ─── Toast Notification ───────────────────────────────────────────────────
function showMaxReachedToast(): void {
  // Remove existing toast
  const existing = document.querySelector('.comparison-toast');
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'comparison-toast';
  toast.textContent = `Maximum ${MAX_COMPARE_ITEMS} properties can be compared`;
  document.body.appendChild(toast);

  // Show animation
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─── Comparison Page/Modal Content ────────────────────────────────────────
export function renderComparisonPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const properties = getCompareProperties();

  const page = document.createElement('div');
  page.className = 'compare-page';

  const container = document.createElement('div');
  container.className = 'container';

  // Header
  const header = document.createElement('div');
  header.className = 'compare-page__header';

  const title = document.createElement('h1');
  title.className = 'compare-page__title';
  title.textContent = 'Compare Properties';
  header.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'compare-page__subtitle';
  subtitle.textContent = 'View properties side by side to make the best decision.';
  header.appendChild(subtitle);

  container.appendChild(header);

  if (properties.length === 0) {
    // Empty state
    const empty = document.createElement('div');
    empty.className = 'compare-page__empty';

    const emptyTitle = document.createElement('h3');
    emptyTitle.textContent = 'No properties to compare';
    empty.appendChild(emptyTitle);

    const emptyText = document.createElement('p');
    emptyText.textContent = 'Add properties to comparison from the properties page to see them side by side.';
    empty.appendChild(emptyText);

    const browseLink = document.createElement('a');
    browseLink.className = 'btn btn--primary';
    browseLink.href = '/properties';
    browseLink.setAttribute('data-route', '');
    browseLink.textContent = 'Browse Properties';
    empty.appendChild(browseLink);

    container.appendChild(empty);
  } else {
    // Comparison grid
    const grid = document.createElement('div');
    grid.className = 'compare-page__grid';
    grid.style.setProperty('--compare-count', properties.length.toString());

    // Property cards row
    const cardsRow = document.createElement('div');
    cardsRow.className = 'compare-row compare-row--cards';

    properties.forEach(property => {
      const card = document.createElement('div');
      card.className = 'compare-card';

      // Image
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'compare-card__image';

      const img = document.createElement('img');
      img.src = property.images[0];
      img.alt = property.title;
      imageWrapper.appendChild(img);

      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'compare-card__remove';
      removeBtn.setAttribute('aria-label', 'Remove from comparison');
      removeBtn.textContent = '\u00D7';
      removeBtn.addEventListener('click', () => {
        removeFromCompare(property.id);
        // Re-render page
        const app = document.getElementById('app');
        if (app) {
          while (app.firstChild) {
            app.removeChild(app.firstChild);
          }
          app.appendChild(renderComparisonPage());
        }
      });
      imageWrapper.appendChild(removeBtn);

      card.appendChild(imageWrapper);

      // Title
      const titleEl = document.createElement('h3');
      titleEl.className = 'compare-card__title';
      titleEl.textContent = property.title;
      card.appendChild(titleEl);

      // Type badge
      const typeBadge = document.createElement('span');
      typeBadge.className = 'compare-card__type';
      typeBadge.textContent = property.type;
      card.appendChild(typeBadge);

      // Location
      const location = document.createElement('p');
      location.className = 'compare-card__location';
      location.textContent = `${property.location.district}, ${property.location.city}`;
      card.appendChild(location);

      // View button
      const viewBtn = document.createElement('a');
      viewBtn.className = 'btn btn--ghost btn--sm compare-card__view';
      viewBtn.href = `/properties/${property.id}`;
      viewBtn.setAttribute('data-route', '');
      viewBtn.textContent = 'View Details';
      card.appendChild(viewBtn);

      cardsRow.appendChild(card);
    });

    grid.appendChild(cardsRow);

    // Comparison table
    const table = document.createElement('div');
    table.className = 'compare-table';

    // Price row
    const priceRow = createCompareRow('Price', properties.map(p => {
      const priceEl = document.createElement('span');
      priceEl.className = 'compare-value--price';
      priceEl.textContent = getDisplayPrice(p);
      return priceEl;
    }));
    table.appendChild(priceRow);

    // Specs section
    const specsSection = document.createElement('div');
    specsSection.className = 'compare-section';

    const specsHeader = document.createElement('h4');
    specsHeader.className = 'compare-section__title';
    specsHeader.textContent = 'Specifications';
    specsSection.appendChild(specsHeader);

    // Bedrooms
    specsSection.appendChild(createCompareRow('Bedrooms', properties.map(p => {
      const el = document.createElement('span');
      el.textContent = p.specs.beds > 0 ? p.specs.beds.toString() : '-';
      return el;
    })));

    // Bathrooms
    specsSection.appendChild(createCompareRow('Bathrooms', properties.map(p => {
      const el = document.createElement('span');
      el.textContent = p.specs.baths > 0 ? p.specs.baths.toString() : '-';
      return el;
    })));

    // Area
    specsSection.appendChild(createCompareRow('Area', properties.map(p => {
      const el = document.createElement('span');
      el.textContent = `${p.specs.sqm.toLocaleString()} m\u00B2`;
      return el;
    })));

    // Year Built
    specsSection.appendChild(createCompareRow('Year Built', properties.map(p => {
      const el = document.createElement('span');
      el.textContent = p.specs.yearBuilt?.toString() || '-';
      return el;
    })));

    table.appendChild(specsSection);

    // Location section
    const locationSection = document.createElement('div');
    locationSection.className = 'compare-section';

    const locationHeader = document.createElement('h4');
    locationHeader.className = 'compare-section__title';
    locationHeader.textContent = 'Location';
    locationSection.appendChild(locationHeader);

    // Address
    locationSection.appendChild(createCompareRow('Address', properties.map(p => {
      const el = document.createElement('span');
      el.textContent = p.location.address;
      return el;
    })));

    // District
    locationSection.appendChild(createCompareRow('District', properties.map(p => {
      const el = document.createElement('span');
      el.textContent = p.location.district;
      return el;
    })));

    // City
    locationSection.appendChild(createCompareRow('City', properties.map(p => {
      const el = document.createElement('span');
      el.textContent = p.location.city;
      return el;
    })));

    table.appendChild(locationSection);

    // Features section
    const featuresSection = document.createElement('div');
    featuresSection.className = 'compare-section';

    const featuresHeader = document.createElement('h4');
    featuresHeader.className = 'compare-section__title';
    featuresHeader.textContent = 'Features';
    featuresSection.appendChild(featuresHeader);

    // Get all unique features
    const allFeatures = new Set<string>();
    properties.forEach(p => p.features.forEach(f => allFeatures.add(f)));

    // Create feature rows
    Array.from(allFeatures).slice(0, 10).forEach(feature => {
      featuresSection.appendChild(createCompareRow(feature, properties.map(p => {
        const el = document.createElement('span');
        const hasFeature = p.features.includes(feature);
        el.className = hasFeature ? 'compare-feature--yes' : 'compare-feature--no';
        el.textContent = hasFeature ? '\u2713' : '\u2717';
        return el;
      })));
    });

    table.appendChild(featuresSection);
    grid.appendChild(table);
    container.appendChild(grid);

    // Back link
    const backSection = document.createElement('div');
    backSection.className = 'compare-page__back';

    const backLink = document.createElement('a');
    backLink.className = 'compare-page__back-link';
    backLink.href = '/properties';
    backLink.setAttribute('data-route', '');
    backLink.textContent = 'Back to Properties';
    backSection.appendChild(backLink);

    container.appendChild(backSection);
  }

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

function createCompareRow(label: string, values: HTMLElement[]): HTMLElement {
  const row = document.createElement('div');
  row.className = 'compare-row';

  const labelEl = document.createElement('div');
  labelEl.className = 'compare-row__label';
  labelEl.textContent = label;
  row.appendChild(labelEl);

  const valuesContainer = document.createElement('div');
  valuesContainer.className = 'compare-row__values';

  values.forEach(value => {
    const cell = document.createElement('div');
    cell.className = 'compare-row__value';
    cell.appendChild(value);
    valuesContainer.appendChild(cell);
  });

  row.appendChild(valuesContainer);

  return row;
}
