import { Formatters, IntlConfig, FormatDateOptions, FormatRelativeTimeOptions, FormatNumberOptions, FormatPluralOptions, MessageDescriptor } from './types';
import { FormattableUnit } from '@formatjs/intl-relativetimeformat';
import { PrimitiveType } from 'intl-messageformat/core';
export declare function formatDate({ locale, formats, onError, timeZone, }: Pick<IntlConfig, 'locale' | 'formats' | 'onError' | 'timeZone'>, state: Formatters, value: number | Date, options?: FormatDateOptions): string;
export declare function formatTime({ locale, formats, onError, timeZone, }: Pick<IntlConfig, 'locale' | 'formats' | 'onError' | 'timeZone'>, state: Formatters, value: number, options?: FormatDateOptions): string;
export declare function formatRelativeTime({ locale, formats, onError, }: Pick<IntlConfig, 'locale' | 'formats' | 'onError'>, state: Formatters, value: number, unit?: FormattableUnit, options?: FormatRelativeTimeOptions): string;
export declare function formatNumber({ locale, formats, onError, }: Pick<IntlConfig, 'locale' | 'formats' | 'onError'>, state: Formatters, value: number, options?: FormatNumberOptions): string;
export declare function formatPlural({ locale, onError }: Pick<IntlConfig, 'locale' | 'onError'>, state: Formatters, value: number, options?: FormatPluralOptions): string;
export declare function formatMessage({ locale, formats, messages, defaultLocale, defaultFormats, onError, }: Pick<IntlConfig, 'locale' | 'formats' | 'messages' | 'defaultLocale' | 'defaultFormats' | 'onError'>, state: Formatters, messageDescriptor?: MessageDescriptor, values?: Record<string, PrimitiveType>): string;
export declare function formatHTMLMessage(config: Pick<IntlConfig, 'locale' | 'formats' | 'messages' | 'defaultLocale' | 'defaultFormats' | 'onError'>, state: Formatters, messageDescriptor?: MessageDescriptor, rawValues?: Record<string, PrimitiveType>): string;
export declare const formatters: {
    formatNumber: typeof formatNumber;
    formatDate: typeof formatDate;
    formatTime: typeof formatTime;
    formatMessage: typeof formatMessage;
    formatPlural: typeof formatPlural;
    formatHTMLMessage: typeof formatHTMLMessage;
    formatRelativeTime: typeof formatRelativeTime;
};
