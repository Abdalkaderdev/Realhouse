// =============================================================================
// i18n Utility Functions - Real House Multi-language Support
// =============================================================================

import {
  translations,
  RTL_LANGUAGES,
  LANGUAGES,
  getLanguageInfo,
  type Language,
  type TranslationStrings,
  type LanguageInfo,
} from './translations';

// Re-export types and constants
export {
  translations,
  RTL_LANGUAGES,
  LANGUAGES,
  getLanguageInfo,
  type Language,
  type TranslationStrings,
  type LanguageInfo,
};

// =============================================================================
// CONSTANTS
// =============================================================================

const STORAGE_KEY = 'rh-language';
const DEFAULT_LANGUAGE: Language = 'en';
const SUPPORTED_LANGUAGES: Language[] = ['en', 'ar', 'ckb'];

// =============================================================================
// LANGUAGE DETECTION & MANAGEMENT
// =============================================================================

/**
 * Get the current language from localStorage or browser settings
 * Priority: localStorage > browser language > default
 */
export function getCurrentLanguage(): Language {
  // 1. Check localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && isValidLanguage(stored)) {
    return stored as Language;
  }

  // 2. Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (isValidLanguage(browserLang)) {
    return browserLang as Language;
  }

  // 3. Check for Kurdish variants
  if (navigator.language.toLowerCase().startsWith('ku') ||
      navigator.language.toLowerCase().startsWith('ckb')) {
    return 'ckb';
  }

  // 4. Default to English
  return DEFAULT_LANGUAGE;
}

/**
 * Set the current language and save to localStorage
 * Also updates the HTML dir and lang attributes
 */
export function setLanguage(lang: Language): void {
  if (!isValidLanguage(lang)) {
    console.warn(`Invalid language: ${lang}. Falling back to ${DEFAULT_LANGUAGE}`);
    lang = DEFAULT_LANGUAGE;
  }

  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, lang);

  // Update HTML attributes
  updateDocumentLanguage(lang);

  // Dispatch custom event for components to react
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
}

/**
 * Check if a language code is valid/supported
 */
export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

/**
 * Check if the current language is RTL
 */
export function isRTL(lang?: Language): boolean {
  const currentLang = lang || getCurrentLanguage();
  return RTL_LANGUAGES.includes(currentLang);
}

/**
 * Get text direction for current language
 */
export function getTextDirection(lang?: Language): 'ltr' | 'rtl' {
  return isRTL(lang) ? 'rtl' : 'ltr';
}

// =============================================================================
// TRANSLATION FUNCTION
// =============================================================================

/**
 * Get a translation string by dot-notation key
 * Example: t('nav.home') -> 'Home' (in English)
 *
 * @param key - Dot-notation key (e.g., 'nav.home', 'buttons.submit')
 * @param lang - Optional language override
 * @returns Translated string or the key if not found
 */
export function t(key: string, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  const translationSet = translations[currentLang];

  if (!translationSet) {
    console.warn(`Translation set not found for language: ${currentLang}`);
    return key;
  }

  // Parse dot notation key
  const keys = key.split('.');
  let result: unknown = translationSet;

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      // Key not found - try fallback to English
      if (currentLang !== 'en') {
        return t(key, 'en');
      }
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  if (typeof result === 'string') {
    return result;
  }

  console.warn(`Translation key "${key}" did not resolve to a string`);
  return key;
}

/**
 * Get all translations for the current language
 */
export function getTranslations(lang?: Language): TranslationStrings {
  const currentLang = lang || getCurrentLanguage();
  return translations[currentLang] || translations.en;
}

// =============================================================================
// DOCUMENT & DOM HELPERS
// =============================================================================

/**
 * Update document language and direction attributes
 */
export function updateDocumentLanguage(lang: Language): void {
  const html = document.documentElement;
  const langInfo = getLanguageInfo(lang);

  // Set lang attribute
  html.setAttribute('lang', lang);

  // Set dir attribute for RTL support
  html.setAttribute('dir', isRTL(lang) ? 'rtl' : 'ltr');

  // Update meta tag
  const metaLang = document.querySelector('meta[name="language"]');
  if (metaLang) {
    metaLang.setAttribute('content', langInfo?.name || 'English');
  }

  // Update og:locale
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    const localeMap: Record<Language, string> = {
      en: 'en_US',
      ar: 'ar_IQ',
      ckb: 'ku_IQ',
    };
    ogLocale.setAttribute('content', localeMap[lang]);
  }

  // Add RTL class for styling if needed
  if (isRTL(lang)) {
    html.classList.add('rtl');
    html.classList.remove('ltr');
  } else {
    html.classList.add('ltr');
    html.classList.remove('rtl');
  }
}

