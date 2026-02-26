// ═══════════════════════════════════════════════════════════════════════════
// Project Comparison Component
// Side-by-side comparison of 2-3 development projects
// ═══════════════════════════════════════════════════════════════════════════

import { projects, getProjectById, formatPriceRange, type Project } from '../data/projects';
import { t } from '../i18n';

const MAX_COMPARE_PROJECTS = 3;
const STORAGE_KEY = 'rh-compare-projects';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface ComparisonIndicator {
  type: 'best' | 'worst' | 'neutral';
  label?: string;
}

// ─── Comparison State ─────────────────────────────────────────────────────────
export function getCompareProjectIds(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function setCompareProjectIds(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  updateProjectComparisonBar();
  updateProjectCompareButtons();
}

export function addProjectToCompare(id: string): boolean {
  const current = getCompareProjectIds();
  if (current.length >= MAX_COMPARE_PROJECTS) {
    return false;
  }
  if (!current.includes(id)) {
    current.push(id);
    setCompareProjectIds(current);
  }
  return true;
}

export function removeProjectFromCompare(id: string): void {
  const current = getCompareProjectIds();
  const index = current.indexOf(id);
  if (index > -1) {
    current.splice(index, 1);
    setCompareProjectIds(current);
  }
}

export function isProjectInCompare(id: string): boolean {
  return getCompareProjectIds().includes(id);
}

export function clearProjectCompare(): void {
  setCompareProjectIds([]);
}

export function getCompareProjects(): Project[] {
  const ids = getCompareProjectIds();
  return ids
    .map(id => getProjectById(id))
    .filter((p): p is Project => p !== undefined);
}

// ─── Visual Comparison Indicators ─────────────────────────────────────────────
function getBestValueIndicator(
  values: number[],
  type: 'lower' | 'higher'
): number {
  if (values.length === 0) return -1;
  if (type === 'lower') {
    return values.indexOf(Math.min(...values));
  }
  return values.indexOf(Math.max(...values));
}

function compareNumericValues(
  projects: Project[],
  getValue: (p: Project) => number,
  type: 'lower' | 'higher'
): ComparisonIndicator[] {
  const values = projects.map(getValue);
  const bestIndex = getBestValueIndicator(values, type);

  return values.map((_, index) => {
    if (index === bestIndex) {
      return { type: 'best', label: type === 'lower' ? t('projectCompare.bestValue') : t('projectCompare.best') };
    }
    // Check if it's the worst (only if more than 2 projects)
    if (projects.length > 2) {
      const worstIndex = getBestValueIndicator(values, type === 'lower' ? 'higher' : 'lower');
      if (index === worstIndex) {
        return { type: 'worst' };
      }
    }
    return { type: 'neutral' };
  });
}

function compareAmenitiesCount(projects: Project[]): ComparisonIndicator[] {
  return compareNumericValues(
    projects,
    p => p.amenities.length,
    'higher'
  );
}


function comparePriceMin(projects: Project[]): ComparisonIndicator[] {
  return compareNumericValues(
    projects,
    p => p.priceRange.min,
    'lower'
  );
}

// ─── Update Compare Buttons ───────────────────────────────────────────────────
function updateProjectCompareButtons(): void {
  const ids = getCompareProjectIds();
  const count = ids.length;

  document.querySelectorAll('.project-card__compare').forEach(btn => {
    const projectId = btn.getAttribute('data-project-id');
    if (!projectId) return;

    const isActive = ids.includes(projectId);
    btn.classList.toggle('active', isActive);

    const checkbox = btn.querySelector('.compare-checkbox') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = isActive;
    }

    // Disable buttons when max reached and not already selected
    if (count >= MAX_COMPARE_PROJECTS && !isActive) {
      btn.setAttribute('disabled', 'true');
      btn.classList.add('disabled');
    } else {
      btn.removeAttribute('disabled');
      btn.classList.remove('disabled');
    }
  });
}

