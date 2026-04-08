# Builder.io Skills

Patterns and gotchas for working with `@builder.io/sdk-react` (Gen 2) in this Astro repo.

---

## Core SDK Functions

| Function | Purpose |
|----------|---------|
| `fetchOneEntry({ model, apiKey, userAttributes?, query? })` | Fetch a single Builder entry — detail pages, preview |
| `fetchEntries({ model, apiKey, limit?, options? })` | Fetch multiple entries — `getStaticPaths`, nav menus |
| `isEditing()` | True only in Builder visual editor (edit mode) |
| `isPreviewing(searchParams?)` | True in editor AND preview mode |
| `subscribeToEditor({ model, apiKey, callback })` | Live-updates data in React client islands |

All imports from `@builder.io/sdk-react`.

---

## Route Patterns

### Catch-all (Builder `page` model)

```astro
---
// src/pages/[...path].astro
import { fetchEntries, fetchOneEntry, Content } from "@builder.io/sdk-react";
import Layout from "../layouts/Layout.astro";

export async function getStaticPaths() {
  const entries = await fetchEntries({
    apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
    model: "page",
    options: { fields: "data.url" },
  });

  return entries.map((entry) => {
    const url = entry.data?.url ?? "/";
    const stripped = url.replace(/^\//, "");
    return { params: { path: stripped || undefined } };
  });
}

const { path } = Astro.params;
const content = await fetchOneEntry({
  apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
  model: "page",
  userAttributes: { urlPath: path ? `/${path}` : "/" },
});
---

<Layout>
  {content && (
    <Content
      model="page"
      apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY}
      content={content}
    />
  )}
</Layout>
```

### Root route
`[...path].astro` does **not** match `/`. Add `src/pages/index.astro` separately if you need Builder content at the root:

```astro
---
import { fetchOneEntry, Content } from "@builder.io/sdk-react";
import Layout from "../layouts/Layout.astro";

const content = await fetchOneEntry({
  apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
  model: "page",
  userAttributes: { urlPath: "/" },
});
---

<Layout>
  {content && (
    <Content model="page" apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY} content={content} />
  )}
</Layout>
```

### Preview Route

`src/pages/builder-preview.astro` mounts `BuilderPreviewPage.tsx` as a React island:

```astro
---
import { BuilderPreviewPage } from "../components/BuilderPreviewPage/BuilderPreviewPage";
---
<BuilderPreviewPage client:load />
```

The React island reads `builder.preview` from query params and fetches content client-side using `fetchOneEntry`.

---

## Content Rendering

Use `Content` directly from `@builder.io/sdk-react`. Unlike the Next.js sibling project, this repo does not use a `RenderBuilderContent` wrapper.

```tsx
import { Content, isPreviewing } from "@builder.io/sdk-react";

// In a React island (BuilderPreviewPage or similar)
const shouldRender = content || isPreviewing(searchParams);
if (!shouldRender) return <div>404 - Page not found</div>;

return (
  <Content
    content={content}
    model={model}
    apiKey={API_KEY}
    customComponents={CUSTOM_COMPONENTS}
  />
);
```

---

## Adding a New Model

1. **Name the model** — pick a string identifier (e.g., `"landing-page"`) and document it clearly. Never scatter magic strings.
2. **Create a types file** — `src/types/mymodel.types.ts` using `string | null` for optional fields
3. **Create the route** — `src/pages/[...path].astro` or a dedicated page; follow patterns above
4. **Register custom components** — if the model uses custom registered components, add them (see Custom Components below)

---

## Custom Component Registration

Custom components need a configuration object that matches the `RegisteredComponent` type from `@builder.io/sdk-react`.

### File structure

```
src/components/MyComponent/
  MyComponent.tsx          # Component implementation
  MyComponent.types.ts     # TypeScript interfaces (optional)
  MyComponent.builder.ts   # RegisteredComponent config — named export
```

### `.builder.ts` pattern

```ts
// MyComponent.builder.ts
import type { RegisteredComponent } from "@builder.io/sdk-react";
import MyComponent from "./MyComponent";

export const myComponentConfig: RegisteredComponent = {
  component: MyComponent,
  name: "My Component",
  inputs: [
    { name: "title", type: "string", defaultValue: "Hello", required: true },
    { name: "variant", type: "string", enum: ["a", "b"], defaultValue: "a" },
  ],
};
```

Pass `customComponents` to `Content`:

```tsx
import { myComponentConfig } from "../components/MyComponent/MyComponent.builder";

const CUSTOM_COMPONENTS = [myComponentConfig];

<Content customComponents={CUSTOM_COMPONENTS} ... />
```

Input types: `"string"`, `"longText"`, `"number"`, `"boolean"`, `"color"`, `"file"`, `"reference"`, `"url"`.

---

## Header Pattern (Astro server + React island)

- `Header.astro` — fetches nav entries via `fetchEntries` in the frontmatter, passes as props to `NavItems`
- `NavItems.tsx` — React island (`client:load`), receives entries as initial props

This avoids making the entire header a client component while still supporting interactive nav.

```astro
---
// Header.astro
import { fetchEntries } from "@builder.io/sdk-react";
import { NavItems } from "./NavItems";

const rawEntries = await fetchEntries({
  apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
  model: "header-nav-menu",
  options: { fields: "id,data", limit: 5 },
}).catch(() => []);

const navEntries = rawEntries
  .filter(e => e.data?.text && e.data?.url)
  .map(e => ({ id: e.id, text: e.data.text, url: e.data.url }));
---

<NavItems client:load entries={navEntries} />
```

---

## Key Gotchas

### isPreviewing() guard — always required before 404
`fetchOneEntry` returns `null` for content not yet published. Builder renders pages in an iframe during editing — showing a 404 there would break the editor.

```ts
// In Astro page frontmatter: just don't render the 404 template
// In React islands:
const shouldRender = content || isPreviewing(searchParams);
if (!shouldRender) return <div>404 - Page not found</div>;
```

### getStaticPaths runs at build time (static output)
This is a static Astro site (no SSR adapter). `getStaticPaths` runs once at build. New Builder pages require a rebuild to appear. For near-real-time content, consider adding an SSR adapter or rebuild trigger.

### Content is null for unpublished entries
`fetchOneEntry` returns `null` if no entry matches. Always null-check before rendering `Content`.

### Base path prefix
`astro.config.mjs` sets `base: "builder-astro-react-gen-2"`. Astro automatically prepends this to static asset URLs. For Builder content images and links, the base path is not auto-applied — be aware when linking to internal pages.

### Builder DevTools
Builder DevTools may inject extra elements. During development this is expected behavior. Always use specific selectors scoped to your component hierarchy.

---

## Builder Rules Files

Builder's AI reads rule files to generate code consistently:

### `.builderrules` (project root)
Loaded every session by Builder Fusion. Covers the non-negotiable rules.

### `.builder/rules/*.mdc` (scoped rules)
Granular rules with metadata:
```
---
description: Builder SDK usage
globs: src/**/*.astro,src/**/*.tsx
alwaysApply: false
---
```

`alwaysApply: true` — always loaded. `false` — AI decides based on globs.

---

## Preview URL Setup (Builder Admin)

Set each model's preview URL in Builder admin → Model settings:

```
page model:   /builder-preview?model=page&urlPath={entry.data.url}
```

The `BuilderPreviewPage.tsx` island reads `builder.preview` from query params and fetches the appropriate model.
