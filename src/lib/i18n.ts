import { LOCALES_SETTING, DEFAULT_LOCALE_SETTING } from '../locales';

// Dynamically import YAML files for each locale in LOCALES_SETTING
// Assumes you have files like: src/locales/en.yml, src/locales/ja.yml, etc.
const translations: Record<string, any> = {};

for (const locale of Object.keys(LOCALES_SETTING)) {
  try {
    // Vite will bundle only matching files
    translations[locale] = (await import(`../locales/${locale}.yml`)).default;
  } catch (err) {
    console.warn(`[i18n] Missing translation file for locale "${locale}"`);
    translations[locale] = {};
  }
}

type Locale = keyof typeof translations;

/**
 * Base translator: looks up a key in the given locale.
 */
export function t(locale: Locale, key: string): string {
  const parts = key.split('.');
  return parts.reduce<unknown>((obj, part) => {
    if (typeof obj === 'object' && obj !== null && part in obj) {
      return (obj as Record<string, unknown>)[part];
    }
    return undefined;
  }, translations[locale]) as string;
}

/**
 * Creates a translator bound to a specific locale.
 * Example: const t = useTranslator('en'); t('greeting');
 */
export function useTranslator(locale: Locale) {
  return (key: string) => t(locale, key);
}

/**
 * Get the default translator based on DEFAULT_LOCALE_SETTING
 */
export const tDefault = useTranslator(DEFAULT_LOCALE_SETTING as Locale);
