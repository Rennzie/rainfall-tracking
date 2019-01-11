exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('monthly_rainfall', table => {
      table.increments('id').primary();
      table.float('rain');
      table.enu('unit', ['mm', 'inch']);
      table.date('date');
      table.string('year');
      table.string('month');
      table.integer('farm_id').references('farms.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('monthly_rainfall')]);
};
