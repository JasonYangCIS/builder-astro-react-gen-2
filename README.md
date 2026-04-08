# Builder.io Sandbox (Gen 2) — Astro

A sandbox for the [Builder.io](https://www.builder.io) Gen 2 SDK (`@builder.io/sdk-react`) with **Astro 6** and **React 19**. It demonstrates Builder.io page rendering, visual editor preview, and nav fetching patterns using Astro's static site generation.

## Tech stack

- **Astro 6** (static site generation)
- **React 19** (islands architecture)
- **Builder.io SDK** (`@builder.io/sdk-react` v5.x)
- **Tailwind CSS 4**
- **TypeScript**
- **Lucide React**

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Builder.io

Create a `.env` file in the project root and add your Builder.io public API key:

```env
PUBLIC_BUILDER_API_KEY=your_builder_io_public_api_key
```

Get your key from [Builder.io → Account → Space](https://builder.io/account/space).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Project structure

```
src/
  components/
    BuilderPreviewPage/
      BuilderPreviewPage.tsx   # React island — Builder visual editor renderer
    Footer/
      Footer.astro             # Static footer component
    Header/
      Header.astro             # Header — SSG nav fetch + React island mount
      NavItems.tsx             # React island — desktop nav + mobile drawer
  layouts/
    Layout.astro               # Global page shell (HTML, Header, Footer)
  pages/
    [...path].astro            # Catch-all Builder page route
    builder-preview.astro      # Builder visual editor preview route
  styles/
    global.css                 # OKLCH color tokens + Tailwind v4 theme + resets
```

## Builder.io patterns

| File | Pattern |
|------|---------|
| `src/pages/[...path].astro` | Catch-all route — uses `fetchEntries` + `getStaticPaths` to generate all Builder pages at build time |
| `src/pages/builder-preview.astro` | Preview route — renders draft/unpublished content for the visual editor |
| `src/components/Header/Header.astro` | Fetches nav entries at build time and passes them as props to the `NavItems` React island |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Production static build to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Learn more

- [Builder.io Documentation](https://www.builder.io/c/docs/developers)
- [Astro Documentation](https://docs.astro.build)
- [Builder.io Gen 2 SDK](https://www.builder.io/c/docs/sdk-comparison)
