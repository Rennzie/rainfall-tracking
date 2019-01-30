import Knex from 'knex';
import ObjectionGuid from 'objection-guid';
import { Model } from 'objection';
import connection from '../../knexfile';

const knexConnection = Knex(connection[process.env.NODE_ENV]);
Model.knex(knexConnection);

const guid = ObjectionGuid();

export default class Farm extends guid(Model) {
  static tableName = 'rain_guages';

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  // static relationMappings = {
  //   twelveMonthRunningRainfall: {
  //     relation: Model.HasManyRelation,
  //     modelClass: `${__dirname}/twelveMonthRunningRainfall.schema`,
  //     join: {
  //       from: 'rain_guages.id',
  //       to: 'twelve_month_running_rainfall.guage_id'
  //     }
  //   },
  //   monthlyRainfall: {
  //     relation: Model.HasManyRelation,
  //     modelClass: `${__dirname}/monthlyRainfall.schema`,
  //     join: {
  //       from: 'rain_guages.id',
  //       to: 'monthly_rainfall.guage_id'
  //     }
  //   },
  //   rainfall: {
  //     relation: Model.HasManyRelation,
  //     modelClass: `${__dirname}/dailyRainfall.schema`,
  //     join: {
  //       from: 'rain_guages.id',
  //       to: 'daily_rainfall.guage_id'
  //     }
  //   }
  // };
}
