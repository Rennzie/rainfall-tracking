const { rainGuageIds, monthlyRainfallIds } = require('../../seedData/uuids');

exports.seed = knex =>
  // Deletes ALL existing entries
  knex('monthly_rainfall')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('monthly_rainfall').insert([
        {
          id: monthlyRainfallIds[0],
          rainfall: 43,
          unit: 'mm',
          date: '2019-01-10',
          year: 2019,
          month: 0,
          guage_id: rainGuageIds[0]
        }
      ])
    );
