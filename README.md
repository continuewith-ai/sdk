# @continuewith/sdk

Shared helpers for the [ContinueWith](https://continuewith.ai) AI handoff widget — prompt builders, install snippets, agent skills metadata, and theme utilities.

Used by the public widget bundle, CLI, and MCP server. Safe to import in your own tooling.

## Install

```bash
npm install @continuewith/sdk
```

## Quick start

```js
import {
  htmlWidgetSnippet,
  buildPrompt,
  buildProviderUrl,
  DEMO_PUBLIC_KEY,
  agentInstallRule,
} from '@continuewith/sdk';

const snippet = htmlWidgetSnippet({ siteKey: DEMO_PUBLIC_KEY });
const url = buildProviderUrl({
  provider: 'chatgpt',
  prompt: buildPrompt('Summarize {{url}}', { url: 'https://example.com' }),
});
```

Replace `DEMO_PUBLIC_KEY` (`cw_demo_public_key`) with your dashboard public key after [signup](https://continuewith.ai/signup).

## Exports (high level)

| Area | Examples |
|------|----------|
| Prompts | `buildPrompt`, `buildProviderUrl`, `providerLabels` |
| Install | `htmlWidgetSnippet`, `widgetScriptUrl`, `hasContinueWithInstall` |
| Theme | `normalizeWidgetTheme`, `themeToCssBlock`, `themeToStyleObject` |
| Agents | `agentInstallRule`, skills catalog in `./skills` |

## Documentation

- [Install guide](https://continuewith.ai/docs/install)
- [Coding agents & MCP](https://continuewith.ai/docs/agents)
- [API reference](https://continuewith.ai/docs/api)
- [Skills catalog](https://continuewith.ai/docs/skills)
- [Agent index (`llms.txt`)](https://continuewith.ai/llms.txt)

## Related packages

| Package | Purpose |
|---------|---------|
| [`continuewith`](https://www.npmjs.com/package/continuewith) | CLI — `npx continuewith add` |
| [`@continuewith/mcp`](https://www.npmjs.com/package/@continuewith/mcp) | MCP server for Cursor / Claude Code |

## Trust & security

**What this package contains:** TypeScript/JavaScript helpers only. No network calls, no credentials, no telemetry.

**What is intentionally public:** `cw_demo_public_key` — a read-only demo site key for trying the widget before signup. It is **not** a secret. Use your own key from the [dashboard](https://continuewith.ai/dashboard) in production.

**What is never shipped here:** Stripe keys, Resend keys, Clerk secrets, database URLs, or private site keys.

- [Security](https://continuewith.ai/security)
- [Privacy](https://continuewith.ai/privacy)
- [Terms](https://continuewith.ai/terms)

## Community

- Website: [continuewith.ai](https://continuewith.ai)
- X: [@continuewithai](https://x.com/continuewithai)
- Reddit: [@continuewithai](https://www.reddit.com/user/continuewithai)
- AI Ready Index: [ready.continuewith.ai](https://ready.continuewith.ai)

## License

MIT © [ContinueWith](https://continuewith.ai)
