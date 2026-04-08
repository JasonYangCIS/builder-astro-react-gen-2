# Design System Skills

Conventions for working with the design system in this Astro + Tailwind v4 repo.

---

## Architecture

| Layer | Location | Purpose |
|-------|----------|---------|
| CSS variables | `src/styles/global.css` | OKLCH color tokens + theme overrides (default/dark) |
| Tailwind v4 bridge | `src/styles/global.css` (`@theme inline`) | Bridges CSS vars to Tailwind utilities |
| Astro components | `src/components/*/Component.astro` | Server-rendered UI with scoped `<style>` |
| React islands | `src/components/*/Component.tsx` | Interactive UI with class-based styling |

---

## Color System

All tokens are OKLCH CSS custom properties defined in `src/styles/global.css`.

### Semantic Tokens

| CSS Variable | Tailwind Utility | Use |
|---|---|---|
| `--background` | `bg-background` | Page/body background |
| `--foreground` | `text-foreground` | Primary text |
| `--primary` | `bg-primary` / `text-primary` | Primary actions |
| `--primary-foreground` | `text-primary-foreground` | Text on primary |
| `--secondary` | `bg-secondary` | Secondary surfaces |
| `--secondary-foreground` | `text-secondary-foreground` | Text on secondary |
| `--muted` | `bg-muted` | Subtle backgrounds |
| `--muted-foreground` | `text-muted-foreground` | De-emphasized text |
| `--accent` | `bg-accent` | Hover/highlight surface |
| `--accent-foreground` | `text-accent-foreground` | Text on accent |
| `--destructive` | `text-destructive` | Error/danger |
| `--card` | `bg-card` | Card/surface background |
| `--card-foreground` | `text-card-foreground` | Text on cards |
| `--border` | `border-border` | Default border |
| `--input` | `border-input` | Form input borders |
| `--ring` | | Focus ring |
| `--container-max-width` | | Max content width (1280px) |

**Never hardcode colors.** Always use these variables so contrast is maintained across all themes.

### Themes

Defined in `src/styles/global.css` via attribute selectors:
- Default (light, zinc-based OKLCH)
- `[data-theme="dark"]` — dark theme override

Toggle dark mode by setting `data-theme="dark"` on `<html>`.

### WCAG AA Guidance

| Token | Contrast | Notes |
|-------|----------|-------|
| `var(--foreground)` on `--background` | High | Default body text |
| `var(--muted-foreground)` on `--background` | Passes AA | De-emphasized text |
| `var(--primary-foreground)` on `--primary` | Passes AA | Text on primary |
| `var(--destructive)` | Check per theme | Error state |

---

## CSS Conventions

### Astro Component Styles

Use scoped `<style>` blocks — Astro automatically scopes them to the component:

```astro
<div class="product-card">
  <h2 class="product-title">Title</h2>
</div>

<style>
  .product-card {
    background-color: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  .product-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--card-foreground);
  }
</style>
```

### Targeting React Island Elements

Use `:global()` in an Astro `<style>` block to style elements rendered inside React islands:

```astro
<style>
  /* Target React island elements from parent Astro component */
  :global(.nav-link) {
    color: var(--muted-foreground);
    text-decoration: none;
    font-weight: 500;
  }

  :global(.nav-link:hover) {
    color: var(--foreground);
  }
</style>
```

### Class Naming

Use descriptive, semantic names — not `.div-1` but `.site-header`, `.nav-link`, `.copyright-notice`:

```css
/* ✅ Good */
.site-footer { ... }
.footer-inner { ... }
.copyright-notice { ... }

/* ❌ Bad */
.div-9 { ... }
.wrapper { ... }
.container2 { ... }
```

### No CSS Modules or SCSS

This project does not use CSS Modules (`.module.css`) or SCSS/Sass. All styles are:
- Scoped `<style>` in `.astro` files
- Global utilities in `src/styles/global.css`
- Tailwind utility classes in templates

---

## Tailwind v4 Usage

Tailwind v4 is configured via the Vite plugin in `astro.config.mjs`. The `@theme inline` block in `global.css` bridges CSS variables to Tailwind utilities:

```css
/* global.css */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* etc. */
}
```

**Use Tailwind for layout utilities:** `flex`, `grid`, `gap-*`, `p-*`, `m-*`, `max-w-*`, `items-center`, `justify-between`.

**Use CSS variables for colors** — while `bg-background` and `text-foreground` work via the bridge, direct CSS var references (`color: var(--foreground)`) are preferred in `<style>` blocks for clarity.

---

## Focus Indicators

All interactive elements must have visible focus indicators:

```css
.interactive-element:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

---

## Responsive Design

The global CSS defines responsive nav wrappers:

```css
/* Default: mobile */
.desktop-nav-wrapper { display: none; }
.mobile-nav-wrapper { display: flex; }

/* md+ (768px): desktop */
@media (min-width: 768px) {
  .desktop-nav-wrapper { display: flex; }
  .mobile-nav-wrapper { display: none; }
}
```

Use this pattern for other responsive show/hide requirements. Always preserve existing breakpoints — do not change `768px` without updating all references.

---

## Typography

No dedicated `Text` component. Use semantic HTML directly with CSS:

```astro
<h1 class="page-heading">Page Title</h1>
<p class="page-description">Supporting copy</p>

<style>
  .page-heading {
    font-size: 2.25rem;
    font-weight: 800;
    color: var(--foreground);
    line-height: 1.2;
  }

  .page-description {
    font-size: 1rem;
    color: var(--muted-foreground);
  }
</style>
```
