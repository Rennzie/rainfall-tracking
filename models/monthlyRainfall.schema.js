import Knex from 'knex';
import { Model } from 'objection';
import ObjectionGuid from 'objection-guid';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import connection from '../knexfile';
import TwelveMonthRunningRainfall from './twelveMonthRunningRainfall.schema';

const guid = ObjectionGuid();

const knexConnection = Knex(connection);
Model.knex(knexConnection);

export default class MonthlyRainfall extends guid(Model) {
  static tableName = 'monthly_rainfall';

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  async $afterInsert() {
    await generateRunningTotal(this.date, this.guage_id);
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  async $afterUpdate() {
    await generateRunningTotal(this.date, this.guage_id);
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

async function generateRunningTotal(date, guageId) {
  // update the twelve month running total
  // get all the monthly rainfall totals for the guage
  // fiter out the last 12 months entries
  // sum them and add them to the new month, create a new one or update an existing field

  // this.date is set by the updated or created daily rainfall entry
  // console.log('AFTER INSERT THIS (MONTHLY RAINFALL)', this);
  const monthlyRainfalls = await MonthlyRainfall.query().where('guage_id', '=', guageId);
  const currentDate = moment(date);
  const twelveMonthsBeforeCurrent = moment(date).subtract(11, 'months');

  const last12Months = monthlyRainfalls.filter(monthsRainfall =>
    moment(monthsRainfall.date).isBetween(twelveMonthsBeforeCurrent, currentDate, 'month', '[]')
  );

  let runningTotalRain = 0;
  for (let i = 0; i < last12Months.length; i += 1) {
    runningTotalRain += last12Months[i].rainfall;
  }

  const year = moment(date).year();
  const month = moment(date).month();

  const twelveMonthRunningRainfall = await TwelveMonthRunningRainfall.query()
    .where('guage_id', '=', guageId)
    .andWhere('year', '=', year)
    .andWhere('month', '=', month);

  if (!twelveMonthRunningRainfall.length) {
    const new12MonthRunningRainfall = {};
    new12MonthRunningRainfall.id = uuidv4();
    new12MonthRunningRainfall.rainfall = runningTotalRain;
    new12MonthRunningRainfall.unit = 'mm';
    new12MonthRunningRainfall.date = moment(currentDate).format('YYYY-MM-DD');
    new12MonthRunningRainfall.year = year;
    new12MonthRunningRainfall.month = month;
    new12MonthRunningRainfall.guage_id = guageId;

    await TwelveMonthRunningRainfall.query().insert(new12MonthRunningRainfall);
  } else {
    await TwelveMonthRunningRainfall.query()
      .findById(twelveMonthRunningRainfall[0].id)
      .patch({ rainfall: runningTotalRain });
  }
}
