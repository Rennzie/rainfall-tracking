import Knex from 'knex';
import { Model } from 'objection';
import moment from 'moment';
import connection from '../knexfile';

const knexConnection = Knex(connection);
Model.knex(knexConnection);

export default class Farm extends Model {
  static tableName = 'farms';

  static virtualAttributes = ['twelveMonthRunningRainfall'];

  twelveMonthRunningRainfall() {
    const today = moment();
    const twelveMonthsAgo = moment().subtract(12, 'months');
    const prev12Months = this.monthlyRainfall.filter(monthsRainfall =>
      moment(monthsRainfall.date).isBetween(twelveMonthsAgo, today, 'month', '[)')
    );
    // console.log('========>', prev12Months);

    let totalRain = 0;
    for (let i = 0; i < prev12Months.length; i += 1) {
      totalRain += prev12Months[i].rain;
      // console.log('FOR LOOP========>', totalRain);
    }

    return totalRain;
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
