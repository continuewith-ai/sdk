import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildPrompt,
  buildProviderUrl,
  defaultPrompts,
  isProvider,
  normalizePrompts,
  normalizeProviders,
  promptTemplates,
  providerBaseUrls,
  providers,
} from '../dist/index.js';

test('buildPrompt replaces supported variables and trims empty output', () => {
  const prompt = buildPrompt('Read {{url}}\nTitle: {{title}}\nMissing: {{selection}}', {
    url: 'https://example.com/docs',
    title: 'Docs',
  });

  assert.equal(prompt, 'Read https://example.com/docs\nTitle: Docs\nMissing:');
});

test('buildProviderUrl validates provider and URL-encodes prompt', () => {
  const prompt = 'Summarize https://example.com?a=1&b=two words';
  const url = buildProviderUrl({ provider: 'chatgpt', prompt });

  assert.equal(url, providerBaseUrls.chatgpt + encodeURIComponent(prompt));
  assert.throws(() => buildProviderUrl({ provider: 'unknown', prompt }), /Unsupported ContinueWith provider/);
});

test('provider registry is internally consistent', () => {
  for (const provider of providers) {
    assert.equal(isProvider(provider), true);
    assert.equal(typeof providerBaseUrls[provider], 'string');
    assert.match(providerBaseUrls[provider], /^https:\/\//);
  }

  assert.equal(isProvider('openai'), false);
});

test('normalizers fall back to defaults and remove invalid values', () => {
  assert.deepEqual(normalizeProviders(['chatgpt', 'bad', 'claude']), ['chatgpt', 'claude']);
  assert.deepEqual(normalizeProviders(['bad']), ['chatgpt', 'claude', 'perplexity', 'mistral']);

  assert.deepEqual(normalizePrompts([{ label: '  A ', template: '  B ' }, { label: '', template: 'Nope' }]), [{ label: 'A', template: 'B' }]);
  assert.deepEqual(normalizePrompts([{ label: '', template: '' }]), defaultPrompts);
});

test('promptTemplates are valid, unique and include at least one non-URL selection template', () => {
  const keys = new Set();

  for (const template of promptTemplates) {
    assert.ok(template.category);
    assert.ok(template.label);
    assert.ok(template.description);
    assert.ok(template.template);
    const key = `${template.label}:${template.template}`;
    assert.equal(keys.has(key), false, `duplicate template ${template.label}`);
    keys.add(key);
  }

  assert.ok(promptTemplates.some((template) => template.template.includes('{{selection}}')));
  assert.ok(promptTemplates.some((template) => template.grokFriendly));
});
