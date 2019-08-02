import * as React from 'react';
import { BaseFormattedMessage } from './message';
import { PrimitiveType } from 'intl-messageformat/core';
declare class FormattedHTMLMessage extends BaseFormattedMessage<PrimitiveType> {
    static defaultProps: {
        tagName: "span";
        values: {};
    };
    render(): {} | null | undefined;
}
export declare const BaseFormattedHTMLMessage: typeof FormattedHTMLMessage;
declare const _default: (React.ComponentClass<import("./injectIntl").WithIntlProps<import("./message").Props<PrimitiveType>>, any> & {
    WrappedComponent: React.ComponentType<import("./message").Props<PrimitiveType>>;
}) | (React.FunctionComponent<import("./injectIntl").WithIntlProps<import("./message").Props<PrimitiveType>>> & {
    WrappedComponent: React.ComponentType<import("./message").Props<PrimitiveType>>;
});
export default _default;
