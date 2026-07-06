import { DEMO_PUBLIC_KEY, DEFAULT_WIDGET_ORIGIN, widgetScriptUrl } from './install.js';

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

export const defaultWidgetTheme: Required<WidgetTheme> = {
  primaryColor: '#111827',
  background: '#ffffff',
  textColor: '#111827',
  borderColor: '#e5e7eb',
  borderRadius: '14px',
  padding: '14px',
  gap: '8px',
};

export const widgetThemeCssVars: Record<keyof WidgetTheme, string> = {
  primaryColor: '--cw-primary-color',
  background: '--cw-background',
  textColor: '--cw-text-color',
  borderColor: '--cw-border-color',
  borderRadius: '--cw-border-radius',
  padding: '--cw-padding',
  gap: '--cw-gap',
};

export function normalizeWidgetTheme(theme: WidgetTheme | undefined): WidgetTheme {
  if (!theme || typeof theme !== 'object') return {};
  const next: WidgetTheme = {};
  for (const key of Object.keys(widgetThemeCssVars) as (keyof WidgetTheme)[]) {
    const value = String(theme[key] || '').trim();
    if (value) next[key] = value.slice(0, 40);
  }
  return next;
}

export function themeToStyleObject(theme: WidgetTheme = {}) {
  const merged = { ...defaultWidgetTheme, ...normalizeWidgetTheme(theme) };
  return Object.fromEntries(
    (Object.keys(widgetThemeCssVars) as (keyof WidgetTheme)[]).map((key) => [widgetThemeCssVars[key], merged[key]]),
  ) as Record<string, string>;
}

export function themeToCssBlock(theme: WidgetTheme = {}, selector = '.continuewith-widget') {
  const vars = themeToStyleObject(theme);
  const lines = Object.entries(vars).map(([name, value]) => `  ${name}: ${value};`);
  return `${selector} {\n${lines.join('\n')}\n}`;
}

export type WidgetSnippetOptions = {
  siteKey?: string;
  origin?: string;
  defer?: boolean;
  mode?: WidgetDisplayMode;
  target?: string;
  layout?: WidgetLayout;
  theme?: WidgetTheme;
};

function dataAttr(name: string, value: string) {
  return `data-${name}="${value.replace(/"/g, '&quot;')}"`;
}

export function buildWidgetSnippet({
  siteKey = DEMO_PUBLIC_KEY,
  origin = DEFAULT_WIDGET_ORIGIN,
  defer = true,
  mode = 'floating',
  target = '',
  layout = 'vertical',
  theme = {},
}: WidgetSnippetOptions = {}) {
  const attrs = [`src="${widgetScriptUrl(origin)}"`, dataAttr('site-key', siteKey)];
  if (defer) attrs.push('defer');
  if (mode === 'inline') {
    attrs.push(dataAttr('mode', 'inline'));
    if (target) attrs.push(dataAttr('target', target));
  }
  if (layout === 'horizontal') attrs.push(dataAttr('layout', 'horizontal'));
  const normalizedTheme = normalizeWidgetTheme(theme);
  const themeKeys: (keyof WidgetTheme)[] = ['primaryColor', 'background', 'textColor', 'borderColor', 'borderRadius', 'padding', 'gap'];
  for (const key of themeKeys) {
    const value = normalizedTheme[key];
    if (!value) continue;
    const dataName = key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
    attrs.push(dataAttr(dataName, value));
  }
  return `<script ${attrs.join(' ')}></script>`;
}

export function inlineMountMarkup(target = '#continuewith-widget') {
  const id = target.startsWith('#') ? target.slice(1) : 'continuewith-widget';
  return `<div id="${id}"></div>`;
}
