---
description: "Auto-detect test framework and run tests"
user-invocable: true
disable-model-invocation: true
arguments: "[all|quick|specific <path>|coverage] — test scope (default: all)"
---

# /test — Run Tests

Auto-detects the test framework and runs tests.

## Framework Detection

Check for these files in order:
1. `Gemfile` containing `rspec` → **RSpec**: `bundle exec rspec`
2. `Gemfile` containing `minitest` or `test/` dir exists → **Minitest**: `bin/rails test`
3. `mix.exs` → **ExUnit**: `mix test`
4. `package.json` containing `vitest` → **Vitest**: `npx vitest run`
5. `package.json` containing `jest` → **Jest**: `npx jest`
6. `playwright.config.ts` or `playwright.config.js` → **Playwright**: `npx playwright test`

## Modes

### `all` (default)
Run the full test suite.

### `quick`
Run only fast tests:
- RSpec: `bundle exec rspec --tag ~slow --tag ~system`
- Minitest: `bin/rails test` (excludes system tests)
- ExUnit: `mix test --exclude slow`
- Jest/Vitest: `npx vitest run` (no --coverage)

### `specific <path>`
Run tests for a specific file or directory.

### `coverage`
Run with coverage reporting:
- RSpec: `COVERAGE=true bundle exec rspec`
- ExUnit: `mix test --cover`
- Jest: `npx jest --coverage`
- Vitest: `npx vitest run --coverage`

## After Running

1. Report the test summary (pass/fail/skip counts)
2. On failures: read the failing test + source code, identify root cause, suggest a specific fix
3. On success: report total time and any slow tests (>5s)
