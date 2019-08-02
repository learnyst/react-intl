import * as React from 'react';
import withIntl from './injectIntl';
export default function createFormattedComponent(type) {
    const Component = props => {
        const { value, children, intl: { [type]: formatFn, textComponent: Text }, } = props;
        let formattedValue = formatFn(value, props);
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
        Component: withIntl(Component),
    };
}
