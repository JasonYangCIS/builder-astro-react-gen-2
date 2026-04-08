---
name: builder-io
description: >
  Use when working with Builder.io SDK, fetching content, adding models, registering custom
  components, or debugging editor/preview issues in this Astro project. Covers fetchOneEntry,
  fetchEntries, Content rendering, isPreviewing, getStaticPaths patterns, and the preview route.
---

See `docs/skills/builder-io.md` for full patterns and gotchas.

Key areas covered:
- Core SDK functions: fetchOneEntry, fetchEntries, Content, isEditing, isPreviewing
- Astro catch-all route: `getStaticPaths` + `fetchEntries` at build time, then `fetchOneEntry` per path
- Preview route pattern: `builder-preview.astro` + `BuilderPreviewPage.tsx` React island (client:load)
- Header nav pattern: Astro server fetch → props → React island (no subscribeToEditor yet)
- Adding a new model: model name constant, types file, Astro page route
- Custom component registration: define in a `.builder.ts` file, register with Builder SDK
- notFound guard: always check `isPreviewing()` before returning 404 UI
- Content rendering: use `Content` directly (not a wrapper)
- TypeScript type conventions for Builder data fields
