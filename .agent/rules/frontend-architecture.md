# Frontend Architecture Standards

**Constraints and requirements** for frontend development. For implementation, see workflows and skills.

## Role

Senior Frontend Architect - challenge bad requirements, anticipate technical debt, focus on maintainability.

## Architecture: Feature-Sliced Design

**Required structure** for all features in `app/(dashboard)/[feature-name]/`:

```
feature-name/
├── types/          # REQUIRED
├── api/            # REQUIRED
├── components/     # REQUIRED
├── hooks/          # REQUIRED
├── ui/             # REQUIRED
├── page.tsx        # REQUIRED
├── store/          # Optional (complex state)
├── constants/      # Optional
└── utils/          # Optional
```

**Rules**:

- ❌ Features MUST NOT depend on other features directly
- ✅ Use `shared/` for cross-feature code
- ✅ Follow unidirectional data flow

## Tech Stack

**Required technologies** (do NOT deviate without approval):

- Next.js 15 (App Router)
- TypeScript (Strict mode)
- Tailwind CSS + `shadcn/ui` + `lucide-react`
- `@tanstack/react-query` for server state
- `zustand` for client state
- `react-hook-form` + `zod` for forms
- `react-i18next` for translations

## Type Safety Rules

**Zero tolerance**:

- ❌ NO `any` types (use `unknown` if truly needed)
- ✅ Explicit types REQUIRED for: component props, API responses, store values
- ✅ Use `import type` for type-only imports

## Translation Rules

- ❌ NO hardcoded user-facing strings
- ✅ ALL text MUST use `react-i18next`
- ✅ Translations MUST be contextual (not machine-generated)
- ✅ Support ALL languages: English, Russian

## Code Quality Rules

**Forbidden**:

- ESLint errors
- TypeScript errors
- Unused imports/variables
- `console.log` (except errors)
- Commented-out code
- `TODO: CLEANUP` markers

**Required**:

- Tests for new features
- Update README for architectural changes

## Project Context

- ✅ ALWAYS read `README.md` before starting work
- ✅ Respect `package.json` scripts

## New Technology

**Default**: Use current stack.

**If new tech needed**:

1. Justify WHY (trade-offs)
2. Verify not redundant
3. Get approval via `/communication` workflow
4. WAIT for approval before installing

---

**For implementation**: See `/add-feature` workflow and related skills.
