import * as React from 'react';
import { DEFAULT_INTL_CONFIG } from '../utils';
import { IntlConfig, IntlShape, Omit, IntlCache } from '../types';
interface State {
    /**
     * Explicit intl cache to prevent memory leaks
     */
    cache: IntlCache;
    /**
     * Intl object we created
     */
    intl?: IntlShape;
    /**
     * list of memoized props we care about.
     * This is important since creating intl is
     * very expensive
     */
    prevProps: OptionalIntlConfig;
}
export declare type OptionalIntlConfig = Omit<IntlConfig, keyof typeof DEFAULT_INTL_CONFIG> & Partial<typeof DEFAULT_INTL_CONFIG>;
export default class IntlProvider extends React.PureComponent<OptionalIntlConfig, State> {
    static displayName: string;
    static defaultProps: Pick<IntlConfig, "formats" | "messages" | "timeZone" | "textComponent" | "defaultLocale" | "defaultFormats" | "onError">;
    private cache;
    state: State;
    static getDerivedStateFromProps(props: OptionalIntlConfig, { prevProps, cache }: State): {
        intl: IntlShape;
        prevProps: {
            locale: string;
            timeZone: string | undefined;
            formats: import("../types").CustomFormats | undefined;
            textComponent: "object" | "big" | "link" | "small" | "sub" | "sup" | "track" | "progress" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "map" | "mark" | "menu" | "meta" | "meter" | "nav" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "q" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "source" | "span" | "strong" | "style" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "u" | "ul" | "var" | "video" | "wbr" | "menuitem" | "bdi" | "keygen" | "main" | "rp" | "summary" | "webview" | React.ComponentClass<{}, any> | React.FunctionComponent<{}> | undefined;
            messages: Record<string, string> | Record<string, import("intl-messageformat-parser").MessageFormatElement[]> | undefined;
            defaultLocale: string | undefined;
            defaultFormats: import("../types").CustomFormats | undefined;
            onError: ((err: string) => void) | undefined;
        };
    } | null;
    render(): JSX.Element;
}
/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
export declare function createIntl(config: OptionalIntlConfig, cache?: IntlCache): IntlShape;
export {};
