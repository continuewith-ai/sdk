import assert from 'node:assert/strict';
import test from 'node:test';
import { agentGuides, agentSkills, mcpTools } from '../dist/index.js';

test('agent skills catalog is non-empty and unique', () => {
  const ids = new Set();
  for (const skill of agentSkills) {
    assert.ok(skill.name);
    assert.ok(skill.description);
    assert.equal(ids.has(skill.id), false);
    ids.add(skill.id);
  }
  assert.ok(agentSkills.length >= 4);
});

test('agent guides and mcp tools are documented', () => {
  assert.ok(agentGuides.length >= 5);
  assert.ok(mcpTools.length >= 4);
  assert.ok(agentGuides.some((guide) => guide.slug === 'install-methods'));
});
