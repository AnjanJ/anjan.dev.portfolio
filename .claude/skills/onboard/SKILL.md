---
description: "Multi-phase codebase onboarding: zoom in, zoom out, recognize patterns, learn history, generate docs"
user-invocable: true
arguments: "[zoom-in <file>|zoom-out|full] — scope of exploration (default: full)"
---

# /onboard — Codebase Onboarding

Systematically explore and document an unfamiliar codebase. Based on Ridhwana Khan's
"Architecture of Understanding" talk from RubyConf TH 2026
(https://www.youtube.com/watch?v=Op5GunxvRKU): zoom in first, then zoom out, recognize
patterns, learn from history, externalize understanding.

**Core philosophy:** "The instinct is to zoom out, get a lay of the land. Resist that
urge. Zoom in first." Mental models built bottom-up (from a real flow) are more accurate
than those built top-down (from directory listings).

## Arguments

- `full` (default) — Run all 5 phases with checkpoints between each
- `zoom-in <file>` — Start Phase 1 from a specific file (skip auto-detection)
- `zoom-out` — Skip Phase 1, start at Phase 2 (only if you already understand a flow)

---

## Phase 1: Zoom In — Get a Foothold

> "Keep scope tight — paste only the smallest relevant snippet."
> "Ask practical questions, not architectural ones."

**Goal:** Trace ONE request/flow end-to-end. Build your first mental model from concrete
code, not abstractions.

### 1.1 Pick an Entry Point

If user provided `zoom-in <file>`, use that file. Otherwise auto-detect:

1. Check README for getting-started hints, main endpoints, or "how it works" sections
2. Check recent git history — `git log --oneline -20` — recent changes = active code
3. Find the "front door" by stack:
   - Rails: `config/routes.rb` → pick the most-used controller
   - Phoenix: `router.ex` → pick the main scope
   - React: `src/App.tsx` or `src/index.tsx` → follow the main route
   - Express/Fastify: `app.js` or `server.js` → find route registration
   - Go: `main.go` or `cmd/` → find the HTTP handler setup
   - Generic: look for `main`, `index`, `app`, `server` in root or `src/`

### 1.2 Trace the Flow

Use the `codebase-explorer` agent for heavy file reading. Keep main context clean.

1. Follow the call chain through layers (e.g., controller → service → model → DB)
2. **Stop after 5-8 files** — this is reconnaissance, not exhaustive mapping
3. At each file, note:
   - Naming conventions (snake_case? camelCase? what prefix/suffix patterns?)
   - File organization (by feature? by type? by layer?)
   - How dependencies are referenced (imports, injection, includes, concerns)

### 1.3 Ask Practical Questions

Frame questions about behavior, not architecture (Ridhwana's approach):
- "What database record changes when X happens?"
- "Is this synchronous or does it happen in a background job?"
- "What would have to fail for this flow to break?"
- "Where does the data come from? Where does it go?"
- "What happens if this is called twice?"

### 1.4 Validate with Tests

If tests exist for this flow, read them:
- Do the test descriptions match the behavior you traced?
- Do tests reveal edge cases or constraints not visible in the code?
- Are there test fixtures/factories that show expected data shapes?

### Output: "First Trail"

Present to user:

```
## First Trail: [Flow Name]

**Entry point:** path/to/file.rb:line
**Flow:** Controller → Service → Model → DB (list files)

**What happens:**
1. [Step-by-step description of the flow]

**Conventions spotted:**
- [Naming, patterns, organization]

**Open questions:**
- [Practical questions that need answers]

**Tests found:** [Yes/No, what they cover]
```

### CHECKPOINT

**Stop and ask:** "Does this trail match your understanding? Should I trace a different
flow, or zoom out to map the full architecture?"

Wait for user response. Do NOT proceed without approval.

---

## Phase 2: Zoom Out — Map the Architecture

> "I'm not tracing edge cases. I'm trying to see the dominant shapes."
> "Data models are the most honest part of the system."

**Goal:** Classify the system's shape, flow patterns, and core entities without getting
lost in details.

### 2.1 Stack Detection

Read dependency files (Gemfile, package.json, mix.exs, go.mod, requirements.txt, etc.):
- Framework + version
- Database (Postgres, MySQL, SQLite, MongoDB, etc.)
- Background jobs (Sidekiq, GoodJob, Oban, BullMQ, Celery, etc.)
- Cache (Redis, Memcached, etc.)
- Search (Elasticsearch, Meilisearch, etc.)
- External services (S3, SendGrid, Stripe, Twilio, etc.)

### 2.2 Architectural Shape

Classify from directory structure and code organization:

| Shape | Signals |
|-------|---------|
| Monolith with conceptual seams | Single deploy, `app/` with models/controllers/services |
| Modular monolith | `engines/`, `packages/`, or `components/` with internal boundaries |
| Microservices | Multiple services in subdirs, API gateways, service-to-service calls |
| Monorepo | `apps/`, `packages/`, shared libraries, workspace config |

### 2.3 Flow Pattern

| Pattern | Signals |
|---------|---------|
| Request-driven (sync) | Routes → controllers → response cycle |
| Event-driven (async) | Event/message classes, broker configs, subscriber definitions |
| Hybrid | Both routes AND event processing (most real apps) |

### 2.4 Data Model as Ground Truth

Read the schema source of truth for this stack:
- Rails: `db/schema.rb` or migrations
- Phoenix: Ecto schemas + migrations
- Django: models.py files
- Prisma: `schema.prisma`
- Go: struct definitions or migration files

From the schema:
1. Identify 3-5 **core entities** everything else connects to
2. Map directional relationships (has_many, belongs_to, many-to-many)
3. Look for history preservation: audit tables, event logs, versioned records
4. Look for soft deletes (`deleted_at`, `discarded_at`) vs hard deletes
5. What the system protects (validations, constraints, foreign keys)

### 2.5 Consistency Check

Look for repetition across parallel features:
- Same shapes in familiar places = consistent codebase
- Different patterns for similar things = evolved codebase with tech debt

### 2.6 Language-Specific Signals (only when applicable)

- **Ruby:** blocks = deferred config, `method_missing` = dynamic interface, reopened core
  classes = global assumptions changed, `define_method` = behavior from data, concerns = shared behavior
- **Elixir:** pattern matching in function heads, GenServer state patterns, with chains,
  supervision tree structure
- **JS/TS:** heavy generics = flexible but complex, HOCs = legacy pattern, hooks = modern
  React, barrel exports = potential circular deps
- **Go:** interface satisfaction, goroutine/channel patterns, error wrapping chains
- **Python:** decorators, metaclasses, dataclasses vs Pydantic, async/await patterns

### Output: "Architecture Snapshot"

```
## Architecture Snapshot

**Stack:** [Framework version, language version]
**Shape:** [Monolith/Modular/Microservices/Monorepo]
**Flow:** [Request-driven/Event-driven/Hybrid]
**API style:** [REST/GraphQL/RPC/Mixed]
**Database:** [Type + key details]

**Core Entities:**
| Entity | Role | Key Relationships |
|--------|------|-------------------|
| ... | ... | ... |

**Directory Map:**
| Directory | Purpose | Approx Size |
|-----------|---------|-------------|
| ... | ... | ... |

**External Integrations:** [List with purpose]

**Consistency:** [Consistent / Evolved with tech debt / Mixed patterns]
```

### CHECKPOINT

**Stop and ask:** "Here's what I see. Correct anything wrong before I dig into history."

Wait for user response. Do NOT proceed without approval.

---

## Phase 3: Learn from History — Git as Historian

> "Code captures decisions, but not the context behind those decisions."
> "What were the constraints?" — not "Why is this bad?"

**Goal:** Identify hotspots, change patterns, and the team's priorities. Use blame-free
framing — the code reflects constraints, not incompetence.

### 3.1 Hotspot Analysis

Run (via codebase-explorer agent):
```
git log --since="6 months ago" --name-only --pretty=format: | sort | uniq -c | sort -rn | head -20
```

High churn + high line count = abstraction under strain. These files are where bugs live
and where refactoring would have the most impact.

### 3.2 Change Pattern Analysis

For the top 5 hotspots:
- Are changes **additive** (new features extending existing code)?
- Or **invasive** (cutting across multiple layers for one feature)?
- Repeated invasive changes = the abstraction needs rework

### 3.3 Contributors

```
git shortlog -sn --since="6 months ago"
```

Who works on what areas? This tells you who to ask questions.

### 3.4 PR Archaeology (if GitHub)

Using `gh` CLI if available:
- Recent merged PRs show team priorities
- Large PRs touching many files = architectural decisions worth reading
- PR descriptions often contain the "why" that code comments miss

### 3.5 Metaprogramming Scan (language-specific)

- Ruby: `method_missing`, `class_eval`, `define_method`, `included`, `inherited`
- Python: `__getattr__`, metaclasses, decorators that modify signatures
- JS/TS: Proxy, dynamic imports, eval (should be rare)

Flag findings — metaprogramming is where "magic" hides. Knowing it exists prevents
confusion when tracing flows.

### 3.6 Exit Criteria Check

Ridhwana's "enough" test: Can you now...
- Trace and explain main flows in plain language?
- Name the key components and their responsibilities?
- Point to where important state lives?

If yes → proceed to Phase 4. If no → investigate the specific gap.

### Output: "History Report"

```
## History Report

**Hotspots (top 10):**
| File | Commits (6mo) | Lines | Assessment |
|------|--------------|-------|------------|
| ... | ... | ... | [Stable / Under strain / Needs rework] |

**Change Patterns:** [Additive / Invasive / Mixed]
**Key Contributors:** [Top 3-5 with areas]
**Recent PR Themes:** [What the team is focused on]
**Metaprogramming:** [None / Minimal / Heavy — with locations]

**"Enough" Check:**
- Main flows: [Can trace? Y/N]
- Key components: [Can name? Y/N]
- State locations: [Can point to? Y/N]
```

### CHECKPOINT

**Stop and ask:** "These are the hotspots and patterns. Any areas you want investigated
deeper before I generate documentation?"

Wait for user response. Do NOT proceed without approval.

---

## Phase 4: Document — Externalize Understanding

> "Understanding is valuable but fragile. If I don't externalize it, it disappears."
> "Documentation stays current when it lives close to code, focuses on WHY not HOW,
> and is updated alongside changes."

**Goal:** Generate lightweight docs that help both humans AND future AI agents understand
this codebase. Focus on WHY, not HOW — how changes with every commit, why endures.

### 4.1 Generate `docs/ARCHITECTURE.md` (40-80 lines)

Contents:
- System overview (2-3 sentences — what it does, who it serves)
- Stack with versions
- Core entities table (from Phase 2)
- Directory map with purpose (from Phase 2)
- Key patterns and conventions
- Primary data flow (the "First Trail" from Phase 1)
- History notes — hotspots, areas under strain (from Phase 3)
- External integrations

### 4.2 Generate `docs/CODEBASE_MAP.md` (30-60 lines)

Contents:
- Module/directory inventory with purpose and approximate size
- External integrations (APIs, services, databases, caches, queues)
- Testing landscape (framework, test count estimate, coverage, speed)
- Background job inventory (if applicable)
- Key configuration files and what they control

### 4.3 Propose CLAUDE.md Updates

Present as a diff — do NOT auto-write to CLAUDE.md. The user decides what goes in.

Propose:
- Fill Key Paths table with discovered paths
- Set test/lint/build commands based on what was found
- Add project-specific conventions discovered in Phases 1-3
- Add gotchas discovered from hotspot analysis

### CHECKPOINT

**Stop and present all generated docs for review.**

"Here are the docs I'd create. Review and tell me what to adjust before I write files."

Wait for user response. Only write files after approval.

---

## Phase 5: Detect Opportunities — Skill & Agent Suggestions

**Goal:** Based on everything discovered, suggest project-specific skills and agents
that would make working in this codebase faster. Max 5 suggestions, prioritized by
impact.

### Detection Signals

| Signal Found | Suggest | Type | Why |
|---|---|---|---|
| CI/CD scripts with multiple steps | `/deploy` | Skill | Codify the exact deploy sequence |
| >10 migrations in 6 months | `/migration` | Skill | Safety checks for this project's migration patterns |
| Complex test factories (>500 lines) | `/test-data` | Skill | Streamline test data setup |
| Background jobs + >10 job classes | `job-monitor` | Agent | Diagnose failed/stuck jobs |
| Multiple API versions | `/migrate-api` | Skill | Version transition workflow |
| Feature flags (Flipper/LaunchDarkly/etc.) | `/feature-flag` | Skill | Toggle management |
| Monitoring config (Datadog/Sentry/etc.) | `incident-analyzer` | Agent | Diagnose production issues |
| i18n files + >5 locales | `/translate` | Skill | Locale management |
| Custom rake tasks or scripts | `/run-task` | Skill | Safe task execution with logging |
| Complex env/config setup | `/env-check` | Skill | Validate environment before running |

### Output: "Opportunities"

For each suggestion:
```
### Suggestion: /deploy skill
**Evidence:** Found deploy.sh (87 lines), Dockerfile, docker-compose.yml, .github/workflows/deploy.yml
**What it would do:** Codify the deploy sequence with pre-flight checks
**Complexity:** Low (wrap existing scripts with safety checks)
**Priority:** HIGH — most impactful for daily workflow
```

**Never auto-create skills or agents.** Present proposals only. User decides what to build.

---

## Constraints

- **Read-only until Phase 4** — Phases 1-3 only read files and run git commands
- **User checkpoints are mandatory** — present findings and WAIT at every phase boundary
- **Use codebase-explorer agent for heavy reading** — keep main context clean
- **Lightweight docs** — ARCHITECTURE.md: 40-80 lines, CODEBASE_MAP.md: 30-60 lines
- **Stack-agnostic** — all phases work for any language/framework
- **Time-box git analysis** — cap at 20 hotspot files, 6-month window
- **Never auto-create skills/agents** — Phase 5 outputs proposals only
- **"Enough" exit criteria** — can trace main flows, name key components, point to state
- **Blame-free framing** — "What were the constraints?" not "Why is this bad?"
- **WHY not HOW** — documentation explains why decisions were made, not how code works
- **Questions unlock questions** — each answer unlocks the next question; iterate, don't exhaust
