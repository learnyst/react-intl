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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var injectIntl_1 = require("./injectIntl");
var shallowEquals = require('shallow-equal/objects');
var format_1 = require("../format");
var utils_1 = require("../utils");
var defaultFormatMessage = function (descriptor, values) {
    if (process.env.NODE_ENV !== 'production') {
        console.error('[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback.');
    }
    return format_1.formatMessage(__assign({}, utils_1.DEFAULT_INTL_CONFIG, { locale: 'en' }), utils_1.createFormatters(), descriptor, values);
};
var BaseFormattedMessage = /** @class */ (function (_super) {
    __extends(BaseFormattedMessage, _super);
    function BaseFormattedMessage(props) {
        var _this = _super.call(this, props) || this;
        if (!props.defaultMessage) {
            utils_1.invariantIntlContext(props);
        }
        return _this;
    }
    BaseFormattedMessage.prototype.shouldComponentUpdate = function (nextProps) {
        var _a = this.props, values = _a.values, otherProps = __rest(_a, ["values"]);
        var nextValues = nextProps.values, nextOtherProps = __rest(nextProps, ["values"]);
        return (!shallowEquals(nextValues, values) ||
            !shallowEquals(otherProps, nextOtherProps));
    };
    BaseFormattedMessage.prototype.render = function () {
        var _a = this.props.intl || {}, _b = _a.formatMessage, formatMessage = _b === void 0 ? defaultFormatMessage : _b, _c = _a.textComponent, Text = _c === void 0 ? React.Fragment : _c;
        var _d = this.props, id = _d.id, description = _d.description, defaultMessage = _d.defaultMessage, values = _d.values, _e = _d.tagName, Component = _e === void 0 ? Text : _e, children = _d.children;
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
    BaseFormattedMessage.defaultProps = {
        values: {},
    };
    return BaseFormattedMessage;
}(React.Component));
exports.BaseFormattedMessage = BaseFormattedMessage;
exports.default = injectIntl_1.default(BaseFormattedMessage, { enforceContext: false });
