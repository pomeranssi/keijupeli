# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Keijupeli is a fullstack TypeScript dress-up game (React SPA + Express API + Postgres). Users log in, pick items from categories (background, body, hair, wings, etc.), and assemble a character; administrators can upload new item images. Uploaded images are processed with sharp (thumbnails, bounds) and stored on disk.

## Common commands

Local development assumes the Postgres dev DB is running via `docker compose up -d` and `.env` contains `DB_URL=postgresql://keijupeli:keijupeli@localhost:3432/keijupeli`.

- `make install` — `yarn install`
- `make migrate` — run knex migrations (`yarn run knex migrate:latest`)
- `make start-server` — run the API with nodemon + `@swc-node/register` on port 3200 (`DEBUG=server*`)
- `make start-client` — run the CRA dev server; proxies `/api` to 3200 (see `package.json` `proxy`)
- `yarn build-client` — CRA production bundle into `build/`
- `yarn build-server` — `tsc` emits server JS into `build-server/`
- `yarn lint` — ESLint on `src/**/*.{ts,tsx}`
- `yarn test` — `react-scripts test --env=jsdom` (no tests currently; pass a path to run one file)
- `yarn migrate-make <name>` / `yarn migrate-rollback` — create/rollback migrations in `migrations/`
- `make deploy` — `script/deploy.sh` builds, scps tarballs, and runs `script/install-prod.sh` on `deployer@keijupeli.pomeranssi.fi`
- `make copy-prod-db` / `make copy-prod-images` — pull prod DB / uploads into local env

## Architecture

### Layout

`src/` has three top-level namespaces wired through `tsconfig.json` `paths` (`shared/*`, `server/*`, `client/*`). Use those aliases in imports, not relative `../../`.

- `src/shared/` — code usable by both client and server: zod schemas for domain types (`shared/types/item.ts` defines `CategoryType`, `Item`, `Category`, etc.), fetch/URL helpers (`shared/net/`), and small utilities.
- `src/server/` — Express app. Entry is `src/server/keijupeliServer.ts`, which mounts `createApi()` under `/api`, serves `public/` statics and uploaded files from `upload/images/items` under `/images/items`, and falls back to `public/index.html` for `/p/*` routes.
- `src/client/` — React SPA. Entry is `src/index.tsx` → `AppDataLoader` → `AppRouter` (`/` = `MainPage`, `/login` = `LoginPage`). Uses `createHashRouter` when running as a standalone PWA, otherwise `createBrowserRouter`.

### Server request pipeline

`src/server/api/api.ts` composes subrouters: `uploadApi` (mounted before JSON body parsing so multer can handle multipart), then JSON-parsed `sessionApi` and `itemApi`. Validation, auth, and error mapping live in `src/server/server/`:

- `validatingRouter.ts` + `validation.ts` — zod-validated route wrappers.
- `sessionMiddleware.ts` — attaches the current session/user; session state is in `server/data/sessionDb.ts` + `sessionService.ts`.
- `errorHandler.ts` — converts `GameError` (from `shared/types/error.ts`) to HTTP responses; `config.showErrorCause` controls whether cause chains are exposed.
- `requestHandling.ts` — `Requests.request(...)` adapter used throughout API definitions.

Data access goes through `src/server/data/`: `db.ts` wires `pg-promise` using `config.dbUrl`; `itemDb.ts`/`userDb.ts`/`sessionDb.ts` are the SQL layer; services (`itemService`, `uploadService`, `thumbnailService`, `itemLinkingService`) orchestrate DB + filesystem (`config.uploadPath`, default `./upload/images/items`).

### Client state

Global game state lives in a single zustand store at `src/client/game/state.ts`, persisted to localStorage under key `keijupeli-state`. Key concepts:

- `GameMode` ∈ `play | delete | link | layers` drives what clicks do.
- `categories` is a `GroupedCategoryMap` — categories whose items are post-processed by `groupLinkedImages` (in `game/items.ts`) so that `linkedItem` references collapse sibling images into one `LinkedItem` with a `linked[]` array. Always feed data through `setupCategories` rather than writing `categories` directly so linking + selection cleanup happens.
- `selectedItems` is keyed by `CategoryType` → filename → `LinkedItem`; `toggleItem` enforces uniqueness rules via `category.isUnique` + `restricted` + `isBackground`. `setHueShift` stores a per-item hue rotation used when rendering.
- `randomize` / `reset` / `toggleRestrictions` are the main "big" actions wired up in the UI.
- API calls go through `src/client/game/apiCient.ts` (note: typo in filename) which uses the `shared/net` fetch client.

### Validation & types

Prefer defining domain types with zod in `src/shared/types/` and inferring TS types (`z.infer<typeof X>`). Server routes validate inputs via the zod schemas; the client reuses the same types when calling APIs.

## Conventions

- TypeScript strict-ish: `noImplicitAny`, `strictNullChecks`, `noUnusedLocals` are on; `@typescript-eslint/no-explicit-any` is off, so prefer real types but `any` is allowed when pragmatic.
- Import order is enforced by `simple-import-sort` with a custom group for `shared/`, `client/`, `server/` that comes after third-party imports (see `.eslintrc.js`). Unused imports are errors.
- Prettier is wired through ESLint (`plugin:prettier/recommended`); run `yarn lint` before committing.
- Unused args are allowed when prefixed with `_`.

## Environment

`.env` is loaded by `dotenv` in both `knexfile.js` and `src/server/config.ts`. Relevant vars: `DB_URL`, `DB_SSL`, `SERVER_PORT` (default 3200), `SESSION_TIMEOUT`, `REFRESH_TOKEN_TIMEOUT`, `UPLOAD_PATH`, `SHOW_ERROR_CAUSE`, `LOG_LEVEL`, `NODE_ENV`.
