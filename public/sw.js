// =============================================================================
// Real House Service Worker for PWA Support
// Mobile-First Indexing Optimized
// Version: 2.0.0
// =============================================================================

const CACHE_VERSION = 'v2';
const STATIC_CACHE = `realhouse-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `realhouse-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `realhouse-images-${CACHE_VERSION}`;
const API_CACHE = `realhouse-api-${CACHE_VERSION}`;

// Cache limits
const DYNAMIC_CACHE_LIMIT = 50;
const IMAGE_CACHE_LIMIT = 100;

// Static assets to cache immediately (mobile-first priority)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/favicon.ico',
  '/logo.svg',
  '/offline.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Routes that should work offline
const OFFLINE_ROUTES = [
  '/',
  '/properties',
  '/projects',
  '/about',
  '/contact',
  '/favorites'
];

// =============================================================================
// INSTALL EVENT - Cache static assets
// =============================================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker v2.0.0');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );

  // Activate immediately without waiting
  self.skipWaiting();
});

// =============================================================================
// ACTIVATE EVENT - Clean up old caches
// =============================================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');

  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => {
              // Remove old version caches
              return key.startsWith('realhouse-') &&
                     !key.includes(CACHE_VERSION);
            })
            .map((key) => {
              console.log('[SW] Removing old cache:', key);
              return caches.delete(key);
            })
        );
      })
      .then(() => {
        console.log('[SW] Cache cleanup complete');
      })
  );

  // Take control of all pages immediately
  self.clients.claim();
});

// =============================================================================
// FETCH EVENT - Serve from cache, fallback to network
// =============================================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  // Skip cross-origin requests (except images)
  if (url.origin !== location.origin && request.destination !== 'image') {
    return;
  }

  // Handle different request types with appropriate strategies
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (request.destination === 'document') {
    event.respondWith(handleDocumentRequest(request));
  } else if (request.destination === 'script' ||
             request.destination === 'style' ||
             request.destination === 'font') {
    event.respondWith(handleStaticRequest(request));
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
  } else {
    event.respondWith(handleDynamicRequest(request));
  }
});

// =============================================================================
// CACHING STRATEGIES
// =============================================================================

/**
 * Handle image requests with cache-first strategy and long expiry
 */
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Refresh cache in background
    refreshCache(request, IMAGE_CACHE);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Clone and cache
      const responseToCache = networkResponse.clone();
      cache.put(request, responseToCache);

      // Limit cache size
      limitCacheSize(IMAGE_CACHE, IMAGE_CACHE_LIMIT);
    }
    return networkResponse;
  } catch (error) {
    // Return placeholder for failed images
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#1a1a2e" width="400" height="300"/><text fill="#666" font-family="sans-serif" font-size="14" x="50%" y="50%" text-anchor="middle">Image unavailable</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

/**
 * Handle document requests with network-first strategy
 */
async function handleDocumentRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for navigation requests
    const offlinePage = await caches.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }

    return new Response('Offline', { status: 503 });
  }
}

/**
 * Handle static assets with cache-first strategy
 */
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    refreshCache(request, STATIC_CACHE);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Resource unavailable', { status: 503 });
  }
}

/**
 * Handle API requests with network-first, cache fallback
 */
async function handleApiRequest(request) {
  const cache = await caches.open(API_CACHE);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      // Add header to indicate cached response
      const headers = new Headers(cachedResponse.headers);
      headers.set('X-Cache', 'HIT');
      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        headers: headers
      });
    }
    return new Response(
      JSON.stringify({ error: 'Offline', cached: false }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Handle dynamic requests with stale-while-revalidate
 */
async function handleDynamicRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
        limitCacheSize(DYNAMIC_CACHE, DYNAMIC_CACHE_LIMIT);
      }
      return networkResponse;
    })
    .catch(() => cachedResponse || caches.match('/offline.html'));

  return cachedResponse || fetchPromise;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Refresh cache in background
 */
function refreshCache(request, cacheName) {
  fetch(request)
    .then((response) => {
      if (response.ok) {
        caches.open(cacheName).then((cache) => {
          cache.put(request, response);
        });
      }
    })
    .catch(() => {});
}

/**
 * Limit cache size by removing oldest entries
 */
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > maxItems) {
    const deleteCount = keys.length - maxItems;
    for (let i = 0; i < deleteCount; i++) {
      await cache.delete(keys[i]);
    }
  }
}

// =============================================================================
// PUSH NOTIFICATIONS
// =============================================================================
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};

  const title = data.title || 'Real House';
  const options = {
    body: data.body || 'New property alert!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image || undefined,
    vibrate: [100, 50, 100],
    tag: data.tag || 'realhouse-notification',
    renotify: true,
    requireInteraction: data.requireInteraction || false,
    data: {
      url: data.url || '/',
      propertyId: data.propertyId || null
    },
    actions: [
      {
        action: 'view',
        title: 'View Property',
        icon: '/icons/action-view.png'
      },
      {
        action: 'close',
        title: 'Dismiss',
        icon: '/icons/action-close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// =============================================================================
// NOTIFICATION CLICKS
// =============================================================================
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view' || !event.action) {
    const url = event.notification.data?.url || '/';

    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          // Check if already open
          for (const client of clientList) {
            if (client.url === url && 'focus' in client) {
              return client.focus();
            }
          }
          // Open new window
          return clients.openWindow(url);
        })
    );
  }
});

// =============================================================================
// BACKGROUND SYNC
// =============================================================================
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }

  if (event.tag === 'sync-form-data') {
    event.waitUntil(syncFormData());
  }
});

async function syncFavorites() {
  try {
    const db = await openDB();
    const favorites = await getStoredFavorites(db);

    if (favorites.length > 0) {
      // Sync to server when online
      console.log('[SW] Syncing', favorites.length, 'favorites');
    }
  } catch (error) {
    console.error('[SW] Favorites sync failed:', error);
  }
}

async function syncFormData() {
  try {
    console.log('[SW] Syncing stored form data');
    // Implementation for form data sync
  } catch (error) {
    console.error('[SW] Form sync failed:', error);
  }
}

// =============================================================================
// PERIODIC BACKGROUND SYNC (for property updates)
// =============================================================================
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-properties') {
    event.waitUntil(updatePropertyCache());
  }
});

async function updatePropertyCache() {
  try {
    const response = await fetch('/api/properties/latest');
    if (response.ok) {
      const cache = await caches.open(API_CACHE);
      await cache.put('/api/properties/latest', response);
      console.log('[SW] Property cache updated');
    }
  } catch (error) {
    console.log('[SW] Periodic sync failed:', error);
  }
}

// =============================================================================
// MESSAGE HANDLING
// =============================================================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls;
    caches.open(DYNAMIC_CACHE).then((cache) => {
      cache.addAll(urls);
    });
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
  }
});

// =============================================================================
// INDEXED DB HELPERS (for offline data)
// =============================================================================
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('RealHouseDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('favorites')) {
        db.createObjectStore('favorites', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('formData')) {
        db.createObjectStore('formData', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

function getStoredFavorites(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['favorites'], 'readonly');
    const store = transaction.objectStore('favorites');
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

// Log service worker version
console.log('[SW] Real House Service Worker v2.0.0 loaded');
