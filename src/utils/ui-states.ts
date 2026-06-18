// ═══════════════════════════════════════════════════════════════════════════
// UI States Toolkit
// Reusable, accessible skeleton loaders + empty / error state components
// ═══════════════════════════════════════════════════════════════════════════
//
// These helpers replace generic spinners with:
//   - Skeleton screens that mirror final layout (reduces perceived load time)
//   - Empty states with icon + headline + subtext + CTA
//   - Error states with retry affordances
//
// All output respects prefers-reduced-motion (styles), uses semantic markup,
// and exposes proper ARIA roles for screen readers.

// ─── Helper ───────────────────────────────────────────────────────────────

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

function createSVG(viewBox: string, paths: { d: string; fill?: string; stroke?: string }[], className?: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  if (className) svg.setAttribute('class', className);
  paths.forEach(p => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', p.d);
    if (p.fill) path.setAttribute('fill', p.fill);
    if (p.stroke) path.setAttribute('stroke', p.stroke);
    svg.appendChild(path);
  });
  return svg;
}

// ─── Skeleton Primitives ──────────────────────────────────────────────────

export interface SkeletonOptions {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
}

/**
 * Create a single skeleton block — a shimmering placeholder rectangle.
 * Used as the building block for richer skeleton screens.
 */
export function createSkeleton(opts: SkeletonOptions = {}): HTMLElement {
  const block = createElement('div', `skeleton ${opts.className || ''}`.trim());
  block.setAttribute('aria-hidden', 'true');
  if (opts.width) block.style.width = opts.width;
  if (opts.height) block.style.height = opts.height;
  if (opts.radius) block.style.borderRadius = opts.radius;
  return block;
}

/**
 * Skeleton card matching the property/project card shape:
 * image area + title + meta + price strip.
 */
export function createSkeletonCard(): HTMLElement {
  const card = createElement('article', 'skeleton-card');
  card.setAttribute('aria-hidden', 'true');

  const image = createSkeleton({ className: 'skeleton-card__image' });
  card.appendChild(image);

  const body = createElement('div', 'skeleton-card__body');
  body.appendChild(createSkeleton({ className: 'skeleton skeleton--tag' }));
  body.appendChild(createSkeleton({ className: 'skeleton skeleton--title' }));
  body.appendChild(createSkeleton({ className: 'skeleton skeleton--text' }));

  const meta = createElement('div', 'skeleton-card__meta');
  meta.appendChild(createSkeleton({ className: 'skeleton skeleton--chip' }));
  meta.appendChild(createSkeleton({ className: 'skeleton skeleton--chip' }));
  meta.appendChild(createSkeleton({ className: 'skeleton skeleton--chip' }));
  body.appendChild(meta);

  body.appendChild(createSkeleton({ className: 'skeleton skeleton--price' }));
  card.appendChild(body);

  return card;
}

/**
 * Skeleton grid — N skeleton cards laid out in a responsive grid.
 * Use as a placeholder while properties/projects are filtering or loading.
 */
export function createSkeletonGrid(count: number = 6, gridClassName: string = 'skeleton-grid'): HTMLElement {
  const grid = createElement('div', gridClassName);
  grid.setAttribute('role', 'status');
  grid.setAttribute('aria-live', 'polite');
  grid.setAttribute('aria-label', 'Loading results');
  for (let i = 0; i < count; i++) {
    grid.appendChild(createSkeletonCard());
  }
  return grid;
}

/**
 * Skeleton screen for a property/project detail hero +
 * specs strip + paragraphs.
 */
export function createSkeletonDetail(): HTMLElement {
  const wrap = createElement('div', 'skeleton-detail');
  wrap.setAttribute('role', 'status');
  wrap.setAttribute('aria-label', 'Loading details');

  wrap.appendChild(createSkeleton({ className: 'skeleton skeleton--hero' }));

  const head = createElement('div', 'skeleton-detail__head');
  head.appendChild(createSkeleton({ className: 'skeleton skeleton--heading' }));
  head.appendChild(createSkeleton({ className: 'skeleton skeleton--subheading' }));
  wrap.appendChild(head);

  const strip = createElement('div', 'skeleton-detail__strip');
  for (let i = 0; i < 4; i++) {
    strip.appendChild(createSkeleton({ className: 'skeleton skeleton--stat' }));
  }
  wrap.appendChild(strip);

  const body = createElement('div', 'skeleton-detail__body');
  for (let i = 0; i < 4; i++) {
    body.appendChild(createSkeleton({ className: 'skeleton skeleton--line' }));
  }
  wrap.appendChild(body);

  return wrap;
}

/**
 * Skeleton for the map area — used while Leaflet tiles load.
 */
