# syntax=docker/dockerfile:1.6

# Stage 1: install all deps and build the client + server bundles.
FROM node:24-slim AS builder
WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

COPY . .
RUN yarn build-client && yarn build-server

# Stage 2: production-only deps (smaller runtime layer).
FROM node:24-slim AS prod-deps
WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn workspaces focus --production

# Stage 3: runtime image. Runs as the pre-created `node` user (UID 1000) so
# bind-mounted volumes end up owned by a real non-root user on the host.
FROM node:24-slim AS runtime
WORKDIR /app
RUN chown node:node /app

ENV NODE_ENV=production \
    SERVER_PORT=3000 \
    STATIC_PATH=build \
    UPLOAD_PATH=/app/upload

COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=builder   --chown=node:node /app/build-server ./build-server
COPY --from=builder   --chown=node:node /app/build ./build
COPY --from=builder   --chown=node:node /app/migrations ./migrations
COPY --from=builder   --chown=node:node /app/knexfile.cjs ./knexfile.cjs
COPY --from=builder   --chown=node:node /app/package.json /app/yarn.lock /app/.yarnrc.yml ./

# Fallback dir for single-container runs; shadowed by a host bind mount in prod.
RUN mkdir -p upload && chown node:node upload

USER node

EXPOSE 3000

# Run migrations, then start the server. knex reads knexfile.cjs.
CMD ["sh", "-c", "./node_modules/.bin/knex --knexfile knexfile.cjs migrate:latest && node build-server/server/keijupeliServer.js"]
