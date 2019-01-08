import Knex from 'knex';
import { Model } from 'objection';
import connection from '../knexfile';

import Rainfall from './rainfall.schema';

const knexConnection = Knex(connection);
Model.knex(knexConnection);

export default class Farm extends Model {
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
