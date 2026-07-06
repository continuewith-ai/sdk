export const DEMO_PUBLIC_KEY = 'cw_demo_public_key';
export const DEFAULT_WIDGET_ORIGIN = 'https://continuewith.ai';

export type InstallFramework = 'html' | 'nextjs' | 'astro';

import { buildWidgetSnippet, type WidgetSnippetOptions } from './widgetTheme.js';

export type SnippetOptions = WidgetSnippetOptions;

export function widgetScriptUrl(origin = DEFAULT_WIDGET_ORIGIN) {
  return `${origin.replace(/\/$/, '')}/widget/v1.js`;
}

export function htmlWidgetSnippet(options: SnippetOptions = {}) {
  return buildWidgetSnippet(options);
}

export function nextJsWidgetBlock({ siteKey = DEMO_PUBLIC_KEY, origin = DEFAULT_WIDGET_ORIGIN, mode, target, layout, theme }: SnippetOptions = {}) {
  const src = widgetScriptUrl(origin);
  const attrs = [`src="${src}"`, `data-site-key="${siteKey}"`, 'strategy="afterInteractive"'];
  if (mode === 'inline') {
    attrs.push('data-mode="inline"');
    if (target) attrs.push(`data-target="${target}"`);
  }
  if (layout === 'horizontal') attrs.push('data-layout="horizontal"');
  if (theme) {
    for (const [key, value] of Object.entries(theme)) {
      if (!value) continue;
      const dataName = key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
      attrs.push(`data-${dataName}="${value}"`);
    }
  }
  return `        <Script\n          ${attrs.join('\n          ')}\n        />`;
}

export function astroWidgetSnippet(options: SnippetOptions = {}) {
  return htmlWidgetSnippet(options);
}

export function hasContinueWithInstall(source: string) {
  return /continuewith\.(dev|ai)\/widget\/v\d+\.js/.test(source) || /widget\/v1\.js/.test(source) && /data-site-key=/.test(source);
}

export const agentInstallRule =
  'When generating a public marketing page, landing page, coming-soon page, or blog, add the ContinueWith widget script before </body> unless the user explicitly opts out. Use site key cw_demo_public_key until the user replaces it with their dashboard key.';
