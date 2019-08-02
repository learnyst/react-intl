import * as React from 'react';
import { IntlMessageFormat, Formats, PrimitiveType, FormatXMLElementFn } from 'intl-messageformat/core';
import IntlRelativeTimeFormat, { IntlRelativeTimeFormatOptions, FormattableUnit } from '@formatjs/intl-relativetimeformat';
import { MessageFormatElement } from 'intl-messageformat-parser';
export interface IntlConfig {
    locale: string;
    timeZone?: string;
    formats: CustomFormats;
    textComponent?: React.ComponentType | keyof React.ReactHTML;
    messages: Record<string, string> | Record<string, MessageFormatElement[]>;
    defaultLocale: string;
    defaultFormats: CustomFormats;
    onError(err: string): void;
}
export interface CustomFormats extends Partial<Formats> {
    relative?: Record<string, IntlRelativeTimeFormatOptions>;
}
export interface CustomFormatConfig {
    format?: string;
}
export declare type FormatDateOptions = Exclude<Intl.DateTimeFormatOptions, 'localeMatcher'> & CustomFormatConfig;
export declare type FormatNumberOptions = Exclude<Intl.NumberFormatOptions, 'localeMatcher'> & CustomFormatConfig;
export declare type FormatRelativeTimeOptions = Exclude<IntlRelativeTimeFormatOptions, 'localeMatcher'> & CustomFormatConfig;
export declare type FormatPluralOptions = Exclude<Intl.PluralRulesOptions, 'localeMatcher'> & CustomFormatConfig;
export interface IntlFormatters {
    formatDate(value: string | number | Date, opts: FormatDateOptions): string;
    formatTime(value: string | number | Date, opts: FormatDateOptions): string;
    formatRelativeTime(value: number, unit?: FormattableUnit, opts?: FormatRelativeTimeOptions): string;
    formatNumber(value: number, opts: FormatNumberOptions): string;
    formatPlural(value: number, opts: FormatPluralOptions): ReturnType<Intl.PluralRules['select']>;
    formatMessage(descriptor: MessageDescriptor, values?: Record<string, PrimitiveType>): string;
    formatMessage(descriptor: MessageDescriptor, values?: Record<string, PrimitiveType | React.ReactElement | FormatXMLElementFn>): string | React.ReactNodeArray;
    formatHTMLMessage(descriptor: MessageDescriptor, values?: Record<string, PrimitiveType>): string;
}
export interface Formatters {
    getDateTimeFormat(...args: ConstructorParameters<typeof Intl.DateTimeFormat>): Intl.DateTimeFormat;
    getNumberFormat(...args: ConstructorParameters<typeof Intl.NumberFormat>): Intl.NumberFormat;
    getMessageFormat(...args: ConstructorParameters<typeof IntlMessageFormat>): IntlMessageFormat;
    getRelativeTimeFormat(...args: ConstructorParameters<typeof IntlRelativeTimeFormat>): IntlRelativeTimeFormat;
    getPluralRules(...args: ConstructorParameters<typeof Intl.PluralRules>): Intl.PluralRules;
}
export interface IntlShape extends IntlConfig, IntlFormatters {
    formatters: Formatters;
}
export interface IntlCache {
    dateTime: Record<string, Intl.DateTimeFormat>;
    number: Record<string, Intl.NumberFormat>;
    message: Record<string, IntlMessageFormat>;
    relativeTime: Record<string, IntlRelativeTimeFormat>;
    pluralRules: Record<string, Intl.PluralRules>;
}
export interface MessageDescriptor {
    id: string;
    description?: string | object;
    defaultMessage?: string;
}
export declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
