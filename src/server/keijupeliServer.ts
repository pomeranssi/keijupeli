import debug from 'debug';
import express from 'express';
import * as path from 'path';

import { createApi } from './api/api';
import { config } from './config';
import { setNoCacheHeaders } from './server/serverUtil';

const log = debug('server');
const curDir = process.cwd();
log(`Server starting at directory: ${curDir}`);

const app = express();

// Vite hashed asset bundle — content-addressed, safe to cache forever.
app.use(
  '/assets',
  express.static(path.join(config.staticPath, 'assets'), {
    immutable: true,
    maxAge: '1y',
  })
);

// Other static files (favicons, manifest, bundled images, etc.) — short cache.
// index.html is served explicitly below so it stays no-cache.
app.use(express.static(config.staticPath, { maxAge: '1h', index: false }));

app.use('/api', createApi());

// Uploaded item images — filenames are random-unique per upload and never
// reused, so each path is content-stable. Cache forever.
app.use(
  '/images/items',
  express.static(config.itemImagesPath, { immutable: true, maxAge: '1y' })
);

const sendIndex = (_req: express.Request, res: express.Response) => {
  setNoCacheHeaders(res);
  res.sendFile(path.join(curDir, config.staticPath, 'index.html'));
};

app.get('/', sendIndex);
app.get(/\/p\/.*/, sendIndex);

try {
  app.listen(config.port, () => {
    log(
      `Keijupeli server started in port ${config.port} with configuration`,
      config
    );
  });
} catch (er) {
  log('Error in server:', er);
}
