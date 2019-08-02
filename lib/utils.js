/*
HTML escaping is the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/
import * as React from 'react';
import { IntlMessageFormat } from 'intl-messageformat/core';
import memoizeIntlConstructor from 'intl-format-cache';
const invariant = require('invariant');
const ESCAPED_CHARS = {
    38: '&amp;',
    62: '&gt;',
    60: '&lt;',
    34: '&quot;',
    39: '&#x27;',
};
const UNSAFE_CHARS_REGEX = /[&><"']/g;
export function escape(str) {
    return ('' + str).replace(UNSAFE_CHARS_REGEX, match => ESCAPED_CHARS[match.charCodeAt(0)]);
}
export function filterProps(props, whitelist, defaults = {}) {
    return whitelist.reduce((filtered, name) => {
        if (props.hasOwnProperty(name)) {
            filtered[name] = props[name];
        }
        else if (defaults.hasOwnProperty(name)) {
            filtered[name] = defaults[name];
        }
        return filtered;
    }, {});
}
export function invariantIntlContext({ intl } = {}) {
    invariant(intl, '[React Intl] Could not find required `intl` object. ' +
        '<IntlProvider> needs to exist in the component ancestry.');
}
export function createError(message, exception) {
    const eMsg = exception ? `\n${exception}` : '';
    return `[React Intl] ${message}${eMsg}`;
}
export function defaultErrorHandler(error) {
    if (process.env.NODE_ENV !== 'production') {
        console.error(error);
    }
}
export const DEFAULT_INTL_CONFIG = {
    formats: {},
    messages: {},
    timeZone: undefined,
    textComponent: React.Fragment,
    defaultLocale: 'en',
    defaultFormats: {},
    onError: defaultErrorHandler,
};
export function createIntlCache() {
    return {
        dateTime: {},
        number: {},
        message: {},
        relativeTime: {},
        pluralRules: {},
    };
}
/**
 * Create intl formatters and populate cache
 * @param cache explicit cache to prevent leaking memory
 */
export function createFormatters(cache = createIntlCache()) {
    return {
        getDateTimeFormat: memoizeIntlConstructor(Intl.DateTimeFormat, cache.dateTime),
        getNumberFormat: memoizeIntlConstructor(Intl.NumberFormat, cache.number),
        getMessageFormat: memoizeIntlConstructor(IntlMessageFormat, cache.message),
        getRelativeTimeFormat: memoizeIntlConstructor(Intl.RelativeTimeFormat, cache.relativeTime),
        getPluralRules: memoizeIntlConstructor(Intl.PluralRules, cache.pluralRules),
    };
}
