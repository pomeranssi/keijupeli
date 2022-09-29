import debug from 'debug';
import pgp from 'pg-promise';

import { identity } from 'shared/util';

import { config } from '../config';
const log = debug('server:sql');

const logSql = process.env.LOG_SQL === 'true';

if (logSql) {
  log('Logging all SQL queries');
}

const timeRE = /^([0-9]{4}-[0-9]{2}-[0-9]{2}) ([0-9]{2}:[0-9]{2}.*)$/;
const formatDbTimestamp = (s: string) => s.replace(timeRE, '$1T$2');

function setupDbTypeConversion(pgp: pgp.IMain) {
  const types = pgp.pg.types;

  types.setTypeParser(types.builtins.DATE, identity);
  types.setTypeParser(types.builtins.TIMESTAMPTZ, formatDbTimestamp);
  types.setTypeParser(types.builtins.TIMESTAMP, formatDbTimestamp);
}

const dbMain = pgp({
  query: logSql ? q => log(`SQL: ${q.query}`) : undefined,
});
setupDbTypeConversion(dbMain);
export const db = dbMain(config.dbUrl);
