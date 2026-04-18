# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Keijupeli is a fullstack TypeScript dress-up game (React SPA + Express API + Postgres). Users log in, pick items from categories (background, body, hair, wings, etc.), and assemble a character; administrators can upload new item images. Uploaded images are processed with sharp (thumbnails, bounds) and stored on disk.

## Common commands

Local development assumes the Postgres dev DB is running via `docker compose up -d` and `.env` contains `DB_URL=postgresql://keijupeli:keijupeli@localhost:3432/keijupeli`.

- `make install` — `yarn install` (Yarn 4 with the node-modules linker; see `.yarnrc.yml`)
- `make migrate` — run knex migrations via `yarn migrate` (knexfile + migrations are `.cjs` because the package is `"type": "module"`)
- `make start-server` — `yarn watch-server`: `tsx watch --tsconfig tsconfig.server.json` on port 3200 with `DEBUG=server*`
- `make start-client` — `yarn watch-client`: Vite dev server on port 3000; proxy for `/api` and `/images/items` to 3200 lives in `vite.config.ts`
- `yarn build-client` — Vite production bundle into `build/`
- `yarn build-server` — `tsc -p tsconfig.server.json` emits server JS into `build-server/`
- `yarn typecheck` — `tsc --noEmit` for both `tsconfig.app.json` and `tsconfig.server.json`
- `yarn lint` / `yarn lint-fix` — ESLint 9 flat config (`eslint.config.js`)
- `yarn test` — Vitest (jsdom); pass a path to run one file. `yarn test-watch` for watch mode.
- `yarn migrate-make <name>` / `yarn migrate-rollback` — create/rollback migrations in `migrations/`
- `make copy-prod-db` / `make copy-prod-images` — pull prod DB / uploads into local env (DB over Tailscale psql, images over scp)

## Architecture

### Layout

`src/` has three top-level namespaces wired through TypeScript `paths`: `shared/*`, `server/*`, `client/*`. Use those aliases in imports, not relative `../../`. Paths are declared in `tsconfig.app.json` (client, `moduleResolution: bundler`) and `tsconfig.server.json` (server, `moduleResolution: node10`); the root `tsconfig.json` is a references-only solution file. Vite resolves the aliases natively via `resolve.tsconfigPaths: true`; the dev server (`tsx`) uses them directly.

- `src/shared/` — code usable by both client and server: zod schemas for domain types (`shared/types/item.ts` defines `CategoryType`, `Item`, `Category`, etc.), fetch/URL helpers (`shared/net/`), and small utilities. Do not import `client/*` or `server/*` from here.
- `src/server/` — Express 5 app. Entry is `src/server/keijupeliServer.ts`, which mounts `createApi()` under `/api`, serves uploaded files from `upload/` under `/images/items`, and falls back to serving an index page for `/p/*` routes.
- `src/client/` — React 19 SPA. The Vite entry HTML is `index.html` at the project root; it loads `src/index.tsx`, which mounts `AppDataLoader` → `AppRouter` (`/` = `MainPage`, `/login` = `LoginPage`). Uses `createHashRouter` when running as a standalone PWA, otherwise `createBrowserRouter`.

### Deployment

Production runs as a Docker image on a Hetzner CAX11 (ARM64) VM behind a Caddy reverse proxy that terminates TLS. The image is built and published to `ghcr.io/pomeranssi/keijupeli` by `.github/workflows/release.yml` (manual `workflow_dispatch`, refuses to re-publish an existing `package.json` version). The VM runs the image via its own docker-compose that provides `DB_URL` and bind-mounts `upload/` for persistent user uploads. Postgres is reached over Tailscale from a dev machine for direct psql access and image copy scripts use `scp`.

The Docker image (`Dockerfile`) is a three-stage build: `builder` does `yarn install --immutable` + `yarn build-client` + `yarn build-server`; `prod-deps` reinstalls with `yarn workspaces focus --production` for a smaller runtime layer; `runtime` (node:24-slim) copies the pruned `node_modules/`, `build/`, `build-server/`, `migrations/`, `knexfile.cjs`, drops to the pre-created `node` user (UID 1000) so bind-mounted volumes are owned by a real non-root user on the host, and runs `knex migrate:latest && node build-server/server/keijupeliServer.js`. Env in the image: `NODE_ENV=production`, `SERVER_PORT=3000`, `STATIC_PATH=build`, `UPLOAD_PATH=/app/upload`. Compiled server imports are rewritten from `shared/*` path aliases to relative paths at build time by `tsc-alias`, so no path-resolver shim is needed at runtime.

Static assets and cache headers are set in `src/server/keijupeliServer.ts`:

