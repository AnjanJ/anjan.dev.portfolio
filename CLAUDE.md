# anjan-dev-portfolio

## Project Info

- **Purpose:** Portfolio website for anjan, motive/aim is to get more consultancy work and make hiring managers fall in love with anjans work and help them hire anjan
- **Stack:** static
- **Language:** HTML/CSS/JS
- **Test framework:** none
- **Test command:** `echo 'No test framework configured'`
- **Lint command:** `npx eslint . 2>/dev/null || echo 'No linter configured'`
- **Build command:** `echo 'No build step configured'`

Detailed conventions, platform rules, and review standards live in `.claude/rules/` and `.claude/knowledge/` — read them on demand, not upfront.

---

## Workflow Rules

### 1. Plan Mode Default
Enter plan mode for any task requiring 3+ steps. Spend 80% of effort in planning.
For simple fixes (typo, one-line change), skip planning and just do it.

### 2. Subagent Strategy
Use subagents only for atomic, well-defined tasks (search, test run, file analysis).
Keep all reasoning and decision-making in the main session — never split thinking across agents.

### 3. Verification Before Done
Never say "done" without proving it works:
- Code change → run tests
- Bug fix → reproduce before/after
- New feature → run the feature + related tests
- Refactor → full test suite passes
- Before any commit → suggest running `/review-my-code` to catch issues early

### 4. Autonomous Bug Fixing
When tests fail, read the error, read the source, fix the root cause.
Don't ask the user what to do — investigate and fix. Only ask if genuinely stuck.

### 5. Core Principles
- Simplicity first — the right amount of complexity is the minimum needed
- No laziness — never skip tests, never leave TODOs, never stub implementations
- Minimal impact — change only what's necessary, don't refactor neighbors
- When corrected, update CLAUDE.md or `.claude/lessons.md` so the mistake doesn't repeat
- If an approach isn't working after 2-3 attempts, stop and reconsider

### 6. Library Usage
When using ANY library or API you haven't used in this session, read its documentation first.
Use the `/use-library` skill or WebFetch. Never guess at an API — always verify against current docs.

---

## Conventions

### Commits
- Small, atomic commits — one logical change per commit
- Imperative mood, explain the "why" not the "what"
- Never add a co-author signature unless explicitly told to
- Never amend or squash published commits without asking
- Stage specific files — never `git add .` or `git add -A`

### Destructive Operations — ALWAYS Ask First
These actions require explicit user confirmation every time:
- **Database:** dropping tables, removing columns, changing column types, deleting migrations — present a rollback strategy before executing
- **Files:** deleting files, `rm -rf`, overwriting uncommitted changes
- **Secrets:** never stage or commit `.env`, credentials, private keys, or API tokens
- **Git:** force push, reset --hard, amending published commits, deleting branches
- **Dependencies:** never upgrade a major version (e.g., Rails 7→8, React 18→19) without asking
- **External APIs:** warn before making calls that could cost money or hit rate limits

### General
- Prefer editing existing files over creating new ones
- Always run tests after changes — never skip, never `--no-verify`
- Use `/update-rules` to modify this file — never edit manually
\n### Team Conventions\n- **Branch naming:** use `feat` prefix (e.g., `featadd-login`)\n- **PR descriptions:** title is enough for small changes, add context for non-trivial ones


## Static Site

### Structure

| Path | Purpose |
|------|---------|
| `index.html` | Main page |
| `css/` or `styles/` | Stylesheets |
| `js/` or `scripts/` | JavaScript |
| `images/` or `assets/` | Static assets |
| `pages/` | Additional HTML pages |

### Build
- **Bundler:** {{BUNDLER}} <!-- None / Vite / Webpack / Parcel -->
- **Dev server:** {{DEV_SERVER}} <!-- None / npx serve / vite dev -->

### Conventions
- **HTML:** Semantic elements (`header`, `nav`, `main`, `article`, `footer`)
- **CSS:** Mobile-first, use CSS custom properties for theming
- **JS:** Vanilla JS preferred — no framework unless complexity demands it
- **Images:** Optimized (WebP where supported), lazy-loaded below the fold
- **Accessibility:** All images have `alt` text, all forms have labels, keyboard navigable
- **SEO:** Meta description, Open Graph tags, JSON-LD structured data, sitemap.xml
