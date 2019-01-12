import Knex from 'knex';
import { Model } from 'objection';
import moment from 'moment';
import connection from '../knexfile';

import MonthlyRainfall from './monthlyRainfall.schema';

const knexConnection = Knex(connection);
Model.knex(knexConnection);

export default class Rainfall extends Model {
  static tableName = 'rainfall';

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  // To update the farms monthly rainfall total
  async $afterInsert() {
    // find all the rainfall results for the farm for the current month
    // sum them and add them to the MonthlyRainfall
    // Be sure to update if its not the first time in the month

    const year = moment(this.date).year();
    // Postgres months are not zero indexed like moment
    const month = moment(this.date).month() + 1;

    const monthsRainfall = await Rainfall.query()
      .where('farm_id', '=', this.farm_id)
      .andWhereRaw(`EXTRACT(YEAR FROM date::date) = ${year}`)
      .andWhereRaw(`EXTRACT(MONTH FROM date::date) = ${month}`);

    let monthsTotalRainfall = 0;
    for (let i = 0; i < monthsRainfall.length; i += 1) {
      monthsTotalRainfall += monthsRainfall[i].rain;
    }

    const monthlyRainfall = await MonthlyRainfall.query()
      .where('farm_id', '=', this.farm_id)
      .andWhereRaw(`EXTRACT(YEAR FROM date::date) = ${year}`)
      .andWhereRaw(`EXTRACT(MONTH FROM date::date) = ${month}`);

    if (!monthlyRainfall.length) {
      // building a new monthly total object
      const newMonthlyRainfall = {};
      newMonthlyRainfall.date = this.date;
      newMonthlyRainfall.farm_id = this.farm_id;
      newMonthlyRainfall.rain = monthsTotalRainfall;
      newMonthlyRainfall.month = moment(this.date).format('MMM');
      newMonthlyRainfall.unit = 'mm';
      newMonthlyRainfall.year = moment(this.date).format('YYYY');
      await MonthlyRainfall.query()
        .allowInsert('[date, farm_id, month, rain, unit, year]')
        .insert(newMonthlyRainfall);
    } else {
      await MonthlyRainfall.query()
        .findById(monthlyRainfall[0].id)
        .patch({ rain: monthsTotalRainfall });
    }
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  // Update the monthly total after record is updated
  async $afterUpdate() {
    const year = moment(this.date).year();
    // Postgres months are not zero indexed like moment
    const month = moment(this.date).month() + 1;

    const monthsRainfall = await Rainfall.query()
      .where('farm_id', '=', this.farm_id)
      .andWhereRaw(`EXTRACT(YEAR FROM date::date) = ${year}`)
      .andWhereRaw(`EXTRACT(MONTH FROM date::date) = ${month}`);

    let monthsTotalRainfall = 0;
    for (let i = 0; i < monthsRainfall.length; i += 1) {
      monthsTotalRainfall += monthsRainfall[i].rain;
    }

    const monthlyRainfall = await MonthlyRainfall.query()
      .where('farm_id', '=', this.farm_id)
      .andWhereRaw(`EXTRACT(YEAR FROM date::date) = ${year}`)
      .andWhereRaw(`EXTRACT(MONTH FROM date::date) = ${month}`);

    await MonthlyRainfall.query()
      .findById(monthlyRainfall[0].id)
      .patch({ rain: monthsTotalRainfall });
  }
}
