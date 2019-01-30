const { farmIds } = require('../../seedData/uuids');

exports.seed = knex =>
  // Deletes ALL existing entries
  knex('farms')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('farms').insert([
        { id: farmIds[0], name: 'Palmiet', farm_owner: 'rennzie' },
        { id: farmIds[1], name: 'Blydefontein', farm_owner: 'rennzie' }
      ])
    );
