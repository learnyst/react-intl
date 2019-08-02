import * as React from 'react';
import { IntlShape, FormatRelativeTimeOptions } from '../types';
import { Unit } from '@formatjs/intl-relativetimeformat';
export interface Props extends FormatRelativeTimeOptions {
    intl: IntlShape;
    value?: number;
    unit?: Unit;
    updateIntervalInSeconds?: number;
    children?(value: string): React.ReactChild;
}
interface State {
    prevUnit?: Unit;
    prevValue?: number;
    currentValueInSeconds: number;
}
declare class FormattedRelativeTime extends React.PureComponent<Props, State> {
    _updateTimer: any;
    static defaultProps: Pick<Props, 'unit' | 'value'>;
    state: State;
    constructor(props: Props);
    scheduleNextUpdate({ updateIntervalInSeconds, unit }: Props, { currentValueInSeconds }: State): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    static getDerivedStateFromProps(props: Props, state: State): {
        prevValue: number | undefined;
        prevUnit: "day" | "hour" | "minute" | "month" | "second" | "year" | "week" | "quarter" | undefined;
        currentValueInSeconds: number;
    } | null;
    render(): string | number | JSX.Element;
}
export declare const BaseFormattedRelativeTime: typeof FormattedRelativeTime;
declare const _default: (React.ComponentClass<import("./injectIntl").WithIntlProps<Props>, any> & {
    WrappedComponent: React.ComponentType<Props>;
}) | (React.FunctionComponent<import("./injectIntl").WithIntlProps<Props>> & {
    WrappedComponent: React.ComponentType<Props>;
});
export default _default;