// ─── Project Comparison Bar ───────────────────────────────────────────────────
export function createProjectComparisonBar(): HTMLElement {
  const bar = document.createElement('div');
  bar.className = 'project-comparison-bar';
  bar.id = 'project-comparison-bar';

  const container = document.createElement('div');
  container.className = 'project-comparison-bar__container';

  // Projects preview section
  const projectsSection = document.createElement('div');
  projectsSection.className = 'project-comparison-bar__projects';
  projectsSection.id = 'project-comparison-bar-projects';
  container.appendChild(projectsSection);

  // Actions section
  const actions = document.createElement('div');
  actions.className = 'project-comparison-bar__actions';

  const compareBtn = document.createElement('a');
  compareBtn.className = 'btn btn--primary project-comparison-bar__compare-btn';
  compareBtn.textContent = t('projectCompare.compareProjects');
  compareBtn.href = '/projects/compare';
  compareBtn.setAttribute('data-route', '');
  compareBtn.id = 'project-comparison-bar-compare-btn';
  actions.appendChild(compareBtn);

  const clearBtn = document.createElement('button');
  clearBtn.className = 'btn btn--ghost project-comparison-bar__clear-btn';
  clearBtn.textContent = t('projectCompare.clearAll');
  clearBtn.addEventListener('click', () => {
    clearProjectCompare();
  });
  actions.appendChild(clearBtn);

  container.appendChild(actions);
  bar.appendChild(container);

  return bar;
}

export function updateProjectComparisonBar(): void {
  const bar = document.getElementById('project-comparison-bar');
  const projectsContainer = document.getElementById('project-comparison-bar-projects');
  const compareBtn = document.getElementById('project-comparison-bar-compare-btn');

  if (!bar) return;

  const projectsList = getCompareProjects();

  // Show/hide bar based on selection
  if (projectsList.length === 0) {
    bar.classList.remove('visible');
    return;
  }

  bar.classList.add('visible');

  // Update compare button text
  if (compareBtn) {
    compareBtn.textContent = `${t('projectCompare.compareProjects')} (${projectsList.length})`;
  }

  // Update projects preview
  if (projectsContainer) {
    // Clear existing
    while (projectsContainer.firstChild) {
      projectsContainer.removeChild(projectsContainer.firstChild);
    }

    // Add project previews
    projectsList.forEach(project => {
      const item = document.createElement('div');
      item.className = 'project-comparison-bar__item';

      const img = document.createElement('img');
      img.src = project.images[0];
      img.alt = project.name;
      img.className = 'project-comparison-bar__item-image';
      item.appendChild(img);

      const info = document.createElement('div');
      info.className = 'project-comparison-bar__item-info';

      const title = document.createElement('span');
      title.className = 'project-comparison-bar__item-title';
      title.textContent = project.name;
      info.appendChild(title);

      const status = document.createElement('span');
      status.className = 'project-comparison-bar__item-status';
      status.textContent = project.status;
      info.appendChild(status);

      item.appendChild(info);

      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'project-comparison-bar__item-remove';
      removeBtn.setAttribute('aria-label', t('projectCompare.removeFromComparison'));
      removeBtn.textContent = '\u00D7';
      removeBtn.addEventListener('click', () => {
        removeProjectFromCompare(project.id);
      });
      item.appendChild(removeBtn);

      projectsContainer.appendChild(item);
    });

    // Add empty slots
    for (let i = projectsList.length; i < MAX_COMPARE_PROJECTS; i++) {
      const emptySlot = document.createElement('div');
      emptySlot.className = 'project-comparison-bar__item project-comparison-bar__item--empty';

      const placeholder = document.createElement('span');
      placeholder.className = 'project-comparison-bar__item-placeholder';
      placeholder.textContent = t('projectCompare.addProject');
      emptySlot.appendChild(placeholder);

      projectsContainer.appendChild(emptySlot);
    }
  }
}

// ─── Initialize Project Comparison Bar ────────────────────────────────────────
export function initProjectComparisonBar(): void {
  // Check if bar already exists
  if (document.getElementById('project-comparison-bar')) return;

  const bar = createProjectComparisonBar();
  document.body.appendChild(bar);
  updateProjectComparisonBar();
}

