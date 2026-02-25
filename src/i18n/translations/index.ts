// =============================================================================
// TRANSLATIONS INDEX
// Main aggregator with lazy loading support for data translations
// =============================================================================

import type { Language, CoreTranslations, DataTranslations, TranslationSet } from '../types';
import { coreTranslations } from './core';

// =============================================================================
// CORE TRANSLATIONS (Always loaded)
// =============================================================================

export { coreTranslations } from './core';

// =============================================================================
// DATA TRANSLATIONS (Lazy loaded)
// =============================================================================

/**
 * Cache for loaded data translations
 */
const dataTranslationsCache: Partial<Record<Language, DataTranslations>> = {};

/**
 * Lazy load data translations for a specific namespace
 * Currently returns empty - will be populated when data files are translated
 */
export async function loadDataTranslations(
  lang: Language,
  namespace: keyof DataTranslations
): Promise<DataTranslations[typeof namespace]> {
  // Check cache first
  if (dataTranslationsCache[lang]?.[namespace]) {
    return dataTranslationsCache[lang]![namespace];
  }

  // Initialize cache for this language if needed
  if (!dataTranslationsCache[lang]) {
    dataTranslationsCache[lang] = {};
  }

  // TODO: Implement lazy loading for data translations
  // Example:
  // const module = await import(`./data/${namespace}/${lang}.json`);
  // dataTranslationsCache[lang]![namespace] = module.default;
  // return module.default;

  return undefined;
}

/**
 * Load all data translations for a language
 */
export async function loadAllDataTranslations(lang: Language): Promise<DataTranslations> {
  // Check cache
  if (dataTranslationsCache[lang]) {
    return dataTranslationsCache[lang]!;
  }

  // Initialize empty data translations
  const data: DataTranslations = {};

  // TODO: Load all namespaces as needed
  // await Promise.all([
  //   loadDataTranslations(lang, 'services'),
  //   loadDataTranslations(lang, 'neighborhoods'),
  //   loadDataTranslations(lang, 'guides'),
  //   loadDataTranslations(lang, 'blog'),
  //   loadDataTranslations(lang, 'projects'),
  // ]);

  dataTranslationsCache[lang] = data;
  return data;
}

// =============================================================================
// FULL TRANSLATION SET
// =============================================================================

/**
 * Get the full translation set for a language
 * Core translations are always available, data translations are lazy loaded
 */
export function getTranslationSet(lang: Language): TranslationSet {
  return {
    core: coreTranslations[lang] || coreTranslations.en,
    data: dataTranslationsCache[lang],
  };
}

// =============================================================================
// LEGACY COMPATIBILITY
// Maintains compatibility with existing translations.ts interface
// =============================================================================

/**
 * Legacy TranslationStrings type - maps to CoreTranslations
 */
export type TranslationStrings = CoreTranslations;

/**
 * Legacy translations object - maps core translations to flat structure
 * This provides backwards compatibility with existing code using translations.ts
 */
export const translations: Record<Language, CoreTranslations> = coreTranslations;

// Re-export types and utilities
export type { Language, CoreTranslations, DataTranslations, TranslationSet };
