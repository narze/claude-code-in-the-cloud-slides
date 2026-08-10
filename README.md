# Slidev AI Template

A minimal [Slidev](https://sli.dev) starter, pre-wired for AI coding agents
(per [sli.dev/guide/work-with-ai](https://sli.dev/guide/work-with-ai)) so you
can fork it and have an agent write your slides for you.

## What's included

- A bare Slidev project — one `slides.md` with a few example slides showing
  layouts, code highlighting, click animations, and a Mermaid diagram
- The official `slidevjs/slidev` skill, vendored into `.claude/skills/slidev`
  (via `.agents/skills/slidev`) so Claude Code understands Slidev's syntax
  and features out of the box, offline, with no setup step
- `.mcp.json` wiring up Slidev's built-in MCP server (`slidev mcp slides.md`)
  so the agent can inspect, edit, reorder, and navigate slides through
  structured tools instead of raw text edits
- `CLAUDE.md` pointing the agent at both of the above
- A GitHub Actions workflow that builds and deploys the deck to GitHub Pages
  on push to `main`

## Using this template

1. Click **Use this template** (or fork the repo)
2. `pnpm install`
3. `pnpm dev` — opens the deck at `http://localhost:3030`
4. Delete the example slides in `slides.md` and write your own, or open the
   project in Claude Code and ask it to build the deck for you

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server with hot reload |
| `pnpm build` | Build a static site into `dist/` |
| `pnpm export` | Export the deck to PDF/PNG/etc. |

## Deploying

Enable GitHub Pages in the repo settings (Settings → Pages → Source:
**GitHub Actions**). Every push to `main` builds and publishes the deck via
`.github/workflows/deploy.yml`.

## License

[MIT](./LICENSE)
