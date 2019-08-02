import * as React from 'react';
import { MessageDescriptor, IntlShape } from '../types';
import { PrimitiveType, FormatXMLElementFn } from 'intl-messageformat/core';
export interface Props<V extends React.ReactNode = React.ReactNode> extends MessageDescriptor {
    intl: IntlShape;
    values?: Record<string, V>;
    tagName?: React.ElementType<any>;
    children?(...nodes: React.ReactNodeArray): React.ReactNode;
}
export declare class BaseFormattedMessage<V extends PrimitiveType | React.ReactElement | FormatXMLElementFn = PrimitiveType | React.ReactElement | FormatXMLElementFn> extends React.Component<Props<V>> {
    static defaultProps: {
        values: {};
    };
    constructor(props: Props<V>);
    shouldComponentUpdate(nextProps: Props<V>): boolean;
    render(): {} | null | undefined;
}
declare const _default: (React.ComponentClass<import("./injectIntl").WithIntlProps<Props<string | number | boolean | Date | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | FormatXMLElementFn | null | undefined>>, any> & {
    WrappedComponent: React.ComponentType<Props<string | number | boolean | Date | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | FormatXMLElementFn | null | undefined>>;
}) | (React.FunctionComponent<import("./injectIntl").WithIntlProps<Props<string | number | boolean | Date | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | FormatXMLElementFn | null | undefined>>> & {
    WrappedComponent: React.ComponentType<Props<string | number | boolean | Date | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | FormatXMLElementFn | null | undefined>>;
});
export default _default;