// ─── Create Compare Button for Project Card ──────────────────────────────────
export function createProjectCompareButton(projectId: string): HTMLElement {
  const button = document.createElement('button');
  button.className = 'project-card__compare';
  button.setAttribute('data-project-id', projectId);
  button.setAttribute('aria-label', t('projectCompare.addToComparison'));

  const checkbox = document.createElement('span');
  checkbox.className = 'compare-checkbox';
  button.appendChild(checkbox);

  const label = document.createElement('span');
  label.className = 'compare-label';
  label.textContent = t('projectCompare.compare');
  button.appendChild(label);

  // Set initial state
  if (isProjectInCompare(projectId)) {
    button.classList.add('active');
  }

  const ids = getCompareProjectIds();
  if (ids.length >= MAX_COMPARE_PROJECTS && !isProjectInCompare(projectId)) {
    button.setAttribute('disabled', 'true');
    button.classList.add('disabled');
  }

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isProjectInCompare(projectId)) {
      removeProjectFromCompare(projectId);
    } else {
      const success = addProjectToCompare(projectId);
      if (!success) {
        showProjectMaxReachedToast();
      }
    }
  });

  return button;
}

// ─── Toast Notification ───────────────────────────────────────────────────────
function showProjectMaxReachedToast(): void {
  const existing = document.querySelector('.project-comparison-toast');
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'project-comparison-toast';
  toast.textContent = t('projectCompare.maxProjectsMessage');
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─── Helper Functions ─────────────────────────────────────────────────────────
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

function createSvgIcon(paths: string[], viewBox: string = '0 0 24 24', fill: boolean = false): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', fill ? 'currentColor' : 'none');
  if (!fill) {
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
  }

  paths.forEach(d => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  });

  return svg;
}

function createSvgRect(x: string, y: string, width: string, height: string, rx?: string): SVGRectElement {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('width', width);
  rect.setAttribute('height', height);
  if (rx) rect.setAttribute('rx', rx);
  return rect;
}

// ─── Generate Share URL ───────────────────────────────────────────────────────
export function generateComparisonShareUrl(): string {
  const ids = getCompareProjectIds();
  const baseUrl = window.location.origin;
  const params = new URLSearchParams();
  if (ids.length > 0) {
    params.set('compare', ids.join(','));
  }
  return `${baseUrl}/projects/compare${ids.length > 0 ? '?' + params.toString() : ''}`;
}

export function loadComparisonFromUrl(): void {
  const params = new URLSearchParams(window.location.search);
  const compareParam = params.get('compare');
  if (compareParam) {
    const ids = compareParam.split(',').filter(id => getProjectById(id));
    if (ids.length > 0) {
      setCompareProjectIds(ids.slice(0, MAX_COMPARE_PROJECTS));
    }
  }
}

