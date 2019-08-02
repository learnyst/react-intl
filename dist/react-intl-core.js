/*
 * Copyright 2019, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = global || self, factory(global.ReactIntl = {}, global.React));
}(this, function (exports, React) { 'use strict';

    function defineMessages(messageDescriptors) {
        // This simply returns what's passed-in because it's meant to be a hook for
        // babel-plugin-react-intl.
        return messageDescriptors;
    }

    var TYPE;
    (function (TYPE) {
        /**
         * Raw text
         */
        TYPE[TYPE["literal"] = 0] = "literal";
        /**
         * Variable w/o any format, e.g `var` in `this is a {var}`
         */
        TYPE[TYPE["argument"] = 1] = "argument";
        /**
         * Variable w/ number format
         */
        TYPE[TYPE["number"] = 2] = "number";
        /**
         * Variable w/ date format
         */
        TYPE[TYPE["date"] = 3] = "date";
        /**
         * Variable w/ time format
         */
        TYPE[TYPE["time"] = 4] = "time";
        /**
         * Variable w/ select format
         */
        TYPE[TYPE["select"] = 5] = "select";
        /**
         * Variable w/ plural format
         */
        TYPE[TYPE["plural"] = 6] = "plural";
    })(TYPE || (TYPE = {}));
    /**
     * Type Guards
     */
    function isLiteralElement(el) {
        return el.type === TYPE.literal;
    }
    function isArgumentElement(el) {
        return el.type === TYPE.argument;
    }
    function isNumberElement(el) {
        return el.type === TYPE.number;
    }
    function isDateElement(el) {
        return el.type === TYPE.date;
    }
    function isTimeElement(el) {
        return el.type === TYPE.time;
    }
    function isSelectElement(el) {
        return el.type === TYPE.select;
    }
    function isPluralElement(el) {
        return el.type === TYPE.plural;
    }

    // tslint:disable:only-arrow-functions
    // tslint:disable:object-literal-shorthand
    // tslint:disable:trailing-comma
    // tslint:disable:object-literal-sort-keys
    // tslint:disable:one-variable-per-declaration
    // tslint:disable:max-line-length
    // tslint:disable:no-consecutive-blank-lines
    // tslint:disable:align
    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function (t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var SyntaxError = /** @class */ (function (_super) {
        __extends(SyntaxError, _super);
        function SyntaxError(message, expected, found, location) {
            var _this = _super.call(this) || this;
            _this.message = message;
            _this.expected = expected;
            _this.found = found;
            _this.location = location;
            _this.name = "SyntaxError";
            if (typeof Error.captureStackTrace === "function") {
                Error.captureStackTrace(_this, SyntaxError);
            }
            return _this;
        }
        SyntaxError.buildMessage = function (expected, found) {
            function hex(ch) {
                return ch.charCodeAt(0).toString(16).toUpperCase();
            }
            function literalEscape(s) {
                return s
                    .replace(/\\/g, "\\\\")
                    .replace(/"/g, "\\\"")
                    .replace(/\0/g, "\\0")
                    .replace(/\t/g, "\\t")
                    .replace(/\n/g, "\\n")
                    .replace(/\r/g, "\\r")
                    .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                    .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
            }
            function classEscape(s) {
                return s
                    .replace(/\\/g, "\\\\")
                    .replace(/\]/g, "\\]")
                    .replace(/\^/g, "\\^")
                    .replace(/-/g, "\\-")
                    .replace(/\0/g, "\\0")
                    .replace(/\t/g, "\\t")
                    .replace(/\n/g, "\\n")
                    .replace(/\r/g, "\\r")
                    .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                    .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
            }
            function describeExpectation(expectation) {
                switch (expectation.type) {
                    case "literal":
                        return "\"" + literalEscape(expectation.text) + "\"";
                    case "class":
                        var escapedParts = expectation.parts.map(function (part) {
                            return Array.isArray(part)
                                ? classEscape(part[0]) + "-" + classEscape(part[1])
                                : classEscape(part);
                        });
                        return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                    case "any":
                        return "any character";
                    case "end":
                        return "end of input";
                    case "other":
                        return expectation.description;
                }
            }
            function describeExpected(expected1) {
                var descriptions = expected1.map(describeExpectation);
                var i;
                var j;
                descriptions.sort();
                if (descriptions.length > 0) {
                    for (i = 1, j = 1; i < descriptions.length; i++) {
                        if (descriptions[i - 1] !== descriptions[i]) {
                            descriptions[j] = descriptions[i];
                            j++;
                        }
                    }
                    descriptions.length = j;
                }
                switch (descriptions.length) {
                    case 1:
                        return descriptions[0];
                    case 2:
                        return descriptions[0] + " or " + descriptions[1];
                    default:
                        return descriptions.slice(0, -1).join(", ")
                            + ", or "
                            + descriptions[descriptions.length - 1];
                }
            }
            function describeFound(found1) {
                return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
            }
            return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
        };
        return SyntaxError;
    }(Error));

    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var ESCAPE_HASH_REGEX = /\\#/g;
    var FormatError = /** @class */ (function (_super) {
        __extends$1(FormatError, _super);
        function FormatError(msg, variableId) {
            var _this = _super.call(this, msg) || this;
            _this.variableId = variableId;
            return _this;
        }
        return FormatError;
    }(Error));
    function mergeLiteral(parts) {
        if (parts.length < 2) {
            return parts;
        }
        return parts.reduce(function (all, part) {
            var lastPart = all[all.length - 1];
            if (!lastPart ||
                lastPart.type !== 0 /* literal */ ||
                part.type !== 0 /* literal */) {
                all.push(part);
            }
            else {
                lastPart.value += part.value;
            }
            return all;
        }, []);
    }
    // TODO(skeleton): add skeleton support
    function formatToParts(els, locales, formatters, formats, values, 
    // For debugging
    originalMessage) {
        // Hot path for straight simple msg translations
        if (els.length === 1 && isLiteralElement(els[0])) {
            return [
                {
                    type: 0 /* literal */,
                    value: els[0].value.replace(ESCAPE_HASH_REGEX, '#')
                }
            ];
        }
        var result = [];
        for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
            var el = els_1[_i];
            // Exit early for string parts.
            if (isLiteralElement(el)) {
                result.push({
                    type: 0 /* literal */,
                    value: el.value.replace(ESCAPE_HASH_REGEX, '#')
                });
                continue;
            }
            var varName = el.value;
            // Enforce that all required values are provided by the caller.
            if (!(values && varName in values)) {
                throw new FormatError("The intl string context variable \"" + varName + "\" was not provided to the string \"" + originalMessage + "\"");
            }
            var value = values[varName];
            if (isArgumentElement(el)) {
                if (!value || typeof value === 'string' || typeof value === 'number') {
                    result.push({
                        type: 0 /* literal */,
                        value: typeof value === 'string' || typeof value === 'number'
                            ? String(value)
                            : ''
                    });
                }
                else {
                    result.push({
                        type: 1 /* argument */,
                        value: value
                    });
                }
                continue;
            }
            // Recursively format plural and select parts' option — which can be a
            // nested pattern structure. The choosing of the option to use is
            // abstracted-by and delegated-to the part helper object.
            if (isDateElement(el)) {
                var style = typeof el.style === 'string' ? formats.date[el.style] : undefined;
                result.push({
                    type: 0 /* literal */,
                    value: formatters
                        .getDateTimeFormat(locales, style)
                        .format(value)
                });
                continue;
            }
            if (isTimeElement(el)) {
                var style = typeof el.style === 'string' ? formats.time[el.style] : undefined;
                result.push({
                    type: 0 /* literal */,
                    value: formatters
                        .getDateTimeFormat(locales, style)
                        .format(value)
                });
                continue;
            }
            if (isNumberElement(el)) {
                var style = typeof el.style === 'string' ? formats.number[el.style] : undefined;
                result.push({
                    type: 0 /* literal */,
                    value: formatters
                        .getNumberFormat(locales, style)
                        .format(value)
                });
                continue;
            }
            if (isSelectElement(el)) {
                var opt = el.options[value] || el.options.other;
                if (!opt) {
                    throw new RangeError("Invalid values for \"" + el.value + "\": \"" + value + "\". Options are \"" + Object.keys(el.options).join('", "') + "\"");
                }
                result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
                continue;
            }
            if (isPluralElement(el)) {
                var opt = el.options["=" + value];
                if (!opt) {
                    var rule = formatters
                        .getPluralRules(locales, { type: el.pluralType })
                        .select(value - (el.offset || 0));
                    opt = el.options[rule] || el.options.other;
                }
                if (!opt) {
                    throw new RangeError("Invalid values for \"" + el.value + "\": \"" + value + "\". Options are \"" + Object.keys(el.options).join('", "') + "\"");
                }
                result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
                continue;
            }
        }
        return mergeLiteral(result);
    }
    function formatToString(els, locales, formatters, formats, values, 
    // For debugging
    originalMessage) {
        var parts = formatToParts(els, locales, formatters, formats, values, originalMessage);
        // Hot path for straight simple msg translations
        if (parts.length === 1) {
            return parts[0].value;
        }
        return parts.reduce(function (all, part) { return (all += part.value); }, '');
    }
    // Singleton
    var domParser;
    var TOKEN_DELIMITER = '@@';
    var TOKEN_REGEX = /@@(.*?)@@/g;
    var counter = 0;
    function generateId() {
        return Date.now() + "_" + ++counter;
    }
    function restoreRichPlaceholderMessage(text, objectParts) {
        return text
            .split(TOKEN_REGEX)
            .filter(Boolean)
            .map(function (c) { return objectParts[c] || c; });
    }
    function formatXMLMessage(els, locales, formatters, formats, values, 
    // For debugging
    originalMessage) {
        var parts = formatToParts(els, locales, formatters, formats, values, originalMessage);
        var objectParts = {};
        var formattedMessage = parts.reduce(function (all, part) {
            if (typeof part.value === 'string' || part.type === 0 /* literal */) {
                return (all += part.value);
            }
            var id = generateId();
            objectParts[id] = part.value;
            return (all += "" + TOKEN_DELIMITER + id + TOKEN_DELIMITER);
        }, '');
        // Not designed to filter out aggressively
        if (!~formattedMessage.indexOf('<')) {
            return restoreRichPlaceholderMessage(formattedMessage, objectParts);
        }
        if (!values) {
            throw new FormatError('Message has placeholders but no values was given');
        }
        if (typeof DOMParser === 'undefined') {
            throw new FormatError('Cannot format XML message without DOMParser');
        }
        if (!domParser) {
            domParser = new DOMParser();
        }
        // XML, not HTML since HTMl is strict about self-closing tag
        var dom = domParser.parseFromString("<template>" + formattedMessage + "</template>", 'application/xml');
        if (dom.getElementsByTagName('parsererror').length) {
            throw new FormatError("Malformed XML message " + dom.getElementsByTagName('parsererror')[0].innerHTML);
        }
        var content = dom.firstChild;
        if (!content) {
            throw new FormatError("Malformed XML message " + formattedMessage);
        }
        var tagsToFormat = Object.keys(values).filter(function (varName) { return !!dom.getElementsByTagName(varName).length; });
        // No tags to format
        if (!tagsToFormat.length) {
            return restoreRichPlaceholderMessage(formattedMessage, objectParts);
        }
        var childNodes = Array.prototype.slice.call(content.childNodes);
        return childNodes.reduce(function (reconstructedChunks, _a) {
            var tagName = _a.tagName, outerHTML = _a.outerHTML, textContent = _a.textContent;
            // Regular text
            if (!tagName) {
                var chunks = restoreRichPlaceholderMessage(textContent || '', objectParts);
                return reconstructedChunks.concat(chunks);
            }
            // Legacy HTML
            if (!values[tagName]) {
                var chunks = restoreRichPlaceholderMessage(outerHTML, objectParts);
                if (chunks.length === 1) {
                    return reconstructedChunks.concat([chunks[0]]);
                }
                return reconstructedChunks.concat(chunks);
            }
            // XML Tag replacement
            var formatFnOrValue = values[tagName];
            if (typeof formatFnOrValue === 'function') {
                if (textContent == null) {
                    return reconstructedChunks.concat([
                        formatFnOrValue(textContent || undefined)
                    ]);
                }
                var chunks = restoreRichPlaceholderMessage(textContent, objectParts);
                return reconstructedChunks.concat([formatFnOrValue.apply(void 0, chunks)]);
            }
            return reconstructedChunks.concat([formatFnOrValue]);
        }, []);
    }

    /*
    Copyright (c) 2014, Yahoo! Inc. All rights reserved.
    Copyrights licensed under the New BSD License.
    See the accompanying LICENSE file for terms.
    */
    // -- Utilities ----------------------------------------------------------------
    function getCacheId(inputs) {
        return JSON.stringify(inputs.map(function (input) {
            return input && typeof input === 'object' ? orderedProps(input) : input;
        }));
    }
    function orderedProps(obj) {
        return Object.keys(obj)
            .sort()
            .map(function (k) {
            var _a;
            return (_a = {}, _a[k] = obj[k], _a);
        });
    }
    var memoizeFormatConstructor = function (FormatConstructor, cache) {
        if (cache === void 0) {
            cache = {};
        }
        return function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var cacheId = getCacheId(args);
            var format = cacheId && cache[cacheId];
            if (!format) {
                format = new ((_a = FormatConstructor).bind.apply(_a, [void 0].concat(args)))();
                if (cacheId) {
                    cache[cacheId] = format;
                }
            }
            return format;
        };
    };

    /*
    Copyright (c) 2014, Yahoo! Inc. All rights reserved.
    Copyrights licensed under the New BSD License.
    See the accompanying LICENSE file for terms.
    */
    var __assign$1 = (undefined && undefined.__assign) || function () {
        __assign$1 = Object.assign || function (t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    // -- MessageFormat --------------------------------------------------------
    function resolveLocale(locales) {
        if (typeof locales === 'string') {
            locales = [locales];
        }
        try {
            return Intl.NumberFormat.supportedLocalesOf(locales, {
                // IE11 localeMatcher `lookup` seems to convert `en` -> `en-US`
                // but not other browsers,
                localeMatcher: 'best fit'
            })[0];
        }
        catch (e) {
            return IntlMessageFormat.defaultLocale;
        }
    }
    // TODO(skeleton): add skeleton support
    function prewarmFormatters(els, locales, formatters, formats) {
        els
            .filter(function (el) { return !isArgumentElement(el) && !isLiteralElement(el); })
            .forEach(function (el) {
            // Recursively format plural and select parts' option — which can be a
            // nested pattern structure. The choosing of the option to use is
            // abstracted-by and delegated-to the part helper object.
            if (isDateElement(el)) {
                var style = typeof el.style === 'string' ? formats.date[el.style] : undefined;
                formatters.getDateTimeFormat(locales, style);
            }
            if (isTimeElement(el)) {
                var style = typeof el.style === 'string' ? formats.time[el.style] : undefined;
                formatters.getDateTimeFormat(locales, style);
            }
            if (isNumberElement(el)) {
                var style = typeof el.style === 'string' ? formats.number[el.style] : undefined;
                formatters.getNumberFormat(locales, style);
            }
            if (isSelectElement(el)) {
                Object.keys(el.options).forEach(function (id) {
                    return prewarmFormatters(el.options[id].value, locales, formatters, formats);
                });
            }
            if (isPluralElement(el)) {
                formatters.getPluralRules(locales, { type: el.pluralType });
                Object.keys(el.options).forEach(function (id) {
                    return prewarmFormatters(el.options[id].value, locales, formatters, formats);
                });
            }
        });
    }
    function mergeConfig(c1, c2) {
        if (!c2) {
            return c1;
        }
        return __assign$1({}, (c1 || {}), (c2 || {}), Object.keys(c1).reduce(function (all, k) {
            all[k] = __assign$1({}, c1[k], (c2[k] || {}));
            return all;
        }, {}));
    }
    function mergeConfigs(defaultConfig, configs) {
        if (!configs) {
            return defaultConfig;
        }
        return Object.keys(defaultConfig).reduce(function (all, k) {
            all[k] = mergeConfig(defaultConfig[k], configs[k]);
            return all;
        }, __assign$1({}, defaultConfig));
    }
    function createDefaultFormatters(cache) {
        if (cache === void 0) {
            cache = {
                number: {},
                dateTime: {},
                pluralRules: {}
            };
        }
        return {
            getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat, cache.number),
            getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat, cache.dateTime),
            getPluralRules: memoizeFormatConstructor(Intl.PluralRules, cache.pluralRules)
        };
    }
    var IntlMessageFormat = /** @class */ (function () {
        function IntlMessageFormat(message, locales, overrideFormats, opts) {
            var _this = this;
            if (locales === void 0) {
                locales = IntlMessageFormat.defaultLocale;
            }
            this.formatterCache = {
                number: {},
                dateTime: {},
                pluralRules: {}
            };
            this.format = function (values) {
                return formatToString(_this.ast, _this.locale, _this.formatters, _this.formats, values, _this.message);
            };
            this.formatToParts = function (values) {
                return formatToParts(_this.ast, _this.locale, _this.formatters, _this.formats, values, _this.message);
            };
            this.formatXMLMessage = function (values) {
                return formatXMLMessage(_this.ast, _this.locale, _this.formatters, _this.formats, values, _this.message);
            };
            this.resolvedOptions = function () { return ({ locale: _this.locale }); };
            this.getAst = function () { return _this.ast; };
            if (typeof message === 'string') {
                this.message = message;
                if (!IntlMessageFormat.__parse) {
                    throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
                }
                // Parse string messages into an AST.
                this.ast = IntlMessageFormat.__parse(message);
            }
            else {
                this.ast = message;
            }
            if (!Array.isArray(this.ast)) {
                throw new TypeError('A message must be provided as a String or AST.');
            }
            // Creates a new object with the specified `formats` merged with the default
            // formats.
            this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
            // Defined first because it's used to build the format pattern.
            this.locale = resolveLocale(locales || []);
            this.formatters =
                (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
            prewarmFormatters(this.ast, this.locale, this.formatters, this.formats);
        }
        IntlMessageFormat.defaultLocale = 'en';
        IntlMessageFormat.__parse = undefined;
        // Default format options used as the prototype of the `formats` provided to the
        // constructor. These are used when constructing the internal Intl.NumberFormat
        // and Intl.DateTimeFormat instances.
        IntlMessageFormat.formats = {
            number: {
                currency: {
                    style: 'currency'
                },
                percent: {
                    style: 'percent'
                }
            },
            date: {
                short: {
                    month: 'numeric',
                    day: 'numeric',
                    year: '2-digit'
                },
                medium: {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                },
                long: {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                },
                full: {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                }
            },
            time: {
                short: {
                    hour: 'numeric',
                    minute: 'numeric'
                },
                medium: {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                },
                long: {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZoneName: 'short'
                },
                full: {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZoneName: 'short'
                }
            }
        };
        return IntlMessageFormat;
    }());

    /*
    HTML escaping is the same as React's
    (on purpose.) Therefore, it has the following Copyright and Licensing:

    Copyright 2013-2014, Facebook, Inc.
    All rights reserved.

    This source code is licensed under the BSD-style license found in the LICENSE
    file in the root directory of React's source tree.
    */
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
    function invariantIntlContext(_a) {
        var intl = (_a === void 0 ? {} : _a).intl;
        invariant(intl, '[React Intl] Could not find required `intl` object. ' +
            '<IntlProvider> needs to exist in the component ancestry.');
    }
    function createError(message, exception) {
        var eMsg = exception ? "\n" + exception : '';
        return "[React Intl] " + message + eMsg;
    }
    function defaultErrorHandler(error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
    var DEFAULT_INTL_CONFIG = {
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
    /**
     * Create intl formatters and populate cache
     * @param cache explicit cache to prevent leaking memory
     */
    function createFormatters(cache) {
        if (cache === void 0) { cache = createIntlCache(); }
        return {
            getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat, cache.dateTime),
            getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat, cache.number),
            getMessageFormat: memoizeFormatConstructor(IntlMessageFormat, cache.message),
            getRelativeTimeFormat: memoizeFormatConstructor(Intl.RelativeTimeFormat, cache.relativeTime),
            getPluralRules: memoizeFormatConstructor(Intl.PluralRules, cache.pluralRules),
        };
    }

    // Since rollup cannot deal with namespace being a function,
    // this is to interop with TypeScript since `invariant`
    // does not export a default
    // https://github.com/rollup/rollup/issues/1267
    var hoistNonReactStatics = require('hoist-non-react-statics');
    function getDisplayName(Component) {
        return Component.displayName || Component.name || 'Component';
    }
    // TODO: We should provide initial value here
    var IntlContext = React.createContext(null);
    var IntlConsumer = IntlContext.Consumer, IntlProvider = IntlContext.Provider;
    var Provider = IntlProvider;
    var Context = IntlContext;
    function injectIntl(WrappedComponent, options) {
        var _a = options || {}, _b = _a.intlPropName, intlPropName = _b === void 0 ? 'intl' : _b, _c = _a.forwardRef, forwardRef = _c === void 0 ? false : _c, _d = _a.enforceContext, enforceContext = _d === void 0 ? true : _d;
        var WithIntl = function (props) {
            return (React.createElement(IntlConsumer, null, function (intl) {
                var _a;
                if (enforceContext) {
                    invariantIntlContext({ intl: intl });
                }
                return (React.createElement(WrappedComponent, Object.assign({}, props, (_a = {},
                    _a[intlPropName] = intl,
                    _a), { ref: forwardRef ? props.forwardedRef : null })));
            }));
        };
        WithIntl.displayName = "injectIntl(" + getDisplayName(WrappedComponent) + ")";
        WithIntl.WrappedComponent = WrappedComponent;
        if (forwardRef) {
            return hoistNonReactStatics(React.forwardRef(function (props, ref) { return (React.createElement(WithIntl, Object.assign({}, props, { forwardedRef: ref }))); }), WrappedComponent);
        }
        return hoistNonReactStatics(WithIntl, WrappedComponent);
    }

    function createFormattedComponent(type) {
        var Component = function (props) {
            var value = props.value, children = props.children, _a = props.intl, _b = type, formatFn = _a[_b], Text = _a.textComponent;
            var formattedValue = formatFn(value, props);
            if (typeof children === 'function') {
                return children(formattedValue);
            }
            if (Text) {
                return React.createElement(Text, null, formattedValue);
            }
            // Work around @types/react where React.FC cannot return string
            return formattedValue;
        };
        Component.displayName =
            type === 'formatDate'
                ? 'FormattedDate'
                : type === 'formatTime'
                    ? 'FormattedTime'
                    : 'FormattedNumber';
        return {
            BaseComponent: Component,
            Component: injectIntl(Component),
        };
    }

    function useIntl() {
        var intl = React.useContext(Context);
        invariantIntlContext({ intl: intl });
        return intl;
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends$2(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /*
     * Copyright 2015, Yahoo Inc.
     * Copyrights licensed under the New BSD License.
     * See the accompanying LICENSE file for terms.
     */
    var invariant$1 = require('invariant');
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
        onError(createError("No " + type + " format named: " + name));
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
        var defaults = Object.assign({}, (timeZone && { timeZone: timeZone }), (format && getNamedFormat(formats, 'date', format, onError)));
        var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
        try {
            return state.getDateTimeFormat(locale, filteredOptions).format(date);
        }
        catch (e) {
            onError(createError('Error formatting date.', e));
        }
        return String(date);
    }
    function formatTime(_a, state, value, options) {
        var locale = _a.locale, formats = _a.formats, onError = _a.onError, timeZone = _a.timeZone;
        if (options === void 0) { options = {}; }
        var format = options.format;
        var date = new Date(value);
        var defaults = Object.assign({}, (timeZone && { timeZone: timeZone }), (format && getNamedFormat(formats, 'time', format, onError)));
        var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
        if (!filteredOptions.hour &&
            !filteredOptions.minute &&
            !filteredOptions.second) {
            // Add default formatting options if hour, minute, or second isn't defined.
            filteredOptions = Object.assign({}, filteredOptions, { hour: 'numeric', minute: 'numeric' });
        }
        try {
            return state.getDateTimeFormat(locale, filteredOptions).format(date);
        }
        catch (e) {
            onError(createError('Error formatting time.', e));
        }
        return String(date);
    }
    function formatRelativeTime(_a, state, value, unit, options) {
        var locale = _a.locale, formats = _a.formats, onError = _a.onError;
        if (unit === void 0) { unit = 'second'; }
        if (options === void 0) { options = {}; }
        var format = options.format;
        var defaults = (!!format && getNamedFormat(formats, 'relative', format, onError)) || {};
        var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults);
        try {
            return state
                .getRelativeTimeFormat(locale, filteredOptions)
                .format(value, unit);
        }
        catch (e) {
            onError(createError('Error formatting relative time.', e));
        }
        return String(value);
    }
    function formatNumber(_a, state, value, options) {
        var locale = _a.locale, formats = _a.formats, onError = _a.onError;
        if (options === void 0) { options = {}; }
        var format = options.format;
        var defaults = (format && getNamedFormat(formats, 'number', format, onError)) || {};
        var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults);
        try {
            return state.getNumberFormat(locale, filteredOptions).format(value);
        }
        catch (e) {
            onError(createError('Error formatting number.', e));
        }
        return String(value);
    }
    function formatPlural(_a, state, value, options) {
        var locale = _a.locale, onError = _a.onError;
        if (options === void 0) { options = {}; }
        var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
        try {
            return state.getPluralRules(locale, filteredOptions).select(value);
        }
        catch (e) {
            onError(createError('Error formatting plural.', e));
        }
        return 'other';
    }
    function formatMessage(_a, state, messageDescriptor, values) {
        var locale = _a.locale, formats = _a.formats, messages = _a.messages, defaultLocale = _a.defaultLocale, defaultFormats = _a.defaultFormats, onError = _a.onError;
        if (messageDescriptor === void 0) { messageDescriptor = { id: '' }; }
        if (values === void 0) { values = {}; }
        var id = messageDescriptor.id, defaultMessage = messageDescriptor.defaultMessage;
        // `id` is a required field of a Message Descriptor.
        invariant$1(id, '[React Intl] An `id` must be provided to format a message.');
        var message = messages && messages[id];
        var hasValues = Object.keys(values).length > 0;
        // Avoid expensive message formatting for simple messages without values. In
        // development messages will always be formatted in case of missing values.
        if (!hasValues && process.env.NODE_ENV === 'production') {
            var val = message || defaultMessage || id;
            if (typeof val === 'string') {
                return escapeUnformattedMessage(val);
            }
            invariant$1(val.length === 1 && val[0].type === TYPE.literal, 'Message has placeholders but no values was provided');
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
                onError(createError("Error formatting message: \"" + id + "\" for locale: \"" + locale + "\"" +
                    (defaultMessage ? ', using default message as fallback.' : ''), e));
            }
        }
        else {
            // This prevents warnings from littering the console in development
            // when no `messages` are passed into the <IntlProvider> for the
            // default locale, and a default message is in the source.
            if (!defaultMessage ||
                (locale && locale.toLowerCase() !== defaultLocale.toLowerCase())) {
                onError(createError("Missing message: \"" + id + "\" for locale: \"" + locale + "\"" +
                    (defaultMessage ? ', using default message as fallback.' : '')));
            }
        }
        if (!formattedMessageParts.length && defaultMessage) {
            try {
                var formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);
                formattedMessageParts = formatter.formatXMLMessage(values);
            }
            catch (e) {
                onError(createError("Error formatting the default message for: \"" + id + "\"", e));
            }
        }
        if (!formattedMessageParts.length) {
            onError(createError("Cannot format message: \"" + id + "\", " +
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
    function formatHTMLMessage(config, state, messageDescriptor, rawValues) {
        if (messageDescriptor === void 0) { messageDescriptor = { id: '' }; }
        if (rawValues === void 0) { rawValues = {}; }
        // Process all the values before they are used when formatting the ICU
        // Message string. Since the formatted message might be injected via
        // `innerHTML`, all String-based values need to be HTML-escaped.
        var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
            var value = rawValues[name];
            escaped[name] = typeof value === 'string' ? escape(value) : value;
            return escaped;
        }, {});
        return formatMessage(config, state, messageDescriptor, escapedValues);
    }

    /*
     * Copyright 2015, Yahoo Inc.
     * Copyrights licensed under the New BSD License.
     * See the accompanying LICENSE file for terms.
     */
    var DEFAULT_CONSTRUCTORS = [
        Intl.DateTimeFormat,
        Intl.NumberFormat,
        Intl.PluralRules
    ];
    function areIntlLocalesSupported(locales, constructorsToCheck) {
        if (constructorsToCheck === void 0) {
            constructorsToCheck = DEFAULT_CONSTRUCTORS;
        }
        if (typeof Intl === 'undefined') {
            return false;
        }
        if (!locales) {
            throw new Error('locales must be supplied.');
        }
        if (!Array.isArray(locales)) {
            locales = [locales];
        }
        var intlConstructors = constructorsToCheck.filter(Boolean);
        if (intlConstructors.length === 0) {
            return false;
        }
        return intlConstructors.every(function (intlConstructor) {
            return intlConstructor.supportedLocalesOf(locales).length === locales.length;
        });
    }

    var shallowEquals = require('shallow-equal/objects');
    var IntlProvider$1 = /** @class */ (function (_super) {
        __extends$2(IntlProvider, _super);
        function IntlProvider() {
            var _this = _super.apply(this, arguments) || this;
            _this.cache = createIntlCache();
            _this.state = {
                cache: _this.cache,
                intl: undefined,
                prevProps: {
                    locale: _this.props.locale,
                },
            };
            return _this;
        }
        IntlProvider.getDerivedStateFromProps = function (props, _a) {
            var prevProps = _a.prevProps, cache = _a.cache;
            var locale = props.locale, timeZone = props.timeZone, formats = props.formats, textComponent = props.textComponent, messages = props.messages, defaultLocale = props.defaultLocale, defaultFormats = props.defaultFormats, onError = props.onError;
            var filteredProps = {
                locale: locale,
                timeZone: timeZone,
                formats: formats,
                textComponent: textComponent,
                messages: messages,
                defaultLocale: defaultLocale,
                defaultFormats: defaultFormats,
                onError: onError,
            };
            if (!shallowEquals(prevProps, filteredProps)) {
                return {
                    intl: createIntl(props, cache),
                    prevProps: filteredProps,
                };
            }
            return null;
        };
        IntlProvider.prototype.render = function () {
            invariantIntlContext(this.state);
            return React.createElement(Provider, { value: this.state.intl }, this.props.children);
        };
        return IntlProvider;
    }(React.PureComponent));
    IntlProvider$1.displayName = 'IntlProvider';
    IntlProvider$1.defaultProps = DEFAULT_INTL_CONFIG;
    /**
     * Create intl object
     * @param config intl config
     * @param cache cache for formatter instances to prevent memory leak
     */
    function createIntl(config, cache) {
        var formatters = createFormatters(cache);
        var resolvedConfig = Object.assign({}, DEFAULT_INTL_CONFIG, config);
        if (!resolvedConfig.locale ||
            !areIntlLocalesSupported(resolvedConfig.locale)) {
            var locale = resolvedConfig.locale, defaultLocale = resolvedConfig.defaultLocale, onError = resolvedConfig.onError;
            if (typeof onError === 'function') {
                onError(createError("Missing locale data for locale: \"" + locale + "\". " +
                    ("Using default locale: \"" + defaultLocale + "\" as fallback.")));
            }
            // Since there's no registered locale data for `locale`, this will
            // fallback to the `defaultLocale` to make sure things can render.
            // The `messages` are overridden to the `defaultProps` empty object
            // to maintain referential equality across re-renders. It's assumed
            // each <FormattedMessage> contains a `defaultMessage` prop.
            resolvedConfig.locale = resolvedConfig.defaultLocale || 'en';
        }
        return Object.assign({}, resolvedConfig, { formatters: formatters, formatNumber: formatNumber.bind(undefined, resolvedConfig, formatters), formatRelativeTime: formatRelativeTime.bind(undefined, resolvedConfig, formatters), formatDate: formatDate.bind(undefined, resolvedConfig, formatters), formatTime: formatTime.bind(undefined, resolvedConfig, formatters), formatPlural: formatPlural.bind(undefined, resolvedConfig, formatters), formatMessage: formatMessage.bind(undefined, resolvedConfig, formatters), formatHTMLMessage: formatHTMLMessage.bind(undefined, resolvedConfig, formatters) });
    }

    var invariant$2 = require('invariant');
    var MINUTE = 60;
    var HOUR = 60 * 60;
    var DAY = 60 * 60 * 24;
    function selectUnit(seconds) {
        var absValue = Math.abs(seconds);
        if (absValue < MINUTE) {
            return 'second';
        }
        if (absValue < HOUR) {
            return 'minute';
        }
        if (absValue < DAY) {
            return 'hour';
        }
        return 'day';
    }
    function getDurationInSeconds(unit) {
        switch (unit) {
            case 'second':
                return 1;
            case 'minute':
                return MINUTE;
            case 'hour':
                return HOUR;
            default:
                return DAY;
        }
    }
    function valueToSeconds(value, unit) {
        if (!value) {
            return 0;
        }
        switch (unit) {
            case 'second':
                return value;
            case 'minute':
                return value * MINUTE;
            default:
                return value * HOUR;
        }
    }
    var INCREMENTABLE_UNITS = ['second', 'minute', 'hour'];
    function canIncrement(unit) {
        if (unit === void 0) { unit = 'second'; }
        return INCREMENTABLE_UNITS.includes(unit);
    }
    function verifyProps(updateIntervalInSeconds, unit) {
        invariant$2(!updateIntervalInSeconds || (updateIntervalInSeconds && canIncrement(unit)), 'Cannot schedule update with unit longer than hour');
    }
    var FormattedRelativeTime = /** @class */ (function (_super) {
        __extends$2(FormattedRelativeTime, _super);
        function FormattedRelativeTime(props) {
            var _this = _super.call(this, props) || this;
            // Public for testing
            _this._updateTimer = null;
            _this.state = {
                prevUnit: _this.props.unit,
                prevValue: _this.props.value,
                currentValueInSeconds: canIncrement(_this.props.unit)
                    ? valueToSeconds(_this.props.value, _this.props.unit)
                    : 0,
            };
            verifyProps(props.updateIntervalInSeconds, props.unit);
            return _this;
        }
        FormattedRelativeTime.prototype.scheduleNextUpdate = function (_a, _b) {
            var _this = this;
            var updateIntervalInSeconds = _a.updateIntervalInSeconds, unit = _a.unit;
            var currentValueInSeconds = _b.currentValueInSeconds;
            clearTimeout(this._updateTimer);
            this._updateTimer = null;
            // If there's no interval and we cannot increment this unit, do nothing
            if (!updateIntervalInSeconds || !canIncrement(unit)) {
                return;
            }
            // Figure out the next interesting time
            var nextValueInSeconds = currentValueInSeconds - updateIntervalInSeconds;
            var nextUnit = selectUnit(nextValueInSeconds);
            // We've reached the max auto incrementable unit, don't schedule another update
            if (nextUnit === 'day') {
                return;
            }
            var unitDuration = getDurationInSeconds(nextUnit);
            var remainder = nextValueInSeconds % unitDuration;
            var prevInterestingValueInSeconds = nextValueInSeconds - remainder;
            var nextInterestingValueInSeconds = prevInterestingValueInSeconds >= currentValueInSeconds
                ? prevInterestingValueInSeconds - unitDuration
                : prevInterestingValueInSeconds;
            var delayInSeconds = Math.abs(nextInterestingValueInSeconds - currentValueInSeconds);
            this._updateTimer = setTimeout(function () { return _this.setState({
                currentValueInSeconds: nextInterestingValueInSeconds,
            }); }, delayInSeconds * 1e3);
        };
        FormattedRelativeTime.prototype.componentDidMount = function () {
            this.scheduleNextUpdate(this.props, this.state);
        };
        FormattedRelativeTime.prototype.componentDidUpdate = function () {
            this.scheduleNextUpdate(this.props, this.state);
        };
        FormattedRelativeTime.prototype.componentWillUnmount = function () {
            clearTimeout(this._updateTimer);
            this._updateTimer = null;
        };
        FormattedRelativeTime.getDerivedStateFromProps = function (props, state) {
            if (props.unit !== state.prevUnit || props.value !== state.prevValue) {
                return {
                    prevValue: props.value,
                    prevUnit: props.unit,
                    currentValueInSeconds: canIncrement(props.unit)
                        ? valueToSeconds(props.value, props.unit)
                        : 0,
                };
            }
            return null;
        };
        FormattedRelativeTime.prototype.render = function () {
            var _a = this.props.intl, formatRelativeTime = _a.formatRelativeTime, Text = _a.textComponent;
            var _b = this.props, children = _b.children, value = _b.value, unit = _b.unit, updateIntervalInSeconds = _b.updateIntervalInSeconds;
            var currentValueInSeconds = this.state.currentValueInSeconds;
            var currentValue = value || 0;
            var currentUnit = unit;
            if (canIncrement(unit) &&
                currentValueInSeconds &&
                updateIntervalInSeconds) {
                currentUnit = selectUnit(currentValueInSeconds);
                var unitDuration = getDurationInSeconds(currentUnit);
                currentValue = Math.round(currentValueInSeconds / unitDuration);
            }
            var formattedRelativeTime = formatRelativeTime(currentValue, currentUnit, Object.assign({}, this.props));
            if (typeof children === 'function') {
                return children(formattedRelativeTime);
            }
            if (Text) {
                return React.createElement(Text, null, formattedRelativeTime);
            }
            return formattedRelativeTime;
        };
        return FormattedRelativeTime;
    }(React.PureComponent));
    FormattedRelativeTime.defaultProps = {
        value: 0,
        unit: 'second',
    };
    var relative = injectIntl(FormattedRelativeTime);

    /*
     * Copyright 2015, Yahoo Inc.
     * Copyrights licensed under the New BSD License.
     * See the accompanying LICENSE file for terms.
     */
    var FormattedPlural = function (props) {
        var value = props.value, other = props.other, children = props.children, _a = props.intl, formatPlural = _a.formatPlural, Text = _a.textComponent;
        var pluralCategory = formatPlural(value, props);
        var formattedPlural = props[pluralCategory] || other;
        if (typeof children === 'function') {
            return children(formattedPlural);
        }
        if (Text) {
            return React.createElement(Text, null, formattedPlural);
        }
        // Work around @types/react where React.FC cannot return string
        return formattedPlural;
    };
    FormattedPlural.defaultProps = {
        type: 'cardinal',
    };
    FormattedPlural.displayName = 'FormattedPlural';
    var plural = injectIntl(FormattedPlural);

    /*
     * Copyright 2015, Yahoo Inc.
     * Copyrights licensed under the New BSD License.
     * See the accompanying LICENSE file for terms.
     */
    var __rest = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
                if (e.indexOf(p[i]) < 0)
                    t[p[i]] = s[p[i]];
        return t;
    };
    var shallowEquals$1 = require('shallow-equal/objects');
    var defaultFormatMessage = function (descriptor, values) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback.');
        }
        return formatMessage(Object.assign({}, DEFAULT_INTL_CONFIG, { locale: 'en' }), createFormatters(), descriptor, values);
    };
    var BaseFormattedMessage = /** @class */ (function (_super) {
        __extends$2(BaseFormattedMessage, _super);
        function BaseFormattedMessage(props) {
            var _this = _super.call(this, props) || this;
            if (!props.defaultMessage) {
                invariantIntlContext(props);
            }
            return _this;
        }
        BaseFormattedMessage.prototype.shouldComponentUpdate = function (nextProps) {
            var _a = this.props, values = _a.values, otherProps = __rest(_a, ["values"]);
            var nextValues = nextProps.values, nextOtherProps = __rest(nextProps, ["values"]);
            return (!shallowEquals$1(nextValues, values) ||
                !shallowEquals$1(otherProps, nextOtherProps));
        };
        BaseFormattedMessage.prototype.render = function () {
            var _b = this.props.intl || {}, _c = _b.formatMessage, formatMessage = _c === void 0 ? defaultFormatMessage : _c, _d = _b.textComponent, Text = _d === void 0 ? React.Fragment : _d;
            var _e = this.props, id = _e.id, description = _e.description, defaultMessage = _e.defaultMessage, values = _e.values, _f = _e.tagName, Component = _f === void 0 ? Text : _f, children = _e.children;
            var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
            var nodes = formatMessage(descriptor, values);
            if (!Array.isArray(nodes)) {
                nodes = [nodes];
            }
            if (typeof children === 'function') {
                return children.apply(void 0, nodes);
            }
            if (Component) {
                // Needs to use `createElement()` instead of JSX, otherwise React will
                // warn about a missing `key` prop with rich-text message formatting.
                return React.createElement.apply(React, [Component, null].concat(nodes));
            }
            return nodes;
        };
        return BaseFormattedMessage;
    }(React.Component));
    BaseFormattedMessage.defaultProps = {
        values: {},
    };
    var message = injectIntl(BaseFormattedMessage, { enforceContext: false });

    var FormattedHTMLMessage = /** @class */ (function (_super) {
        __extends$2(FormattedHTMLMessage, _super);
        function FormattedHTMLMessage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FormattedHTMLMessage.prototype.render = function () {
            var _a = this.props.intl, formatHTMLMessage = _a.formatHTMLMessage, Text = _a.textComponent;
            var _b = this.props, id = _b.id, description = _b.description, defaultMessage = _b.defaultMessage, rawValues = _b.values, 
            // This is bc of TS3.3 doesn't recognize `defaultProps`
            _c = _b.tagName, 
            // This is bc of TS3.3 doesn't recognize `defaultProps`
            Component = _c === void 0 ? Text || 'span' : _c, children = _b.children;
            var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
            var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);
            if (typeof children === 'function') {
                return children(formattedHTMLMessage);
            }
            // Since the message presumably has HTML in it, we need to set
            // `innerHTML` in order for it to be rendered and not escaped by React.
            // To be safe, all string prop values were escaped when formatting the
            // message. It is assumed that the message is not UGC, and came from the
            // developer making it more like a template.
            //
            // Note: There's a perf impact of using this component since there's no
            // way for React to do its virtual DOM diffing.
            var html = { __html: formattedHTMLMessage };
            return React.createElement(Component, { dangerouslySetInnerHTML: html });
        };
        return FormattedHTMLMessage;
    }(BaseFormattedMessage));
    FormattedHTMLMessage.defaultProps = Object.assign({}, BaseFormattedMessage.defaultProps, { tagName: 'span' });
    var htmlMessage = injectIntl(FormattedHTMLMessage);

    /*
     * Copyright 2015, Yahoo Inc.
     * Copyrights licensed under the New BSD License.
     * See the accompanying LICENSE file for terms.
     */
    var FormattedDate = createFormattedComponent('formatDate').Component;
    var FormattedTime = createFormattedComponent('formatTime').Component;
    var FormattedNumber = createFormattedComponent('formatNumber').Component;

    exports.FormattedDate = FormattedDate;
    exports.FormattedHTMLMessage = htmlMessage;
    exports.FormattedMessage = message;
    exports.FormattedNumber = FormattedNumber;
    exports.FormattedPlural = plural;
    exports.FormattedRelativeTime = relative;
    exports.FormattedTime = FormattedTime;
    exports.IntlContext = Context;
    exports.IntlProvider = IntlProvider$1;
    exports.RawIntlProvider = Provider;
    exports.createIntl = createIntl;
    exports.defineMessages = defineMessages;
    exports.injectIntl = injectIntl;
    exports.useIntl = useIntl;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=react-intl-core.js.map
