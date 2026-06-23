// ═══════════════════════════════════════════════════════════════════════════
// Property Map Component - Leaflet.js Integration with Marker Clustering
// ═══════════════════════════════════════════════════════════════════════════
//
// Features:
//   • Custom polished gold pin markers (house icon, pulse on active)
//   • Clustered markers with custom gold cluster styling + pulse
//   • Rich popup preview (image, title, price, beds/baths/sqm, CTA)
//   • Click = preview popup; double-click = navigate to detail
//   • Satellite / Dark toggle (top-right)
//   • Layer controls panel (Properties / Projects / Locations)
//   • My Location button (geolocation API, graceful fallback)
//   • Fit-bounds button (zoom to all visible properties)
//   • Smooth marker transitions on filter changes
//   • Loading skeleton + recoverable error state
//   • Mobile-friendly: tap to preview, swipe-down on bottom-sheet to dismiss

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { properties, getDisplayPrice, type Property } from '../data/properties';
import { t } from '../i18n';
import { createErrorState, createSkeletonMap } from '../utils/ui-states';

// Erbil city center coordinates (used for centering map on Erbil, Kurdistan)
const ERBIL_CENTER: [number, number] = [36.191113, 44.009167];
const DEFAULT_ZOOM = 13;

// View mode type for the properties page
export type ViewMode = 'grid' | 'list' | 'map';

// LocalStorage keys
const VIEW_PREFERENCE_KEY = 'realhouse-properties-view';
const BASEMAP_PREFERENCE_KEY = 'realhouse-properties-basemap';

// Tile layer presets
const DARK_TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const SATELLITE_TILE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const DARK_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const SATELLITE_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics';

type BasemapId = 'dark' | 'satellite';

// ─── SVG helpers ──────────────────────────────────────────────────────────

const HOUSE_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0F" stroke-width="2.2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5h-4.5v-6h-6v6H4.5A1.5 1.5 0 0 1 3 20z" fill="#0A0A0F" fill-opacity="0.0"/>
    <path d="M3 10.5L12 3l9 7.5"/>
    <path d="M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10"/>
  </svg>
`;

// ─── Marker icons ─────────────────────────────────────────────────────────

function createCustomIcon(isActive = false): L.DivIcon {
  const size = isActive ? 44 : 36;
  return L.divIcon({
    className: 'property-marker',
    html: `
      <div class="property-marker__pin ${isActive ? 'property-marker__pin--active' : ''}"
           style="width:${size}px;height:${size}px;">
        <span class="property-marker__pulse" aria-hidden="true"></span>
        <span class="property-marker__body">
          <span class="property-marker__icon">${HOUSE_SVG}</span>
        </span>
      </div>
    `,
    iconSize: [size, size + 6],
    iconAnchor: [size / 2, size + 4],
    popupAnchor: [0, -(size - 4)]
  });
}

// ─── Popup content ────────────────────────────────────────────────────────

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default: return '&#39;';
    }
  });
}

function createPopupContent(property: Property): string {
  const price = getDisplayPrice(property);
  const specs = property.specs;
  const bedsText = t('map.bedsShort');
  const bathsText = t('map.bathsShort');
  const viewText = t('map.viewProperty');
  const inText = t('map.propertyIn');
  const altText = `${property.type} - ${property.title} ${inText} ${property.location.district}, ${property.location.city}`;

  return `
    <article class="property-popup" role="dialog" aria-label="${escapeHtml(property.title)}">
      <div class="property-popup__image">
        <img src="${escapeHtml(property.images[0] || '')}"
             alt="${escapeHtml(altText)}"
             loading="lazy"
             width="280" height="160" />
        <span class="property-popup__type">${escapeHtml(property.type)}</span>
        <span class="property-popup__price-chip">${escapeHtml(price)}</span>
      </div>
      <div class="property-popup__content">
        <h3 class="property-popup__title">${escapeHtml(property.title)}</h3>
        <p class="property-popup__location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13z"/>
            <circle cx="12" cy="9" r="3"/>
          </svg>
          ${escapeHtml(property.location.district)}, ${escapeHtml(property.location.city)}
        </p>
        <ul class="property-popup__specs" aria-label="Specifications">
          ${specs.beds > 0 ? `<li><strong>${specs.beds}</strong> ${escapeHtml(bedsText)}</li>` : ''}
          ${specs.baths > 0 ? `<li><strong>${specs.baths}</strong> ${escapeHtml(bathsText)}</li>` : ''}
          <li><strong>${specs.sqm}</strong> m²</li>
        </ul>
        <div class="property-popup__footer">
          <a href="/properties/${escapeHtml(property.id)}"
             class="property-popup__btn"
             data-route
             aria-label="${escapeHtml(viewText)} ${escapeHtml(property.title)}">
            ${escapeHtml(viewText)}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}

