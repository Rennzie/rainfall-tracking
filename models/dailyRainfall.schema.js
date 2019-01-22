import Knex from 'knex';
import { Model } from 'objection';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import connection from '../knexfile';

import MonthlyRainfall from './monthlyRainfall.schema';

const guid = require('objection-guid')();

// const guid = ObjectionGuid();

const knexConnection = Knex(connection);
Model.knex(knexConnection);

export default class DailyRainfall extends guid(Model) {
  static tableName = 'daily_rainfall';

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  // To update the farms monthly rainfall total
  async $afterInsert() {
    // find all the rainfall results for the rainguage for the current month
    // sum them and add them to the MonthlyRainfall
    // Be sure to update if its not the first time in the month

    const year = moment(this.date).year();
    const month = moment(this.date).month();
    // Postgres months are not zero indexed like moment
    const postGresMonth = moment(this.date).month() + 1;

    const monthsRainfall = await DailyRainfall.query()
      .where('guage_id', '=', this.guage_id)
      .andWhereRaw('EXTRACT(YEAR FROM date::date) = ?', [year])
      .andWhereRaw('EXTRACT(MONTH FROM date::date) = ?', [postGresMonth]);

    let monthsTotalRainfall = 0;
    for (let i = 0; i < monthsRainfall.length; i += 1) {
      monthsTotalRainfall += monthsRainfall[i].rainfall;
    }

    const monthlyRainfall = await MonthlyRainfall.query()
      .where('guage_id', '=', this.guage_id)
      .andWhere('year', '=', year)
      .andWhere('month', '=', month);

    if (!monthlyRainfall.length) {
      // building a new monthly total object
      const newMonthlyRainfall = {};
      newMonthlyRainfall.id = uuidv4();
      newMonthlyRainfall.rainfall = monthsTotalRainfall;
      newMonthlyRainfall.date = this.date;
      newMonthlyRainfall.guage_id = this.guage_id;
      newMonthlyRainfall.unit = 'mm';
      newMonthlyRainfall.year = moment(this.date).year();
      newMonthlyRainfall.month = moment(this.date).month();

      await MonthlyRainfall.query()
        .allowInsert('[date, guage_id, month, rainfall, unit, year]')
        .insert(newMonthlyRainfall);
    } else {
      await MonthlyRainfall.query()
        .findById(monthlyRainfall[0].id)
        .patch({ rainfall: monthsTotalRainfall, guage_id: this.guage_id, date: this.date });
    }
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  // Update the monthly total after record is updated
  async $afterUpdate() {
    const updatedEntry = await DailyRainfall.query().findById(this.id);

    const year = moment(updatedEntry.date).year();
    const month = moment(updatedEntry.date).month();

    // Postgres months are not zero indexed like moment
    const postGresMonth = moment(updatedEntry.date).month() + 1;

    const monthsRainfall = await DailyRainfall.query()
      .where('guage_id', '=', updatedEntry.guage_id)
      .andWhereRaw('EXTRACT(YEAR FROM date::date) = ?', [year])
      .andWhereRaw('EXTRACT(MONTH FROM date::date) = ?', [postGresMonth]);

    let monthsTotalRainfall = 0;
    for (let i = 0; i < monthsRainfall.length; i += 1) {
      monthsTotalRainfall += monthsRainfall[i].rainfall;
    }

    const monthlyRainfall = await MonthlyRainfall.query()
      .where('guage_id', '=', updatedEntry.guage_id)
      .andWhere('year', '=', year)
      .andWhere('month', '=', month);

    await MonthlyRainfall.query()
      .findById(monthlyRainfall[0].id)
      .patch({
        rainfall: monthsTotalRainfall,
        guage_id: updatedEntry.guage_id,
        date: updatedEntry.date
      });
  }
}
