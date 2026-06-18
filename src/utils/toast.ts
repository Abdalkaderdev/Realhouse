// ═══════════════════════════════════════════════════════════════════════════
// Toast Notification System
// Reusable, accessible, stackable toast notifications with auto-dismiss
// ═══════════════════════════════════════════════════════════════════════════

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  type?: ToastType;
  duration?: number;       // ms; 0 = sticky
  title?: string;
  description?: string;
  /** Optional override for the message; if omitted, description is used */
  message?: string;
}

const DEFAULT_DURATION = 3500;
const STACK_ID = 'rh-toast-stack';

/**
 * Ensure the toast stack container exists in the DOM and return it.
 */
function ensureStack(): HTMLElement {
  let stack = document.getElementById(STACK_ID);
  if (!stack) {
    stack = document.createElement('div');
    stack.id = STACK_ID;
    stack.className = 'toast-stack';
    stack.setAttribute('role', 'region');
    stack.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(stack);
  }
  return stack;
}

/**
 * Build an SVG icon for a toast type. Returns an inline SVG element.
 */
function buildIcon(type: ToastType): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');

  const make = (tag: string, attrs: Record<string, string>) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  };

  if (type === 'success') {
    svg.appendChild(make('polyline', { points: '20 6 9 17 4 12' }));
  } else if (type === 'error') {
    svg.appendChild(make('line', { x1: '18', y1: '6', x2: '6', y2: '18' }));
    svg.appendChild(make('line', { x1: '6', y1: '6', x2: '18', y2: '18' }));
  } else if (type === 'warning') {
    svg.appendChild(
      make('path', { d: 'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' })
    );
    svg.appendChild(make('line', { x1: '12', y1: '9', x2: '12', y2: '13' }));
    svg.appendChild(make('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' }));
  } else {
    // info
    svg.appendChild(make('circle', { cx: '12', cy: '12', r: '10' }));
    svg.appendChild(make('line', { x1: '12', y1: '16', x2: '12', y2: '12' }));
    svg.appendChild(make('line', { x1: '12', y1: '8', x2: '12.01', y2: '8' }));
  }
  return svg;
}

/**
 * Show a toast. Returns the toast element so callers can dismiss it manually.
 */
export function showToast(options: ToastOptions | string): HTMLElement {
  const opts: ToastOptions = typeof options === 'string' ? { message: options } : options;
  const type: ToastType = opts.type || 'info';
  const duration = opts.duration ?? DEFAULT_DURATION;
  const message = opts.message ?? opts.description ?? '';

  const stack = ensureStack();
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  toast.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');

  // Icon
  const iconWrap = document.createElement('span');
  iconWrap.className = 'toast__icon';
  iconWrap.appendChild(buildIcon(type));
  toast.appendChild(iconWrap);

  // Body
  const body = document.createElement('div');
  body.className = 'toast__body';
  if (opts.title) {
    const title = document.createElement('div');
    title.className = 'toast__title';
    title.textContent = opts.title;
    body.appendChild(title);
  }
  if (message) {
    const msg = document.createElement('div');
    msg.className = 'toast__message';
    msg.textContent = message;
    body.appendChild(msg);
  }
  toast.appendChild(body);

  // Close button
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'toast__close';
  close.setAttribute('aria-label', 'Dismiss notification');
  close.innerHTML = '&times;';
  close.addEventListener('click', () => dismissToast(toast));
  toast.appendChild(close);

  // Progress bar
  if (duration > 0) {
    const progress = document.createElement('div');
    progress.className = 'toast__progress';
    progress.style.animationDuration = `${duration}ms`;
    toast.appendChild(progress);
  }

  stack.appendChild(toast);

  // Trigger enter animation on next frame
  requestAnimationFrame(() => toast.classList.add('toast--visible'));

  // Auto dismiss
  if (duration > 0) {
    window.setTimeout(() => dismissToast(toast), duration);
  }

  return toast;
}

/**
 * Dismiss a toast with exit animation.
 */
export function dismissToast(toast: HTMLElement): void {
  if (!toast.isConnected) return;
  toast.classList.remove('toast--visible');
  toast.classList.add('toast--exiting');
  window.setTimeout(() => {
    toast.remove();
  }, 260);
}

// ─── Convenience helpers ─────────────────────────────────────────────────
export const toast = {
  success: (msg: string, opts: Partial<ToastOptions> = {}) =>
    showToast({ ...opts, type: 'success', message: msg }),
  error: (msg: string, opts: Partial<ToastOptions> = {}) =>
    showToast({ ...opts, type: 'error', message: msg }),
  info: (msg: string, opts: Partial<ToastOptions> = {}) =>
    showToast({ ...opts, type: 'info', message: msg }),
  warning: (msg: string, opts: Partial<ToastOptions> = {}) =>
    showToast({ ...opts, type: 'warning', message: msg }),
};

// ═══════════════════════════════════════════════════════════════════════════
// Copy-to-clipboard helper with toast feedback
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Copy text to clipboard and show a "Copied!" toast.
 * Falls back to legacy execCommand if navigator.clipboard is unavailable.
 */
export async function copyToClipboard(
  text: string,
  successMessage: string = 'Copied to clipboard'
): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    toast.success(successMessage);
    return true;
  } catch (err) {
    console.error('copyToClipboard failed:', err);
    toast.error('Could not copy to clipboard');
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Auto-wire: any element with [data-copy] attribute copies its value on click
// Usage: <button data-copy="+964 750 123 4567">+964 750 123 4567</button>
// ═══════════════════════════════════════════════════════════════════════════

export function initCopyHandlers(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-copy]').forEach((el) => {
    if (el.dataset.copyBound === '1') return;
    el.dataset.copyBound = '1';
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const value = el.getAttribute('data-copy') || el.textContent || '';
      const label = el.getAttribute('data-copy-label') || 'Copied!';
      copyToClipboard(value, label);
    });
  });
}
