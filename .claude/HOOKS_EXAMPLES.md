# Hook Examples for Claude Code

Hooks run scripts automatically at specific points in Claude's workflow.
Unlike CLAUDE.md instructions (advisory), hooks are **deterministic** — they always fire.

To enable any of these, add the JSON to your `.claude/settings.json` or `.claude/settings.local.json`
under a top-level `"hooks"` key. Or use `/hooks` in Claude Code for an interactive setup.

---

## 1. Auto-format after edits (PostToolUse)

Runs your formatter whenever Claude edits or creates a file.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write \"$(echo $CLAUDE_TOOL_INPUT | jq -r '.file_path')\" 2>/dev/null || rubocop -A \"$(echo $CLAUDE_TOOL_INPUT | jq -r '.file_path')\" 2>/dev/null || true",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**Adapt for your stack:**
- Ruby/Rails: `rubocop -A`
- Elixir: `mix format`
- Python: `ruff format` or `black`
- JS/TS: `prettier --write` or `eslint --fix`

---

## 2. Desktop notification on completion (Notification)

Get notified when Claude needs attention.

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude needs attention\" with title \"Claude Code\"' 2>/dev/null || notify-send 'Claude Code' 'Claude needs attention' 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

---

## 3. Block edits to protected files (PreToolUse)

Prevent Claude from modifying sensitive files (exit code 2 = block).

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILE=$(echo \"$CLAUDE_TOOL_INPUT\" | jq -r '.file_path // .content' | head -1) && echo \"$FILE\" | grep -qE '(\\.env|credentials|secrets|master\\.key|/config/credentials)' && echo 'Protected file — ask the user first' >&2 && exit 2 || exit 0",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

---

## 4. Re-inject context after compaction (SessionStart)

When context is compacted, remind Claude of critical context.

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo '{\"systemMessage\": \"REMINDER: After compaction, re-read CLAUDE.md and any active plan files before continuing. Check .claude/lessons.md for recent corrections.\"}'",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

---

## How to install

### Option A: Interactive
Run `/hooks` in Claude Code and paste the relevant JSON.

### Option B: Manual
Add to `.claude/settings.local.json` (private) or `.claude/settings.json` (shared with team):

```json
{
  "permissions": { ... },
  "hooks": {
    "PostToolUse": [ ... ],
    "Notification": [ ... ]
  }
}
```

### Option C: Per-skill hooks
Add hooks to a skill's YAML frontmatter to scope them to that skill only.

---

## Available hook events

| Event | When it fires | Common use |
|-------|--------------|------------|
| SessionStart | Session starts, resumes, clears, compacts | Re-inject context |
| PreToolUse | Before Claude uses a tool | Block dangerous actions |
| PostToolUse | After Claude uses a tool | Auto-format, log changes |
| Stop | Claude finishes a response | Verify completeness |
| Notification | Claude needs user attention | Desktop alerts |
| SubagentStart | Subagent launches | Logging |
| SubagentStop | Subagent finishes | Validation |

See Claude Code docs for all 17 events and their matcher patterns.
