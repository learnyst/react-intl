import * as React from 'react';
import { IntlShape, FormatDateOptions, FormatNumberOptions } from '../types';
export default function createFormattedComponent<T extends 'formatDate' | 'formatTime' | 'formatNumber'>(type: T): {
    BaseComponent: React.FunctionComponent<(T extends "formatDate" ? FormatDateOptions : T extends "formatTime" ? FormatDateOptions : FormatNumberOptions) & {
        value: Parameters<IntlShape[T]>[0];
        intl: IntlShape;
    }>;
    Component: (React.ComponentClass<import("./injectIntl").WithIntlProps<(T extends "formatDate" ? FormatDateOptions : T extends "formatTime" ? FormatDateOptions : FormatNumberOptions) & {
        value: Parameters<IntlShape[T]>[0];
        intl: IntlShape;
    }>, any> & {
        WrappedComponent: React.ComponentType<(T extends "formatDate" ? FormatDateOptions : T extends "formatTime" ? FormatDateOptions : FormatNumberOptions) & {
            value: Parameters<IntlShape[T]>[0];
            intl: IntlShape;
        }>;
    }) | (React.FunctionComponent<import("./injectIntl").WithIntlProps<(T extends "formatDate" ? FormatDateOptions : T extends "formatTime" ? FormatDateOptions : FormatNumberOptions) & {
        value: Parameters<IntlShape[T]>[0];
        intl: IntlShape;
    }>> & {
        WrappedComponent: React.ComponentType<(T extends "formatDate" ? FormatDateOptions : T extends "formatTime" ? FormatDateOptions : FormatNumberOptions) & {
            value: Parameters<IntlShape[T]>[0];
            intl: IntlShape;
        }>;
    });
};
