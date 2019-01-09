exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('farms', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('farm_owner'); // this should reference a user
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('farms')]);
};
