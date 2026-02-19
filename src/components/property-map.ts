// ═══════════════════════════════════════════════════════════════════════════
// Property Map Component - Leaflet.js Integration
// ═══════════════════════════════════════════════════════════════════════════

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { properties, getDisplayPrice, type Property } from '../data/properties';

// Erbil city center coordinates
const ERBIL_CENTER: [number, number] = [36.1901, 44.0091];
const DEFAULT_ZOOM = 13;

// Dark theme tile layer (CartoDB Dark Matter)
const DARK_TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Custom gold marker icon
function createCustomIcon(isActive = false): L.DivIcon {
  const color = isActive ? '#C9A84C' : '#B8944D';
  const size = isActive ? 40 : 32;

  return L.divIcon({
    className: 'property-marker',
    html: `
      <div class="property-marker__icon ${isActive ? 'property-marker__icon--active' : ''}" style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid rgba(10, 10, 15, 0.8);
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg style="transform: rotate(45deg); width: 50%; height: 50%;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" fill="#0A0A0F"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
}

// Create popup content for a property
function createPopupContent(property: Property): string {
  const price = getDisplayPrice(property);
  const specs = property.specs;

  return `
    <div class="property-popup">
      <div class="property-popup__image">
        <img src="${property.images[0]}" alt="${property.title}" loading="lazy" />
        <span class="property-popup__type">${property.type}</span>
      </div>
      <div class="property-popup__content">
        <h3 class="property-popup__title">${property.title}</h3>
        <p class="property-popup__location">${property.location.district}, ${property.location.city}</p>
        <div class="property-popup__specs">
          ${specs.beds > 0 ? `<span>${specs.beds} Beds</span>` : ''}
          ${specs.baths > 0 ? `<span>${specs.baths} Baths</span>` : ''}
          <span>${specs.sqm} m²</span>
        </div>
        <div class="property-popup__footer">
          <span class="property-popup__price">${price}</span>
          <a href="/properties/${property.id}" class="property-popup__btn" data-route>View</a>
        </div>
      </div>
    </div>
  `;
}

// Initialize map for properties page
export function initPropertiesMap(
  containerId: string,
  filteredProperties: Property[] = properties,
  onMarkerClick?: (propertyId: string) => void
): L.Map | null {
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Create map
  const map = L.map(containerId, {
    center: ERBIL_CENTER,
    zoom: DEFAULT_ZOOM,
    zoomControl: true,
    scrollWheelZoom: true,
    attributionControl: true
  });

  // Add dark tile layer
  L.tileLayer(DARK_TILE_URL, {
    attribution: TILE_ATTRIBUTION,
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(map);

  // Add markers for properties with coordinates
  const markers: L.Marker[] = [];
  const bounds = L.latLngBounds([]);

  filteredProperties.forEach(property => {
    if (property.location.coordinates) {
      const { lat, lng } = property.location.coordinates;
      const marker = L.marker([lat, lng], {
        icon: createCustomIcon(false)
      });

      // Create popup
      const popup = L.popup({
        className: 'property-map-popup',
        closeButton: true,
        maxWidth: 300,
        minWidth: 250
      }).setContent(createPopupContent(property));

      marker.bindPopup(popup);

      // Handle marker click
      marker.on('click', () => {
        if (onMarkerClick) {
          onMarkerClick(property.id);
        }
      });

      // Highlight marker on hover
      marker.on('mouseover', function(this: L.Marker) {
        this.setIcon(createCustomIcon(true));
      });

      marker.on('mouseout', function(this: L.Marker) {
        if (!this.isPopupOpen()) {
          this.setIcon(createCustomIcon(false));
        }
      });

      marker.addTo(map);
      markers.push(marker);
      bounds.extend([lat, lng]);
    }
  });

  // Fit map to show all markers if there are any
  if (markers.length > 0 && bounds.isValid()) {
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }

  // Handle popup data-route links for SPA navigation
  map.on('popupopen', () => {
    setTimeout(() => {
      const routeLinks = document.querySelectorAll('.property-popup__btn[data-route]');
      routeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = (link as HTMLAnchorElement).href;
          window.history.pushState({}, '', href);
          window.dispatchEvent(new PopStateEvent('popstate'));
        });
      });
    }, 0);
  });

  return map;
}

// Update map with filtered properties
export function updateMapMarkers(
  map: L.Map,
  filteredProperties: Property[],
  onMarkerClick?: (propertyId: string) => void
): void {
  // Remove all existing markers
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Add new markers
  const bounds = L.latLngBounds([]);

  filteredProperties.forEach(property => {
    if (property.location.coordinates) {
      const { lat, lng } = property.location.coordinates;
      const marker = L.marker([lat, lng], {
        icon: createCustomIcon(false)
      });

      const popup = L.popup({
        className: 'property-map-popup',
        closeButton: true,
        maxWidth: 300,
        minWidth: 250
      }).setContent(createPopupContent(property));

      marker.bindPopup(popup);

      marker.on('click', () => {
        if (onMarkerClick) {
          onMarkerClick(property.id);
        }
      });

      marker.on('mouseover', function(this: L.Marker) {
        this.setIcon(createCustomIcon(true));
      });

      marker.on('mouseout', function(this: L.Marker) {
        if (!this.isPopupOpen()) {
          this.setIcon(createCustomIcon(false));
        }
      });

      marker.addTo(map);
      bounds.extend([lat, lng]);
    }
  });

  // Fit to new bounds
  if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }
}

// Initialize small map for property detail page
export function initPropertyDetailMap(
  containerId: string,
  property: Property
): L.Map | null {
  const container = document.getElementById(containerId);
  if (!container || !property.location.coordinates) return null;

  const { lat, lng } = property.location.coordinates;

  // Create map
  const map = L.map(containerId, {
    center: [lat, lng],
    zoom: 15,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false
  });

  // Add dark tile layer
  L.tileLayer(DARK_TILE_URL, {
    attribution: TILE_ATTRIBUTION,
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(map);

  // Add property marker
  const marker = L.marker([lat, lng], {
    icon: createCustomIcon(true)
  }).addTo(map);

  // Add a circle to highlight the area
  L.circle([lat, lng], {
    color: '#C9A84C',
    fillColor: '#C9A84C',
    fillOpacity: 0.1,
    radius: 200,
    weight: 2
  }).addTo(map);

  // Add popup with property info
  marker.bindPopup(`
    <div class="property-detail-popup">
      <strong>${property.title}</strong><br>
      <span>${property.location.address}</span>
    </div>
  `).openPopup();

  return map;
}

// Export for use in pages
export { ERBIL_CENTER, DEFAULT_ZOOM };
