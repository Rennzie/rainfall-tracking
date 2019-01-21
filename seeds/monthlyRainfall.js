exports.seed = knex =>
  // Deletes ALL existing entries
  knex('monthly_rainfall')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('monthly_rainfall').insert([
        { rain: 38, date: '2019-01-10', farm_id: 1 },
        { rain: 84, date: '2018-12-10', farm_id: 1 },
        { rain: 50, date: '2018-11-10', farm_id: 1 },
        { rain: 53, date: '2018-10-10', farm_id: 1 },
        { rain: 25, date: '2018-09-10', farm_id: 1 },
        { rain: 48, date: '2018-08-10', farm_id: 1 },
        { rain: 11, date: '2018-07-10', farm_id: 1 },
        { rain: 0, date: '2018-06-10', farm_id: 1 },
        { rain: 10, date: '2018-05-10', farm_id: 1 },
        { rain: 15, date: '2018-04-10', farm_id: 1 },
        { rain: 168, date: '2018-03-10', farm_id: 1 },
        { rain: 72, date: '2018-02-10', farm_id: 1 },
        { rain: 180, date: '2018-01-10', farm_id: 1 },
        { rain: 70, date: '2017-12-10', farm_id: 1 },
        { rain: 97, date: '2017-11-10', farm_id: 1 },
        { rain: 119, date: '2017-10-10', farm_id: 1 },
        { rain: 6, date: '2017-09-10', farm_id: 1 },
        { rain: 19, date: '2017-08-10', farm_id: 1 },
        { rain: 0, date: '2017-07-10', farm_id: 1 },
        { rain: 0, date: '2017-06-10', farm_id: 1 },
        { rain: 36, date: '2017-05-10', farm_id: 1 },
        { rain: 128, date: '2017-04-10', farm_id: 1 },
        { rain: 83, date: '2017-03-10', farm_id: 1 },
        { rain: 241, date: '2017-02-10', farm_id: 1 },
        { rain: 170, date: '2017-01-10', farm_id: 1 }
      ])
    );
