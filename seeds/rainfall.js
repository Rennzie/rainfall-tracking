exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rainfall')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('rainfall').insert([
        { rain: 11, date: '20190104', farm_id: 1 },
        { rain: 1, date: '20190103', farm_id: 1 },
        { rain: 2, date: '20190102', farm_id: 1 },
        { rain: 2, date: '20190101', farm_id: 1 },

        { rain: 10, date: '20190105', farm_id: 2 },
        { rain: 20, date: '20181230', farm_id: 2 },
        { rain: 3, date: '20181228', farm_id: 2 }
      ])
    );
};
