---
description: "Explore codebase and write a verified system design explainer doc in /docs"
user-invocable: true
arguments: "[full|quick|section <name>] — scope of explanation (default: full)"
---

# /explain-system — Verified System Design Explainer

Explore a codebase, reason about WHY it's designed the way it is, verify every claim
against source code, and produce a system design document in `docs/SYSTEM_DESIGN.md`.

**How this differs from /onboard:** `/onboard` maps WHAT exists (architecture, flows,
entities). `/explain-system` explains WHY the system is designed this way (decisions,
trade-offs, constraints). `/onboard` gives you a map of the city. `/explain-system`
gives you the textbook chapter explaining why the city was planned this way.

## Arguments

- `full` (default) — All 6 phases with checkpoints between each
- `quick` — Phases 1-2 only, produce a brief explainer (skip verification loop)
- `section <name>` — Regenerate one section (e.g., `section decisions`, `section flows`)

**If `docs/ARCHITECTURE.md` exists** (from `/onboard`), read it as input. Don't redo
work that's already been done — build on it.

---

## Phase 1: Problem Discovery

**Goal:** Understand what this system solves, who uses it, and why it exists.

### 1.1 Read Foundation Files

Read (via `codebase-explorer` agent for heavy reading):
- README, CLAUDE.md, docs/ directory
- Dependency files (Gemfile, package.json, mix.exs, go.mod, etc.)
- Config files (database.yml, docker-compose.yml, CI configs)
- If `docs/ARCHITECTURE.md` exists, use it as a starting point

### 1.2 Formulate Problem Statement

Answer:
1. **What does it solve?** — The core problem in one sentence
2. **Who uses it?** — End users, internal teams, API consumers, other systems
3. **Why does it exist?** — What would users do without it? (spreadsheets, manual process, competitor)
4. **What's the scope?** — What it deliberately does NOT do

### Output: Problem Statement

```
## Problem Statement

**System:** [Name]
**Solves:** [Core problem in one sentence]
**For:** [Who uses it]
**Without it:** [What users would do instead]
**Scope boundary:** [What it deliberately excludes]
```

### CHECKPOINT

**Stop and ask:** "Is this problem statement accurate? Correct anything before I
explore the architecture."

Wait for user response. Do NOT proceed without approval.

---

## Phase 2: Deep Exploration (C4-Inspired Zoom Levels)

**Goal:** Map the system at three zoom levels (Context, Container, Component) and
surface the trade-offs the current architecture makes.

The C4 Model (Simon Brown) uses four zoom levels to communicate architecture: Context,
Container, Component, Code. We use the first three — enough to explain the system
without drowning in implementation details.

### 2.1 Context Level — The System in Its Environment

What actors and external systems interact with this system?
- Users (types, roles, access patterns)
- External APIs consumed (payment, email, auth, storage)
- External APIs exposed (webhooks, public API, integrations)
- Other internal systems (if microservices or SOA)

### 2.2 Container Level — Deployable Units

