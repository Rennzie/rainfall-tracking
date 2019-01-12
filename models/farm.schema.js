import Knex from 'knex';
import { Model } from 'objection';
import connection from '../knexfile';

const knexConnection = Knex(connection);
Model.knex(knexConnection);

export default class Farm extends Model {
  static tableName = 'farms';

  static virtualAttributes = ['twelveMonthRunningRainfall'];

  twelveMonthRunningRainfall() {
    // get all monthly rainfall for this farm for the last 12 months
    // sum there rainfall and return it
    const prev12Months = this.monthlyRainfall;
    // .query()
    // .whereRaw('EXTRACT(YEAR FROM date::date) = 2018');
    console.log('THIS IS ', prev12Months);

    // let totalRain = 0;
    // for (let i = 0; i < this.rainfall.length; i += 1) {
    //   totalRain += this.rainfall[i].rain;
    // }
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static relationMappings = {
    monthlyRainfall: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/monthlyRainfall.schema`,
      join: {
        from: 'farms.id',
        to: 'monthly_rainfall.farm_id'
      }
    },
    rainfall: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/rainfall.schema`,
      join: {
        from: 'farms.id',
        to: 'rainfall.farm_id'
      }
    }
  };
}
