const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../knexfile');

const Rainfall = require('./rainfall.schema');

const knexConnection = Knex(connection);
Model.knex(knexConnection);

class Farm extends Model {
  static get tableName() {
    return 'farms';
  }

  static get relationMappings() {
    return {
      rainfall: {
        relation: Model.HasManyRelation,
        modelClass: Rainfall,
        join: {
          from: 'farms.id',
          to: 'rainfall.farm_id'
        }
      }
    };
  }
}

module.exports = Farm;
