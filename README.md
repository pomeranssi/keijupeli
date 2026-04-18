# Keijupeli

A small fullstack TypeScript dress-up game (React SPA + Express API + Postgres).
Users log in, pick items from categories (background, body, hair, wings, etc.)
and assemble a character; administrators can upload new item images.

# Setup

To configure local DB for development, create the file `.env` with
the following contents:

```ini
DB_URL=postgresql://keijupeli:keijupeli@localhost:3432/keijupeli
```

Then start the local development DB with Docker:

```sh
docker compose up -d
```

Finalize setup by running:

```sh
make install
make migrate
```

# Commands

Spawn the Vite dev server (client) on port 3000; proxies `/api` and
`/images/items` to the API on port 3200:

> `yarn watch-client`

Spawn the API server (tsx watch) on port 3200:

> `yarn watch-server`

Run the production client build (Vite, outputs to `build/`):

> `yarn build-client`

Type-check both the client and server projects:

> `yarn typecheck`

Lint and auto-fix:

> `yarn lint` / `yarn lint-fix`

Run tests (Vitest, jsdom):

> `yarn test`

# Deployment

Production runs as a Docker image on a Hetzner CAX11 (ARM64) VM behind a
Caddy reverse proxy. The image is built and pushed to
`ghcr.io/pomeranssi/keijupeli` via the manual GitHub Actions release
workflow (bump `package.json` version first; the workflow refuses to
overwrite an existing tag). The VM pulls the image via its own
`docker-compose.yml`, supplies `DB_URL`, and bind-mounts `upload/` so
user uploads survive container restarts. Postgres runs alongside the
app container and is reachable from dev machines via Tailscale.
