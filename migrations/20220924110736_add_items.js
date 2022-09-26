exports.up = knex =>
  knex.raw(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY NOT NULL,
      user_id BIGINT REFERENCES users(id),
      category TEXT NOT NULL,
      public BOOL NOT NULL DEFAULT false,
      is_default BOOL NOT NULL DEFAULT false,
      filename TEXT NOT NULL,
      original_filename TEXT,
      thumbnail TEXT,
      width INT NOT NULL,
      height INT NOT NULL,
      offset_x INT NOT NULL,
      offset_y INT NOT NULL,
      z_index INT
    );
`);

exports.down = knex =>
  knex.raw(`
    DROP TABLE IF EXISTS items;
`);
