---
description: "Trace one feature end-to-end and write a guided code walkthrough in docs/code-walkthrough/"
user-invocable: true
arguments: "<feature-name|file-path> [surface|deep] — feature to trace (default depth: deep)"
---

# /walkthrough — Guided Code Walkthrough

Trace one feature end-to-end — from trigger to database and back — and produce a
step-by-step walkthrough in `docs/code-walkthrough/<feature-name>.md`.

**How this relates to /onboard and /explain-system:**
- `/onboard` maps WHAT exists (architecture, entities, history) — the city map
- `/explain-system` explains WHY decisions were made (trade-offs, ADRs) — the urban planning textbook
- `/walkthrough` traces HOW one feature works step by step — the guided walking tour

## Arguments

- `<feature-name>` — name of the feature to trace (e.g., `checkout`, `login`, `webhook-processing`)
- `<file-path>` — path to a specific file to use as entry point
- `surface` — happy path + data flow only (50-80 lines output)
- `deep` (default) — adds error paths, side effects, key concepts (100-200 lines output)

---

## Phase 1: Locate and Scope

**Goal:** Find all entry points for this feature and let the user pick which path to trace.

### 1.1 Identify Entry Points

**If a file path was given:**
- Read the file
- Identify its role (controller, job, event handler, CLI, etc.)
- Treat it as the entry point — skip to 1.2

**If a feature name was given:**
Use `codebase-explorer` agent to search:
- Routes/URL patterns matching the feature name
- File names matching the feature name (controllers, services, jobs, commands)
- Git log: `git log --all --oneline --grep="<feature-name>"` for related commits
- Test files mentioning the feature name (tests often name features explicitly)

### 1.2 Catalog All Entry Points

Features often have multiple triggers. Find ALL of them:

| Trigger Type | Examples |
|-------------|----------|
| HTTP request | GET /checkout, POST /api/v1/orders |
| Background job | CheckoutJob, ProcessOrderWorker |
| Cron/scheduled | rake checkout:expire_abandoned |
| Webhook | Stripe payment_intent.succeeded |
| Event/pub-sub | OrderCreated event handler |
| Admin action | Admin panel "Force checkout" button |
| CLI/rake | rake orders:reprocess |
| Internal call | Another service calls Checkout.process |

Present entry points as a table:

```
| # | Trigger Type | Entry Point | File:Line |
|---|-------------|-------------|-----------|
| 1 | HTTP POST | OrdersController#create | app/controllers/orders_controller.rb:24 |
| 2 | Webhook | StripeWebhookHandler#payment_succeeded | app/services/stripe_webhook_handler.rb:45 |
| 3 | Background | RetryCheckoutJob#perform | app/jobs/retry_checkout_job.rb:8 |
```

### CHECKPOINT

**Stop and ask:**
"I found N entry points for [feature]. Which one should I trace?
Also confirm: deep or surface walkthrough?"

Wait for user response. Do NOT proceed without a selection.

---

## Phase 2: Trace

**Goal:** Follow the call chain from the selected entry point through every layer,
building a raw trace table.

### 2.1 Follow the Call Chain

Starting from the entry point, follow each method call to the next layer.
At each hop, record:

| Field | What to Capture |
|-------|----------------|
| Step # | Sequential number (1, 2, 3...) |
| Layer | Controller, Service, Model, Job, Database, External API, etc. |
| File:Line | Exact source location |
| Method | Method name being called |
| Data In | What data enters this step |
| Action | What this step does (plain language) |
| Data Out | What data leaves this step |

**Cap at 10 hops.** If the chain goes deeper, stop and note "continues beyond trace depth."

### 2.2 Map Data Transformations

At each layer boundary, note how data changes shape:
- HTTP params → strong params → model attributes → database columns
- Database record → serializer → JSON response → client state

### 2.3 Catalog Side Effects (deep mode only)

