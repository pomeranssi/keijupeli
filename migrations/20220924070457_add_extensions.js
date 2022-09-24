exports.up = knex =>
  knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
`);

exports.down = knex =>
  knex.raw(`
    -- No rollback
`);
