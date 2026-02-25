// ═══════════════════════════════════════════════════════════════════════════
// Floor Plan Modal Component
// Zoomable floor plan viewer with download functionality
// ═══════════════════════════════════════════════════════════════════════════

import { t } from '../i18n';

export interface FloorPlanModalOptions {
  imageUrl: string;
  propertyTitle: string;
  pdfUrl?: string;
}

// Demo floor plan URL for properties without a plan
const DEMO_FLOOR_PLAN_URL = 'https://images.unsplash.com/photo-1580219015423-3e2b6a92f9c5?w=1200&q=80&fm=webp';

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

function createSVGIcon(pathD: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathD);
  svg.appendChild(path);

  return svg;
}

function createCloseIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line1.setAttribute('x1', '18');
  line1.setAttribute('y1', '6');
  line1.setAttribute('x2', '6');
  line1.setAttribute('y2', '18');
  svg.appendChild(line1);

  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttribute('x1', '6');
  line2.setAttribute('y1', '6');
  line2.setAttribute('x2', '18');
  line2.setAttribute('y2', '18');
  svg.appendChild(line2);

  return svg;
}

function createZoomInIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '11');
  circle.setAttribute('cy', '11');
  circle.setAttribute('r', '8');
  svg.appendChild(circle);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', '21');
  line.setAttribute('y1', '21');
  line.setAttribute('x2', '16.65');
  line.setAttribute('y2', '16.65');
  svg.appendChild(line);

  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttribute('x1', '11');
  line2.setAttribute('y1', '8');
  line2.setAttribute('x2', '11');
  line2.setAttribute('y2', '14');
  svg.appendChild(line2);

  const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line3.setAttribute('x1', '8');
  line3.setAttribute('y1', '11');
  line3.setAttribute('x2', '14');
  line3.setAttribute('y2', '11');
  svg.appendChild(line3);

  return svg;
}

function createZoomOutIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '11');
  circle.setAttribute('cy', '11');
  circle.setAttribute('r', '8');
  svg.appendChild(circle);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', '21');
  line.setAttribute('y1', '21');
  line.setAttribute('x2', '16.65');
  line.setAttribute('y2', '16.65');
  svg.appendChild(line);

  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttribute('x1', '8');
  line2.setAttribute('y1', '11');
  line2.setAttribute('x2', '14');
  line2.setAttribute('y2', '11');
  svg.appendChild(line2);

  return svg;
}

function createResetIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '1 4 1 10 7 10');
  svg.appendChild(polyline);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M3.51 15a9 9 0 1 0 2.13-9.36L1 10');
  svg.appendChild(path);

  return svg;
}

function createDownloadIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
  svg.appendChild(path);

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '7 10 12 15 17 10');
  svg.appendChild(polyline);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', '12');
  line.setAttribute('y1', '15');
  line.setAttribute('x2', '12');
  line.setAttribute('y2', '3');
  svg.appendChild(line);

  return svg;
}

