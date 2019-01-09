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

  async $afterInsert() {
    // find all the rainfall results for the farm for the current month
    // sum them and add them to the MonthlyRainfall
    // Be sure to update if its not the first time in the month
    const monthsRainfall = this.query().where('farm_id', '=', 1);
  }

  // NEXT: trying to sum the months rainfall for a farm

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