// ─── View preference persistence ──────────────────────────────────────────

export function getSavedViewPreference(): ViewMode {
  try {
    const saved = localStorage.getItem(VIEW_PREFERENCE_KEY);
    if (saved === 'grid' || saved === 'list' || saved === 'map') return saved;
  } catch {}
  return 'grid';
}

export function saveViewPreference(view: ViewMode): void {
  try { localStorage.setItem(VIEW_PREFERENCE_KEY, view); } catch {}
}

function getSavedBasemap(): BasemapId {
  try {
    const saved = localStorage.getItem(BASEMAP_PREFERENCE_KEY);
    if (saved === 'dark' || saved === 'satellite') return saved;
  } catch {}
  return 'dark';
}

function saveBasemap(id: BasemapId): void {
  try { localStorage.setItem(BASEMAP_PREFERENCE_KEY, id); } catch {}
}

// ─── Module state ─────────────────────────────────────────────────────────

let markerClusterGroup: L.MarkerClusterGroup | null = null;
let activeBasemapLayer: L.TileLayer | null = null;
let activeBasemap: BasemapId = 'dark';

// Layer visibility state — kept for UI but Projects/Locations layers are
// optional and remain empty until data is wired up.
const layerState = {
  properties: true,
  projects: false,
  locations: false
};

// ─── UI overlay builders ──────────────────────────────────────────────────

function buildClusterIcon(cluster: L.MarkerCluster): L.DivIcon {
  const count = cluster.getChildCount();
  let size: 'small' | 'medium' | 'large' = 'small';
  let diameter = 44;
  if (count >= 10) { size = 'medium'; diameter = 54; }
  if (count >= 25) { size = 'large'; diameter = 64; }
  return L.divIcon({
    html: `
      <div class="property-cluster property-cluster--${size}" aria-label="${count} properties">
        <span class="property-cluster__pulse" aria-hidden="true"></span>
        <span class="property-cluster__count">${count}</span>
      </div>
    `,
    className: 'property-cluster-icon',
    iconSize: L.point(diameter, diameter)
  });
}

function createClusterGroup(): L.MarkerClusterGroup {
  return L.markerClusterGroup({
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: true,
    maxClusterRadius: 60,
    animate: true,
    animateAddingMarkers: true,
    iconCreateFunction: buildClusterIcon
  });
}

function makeControlButton(opts: {
  label: string;
  svg: string;
  modifier?: string;
  onClick: (btn: HTMLButtonElement) => void;
}): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `property-map__ctrl-btn${opts.modifier ? ' ' + opts.modifier : ''}`;
  btn.setAttribute('aria-label', opts.label);
  btn.title = opts.label;
  btn.innerHTML = opts.svg;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    opts.onClick(btn);
  });
  return btn;
}

const ICON_SATELLITE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>`;
const ICON_MAP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><path d="M8 2v16"/><path d="M16 6v16"/></svg>`;
const ICON_LOCATION = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/></svg>`;
const ICON_FIT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V5a1 1 0 0 1 1-1h4"/><path d="M20 9V5a1 1 0 0 0-1-1h-4"/><path d="M4 15v4a1 1 0 0 0 1 1h4"/><path d="M20 15v4a1 1 0 0 1-1 1h-4"/></svg>`;
const ICON_LAYERS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`;
const ICON_CLOSE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>`;

