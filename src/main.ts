// ═══════════════════════════════════════════════════════════════════════════
// Real House - Main Entry Point
// Optimized for Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1, INP < 200ms)
// ═══════════════════════════════════════════════════════════════════════════

// Import styles
import './styles/main.scss';

// Import app
import { App } from './app';

// Import i18n
import { initI18n, getCurrentLanguage, updateDocumentLanguage } from './i18n';

// Import performance modules
import {
  initWebVitals,
  reportOnPageHide,
  initLazyLoading,
  observeImages,
  initResourceHints,
  prefetchVisibleLinks,
  prefetchLikelyNextPages,
  preconnectToCDN,
  injectImageStyles,
  initFontLoading,
  observeImageLoading,
  loadAnalytics,
  deferExecution,
  initINPOptimizations
} from './performance';

// Import mobile-specific SEO schemas
import { initMobileSchemas } from './seo/mobile-schema';

// Initialize critical performance optimizations immediately (before anything else)
// 0. Initialize language/RTL direction early to prevent layout shift
const currentLang = getCurrentLanguage();
updateDocumentLanguage(currentLang);

// 1. Add fonts-loading class for FOUT prevention
document.documentElement.classList.add('fonts-loading');

// 2. Inject image styles to prevent CLS
injectImageStyles();

// 3. Preconnect to critical origins for faster LCP
const criticalOrigins = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://images.unsplash.com'
];
criticalOrigins.forEach(origin => preconnectToCDN(origin));

// 4. Initialize font loading (async, non-blocking)
initFontLoading().then(() => {
  document.documentElement.classList.remove('fonts-loading');
  document.documentElement.classList.add('fonts-loaded');
}).catch(() => {
  // Font loading failed, system fonts will be used
  document.documentElement.classList.remove('fonts-loading');
});

// Use requestIdleCallback for non-critical initialization
const scheduleIdleTask = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));

// ─── Service Worker Registration for PWA ─────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('[PWA] Service Worker registered:', registration.scope);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] New version available');
              showUpdateNotification();
            }
          });
        }
      });
    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error);
    }
  });
}

// ─── PWA Update Notification ─────────────────────────────────────────────────
function showUpdateNotification(): void {
  const notification = document.createElement('div');
  notification.className = 'pwa-update-notification';

  const text = document.createElement('p');
  text.textContent = 'A new version is available!';

  const updateBtn = document.createElement('button');
  updateBtn.textContent = 'Update Now';
  updateBtn.addEventListener('click', () => window.location.reload());

  const laterBtn = document.createElement('button');
  laterBtn.textContent = 'Later';
  laterBtn.addEventListener('click', () => notification.remove());

  notification.appendChild(text);
  notification.appendChild(updateBtn);
  notification.appendChild(laterBtn);

  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--c-surface, #12121A);
    border: 1px solid var(--c-gold, #C9A84C);
    border-radius: 12px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 10000;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    color: var(--c-text, #F0EDE8);
  `;
  document.body.appendChild(notification);
}

// ─── PWA Install Prompt ──────────────────────────────────────────────────────
let deferredPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

window.addEventListener('beforeinstallprompt', (e: Event) => {
  e.preventDefault();
  deferredPrompt = e as BeforeInstallPromptEvent;
  console.log('[PWA] Install prompt available');
});

// Export for use in app if needed
(window as unknown as { showInstallPrompt: () => Promise<void> }).showInstallPrompt = async () => {
  if (!deferredPrompt) {
    console.log('[PWA] Install prompt not available');
    return;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('[PWA] Install prompt outcome:', outcome);
  deferredPrompt = null;
};

// Initialize Core Web Vitals tracking
scheduleIdleTask(() => {
  initWebVitals();
  reportOnPageHide();
});

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize i18n (language selector and hreflang tags)
  initI18n();

  const app = new App();
  app.init();

  // Initialize lazy loading after app init
  scheduleIdleTask(() => {
    initLazyLoading();
    initResourceHints();
  });

  // Initialize INP optimizations for better interactivity
  scheduleIdleTask(() => {
    initINPOptimizations();
  });

  // Initialize mobile-specific SEO schemas
  scheduleIdleTask(() => {
    initMobileSchemas();
  });
});

// Prefetch visible links and likely next pages after page is fully loaded
window.addEventListener('load', () => {
  scheduleIdleTask(() => {
    prefetchVisibleLinks();
    prefetchLikelyNextPages(window.location.pathname);

    // Observe images for loading performance
    observeImageLoading();
  });

  // Load analytics asynchronously (non-blocking, low priority)
  deferExecution(() => {
    // Uncomment and add your analytics IDs when ready
    // loadAnalytics({
    //   googleAnalyticsId: 'G-XXXXXXXXXX',
    //   googleTagManagerId: 'GTM-XXXXXXX'
    // });
  }, 3000); // Delay analytics by 3 seconds to prioritize user experience
});

// Re-observe images after route changes (for SPA navigation)
// This is called by the app after dynamic content is loaded
export function observeDynamicContent(container?: Element): void {
  observeImages(container);
  observeImageLoading(container);
}

// Export performance utilities for debugging in browser console
// Usage: window.__webVitals.getMetrics() or window.__webVitals.getScore()
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__webVitals = {
    getMetrics: () => import('./performance/web-vitals').then(m => m.getMetrics()),
    getScore: () => import('./performance/web-vitals').then(m => m.getPerformanceScore())
  };
}
