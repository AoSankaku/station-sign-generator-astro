import { LOCALES_SETTING, DEFAULT_LOCALE_SETTING } from '../locales';

// Dynamically import YAML files for each locale in LOCALES_SETTING
const translations: Record<string, any> = {};

for (const locale of Object.keys(LOCALES_SETTING)) {
  try {
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
 */
export function useTranslator(locale: Locale) {
  return (key: string) => t(locale, key);
}

/**
 * Get the default translator based on DEFAULT_LOCALE_SETTING
 */
export const tDefault = useTranslator(DEFAULT_LOCALE_SETTING as Locale);

/**
 * NEW: Returns an object with all locales for a given key.
 * Example:
 *   tAll("greeting") =>
 *     { en: "Hello", ja: "こんにちは", ... }
 */
export function tAll(key: string): Record<Locale, string> {
  const result = {} as Record<Locale, string>;
  for (const locale of Object.keys(translations) as Locale[]) {
    result[locale] = t(locale, key);
  }
  return result;
}
