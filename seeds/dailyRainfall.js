const { dailyRainfallIds, rainGuageIds } = require('../seedData/uuids');
const uuid = require('uuid/v4');

exports.seed = knex =>
  // Deletes ALL existing entries
  knex('daily_rainfall')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('daily_rainfall').insert([
        {
          id: dailyRainfallIds[7],
          rainfall: 27,
          date: '2019-01-08',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[0],
          rainfall: 11,
          date: '2019-01-04',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[1],
          rainfall: 1,
          date: '2019-01-03',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[2],
          rainfall: 2,
          date: '2019-01-02',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[3],
          rainfall: 2,
          date: '2019-01-01',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[4],
          rainfall: 4,
          date: '2018-12-01',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[5],
          rainfall: 2,
          date: '2018-12-06',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[6],
          rainfall: 12,
          date: '2018-12-07',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[8],
          rainfall: 7,
          date: '2018-12-08',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[9],
          rainfall: 17,
          date: '2018-12-09',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[10],
          rainfall: 11,
          date: '2018-12-10',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[11],
          rainfall: 5,
          date: '2018-12-15',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[12],
          rainfall: 1,
          date: '2018-12-17',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[13],
          rainfall: 1,
          date: '2018-12-18',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[14],
          rainfall: 11,
          date: '2018-12-19',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[15],
          rainfall: 3,
          date: '2018-12-26',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[16],
          rainfall: 2,
          date: '2018-11-02',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[17],
          rainfall: 2,
          date: '2018-11-04',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[18],
          rainfall: 3,
          date: '2018-11-07',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        {
          id: dailyRainfallIds[19],
          rainfall: 1,
          date: '2018-11-17',
          unit: 'mm',
          guage_id: rainGuageIds[0]
        },
        { id: uuid(), rainfall: 5, date: '2018-11-20', unit: 'mm', guage_id: rainGuageIds[0] },
        { id: uuid(), rainfall: 7, date: '2018-11-21', unit: 'mm', guage_id: rainGuageIds[0] },
        { id: uuid(), rainfall: 16, date: '2018-11-24', unit: 'mm', guage_id: rainGuageIds[0] },
        { id: uuid(), rainfall: 2, date: '2018-11-25', unit: 'mm', guage_id: rainGuageIds[0] },
        { id: uuid(), rainfall: 1, date: '2018-11-28', unit: 'mm', guage_id: rainGuageIds[0] },
        { id: uuid(), rainfall: 11, date: '2018-11-30', unit: 'mm', guage_id: rainGuageIds[0] }
      ])
    );
