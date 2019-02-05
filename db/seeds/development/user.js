const { userIds } = require('../../seedData/uuids');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('users').insert([{ id: userIds[0], email: 'rnnsea001@gmail.com', password: 'pass' }])
    );
};
