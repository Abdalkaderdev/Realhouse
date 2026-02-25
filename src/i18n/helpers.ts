// =============================================================================
// i18n HELPERS - Data Localization Utilities
// Helper functions for accessing localized content from data files
// =============================================================================

import type { Language, LocalizedItem, LocalizedDescriptionItem } from './types';
import { getCurrentLanguage } from './index';

// =============================================================================
// LOCALIZED FIELD ACCESS
// =============================================================================

/**
 * Get the localized name from an item with name/nameAr/nameKu fields
 *
 * @param item - Object with localized name fields
 * @param lang - Optional language override
 * @returns Localized name string
 *
 * @example
 * const service = { name: 'Buy Property', nameAr: 'شراء العقارات', nameKu: 'کڕینی خانووبەرە' };
 * getLocalizedName(service); // Returns based on current language
 * getLocalizedName(service, 'ar'); // Returns 'شراء العقارات'
 */
export function getLocalizedName(item: LocalizedItem, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();

  if (currentLang === 'ar' && item.nameAr) {
    return item.nameAr;
  }
  if (currentLang === 'ckb' && item.nameKu) {
    return item.nameKu;
  }
  return item.name;
}

/**
 * Get the localized description from an item
 *
 * @param item - Object with localized description fields
 * @param lang - Optional language override
 * @returns Localized description string or undefined
 */
export function getLocalizedDescription(
  item: LocalizedDescriptionItem,
  lang?: Language
): string | undefined {
  const currentLang = lang || getCurrentLanguage();

  if (currentLang === 'ar' && item.descriptionAr) {
    return item.descriptionAr;
  }
  if (currentLang === 'ckb' && item.descriptionKu) {
    return item.descriptionKu;
  }
  return item.description;
}

/**
 * Get a localized field by suffix convention
 * Looks for field, fieldAr, fieldKu based on current language
 *
 * @param item - Object with localized fields
 * @param field - Base field name
 * @param lang - Optional language override
 * @returns Localized field value or undefined
 *
 * @example
 * const item = { title: 'Hello', titleAr: 'مرحبا', titleKu: 'سڵاو' };
 * getLocalizedField(item, 'title'); // Returns based on current language
 */
export function getLocalizedField<T extends Record<string, unknown>>(
  item: T,
  field: string,
  lang?: Language
): unknown {
  const currentLang = lang || getCurrentLanguage();

  if (currentLang === 'ar') {
    const arField = `${field}Ar`;
    if (arField in item && item[arField] !== undefined) {
      return item[arField];
    }
  }
  if (currentLang === 'ckb') {
    const kuField = `${field}Ku`;
    if (kuField in item && item[kuField] !== undefined) {
      return item[kuField];
    }
  }
  return item[field];
}

// =============================================================================
// ARRAY LOCALIZATION
// =============================================================================

/**
 * Get localized items from an array
 * Each item should have localized name/nameAr/nameKu fields
 *
 * @param items - Array of items with localized fields
 * @param lang - Optional language override
 * @returns Array of localized name strings
 */
export function getLocalizedNames(items: LocalizedItem[], lang?: Language): string[] {
  return items.map((item) => getLocalizedName(item, lang));
}

/**
 * Localize an array of strings that may have translation keys
 *
 * @param items - Array of items
 * @param localizer - Function to localize each item
 * @param lang - Optional language override
 * @returns Array of localized strings
 */
export function localizeArray<T>(
  items: T[],
  localizer: (item: T, lang?: Language) => string,
  lang?: Language
): string[] {
  return items.map((item) => localizer(item, lang));
}

// =============================================================================
// DATA OBJECT LOCALIZATION
// =============================================================================

/**
 * Create a localized version of a data object
 * Automatically picks the correct language variant for all localizable fields
 *
 * @param item - Object with localized fields
 * @param fields - Array of field names to localize
 * @param lang - Optional language override
 * @returns Object with localized fields applied
 */
export function localizeObject<T extends Record<string, unknown>>(
  item: T,
  fields: string[],
  lang?: Language
): T {
  const result = { ...item };

  for (const field of fields) {
    const localizedValue = getLocalizedField(item, field, lang);
    if (localizedValue !== undefined) {
      (result as Record<string, unknown>)[field] = localizedValue;
    }
  }

  return result;
}

/**
 * Create a factory function for localizing items of a specific type
 *
 * @param fields - Array of field names to localize
 * @returns Function that localizes an item
 */
export function createLocalizer<T extends Record<string, unknown>>(
  fields: string[]
): (item: T, lang?: Language) => T {
  return (item: T, lang?: Language) => localizeObject(item, fields, lang);
}

// =============================================================================
// PROPERTY LOCALIZATION HELPERS
// =============================================================================

/**
 * Property fields that should be localized
 */
export const PROPERTY_LOCALIZED_FIELDS = [
  'title',
  'description',
  'shortDescription',
  'locationName',
  'features',
  'amenities',
];

/**
 * Localize a property object
 */
export const localizeProperty = createLocalizer(PROPERTY_LOCALIZED_FIELDS);

/**
 * Service fields that should be localized
 */
export const SERVICE_LOCALIZED_FIELDS = [
  'name',
  'title',
  'description',
  'shortDescription',
  'features',
  'benefits',
];

/**
 * Localize a service object
 */
export const localizeService = createLocalizer(SERVICE_LOCALIZED_FIELDS);

/**
 * Neighborhood fields that should be localized
 */
export const NEIGHBORHOOD_LOCALIZED_FIELDS = [
  'name',
  'description',
  'shortDescription',
  'highlights',
  'amenities',
];

/**
 * Localize a neighborhood object
 */
export const localizeNeighborhood = createLocalizer(NEIGHBORHOOD_LOCALIZED_FIELDS);

/**
 * Blog post fields that should be localized
 */
export const BLOG_LOCALIZED_FIELDS = ['title', 'excerpt', 'content', 'tags'];

/**
 * Localize a blog post object
 */
export const localizeBlogPost = createLocalizer(BLOG_LOCALIZED_FIELDS);

/**
 * Project fields that should be localized
 */
export const PROJECT_LOCALIZED_FIELDS = [
  'name',
  'description',
  'shortDescription',
  'features',
  'amenities',
  'locationDescription',
];

/**
 * Localize a project object
 */
export const localizeProject = createLocalizer(PROJECT_LOCALIZED_FIELDS);

// =============================================================================
// CURRENCY & NUMBER LOCALIZATION HELPERS
// =============================================================================

/**
 * Wrap a number in LTR span for correct display in RTL context
 * Numbers should always display LTR, even in RTL layouts
 *
 * @param value - Formatted number/price string
 * @returns HTML string with LTR wrapper
 */
export function wrapLTR(value: string): string {
  return `<span class="ltr-content">${value}</span>`;
}

/**
 * Create localized price display with proper formatting
 * Includes LTR wrapper for RTL languages
 *
 * @param formattedPrice - Already formatted price string
 * @param lang - Current language
 * @returns HTML string with proper formatting
 */
export function createPriceDisplay(formattedPrice: string, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();

  // Numbers should always be LTR
  if (currentLang === 'ar' || currentLang === 'ckb') {
    return wrapLTR(formattedPrice);
  }

  return formattedPrice;
}
