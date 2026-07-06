export type AgentSkill = {
    id: string;
    name: string;
    description: string;
    whenToUse: string;
    category: string;
    steps: string[];
    repoPath: string;
};
export declare const agentSkills: AgentSkill[];
export declare const mcpTools: readonly [{
    readonly name: "get_agent_install_rule";
    readonly description: "Return the default rule for auto-installing ContinueWith on marketing pages.";
    readonly whenToUse: "Before generating any public marketing page or landing page.";
    readonly cost: "Free";
}, {
    readonly name: "get_install_snippet";
    readonly description: "Return the widget snippet for html, nextjs, or astro.";
    readonly whenToUse: "When you need the exact script tag or Next.js Script block.";
    readonly cost: "Free";
    readonly params: "framework (html|nextjs|astro), siteKey (optional)";
}, {
    readonly name: "get_continuewith_docs";
    readonly description: "Return documentation URLs, default snippet, and quick links.";
    readonly whenToUse: "When you need install docs or demo links without guessing URLs.";
    readonly cost: "Free";
}, {
    readonly name: "install_continuewith_widget";
    readonly description: "Run npx continuewith@latest add in a project directory.";
    readonly whenToUse: "When patching layout.tsx, index.html, or Astro layouts deterministically.";
    readonly cost: "Free";
    readonly params: "projectPath, framework (optional), siteKey (optional)";
}, {
    readonly name: "search_ready_directory";
    readonly description: "Search the AI Ready Index for agent-ready websites with scores and handoff signals.";
    readonly whenToUse: "When researching SaaS sites, comparing tools, or finding pages structured for autonomous browsing.";
    readonly cost: "Free";
    readonly params: "q, category, continueWith, partner, limit";
}];
export type AgentGuide = {
    slug: string;
    title: string;
    description: string;
    category: 'mcp' | 'cli' | 'skill' | 'install';
    readMinutes: number;
    body: string;
};
export declare const agentGuides: AgentGuide[];