// Build the top-right control stack overlay
function buildControlOverlay(
  map: L.Map,
  container: HTMLElement,
  switchBasemap: (id: BasemapId) => void,
  fitBounds: () => void,
  locateUser: () => void
): HTMLElement {
  const overlay = document.createElement('div');
  overlay.className = 'property-map__controls';
  overlay.setAttribute('role', 'toolbar');
  overlay.setAttribute('aria-label', 'Map controls');

  // Basemap toggle
  const basemapBtn = makeControlButton({
    label: activeBasemap === 'dark' ? 'Switch to satellite view' : 'Switch to map view',
    svg: activeBasemap === 'dark' ? ICON_SATELLITE : ICON_MAP,
    onClick: (btn) => {
      const next: BasemapId = activeBasemap === 'dark' ? 'satellite' : 'dark';
      switchBasemap(next);
      btn.innerHTML = next === 'dark' ? ICON_SATELLITE : ICON_MAP;
      const lbl = next === 'dark' ? 'Switch to satellite view' : 'Switch to map view';
      btn.setAttribute('aria-label', lbl);
      btn.title = lbl;
    }
  });

  // Fit-bounds
  const fitBtn = makeControlButton({
    label: 'Fit all properties in view',
    svg: ICON_FIT,
    onClick: fitBounds
  });

  // My location
  const locateBtn = makeControlButton({
    label: 'Center map on my location',
    svg: ICON_LOCATION,
    onClick: locateUser
  });

  // Layers toggle
  const layersBtn = makeControlButton({
    label: 'Show map layers',
    svg: ICON_LAYERS,
    modifier: 'property-map__ctrl-btn--layers',
    onClick: () => {
      const panel = container.querySelector('.property-map__layers');
      if (panel) panel.classList.toggle('property-map__layers--open');
    }
  });

  overlay.append(basemapBtn, fitBtn, locateBtn, layersBtn);

  // Stop map drag/zoom when interacting with overlay
  L.DomEvent.disableClickPropagation(overlay);
  L.DomEvent.disableScrollPropagation(overlay);

  return overlay;
}

// Build the layers panel (initially closed)
function buildLayersPanel(onToggle: (key: keyof typeof layerState, value: boolean) => void): HTMLElement {
  const panel = document.createElement('div');
  panel.className = 'property-map__layers';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Map layers');

  panel.innerHTML = `
    <div class="property-map__layers-header">
      <h4 class="property-map__layers-title">Layers</h4>
      <button type="button" class="property-map__layers-close" aria-label="Close layers panel">${ICON_CLOSE}</button>
    </div>
    <ul class="property-map__layers-list">
      <li class="property-map__layer">
        <label>
          <input type="checkbox" data-layer="properties" ${layerState.properties ? 'checked' : ''} />
          <span class="property-map__layer-dot property-map__layer-dot--properties"></span>
          <span class="property-map__layer-label">Properties</span>
        </label>
      </li>
      <li class="property-map__layer">
        <label>
          <input type="checkbox" data-layer="projects" ${layerState.projects ? 'checked' : ''} />
          <span class="property-map__layer-dot property-map__layer-dot--projects"></span>
          <span class="property-map__layer-label">Projects</span>
        </label>
      </li>
      <li class="property-map__layer">
        <label>
          <input type="checkbox" data-layer="locations" ${layerState.locations ? 'checked' : ''} />
          <span class="property-map__layer-dot property-map__layer-dot--locations"></span>
          <span class="property-map__layer-label">Locations of interest</span>
        </label>
      </li>
    </ul>
  `;

  panel.querySelector('.property-map__layers-close')?.addEventListener('click', () => {
    panel.classList.remove('property-map__layers--open');
  });

  panel.querySelectorAll<HTMLInputElement>('input[data-layer]').forEach(input => {
    input.addEventListener('change', () => {
      const key = input.dataset.layer as keyof typeof layerState;
      layerState[key] = input.checked;
      onToggle(key, input.checked);
    });
  });

  L.DomEvent.disableClickPropagation(panel);
  L.DomEvent.disableScrollPropagation(panel);

  return panel;
}

