# Hosting

Production runs as a Docker image on a Hetzner CAX11 (ARM64) VM. A Caddy
reverse proxy in front of it terminates TLS.

## Releasing

The manual GitHub Actions workflow `.github/workflows/release.yml` builds the
image and pushes it to `ghcr.io/pomeranssi/keijupeli`. It tags the image with
the version in `package.json` and with `latest`, and tags the released commit
as `v<version>`.

1. Bump `version` in `package.json` and push.
2. Run the "Release Docker image" workflow on GitHub. If an image with that
   version already exists, the workflow fails.

## The image

`Dockerfile` has three stages:

1. `builder` installs all dependencies and builds the client (`build/`) and the
   server (`build-server/`).
2. `prod-deps` installs only the production dependencies, to keep the runtime
   image small.
3. `runtime` (`node:24-slim`) copies in the production `node_modules/`, the two
   builds, `migrations/` and `knexfile.cjs`.

The runtime stage runs as the `node` user (UID 1000) that the base image
creates, so files in bind-mounted volumes are owned by a real non-root user on
the host. On start, the container runs the knex migrations and then starts the
server.

The image sets `NODE_ENV=production`, `SERVER_PORT=3000`, `STATIC_PATH=build`
and `UPLOAD_PATH=/app/upload`.

## The VM

The VM runs the image from its own `docker-compose.yml`. That file provides
`DB_URL` and bind-mounts `upload/`, so that user uploads survive container
restarts. PostgreSQL runs next to the app container.

## Copying production data

You can reach the production database from a development machine over
Tailscale. Two scripts copy production data into the local environment:

- `make copy-prod-db` dumps the production database (`PROD_DB_URL` in `.env`)
  and restores it into the local one (`DB_URL`). It then sets every password
  to `salasana`. It needs the PostgreSQL client tools, which `mise install`
  provides.
- `make copy-prod-images` copies the uploaded images with `scp`.
