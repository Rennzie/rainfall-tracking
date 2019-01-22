import Knex from 'knex';
import { Model } from 'objection';
import ObjectionGuid from 'objection-guid';
import connection from '../knexfile';

const guid = ObjectionGuid();

const knexConnection = Knex(connection);
Model.knex(knexConnection);

export default class Rainfall extends guid(Model) {
  static tableName = 'twelve_month_running_rainfall';

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
