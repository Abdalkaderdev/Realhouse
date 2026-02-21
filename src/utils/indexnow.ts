// ═══════════════════════════════════════════════════════════════════════════
// IndexNow Protocol Implementation
// Instant indexing notification for search engines (Bing, Yandex, etc.)
// https://www.indexnow.org/
// ═══════════════════════════════════════════════════════════════════════════

/**
 * IndexNow Configuration
 *
 * IMPORTANT: Replace the default key with your own unique key.
 * The key must match the content of /public/indexnow-key.txt
 *
 * Key requirements:
 * - 8-128 characters
 * - Lowercase alphanumeric only (a-z, 0-9)
 * - No special characters
 */
const INDEXNOW_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // TODO: Replace with your actual key
const SITE_HOST = 'realhouseiq.com';
const KEY_LOCATION = `https://${SITE_HOST}/indexnow-key.txt`;

// IndexNow API endpoints - submitting to one notifies all participating engines
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',      // Primary endpoint
  'https://www.bing.com/indexnow',          // Bing direct
  'https://yandex.com/indexnow'             // Yandex direct
];

// Maximum URLs per batch submission (IndexNow limit)
const MAX_URLS_PER_BATCH = 10000;

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface IndexNowResponse {
  success: boolean;
  endpoint: string;
  status?: number;
  statusText?: string;
  error?: string;
}

