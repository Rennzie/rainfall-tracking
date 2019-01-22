const { rainGuageIds, monthlyRainfallIds } = require('../seedData/uuids');

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
        },
        {
          id: monthlyRainfallIds[1],
          rainfall: 84,
          unit: 'mm',
          date: '2018-12-10',
          year: 2018,
          month: 11,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[2],
          rainfall: 50,
          unit: 'mm',
          date: '2018-11-10',
          year: 2018,
          month: 10,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[3],
          rainfall: 53,
          unit: 'mm',
          date: '2018-10-10',
          year: 2018,
          month: 9,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[4],
          rainfall: 25,
          unit: 'mm',
          date: '2018-09-10',
          year: 2018,
          month: 8,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[5],
          rainfall: 48,
          unit: 'mm',
          date: '2018-08-10',
          year: 2018,
          month: 7,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[6],
          rainfall: 11,
          unit: 'mm',
          date: '2018-07-10',
          year: 2018,
          month: 6,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[7],
          rainfall: 0,
          unit: 'mm',
          date: '2018-06-10',
          year: 2018,
          month: 5,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[8],
          rainfall: 10,
          unit: 'mm',
          date: '2018-05-10',
          year: 2018,
          month: 4,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[9],
          rainfall: 15,
          unit: 'mm',
          date: '2018-04-10',
          year: 2018,
          month: 3,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[10],
          rainfall: 168,
          unit: 'mm',
          date: '2018-03-10',
          year: 2018,
          month: 2,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[11],
          rainfall: 72,
          unit: 'mm',
          date: '2018-02-10',
          year: 2018,
          month: 1,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[12],
          rainfall: 180,
          unit: 'mm',
          date: '2018-01-10',
          year: 2018,
          month: 0,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[13],
          rainfall: 70,
          unit: 'mm',
          date: '2017-12-10',
          year: 2017,
          month: 11,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[14],
          rainfall: 97,
          unit: 'mm',
          date: '2017-11-10',
          year: 2017,
          month: 10,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[15],
          rainfall: 119,
          unit: 'mm',
          date: '2017-10-10',
          year: 2017,
          month: 9,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[16],
          rainfall: 6,
          unit: 'mm',
          date: '2017-09-10',
          year: 2017,
          month: 8,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[17],
          rainfall: 19,
          unit: 'mm',
          date: '2017-08-10',
          year: 2017,
          month: 7,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[18],
          rainfall: 0,
          unit: 'mm',
          date: '2017-07-10',
          year: 2017,
          month: 6,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[19],
          rainfall: 0,
          unit: 'mm',
          date: '2017-06-10',
          year: 2017,
          month: 5,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[20],
          rainfall: 36,
          unit: 'mm',
          date: '2017-05-10',
          year: 2017,
          month: 4,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[21],
          rainfall: 128,
          unit: 'mm',
          date: '2017-04-10',
          year: 2017,
          month: 3,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[22],
          rainfall: 83,
          unit: 'mm',
          date: '2017-03-10',
          year: 2017,
          month: 2,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[23],
          rainfall: 241,
          unit: 'mm',
          date: '2017-02-10',
          year: 2017,
          month: 1,
          guage_id: rainGuageIds[0]
        },
        {
          id: monthlyRainfallIds[24],
          rainfall: 170,
          unit: 'mm',
          date: '2017-01-10',
          year: 2017,
          month: 0,
          guage_id: rainGuageIds[0]
        }
      ])
    );
