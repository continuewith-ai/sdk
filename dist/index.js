export const providers = ['chatgpt', 'claude', 'gemini', 'grok', 'perplexity', 'mistral'];
export const providerLabels = {
    chatgpt: 'ChatGPT',
    claude: 'Claude',
    gemini: 'Gemini',
    grok: 'Grok',
    perplexity: 'Perplexity',
    mistral: 'Mistral',
};
export const providerBaseUrls = {
    chatgpt: 'https://chatgpt.com/?q=',
    claude: 'https://claude.ai/new?q=',
    gemini: 'https://www.google.com/search?udm=50&source=searchlabs&q=',
    grok: 'https://grok.com/?q=',
    perplexity: 'https://www.perplexity.ai/?q=',
    mistral: 'https://chat.mistral.ai/chat?q=',
};
export const defaultPrompts = [
    {
        label: 'Summarize',
        template: 'Visit {{url}} and summarize the page clearly. Use this context if helpful: {{context}}',
    },
    {
        label: 'Explain',
        template: 'Visit {{url}} and explain {{siteName}} for a first-time visitor. Page title: {{title}}.',
    },
];
export const promptTemplates = [
    {
        category: 'Content',
        label: 'Summarize',
        description: 'Turn a page into a concise brief.',
        grokFriendly: true,
        template: 'Visit {{url}} and summarize the page clearly. Include the main idea, important details, and useful next steps. Context: {{context}}',
    },
    {
        category: 'Content',
        label: 'Explain like I am new',
        description: 'Make a page understandable for first-time visitors.',
        grokFriendly: true,
        template: 'Visit {{url}} and explain {{siteName}} to a first-time visitor. Use the title "{{title}}" and description "{{description}}" if helpful.',
    },
    {
        category: 'SaaS',
        label: 'Compare options',
        description: 'Help visitors compare a product or offer.',
        grokFriendly: true,
        template: 'Visit {{url}} and compare the offer on {{siteName}} with likely alternatives. Highlight who it is for, tradeoffs, and questions to ask before buying.',
    },
    {
        category: 'Support',
        label: 'Troubleshoot',
        description: 'Use a docs/support page for debugging.',
        grokFriendly: true,
        template: 'Visit {{url}} and help me troubleshoot the issue described by this page. Ask clarifying questions if needed. Selected text: {{selection}}',
    },
    {
        category: 'Research',
        label: 'Research deeper',
        description: 'Continue from a page into a research workflow.',
        grokFriendly: true,
        template: 'Use {{url}} as the starting point for deeper research. Summarize what is known, list open questions, and suggest reliable sources to verify next.',
    },
    {
        category: 'Selection',
        label: 'Explain selection',
        description: 'Explain highlighted text from the page.',
        template: 'Explain this selected passage from {{siteName}} in plain language: {{selection}}. Page: {{url}}',
    },
];
export const defaultWidgetConfig = {
    siteName: 'ContinueWith',
    providers: ['chatgpt', 'claude', 'perplexity', 'mistral'],
    prompts: defaultPrompts,
    position: 'bottom-right',
    brandingEnabled: true,
    context: '',
};
export function isProvider(value) {
    return providers.includes(value);
}
export function normalizeProviders(values) {
    const normalized = (values || []).filter(isProvider);
    return normalized.length ? normalized : defaultWidgetConfig.providers;
}
export function normalizePrompts(values) {
    const prompts = (values || [])
        .map((prompt) => ({
        label: String(prompt.label || '').trim(),
        template: String(prompt.template || '').trim(),
    }))
        .filter((prompt) => prompt.label && prompt.template);
    return prompts.length ? prompts : defaultPrompts;
}
export function buildPrompt(template, variables = {}) {
    const replacements = {
        url: variables.url || '',
        title: variables.title || '',
        description: variables.description || '',
        siteName: variables.siteName || '',
        context: variables.context || '',
        selection: variables.selection || '',
    };
    return template
        .replace(/\{\{(url|title|description|siteName|context|selection)\}\}/g, (_, key) => {
        return replacements[key] || '';
    })
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}
export function buildProviderUrl({ provider, prompt }) {
    if (!isProvider(provider)) {
        throw new Error(`Unsupported ContinueWith provider: ${provider}`);
    }
    return providerBaseUrls[provider] + encodeURIComponent(prompt);
}
export function openInProvider(input) {
    window.open(buildProviderUrl(input), '_blank', 'noopener,noreferrer');
}
export { DEMO_PUBLIC_KEY, DEFAULT_WIDGET_ORIGIN, agentInstallRule, astroWidgetSnippet, hasContinueWithInstall, htmlWidgetSnippet, nextJsWidgetBlock, widgetScriptUrl, } from './install.js';
export { buildWidgetSnippet, defaultWidgetTheme, inlineMountMarkup, normalizeWidgetTheme, themeToCssBlock, themeToStyleObject, widgetThemeCssVars, } from './widgetTheme.js';
export { agentGuides, agentSkills, mcpTools } from './skills.js';
