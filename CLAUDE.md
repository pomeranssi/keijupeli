# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Keijupeli is a fullstack TypeScript dress-up game (React SPA + Express API + Postgres). Users log in, pick items from categories (background, body, hair, wings, etc.), and assemble a character; administrators can upload new item images.

Read these before larger changes:

- [ARCHITECTURE.md](ARCHITECTURE.md): code layout, the server request pipeline, client state, validation and styling.
- [HOSTING.md](HOSTING.md): the Docker image, releases, the production VM and copying production data.

## Tools

mise manages the tools (`mise.toml`): Node 24, Yarn 4 and the PostgreSQL 18 client tools. `mise install` installs them and then runs `yarn install` through a postinstall hook. The Yarn version in `mise.toml` must match `packageManager` in `package.json`.

## Common commands

Local development assumes the Postgres dev DB is running via `docker compose up -d` and `.env` contains `DB_URL=postgresql://keijupeli:keijupeli@localhost:3432/keijupeli`.

- `make install` — `mise install` (tools + `yarn install`; Yarn 4 with the node-modules linker, see `.yarnrc.yml`)
- `make migrate` — run knex migrations via `yarn migrate` (knexfile + migrations are `.cjs` because the package is `"type": "module"`)
- `make start-server` — `yarn watch-server`: `tsx watch --tsconfig tsconfig.server.json` on port 3200 with `DEBUG=server*`
- `make start-client` — `yarn watch-client`: Vite dev server on port 3000; proxy for `/api` and `/images/items` to 3200 lives in `vite.config.ts`
- `yarn build-client` — Vite production bundle into `build/`
- `yarn build-server` — `tsc -p tsconfig.server.json` + `tsc-alias` emit server JS into `build-server/`
- `yarn typecheck` — `tsc --noEmit` for both `tsconfig.app.json` and `tsconfig.server.json`
- `yarn lint` / `yarn lint-fix` — ESLint 9 flat config (`eslint.config.js`) over `src/`
- `yarn format` / `yarn format-check` — Prettier over the whole repo (`.prettierignore` skips vendored `public/js`)
- `yarn test` — Vitest (jsdom); pass a path to run one file. `yarn test-watch` for watch mode.
- `yarn migrate-make <name>` / `yarn migrate-rollback` — create/rollback migrations in `migrations/`
- `make copy-prod-db` / `make copy-prod-images` — pull prod DB / uploads into local env (see HOSTING.md)

CI (`.github/workflows/build.yml`) installs Node and Yarn with mise, then runs lint, format check, typecheck, tests and both builds.

## Conventions

- Import with the `shared/*`, `server/*` and `client/*` path aliases, not relative `../../`. `shared/` must not import `client/` or `server/`.
- Define domain types as zod schemas in `src/shared/types/` and infer TS types from them.
- styled-components: non-DOM props must be transient (`$`-prefixed) and typed on the styled component.
- In the zustand store, set categories through `setupCategories`, never by writing `categories` directly.
- TypeScript strict-ish: `noImplicitAny`, `strictNullChecks`, `noUnusedLocals` are on; `@typescript-eslint/no-explicit-any` is off, so prefer real types but `any` is allowed when pragmatic.
- Import order is enforced by `simple-import-sort` with a custom group for `shared/`, `client/`, `server/` that comes after third-party imports (see `eslint.config.js`). Unused imports are errors.
- Prettier is wired through ESLint (`eslint-plugin-prettier`); run `yarn lint` and `yarn format-check` before committing.
- Unused args are allowed when prefixed with `_`; unused `catch` bindings are cleanest as bare `catch {}`.
- New JSX transform is on (`jsx: react-jsx`), so files do not need `import * as React from 'react'` unless they use `React.*` APIs.

## Environment

`.env` is loaded by `dotenv` in both `knexfile.cjs` and `src/server/config.ts`. Relevant vars: `DB_URL`, `DB_SSL`, `SERVER_PORT` (default 3200 in dev; image overrides to 3000), `STATIC_PATH` (default `public`; image overrides to `build`), `UPLOAD_PATH`, `SESSION_TIMEOUT`, `REFRESH_TOKEN_TIMEOUT`, `SHOW_ERROR_CAUSE`, `LOG_LEVEL`, `NODE_ENV`, and `PROD_DB_URL` (used by `script/copy-prod-db.sh` for pulling a prod dump).
