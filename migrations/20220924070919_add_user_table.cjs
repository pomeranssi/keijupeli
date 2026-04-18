exports.up = knex =>
  knex.raw(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      admin BOOL DEFAULT FALSE
    );
    CREATE INDEX users_username_idx ON users(username);

    CREATE TABLE IF NOT EXISTS sessions (
      id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id BIGINT NOT NULL REFERENCES users(id),
      login_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expiry_time TIMESTAMPTZ NOT NULL,
      refresh_token UUID NOT NULL DEFAULT uuid_generate_v4(),
      refresh_token_expiry TIMESTAMPTZ NOT NULL
    );
`);

exports.down = knex =>
  knex.raw(`
    DROP TABLE IF EXISTS sessions;
    DROP TABLE IF EXISTS users;
`);
