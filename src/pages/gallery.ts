// ═══════════════════════════════════════════════════════════════════════════
// Gallery Page — "Our Visual Story"
// Cinematic editorial gallery: masonry, category chips, immersive lightbox.
// ═══════════════════════════════════════════════════════════════════════════

import { properties } from '../data/properties';
import { projects } from '../data/projects';
import { districts } from '../data/locations';
import {
  generateGalleryData,
  createSEOImage,
  generateSrcSet,
  addImageGallerySchema,
  type GalleryImage,
} from '../utils/image-seo';
import {
  clearDynamicSchemas,
  generateBreadcrumbSchema,
  injectSchemaGraph,
} from '../seo/schema';
import { t } from '../i18n';
import { addSwipeSupport } from '../utils/touch-swipe';
import { createSkeleton, createEmptyState } from '../utils/ui-states';
import { copyToClipboard, toast as globalToast } from '../utils/toast';

// ─── Helpers ──────────────────────────────────────────────────────────────
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

function svgNS(viewBox: string, paths: string[], stroke = true): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', stroke ? 'none' : 'currentColor');
  if (stroke) {
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.6');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
  }
  svg.setAttribute('aria-hidden', 'true');
  paths.forEach((d) => {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    svg.appendChild(p);
  });
  return svg;
}

// Deterministic masonry size assignment — produces varied, intentional rhythm
// (portrait / tall / wide / hero) instead of uniform tiles, but stable across
// re-renders so the layout never flickers.
type MasonrySize = 'reg' | 'tall' | 'wide' | 'hero' | 'portrait';
function masonrySizeFor(index: number): MasonrySize {
  const pattern: MasonrySize[] = [
    'hero',     'reg',  'tall',
    'portrait', 'wide', 'reg',
    'reg',      'tall', 'portrait',
    'wide',     'reg',  'reg',
  ];
  return pattern[index % pattern.length];
}

// ─── State ────────────────────────────────────────────────────────────────
type GalleryCategory = 'all' | 'property' | 'project' | 'interior' | 'exterior' | 'amenity' | 'location';

interface CategoryDef {
  value: GalleryCategory;
  label: string;
  icon: () => SVGSVGElement;
}

const CATEGORY_DEFS: CategoryDef[] = [
  {
    value: 'all',
    label: 'All Stories',
    icon: () => svgNS('0 0 24 24', [
      'M4 6h16', 'M4 12h16', 'M4 18h10'
    ]),
  },
  {
    value: 'property',
    label: 'Properties',
    icon: () => svgNS('0 0 24 24', [
      'M3 21h18', 'M5 21V9l7-5 7 5v12', 'M10 21v-6h4v6'
    ]),
  },
  {
    value: 'project',
    label: 'Projects',
    icon: () => svgNS('0 0 24 24', [
      'M3 21h18', 'M4 21V8h6v13', 'M14 21V3h6v18', 'M7 12h.01', 'M7 16h.01', 'M17 8h.01', 'M17 13h.01'
    ]),
  },
  {
    value: 'exterior',
    label: 'Exteriors',
    icon: () => svgNS('0 0 24 24', [
      'M3 12l9-9 9 9', 'M5 10v10h14V10', 'M9 20v-6h6v6'
    ]),
  },
  {
    value: 'interior',
    label: 'Interiors',
    icon: () => svgNS('0 0 24 24', [
      'M3 21h18', 'M5 21V7h14v14', 'M9 14h6', 'M9 10h6'
    ]),
  },
  {
    value: 'amenity',
    label: 'Lifestyle',
    icon: () => svgNS('0 0 24 24', [
      'M12 21s-7-4.5-7-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-7 11-7 11Z'
    ]),
  },
  {
    value: 'location',
    label: 'Locations',
    icon: () => svgNS('0 0 24 24', [
      'M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11Z',
      'M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
    ]),
  },
];

const PAGE_SIZE = 18;

let currentGalleryCategory: GalleryCategory = 'all';
let lightboxOpen = false;
let currentLightboxIndex = 0;
let filteredImages: GalleryImage[] = [];
let visibleCount = PAGE_SIZE;
let allImagesCache: GalleryImage[] = [];
let previouslyFocusedElement: HTMLElement | null = null;
let zoomLevel = 1;
let thumbStripVisible = false;

