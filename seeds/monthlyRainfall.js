exports.seed = knex =>
  // Deletes ALL existing entries
  knex('monthly_rainfall')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('monthly_rainfall').insert([
        { rain: 38, date: '2019-01-01', farm_id: 1 },
        { rain: 100, date: '2018-12-01', farm_id: 1 },
        { rain: 100, date: '2018-11-01', farm_id: 1 },
        { rain: 100, date: '2018-10-01', farm_id: 1 },
        { rain: 100, date: '2018-09-01', farm_id: 1 },
        { rain: 100, date: '2018-08-01', farm_id: 1 },
        { rain: 100, date: '2018-07-01', farm_id: 1 },
        { rain: 100, date: '2018-06-01', farm_id: 1 },
        { rain: 100, date: '2018-05-01', farm_id: 1 },
        { rain: 100, date: '2018-04-01', farm_id: 1 },
        { rain: 100, date: '2018-03-01', farm_id: 1 },
        { rain: 100, date: '2018-02-01', farm_id: 1 },
        { rain: 100, date: '2018-01-01', farm_id: 1 },
        { rain: 100, date: '2017-12-01', farm_id: 1 },
        { rain: 100, date: '2017-11-01', farm_id: 1 },
        { rain: 100, date: '2017-10-01', farm_id: 1 },
        { rain: 100, date: '2017-09-01', farm_id: 1 },
        { rain: 100, date: '2017-08-01', farm_id: 1 },
        { rain: 100, date: '2017-07-01', farm_id: 1 },
        { rain: 100, date: '2017-06-01', farm_id: 1 },
        { rain: 100, date: '2017-05-01', farm_id: 1 },
        { rain: 100, date: '2017-04-01', farm_id: 1 },
        { rain: 100, date: '2017-03-01', farm_id: 1 },
        { rain: 100, date: '2017-02-01', farm_id: 1 },
        { rain: 100, date: '2017-01-01', farm_id: 1 }
      ])
    );