// ─── Render Comparison Table ──────────────────────────────────────────────────
export function renderProjectComparisonContent(projectsList: Project[]): HTMLElement {
  const grid = createElement('div', 'project-compare__grid');
  grid.style.setProperty('--compare-count', projectsList.length.toString());

  // ─── Project Cards Row ──────────────────────────────────────────────────────
  const cardsRow = createElement('div', 'project-compare-row project-compare-row--cards');

  projectsList.forEach(project => {
    const card = createElement('div', 'project-compare-card');

    // Image
    const imageWrapper = createElement('div', 'project-compare-card__image');

    const img = document.createElement('img');
    img.src = project.images[0];
    img.alt = project.name;
    img.loading = 'lazy';
    imageWrapper.appendChild(img);

    // Status badge
    const statusBadge = createElement('span', `project-compare-card__status project-compare-card__status--${project.status.toLowerCase().replace(' ', '-')}`);
    statusBadge.textContent = project.status;
    imageWrapper.appendChild(statusBadge);

    // Remove button
    const removeBtn = createElement('button', 'project-compare-card__remove');
    removeBtn.setAttribute('aria-label', t('projectCompare.removeFromComparison'));
    removeBtn.textContent = '\u00D7';
    removeBtn.addEventListener('click', () => {
      removeProjectFromCompare(project.id);
      // Re-render
      const container = grid.closest('.project-compare');
      if (container) {
        const newProjects = getCompareProjects();
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        if (newProjects.length > 0) {
          container.appendChild(renderProjectComparisonContent(newProjects));
        } else {
          container.appendChild(renderEmptyComparisonState());
        }
      }
    });
    imageWrapper.appendChild(removeBtn);

    card.appendChild(imageWrapper);

    // Project name
    const titleEl = createElement('h3', 'project-compare-card__title', project.name);
    card.appendChild(titleEl);

    // Location
    const location = createElement('p', 'project-compare-card__location');
    location.appendChild(createSVGUse('icon-location'));
    location.appendChild(document.createTextNode(`${project.location.district}, ${project.location.city}`));
    card.appendChild(location);

    // View button
    const viewBtn = createElement('a', 'btn btn--ghost btn--sm project-compare-card__view');
    viewBtn.href = `/projects/${project.id}`;
    viewBtn.setAttribute('data-route', '');
    viewBtn.textContent = t('projectCompare.viewDetails');
    card.appendChild(viewBtn);

    cardsRow.appendChild(card);
  });

  grid.appendChild(cardsRow);

  // ─── Comparison Table ───────────────────────────────────────────────────────
  const table = createElement('div', 'project-compare-table');

  // ─── Price Section ──────────────────────────────────────────────────────────
  const priceSection = createElement('div', 'project-compare-section');
  const priceHeader = createElement('h4', 'project-compare-section__title', t('projectCompare.pricing'));
  priceSection.appendChild(priceHeader);

  // Price Range
  const priceIndicators = comparePriceMin(projectsList);
  priceSection.appendChild(createProjectCompareRow(
    t('projectCompare.startingFrom'),
    projectsList.map((p, i) => {
      const el = createElement('span', 'project-compare-value--price');
      el.textContent = `$${p.priceRange.min.toLocaleString()}`;
      return { element: el, indicator: priceIndicators[i] };
    })
  ));

  priceSection.appendChild(createProjectCompareRow(
    t('projectCompare.maximumPrice'),
    projectsList.map(p => {
      const el = createElement('span', 'project-compare-value--price');
      el.textContent = `$${p.priceRange.max.toLocaleString()}`;
      return { element: el };
    })
  ));

  priceSection.appendChild(createProjectCompareRow(
    t('projectCompare.priceRange'),
    projectsList.map(p => {
      const el = createElement('span');
      el.textContent = formatPriceRange(p);
      return { element: el };
    })
  ));

  table.appendChild(priceSection);

  // ─── Units Section ──────────────────────────────────────────────────────────
  const unitsSection = createElement('div', 'project-compare-section');
  const unitsHeader = createElement('h4', 'project-compare-section__title', t('projectCompare.unitsAvailability'));
  unitsSection.appendChild(unitsHeader);

  unitsSection.appendChild(createProjectCompareRow(
    t('projectCompare.totalUnits'),
    projectsList.map(p => {
      const el = createElement('span');
      el.textContent = p.totalUnits.toLocaleString();
      return { element: el };
    })
  ));

  table.appendChild(unitsSection);

  // ─── Project Details Section ────────────────────────────────────────────────
  const detailsSection = createElement('div', 'project-compare-section');
  const detailsHeader = createElement('h4', 'project-compare-section__title', t('projectCompare.projectDetails'));
  detailsSection.appendChild(detailsHeader);

  // Status
  detailsSection.appendChild(createProjectCompareRow(
    t('projectCompare.status'),
    projectsList.map(p => {
      const el = createElement('span', `project-compare-status project-compare-status--${p.status.toLowerCase().replace(' ', '-')}`);
      el.textContent = p.status;
      return { element: el };
    })
  ));

  // Completion Date
  detailsSection.appendChild(createProjectCompareRow(
    t('projectCompare.completion'),
    projectsList.map(p => {
      const el = createElement('span');
      el.textContent = p.completionDate;
      return { element: el };
    })
  ));

  // Location
  detailsSection.appendChild(createProjectCompareRow(
    t('projectCompare.district'),
    projectsList.map(p => {
      const el = createElement('span');
      el.textContent = p.location.district;
      return { element: el };
    })
  ));

  detailsSection.appendChild(createProjectCompareRow(
    t('projectCompare.city'),
    projectsList.map(p => {
      const el = createElement('span');
      el.textContent = p.location.city;
      return { element: el };
    })
  ));

  table.appendChild(detailsSection);

  // ─── Amenities Section ──────────────────────────────────────────────────────
  const amenitiesSection = createElement('div', 'project-compare-section');
  const amenitiesHeader = createElement('h4', 'project-compare-section__title', t('projectCompare.amenitiesFeatures'));
  amenitiesSection.appendChild(amenitiesHeader);

  // Amenities count
  const amenitiesIndicators = compareAmenitiesCount(projectsList);
  amenitiesSection.appendChild(createProjectCompareRow(
    t('projectCompare.totalAmenities'),
    projectsList.map((p, i) => {
      const el = createElement('span');
      el.textContent = `${p.amenities.length} ${t('projectCompare.features')}`;
      return { element: el, indicator: amenitiesIndicators[i] };
    })
  ));

  // Get all unique amenities
  const allAmenities = new Set<string>();
  projectsList.forEach(p => p.amenities.forEach(a => allAmenities.add(a)));

  // Create amenity rows (show first 12)
  Array.from(allAmenities).slice(0, 12).forEach(amenity => {
    amenitiesSection.appendChild(createProjectCompareRow(
      amenity,
      projectsList.map(p => {
        const el = createElement('span');
        const hasAmenity = p.amenities.includes(amenity);
        el.className = hasAmenity ? 'project-compare-feature--yes' : 'project-compare-feature--no';
        el.textContent = hasAmenity ? '\u2713' : '\u2717';
        return { element: el };
      })
    ));
  });

  table.appendChild(amenitiesSection);

  grid.appendChild(table);

  return grid;
}

