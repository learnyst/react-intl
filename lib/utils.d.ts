import { IntlConfig, IntlCache } from './types';
import IntlRelativeTimeFormat from '@formatjs/intl-relativetimeformat';
declare global {
    namespace Intl {
        const RelativeTimeFormat: typeof IntlRelativeTimeFormat;
    }
}
export declare function escape(str: string): string;
export declare function filterProps<T extends Record<string, any>, K extends string>(props: T, whitelist: Array<K>, defaults?: Partial<T>): Pick<T, K>;
export declare function invariantIntlContext({ intl }?: {
    intl?: any;
}): void;
export declare function createError(message: string, exception?: Error): string;
export declare function defaultErrorHandler(error: string): void;
export declare const DEFAULT_INTL_CONFIG: Pick<IntlConfig, 'formats' | 'messages' | 'timeZone' | 'textComponent' | 'defaultLocale' | 'defaultFormats' | 'onError'>;
export declare function createIntlCache(): IntlCache;
/**
 * Create intl formatters and populate cache
 * @param cache explicit cache to prevent leaking memory
 */
export declare function createFormatters(cache?: IntlCache): {
    getDateTimeFormat: (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined) => any;
    getNumberFormat: (locales?: string | string[] | undefined, options?: Intl.NumberFormatOptions | undefined) => any;
    getMessageFormat: (message: string | import("intl-messageformat-parser").MessageFormatElement[], locales?: string | string[] | undefined, overrideFormats?: Partial<import("intl-messageformat/core").Formats> | undefined, opts?: import("intl-messageformat/core").Options | undefined) => any;
    getRelativeTimeFormat: (__0_0: string | string[] | undefined, __0_1: import("@formatjs/intl-relativetimeformat").IntlRelativeTimeFormatOptions | undefined) => any;
    getPluralRules: (locales?: string | string[] | undefined, options?: Intl.PluralRulesOptions | undefined) => any;
};
