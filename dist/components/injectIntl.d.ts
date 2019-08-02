import * as React from 'react';
import { IntlShape, Omit } from '../types';
export declare const Provider: React.ProviderExoticComponent<React.ProviderProps<IntlShape>>;
export declare const Context: React.Context<IntlShape>;
export interface Opts<IntlPropName extends string = 'intl'> {
    intlPropName?: IntlPropName;
    forwardRef?: boolean;
    enforceContext?: boolean;
}
export declare type WrappedComponentProps<IntlPropName extends string = 'intl'> = {
    [k in IntlPropName]: IntlShape;
};
export declare type WithIntlProps<P> = Omit<P, keyof WrappedComponentProps> & {
    forwardedRef?: React.Ref<any>;
};
export default function injectIntl<IntlPropName extends string = 'intl', P extends WrappedComponentProps<IntlPropName> = WrappedComponentProps<any>>(WrappedComponent: React.ComponentType<P>, options?: Opts<IntlPropName>): React.ComponentType<WithIntlProps<P>> & {
    WrappedComponent: typeof WrappedComponent;
};
