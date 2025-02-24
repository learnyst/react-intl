/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
import * as React from 'react';
import { Provider } from './injectIntl';
import { createError, DEFAULT_INTL_CONFIG, createFormatters, invariantIntlContext, createIntlCache, } from '../utils';
import { formatNumber, formatRelativeTime, formatDate, formatTime, formatPlural, formatHTMLMessage, formatMessage, } from '../format';
import areIntlLocalesSupported from 'intl-locales-supported';
const shallowEquals = require('shallow-equal/objects');
export default class IntlProvider extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.cache = createIntlCache();
        this.state = {
            cache: this.cache,
            intl: undefined,
            prevProps: {
                locale: this.props.locale,
            },
        };
    }
    static getDerivedStateFromProps(props, { prevProps, cache }) {
        const { locale, timeZone, formats, textComponent, messages, defaultLocale, defaultFormats, onError, } = props;
        const filteredProps = {
            locale,
            timeZone,
            formats,
            textComponent,
            messages,
            defaultLocale,
            defaultFormats,
            onError,
        };
        if (!shallowEquals(prevProps, filteredProps)) {
            return {
                intl: createIntl(props, cache),
                prevProps: filteredProps,
            };
        }
        return null;
    }
    render() {
        invariantIntlContext(this.state);
        return React.createElement(Provider, { value: this.state.intl }, this.props.children);
    }
}
IntlProvider.displayName = 'IntlProvider';
IntlProvider.defaultProps = DEFAULT_INTL_CONFIG;
/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
export function createIntl(config, cache) {
    const formatters = createFormatters(cache);
    const resolvedConfig = Object.assign({}, DEFAULT_INTL_CONFIG, config);
    if (!resolvedConfig.locale ||
        !areIntlLocalesSupported(resolvedConfig.locale)) {
        const { locale, defaultLocale, onError } = resolvedConfig;
        if (typeof onError === 'function') {
            onError(createError(`Missing locale data for locale: "${locale}". ` +
                `Using default locale: "${defaultLocale}" as fallback.`));
        }
        // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.
        resolvedConfig.locale = resolvedConfig.defaultLocale || 'en';
    }
    return Object.assign({}, resolvedConfig, { formatters, formatNumber: formatNumber.bind(undefined, resolvedConfig, formatters), formatRelativeTime: formatRelativeTime.bind(undefined, resolvedConfig, formatters), formatDate: formatDate.bind(undefined, resolvedConfig, formatters), formatTime: formatTime.bind(undefined, resolvedConfig, formatters), formatPlural: formatPlural.bind(undefined, resolvedConfig, formatters), formatMessage: formatMessage.bind(undefined, resolvedConfig, formatters), formatHTMLMessage: formatHTMLMessage.bind(undefined, resolvedConfig, formatters) });
}
