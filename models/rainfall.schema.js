const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../knexfile');

const Farm = require('./farm.schema');

const knexConnection = Knex(connection);
Model.knex(knexConnection);

class Rainfall extends Model {
  static get tableName() {
    return 'rainfall';
  }

  static get relationMappings() {
    return {
      farm_id: {
        relation: Model.BelongsToOneRelation,
        modelClass: Farm,
        join: {
          from: 'rainfall.farm_id',
          to: 'farms.id'
        }
      }
    };
  }
}

module.exports = Rainfall;

// NEXT: get farm with joined rainfall data.
