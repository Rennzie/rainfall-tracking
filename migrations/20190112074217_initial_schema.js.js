exports.up = knex =>
  knex.schema
    .createTable('farms', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('farm_owner'); // this should reference a user
      table.timestamps(true, true);
    })
    .createTable('rainfall', table => {
      table.increments('id').primary();
      table.float('rain');
      table.enu('unit', ['mm', 'inch']);
      table.string('date');
      table
        .integer('farm_id')
        .references('farms.id')
        .onDelete('SET NULL');
      table.timestamps(true, true);
      table.uuid('_uuid');
    })
    .createTable('monthly_rainfall', table => {
      table.increments('id').primary();
      table.float('rain');
      table.enu('unit', ['mm', 'inch']);
      table.date('date');
      table.string('year');
      table.string('month');
      table
        .integer('farm_id')
        .references('farms.id')
        .onDelete('SET NULL');
      table.timestamps(true, true);
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('farm')
    .dropTableIfExists('rainfall')
    .dropTableIfExists('monthly_rainfall');
