import Knex from 'knex';
import { Model } from 'objection';
import connection from '../knexfile';

import Rainfall from './rainfall.schema';
import MonthlyRainfall from './monthlyRainfall.schema';

const knexConnection = Knex(connection);
Model.knex(knexConnection);

export default class Farm extends Model {
  static get tableName() {
    return 'farms';
  }

  static get virtualAttributes() {
    return ['currentMonthsAverage'];
  }

  currentMonthsAverage() {
    let totalRain = 0;
    console.log('THIS IS ', this.rainfall);
    for (let i = 0; i < this.rainfall.length; i += 1) {
      totalRain += this.rainfall[i].rain;
    }
    const averageRain = totalRain / this.rainfall.length;
    console.log('AVERAGE RAIN:', averageRain);
    return averageRain;
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      rainfall: {
        relation: Model.HasManyRelation,
        modelClass: Rainfall,
        join: {
          from: 'farms.id',
          to: 'rainfall.farm_id'
        },
        totalMonthlyRainfall: {
          relation: Model.HasManyRelation,
          modelClass: MonthlyRainfall,
          join: 'farms.id',
          to: 'rainfall.farm_id'
        }
      }
    };
  }
}
