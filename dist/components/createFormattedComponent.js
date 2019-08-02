"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var injectIntl_1 = require("./injectIntl");
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
        Component: injectIntl_1.default(Component),
    };
}
exports.default = createFormattedComponent;
