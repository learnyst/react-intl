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
var invariant = require('invariant');
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
    invariant(!updateIntervalInSeconds || (updateIntervalInSeconds && canIncrement(unit)), 'Cannot schedule update with unit longer than hour');
}
var FormattedRelativeTime = /** @class */ (function (_super) {
    __extends(FormattedRelativeTime, _super);
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
        this._updateTimer = setTimeout(function () {
            return _this.setState({
                currentValueInSeconds: nextInterestingValueInSeconds,
            });
        }, delayInSeconds * 1e3);
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
        var formattedRelativeTime = formatRelativeTime(currentValue, currentUnit, __assign({}, this.props));
        if (typeof children === 'function') {
            return children(formattedRelativeTime);
        }
        if (Text) {
            return React.createElement(Text, null, formattedRelativeTime);
        }
        return formattedRelativeTime;
    };
    FormattedRelativeTime.defaultProps = {
        value: 0,
        unit: 'second',
    };
    return FormattedRelativeTime;
}(React.PureComponent));
exports.BaseFormattedRelativeTime = FormattedRelativeTime;
exports.default = injectIntl_1.default(FormattedRelativeTime);
