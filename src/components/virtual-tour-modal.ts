// ═══════════════════════════════════════════════════════════════════════════
// Virtual Tour Modal Component
// Supports Matterport embeds and 3D tour iframes
// ═══════════════════════════════════════════════════════════════════════════

import { t } from '../i18n';

export interface VirtualTourModalOptions {
  url: string;
  propertyTitle: string;
}

// Demo Matterport URL for properties without a tour
const DEMO_TOUR_URL = 'https://my.matterport.com/show/?m=SxQL3iGyvAk';

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

export function openVirtualTourModal(options: VirtualTourModalOptions): void {
  const { url, propertyTitle } = options;
  const tourUrl = url || DEMO_TOUR_URL;
  const isDemo = !url;

  // Create modal overlay
  const overlay = createElement('div', 'virtual-tour-modal');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `Virtual tour of ${propertyTitle}`);

  // Create modal container
  const modal = createElement('div', 'virtual-tour-modal__container');

  // Create header
  const header = createElement('div', 'virtual-tour-modal__header');

  const titleWrapper = createElement('div', 'virtual-tour-modal__title-wrapper');
  const title = createElement('h2', 'virtual-tour-modal__title', t('modals.virtualTour'));
  const subtitle = createElement('span', 'virtual-tour-modal__subtitle', propertyTitle);
  titleWrapper.appendChild(title);
  titleWrapper.appendChild(subtitle);

  if (isDemo) {
    const demoBadge = createElement('span', 'virtual-tour-modal__demo-badge', t('modals.demoTour'));
    titleWrapper.appendChild(demoBadge);
  }

  header.appendChild(titleWrapper);

  // Action buttons
  const actions = createElement('div', 'virtual-tour-modal__actions');

  // Fullscreen button
  const fullscreenBtn = createElement('button', 'virtual-tour-modal__action-btn');
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
  const closeBtn = createElement('button', 'virtual-tour-modal__close-btn');
  closeBtn.setAttribute('aria-label', t('modals.closeVirtualTour'));
  closeBtn.appendChild(createCloseIcon());
  actions.appendChild(closeBtn);

  header.appendChild(actions);
  modal.appendChild(header);

  // Create iframe container
  const iframeContainer = createElement('div', 'virtual-tour-modal__iframe-container');

  // Loading spinner
  const loader = createElement('div', 'virtual-tour-modal__loader');
  const spinner = createElement('div', 'virtual-tour-modal__spinner');
  const loadingText = createElement('span', 'virtual-tour-modal__loading-text', t('modals.loading3DTour'));
  loader.appendChild(spinner);
  loader.appendChild(loadingText);
  iframeContainer.appendChild(loader);

  // Create iframe
  const iframe = createElement('iframe', 'virtual-tour-modal__iframe');
  iframe.src = tourUrl;
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'xr-spatial-tracking; gyroscope; accelerometer');
  iframe.setAttribute('loading', 'lazy');

  iframe.addEventListener('load', () => {
    loader.classList.add('hidden');
    iframe.classList.add('loaded');
  });

  iframeContainer.appendChild(iframe);
  modal.appendChild(iframeContainer);

  // Instructions
  const instructions = createElement('div', 'virtual-tour-modal__instructions');
  const instructionText = createElement('p', undefined, t('modals.virtualTourInstructions'));
  instructions.appendChild(instructionText);
  modal.appendChild(instructions);

  overlay.appendChild(modal);

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
export function injectVirtualTourStyles(): void {
  if (document.getElementById('virtual-tour-modal-styles')) return;

  const styles = document.createElement('style');
  styles.id = 'virtual-tour-modal-styles';
  styles.textContent = `
    .virtual-tour-modal {
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

    .virtual-tour-modal.active {
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
      opacity: 1;
    }

    .virtual-tour-modal.closing {
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
      opacity: 0;
    }

    .virtual-tour-modal__container {
      position: relative;
      width: 100%;
      max-width: 1400px;
      height: 90vh;
      max-height: 900px;
      background: var(--c-surface);
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transform: scale(0.95) translateY(20px);
      transition: transform 0.3s var(--ease-out);
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
    }

    .virtual-tour-modal.active .virtual-tour-modal__container {
      transform: scale(1) translateY(0);
    }

    .virtual-tour-modal.closing .virtual-tour-modal__container {
      transform: scale(0.95) translateY(20px);
    }

    .virtual-tour-modal__container.fullscreen {
      max-width: 100%;
      max-height: 100%;
      height: 100%;
      border-radius: 0;
    }

    .virtual-tour-modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-4) var(--space-6);
      background: var(--c-surface-2);
      border-bottom: 1px solid var(--c-glass-border);
    }

    .virtual-tour-modal__title-wrapper {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      flex-wrap: wrap;
    }

    .virtual-tour-modal__title {
      font-family: var(--font-serif);
      font-size: var(--text-xl);
      color: var(--c-text);
      margin: 0;
    }

    .virtual-tour-modal__subtitle {
      font-size: var(--text-sm);
      color: var(--c-text-2);
    }

    .virtual-tour-modal__demo-badge {
      padding: var(--space-1) var(--space-3);
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--c-bg);
      background: var(--c-gold);
      border-radius: var(--radius-sm);
    }

    .virtual-tour-modal__actions {
      display: flex;
      gap: var(--space-2);
    }

    .virtual-tour-modal__action-btn,
    .virtual-tour-modal__close-btn {
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

    .virtual-tour-modal__action-btn:hover,
    .virtual-tour-modal__close-btn:hover {
      background: var(--c-gold);
      color: var(--c-bg);
      transform: scale(1.05);
    }

    .virtual-tour-modal__action-btn svg,
    .virtual-tour-modal__close-btn svg {
      width: 20px;
      height: 20px;
    }

    .virtual-tour-modal__iframe-container {
      flex: 1;
      position: relative;
      background: var(--c-bg);
    }

    .virtual-tour-modal__loader {
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

    .virtual-tour-modal__loader.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .virtual-tour-modal__spinner {
      width: 48px;
      height: 48px;
      border: 3px solid var(--c-surface-3);
      border-top-color: var(--c-gold);
      border-radius: 50%;
      animation: vtm-spin 1s linear infinite;
    }

    @keyframes vtm-spin {
      to { transform: rotate(360deg); }
    }

    .virtual-tour-modal__loading-text {
      font-size: var(--text-sm);
      color: var(--c-text-2);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .virtual-tour-modal__iframe {
      width: 100%;
      height: 100%;
      border: none;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .virtual-tour-modal__iframe.loaded {
      opacity: 1;
    }

    .virtual-tour-modal__instructions {
      padding: var(--space-3) var(--space-6);
      background: var(--c-surface-2);
      border-top: 1px solid var(--c-glass-border);
      text-align: center;
    }

    .virtual-tour-modal__instructions p {
      font-size: var(--text-sm);
      color: var(--c-text-3);
      margin: 0;
    }

    @media (max-width: 768px) {
      .virtual-tour-modal {
        padding: 0;
      }

      .virtual-tour-modal__container {
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }

      .virtual-tour-modal__header {
        padding: var(--space-3) var(--space-4);
      }

      .virtual-tour-modal__title-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-1);
      }

      .virtual-tour-modal__instructions {
        padding: var(--space-2) var(--space-4);
      }
    }
  `;
  document.head.appendChild(styles);
}
