// =============================================================================
// CORE TRANSLATIONS INDEX
// Aggregates all core UI translations
// =============================================================================

import type { Language } from '../../types';
import type { CoreTranslations } from '../../types';
import { en } from './en';
import { ar } from './ar';
import { ckb } from './ckb';

/**
 * Core translations map - always loaded
 */
export const coreTranslations: Record<Language, CoreTranslations> = {
  en,
  ar,
  ckb,
};

/**
 * Get core translations for a language
 */
export function getCoreTranslations(lang: Language): CoreTranslations {
  return coreTranslations[lang] || coreTranslations.en;
}

// Re-export individual language modules
export { en, ar, ckb };
