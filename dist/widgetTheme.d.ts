export type WidgetDisplayMode = 'floating' | 'inline';
export type WidgetLayout = 'vertical' | 'horizontal';
export type WidgetTheme = {
    primaryColor?: string;
    background?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: string;
    padding?: string;
    gap?: string;
};
export declare const defaultWidgetTheme: Required<WidgetTheme>;
export declare const widgetThemeCssVars: Record<keyof WidgetTheme, string>;
export declare function normalizeWidgetTheme(theme: WidgetTheme | undefined): WidgetTheme;
export declare function themeToStyleObject(theme?: WidgetTheme): Record<string, string>;
export declare function themeToCssBlock(theme?: WidgetTheme, selector?: string): string;
export type WidgetSnippetOptions = {
    siteKey?: string;
    origin?: string;
    defer?: boolean;
    mode?: WidgetDisplayMode;
    target?: string;
    layout?: WidgetLayout;
    theme?: WidgetTheme;
};
export declare function buildWidgetSnippet({ siteKey, origin, defer, mode, target, layout, theme, }?: WidgetSnippetOptions): string;
export declare function inlineMountMarkup(target?: string): string;