/**
 * Update hreflang meta tags for SEO
 */
export function updateHreflangTags(currentPath: string): void {
  const baseUrl = 'https://realhouseiq.com';

  // Remove existing hreflang tags (except x-default)
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => {
    if (el.getAttribute('hreflang') !== 'x-default') {
      el.remove();
    }
  });

  // Add hreflang tags for each language
  LANGUAGES.forEach(lang => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', lang.hreflang);

    // Construct URL based on language
    const path = currentPath === '/' ? '' : currentPath;
    const url = lang.code === 'en'
      ? `${baseUrl}${path}`
      : `${baseUrl}/${lang.code}${path}`;

    link.setAttribute('href', url);
    document.head.appendChild(link);
  });

  // Update x-default to point to English version
  const xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
  const defaultPath = currentPath === '/' ? '' : currentPath;
  if (xDefault) {
    xDefault.setAttribute('href', `${baseUrl}${defaultPath}`);
  } else {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', 'x-default');
    link.setAttribute('href', `${baseUrl}${defaultPath}`);
    document.head.appendChild(link);
  }
}

// =============================================================================
// LANGUAGE SELECTOR COMPONENT
// =============================================================================

/**
 * Create the current language button element
 */
function createCurrentButton(langInfo: LanguageInfo | undefined, langCode: Language): HTMLButtonElement {
  const currentBtn = document.createElement('button');
  currentBtn.className = 'language-selector__current';
  currentBtn.setAttribute('type', 'button');
  currentBtn.setAttribute('aria-haspopup', 'listbox');
  currentBtn.setAttribute('aria-expanded', 'false');
  currentBtn.setAttribute('aria-label', `${t('a11y.currentLanguage')}: ${langInfo?.nativeName || langCode}`);

  // Create flag span
  const flagSpan = document.createElement('span');
  flagSpan.className = 'language-selector__flag';
  flagSpan.setAttribute('aria-hidden', 'true');
  flagSpan.textContent = langInfo?.flag || '';

  // Create code span
  const codeSpan = document.createElement('span');
  codeSpan.className = 'language-selector__code';
  codeSpan.textContent = langCode.toUpperCase();

  // Create chevron SVG
  const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  chevron.setAttribute('class', 'language-selector__chevron');
  chevron.setAttribute('viewBox', '0 0 24 24');
  chevron.setAttribute('fill', 'none');
  chevron.setAttribute('stroke', 'currentColor');
  chevron.setAttribute('stroke-width', '2');
  chevron.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M6 9l6 6 6-6');
  chevron.appendChild(path);

  currentBtn.appendChild(flagSpan);
  currentBtn.appendChild(codeSpan);
  currentBtn.appendChild(chevron);

  return currentBtn;
}

/**
 * Update the current button content
 */
function updateCurrentButton(button: HTMLButtonElement, langInfo: LanguageInfo | undefined, langCode: Language): void {
  const flagSpan = button.querySelector('.language-selector__flag');
  const codeSpan = button.querySelector('.language-selector__code');

  if (flagSpan) {
    flagSpan.textContent = langInfo?.flag || '';
  }
  if (codeSpan) {
    codeSpan.textContent = langCode.toUpperCase();
  }

  button.setAttribute('aria-label', `${t('a11y.currentLanguage')}: ${langInfo?.nativeName || langCode}`);
}

/**
 * Create and render the language selector component
 * @param containerId - ID of the container element (optional, will create if not provided)
 * @returns The language selector element
 */
