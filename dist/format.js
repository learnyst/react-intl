"use strict";
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var invariant = require('invariant');
var utils_1 = require("./utils");
var intl_messageformat_parser_1 = require("intl-messageformat-parser");
var DATE_TIME_FORMAT_OPTIONS = [
    'localeMatcher',
    'formatMatcher',
    'timeZone',
    'hour12',
    'weekday',
    'era',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'timeZoneName',
];
var NUMBER_FORMAT_OPTIONS = [
    'localeMatcher',
    'style',
    'currency',
    'currencyDisplay',
    'useGrouping',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
];
var RELATIVE_FORMAT_OPTIONS = [
    'numeric',
    'style',
];
var PLURAL_FORMAT_OPTIONS = [
    'localeMatcher',
    'type',
];
function getNamedFormat(formats, type, name, onError) {
    var formatType = formats && formats[type];
    var format;
    if (formatType) {
        format = formatType[name];
    }
    if (format) {
        return format;
    }
    onError(utils_1.createError("No " + type + " format named: " + name));
}
/**
 * Escape a raw msg when we run in prod mode
 * https://github.com/formatjs/formatjs/blob/master/packages/intl-messageformat-parser/src/parser.pegjs#L155
 */
function escapeUnformattedMessage(msg) {
    return msg.replace(/'\{(.*?)\}'/g, "{$1}");
}
function formatDate(_a, state, value, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError, timeZone = _a.timeZone;
    if (options === void 0) { options = {}; }
    var format = options.format;
    var date = new Date(value);
    var defaults = __assign({}, (timeZone && { timeZone: timeZone }), (format && getNamedFormat(formats, 'date', format, onError)));
    var filteredOptions = utils_1.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
    try {
        return state.getDateTimeFormat(locale, filteredOptions).format(date);
    }
    catch (e) {
        onError(utils_1.createError('Error formatting date.', e));
    }
    return String(date);
}
exports.formatDate = formatDate;
function formatTime(_a, state, value, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError, timeZone = _a.timeZone;
    if (options === void 0) { options = {}; }
    var format = options.format;
    var date = new Date(value);
    var defaults = __assign({}, (timeZone && { timeZone: timeZone }), (format && getNamedFormat(formats, 'time', format, onError)));
    var filteredOptions = utils_1.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
    if (!filteredOptions.hour &&
        !filteredOptions.minute &&
        !filteredOptions.second) {
        // Add default formatting options if hour, minute, or second isn't defined.
        filteredOptions = __assign({}, filteredOptions, { hour: 'numeric', minute: 'numeric' });
    }
    try {
        return state.getDateTimeFormat(locale, filteredOptions).format(date);
    }
    catch (e) {
        onError(utils_1.createError('Error formatting time.', e));
    }
    return String(date);
}
exports.formatTime = formatTime;
function formatRelativeTime(_a, state, value, unit, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError;
    if (unit === void 0) { unit = 'second'; }
    if (options === void 0) { options = {}; }
    var format = options.format;
    var defaults = (!!format && getNamedFormat(formats, 'relative', format, onError)) || {};
    var filteredOptions = utils_1.filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults);
    try {
        return state
            .getRelativeTimeFormat(locale, filteredOptions)
            .format(value, unit);
    }
    catch (e) {
        onError(utils_1.createError('Error formatting relative time.', e));
    }
    return String(value);
}
exports.formatRelativeTime = formatRelativeTime;
function formatNumber(_a, state, value, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError;
    if (options === void 0) { options = {}; }
    var format = options.format;
    var defaults = (format && getNamedFormat(formats, 'number', format, onError)) || {};
    var filteredOptions = utils_1.filterProps(options, NUMBER_FORMAT_OPTIONS, defaults);
    try {
        return state.getNumberFormat(locale, filteredOptions).format(value);
    }
    catch (e) {
        onError(utils_1.createError('Error formatting number.', e));
    }
    return String(value);
}
exports.formatNumber = formatNumber;
function formatPlural(_a, state, value, options) {
    var locale = _a.locale, onError = _a.onError;
    if (options === void 0) { options = {}; }
    var filteredOptions = utils_1.filterProps(options, PLURAL_FORMAT_OPTIONS);
    try {
        return state.getPluralRules(locale, filteredOptions).select(value);
    }
    catch (e) {
        onError(utils_1.createError('Error formatting plural.', e));
    }
    return 'other';
}
exports.formatPlural = formatPlural;
function formatMessage(_a, state, messageDescriptor, values) {
    var locale = _a.locale, formats = _a.formats, messages = _a.messages, defaultLocale = _a.defaultLocale, defaultFormats = _a.defaultFormats, onError = _a.onError;
    if (messageDescriptor === void 0) { messageDescriptor = { id: '' }; }
    if (values === void 0) { values = {}; }
    var id = messageDescriptor.id, defaultMessage = messageDescriptor.defaultMessage;
    // `id` is a required field of a Message Descriptor.
    invariant(id, '[React Intl] An `id` must be provided to format a message.');
    var message = messages && messages[id];
    var hasValues = Object.keys(values).length > 0;
    // Avoid expensive message formatting for simple messages without values. In
    // development messages will always be formatted in case of missing values.
    if (!hasValues && process.env.NODE_ENV === 'production') {
        var val = message || defaultMessage || id;
        if (typeof val === 'string') {
            return escapeUnformattedMessage(val);
        }
        invariant(val.length === 1 && val[0].type === intl_messageformat_parser_1.TYPE.literal, 'Message has placeholders but no values was provided');
        return val[0].value;
    }
    var formattedMessageParts = [];
    if (message) {
        try {
            var formatter = state.getMessageFormat(message, locale, formats, {
                formatters: state,
            });
            formattedMessageParts = formatter.formatXMLMessage(values);
        }
        catch (e) {
            onError(utils_1.createError("Error formatting message: \"" + id + "\" for locale: \"" + locale + "\"" +
                (defaultMessage ? ', using default message as fallback.' : ''), e));
        }
    }
    else {
        // This prevents warnings from littering the console in development
        // when no `messages` are passed into the <IntlProvider> for the
        // default locale, and a default message is in the source.
        if (!defaultMessage ||
            (locale && locale.toLowerCase() !== defaultLocale.toLowerCase())) {
            onError(utils_1.createError("Missing message: \"" + id + "\" for locale: \"" + locale + "\"" +
                (defaultMessage ? ', using default message as fallback.' : '')));
        }
    }
    if (!formattedMessageParts.length && defaultMessage) {
        try {
            var formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);
            formattedMessageParts = formatter.formatXMLMessage(values);
        }
        catch (e) {
            onError(utils_1.createError("Error formatting the default message for: \"" + id + "\"", e));
        }
    }
    if (!formattedMessageParts.length) {
        onError(utils_1.createError("Cannot format message: \"" + id + "\", " +
            ("using message " + (message || defaultMessage ? 'source' : 'id') + " as fallback.")));
        if (typeof message === 'string') {
            return message || defaultMessage || id;
        }
        return defaultMessage || id;
    }
    if (formattedMessageParts.length === 1 &&
        typeof formattedMessageParts[0] === 'string') {
        return formattedMessageParts[0] || defaultMessage || id;
    }
    return formattedMessageParts;
}
exports.formatMessage = formatMessage;
function formatHTMLMessage(config, state, messageDescriptor, rawValues) {
    if (messageDescriptor === void 0) { messageDescriptor = { id: '' }; }
    if (rawValues === void 0) { rawValues = {}; }
    // Process all the values before they are used when formatting the ICU
    // Message string. Since the formatted message might be injected via
    // `innerHTML`, all String-based values need to be HTML-escaped.
    var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
        var value = rawValues[name];
        escaped[name] = typeof value === 'string' ? utils_1.escape(value) : value;
        return escaped;
    }, {});
    return formatMessage(config, state, messageDescriptor, escapedValues);
}
exports.formatHTMLMessage = formatHTMLMessage;
exports.formatters = {
    formatNumber: formatNumber,
    formatDate: formatDate,
    formatTime: formatTime,
    formatMessage: formatMessage,
    formatPlural: formatPlural,
    formatHTMLMessage: formatHTMLMessage,
    formatRelativeTime: formatRelativeTime,
};
