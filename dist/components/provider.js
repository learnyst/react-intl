"use strict";
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = require("react");
var injectIntl_1 = require("./injectIntl");
var utils_1 = require("../utils");
var format_1 = require("../format");
var intl_locales_supported_1 = require("intl-locales-supported");
var shallowEquals = require('shallow-equal/objects');
var IntlProvider = /** @class */ (function (_super) {
    __extends(IntlProvider, _super);
    function IntlProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cache = utils_1.createIntlCache();
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
        utils_1.invariantIntlContext(this.state);
        return React.createElement(injectIntl_1.Provider, { value: this.state.intl }, this.props.children);
    };
    IntlProvider.displayName = 'IntlProvider';
    IntlProvider.defaultProps = utils_1.DEFAULT_INTL_CONFIG;
    return IntlProvider;
}(React.PureComponent));
exports.default = IntlProvider;
/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
function createIntl(config, cache) {
    var formatters = utils_1.createFormatters(cache);
    var resolvedConfig = __assign({}, utils_1.DEFAULT_INTL_CONFIG, config);
    if (!resolvedConfig.locale ||
        !intl_locales_supported_1.default(resolvedConfig.locale)) {
        var locale = resolvedConfig.locale, defaultLocale = resolvedConfig.defaultLocale, onError = resolvedConfig.onError;
        if (typeof onError === 'function') {
            onError(utils_1.createError("Missing locale data for locale: \"" + locale + "\". " +
                ("Using default locale: \"" + defaultLocale + "\" as fallback.")));
        }
        // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.
        resolvedConfig.locale = resolvedConfig.defaultLocale || 'en';
    }
    return __assign({}, resolvedConfig, { formatters: formatters, formatNumber: format_1.formatNumber.bind(undefined, resolvedConfig, formatters), formatRelativeTime: format_1.formatRelativeTime.bind(undefined, resolvedConfig, formatters), formatDate: format_1.formatDate.bind(undefined, resolvedConfig, formatters), formatTime: format_1.formatTime.bind(undefined, resolvedConfig, formatters), formatPlural: format_1.formatPlural.bind(undefined, resolvedConfig, formatters), formatMessage: format_1.formatMessage.bind(undefined, resolvedConfig, formatters), formatHTMLMessage: format_1.formatHTMLMessage.bind(undefined, resolvedConfig, formatters) });
}
exports.createIntl = createIntl;
