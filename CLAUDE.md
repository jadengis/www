# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use `pnpm` (not `npm`) as the package manager.

```bash
pnpm dev          # Start dev server with HMR (http://localhost:5173)
pnpm build        # Production build (outputs to ./build/)
pnpm start        # Run production server
pnpm typecheck    # Generate React Router types + run TypeScript check
```

## Architecture

This is a **React Router v7** full-stack app with SSR enabled.

- **`app/routes.ts`** — Declarative route config; add routes here using `index()`, `route()`, etc.
- **`app/root.tsx`** — HTML document shell (`Layout`), root `App` component, and global `ErrorBoundary`. Handles fonts via the `links` export.
- **`app/routes/`** — File-based route modules. Each file can export `loader`, `action`, `meta`, and a default component.
- **`app/components/`** — Components that are reusable across routes.
- **`app/components/ui/`** — Primitive components that are the foundation of the design system.
- **`app/app.css`** — Global styles; imports Tailwind via `@import "tailwindcss"` and sets the `--font-sans` theme variable.

## Key Conventions

- **Path alias**: `~/` maps to `app/` (e.g., `import { Foo } from "~/components/foo"`).
- **Type-safe routes**: Route modules receive typed props from React Router's generated types (`.react-router/types/`). Use `Route.LoaderArgs`, `Route.MetaArgs`, etc. — run `pnpm typecheck` to regenerate after adding routes.
- **SSR is on** (`ssr: true` in `react-router.config.ts`). Data loading happens via `loader` functions, mutations via `action` functions.
- **Styling**: TailwindCSS v4. Dark mode uses `prefers-color-scheme` media query, not a class toggle.
