# Project Maintenance

Checklists for keeping project docs and skills in sync when the codebase changes.

---

## Doc update checklist — run after creating any new component

After scaffolding a new component, check each item below and update if applicable:

| Condition | File to update |
|-----------|---------------|
| Component is notable enough to reference | `CLAUDE.md` — add to the Directory Structure listing |
| Component introduces a new UI or CSS pattern | `docs/skills/design-system.md` — document usage and class naming |
| Component changes how Builder content is fetched or registered | `docs/skills/builder-io.md` — update relevant section |
| Component changes the component file structure pattern | `.builder/rules/component-structure.mdc` — update with new pattern |
| A new skill is being added or an existing skill removed/renamed | Run the **skill sync checklist** below |

**When in doubt, update the docs.** Outdated agent docs cause future AI agents to generate inconsistent code.

---

## Skill sync checklist — run when adding or removing a skill

Every skill has references in **four locations**. When you add, remove, or rename a skill, update all of them:

| Location | What to update |
|----------|----------------|
| `docs/skills/<skill>.md` | Add/remove the full skill doc (canonical source of truth) |
| `.builder/skills/<skill>/SKILL.md` | Add/remove Builder Fusion pointer |
| `.claude/skills/<skill>/SKILL.md` | Add/remove Claude Code pointer |
| `CLAUDE.md` — Skills table | Add/remove row in the skills table |

**Current skills:** `builder-io`, `design-system`, `engineering-standards`, `project-maintenance`

---

## File structure quick reference

When creating a new component, follow this pattern:

```
src/components/MyComponent/
  MyComponent.astro        # Astro component (server-rendered, data fetch in frontmatter)
  # or
  MyComponent.tsx          # React island (interactivity — state, events)
  MyComponent.types.ts     # TypeScript interfaces (only if complex)
  MyComponent.builder.ts   # Builder registration config (only if Builder-registered)
```

Rules:
- No `index.ts` barrel — import directly from the file
- CSS in scoped `<style>` block (Astro) or class-based (React island)
- Never hardcode colors — use `var(--token-name)` CSS custom properties
