export type Provider = 'chatgpt' | 'claude' | 'gemini' | 'grok' | 'perplexity' | 'mistral';
export type PromptConfig = {
    label: string;
    template: string;
};
export type PromptTemplate = PromptConfig & {
    category: string;
    description: string;
    /** Relies on the assistant fetching and reading {{url}}; most reliable on Grok. */
    grokFriendly?: boolean;
};
export type PromptVariables = {
    url?: string;
    title?: string;
    description?: string;
    siteName?: string;
    context?: string;
    selection?: string;
};
export type BuildInput = {
    provider: Provider;
    prompt: string;
};
export type WidgetPosition = 'bottom-right' | 'bottom-left';
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
export type WidgetConfig = {
    siteName: string;
    providers: Provider[];
    prompts: PromptConfig[];
    position: WidgetPosition;
    brandingEnabled: boolean;
    context?: string;
    analyticsEndpoint?: string;
    mode?: WidgetDisplayMode;
    target?: string;
    layout?: WidgetLayout;
    theme?: WidgetTheme;
};
export declare const providers: Provider[];
export declare const providerLabels: Record<Provider, string>;
export declare const providerBaseUrls: Record<Provider, string>;
export declare const defaultPrompts: PromptConfig[];
export declare const promptTemplates: PromptTemplate[];
export declare const defaultWidgetConfig: WidgetConfig;
export declare function isProvider(value: string): value is Provider;
export declare function normalizeProviders(values: string[] | undefined): Provider[];
export declare function normalizePrompts(values: PromptConfig[] | undefined): PromptConfig[];
export declare function buildPrompt(template: string, variables?: PromptVariables): string;
export declare function buildProviderUrl({ provider, prompt }: BuildInput): string;
export declare function openInProvider(input: BuildInput): void;
export { DEMO_PUBLIC_KEY, DEFAULT_WIDGET_ORIGIN, agentInstallRule, astroWidgetSnippet, hasContinueWithInstall, htmlWidgetSnippet, nextJsWidgetBlock, widgetScriptUrl, } from './install.js';
export type { InstallFramework, SnippetOptions } from './install.js';
export { buildWidgetSnippet, defaultWidgetTheme, inlineMountMarkup, normalizeWidgetTheme, themeToCssBlock, themeToStyleObject, widgetThemeCssVars, } from './widgetTheme.js';
export { agentGuides, agentSkills, mcpTools } from './skills.js';
export type { AgentGuide, AgentSkill } from './skills.js';
