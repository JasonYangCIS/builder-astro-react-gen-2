# Claude Code — Project Instructions

Astro + React sandbox demonstrating [Builder.io Gen 2 SDK](https://www.builder.io/c/docs/developers) integration patterns with a Tailwind CSS v4 design system.

**Stack:** Astro 6 · React 19 · TypeScript · Tailwind CSS v4 · `@builder.io/sdk-react` v5.x · Lucide React

## Quick Start

```bash
npm run dev
```

Environment variable required in `.env` or `.env.local`: `PUBLIC_BUILDER_API_KEY=your_key_here`

## After Every Change

```bash
npx tsc --noEmit   # must pass
```

## Key Files

| File | Purpose |
|------|---------|
| `src/pages/[...path].astro` | Catch-all Builder page route — fetches and renders Builder `page` model |
| `src/pages/builder-preview.astro` | Dedicated Builder visual editor preview route |
| `src/components/BuilderPreviewPage/BuilderPreviewPage.tsx` | React island for Builder preview — client:load |
| `src/components/Header/Header.astro` | Astro header — fetches nav, renders NavItems as React island |
| `src/components/Header/NavItems.tsx` | Interactive nav React island — desktop nav + mobile drawer |
| `src/layouts/Layout.astro` | Global page shell — HTML boilerplate, Header, Footer |
| `src/styles/global.css` | OKLCH color tokens + Tailwind v4 theme + global resets |
| `astro.config.mjs` | Astro config — base path, React integration, Tailwind v4 plugin |

## Directory Structure

```
src/
  components/
    BuilderPreviewPage/
      BuilderPreviewPage.tsx     # React island (client:load) — Builder preview renderer
    Footer/
      Footer.astro               # Static Astro footer component
    Header/
      Header.astro               # Astro header — SSG nav fetch + React island mount
      NavItems.tsx               # React island — desktop nav + mobile hamburger drawer
  layouts/
    Layout.astro                 # Global shell — html, head, Header, Footer, slot
  pages/
    [...path].astro              # Catch-all Builder page route
    builder-preview.astro        # Builder visual editor preview (client:load)
  styles/
    global.css                   # Tailwind import + OKLCH tokens + theme + global styles

astro.config.mjs                 # Astro + React + Tailwind v4 config
```

## Component Types

| Type | File extension | Hydration | When to use |
|------|---------------|-----------|-------------|
| Astro component | `.astro` | None (SSG) | Layout, static UI, data fetching |
| React island | `.tsx` | `client:load` / `client:idle` | Interactivity — state, events, browser APIs |

**Rule:** Fetch data in `.astro` frontmatter. Pass results as props to React islands. Never fetch in React components when Astro can do it statically.

## Builder.io Patterns

- `Content` from `@builder.io/sdk-react` — renders Builder content
- `fetchOneEntry` — fetch a single Builder entry (pages, previews)
- `fetchEntries` — fetch multiple entries (nav, lists, static paths)
- `isPreviewing` — guard for preview/editor mode
- API key: always `import.meta.env.PUBLIC_BUILDER_API_KEY` — never hardcode
- Model names: always string constants — never magic strings scattered across files

## Environment Variables

Astro exposes env vars with the `PUBLIC_` prefix to the client:
- `import.meta.env.PUBLIC_BUILDER_API_KEY` — Builder API key (safe to expose)
- Server-only vars (without `PUBLIC_`) are only accessible in `.astro` frontmatter and SSR

## Skills

Skills load on demand — consult the relevant skill for task-specific patterns and gotchas:

| Skill | When to use |
|-------|-------------|
| `builder-io` | Builder SDK, content fetching, models, editor/preview, custom components |
| `design-system` | UI components, CSS tokens, WCAG contrast, Tailwind composition |
| `engineering-standards` | Astro/React, TypeScript, code quality, SEO, security, performance, WCAG AA |
| `project-maintenance` | Doc update checklist (new components), skill sync checklist |

Canonical docs live in `docs/skills/`. Pointers in `.builder/skills/` (Fusion) and `.claude/skills/` (Claude Code).

## Rules
@.builderrules

## Context7 Documentation
- **Astro:** `/withastro/astro` — use with `mcp__context7__query-docs`
- **Builder.io SDK:** `/builderio/builder` — use with `mcp__context7__query-docs`
