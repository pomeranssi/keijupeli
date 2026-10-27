# Architecture

Keijupeli is a React single-page app with an Express API and a PostgreSQL
database. Users pick items from categories (background, body, hair, wings and
so on) to assemble a character. Administrators upload new item images, which
the server processes with sharp (thumbnails, bounds) and stores on disk.

## Layout

`src/` has three namespaces, wired through TypeScript `paths`: `shared/*`,
`server/*` and `client/*`. Import with these aliases, not with relative
`../../` paths.

- `tsconfig.app.json` declares the paths for the client
  (`moduleResolution: bundler`), and `tsconfig.server.json` for the server
  (`moduleResolution: node10`). The root `tsconfig.json` only references the
  two.
- Vite resolves the aliases through `resolve.tsconfigPaths: true`, and the dev
  server (`tsx`) uses them directly. For the production server build,
  `tsc-alias` rewrites the aliases to relative paths, so the compiled server
  needs no path resolver at runtime.

The namespaces:

- `src/shared/` holds code for both the client and the server: zod schemas for
  the domain types (`shared/types/`), fetch and URL helpers (`shared/net/`), and
  small utilities. Code here must not import `client/*` or `server/*`.
- `src/server/` is an Express 5 app. The entry point,
  `src/server/keijupeliServer.ts`, mounts the API under `/api`, serves uploaded
  files from `upload/` under `/images/items`, and serves the index page for
  `/p/*` routes.
- `src/client/` is a React 19 app. Vite starts from `index.html` at the
  repository root, which loads `src/index.tsx`. That mounts `AppDataLoader` and
  `AppRouter` (`/` is `MainPage`, `/login` is `LoginPage`). When the app runs as
  a standalone PWA, it uses `createHashRouter`; otherwise it uses
  `createBrowserRouter`.

## Server

### Request pipeline

`src/server/api/api.ts` puts together three subrouters:

1. `uploadApi`, mounted before JSON body parsing so that multer can handle
   multipart requests.
2. `sessionApi` and `itemApi`, which get the built-in `express.json()` and
   `express.urlencoded()` parsers.

Validation, authentication and error mapping live in `src/server/server/`:

- `validatingRouter.ts` and `validation.ts` wrap routes with zod validation.
  They are typed as `z.ZodType<T>`, because Zod 4 merged the input and output
  generics.
- `sessionMiddleware.ts` attaches the current session and user. Session state
  lives in `server/data/sessionDb.ts` and `sessionService.ts`.
- `errorHandler.ts` turns a `GameError` (from `shared/types/error.ts`) into an
  HTTP response. If `config.showErrorCause` is set, the response includes the
  chain of causes.
- `requestHandling.ts` provides the `Requests.request(...)` adapter that the API
  definitions use.

### Data access

`src/server/data/` holds the database and file system code. `db.ts` sets up
`pg-promise` with `config.dbUrl`. `itemDb.ts`, `userDb.ts` and `sessionDb.ts`
contain the SQL. The services (`itemService`, `uploadService`,
`thumbnailService`, `itemLinkingService`) combine database and file system
work.

### Uploads

All uploads go under `config.uploadPath` (env `UPLOAD_PATH`, default
`./upload`). The server creates this directory when it loads the config. Item
images go to `config.itemImagesPath`, which is `<uploadPath>/items`. New kinds
of uploads should get their own subdirectory next to it.

### Cache headers

`src/server/keijupeliServer.ts` sets the cache headers:

- `/assets/*` are the content-hashed Vite outputs: `public, max-age=1y,
immutable`.
- Other static files under `STATIC_PATH` (favicons, manifest and so on):
  `max-age=1h`.
- `/images/items/*` are uploaded images: `public, max-age=1y, immutable`. Their
  file names come from multer's random names plus a category prefix, and are
  never reused.
- `/` and `/p/*` return `index.html` with `Cache-Control: no-store`.

## Client state

The game state is a single zustand 5 store in `src/client/game/state.ts`. The
store is saved to localStorage under the key `keijupeli-state`.

- `GameMode` is one of `play`, `delete`, `link` or `layers`. It decides what a
  click does.
- `categories` is a `GroupedCategoryMap`. `groupLinkedImages` (in
  `game/items.ts`) groups the items of each category: if items refer to each
  other through `linkedItem`, they become one `LinkedItem` with a `linked[]`
  array. Always set categories through `setupCategories` rather than writing
  `categories` directly, so that linking and the cleanup of selections happen.
- `selectedItems` maps a `CategoryType` to file names to `LinkedItem`s.
  `toggleItem` decides which items can be selected together, based on
  `category.isUnique`, `restricted` and `isBackground`. `setHueShift` stores a
  hue rotation for each item, which the renderer applies.
- `randomize`, `reset` and `toggleRestrictions` are the main actions in the UI.
- The store uses the curried zustand 5 form (`create<State>()(persist(...))`).
  For shallow selectors, use `useShallow` from `zustand/react/shallow`.

API calls go through `src/client/game/apiCient.ts` (the file name has a typo)
to `src/client/game/apiClientImpl.ts`, which uses the fetch client in
`shared/net`. The implementation is in `client/` rather than `shared/` because
it depends on the notification and state stores.

## Validation and types

Define domain types as zod schemas in `src/shared/types/` and infer the
TypeScript types with `z.infer<typeof X>`. For example, `shared/types/item.ts`
defines `CategoryType`, `Item` and `Category`. Server routes validate their
input with these schemas, and the client uses the same types when it calls the
API.

## Styling

The client uses styled-components 6. If a styled element takes a prop that is
not a DOM attribute, make it a transient prop: prefix it with `$` (for example
`$scale` or `$image`) and type it on the styled component
(`styled.div<{ $scale: number }>`). styled-components does not pass
`$`-prefixed props on to the DOM.
