import debug from 'debug';
import express from 'express';
import * as path from 'path';

import { createApi } from './api/api';
import { config } from './config';

const log = debug('server');
const curDir = process.cwd();
log(`Server starting at directory: ${curDir}`);

const app = express();

app.use(express.static('public'));

app.use('/api', createApi());

app.get(/\/p\/.*/, (_, res) =>
  res.sendFile(path.join(curDir + '/public/index.html'))
);

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
