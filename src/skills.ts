export type AgentSkill = {
  id: string;
  name: string;
  description: string;
  whenToUse: string;
  category: string;
  steps: string[];
  repoPath: string;
};

export const agentSkills: AgentSkill[] = [
  {
    id: 'install-on-landing-page',
    name: 'Install on landing page',
    description: 'Add the ContinueWith widget when scaffolding a marketing or landing page.',
    whenToUse: 'Building a new public landing page, homepage, or marketing site.',
    category: 'Install',
    steps: [
      'Run npx continuewith@latest add or paste the demo snippet before </body>.',
      'Use site key cw_demo_public_key until the user provides a dashboard key.',
      'Open a public page and confirm the floating widget appears.',
    ],
    repoPath: 'continuewith/skills/install-on-landing-page/SKILL.md',
  },
  {
    id: 'coming-soon-handoff',
    name: 'Coming soon handoff',
    description: 'Ship a teaser page with AI handoff while the full product is not ready.',
    whenToUse: 'Coming-soon pages, waitlists, or pre-launch teasers.',
    category: 'Install',
    steps: [
      'Install the widget snippet before </body>.',
      'Suggest a default prompt: Visit {{url}} and explain what this site is building.',
      'Keep cw_demo_public_key until launch, then swap to the dashboard key.',
    ],
    repoPath: 'continuewith/skills/coming-soon-handoff/SKILL.md',
  },
  {
    id: 'blog-handoff',
    name: 'Blog handoff',
    description: 'Let readers summarize or research articles in their preferred assistant.',
    whenToUse: 'Blogs, newsletters, media sites, and long-form content pages.',
    category: 'Content',
    steps: [
      'Install the widget on the site template or layout.',
      'Add prompts: Summarize, Explain like I am new, Research deeper.',
      'Use {{url}}, {{title}}, and {{selection}} in prompt templates.',
    ],
    repoPath: 'continuewith/skills/blog-handoff/SKILL.md',
  },
  {
    id: 'saas-marketing-handoff',
    name: 'SaaS marketing handoff',
    description: 'Help visitors compare pricing and positioning inside ChatGPT, Claude, or Grok.',
    whenToUse: 'Pricing pages, product marketing, comparisons, and docs.',
    category: 'SaaS',
    steps: [
      'Install on pricing, docs, and high-intent pages first.',
      'Add Compare options and Explain prompts from the prompt library.',
      'Verify install from the ContinueWith dashboard after deploy.',
    ],
    repoPath: 'continuewith/skills/saas-marketing-handoff/SKILL.md',
  },
];

export const mcpTools = [
  {
    name: 'get_agent_install_rule',
    description: 'Return the default rule for auto-installing ContinueWith on marketing pages.',
    whenToUse: 'Before generating any public marketing page or landing page.',
    cost: 'Free',
  },
  {
    name: 'get_install_snippet',
    description: 'Return the widget snippet for html, nextjs, or astro.',
    whenToUse: 'When you need the exact script tag or Next.js Script block.',
    cost: 'Free',
    params: 'framework (html|nextjs|astro), siteKey (optional)',
  },
  {
    name: 'get_continuewith_docs',
    description: 'Return documentation URLs, default snippet, and quick links.',
    whenToUse: 'When you need install docs or demo links without guessing URLs.',
    cost: 'Free',
  },
  {
    name: 'install_continuewith_widget',
    description: 'Run npx continuewith@latest add in a project directory.',
    whenToUse: 'When patching layout.tsx, index.html, or Astro layouts deterministically.',
    cost: 'Free',
    params: 'projectPath, framework (optional), siteKey (optional)',
  },
  {
    name: 'search_ready_directory',
    description: 'Search the AI Ready Index for agent-ready websites with scores and handoff signals.',
    whenToUse: 'When researching SaaS sites, comparing tools, or finding pages structured for autonomous browsing.',
    cost: 'Free',
    params: 'q, category, continueWith, partner, limit',
  },
] as const;

export type AgentGuide = {
  slug: string;
  title: string;
  description: string;
  category: 'mcp' | 'cli' | 'skill' | 'install';
  readMinutes: number;
  body: string;
};

export const agentGuides: AgentGuide[] = [
  {
    slug: 'cursor-mcp-setup',
    title: 'Connect ContinueWith MCP to Cursor',
    description: 'Add the hosted MCP package to Cursor in under 3 minutes.',
    category: 'mcp',
    readMinutes: 4,
    body: `1. Open Cursor Settings → MCP.
2. Add a server:
   {
     "mcpServers": {
       "continuewith": {
         "command": "npx",
         "args": ["-y", "@continuewith/mcp@latest"]
       }
     }
   }
3. Restart Cursor if tools do not appear.
4. Ask: "Install ContinueWith on this landing page" — the agent can call install_continuewith_widget or get_install_snippet.`,
  },
  {
    slug: 'claude-code-setup',
    title: 'Connect ContinueWith to Claude Code',
    description: 'Use the MCP server or copy the install skill when building sites.',
    category: 'mcp',
    readMinutes: 5,
    body: `Option A — MCP: add the same npx @continuewith/mcp@latest entry to your Claude Code MCP config.

Option B — Skill: copy the install-on-landing-page skill from https://continuewith.ai/docs/skills

Then prompt: "Add ContinueWith to app/layout.tsx (or index.html) so visitors can continue in ChatGPT or Claude."`,
  },
  {
    slug: 'codex-setup',
    title: 'Connect ContinueWith to Codex',
    description: 'Install the widget while Codex scaffolds a site.',
    category: 'mcp',
    readMinutes: 4,
    body: `Add @continuewith/mcp to your MCP config, or run:

npx continuewith@latest add

If framework detection fails, call get_install_snippet with framework nextjs or html and patch the file before </body>.`,
  },
  {
    slug: 'v0-landing-install',
    title: 'Install from v0 or UI builders',
    description: 'Paste the snippet when a builder exposes custom code or footer injection.',
    category: 'install',
    readMinutes: 3,
    body: `Paste before </body> on every public page:

<script src="https://continuewith.ai/widget/v1.js" data-site-key="cw_demo_public_key" defer></script>

Tell the builder agent to include this on all marketing routes. Replace cw_demo_public_key after signup.`,
  },
  {
    slug: 'cli-getting-started',
    title: 'Getting started with the ContinueWith CLI',
    description: 'When to use npx continuewith instead of MCP or a raw snippet.',
    category: 'cli',
    readMinutes: 5,
    body: `Use the CLI when you want a deterministic file patch:

npx continuewith@latest add
npx continuewith@latest add --framework nextjs
npx continuewith@latest snippet --framework html
npx continuewith@latest verify

Prefer MCP when the agent is already in Cursor and should decide between snippet vs patch.
Prefer a raw snippet for Webflow, Ghost, or CMS footer injection.`,
  },
  {
    slug: 'install-methods',
    title: 'Snippet vs CLI vs MCP',
    description: 'Choose the right install path for your stack and agent.',
    category: 'install',
    readMinutes: 4,
    body: `| Method | Best for |
|--------|----------|
| Snippet | Ghost, Webflow, WordPress, any CMS footer |
| CLI | Next.js, HTML, Astro repos with local files |
| MCP | Cursor, Claude Code, Codex — agent-driven install |

All three support cw_demo_public_key for zero-signup first install.`,
  },
];