export function createLanguageSelector(containerId?: string): HTMLElement {
  const currentLang = getCurrentLanguage();
  const currentLangInfo = getLanguageInfo(currentLang);

  // Create container
  const selector = document.createElement('div');
  selector.className = 'language-selector';
  selector.setAttribute('role', 'listbox');
  selector.setAttribute('aria-label', t('a11y.selectLanguage'));

  // Create current language button
  const currentBtn = createCurrentButton(currentLangInfo, currentLang);

  // Create dropdown
  const dropdown = document.createElement('ul');
  dropdown.className = 'language-selector__dropdown';
  dropdown.setAttribute('role', 'listbox');
  dropdown.setAttribute('aria-hidden', 'true');
  dropdown.setAttribute('tabindex', '-1');

  // State for dropdown
  let isOpen = false;

  function closeDropdown() {
    isOpen = false;
    currentBtn.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
    selector.classList.remove('language-selector--open');
  }

  function openDropdown() {
    isOpen = true;
    currentBtn.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
    selector.classList.add('language-selector--open');
  }

  function toggleDropdown() {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  // Populate dropdown with languages
  LANGUAGES.forEach(lang => {
    const item = document.createElement('li');
    item.className = `language-selector__option${lang.code === currentLang ? ' language-selector__option--active' : ''}`;
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', String(lang.code === currentLang));
    item.setAttribute('data-lang', lang.code);
    item.setAttribute('tabindex', '0');

    // Create flag span
    const flagSpan = document.createElement('span');
    flagSpan.className = 'language-selector__flag';
    flagSpan.setAttribute('aria-hidden', 'true');
    flagSpan.textContent = lang.flag;

    // Create name span
    const nameSpan = document.createElement('span');
    nameSpan.className = 'language-selector__name';
    nameSpan.textContent = lang.nativeName;

    item.appendChild(flagSpan);
    item.appendChild(nameSpan);

    // Click handler
    item.addEventListener('click', () => {
      setLanguage(lang.code);
      closeDropdown();
      updateCurrentButton(currentBtn, lang, lang.code);
      // Reload the page to apply translations (for now - can be enhanced later)
      window.location.reload();
    });

    // Keyboard handler
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });

    dropdown.appendChild(item);
  });

  selector.appendChild(currentBtn);
  selector.appendChild(dropdown);

  currentBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!selector.contains(e.target as Node)) {
      closeDropdown();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeDropdown();
      currentBtn.focus();
    }
  });

  // If container ID provided, append to it
  if (containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.appendChild(selector);
    }
  }

  return selector;
}

/**
 * Initialize the language selector in the navigation
 */
export function initLanguageSelector(): void {
  // Look for a placeholder in the nav actions
  const navActions = document.querySelector('.nav__actions');
  if (navActions) {
    // Insert before the theme toggle
    const themeToggle = navActions.querySelector('#theme-toggle');
    const selector = createLanguageSelector();

    if (themeToggle) {
      navActions.insertBefore(selector, themeToggle);
    } else {
      navActions.insertBefore(selector, navActions.firstChild);
    }
  }

  // Also add to mobile menu
  const mobileMenu = document.querySelector('.mobile-menu__nav');
  if (mobileMenu) {
    const mobileSelector = createLanguageSelector();
    mobileSelector.classList.add('language-selector--mobile');
    mobileMenu.appendChild(mobileSelector);
  }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize i18n system
 * - Sets up document language attributes
 * - Initializes language selector
 * - Sets up event listeners
 */
export function initI18n(): void {
  const currentLang = getCurrentLanguage();

  // Update document attributes
  updateDocumentLanguage(currentLang);

  // Update hreflang tags
  updateHreflangTags(window.location.pathname);

  // Language selector hidden - site is currently English-only
  // initLanguageSelector();

  // Listen for route changes to update hreflang tags
  window.addEventListener('popstate', () => {
    updateHreflangTags(window.location.pathname);
  });

  // Listen for custom navigation events
  document.addEventListener('navigation', ((e: CustomEvent) => {
    if (e.detail?.path) {
      updateHreflangTags(e.detail.path);
    }
  }) as EventListener);

  console.log(`[i18n] Initialized with language: ${currentLang}, direction: ${getTextDirection()}`);
}

// =============================================================================
// HELPER UTILITIES
// =============================================================================

/**
 * Format a number according to the current locale
 */
export function formatNumber(num: number, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  const localeMap: Record<Language, string> = {
    en: 'en-US',
    ar: 'ar-IQ',
    ckb: 'ckb-IQ',
  };

  return new Intl.NumberFormat(localeMap[currentLang]).format(num);
}

/**
 * Format a price according to the current locale
 */
export function formatPrice(price: number, currency = 'USD', lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  const localeMap: Record<Language, string> = {
    en: 'en-US',
    ar: 'ar-IQ',
    ckb: 'ckb-IQ',
  };

  return new Intl.NumberFormat(localeMap[currentLang], {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format a date according to the current locale
 */
export function formatDate(date: Date | string, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  const localeMap: Record<Language, string> = {
    en: 'en-US',
    ar: 'ar-IQ',
    ckb: 'ckb-IQ',
  };

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(localeMap[currentLang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Get the opposite text direction for bidirectional content
 */
export function getOppositeDirection(lang?: Language): 'ltr' | 'rtl' {
  return isRTL(lang) ? 'ltr' : 'rtl';
}

// =============================================================================
// AUTO-INITIALIZE ON LOAD (Optional - can be called manually)
// =============================================================================

// Uncomment to auto-initialize when script loads
// if (typeof window !== 'undefined') {
//   window.addEventListener('DOMContentLoaded', initI18n);
// }
