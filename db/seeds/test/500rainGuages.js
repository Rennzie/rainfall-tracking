const { rainGuageIds, farmIds } = require('../../seedData/uuids');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rain_guages')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('rain_guages').insert([{ id: rainGuageIds[0], farm_id: farmIds[0] }])
    );
};
