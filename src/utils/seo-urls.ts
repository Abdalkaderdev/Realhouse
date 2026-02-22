// ═══════════════════════════════════════════════════════════════════════════
// SEO URL Utilities - Clean, Keyword-Rich URL Generation
// ═══════════════════════════════════════════════════════════════════════════

import { Property } from '../data/properties';
import { Project } from '../data/projects';
import { BlogPost } from '../data/blog';

// ─── URL Normalization ─────────────────────────────────────────────────────

/**
 * Normalize a URL path for SEO best practices:
 * - Convert to lowercase
 * - Replace underscores with hyphens
 * - Replace spaces with hyphens
 * - Remove trailing slashes (except root)
 * - Remove multiple consecutive slashes
 * - Remove multiple consecutive hyphens
 * - Remove special characters that aren't SEO-friendly
 */
export function normalizeUrl(url: string): string {
  // Split query string to preserve it
  const [path, queryString] = url.split('?');

  let normalized = path
    .toLowerCase()
    .replace(/_/g, '-')           // Replace underscores with hyphens
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/[^a-z0-9\-\/]/g, '')// Remove non-alphanumeric except hyphens and slashes
    .replace(/-+/g, '-')          // Remove multiple consecutive hyphens
    .replace(/\/+/g, '/')         // Remove multiple consecutive slashes
    .replace(/\/$/, '')           // Remove trailing slash
    .replace(/^\/+/, '/');        // Ensure single leading slash

  // Handle root path
  if (normalized === '') normalized = '/';

  // Reattach query string if present
  return queryString ? `${normalized}?${queryString}` : normalized;
}

/**
 * Generate a URL-safe slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Remove multiple consecutive hyphens
    .replace(/^-|-$/g, '');   // Remove leading/trailing hyphens
}

// ─── Property URL Generation ───────────────────────────────────────────────

/**
 * Generate SEO-friendly URL for a property
 * Format: /properties/{type}-for-{status}-{location}-{id}
 * Example: /properties/villa-for-sale-gulan-erbil-boulevard-apt-floor-13
 */
export function generatePropertyUrl(property: Property): string {
  const type = generateSlug(property.type);
  const status = property.status === 'For Sale' ? 'sale' :
                 property.status === 'For Rent' ? 'rent' :
                 generateSlug(property.status);
  const location = generateSlug(`${property.location.district} ${property.location.city}`);

  return `/properties/${type}-for-${status}-${location}-${property.id}`;
}

/**
 * Generate canonical URL for a property (using slug)
 */
export function generatePropertyCanonicalUrl(property: Property): string {
  const slug = generateSlug(property.title);
  return `https://realhouseiq.com/properties/${slug}`;
}

/**
 * Generate canonical URL for a property by slug string
 */
export function generatePropertyCanonicalUrlBySlug(slug: string): string {
  return `https://realhouseiq.com/properties/${slug}`;
}

/**
 * Parse property ID from SEO-friendly URL
 * Handles both old format (/properties/id) and new format (/properties/type-for-status-location-id)
 */
export function parsePropertyIdFromUrl(path: string): string {
  const cleanPath = path.replace('/properties/', '');

  // Check if it's the new SEO format (contains multiple hyphens with -for-)
  if (cleanPath.includes('-for-')) {
    // Extract the ID from the end (last segment after the location)
    const parts = cleanPath.split('-');
    // Find the position of 'for' and skip type-for-status-location pattern
    const forIndex = parts.indexOf('for');
    if (forIndex >= 0) {
      // The ID starts after the location (city name)
      // Pattern: type-for-status-location-city-id
      // We need to handle IDs that may contain hyphens
      const locationEnd = forIndex + 4; // type, for, status, location, city
      if (parts.length > locationEnd) {
        return parts.slice(locationEnd).join('-');
      }
    }
  }

  // Return as-is for old format or simple IDs
  return cleanPath;
}

// ─── Project URL Generation ────────────────────────────────────────────────

/**
 * Generate SEO-friendly URL for a project
 * Format: /projects/{project-slug}-erbil
 * Example: /projects/empire-world-erbil
 */