// ─── Category Counts ──────────────────────────────────────────────────────
function countFor(category: GalleryCategory, images: GalleryImage[]): number {
  if (category === 'all') return images.length;
  return images.filter((i) => i.category === category).length;
}

// ─── Gallery Card (Masonry Tile) ──────────────────────────────────────────
function createGalleryCard(image: GalleryImage, index: number): HTMLElement {
  const card = document.createElement('figure');
  const size = masonrySizeFor(index);
  card.className = `gallery-card gallery-card--${size}`;
  card.setAttribute('data-id', image.id);
  card.setAttribute('data-category', image.category);
  card.style.setProperty('--reveal-delay', `${(index % 12) * 40}ms`);

  const media = createElement('div', 'gallery-card__media');

  const img = createSEOImage({
    src: image.src,
    alt: image.alt,
    title: image.title,
    className: 'gallery-card__image',
    loading: 'lazy',
    width: 600,
    height: 600,
    srcset: generateSrcSet(image.src, [400, 600, 900, 1200]),
    sizes: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  });
  media.appendChild(img);

  // Top-left category chip on the tile
  const chip = createElement('span', 'gallery-card__chip', formatCategory(image.category));
  chip.setAttribute('aria-hidden', 'true');
  media.appendChild(chip);

  // Hover overlay: title + location + view link
  const overlay = createElement('div', 'gallery-card__overlay');
  const overlayInner = createElement('div', 'gallery-card__overlay-inner');

  const eyebrow = createElement('span', 'gallery-card__eyebrow', formatCategory(image.category));
  overlayInner.appendChild(eyebrow);

  const title = createElement('h3', 'gallery-card__title', image.title);
  overlayInner.appendChild(title);

  const loc = createElement('p', 'gallery-card__location');
  const pin = svgNS('0 0 24 24', [
    'M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11Z',
    'M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  ]);
  pin.setAttribute('class', 'gallery-card__pin-icon');
  loc.appendChild(pin);
  loc.appendChild(document.createTextNode(image.location));
  overlayInner.appendChild(loc);

  const cta = createElement('span', 'gallery-card__cta', t('gallery.viewFullSize') || 'View image');
  const arrow = svgNS('0 0 24 24', ['M5 12h14', 'M13 6l6 6-6 6']);
  arrow.setAttribute('class', 'gallery-card__cta-arrow');
  cta.appendChild(arrow);
  overlayInner.appendChild(cta);

  overlay.appendChild(overlayInner);
  media.appendChild(overlay);

  card.appendChild(media);

  // Visually-hidden caption preserves SEO semantics without polluting layout
  const caption = createElement('figcaption', 'gallery-card__caption sr-only', image.caption);
  card.appendChild(caption);

  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${image.title}, ${image.location}. Open in lightbox.`);
  card.addEventListener('click', () => openLightbox(index));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  });

  return card;
}

function formatCategory(c: GalleryImage['category'] | 'location'): string {
  switch (c) {
    case 'property': return 'Property';
    case 'project': return 'Project';
    case 'interior': return 'Interior';
    case 'exterior': return 'Exterior';
    case 'amenity': return 'Lifestyle';
    case 'location': return 'Location';
    default: return String(c);
  }
}

// ─── Lightbox ─────────────────────────────────────────────────────────────
function ensureLightbox(): HTMLElement {
  let lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) return lightbox;

  lightbox = createElement('div', 'gallery-lightbox');
  lightbox.id = 'gallery-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-labelledby', 'lightbox-title');

  // Backdrop
  const backdrop = createElement('div', 'gallery-lightbox__backdrop');
  backdrop.addEventListener('click', closeLightbox);
  lightbox.appendChild(backdrop);

  // Top bar — counter, actions, close
  const topbar = createElement('div', 'gallery-lightbox__topbar');

  const brand = createElement('div', 'gallery-lightbox__brand');
  const dot = createElement('span', 'gallery-lightbox__brand-dot');
  brand.appendChild(dot);
  brand.appendChild(document.createTextNode('Real House Gallery'));
  topbar.appendChild(brand);

  const counter = createElement('div', 'gallery-lightbox__counter');
  counter.id = 'lightbox-counter';
  topbar.appendChild(counter);

  const actions = createElement('div', 'gallery-lightbox__actions');

  const zoomBtn = createElement('button', 'gallery-lightbox__icon-btn');
  zoomBtn.setAttribute('type', 'button');
  zoomBtn.setAttribute('aria-label', 'Toggle zoom');
  zoomBtn.title = 'Zoom (Z)';
  zoomBtn.appendChild(svgNS('0 0 24 24', [
    'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M21 21l-4.35-4.35', 'M11 8v6', 'M8 11h6',
  ]));
  zoomBtn.addEventListener('click', toggleZoom);
  actions.appendChild(zoomBtn);

  const thumbsBtn = createElement('button', 'gallery-lightbox__icon-btn');
  thumbsBtn.setAttribute('type', 'button');
  thumbsBtn.setAttribute('aria-label', 'Toggle thumbnails');
  thumbsBtn.title = 'Thumbnails (T)';
  thumbsBtn.appendChild(svgNS('0 0 24 24', [
    'M3 5h6v6H3z', 'M15 5h6v6h-6z', 'M3 13h6v6H3z', 'M15 13h6v6h-6z',
  ]));
  thumbsBtn.addEventListener('click', toggleThumbStrip);
  actions.appendChild(thumbsBtn);

  const shareBtn = createElement('button', 'gallery-lightbox__icon-btn');
  shareBtn.setAttribute('type', 'button');
  shareBtn.setAttribute('aria-label', 'Share image');
  shareBtn.title = 'Share';
  shareBtn.appendChild(svgNS('0 0 24 24', [
    'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8', 'M16 6l-4-4-4 4', 'M12 2v14',
  ]));
  shareBtn.addEventListener('click', shareCurrentImage);
  actions.appendChild(shareBtn);

  const dlBtn = createElement('button', 'gallery-lightbox__icon-btn');
  dlBtn.setAttribute('type', 'button');
  dlBtn.setAttribute('aria-label', 'Download original');
  dlBtn.title = 'Download';
  dlBtn.appendChild(svgNS('0 0 24 24', [
    'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3',
  ]));
  dlBtn.addEventListener('click', downloadCurrentImage);
  actions.appendChild(dlBtn);

  const closeBtn = createElement('button', 'gallery-lightbox__icon-btn gallery-lightbox__icon-btn--close');
  closeBtn.setAttribute('type', 'button');
  closeBtn.setAttribute('aria-label', t('gallery.closeLightbox') || 'Close lightbox');
  closeBtn.title = 'Close (Esc)';
  closeBtn.appendChild(svgNS('0 0 24 24', ['M6 6l12 12', 'M18 6L6 18']));
  closeBtn.addEventListener('click', closeLightbox);
  actions.appendChild(closeBtn);

  topbar.appendChild(actions);
  lightbox.appendChild(topbar);

  // Main stage — image + sidebar
  const stage = createElement('div', 'gallery-lightbox__stage');

  // Image area
  const imageWrapper = createElement('div', 'gallery-lightbox__image-wrapper');
  imageWrapper.id = 'lightbox-image-wrapper';

  const lightboxImg = createElement('img', 'gallery-lightbox__image');
  lightboxImg.id = 'lightbox-image';
  lightboxImg.setAttribute('draggable', 'false');
  imageWrapper.appendChild(lightboxImg);

  // Prev / next nav floating over image
  const prevBtn = createElement('button', 'gallery-lightbox__nav gallery-lightbox__nav--prev');
  prevBtn.setAttribute('type', 'button');
  prevBtn.setAttribute('aria-label', 'Previous image');
  prevBtn.appendChild(svgNS('0 0 24 24', ['M15 6l-6 6 6 6']));
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
  imageWrapper.appendChild(prevBtn);

  const nextBtn = createElement('button', 'gallery-lightbox__nav gallery-lightbox__nav--next');
  nextBtn.setAttribute('type', 'button');
  nextBtn.setAttribute('aria-label', 'Next image');
  nextBtn.appendChild(svgNS('0 0 24 24', ['M9 6l6 6-6 6']));
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });
  imageWrapper.appendChild(nextBtn);

  stage.appendChild(imageWrapper);

  // Metadata sidebar
  const sidebar = createElement('aside', 'gallery-lightbox__sidebar');
  sidebar.setAttribute('aria-label', 'Image details');

  const sideEyebrow = createElement('div', 'gallery-lightbox__side-eyebrow');
  sideEyebrow.id = 'lightbox-eyebrow';
  sidebar.appendChild(sideEyebrow);

  const sideTitle = createElement('h2', 'gallery-lightbox__side-title');
  sideTitle.id = 'lightbox-title';
  sidebar.appendChild(sideTitle);

  const sideLocation = createElement('p', 'gallery-lightbox__side-location');
  sideLocation.id = 'lightbox-location';
  sidebar.appendChild(sideLocation);

  const divider = createElement('div', 'gallery-lightbox__side-divider');
  sidebar.appendChild(divider);

  const descLabel = createElement('span', 'gallery-lightbox__side-label', 'About this image');
  sidebar.appendChild(descLabel);
  const sideDesc = createElement('p', 'gallery-lightbox__side-description');
  sideDesc.id = 'lightbox-description';
  sidebar.appendChild(sideDesc);

  const metaList = createElement('dl', 'gallery-lightbox__meta');
  ['Photographer', 'Category', 'Reference'].forEach((label, i) => {
    const dt = createElement('dt', 'gallery-lightbox__meta-key', label);
    const dd = createElement('dd', 'gallery-lightbox__meta-val');
    dd.id = `lightbox-meta-${i}`;
    metaList.appendChild(dt);
    metaList.appendChild(dd);
  });
  sidebar.appendChild(metaList);

  const sideActions = createElement('div', 'gallery-lightbox__side-actions');
  const sideShare = createElement('button', 'btn btn--ghost btn--small', 'Share');
  sideShare.setAttribute('type', 'button');
  sideShare.addEventListener('click', shareCurrentImage);
  const sideDl = createElement('button', 'btn btn--primary btn--small', 'Download');
  sideDl.setAttribute('type', 'button');
  sideDl.addEventListener('click', downloadCurrentImage);
  sideActions.appendChild(sideShare);
  sideActions.appendChild(sideDl);
  sidebar.appendChild(sideActions);

  stage.appendChild(sidebar);
  lightbox.appendChild(stage);

  // Thumbnail strip (hidden by default)
  const thumbStrip = createElement('div', 'gallery-lightbox__thumbstrip');
  thumbStrip.id = 'lightbox-thumbstrip';
  lightbox.appendChild(thumbStrip);

  document.body.appendChild(lightbox);

  document.addEventListener('keydown', handleLightboxKeydown);
  addSwipeSupport(imageWrapper, {
    onSwipeLeft: () => navigateLightbox(1),
    onSwipeRight: () => navigateLightbox(-1),
  });

  return lightbox;
}

function openLightbox(index: number): void {
  previouslyFocusedElement = document.activeElement as HTMLElement;
  currentLightboxIndex = index;
  lightboxOpen = true;
  zoomLevel = 1;

  const lightbox = ensureLightbox();
  updateLightboxContent();
  renderThumbStrip();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  const closeBtn = lightbox.querySelector('.gallery-lightbox__icon-btn--close') as HTMLElement;
  if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
}

function closeLightbox(): void {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightbox.classList.remove('gallery-lightbox--zoomed');
  lightbox.classList.remove('gallery-lightbox--thumbs');
  thumbStripVisible = false;
  zoomLevel = 1;
  document.body.style.overflow = '';
  lightboxOpen = false;
  if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
    previouslyFocusedElement.focus();
  }
  previouslyFocusedElement = null;
}

function navigateLightbox(direction: number): void {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = filteredImages.length - 1;
  else if (currentLightboxIndex >= filteredImages.length) currentLightboxIndex = 0;
  zoomLevel = 1;
  const lb = document.getElementById('gallery-lightbox');
  if (lb) lb.classList.remove('gallery-lightbox--zoomed');
  updateLightboxContent();
  updateActiveThumb();
}

function updateLightboxContent(): void {
  const image = filteredImages[currentLightboxIndex];
  if (!image) return;

  const img = document.getElementById('lightbox-image') as HTMLImageElement | null;
  const title = document.getElementById('lightbox-title');
  const location = document.getElementById('lightbox-location');
  const eyebrow = document.getElementById('lightbox-eyebrow');
  const desc = document.getElementById('lightbox-description');
  const counter = document.getElementById('lightbox-counter');
  const meta0 = document.getElementById('lightbox-meta-0');
  const meta1 = document.getElementById('lightbox-meta-1');
  const meta2 = document.getElementById('lightbox-meta-2');

  if (img) {
    img.classList.remove('gallery-lightbox__image--loaded');
    img.src = image.src.replace(/w=\d+/, 'w=1600');
    img.alt = image.alt;
    img.title = image.title;
    img.onload = () => img.classList.add('gallery-lightbox__image--loaded');
  }
  if (title) title.textContent = image.title;
  if (location) location.textContent = image.location;
  if (eyebrow) eyebrow.textContent = formatCategory(image.category);
  if (desc) desc.textContent = image.caption;
  if (counter) {
    counter.innerHTML = '';
    const cur = createElement('span', 'gallery-lightbox__counter-current', String(currentLightboxIndex + 1).padStart(2, '0'));
    const sep = createElement('span', 'gallery-lightbox__counter-sep', '/');
    const tot = createElement('span', 'gallery-lightbox__counter-total', String(filteredImages.length).padStart(2, '0'));
    counter.appendChild(cur);
    counter.appendChild(sep);
    counter.appendChild(tot);
  }
  if (meta0) meta0.textContent = 'Real House Studio';
  if (meta1) meta1.textContent = formatCategory(image.category);
  if (meta2) meta2.textContent = image.id.toUpperCase();
}

function toggleZoom(): void {
  const lb = document.getElementById('gallery-lightbox');
  const img = document.getElementById('lightbox-image') as HTMLImageElement | null;
  if (!lb || !img) return;
  zoomLevel = zoomLevel === 1 ? 1.6 : 1;
  img.style.transform = `scale(${zoomLevel})`;
  lb.classList.toggle('gallery-lightbox--zoomed', zoomLevel !== 1);
}

function toggleThumbStrip(): void {
  const lb = document.getElementById('gallery-lightbox');
  if (!lb) return;
  thumbStripVisible = !thumbStripVisible;
  lb.classList.toggle('gallery-lightbox--thumbs', thumbStripVisible);
  if (thumbStripVisible) renderThumbStrip();
}

function renderThumbStrip(): void {
  const strip = document.getElementById('lightbox-thumbstrip');
  if (!strip) return;
  while (strip.firstChild) strip.removeChild(strip.firstChild);

  filteredImages.forEach((image, i) => {
    const btn = createElement('button', 'gallery-lightbox__thumb');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', `Go to image ${i + 1}: ${image.title}`);
    btn.dataset.index = String(i);
    if (i === currentLightboxIndex) btn.classList.add('gallery-lightbox__thumb--active');
    const thumbImg = createElement('img');
    thumbImg.src = image.src.replace(/w=\d+/, 'w=160');
    thumbImg.alt = '';
    thumbImg.loading = 'lazy';
    btn.appendChild(thumbImg);
    btn.addEventListener('click', () => {
      currentLightboxIndex = i;
      zoomLevel = 1;
      updateLightboxContent();
      updateActiveThumb();
    });
    strip.appendChild(btn);
  });

  // Scroll active thumb into view
  requestAnimationFrame(() => {
    const active = strip.querySelector<HTMLElement>('.gallery-lightbox__thumb--active');
    if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  });
}

function updateActiveThumb(): void {
  const strip = document.getElementById('lightbox-thumbstrip');
  if (!strip) return;
  strip.querySelectorAll<HTMLElement>('.gallery-lightbox__thumb').forEach((t) => {
    t.classList.toggle('gallery-lightbox__thumb--active', Number(t.dataset.index) === currentLightboxIndex);
  });
  const active = strip.querySelector<HTMLElement>('.gallery-lightbox__thumb--active');
  if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

async function shareCurrentImage(): Promise<void> {
  const image = filteredImages[currentLightboxIndex];
  if (!image) return;
  const url = `${window.location.origin}/gallery#${encodeURIComponent(image.id)}`;
  const shareData = { title: image.title, text: image.caption, url };
  // Prefer native share where available; otherwise fall through to clipboard
  // copy with toast feedback from the shared toast utility.
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
  } catch {
    // user cancelled native share — fall through to clipboard
  }
  await copyToClipboard(url, 'Link copied to clipboard');
}

function downloadCurrentImage(): void {
  const image = filteredImages[currentLightboxIndex];
  if (!image) return;
  // Strip width param so we download the largest source the CDN allows
  const fullSrc = image.src.replace(/w=\d+/, 'w=2400');
  const a = document.createElement('a');
  a.href = fullSrc;
  a.download = `${image.id}.jpg`;
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  globalToast.success('Download started');
}

function handleLightboxKeydown(e: KeyboardEvent): void {
  if (!lightboxOpen) return;
  switch (e.key) {
    case 'Escape': closeLightbox(); break;
    case 'ArrowLeft': navigateLightbox(-1); break;
    case 'ArrowRight': navigateLightbox(1); break;
    case 'z': case 'Z': toggleZoom(); break;
    case 't': case 'T': toggleThumbStrip(); break;
    case 'Tab': handleFocusTrap(e); break;
  }
}

function handleFocusTrap(e: KeyboardEvent): void {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;
  const focusable = lightbox.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (e.shiftKey) {
    if (active === first || !lightbox.contains(active)) {
      e.preventDefault(); last.focus();
    }
  } else {
    if (active === last || !lightbox.contains(active)) {
      e.preventDefault(); first.focus();
    }
  }
}

// ─── Filters / Rendering ──────────────────────────────────────────────────
function renderSkeletonTiles(grid: HTMLElement, count: number): void {
  for (let i = 0; i < count; i++) {
    const tile = createElement('div', `gallery-skeleton gallery-skeleton--${masonrySizeFor(i)}`);
    tile.setAttribute('aria-hidden', 'true');
    tile.appendChild(createSkeleton({ className: 'gallery-skeleton__block' }));
    grid.appendChild(tile);
  }
  grid.setAttribute('role', 'status');
  grid.setAttribute('aria-live', 'polite');
  grid.setAttribute('aria-label', 'Loading gallery');
}

function renderGrid(grid: HTMLElement): void {
  // Filter
  filteredImages = currentGalleryCategory === 'all'
    ? allImagesCache
    : allImagesCache.filter((img) => img.category === currentGalleryCategory);

  while (grid.firstChild) grid.removeChild(grid.firstChild);
  grid.removeAttribute('role');
  grid.removeAttribute('aria-live');
  grid.removeAttribute('aria-label');

  // Empty state
  if (filteredImages.length === 0) {
    const empty = createEmptyState({
      icon: 'filter',
      title: 'No images in this collection yet',
      description: 'Try another category — every story is worth telling, but this one is still being written.',
      primaryAction: {
        label: 'Show all stories',
        onClick: () => {
          currentGalleryCategory = 'all';
          syncFilterButtons();
          renderGrid(grid);
        },
      },
    });
    empty.classList.add('gallery-page__empty');
    grid.appendChild(empty);
    updateLoadMore(0);
    return;
  }

  const visible = filteredImages.slice(0, visibleCount);
  visible.forEach((image, index) => {
    grid.appendChild(createGalleryCard(image, index));
  });

  updateLoadMore(filteredImages.length);
}

function syncFilterButtons(): void {
  document.querySelectorAll<HTMLElement>('.gallery-page__chip').forEach((btn) => {
    const v = btn.dataset.category as GalleryCategory | undefined;
    btn.classList.toggle('gallery-page__chip--active', v === currentGalleryCategory);
    btn.setAttribute('aria-pressed', String(v === currentGalleryCategory));
  });
}

function updateLoadMore(total: number): void {
  const wrap = document.querySelector<HTMLElement>('.gallery-page__loadmore');
  if (!wrap) return;
  const remaining = Math.max(0, total - visibleCount);
  if (remaining <= 0) {
    wrap.classList.add('gallery-page__loadmore--done');
    const btn = wrap.querySelector<HTMLButtonElement>('button');
    if (btn) btn.disabled = true;
    const label = wrap.querySelector<HTMLElement>('.gallery-page__loadmore-label');
    if (label) label.textContent = total === 0 ? '' : `You've reached the end — ${total} stories shown`;
  } else {
    wrap.classList.remove('gallery-page__loadmore--done');
    const btn = wrap.querySelector<HTMLButtonElement>('button');
    if (btn) {
      btn.disabled = false;
      btn.textContent = `Reveal ${Math.min(remaining, PAGE_SIZE)} more`;
    }
    const label = wrap.querySelector<HTMLElement>('.gallery-page__loadmore-label');
    if (label) label.textContent = `${Math.min(visibleCount, total)} of ${total} stories`;
  }
}

// ─── Page Render ──────────────────────────────────────────────────────────
export function renderGalleryPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Reset
  currentGalleryCategory = 'all';
  lightboxOpen = false;
  visibleCount = PAGE_SIZE;

  // Merge property/project gallery data with district location imagery.
  // District imagery surfaces the city's neighborhoods as their own visual
  // story — distinct from individual listings.
  const baseImages = generateGalleryData(properties, projects);
  const locationImages: GalleryImage[] = districts.map((d) => ({
    id: `location-${d.id}`,
    src: d.image,
    alt: `${d.name} district, Erbil — neighborhood overview`,
    title: d.name,
    caption: d.description,
    category: 'location' as any,
    location: `${d.name}, Erbil`,
  }));
  allImagesCache = [...baseImages, ...locationImages];
  filteredImages = allImagesCache;

  const page = createElement('section', 'gallery-page');

  // ─── HERO ──────────────────────────────────────────────────────────────
  const hero = createElement('header', 'gallery-page__hero');

  const heroBackdrop = createElement('div', 'gallery-page__hero-backdrop');
  heroBackdrop.setAttribute('aria-hidden', 'true');
  // Pick 6 hero backdrop images from the dataset (or fallback to first available)
  const backdropImages = allImagesCache.slice(0, 6);
  backdropImages.forEach((img, i) => {
    const tile = createElement('div', `gallery-page__hero-tile gallery-page__hero-tile--${i}`);
    const tileImg = document.createElement('img');
    tileImg.src = img.src.replace(/w=\d+/, 'w=600');
    tileImg.alt = '';
    tileImg.loading = 'eager';
    tileImg.decoding = 'async';
    tile.appendChild(tileImg);
    heroBackdrop.appendChild(tile);
  });
  hero.appendChild(heroBackdrop);

  const heroVeil = createElement('div', 'gallery-page__hero-veil');
  heroVeil.setAttribute('aria-hidden', 'true');
  hero.appendChild(heroVeil);

  const heroInner = createElement('div', 'gallery-page__hero-inner container');

  const eyebrow = createElement('div', 'gallery-page__eyebrow');
  const eyeLine = createElement('span', 'gallery-page__eyebrow-line');
  const eyeText = createElement('span', 'gallery-page__eyebrow-text', 'A Visual Archive');
  const eyeLine2 = createElement('span', 'gallery-page__eyebrow-line');
  eyebrow.appendChild(eyeLine);
  eyebrow.appendChild(eyeText);
  eyebrow.appendChild(eyeLine2);
  heroInner.appendChild(eyebrow);

  const heroTitle = createElement('h1', 'gallery-page__hero-title');
  heroTitle.innerHTML = 'Our <em>Visual</em><br/>Story';
  heroInner.appendChild(heroTitle);

  const heroSub = createElement('p', 'gallery-page__hero-sub',
    'Every property has a story — light through tall windows, the curve of a staircase, a courtyard at golden hour. Browse the moments that define how we see real estate.');
  heroInner.appendChild(heroSub);

  const heroStats = createElement('div', 'gallery-page__hero-stats');
  const stat1 = createStat(String(allImagesCache.length), 'Images');
  const stat2 = createStat(String(properties.length), 'Properties');
  const stat3 = createStat(String(projects.length), 'Projects');
  heroStats.appendChild(stat1);
  heroStats.appendChild(stat2);
  heroStats.appendChild(stat3);
  heroInner.appendChild(heroStats);

  hero.appendChild(heroInner);

  const scrollHint = createElement('div', 'gallery-page__scrollhint');
  scrollHint.setAttribute('aria-hidden', 'true');
  const hintLine = createElement('span', 'gallery-page__scrollhint-line');
  const hintText = createElement('span', 'gallery-page__scrollhint-text', 'Scroll to explore');
  scrollHint.appendChild(hintText);
  scrollHint.appendChild(hintLine);
  hero.appendChild(scrollHint);

  page.appendChild(hero);

  // ─── BODY ──────────────────────────────────────────────────────────────
  const body = createElement('div', 'gallery-page__body container');

  // Filter chips
  const filterBar = createElement('nav', 'gallery-page__filters');
  filterBar.setAttribute('aria-label', 'Filter gallery by category');

  CATEGORY_DEFS.forEach((cat) => {
    const count = countFor(cat.value, allImagesCache);
    const btn = createElement('button', 'gallery-page__chip');
    btn.setAttribute('type', 'button');
    btn.setAttribute('data-category', cat.value);
    btn.setAttribute('aria-pressed', String(cat.value === 'all'));
    if (cat.value === 'all') btn.classList.add('gallery-page__chip--active');

    const iconWrap = createElement('span', 'gallery-page__chip-icon');
    iconWrap.appendChild(cat.icon());
    btn.appendChild(iconWrap);

    const label = createElement('span', 'gallery-page__chip-label', cat.label);
    btn.appendChild(label);

    const countEl = createElement('span', 'gallery-page__chip-count', String(count));
    btn.appendChild(countEl);

    btn.addEventListener('click', () => {
      if (currentGalleryCategory === cat.value) return;
      currentGalleryCategory = cat.value;
      visibleCount = PAGE_SIZE;
      syncFilterButtons();
      const grid = document.querySelector<HTMLElement>('.gallery-page__grid');
      if (!grid) return;
      // Brief skeleton flash for perceived responsiveness
      while (grid.firstChild) grid.removeChild(grid.firstChild);
      renderSkeletonTiles(grid, 8);
      window.setTimeout(() => renderGrid(grid), 220);
    });

    filterBar.appendChild(btn);
  });

  body.appendChild(filterBar);

  // Masonry grid
  const grid = createElement('div', 'gallery-page__grid');
  body.appendChild(grid);

  // Load more
  const loadmore = createElement('div', 'gallery-page__loadmore');
  const loadmoreLabel = createElement('span', 'gallery-page__loadmore-label');
  loadmore.appendChild(loadmoreLabel);
  const loadmoreBtn = createElement('button', 'btn btn--outline gallery-page__loadmore-btn');
  loadmoreBtn.setAttribute('type', 'button');
  loadmoreBtn.textContent = 'Reveal more';
  loadmoreBtn.addEventListener('click', () => {
    visibleCount += PAGE_SIZE;
    renderGrid(grid);
  });
  loadmore.appendChild(loadmoreBtn);
  body.appendChild(loadmore);

  page.appendChild(body);
  fragment.appendChild(page);

  // Initial render — skeleton then real grid, on next frame so DOM is mounted
  requestAnimationFrame(() => {
    renderSkeletonTiles(grid, 8);
    window.setTimeout(() => renderGrid(grid), 150);
  });

  // SEO schema (deferred)
  setTimeout(() => addImageGallerySchema(allImagesCache), 0);

  return fragment;
}

