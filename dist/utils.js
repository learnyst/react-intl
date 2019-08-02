"use strict";
/*
HTML escaping is the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("intl-messageformat/core");
var intl_format_cache_1 = require("intl-format-cache");
var invariant = require('invariant');
var ESCAPED_CHARS = {
    38: '&amp;',
    62: '&gt;',
    60: '&lt;',
    34: '&quot;',
    39: '&#x27;',
};
var UNSAFE_CHARS_REGEX = /[&><"']/g;
function escape(str) {
    return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) { return ESCAPED_CHARS[match.charCodeAt(0)]; });
}
exports.escape = escape;
function filterProps(props, whitelist, defaults) {
    if (defaults === void 0) { defaults = {}; }
    return whitelist.reduce(function (filtered, name) {
        if (props.hasOwnProperty(name)) {
            filtered[name] = props[name];
        }
        else if (defaults.hasOwnProperty(name)) {
            filtered[name] = defaults[name];
        }
        return filtered;
    }, {});
}
exports.filterProps = filterProps;
function invariantIntlContext(_a) {
    var intl = (_a === void 0 ? {} : _a).intl;
    invariant(intl, '[React Intl] Could not find required `intl` object. ' +
        '<IntlProvider> needs to exist in the component ancestry.');
}
exports.invariantIntlContext = invariantIntlContext;
function createError(message, exception) {
    var eMsg = exception ? "\n" + exception : '';
    return "[React Intl] " + message + eMsg;
}
exports.createError = createError;
function defaultErrorHandler(error) {
    if (process.env.NODE_ENV !== 'production') {
        console.error(error);
    }
}
exports.defaultErrorHandler = defaultErrorHandler;
exports.DEFAULT_INTL_CONFIG = {
    formats: {},
    messages: {},
    timeZone: undefined,
    textComponent: React.Fragment,
    defaultLocale: 'en',
    defaultFormats: {},
    onError: defaultErrorHandler,
};
function createIntlCache() {
    return {
        dateTime: {},
        number: {},
        message: {},
        relativeTime: {},
        pluralRules: {},
    };
}
exports.createIntlCache = createIntlCache;
/**
 * Create intl formatters and populate cache
 * @param cache explicit cache to prevent leaking memory
 */
function createFormatters(cache) {
    if (cache === void 0) { cache = createIntlCache(); }
    return {
        getDateTimeFormat: intl_format_cache_1.default(Intl.DateTimeFormat, cache.dateTime),
        getNumberFormat: intl_format_cache_1.default(Intl.NumberFormat, cache.number),
        getMessageFormat: intl_format_cache_1.default(core_1.IntlMessageFormat, cache.message),
        getRelativeTimeFormat: intl_format_cache_1.default(Intl.RelativeTimeFormat, cache.relativeTime),
        getPluralRules: intl_format_cache_1.default(Intl.PluralRules, cache.pluralRules),
    };
}
exports.createFormatters = createFormatters;