export interface IndexNowBatchResult {
  totalUrls: number;
  successfulEndpoints: number;
  failedEndpoints: number;
  results: IndexNowResponse[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Core Functions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Submit a single URL to IndexNow
 *
 * @param url - Full URL to submit (must include https://)
 * @returns Array of responses from each endpoint
 *
 * @example
 * await submitUrl('https://realhouseiq.com/properties/new-listing');
 */
export async function submitUrl(url: string): Promise<IndexNowResponse[]> {
  if (!url.startsWith('https://')) {
    console.warn('IndexNow: URL should start with https://', url);
  }

  const results: IndexNowResponse[] = [];

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const params = new URLSearchParams({
        url: url,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION
      });

      const response = await fetch(`${endpoint}?${params}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      results.push({
        success: response.ok || response.status === 202,
        endpoint,
        status: response.status,
        statusText: response.statusText
      });

      // If one endpoint accepts, others will receive via shared network
      if (response.ok || response.status === 202) {
        if (import.meta.env?.DEV) {
          console.log(`IndexNow: URL submitted successfully to ${endpoint}`);
        }
        break; // One successful submission is enough
      }
    } catch (error) {
      results.push({
        success: false,
        endpoint,
        error: error instanceof Error ? error.message : 'Network error'
      });
    }
  }

  return results;
}

/**
 * Submit multiple URLs to IndexNow (batch submission)
 *
 * @param urls - Array of URLs to submit
 * @returns Batch result with statistics
 *
 * @example
 * await submitUrls([
 *   'https://realhouseiq.com/properties/villa-1',
 *   'https://realhouseiq.com/properties/villa-2'
 * ]);
 */
export async function submitUrls(urls: string[]): Promise<IndexNowBatchResult> {
  if (urls.length === 0) {
    return {
      totalUrls: 0,
      successfulEndpoints: 0,
      failedEndpoints: 0,
      results: []
    };
  }

  // Validate and clean URLs
  const validUrls = urls.filter(url => {
    if (!url.startsWith('https://')) {
      console.warn('IndexNow: Skipping invalid URL:', url);
      return false;
    }
    return true;
  });

  if (validUrls.length > MAX_URLS_PER_BATCH) {
    console.warn(`IndexNow: Too many URLs (${validUrls.length}), truncating to ${MAX_URLS_PER_BATCH}`);
    validUrls.length = MAX_URLS_PER_BATCH;
  }

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: validUrls
  };

  const results: IndexNowResponse[] = [];

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result: IndexNowResponse = {
        success: response.ok || response.status === 202,
        endpoint,
        status: response.status,
        statusText: response.statusText
      };

      results.push(result);

      // If one endpoint accepts, others will receive via shared network
      if (result.success) {
        if (import.meta.env?.DEV) {
          console.log(`IndexNow: ${validUrls.length} URLs submitted successfully to ${endpoint}`);
        }
        break;
      }
    } catch (error) {
      results.push({
        success: false,
        endpoint,
        error: error instanceof Error ? error.message : 'Network error'
      });
    }
  }

  return {
    totalUrls: validUrls.length,
    successfulEndpoints: results.filter(r => r.success).length,
    failedEndpoints: results.filter(r => !r.success).length,
    results
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Content-Type Specific Functions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Notify search engines about a new property listing
 * Submits both the property page and the properties list page
 *
 * @param propertyId - Property slug/ID
 *
 * @example
 * await notifyNewProperty('boulevard-apt-floor-13');
 */
export async function notifyNewProperty(propertyId: string): Promise<void> {
  const propertyUrl = `https://${SITE_HOST}/properties/${propertyId}`;
  const propertiesListUrl = `https://${SITE_HOST}/properties`;

  try {
    const result = await submitUrls([propertyUrl, propertiesListUrl]);
    if (result.successfulEndpoints > 0) {
      console.log(`IndexNow: New property "${propertyId}" submitted successfully`);
    } else {
      console.warn(`IndexNow: Failed to submit property "${propertyId}"`);
    }
  } catch (error) {
    console.error('IndexNow: Property submission failed:', error);
  }
}

/**
 * Notify search engines about a new development project
 * Submits both the project page and the projects list page
 *
 * @param projectId - Project slug/ID
 *
 * @example
 * await notifyNewProject('empire-world');
 */
export async function notifyNewProject(projectId: string): Promise<void> {
  const projectUrl = `https://${SITE_HOST}/projects/${projectId}`;
  const projectsListUrl = `https://${SITE_HOST}/projects`;

  try {
    const result = await submitUrls([projectUrl, projectsListUrl]);
    if (result.successfulEndpoints > 0) {
      console.log(`IndexNow: New project "${projectId}" submitted successfully`);
    } else {
      console.warn(`IndexNow: Failed to submit project "${projectId}"`);
    }
  } catch (error) {
    console.error('IndexNow: Project submission failed:', error);
  }
}

/**
 * Notify search engines about a new blog post
 * Submits both the blog post page and the blog list page
 *
 * @param slug - Blog post slug
 *
 * @example
 * await notifyNewBlogPost('erbil-real-estate-market-trends-2025');
 */
export async function notifyNewBlogPost(slug: string): Promise<void> {
  const blogUrl = `https://${SITE_HOST}/blog/${slug}`;
  const blogListUrl = `https://${SITE_HOST}/blog`;

  try {
    const result = await submitUrls([blogUrl, blogListUrl]);
    if (result.successfulEndpoints > 0) {
      console.log(`IndexNow: New blog post "${slug}" submitted successfully`);
    } else {
      console.warn(`IndexNow: Failed to submit blog post "${slug}"`);
    }
  } catch (error) {
    console.error('IndexNow: Blog post submission failed:', error);
  }
}

/**
 * Notify search engines about a location/district page update
 *
 * @param district - District slug
 *
 * @example
 * await notifyLocationUpdate('gulan');
 */
export async function notifyLocationUpdate(district: string): Promise<void> {
  const locationUrl = `https://${SITE_HOST}/properties/${district}`;
  const locationsUrl = `https://${SITE_HOST}/locations`;

  try {
    await submitUrls([locationUrl, locationsUrl]);
    console.log(`IndexNow: Location "${district}" submitted successfully`);
  } catch (error) {
    console.error('IndexNow: Location submission failed:', error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Bulk Operations
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Submit all main pages to IndexNow
 * Useful after major site updates or redesigns
 *
 * @example
 * await submitAllPages();
 */
export async function submitAllPages(): Promise<IndexNowBatchResult> {
  const mainPages = [
    `https://${SITE_HOST}/`,
    `https://${SITE_HOST}/properties`,
    `https://${SITE_HOST}/projects`,
    `https://${SITE_HOST}/blog`,
    `https://${SITE_HOST}/about`,
    `https://${SITE_HOST}/contact`,
    `https://${SITE_HOST}/faq`,
    `https://${SITE_HOST}/locations`,
    `https://${SITE_HOST}/services`,
    `https://${SITE_HOST}/gallery`,
    `https://${SITE_HOST}/sitemap`
  ];

  const result = await submitUrls(mainPages);
  console.log(`IndexNow: Submitted ${result.totalUrls} main pages`);
  return result;
}

/**
 * Submit all project pages to IndexNow
 *
 * @param projectIds - Array of project IDs
 *
 * @example
 * await submitAllProjects(['empire-world', 'dream-city', 'italian-village']);
 */
export async function submitAllProjects(projectIds: string[]): Promise<IndexNowBatchResult> {
  const urls = [
    `https://${SITE_HOST}/projects`,
    ...projectIds.map(id => `https://${SITE_HOST}/projects/${id}`)
  ];

  const result = await submitUrls(urls);
  console.log(`IndexNow: Submitted ${result.totalUrls} project pages`);
  return result;
}

/**
 * Submit all property pages to IndexNow
 *
 * @param propertyIds - Array of property IDs
 *
 * @example
 * await submitAllProperties(['boulevard-apt-floor-13', 'queen-towers-store-1']);
 */
export async function submitAllProperties(propertyIds: string[]): Promise<IndexNowBatchResult> {
  const urls = [
    `https://${SITE_HOST}/properties`,
    ...propertyIds.map(id => `https://${SITE_HOST}/properties/${id}`)
  ];

  const result = await submitUrls(urls);
  console.log(`IndexNow: Submitted ${result.totalUrls} property pages`);
  return result;
}

// ═══════════════════════════════════════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate IndexNow ping URL for manual submission
 * Copy this URL and paste in browser to manually trigger indexing
 *
 * @param url - URL to index
 * @returns Formatted IndexNow ping URL
 *
 * @example
 * const pingUrl = getIndexNowPingUrl('https://realhouseiq.com/properties/new-villa');
 * // Returns: https://api.indexnow.org/indexnow?url=https://...&key=...
 */
export function getIndexNowPingUrl(url: string): string {
  const params = new URLSearchParams({
    url: url,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION
  });

  return `https://api.indexnow.org/indexnow?${params}`;
}

/**
 * Check if IndexNow key file is accessible
 * Useful for debugging configuration issues
 *
 * @returns True if key file is accessible
 */
export async function verifyKeyFile(): Promise<boolean> {
  try {
    const response = await fetch(KEY_LOCATION);
    if (response.ok) {
      const keyContent = await response.text();
      const isValid = keyContent.trim() === INDEXNOW_KEY;
      if (!isValid) {
        console.error('IndexNow: Key file content does not match configured key');
      }
      return isValid;
    }
    console.error('IndexNow: Key file not accessible');
    return false;
  } catch (error) {
    console.error('IndexNow: Error verifying key file:', error);
    return false;
  }
}

/**
 * Get current IndexNow configuration (for debugging)
 */
export function getConfig() {
  return {
    host: SITE_HOST,
    keyLocation: KEY_LOCATION,
    endpoints: INDEXNOW_ENDPOINTS,
    keyLength: INDEXNOW_KEY.length
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Default Export
// ═══════════════════════════════════════════════════════════════════════════

export default {
  // Core functions
  submitUrl,
  submitUrls,

  // Content-type specific
  notifyNewProperty,
  notifyNewProject,
  notifyNewBlogPost,
  notifyLocationUpdate,

  // Bulk operations
  submitAllPages,
  submitAllProjects,
  submitAllProperties,

  // Utilities
  getIndexNowPingUrl,
  verifyKeyFile,
  getConfig
};
