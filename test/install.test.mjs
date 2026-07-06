import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DEMO_PUBLIC_KEY,
  agentInstallRule,
  hasContinueWithInstall,
  htmlWidgetSnippet,
  nextJsWidgetBlock,
  widgetScriptUrl,
} from '../dist/index.js';

test('install helpers expose stable widget URLs and snippets', () => {
  assert.equal(widgetScriptUrl(), 'https://continuewith.ai/widget/v1.js');
  assert.match(htmlWidgetSnippet(), new RegExp(`data-site-key="${DEMO_PUBLIC_KEY}"`));
  assert.match(nextJsWidgetBlock(), /strategy="afterInteractive"/);
  assert.ok(agentInstallRule.includes('cw_demo_public_key'));
});

test('hasContinueWithInstall detects embedded widget script', () => {
  const snippet = htmlWidgetSnippet();
  assert.equal(hasContinueWithInstall(snippet), true);
  assert.equal(hasContinueWithInstall('<html><body></body></html>'), false);
});