What are the major runtime components?
- Web application (framework, language)
- Background workers (Sidekiq, Oban, Celery, BullMQ)
- Database(s) — type, role (primary, read replica, analytics)
- Cache layer (Redis, Memcached — what's cached and why)
- Message queue (if event-driven)
- CDN, object storage, search engine

### 2.3 Component Level — Internal Structure

Use `codebase-explorer` agent to trace 2-3 primary flows through internal components:
- What are the major internal boundaries? (modules, engines, contexts, packages)
- How do components communicate? (method calls, events, queues, HTTP)
- Where are the sync vs async boundaries?

### 2.4 Domain Model

Read schema files and map the domain model in plain language:
- Core entities and their relationships (teach the mental model, don't dump schema)
- What data the system protects (validations, constraints, foreign keys)
- History preservation patterns (audit logs, event sourcing, versioned records)

### 2.5 Trade-Off Analysis

For each architectural choice discovered, identify:
- **What does this design optimize for?** (development speed? scale? simplicity? reliability?)
- **What does it sacrifice?** (flexibility? performance? operational simplicity?)
- Example: "Monolith optimizes for development speed and deployment simplicity, but
  sacrifices independent scaling of components"

### Output: System Map

```
## System Map

**Context:** [Actors + external systems, 3-5 bullets]
**Containers:** [Deployable units with purpose]
**Key Components:** [Internal boundaries with responsibilities]

**Domain Model (plain language):**
| Entity | What It Represents | Key Relationships |
|--------|-------------------|-------------------|
| ... | ... | ... |

**Current Trade-offs:**
| Choice | Optimizes For | Sacrifices | Revisit When |
|--------|-------------|-----------|-------------|
| ... | ... | ... | ... |
```

### CHECKPOINT

**Stop and ask:** "These are the flows, components, and trade-offs I found. Anything
missing or wrong?"

Wait for user response. Do NOT proceed without approval.

---

## Phase 3: Design Reasoning (ADR-Informed)

**Goal:** For each major architectural choice, examine evidence for WHY it was chosen.
Present findings in ADR (Architecture Decision Record) format: Context, Decision,
Trade-offs, Consequences.

### 3.1 Search for Existing ADRs

Look for existing decision records in:
- `docs/adr/`, `docs/decisions/`, `doc/architecture/`
- `ADR-*.md` or `NNNN-*.md` patterns
- README sections about architecture decisions

If found, use as primary source of truth. Don't reinvent what the team already documented.

### 3.2 Examine Evidence for Decisions

For each major choice (framework, database, architecture pattern, key libraries):

1. **Code evidence** — What does the implementation tell us?
2. **Commit history** — `git log --all --oneline --grep="<term>"` for migration commits, large refactors
3. **Comments and docs** — inline comments explaining "why", PR descriptions
4. **Constraints** — infer from:
   - Team size: `git shortlog -sn --since="1 year ago"` (1-3 people = different choices than 20)
   - Deployment: Dockerfile, CI config, Procfile, platform configs
   - Scale signals: sharding config, read replicas, CDN setup, rate limiting

### 3.3 Present Each Decision in ADR Format

For each major decision:

```
### Decision: [What was decided]
**Context:** [What problem or constraint led to this decision]
**Decision:** [What was chosen]
**Trade-offs:**
- Gained: [What benefit the team chose]
- Sacrificed: [What cost they accepted]
- Alternatives: [What else could have been chosen, if inferable]
**Consequences:** [Observable effects — positive and negative]
**Confidence:** [VERIFIED from ADR/docs | INFERRED from code | UNCERTAIN]
**Revisit when:** [Conditions that would make this decision worth reconsidering]
```

### 3.4 Identify Invariants and Protections

What does the system guarantee?
- Validation rules (model-level, DB-level constraints)
- Authorization patterns (who can do what)
- Data integrity guarantees (transactions, locks, unique constraints)

### 3.5 Security Considerations

- Authentication pattern (session, JWT, OAuth, API keys)
- Input validation approach (strong params, schema validation, sanitization)
- Encryption (at rest, in transit, application-level)
- Secrets management (env vars, vault, encrypted credentials)

### CHECKPOINT

**Stop and ask:** "Here's my reasoning about design decisions. Correct anything wrong
or add context I'm missing."

Wait for user response. Do NOT proceed without approval.

---

## Phase 4: Verification Loop — THE KEY DIFFERENTIATOR

This is what makes `/explain-system` different from just asking an LLM to explain a
codebase. Every factual claim is individually verified against source code before it
appears in the final document.

Based on atomic fact verification — the gold standard for preventing hallucination in
AI-generated text: break claims into atomic facts and verify each independently.

### Step 4.1 — Compile Claims Table

Extract every factual claim from Phases 1-3 into a table. Cap at ~30-40 entries by
grouping related claims.

```
| # | Claim | Source File(s) | Confidence | Status |
|---|-------|---------------|------------|--------|
| 1 | "Uses PostgreSQL as primary DB" | Gemfile:8, database.yml:3 | VERIFIED | Confirmed |
| 2 | "Payments processed async via Sidekiq" | app/jobs/payment_job.rb:1 | VERIFIED | Confirmed |
| 3 | "Failed jobs retry 3 times" | (Sidekiq default) | INFERRED | Needs confirmation |
| 4 | "Chose Rails for rapid prototyping" | (no code evidence) | UNCERTAIN | Ask user |
```

**Confidence levels:**
- **VERIFIED** — directly observed in source code with file:line reference
- **INFERRED** — reasonable conclusion from evidence, not directly stated in code
- **UNCERTAIN** — could not confirm from code alone, needs user input

### Step 4.2 — Present to User

Present claims sorted: UNCERTAIN first, then INFERRED, then VERIFIED.

UNCERTAIN claims need user input — they cannot be resolved from code alone.
INFERRED claims need user confirmation — the conclusion is reasonable but not proven.
VERIFIED claims are shown for transparency — user can correct misreadings.

### Step 4.3 — Re-Verify

After user feedback:
- Use `codebase-explorer` agent to re-read source files for corrected claims
- Update confidence levels based on user input
- Promote confirmed INFERRED claims to VERIFIED (with "confirmed by user" note)

### Step 4.4 — Cross-Reference

For every "X calls Y" or "X depends on Y" claim:
- Actually confirm X references Y in source code
- Check import statements, method calls, configuration references

### Step 4.5 — Gate: Zero UNCERTAIN in Final Doc

**This gate is NOT optional — even if the user asks to skip it.**

- All UNCERTAIN claims must be resolved (confirmed by user or removed)
- Unresolvable items get explicit callout in the final doc: "*[Not confirmed from code]*"
- INFERRED claims are allowed but must be tagged as such

### CHECKPOINT

**Stop and ask:** "All claims verified. Here's the final claims table. Ready to write
the document?"

Wait for user response. Do NOT proceed without approval.

---

## Phase 5: Write the Document

**Goal:** Generate `docs/SYSTEM_DESIGN.md` (100-200 lines) that teaches someone who
knows programming but not this codebase WHY the system is designed this way.

### Document Structure

1. **The Problem** — What it solves, who uses it, what they'd do without it
2. **Core Concepts** — Domain model in plain language (teach the mental model, don't dump schema)
3. **System Overview (C4-Inspired)**
   - Context: actors + external systems
   - Containers: deployable units with purpose
   - Components: internal structure and boundaries
4. **Architectural Decisions** — Each in ADR format with confidence tag:
   Context, Decision, Trade-offs, Consequences
5. **Trade-off Map** — Summary table:
   | What It Optimizes | What It Sacrifices | Revisit When |
6. **How Data Flows** — Step-by-step primary flows with file:line references
7. **Component Interactions** — Boundaries, sync/async paths, integration points
8. **Constraints, Invariants, and Security** — What the system protects, how, and why
9. **Improvement Opportunities** — From Phase 6, each with trade-off analysis

### Writing Rules

- **From first principles** — teach someone who knows programming but not this codebase
- **WHY over WHAT** — every section explains reasoning, not just facts
- **File:line references on every claim** — reader can verify anything
- **No jargon without definition** — if you use a term, define it on first use
- **Confidence tags** — mark INFERRED claims so readers know what's proven vs. reasoned
- **100-200 lines** — concise enough to read in one sitting

### CHECKPOINT

**Stop and present the full document for review.**

"Here's the document. Review before I write to disk."

Wait for user response. Only write the file after approval.

---

## Phase 6: Improvement Opportunities

**Goal:** Evidence-based improvement suggestions. Every suggestion must cite specific
files. No generic advice.

### Analysis

For each opportunity found during Phases 2-4:
- Cite the specific file(s) and line(s) that evidence the issue
- Categorize: Architecture, Performance, Reliability, Developer Experience, Security
- Assess impact (HIGH/MEDIUM/LOW), risk, and effort (S/M/L)

### Trade-Off Analysis Required

Improvements are never free. For each suggestion:

- **Current trade-off:** What the system gains by its current design
- **Proposed trade-off:** What the improvement gains AND what it costs
- **When to act:** Under what conditions this becomes urgent vs. nice-to-have

### Output: Opportunities Table

```
| # | Category | Opportunity | Evidence | Impact | Risk | Effort |
|---|----------|-------------|----------|--------|------|--------|
| 1 | Perf | Add index on orders.user_id | db/schema.rb:89, no index | HIGH | LOW | S |
| 2 | Reliability | Add retry config to payment job | app/jobs/payment_job.rb:5 | HIGH | LOW | S |
```

For each row, also state:
- **Current:** [What the system gains by NOT having this] (e.g., "simpler schema, faster writes")
- **Proposed:** [What changes] (e.g., "faster reads, but slower writes and more storage")
- **When:** [Urgency condition] (e.g., "when orders table exceeds 1M rows")

**No generic advice allowed.** "Add more tests" or "improve documentation" without
citing specific files is not acceptable.

### CHECKPOINT

**Stop and ask:** "Want me to adjust any opportunities before finalizing the document?"

Wait for user response. Finalize the document with approved opportunities.

---

## Constraints

- **Read-only until Phase 5** — Phases 1-4 and 6 only read files and run git commands
- **User checkpoints mandatory** — present findings and WAIT at every phase boundary
- **Use codebase-explorer for heavy reading** — keep main context clean for reasoning
- **Zero UNCERTAIN claims in final doc** — Phase 4 gate, not optional even if user asks
- **From first principles** — teach, don't assume reader knowledge of the codebase
- **WHY not WHAT** — every section explains reasoning behind the design
- **Evidence-based improvements only** — cite specific files, no generic advice
- **Stack-agnostic** — all phases work for any language/framework
- **File:line references required** — on every factual claim in the final doc
- **Target doc length: 100-200 lines** — concise enough to read in one sitting
- **Cap claims table at ~30-40 entries** — group related claims to stay manageable
- **If ARCHITECTURE.md exists, read it** — build on /onboard output, don't duplicate
- **Verification is not optional** — the claims table is the skill's core differentiator
- **ADR format for decisions** — Context, Decision, Trade-offs, Consequences
- **Trade-off analysis is central** — every decision and improvement includes what's gained AND sacrificed
