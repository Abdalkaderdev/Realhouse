// ═══════════════════════════════════════════════════════════════════════════
// Gallery Page for Real House - Property Photo Gallery
// SEO-Optimized Image Gallery for Google Images
// ═══════════════════════════════════════════════════════════════════════════

import { properties } from '../data/properties';
import { projects } from '../data/projects';
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

// ─── Helper Functions ─────────────────────────────────────────────────────
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

// ─── Gallery Filter State ─────────────────────────────────────────────────
type GalleryCategory = 'all' | 'property' | 'project' | 'interior' | 'exterior' | 'amenity';

let currentGalleryCategory: GalleryCategory = 'all';
let lightboxOpen = false;
let currentLightboxIndex = 0;
let filteredImages: GalleryImage[] = [];

// ─── Gallery Card Component ───────────────────────────────────────────────
function createGalleryCard(image: GalleryImage, index: number): HTMLElement {
  const card = createElement('article', 'gallery-card');
  card.setAttribute('data-id', image.id);
  card.setAttribute('data-category', image.category);

  // Image container
  const imageContainer = createElement('div', 'gallery-card__image-container');

  // SEO-optimized image
  const img = createSEOImage({
    src: image.src,
    alt: image.alt,
    title: image.title,
    className: 'gallery-card__image',
    loading: 'lazy',
    width: 400,
    height: 300,
    srcset: generateSrcSet(image.src, [300, 400, 600]),
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  });
  imageContainer.appendChild(img);

  // Overlay with info
  const overlay = createElement('div', 'gallery-card__overlay');

  const title = createElement('h3', 'gallery-card__title', image.title);
  overlay.appendChild(title);

  const location = createElement('p', 'gallery-card__location', image.location);
  overlay.appendChild(location);

  const viewBtn = createElement('button', 'gallery-card__view-btn', 'View Full Size');
  viewBtn.setAttribute('aria-label', `View ${image.title} in full size`);
  viewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(index);
  });
  overlay.appendChild(viewBtn);

  imageContainer.appendChild(overlay);
  card.appendChild(imageContainer);

  // Caption for SEO
  const caption = createElement('figcaption', 'gallery-card__caption', image.caption);
  card.appendChild(caption);

  // Make the whole card clickable
  card.addEventListener('click', () => {
    openLightbox(index);
  });
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  });

  return card;
}

// ─── Lightbox Component ───────────────────────────────────────────────────
function openLightbox(index: number): void {
  currentLightboxIndex = index;
  lightboxOpen = true;

  // Create lightbox if it doesn't exist
  let lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) {
    lightbox = createElement('div', 'gallery-lightbox');
    lightbox.id = 'gallery-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image lightbox');

    // Backdrop
    const backdrop = createElement('div', 'gallery-lightbox__backdrop');
    backdrop.addEventListener('click', closeLightbox);
    lightbox.appendChild(backdrop);

    // Content
    const content = createElement('div', 'gallery-lightbox__content');

    // Close button
    const closeBtn = createElement('button', 'gallery-lightbox__close');
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.textContent = '\u00D7'; // Times symbol
    closeBtn.addEventListener('click', closeLightbox);
    content.appendChild(closeBtn);

    // Image container
    const imageWrapper = createElement('div', 'gallery-lightbox__image-wrapper');
    const lightboxImg = createElement('img', 'gallery-lightbox__image');
    lightboxImg.id = 'lightbox-image';
    imageWrapper.appendChild(lightboxImg);
    content.appendChild(imageWrapper);

    // Caption
    const captionWrapper = createElement('div', 'gallery-lightbox__caption-wrapper');
    const captionTitle = createElement('h3', 'gallery-lightbox__title');
    captionTitle.id = 'lightbox-title';
    captionWrapper.appendChild(captionTitle);
    const captionText = createElement('p', 'gallery-lightbox__caption');
    captionText.id = 'lightbox-caption';
    captionWrapper.appendChild(captionText);
    content.appendChild(captionWrapper);

    // Navigation
    const prevBtn = createElement('button', 'gallery-lightbox__nav gallery-lightbox__nav--prev');
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.textContent = '\u2039'; // Left angle bracket
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    content.appendChild(prevBtn);

    const nextBtn = createElement('button', 'gallery-lightbox__nav gallery-lightbox__nav--next');
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.textContent = '\u203A'; // Right angle bracket
    nextBtn.addEventListener('click', () => navigateLightbox(1));
    content.appendChild(nextBtn);

    // Counter
    const counter = createElement('div', 'gallery-lightbox__counter');
    counter.id = 'lightbox-counter';
    content.appendChild(counter);

    lightbox.appendChild(content);
    document.body.appendChild(lightbox);

    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeydown);
  }

  updateLightboxContent();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(): void {
  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxOpen = false;
  }
}

function navigateLightbox(direction: number): void {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = filteredImages.length - 1;
  } else if (currentLightboxIndex >= filteredImages.length) {
    currentLightboxIndex = 0;
  }
  updateLightboxContent();
}