function createProjectCompareRow(
  label: string,
  values: Array<{ element: HTMLElement; indicator?: ComparisonIndicator }>
): HTMLElement {
  const row = createElement('div', 'project-compare-row');

  const labelEl = createElement('div', 'project-compare-row__label');
  labelEl.textContent = label;
  row.appendChild(labelEl);

  const valuesContainer = createElement('div', 'project-compare-row__values');

  values.forEach(({ element, indicator }) => {
    const cell = createElement('div', 'project-compare-row__value');

    if (indicator) {
      cell.classList.add(`project-compare-row__value--${indicator.type}`);
      if (indicator.label) {
        const badge = createElement('span', 'project-compare-indicator');
        badge.textContent = indicator.label;
        cell.appendChild(badge);
      }
    }

    cell.appendChild(element);
    valuesContainer.appendChild(cell);
  });

  row.appendChild(valuesContainer);

  return row;
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function renderEmptyComparisonState(): HTMLElement {
  const empty = createElement('div', 'project-compare__empty');

  // Create SVG icon using DOM methods
  const iconWrapper = createElement('div', 'project-compare__empty-icon');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 64 64');
  svg.setAttribute('fill', 'none');

  const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect1.setAttribute('x', '4');
  rect1.setAttribute('y', '12');
  rect1.setAttribute('width', '24');
  rect1.setAttribute('height', '40');
  rect1.setAttribute('rx', '2');
  rect1.setAttribute('stroke', 'currentColor');
  rect1.setAttribute('stroke-width', '2');
  svg.appendChild(rect1);

  const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect2.setAttribute('x', '36');
  rect2.setAttribute('y', '12');
  rect2.setAttribute('width', '24');
  rect2.setAttribute('height', '40');
  rect2.setAttribute('rx', '2');
  rect2.setAttribute('stroke', 'currentColor');
  rect2.setAttribute('stroke-width', '2');
  svg.appendChild(rect2);

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M28 32h8');
  path1.setAttribute('stroke', 'currentColor');
  path1.setAttribute('stroke-width', '2');
  path1.setAttribute('stroke-linecap', 'round');
  svg.appendChild(path1);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M32 28v8');
  path2.setAttribute('stroke', 'currentColor');
  path2.setAttribute('stroke-width', '2');
  path2.setAttribute('stroke-linecap', 'round');
  svg.appendChild(path2);

  iconWrapper.appendChild(svg);
  empty.appendChild(iconWrapper);

  const emptyTitle = createElement('h3', 'project-compare__empty-title', t('projectCompare.noProjects'));
  empty.appendChild(emptyTitle);

  const emptyText = createElement('p', 'project-compare__empty-text');
  emptyText.textContent = t('projectCompare.emptyStateDescription');
  empty.appendChild(emptyText);

  const browseLink = createElement('a', 'btn btn--primary');
  browseLink.href = '/projects';
  browseLink.setAttribute('data-route', '');
  browseLink.textContent = t('projectCompare.browseProjects');
  empty.appendChild(browseLink);

  return empty;
}

// ─── Share Comparison ─────────────────────────────────────────────────────────
export function createShareComparisonSection(): HTMLElement {
  const shareSection = createElement('div', 'project-compare__share');

  const shareTitle = createElement('h4', 'project-compare__share-title', t('projectCompare.shareComparison'));
  shareSection.appendChild(shareTitle);

  const shareActions = createElement('div', 'project-compare__share-actions');

  // Copy link button
  const copyBtn = createElement('button', 'btn btn--ghost project-compare__share-btn');

  // Create copy icon
  const copyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  copyIcon.setAttribute('class', 'icon');
  copyIcon.setAttribute('viewBox', '0 0 24 24');
  copyIcon.setAttribute('fill', 'none');
  copyIcon.setAttribute('stroke', 'currentColor');
  copyIcon.setAttribute('stroke-width', '2');

  const copyRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  copyRect.setAttribute('x', '9');
  copyRect.setAttribute('y', '9');
  copyRect.setAttribute('width', '13');
  copyRect.setAttribute('height', '13');
  copyRect.setAttribute('rx', '2');
  copyIcon.appendChild(copyRect);

  const copyPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  copyPath.setAttribute('d', 'M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1');
  copyIcon.appendChild(copyPath);

  copyBtn.appendChild(copyIcon);
  copyBtn.appendChild(document.createTextNode(' ' + t('projectCompare.copyLink')));

  copyBtn.addEventListener('click', async () => {
    const url = generateComparisonShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      copyBtn.textContent = t('projectCompare.copied');
      copyBtn.classList.add('success');
      setTimeout(() => {
        while (copyBtn.firstChild) {
          copyBtn.removeChild(copyBtn.firstChild);
        }
        copyBtn.appendChild(copyIcon.cloneNode(true));
        copyBtn.appendChild(document.createTextNode(' ' + t('projectCompare.copyLink')));
        copyBtn.classList.remove('success');
      }, 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      copyBtn.textContent = t('projectCompare.copied');
      setTimeout(() => {
        while (copyBtn.firstChild) {
          copyBtn.removeChild(copyBtn.firstChild);
        }
        copyBtn.appendChild(copyIcon.cloneNode(true));
        copyBtn.appendChild(document.createTextNode(' ' + t('projectCompare.copyLink')));
      }, 2000);
    }
  });
  shareActions.appendChild(copyBtn);

  // WhatsApp share
  const whatsappBtn = createElement('a', 'btn btn--ghost project-compare__share-btn project-compare__share-btn--whatsapp');

  // Create WhatsApp icon
  const whatsappIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  whatsappIcon.setAttribute('class', 'icon');
  whatsappIcon.setAttribute('viewBox', '0 0 24 24');
  whatsappIcon.setAttribute('fill', 'currentColor');

  const whatsappPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  whatsappPath.setAttribute('d', 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z');
  whatsappIcon.appendChild(whatsappPath);

  whatsappBtn.appendChild(whatsappIcon);
  whatsappBtn.appendChild(document.createTextNode(' WhatsApp'));
  whatsappBtn.href = `https://wa.me/?text=${encodeURIComponent('Check out this project comparison: ' + generateComparisonShareUrl())}`;
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  shareActions.appendChild(whatsappBtn);

  // Email share
  const emailBtn = createElement('a', 'btn btn--ghost project-compare__share-btn project-compare__share-btn--email');

  // Create email icon
  const emailIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  emailIcon.setAttribute('class', 'icon');
  emailIcon.setAttribute('viewBox', '0 0 24 24');
  emailIcon.setAttribute('fill', 'none');
  emailIcon.setAttribute('stroke', 'currentColor');
  emailIcon.setAttribute('stroke-width', '2');

  const emailRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  emailRect.setAttribute('x', '2');
  emailRect.setAttribute('y', '4');
  emailRect.setAttribute('width', '20');
  emailRect.setAttribute('height', '16');
  emailRect.setAttribute('rx', '2');
  emailIcon.appendChild(emailRect);

  const emailPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  emailPath.setAttribute('d', 'M22 6l-10 7L2 6');
  emailIcon.appendChild(emailPath);

  emailBtn.appendChild(emailIcon);
  emailBtn.appendChild(document.createTextNode(' Email'));

  const projectsList = getCompareProjects();
  const projectNames = projectsList.map(p => p.name).join(' vs ');
  emailBtn.href = `mailto:?subject=${encodeURIComponent('Project Comparison: ' + projectNames)}&body=${encodeURIComponent('Check out this project comparison on Real House:\n\n' + generateComparisonShareUrl())}`;
  shareActions.appendChild(emailBtn);

  shareSection.appendChild(shareActions);

  return shareSection;
}
