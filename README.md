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

Spawn server for development

> `yarn watch-client`

Run production build

> `yarn build-client`