export function createSkeletonMap(): HTMLElement {
  const wrap = createElement('div', 'skeleton-map');
  wrap.setAttribute('role', 'status');
  wrap.setAttribute('aria-label', 'Loading map');
  wrap.appendChild(createSkeleton({ className: 'skeleton skeleton--map-tiles' }));
  const pin = createElement('div', 'skeleton-map__pin');
  pin.setAttribute('aria-hidden', 'true');
  wrap.appendChild(pin);
  return wrap;
}

// ─── Empty State ──────────────────────────────────────────────────────────

export type EmptyStateIcon =
  | 'search'
  | 'heart'
  | 'compare'
  | 'inbox'
  | 'building'
  | 'map'
  | 'clock'
  | 'filter';

export interface EmptyStateOptions {
  icon?: EmptyStateIcon;
  title: string;
  description?: string;
  primaryAction?: { label: string; href?: string; onClick?: () => void };
  secondaryAction?: { label: string; href?: string; onClick?: () => void };
  className?: string;
}

function createEmptyStateIcon(icon: EmptyStateIcon): SVGSVGElement {
  switch (icon) {
    case 'search':
      return createSVG('0 0 24 24', [
        { d: 'M21 21l-4.35-4.35' },
        { d: 'M11 19a8 8 0 100-16 8 8 0 000 16z' }
      ], 'empty-state__icon-svg');
    case 'heart':
      return createSVG('0 0 24 24', [
        { d: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' }
      ], 'empty-state__icon-svg');
    case 'compare':
      return createSVG('0 0 24 24', [
        { d: 'M16 3h5v5' },
        { d: 'M4 20L21 3' },
        { d: 'M21 16v5h-5' },
        { d: 'M15 15l6 6' },
        { d: 'M4 4l5 5' }
      ], 'empty-state__icon-svg');
    case 'building':
      return createSVG('0 0 24 24', [
        { d: 'M3 21h18' },
        { d: 'M5 21V7l8-4v18' },
        { d: 'M19 21V11l-6-4' },
        { d: 'M9 9v.01' },
        { d: 'M9 12v.01' },
        { d: 'M9 15v.01' },
        { d: 'M9 18v.01' }
      ], 'empty-state__icon-svg');
    case 'map':
      return createSVG('0 0 24 24', [
        { d: 'M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z' },
        { d: 'M8 2v16' },
        { d: 'M16 6v16' }
      ], 'empty-state__icon-svg');
    case 'clock':
      return createSVG('0 0 24 24', [
        { d: 'M12 22a10 10 0 100-20 10 10 0 000 20z' },
        { d: 'M12 6v6l4 2' }
      ], 'empty-state__icon-svg');
    case 'filter':
      return createSVG('0 0 24 24', [
        { d: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z' }
      ], 'empty-state__icon-svg');
    case 'inbox':
    default:
      return createSVG('0 0 24 24', [
        { d: 'M22 12h-6l-2 3h-4l-2-3H2' },
        { d: 'M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z' }
      ], 'empty-state__icon-svg');
  }
}

/**
 * Create a structured empty state: illustrated icon + headline + helpful
 * description + primary CTA (and optional secondary). Use whenever a list,
 * grid, or page has zero items to show.
 */
export function createEmptyState(opts: EmptyStateOptions): HTMLElement {
  const wrap = createElement('div', `empty-state ${opts.className || ''}`.trim());
  wrap.setAttribute('role', 'status');

  const iconWrap = createElement('div', 'empty-state__icon');
  iconWrap.appendChild(createEmptyStateIcon(opts.icon || 'inbox'));
  wrap.appendChild(iconWrap);

  const title = createElement('h3', 'empty-state__title', opts.title);
  wrap.appendChild(title);

  if (opts.description) {
    const desc = createElement('p', 'empty-state__description', opts.description);
    wrap.appendChild(desc);
  }

  if (opts.primaryAction || opts.secondaryAction) {
    const actions = createElement('div', 'empty-state__actions');
    if (opts.primaryAction) {
      actions.appendChild(createActionElement(opts.primaryAction, 'btn btn--primary'));
    }
    if (opts.secondaryAction) {
      actions.appendChild(createActionElement(opts.secondaryAction, 'btn btn--outline'));
    }
    wrap.appendChild(actions);
  }

  return wrap;
}

function createActionElement(
  action: { label: string; href?: string; onClick?: () => void },
  className: string
): HTMLElement {
  if (action.href) {
    const a = createElement('a', className, action.label);
    a.href = action.href;
    a.setAttribute('data-route', '');
    if (action.onClick) a.addEventListener('click', action.onClick);
    return a;
  }
  const btn = createElement('button', className, action.label);
  btn.setAttribute('type', 'button');
  if (action.onClick) btn.addEventListener('click', action.onClick);
  return btn;
}

// ─── Error State ──────────────────────────────────────────────────────────

export interface ErrorStateOptions {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  helpHref?: string;
  helpLabel?: string;
  className?: string;
}

/**
 * Create an inline error state with retry affordance.
 * Use for map/network/data-load failures and any user-facing exception path.
 */
export function createErrorState(opts: ErrorStateOptions = {}): HTMLElement {
  const wrap = createElement('div', `error-state ${opts.className || ''}`.trim());
  wrap.setAttribute('role', 'alert');

  const iconWrap = createElement('div', 'error-state__icon');
  iconWrap.appendChild(createSVG('0 0 24 24', [
    { d: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z' },
    { d: 'M12 9v4' },
    { d: 'M12 17h.01' }
  ], 'error-state__icon-svg'));
  wrap.appendChild(iconWrap);

  const title = createElement('h3', 'error-state__title', opts.title || 'Something went wrong');
  wrap.appendChild(title);

  const desc = createElement(
    'p',
    'error-state__description',
    opts.description || 'We hit a snag loading this content. Please check your connection and try again.'
  );
  wrap.appendChild(desc);

  const actions = createElement('div', 'error-state__actions');
  if (opts.onRetry) {
    const retry = createElement('button', 'btn btn--primary', opts.retryLabel || 'Try again');
    retry.setAttribute('type', 'button');
    retry.addEventListener('click', opts.onRetry);
    actions.appendChild(retry);
  }
  if (opts.helpHref) {
    const help = createElement('a', 'btn btn--outline', opts.helpLabel || 'Get help');
    help.href = opts.helpHref;
    help.setAttribute('data-route', '');
    actions.appendChild(help);
  }
  if (actions.childNodes.length) wrap.appendChild(actions);

  return wrap;
}

// ─── Image Error Fallback ─────────────────────────────────────────────────

/**
 * Wire a single <img> to swap to a styled placeholder on error.
 * The wrapper is the immediate parent; we apply a class so the failed image
 * is visually replaced with an icon + label rather than the browser glyph.
 */
export function attachImageErrorFallback(img: HTMLImageElement, label: string = 'Image unavailable'): void {
  if (img.dataset.errorWired === '1') return;
  img.dataset.errorWired = '1';
  img.addEventListener('error', () => {
    const parent = img.parentElement;
    if (!parent) {
      img.classList.add('img-broken');
      return;
    }
    // Hide the broken element and inject a placeholder once.
    img.style.display = 'none';
    if (parent.querySelector('.img-fallback')) return;
    const fallback = createElement('div', 'img-fallback');
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', label);
    const svg = createSVG('0 0 24 24', [
      { d: 'M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z' },
      { d: 'M8.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' },
      { d: 'M21 15l-5-5L5 21' }
    ], 'img-fallback__icon');
    fallback.appendChild(svg);
    const text = createElement('span', 'img-fallback__label', label);
    fallback.appendChild(text);
    parent.appendChild(fallback);
  }, { once: false });
}

/**
 * Walk the document and wire up onerror handlers for any img that lacks one.
 * Cheap to call on route enter — uses a data attribute guard.
 */
export function wireImageErrorFallbacks(scope: ParentNode = document, label?: string): void {
  scope.querySelectorAll<HTMLImageElement>('img:not([data-error-wired])').forEach(img => {
    attachImageErrorFallback(img, label);
  });
}

// ─── Form Submission Feedback ─────────────────────────────────────────────

/**
 * Inject (or update) an inline error banner above the submit button of a form.
 * Pairs with aria-live so screen readers announce the message immediately.
 */
export function showFormError(form: HTMLFormElement, message: string): HTMLElement {
  let banner = form.querySelector<HTMLElement>('.form-error-banner');
  if (!banner) {
    banner = createElement('div', 'form-error-banner');
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-live', 'assertive');
    const icon = createSVG('0 0 24 24', [
      { d: 'M12 22a10 10 0 100-20 10 10 0 000 20z' },
      { d: 'M12 8v4' },
      { d: 'M12 16h.01' }
    ], 'form-error-banner__icon');
    banner.appendChild(icon);
    const text = createElement('span', 'form-error-banner__text');
    banner.appendChild(text);
    form.insertBefore(banner, form.firstChild);
  }
  const text = banner.querySelector<HTMLElement>('.form-error-banner__text');
  if (text) text.textContent = message;
  banner.classList.add('form-error-banner--visible');
  return banner;
}

export function clearFormError(form: HTMLFormElement): void {
  const banner = form.querySelector<HTMLElement>('.form-error-banner');
  if (banner) banner.classList.remove('form-error-banner--visible');
}
