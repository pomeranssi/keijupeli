'use strict';
require('dotenv').config();

const migrations = {
  tableName: 'knex_migrations',
  extension: 'cjs',
  loadExtensions: ['.cjs'],
};

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    migrations,
  },

  production: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    migrations,
  },
};