function updateLightboxContent(): void {
  const image = filteredImages[currentLightboxIndex];
  if (!image) return;

  const lightboxImg = document.getElementById('lightbox-image') as HTMLImageElement;
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');

  if (lightboxImg) {
    lightboxImg.src = image.src.replace(/w=\d+/, 'w=1200');
    lightboxImg.alt = image.alt;
    lightboxImg.title = image.title;
  }
  if (lightboxTitle) lightboxTitle.textContent = image.title;
  if (lightboxCaption) lightboxCaption.textContent = image.caption;
  if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${filteredImages.length}`;
}

function handleLightboxKeydown(e: KeyboardEvent): void {
  if (!lightboxOpen) return;

  switch (e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      navigateLightbox(-1);
      break;
    case 'ArrowRight':
      navigateLightbox(1);
      break;
  }
}

// ─── Filter and Render Gallery ────────────────────────────────────────────
function filterAndRenderGallery(grid: HTMLElement): void {
  const allImages = generateGalleryData(properties, projects);

  filteredImages = currentGalleryCategory === 'all'
    ? allImages
    : allImages.filter(img => img.category === currentGalleryCategory);

  // Clear grid
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  // Render images
  if (filteredImages.length === 0) {
    const emptyState = createElement('div', 'gallery-page__empty');
    const emptyTitle = createElement('h3', undefined, 'No images found');
    const emptyText = createElement('p', undefined, 'Try selecting a different category.');
    emptyState.appendChild(emptyTitle);
    emptyState.appendChild(emptyText);
    grid.appendChild(emptyState);
  } else {
    filteredImages.forEach((image, index) => {
      grid.appendChild(createGalleryCard(image, index));
    });
  }
}

// ─── Gallery Page ─────────────────────────────────────────────────────────
export function renderGalleryPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Reset filter state
  currentGalleryCategory = 'all';
  lightboxOpen = false;

  const page = createElement('div', 'gallery-page');
  const container = createElement('div', 'container');

  // Header section
  const header = createElement('div', 'gallery-page__header');
  const title = createElement('h1', 'gallery-page__title');
  title.textContent = 'Property ';
  const em = createElement('em', undefined, 'Gallery');
  title.appendChild(em);
  header.appendChild(title);
  const subtitle = createElement('p', 'gallery-page__subtitle', 'Browse stunning photos of luxury villas, apartments, and development projects in Erbil, Kurdistan. High-quality images showcasing the finest real estate in the region.');
  header.appendChild(subtitle);
  container.appendChild(header);

  // Category filters
  const filters = createElement('div', 'gallery-page__filters');
  const categories: { label: string; value: GalleryCategory }[] = [
    { label: 'All Photos', value: 'all' },
    { label: 'Properties', value: 'property' },
    { label: 'Projects', value: 'project' },
    { label: 'Exteriors', value: 'exterior' },
    { label: 'Interiors', value: 'interior' },
  ];

  categories.forEach(category => {
    const btn = createElement('button', `gallery-page__filter-btn${category.value === 'all' ? ' active' : ''}`, category.label);
    btn.setAttribute('data-category', category.value);
    btn.addEventListener('click', () => {
      // Update active state
      filters.querySelectorAll('.gallery-page__filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update filter and re-render
      currentGalleryCategory = category.value;
      const grid = document.querySelector('.gallery-page__grid') as HTMLElement;
      if (grid) filterAndRenderGallery(grid);
    });
    filters.appendChild(btn);
  });
  container.appendChild(filters);

  // Gallery grid
  const galleryGrid = createElement('div', 'gallery-page__grid');

  // Generate gallery data and render
  const allImages = generateGalleryData(properties, projects);
  filteredImages = allImages;

  allImages.forEach((image, index) => {
    galleryGrid.appendChild(createGalleryCard(image, index));
  });
  container.appendChild(galleryGrid);

  // SEO: Add structured data for image gallery
  setTimeout(() => {
    addImageGallerySchema(allImages);
  }, 0);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── SEO Helper for Gallery Page ──────────────────────────────────────────
export function setupGalleryPageSEO(): void {
  // Clear previous schemas
  clearDynamicSchemas();

  // Update meta tags for gallery page
  document.title = 'Property Photo Gallery | Luxury Real Estate Images Erbil | Real House';

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Browse stunning photos of luxury properties in Erbil, Kurdistan. High-quality images of villas, apartments, penthouses, and development projects. Real House property gallery.');
  }

  // Update canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', 'https://realhouseiq.com/gallery');
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', 'Property Photo Gallery | Real House Erbil');
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', 'Browse stunning photos of luxury properties in Erbil, Kurdistan. High-quality images of villas, apartments, and development projects.');
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', 'https://realhouseiq.com/gallery');
  }

  // Add JSON-LD schemas for gallery page
  const schemas = [
    // CollectionPage schema
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://realhouseiq.com/gallery#collection',
      'name': 'Real House Property Gallery',
      'description': 'Browse professional photos of luxury properties in Erbil, Kurdistan. High-quality images of villas, apartments, penthouses, and commercial spaces.',
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
            'image': property.images[0]
          }
        }))
      }
    },
    // Breadcrumb schema
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://realhouseiq.com' },
      { name: 'Gallery', url: 'https://realhouseiq.com/gallery' }
    ])
  ];

  injectSchemaGraph(schemas, 'schema-gallery-page');
}
