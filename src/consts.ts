// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Multilingual } from "@/i18n";
import { tAll } from "@/lib/i18n";

export const SITE_TITLE: string | Multilingual = tAll("meta.title");

export const SITE_DESCRIPTION: string | Multilingual = tAll("meta.description");

export const X_ACCOUNT: string | Multilingual = "@psephopaiktes";

export const NOT_TRANSLATED_CAUTION: string | Multilingual = tAll("error.not-translated");
