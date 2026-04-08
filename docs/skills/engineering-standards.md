# Engineering Standards

Non-negotiable standards for every code change in this Astro + React repo.

---

## Astro-First Rendering

- **`.astro` for everything static.** Data fetching, layout, and static UI live in `.astro` files — they ship zero JS by default.
- **React islands for interactivity only.** Use `.tsx` components only when you need `useState`, `useEffect`, event handlers, or browser APIs.
- **Pass data as props.** Fetch in `.astro` frontmatter, pass results as props to React islands. Never fetch inside a React component when Astro can do it at build time.
- **Minimize `client:load`.** Prefer `client:idle` (hydrate when browser is idle) or `client:visible` (hydrate on scroll) for non-critical interactive elements.

---

## TypeScript Conventions

### Builder Data Field Types

Builder optional fields are always `string | null` — never `string | undefined`. Builder returns `null` for empty fields.

```ts
// src/types/mymodel.types.ts
export interface MyModel {
  slug: string;              // required — used as identifier, never null
  title?: string | null;     // optional — always string | null
  image?: string | null;     // Builder may return null for empty fields
}
```

Access pattern: always use optional chaining — `entry.data?.slug`, `entry.data?.title`.

### Astro Component Props

Use `interface Props` in the frontmatter block:

```ts
---
interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;
---
```

### General Rules

- **No `any`** without an inline comment explaining why it's unavoidable.
- **No type assertions (`as`)** unless absolutely necessary and commented.
- **`import type`** for type-only imports to prevent accidental runtime inclusion.
- **Strict mode is on** via `astro/tsconfigs/strict` — do not disable checks via `// @ts-ignore` without justification.
- **Library types**: never redefine types a library exports — import and re-export them.

---

## Code Quality — DRY · KISS · Separation of Concerns

- **Don't repeat yourself.** Shared logic in `src/utils/`, shared types in `src/types/`, shared UI in `src/components/`.
- **Keep it simple.** The simplest solution that meets the requirement is the correct one. Avoid speculative abstractions.
- **One responsibility per file.** Astro pages fetch and compose. Astro components render static UI. React islands handle interactivity. Utilities transform.
- **No premature abstraction.** Two similar code paths do not justify extraction. Three might — use judgment.
- **Delete dead code.** No commented-out code, unused imports, or stale variables.

---

## SEO

- Every page (`src/pages/*.astro`) sets `<title>` and `<meta name="description">` in `Layout.astro` or inline.
- One `<h1>` per page. Logical heading hierarchy (`h1 → h2 → h3`). Never skip levels.
- Semantic landmark elements: `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`.
- All images have descriptive `alt` text (`alt=""` only for decorative images).
- Link text is descriptive — avoid "click here" or "read more" without context.

---

## Security

- **No `dangerouslySetInnerHTML`** without sanitizing with DOMPurify first — applies to any Builder HTML field or user-generated content.
- **No secrets in client code.** Only variables prefixed with `PUBLIC_` are safe to expose via `import.meta.env`. Never put API tokens or private keys in `PUBLIC_` vars.
- **Validate and sanitize all external input** — URL params, Builder data fields, API responses — before using in logic or rendering.
- **No `javascript:` hrefs.** Validate any user-controlled URL before rendering in a link.

---

## Performance

- **Prefer static Astro output** — no JS shipped for static components.
- **`client:idle` over `client:load`** for below-the-fold or non-critical interactive elements.
- **`client:visible`** for components that only need interactivity when scrolled into view.
- **Avoid unnecessary React state.** If a value doesn't change, it doesn't need `useState`.
- **`prefers-reduced-motion`** — all CSS animations and transitions must respect this media query.
- **Images:** Use descriptive `alt` text, set explicit `width`/`height` or use aspect-ratio CSS to prevent CLS.

---

## WCAG 2.1 AA Compliance Checklist

**Every code change MUST meet WCAG 2.1 Level AA accessibility standards.**

### Required Checks Before Committing

#### Color Contrast
- [ ] Normal text (< 24px): minimum 4.5:1 contrast ratio
- [ ] Large text (≥ 24px or ≥ 19px bold): minimum 3:1 contrast ratio
- [ ] UI components and graphics: minimum 3:1 contrast ratio
- [ ] Use CSS custom properties that maintain proper contrast across all themes

#### Interactive Elements
- [ ] Touch targets: minimum 44×44px (mobile) or 24×24px (desktop)
- [ ] Visible focus indicators on all focusable elements
- [ ] Focus ring with sufficient contrast (`outline: 2px solid var(--ring); outline-offset: 2px`)
- [ ] Hover states that don't rely solely on color

#### Keyboard Navigation
- [ ] All interactive elements accessible via keyboard (Tab, Enter, Space)
- [ ] Escape key closes modals, dropdowns, and overlays
- [ ] No keyboard traps

#### ARIA and Semantics
- [ ] Proper semantic HTML (`nav`, `button`, `header`, `main`, etc.)
- [ ] ARIA labels on icon-only buttons (`aria-label`)
- [ ] `aria-expanded` on toggleable elements
- [ ] `aria-controls` linking controls to their targets
- [ ] `aria-hidden="true"` on decorative elements
- [ ] Proper heading hierarchy

#### Content and Structure
- [ ] Descriptive link text (avoid "click here")
- [ ] Alt text on all images (or `alt=""` for decorative)
- [ ] Form labels properly associated with inputs
- [ ] Loading states announced to screen readers

#### Motion and Animation
- [ ] Respect `prefers-reduced-motion`
- [ ] No auto-playing video/audio without controls

### Testing Tools
- Browser DevTools: Lighthouse accessibility audit
- Color contrast: WebAIM Contrast Checker
- Keyboard: Navigate entire UI using only keyboard
- Screen reader: VoiceOver (Mac) or NVDA (Windows)
