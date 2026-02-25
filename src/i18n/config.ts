// =============================================================================
// i18n CONFIG - Language Metadata and Configuration
// =============================================================================

import type { Language, LanguageInfo, TextDirection } from './types';

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Default language for the application
 */
export const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Supported language codes
 */
export const SUPPORTED_LANGUAGES: Language[] = ['en', 'ar', 'ckb'];

/**
 * RTL (Right-to-Left) languages
 */
export const RTL_LANGUAGES: Language[] = ['ar', 'ckb'];

/**
 * Storage key for persisting language preference
 */
export const STORAGE_KEY = 'rh-language';

/**
 * Base URL for the website
 */
export const BASE_URL = 'https://realhouseiq.com';

// =============================================================================
// LANGUAGE METADATA
// =============================================================================

/**
 * Complete language information for all supported languages
 */
export const LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
    hreflang: 'en',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇮🇶',
    hreflang: 'ar',
  },
  {
    code: 'ckb',
    name: 'Kurdish (Sorani)',
    nativeName: 'کوردی',
    dir: 'rtl',
    flag: '🏴',
    hreflang: 'ku', // Using 'ku' for hreflang (standard Kurdish code)
  },
];

/**
 * Locale map for Intl APIs (number, date, currency formatting)
 */
export const LOCALE_MAP: Record<Language, string> = {
  en: 'en-US',
  ar: 'ar-IQ',
  ckb: 'ckb-IQ',
};

/**
 * Open Graph locale map for social media
 */
export const OG_LOCALE_MAP: Record<Language, string> = {
  en: 'en_US',
  ar: 'ar_IQ',
  ckb: 'ku_IQ',
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get language info by code
 */
export function getLanguageInfo(code: Language): LanguageInfo | undefined {
  return LANGUAGES.find((lang) => lang.code === code);
}

/**
 * Check if a language code is valid/supported
 */
export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

/**
 * Check if a language is RTL
 */
export function isRTLLanguage(lang: Language): boolean {
  return RTL_LANGUAGES.includes(lang);
}

/**
 * Get text direction for a language
 */
export function getTextDirection(lang: Language): TextDirection {
  return isRTLLanguage(lang) ? 'rtl' : 'ltr';
}

/**
 * Get locale string for Intl APIs
 */
export function getLocale(lang: Language): string {
  return LOCALE_MAP[lang] || LOCALE_MAP.en;
}

/**
 * Get Open Graph locale
 */
export function getOGLocale(lang: Language): string {
  return OG_LOCALE_MAP[lang] || OG_LOCALE_MAP.en;
}

/**
 * Get URL path prefix for a language
 * English has no prefix, other languages have their code as prefix
 */
export function getLanguagePathPrefix(lang: Language): string {
  return lang === 'en' ? '' : `/${lang}`;
}

/**
 * Build a localized URL path
 */
export function buildLocalizedPath(path: string, lang: Language): string {
  const prefix = getLanguagePathPrefix(lang);
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return prefix + cleanPath;
}

/**
 * Build a full localized URL
 */
export function buildLocalizedUrl(path: string, lang: Language): string {
  return BASE_URL + buildLocalizedPath(path, lang);
}

/**
 * Extract language from URL path
 */
export function getLanguageFromPath(path: string): Language {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLanguage(firstSegment)) {
    return firstSegment;
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Remove language prefix from path
 */
export function stripLanguagePrefix(path: string): string {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLanguage(firstSegment)) {
    return '/' + segments.slice(1).join('/') || '/';
  }

  return path;
}
