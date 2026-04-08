---
name: engineering-standards
description: >
  Use when writing or reviewing code, checking TypeScript conventions, enforcing Astro/React best
  practices, SEO, security, performance, WCAG AA accessibility, or code quality standards
  (DRY, KISS, separation of concerns) in this Astro + React project.
---

See `docs/skills/engineering-standards.md` for full standards and WCAG checklist.

Key areas covered:
- Astro-first: fetch data in `.astro` frontmatter; React islands for interactivity only
- TypeScript: strict mode, no `any`, `import type`, Builder data fields always `string | null`
- Code quality: DRY, KISS, no premature abstraction, delete dead code
- SEO: `<title>` and `<meta name="description">` in Layout, heading hierarchy, alt text
- Security: no `dangerouslySetInnerHTML` without sanitization, no secrets on the client
- Performance: minimize React islands, prefer Astro static rendering, `client:idle` over `client:load` where possible
- WCAG 2.1 AA: color contrast, touch targets (44×44px), focus indicators, keyboard nav, ARIA
- CSS: use CSS custom properties, not hardcoded colors; descriptive class names
