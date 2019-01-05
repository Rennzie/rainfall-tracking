exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('rainfall', table => {
      table.increments('id').primary();
      table.float('rain');
      table.date('date');
      table.integer('farm_id').references('farms.id');
      table.timestamps(true, true);
      table.uuid('_uuid');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('rainfall')]);
};
