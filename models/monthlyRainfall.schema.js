import Knex from 'knex';
import { Model } from 'objection';
import connection from '../knexfile';

// import Farm from './farm.schema';

const knexConnection = Knex(connection);
Model.knex(knexConnection);

export default class MonthlyRainfall extends Model {
  static tableName = 'monthly_rainfall';

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  // static relationMappings = {
  //   monthlyRainfall: {
  //     relation: Model.HasOneRelation,
  //     modelClass: `${__dirname}/farm.schema`,
  //     join: {
  //       from: 'monthly)rainfall.farm_id',
  //       to: 'farms.id'
  //     }
  //   }
  // };
}
