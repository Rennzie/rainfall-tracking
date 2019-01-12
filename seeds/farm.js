exports.seed = knex =>
  // Deletes ALL existing entries
  knex('farms')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('farms').insert([
        { id: 1, name: 'Palmiet', farm_owner: 'rennzie' },
        { id: 2, name: 'Blydefontein', farm_owner: 'rennzie' }
      ])
    );
