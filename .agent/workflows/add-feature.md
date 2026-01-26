---
description: Create new feature following Feature-Sliced Design architecture
---

# Add New Feature

Step-by-step workflow. For details, use skills.

## Prerequisites

Review constraints: `.agent/rules/frontend-architecture.md`

## Steps

### 1. Understand Context

```bash
cat README.md
```

### 2. Create FSD Structure

Follow structure defined in `.agent/rules/frontend-architecture.md`.

Create only folders you need (not all are required).

### 3. Define Types

Create `types/index.ts`.

### 4. Implement API

Create `api/*.ts`.

### 5. Create Hooks

Create `hooks/*.ts` wrapping API calls.

**Skill**: `unit-tests` for testing patterns.

### 6. Add Translations

Use **`contextual-translations` skill**.

### 7. Build Components

Create components in `components/` and `ui/`.

### 8. Implement State (optional)

If needed, create `store/*.ts`.

### 9. Create Page

Create `page.tsx`.

### 10. Validation

```bash
npm run check-types
npm run lint
```

### 11. Testing

Use **`testing` skill** - choose unit/integration/E2E based on needs.

### 12. Code Review

Use **`frontend-code-review` skill**:

```bash
bash .agent/skills/frontend-code-review/scripts/check-fsd-structure.sh
bash .agent/skills/frontend-code-review/scripts/check-translations.sh
bash .agent/skills/frontend-code-review/scripts/audit-types.sh
```

### 13. Update README (optional)

Use **`readme-update` skill** if architectural changes made.
