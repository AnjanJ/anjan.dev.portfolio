# MCP Server Configuration

MCP (Model Context Protocol) connects Claude Code to external tools and services.
This is a reference guide — configure MCP servers based on your project's needs.

## Quick Setup

```bash
# Remote server (HTTP)
claude mcp add --transport http <name> <url>

# Local process (stdio)
claude mcp add <name> -- <command> [args...]

# Check status
claude mcp list        # CLI
/mcp                   # In-session
```

## Common MCP Servers

### GitHub (issues, PRs, code search)
```bash
claude mcp add github -- npx -y @modelcontextprotocol/server-github
```
Requires: `GITHUB_TOKEN` env var.

### PostgreSQL (query your database)
```bash
claude mcp add postgres -- npx -y @modelcontextprotocol/server-postgres "postgresql://user:pass@localhost/dbname"
```

### Filesystem (access files outside project)
```bash
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /path/to/dir
```

### Slack
```bash
claude mcp add slack -- npx -y @anthropic/mcp-server-slack
```
Requires: `SLACK_BOT_TOKEN` env var.

## Scopes

| Scope | Storage | Sharing |
|-------|---------|---------|
| Local (default) | `~/.claude.json` per project | Private to you |
| Project | `.mcp.json` in project root | Shared via git |
| User | `~/.claude.json` global | All your projects |

**Precedence:** local > project > user.

## Team Sharing

Create `.mcp.json` at project root for servers the whole team needs:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

Environment variables use `${VAR}` syntax and resolve at runtime.
Each team member sets their own tokens in their shell environment.

## When to Use MCP vs CLI Tools

- **Prefer CLI tools** (`gh`, `aws`, `gcloud`) when they exist — zero setup, no context cost.
- **Use MCP** when you need Claude to interact with a service that has no CLI, or when
  the MCP server provides richer tool definitions than a CLI wrapper.

## Context Cost

MCP tool definitions are loaded every request. Many MCP servers = more context consumed.
Claude Code's tool search (enabled by default) defers loading tools beyond 10% of context.
