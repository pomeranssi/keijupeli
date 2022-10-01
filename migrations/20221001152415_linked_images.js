exports.up = knex =>
  knex.raw(`
    ALTER TABLE items
      ADD COLUMN IF NOT EXISTS linked_item INT REFERENCES items(id);
`);

exports.down = knex =>
  knex.raw(`
    ALTER TABLE items DROP COLUMN IF EXISTS linked_item;
`);
