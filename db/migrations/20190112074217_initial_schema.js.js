exports.up = knex =>
  knex.schema
    .createTable('users', table => {
      table.uuid('id').primary();
      table.string('email'); // this should reference a user
      table.string('password'); // this should reference a user
      table.timestamps(true, true);
    })
    .createTable('farms', table => {
      table.uuid('id').primary();
      table.string('name');
      table.string('farm_owner'); // this should reference a user
      table.timestamps(true, true);
    })
    .createTable('rain_guages', table => {
      table.uuid('id').primary();
      table.float('lat');
      table.float('lon');
      table.uuid('farm_id');
      //   .references('farms.id')
      //   .onDelete('SET NULL');
      table.timestamps(true, true);
    })
    .createTable('daily_rainfall', table => {
      table.uuid('id').primary();
      table.float('rainfall');
      table.enu('unit', ['mm', 'inch']);
      table.date('date');
      table.uuid('guage_id');
      //   .references('rain_guages.id')
      //   .onDelete('SET NULL');
      table.timestamps(true, true);
    })
    .createTable('monthly_rainfall', table => {
      table.uuid('id').primary();
      table.float('rainfall');
      table.enu('unit', ['mm', 'inch']);
      table.date('date');
      table.integer('year');
      table.integer('month');
      table.uuid('guage_id');
      //   .references('rain_guages.id')
      //   .onDelete('SET NULL');
      table.timestamps(true, true);
    })
    .createTable('twelve_month_running_rainfall', table => {
      table.uuid('id').primary();
      table.float('rainfall');
      table.enu('unit', ['mm', 'inch']);
      table.date('date');
      table.integer('year');
      table.integer('month');
      table.uuid('guage_id');
      //   .references('rain_guages.id')
      //   .onDelete('SET NULL');
      table.timestamps(true, true);
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('daily_rainfall')
    .dropTableIfExists('twelve_month_running_rainfall')
    .dropTableIfExists('monthly_rainfall')
    .dropTableIfExists('rain_guages')
    .dropTableIfExists('farms');