export function generateProjectUrl(project: Project): string {
  const slug = generateSlug(project.name);
  const city = generateSlug(project.location.city);
  return `/projects/${slug}-${city}`;
}

/**
 * Generate canonical URL for a project
 */
export function generateProjectCanonicalUrl(projectId: string): string {
  return `https://realhouseiq.com/projects/${projectId}`;
}

/**
 * Parse project ID from URL
 */
export function parseProjectIdFromUrl(path: string): string {
  const cleanPath = path.replace('/projects/', '');

  // Remove city suffix if present (e.g., empire-world-erbil -> empire-world)
  if (cleanPath.endsWith('-erbil')) {
    return cleanPath.slice(0, -6);
  }

  return cleanPath;
}

// ─── Blog URL Generation ───────────────────────────────────────────────────

/**
 * Generate SEO-friendly URL for a blog post
 * Uses the existing slug from the blog post
 * Example: /blog/how-to-buy-property-erbil
 */
export function generateBlogUrl(post: BlogPost): string {
  return `/blog/${post.slug}`;
}

/**
 * Generate canonical URL for a blog post
 */
export function generateBlogCanonicalUrl(slug: string): string {
  return `https://realhouseiq.com/blog/${slug}`;
}

// ─── Area/District URL Generation ──────────────────────────────────────────

/**
 * Generate SEO-friendly URL for area/district pages
 * Format: /areas/{district-slug}-{city}-properties
 * Example: /areas/gulan-erbil-properties
 */
export function generateAreaUrl(district: string, city: string = 'erbil'): string {
  const districtSlug = generateSlug(district);
  const citySlug = generateSlug(city);
  return `/areas/${districtSlug}-${citySlug}-properties`;
}

// ─── Filter URL Generation ─────────────────────────────────────────────────

export interface PropertyFilterParams {
  type?: string;
  location?: string;
  district?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  minArea?: number;
  maxArea?: number;
}

/**
 * Generate SEO-friendly filter URL
 * Format: /properties?type=villa&location=gulan&price=under-500000
 */
export function generateFilterUrl(filters: PropertyFilterParams): string {
  const params = new URLSearchParams();

  if (filters.type && filters.type !== 'All') {
    params.set('type', generateSlug(filters.type));
  }

  if (filters.location) {
    params.set('location', generateSlug(filters.location));
  }

  if (filters.district && filters.district !== 'All') {
    params.set('district', generateSlug(filters.district));
  }

  if (filters.status && filters.status !== 'All') {
    params.set('status', generateSlug(filters.status));
  }

  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    if (filters.maxPrice < 1000000) {
      params.set('price', `${Math.floor(filters.minPrice / 1000)}k-${Math.floor(filters.maxPrice / 1000)}k`);
    } else {
      params.set('price', `under-${Math.floor(filters.maxPrice / 1000)}k`);
    }
  } else if (filters.maxPrice !== undefined) {
    params.set('price', `under-${Math.floor(filters.maxPrice / 1000)}k`);
  } else if (filters.minPrice !== undefined) {
    params.set('price', `above-${Math.floor(filters.minPrice / 1000)}k`);
  }

  if (filters.minBeds !== undefined && filters.minBeds > 0) {
    params.set('beds', `${filters.minBeds}+`);
  }

  if (filters.minArea !== undefined && filters.maxArea !== undefined) {
    params.set('area', `${filters.minArea}-${filters.maxArea}sqm`);
  }

  const queryString = params.toString();
  return queryString ? `/properties?${queryString}` : '/properties';
}

/**
 * Parse filter parameters from URL
 */
