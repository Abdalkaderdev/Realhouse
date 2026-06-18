// ═══════════════════════════════════════════════════════════════════════════
// Microinteractions Bootstrapper
// Wires up CTA pulse, image fade-in, copy handlers, and idle-time effects.
// ═══════════════════════════════════════════════════════════════════════════

import { initCopyHandlers } from './toast';

let interacted = false;

function markInteraction(): void {
  if (interacted) return;
  interacted = true;
  document.querySelectorAll('.cta-pulse--active').forEach((el) => {
    el.classList.remove('cta-pulse--active');
  });
}

/**
 * Add a subtle pulse to any element with `data-cta-pulse` after the page
 * has been idle for a short while and the user has not yet interacted.
 * The pulse stops on first user interaction (click, keydown, scroll).
 */
export function initCTAPulse(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-cta-pulse], .cta-pulse');
  if (!targets.length) return;

  // Stop pulse on any meaningful interaction
  const stopEvents = ['click', 'keydown', 'pointerdown', 'wheel', 'touchstart'];
  stopEvents.forEach((ev) =>
    window.addEventListener(ev, markInteraction, { once: true, passive: true })
  );

  // Activate pulse only after ~3.5s of idle time
  window.setTimeout(() => {
    if (interacted) return;
    targets.forEach((el) => el.classList.add('cta-pulse--active'));
  }, 3500);
}

/**
 * Fade-in helper for images marked with `data-fade-in`. Adds `is-loaded`
 * once the image has decoded.
 */
export function initImageFadeIn(root: ParentNode = document): void {
  root.querySelectorAll<HTMLImageElement>('img[data-fade-in]').forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('is-loaded');
      return;
    }
    img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
    img.addEventListener('error', () => img.classList.add('is-loaded'), { once: true });
  });
}

/**
 * Initialise all microinteractions.
 */
export function initMicrointeractions(): void {
  initCopyHandlers();
  initCTAPulse();
  initImageFadeIn();
}
