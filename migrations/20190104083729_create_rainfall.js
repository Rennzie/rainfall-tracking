exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('rainfall', table => {
      table.increments('id').primary();
      table.decimal('rain', 2);
      table.date('date');
      table.timestamps('createdAt');
      table.uuid('_uuid');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('rainfall')]);
};

// NEXT: complete building out the schema, decimal is giving trouble when a normal number is added