export function openFloorPlanModal(options: FloorPlanModalOptions): void {
  const { imageUrl, propertyTitle, pdfUrl } = options;
  const planUrl = imageUrl || DEMO_FLOOR_PLAN_URL;
  const isDemo = !imageUrl;

  // Zoom state
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  const minScale = 0.5;
  const maxScale = 4;

  // Create modal overlay
  const overlay = createElement('div', 'floor-plan-modal');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `Floor plan of ${propertyTitle}`);

  // Create modal container
  const modal = createElement('div', 'floor-plan-modal__container');

  // Create header
  const header = createElement('div', 'floor-plan-modal__header');

  const titleWrapper = createElement('div', 'floor-plan-modal__title-wrapper');
  const title = createElement('h2', 'floor-plan-modal__title', t('modals.floorPlan'));
  const subtitle = createElement('span', 'floor-plan-modal__subtitle', propertyTitle);
  titleWrapper.appendChild(title);
  titleWrapper.appendChild(subtitle);

  if (isDemo) {
    const demoBadge = createElement('span', 'floor-plan-modal__demo-badge', t('modals.samplePlan'));
    titleWrapper.appendChild(demoBadge);
  }

  header.appendChild(titleWrapper);

  // Zoom controls
  const zoomControls = createElement('div', 'floor-plan-modal__zoom-controls');

  const zoomInBtn = createElement('button', 'floor-plan-modal__zoom-btn');
  zoomInBtn.setAttribute('aria-label', t('modals.zoomIn'));
  zoomInBtn.appendChild(createZoomInIcon());
  zoomControls.appendChild(zoomInBtn);

  const zoomOutBtn = createElement('button', 'floor-plan-modal__zoom-btn');
  zoomOutBtn.setAttribute('aria-label', t('modals.zoomOut'));
  zoomOutBtn.appendChild(createZoomOutIcon());
  zoomControls.appendChild(zoomOutBtn);

  const resetBtn = createElement('button', 'floor-plan-modal__zoom-btn');
  resetBtn.setAttribute('aria-label', t('modals.resetView'));
  resetBtn.appendChild(createResetIcon());
  zoomControls.appendChild(resetBtn);

  const zoomLevel = createElement('span', 'floor-plan-modal__zoom-level', '100%');
  zoomControls.appendChild(zoomLevel);

  header.appendChild(zoomControls);

  // Action buttons
  const actions = createElement('div', 'floor-plan-modal__actions');

  // Download button
  if (pdfUrl || imageUrl) {
    const downloadBtn = createElement('button', 'floor-plan-modal__download-btn');
    downloadBtn.appendChild(createDownloadIcon());
    downloadBtn.appendChild(document.createTextNode(t('modals.downloadPdf')));
    downloadBtn.addEventListener('click', () => {
      const link = createElement('a');
      link.href = pdfUrl || planUrl;
      link.download = `floor-plan-${propertyTitle.replace(/\s+/g, '-').toLowerCase()}.${pdfUrl ? 'pdf' : 'jpg'}`;
      link.target = '_blank';
      link.click();
    });
    actions.appendChild(downloadBtn);
  }

  // Fullscreen button
  const fullscreenBtn = createElement('button', 'floor-plan-modal__action-btn');
  fullscreenBtn.setAttribute('aria-label', t('modals.toggleFullscreen'));
  fullscreenBtn.appendChild(createSVGIcon('M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'));
  fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      modal.classList.remove('fullscreen');
    } else {
      modal.requestFullscreen?.();
      modal.classList.add('fullscreen');
    }
  });
  actions.appendChild(fullscreenBtn);

  // Close button
  const closeBtn = createElement('button', 'floor-plan-modal__close-btn');
  closeBtn.setAttribute('aria-label', t('modals.closeFloorPlan'));
  closeBtn.appendChild(createCloseIcon());
  actions.appendChild(closeBtn);

  header.appendChild(actions);
  modal.appendChild(header);

  // Create image container
  const imageContainer = createElement('div', 'floor-plan-modal__image-container');

  // Loading spinner
  const loader = createElement('div', 'floor-plan-modal__loader');
  const spinner = createElement('div', 'floor-plan-modal__spinner');
  const loadingText = createElement('span', 'floor-plan-modal__loading-text', t('modals.loadingFloorPlan'));
  loader.appendChild(spinner);
  loader.appendChild(loadingText);
  imageContainer.appendChild(loader);

  // Create image wrapper for zooming
  const imageWrapper = createElement('div', 'floor-plan-modal__image-wrapper');

  // Create image
  const image = createElement('img', 'floor-plan-modal__image');
  image.src = planUrl;
  image.alt = `Floor plan of ${propertyTitle}`;
  image.draggable = false;

  image.addEventListener('load', () => {
    loader.classList.add('hidden');
    image.classList.add('loaded');
  });

  imageWrapper.appendChild(image);
  imageContainer.appendChild(imageWrapper);
  modal.appendChild(imageContainer);

  // Instructions
  const instructions = createElement('div', 'floor-plan-modal__instructions');
  const instructionText = createElement('p', undefined, t('modals.floorPlanInstructions'));
  instructions.appendChild(instructionText);
  modal.appendChild(instructions);

  overlay.appendChild(modal);

  // Update transform
  const updateTransform = () => {
    imageWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    zoomLevel.textContent = `${Math.round(scale * 100)}%`;
  };

  // Zoom functions
  const zoomIn = () => {
    scale = Math.min(scale * 1.25, maxScale);
    updateTransform();
  };

  const zoomOut = () => {
    scale = Math.max(scale / 1.25, minScale);
    updateTransform();
  };

  const resetZoom = () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  };

  // Event listeners
  zoomInBtn.addEventListener('click', zoomIn);
  zoomOutBtn.addEventListener('click', zoomOut);
  resetBtn.addEventListener('click', resetZoom);

  // Mouse wheel zoom
  imageContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(minScale, Math.min(maxScale, scale * delta));

    if (newScale !== scale) {
      // Zoom towards cursor position
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const scaleChange = newScale / scale;
      translateX = x - (x - translateX) * scaleChange;
      translateY = y - (y - translateY) * scaleChange;
      scale = newScale;

      updateTransform();
    }
  });

  // Drag to pan
  imageContainer.addEventListener('mousedown', (e) => {
    if (scale <= 1) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    imageContainer.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    imageContainer.style.cursor = scale > 1 ? 'grab' : 'default';
  });

  // Double click to reset
  imageContainer.addEventListener('dblclick', resetZoom);

  // Touch support
  let lastTouchDistance = 0;
  imageContainer.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      lastTouchDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    } else if (e.touches.length === 1 && scale > 1) {
      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
    }
  });

  imageContainer.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);

      if (lastTouchDistance > 0) {
        const delta = distance / lastTouchDistance;
        scale = Math.max(minScale, Math.min(maxScale, scale * delta));
        updateTransform();
      }
      lastTouchDistance = distance;
    } else if (e.touches.length === 1 && isDragging) {
      e.preventDefault();
      translateX = e.touches[0].clientX - startX;
      translateY = e.touches[0].clientY - startY;
      updateTransform();
    }
  });

  imageContainer.addEventListener('touchend', () => {
    isDragging = false;
    lastTouchDistance = 0;
  });

  // Close handlers
  const closeModal = () => {
    overlay.classList.add('closing');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 300);
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Escape key handler
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Add to DOM
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });

  // Focus close button
  closeBtn.focus();
}