export function parseFilterParams(searchParams: URLSearchParams): PropertyFilterParams {
  const filters: PropertyFilterParams = {};

  const type = searchParams.get('type');
  if (type) {
    filters.type = type.charAt(0).toUpperCase() + type.slice(1);
  }

  const location = searchParams.get('location');
  if (location) {
    filters.location = location;
  }

  const district = searchParams.get('district');
  if (district) {
    filters.district = district.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  const status = searchParams.get('status');
  if (status) {
    if (status === 'for-sale') filters.status = 'For Sale';
    else if (status === 'for-rent') filters.status = 'For Rent';
    else if (status === 'off-plan') filters.status = 'Off Plan';
    else filters.status = status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  const price = searchParams.get('price');
  if (price) {
    const underMatch = price.match(/under-(\d+)k/);
    const aboveMatch = price.match(/above-(\d+)k/);
    const rangeMatch = price.match(/(\d+)k-(\d+)k/);

    if (underMatch) {
      filters.maxPrice = parseInt(underMatch[1], 10) * 1000;
    } else if (aboveMatch) {
      filters.minPrice = parseInt(aboveMatch[1], 10) * 1000;
    } else if (rangeMatch) {
      filters.minPrice = parseInt(rangeMatch[1], 10) * 1000;
      filters.maxPrice = parseInt(rangeMatch[2], 10) * 1000;
    }
  }

  const beds = searchParams.get('beds');
  if (beds) {
    const bedsMatch = beds.match(/(\d+)\+?/);
    if (bedsMatch) {
      filters.minBeds = parseInt(bedsMatch[1], 10);
    }
  }

  const area = searchParams.get('area');
  if (area) {
    const areaMatch = area.match(/(\d+)-(\d+)sqm/);
    if (areaMatch) {
      filters.minArea = parseInt(areaMatch[1], 10);
      filters.maxArea = parseInt(areaMatch[2], 10);
    }
  }

  return filters;
}

// ─── Canonical URL Generation ──────────────────────────────────────────────

const BASE_URL = 'https://realhouseiq.com';

/**
 * Generate canonical URL for any page
 * Ensures consistent URL format without trailing slashes
 */
export function generateCanonicalUrl(path: string): string {
  const normalizedPath = normalizeUrl(path);
  return `${BASE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
}

// ─── 301 Redirect Map ──────────────────────────────────────────────────────

/**
 * Map of old URLs to new SEO-friendly URLs for 301 redirects
 * This can be used by the server or client-side router
 */
export const redirectMap: Record<string, string> = {
  // Legacy URL patterns to new patterns
  '/property/': '/properties/',
  '/project/': '/projects/',
  '/article/': '/blog/',
  '/listings': '/properties',
  '/homes': '/properties',
  '/real-estate': '/properties',
  '/buy': '/properties?status=for-sale',
  '/rent': '/properties?status=for-rent',
  '/off-plan': '/properties?status=off-plan',
  '/villas': '/properties?type=villa',
  '/apartments': '/properties?type=apartment',
  '/commercial': '/properties?type=commercial',
};

/**
 * Check if a URL needs to be redirected and return the new URL
 */
export function getRedirectUrl(path: string): string | null {
  const normalizedPath = normalizeUrl(path);

  // Check exact matches
  if (redirectMap[normalizedPath]) {
    return redirectMap[normalizedPath];
  }

  // Check prefix matches
  for (const [oldPrefix, newPrefix] of Object.entries(redirectMap)) {
    if (normalizedPath.startsWith(oldPrefix)) {
      return normalizedPath.replace(oldPrefix, newPrefix);
    }
  }

  // Handle trailing slash redirect
  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    return normalizedPath.slice(0, -1);
  }

  // Handle uppercase URLs
  if (normalizedPath !== normalizedPath.toLowerCase()) {
    return normalizedPath.toLowerCase();
  }

  return null;
}

// ─── URL Schema for Structured Data ────────────────────────────────────────

export interface UrlSchemaItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

/**
 * Generate BreadcrumbList schema for a given path
 */
export function generateBreadcrumbSchema(path: string): UrlSchemaItem[] {
  const items: UrlSchemaItem[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL
    }
  ];

  const segments = path.split('/').filter(Boolean);
  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name,
      item: `${BASE_URL}${currentPath}`
    });
  });

  return items;
}

/**
 * Generate ItemList schema for sitemap URLs
 */
export function generateSitemapUrlSchema(urls: string[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: urls.map((url, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: url.startsWith('http') ? url : `${BASE_URL}${url}`
    }))
  };
}

// ─── Service URL Generation ─────────────────────────────────────────────────

/**
 * Generate SEO-friendly URL for a service page
 * Format: /services/{service-slug}
 * Example: /services/property-management
 */
export function generateServiceUrl(serviceSlug: string): string {
  return `/services/${generateSlug(serviceSlug)}`;
}

/**
 * Generate canonical URL for a service page
 */
export function generateServiceCanonicalUrl(serviceSlug: string): string {
  return `${BASE_URL}/services/${generateSlug(serviceSlug)}`;
}

// ─── Location URL Generation ────────────────────────────────────────────────

/**
 * Generate SEO-friendly URL for a district/location page
 * Format: /properties/{district-slug}
 * Example: /properties/gulan
 */
export function generateDistrictUrl(districtSlug: string): string {
  return `/properties/${generateSlug(districtSlug)}`;
}

/**
 * Generate canonical URL for a district page
 */
export function generateDistrictCanonicalUrl(districtSlug: string): string {
  return `${BASE_URL}/properties/${generateSlug(districtSlug)}`;
}

// ─── URL Helpers ────────────────────────────────────────────────────────────

/**
 * Check if a URL is external (not same domain)
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('/') || url.startsWith('#')) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.host !== 'realhouseiq.com' && urlObj.host !== 'www.realhouseiq.com';
  } catch {
    return false;
  }
}

/**
 * Add UTM parameters to URL for tracking
 */
export function addUtmParams(
  url: string,
  params: { source?: string; medium?: string; campaign?: string; content?: string; term?: string }
): string {
  const urlObj = new URL(url.startsWith('http') ? url : `${BASE_URL}${url}`);

  if (params.source) urlObj.searchParams.set('utm_source', params.source);
  if (params.medium) urlObj.searchParams.set('utm_medium', params.medium);
  if (params.campaign) urlObj.searchParams.set('utm_campaign', params.campaign);
  if (params.content) urlObj.searchParams.set('utm_content', params.content);
  if (params.term) urlObj.searchParams.set('utm_term', params.term);

  return urlObj.toString();
}

/**
 * Generate hreflang URLs for multilingual support
 */
export function generateHreflangUrls(path: string): Record<string, string> {
  const normalizedPath = normalizeUrl(path);
  const basePath = normalizedPath === '/' ? '' : normalizedPath;

  return {
    'en': `${BASE_URL}${basePath}`,
    'ar': `${BASE_URL}/ar${basePath}`,
    'ku': `${BASE_URL}/ku${basePath}`,
    'x-default': `${BASE_URL}${basePath}`
  };
}

/**
 * Get all static page URLs for sitemap generation
 */
export function getStaticPageUrls(): string[] {
  return [
    '/',
    '/properties',
    '/projects',
    '/blog',
    '/about',
    '/contact',
    '/faq',
    '/services',
    '/services/buy',
    '/services/sell',
    '/services/rent',
    '/services/property-management',
    '/services/investment-consulting',
    '/services/valuation',
    '/locations',
    '/sitemap',
    '/privacy',
    '/terms'
  ];
}

// ─── URL Validation ────────────────────────────────────────────────────────

/**
 * Validate that a URL follows SEO best practices
 */
export function validateSeoUrl(url: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check for uppercase characters
  if (url !== url.toLowerCase()) {
    issues.push('URL contains uppercase characters');
  }

  // Check for underscores
  if (url.includes('_')) {
    issues.push('URL contains underscores (use hyphens instead)');
  }

  // Check for trailing slash
  if (url !== '/' && url.endsWith('/')) {
    issues.push('URL has trailing slash');
  }

  // Check for multiple consecutive slashes
  if (/\/\/+/.test(url) && !url.startsWith('http')) {
    issues.push('URL has multiple consecutive slashes');
  }

  // Check for special characters
  if (/[^a-z0-9\-\/\?\=\&\.]/.test(url)) {
    issues.push('URL contains non-SEO-friendly characters');
  }

  // Check URL length (recommended under 75 characters for path)
  const path = url.split('?')[0];
  if (path.length > 75) {
    issues.push('URL path exceeds 75 characters');
  }

  return {
    valid: issues.length === 0,
    issues
  };
}