- `/assets/*` (Vite's content-hashed output) → `public, max-age=1y, immutable`
- Other static files under `STATIC_PATH` (favicons, manifest, etc.) → `max-age=1h`
- `/images/items/*` (uploaded images; filenames are multer-random + category prefix and never reused) → `public, max-age=1y, immutable`
- `/` and `/p/*` → `index.html` with `Cache-Control: no-store`

### Server request pipeline

`src/server/api/api.ts` composes subrouters: `uploadApi` (mounted before JSON body parsing so multer can handle multipart), then JSON-parsed `sessionApi` and `itemApi`. Body parsing uses Express 5's built-in `express.json()` / `express.urlencoded()` (no separate `body-parser`). Validation, auth, and error mapping live in `src/server/server/`:

- `validatingRouter.ts` + `validation.ts` — zod-validated route wrappers; typed as `z.ZodType<T>` (Zod 4 collapsed the input/output generics).
- `sessionMiddleware.ts` — attaches the current session/user; session state is in `server/data/sessionDb.ts` + `sessionService.ts`.
- `errorHandler.ts` — converts `GameError` (from `shared/types/error.ts`) to HTTP responses; `config.showErrorCause` controls whether cause chains are exposed.
- `requestHandling.ts` — `Requests.request(...)` adapter used throughout API definitions.

Data access goes through `src/server/data/`: `db.ts` wires `pg-promise` using `config.dbUrl`; `itemDb.ts`/`userDb.ts`/`sessionDb.ts` are the SQL layer; services (`itemService`, `uploadService`, `thumbnailService`, `itemLinkingService`) orchestrate DB + filesystem. `config.uploadPath` (default `./upload`, env `UPLOAD_PATH`) is the base for all uploads; item images live in `config.itemImagesPath` = `<uploadPath>/items` — future upload kinds get their own subdirs alongside. The base dir is created recursively at config load.

### Client state

Global game state lives in a single zustand 5 store at `src/client/game/state.ts`, persisted to localStorage under key `keijupeli-state`. Key concepts:

- `GameMode` ∈ `play | delete | link | layers` drives what clicks do.
- `categories` is a `GroupedCategoryMap` — categories whose items are post-processed by `groupLinkedImages` (in `game/items.ts`) so that `linkedItem` references collapse sibling images into one `LinkedItem` with a `linked[]` array. Always feed data through `setupCategories` rather than writing `categories` directly so linking + selection cleanup happens.
- `selectedItems` is keyed by `CategoryType` → filename → `LinkedItem`; `toggleItem` enforces uniqueness rules via `category.isUnique` + `restricted` + `isBackground`. `setHueShift` stores a per-item hue rotation used when rendering.
- `randomize` / `reset` / `toggleRestrictions` are the main "big" actions wired up in the UI.
- Zustand 5 uses the curried create form (`create<State>()(persist(...))`) and `useShallow` from `zustand/react/shallow` instead of the removed two-arg selector + `shallow` pattern.
- API calls go through `src/client/game/apiCient.ts` (note: typo in filename) → `src/client/game/apiClientImpl.ts`, which uses the `shared/net` fetch client. The impl lives in `client/` (not `shared/`) because it depends on notification/state stores.

### Validation & types

Prefer defining domain types with zod in `src/shared/types/` and inferring TS types (`z.infer<typeof X>`). Server routes validate inputs via the zod schemas; the client reuses the same types when calling APIs.

### Styling

styled-components 6. Custom (non-DOM) props passed to styled elements must be transient (`$`-prefixed, e.g. `$scale`, `$image`) and typed on the styled component (`styled.div<{ $scale: number }>`) — the leading `$` tells styled-components not to forward the prop to the DOM.

## Conventions

- TypeScript strict-ish: `noImplicitAny`, `strictNullChecks`, `noUnusedLocals` are on; `@typescript-eslint/no-explicit-any` is off, so prefer real types but `any` is allowed when pragmatic.
- Import order is enforced by `simple-import-sort` with a custom group for `shared/`, `client/`, `server/` that comes after third-party imports (see `eslint.config.js`). Unused imports are errors.
- Prettier is wired through ESLint (`eslint-plugin-prettier`); run `yarn lint` before committing.
- Unused args are allowed when prefixed with `_`; unused `catch` bindings are cleanest as bare `catch {}`.
- New JSX transform is on (`jsx: react-jsx`), so files do not need `import * as React from 'react'` unless they use `React.*` APIs.

## Environment

`.env` is loaded by `dotenv` in both `knexfile.cjs` and `src/server/config.ts`. Relevant vars: `DB_URL`, `DB_SSL`, `SERVER_PORT` (default 3200 in dev; image overrides to 3000), `STATIC_PATH` (default `public`; image overrides to `build`), `UPLOAD_PATH`, `SESSION_TIMEOUT`, `REFRESH_TOKEN_TIMEOUT`, `SHOW_ERROR_CAUSE`, `LOG_LEVEL`, `NODE_ENV`, and `PROD_DB_URL` (used by `script/copy-prod-db.sh` for pulling a prod dump).