// Inject styles
export function injectFloorPlanStyles(): void {
  if (document.getElementById('floor-plan-modal-styles')) return;

  const styles = document.createElement('style');
  styles.id = 'floor-plan-modal-styles';
  styles.textContent = `
    .floor-plan-modal {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-4);
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
      opacity: 0;
      transition: background 0.3s ease, backdrop-filter 0.3s ease, opacity 0.3s ease;
    }

    .floor-plan-modal.active {
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
      opacity: 1;
    }

    .floor-plan-modal.closing {
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
      opacity: 0;
    }

    .floor-plan-modal__container {
      position: relative;
      width: 100%;
      max-width: 1200px;
      height: 90vh;
      max-height: 850px;
      background: var(--c-surface);
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transform: scale(0.95) translateY(20px);
      transition: transform 0.3s var(--ease-out);
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
    }

    .floor-plan-modal.active .floor-plan-modal__container {
      transform: scale(1) translateY(0);
    }

    .floor-plan-modal.closing .floor-plan-modal__container {
      transform: scale(0.95) translateY(20px);
    }

    .floor-plan-modal__container.fullscreen {
      max-width: 100%;
      max-height: 100%;
      height: 100%;
      border-radius: 0;
    }

    .floor-plan-modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-4) var(--space-6);
      background: var(--c-surface-2);
      border-bottom: 1px solid var(--c-glass-border);
      flex-wrap: wrap;
      gap: var(--space-4);
    }

    .floor-plan-modal__title-wrapper {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      flex-wrap: wrap;
    }

    .floor-plan-modal__title {
      font-family: var(--font-serif);
      font-size: var(--text-xl);
      color: var(--c-text);
      margin: 0;
    }

    .floor-plan-modal__subtitle {
      font-size: var(--text-sm);
      color: var(--c-text-2);
    }

    .floor-plan-modal__demo-badge {
      padding: var(--space-1) var(--space-3);
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--c-bg);
      background: var(--c-gold);
      border-radius: var(--radius-sm);
    }

    .floor-plan-modal__zoom-controls {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .floor-plan-modal__zoom-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 1px solid var(--c-glass-border);
      border-radius: var(--radius-md);
      background: var(--c-surface-3);
      color: var(--c-text-2);
      cursor: pointer;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }

    .floor-plan-modal__zoom-btn:hover {
      background: var(--c-gold);
      border-color: var(--c-gold);
      color: var(--c-bg);
    }

    .floor-plan-modal__zoom-btn svg {
      width: 18px;
      height: 18px;
    }

    .floor-plan-modal__zoom-level {
      font-size: var(--text-sm);
      color: var(--c-text-2);
      min-width: 50px;
      text-align: center;
      font-variant-numeric: tabular-nums;
    }

    .floor-plan-modal__actions {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .floor-plan-modal__download-btn {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-4);
      border: none;
      border-radius: var(--radius-md);
      background: var(--c-gold);
      color: var(--c-bg);
      font-size: var(--text-sm);
      font-weight: 500;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .floor-plan-modal__download-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-gold);
    }

    .floor-plan-modal__download-btn svg {
      width: 18px;
      height: 18px;
    }

    .floor-plan-modal__action-btn,
    .floor-plan-modal__close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border: none;
      border-radius: var(--radius-md);
      background: var(--c-surface-3);
      color: var(--c-text-2);
      cursor: pointer;
      transition: background 0.2s, color 0.2s, transform 0.2s;
    }

    .floor-plan-modal__action-btn:hover,
    .floor-plan-modal__close-btn:hover {
      background: var(--c-gold);
      color: var(--c-bg);
      transform: scale(1.05);
    }

    .floor-plan-modal__action-btn svg,
    .floor-plan-modal__close-btn svg {
      width: 20px;
      height: 20px;
    }

    .floor-plan-modal__image-container {
      flex: 1;
      position: relative;
      overflow: hidden;
      background: var(--c-bg);
      cursor: default;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .floor-plan-modal__loader {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      background: var(--c-bg);
      z-index: 1;
      transition: opacity 0.3s ease;
    }

    .floor-plan-modal__loader.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .floor-plan-modal__spinner {
      width: 48px;
      height: 48px;
      border: 3px solid var(--c-surface-3);
      border-top-color: var(--c-gold);
      border-radius: 50%;
      animation: fpm-spin 1s linear infinite;
    }

    @keyframes fpm-spin {
      to { transform: rotate(360deg); }
    }

    .floor-plan-modal__loading-text {
      font-size: var(--text-sm);
      color: var(--c-text-2);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .floor-plan-modal__image-wrapper {
      transition: transform 0.1s ease;
      will-change: transform;
    }

    .floor-plan-modal__image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      opacity: 0;
      transition: opacity 0.5s ease;
      user-select: none;
    }

    .floor-plan-modal__image.loaded {
      opacity: 1;
    }

    .floor-plan-modal__instructions {
      padding: var(--space-3) var(--space-6);
      background: var(--c-surface-2);
      border-top: 1px solid var(--c-glass-border);
      text-align: center;
    }

    .floor-plan-modal__instructions p {
      font-size: var(--text-sm);
      color: var(--c-text-3);
      margin: 0;
    }

    @media (max-width: 768px) {
      .floor-plan-modal {
        padding: 0;
      }

      .floor-plan-modal__container {
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }

      .floor-plan-modal__header {
        padding: var(--space-3) var(--space-4);
        flex-direction: column;
        align-items: stretch;
      }

      .floor-plan-modal__title-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-1);
      }

      .floor-plan-modal__zoom-controls {
        justify-content: center;
      }

      .floor-plan-modal__actions {
        justify-content: flex-end;
      }

      .floor-plan-modal__download-btn span {
        display: none;
      }

      .floor-plan-modal__instructions {
        padding: var(--space-2) var(--space-4);
      }
    }
  `;
  document.head.appendChild(styles);
}
