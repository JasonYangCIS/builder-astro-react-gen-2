---
name: design-system
description: >
  Use when building or modifying UI components, applying color tokens, choosing typography,
  checking WCAG AA contrast, or working with Tailwind v4 utilities in this Astro project.
  Covers CSS custom properties, theme tokens, scoped styles, and component conventions.
---

See `docs/skills/design-system.md` for full conventions and component reference.

Key areas covered:
- OKLCH CSS custom property token system in `src/styles/global.css` (default / dark themes)
- Tailwind v4 integration: `@theme inline` bridges CSS vars to Tailwind utilities
- Scoped `<style>` in Astro components — no CSS Modules, no SCSS
- `:global(.class)` to style React island elements from an Astro parent
- Color token reference: `--background`, `--foreground`, `--primary`, `--muted-foreground`, etc.
- WCAG AA: use semantic CSS variable tokens — never hardcode hex colors
- Focus rings: `outline: 2px solid var(--ring); outline-offset: 2px`
- Descriptive class names — not `.div-1` but `.site-header`, `.nav-link`, `.copyright-notice`
- Container max-width: `var(--container-max-width)` (1280px)