// User location pulse marker
function createUserLocationMarker(lat: number, lng: number): L.Marker {
  return L.marker([lat, lng], {
    icon: L.divIcon({
      className: 'property-map__user-marker',
      html: `<span class="property-map__user-dot"></span><span class="property-map__user-ring"></span>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    }),
    interactive: false,
    keyboard: false
  });
}

// ─── Geolocation ──────────────────────────────────────────────────────────

function locateUserOn(map: L.Map, container: HTMLElement, userMarkerRef: { marker: L.Marker | null }): void {
  if (!('geolocation' in navigator)) {
    flashToast(container, 'Geolocation is not supported by your browser');
    return;
  }
  const btn = container.querySelector<HTMLButtonElement>('.property-map__ctrl-btn[aria-label*="my location"]');
  if (btn) btn.classList.add('property-map__ctrl-btn--loading');

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      if (userMarkerRef.marker) {
        try { map.removeLayer(userMarkerRef.marker); } catch {}
      }
      userMarkerRef.marker = createUserLocationMarker(latitude, longitude).addTo(map);
      map.flyTo([latitude, longitude], 14, { duration: 0.8 });
      if (btn) btn.classList.remove('property-map__ctrl-btn--loading');
    },
    (err) => {
      if (btn) btn.classList.remove('property-map__ctrl-btn--loading');
      const msg = err.code === err.PERMISSION_DENIED
        ? 'Location access denied. Enable it in your browser settings to use this.'
        : 'Could not determine your location. Please try again.';
      flashToast(container, msg);
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
  );
}

function flashToast(container: HTMLElement, message: string): void {
  const existing = container.querySelector('.property-map__toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'property-map__toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('property-map__toast--visible'));
  window.setTimeout(() => {
    toast.classList.remove('property-map__toast--visible');
    window.setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// ─── Bottom-sheet preview (mobile) ────────────────────────────────────────
//
// On small screens we render a swipe-to-dismiss bottom sheet instead of
// Leaflet's built-in popup so the preview is more native-feeling. Desktop
// retains the centered popup.

function isMobileViewport(): boolean {
  return window.matchMedia('(max-width: 640px)').matches;
}

let currentSheet: HTMLElement | null = null;

function showBottomSheet(container: HTMLElement, property: Property): void {
  dismissBottomSheet();
  const sheet = document.createElement('div');
  sheet.className = 'property-map__sheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'false');
  sheet.setAttribute('aria-label', property.title);
  sheet.innerHTML = `
    <div class="property-map__sheet-handle" aria-hidden="true"></div>
    ${createPopupContent(property)}
    <button type="button" class="property-map__sheet-close" aria-label="Close preview">${ICON_CLOSE}</button>
  `;
  container.appendChild(sheet);
  currentSheet = sheet;
  requestAnimationFrame(() => sheet.classList.add('property-map__sheet--visible'));

  sheet.querySelector('.property-map__sheet-close')?.addEventListener('click', dismissBottomSheet);

  // Wire SPA link
  const link = sheet.querySelector<HTMLAnchorElement>('.property-popup__btn[data-route]');
  if (link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.pushState({}, '', link.href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      dismissBottomSheet();
    });
  }

  // Touch swipe-down to dismiss
  let startY = 0;
  let currentY = 0;
  let dragging = false;
  const handle = sheet;

  const onStart = (e: TouchEvent) => {
    if (!e.touches[0]) return;
    startY = e.touches[0].clientY;
    currentY = startY;
    dragging = true;
    sheet.style.transition = 'none';
  };
  const onMove = (e: TouchEvent) => {
    if (!dragging || !e.touches[0]) return;
    currentY = e.touches[0].clientY;
    const delta = Math.max(0, currentY - startY);
    sheet.style.transform = `translateY(${delta}px)`;
  };
  const onEnd = () => {
    if (!dragging) return;
    dragging = false;
    sheet.style.transition = '';
    const delta = currentY - startY;
    if (delta > 80) {
      dismissBottomSheet();
    } else {
      sheet.style.transform = '';
    }
  };
  handle.addEventListener('touchstart', onStart, { passive: true });
  handle.addEventListener('touchmove', onMove, { passive: true });
  handle.addEventListener('touchend', onEnd);
  handle.addEventListener('touchcancel', onEnd);
}

function dismissBottomSheet(): void {
  if (!currentSheet) return;
  const sheet = currentSheet;
  currentSheet = null;
  sheet.classList.remove('property-map__sheet--visible');
  window.setTimeout(() => sheet.remove(), 240);
}

// ─── Marker helpers ───────────────────────────────────────────────────────

function buildPropertyMarker(
  property: Property,
  map: L.Map,
  container: HTMLElement,
  onMarkerClick?: (id: string) => void
): L.Marker | null {
  if (!property.location.coordinates) return null;
  const { lat, lng } = property.location.coordinates;
  const marker = L.marker([lat, lng], {
    icon: createCustomIcon(false),
    riseOnHover: true,
    keyboard: true,
    alt: `${property.title}, ${property.location.district}`
  });

  // Bind a popup for desktop (mobile uses bottom sheet instead)
  const popup = L.popup({
    className: 'property-map-popup',
    closeButton: true,
    maxWidth: 300,
    minWidth: 260,
    autoPanPadding: [24, 24]
  }).setContent(createPopupContent(property));
  marker.bindPopup(popup);

  // Double-click navigates to detail page
  let clickTimer: number | null = null;
  marker.on('click', () => {
    if (clickTimer) {
      window.clearTimeout(clickTimer);
      clickTimer = null;
      marker.closePopup();
      const href = `/properties/${property.id}`;
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }
    clickTimer = window.setTimeout(() => {
      clickTimer = null;
      if (onMarkerClick) onMarkerClick(property.id);
      if (isMobileViewport()) {
        marker.closePopup();
        showBottomSheet(container, property);
      }
    }, 220);
  });

  marker.on('mouseover', function (this: L.Marker) {
    this.setIcon(createCustomIcon(true));
  });
  marker.on('mouseout', function (this: L.Marker) {
    if (!this.isPopupOpen()) this.setIcon(createCustomIcon(false));
  });
  marker.on('popupopen', function (this: L.Marker) {
    this.setIcon(createCustomIcon(true));
  });
  marker.on('popupclose', function (this: L.Marker) {
    this.setIcon(createCustomIcon(false));
  });

  return marker;
}

function rebuildClusterMarkers(
  map: L.Map,
  container: HTMLElement,
  list: Property[],
  onMarkerClick?: (id: string) => void
): L.LatLngBounds {
  if (!markerClusterGroup) {
    markerClusterGroup = createClusterGroup();
    map.addLayer(markerClusterGroup);
  } else {
    markerClusterGroup.clearLayers();
  }

  const bounds = L.latLngBounds([]);
  if (!layerState.properties) return bounds;

  list.forEach(property => {
    const marker = buildPropertyMarker(property, map, container, onMarkerClick);
    if (marker) {
      markerClusterGroup!.addLayer(marker);
      if (property.location.coordinates) {
        bounds.extend([property.location.coordinates.lat, property.location.coordinates.lng]);
      }
    }
  });

  return bounds;
}

// ─── Error rendering ──────────────────────────────────────────────────────

function renderMapError(container: HTMLElement, onRetry: () => void): void {
  while (container.firstChild) container.removeChild(container.firstChild);
  container.appendChild(createErrorState({
    title: 'Map failed to load',
    description: 'We could not load the map right now. This is usually a temporary network issue. You can still browse the property list while we try again.',
    retryLabel: 'Reload map',
    onRetry
  }));
}

// ─── Public API ───────────────────────────────────────────────────────────

export function initPropertiesMap(
  containerId: string,
  filteredProperties: Property[] = properties,
  onMarkerClick?: (propertyId: string) => void
): L.Map | null {
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Reset module state for a clean re-init
  markerClusterGroup = null;
  activeBasemapLayer = null;
  activeBasemap = getSavedBasemap();
  dismissBottomSheet();

  // Skeleton overlay while tiles load
  const skeleton = createSkeletonMap();
  skeleton.style.position = 'absolute';
  skeleton.style.inset = '0';
  skeleton.style.zIndex = '500';
  container.style.position = container.style.position || 'relative';
  container.classList.add('property-map');
  container.appendChild(skeleton);

  let map: L.Map;
  try {
    map = L.map(containerId, {
      center: ERBIL_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
      touchZoom: true,
      dragging: true,
      doubleClickZoom: false, // We use double-click for navigation on markers
      preferCanvas: false
    });
    // Move zoom control to bottom-right so it doesn't fight with our custom toolbar
    map.zoomControl.setPosition('bottomright');
  } catch (err) {
    console.error('Map init failed', err);
    renderMapError(container, () => initPropertiesMap(containerId, filteredProperties, onMarkerClick));
    return null;
  }

  // Build tile layer (preserves saved basemap)
  const buildTileLayer = (id: BasemapId): L.TileLayer => {
    return id === 'satellite'
      ? L.tileLayer(SATELLITE_TILE_URL, { attribution: SATELLITE_ATTRIBUTION, maxZoom: 19 })
      : L.tileLayer(DARK_TILE_URL, { attribution: DARK_ATTRIBUTION, maxZoom: 19, subdomains: 'abcd' });
  };

  let tileErrorCount = 0;
  const wireTileEvents = (layer: L.TileLayer) => {
    layer.on('tileerror', () => {
      tileErrorCount++;
      if (tileErrorCount > 8) {
        try { map.remove(); } catch {}
        renderMapError(container, () => initPropertiesMap(containerId, filteredProperties, onMarkerClick));
      }
    });
    layer.on('load', () => {
      skeleton.classList.add('skeleton-map--fading');
      window.setTimeout(() => skeleton.remove(), 250);
    });
  };

  activeBasemapLayer = buildTileLayer(activeBasemap);
  wireTileEvents(activeBasemapLayer);
  activeBasemapLayer.addTo(map);
  if (activeBasemap === 'satellite') container.classList.add('property-map--satellite');

  const switchBasemap = (id: BasemapId) => {
    if (id === activeBasemap) return;
    const next = buildTileLayer(id);
    wireTileEvents(next);
    next.addTo(map);
    const prev = activeBasemapLayer;
    activeBasemap = id;
    saveBasemap(id);
    container.classList.toggle('property-map--satellite', id === 'satellite');
    // Fade out previous after small delay for crossfade
    window.setTimeout(() => {
      if (prev) {
        try { map.removeLayer(prev); } catch {}
      }
      activeBasemapLayer = next;
    }, 220);
  };

  // Build markers
  const bounds = rebuildClusterMarkers(map, container, filteredProperties, onMarkerClick);

  // Custom control overlay (top-right)
  const userMarkerRef: { marker: L.Marker | null } = { marker: null };
  const allBoundsRef: { bounds: L.LatLngBounds } = { bounds };

  const overlay = buildControlOverlay(
    map,
    container,
    switchBasemap,
    () => {
      if (allBoundsRef.bounds.isValid()) {
        map.flyToBounds(allBoundsRef.bounds, { padding: [60, 60], maxZoom: 15, duration: 0.6 });
      }
    },
    () => locateUserOn(map, container, userMarkerRef)
  );
  container.appendChild(overlay);

  // Layers panel
  const panel = buildLayersPanel((key, value) => {
    layerState[key] = value;
    if (key === 'properties') {
      const newBounds = rebuildClusterMarkers(map, container, filteredProperties, onMarkerClick);
      allBoundsRef.bounds = newBounds;
    }
    // Projects / Locations stubs — wired here once datasets exist.
  });
  container.appendChild(panel);

  // Initial fit
  if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
  }

  // SPA navigation for popup CTA
  map.on('popupopen', () => {
    window.setTimeout(() => {
      document.querySelectorAll<HTMLAnchorElement>('.property-popup__btn[data-route]').forEach(link => {
        if (link.dataset.routeWired === '1') return;
        link.dataset.routeWired = '1';
        link.addEventListener('click', (e) => {
          e.preventDefault();
          window.history.pushState({}, '', link.href);
          window.dispatchEvent(new PopStateEvent('popstate'));
        });
      });
    }, 0);
  });

  // Dismiss bottom sheet when user starts panning the map
  map.on('movestart', () => {
    if (currentSheet) dismissBottomSheet();
  });

  return map;
}

export function updateMapMarkers(
  map: L.Map,
  filteredProperties: Property[],
  onMarkerClick?: (propertyId: string) => void
): void {
  const container = map.getContainer();

  // Add a subtle fade on the cluster layer for smooth transitions
  container.classList.add('property-map--filtering');
  window.setTimeout(() => container.classList.remove('property-map--filtering'), 280);

  const bounds = rebuildClusterMarkers(map, container, filteredProperties, onMarkerClick);

  if (bounds.isValid()) {
    map.flyToBounds(bounds, { padding: [60, 60], maxZoom: 15, duration: 0.5 });
  }
}

// ─── Property detail (single marker) ──────────────────────────────────────

export function initPropertyDetailMap(
  containerId: string,
  property: Property
): L.Map | null {
  const container = document.getElementById(containerId);
  if (!container || !property.location.coordinates) return null;

  const { lat, lng } = property.location.coordinates;

  const map = L.map(containerId, {
    center: [lat, lng],
    zoom: 15,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false
  });

  L.tileLayer(DARK_TILE_URL, {
    attribution: DARK_ATTRIBUTION,
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(map);

  const marker = L.marker([lat, lng], { icon: createCustomIcon(true) }).addTo(map);

  L.circle([lat, lng], {
    color: '#C9A84C',
    fillColor: '#C9A84C',
    fillOpacity: 0.1,
    radius: 200,
    weight: 2
  }).addTo(map);

  marker.bindPopup(`
    <div class="property-detail-popup">
      <strong>${escapeHtml(property.title)}</strong><br>
      <span>${escapeHtml(property.location.address)}</span>
    </div>
  `).openPopup();

  return map;
}

export { ERBIL_CENTER, DEFAULT_ZOOM };
