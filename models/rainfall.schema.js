import Knex from 'knex';
import { Model } from 'objection';
import connection from '../knexfile';

// import Farm from './farm.schema';

const knexConnection = Knex(connection);
Model.knex(knexConnection);

class Rainfall extends Model {
  static get tableName() {
    return 'rainfall';
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  // static get relationMappings() {
  //   return {
  //     farms: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: Farm,
  //       join: {
  //         from: 'rainfall.farm_id',
  //         to: 'farms.id'
  //       }
  //     }
  //   };
  // }
}

export default Rainfall;
