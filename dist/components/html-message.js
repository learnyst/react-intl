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
var message_1 = require("./message");
var FormattedHTMLMessage = /** @class */ (function (_super) {
    __extends(FormattedHTMLMessage, _super);
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
    FormattedHTMLMessage.defaultProps = __assign({}, message_1.BaseFormattedMessage.defaultProps, { tagName: 'span' });
    return FormattedHTMLMessage;
}(message_1.BaseFormattedMessage));
exports.BaseFormattedHTMLMessage = FormattedHTMLMessage; // testing purpose only
exports.default = injectIntl_1.default(FormattedHTMLMessage);
