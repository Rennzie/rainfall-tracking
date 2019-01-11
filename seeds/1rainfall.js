exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rainfall')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('rainfall').insert([
        { rain: 11, date: '2019-01-04', farm_id: 1 },
        { rain: 1, date: '2019-01-03', farm_id: 1 },
        { rain: 2, date: '2019-01-02', farm_id: 1 },
        { rain: 2, date: '2019-01-01', farm_id: 1 },
        { rain: 2, date: '2018-01-01', farm_id: 1 },
        { rain: 2, date: '2018-01-02', farm_id: 1 },
        { rain: 2, date: '2018-01-03', farm_id: 1 },

        { rain: 10, date: '2019-01-05', farm_id: 2 },
        { rain: 20, date: '2018-12-30', farm_id: 2 },
        { rain: 3, date: '2018-12-28', farm_id: 2 }
      ])
    );
};
