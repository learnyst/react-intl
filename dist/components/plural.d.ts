import * as React from 'react';
import { IntlShape, FormatPluralOptions } from '../types';
interface Props extends FormatPluralOptions {
    value: number;
    intl: IntlShape;
    other: React.ReactNode;
    zero?: React.ReactNode;
    one?: React.ReactNode;
    two?: React.ReactNode;
    few?: React.ReactNode;
    many?: React.ReactNode;
    children?(value: React.ReactNode): React.ReactElement | null;
}
declare const _default: (React.ComponentClass<import("./injectIntl").WithIntlProps<Props>, any> & {
    WrappedComponent: React.ComponentType<Props>;
}) | (React.FunctionComponent<import("./injectIntl").WithIntlProps<Props>> & {
    WrappedComponent: React.ComponentType<Props>;
});
export default _default;