For each step, note side effects:
- Jobs enqueued (class name, queue, when)
- Emails/notifications sent (mailer, template, recipient)
- Webhooks fired (URL pattern, payload shape)
- Cache reads/writes (key pattern, TTL)
- Events published (event name, subscribers)
- External API calls (service, endpoint)
- Logging (what's logged, at what level)

### 2.4 Map Error Paths (deep mode only)

For each step that can fail:
- What can go wrong (validation, timeout, nil, race condition)
- Where is the error caught (same method? rescue block? middleware?)
- What does the user see (error message, status code, redirect)

### 2.5 Read Tests

Use `codebase-explorer` agent to find and read tests for this feature:
- Unit tests for the primary classes in the trace
- Integration/request tests for the entry point
- Tests reveal edge cases the code hides ("it handles concurrent checkouts" → look for locking)

Note any edge cases or failure modes discovered from tests.

### 2.6 Build Raw Trace Table

Compile the internal trace table (not shown to user yet):

```
| Step | Layer | File:Line | Method | Data In | Action | Data Out | Side Effects | Errors |
|------|-------|-----------|--------|---------|--------|----------|-------------|--------|
```

### CHECKPOINT

**Stop and ask:**
"I've traced N steps through [list of layers]. Ready to synthesize the walkthrough?"

Summarize: layers touched, number of side effects found, number of error paths found.
Wait for user response. Do NOT proceed without approval.

---

## Phase 3: Explain

**Goal:** Transform the raw trace into a readable, guided walkthrough. Present it for
review before writing to disk.

### 3.1 User Journey

Write 3-5 sentences describing what happens from the USER's perspective.
No code, no technical terms — pure user experience.

Example: "The customer clicks 'Place Order'. They see a loading spinner for 1-2 seconds.
If payment succeeds, they're redirected to a confirmation page with their order number.
If payment fails, they see an error message and can retry."

### 3.2 Step-by-Step Code Trace

For each step in the trace:

```markdown
### Step N: [Layer] — [What happens in plain language]

**File:** `path/to/file.rb:42`

[2-3 sentence explanation of what this step does and WHY. Define any domain
terms on first use. Explain any non-obvious patterns.]

[Optional: 1-5 line code snippet if it illuminates the logic. Not for every step —
only when seeing the actual code adds understanding.]

**Data in:** [what enters]
**Data out:** [what leaves]
```

### 3.3 Data Transformation Summary

Table showing how data changes shape across the entire trace:

```
| Stage | Data Shape | Example |
|-------|-----------|---------|
| HTTP request | Form params | { email: "...", plan: "pro" } |
| Controller | Permitted params | { email: "...", plan_id: 3 } |
| Service | Domain object | Subscription.new(user:, plan:) |
| Database | Row | subscriptions(id: 1, user_id: 5, plan_id: 3) |
| Response | JSON/HTML | { subscription: { id: 1, status: "active" } } |
```

### 3.4 Side Effects (deep mode only)

List all side effects discovered in Phase 2, grouped by type:

```markdown
## Side Effects

**Jobs enqueued:**
- `WelcomeEmailJob` — sends onboarding email (runs async, ~30s delay)

**Events published:**
- `subscription.created` — triggers analytics tracking, updates CRM

**External APIs:**
- Stripe `POST /v1/subscriptions` — creates the billing subscription
```

### 3.5 Error Paths (deep mode only)

For each failure mode, trace what happens:

```markdown
## Error Paths

**Payment declined** (`app/services/payment_service.rb:67`)
→ Stripe returns `card_declined`
→ Service raises `PaymentError`
→ Controller catches, renders error partial
→ User sees: "Your card was declined. Please try a different card."

**Concurrent checkout** (`app/models/order.rb:23`)
→ Unique constraint on `orders.idempotency_key`
→ Database raises `ActiveRecord::RecordNotUnique`
→ Controller returns 409 Conflict
→ User sees: "This order is already being processed."
```

### 3.6 Key Concepts (deep mode only)

Define 3-5 domain terms or patterns that appear in this trace, in plain language:

```markdown
## Key Concepts

- **Idempotency key** — A unique token sent with each request to prevent duplicate
  processing. If the same key is sent twice, the second request returns the first
  result instead of processing again.
- **Optimistic locking** — Instead of locking a database row before reading it,
  the system checks at write time whether the row changed since it was read.
  If it changed, the write fails and the caller retries.
```

### CHECKPOINT

**Stop and present the full walkthrough for review.**

"Here's the walkthrough for [feature] ([deep/surface], [N steps]).
Review before I create the file."

Wait for user response. Only proceed to Phase 4 after approval.

---

## Phase 4: Write

**Goal:** Write the approved walkthrough to `docs/code-walkthrough/<feature-name>.md`.

### 4.1 Determine Output Path

- Directory: `docs/code-walkthrough/`
- Filename: `<feature-name>.md` (kebab-case, e.g., `checkout.md`, `user-login.md`)
- Create the directory if it doesn't exist

### 4.2 Check for Existing File

If `docs/code-walkthrough/<feature-name>.md` already exists:

**Stop and warn:** "A walkthrough for [feature] already exists (N lines, dated [date]).
Overwrite it?"

Wait for confirmation. Do NOT overwrite without approval.

### 4.3 Write the Document

Add a header block at the top:

```markdown
# [Feature Name] — Code Walkthrough

| | |
|---|---|
| **Entry point** | `file:line` |
| **Depth** | deep / surface |
| **Layers traced** | Controller → Service → Model → Database |
| **Steps** | N |
| **Generated** | YYYY-MM-DD |
```

Then write the walkthrough exactly as approved in Phase 3.

### 4.4 Confirm

"Walkthrough written to `docs/code-walkthrough/<feature-name>.md` ([N lines])."

---

## Constraints

- **File:line references mandatory** — every step must cite exact source location
- **Read-only until Phase 4** — Phases 1-3 only read files and run git commands
- **Use codebase-explorer for heavy reading** — keep main context clean for reasoning
- **User checkpoints mandatory** — present findings and WAIT at every phase boundary
- **Plain language required** — define every domain term on first use
- **Cap trace at 10 hops** — if deeper, note "continues beyond trace depth"
- **surface = happy path only** — skip side effects, error paths, key concepts sections
- **Output length: surface 50-80 lines, deep 100-200 lines** — never exceed 200 lines
- **Stack-agnostic** — all phases work for any language/framework
- **No auto-writing** — present full doc in Phase 3, write only after approval in Phase 4
- **Warn before overwriting** — existing walkthrough files require explicit confirmation
- **Tests inform the trace** — read tests in Phase 2 to surface edge cases code hides
- **No jargon without definition** — if you use a term, define it on first use
- **One feature per walkthrough** — don't combine multiple features in one document
