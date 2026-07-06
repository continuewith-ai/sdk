import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildWidgetSnippet,
  inlineMountMarkup,
  normalizeWidgetTheme,
  themeToCssBlock,
} from '../dist/index.js';

test('buildWidgetSnippet keeps floating mode backward compatible', () => {
  const snippet = buildWidgetSnippet({ siteKey: 'cw_test' });
  assert.match(snippet, /data-site-key="cw_test"/);
  assert.doesNotMatch(snippet, /data-mode=/);
});

test('buildWidgetSnippet supports inline mode and theme attrs', () => {
  const snippet = buildWidgetSnippet({
    siteKey: 'cw_test',
    mode: 'inline',
    target: '#continuewith-widget',
    layout: 'horizontal',
    theme: { primaryColor: '#111111', background: '#ffffff' },
  });
  assert.match(snippet, /data-mode="inline"/);
  assert.match(snippet, /data-target="#continuewith-widget"/);
  assert.match(snippet, /data-layout="horizontal"/);
  assert.match(snippet, /data-primary-color="#111111"/);
});

test('theme helpers normalize and render css block', () => {
  const theme = normalizeWidgetTheme({ primaryColor: ' #222 ', background: '' });
  assert.equal(theme.primaryColor, '#222');
  assert.equal(theme.background, undefined);
  assert.match(themeToCssBlock({ primaryColor: '#111' }), /--cw-primary-color: #111;/);
});

test('inlineMountMarkup renders target container', () => {
  assert.match(inlineMountMarkup('#my-widget'), /id="my-widget"/);
});
