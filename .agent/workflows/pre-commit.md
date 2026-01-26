---
description: Pre-commit validation checklist - run all quality checks before committing
---

# Pre-Commit Checks

Run validation before commit. Uses **`frontend-code-review` skill** scripts.

// turbo-all

## Automated Checks

### 1. Type Check

```bash
npm run check-types
```

### 2. Lint

```bash
npm run lint
npm run lint:fix  # Auto-fix
```

### 3. Debug Code

```bash
grep -r "console\.log" --include="*.ts" --include="*.tsx" app/ shared/ | grep -v "console.error" | grep -v "console.warn"
```

### 4. Cleanup Markers

```bash
grep -r "TODO: CLEANUP" --include="*.ts" --include="*.tsx" .
```

### 5. Hardcoded Strings

Use **`frontend-code-review` skill**:

```bash
bash .agent/skills/frontend-code-review/scripts/check-translations.sh
```

### 6. FSD Structure

Use **`frontend-code-review` skill**:

```bash
bash .agent/skills/frontend-code-review/scripts/check-fsd-structure.sh
```

### 7. Type Audit

Use **`frontend-code-review` skill**:

```bash
bash .agent/skills/frontend-code-review/scripts/audit-types.sh
```

## Manual Checks

- [ ] No commented code
- [ ] Imports used
- [ ] Commit message descriptive

## On Failure

- **Type errors**: Fix types, re-run
- **Lint errors**: Auto-fix or manual
- **Hardcoded strings**: Use `contextual-translations` skill

## Quick Run

```bash
npm run check-types && npm run lint && bash .agent/skills/frontend-code-review/scripts/check-translations.sh
```