function createStat(value: string, label: string): HTMLElement {
  const wrap = createElement('div', 'gallery-page__hero-stat');
  const v = createElement('span', 'gallery-page__hero-stat-value', value);
  const l = createElement('span', 'gallery-page__hero-stat-label', label);
  wrap.appendChild(v);
  wrap.appendChild(l);
  return wrap;
}

// ─── SEO Helper ───────────────────────────────────────────────────────────
export function setupGalleryPageSEO(): void {
  clearDynamicSchemas();

  document.title = 'Property Erbil Gallery | Real Estate Erbil Photos | Luxury Homes Kurdistan | Real House';

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Property Erbil gallery - Browse photos of luxury homes Kurdistan, villas Erbil Iraq, apartments Erbil Iraq, penthouse Erbil. Best real estate agent Erbil showcasing houses for sale Erbil in the Erbil property market.');
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', 'https://realhouseiq.com/gallery');

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', 'Property Erbil Gallery | Real Estate Erbil Photos | Real House');

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', 'Browse property Erbil photos - luxury homes Kurdistan, villas Erbil Iraq, apartments Erbil Iraq, penthouse Erbil. Best real estate agent Erbil gallery.');

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', 'https://realhouseiq.com/gallery');

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://realhouseiq.com/gallery#collection',
      'name': 'Property Erbil Gallery - Real Estate Erbil Photos',
      'description': 'Browse property Erbil photos - luxury homes Kurdistan, villas Erbil Iraq, apartments Erbil Iraq, penthouse Erbil. Best real estate agent Erbil showcasing houses for sale Erbil.',
      'url': 'https://realhouseiq.com/gallery',
      'mainEntity': {
        '@type': 'ItemList',
        'name': 'Property Photo Collections',
        'numberOfItems': properties.length,
        'itemListElement': properties.slice(0, 20).map((property, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': {
            '@type': 'ImageGallery',
            'name': `${property.title} Gallery`,
            'url': `https://realhouseiq.com/properties/${property.id}`,
            'numberOfItems': property.images.length,
            'image': property.images[0],
          },
        })),
      },
    },
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://realhouseiq.com' },
      { name: 'Gallery', url: 'https://realhouseiq.com/gallery' },
    ]),
  ];

  injectSchemaGraph(schemas, 'schema-gallery-page');
}
